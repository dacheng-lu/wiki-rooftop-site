import { collectEmail } from './contact.js'
import { renderListening } from './listening.js'

const routes = {
  A: { title: '按标题找证据', role: '资料核验员', description: '从展厅找到条目，挑出一条能追溯的来源与引文。' },
  B: { title: '先查再改一个字', role: '内容校对员', description: '对照展厅原标题，应用并验证一处可撤销的修正。' },
  C: { title: '同一句话，盲听两遍', role: '语音体验评估员', description: '先听同一句话的两个版本，再记录你的现场判断。' },
  D: { title: '让客户试一下原型', role: '原型引导员', description: '打开样例，说明交付边界，记录客户的下一步选择。' },
}

const stage = document.querySelector('#stage')
let session
let entriesPromise

function loadEntries() {
  if (!entriesPromise) {
    entriesPromise = fetch('../entries.json')
      .then(response => {
        if (!response.ok) throw new Error('Gallery data unavailable')
        return response.json()
      })
      .then(payload => {
        const entries = Array.isArray(payload) ? payload : payload?.entries
        if (!Array.isArray(entries)) throw new Error('Gallery data unavailable')
        return entries.filter(entry => typeof entry?.title === 'string')
      })
      .catch(error => {
        entriesPromise = undefined
        throw error
      })
  }
  return entriesPromise
}

function isCurrent(run) {
  return session === run
}

function focusHeading() {
  stage.querySelector('h1, h2')?.focus()
}

function home(moveFocus = true) {
  const cleanup = session?.cleanup
  session = undefined
  cleanup?.()
  stage.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">AI GALLERY · PRODUKTIV &amp; SICHER</p>
        <h1 tabindex="-1">客户一小时后到</h1>
        <p class="hero-copy">客户想要一个小搜索框，能搜图文和声音，打错字也能懂。一小时后就要演示。选一条路线，动手做一次，把结果和使用边界带进角色卡。</p>
      </div>
      <div class="clock" role="img" aria-label="场景设定：距离客户到场 60 分钟">
        <div class="clock-time" aria-hidden="true">60:00</div>
        <div class="clock-unit" aria-hidden="true">距客户到场</div>
      </div>
    </section>
    <section class="routes" aria-labelledby="routes-heading">
      <div class="routes-header">
        <h2 id="routes-heading">你先准备哪一项？</h2>
        <p class="subtle">四条路线可以反复体验，没有作答倒计时。</p>
      </div>
      <div class="route-grid">
        ${Object.entries(routes).map(([id, route]) => `
          <button class="route-choice" data-route="${id}" type="button">
            <span class="route-letter">${id}</span>
            <span><span class="route-title">${route.title}</span><span class="route-description">${route.description}</span></span>
            <span class="route-arrow" aria-hidden="true">↗</span>
          </button>`).join('')}
      </div>
    </section>`
  stage.querySelectorAll('[data-route]').forEach(button => {
    button.addEventListener('click', () => start(button.dataset.route))
  })
  if (moveFocus) focusHeading()
}

function start(id) {
  const route = routes[id]
  const run = { id, route, phase: 'activity' }
  session = run
  stage.innerHTML = `
    <div class="work">
      <button type="button" class="back" data-back>← 返回路线</button>
      <section class="panel">
        <p class="eyebrow">路线 ${id} / ${route.role}</p>
        <h1 class="panel-heading" tabindex="-1">${route.title}</h1>
        <div id="activity"></div>
      </section>
    </div>`
  stage.querySelector('[data-back]').addEventListener('click', () => home())
  focusHeading()
  const activity = stage.querySelector('#activity')
  const finish = evidence => finishActivity(run, evidence)
  if (id === 'A') renderSearch(activity, run, finish)
  if (id === 'B') renderCorrection(activity, run, finish)
  if (id === 'C') run.cleanup = renderListening(activity, finish)
  if (id === 'D') renderPrototype(activity, finish)
}

function normalizeTitle(title) {
  return title.normalize('NFKC').trim().toLocaleLowerCase()
}

function matchingTitles(entries, query) {
  const normalized = normalizeTitle(query)
  return normalized ? entries.filter(entry => normalizeTitle(entry.title).includes(normalized)) : []
}

function sourceLink({ source, lang }) {
  if (typeof source !== 'string' || !source.trim()) return undefined
  try {
    const url = new URL(source)
    return ['http:', 'https:'].includes(url.protocol) ? { href: url.href, label: '查看来源 ↗' } : undefined
  } catch {
    if (!['zh', 'en'].includes(lang)) return undefined
    return {
      href: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(source.trim().replaceAll(' ', '_'))}`,
      label: '打开对应维基百科条目 ↗'
    }
  }
}

