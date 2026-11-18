import assert from "node:assert/strict";
import test from "node:test";
import { createScorePanel, loadScoreState, queueScore } from "../gallery/scoring.mjs";

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function queueFixture(t) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const sent = [];
  const saved = [];
  const status = [];
  const enqueue = queueScore({
    post(dims) {
      const request = deferred();
      sent.push({ dims, ...request });
      return request.promise;
    },
    acknowledge: (dims) => saved.push(dims),
    onStatus: (phase) => status.push(phase),
  });
  return { enqueue, sent, saved, status };
}

test("persists each acknowledged snapshot and sends the newest choice after an active request", async (t) => {
  const { enqueue, sent, saved, status } = queueFixture(t);
  const chosen = { match: 1 };
  enqueue(chosen);
  chosen.match = 2;
  enqueue(chosen);
  t.mock.timers.tick(700);
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].dims, { match: 2 });

  chosen.match = 4;
  enqueue(chosen);
  t.mock.timers.tick(700);
  assert.equal(sent.length, 1);
  assert.deepEqual(saved, []);

  chosen.match = 5;
  enqueue(chosen);
  sent[0].resolve();
  await Promise.resolve();
  assert.deepEqual(saved, [{ match: 2 }]);
  assert.equal(status.at(-1), "queued");
  assert.equal(sent.length, 1);
  t.mock.timers.tick(700);
  assert.deepEqual(sent[1].dims, { match: 5 });

  sent[1].resolve();
  await Promise.resolve();
  assert.deepEqual(saved, [{ match: 2 }, { match: 5 }]);
  assert.equal(status.at(-1), "saved");
});

test("a failed active request does not drop the latest queued score", async (t) => {
  const { enqueue, sent, saved, status } = queueFixture(t);
  enqueue({ quality: 1 });
  t.mock.timers.tick(700);
  enqueue({ quality: 5 });
  t.mock.timers.tick(700);
  sent[0].reject(new Error("offline"));
  await Promise.resolve();
  assert.deepEqual(saved, []);
  assert.deepEqual(sent[1].dims, { quality: 5 });
  assert.equal(status.at(-1), "sending");

  sent[1].resolve();
  await Promise.resolve();
  assert.deepEqual(saved, [{ quality: 5 }]);
  assert.equal(status.at(-1), "saved");
});

test("broken storage leaves scoring state usable", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() { throw new Error("blocked"); },
    });
    assert.deepEqual(Object.keys(loadScoreState("blocked")), []);
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: { getItem: () => "{" },
    });
    assert.deepEqual(Object.keys(loadScoreState("corrupt")), []);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "localStorage", descriptor);
    else delete globalThis.localStorage;
  }
});

test("average loads are lazy and share the same in-flight request", async (t) => {
  const observer = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    json: async () => ({ items: { shared: { match: 4, n: 1 } } }),
  }));
  let reportVisibility;
  globalThis.IntersectionObserver = class {
    constructor(callback) { reportVisibility = callback; }
    observe() {}
    unobserve() {}
  };
  t.after(() => { delete globalThis.IntersectionObserver; });

  function el(tag, attrs, ...children) {
    return {
      tag, attrs, children,
      addEventListener() {},
      append(...nodes) { this.children.push(...nodes); },
    };
  }

  const panel = createScorePanel({
    key: "test", dimensions: [["match", "Match"]], el, countLabel: "人",
  });
  const visible = panel({ id: "visible", legacy: "shared", nonce: "abc" });
  const otherVisible = panel({ id: "other", legacy: "shared", nonce: null });
  const offscreen = panel({ id: "offscreen", nonce: "abc" });
  assert.equal(otherVisible.children.at(-2).textContent, "此样本暂不能评分");
  assert.ok(otherVisible.children[0].children[1].children.every((button) => button.disabled));
  assert.equal(observer.mock.callCount(), 0);
  reportVisibility([
    { target: visible, isIntersecting: true },
    { target: otherVisible, isIntersecting: true },
    { target: offscreen, isIntersecting: false },
  ]);
  assert.deepEqual(observer.mock.calls.map((call) => new URL(call.arguments[0]).searchParams.get("item")),
    ["visible", "shared", "other"]);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(visible.children.at(-1).textContent, "均分 4.0（1 人）");
});
