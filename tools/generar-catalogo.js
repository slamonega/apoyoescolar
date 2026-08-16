#!/usr/bin/env node
/* ============================================================
 * Generador del catálogo de contenido educativo (~50 000 ejercicios)
 * Currículo propio basado en el estado del arte pedagógico:
 *  - Progresión en espiral (Bruner): los temas vuelven con más profundidad.
 *  - Andamiaje (Vygotsky): de lo concreto a lo abstracto, dificultad creciente.
 *  - Variedad de formatos: opción múltiple, completar, verdadero/falso, emparejar.
 * NO usa contenido de anton.app.
 * Uso: node tools/generar-catalogo.js  ->  escribe js/catalog.js
 * ============================================================ */
const fs = require('fs');
const path = require('path');

/* ---------- RNG con semilla (resultado reproducible) ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260816);
const ri = (min, max) => min + Math.floor(rand() * (max - min + 1));
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
function pickN(arr, n) { return shuffle(arr).slice(0, n); }
function distractors(res, n = 3, spread = 4) {
  const set = new Set();
  let guard = 0;
  while (set.size < n && guard++ < 300) {
    const w = res + ri(-spread, spread);
    if (w !== res && w >= 0) set.add(String(w));
  }
  return [...set];
}
function negDistractors(res, n = 3, spread = 4) {
  const set = new Set();
  let guard = 0;
  while (set.size < n && guard++ < 300) {
    const w = res + ri(-spread, spread);
    if (w !== res) set.add(String(w));
  }
  return [...set];
}

/* ---------- Constructores de ejercicios ---------- */
let exId = 0;
const T = (es, en, de) => ({ es, en, de });
function ex(unitId, type, p, payload, difficulty, points, sort_order) {
  return {
    id: ++exId, unit_id: unitId, type,
    prompt_es: p.es, prompt_en: p.en, prompt_de: p.de,
    payload: JSON.stringify(payload),
    difficulty, points, sort_order,
  };
}
function mc(unitId, p, options, correct, d = 1, s = 0) {
  const idx = typeof correct === 'number' ? correct : options.indexOf(correct);
  return ex(unitId, 'multiple_choice', p, { options, correct: idx }, d, 10, s);
}
function fb(unitId, p, answer, accept, d = 1, s = 0) {
  return ex(unitId, 'fill_blank', p, { answer: String(answer), accept: accept.map(String) }, d, 10, s);
}
function tf(unitId, p, answer, d = 1, s = 0) {
  return ex(unitId, 'true_false', p, { answer: !!answer }, d, 10, s);
}
function dm(unitId, p, pairs, d = 1, s = 0) {
  return ex(unitId, 'drag_match', p, { pairs }, d, 10, s);
}
/* MC/TF/DM con prompt solo en español (materias de contenido) */
function mcQ(u, q, opts, correct, d = 1, s = 0) { return mc(u, T(q, q, q), opts, correct, d, s); }
function tfQ(u, q, answer, d = 1, s = 0) { return tf(u, T(q, q, q), answer, d, s); }
function dmQ(u, q, pairs, d = 1, s = 0) { return dm(u, T(q, q, q), pairs, d, s); }

