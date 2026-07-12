const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.defineLayout({ name: "PORTRAIT_45", width: 10, height: 12.5 });
pres.layout = "PORTRAIT_45";
pres.author = "Soumil";
pres.title = "What Does Data Actually Say About the Gita?";

// ── Palette ──
const BG = "15120E";
const BG2 = "1C1811";
const INK = "F0E8D6";
const SOFT = "C3B69A";
const FAINT = "8A7A62";
const SAF = "E08A2E";
const SAFB = "F5A83D";
const TEAL = "3FB59F";
const IND = "9B8CE0";
const ROSE = "E08AA8";
const CRIM = "E26D5C";
const SKY = "5FB8E0";
const OLIVE = "8FA84E";
const BLAZE = "FF5800";
const HARVEST = "FF7400";
const DEEPSAFF = "FF9000";
const PUREORANGE = "FFAC00";
const BUSYELLOW = "FFC700";
const BRIGHTGOLD = "FFE300";
const YELLOW = "FFFF00";
const SELF_VIOLET = "9B7FD1";
const ACTION_ORANGE = "E8752C";
const SACRIFICE_GOLD = "D4A017";
const WISDOM_TEAL = "3FB59F";
const COSMIC_BLUE = "2E4FA3";
const BATTLE_MAROON = "A8342F";
const FAITH_CREAM = "E8D9B5";
const LINE = "352D21";

// Two distinct moods: warm/saffron for belief, cool/teal for evidence
const SPEC_BG = "1D140D";
const SPEC_PANEL = "271B10";
const SPEC_LINE = "43301A";
const DATA_BG = "0C1714";
const DATA_PANEL = "13221D";
const DATA_LINE = "24382F";

const W = 10, H = 12.5;
const TOTAL = 15;

function bgSlide() {
  let s = pres.addSlide();
  s.background = { color: BG };
  return s;
}
function specSlide() {
  let s = pres.addSlide();
  s.background = { color: SPEC_BG };
  return s;
}
function dataSlide() {
  let s = pres.addSlide();
  s.background = { color: DATA_BG };
  return s;
}
function pageTag(s, n) {
  s.addText(`${n} / ${TOTAL}`, {
    x: W - 1.6, y: H - 0.65, w: 1.2, h: 0.4,
    fontFace: "Courier New", fontSize: 10, color: FAINT, align: "right"
  });
}
function omSymbol(s, x, y, size, color) {
  s.addText("ॐ", { x, y, w: size, h: size, fontFace: "Cambria", fontSize: size * 45, color, align: "center", valign: "middle" });
}
function badge(s, text, col, colBg) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 0.9, w: 2.9, h: 0.5, rectRadius: 0.25,
    fill: { color: colBg }, line: { color: col, width: 1 }
  });
  s.addText(text, {
    x: 0.8, y: 0.9, w: 2.9, h: 0.5,
    fontFace: "Courier New", fontSize: 10.5, color: col, align: "center", valign: "middle", charSpacing: 1
  });
}
function sourceCard(s, y, h, quote, citeText, citeUrl) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: y, w: 8.4, h: h, rectRadius: 0.08,
    fill: { color: SPEC_PANEL }, line: { color: SPEC_LINE, width: 1 }
  });
  s.addText("SOURCE / VERIFIED LIVE LINK", {
    x: 1.15, y: y + 0.3, w: 6, h: 0.35,
    fontFace: "Courier New", fontSize: 10, color: FAINT, charSpacing: 1
  });
  s.addText(quote, {
    x: 1.15, y: y + 0.7, w: 7.7, h: h - 1.2,
    fontFace: "Cambria", fontSize: 14.5, italic: true, color: INK, lineSpacing: 21
  });
  s.addText(citeText, {
    x: 1.15, y: y + h - 0.55, w: 7.7, h: 0.4,
    fontFace: "Courier New", fontSize: 11, color: SAFB, underline: true,
    hyperlink: { url: citeUrl }
  });
}
function swipePrompt(s, y) {
  s.addText("↓  WHAT DOES THE DATA SAY?", {
    x: 0.8, y: y, w: 8.4, h: 0.5,
    fontFace: "Courier New", fontSize: 13, color: TEAL, align: "center", charSpacing: 1.5, bold: true
  });
}
function estimateLines(text, charsPerLine) {
  return Math.max(1, Math.ceil(text.length / charsPerLine));
}
function conclusionCard(s, y, h, verdict, bullets) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: y, w: 8.4, h: h, rectRadius: 0.08,
    fill: { color: DATA_PANEL }, line: { color: TEAL, width: 1 }
  });
  s.addText("CONCLUSION", {
    x: 1.15, y: y + 0.28, w: 3, h: 0.32,
    fontFace: "Courier New", fontSize: 10, color: TEAL, charSpacing: 1.5
  });
  const verdictLines = estimateLines(verdict, 42);
  s.addText(verdict, {
    x: 1.15, y: y + 0.62, w: 7.7, h: verdictLines * 0.34 + 0.12,
    fontFace: "Cambria", fontSize: 19, bold: true, color: SAFB, lineSpacing: 23
  });
  let cy = y + 0.62 + verdictLines * 0.34 + 0.26;
  const charsPerLine = 84;
  bullets.forEach(b => {
    const lines = estimateLines(b, charsPerLine);
    const boxH = lines * 0.27 + 0.1;
    s.addText([
      { text: "→  ", options: { color: TEAL, bold: true } },
      { text: b, options: { color: SOFT } }
    ], {
      x: 1.15, y: cy, w: 7.7, h: boxH,
      fontFace: "Cambria", fontSize: 13.5, lineSpacing: 18.5
    });
    cy += boxH + 0.16;
  });
}
function dotsDivider(s, y, accentCol) {
  for (let i = 0; i < 5; i++) {
    s.addShape(pres.shapes.OVAL, { x: 4.35 + i * 0.3, y: y, w: 0.06, h: 0.06, fill: { color: i === 2 ? accentCol : FAINT } });
  }
}

