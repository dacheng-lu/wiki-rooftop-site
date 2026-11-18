/* Voice comparison: same three dimensions, one debounced POST per card. */
const API = "https://play-score.ludacheng199876.workers.dev";
const DIMS = [
  ["match", "像不像"],
  ["quality", "自然度"],
  ["translation", "干净度"],
];
const KEY = "play.voice.v1";
const state = JSON.parse(localStorage.getItem(KEY) || "{}");
const save = () => localStorage.setItem(KEY, JSON.stringify(state));

function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v; else n.setAttribute(k, v);
  }
  for (const k of kids) n.append(k instanceof Node ? k : document.createTextNode(k));
  return n;
}

function fmt(m) {
  if (!m) return "";
  const bits = [`${m.dur}s`];
  if (m.f0) bits.push(`F0 ${m.f0} Hz`);
  bits.push(`相似度 ${m.sim}`);
  bits.push(`噪声底 ${m.floor_db} dB`);
  return bits.join(" · ");
}

function card(e) {
  const art = el("article");
  const top = el("div", { class: "top" });
  const label = e.method === "ref" ? `参考音 −${e.shift} 半音`
    : e.method === "post" ? `后期 −${-e.pitch} 半音`
    : e.lang === "en" ? "English" : "原音";
  top.append(el("div", { class: "model" }, `${e.model} · ${e.sentence} · ${label}`));
  top.append(el("div", { class: "meta" }, fmt(e.metrics)));
  art.dataset.filter = `${e.lang} ${e.method === "ref" ? "ref" : "base"}`;
  art.append(top);
  art.append(el("div", { class: "text" }, e.text));

  const audio = el("audio", { controls: "", preload: "none", src: e.audio });
  art.append(audio);

  const score = el("div", { class: "score" });
  const chosen = { ...(state[e.id]?.dims || {}) };
  const status = el("div", { class: "status" });
  const avg = el("div", { class: "avg" });

  let timer = null, inflight = false;
  async function submit() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (inflight) return;
      inflight = true;
      status.className = "status"; status.textContent = "提交中…";
      try {
        const r = await fetch(`${API}/api/score`, {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ item: e.id, dims: chosen, nonce: e.nonce }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || r.status);
        state[e.id] = { dims: { ...chosen }, ts: Date.now() };
        save();
        status.className = "status ok"; status.textContent = "已记录";
        refresh();
      } catch (err) {
        status.className = "status err"; status.textContent = `未记录：${err.message}`;
      } finally { inflight = false; }
    }, 700);
  }

  for (const [key, label] of DIMS) {
    const row = el("div", { class: "row" });
    row.append(el("span", {}, label));
    const btns = el("div", { class: "btns" });
    for (let v = 1; v <= 5; v++) {
      const b = el("button", { type: "button", "aria-pressed": String(chosen[key] === v) }, String(v));
      b.addEventListener("click", () => {
        chosen[key] = v;
        [...btns.children].forEach((x) => x.setAttribute("aria-pressed", String(x.textContent === String(v))));
        submit();
      });
      btns.append(b);
    }
    row.append(btns);
    score.append(row);
  }
  score.append(status, avg);
  art.append(score);

  async function refresh() {
    try {
      const ids = e.legacy ? [e.id, e.legacy] : [e.id];
      const parts = await Promise.all(ids.map(async (id) => {
        const r = await fetch(`${API}/api/scores?item=${encodeURIComponent(id)}`);
        const j = await r.json();
        return j.items?.[id] || null;
      }));
      const rows = parts.filter(Boolean);
      if (!rows.length) return;
      const n = rows.reduce((s, a) => s + a.n, 0);
      const mean = (k) => (rows.reduce((s, a) => s + a[k] * a.n, 0) / n).toFixed(1);
      avg.textContent = `均分 ${mean("match")} / ${mean("quality")} / ${mean("translation")}（${n} 次）`;
    } catch { /* offline ok */ }
  }
  refresh();
  return art;
}

async function main() {
  const list = document.getElementById("list");
  let data;
  try {
    const r = await fetch("entries.json", { cache: "no-store" });
    data = await r.json();
  } catch {
    document.getElementById("foot").textContent = "还没有样本。";
    return;
  }
  // Only show what has not been rated yet: one fetch of all scores, then filter.
  let scored = new Set();
  try {
    const r = await fetch(`${API}/api/scores`, { cache: "no-store" });
    const j = await r.json();
    scored = new Set(Object.entries(j.items || {}).filter(([, v]) => v.n > 0).map(([k]) => k));
  } catch { /* offline: show everything */ }

  let shown = 0;
  for (const e of data.entries || []) {
    if (scored.has(e.id) || (e.legacy && scored.has(e.legacy))) continue;
    list.append(card(e));
    shown += 1;
  }
  if (!shown) {
    list.append(el("p", { class: "status" }, "全部已评分。想重听旧的，在下面切换。"));
  }

  const filters = document.getElementById("filters");
  filters?.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-filter]");
    if (!btn) return;
    const want = btn.dataset.filter;
    [...filters.querySelectorAll("button")].forEach((b) =>
      b.setAttribute("aria-pressed", String(b === btn)));
    for (const art of list.querySelectorAll("article")) {
      const tags = art.dataset.filter.split(" ");
      art.hidden = want !== "all" && !tags.includes(want);
    }
  });
  document.getElementById("foot").textContent =
    `${shown} 条待评 / 共 ${data.count} 条 · 生成于 ${data.built_at} · 参考录音只在本机`;
}

main();
