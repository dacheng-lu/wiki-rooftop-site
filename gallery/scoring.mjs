const API = "https://play-score.ludacheng199876.workers.dev";

export function loadScoreState(key) {
  try {
    const scores = JSON.parse(globalThis.localStorage.getItem(key) || "{}");
    return Object.assign(Object.create(null), scores && typeof scores === "object" && !Array.isArray(scores) ? scores : {});
  } catch {
    return Object.create(null);
  }
}

export function queueScore({ post, acknowledge, onStatus, delay = 700 }) {
  let timer;
  let active = false;
  let pending;
  let ready = false;

  async function flush() {
    if (active || !ready) return;
    const snapshot = pending;
    pending = undefined;
    ready = false;
    active = true;
    onStatus("sending");
    try {
      await post(snapshot);
      acknowledge(snapshot);
      if (!pending) onStatus("saved");
    } catch (error) {
      if (!pending) onStatus("error", error);
    } finally {
      active = false;
      flush();
    }
  }

  return (dims) => {
    pending = { ...dims };
    ready = false;
    clearTimeout(timer);
    onStatus("queued");
    timer = setTimeout(() => {
      ready = true;
      flush();
    }, delay);
  };
}

export function createScorePanel({ key, dimensions, el, countLabel }) {
  const state = loadScoreState(key);
  const averages = new Map();
  const visible = new WeakMap();
  const observer = typeof IntersectionObserver === "function"
    ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        visible.get(entry.target)?.();
        visible.delete(entry.target);
      }
    }, { rootMargin: "150px" })
    : null;

  function average(id) {
    if (averages.has(id)) return averages.get(id);
    const request = fetch(`${API}/api/scores?item=${encodeURIComponent(id)}`)
      .then(async response => {
        if (!response.ok) throw new Error(response.status);
        return (await response.json()).items?.[id] ?? null;
      })
      .catch(() => {
        if (averages.get(id) === request) averages.delete(id);
        return null;
      });
    averages.set(id, request);
    return request;
  }

  return function scorePanel(item) {
    const panel = el("div", { class: "score" });
    const status = el("div", { class: "status", role: "status" });
    const avg = el("div", { class: "avg" });
    const chosen = { ...state[item.id]?.dims };
    const scoringEnabled = typeof item.nonce === "string" && item.nonce.length > 0;
    if (!scoringEnabled) status.textContent = "此样本暂不能评分";
    let refreshVersion = 0;
    const ids = item.legacy ? [...new Set([item.id, item.legacy])] : [item.id];

    async function refresh() {
      const version = ++refreshVersion;
      const rows = (await Promise.all(ids.map(average))).filter(row => row?.n > 0);
      if (version !== refreshVersion || !rows.length) return;
      const n = rows.reduce((sum, row) => sum + row.n, 0);
      const means = dimensions.map(([dim]) =>
        (rows.reduce((sum, row) => sum + row[dim] * row.n, 0) / n).toFixed(1));
      avg.textContent = `均分 ${means.join(" / ")}（${n} ${countLabel}）`;
    }

    const submit = queueScore({
      async post(dims) {
        const response = await fetch(`${API}/api/score`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ item: item.id, dims, nonce: item.nonce }),
        });
        const result = await response.json();
        if (!response.ok || result?.ok !== true) {
          throw new Error(result?.error || response.status);
        }
      },
      acknowledge(dims) {
        state[item.id] = { dims, ts: Date.now() };
        try {
          const saved = loadScoreState(key);
          saved[item.id] = state[item.id];
          globalThis.localStorage.setItem(key, JSON.stringify(saved));
        } catch {
          // A confirmed score remains recorded even when local storage is unavailable.
        }
        averages.delete(item.id);
        refresh();
      },
      onStatus(phase, error) {
        const messages = {
          queued: "待提交…",
          sending: "提交中…",
          saved: "已记录",
          error: `未记录：${error?.message ?? ""}`,
        };
        status.className = phase === "saved" ? "status ok"
          : phase === "error" ? "status err" : "status";
        status.textContent = messages[phase];
      },
    });

    for (const [dim, label] of dimensions) {
      const buttons = el("div", { class: "btns", role: "group", "aria-label": label });
      for (let value = 1; value <= 5; value++) {
        const button = el("button", {
          type: "button",
          "aria-pressed": String(chosen[dim] === value),
        }, String(value));
        button.disabled = !scoringEnabled;
        button.addEventListener("click", () => {
          chosen[dim] = value;
          for (const other of buttons.children) {
            other.setAttribute("aria-pressed", String(other === button));
          }
          submit(chosen);
        });
        buttons.append(button);
      }
      panel.append(el("div", { class: "row" }, el("span", {}, label), buttons));
    }
    panel.append(status, avg);
    if (observer) {
      visible.set(panel, refresh);
      observer.observe(panel);
    } else {
      panel.addEventListener("focusin", refresh, { once: true });
      panel.addEventListener("pointerenter", refresh, { once: true });
    }
    return panel;
  };
}