function lerpColor(hex1, hex2, t) {
  t = Math.max(0, Math.min(1, t));
  const c1 = parseInt(hex1, 16), c2 = parseInt(hex2, 16);
  const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
  const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
  const r = Math.round(r1 + (r2 - r1) * t), g = Math.round(g1 + (g2 - g1) * t), b = Math.round(b1 + (b2 - b1) * t);
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0').toUpperCase();
}

// Builds a themed heatmap grid: rows=emotion labels, cols=chapter labels, data=matrix (row-major)
function drawHeatmap(s, x, y, w, h, rowLabels, colLabels, data, accentHex, opts) {
  opts = opts || {};
  const isInt = opts.isInt || false;
  const rotateCols = opts.rotateCols || false;
  const labelW = opts.labelW || 1.15;
  const colFontSize = opts.colFontSize || 6.5;
  const cellFontSize = opts.cellFontSize || 6.3;
  const rowFontSize = opts.rowFontSize || 8.5;
  const gridW = w - labelW;
  const cellW = gridW / colLabels.length;
  const cellH = h / rowLabels.length;
  const lowCol = "17140F", midCol = "2C2418";
  let maxVal = 0;
  data.forEach(row => row.forEach(v => { if (v !== null && v > maxVal) maxVal = v; }));

  // column headers
  colLabels.forEach((c, ci) => {
    if (rotateCols) {
      s.addText(c, {
        x: x + labelW + ci * cellW - 0.15, y: y - 0.42, w: cellW + 0.3, h: 0.4,
        fontFace: "Courier New", fontSize: colFontSize, color: FAINT, align: "left", rotate: 300
      });
    } else {
      s.addText(c, {
        x: x + labelW + ci * cellW, y: y - 0.26, w: cellW, h: 0.24,
        fontFace: "Courier New", fontSize: colFontSize, color: FAINT, align: "center"
      });
    }
  });

  rowLabels.forEach((r, ri) => {
    s.addText(r, {
      x: x, y: y + ri * cellH, w: labelW - 0.06, h: cellH,
      fontFace: "Courier New", fontSize: rowFontSize, color: SOFT, align: "right", valign: "middle"
    });
    data[ri].forEach((v, ci) => {
      const cx = x + labelW + ci * cellW, cy = y + ri * cellH;
      if (v === null) {
        s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cellW - 0.02, h: cellH - 0.02, fill: { color: BG }, line: { color: "241D14", width: 0.25 } });
        return;
      }
      const t = maxVal > 0 ? v / maxVal : 0;
      const col = t < 0.5 ? lerpColor(lowCol, midCol, t / 0.5) : lerpColor(midCol, accentHex, (t - 0.5) / 0.5);
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cellW - 0.02, h: cellH - 0.02, fill: { color: col }, line: { color: BG, width: 0.5 } });
      const txtCol = t > 0.55 ? "1A1410" : "C3B69A";
      const label = isInt ? (v === 0 ? "" : String(v)) : v.toFixed(2).replace(/^0\./, ".");
      if (label) {
        s.addText(label, {
          x: cx, y: cy, w: cellW - 0.02, h: cellH - 0.02,
          fontFace: "Courier New", fontSize: cellFontSize, color: txtCol, align: "center", valign: "middle"
        });
      }
    });
  });
}

// ══════════════════════════════════════════════
// SLIDE 1 — COVER
// ══════════════════════════════════════════════
{
  let s = bgSlide();
  omSymbol(s, 3.75, 1.3, 1.5, SAF);
  s.addText("A DATA STORY", {
    x: 0.8, y: 3.7, w: 8.4, h: 0.4,
    fontFace: "Courier New", fontSize: 13, color: SAFB, charSpacing: 4, align: "center"
  });
  s.addText([
    { text: "What Does ", options: {} },
    { text: "Data", options: { color: SAFB, italic: true } },
    { text: " Actually", options: {} },
    { text: "\nSay About the ", options: { breakLine: false } },
    { text: "Gita", options: { color: TEAL, italic: true } },
    { text: "?", options: {} }
  ], {
    x: 0.8, y: 4.2, w: 8.4, h: 2.6,
    fontFace: "Cambria", fontSize: 40, bold: true, color: INK, align: "center", valign: "top", lineSpacing: 46
  });
  s.addText("Six widely believed things about the Bhagavad Gita, tested against 700 verses across 9 different analytical methods.", {
    x: 1.1, y: 7.3, w: 7.8, h: 1.3,
    fontFace: "Cambria", fontSize: 15, color: SOFT, align: "center", italic: true, lineSpacing: 22
  });
  dotsDivider(s, 9.1, SAFB);
  s.addText("swipe to see the analysis →", {
    x: 0.8, y: H - 1.5, w: 8.4, h: 0.5,
    fontFace: "Courier New", fontSize: 12, color: FAINT, align: "center", charSpacing: 1
  });
  pageTag(s, 1);
}

