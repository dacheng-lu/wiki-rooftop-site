const MAX_REQUEST_BYTES = 2048;
const EMAIL_RETENTION_DAYS = 30;
const ROUTES = new Set(["A", "B", "C", "D"]);

function json(status, value, headers) {
  return Response.json(value, {
    status,
    headers: { ...headers, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (email.length > 254) return null;
  const [local, domain, extra] = email.split("@");
  if (extra !== undefined || !local || local.length > 64 || !domain) return null;
  if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/i.test(local) ||
      local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;
  const labels = domain.split(".");
  if (labels.length < 2 || !labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label))) {
    return null;
  }
  return local + "@" + domain.toLowerCase();
}

async function readBoundedJson(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const origin = request.headers.get("Origin");
    const headers = { Vary: "Origin" };
    if (pathname !== "/api/register") return json(404, { error: "not_found" }, headers);
    if (!origin || origin !== env.GALLERY_ORIGIN) return json(403, { error: "origin" }, headers);
    headers["Access-Control-Allow-Origin"] = origin;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...headers,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "600",
        },
      });
    }
    if (request.method !== "POST") {
      return json(405, { error: "method" }, { ...headers, Allow: "POST, OPTIONS" });
    }
    const contentType = request.headers.get("Content-Type")?.split(";")[0].trim();
    if (contentType?.toLowerCase() !== "application/json") {
      return json(415, { error: "content_type" }, headers);
    }

    try {
      const ip = request.headers.get("CF-Connecting-IP");
      if (!ip) return json(403, { error: "client" }, headers);
      const attempt = await env.REGISTRATION_LIMIT.limit({ key: ip });
      if (!attempt.success) return json(429, { error: "rate_limit" }, headers);

      const input = await readBoundedJson(request);
      const email = normalizeEmail(input?.email);
      if (!email || !ROUTES.has(input?.route)) return json(400, { error: "input" }, headers);

      const result = await env.REGISTRATIONS
        .prepare("INSERT INTO gallery_registrations (email, created_at) VALUES (?, ?) ON CONFLICT(email) DO NOTHING")
        .bind(email, new Date().toISOString())
        .run();
      if (!result.success) return json(503, { error: "unavailable" }, headers);
      return json(200, { registered: true }, headers);
    } catch {
      return json(503, { error: "unavailable" }, headers);
    }
  },

  async scheduled(_event, env) {
    const cutoff = new Date(Date.now() - EMAIL_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const result = await env.REGISTRATIONS
      .prepare("DELETE FROM gallery_registrations WHERE created_at < ?")
      .bind(cutoff)
      .run();
    if (!result.success) throw new Error("Gallery registration expiry failed");
  },
};