function appendText(parent, tag, text, className) {
  const element = document.createElement(tag)
  element.textContent = text
  if (className) element.className = className
  parent.append(element)
  return element
}

function renderSearch(container, run, finish) {
  container.innerHTML = `
    <p>从真实展厅条目的标题开始。搜索后选取一条来源引文，带进你的角色卡。</p>
    <form>
      <label for="search-title">展厅标题</label>
      <div class="input-group">
        <input id="search-title" name="title" type="search" value="牦牛" required maxlength="100">
        <button class="button" type="submit">搜索标题</button>
      </div>
    </form>
    <p class="subtle result-summary" role="status"></p>
    <ul class="result-list"></ul>`
  const form = container.querySelector('form')
  const status = container.querySelector('[role=status]')
  const list = container.querySelector('ul')
  let revision = 0

  form.elements.title.addEventListener('input', () => {
    revision += 1
    list.replaceChildren()
    status.textContent = ''
  })
  form.addEventListener('submit', async event => {
    event.preventDefault()
    const term = form.elements.title.value.trim()
    if (!term) {
      status.textContent = '请输入一个标题或标题中的词。'
      return
    }
    const searchRevision = ++revision
    list.replaceChildren()
    status.textContent = '正在搜索展厅标题…'
    let entries
    try {
      entries = await loadEntries()
    } catch {
      if (isCurrent(run) && searchRevision === revision) status.textContent = '暂时无法读取展厅数据。请再试一次。'
      return
    }
    if (!isCurrent(run) || searchRevision !== revision) return
    const found = matchingTitles(entries, term)
    if (!found.length) {
      status.textContent = `没有找到包含「${term}」的标题。可以换一个词，例如「牦牛」。`
      return
    }
    status.textContent = `找到 ${found.length} 个标题。`
    for (const entry of found) {
      const result = appendText(list, 'li', '', 'result-card')
      appendText(result, 'h3', entry.title)
      const sourceName = typeof entry.source === 'string' ? entry.source.trim() : ''
      const source = sourceLink(entry)
      const claim = (Array.isArray(entry.claims) ? entry.claims : []).find(item => typeof item?.quote === 'string' && item.quote.trim())
      if (claim?.claim_zh || claim?.claim) appendText(result, 'p', claim.claim_zh || claim.claim, 'subtle')
      if (sourceName) appendText(result, 'p', `展厅所用来源：${sourceName}`, 'subtle')
      const quote = claim?.quote.trim().replace(/\s+/g, ' ')
      if (quote) appendText(result, 'blockquote', quote)
      if (source) {
        const link = appendText(result, 'a', source.label)
        link.href = source.href
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
      }
      if (sourceName && quote) {
        const actions = appendText(result, 'div', '', 'action-row')
        const choose = appendText(actions, 'button', '采用这条证据', 'button secondary')
        choose.type = 'button'
        choose.dataset.evidence = ''
        choose.addEventListener('click', () => finish({
          action: `搜索展厅标题，选择《${entry.title}》的来源引文。`,
          result: `展厅所用来源：${sourceName}\n“${quote}”${source && source.href !== sourceName ? `\n在线条目：${source.href}` : ''}`,
          limit: '标题匹配只说明找到了相关条目。给客户引用前还要回到原文核对上下文。'
        }))
      } else {
        appendText(result, 'p', '这个条目缺少可一起核对的来源和引文。', 'subtle')
      }
    }
  })
}

