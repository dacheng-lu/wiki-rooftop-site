import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import worker from "../workers/gallery-registration/worker.mjs";

const origin = "https://play.dev-lu.com";
const endpoint = "https://registration.example.test/api/register";
const migration = readFileSync(
  new URL("../workers/gallery-registration/migrations/0001_gallery_registrations.sql", import.meta.url),
  "utf8",
);

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "gallery-registration-test-"));
  const path = join(directory, "registrations.sqlite");
  const db = new DatabaseSync(path);
  db.exec(migration);
  t.after(() => {
    db.close();
    rmSync(directory, { recursive: true, force: true });
  });
  const env = {
    GALLERY_ORIGIN: origin,
    REGISTRATION_LIMIT: { limit: () => ({ success: true }) },
    REGISTRATIONS: {
      prepare(sql) {
        return { bind: (...parameters) => ({ run() {
          db.prepare(sql).run(...parameters);
          return { success: true };
        } }) };
      },
    },
  };
  return { env, db, path };
}

function post(env, value, extra = {}) {
  return worker.fetch(new Request(endpoint, {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "CF-Connecting-IP": "192.0.2.1",
      ...extra,
    },
    body: JSON.stringify(value),
  }), env);
}

test("acknowledges only after committing a minimal, durable registration; retries are idempotent", async t => {
  const { env, path } = fixture(t);
  for (const route of ["A", "C"]) {
    const res = await post(env, { email: " demo@EXAMPLE.TEST ", route, ignored: "metadata" });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("cache-control"), "no-store");
    assert.deepEqual(await res.json(), { registered: true });
  }
  const reader = new DatabaseSync(path, { readOnly: true });
  try {
    const rows = reader.prepare("SELECT * FROM gallery_registrations").all();
    assert.equal(rows.length, 1);
    assert.equal(rows[0].email, "demo@example.test");
    assert.ok(rows[0].created_at);
    assert.deepEqual(Object.keys(rows[0]), ["email", "created_at"]);
  } finally {
    reader.close();
  }
});

test("rejects unapproved origins, invalid input, oversized requests and limited clients", async t => {
  const { db, env } = fixture(t);
  const valid = { email: "demo@example.test", route: "B" };
  assert.equal((await post(env, valid, { Origin: "https://elsewhere.example" })).status, 403);
  assert.equal((await post(env, { ...valid, email: "not-an-email" })).status, 400);
  assert.equal((await post(env, { ...valid, route: "E" })).status, 400);
  assert.equal((await post(env, { ...valid, extra: "a".repeat(3000) })).status, 400);
  env.REGISTRATION_LIMIT.limit = () => ({ success: false });
  assert.equal((await post(env, valid)).status, 429);
  assert.equal(db.prepare("SELECT count(*) AS count FROM gallery_registrations").get().count, 0);
});

test("a failed write returns no registration acknowledgement", async t => {
  const { env } = fixture(t);
  env.REGISTRATIONS.prepare = () => { throw new Error("DB unavailable"); };
  const res = await post(env, { email: "demo@example.test", route: "D" });
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { error: "unavailable" });
});

test("allows the published origin to preflight and expires old email rows", async t => {
  const { db, env } = fixture(t);
  const preflight = await worker.fetch(new Request(endpoint, {
    method: "OPTIONS",
    headers: { Origin: origin, "Access-Control-Request-Method": "POST" },
  }), env);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), origin);
  db.prepare("INSERT INTO gallery_registrations VALUES (?, ?)").run("expired@example.test", "2000-01-01T00:00:00Z");
  await post(env, { email: "current@example.test", route: "D" });
  await worker.scheduled(null, env);
  const rows = db.prepare("SELECT email FROM gallery_registrations").all();
  assert.deepEqual(rows.map(row => row.email), ["current@example.test"]);
});
