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
  const label = e.pitch === 0 ? "原音" : `${e.pitch} 半音`;
  top.append(el("div", { class: "model" }, `${e.model} · ${e.sentence} · ${label}`));
  top.append(el("div", { class: "meta" }, fmt(e.metrics)));
  art.dataset.pitch = String(e.pitch);
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
      const r = await fetch(`${API}/api/scores?item=${encodeURIComponent(e.id)}`);
      const j = await r.json();
      const a = j.items?.[e.id];
      if (a) avg.textContent = `均分 ${a.match} / ${a.quality} / ${a.translation}（${a.n} 人）`;
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
  for (const e of data.entries || []) list.append(card(e));

  const filters = document.getElementById("filters");
  filters?.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-pitch]");
    if (!btn) return;
    const want = btn.dataset.pitch;
    [...filters.querySelectorAll("button")].forEach((b) =>
      b.setAttribute("aria-pressed", String(b === btn)));
    for (const art of list.querySelectorAll("article")) {
      art.hidden = want !== "all" && art.dataset.pitch !== want;
    }
  });
  document.getElementById("foot").textContent =
    `${data.count} 个样本 · 生成于 ${data.built_at} · 参考声音为同一段私人录音，未上传`;
}

main();