// ══════════════════════════════════════════════
// SLIDE 2 — SPECULATION 1: POSITIVITY
// ══════════════════════════════════════════════
{
  let s = specSlide();
  badge(s, "THE SPECULATION", SAFB, "2A2015");
  s.addText("“The Gita is a book of unwavering positivity.”", {
    x: 0.8, y: 1.9, w: 8.4, h: 2.6,
    fontFace: "Cambria", fontSize: 44, bold: true, italic: true, color: INK, lineSpacing: 50
  });
  s.addText("This is the dominant popular framing: the Gita as a self-help text for optimism and inner peace.", {
    x: 0.8, y: 4.7, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 15, color: SOFT, lineSpacing: 21
  });
  sourceCard(s, 5.9, 2.6, "“...the Bhagavad Gita is a rich tapestry of insights from the Mahabharata that promote positive thinking and an optimistic outlook.”", "yogajala.com/positive-thinking-bhagavad-gita-quotes →", "https://yogajala.com/positive-thinking-bhagavad-gita-quotes/");
  s.addText("Articles like this dominate the top search results for \"Bhagavad Gita meaning.\" This is what most people believe before reading a single chapter.", {
    x: 0.8, y: 8.9, w: 8.4, h: 1.3,
    fontFace: "Cambria", fontSize: 14, color: SOFT, lineSpacing: 20
  });
  swipePrompt(s, 10.85);
  pageTag(s, 2);
}

// ══════════════════════════════════════════════
// SLIDE 3 — DATA 1: EMOTION DISTRIBUTION (native, real data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("We ran all 700 verses through a 28-emotion classifier (GoEmotions).", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.9,
    fontFace: "Cambria", fontSize: 17, bold: true, color: INK, lineSpacing: 22
  });
  s.addText("TOP 10 TOTAL EMOTION SCORES / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 2.85, w: 8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: TEAL, charSpacing: 0.5 });

  const emoBars = [
    { label: "neutral", val: 392, col: FAINT },
    { label: "approval", val: 96, col: TEAL },
    { label: "admiration", val: 76, col: SAF },
    { label: "caring", val: 42, col: ROSE },
    { label: "realization", val: 23, col: IND },
    { label: "joy", val: 22, col: SAFB },
    { label: "love", val: 15, col: CRIM },
    { label: "optimism", val: 15, col: SKY },
    { label: "annoyance", val: 14, col: "8FA84E" },
    { label: "confusion", val: 14, col: "C9A227" }
  ];
  const chartX = 0.8, chartY = 3.55, barH = 0.4, gap = 0.48, maxVal = 392;
  emoBars.forEach((b, i) => {
    const y = chartY + i * gap;
    s.addText(b.label, { x: chartX, y: y - 0.02, w: 1.7, h: barH, fontFace: "Courier New", fontSize: 12.5, color: SOFT, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: chartX + 1.8, y: y + 0.06, w: 5.85, h: barH - 0.16, fill: { color: DATA_PANEL } });
    const w = Math.max(0.1, (b.val / maxVal) * 5.85);
    s.addShape(pres.shapes.RECTANGLE, { x: chartX + 1.8, y: y + 0.06, w: w, h: barH - 0.16, fill: { color: b.col } });
    s.addText(String(b.val), { x: chartX + 1.8 + w + 0.1, y: y - 0.02, w: 0.6, h: barH, fontFace: "Courier New", fontSize: 12, bold: true, color: FAINT, valign: "middle" });
  });

  conclusionCard(s, 8.55, 3.1, "Partially true.", [
    "Neutral dominates at 392 mentions, over 4x the next closest emotion (approval, 96).",
    "This reads as a mostly instructional, neutral text, not an emotional one.",
    "Positivity is real here, but it's a minority signal, not the dominant tone."
  ]);
  pageTag(s, 3);
}

// ══════════════════════════════════════════════
// SLIDE 4 — SPECULATION 2: A CALL TO WAR
// ══════════════════════════════════════════════
{
  let s = specSlide();
  badge(s, "THE SPECULATION", SAFB, "2A2015");
  s.addText("\u201cKrishna's core message is a call to arms.\u201d", {
    x: 0.8, y: 2.0, w: 8.4, h: 2.3,
    fontFace: "Cambria", fontSize: 42, bold: true, italic: true, color: INK, lineSpacing: 48
  });
  s.addText("The famous framing: Arjuna refuses to fight, and Krishna spends 18 chapters persuading him back onto the battlefield.", {
    x: 0.8, y: 4.7, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 15, color: SOFT, lineSpacing: 21
  });
  sourceCard(s, 6.1, 2.6, "\u201c...though the text is absolutely a call to war, it follows this call to war by prescribing a particular disposition and conduct...\u201d", "blogs.icrc.org/bhagavad-gita-ethics-war \u2192", "https://blogs.icrc.org/religion-humanitarianprinciples/bhagavad-gita-ethics-war/");
  s.addText("Countless summaries reduce the Gita to \u201cKrishna convinces Arjuna to fight,\u201d a war speech dressed in philosophy.", {
    x: 0.8, y: 9.05, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 14, color: SOFT, lineSpacing: 20
  });
  swipePrompt(s, 10.5);
  pageTag(s, 4);
}