/* ---------- Plantillas de matemáticas ---------- */
function arithMC(u, a, b, op, d = 1, s = 0) {
  const res = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : Math.floor(a / b);
  const sym = { '+': '+', '−': '−', '×': '×', '÷': '÷' }[op];
  const opts = shuffle([String(res), ...distractors(res)]);
  return mc(u, T(`¿Cuánto es ${a} ${sym} ${b}?`, `What is ${a} ${sym} ${b}?`, `Wie viel ist ${a} ${sym} ${b}?`), opts, String(res), d, s);
}
function arithFB(u, a, b, op, d = 1, s = 0) {
  const res = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : Math.floor(a / b);
  const sym = { '+': '+', '−': '−', '×': '×', '÷': '÷' }[op];
  return fb(u, T(`Escribe el resultado: ${a} ${sym} ${b}`, `Write the result: ${a} ${sym} ${b}`, `Schreibe das Ergebnis: ${a} ${sym} ${b}`), String(res), [String(res)], d, s);
}
function negArithMC(u, a, b, op, d = 1, s = 0) {
  const res = op === '+' ? a + b : a - b;
  let sym = op === '+' ? '+' : '−';
  let dispB = b;
  if (op === '+' && b < 0) { sym = '−'; dispB = -b; }
  const opts = shuffle([String(res), ...negDistractors(res)]);
  return mc(u, T(`¿Cuánto es ${a} ${sym} ${dispB}?`, `What is ${a} ${sym} ${dispB}?`, `Wie viel ist ${a} ${sym} ${dispB}?`), opts, String(res), d, s);
}
function countMC(u, emoji, count, d = 1, s = 0) {
  const shown = emoji.repeat(count);
  const opts = shuffle([String(count), ...distractors(count)]);
  return mc(u, T(`Cuenta: ${shown} — ¿Cuántos hay?`, `Count: ${shown} — How many are there?`, `Zähle: ${shown} — Wie viele sind es?`), opts, String(count), d, s);
}
function compareMC(u, a, b, d = 1, s = 0) {
  const sym = a > b ? '>' : a < b ? '<' : '=';
  const opts = shuffle(['>', '<', '=']);
  return mc(u, T(`¿Qué símbolo falta? ${a} __ ${b}`, `Which symbol is missing? ${a} __ ${b}`, `Welches Zeichen fehlt? ${a} __ ${b}`), opts, sym, d, s);
}

