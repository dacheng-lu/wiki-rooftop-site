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
      const rlKey = `rl:${item}:${await hmac(env.SCORE_SECRET, ip)}`;
      if (await env.SCORES.get(rlKey)) return json({ error: "rate limited", retry_after_s: 60 }, 429, req);
      await env.SCORES.put(rlKey, "1", { expirationTtl: 60 });

      const ts = new Date().toISOString();
      const key = `s:${item}:${ts}:${crypto.randomUUID().slice(0, 8)}`;
      await env.SCORES.put(key, JSON.stringify({ item, dims: clean, ts }), {
        metadata: { item, ts, ...clean },
      });
      return json({ ok: true, key }, 200, req);
    }

    if (url.pathname === "/api/scores") {
      const item = url.searchParams.get("item");
      const prefix = item ? `s:${item}:` : "s:";
      const list = await env.SCORES.list({ prefix, limit: 1000 });
      const rows = list.keys.map((k) => k.metadata).filter(Boolean);
      const agg = {};
      for (const r of rows) {
        const a = (agg[r.item] ||= { n: 0, match: 0, quality: 0, translation: 0 });
        a.n += 1;
        a.match += r.match || 0; a.quality += r.quality || 0; a.translation += r.translation || 0;
      }
      for (const k of Object.keys(agg)) {
        const a = agg[k];
        a.match = +(a.match / a.n).toFixed(2);
        a.quality = +(a.quality / a.n).toFixed(2);
        a.translation = +(a.translation / a.n).toFixed(2);
      }
      return json({ items: agg, rows: rows.slice(-200) }, 200, req);
    }

    return json({ error: "not found" }, 404, req);
  },
};