// ══════════════════════════════════════════════
// SLIDE 5 — DATA 2a: SPEAKER SHARE + WORD FREQUENCY (native, real data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("First measurement: if this is a war rally, look at the words actually used.", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.7,
    fontFace: "Cambria", fontSize: 16, bold: true, color: INK, lineSpacing: 21
  });

  s.addText("VERSE SHARE", { x: 0.8, y: 2.65, w: 4, h: 0.35, fontFace: "Courier New", fontSize: 10.5, color: FAINT, charSpacing: 1.5 });
  const shareY = 3.05;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: shareY, w: 8.4, h: 0.5, fill: { color: DATA_PANEL } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: shareY, w: 8.4 * 0.806, h: 0.5, fill: { color: SAF } });
  s.addText("Krishna 80.6%", { x: 0.95, y: shareY, w: 3, h: 0.5, fontFace: "Courier New", fontSize: 12, bold: true, color: BG, valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8 + 8.4 * 0.806, y: shareY, w: 8.4 * 0.124, h: 0.5, fill: { color: TEAL } });
  s.addText("Arjuna 12.4%", { x: 0.8 + 8.4 * 0.806 - 1.85, y: shareY + 0.55, w: 2.2, h: 0.3, fontFace: "Courier New", fontSize: 9.5, color: TEAL, align: "right" });

  s.addText("VOCABULARY / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 4.15, w: 6, h: 0.3, fontFace: "Courier New", fontSize: 10, color: FAINT, charSpacing: 1 });

  const krishnaWords = [["world",125],["mind",107],["actions",95],["supreme",91],["person",87],["beings",79],["soul",75],["nature",75],["knowledge",68],["senses",63],["life",63],["sacrifice",63],["karma",61],["divine",60],["people",54]];
  const arjunaWords = [["great",15],["yoga",15],["asked",13],["supreme",13],["divine",12],["universe",12],["form",10],["mind",9],["sannyaas",8],["fight",7],["cannot",7],["life",7],["eternal",7],["continued",6],["good",6]];

  function drawWordBars(colX, colW, words, maxVal, col, label) {
    s.addText(label, { x: colX, y: 4.55, w: colW, h: 0.28, fontFace: "Courier New", fontSize: 10, bold: true, color: col, charSpacing: 0.5 });
    const rowH = 0.26;
    words.forEach((w, i) => {
      const y = 4.95 + i * rowH;
      s.addText(w[0], { x: colX, y: y, w: 1.05, h: rowH - 0.02, fontFace: "Courier New", fontSize: 8.5, color: SOFT, valign: "middle" });
      const barMaxW = colW - 1.05 - 0.4;
      const bw = Math.max(0.05, (w[1] / maxVal) * barMaxW);
      s.addShape(pres.shapes.RECTANGLE, { x: colX + 1.05, y: y + 0.035, w: barMaxW, h: rowH - 0.1, fill: { color: DATA_PANEL } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX + 1.05, y: y + 0.035, w: bw, h: rowH - 0.1, fill: { color: col } });
      s.addText(String(w[1]), { x: colX + 1.05 + barMaxW + 0.05, y: y, w: 0.4, h: rowH - 0.02, fontFace: "Courier New", fontSize: 8, color: FAINT, valign: "middle" });
    });
  }

  drawWordBars(0.8, 4.05, krishnaWords, 125, SAFB, "KRISHNA");
  drawWordBars(5.15, 4.05, arjunaWords, 15, TEAL, "ARJUNA");

  conclusionCard(s, 9.05, 2.7, "False, by vocabulary.", [
    "Krishna carries 80.6% of the text, so his words are effectively its dominant voice.",
    "Not one war word cracks his top 15: no fight, no battle, no enemy.",
    "World, mind, actions, soul, nature, knowledge: metaphysics, not a battle cry."
  ]);
  pageTag(s, 5);
}

// ══════════════════════════════════════════════
// SLIDE 6 — SPECULATION: KRISHNA'S SCARIEST MOMENT
// ══════════════════════════════════════════════
{
  let s = specSlide();
  badge(s, "THE SPECULATION", SAFB, "2A2015");
  s.addText("“Chapter 11 is Krishna's scariest, most commanding moment.”", {
    x: 0.8, y: 2.0, w: 8.4, h: 2.4,
    fontFace: "Cambria", fontSize: 32, bold: true, italic: true, color: INK, lineSpacing: 38
  });
  s.addText("This is the \"Now I am become Death\" chapter, Krishna's terrifying cosmic form, the single most famous passage in the whole text.", {
    x: 0.8, y: 4.7, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 15, color: SOFT, lineSpacing: 21
  });
  sourceCard(s, 6.1, 2.5, "“This quotation introduced millions in the West to Krishna's most terrifying self-revelation.”", "srimadgita.com/blog/verse-1133-time-destroyer \u2192", "https://www.srimadgita.com/blog/verse-1133-time-destroyer-deep-dive");
  s.addText("Oppenheimer quoted this exact chapter after Trinity. If any moment defines Krishna as overwhelming, it's this one.", {
    x: 0.8, y: 8.85, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 14, color: SOFT, lineSpacing: 20
  });
  swipePrompt(s, 10.4);
  pageTag(s, 6);
}

