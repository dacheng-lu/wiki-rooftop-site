/* Wiki Rooftop — DOM controller. Depends on game-core.js. */
(function () {
  "use strict";

  var Core = window.WikiRooftopCore;
  var LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  var $ = function (id) { return document.getElementById(id); };

  var els = {
    screens: {
      start: $("screen-start"),
      play: $("screen-play"),
      summary: $("screen-summary"),
      error: $("screen-error")
    },
    packChip: $("pack-chip"),
    statEntries: $("stat-entries"),
    statChunks: $("stat-chunks"),
    loadStatus: $("load-status"),
    btnStart: $("btn-start"),
    btnNext: $("btn-next"),
    btnRestart: $("btn-restart"),
    btnTitle: $("btn-title"),
    btnRetry: $("btn-retry"),
    playTitle: $("play-title"),
    roundPips: $("round-pips"),
    roundLabel: $("round-label"),
    score: $("score"),
    health: $("health"),
    clue: $("clue"),
    slots: $("slots"),
    message: $("message"),
    keyboard: $("keyboard"),
    resultPanel: $("result-panel"),
    resultKicker: $("result-kicker"),
    resultTitle: $("result-title"),
    resultAnswer: $("result-answer-line"),
    sourceTitle: $("source-title"),
    sourceExcerpt: $("source-excerpt"),
    sourceAttribution: $("source-attribution"),
    summaryTitle: $("summary-title"),
    finalScore: $("final-score"),
    summaryLine: $("summary-line"),
    summaryList: $("summary-list"),
    errorDetail: $("error-detail")
  };

  var pack = null;
  var session = null;
  var screen = "start";
  var resultTimer = null;
  var keyButtons = [];
  var lastFocused = null;

  function setMessage(text, tone) {
    els.message.textContent = text;
    els.message.classList.remove("bad", "good");
    if (tone) els.message.classList.add(tone);
  }

  function buildKeyboard() {
    LETTERS.forEach(function (letter) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key";
      btn.dataset.letter = letter;
      btn.textContent = letter;
      btn.setAttribute("aria-label", "Guess letter " + letter);
      btn.addEventListener("click", function () { onGuess(letter); });
      els.keyboard.appendChild(btn);
      keyButtons.push(btn);
    });
  }

  function renderPips() {
    els.roundPips.textContent = "";
    for (var i = 0; i < session.entries.length; i++) {
      var pip = document.createElement("span");
      pip.className = "pip";
      if (i < session.roundIndex) pip.classList.add("done");
      if (i === session.roundIndex) pip.classList.add("now");
      els.roundPips.appendChild(pip);
    }
    els.roundPips.setAttribute("aria-label",
      "Round " + (session.roundIndex + 1) + " of " + session.entries.length);
  }

  function renderHealth() {
    els.health.textContent = "";
    for (var i = 0; i < Core.MAX_HEALTH; i++) {
      var bulb = document.createElement("span");
      bulb.className = "bulb" + (i < session.health ? "" : " spent");
      els.health.appendChild(bulb);
    }
    els.health.setAttribute("aria-label",
      session.health + " of " + Core.MAX_HEALTH + " lights burning");
  }

  function renderSlots(entry) {
    els.slots.textContent = "";
    els.slots.className = "slots len-" + entry.answer.length;
    for (var i = 0; i < entry.answer.length; i++) {
      var slot = document.createElement("div");
      slot.className = "slot" + (session.revealed[i] ? " revealed" : "");
      if (session.revealed[i]) slot.textContent = entry.answer[i];
      els.slots.appendChild(slot);
    }
    var shown = session.revealed.filter(Boolean).length;
    els.slots.setAttribute("aria-label",
      entry.answer.length + " letters, " + shown + " revealed");
  }

  function renderKeyboard(entry) {
    var guessed = session.guessed;
    var locked = session.phase !== "play";
    keyButtons.forEach(function (btn) {
      var letter = btn.dataset.letter;
      var isGuessed = guessed.indexOf(letter) !== -1;
      var isHit = isGuessed && entry.answer.indexOf(letter) !== -1;
      btn.classList.toggle("used", isGuessed);
      btn.classList.toggle("hit", isHit);
      btn.classList.toggle("miss", isGuessed && !isHit);
      btn.classList.toggle("locked", locked);
      btn.setAttribute("aria-disabled", locked ? "true" : "false");
    });
  }

  function renderSession(outcome, letter) {
    var entry = Core.currentEntry(session);
    els.roundLabel.textContent =
      String(session.roundIndex + 1).padStart(2, "0") + " / " +
      String(session.entries.length).padStart(2, "0");
    els.score.textContent = String(session.totalScore);
    renderPips();
    renderHealth();
    els.clue.textContent = entry.clue;
    renderSlots(entry);
    renderKeyboard(entry);

    if (!outcome) {
      setMessage("Choose a letter.");
    } else if (outcome === "repeat") {
      setMessage(letter + " was already guessed — no penalty.", "bad");
    } else if (outcome === "correct") {
      setMessage(letter + " is on the board.", "good");
    } else if (outcome === "wrong") {
      setMessage("No " + letter + ". " + session.health +
        (session.health === 1 ? " light" : " lights") + " left.", "bad");
    } else if (outcome === "won") {
      setMessage("Word recovered with " + session.health +
        (session.health === 1 ? " light" : " lights") + " left.", "good");
    } else if (outcome === "lost") {
      setMessage("The roof went dark.", "bad");
    }
  }

  function openResult() {
    var entry = Core.currentEntry(session);
    var won = session.lastOutcome === "won";
    var last = session.roundIndex + 1 >= session.entries.length;
    var result = session.results[session.results.length - 1];
    els.resultKicker.textContent = "Round " + (session.roundIndex + 1) +
      " complete · " + (won ? "+" + result.roundScore + " points" : "0 points");
    els.resultTitle.textContent = won ? "Word recovered." : "The lights went out.";
    els.resultAnswer.textContent = "";
    var label = document.createElement("span");
    label.textContent = "Answer: ";
    var strong = document.createElement("b");
    strong.textContent = entry.answer;
    els.resultAnswer.appendChild(label);
    els.resultAnswer.appendChild(strong);
    els.sourceTitle.textContent = entry.source_title;
    els.sourceExcerpt.textContent = "“" + entry.source_excerpt + "”";
    els.sourceAttribution.textContent = entry.attribution + " · " + entry.source_url;
    els.btnNext.textContent = last ? "See session summary" : "Next round";
    els.resultPanel.hidden = false;
    els.btnNext.focus({ preventScroll: true });
  }

  function closeResult() {
    if (resultTimer) { clearTimeout(resultTimer); resultTimer = null; }
    els.resultPanel.hidden = true;
  }

  function show(name) {
    Object.keys(els.screens).forEach(function (key) {
      els.screens[key].hidden = key !== name;
    });
    screen = name;
    document.documentElement.dataset.screen = name;
  }

  function startSession() {
    if (!pack) return;
    closeResult();
    session = Core.createSession(pack, { rounds: Core.ROUNDS });
    renderSession();
    show("play");
    els.playTitle.focus({ preventScroll: true });
  }

  function onGuess(letter) {
    if (!session || session.phase !== "play") return;
    var result = Core.guess(session, letter);
    session = result.state;
    renderSession(result.outcome, result.letter);
    if (result.outcome === "won" || result.outcome === "lost") {
      if (resultTimer) clearTimeout(resultTimer);
      resultTimer = setTimeout(function () {
        resultTimer = null;
        openResult();
      }, 430);
    }
  }

  function nextRound() {
    if (!session) return;
    closeResult();
    var result = Core.advance(session);
    session = result.state;
    if (result.outcome === "summary") {
      renderSummary();
      show("summary");
      els.btnRestart.focus({ preventScroll: true });
    } else if (result.outcome === "next") {
      renderSession();
      show("play");
      els.playTitle.focus({ preventScroll: true });
    }
  }

  function renderSummary() {
    var won = session.results.filter(function (r) { return r.won; }).length;
    var total = session.totalScore;
    var max = session.entries.length * Core.scoreFor(Core.MAX_HEALTH);
    els.finalScore.textContent = String(total);
    document.querySelector(".summary-max").textContent = " / " + max;
    els.summaryTitle.textContent = won === session.entries.length
      ? "The roof holds."
      : won >= 3 ? "The lights stay on." : "Dawn comes anyway.";
    els.summaryLine.textContent = won + " of " + session.entries.length +
      " words recovered" +
      (won === session.entries.length
        ? " — a clean sweep of the archive."
        : won > 0 ? " — a respectable haul for one night."
        : " — the archive keeps its secrets tonight.");
    els.summaryList.textContent = "";
    session.results.forEach(function (result, index) {
      var li = document.createElement("li");
      var round = document.createElement("span");
      round.className = "sum-round";
      round.textContent = "R" + String(index + 1).padStart(2, "0");
      var answer = document.createElement("span");
      answer.className = "sum-answer";
      answer.textContent = result.answer;
      var mark = document.createElement("span");
      mark.className = "sum-mark" + (result.won ? "" : " lost");
      mark.textContent = result.won ? "RECOVERED" : "LOST";
      var points = document.createElement("span");
      points.className = "sum-points";
      points.textContent = "+" + result.roundScore;
      li.appendChild(round);
      li.appendChild(answer);
      li.appendChild(mark);
      li.appendChild(points);
      els.summaryList.appendChild(li);
    });
  }

  function showError(error) {
    var text = error && error.message ? error.message : String(error);
    els.errorDetail.textContent = text;
    els.btnStart.disabled = true;
    els.loadStatus.textContent = "Content unavailable";
    els.packChip.textContent = "content error";
    document.documentElement.dataset.appState = "error";
    console.warn("[wiki-rooftop] content error:", text);
    show("error");
    els.btnRetry.focus({ preventScroll: true });
  }

  function boot() {
    document.documentElement.dataset.appState = "loading";
    els.btnStart.disabled = true;
    els.loadStatus.textContent = "Loading content…";
    els.packChip.textContent = "loading archive…";
    fetch("data/pack.json", { cache: "no-store", headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status + " while loading data/pack.json");
        }
        return response.text();
      })
      .then(function (text) {
        var data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          throw new Error("data/pack.json is not valid JSON: " + parseError.message);
        }
        var check = Core.validatePack(data);
        if (!check.ok) {
          throw new Error("Content pack failed validation:\n- " + check.errors.join("\n- "));
        }
        pack = data;
        els.statEntries.textContent = String(pack.entries.length) + " sourced";
        els.statChunks.textContent = String(pack.corpus.chunk_count);
        els.packChip.textContent = pack.entries.length + " entries · " +
          pack.corpus.chunk_count + " source chunks";
        els.loadStatus.textContent = pack.entries.length + " entries ready · every clue sourced";
        els.btnStart.disabled = false;
        document.documentElement.dataset.appState = "ready";
        show("start");
      })
      .catch(function (error) {
        showError(error);
      });
  }

  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (screen !== "play" || !session || session.phase !== "play") return;
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      onGuess(event.key);
    }
  });

  els.btnStart.addEventListener("click", startSession);
  els.btnNext.addEventListener("click", nextRound);
  els.btnRestart.addEventListener("click", startSession);
  els.btnTitle.addEventListener("click", function () {
    closeResult();
    session = null;
    show("start");
    els.btnStart.focus({ preventScroll: true });
  });
  els.btnRetry.addEventListener("click", boot);

  buildKeyboard();
  boot();

  window.__WR = {
    core: Core,
    pack: function () { return pack; },
    session: function () { return session ? JSON.parse(JSON.stringify(session)) : null; },
    screen: function () { return screen; },
    guess: onGuess,
    start: startSession,
    next: nextRound,
    boot: boot
  };
})();
