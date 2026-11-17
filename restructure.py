#!/usr/bin/env python3
"""Turn play.dev-lu.com into a hub: rooftop/ + games/triangle/, root = index."""
import re
import shutil
from pathlib import Path

SRC = Path.home() / "Projects/play-site"
GAME = Path("/home/dav/.hermes/cache/documents/doc_cbceb25dceb0__________________.html")

# 1. move the existing game into rooftop/
root_files = ["index.html", "styles.css", "app.js", "game-core.js", "favicon.svg", "data"]
roof = SRC / "rooftop"
roof.mkdir(exist_ok=True)
for f in root_files:
    src = SRC / f
    if not src.exists():
        continue
    dst = roof / f
    if dst.exists():
        shutil.rmtree(dst) if dst.is_dir() else dst.unlink()
    shutil.move(str(src), str(dst))

# 2. the card game: extract its inline script so the site CSP can stay strict
html = GAME.read_text(encoding="utf-8")
scripts = re.findall(r"<script>(.*?)</script>", html, flags=re.S)
tri = SRC / "games" / "triangle"
tri.mkdir(parents=True, exist_ok=True)
if scripts:
    (tri / "game.js").write_text("\n".join(scripts), encoding="utf-8")
    html = re.sub(r"<script>.*?</script>", '<script src="game.js"></script>', html, flags=re.S)
(tri / "index.html").write_text(html, encoding="utf-8")

# 3. root hub
hub = """<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Play — Dacheng Lu</title>
<meta name="description" content="Small games and daily experiments, generated and checked on a local machine.">
<link rel="icon" href="rooftop/favicon.svg" type="image/svg+xml">
<style>
:root{--bg:#0b1022;--card:#141a30;--line:#26304d;--text:#eef2ff;--muted:#9fb0cc;--gold:#d4af37}
*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(circle at 20% 0%,#182348 0,#0b1022 55%,#070b16 100%);color:var(--text);
 min-height:100vh;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
main{max-width:960px;margin:0 auto;padding:clamp(32px,7vw,88px) clamp(20px,5vw,40px)}
.kicker{font-size:11px;letter-spacing:.22em;color:var(--gold);text-transform:uppercase}
h1{font-size:clamp(30px,5vw,46px);margin:14px 0 10px;line-height:1.15;font-weight:650}
.lead{color:var(--muted);max-width:640px}
.grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:40px}
a.card{display:block;padding:22px;border:1px solid var(--line);border-radius:16px;background:var(--card);
 color:inherit;text-decoration:none;transition:transform .15s ease,border-color .15s ease}
a.card:hover,a.card:focus-visible{transform:translateY(-2px);border-color:var(--gold);outline:none}
.card small{color:var(--gold);font-size:11px;letter-spacing:.18em}
.card h2{font-size:20px;margin:8px 0 6px}
.card p{color:var(--muted);font-size:14px}
.soon{opacity:.55}
footer{margin-top:44px;color:var(--muted);font-size:13px}
footer a{color:var(--muted)}
</style>
</head>
<body>
<main>
  <div class="kicker">PLAY / 试验场</div>
  <h1>小游戏与每日实验</h1>
  <p class="lead">A 4B model and a 4&nbsp;GB GPU generate these; every image and translation is scored by a human click, and low scores are regenerated.</p>

  <div class="grid">
    <a class="card" href="rooftop/">
      <small>GAME / 01</small>
      <h2>Wiki Rooftop</h2>
      <p>Five rounds of word guessing. Every clue is traced to a Wikipedia excerpt.</p>
    </a>
    <a class="card" href="games/triangle/">
      <small>GAME / 02 · 中文</small>
      <h2>不可能的三角</h2>
      <p>自我分析卡牌游戏：把选择摊开，看你在三种价值之间如何取舍。</p>
    </a>
    <div class="card soon" aria-disabled="true">
      <small>GALLERY · COMING</small>
      <h2>每日图文</h2>
      <p>Daily entries with generated art and Chinese translation, click-to-score.</p>
    </div>
  </div>

  <footer><a href="https://dev-lu.com">dev-lu.com</a> · <a href="https://github.com/dacheng-lu">GitHub</a></footer>
</main>
</body>
</html>
"""
(SRC / "index.html").write_text(hub, encoding="utf-8")
print("restructured; rooftop files:", len(list(roof.iterdir())), "| triangle:", len(list(tri.iterdir())))