// ══════════════════════════════════════════════
// SLIDE 7 — DATA: KRISHNA HEATMAP (native, real data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("What actually peaks in his most terrifying chapter.", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.9,
    fontFace: "Cambria", fontSize: 17, bold: true, color: INK, lineSpacing: 22
  });
  s.addText("KRISHNA'S EMOTIONAL ARC / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 3.05, w: 8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: SAFB, charSpacing: 0.5 });

  const krishnaRows = ["approval","admiration","caring","realization","joy","love","optimism","annoyance","disapproval"];
  const krishnaCols = ["2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
  const krishnaData = [
    [0.13,0.15,0.15,0.17,0.21,0.13,0.12,0.18,0.13,0.072,0.16,0.12,0.13,0.17,0.14,0.22,0.18],
    [0.072,0.073,0.077,0.1,0.11,0.13,0.06,0.079,0.18,0.07,0.093,0.037,0.097,0.16,0.11,0.11,0.1],
    [0.11,0.055,0.031,0.071,0.06,0.029,0.091,0.12,0.065,0.18,0.15,0.0038,0.022,0.018,0.027,0.023,0.089],
    [0.032,0.023,0.026,0.081,0.043,0.024,0.015,0.063,0.021,0.0071,0.015,0.065,0.1,0.039,0.022,0.027,0.042],
    [0.036,0.0026,0.0061,0.11,0.058,0.004,0.048,0.029,0.017,0.0089,0.0048,0.0036,0.0063,0.013,0.039,0.011,0.067],
    [0.003,0.0019,0.023,0.0038,0.007,0.032,0.0073,0.052,0.035,0.13,0.038,0.0025,0.003,0.0043,0.0028,0.033,0.053],
    [0.033,0.04,0.029,0.021,0.031,0.0088,0.023,0.028,0.019,0.034,0.021,0.007,0.0089,0.011,0.026,0.014,0.02],
    [0.035,0.039,0.013,0.014,0.0076,0.02,0.0048,0.024,0.0048,0.012,0.0091,0.0069,0.017,0.0055,0.067,0.034,0.015],
    [0.035,0.021,0.024,0.01,0.011,0.021,0.0047,0.02,0.0034,0.014,0.02,0.0084,0.011,0.0095,0.046,0.044,0.018]
  ];
  drawHeatmap(s, 0.8, 3.65, 8.4, 3.9, krishnaRows, krishnaCols, krishnaData, SAFB);

  conclusionCard(s, 7.85, 3.35, "Backwards.", [
    "Caring peaks at Ch11 (0.18) and love peaks at Ch11 (0.13), both their highest points anywhere in his arc.",
    "The chapter where Krishna is most overwhelming is also the chapter where he's most comforting.",
    "Approval, not fear, actually saturates his voice, peaking at Ch5 (0.21) and Ch17 (0.22)."
  ]);
  pageTag(s, 7);
}

// ══════════════════════════════════════════════
// SLIDE 8 — SPECULATION: ARJUNA IS DESPAIR
// ══════════════════════════════════════════════
{
  let s = specSlide();
  badge(s, "THE SPECULATION", SAFB, "2A2015");
  s.addText("“Arjuna is defined by despair and grief.”", {
    x: 0.8, y: 2.0, w: 8.4, h: 2.3,
    fontFace: "Cambria", fontSize: 40, bold: true, italic: true, color: INK, lineSpacing: 46
  });
  s.addText("Not just popular reading; this is the text's own framing. Chapter 1 carries an actual name in Sanskrit.", {
    x: 0.8, y: 4.7, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 15, color: SOFT, lineSpacing: 21
  });
  sourceCard(s, 6.1, 2.5, "\u201cChapter 1: Arjun Vish\u0101d Yog\u201d \u2014 \u201cLamenting the Consequences of War.\u201d The chapter's own title, in the original Sanskrit.", "holy-bhagavad-gita.org/chapter/1 \u2192", "https://www.holy-bhagavad-gita.org/chapter/1/");
  s.addText("The text itself named him for his grief before a single teaching had even begun.", {
    x: 0.8, y: 8.85, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 14, color: SOFT, lineSpacing: 20
  });
  swipePrompt(s, 10.4);
  pageTag(s, 8);
}

// ══════════════════════════════════════════════
// SLIDE 9 — DATA: ARJUNA HEATMAP (native, real data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("His own named chapter versus his emotional average across all 18.", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.9,
    fontFace: "Cambria", fontSize: 17, bold: true, color: INK, lineSpacing: 22
  });
  s.addText("ARJUNA'S EMOTIONAL ARC / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 3.05, w: 8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: TEAL, charSpacing: 0.5 });

  const arjunaRows = ["curiosity","confusion","admiration","approval","joy","caring","sadness","disapproval","annoyance"];
  const arjunaCols = ["1","2","3","4","5","6","8","10","11","12","14","17","18"];
  const arjunaData = [
    [0.066,0.15,0.27,0.025,0.043,0.2,0.34,0.083,0.018,0.37,0.077,0.55,0.078],
    [0.071,0.16,0.36,0.18,0.16,0.12,0.24,0.006,0.066,0.17,0.034,0.18,0.034],
    [0.0024,0.067,0.0026,0.033,0.052,0.0017,0.0021,0.33,0.34,0.0027,0.097,0.0048,0.28],
    [0.031,0.053,0.027,0.069,0.17,0.054,0.01,0.23,0.064,0.01,0.1,0.0091,0.086],
    [0.002,0.14,0.0023,0.0043,0.069,0.0011,0.001,0.0025,0.041,0.00066,0.084,0.00052,0.0051],
    [0.0077,0.064,0.0075,0.011,0.022,0.011,0.0034,0.017,0.044,0.00096,0.012,0.0022,0.1],
    [0.13,0.11,0.0022,0.0021,0.0014,0.0083,0.0037,0.0013,0.036,0.00076,0.0018,0.0019,0.0016],
    [0.06,0.02,0.0073,0.0079,0.022,0.075,0.031,0.0037,0.0052,0.0032,0.0053,0.0052,0.0024],
    [0.063,0.03,0.015,0.0086,0.0095,0.031,0.024,0.0053,0.012,0.0083,0.0084,0.0096,0.0095]
  ];
  drawHeatmap(s, 0.8, 3.65, 8.4, 3.9, arjunaRows, arjunaCols, arjunaData, TEAL);

  conclusionCard(s, 7.85, 3.35, "True for one chapter, false overall.", [
    "Sadness is real at Ch1 (0.13) but collapses to near-zero by Ch3 and never returns.",
    "Averaged across everything he says: curiosity (\u22480.18) beats confusion (\u22480.14) beats sadness (\u22480.02).",
    "Despair is his opening scene, not his character."
  ]);
  pageTag(s, 9);
}

