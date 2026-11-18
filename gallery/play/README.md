# Gallery v2 · 客户一小时后到

Gallery 入口是 `/gallery/`，游戏位于 `/gallery/play/`。A 用真实标题和来源引文完成核验，B 在本地试用并撤销一条纠错规则，C 盲听同句音频，D 交付有明确边界的搜索原型。每条路线完成后，登记接口成功写入邮箱，页面才显示本轮角色卡。

## 本机试玩

在站点仓库根目录，使用 Node.js 24 或以上版本。

```sh
node workers/gallery-registration/preview.mjs
node --test tests/*.test.mjs
python3 tools/voice_manifest.py
```

浏览器打开 [Gallery v2 本地试玩](http://127.0.0.1:8099/gallery/play/)。登记走与生产相同的 Worker handler，写入一个本地 SQLite 数据库。使用 `player@example.test` 之类的测试邮箱。终端会打印数据库路径，如需重用文件，可通过 `GALLERY_DB_PATH` 指定。测试保留在本地。

## 接通生产邮箱登记

使用现有 Cloudflare 帐号和 Wrangler。在 `workers/gallery-registration/` 执行：

```sh
npx wrangler d1 create play-gallery-registration
```

把返回的 ID 写入 `wrangler.toml` 的 `database_id`，然后执行：

```sh
npx wrangler d1 migrations apply play-gallery-registration --remote
npx wrangler deploy
```

将实际 HTTPS Worker 地址加上 `/api/register`，写入 `gallery/play/registration-config.js`。生产 Worker 的浏览器来源限定为 `https://play.dev-lu.com`。在自定义来源测试时，同时调整 Worker 的 `GALLERY_ORIGIN`。部署路径若执行 CSP，允许已配置的登记端点作为游戏页的 `connect-src`。在合并到 GitHub Pages 的发布分支之前，用本地测试和专用测试邮箱检查一轮。

邮箱和登记时间存于单独的 D1 表。清理任务每天 03:17 UTC 运行，删除超过 30 天的活动记录。D1 的时间点恢复窗口另计，按生产账户的方案核对。[Cloudflare D1 恢复期限](https://developers.cloudflare.com/d1/platform/limits/)

接口支持安全重试，重复填写不会生成第二条记录。角色卡证据和盲听选择留在浏览器内存中。下一阶段若接入密码或会话，请在身份确认后再把此表的记录关联到用户。

## 声音评分与回退

两个英语参考音 v2 样本使用独立 ID。旧评分仍挂在原 ID 上，可能涵盖旧版合并历史。新样本可播放；在有权使用现有 `SCORE_SECRET` 的环境里运行下面的签名命令后，才开启这两个样本的公开评分。

```sh
python3 tools/voice_manifest.py --sign-pending
```

快速回退可从 `gallery/index.html` 移除新游戏入口。如需完整回退，可回退发布提交，现有 D1 数据仍按表的保留规则清理。