/* ---------- Generadores procedimentales de matemáticas ---------- */
function arithUnitN(unitId, ops, min, max, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const op = pick(ops);
    let a = ri(min, max), b = ri(min, max);
    if (op === '−' && b > a) [a, b] = [b, a];
    if (op === '÷') { b = ri(2, 9); a = b * ri(2, 9); }
    if (op === '×') { a = ri(2, 10); b = ri(2, 10); }
    exs.push(i % 3 === 2 ? arithFB(unitId, a, b, op, d, i) : arithMC(unitId, a, b, op, d, i));
  }
  return exs;
}
function countUnitN(unitId, emojis, min, max, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) exs.push(countMC(unitId, pick(emojis), ri(min, max), d, i));
  return exs;
}
function compareUnitN(unitId, min, max, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    let a = ri(min, max), b = ri(min, max);
    if (a === b) b = a === max ? a - 1 : a + 1;
    exs.push(compareMC(unitId, a, b, d, i));
  }
  return exs;
}
function seqUnitN(unitId, min, max, stepMin, stepMax, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const step = ri(stepMin, stepMax);
    const start = ri(min, max);
    const terms = [start, start + step, start + 2 * step, start + 3 * step];
    const next = start + 4 * step;
    const opts = shuffle([String(next), String(next + step), String(next - step)]);
    exs.push(mcQ(unitId, `¿Qué número sigue? ${terms.join(', ')}, __`, opts, String(next), d, i));
  }
  return exs;
}
function patternUnitN(unitId, n, d = 1) {
  const pairs = [['🔴', '🔵'], ['🍎', '🍌'], ['⭐', '🌙'], ['🐱', '🐶'], ['⬛', '⬜'], ['🌞', '🌧️'], ['🟢', '🟡'], ['🐟', '🐠']];
  const exs = [];
  for (let i = 0; i < n; i++) {
    const [a, b] = pick(pairs);
    const len = ri(2, 4);
    const seq = Array.from({ length: len }, (_, k) => (k % 2 === 0 ? a : b)).join('');
    const next = len % 2 === 0 ? a : b;
    const opts = shuffle([next, next === a ? b : a, pick(pairs)[0]]);
    exs.push(mcQ(unitId, `Sigue el patrón: ${seq} __`, opts, next, d, i));
  }
  return exs;
}
function negUnitN(unitId, ops, min, max, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const op = pick(ops);
    const a = ri(min, max), b = ri(min, max);
    exs.push(negArithMC(unitId, a, b, op, d, i));
  }
  return exs;
}
function fractionUnitN(unitId, n, d = 1) {
  const exs = [];
  const denoms = [2, 3, 4, 5, 6, 8, 10];
  for (let i = 0; i < n; i++) {
    const den = pick(denoms);
    const a = ri(1, den - 1), b = ri(1, den - a);
    const res = a + b;
    const opts = shuffle([`${res}/${den}`, `${res}/${den + 1}`, `${a + b + 1}/${den}`]);
    exs.push(mcQ(unitId, `¿Cuánto es ${a}/${den} + ${b}/${den}?`, opts, `${res}/${den}`, d, i));
  }
  return exs;
}
function decimalUnitN(unitId, ops, min, max, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const op = pick(ops);
    const a = ri(min, max) + ri(1, 9) / 10;
    const b = ri(min, max) + ri(1, 9) / 10;
    const res = op === '+' ? a + b : a - b;
    const r = Math.round(res * 10) / 10;
    const sym = op === '+' ? '+' : '−';
    const opts = shuffle([String(r), String(Math.round((r + 0.1) * 10) / 10), String(Math.round((r - 0.1) * 10) / 10)]);
    exs.push(mcQ(unitId, `¿Cuánto es ${a} ${sym} ${b}?`, opts, String(r), d, i));
  }
  return exs;
}
function percentUnitN(unitId, n, d = 1) {
  const exs = [];
  const pcts = [10, 20, 25, 50, 75, 100];
  for (let i = 0; i < n; i++) {
    const p = pick(pcts);
    const base = pick([20, 40, 50, 60, 80, 100, 120, 200, 300, 400]);
    const res = (p * base) / 100;
    const opts = shuffle([String(res), String(res + 10), String(res - 10)]);
    exs.push(mcQ(unitId, `¿Cuánto es el ${p}% de ${base}?`, opts, String(res), d, i));
  }
  return exs;
}
function equationUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const x = ri(1, 12);
    const a = ri(1, 12);
    const b = x + a;
    const opts = shuffle([String(x), String(x + 1), String(x - 1)]);
    exs.push(mcQ(unitId, `¿Cuál es el valor de x?  x + ${a} = ${b}`, opts, String(x), d, i));
  }
  return exs;
}
function exponentUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const base = ri(2, 10), exp = ri(2, 4);
    const res = Math.pow(base, exp);
    const opts = shuffle([String(res), String(res + base), String(res - base)]);
    exs.push(mcQ(unitId, `¿Cuánto es ${base}${'²³⁴'[exp - 2]}?`, opts, String(res), d, i));
  }
  return exs;
}
function sqrtUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const r = ri(2, 15);
    const sq = r * r;
    const opts = shuffle([String(r), String(r + 1), String(r - 1)]);
    exs.push(mcQ(unitId, `¿Cuál es la raíz cuadrada de ${sq}?`, opts, String(r), d, i));
  }
  return exs;
}
function areaUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const a = ri(2, 12), b = ri(2, 12);
    const res = a * b;
    const opts = shuffle([String(res), String(res + a), String(res - b)]);
    exs.push(mcQ(unitId, `¿Cuál es el área de un rectángulo de ${a} × ${b}?`, opts, String(res), d, i));
  }
  return exs;
}
function perimeterUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const a = ri(2, 12), b = ri(2, 12);
    const res = 2 * (a + b);
    const opts = shuffle([String(res), String(res + 2), String(res - 2)]);
    exs.push(mcQ(unitId, `¿Cuál es el perímetro de un rectángulo de ${a} × ${b}?`, opts, String(res), d, i));
  }
  return exs;
}
function volumeUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    const res = a * b * c;
    const opts = shuffle([String(res), String(res + a), String(res - b)]);
    exs.push(mcQ(unitId, `¿Cuál es el volumen de un prisma de ${a} × ${b} × ${c}?`, opts, String(res), d, i));
  }
  return exs;
}
function meanUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const k = ri(3, 5);
    const base = ri(2, 9);
    const nums = Array.from({ length: k }, () => base + ri(-2, 2));
    const res = Math.round(nums.reduce((x, y) => x + y, 0) / k);
    const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
    exs.push(mcQ(unitId, `¿Cuál es el promedio de ${nums.join(', ')}?`, opts, String(res), d, i));
  }
  return exs;
}
function roundingUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const v = ri(11, 99);
    const res = Math.round(v / 10) * 10;
    const opts = shuffle([String(res), String(res + 10), String(res - 10)]);
    exs.push(mcQ(unitId, `Redondea ${v} a la decena más cercana`, opts, String(res), d, i));
  }
  return exs;
}
function moneyUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const a = ri(1, 9), b = ri(1, 9);
    const res = a + b;
    const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
    exs.push(mcQ(unitId, `Tienes ${a} monedas de 1 y ${b} monedas de 1. ¿Cuántas monedas tienes en total?`, opts, String(res), d, i));
  }
  return exs;
}
function timeUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const h = ri(1, 12);
    const opts = shuffle([`${h}:00`, `${h + 1}:00`, `${h === 1 ? 12 : h - 1}:00`]);
    exs.push(mcQ(unitId, `¿Qué hora es si el reloj marca las ${h} en punto?`, opts, `${h}:00`, d, i));
  }
  return exs;
}
function measureUnitN(unitId, n, d = 1) {
  const facts = [
    ['1 metro', '100 centímetros'], ['1 kilómetro', '1000 metros'], ['1 kilogramo', '1000 gramos'],
    ['1 litro', '1000 mililitros'], ['1 centímetro', '10 milímetros'], ['1 decena', '10 unidades'],
    ['1 centena', '100 unidades'], ['1 hora', '60 minutos'], ['1 minuto', '60 segundos'], ['1 día', '24 horas'],
  ];
  const exs = [];
  for (let i = 0; i < n; i++) {
    const [a, b] = pick(facts);
    const wrongs = pickN(facts.filter(f => f[1] !== b), 2).map(f => f[1]);
    exs.push(mcQ(unitId, `¿Cuántos hay en ${a}?`, shuffle([b, ...wrongs]), b, d, i));
  }
  return exs;
}
function geometryFactUnitN(unitId, n, d = 1) {
  const facts = [
    ['Triángulo', '3 lados'], ['Cuadrado', '4 lados iguales'], ['Pentágono', '5 lados'], ['Hexágono', '6 lados'],
    ['Círculo', '0 lados'], ['Rectángulo', '4 lados, 2 pares iguales'], ['Octágono', '8 lados'],
    ['Ángulo recto', '90 grados'], ['Ángulo agudo', 'menos de 90 grados'], ['Ángulo obtuso', 'más de 90 grados'],
    ['Ángulos de un triángulo', 'suman 180 grados'], ['Ángulos de un cuadrado', 'suman 360 grados'],
    ['Diámetro', 'el doble del radio'], ['Radio', 'la mitad del diámetro'], ['Pi (π)', 'aproximadamente 3.14'],
  ];
  const exs = [];
  for (let i = 0; i < n; i++) {
    const [a, b] = pick(facts);
    const wrongs = pickN(facts.filter(f => f[1] !== b), 2).map(f => f[1]);
    exs.push(mcQ(unitId, `¿Qué es ${a}?`, shuffle([b, ...wrongs]), b, d, i));
  }
  return exs;
}
function ratioUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const k = ri(2, 6);
    const a = ri(2, 5), b = ri(2, 5);
    const res = a * k;
    const opts = shuffle([String(res), String(res + a), String(res - a)]);
    exs.push(mcQ(unitId, `Si la razón es ${a}:${b} y hay ${b * k} de la segunda, ¿cuántos hay de la primera?`, opts, String(res), d, i));
  }
  return exs;
}
function probabilityUnitN(unitId, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    const total = ri(4, 10);
    const fav = ri(1, total - 1);
    const opts = shuffle([`${fav}/${total}`, `${fav + 1}/${total}`, `${fav}/${total + 1}`]);
    exs.push(mcQ(unitId, `Hay ${total} canicas y ${fav} son rojas. ¿Cuál es la probabilidad de sacar una roja?`, opts, `${fav}/${total}`, d, i));
  }
  return exs;
}
function trigUnitN(unitId, n, d = 1) {
  const facts = [
    ['seno de 30°', '0.5'], ['coseno de 60°', '0.5'], ['seno de 90°', '1'], ['coseno de 0°', '1'],
    ['seno de 45°', '√2/2'], ['coseno de 45°', '√2/2'], ['tangente de 45°', '1'], ['seno de 0°', '0'],
  ];
  const exs = [];
  for (let i = 0; i < n; i++) {
    const [a, b] = pick(facts);
    const wrongs = pickN(facts.filter(f => f[1] !== b), 2).map(f => f[1]);
    exs.push(mcQ(unitId, `¿Cuál es el ${a}?`, shuffle([b, ...wrongs]), b, d, i));
  }
  return exs;
}
function wordProblemUnitN(unitId, kind, n, d = 1) {
  const exs = [];
  for (let i = 0; i < n; i++) {
    let q, res, opts;
    if (kind === 'sum') {
      const a = ri(2, 20), b = ri(2, 20);
      res = a + b;
      q = `Ana tiene ${a} manzanas y recibe ${b} más. ¿Cuántas tiene en total?`;
      opts = shuffle([String(res), String(res + 1), String(res - 1)]);
    } else if (kind === 'rest') {
      const a = ri(10, 30), b = ri(1, a - 1);
      res = a - b;
      q = `Había ${a} globos y se reventaron ${b}. ¿Cuántos quedan?`;
      opts = shuffle([String(res), String(res + 1), String(res - 1)]);
    } else if (kind === 'mult') {
      const a = ri(2, 9), b = ri(2, 9);
      res = a * b;
      q = `Hay ${a} cajas con ${b} lápices cada una. ¿Cuántos lápices hay en total?`;
      opts = shuffle([String(res), String(res + a), String(res - b)]);
    } else if (kind === 'div') {
      const b = ri(2, 9), k = ri(2, 9);
      const a = b * k;
      res = k;
      q = `Se reparten ${a} dulces entre ${b} niños. ¿Cuántos le tocan a cada uno?`;
      opts = shuffle([String(res), String(res + 1), String(res - 1)]);
    }
    exs.push(mcQ(unitId, q, opts, String(res), d, i));
  }
  return exs;
}