// ══════════════════════════════════════════════
// SLIDE 10 — SPECULATION 3: ONE CONSISTENT MESSAGE
// ══════════════════════════════════════════════
{
  let s = specSlide();
  badge(s, "THE SPECULATION", SAFB, "2A2015");
  s.addText("“The Gita teaches one consistent message throughout.”", {
    x: 0.8, y: 2.0, w: 8.4, h: 2.2,
    fontFace: "Cambria", fontSize: 38, bold: true, italic: true, color: INK, lineSpacing: 44
  });
  s.addText("Many readers treat the Gita as delivering a single core teaching, repeated in different words across 18 chapters.", {
    x: 0.8, y: 4.6, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 15, color: SOFT, lineSpacing: 21
  });
  sourceCard(s, 6.0, 2.75, "“...devotional service to Krishna...is the most confidential part of knowledge, and this is the essence of the whole Bhagavad-gita.” (on verse 18.66)", "btg.krishna.com/the-essence-of-the-essence \u2192", "https://btg.krishna.com/the-essence-of-the-essence/");
  s.addText("Entire commentaries are built around finding \"the one verse\" that summarizes the whole text.", {
    x: 0.8, y: 9.05, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 14, color: SOFT, lineSpacing: 20
  });
  swipePrompt(s, 10.4);
  pageTag(s, 10);
}

// ══════════════════════════════════════════════
// SLIDE 11 — DATA 3a: LDA THEMATIC ROTATION — STRIP (native, real K=8 data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("We ran topic modeling (LDA) on all 18 chapters, letting themes emerge on their own, unlabeled.", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.9,
    fontFace: "Cambria", fontSize: 17, bold: true, color: INK, lineSpacing: 22
  });
  s.addText("DOMINANT THEME BY CHAPTER / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 2.85, w: 8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: TEAL, charSpacing: 0.5 });

  // Dominant topic per chapter, computed directly from the real K=8 LDA matrix
  const topicColors = { Self: SELF_VIOLET, Action: ACTION_ORANGE, Sacrifice: SACRIFICE_GOLD, Wisdom: WISDOM_TEAL, Cosmic: COSMIC_BLUE, Battlefield: BATTLE_MAROON, Faith: FAITH_CREAM };
  const textColors = { Self: "1A1410", Action: "1A1410", Sacrifice: "1A1410", Wisdom: "1A1410", Cosmic: "F0E8D6", Battlefield: "F0E8D6", Faith: "1A1410" };
  const dominant = ["Battlefield","Wisdom","Action","Sacrifice","Action","Cosmic","Cosmic","Cosmic","Cosmic","Wisdom","Cosmic","Sacrifice","Self","Wisdom","Faith","Wisdom","Faith","Wisdom"];
  const stripX = 0.8, stripY = 3.35, stripW = 8.4, cellW = stripW / 18, stripH = 1.5;
  dominant.forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: stripX + i * cellW + 0.03, y: stripY, w: cellW - 0.06, h: stripH, fill: { color: topicColors[t] } });
    s.addText(String(i + 1), {
      x: stripX + i * cellW + 0.03, y: stripY, w: cellW - 0.06, h: stripH,
      fontFace: "Courier New", fontSize: 13, bold: true, color: textColors[t], align: "center", valign: "middle"
    });
  });
  s.addText("Ch1", { x: stripX, y: stripY + stripH + 0.1, w: 0.8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: FAINT });
  s.addText("Ch18", { x: stripX + stripW - 0.6, y: stripY + stripH + 0.1, w: 0.8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: FAINT });

  const legendY = 5.65;
  const legendItems = [
    { label: "Self and the Field", col: SELF_VIOLET }, { label: "Path of Action", col: ACTION_ORANGE },
    { label: "Sacrifice and Knowledge", col: SACRIFICE_GOLD }, { label: "Steady Wisdom", col: WISDOM_TEAL },
    { label: "Cosmic Vision", col: COSMIC_BLUE }, { label: "Battlefield Narrative", col: BATTLE_MAROON },
    { label: "Faith and Purity", col: FAITH_CREAM }
  ];
  legendItems.forEach((it, i) => {
    const lx = 0.8 + (i % 3) * 2.85;
    const ly = legendY + Math.floor(i / 3) * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly + 0.04, w: 0.22, h: 0.22, fill: { color: it.col } });
    s.addText(it.label, { x: lx + 0.32, y: ly, w: 2.5, h: 0.32, fontFace: "Courier New", fontSize: 10.5, color: SOFT, valign: "middle" });
  });
  s.addText("(An 8th theme was discovered but never dominates a single chapter, effectively noise.)", {
    x: 0.8, y: 7.1, w: 8.4, h: 0.3,
    fontFace: "Courier New", fontSize: 9, italic: true, color: FAINT
  });

  conclusionCard(s, 7.55, 3.55, "False.", [
    "The dominant theme swings hard, chapter to chapter, no straight line toward one lesson.",
    "Battlefield, wisdom, action, sacrifice, action, a four-chapter cosmic-vision run, sacrifice, self.",
    "Then wisdom and faith keep trading off all the way to the end.",
    "It's a text that keeps changing its own subject."
  ]);
  pageTag(s, 11);
}