async function renderCorrection(container, run, finish) {
  container.innerHTML = '<p class="subtle" role="status">正在读取展厅原标题…</p>'
  let entries
  try {
    entries = await loadEntries()
  } catch {
    if (!isCurrent(run)) return
    container.innerHTML = '<p role="status" class="error">暂时无法读取展厅原标题。</p><button type="button" class="button secondary">重试</button>'
    container.querySelector('button').addEventListener('click', () => renderCorrection(container, run, finish))
    return
  }
  if (!isCurrent(run)) return

  const entry = entries.find(item => item.title === '牦牛') ?? entries.find(item => item.title.includes('牦牛')) ?? entries[0]
  if (!entry) {
    container.innerHTML = '<p role="status" class="error">展厅目前没有可对照的标题。</p>'
    return
  }
  const original = entry.title
  const hasYak = original.includes('牦牛')
  const draft = hasYak ? original.replace('牦牛', '毛牛') : `${original}。`
  const match = hasYak ? /牦牛/ : /$/
  const location = original.search(match)
  const beforeChange = hasYak ? '毛牛' : '。'
  const afterChange = hasYak ? '牦牛' : ''
  const prefix = original.slice(0, location)
  const suffix = original.slice(location + afterChange.length)
  container.innerHTML = `
    <p>待审草稿有一处笔误。对照原标题，把建议应用到本次查询，观察匹配结果。你也可以撤销修正。</p>
    <div class="edit-demo">
      <div class="result-card"><h3>当前查询</h3><p id="edit-draft"></p></div>
      <div class="result-card"><h3>展厅原标题</h3><p id="edit-original"></p></div>
    </div>
    <div class="notice" id="edit-change"></div>
    <p class="result-summary" id="edit-results" role="status"></p>
    <div class="action-row">
      <button class="button" type="button" data-apply>应用到查询</button>
      <button class="button secondary" type="button" data-undo disabled>撤销</button>
      <button class="button secondary" type="button" data-finish disabled>确认这个结果</button>
    </div>
  `
  const workingTitle = container.querySelector('#edit-draft')
  const change = container.querySelector('#edit-change')
  const results = container.querySelector('#edit-results')
  const apply = container.querySelector('[data-apply]')
  const undo = container.querySelector('[data-undo]')
  const confirm = container.querySelector('[data-finish]')
  container.querySelector('#edit-original').textContent = original
  change.append('建议改动：', prefix)
  appendText(change, 'del', beforeChange)
  if (afterChange) appendText(change, 'ins', afterChange)
  change.append(suffix)
  const beforeHits = matchingTitles(entries, draft)
  let afterHits = []
  let applied = false
  let undone = false
  function update(next) {
    applied = next
    workingTitle.textContent = next ? original : draft
    const hits = matchingTitles(entries, workingTitle.textContent)
    if (next) afterHits = hits
    const prefix = next ? '已应用。' : undone ? '已撤销。' : ''
    const titles = hits.map(hit => `《${hit.title}》`)
    results.textContent = `${prefix}标题搜索匹配 ${hits.length} 条${titles.length ? `：${titles.join('、')}` : '。'}`
    apply.disabled = next
    undo.disabled = !next
    confirm.disabled = !next
  }
  update(false)

  apply.addEventListener('click', () => {
    update(true)
    undo.focus()
  })
  undo.addEventListener('click', () => {
    undone = true
    update(false)
    apply.focus()
  })
  confirm.addEventListener('click', () => {
    if (!applied) return
    finish({
      action: undone ? '对照展厅原标题，应用校对建议，撤销后重新应用。' : '对照展厅原标题，把校对建议应用到本次标题查询。',
      result: `修改前：${draft}（${beforeHits.length} 条）\n修改后：${original}（${afterHits.length} 条）`,
      limit: '修正仅用于本轮查询，不会改动展厅资料。标题匹配不能验证正文里的事实。'
    })
  })
}

function renderPrototype(container, finish) {
  container.innerHTML = `
    <p>请客户点一下搜索按钮，看看图文和声音会怎样出现在同一个结果页。</p>
    <button class="button" type="button" aria-expanded="false" aria-controls="prototype-sample" data-prototype>
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="10.5" cy="10.5" r="6"></circle><path d="m15 15 5 5"></path>
      </svg>
      搜索样例
    </button>
    <div id="prototype-sample" hidden>
      <div class="result-card action-row">
        <div>
          <span class="prototype-label">预填示例原型</span>
          <h3 tabindex="-1">搜索结果示例</h3>
          <p>查询「毛牛」→ 建议「牦牛」</p>
          <ul>
            <li>图文结果：《牦牛》条目与来源引文</li>
            <li>声音结果：《牦牛》条目朗读</li>
          </ul>
          <p class="subtle">此页展示固定样例。它没有执行跨媒体检索、播放音频或接入客户数据。标题搜索、校对和盲听可以在其他路线分别体验。</p>
        </div>
      </div>
      <form>
        <fieldset>
          <legend>选一条示例客户反馈，带进角色卡。</legend>
          <label class="feedback-choice"><input name="preference" value="我想试搜另一个标题，看看图文和声音会不会一起更新。" type="radio" required> “我想试搜另一个标题，看看图文和声音会不会一起更新。”</label>
          <label class="feedback-choice"><input name="preference" value="我想看到标题改动前后各有多少条结果。" type="radio" required> “我想看到标题改动前后各有多少条结果。”</label>
          <label class="feedback-choice"><input name="preference" value="我想先确认每条结果的来源。" type="radio" required> “我想先确认每条结果的来源。”</label>
        </fieldset>
        <div class="action-row"><button class="button" type="submit" data-finish>记录这条反馈</button></div>
      </form>
    </div>`
  const preview = container.querySelector('#prototype-sample')
  const open = container.querySelector('[data-prototype]')
  open.addEventListener('click', () => {
    preview.hidden = false
    open.setAttribute('aria-expanded', 'true')
    open.hidden = true
    preview.querySelector('h3').focus()
  })
  container.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    const preference = event.currentTarget.elements.preference.value
    if (!preference) return
    finish({
      action: '点击搜索，查看「毛牛」→「牦牛」的预填图文与声音结果，并选择一条示例客户反馈。',
      result: `示例客户反馈：“${preference}”`,
      limit: '这是固定样例，未执行跨媒体搜索，也未接入客户数据。'
    })
  })
}

