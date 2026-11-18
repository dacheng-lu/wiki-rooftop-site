import { createServer } from "node:http";
import { Readable } from "node:stream";
import { createReadStream } from "node:fs";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { extname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { DatabaseSync } from "node:sqlite";
import worker from "./worker.mjs";

const host = "127.0.0.1";
const port = process.env.GALLERY_PORT || "8099";
const origin = "http://" + host + ":" + port;
const previewRoot = fileURLToPath(new URL("../../gallery/", import.meta.url));
const dbPath = process.env.GALLERY_DB_PATH ??
  join(await mkdtemp(join(tmpdir(), "play-gallery-")), "registration.sqlite");
const db = new DatabaseSync(dbPath);
db.exec(await readFile(new URL("./migrations/0001_gallery_registrations.sql", import.meta.url), "utf8"));

const env = {
  GALLERY_ORIGIN: origin,
  REGISTRATION_LIMIT: { limit: () => ({ success: true }) },
  REGISTRATIONS: {
    prepare(sql) {
      return {
        bind(...parameters) {
          return {
            run() {
              db.prepare(sql).run(...parameters);
              return { success: true };
            },
          };
        },
      };
    },
  },
};

await worker.scheduled(null, env);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, origin);
    if (url.pathname === "/gallery/play/api/register") {
      const headers = new Headers(req.headers);
      headers.set("CF-Connecting-IP", host);
      const request = new Request(origin + "/api/register", {
        method: req.method,
        headers,
        ...(req.method === "POST" ? { body: Readable.toWeb(req), duplex: "half" } : {}),
      });
      const result = await worker.fetch(request, env);
      res.writeHead(result.status, Object.fromEntries(result.headers));
      res.end(await result.text());
      return;
    }
    if (url.pathname === "/") {
      res.writeHead(302, { Location: "/gallery/" }).end();
      return;
    }
    if (!["GET", "HEAD"].includes(req.method) || !url.pathname.startsWith("/gallery/")) {
      res.writeHead(404).end();
      return;
    }
    const relative = decodeURIComponent(url.pathname.slice("/gallery/".length));
    const path = resolve(previewRoot, relative + (url.pathname.endsWith("/") ? "index.html" : ""));
    if (!path.startsWith(previewRoot) || !types[extname(path)]) {
      res.writeHead(404).end();
      return;
    }
    const file = await stat(path);
    if (!file.isFile()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "Content-Type": types[extname(path)], "Content-Length": file.size });
    if (req.method === "HEAD") res.end();
    else createReadStream(path).pipe(res);
  } catch (err) {
    res.writeHead(err.code === "ENOENT" ? 404 : 500).end();
  }
}).listen(Number(port), host, () => {
  console.log("Gallery preview: " + origin + "/gallery/play/");
  console.log("Local email database: " + dbPath);
});
