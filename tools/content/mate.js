/* ============================================================
 * MATEMÁTICAS — 15 000 ejercicios, 9 niveles (g1-g6, s1-s3)
 * Generación procedimental: cada unidad produce ejercicios únicos.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, ri, pick, shuffle, pickN } = ctx;
  const {
    arithUnitN, countUnitN, compareUnitN, seqUnitN, patternUnitN, negUnitN,
    fractionUnitN, decimalUnitN, percentUnitN, equationUnitN, exponentUnitN, sqrtUnitN,
    areaUnitN, perimeterUnitN, volumeUnitN, meanUnitN, roundingUnitN, moneyUnitN,
    timeUnitN, measureUnitN, geometryFactUnitN, ratioUnitN, probabilityUnitN, trigUnitN,
    wordProblemUnitN,
  } = ctx;

  const s = addSubject('mate', 'Matemáticas', 'Math', 'Mathe', '#2196F3', '🔢');

  /* ===== 1er grado ===== */
  {
    const l = addLevel(s, 'mate-g1', '1er grado', 'Grade 1', 'Klasse 1');
    addUnit(s, l, 'Los números hasta 10', 'Numbers up to 10', 'Zahlen bis 10', (u) => {
      const exs = [];
      exs.push(...countUnitN(u, ['🍎', '⭐', '🐟', '🌸', '⚽', '🍬'], 1, 10, 40));
      exs.push(...compareUnitN(u, 1, 10, 40));
      exs.push(...seqUnitN(u, 1, 6, 1, 1, 40));
      exs.push(...arithUnitN(u, ['+'], 1, 5, 40));
      return exs;
    });
    addUnit(s, l, 'Los números hasta 20', 'Numbers up to 20', 'Zahlen bis 20', (u) => {
      const exs = [];
      exs.push(...countUnitN(u, ['🍎', '⭐', '🐟', '🌸', '⚽', '🍬'], 10, 20, 40));
      exs.push(...compareUnitN(u, 1, 20, 40));
      exs.push(...seqUnitN(u, 1, 16, 1, 1, 40));
      exs.push(...arithUnitN(u, ['+'], 1, 10, 40));
      return exs;
    });
    addUnit(s, l, 'Sumas hasta 10', 'Addition up to 10', 'Addition bis 10', (u) => arithUnitN(u, ['+'], 1, 9, 140));
    addUnit(s, l, 'Restas hasta 10', 'Subtraction up to 10', 'Subtraktion bis 10', (u) => arithUnitN(u, ['−'], 1, 10, 140));
    addUnit(s, l, 'Sumas hasta 20', 'Addition up to 20', 'Addition bis 20', (u) => arithUnitN(u, ['+'], 1, 19, 140));
    addUnit(s, l, 'Restas hasta 20', 'Subtraction up to 20', 'Subtraktion bis 20', (u) => arithUnitN(u, ['−'], 1, 20, 140));
    addUnit(s, l, 'Decenas y unidades', 'Tens and ones', 'Zehner und Einer', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const d = ri(1, 9), u2 = ri(0, 9);
        const num = d * 10 + u2;
        const opts = shuffle([String(num), String(u2 * 10 + d), String(num + 10)]);
        exs.push(mcQ(u, `¿Qué número es ${d} decenas y ${u2} unidades?`, opts, String(num), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Patrones y secuencias', 'Patterns and sequences', 'Muster und Folgen', (u) => {
      const exs = [];
      exs.push(...patternUnitN(u, 60));
      exs.push(...seqUnitN(u, 1, 10, 2, 2, 60));
      return exs;
    });
    addUnit(s, l, 'Figuras geométricas', 'Shapes', 'Formen', (u) => {
      const exs = [];
      exs.push(...geometryFactUnitN(u, 80));
      exs.push(dmQ(u, 'Une cada figura con sus lados', [['Triángulo', '3'], ['Cuadrado', '4'], ['Pentágono', '5'], ['Hexágono', '6']], 1, 40));
      exs.push(dmQ(u, 'Une cada figura con su nombre', [['🔺', 'Triángulo'], ['⬛', 'Cuadrado'], ['🔵', 'Círculo'], ['📏', 'Rectángulo']], 1, 41));
      return exs;
    });
    addUnit(s, l, 'Contar de 2 en 2, 5 en 5 y 10 en 10', 'Skip counting', 'Zählen in Schritten', (u) => {
      const exs = [];
      exs.push(...seqUnitN(u, 2, 20, 2, 2, 40));
      exs.push(...seqUnitN(u, 5, 25, 5, 5, 40));
      exs.push(...seqUnitN(u, 10, 40, 10, 10, 40));
      return exs;
    });
    addUnit(s, l, 'Dobles y mitades', 'Doubles and halves', 'Doppelte und Hälften', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const a = ri(1, 10);
        const opts = shuffle([String(a * 2), String(a * 2 + 1), String(a * 2 - 1)]);
        exs.push(mcQ(u, `¿Cuánto es el doble de ${a}?`, opts, String(a * 2), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Problemas de suma', 'Addition word problems', 'Textaufgaben Addition', (u) => wordProblemUnitN(u, 'sum', 120));
    addUnit(s, l, 'Problemas de resta', 'Subtraction word problems', 'Textaufgaben Subtraktion', (u) => wordProblemUnitN(u, 'rest', 120));
    addUnit(s, l, 'Monedas y billetes', 'Coins and bills', 'Münzen und Scheine', (u) => moneyUnitN(u, 100));
    addUnit(s, l, 'El reloj: horas en punto', 'The clock: o\'clock', 'Die Uhr: volle Stunden', (u) => timeUnitN(u, 100));
    addUnit(s, l, 'Medidas: largo y corto', 'Measurement: long and short', 'Maße: lang und kurz', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const a = ri(1, 9), b = ri(1, 9);
        const opts = shuffle([`${a} cm`, `${b} cm`, `${a + b} cm`]);
        exs.push(mcQ(u, `¿Qué es más largo: ${a} cm o ${b} cm?`, opts, `${Math.max(a, b)} cm`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sumas de tres números', 'Adding three numbers', 'Drei Zahlen addieren', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const a = ri(1, 5), b = ri(1, 5), c = ri(1, 5);
        const res = a + b + c;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `¿Cuánto es ${a} + ${b} + ${c}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Números ordinales', 'Ordinal numbers', 'Ordnungszahlen', (u) => {
      const exs = [];
      const ord = ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];
      for (let i = 0; i < 100; i++) {
        const pos = ri(1, 10);
        const opts = shuffle([ord[pos - 1], ord[ri(0, 9)], ord[ri(0, 9)]]);
        exs.push(mcQ(u, `¿Qué posición ocupa el número ${pos} en la fila?`, opts, ord[pos - 1], 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...arithUnitN(u, ['+', '−'], 1, 10, 80));
      exs.push(...compareUnitN(u, 1, 20, 40));
      exs.push(...seqUnitN(u, 1, 10, 1, 2, 40));
      return exs;
    });
  }

  /* ===== 2do grado ===== */
  {
    const l = addLevel(s, 'mate-g2', '2do grado', 'Grade 2', 'Klasse 2');
    addUnit(s, l, 'Los números hasta 100', 'Numbers up to 100', 'Zahlen bis 100', (u) => {
      const exs = [];
      exs.push(...compareUnitN(u, 1, 100, 60));
      exs.push(...seqUnitN(u, 1, 60, 1, 5, 60));
      exs.push(...arithUnitN(u, ['+'], 1, 50, 40));
      return exs;
    });
    addUnit(s, l, 'Sumas hasta 100', 'Addition up to 100', 'Addition bis 100', (u) => arithUnitN(u, ['+'], 1, 99, 140));
    addUnit(s, l, 'Restas hasta 100', 'Subtraction up to 100', 'Subtraktion bis 100', (u) => arithUnitN(u, ['−'], 1, 100, 140));
    addUnit(s, l, 'Sumas con llevadas', 'Addition with carrying', 'Addition mit Übertrag', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const a = ri(15, 49), b = ri(15, 49);
        const res = a + b;
        const opts = shuffle([String(res), String(res + 10), String(res - 10)]);
        exs.push(mcQ(u, `¿Cuánto es ${a} + ${b}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Restas con llevadas', 'Subtraction with borrowing', 'Subtraktion mit Übertrag', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const a = ri(30, 99), b = ri(11, a - 1);
        const res = a - b;
        const opts = shuffle([String(res), String(res + 10), String(res - 10)]);
        exs.push(mcQ(u, `¿Cuánto es ${a} − ${b}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Multiplicación: tablas del 2, 3, 4 y 5', 'Multiplication: 2, 3, 4, 5 tables', 'Multiplikation: 2er, 3er, 4er, 5er', (u) => arithUnitN(u, ['×'], 2, 5, 140));
    addUnit(s, l, 'División: repartir en partes iguales', 'Division: equal sharing', 'Division: gerechtes Teilen', (u) => arithUnitN(u, ['÷'], 2, 5, 120));
    addUnit(s, l, 'Fracciones: mitad, tercio y cuarto', 'Fractions: half, third, quarter', 'Brüche: halb, drittel, viertel', (u) => {
      const exs = [];
      const fracs = [['mitad', 2], ['tercio', 3], ['cuarto', 4]];
      for (let i = 0; i < 120; i++) {
        const [name, den] = pick(fracs);
        const a = ri(2, 12);
        const res = a / den;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `¿Cuánto es la ${name} de ${a}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Patrones y secuencias', 'Patterns and sequences', 'Muster und Folgen', (u) => {
      const exs = [];
      exs.push(...seqUnitN(u, 1, 30, 2, 5, 80));
      exs.push(...patternUnitN(u, 40));
      return exs;
    });
    addUnit(s, l, 'Geometría: perímetro', 'Geometry: perimeter', 'Geometrie: Umfang', (u) => perimeterUnitN(u, 120));
    addUnit(s, l, 'Redondeo a la decena', 'Rounding to tens', 'Runden auf Zehner', (u) => roundingUnitN(u, 120));
    addUnit(s, l, 'El reloj: media hora', 'The clock: half hour', 'Die Uhr: halbe Stunden', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const h = ri(1, 12);
        const opts = shuffle([`${h}:30`, `${h}:00`, `${h + 1}:30`]);
        exs.push(mcQ(u, `¿Qué hora es si el reloj marca las ${h} y media?`, opts, `${h}:30`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Medidas: centímetros y metros', 'Measurement: cm and m', 'Maße: cm und m', (u) => measureUnitN(u, 100));
    addUnit(s, l, 'Problemas de suma y resta', 'Addition and subtraction problems', 'Textaufgaben', (u) => {
      const exs = [];
      exs.push(...wordProblemUnitN(u, 'sum', 60));
      exs.push(...wordProblemUnitN(u, 'rest', 60));
      return exs;
    });
    addUnit(s, l, 'Problemas de multiplicación', 'Multiplication problems', 'Multiplikationsaufgaben', (u) => wordProblemUnitN(u, 'mult', 100));
    addUnit(s, l, 'Comparar números', 'Comparing numbers', 'Zahlen vergleichen', (u) => compareUnitN(u, 1, 100, 120));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...arithUnitN(u, ['+', '−'], 1, 50, 60));
      exs.push(...arithUnitN(u, ['×'], 2, 5, 40));
      exs.push(...compareUnitN(u, 1, 100, 40));
      return exs;
    });
  }

  /* ===== 3er grado ===== */
  {
    const l = addLevel(s, 'mate-g3', '3er grado', 'Grade 3', 'Klasse 3');
    addUnit(s, l, 'Tablas de multiplicar (2-9)', 'Multiplication tables (2-9)', 'Einmaleins (2-9)', (u) => arithUnitN(u, ['×'], 2, 9, 160));
    addUnit(s, l, 'División exacta', 'Exact division', 'Exakte Division', (u) => arithUnitN(u, ['÷'], 2, 9, 160));
    addUnit(s, l, 'Sumas y restas hasta 1000', 'Addition and subtraction up to 1000', 'Addition und Subtraktion bis 1000', (u) => {
      const exs = [];
      exs.push(...arithUnitN(u, ['+'], 100, 500, 80));
      exs.push(...arithUnitN(u, ['−'], 100, 500, 80));
      return exs;
    });
    addUnit(s, l, 'Fracciones equivalentes', 'Equivalent fractions', 'Äquivalente Brüche', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const k = ri(2, 4), a = ri(1, 3);
        const opts = shuffle([`${a * k}/${2 * k}`, `${a * k + 1}/${2 * k}`, `${a}/${2 * k}`]);
        exs.push(mcQ(u, `¿Qué fracción es equivalente a ${a}/2?`, opts, `${a * k}/${2 * k}`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Suma de fracciones', 'Adding fractions', 'Brüche addieren', (u) => fractionUnitN(u, 120));
    addUnit(s, l, 'Décimos y centésimos', 'Tenths and hundredths', 'Zehntel und Hundertstel', (u) => decimalUnitN(u, ['+'], 1, 9, 120));
    addUnit(s, l, 'Área de rectángulos', 'Area of rectangles', 'Fläche von Rechtecken', (u) => areaUnitN(u, 120));
    addUnit(s, l, 'Perímetro', 'Perimeter', 'Umfang', (u) => perimeterUnitN(u, 120));
    addUnit(s, l, 'Redondeo a la centena', 'Rounding to hundreds', 'Runden auf Hunderter', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const v = ri(101, 999);
        const res = Math.round(v / 100) * 100;
        const opts = shuffle([String(res), String(res + 100), String(res - 100)]);
        exs.push(mcQ(u, `Redondea ${v} a la centena más cercana`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'El reloj: minutos', 'The clock: minutes', 'Die Uhr: Minuten', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const h = ri(1, 12), m = pick([15, 20, 25, 35, 40, 45, 50, 55]);
        const opts = shuffle([`${h}:${m}`, `${h}:${m + 5}`, `${h + 1}:${m}`]);
        exs.push(mcQ(u, `¿Qué hora es si el reloj marca ${h} horas y ${m} minutos?`, opts, `${h}:${m}`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Medidas: kilogramos y litros', 'Measurement: kg and L', 'Maße: kg und L', (u) => measureUnitN(u, 100));
    addUnit(s, l, 'Ángulos: agudo, recto y obtuso', 'Angles: acute, right, obtuse', 'Winkel: spitz, recht, stumpf', (u) => geometryFactUnitN(u, 100));
    addUnit(s, l, 'Problemas de dos pasos', 'Two-step problems', 'Zweischrittige Aufgaben', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
        const res = a * b + c;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `Hay ${a} bolsas con ${b} canicas y ${c} sueltas. ¿Cuántas canicas hay en total?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Problemas de división', 'Division problems', 'Divisionsaufgaben', (u) => wordProblemUnitN(u, 'div', 100));
    addUnit(s, l, 'Secuencias numéricas', 'Number sequences', 'Zahlenfolgen', (u) => seqUnitN(u, 1, 30, 2, 9, 120));
    addUnit(s, l, 'Comparar fracciones', 'Comparing fractions', 'Brüche vergleichen', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const den = pick([2, 3, 4, 5, 6]);
        const a = ri(1, den - 1), b = ri(1, den - 1);
        if (a === b) continue;
        const sym = a > b ? '>' : '<';
        const opts = shuffle(['>', '<', '=']);
        exs.push(mcQ(u, `¿Qué símbolo falta? ${a}/${den} __ ${b}/${den}`, opts, sym, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...arithUnitN(u, ['×', '÷'], 2, 9, 60));
      exs.push(...arithUnitN(u, ['+', '−'], 10, 100, 60));
      exs.push(...areaUnitN(u, 20));
      return exs;
    });
  }

  /* ===== 4to grado ===== */
  {
    const l = addLevel(s, 'mate-g4', '4to grado', 'Grade 4', 'Klasse 4');
    addUnit(s, l, 'Multiplicación de dos cifras', 'Two-digit multiplication', 'Mehrstellige Multiplikation', (u) => {
      const exs = [];
      for (let i = 0; i < 140; i++) {
        const a = ri(11, 25), b = ri(11, 25);
        const res = a * b;
        const opts = shuffle([String(res), String(res + a), String(res - b)]);
        exs.push(mcQ(u, `¿Cuánto es ${a} × ${b}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'División larga', 'Long division', 'Schriftliche Division', (u) => {
      const exs = [];
      for (let i = 0; i < 140; i++) {
        const b = ri(3, 9), k = ri(11, 19);
        const a = b * k;
        const opts = shuffle([String(k), String(k + 1), String(k - 1)]);
        exs.push(mcQ(u, `¿Cuánto es ${a} ÷ ${b}?`, opts, String(k), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Decimales: décimos y centésimos', 'Decimals: tenths and hundredths', 'Dezimalzahlen', (u) => {
      const exs = [];
      exs.push(...decimalUnitN(u, ['+'], 1, 9, 80));
      exs.push(...decimalUnitN(u, ['−'], 1, 9, 80));
      return exs;
    });
    addUnit(s, l, 'Suma y resta de fracciones', 'Adding and subtracting fractions', 'Brüche addieren und subtrahieren', (u) => {
      const exs = [];
      exs.push(...fractionUnitN(u, 80));
      for (let i = 0; i < 60; i++) {
        const den = pick([2, 3, 4, 5, 6, 8]);
        const a = ri(2, den - 1), b = ri(1, a - 1);
        const res = a - b;
        const opts = shuffle([`${res}/${den}`, `${res + 1}/${den}`, `${res}/${den + 1}`]);
        exs.push(mcQ(u, `¿Cuánto es ${a}/${den} − ${b}/${den}?`, opts, `${res}/${den}`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Porcentajes básicos', 'Basic percentages', 'Grundlegende Prozente', (u) => percentUnitN(u, 120));
    addUnit(s, l, 'Ángulos en grados', 'Angles in degrees', 'Winkel in Grad', (u) => geometryFactUnitN(u, 120));
    addUnit(s, l, 'Área y perímetro', 'Area and perimeter', 'Fläche und Umfang', (u) => {
      const exs = [];
      exs.push(...areaUnitN(u, 80));
      exs.push(...perimeterUnitN(u, 80));
      return exs;
    });
    addUnit(s, l, 'Promedio', 'Average', 'Durchschnitt', (u) => meanUnitN(u, 120));
    addUnit(s, l, 'Redondeo de decimales', 'Rounding decimals', 'Dezimalzahlen runden', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const v = ri(1, 9) + ri(1, 9) / 10;
        const res = Math.round(v);
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `Redondea ${v} al entero más cercano`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Problemas con decimales', 'Decimal word problems', 'Textaufgaben mit Dezimalzahlen', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const a = ri(1, 9) + ri(1, 9) / 10, b = ri(1, 9) + ri(1, 9) / 10;
        const res = Math.round((a + b) * 10) / 10;
        const opts = shuffle([String(res), String(res + 0.1), String(res - 0.1)]);
        exs.push(mcQ(u, `Ana compra algo de $${a} y algo de $${b}. ¿Cuánto gasta en total?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Fracciones y decimales', 'Fractions and decimals', 'Brüche und Dezimalzahlen', (u) => {
      const exs = [];
      const map = [['1/2', '0.5'], ['1/4', '0.25'], ['3/4', '0.75'], ['1/10', '0.1'], ['1/5', '0.2'], ['2/5', '0.4']];
      for (let i = 0; i < 100; i++) {
        const [f, dec] = pick(map);
        const wrongs = pickN(map.filter(x => x[1] !== dec), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué decimal es igual a ${f}?`, shuffle([dec, ...wrongs]), dec, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Medidas de capacidad', 'Capacity measurement', 'Maße: Volumen', (u) => measureUnitN(u, 100));
    addUnit(s, l, 'Problemas de varios pasos', 'Multi-step problems', 'Mehrschrittige Aufgaben', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
        const res = a * b - c;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `Hay ${a} cajas con ${b} juguetes y se regalan ${c}. ¿Cuántos quedan?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Secuencias y patrones', 'Sequences and patterns', 'Folgen und Muster', (u) => seqUnitN(u, 1, 20, 2, 9, 120));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...arithUnitN(u, ['×'], 2, 9, 40));
      exs.push(...decimalUnitN(u, ['+'], 1, 9, 40));
      exs.push(...percentUnitN(u, 40));
      exs.push(...meanUnitN(u, 20));
      return exs;
    });
  }

  /* ===== 5to grado ===== */
  {
    const l = addLevel(s, 'mate-g5', '5to grado', 'Grade 5', 'Klasse 5');
    addUnit(s, l, 'Operaciones con decimales', 'Decimal operations', 'Dezimaloperationen', (u) => {
      const exs = [];
      exs.push(...decimalUnitN(u, ['+'], 1, 9, 80));
      exs.push(...decimalUnitN(u, ['−'], 1, 9, 80));
      return exs;
    });
    addUnit(s, l, 'Fracciones con distinto denominador', 'Fractions with different denominators', 'Brüche mit verschiedenen Nennern', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const d1 = pick([2, 3, 4]), d2 = pick([3, 4, 6]);
        const a = ri(1, d1 - 1), b = ri(1, d2 - 1);
        const num = a * d2 + b * d1, den = d1 * d2;
        const opts = shuffle([`${num}/${den}`, `${num + 1}/${den}`, `${num}/${den + 1}`]);
        exs.push(mcQ(u, `¿Cuánto es ${a}/${d1} + ${b}/${d2}?`, opts, `${num}/${den}`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Porcentajes', 'Percentages', 'Prozente', (u) => percentUnitN(u, 140));
    addUnit(s, l, 'Razones', 'Ratios', 'Verhältnisse', (u) => ratioUnitN(u, 120));
    addUnit(s, l, 'Volumen de prismas', 'Volume of prisms', 'Volumen von Prismen', (u) => volumeUnitN(u, 120));
    addUnit(s, l, 'Área de triángulos', 'Area of triangles', 'Fläche von Dreiecken', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const b = ri(2, 12), h = ri(2, 12);
        const res = (b * h) / 2;
        const opts = shuffle([String(res), String(res + b), String(res - h)]);
        exs.push(mcQ(u, `¿Cuál es el área de un triángulo con base ${b} y altura ${h}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Mediana y moda', 'Median and mode', 'Median und Modus', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const base = ri(2, 8);
        const nums = [base, base, base + 1, base + 2, base + 2];
        const mode = base;
        const opts = shuffle([String(mode), String(mode + 1), String(mode - 1)]);
        exs.push(mcQ(u, `¿Cuál es la moda de ${nums.join(', ')}?`, opts, String(mode), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Números negativos', 'Negative numbers', 'Negative Zahlen', (u) => negUnitN(u, ['+', '−'], -10, 10, 120));
    addUnit(s, l, 'Plano cartesiano', 'Coordinate plane', 'Koordinatensystem', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const x = ri(1, 5), y = ri(1, 5);
        const opts = shuffle([`(${x}, ${y})`, `(${y}, ${x})`, `(${x + 1}, ${y})`]);
        exs.push(mcQ(u, `¿Qué punto está a ${x} unidades a la derecha y ${y} hacia arriba del origen?`, opts, `(${x}, ${y})`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Problemas con porcentajes', 'Percentage problems', 'Prozentaufgaben', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const p = pick([10, 20, 25, 50]);
        const base = pick([40, 60, 80, 100, 200]);
        const res = (p * base) / 100;
        const opts = shuffle([String(res), String(res + 10), String(res - 10)]);
        exs.push(mcQ(u, `Un artículo cuesta $${base} y tiene ${p}% de descuento. ¿Cuánto se descuenta?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Problemas con fracciones', 'Fraction problems', 'Bruchaufgaben', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const den = pick([2, 3, 4, 5]);
        const a = ri(2, 12);
        const res = a / den;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `Se reparten ${a} pizzas entre ${den} amigos. ¿Cuántas pizzas le tocan a cada uno?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Exponentes', 'Exponents', 'Exponenten', (u) => exponentUnitN(u, 120));
    addUnit(s, l, 'Raíces cuadradas', 'Square roots', 'Quadratwurzeln', (u) => sqrtUnitN(u, 120));
    addUnit(s, l, 'Secuencias y patrones', 'Sequences and patterns', 'Folgen und Muster', (u) => seqUnitN(u, 1, 10, 2, 9, 120));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...decimalUnitN(u, ['+', '−'], 1, 9, 40));
      exs.push(...percentUnitN(u, 40));
      exs.push(...volumeUnitN(u, 20));
      exs.push(...negUnitN(u, ['+'], -10, 10, 20));
      return exs;
    });
  }

  /* ===== 6to grado ===== */
  {
    const l = addLevel(s, 'mate-g6', '6to grado', 'Grade 6', 'Klasse 6');
    addUnit(s, l, 'Números enteros', 'Integers', 'Ganze Zahlen', (u) => negUnitN(u, ['+', '−'], -12, 12, 140));
    addUnit(s, l, 'Razones y proporciones', 'Ratios and proportions', 'Verhältnisse und Proportionen', (u) => ratioUnitN(u, 140));
    addUnit(s, l, 'Ecuaciones de un paso', 'One-step equations', 'Einfache Gleichungen', (u) => equationUnitN(u, 140));
    addUnit(s, l, 'Porcentajes avanzados', 'Advanced percentages', 'Fortgeschrittene Prozente', (u) => {
      const exs = [];
      exs.push(...percentUnitN(u, 80));
      for (let i = 0; i < 60; i++) {
        const p = pick([5, 15, 30, 40, 60]);
        const base = pick([20, 50, 80, 120, 250]);
        const res = (p * base) / 100;
        const opts = shuffle([String(res), String(res + 5), String(res - 5)]);
        exs.push(mcQ(u, `¿Cuánto es el ${p}% de ${base}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Círculos: radio y diámetro', 'Circles: radius and diameter', 'Kreise: Radius und Durchmesser', (u) => geometryFactUnitN(u, 120));
    addUnit(s, l, 'Probabilidad', 'Probability', 'Wahrscheinlichkeit', (u) => probabilityUnitN(u, 120));
    addUnit(s, l, 'Exponentes y potencias', 'Exponents and powers', 'Exponenten und Potenzen', (u) => exponentUnitN(u, 120));
    addUnit(s, l, 'Raíces cuadradas', 'Square roots', 'Quadratwurzeln', (u) => sqrtUnitN(u, 120));
    addUnit(s, l, 'Área de figuras compuestas', 'Area of composite figures', 'Fläche zusammengesetzter Figuren', (u) => {
      const exs = [];
      exs.push(...areaUnitN(u, 60));
      exs.push(...perimeterUnitN(u, 60));
      return exs;
    });
    addUnit(s, l, 'Volumen', 'Volume', 'Volumen', (u) => volumeUnitN(u, 120));
    addUnit(s, l, 'Promedio y mediana', 'Mean and median', 'Durchschnitt und Median', (u) => meanUnitN(u, 120));
    addUnit(s, l, 'Problemas de proporcionalidad', 'Proportionality problems', 'Proportionalitätsaufgaben', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const k = ri(2, 6), a = ri(2, 5);
        const res = a * k;
        const opts = shuffle([String(res), String(res + a), String(res - a)]);
        exs.push(mcQ(u, `Si ${a} lápices cuestan $${a * 2}, ¿cuánto cuestan ${a * k} lápices?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Ecuaciones con resta', 'Equations with subtraction', 'Gleichungen mit Subtraktion', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const x = ri(1, 12), a = ri(1, 12);
        const b = x - a;
        const opts = shuffle([String(x), String(x + 1), String(x - 1)]);
        exs.push(mcQ(u, `¿Cuál es el valor de x?  x − ${a} = ${b}`, opts, String(x), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Secuencias y patrones', 'Sequences and patterns', 'Folgen und Muster', (u) => seqUnitN(u, 1, 10, 2, 9, 120));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...negUnitN(u, ['+', '−'], -12, 12, 40));
      exs.push(...equationUnitN(u, 40));
      exs.push(...probabilityUnitN(u, 20));
      exs.push(...exponentUnitN(u, 20));
      return exs;
    });
  }

  /* ===== 1er año Secundaria ===== */
  {
    const l = addLevel(s, 'mate-s1', '1er año Secundaria', 'Secondary 1', 'Sekundarstufe 1');
    addUnit(s, l, 'Álgebra: ecuaciones lineales', 'Algebra: linear equations', 'Algebra: lineare Gleichungen', (u) => {
      const exs = [];
      exs.push(...equationUnitN(u, 80));
      for (let i = 0; i < 60; i++) {
        const x = ri(1, 10), a = ri(1, 10);
        const b = 2 * x + a;
        const opts = shuffle([String(x), String(x + 1), String(x - 1)]);
        exs.push(mcQ(u, `¿Cuál es el valor de x?  2x + ${a} = ${b}`, opts, String(x), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Funciones: tablas', 'Functions: tables', 'Funktionen: Tabellen', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const m = ri(2, 5), b = ri(1, 5);
        const x = ri(1, 6);
        const res = m * x + b;
        const opts = shuffle([String(res), String(res + m), String(res - m)]);
        exs.push(mcQ(u, `Si f(x) = ${m}x + ${b}, ¿cuánto es f(${x})?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Ángulos en triángulos', 'Angles in triangles', 'Winkel in Dreiecken', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const a = ri(30, 80), b = ri(30, 80);
        const res = 180 - a - b;
        const opts = shuffle([String(res), String(res + 10), String(res - 10)]);
        exs.push(mcQ(u, `Un triángulo tiene ángulos de ${a}° y ${b}°. ¿Cuánto mide el tercero?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Probabilidad', 'Probability', 'Wahrscheinlichkeit', (u) => probabilityUnitN(u, 120));
    addUnit(s, l, 'Estadística: promedio', 'Statistics: mean', 'Statistik: Durchschnitt', (u) => meanUnitN(u, 120));
    addUnit(s, l, 'Exponentes', 'Exponents', 'Exponenten', (u) => exponentUnitN(u, 120));
    addUnit(s, l, 'Notación científica', 'Scientific notation', 'Wissenschaftliche Notation', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const a = ri(2, 9), e = ri(2, 6);
        const res = a * Math.pow(10, e);
        const opts = shuffle([String(res), String(res * 10), String(res / 10)]);
        exs.push(mcQ(u, `¿Cuánto es ${a} × 10^${e}?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Raíces cuadradas', 'Square roots', 'Quadratwurzeln', (u) => sqrtUnitN(u, 120));
    addUnit(s, l, 'Razones y proporciones', 'Ratios and proportions', 'Verhältnisse und Proportionen', (u) => ratioUnitN(u, 120));
    addUnit(s, l, 'Área y volumen', 'Area and volume', 'Fläche und Volumen', (u) => {
      const exs = [];
      exs.push(...areaUnitN(u, 60));
      exs.push(...volumeUnitN(u, 60));
      return exs;
    });
    addUnit(s, l, 'Ecuaciones con paréntesis', 'Equations with parentheses', 'Gleichungen mit Klammern', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const x = ri(1, 8), a = ri(1, 5);
        const b = 3 * (x + a);
        const opts = shuffle([String(x), String(x + 1), String(x - 1)]);
        exs.push(mcQ(u, `¿Cuál es el valor de x?  3(x + ${a}) = ${b}`, opts, String(x), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Secuencias aritméticas', 'Arithmetic sequences', 'Arithmetische Folgen', (u) => seqUnitN(u, 1, 10, 2, 9, 120));
    addUnit(s, l, 'Porcentajes y descuentos', 'Percentages and discounts', 'Prozente und Rabatte', (u) => percentUnitN(u, 120));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...equationUnitN(u, 40));
      exs.push(...exponentUnitN(u, 30));
      exs.push(...probabilityUnitN(u, 20));
      exs.push(...meanUnitN(u, 20));
      return exs;
    });
  }

  /* ===== 2do año Secundaria ===== */
  {
    const l = addLevel(s, 'mate-s2', '2do año Secundaria', 'Secondary 2', 'Sekundarstufe 2');
    addUnit(s, l, 'Ecuaciones cuadráticas', 'Quadratic equations', 'Quadratische Gleichungen', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const r = ri(1, 8);
        const opts = shuffle([String(r), String(-r), String(r + 1)]);
        exs.push(mcQ(u, `¿Cuál es una solución de x² = ${r * r}?`, opts, String(r), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sistemas de ecuaciones', 'Systems of equations', 'Gleichungssysteme', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const x = ri(1, 8), y = ri(1, 8);
        const a = x + y, b = x - y;
        const opts = shuffle([`x=${x}, y=${y}`, `x=${y}, y=${x}`, `x=${x + 1}, y=${y}`]);
        exs.push(mcQ(u, `Resuelve: x + y = ${a}  y  x − y = ${b}`, opts, `x=${x}, y=${y}`, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Trigonometría básica', 'Basic trigonometry', 'Grundlegende Trigonometrie', (u) => trigUnitN(u, 120));
    addUnit(s, l, 'Sucesiones', 'Sequences', 'Folgen', (u) => seqUnitN(u, 1, 10, 2, 9, 120));
    addUnit(s, l, 'Estadística avanzada', 'Advanced statistics', 'Fortgeschrittene Statistik', (u) => meanUnitN(u, 120));
    addUnit(s, l, 'Probabilidad compuesta', 'Compound probability', 'Zusammengesetzte Wahrscheinlichkeit', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const a = ri(2, 6), b = ri(2, 6);
        const res = a * b;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `Lanzas un dado de ${a} caras y una moneda de ${b} caras. ¿Cuántos resultados posibles hay?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Funciones lineales', 'Linear functions', 'Lineare Funktionen', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const m = ri(2, 5), b = ri(1, 5);
        const x = ri(1, 6);
        const res = m * x + b;
        const opts = shuffle([String(res), String(res + m), String(res - m)]);
        exs.push(mcQ(u, `Si f(x) = ${m}x + ${b}, ¿cuánto es f(${x})?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Geometría: círculos', 'Geometry: circles', 'Geometrie: Kreise', (u) => geometryFactUnitN(u, 120));
    addUnit(s, l, 'Ecuaciones con fracciones', 'Equations with fractions', 'Gleichungen mit Brüchen', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const x = ri(2, 9), k = ri(2, 4);
        const res = x * k;
        const opts = shuffle([String(x), String(x + 1), String(x - 1)]);
        exs.push(mcQ(u, `¿Cuál es el valor de x?  x/${k} = ${res}`, opts, String(x), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...trigUnitN(u, 30));
      exs.push(...seqUnitN(u, 1, 10, 2, 9, 40));
      exs.push(...meanUnitN(u, 30));
      exs.push(...probabilityUnitN(u, 20));
      return exs;
    });
  }

  /* ===== 3er año Secundaria ===== */
  {
    const l = addLevel(s, 'mate-s3', '3er año Secundaria', 'Secondary 3', 'Sekundarstufe 3');
    addUnit(s, l, 'Funciones cuadráticas', 'Quadratic functions', 'Quadratische Funktionen', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const x = ri(1, 6), a = ri(1, 4);
        const res = a * x * x;
        const opts = shuffle([String(res), String(res + a), String(res - a)]);
        exs.push(mcQ(u, `Si f(x) = ${a}x², ¿cuánto es f(${x})?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sucesiones geométricas', 'Geometric sequences', 'Geometrische Folgen', (u) => {
      const exs = [];
      for (let i = 0; i < 120; i++) {
        const r = ri(2, 3), a = ri(2, 4);
        const terms = [a, a * r, a * r * r, a * r * r * r];
        const next = a * r * r * r * r;
        const opts = shuffle([String(next), String(next * r), String(next / r)]);
        exs.push(mcQ(u, `¿Qué número sigue? ${terms.join(', ')}, __`, opts, String(next), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Geometría: círculos y π', 'Geometry: circles and π', 'Geometrie: Kreise und π', (u) => geometryFactUnitN(u, 120));
    addUnit(s, l, 'Probabilidad avanzada', 'Advanced probability', 'Fortgeschrittene Wahrscheinlichkeit', (u) => probabilityUnitN(u, 120));
    addUnit(s, l, 'Logaritmos', 'Logarithms', 'Logarithmen', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const b = pick([2, 3, 10]), e = ri(2, 4);
        const res = e;
        const opts = shuffle([String(res), String(res + 1), String(res - 1)]);
        exs.push(mcQ(u, `¿Cuánto es log₍${b}₎(${Math.pow(b, e)})?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Funciones exponenciales', 'Exponential functions', 'Exponentialfunktionen', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const b = ri(2, 3), x = ri(2, 4);
        const res = Math.pow(b, x);
        const opts = shuffle([String(res), String(res * b), String(res / b)]);
        exs.push(mcQ(u, `Si f(x) = ${b}^x, ¿cuánto es f(${x})?`, opts, String(res), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Trigonometría', 'Trigonometry', 'Trigonometrie', (u) => trigUnitN(u, 120));
    addUnit(s, l, 'Estadística: desviación', 'Statistics: deviation', 'Statistik: Abweichung', (u) => meanUnitN(u, 120));
    addUnit(s, l, 'Ecuaciones cuadráticas', 'Quadratic equations', 'Quadratische Gleichungen', (u) => {
      const exs = [];
      for (let i = 0; i < 100; i++) {
        const r = ri(1, 8);
        const opts = shuffle([String(r), String(-r), String(r + 1)]);
        exs.push(mcQ(u, `¿Cuál es una solución de x² = ${r * r}?`, opts, String(r), 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => {
      const exs = [];
      exs.push(...trigUnitN(u, 30));
      exs.push(...probabilityUnitN(u, 30));
      exs.push(...meanUnitN(u, 30));
      exs.push(...exponentUnitN(u, 30));
      return exs;
    });
  }
};