// ══════════════════════════════════════════════
// SLIDE 12 — DATA 3b: LDA THEMATIC ROTATION — HEATMAP (native, real K=8 data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("The exact numbers behind the color strip, chapter by chapter.", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.9,
    fontFace: "Cambria", fontSize: 17, bold: true, color: INK, lineSpacing: 22
  });
  s.addText("LDA TOPIC STRENGTH / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 2.85, w: 8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: TEAL, charSpacing: 0.5 });

  const ldaRows = ["Ch1","Ch2","Ch3","Ch4","Ch5","Ch6","Ch7","Ch8","Ch9","Ch10","Ch11","Ch12","Ch13","Ch14","Ch15","Ch16","Ch17","Ch18"];
  const ldaCols = ["Self","Action","Sacrifice","Wisdom","Cosmic","Minor","Battle","Faith"];
  const ldaData = [
    [0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00],
    [0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00],
    [0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00],
    [0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00],
    [0.00,0.64,0.00,0.00,0.36,0.00,0.00,0.00],
    [0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00],
    [0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00],
    [0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00],
    [0.00,0.00,0.17,0.00,0.74,0.00,0.09,0.00],
    [0.00,0.00,0.00,0.98,0.02,0.00,0.00,0.00],
    [0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00],
    [0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00],
    [1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
    [0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00],
    [0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00],
    [0.00,0.00,0.00,0.66,0.23,0.00,0.00,0.11],
    [0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00],
    [0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00]
  ];
  drawHeatmap(s, 0.8, 3.35, 8.4, 4.9, ldaRows, ldaCols, ldaData, SAFB, { rowFontSize: 9, colFontSize: 8, cellFontSize: 7.5 });

  conclusionCard(s, 8.45, 3.2, "Notice the extremes, and the empty column.", [
    "Most chapters lock almost entirely onto one theme, not a gentle blend.",
    "\"Minor\" (5th column) never wins anywhere: 0.00 in every single row.",
    "Real noise the model produced, but no chapter ever actually needed it."
  ]);
  pageTag(s, 12);
}

// ══════════════════════════════════════════════
// SLIDE 13 — SPECULATION: EASY FOR A MATURE MIND
// ══════════════════════════════════════════════
{
  let s = specSlide();
  badge(s, "THE SPECULATION", SAFB, "2A2015");
  s.addText("“It's easy to understand, for a mature mind.”", {
    x: 0.8, y: 2.0, w: 8.4, h: 2.3,
    fontFace: "Cambria", fontSize: 40, bold: true, italic: true, color: INK, lineSpacing: 46
  });
  s.addText("A common reassurance to new readers: the philosophy is deep, but the language itself won't be the obstacle.", {
    x: 0.8, y: 4.7, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 15, color: SOFT, lineSpacing: 21
  });
  sourceCard(s, 6.1, 2.3, "\u201cThe Gita is very easy to understand in any language for a mature mind. A repeated reading...will reveal all the sublime ideas contained in it.\u201d", "gita-society.com/Read-bhagavad-gita \u2192", "https://www.gita-society.com/Read-bhagavad-gita.html");
  s.addText("\u201cMature mind\u201d is doing a lot of quiet work in that sentence. What does the reading level actually require?", {
    x: 0.8, y: 8.65, w: 8.4, h: 1.0,
    fontFace: "Cambria", fontSize: 14, color: SOFT, lineSpacing: 20
  });
  swipePrompt(s, 10.4);
  pageTag(s, 13);
}

// ══════════════════════════════════════════════
// SLIDE 14 — DATA: READABILITY (real data)
// ══════════════════════════════════════════════
{
  let s = dataSlide();
  badge(s, "WHAT THE DATA SHOWS", TEAL, "132A25");
  s.addText("We measured the real Flesch-Kincaid grade level of every chapter.", {
    x: 0.8, y: 1.75, w: 8.4, h: 0.9,
    fontFace: "Cambria", fontSize: 17, bold: true, color: INK, lineSpacing: 22
  });
  s.addText("READING GRADE LEVEL BY CHAPTER / REAL VALUES FROM YOUR NOTEBOOK", { x: 0.8, y: 2.85, w: 8, h: 0.3, fontFace: "Courier New", fontSize: 10, color: TEAL, charSpacing: 0.5 });

  const grades = [11.10,11.20,10.48,11.58,13.66,11.88,12.38,12.93,12.66,10.39,11.09,13.38,11.65,13.71,14.49,12.26,16.23,14.78];
  const gx = 0.8, gy = 3.55, gw = 8.4, gh = 2.9, gmin = 9, gmax = 17;
  const bw2 = gw / grades.length;
  const peakIdx = 16;
  grades.forEach((g, i) => {
    const bh = ((g - gmin) / (gmax - gmin)) * gh;
    const isMax = i === peakIdx;
    s.addShape(pres.shapes.RECTANGLE, { x: gx + i * bw2 + 0.03, y: gy + gh - bh, w: bw2 - 0.06, h: bh, fill: { color: isMax ? SAFB : "3A2E1E" } });
  });
  s.addText("Ch17", { x: gx + peakIdx * bw2 - 0.3, y: gy + gh - ((grades[peakIdx]-gmin)/(gmax-gmin))*gh - 0.4, w: 1.0, h: 0.35, fontFace: "Courier New", fontSize: 11, bold: true, color: SAFB });
  s.addText("Ch1", { x: gx - 0.05, y: gy + gh + 0.08, w: 0.8, h: 0.3, fontFace: "Courier New", fontSize: 9, color: FAINT });
  s.addText("Ch18", { x: gx + gw - 0.55, y: gy + gh + 0.08, w: 0.8, h: 0.3, fontFace: "Courier New", fontSize: 9, color: FAINT });

  conclusionCard(s, 7.05, 3.9, "Half right.", [
    "Average grade level across all 18 chapters is 12.7: college-entry reading, not simple prose.",
    "It ranges from 10.4 up to 16.2 at Chapter 17, genuine college-level density.",
    "\"Easy\" undersells it. \"For a mature mind\" turns out to be the accurate part."
  ]);
  pageTag(s, 14);
}

// ══════════════════════════════════════════════
// SLIDE 15 — CLOSING
// ══════════════════════════════════════════════
{
  let s = bgSlide();
  omSymbol(s, 3.75, 1.0, 1.5, TEAL);
  s.addText("THE TAKEAWAY", {
    x: 0.8, y: 3.2, w: 8.4, h: 0.4,
    fontFace: "Courier New", fontSize: 13, color: TEAL, charSpacing: 4, align: "center"
  });
  s.addText("Popular belief gets the Gita half right, at best.", {
    x: 0.8, y: 3.7, w: 8.4, h: 1.6,
    fontFace: "Cambria", fontSize: 27, bold: true, color: INK, align: "center", lineSpacing: 33
  });
  s.addText("Positive where it feels anything, but mostly silent. No war words in Krishna's own voice. Most comforting exactly where he's most terrifying. Despairing for one chapter, curious for seventeen. A quarter of its themes hold up under scrutiny. Genuinely hard to read, not simply hard to accept. Every claim, tested, not assumed.", {
    x: 1.0, y: 5.15, w: 8.0, h: 2.3,
    fontFace: "Cambria", fontSize: 13.5, color: SOFT, align: "center", italic: true, lineSpacing: 19
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 7.85, w: 8.4, h: 2.1, rectRadius: 0.08, fill: { color: BG2 }, line: { color: LINE, width: 1 } });
  s.addText("BUILT WITH", { x: 1.15, y: 8.15, w: 3, h: 0.35, fontFace: "Courier New", fontSize: 10, color: FAINT, charSpacing: 1.5 });
  s.addText("spaCy dependency parsing · GoEmotions (28-class RoBERTa) · LDA topic modeling · LaBSE cross-lingual embeddings · textstat · pandas · seaborn", {
    x: 1.15, y: 8.55, w: 7.7, h: 1.2,
    fontFace: "Courier New", fontSize: 12.5, color: INK, lineSpacing: 19
  });

  s.addText("700 verses · 18 chapters · 9 analytical methods · zero assumptions on faith", {
    x: 0.8, y: 10.15, w: 8.4, h: 0.6,
    fontFace: "Cambria", fontSize: 13, italic: true, color: FAINT, align: "center"
  });
  dotsDivider(s, 11.0, TEAL);
  s.addText("Full interactive breakdown in comments ↓", {
    x: 0.8, y: H - 1.1, w: 8.4, h: 0.5,
    fontFace: "Courier New", fontSize: 12, color: FAINT, align: "center", charSpacing: 1
  });
  pageTag(s, 15);
}

pres.writeFile({ fileName: "Gita_Data_vs_Speculation.pptx" }).then(() => console.log("done"));