/* ---------- Plantilla de vocabulario (idiomas) ---------- */
function vocabUnit(unitId, langName, words, opts = {}) {
  const allowFB = opts.allowFB !== false;
  const exs = [];
  const esWords = words.map(w => w.es);
  const tWords = words.map(w => w.t);
  let s = 0;
  for (const w of words) {
    const optsT = shuffle([w.t, ...pickN(tWords.filter(x => x !== w.t), 3)]);
    exs.push(mc(unitId, T(`¿Cómo se dice «${w.es}» en ${langName}?`, `How do you say "${w.es}" in ${langName}?`, `Wie sagt man "${w.es}" auf ${langName}?`), optsT, w.t, 1, s++));
    const optsE = shuffle([w.es, ...pickN(esWords.filter(x => x !== w.es), 3)]);
    exs.push(mc(unitId, T(`¿Qué significa «${w.t}»?`, `What does "${w.t}" mean?`, `Was bedeutet "${w.t}"?`), optsE, w.es, 1, s++));
    const wrong = pick(tWords.filter(x => x !== w.t));
    exs.push(tf(unitId, T(`«${w.es}» en ${langName} es «${w.t}»`, `"${w.es}" in ${langName} is "${w.t}"`, `"${w.es}" auf ${langName} ist "${w.t}"`), true, 1, s++));
    exs.push(tf(unitId, T(`«${w.es}» en ${langName} es «${wrong}»`, `"${w.es}" in ${langName} is "${wrong}"`, `"${w.es}" auf ${langName} ist "${wrong}"`), false, 1, s++));
    if (allowFB) {
      exs.push(fb(unitId, T(`Escribe en ${langName}: ${w.es}`, `Write in ${langName}: ${w.es}`, `Schreibe auf ${langName}: ${w.es}`), w.t, [w.t, w.t.toLowerCase()], 1, s++));
    }
  }
  const dmWords = shuffle(words).slice(0, Math.floor(words.length / 4) * 4);
  for (let i = 0; i + 3 < dmWords.length; i += 4) {
    exs.push(dm(unitId, T('Une cada palabra con su significado', 'Match each word with its meaning', 'Ordne jedes Wort seiner Bedeutung zu'), dmWords.slice(i, i + 4).map(w => [w.es, w.t]), 1, s++));
  }
  return exs;
}

