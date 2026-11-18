
    (function () {
      "use strict";

      /* =====================================================================
       * 1. 德 / 英 / 中 三语界面文案字典（第三维：Regeln / Orders / 守序）
       * ===================================================================== */
      const I18N = {
        zh: {
          pageTitle: "自我分析卡牌游戏 · 不可能的三角",
          brandTitle: "自我分析卡牌游戏 · 不可能的三角",
          cardV1: "I · 聪明",
          cardV2: "II · 努力",
          cardV3: "III · 守序",
          cardCaption: "不可能三角 · 灵魂观测牌",
          welcomeBadge: "✦ 心理学投射与人格光谱测试",
          welcomeHeading: "自我分析卡牌游戏：不可能的三角",
          welcomeP1: "世间流传着一条隐秘的人性法则：<strong>「聪明、努力、守序」</strong>构成了一个几乎不可能同时填满的三角定律——往往集齐两项，就会自然生长出第三项的反面：<strong>钝感（憨）、松弛（佛系）或 破序（桀骜不驯）</strong>。",
          welcomeP2: "接下来，你将进入 7 幕直觉情景。请凭第一感觉翻开属于你的命运卡牌，观测你的灵魂三角究竟向何处倾斜，抑或解锁传说中的「隐藏觉醒形态」。",
          dim1Title: "智慧 · 聪明",
          dim1Sub: "vs 钝感大智若愚",
          dim2Title: "行动 · 努力",
          dim2Sub: "vs 松弛节能主义",
          dim3Title: "法则 · 守序",
          dim3Sub: "vs 破序桀骜不羁",
          startBtn: "抽取命运之牌",
          startHint: "共 7 幕直觉抉择 · 约 60 秒",
          prevStep: "← 上一题",
          quizHint: "闭眼呼吸一秒，选择最贴近你本能反应的那张牌",
          cardSelectHint: "点击抽取此牌 ✦",
          cardChosenSub: "灵魂共鸣已记录",
          resHeading: "你的灵魂三角图谱已显影",
          resSubheading: "点击右侧「专属人格卡牌」可翻转查看潜意识背面吐槽",
          radarTitle: "不可能三角能量分布",
          radarSub: "三顶点平衡与反面特质偏移",
          svgVertexSmart: "聪明 · 智慧",
          svgVertexDiligent: "努力 · 行动",
          svgVertexObedient: "守序 · 法则",
          svgEdgeRebel: "低守序 → 破序/桀骜",
          svgEdgeLazy: "低努力 → 松弛/佛系",
          svgEdgeNaive: "低聪明 → 钝感/赤诚",
          barSmartLabel: "智慧值 (聪明度)",
          barDiligentLabel: "行动力 (努力度)",
          barObedientLabel: "秩序感 (守序度)",
          resPersonaLabel: "✦ 灵魂侧写 · Persona Analysis",
          resRxLabel: "✧ 今日灵魂处方",
          flipToBackHint: "点击卡牌任意处翻转查看「潜意识背面」",
          flipToBackBtn: "翻转牌面 ↻",
          shadowBadge: "潜意识暗面",
          shadowHeading: "「如果把你的内心独白翻译成大白话……」",
          strengthLabel: "▲ 隐藏天赋高光",
          blindspotLabel: "▼ 给自己的温柔提醒",
          shadowUnlocked: "已解锁潜意识全息档案",
          flipToFrontBtn: "翻回正面 ↺",
          btnFlip: "↻ 翻转潜意识背面",
          btnCopy: "✦ 一键复制测试结果",
          btnRestart: "重新占卜",
          footer: "自我分析卡牌游戏 · 灵感源于「不可能的三角定律」 · 愿你接纳每一面的自己",
          toastCopied: "✦ 已复制你的专属灵魂档案文案，快去分享吧！",
          formatShare: function (arch, s, d, o) {
            return "🔮 我在【自我分析卡牌游戏 · 不可能的三角】中抽到了：「" + arch.title + "」\n" +
              "✦ 判定公式：" + arch.formula + "\n" +
              "✦ 灵魂三维：聪明 " + s + "% | 努力 " + d + "% | 守序 " + o + "%\n" +
              "✦ 潜意识独白：" + arch.roast + "\n" +
              "你也来测测你的灵魂三角偏向哪一角吧！";
          }
        },
        en: {
          pageTitle: "Self-Analysis Tarot · The Impossible Triangle",
          brandTitle: "Self-Analysis Tarot · The Impossible Triangle",
          cardV1: "I · SMART",
          cardV2: "II · HARDWORKING",
          cardV3: "III · ORDERS",
          cardCaption: "The Impossible Triangle · Soul Arcana",
          welcomeBadge: "✦ Psychological Projection & Archetype Deck",
          welcomeHeading: "Self-Analysis Tarot: The Impossible Triangle",
          welcomeP1: "A quiet law governs human nature: <strong>\"Smart, Hardworking, and Orders\"</strong> form an Impossible Triangle. Mastering any two almost inevitably awakens the shadow of the third: <strong>Blissfully Candid, Strategically Chill, or Fiercely Untamed (Chaos)</strong>.",
          welcomeP2: "Step into 7 intuitive scenarios. Draw the card that speaks to your first instinct and watch your soul's triangle take shape—or unlock a rare hidden awakening beyond the three corners.",
          dim1Title: "Insight · Smart",
          dim1Sub: "vs Blissful Candor",
          dim2Title: "Drive · Hardworking",
          dim2Sub: "vs Strategic Chill",
          dim3Title: "Alignment · Orders",
          dim3Sub: "vs Untamed Chaos",
          startBtn: "Draw Destiny Cards",
          startHint: "7 Intuitive Chapters · ~60 Seconds",
          prevStep: "← Previous",
          quizHint: "Take a breath and choose the card that matches your raw instinct",
          cardSelectHint: "Tap to Draw Card ✦",
          cardChosenSub: "Soul Resonance Recorded",
          resHeading: "Your Soul Triangle Has Manifested",
          resSubheading: "Tap the Archetype Card on the right to flip and reveal its Subconscious Shadow",
          radarTitle: "Trilemma Energy Spectrum",
          radarSub: "Vertex balance & shadow tilt",
          svgVertexSmart: "Smart · Insight",
          svgVertexDiligent: "Hardworking · Drive",
          svgVertexObedient: "Orders · Alignment",
          svgEdgeRebel: "Low Orders → Chaos / Untamed",
          svgEdgeLazy: "Low Drive → Chill / Ease",
          svgEdgeNaive: "Low Cleverness → Candid",
          barSmartLabel: "Insight (Smart)",
          barDiligentLabel: "Drive (Hardworking)",
          barObedientLabel: "Alignment (Orders)",
          resPersonaLabel: "✦ Persona Analysis",
          resRxLabel: "✧ Oracle Prescription",
          flipToBackHint: "Tap anywhere on the card to flip to its Subconscious Side",
          flipToBackBtn: "Flip Card ↻",
          shadowBadge: "Subconscious Shadow",
          shadowHeading: "“If your inner monologue were translated unfiltered…”",
          strengthLabel: "▲ Hidden Gift Spotlight",
          blindspotLabel: "▼ A Gentle Reminder to Yourself",
          shadowUnlocked: "Holographic Shadow Dossier Unlocked",
          flipToFrontBtn: "Flip to Front ↺",
          btnFlip: "↻ Flip to Shadow Side",
          btnCopy: "✦ Copy Test Result",
          btnRestart: "Divinate Again",
          footer: "Self-Analysis Tarot Game · Inspired by The Impossible Triangle · Embrace every facet of your soul",
          toastCopied: "✦ Soul Archetype summary copied to clipboard!",
          formatShare: function (arch, s, d, o) {
            return "🔮 In [Self-Analysis Tarot: The Impossible Triangle], I drew: \"" + arch.title + "\"\n" +
              "✦ Formula: " + arch.formula + "\n" +
              "✦ Soul Triad: Smart " + s + "% | Hardworking " + d + "% | Orders " + o + "%\n" +
              "✦ Inner Monologue: " + arch.roast + "\n" +
              "Draw your cards and discover where your triangle leans!";
          }
        },
        de: {
          pageTitle: "Selbstanalyse-Tarot · Das Unmögliche Dreieck",
          brandTitle: "Selbstanalyse-Tarot · Das Unmögliche Dreieck",
          cardV1: "I · SCHLAU",
          cardV2: "II · FLEISSIG",
          cardV3: "III · REGELN",
          cardCaption: "Das Unmögliche Dreieck · Seelen-Arkana",
          welcomeBadge: "✦ Psychologische Projektion & Archetypen-Spiel",
          welcomeHeading: "Selbstanalyse-Tarot: Das Unmögliche Dreieck",
          welcomeP1: "Ein leises Gesetz bestimmt die menschliche Natur: <strong>„Schlau, Fleißig und Regeln“</strong> bilden ein Unmögliches Dreieck. Wer zwei Ecken meistert, weckt fast zwangsläufig den Schatten der dritten: <strong>Herrlich Arglos, Strategisch Entspannt oder Ungebunden (Chaos)</strong>.",
          welcomeP2: "Tritt ein in 7 intuitive Szenarien. Ziehe die Karte deines ersten Impulses und beobachte, wohin sich dein Seelendreieck neigt – oder schalte einen verborgenen Archetyp frei.",
          dim1Title: "Weitblick · Schlau",
          dim1Sub: "vs. entwaffnende Arglosigkeit",
          dim2Title: "Tatendrang · Fleißig",
          dim2Sub: "vs. entspannter Minimalismus",
          dim3Title: "Ordnung · Regeln",
          dim3Sub: "vs. ungebundener Eigensinn",
          startBtn: "Schicksalskarten ziehen",
          startHint: "7 Intuitive Kapitel · ca. 60 Sekunden",
          prevStep: "← Zurück",
          quizHint: "Atme kurz durch und wähle die Karte, die deinem ersten Instinkt entspricht",
          cardSelectHint: "Karte ziehen ✦",
          cardChosenSub: "Seelenresonanz gespeichert",
          resHeading: "Dein Seelendreieck hat sich offenbart",
          resSubheading: "Klicke auf die Archetyp-Karte rechts, um ihre unbewusste Rückseite zu enthüllen",
          radarTitle: "Energieverteilung des Trilemmas",
          radarSub: "Balance der Eckpunkte & Schattenneigung",
          svgVertexSmart: "Schlau · Weitblick",
          svgVertexDiligent: "Fleißig · Tatendrang",
          svgVertexObedient: "Regeln · Ordnung",
          svgEdgeRebel: "Wenig Regeln → Ungebunden",
          svgEdgeLazy: "Wenig Fleiß → Entspannt",
          svgEdgeNaive: "Wenig List → Arglos",
          barSmartLabel: "Scharfsinn (Schlau)",
          barDiligentLabel: "Tatendrang (Fleißig)",
          barObedientLabel: "Ordnungssinn (Regeln)",
          resPersonaLabel: "✦ Seelenporträt · Persona-Analyse",
          resRxLabel: "✧ Orakel-Empfehlung für heute",
          flipToBackHint: "Karte anklicken, um die „unbewusste Rückseite“ zu enthüllen",
          flipToBackBtn: "Karte wenden ↻",
          shadowBadge: "Unbewusster Schatten",
          shadowHeading: "„Wenn man deinen inneren Monolog ungeschminkt übersetzt…“",
          strengthLabel: "▲ Verborgene Gabe",
          blindspotLabel: "▼ Sanfte Erinnerung an dich selbst",
          shadowUnlocked: "Holografisches Schattenprofil entsperrt",
          flipToFrontBtn: "Vorderseite zeigen ↺",
          btnFlip: "↻ Schatten-Rückseite zeigen",
          btnCopy: "✦ Testergebnis kopieren",
          btnRestart: "Neu befragen",
          footer: "Selbstanalyse-Kartenspiel · Inspiriert vom Unmöglichen Dreieck · Umarme jede Facette deiner Seele",
          toastCopied: "✦ Dein Seelenprofil wurde in die Zwischenablage kopiert!",
          formatShare: function (arch, s, d, o) {
            return "🔮 Im [Selbstanalyse-Tarot: Das Unmögliche Dreieck] habe ich gezogen: „" + arch.title + "“\n" +
              "✦ Formel: " + arch.formula + "\n" +
              "✦ Seelenwerte: Schlau " + s + "% | Fleißig " + d + "% | Regeln " + o + "%\n" +
              "✦ Innerer Monolog: " + arch.roast + "\n" +
              "Ziehe deine Karten und finde heraus, wohin dein Dreieck neigt!";
          }
        }
      };

      /* =====================================================================
       * 2. 7幕沉浸式情景题库（每题3张塔罗选项牌）
       * ===================================================================== */
      const QUESTIONS = [
        {
          roman: "CHAPTER I",
          tag: { zh: "突发迷雾谜题", en: "Sudden Mist Puzzle", de: "Plötzliches Nebelrätsel" },
          title: {
            zh: "深夜接到一个规则模糊、时间紧迫的新任务，你的第一直觉反应是？",
            en: "Late at night, you receive an urgent task with vague guidelines. What is your very first instinct?",
            de: "Spät am Abend erhältst du eine dringende Aufgabe mit unklaren Vorgaben. Was ist dein allererster Instinkt?"
          },
          cards: [
            {
              symbol: "eye",
              arcana: { zh: "THE ALCHEMIST · 炼金术士", en: "THE ALCHEMIST", de: "DER ALCHEMIST" },
              title: {
                zh: "先拆解底层逻辑，找最短路径",
                en: "Decode the core logic and find the shortest path",
                de: "Die Kernlogik entschlüsseln und den kürzesten Weg finden"
              },
              sub: {
                zh: "“死干不如巧干，80%的流程其实都能省掉。”",
                en: "“Working smart beats grinding—80% of steps are optional.”",
                de: "„Klug arbeiten schlägt schuften – 80 % der Schritte sind Deko.“"
              },
              scores: { smart: 3, diligent: 0, obedient: 0 }
            },
            {
              symbol: "anvil",
              arcana: { zh: "THE CHARIOT · 战车", en: "THE CHARIOT", de: "DER WAGEN" },
              title: {
                zh: "二话不说先开干，用汗水填平不确定",
                en: "Dive right in and conquer uncertainty through sheer momentum",
                de: "Sofort loslegen und Unsicherheit mit purer Tatkraft bezwingen"
              },
              sub: {
                zh: "“只要我推进得够快，焦虑就追不上我。”",
                en: "“If I move fast enough, anxiety can never catch up with me.”",
                de: "„Solange ich schnell vorankomme, holt mich die Unruhe nicht ein.“"
              },
              scores: { smart: 0, diligent: 3, obedient: 1 }
            },
            {
              symbol: "compass",
              arcana: { zh: "THE HIEROPHANT · 教皇", en: "THE HIEROPHANT", de: "DER HIEROPHANT" },
              title: {
                zh: "先对齐规则边界与标准，按秩序稳妥推进",
                en: "Align the exact rules and structure first, then advance steadily",
                de: "Zuerst den Regelrahmen und die Maßstäbe klären, dann sauber starten"
              },
              sub: {
                zh: "“秩序明晰前不乱跑，按章法推进最安心。”",
                en: "“Never sprint before the structure is clear—order brings peace.”",
                de: "„Ohne klaren Rahmen rennt man nicht los – Ordnung gibt Halt.“"
              },
              scores: { smart: 1, diligent: 0, obedient: 3 }
            }
          ]
        },
        {
          roman: "CHAPTER II",
          tag: { zh: "规则与边界", en: "Rules & Boundaries", de: "Regeln & Grenzen" },
          title: {
            zh: "当你发现某条既定规则明显低效，甚至有点荒谬时，你会怎么做？",
            en: "When you notice an established rule is blatantly inefficient—or absurd—how do you react?",
            de: "Wenn du merkst, dass eine bestehende Regel offensichtlich ineffizient oder absurd ist – wie handelst du?"
          },
          cards: [
            {
              symbol: "key",
              arcana: { zh: "THE MAGICIAN · 魔术师", en: "THE MAGICIAN", de: "DER MAGIER" },
              title: {
                zh: "表面保持礼貌合规，私下用自己的高效解法绕过去",
                en: "Stay courteous on the surface, then quietly route around it with a clever shortcut",
                de: "Nach außen die Form wahren und sie heimlich mit einer klugen Abkürzung lösen"
              },
              sub: {
                zh: "“何必正面硬碰呢？结果漂亮不就行了。”",
                en: "“Why collide head-on when the final result speaks for itself?”",
                de: "„Wozu frontal anecken, wenn am Ende das Ergebnis glänzt?“"
              },
              scores: { smart: 3, diligent: 0, obedient: 1 }
            },
            {
              symbol: "sword",
              arcana: { zh: "THE EMPEROR · 皇帝", en: "THE EMPEROR", de: "DER HERRSCHER" },
              title: {
                zh: "直接打破旧框框，哪怕推翻重来也要建立新标准",
                en: "Break the outdated frame openly and build a sharper standard from scratch",
                de: "Den veralteten Rahmen offen sprengen und einen besseren Maßstab setzen"
              },
              sub: {
                zh: "“明知低效还照搬，我过不了自己这关。”",
                en: "“Following broken rituals is something my spirit refuses to accept.”",
                de: "„Überholten Ritualen zu folgen erlaubt mir mein innerer Kompass nicht.“"
              },
              scores: { smart: 2, diligent: 2, obedient: -1 }
            },
            {
              symbol: "shield",
              arcana: { zh: "JUSTICE · 正义", en: "JUSTICE", de: "GERECHTIGKEIT" },
              title: {
                zh: "尊重整体秩序与契约，先稳稳把守序的那一环做好",
                en: "Honor collective order and agreements, fulfilling your part reliably first",
                de: "Die gemeinsame Ordnung und Absprachen achten und den eigenen Part sauber erfüllen"
              },
              sub: {
                zh: "“规则之所以存在必有其缓冲作用，稳住大盘也是一种修养。”",
                en: "“Every system relies on steady anchors—keeping order is quiet mastery.”",
                de: "„Jedes System braucht verlässliche Anker – Ordnung zu wahren ist stille Stärke.“"
              },
              scores: { smart: 0, diligent: 1, obedient: 3 }
            }
          ]
        },
        {
          roman: "CHAPTER III",
          tag: { zh: "有限能量分配", en: "Finite Energy Allocation", de: "Begrenzte Energieverteilung" },
          title: {
            zh: "周末难得有一整天完全属于自己，你最享受哪种能量分配方式？",
            en: "You have a rare, completely free weekend day to yourself. How do you spend your finite energy?",
            de: "Ein seltener, völlig freier Tag gehört ganz dir allein. Wie verteilst du deine begrenzte Energie?"
          },
          cards: [
            {
              symbol: "moon",
              arcana: { zh: "THE HERMIT · 隐士", en: "THE HERMIT", de: "DER EREMIT" },
              title: {
                zh: "彻底断电躺平，在放空与白日梦里修复灵魂",
                en: "Unplug completely and restore your soul in guilt-free daydreaming",
                de: "Komplett abschalten und die Seele im entspannten Tagtraum regenerieren"
              },
              sub: {
                zh: "“电池充不满，凭什么要求我发光？”",
                en: "“If the battery isn't full, why expect me to shine?”",
                de: "„Wenn der Akku leer ist, warum sollte ich dann leuchten?“"
              },
              scores: { smart: 1, diligent: -1, obedient: 1 }
            },
            {
              symbol: "flame",
              arcana: { zh: "STRENGTH · 力量", en: "STRENGTH", de: "KRAFT" },
              title: {
                zh: "按计划健身、阅读或打磨技能，充实才踏实",
                en: "Follow a structured ritual of training, reading, or skill-building",
                de: "Einem klaren Plan aus Sport, Lektüre oder Weiterbildung folgen"
              },
              sub: {
                zh: "“自律给我平静，每一小时都算数。”",
                en: "“Discipline brings peace—every intentional hour counts.”",
                de: "„Disziplin schenkt Ruhe – jede sinnvoll genutzte Stunde zählt.“"
              },
              scores: { smart: 0, diligent: 3, obedient: 1 }
            },
            {
              symbol: "star",
              arcana: { zh: "THE FOOL · 愚者", en: "THE FOOL", de: "DER NARR" },
              title: {
                zh: "随心打破所有日程表，跟着突发奇想四处探索",
                en: "Toss out every schedule and follow a sudden whim into uncharted fun",
                de: "Jeden Zeitplan über Bord werfen und einer spontanen Eingebung folgen"
              },
              sub: {
                zh: "“没有规则的漫游，比按部就班好玩多了。”",
                en: "“Wandering without rules beats following any itinerary.”",
                de: "„Ohne feste Regeln zu streifen ist spannender als jeder Stundenplan.“"
              },
              scores: { smart: 3, diligent: 1, obedient: -1 }
            }
          ]
        },
        {
          roman: "CHAPTER IV",
          tag: { zh: "远方传来的指令", en: "The Mandate Arrives", de: "Die neue Vorgabe" },
          title: {
            zh: "协作方对你的方案提出了一个你并不认同的修改要求，你会？",
            en: "A partner proposes a revision to your plan that you fundamentally disagree with. You will…",
            de: "Ein Projektpartner verlangt eine Änderung an deinem Konzept, die du für falsch hältst. Du wirst…"
          },
          cards: [
            {
              symbol: "mirror",
              arcana: { zh: "THE LOVERS · 恋人", en: "THE LOVERS", de: "DIE LIEBENDEN" },
              title: {
                zh: "先接住对方的诉求框架，再巧妙把核心灵魂保留下来",
                en: "Honor their framework gracefully while subtly preserving your core vision",
                de: "Ihren Rahmen charmant aufgreifen und deinen Kern geschickt bewahren"
              },
              sub: {
                zh: "“秩序给足，内核不丢，成年人的高阶平衡术。”",
                en: "“Respect the form while keeping the soul of your idea intact.”",
                de: "„Die Form wahren und trotzdem die Essenz retten – hohe Kunst.“"
              },
              scores: { smart: 3, diligent: 1, obedient: 2 }
            },
            {
              symbol: "lightning",
              arcana: { zh: "THE TOWER · 高塔", en: "THE TOWER", de: "DER TURM" },
              title: {
                zh: "直截了当摆出逻辑与数据，绝不轻易妥协自己的判断",
                en: "Lay out clear logic and evidence, refusing to compromise your conviction",
                de: "Klare Logik und Belege auf den Tisch legen, ohne deine Haltung aufzugeben"
              },
              sub: {
                zh: "“宁可重立规矩，也不能糊里糊涂地妥协。”",
                en: "“Better to rewrite the rules than surrender my clarity.”",
                de: "„Lieber die Regeln neu schreiben, als gegen meine Klarheit einzuknicken.“"
              },
              scores: { smart: 2, diligent: 2, obedient: -1 }
            },
            {
              symbol: "scroll",
              arcana: { zh: "THE EMPRESS · 皇后", en: "THE EMPRESS", de: "DIE HERRSCHERIN" },
              title: {
                zh: "尊重既定流程与全局协同，认真按新版要求打磨到位",
                en: "Respect the shared workflow and refine the piece faithfully to spec",
                de: "Den gemeinsamen Ablauf achten und alles gründlich nach Vorgabe ausarbeiten"
              },
              sub: {
                zh: "“保持同频与守序，往往能让整体走得更稳。”",
                en: "“Staying aligned with the shared order keeps the whole vessel steady.”",
                de: "„Im Einklang mit der gemeinsamen Ordnung bleibt das ganze Schiff auf Kurs.“"
              },
              scores: { smart: 0, diligent: 2, obedient: 3 }
            }
          ]
        },
        {
          roman: "CHAPTER V",
          tag: { zh: "团队风暴危机", en: "Team Storm Crisis", de: "Team-Sturmkrise" },
          title: {
            zh: "团队项目突然爆发危机、众人陷入混乱时，你通常会扮演什么角色？",
            en: "When a team project erupts into sudden crisis and chaos, which role do you naturally step into?",
            de: "Wenn ein Teamprojekt plötzlich in Chaos und Krise gerät – welche Rolle übernimmst du automatisch?"
          },
          cards: [
            {
              symbol: "owl",
              arcana: { zh: "HIGH PRIESTESS · 女祭司", en: "HIGH PRIESTESS", de: "DIE HOHEPRIESTERIN" },
              title: {
                zh: "冷静抽离观察全局，用一句话精准点破症结",
                en: "Step back calmly, read the whole board, and pinpoint the root flaw",
                de: "Ruhig das Gesamtbild erfassen und den wunden Punkt präzise benennen"
              },
              sub: {
                zh: "“慌乱解决不了问题，看清卡点才能破局。”",
                en: "“Panic solves nothing; spotting the bottleneck breaks the storm.”",
                de: "„Panik löst nichts – erst der klare Blick durchbricht den Sturm.“"
              },
              scores: { smart: 3, diligent: 0, obedient: 1 }
            },
            {
              symbol: "pillar",
              arcana: { zh: "THE WORLD · 世界", en: "THE WORLD", de: "DIE WELT" },
              title: {
                zh: "立刻冲到一线扛起最重的工作，通宵也要补上漏洞",
                en: "Charge to the front line and carry the heaviest workload to patch the breach",
                de: "Sofort an die Front gehen und die schwerste Arbeit schultern"
              },
              sub: {
                zh: "“少说多做，我来兜底大家尽管放心。”",
                en: "“Less talk, more action—I will hold the line.”",
                de: "„Weniger reden, mehr anpacken – ich halte die Stellung.“"
              },
              scores: { smart: 0, diligent: 3, obedient: 2 }
            },
            {
              symbol: "dove",
              arcana: { zh: "TEMPERANCE · 节制", en: "TEMPERANCE", de: "MÄSSIGUNG" },
              title: {
                zh: "重建秩序与分工节奏，让每个人各归其位、稳住阵脚",
                en: "Restore order and clear roles so everyone regains rhythm and calm",
                de: "Ordnung und klare Rollen wiederherstellen, damit alle Ruhe und Takt finden"
              },
              sub: {
                zh: "“只要秩序还在、步调一致，风暴很快就会过去。”",
                en: "“When order and rhythm hold, any storm soon passes.”",
                de: "„Solange Ordnung und Gleichschritt halten, zieht jeder Sturm vorüber.“"
              },
              scores: { smart: 0, diligent: 0, obedient: 3 }
            }
          ]
        },
        {
          roman: "CHAPTER VI",
          tag: { zh: "午夜灵感降临", en: "Midnight Epiphany", de: "Mitternachtseingebung" },
          title: {
            zh: "凌晨一点脑海里突然蹦出一个绝妙却有点冒险的念头，你的反应是？",
            en: "At 1:00 AM, a brilliant yet risky idea flashes across your mind. How do you respond?",
            de: "Um ein Uhr nachts blitzt eine geniale, aber riskante Idee in deinem Kopf auf. Wie reagierst du?"
          },
          cards: [
            {
              symbol: "gear",
              arcana: { zh: "WHEEL OF FORTUNE · 命运之轮", en: "WHEEL OF FORTUNE", de: "RAD DES SCHICKSALS" },
              title: {
                zh: "快速推演可行性与投产比，记进备忘录明天挑最优解",
                en: "Simulate the payoff rapidly, jot it down, and pick the cleanest leverage tomorrow",
                de: "Kurz Aufwand und Nutzen durchrechnen, notieren und morgen klug umsetzen"
              },
              sub: {
                zh: "“灵感要配得上精密的算计才叫绝杀。”",
                en: "“Inspiration paired with sharp math becomes a masterpiece.”",
                de: "„Inspiration gepaart mit klugem Kalkül wird zum Meisterstück.“"
              },
              scores: { smart: 3, diligent: -1, obedient: 0 }
            },
            {
              symbol: "hourglass",
              arcana: { zh: "THE HANGED MAN · 倒吊人", en: "THE HANGED MAN", de: "DER GEHÄNGTE" },
              title: {
                zh: "立刻坐起来打草稿做原型，不把它落地今晚睡不着",
                en: "Sit up right away and build a prototype—you won't sleep until it's real",
                de: "Sofort aufstehen und einen Prototyp bauen – sonst findest du keinen Schlaf"
              },
              sub: {
                zh: "“想到就做到，行动力是灵感最好的翻译官。”",
                en: "“Execution is the truest translator of midnight magic.”",
                de: "„Umsetzung ist der treueste Übersetzer mitternächtlicher Magie.“"
              },
              scores: { smart: 1, diligent: 3, obedient: 0 }
            },
            {
              symbol: "feather",
              arcana: { zh: "THE SUN · 太阳", en: "THE SUN", de: "DIE SONNE" },
              title: {
                zh: "微笑着关灯睡觉，守护生物钟的节律与秩序才是头等大事",
                en: "Smile, turn off the lamp, and honor the sacred order of your sleep cycle",
                de: "Lächelnd das Licht löschen und die natürliche Ordnung des Schlafrhythmus wahren"
              },
              sub: {
                zh: "“天大的灵感也等我睡饱了再按规律推进。”",
                en: "“Even cosmic genius awaits the morning rhythm.”",
                de: "„Selbst kosmische Genialität wartet auf den Rhythmus des Morgens.“"
              },
              scores: { smart: 0, diligent: -1, obedient: 3 }
            }
          ]
        },
        {
          roman: "CHAPTER VII",
          tag: { zh: "最终镜像抉择", en: "Final Mirror Choice", de: "Letzte Spiegelwahl" },
          title: {
            zh: "命运之镜前摆着三件灵魂圣物，穿越迷雾森林时你只会带走哪一件？",
            en: "Before the Mirror of Destiny lie three soul relics. Which single one do you carry into the mist?",
            de: "Vor dem Spiegel des Schicksals liegen drei Seelenrelikte. Welches einzige nimmst du mit in den Nebel?"
          },
          cards: [
            {
              symbol: "crystal",
              arcana: { zh: "THE STAR · 全知水晶", en: "ALL-SEEING CRYSTAL", de: "ALLSEHENDER KRISTALL" },
              title: {
                zh: "能看穿一切迷障与捷径的「全知水晶球」",
                en: "The All-Seeing Crystal that reveals hidden shortcuts through any illusion",
                de: "Die Allsehende Kristallkugel, die geheime Abkürzungen durch jeden Nebel zeigt"
              },
              sub: {
                zh: "洞悉规律，以智取胜。",
                en: "Pierce the fog with clarity.",
                de: "Mit Weitblick den Nebel durchdringen."
              },
              scores: { smart: 3, diligent: 0, obedient: 0 }
            },
            {
              symbol: "boots",
              arcana: { zh: "THE CHARIOT · 恒毅之靴", en: "BOOTS OF PERSEVERANCE", de: "STIEFEL DER AUSDAUER" },
              title: {
                zh: "永不疲倦、翻山越岭的「恒毅之靴」",
                en: "The Tireless Boots that carry you across every mountain without faltering",
                de: "Die Unermüdlichen Stiefel, die dich über jeden Gipfel tragen"
              },
              sub: {
                zh: "步履不停，力破万难。",
                en: "Unstoppable stride, unbreakable will.",
                de: "Unaufhaltsamer Schritt, unbeugsamer Wille."
              },
              scores: { smart: 0, diligent: 3, obedient: 0 }
            },
            {
              symbol: "lantern",
              arcana: { zh: "THE MOON · 秩序星灯", en: "LANTERN OF ORDERS", de: "LATERNE DER REGELN" },
              title: {
                zh: "永远指向正北航道与安全边界的「秩序星灯」",
                en: "The Lantern of Orders that illuminates true bearings and safe boundaries",
                de: "Die Laterne der Regeln, die verlässliche Pfade und klare Grenzen weist"
              },
              sub: {
                zh: "循道而行，步步生辉。",
                en: "Walk in harmony with cosmic order.",
                de: "Im Einklang mit der Ordnung sicher voranschreiten."
              },
              scores: { smart: 0, diligent: 0, obedient: 3 }
            }
          ]
        }
      ];

      /* =====================================================================
       * 3. 五大人格原型库（同步融合 守序 / Regeln / Orders）
       * ===================================================================== */
      const ARCHETYPES = {
        SMART_OBEDIENT: {
          code: "I · III · MINIMALIST",
          sigil: "moon",
          zh: {
            formula: "聪明 + 守序 ＝ 佛系节能大师（低努力）",
            title: "灵性摸鱼大祭司",
            tags: ["#人间清醒", "#秩序玩家", "#情绪稳定", "#反内卷先锋"],
            desc: "你拥有极高的悟性与优雅的秩序感。你一眼就能看穿规则背后的最短路径，同时又懂得尊重边界、不制造无谓的摩擦。于是你练就了绝世神功：用 30% 的力气精准对齐 80% 的核心标准，剩下的时间用来享受生活与保护发际线。世人笑你有点“佛系”，其实你只是拒绝无意义的消耗。",
            prescription: "你的天赋在于“在秩序中四两拨千斤”。偶尔挑一件真正让你心动的小事倾注 100% 热情，你会惊艳所有人。",
            roast: "“只要我精准踩中所有规则节点、交付得又快又稳，就没人能发现我下午其实一直在带薪发呆。”",
            strength: "极强的洞察力与高情商秩序感，总能在最小阻力下达成目标，是团队里的稳压器。",
            blindspot: "容易因为太早看透规则与结局而失去折腾的热情，偶尔会陷入舒适区的温柔陷阱。"
          },
          en: {
            formula: "Smart + Orders = Strategic Minimalist (Low Grind)",
            title: "The Intuitive Minimalist",
            tags: ["#EffortlessGrace", "#SystemHacker", "#AntiBurnout", "#QuietGenius"],
            desc: "Blessed with razor-sharp intuition and a natural respect for structure, you spot the shortest path inside any system while gracefully avoiding unnecessary friction. You have mastered the art of meeting 80% of the standards with 30% of the exertion—saving the rest of your soul for peace and daydreaming. Others call it 'chill'; you call it energy conservation.",
            prescription: "Your gift is effortless leverage within clear structures. Pick just one passion project that sparks your curiosity and pour 100% into it—you will astonish everyone.",
            roast: "“As long as I hit every milestone cleanly and deliver ahead of schedule, nobody will ever notice I spent the afternoon daydreaming on the clock.”",
            strength: "Keen pattern recognition paired with smooth alignment; you achieve results with minimal friction.",
            blindspot: "Because you see the rules and the ending too early, you may lose the urge to strive and linger too long in cozy comfort zones."
          },
          de: {
            formula: "Schlau + Regeln = Strategischer Minimalist",
            title: "Der intuitive Minimalist",
            tags: ["#MüheloseEleganz", "#SystemVersteher", "#EnergieSparer", "#StillesGenie"],
            desc: "Mit messerscharfer Auffassungsgabe und einem feinen Gespür für Strukturen erkennst du sofort den kürzesten Weg innerhalb bestehender Regeln und meidest unnötige Reibung. Du beherrschst die Kunst, mit 30 % Aufwand 80 % der Standards zu erfüllen – und bewahrst deine Seele vor sinnlosem Ausbrennen. Andere nennen es ‚entspannt‘, du nennst es kluge Ökonomie.",
            prescription: "Deine Gabe ist der mühelose Hebel innerhalb klarer Strukturen. Such dir eine Herzenssache aus und stecke einmal 100 % Leidenschaft hinein – du wirst alle verblüffen.",
            roast: "„Solange ich alle Meilensteine sauber treffe und pünktlich liefere, merkt niemand, dass ich den Nachmittag entspannt geträumt habe.“",
            strength: "Scharfer Weitblick gepaart mit angenehmer Strukturtreue; ein Ruhepol in jedem Sturm.",
            blindspot: "Weil du das System und das Ende oft zu früh durchschaust, fehlt manchmal der Ehrgeiz, über die Komfortzone hinauszugehen."
          }
        },
        DILIGENT_OBEDIENT: {
          code: "II · III · GUARDIAN",
          sigil: "shield",
          zh: {
            formula: "努力 + 守序 ＝ 笃行守护骑士（低聪明）",
            title: "黄金麦田守望者",
            tags: ["#极致靠谱", "#秩序基石", "#大智若愚", "#安全感天花板"],
            desc: "你是这个浮躁世界里最稀缺的“定海神针”。你不屑于钻规则的空子，答应的事就一定会按章法拼尽全力做到最好。别人觉得你有时候太严谨、甚至有点“赤诚得可爱”，但只有真正共事过的人才明白，你的厚积薄发与契约精神，最终往往能走得比那些投机取巧远得多。",
            prescription: "在低头拉车、恪守章法的同时，每周留出半小时跳出框架看看路——允许自己偶尔打破一下常规，世界依然会为你运转。",
            roast: "“虽然不知道这套流程为什么要绕三圈，但既然定下了标准，我今晚就算熬夜也要把它打磨到完美！”",
            strength: "无与伦比的执行力、契约精神与信任度，一旦认准方向便能穿透时间周期。",
            blindspot: "容易把所有既定规则和期待全扛在自己肩上，有时用战术上的勤奋代替了对规则本身的质疑。"
          },
          en: {
            formula: "Hardworking + Orders = Devoted Anchor (Low Guile)",
            title: "The Golden Guardian",
            tags: ["#RockSolid", "#KeeperOfOrders", "#LongGame", "#QuietStrength"],
            desc: "You are the rarest anchor in a restless world. Refusing cheap loopholes, you pour sincere dedication and respect for structure into every promise you make. Some may mistake your candor for naivety, yet those who truly walk beside you know that your steady perseverance outlasts flashy cleverness every single time.",
            prescription: "While pulling the chariot forward within the lines, pause once a week to question the map—allow yourself an unscheduled detour; the sky won't fall.",
            roast: "“I have no idea why this workflow has twelve steps, but since that's the established order, I'll stay up tonight until every single one is spotless!”",
            strength: "Unmatched reliability, grit, and trustworthiness that carry projects across the finish line.",
            blindspot: "Tendency to shoulder every rule and expectation yourself, substituting tireless effort for stepping back to question outdated norms."
          },
          de: {
            formula: "Fleißig + Regeln = Treuer Hüter der Ordnung",
            title: "Der goldene Hüter",
            tags: ["#FelsInDerBrandung", "#Regeltreu", "#Ausdauer", "#StilleKraft"],
            desc: "Du bist der seltenste Anker in einer rastlosen Welt. Du verschmähst billige Schlupflöcher und legst aufrichtige Hingabe sowie Respekt vor klaren Regeln in jedes Versprechen. Manche halten deine Geradlinigkeit für arglos – doch wer wirklich mit dir arbeitet, weiß, dass deine Ausdauer jede bloße Spitzfindigkeit überdauert.",
            prescription: "Halte einmal pro Woche kurz inne, um den Plan selbst zu hinterfragen – gönn dir bewusst eine kleine Abweichung von der Routine.",
            roast: "„Keine Ahnung, warum dieser Ablauf zwölf Schritte hat, aber wenn das die Regel ist, mache ich heute Nacht jeden einzelnen perfekt!“",
            strength: "Unübertroffene Verlässlichkeit, Gewissenhaftigkeit und Ausdauer über lange Strecken.",
            blindspot: "Neigung, jede Vorgabe auf die eigenen Schultern zu laden und Fleiß über das Hinterfragen überholter Regeln zu stellen."
          }
        },
        SMART_DILIGENT: {
          code: "I · II · MAVERICK",
          sigil: "lightning",
          zh: {
            formula: "聪明 + 努力 ＝ 破序觉醒先锋（低守序）",
            title: "星辰逆行破局者",
            tags: ["#天生破壁人", "#规则重塑者", "#行动派天才", "#拒绝被定义"],
            desc: "你既有看穿规则漏洞的敏锐大脑，又有把想法死磕到底的恐怖执行力——唯一的“特质”就是你绝不盲从既定秩序。平庸的条条框框在你眼里全是束缚，你只服从自己内心的真理与更高的效率。你的“破序”，本质上是对平庸规则的降维打击。",
            prescription: "锋芒毕露时，试着用幽默和耐心为你的破局铺路；学会在必要时借力旧秩序，能让你的王冠戴得更稳。",
            roast: "“别拿旧条框来套我，这套规则漏洞多得像筛子，放着我来，明天直接给你看新世界。”",
            strength: "极强的破局能力与自驱力，在危机和无人区中往往能开疆拓土、一战封神。",
            blindspot: "对低效流程与条条框框缺乏耐心，容易因为“太直白、太爱打破常规”而无意间消耗额外精力。"
          },
          en: {
            formula: "Smart + Hardworking = Untamed Trailblazer (Chaos Edge)",
            title: "The Untamed Maverick",
            tags: ["#RuleBreaker", "#FiercelyIndependent", "#RelentlessMind", "#Unboxed"],
            desc: "You pair a piercing intellect that spots every flaw in the system with ferocious drive to build something better—with one glorious side effect: no rigid rulebook can cage you. Mediocre conventions bounce right off your armor; you answer only to truth and excellence. Your untamed spirit is simply zero tolerance for outdated structures.",
            prescription: "Wrap your sharp blade in a little humor and patience—learning to bridge old frameworks gently will make your crown sit even steadier.",
            roast: "“Please don't hand me an outdated manual—this rulebook has more holes than a sieve. Step aside and I'll build you a better reality tomorrow.”",
            strength: "Extraordinary breakthrough power and self-propulsion in uncharted territory or crisis.",
            blindspot: "Low patience for bureaucratic rituals and rigid conventions, which can spark avoidable friction."
          },
          de: {
            formula: "Schlau + Fleißig = Ungebundener Pionier",
            title: "Der ungezähmte Bahnbrecher",
            tags: ["#Regelbrecher", "#Unabhängig", "#TatkräftigesGenie", "#Unbeugsam"],
            desc: "Du verbindest einen scharfen Verstand, der jede Schwachstelle durchschaut, mit unbändigem Tatendrang – mit einer herrlichen Nebenwirkung: Kein starres Regelwerk kann dich einsperren. Mittelmäßige Konventionen prallen an dir ab; du folgst nur deiner eigenen Wahrheit. Dein Freiheitsdrang ist schlicht Null-Toleranz gegenüber veralteten Strukturen.",
            prescription: "Hülle deine scharfe Klinge gelegentlich in Humor und Geduld – wer Brücken zu bestehenden Strukturen baut, trägt seine Krone noch souveräner.",
            roast: "„Komm mir nicht mit veralteten Vorschriften – dieses Regelwerk hat mehr Löcher als ein Sieb. Lass mich machen, morgen steht die neue Lösung.“",
            strength: "Enorme Durchschlagskraft und Eigenantrieb auf unbekanntem Terrain.",
            blindspot: "Wenig Geduld für Bürokratie und starre Konventionen, was unnötige Reibung erzeugen kann."
          }
        },
        HEXAGON: {
          code: "IV · PARADOX · DRIFTER",
          sigil: "star",
          zh: {
            formula: "隐藏彩蛋 · 打破不可能三角定律",
            title: "六边形时空潜行者",
            tags: ["#全能变色龙", "#高阶掌控者", "#收放自如", "#隐藏SSR"],
            desc: "不可思议！你居然在“聪明、努力、守序”三个彼此牵制的维度上维持了惊人的高水准平衡。这并非因为你没有锋芒，而是你已经修炼出了高阶的“场景切换术”——该洞察时绝顶聪明，该冲锋时全力以赴，该守序时从容稳健。你不是被三角困住的人，你是驾驭三角的魔术师。",
            prescription: "全能往往意味着高耗能。记得定期卸下所有面具，允许自己在一个安全角落做回那个无拘无束的小孩。",
            roast: "“其实我心里门儿清，也能掀桌子重来，但我偏要微笑着在规则内把活干到极致，深藏功与名。”",
            strength: "极高的环境适应力与综合实力，无论在任何复杂局势下都能游刃有余。",
            blindspot: "因为太擅长扮演“完美掌控者”，有时连自己都快忘了内心最真实的任性渴望。"
          },
          en: {
            formula: "Hidden Arcana · Paradox Mastered",
            title: "The Dimensional Drifter",
            tags: ["#TriadMaster", "#ShapeShifter", "#PoisedPower", "#HiddenSSR"],
            desc: "Extraordinary! You have achieved a rare equilibrium across all three competing forces—Smart, Hardworking, and Orders. Not because you lack fire, but because you have mastered dimensional shifting: insightful when analyzing, relentless when executing, and graceful when honoring structure. You aren't trapped by the triangle; you pilot it.",
            prescription: "Versatility consumes high energy. Remember to take off every mask in a safe sanctuary and let your unedited, playful self breathe.",
            roast: "“I see every angle and could easily rewrite the rules, yet I choose to smile, master the game from within, and vanish into the mist.”",
            strength: "Remarkable adaptability and holistic mastery across complex social and strategic landscapes.",
            blindspot: "So skilled at playing the composed master that you occasionally forget what your own raw, unpolished heart wants."
          },
          de: {
            formula: "Verborgene Arkana · Paradoxon gemeistert",
            title: "Der dimensionale Wanderer",
            tags: ["#TrilemmaMeister", "#Wandlungsfähig", "#Souverän", "#HiddenSSR"],
            desc: "Unglaublich! Du hältst alle drei widerstreitenden Kräfte – Schlau, Fleißig und Regeln – in faszinierender Balance. Nicht aus Mangel an Temperament, sondern weil du die Kunst des Rollenwechsels beherrschst: scharfsinnig in der Analyse, unaufhaltsam in der Tat, souverän im Umgang mit Strukturen. Du lenkst das Dreieck.",
            prescription: "Allseitigkeit kostet Kraft. Lege regelmäßig alle Rollen ab und gönne dir einen geschützten Raum für dein ungezähmtes Ich.",
            roast: "„Ich durchschaue alles und könnte die Regeln sprengen – aber ich lächle lieber, meistere das Spiel von innen und verschwinde elegant.“",
            strength: "Außergewöhnliche Anpassungsfähigkeit und Souveränität in jeder komplexen Lage.",
            blindspot: "So geübt darin, den souveränen Meister zu spielen, dass eigene spontane Wünsche manchmal zu kurz kommen."
          }
        },
        CHAOS_FREE: {
          code: "0 · FOOL · LIBERTY",
          sigil: "feather",
          zh: {
            formula: "隐藏终极觉醒 · 跳出三界之外",
            title: "混沌宇宙自由人",
            tags: ["#精神状态超前", "#世俗免疫体", "#快乐至上", "#终极觉醒SSR"],
            desc: "恭喜解锁传说中的「第四种终极形态」！你不屑于卷聪明、不愿意瞎努力、更拒绝被任何既定规则定义。在世俗的绩效表之外，你拥有一套自洽的快乐宇宙：不内耗、不焦虑、不被任何标准绑架。你看似是一条晒太阳的咸鱼，实则是活得最通透的哲学家。",
            prescription: "保持这份珍贵的松弛感！如果哪天突然遇到一件让你眼睛发亮的事，不妨顺手玩一玩。",
            roast: "“算计太累，努力太苦，守规矩太束缚——我选择做一只晒太阳的快乐水豚，谢谢。”",
            strength: "顶级的心理防御力与反内耗体质，任何PUA和焦虑贩卖在你面前都会自动失效。",
            blindspot: "偶尔可能会因为过于随性而错过一些需要踮起脚尖才能摘到的风景。"
          },
          en: {
            formula: "Hidden Awakening · Beyond the Triangle",
            title: "The Cosmic Free Spirit",
            tags: ["#ZeroAnxiety", "#UnbotheredSage", "#PureLiberty", "#UltimateSSR"],
            desc: "Congratulations—you unlocked the legendary Fourth Awakening! You refuse to over-calculate, over-grind, or be boxed in by rigid orders. Outside conventional scorecards, you inhabit a self-sufficient universe of joy: immune to hustle anxiety and allergic to artificial rules. What looks like lounging is actually supreme philosophical clarity.",
            prescription: "Guard this rare lightness of being! Whenever something makes your eyes sparkle, play with it purely for the thrill.",
            roast: "“Overthinking is exhausting, grinding hurts, and rigid rules are a cage—I choose to be a sunlit capybara, thank you.”",
            strength: "Supreme emotional immunity against burnout, guilt-tripping, and manufactured urgency.",
            blindspot: "Occasionally so breezy that you might walk past a view worth reaching on tiptoe for."
          },
          de: {
            formula: "Verborgenes Erwachen · Jenseits des Dreiecks",
            title: "Der kosmische Freigeist",
            tags: ["#NullStress", "#Lebenskünstler", "#FreiheitPur", "#UltimateSSR"],
            desc: "Glückwunsch – du hast das legendäre vierte Erwachen freigeschaltet! Du verweigerst dich dem Über-Grübeln, dem blinden Schuften und starren Regeln. Jenseits gewöhnlicher Bewertungstabellen lebst du in deinem eigenen Kosmos der Gelassenheit: immun gegen Leistungsdruck und völlig frei.",
            prescription: "Bewahre dir diese kostbare Leichtigkeit! Und wenn dir etwas begegnet, das deine Augen zum Leuchten bringt, spiel einfach damit.",
            roast: "„Grübeln ist anstrengend, Schuften mühsam, starre Regeln ein Käfig – ich wähle das sonnenbadende Wasserschwein, danke.“",
            strength: "Unerschütterliche innere Gelassenheit und Immunität gegen künstliche Hektik.",
            blindspot: "Manchmal so entspannt, dass eine Aussicht verpasst wird, für die man sich kurz strecken müsste."
          }
        },
      STEADY_ORDER: {
          code: "II · IV · CRUISER",
          sigil: "hourglass",
          zh: {
            formula: "省力 + 守序 ＝ 静水巡航者",
            title: "静水巡航者",
            tags: ["#按部就班", "#不抢跑", "#稳定输出", "#情绪省电"],
            desc: "你不需要把每件事都做到最亮，但你会把该做的准时做完。你尊重流程，也懂得给自己留余地：不抢跑、不硬撑、不在无谓的地方消耗。别人以为你只是低调，其实你在用最低的摩擦走最长的路。",
            prescription: "偶尔主动揽一次「没人想做但重要」的活，你的稳定会第一次被人看见。",
            roast: "「不是我慢，是我把力气留在了真正要用的那一天。」",
            strength: "长期稳定的交付能力，几乎不会因为状态起伏而掉链子。",
            blindspot: "太习惯按既定节奏走，遇到需要临场改道的机会时容易慢半拍。"
          },
          en: {
            formula: "Low Burn + Order = Quiet Cruiser",
            title: "The Quiet Cruiser",
            tags: ["#Steady", "#NoSprint", "#Reliable", "#LowDrama"],
            desc: "You do not need every task to shine; you need it finished on time. You respect the process and you protect your own margins: no sprinting, no grinding, no spending energy where it buys nothing. People read it as modesty. It is the lowest-friction route through a long road.",
            prescription: "Take on one unglamorous task nobody wants. Your reliability will finally be visible.",
            roast: "“I am not slow. I am saving the effort for the day it matters.”",
            strength: "Consistent delivery that barely moves with your mood.",
            blindspot: "So used to the planned pace that a sudden change of course can catch you half a beat late."
          },
          de: {
            formula: "Wenig Aufwand + Ordnung = Ruhiger Kreuzer",
            title: "Der ruhige Kreuzer",
            tags: ["#Planmäßig", "#KeinSprint", "#Verlässlich", "#Nervenschonend"],
            desc: "Nicht jede Aufgabe muss glänzen, aber jede muss pünktlich fertig sein. Du respektierst Verfahren und schützt deine Reserven: kein Vorpreschen, kein Durchbeißen, keine Energie an Stellen, die nichts einbringen. Andere nennen es Bescheidenheit. Es ist der reibungsärmste Weg über eine lange Strecke.",
            prescription: "Übernimm einmal eine unspektakuläre, aber wichtige Aufgabe. Dann wird deine Verlässlichkeit sichtbar.",
            roast: "„Ich bin nicht langsam – ich hebe die Kraft für den Tag auf, an dem es zählt.“",
            strength: "Gleichmäßige Lieferung, die kaum mit der Stimmung schwankt.",
            blindspot: "So sehr im geplanten Takt, dass ein plötzlicher Kurswechsel dich einen halben Schritt zu spät erwischt."
          }
        },
      RULE_KEEPER: {
          code: "III · V · KEEPER",
          sigil: "pillar",
          zh: {
            formula: "老实 + 守序 ＝ 规矩守门人",
            title: "规矩守门人",
            tags: ["#说到做到", "#标准在线", "#不玩花活", "#可托付"],
            desc: "你不靠小聪明取胜，你靠「这事儿交给我就行」。规则对你不是束缚，而是让事情可预期的方式。你会把标准执行到位，把承诺兑现，把交接做干净——团队里最先被信任的往往是你，虽然掌声总落在别处。",
            prescription: "把「我一直这么做的」写下来说清楚，你的经验值得变成别人能复用的规则。",
            roast: "「我没什么天才想法，但你敢把关键的事交给我，这本身就是一种天才。」",
            strength: "极高的可托付度，交出去的事几乎不需要复查。",
            blindspot: "过分依赖既有标准，遇到规则本身失效时会先执行、后怀疑。"
          },
          en: {
            formula: "Honest + Order = Reliable Keeper",
            title: "The Reliable Keeper",
            tags: ["#KeepsWord", "#OnStandard", "#NoTricks", "#Trustworthy"],
            desc: "You do not win on cleverness; you win on “give it to me.” Rules are not a cage to you — they are how things stay predictable. You hold the standard, keep the promise, hand over clean work. You are usually the first person trusted and the last one applauded.",
            prescription: "Write down the “this is how I always do it” once. Your experience deserves to become a rule others can reuse.",
            roast: "“I have no genius ideas. But you hand me the thing that matters — that is its own kind of genius.”",
            strength: "Extremely high trustworthiness; handed work rarely needs re-checking.",
            blindspot: "Over-reliance on existing standards: when the rule itself is broken, you execute before you doubt."
          },
          de: {
            formula: "Ehrlich + Ordnung = Verlässlicher Hüter",
            title: "Der verlässliche Hüter",
            tags: ["#WortGehalten", "#NormTreue", "#KeineTricks", "#Vertrauenswürdig"],
            desc: "Du gewinnst nicht durch Cleverness, sondern durch „gib es mir“. Regeln sind für dich kein Käfig, sondern die Bedingung dafür, dass Dinge berechenbar bleiben. Du hältst den Standard, hältst das Versprechen, übergibst sauber. Man vertraut dir zuerst und klatscht dir zuletzt.",
            prescription: "Schreib das „so mache ich das immer“ einmal auf. Deine Erfahrung verdient, eine wiederverwendbare Regel zu werden.",
            roast: "„Ich habe keine genialen Ideen. Aber du gibst mir das Wichtige – das ist eine eigene Art von Genie.“",
            strength: "Sehr hohe Verlässlichkeit; übergebene Arbeit muss selten nachgeprüft werden.",
            blindspot: "Zu viel Vertrauen in bestehende Standards: Wenn die Regel selbst kaputt ist, führst du erst aus und zweifelst später."
          }
        },
      CHARGER: {
          code: "V · II · CHARGER",
          sigil: "anvil",
          zh: {
            formula: "肯干 + 敢破 ＝ 冲锋工匠",
            title: "冲锋工匠",
            tags: ["#先做再说", "#现场解决", "#不信流程", "#能扛事"],
            desc: "你不太买「必须先走完流程」的账。事情卡住时，你的第一反应是上手把它推开，而不是再开一次会。你愿意出力，也不怕承担责任，代价是有时会在规则上留下毛边——但你确实把东西做出来了，而且比大多数人快。",
            prescription: "每次硬闯之前，先花两分钟写一句「为什么必须绕开」，事后你会省下大量解释成本。",
            roast: "「流程是为了防止出错，可我要是等流程批下来，这事早就黄了。」",
            strength: "极强的推动力与现场解决能力，僵局里最需要的那个人。",
            blindspot: "习惯用蛮力越过规则，长期会在组织里积累看不见的摩擦。"
          },
          en: {
            formula: "Grit + Rule-Breaking = Front-Line Maker",
            title: "The Front-Line Maker",
            tags: ["#DoFirst", "#FixOnSite", "#NoProcess", "#CarriesWeight"],
            desc: "You do not buy the idea that every step must be approved first. When something is stuck, your instinct is to push it, not to schedule another meeting. You bring effort and you take responsibility; the price is rough edges around the rules. But the thing gets built, and faster than most.",
            prescription: "Before you force a shortcut, spend two minutes writing why it was necessary. You will save yourself a week of explaining.",
            roast: "“Process exists to prevent mistakes. If I wait for the approval, the whole thing is dead.”",
            strength: "Enormous drive and on-site problem solving; the person a deadlock needs.",
            blindspot: "Forcing past rules builds invisible friction across an organisation over time."
          },
          de: {
            formula: "Einsatz + Regelbruch = Macher an der Front",
            title: "Der Macher an der Front",
            tags: ["#ErstMachen", "#VorOrtLösen", "#KeinProzess", "#TrägtLast"],
            desc: "Du glaubst nicht, dass jeder Schritt zuerst genehmigt werden muss. Wenn etwas blockiert, schiebst du es an, statt ein weiteres Meeting anzusetzen. Du bringst Einsatz und übernimmst Verantwortung; der Preis sind raue Kanten an den Regeln. Aber das Ding wird gebaut – und schneller als bei den meisten.",
            prescription: "Bevor du eine Abkürzung erzwingst, schreib zwei Minuten auf, warum sie nötig war. Das spart dir später eine Woche Erklärungen.",
            roast: "„Prozesse verhindern Fehler. Wenn ich auf die Freigabe warte, ist die Sache längst tot.“",
            strength: "Enormer Antrieb und Problemlösung vor Ort; der Mensch, den eine Sackgasse braucht.",
            blindspot: "Regeln mit Kraft zu übergehen erzeugt über die Zeit unsichtbare Reibung im ganzen Umfeld."
          }
        },

      };

      /* =====================================================================
       * 4. 极简金色几何塔罗图腾 SVG 生成器
       * ===================================================================== */
      function getTotemSVG(type) {
        const map = {
          eye: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 24C11 14 17 10 24 10C31 10 37 14 42 24C37 34 31 38 24 38C17 38 11 34 6 24Z"/><circle cx="24" cy="24" r="6"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>',
          anvil: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="24,6 40,24 24,42 8,24"/><polygon points="24,14 32,24 24,34 16,24" fill="rgba(212,175,55,0.22)"/></svg>',
          compass: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="24" cy="24" r="17"/><polygon points="24,11 28,24 24,37 20,24" fill="rgba(212,175,55,0.25)"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/></svg>',
          key: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="17" cy="19" r="7"/><path d="M22 24L38 40M32 34L36 30M36 38L40 34"/></svg>',
          sword: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M24 6L28 30H20L24 6Z" fill="rgba(212,175,55,0.2)"/><path d="M15 30H33M24 30V41M20 41H28"/></svg>',
          shield: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M24 7L38 13V24C38 33 31.5 39.5 24 42C16.5 39.5 10 33 10 24V13L24 7Z"/><path d="M24 14V35"/></svg>',
          moon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M33 31A14 14 0 1 1 21 10A11 11 0 0 0 33 31Z" fill="rgba(212,175,55,0.2)"/></svg>',
          flame: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M24 7C24 7 36 18 36 28A12 12 0 0 1 12 28C12 22 16 17 19 14C19 19 22 21 22 21C22 15 24 7 24 7Z" fill="rgba(212,175,55,0.2)"/></svg>',
          star: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="24,6 28.5,18.5 42,20 31.5,28.5 34.5,41 24,34 13.5,41 16.5,28.5 6,20 19.5,18.5" fill="rgba(212,175,55,0.2)"/></svg>',
          owl: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="22" r="5"/><circle cx="30" cy="22" r="5"/><path d="M10 15L16 18M38 15L32 18M24 26L22 30L24 32L26 30L24 26Z"/><path d="M12 26C12 35 18 40 24 40C30 40 36 35 36 26"/></svg>',
          pillar: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 11H36M14 15H34M16 15V35M24 15V35M32 15V35M12 39H36"/></svg>',
          dove: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="24" cy="24" r="15"/><path d="M16 25L22 31L33 18"/></svg>',
          gear: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="24" cy="24" r="7"/><path d="M24 8V13M24 35V40M8 24H13M35 24H40M13 13L16.5 16.5M31.5 31.5L35 35M35 13L31.5 16.5M16.5 31.5L13 35"/></svg>',
          hourglass: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 9H34M14 39H34M16 9C16 18 24 22 24 24C24 26 16 30 16 39M32 9C32 18 24 22 24 24C24 26 32 30 32 39"/></svg>',
          feather: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M36 10C26 10 14 20 12 38C22 36 36 26 36 10Z"/><path d="M11 39L30 18"/></svg>',
          mirror: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="24" cy="20" rx="11" ry="14"/><path d="M24 34V43M19 43H29"/></svg>',
          lightning: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="27,6 12,26 23,26 20,42 36,21 25,21" fill="rgba(212,175,55,0.22)"/></svg>',
          scroll: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 10H32A4 4 0 0 1 36 14V34A4 4 0 0 1 32 38H14A4 4 0 0 1 10 34V14A4 4 0 0 1 14 10Z"/><path d="M18 18H28M18 24H28M18 30H24"/></svg>',
          crystal: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="24" cy="21" r="13" fill="rgba(212,175,55,0.16)"/><path d="M15 38H33L30 33H18L15 38Z"/></svg>',
          boots: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="24,7 39,36 9,36" fill="rgba(212,175,55,0.18)"/><circle cx="24" cy="25" r="4"/></svg>',
          lantern: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="16" y="15" width="16" height="20" rx="4" fill="rgba(212,175,55,0.18)"/><path d="M20 15V11H28V15M24 7V11M14 35H34"/></svg>'
        };
        return map[type] || map.star;
      }

      /* =====================================================================
       * 5. 游戏核心状态与交互控制器
       * ===================================================================== */
      const state = {
        lang: "zh",
        view: "welcome", // "welcome" | "quiz" | "result"
        step: 0,
        history: [], // 记录每一步选择的卡牌索引，支持返回上一题
        isFlipping: false,
        archetypeKey: null,
        percentages: { smart: 0, diligent: 0, obedient: 0 }
      };

      function getScoresFromHistory() {
        const totals = { smart: 0, diligent: 0, obedient: 0 };
        state.history.forEach(function (cardIdx, qIdx) {
          const card = QUESTIONS[qIdx].cards[cardIdx];
          if (card) {
            totals.smart += card.scores.smart;
            totals.diligent += card.scores.diligent;
            totals.obedient += card.scores.obedient;
          }
        });
        return totals;
      }

      function switchScreen(viewName) {
        state.view = viewName;
        ["welcome", "quiz", "result"].forEach(function (name) {
          const el = document.getElementById("screen-" + name);
          if (el) {
            el.classList.toggle("active", name === viewName);
          }
        });

        const pill = document.getElementById("top-progress-pill");
        if (pill) {
          pill.classList.toggle("active", viewName === "quiz");
        }
      }

      function setLanguage(lang) {
        if (!I18N[lang]) return;
        state.lang = lang;
        document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;

        document.querySelectorAll(".lang-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
        });

        updateStaticTexts();

        if (state.view === "quiz") {
          renderQuestion();
        } else if (state.view === "result" && state.archetypeKey) {
          renderResultTexts();
        }
      }

      function updateStaticTexts() {
        const t = I18N[state.lang];
        document.title = t.pageTitle;
        document.getElementById("ui-brand-title").textContent = t.brandTitle;
        document.getElementById("ui-card-v1").textContent = t.cardV1;
        document.getElementById("ui-card-v2").textContent = t.cardV2;
        document.getElementById("ui-card-v3").textContent = t.cardV3;
        document.getElementById("ui-card-caption").textContent = t.cardCaption;
        document.getElementById("ui-welcome-badge").textContent = t.welcomeBadge;
        document.getElementById("ui-welcome-heading").textContent = t.welcomeHeading;
        document.getElementById("ui-welcome-p1").innerHTML = t.welcomeP1;
        document.getElementById("ui-welcome-p2").textContent = t.welcomeP2;
        document.getElementById("ui-dim1-title").textContent = t.dim1Title;
        document.getElementById("ui-dim1-sub").textContent = t.dim1Sub;
        document.getElementById("ui-dim2-title").textContent = t.dim2Title;
        document.getElementById("ui-dim2-sub").textContent = t.dim2Sub;
        document.getElementById("ui-dim3-title").textContent = t.dim3Title;
        document.getElementById("ui-dim3-sub").textContent = t.dim3Sub;
        document.getElementById("ui-start-btn").textContent = t.startBtn;
        document.getElementById("ui-start-hint").textContent = t.startHint;

        document.getElementById("btn-prev-step").textContent = t.prevStep;
        document.getElementById("question-hint").textContent = t.quizHint;

        document.getElementById("ui-res-heading").textContent = t.resHeading;
        document.getElementById("ui-res-subheading").textContent = t.resSubheading;
        document.getElementById("ui-radar-title").textContent = t.radarTitle;
        document.getElementById("ui-radar-sub").textContent = t.radarSub;
        document.getElementById("svg-vertex-smart").textContent = t.svgVertexSmart;
        document.getElementById("svg-vertex-diligent").textContent = t.svgVertexDiligent;
        document.getElementById("svg-vertex-obedient").textContent = t.svgVertexObedient;
        document.getElementById("svg-edge-rebel").textContent = t.svgEdgeRebel;
        document.getElementById("svg-edge-lazy").textContent = t.svgEdgeLazy;
        document.getElementById("svg-edge-naive").textContent = t.svgEdgeNaive;
        document.getElementById("ui-bar-smart-label").textContent = t.barSmartLabel;
        document.getElementById("ui-bar-diligent-label").textContent = t.barDiligentLabel;
        document.getElementById("ui-bar-obedient-label").textContent = t.barObedientLabel;
        document.getElementById("ui-res-persona-label").textContent = t.resPersonaLabel;
        document.getElementById("ui-res-rx-label").textContent = t.resRxLabel;
        document.getElementById("ui-flip-to-back-hint").textContent = t.flipToBackHint;
        document.getElementById("ui-flip-to-back-btn").textContent = t.flipToBackBtn;
        document.getElementById("ui-shadow-badge").textContent = t.shadowBadge;
        document.getElementById("ui-shadow-heading").textContent = t.shadowHeading;
        document.getElementById("ui-strength-label").textContent = t.strengthLabel;
        document.getElementById("ui-blindspot-label").textContent = t.blindspotLabel;
        document.getElementById("ui-shadow-unlocked").textContent = t.shadowUnlocked;
        document.getElementById("ui-flip-to-front-btn").textContent = t.flipToFrontBtn;
        const dl = document.getElementById("btn-download-card");
        if (dl) dl.addEventListener("click", function (e) { e.stopPropagation(); downloadArchetypeCard(); });

        document.getElementById("btn-flip-toggle").textContent = t.btnFlip;
        document.getElementById("btn-copy-result").textContent = t.btnCopy;
        document.getElementById("btn-restart-game").textContent = t.btnRestart;
        document.getElementById("ui-footer").textContent = t.footer;
      }

      function startGame() {
        state.step = 0;
        state.history = [];
        state.isFlipping = false;
        state.archetypeKey = null;

        const resInner = document.getElementById("result-card-inner");
        if (resInner) resInner.classList.remove("is-flipped");

        switchScreen("quiz");
        renderQuestion();
      }

      function renderQuestion() {
        const q = QUESTIONS[state.step];
        const t = I18N[state.lang];
        const total = QUESTIONS.length;

        document.getElementById("top-step-num").textContent = String(state.step + 1);
        document.getElementById("question-roman").textContent = q.roman;
        document.getElementById("question-current").textContent = String(state.step + 1);
        document.getElementById("progress-fill").style.width = (((state.step + 1) / total) * 100) + "%";

        const prevBtn = document.getElementById("btn-prev-step");
        prevBtn.disabled = state.step === 0;

        document.getElementById("question-tag").textContent = q.tag[state.lang];
        document.getElementById("question-title").textContent = q.title[state.lang];

        const grid = document.getElementById("cards-grid");
        grid.innerHTML = "";
        const numerals = ["I", "II", "III"];

        q.cards.forEach(function (card, idx) {
          const wrapper = document.createElement("div");
          wrapper.className = "perspective-box";
          wrapper.setAttribute("role", "button");
          wrapper.setAttribute("tabindex", "0");

          wrapper.innerHTML =
            '<div class="card-3d-inner" id="choice-card-' + idx + '">' +
              '<div class="card-face front tarot-panel">' +
                '<div class="option-top-bar">' +
                  '<span>' + numerals[idx] + '</span>' +
                  '<span>✦</span>' +
                '</div>' +
                '<div>' +
                  '<div class="option-totem">' + getTotemSVG(card.symbol) + '</div>' +
                  '<div class="option-arcana">' + card.arcana[state.lang] + '</div>' +
                  '<h3 class="option-title">' + card.title[state.lang] + '</h3>' +
                  '<p class="option-sub">' + card.sub[state.lang] + '</p>' +
                '</div>' +
                '<div class="option-footer">' + t.cardSelectHint + '</div>' +
              '</div>' +
              '<div class="card-face back tarot-panel">' +
                '<div style="width:54px;height:54px;border-radius:50%;border:2px solid #f6e6b4;display:flex;align-items:center;justify-content:center;font-size:22px;color:#f6e6b4;margin-bottom:12px;">✦</div>' +
                '<div style="font-size:11px;letter-spacing:0.22em;color:#d4af37;margin-bottom:4px;">DESTINY CHOSEN</div>' +
                '<div style="font-size:15px;font-weight:700;color:#fff;">' + t.cardChosenSub + '</div>' +
              '</div>' +
            '</div>';

          wrapper.addEventListener("click", function () {
            handleCardPick(idx);
          });

          wrapper.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCardPick(idx);
            }
          });

          grid.appendChild(wrapper);
        });
      }

      function revealChoiceCard(cardIndex) {
        const card = QUESTIONS[state.step].cards[cardIndex];
        if (!card) return;
        const box = document.getElementById("card-preview");
        const img = document.getElementById("cp-img");
        if (!box || !img) return;
        img.src = "cards/" + card.symbol + ".png";
        img.alt = card.arcana[state.lang] || "";
        document.getElementById("cp-arcana").textContent = card.arcana[state.lang] || "";
        document.getElementById("cp-title").textContent = card.title[state.lang] || "";
        box.hidden = false;
        return box;
      }

      function handleCardPick(cardIndex) {
        if (state.isFlipping) return;
        // first click: show the card large, advance only after the reader dismisses it
        const box = revealChoiceCard(cardIndex);
        if (box) {
          const close = function () {
            box.hidden = true;
            box.removeEventListener("click", close);
            document.removeEventListener("keydown", onKey);
            advanceAfterPick(cardIndex);
          };
          const onKey = function (e) {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); close(); }
          };
          box.addEventListener("click", close);
          document.addEventListener("keydown", onKey);
          return;
        }
        advanceAfterPick(cardIndex);
      }

      function advanceAfterPick(cardIndex) {
        if (state.isFlipping) return;
        state.isFlipping = true;

        state.history[state.step] = cardIndex;

        const inner = document.getElementById("choice-card-" + cardIndex);
        if (inner) {
          inner.classList.add("is-flipped");
        }

        setTimeout(function () {
          state.step += 1;
          state.isFlipping = false;
          if (state.step < QUESTIONS.length) {
            renderQuestion();
          } else {
            revealResults();
          }
        }, 480);
      }

      function handlePrevStep() {
        if (state.isFlipping || state.step <= 0) return;
        state.step -= 1;
        state.history.pop();
        renderQuestion();
      }

      // Each dimension can score at most this much across the seven questions.
      // Percentages are taken against those maxima, not against 18 — the old
      // 24..96 scale made the HEXAGON threshold unreachable.
      const MAX_RAW = { smart: 21, diligent: 19, obedient: 20 };

      function normalizeScore(raw, dim) {
        const pct = (100 * raw) / MAX_RAW[dim];
        return Math.max(0, Math.min(100, Math.round(pct)));
      }

      function revealResults() {
        const rawScores = getScoresFromHistory();
        const s = normalizeScore(rawScores.smart, "smart");
        const d = normalizeScore(rawScores.diligent, "diligent");
        const o = normalizeScore(rawScores.obedient, "obedient");

        state.percentages = { smart: s, diligent: d, obedient: o };

        const level = (rawScores.smart + rawScores.diligent + rawScores.obedient) / 60;
        const spread = Math.max(s, d, o) - Math.min(s, d, o);

        // Eight archetypes, each reachable: balanced profiles split by level,
        // unbalanced ones by their weakest corner and by the runner-up axis.
        if (spread <= 20) {
          state.archetypeKey = (s + d + o) / 3 >= 40 ? "HEXAGON" : "CHAOS_FREE";
        } else if (d <= s && d <= o) {
          state.archetypeKey = s >= o ? "SMART_OBEDIENT" : "STEADY_ORDER";
        } else if (s <= d && s <= o) {
          state.archetypeKey = d >= o ? "DILIGENT_OBEDIENT" : "RULE_KEEPER";
        } else {
          state.archetypeKey = s >= d ? "SMART_DILIGENT" : "CHARGER";
        }

        switchScreen("result");
        renderResultTexts();

        requestAnimationFrame(function () {
          drawTriangleRadar(s, d, o);
        });
      }

      function renderResultTexts() {
        const arch = ARCHETYPES[state.archetypeKey];
        const loc = arch[state.lang];

        document.getElementById("res-code-badge").textContent = arch.code;
        document.getElementById("res-formula").textContent = loc.formula;
        document.getElementById("res-title").textContent = loc.title;
        document.getElementById("res-desc").textContent = loc.desc;
        document.getElementById("res-prescription").textContent = loc.prescription;
        document.getElementById("res-roast").textContent = loc.roast;
        document.getElementById("res-strength").textContent = loc.strength;
        document.getElementById("res-blindspot").textContent = loc.blindspot;
        document.getElementById("res-sigil").innerHTML = getTotemSVG(arch.sigil);

        const portrait = document.getElementById("res-portrait");
        if (portrait) {
          const file = state.archetypeKey.toLowerCase().replace(/_/g, "-");
          portrait.src = "img/" + file + ".png";
          portrait.alt = loc.title;
        }

        const tagsWrap = document.getElementById("res-tags");
        tagsWrap.innerHTML = loc.tags.map(function (tag) {
          return '<span class="res-tag-chip">' + tag + '</span>';
        }).join("");
      }

      function downloadArchetypeCard() {
        if (!state.archetypeKey) return;
        const arch = ARCHETYPES[state.archetypeKey];
        const loc = arch[state.lang];
        const W = 1080, H = 1350;
        const cv = document.createElement("canvas");
        cv.width = W; cv.height = H;
        const ctx = cv.getContext("2d");

        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, "#1b1440");
        bg.addColorStop(0.55, "#0d0a22");
        bg.addColorStop(1, "#05040f");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

        // faint star field, deterministic so every export matches
        ctx.fillStyle = "rgba(246,230,180,0.55)";
        let seed = 20261118;
        for (let i = 0; i < 160; i++) {
          seed = (seed * 1103515245 + 12345) & 0x7fffffff;
          const x = seed % W;
          seed = (seed * 1103515245 + 12345) & 0x7fffffff;
          const y = seed % H;
          const r = ((seed >> 8) % 3) * 0.5 + 0.5;
          ctx.globalAlpha = 0.25 + ((seed >> 4) % 40) / 100;
          ctx.fillRect(x, y, r, r);
        }
        ctx.globalAlpha = 1;

        // gold frame
        ctx.strokeStyle = "rgba(212,175,55,0.75)";
        ctx.lineWidth = 4;
        ctx.strokeRect(48, 48, W - 96, H - 96);
        ctx.strokeStyle = "rgba(246,230,180,0.25)";
        ctx.lineWidth = 1;
        ctx.strokeRect(66, 66, W - 132, H - 132);

        // portrait
        const img = new Image();
        img.onload = function () {
          const size = 460;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, (W - size) / 2, 120, size, size);
          ctx.strokeStyle = "rgba(212,175,55,0.6)";
          ctx.lineWidth = 3;
          ctx.strokeRect((W - size) / 2, 120, size, size);
          drawText();
        };
        img.src = "img/" + state.archetypeKey.toLowerCase().replace(/_/g, "-") + ".png";

        function drawText() {
          ctx.textAlign = "center";
          ctx.fillStyle = "#d4af37";
          ctx.font = "600 30px Georgia, 'Songti SC', serif";
          ctx.fillText(arch.code, W / 2, 650);

          ctx.fillStyle = "#f6e6b4";
          ctx.font = "700 68px Georgia, 'Songti SC', serif";
          wrap(loc.title, W / 2, 750, 860, 78);

          ctx.fillStyle = "#b9b3cc";
          ctx.font = "400 30px Georgia, 'Songti SC', serif";
          wrap(loc.formula, W / 2, 890, 820, 42);

          const tags = (loc.tags || []).join("   ");
          ctx.fillStyle = "#8f88ab";
          ctx.font = "400 26px Georgia, 'Songti SC', serif";
          ctx.fillText(tags, W / 2, 1010);

          ctx.fillStyle = "rgba(246,230,180,0.55)";
          ctx.font = "400 24px Georgia, serif";
          ctx.fillText("play.dev-lu.com/games/triangle", W / 2, 1240);

          const a = document.createElement("a");
          a.download = "archetype-" + state.archetypeKey.toLowerCase().replace(/_/g, "-") + ".png";
          a.href = cv.toDataURL("image/png");
          a.click();
        }

        function wrap(text, cx, y, maxW, lh) {
          const chars = String(text).split("");
          let line = "", lines = [];
          for (const ch of chars) {
            if (ctx.measureText(line + ch).width > maxW && line) { lines.push(line); line = ch; }
            else line += ch;
          }
          if (line) lines.push(line);
          lines.slice(0, 3).forEach((l, i) => ctx.fillText(l, cx, y + i * lh));
        }
      }

      function drawTriangleRadar(smart, diligent, obedient) {
        const cx = 160;
        const cy = 162;
        const maxR = 120;

        const radSmart = -Math.PI / 2;
        const radDiligent = Math.PI / 6;
        const radObedient = (5 * Math.PI) / 6;

        const r1 = (smart / 100) * maxR;
        const r2 = (diligent / 100) * maxR;
        const r3 = (obedient / 100) * maxR;

        const p1 = { x: cx + r1 * Math.cos(radSmart), y: cy + r1 * Math.sin(radSmart) };
        const p2 = { x: cx + r2 * Math.cos(radDiligent), y: cy + r2 * Math.sin(radDiligent) };
        const p3 = { x: cx + r3 * Math.cos(radObedient), y: cy + r3 * Math.sin(radObedient) };

        const poly = document.getElementById("user-triangle-poly");
        poly.setAttribute(
          "points",
          p1.x.toFixed(1) + "," + p1.y.toFixed(1) + " " +
          p2.x.toFixed(1) + "," + p2.y.toFixed(1) + " " +
          p3.x.toFixed(1) + "," + p3.y.toFixed(1)
        );

        document.getElementById("dot-smart").setAttribute("cx", p1.x.toFixed(1));
        document.getElementById("dot-smart").setAttribute("cy", p1.y.toFixed(1));
        document.getElementById("dot-diligent").setAttribute("cx", p2.x.toFixed(1));
        document.getElementById("dot-diligent").setAttribute("cy", p2.y.toFixed(1));
        document.getElementById("dot-obedient").setAttribute("cx", p3.x.toFixed(1));
        document.getElementById("dot-obedient").setAttribute("cy", p3.y.toFixed(1));

        document.getElementById("score-smart-label").textContent = smart + "%";
        document.getElementById("score-diligent-label").textContent = diligent + "%";
        document.getElementById("score-obedient-label").textContent = obedient + "%";

        document.getElementById("bar-smart-text").textContent = smart + "%";
        document.getElementById("bar-diligent-text").textContent = diligent + "%";
        document.getElementById("bar-obedient-text").textContent = obedient + "%";

        document.getElementById("bar-smart").style.width = smart + "%";
        document.getElementById("bar-diligent").style.width = diligent + "%";
        document.getElementById("bar-obedient").style.width = obedient + "%";
      }

      function toggleResultFlip() {
        const inner = document.getElementById("result-card-inner");
        if (inner) inner.classList.toggle("is-flipped");
      }

      function copyResultSummary() {
        if (!state.archetypeKey) return;
        const loc = ARCHETYPES[state.archetypeKey][state.lang];
        const t = I18N[state.lang];
        const p = state.percentages;

        const text = t.formatShare(loc, p.smart, p.diligent, p.obedient);
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();

        try {
          document.execCommand("copy");
        } catch (err) {
          // 忽略剪贴板权限异常
        } finally {
          document.body.removeChild(ta);
        }

        showToast(t.toastCopied);
      }

      function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(showToast._timer);
        showToast._timer = setTimeout(function () {
          toast.classList.remove("show");
        }, 2600);
      }

      /* =====================================================================
       * 6. 星空粒子背景动画
       * ===================================================================== */
      function initStarfield() {
        const canvas = document.getElementById("starfield");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w = 0;
        let h = 0;
        let stars = [];

        function resize() {
          w = canvas.width = window.innerWidth;
          h = canvas.height = window.innerHeight;
          const count = Math.min(85, Math.floor((w * h) / 14500));
          stars = [];
          for (let i = 0; i < count; i++) {
            stars.push({
              x: Math.random() * w,
              y: Math.random() * h,
              r: Math.random() * 1.4 + 0.3,
              alpha: Math.random() * 0.7 + 0.15,
              vy: Math.random() * 0.14 + 0.03,
              va: (Math.random() * 0.015 + 0.004) * (Math.random() > 0.5 ? 1 : -1)
            });
          }
        }

        function tick() {
          ctx.clearRect(0, 0, w, h);
          for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.y -= s.vy;
            if (s.y < 0) s.y = h;
            s.alpha += s.va;
            if (s.alpha > 0.85 || s.alpha < 0.15) s.va *= -1;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(246, 230, 180, " + s.alpha.toFixed(2) + ")";
            ctx.fill();
          }
          requestAnimationFrame(tick);
        }

        window.addEventListener("resize", resize);
        resize();
        tick();
      }

      /* =====================================================================
       * 7. 规范事件绑定与初始化
       * ===================================================================== */
      window.addEventListener("load", function () {
        initStarfield();

        // 绑定三语切换按钮
        document.querySelectorAll(".lang-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            const lang = btn.getAttribute("data-lang");
            setLanguage(lang);
          });
        });

        // 绑定开始、返回上一题、结果翻转、复制、重新占卜按钮
        document.getElementById("btn-start-game").addEventListener("click", startGame);
        document.getElementById("btn-prev-step").addEventListener("click", handlePrevStep);
        document.getElementById("result-flip-stage").addEventListener("click", toggleResultFlip);
        document.getElementById("btn-flip-toggle").addEventListener("click", toggleResultFlip);
        document.getElementById("btn-copy-result").addEventListener("click", copyResultSummary);
        document.getElementById("btn-restart-game").addEventListener("click", startGame);

        // 初始化默认中文界面
        setLanguage("zh");
      });
    })();
  