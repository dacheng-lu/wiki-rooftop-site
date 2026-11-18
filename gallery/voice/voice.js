/* Voice comparison: same three dimensions, one debounced POST per card. */
import { createScorePanel } from "../scoring.mjs";
const DIMS = [
  ["match", "像不像"],
  ["quality", "自然度"],
  ["translation", "干净度"],
];
const KEY = "play.voice.v1";
const scorePanel = createScorePanel({ key: KEY, dimensions: DIMS, el, countLabel: "次" });

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
    : e.method === "refv2" ? "参考音 v2"
    : e.method === "post" ? `后期 −${-e.pitch} 半音`
    : e.lang === "en" ? "English" : "原音";
  top.append(el("div", { class: "model" }, `${e.model} · ${e.sentence} · ${label}`));
  top.append(el("div", { class: "meta" }, fmt(e.metrics)));
  if (e.id === "voice-gsv-v5turbo-en1" || e.id === "voice-gsv-v5turbo-en2") {
    top.append(el("div", { class: "meta" }, "历史评分可能包含参考音 v2"));
  }
  art.dataset.filter = `${e.lang} ${e.method === "none" ? "base" : e.method}`;
  art.append(top);
  art.append(el("div", { class: "text" }, e.text));

  const audio = el("audio", { controls: "", preload: "none", src: e.audio });
  art.append(audio);

  art.append(scorePanel(e));
  return art;
}

async function main() {
  const list = document.getElementById("list");
  let data;
  try {
    const r = await fetch("entries.json", { cache: "no-store" });
    if (!r.ok) throw new Error(r.status);
    data = await r.json();
  } catch {
    document.getElementById("foot").textContent = "还没有样本。";
    return;
  }
  for (const e of data.entries || []) list.append(card(e));

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
    `${data.count} 个样本 · 生成于 ${data.built_at} · 声源 S.J. 的参考录音只在本机，未上传`;
}

main();
