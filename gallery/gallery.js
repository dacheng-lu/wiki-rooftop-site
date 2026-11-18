/* Daily gallery: click-to-score, three dimensions, one POST per entry. */
import { createScorePanel } from "./scoring.mjs";
const DIMS = [
  ["match", "图文匹配"],
  ["quality", "图片质量"],
  ["translation", "中文表达"],
];
const KEY = "play.score.v1";

const scorePanel = createScorePanel({ key: KEY, dimensions: DIMS, el, countLabel: "人" });

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
  const h2 = el("h2", {}, e.title);
  if (e.rev && e.rev > 1) h2.append(el("span", { class: "rev" }, `重做 v${e.rev}`));
  body.append(h2);

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

  body.append(scorePanel(e));
  art.append(img, body);
  return art;
}

async function main() {
  const grid = document.getElementById("grid");
  let data;
  try {
    const r = await fetch("entries.json", { cache: "no-store" });
    if (!r.ok) throw new Error(r.status);
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
