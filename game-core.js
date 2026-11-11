/*
 * Wiki Rooftop — pure game core.
 * No DOM, no network. Loaded as a plain script in the browser and required by
 * Node tests. All state transitions return new objects.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.WikiRooftopCore = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var MAX_HEALTH = 6;
  var ROUNDS = 5;
  var MIN_LEN = 3;
  var MAX_LEN = 16;
  var ANSWER_RE = /^[A-Z]{3,16}$/;

  function sha256Hex(input) {
    var bytes = new TextEncoder().encode(String(input));
    var len = bytes.length;
    var total = Math.ceil((len + 9) / 64) * 64;
    var buf = new Uint8Array(total);
    buf.set(bytes);
    buf[len] = 0x80;
    var view = new DataView(buf.buffer);
    var bitLen = len * 8;
    view.setUint32(total - 8, Math.floor(bitLen / 0x100000000), false);
    view.setUint32(total - 4, bitLen >>> 0, false);

    var K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var w = new Uint32Array(64);

    for (var off = 0; off < total; off += 64) {
      for (var i = 0; i < 16; i++) {
        w[i] = view.getUint32(off + i * 4, false);
      }
      for (i = 16; i < 64; i++) {
        var s0 = (w[i - 15] >>> 7 | w[i - 15] << 25) ^
                 (w[i - 15] >>> 18 | w[i - 15] << 14) ^ (w[i - 15] >>> 3);
        var s1 = (w[i - 2] >>> 17 | w[i - 2] << 15) ^
                 (w[i - 2] >>> 19 | w[i - 2] << 13) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3];
      var e = H[4], f = H[5], g = H[6], h = H[7];
      for (i = 0; i < 64; i++) {
        var S1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
        var S0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0;
        d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0;
      H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0;
      H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    return H.map(function (x) { return x.toString(16).padStart(8, "0"); }).join("");
  }

  function validatePack(pack) {
    var errors = [];
    if (!pack || typeof pack !== "object" || Array.isArray(pack)) {
      return { ok: false, errors: ["Content pack is not a JSON object."] };
    }
    if (pack.schema_version !== 1) errors.push("Unsupported pack schema_version.");
    if (!pack.pack_id || typeof pack.pack_id !== "string") errors.push("Missing pack_id.");
    if (!Array.isArray(pack.entries)) {
      return { ok: false, errors: errors.concat("Missing entries array.") };
    }
    if (pack.entries.length < ROUNDS) {
      errors.push("Pack needs at least " + ROUNDS + " entries; found " + pack.entries.length + ".");
    }
    var ids = Object.create(null);
    var answers = Object.create(null);
    var required = ["id", "answer", "clue", "article_id", "chunk_id", "source_excerpt",
                    "source_hash", "source_title", "source_url", "attribution"];
    pack.entries.forEach(function (entry, index) {
      var where = "entry " + (index + 1);
      if (!entry || typeof entry !== "object") {
        errors.push(where + " is not an object.");
        return;
      }
      required.forEach(function (field) {
        if (typeof entry[field] !== "string" || !entry[field].trim()) {
          errors.push(where + " is missing " + field + ".");
        }
      });
      if (typeof entry.answer === "string") {
        if (!ANSWER_RE.test(entry.answer)) {
          errors.push(where + " answer must be 3-16 uppercase ASCII letters.");
        } else {
          if (answers[entry.answer]) errors.push("Duplicate answer " + entry.answer + ".");
          answers[entry.answer] = true;
        }
      }
      if (entry.id) {
        if (ids[entry.id]) errors.push("Duplicate entry id " + entry.id + ".");
        ids[entry.id] = true;
      }
      if (typeof entry.clue === "string" && typeof entry.answer === "string" &&
          entry.clue.toLowerCase().indexOf(entry.answer.toLowerCase()) !== -1) {
        errors.push(where + " clue leaks its answer.");
      }
      if (typeof entry.source_excerpt === "string" && typeof entry.answer === "string" &&
          entry.source_excerpt.toLowerCase().indexOf(entry.answer.toLowerCase()) === -1) {
        errors.push(where + " source excerpt does not contain the answer.");
      }
      if (typeof entry.source_excerpt === "string" && typeof entry.source_hash === "string") {
        if (!/^[0-9a-f]{64}$/.test(entry.source_hash)) {
          errors.push(where + " source_hash is not a 64-char lowercase hex digest.");
        } else if (sha256Hex(entry.source_excerpt) !== entry.source_hash) {
          errors.push(where + " source_hash does not match its excerpt.");
        }
      }
    });
    return { ok: errors.length === 0, errors: errors };
  }

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(list, rng) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function scoreFor(health) {
    return 100 + 10 * health;
  }

  function createSession(pack, options) {
    options = options || {};
    var check = validatePack(pack);
    if (!check.ok) throw new Error("Invalid content pack: " + check.errors.join(" "));
    var count = options.rounds == null ? ROUNDS : options.rounds;
    if (!Number.isInteger(count) || count < 1 || count > pack.entries.length) {
      throw new Error("Invalid round count " + count + ".");
    }
    var seed = options.seed == null
      ? Math.floor(Math.random() * 0xFFFFFFFF)
      : (options.seed >>> 0);
    var picks = shuffled(pack.entries, mulberry32(seed)).slice(0, count);
    return {
      packId: pack.pack_id,
      seed: seed,
      entries: picks,
      roundIndex: 0,
      health: MAX_HEALTH,
      totalScore: 0,
      phase: "play",
      guessed: [],
      revealed: picks[0].answer.split("").map(function () { return false; }),
      results: [],
      lastOutcome: null
    };
  }

  function currentEntry(state) {
    return state.entries[state.roundIndex];
  }

  function isSolved(state) {
    return state.revealed.every(Boolean);
  }

  function guess(state, rawLetter) {
    if (!state || state.phase !== "play") {
      return { state: state, outcome: "ignored", letter: null };
    }
    var letter = String(rawLetter || "").toUpperCase();
    if (!/^[A-Z]$/.test(letter)) {
      return { state: state, outcome: "ignored", letter: null };
    }
    if (state.guessed.indexOf(letter) !== -1) {
      return { state: state, outcome: "repeat", letter: letter };
    }
    var answer = currentEntry(state).answer;
    var revealed = state.revealed.slice();
    var guessed = state.guessed.concat([letter]);
    var hit = false;
    for (var i = 0; i < answer.length; i++) {
      if (answer[i] === letter) { revealed[i] = true; hit = true; }
    }
    var next = Object.assign({}, state, {
      guessed: guessed,
      revealed: revealed,
      lastOutcome: hit ? "correct" : "wrong"
    });
    if (hit && revealed.every(Boolean)) {
      var roundScore = scoreFor(next.health);
      next.phase = "result";
      next.totalScore = next.totalScore + roundScore;
      next.lastOutcome = "won";
      next.results = next.results.concat([{
        entryId: currentEntry(state).id,
        answer: answer,
        won: true,
        healthLeft: next.health,
        roundScore: roundScore
      }]);
      return { state: next, outcome: "won", letter: letter };
    }
    if (!hit) {
      next.health = next.health - 1;
      if (next.health === 0) {
        next.phase = "result";
        next.lastOutcome = "lost";
        next.results = next.results.concat([{
          entryId: currentEntry(state).id,
          answer: answer,
          won: false,
          healthLeft: 0,
          roundScore: 0
        }]);
        return { state: next, outcome: "lost", letter: letter };
      }
      return { state: next, outcome: "wrong", letter: letter };
    }
    return { state: next, outcome: "correct", letter: letter };
  }

  function advance(state) {
    if (!state || state.phase !== "result") {
      return { state: state, outcome: "ignored" };
    }
    if (state.roundIndex + 1 >= state.entries.length) {
      var done = Object.assign({}, state, { phase: "summary" });
      return { state: done, outcome: "summary" };
    }
    var roundIndex = state.roundIndex + 1;
    var nextAnswer = state.entries[roundIndex].answer;
    var next = Object.assign({}, state, {
      roundIndex: roundIndex,
      health: MAX_HEALTH,
      phase: "play",
      guessed: [],
      revealed: nextAnswer.split("").map(function () { return false; }),
      lastOutcome: null
    });
    return { state: next, outcome: "next" };
  }

  function packStats(pack) {
    return {
      entries: pack && Array.isArray(pack.entries) ? pack.entries.length : 0,
      rounds: ROUNDS,
      maxHealth: MAX_HEALTH,
      maxScore: ROUNDS * scoreFor(MAX_HEALTH)
    };
  }

  return {
    MAX_HEALTH: MAX_HEALTH,
    ROUNDS: ROUNDS,
    MIN_LEN: MIN_LEN,
    MAX_LEN: MAX_LEN,
    sha256Hex: sha256Hex,
    validatePack: validatePack,
    createSession: createSession,
    currentEntry: currentEntry,
    isSolved: isSolved,
    guess: guess,
    advance: advance,
    scoreFor: scoreFor,
    packStats: packStats,
    _mulberry32: mulberry32
  };
});
