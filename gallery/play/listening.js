const voiceDirectory = new URL('../voice/', import.meta.url);
const labels = ['A', 'B'];
const model = 'GPT-SoVITS v5 turbo';

function comparablePairs(entries) {
  const clips = new Map(entries
    .filter(entry => entry?.model === model && entry.lang === 'zh' && entry.shift === 0)
    .map(entry => [entry.audio, entry]));

  return [1, 2, 3].flatMap(number => {
    const stem = `audio/gsv-v5turbo_s${number}`;
    const original = clips.get(`${stem}.mp3`);
    const revised = clips.get(`${stem}_v2.mp3`);
    if (!original?.text?.trim() || original.text !== revised?.text ||
        original.sentence !== revised.sentence) return [];

    return [[
      { clip: original, version: 'v1' },
      { clip: revised, version: 'v2' },
    ]];
  });
}

function button(label, onClick, secondary = true) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = secondary ? 'button secondary' : 'button';
  element.textContent = label;
  element.addEventListener('click', onClick);
  return element;
}

export function renderListening(container, finish) {
  const lifetime = new AbortController();
  const players = [];

  function releaseAudio() {
    for (const player of players.splice(0)) {
      player.pause();
      player.removeAttribute('src');
      player.load();
    }
  }

  function cleanup() {
    lifetime.abort();
    releaseAudio();
  }

  const round = document.createElement('div');
  round.innerHTML = `
    <h2>同一句话，哪段听起来更自然？</h2>
    <p class="subtle">听完 A 和 B，再选你更喜欢的一段。两段差不多也可以选。选择只在这次体验里显示。</p>
    <p class="notice" role="status">正在加载盲听样本…</p>
  `;
  const status = round.querySelector('[role="status"]');
  const body = document.createElement('div');
  round.append(body);
  container.replaceChildren(round);

  async function loadRound() {
    status.textContent = '正在加载盲听样本…';
    body.replaceChildren();

    try {
      const response = await fetch(new URL('entries.json', voiceDirectory), { signal: lifetime.signal });
      if (!response.ok) throw new Error('Voice catalog unavailable');
      const { entries } = await response.json();
      if (lifetime.signal.aborted) return;
      const pairs = comparablePairs(entries);
      if (!pairs.length) throw new Error('No comparable samples available');

      const samples = pairs[Math.floor(Math.random() * pairs.length)];
      if (Math.random() < 0.5) samples.reverse();
      renderRound(samples);
    } catch {
      if (lifetime.signal.aborted) return;
      status.textContent = '暂时无法加载盲听样本。';
      body.replaceChildren(button('重新加载样本', loadRound));
    }
  }

  function renderRound(samples) {
    const quote = document.createElement('blockquote');
    quote.textContent = samples[0].clip.text;

    const playback = document.createElement('div');
    playback.className = 'action-row';

    const preferences = document.createElement('div');
    preferences.className = 'action-row';

    const heard = new Set();
    let currentPlayer;
    let chosen = false;
    const playerButtons = [];
    const updatePlayers = () => {
      playerButtons.forEach((control, index) => {
        const active = currentPlayer === players[index];
        control.textContent = active ? `暂停 ${labels[index]}`
          : heard.has(index) ? `重听 ${labels[index]}` : `播放 ${labels[index]}`;
      });
    };

    function choose(index) {
      if (chosen || heard.size !== samples.length) return;
      chosen = true;
      releaseAudio();
      const identities = samples.map(({ clip, version }, i) => `${labels[i]}：${clip.model} ${version}`);
      const preference = index === 2 ? '两段差不多' : `更喜欢 ${labels[index]}`;
      const title = document.createElement('h3');
      title.textContent = '样本揭晓';
      const identityList = document.createElement('ul');
      for (const identity of identities) {
        const item = document.createElement('li');
        item.textContent = identity;
        identityList.append(item);
      }
      const next = button('查看本轮记录', () => {
        finish({
          action: '在不知道版本的情况下，听完两段朗读同一句话的语音。',
          result: `你的选择是「${preference}」。${identities.join('；')}。`,
          limit: '这是一条个人听感，只对应这一句话和这两段录音。',
        });
      }, false);
      status.textContent = `你的选择是「${preference}」。`;
      body.replaceChildren(quote, title, identityList, next);
      next.focus();
    }

    ['更喜欢 A', '更喜欢 B', '两段差不多'].forEach((label, index) => {
      const control = button(label, () => choose(index));
      control.disabled = true;
      preferences.append(control);
    });

    samples.forEach(({ clip }, index) => {
      const player = new Audio();
      const source = new URL(clip.audio, voiceDirectory);
      player.preload = 'none';
      players.push(player);

      function playbackFailed() {
        if (currentPlayer !== player) return;
        currentPlayer = undefined;
        status.textContent = `${labels[index]} 播放失败，请再按一次播放。`;
        player.removeAttribute('src');
        player.load();
        updatePlayers();
      }

      player.addEventListener('ended', () => {
        if (currentPlayer !== player) return;
        currentPlayer = undefined;
        heard.add(index);
        updatePlayers();
        if (heard.size === samples.length) {
          for (const option of preferences.children) option.disabled = false;
          status.textContent = '已听完 A 和 B。请选择你的听感。';
        } else {
          status.textContent = `已听完 ${labels[index]}。接着听 ${labels[1 - index]}。`;
        }
      }, { signal: lifetime.signal });
      player.addEventListener('error', playbackFailed, { signal: lifetime.signal });

      const control = button(`播放 ${labels[index]}`, async () => {
        if (currentPlayer === player) {
          currentPlayer = undefined;
          player.pause();
          status.textContent = `已暂停 ${labels[index]}。`;
          updatePlayers();
          return;
        }

        currentPlayer?.pause();
        currentPlayer = player;
        status.textContent = `正在播放 ${labels[index]}…`;
        updatePlayers();
        if (!player.hasAttribute('src')) player.src = source;
        try {
          await player.play();
        } catch (error) {
          if (error.name !== 'AbortError') playbackFailed();
        }
      });
      playerButtons.push(control);
      playback.append(control);
    });

    status.textContent = '听完两段后即可选择。';
    body.replaceChildren(quote, playback, preferences);
  }

  loadRound();
  return cleanup;
}