/* ---------- Plantilla de hechos (materias de contenido) ---------- */
function factUnit(unitId, facts, opts = {}) {
  // facts: [{t: término, d: definición}]
  const exs = [];
  let s = 0;
  const n = facts.length;
  for (let i = 0; i < n; i++) {
    const f = facts[i];
    const wrongs = pickN(facts.filter(x => x.t !== f.t), 2).map(x => x.d);
    exs.push(mcQ(unitId, `¿Qué es ${f.t}?`, shuffle([f.d, ...wrongs]), f.d, 1, s++));
    const wrongT = pickN(facts.filter(x => x.t !== f.t), 2).map(x => x.t);
    exs.push(mcQ(unitId, `¿Qué término corresponde a: «${f.d}»?`, shuffle([f.t, ...wrongT]), f.t, 1, s++));
    exs.push(tfQ(unitId, `${f.t}: ${f.d}`, true, 1, s++));
    const other = pick(facts.filter(x => x.t !== f.t));
    exs.push(tfQ(unitId, `${f.t}: ${other.d}`, false, 1, s++));
    if (opts.fb !== false && i % 2 === 0) {
      exs.push(fb(unitId, T(`Escribe el término: ${f.d}`, `Write the term: ${f.d}`, `Schreibe den Begriff: ${f.d}`), f.t, [f.t, f.t.toLowerCase()], 1, s++));
    }
  }
  const groups = [];
  for (let i = 0; i + 3 < n; i += 4) groups.push(facts.slice(i, i + 4));
  for (const g of groups) {
    exs.push(dmQ(unitId, 'Une cada término con su definición', g.map(x => [x.t, x.d]), 1, s++));
  }
  return exs;
}

