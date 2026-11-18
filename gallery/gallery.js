/* Daily gallery: click-to-score, three dimensions, one POST per entry. */
const API = "https://play-score.ludacheng199876.workers.dev";
const DIMS = [
  ["match", "图文匹配"],
  ["quality", "图片质量"],
  ["translation", "中文表达"],
];
const KEY = "play.score.v1";

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

function card(e) {
  const art = el("article");
  const img = el("img", { src: e.image, alt: e.title, loading: "lazy" });
  const body = el("div", { class: "body" });
  body.append(el("h2", {}, e.title));

  const ol = el("ol");
  for (const c of e.claims) {
    const li = el("li");
    li.append(el("div", {}, c.claim_zh || c.claim));
    if (c.claim_zh) li.append(el("div", { style: "color:#8fa0bd;font-size:12.5px" }, c.claim));
    const det = el("details");
    det.append(el("summary", {}, "原文引用"));
    det.append(el("blockquote", {}, c.quote));
    li.append(det);
    ol.append(li);
  }
  body.append(ol);

  const score = el("div", { class: "score" });
  const chosen = { ...(state[e.id]?.dims || {}) };
  const status = el("div", { class: "status" });
  const avg = el("div", { class: "avg" });

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

  let timer = null;
  async function submit() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      status.className = "status";
      status.textContent = "提交中…";
      try {
        const r = await fetch(`${API}/api/score`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ item: e.id, dims: chosen, nonce: e.nonce }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || r.status);
        state[e.id] = { dims: { ...chosen }, ts: Date.now() };
        save();
        status.className = "status ok";
        status.textContent = "已记录";
        refreshAvg();
      } catch (err) {
        status.className = "status err";
        status.textContent = `未记录：${err.message}`;
      }
    }, 180);
  }

  async function refreshAvg() {
    try {
      const r = await fetch(`${API}/api/scores?item=${encodeURIComponent(e.id)}`);
      const j = await r.json();
      const a = j.items?.[e.id];
      if (a) avg.textContent = `均分 ${a.match} / ${a.quality} / ${a.translation}（${a.n} 人）`;
    } catch { /* offline is fine */ }
  }

  body.append(score);
  art.append(img, body);
  refreshAvg();
  return art;
}

async function main() {
  const grid = document.getElementById("grid");
  let data;
  try {
    const r = await fetch("entries.json", { cache: "no-store" });
    data = await r.json();
  } catch {
    document.getElementById("foot").textContent = "还没有条目（entries.json 未生成）。";
    return;
  }
  const entries = data.entries || [];
  for (const e of entries) grid.append(card(e));
  document.getElementById("foot").textContent =
    `${entries.length} 条 · 生成于 ${data.built_at || "—"} · 打分即刻写入 KV`;
}

main();