function finishActivity(run, evidence) {
  if (!isCurrent(run) || run.phase !== 'activity') return
  run.phase = 'register'
  run.cleanup?.()
  run.cleanup = undefined
  const work = stage.querySelector('.work')
  work.innerHTML = `
    <button type="button" class="back" data-replay>← 返回路线</button>
    <section class="panel">
      <p class="eyebrow">路线 ${run.id} / 体验完成</p>
      <h1 class="panel-heading" tabindex="-1">登记邮箱领取角色卡</h1>
      <p>角色卡会收录你本轮的操作、结果与使用边界。</p>
      <form>
        <label for="registration-email">邮箱</label>
        <div class="input-group">
          <input id="registration-email" name="email" type="email" maxlength="254" autocomplete="email" required aria-describedby="privacy-copy">
          <button class="button" type="submit">登记并领取</button>
        </div>
        <p id="privacy-copy" class="subtle">邮箱仅用于登记领取角色卡，保存 30 天。无需收邮件，也不会订阅邮件。</p>
        <p class="error status-line" role="status"></p>
      </form>
    </section>`
  work.querySelector('[data-replay]').addEventListener('click', () => home())
  const form = work.querySelector('form')
  const input = form.elements.email
  const button = form.querySelector('button')
  const status = form.querySelector('[role=status]')
  focusHeading()

  form.addEventListener('submit', async event => {
    event.preventDefault()
    if (!isCurrent(run) || run.phase !== 'register') return
    run.phase = 'pending'
    button.disabled = true
    input.readOnly = true
    status.textContent = '正在登记邮箱…'
    try {
      await collectEmail({ email: input.value.trim(), route: run.id })
    } catch (error) {
      if (!isCurrent(run)) return
      run.phase = 'register'
      button.disabled = false
      input.readOnly = false
      status.textContent = error.message || '邮箱登记未完成。请重试。'
      button.focus()
      return
    }
    if (!isCurrent(run)) return
    input.value = ''
    run.phase = 'complete'
    renderRoleCard(work, run, evidence)
  })
}

function renderRoleCard(work, run, evidence) {
  const fields = [
    ['我做了什么', evidence.action],
    ['我拿到了什么', evidence.result],
    ['给客户看之前要说明什么', evidence.limit],
  ]
  work.innerHTML = `
    <section class="panel role-card" id="role-card">
      <p class="eyebrow">路线 ${run.id} / 角色卡</p>
      <h1 class="panel-heading" tabindex="-1">${run.route.role}</h1>
      <dl></dl>
      <div class="action-row">
        <button class="button" type="button" data-copy>复制角色卡</button>
        <button class="button secondary" type="button" data-replay>再玩一条路线</button>
      </div>
      <p class="subtle status-line" role="status"></p>
      <div class="copy-fallback" hidden>
        <label for="card-copy">角色卡文本</label>
        <textarea id="card-copy" rows="6" readonly></textarea>
      </div>
    </section>`
  const details = work.querySelector('dl')
  for (const [label, value] of fields) {
    appendText(details, 'dt', label)
    appendText(details, 'dd', value)
  }
  work.querySelector('[data-replay]').addEventListener('click', () => home())
  work.querySelector('[data-copy]').addEventListener('click', async () => {
    const card = [`AI Gallery · ${run.route.role}`, ...fields.map(([label, value]) => `${label}\n${value}`)].join('\n\n')
    const status = work.querySelector('[role=status]')
    try {
      await navigator.clipboard.writeText(card)
      if (isCurrent(run)) status.textContent = '已复制角色卡。'
    } catch {
      if (!isCurrent(run)) return
      const fallback = work.querySelector('.copy-fallback')
      const textarea = fallback.querySelector('textarea')
      fallback.hidden = false
      textarea.value = card
      textarea.focus()
      textarea.select()
      status.textContent = '请复制选中的角色卡文本。'
    }
  })
  focusHeading()
}

home(false)
