/**
 * play-score — scoring API for play.dev-lu.com
 *
 * POST /api/score   { item, dims:{match,quality,translation}, nonce }
 * GET  /api/scores?item=<id>      -> aggregated
 * GET  /api/queue?day=YYYY-MM-DD  -> items awaiting a score
 * GET  /healthz
 *
 * Bindings: KV namespace `SCORES`, secret `SCORE_SECRET`.
 * A write is accepted only when nonce == HMAC(item)[0:16], so only items that
 * were published by the generator can be scored; the secret never leaves the Worker.
 */

const ALLOWED = new Set([
  "https://play.dev-lu.com",
  "http://127.0.0.1:8099",
  "http://localhost:8099",
]);
const pickOrigin = (req) => {
  const o = req.headers.get("origin") || "";
  return ALLOWED.has(o) ? o : "https://play.dev-lu.com";
};
const corsFor = (req) => ({
  "Access-Control-Allow-Origin": pickOrigin(req),
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
});
const CORS = { "Access-Control-Allow-Origin": "https://play.dev-lu.com" };

const json = (body, status = 200, req = null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8",
               ...(req ? corsFor(req) : CORS) },
  });

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}


// --- aggregate document -------------------------------------------------------
// Cloudflare's free tier allows 1,000 KV list() operations per day, and one page
// load used to spend one. The aggregate now lives in a single key, keyed by rater
// so that re-scoring replaces instead of double counting.
const AGG_KEY = "agg:v1";

function summarise(entry) {
  const raters = Object.values(entry.raters || {});
  const n = raters.length;
  if (!n) return null;
  const mean = (k) => +(raters.reduce((s, r) => s + (r[k] || 0), 0) / n).toFixed(2);
  return { n, match: mean("match"), quality: mean("quality"), translation: mean("translation"),
           last: raters.reduce((a, r) => (r.ts > a ? r.ts : a), "") };
}

function present(doc) {
  const items = {};
  for (const [item, entry] of Object.entries(doc.items || {})) {
    const sum = summarise(entry);
    if (sum) items[item] = sum;
  }
  return { items, rows: doc.rows || [], updated: doc.updated || null };
}

async function readAggregate(env) {
  const raw = await env.SCORES.get(AGG_KEY);
  if (!raw) return { items: {}, rows: [], updated: null };
  try { return JSON.parse(raw); } catch { return { items: {}, rows: [], updated: null }; }
}

async function bumpAggregate(env, item, dims, ts, rater) {
  const doc = await readAggregate(env);
  const entry = (doc.items[item] ||= { raters: {} });
  entry.raters[rater] = { ...dims, ts };
  doc.updated = ts;
  doc.rows = ([...(doc.rows || []), { item, ts, ...dims }]).slice(-200);
  await env.SCORES.put(AGG_KEY, JSON.stringify(doc));
}

const clamp = (v) => (Number.isFinite(+v) ? Math.min(5, Math.max(1, Math.round(+v))) : null);

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsFor(req) });

    if (url.pathname === "/healthz") return json({ ok: true }, 200, req);

    if (url.pathname === "/api/score" && req.method === "POST") {
      let body;
      try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, req); }
      const item = String(body.item || "").slice(0, 120);
      if (!item) return json({ error: "missing item" }, 400, req);
      if ((await hmac(env.SCORE_SECRET, item)) !== String(body.nonce || "")) {
        return json({ error: "unknown item" }, 403, req);
      }
      const dims = body.dims || {};
      const clean = {
        match: clamp(dims.match), quality: clamp(dims.quality), translation: clamp(dims.translation),
      };
      if (Object.values(clean).every((v) => v === null)) return json({ error: "no scores" }, 400, req);

      const ip = req.headers.get("cf-connecting-ip") || "0";
      const rater = (await hmac(env.SCORE_SECRET, ip)).slice(0, 12);

      // one row per (item, rater): re-scoring replaces the previous value
      const ts = new Date().toISOString();
      const key = `s:${item}:${rater}`;
      await env.SCORES.put(key, JSON.stringify({ item, dims: clean, ts }), {
        metadata: { item, ts, ...clean, rater },
      });
      await bumpAggregate(env, item, clean, ts, rater);
      return json({ ok: true, key, replaced: true }, 200, req);
    }

    if (url.pathname === "/api/scores") {
      const doc = present(await readAggregate(env));
      const item = url.searchParams.get("item");
      if (item) {
        const one = doc.items[item];
        return json({ items: one ? { [item]: one } : {}, rows: [] }, 200, req);
      }
      return json(doc, 200, req);
    }

    // One-off repair: rebuild the aggregate from the raw score keys. Costs list()
    // operations, so it is protected and only used when the daily quota allows.
    if (url.pathname === "/api/rebuild" && req.method === "POST") {
      let body = {};
      try { body = await req.json(); } catch { /* empty body */ }
      if (String(body.key || "") !== String(env.SCORE_SECRET || "").slice(0, 12)) {
        return json({ error: "forbidden" }, 403, req);
      }
      const list = await env.SCORES.list({ prefix: "s:", limit: 1000 });
      const rows = list.keys.map((k) => k.metadata).filter(Boolean);
      const doc = { items: {}, rows: rows.slice(-200), updated: new Date().toISOString() };
      for (const r of rows) {
        const entry = (doc.items[r.item] ||= { raters: {} });
        entry.raters[r.rater || "legacy"] = { match: r.match, quality: r.quality, translation: r.translation, ts: r.ts };
      }
      await env.SCORES.put(AGG_KEY, JSON.stringify(doc));
      const shown = present(doc);
      return json({ ok: true, keys: rows.length, items: Object.keys(shown.items).length }, 200, req);
    }

    return json({ error: "not found" }, 404, req);
  },
};