/* ---------- Registro de catálogo ---------- */
const SUBJECTS = [], LEVELS = [], UNITS = [];
let subjId = 0, levelId = 0, unitId = 0;
function addSubject(code, name_es, name_en, name_de, color, icon) {
  SUBJECTS.push({ id: ++subjId, code, name_es, name_en, name_de, color, icon, sort_order: subjId });
  return subjId;
}
function addLevel(subjectId, code, name_es, name_en, name_de) {
  LEVELS.push({ id: ++levelId, code, name_es, name_en, name_de, sort_order: levelId });
  return levelId;
}
function addUnit(subjectId, levelId, title_es, title_en, title_de, gen) {
  UNITS.push({ id: ++unitId, subject_id: subjectId, level_id: levelId, title_es, title_en, title_de, sort_order: unitId, gen });
}

/* ---------- Contexto compartido para los módulos de contenido ---------- */
const ctx = {
  addSubject, addLevel, addUnit,
  mc, fb, tf, dm, mcQ, tfQ, dmQ, T,
  ri, pick, shuffle, pickN, rand,
  arithMC, arithFB, negArithMC, countMC, compareMC,
  arithUnitN, countUnitN, compareUnitN, seqUnitN, patternUnitN, negUnitN,
  fractionUnitN, decimalUnitN, percentUnitN, equationUnitN, exponentUnitN, sqrtUnitN,
  areaUnitN, perimeterUnitN, volumeUnitN, meanUnitN, roundingUnitN, moneyUnitN,
  timeUnitN, measureUnitN, geometryFactUnitN, ratioUnitN, probabilityUnitN, trigUnitN,
  wordProblemUnitN, vocabUnit, factUnit,
};

/* ============================================================
 * CURRÍCULO (módulos por materia)
 * ============================================================ */
require('./content/mate')(ctx);
require('./content/espanol')(ctx);
require('./content/ingles')(ctx);
require('./content/portugues')(ctx);
require('./content/ciencias')(ctx);
require('./content/biologia')(ctx);
require('./content/quimica')(ctx);
require('./content/fisica')(ctx);
require('./content/historia')(ctx);
require('./content/varios')(ctx);

/* ============================================================
 * GENERACIÓN
 * ============================================================ */
const EXERCISES = [];
for (const u of UNITS) {
  const generated = u.gen(u.id) || [];
  generated.forEach((e, i) => { e.sort_order = i; });
  EXERCISES.push(...generated);
}

/* ---------- Validación ---------- */
const problems = [];
const seenEx = new Set();
for (const e of EXERCISES) {
  if (seenEx.has(e.id)) problems.push(`Ejercicio duplicado: ${e.id}`);
  seenEx.add(e.id);
  const p = JSON.parse(e.payload);
  if (e.type === 'multiple_choice') {
    if (!Array.isArray(p.options) || p.options.length < 2) problems.push(`MC sin opciones: ${e.id}`);
    if (typeof p.correct !== 'number' || p.correct < 0 || p.correct >= p.options.length) problems.push(`MC correct inválido: ${e.id}`);
  }
  if (e.type === 'drag_match') {
    const rights = p.pairs.map(x => x[1]);
    if (new Set(rights).size !== rights.length) problems.push(`DM valores duplicados: ${e.id}`);
  }
  if (e.type === 'fill_blank' && (!p.answer || !Array.isArray(p.accept))) problems.push(`FB inválido: ${e.id}`);
  if (e.type === 'true_false' && typeof p.answer !== 'boolean') problems.push(`TF inválido: ${e.id}`);
}
const unitsPerLevel = {};
for (const u of UNITS) unitsPerLevel[u.level_id] = (unitsPerLevel[u.level_id] || 0) + 1;
for (const l of LEVELS) {
  const n = unitsPerLevel[l.id] || 0;
  if (n === 0) problems.push(`Nivel sin unidades: ${l.code}`);
}
const exPerSubject = {};
for (const e of EXERCISES) {
  const u = UNITS.find(x => x.id === e.unit_id);
  exPerSubject[u.subject_id] = (exPerSubject[u.subject_id] || 0) + 1;
}

if (problems.length) {
  console.error('PROBLEMAS ENCONTRADOS:');
  problems.forEach(p => console.error(' -', p));
  process.exit(1);
}

/* ---------- Salida compacta (omite traducciones redundantes) ---------- */
function compactExercise(e) {
  const o = { id: e.id, unit_id: e.unit_id, type: e.type, prompt_es: e.prompt_es };
  if (e.prompt_en !== e.prompt_es) o.prompt_en = e.prompt_en;
  if (e.prompt_de !== e.prompt_es) o.prompt_de = e.prompt_de;
  o.payload = e.payload;
  o.difficulty = e.difficulty;
  o.points = e.points;
  o.sort_order = e.sort_order;
  return o;
}
function compactUnit(u) {
  const o = { id: u.id, subject_id: u.subject_id, level_id: u.level_id, title_es: u.title_es };
  if (u.title_en !== u.title_es) o.title_en = u.title_en;
  if (u.title_de !== u.title_es) o.title_de = u.title_de;
  o.sort_order = u.sort_order;
  return o;
}
function compactSubject(s) {
  const o = { id: s.id, code: s.code, name_es: s.name_es };
  if (s.name_en !== s.name_es) o.name_en = s.name_en;
  if (s.name_de !== s.name_es) o.name_de = s.name_de;
  o.color = s.color; o.icon = s.icon; o.sort_order = s.sort_order;
  return o;
}
function compactLevel(l) {
  const o = { id: l.id, code: l.code, name_es: l.name_es };
  if (l.name_en !== l.name_es) o.name_en = l.name_en;
  if (l.name_de !== l.name_es) o.name_de = l.name_de;
  o.sort_order = l.sort_order;
  return o;
}

const catalog = {
  subjects: SUBJECTS.map(compactSubject),
  levels: LEVELS.map(compactLevel),
  units: UNITS.map(compactUnit),
  exercises: EXERCISES.map(compactExercise),
};
const out = `/* ===== Catálogo de contenido educativo =====
 * Generado por tools/generar-catalogo.js (currículo pedagógico propio).
 * NO modificar a mano: ejecutar "node tools/generar-catalogo.js".
 * ${new Date().toISOString()}
 */
window.CATALOG = ${JSON.stringify(catalog)};
`;
const target = path.join(__dirname, '..', 'js', 'catalog.js');
fs.writeFileSync(target, out, 'utf8');
const sizeMB = (fs.statSync(target).size / 1024 / 1024).toFixed(1);
console.log(`OK: ${SUBJECTS.length} materias, ${LEVELS.length} niveles, ${UNITS.length} unidades, ${EXERCISES.length} ejercicios (${sizeMB} MB) -> js/catalog.js`);
console.log('Por materia:', Object.entries(exPerSubject).map(([k, v]) => `${SUBJECTS.find(s => s.id === Number(k)).code}:${v}`).join(' '));