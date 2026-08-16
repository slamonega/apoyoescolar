/* ============================================================
 * FÍSICA — 2 500 ejercicios, 1 nivel (sec)
 * Hechos (factUnit) + unidades procedimentales.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN, factUnit } = ctx;

  const s = addSubject('fisica', 'Física', 'Physics', 'Physik', '#00BCD4', '⚡');

  const F = [
    { t: 'La física', d: 'estudia la materia, la energía y sus interacciones' },
    { t: 'La magnitud', d: 'es una propiedad que se puede medir' },
    { t: 'La unidad', d: 'es la referencia para medir una magnitud' },
    { t: 'El metro', d: 'es la unidad de longitud' },
    { t: 'El kilogramo', d: 'es la unidad de masa' },
    { t: 'El segundo', d: 'es la unidad de tiempo' },
    { t: 'El amperio', d: 'es la unidad de corriente eléctrica' },
    { t: 'El kelvin', d: 'es la unidad de temperatura' },
    { t: 'El mol', d: 'es la unidad de cantidad de sustancia' },
    { t: 'La candela', d: 'es la unidad de intensidad luminosa' },
    { t: 'El movimiento', d: 'es el cambio de posición de un cuerpo' },
    { t: 'La trayectoria', d: 'es el camino que recorre un cuerpo' },
    { t: 'La distancia', d: 'es la longitud del camino recorrido' },
    { t: 'El desplazamiento', d: 'es la distancia en línea recta entre dos puntos' },
    { t: 'La velocidad', d: 'es la distancia recorrida por unidad de tiempo' },
    { t: 'La aceleración', d: 'es el cambio de velocidad por unidad de tiempo' },
    { t: 'El movimiento rectilíneo uniforme', d: 'tiene velocidad constante' },
    { t: 'El movimiento uniformemente acelerado', d: 'tiene aceleración constante' },
    { t: 'La caída libre', d: 'es un movimiento con aceleración de la gravedad' },
    { t: 'La gravedad', d: 'acelera los cuerpos a 9.8 m/s²' },
    { t: 'La fuerza', d: 'es toda interacción capaz de cambiar el movimiento' },
    { t: 'La fuerza neta', d: 'es la suma de todas las fuerzas' },
    { t: 'La masa', d: 'es la cantidad de materia de un cuerpo' },
    { t: 'El peso', d: 'es la fuerza de gravedad sobre un cuerpo' },
    { t: 'La inercia', d: 'es la tendencia a mantener el estado de movimiento' },
    { t: 'La primera ley de Newton', d: 'un cuerpo mantiene su movimiento si no hay fuerza neta' },
    { t: 'La segunda ley de Newton', d: 'F = m × a' },
    { t: 'La tercera ley de Newton', d: 'toda acción tiene una reacción igual y opuesta' },
    { t: 'La fricción', d: 'es una fuerza que se opone al movimiento' },
    { t: 'La tensión', d: 'es la fuerza transmitida por una cuerda' },
    { t: 'La normal', d: 'es la fuerza perpendicular de una superficie' },
    { t: 'El trabajo', d: 'es fuerza por distancia (W = F × d)' },
    { t: 'La energía', d: 'es la capacidad de realizar trabajo' },
    { t: 'La energía cinética', d: 'es la energía del movimiento' },
    { t: 'La energía potencial', d: 'es la energía almacenada por posición' },
    { t: 'La energía mecánica', d: 'es la suma de cinética y potencial' },
    { t: 'La potencia', d: 'es el trabajo por unidad de tiempo' },
    { t: 'El vatio', d: 'es la unidad de potencia' },
    { t: 'El julio', d: 'es la unidad de trabajo y energía' },
    { t: 'El newton', d: 'es la unidad de fuerza' },
    { t: 'La palanca', d: 'es una máquina simple con punto de apoyo' },
    { t: 'La polea', d: 'cambia la dirección de la fuerza' },
    { t: 'El plano inclinado', d: 'reduce la fuerza necesaria para subir' },
    { t: 'La presión', d: 'es la fuerza por unidad de área' },
    { t: 'El pascal', d: 'es la unidad de presión' },
    { t: 'La presión atmosférica', d: 'es la presión del aire sobre la Tierra' },
    { t: 'El principio de Arquímedes', d: 'un cuerpo sumergido recibe un empuje' },
    { t: 'La flotación', d: 'ocurre cuando el empuje supera el peso' },
    { t: 'La densidad', d: 'es la masa por unidad de volumen' },
    { t: 'La temperatura', d: 'mide la energía cinética promedio de las partículas' },
    { t: 'El calor', d: 'es la transferencia de energía térmica' },
    { t: 'La conducción', d: 'transfiere calor por contacto' },
    { t: 'La convección', d: 'transfiere calor por movimiento de fluidos' },
    { t: 'La radiación', d: 'transfiere calor por ondas' },
    { t: 'La dilatación', d: 'es el aumento de tamaño con la temperatura' },
    { t: 'El sonido', d: 'es una onda mecánica que necesita un medio' },
    { t: 'La frecuencia', d: 'es el número de vibraciones por segundo' },
    { t: 'El hercio', d: 'es la unidad de frecuencia' },
    { t: 'La amplitud', d: 'se relaciona con la intensidad del sonido' },
    { t: 'La resonancia', d: 'amplifica las vibraciones a la frecuencia natural' },
    { t: 'La luz', d: 'es una onda electromagnética' },
    { t: 'La reflexión', d: 'es el rebote de la luz en una superficie' },
    { t: 'La refracción', d: 'es el cambio de dirección de la luz al cambiar de medio' },
    { t: 'La difracción', d: 'es la desviación de las ondas al pasar por una abertura' },
    { t: 'El espectro visible', d: 'son los colores que podemos ver' },
    { t: 'La velocidad de la luz', d: 'es aproximadamente 300 000 km/s' },
    { t: 'La óptica', d: 'estudia la luz y sus fenómenos' },
    { t: 'La lente convergente', d: 'concentra los rayos de luz' },
    { t: 'La lente divergente', d: 'separa los rayos de luz' },
    { t: 'La electricidad', d: 'es el flujo de cargas eléctricas' },
    { t: 'La corriente eléctrica', d: 'es el flujo de electrones por un conductor' },
    { t: 'El voltaje', d: 'es la diferencia de potencial eléctrico' },
    { t: 'La resistencia', d: 'se opone al paso de la corriente' },
    { t: 'La ley de Ohm', d: 'V = I × R' },
    { t: 'El circuito en serie', d: 'tiene un solo camino para la corriente' },
    { t: 'El circuito en paralelo', d: 'tiene varios caminos para la corriente' },
    { t: 'Los conductores', d: 'permiten el paso de la corriente' },
    { t: 'Los aislantes', d: 'impiden el paso de la corriente' },
    { t: 'El magnetismo', d: 'es la fuerza de atracción o repulsión de los imanes' },
    { t: 'El campo magnético', d: 'es la región donde actúa un imán' },
    { t: 'La inducción electromagnética', d: 'genera corriente con un campo magnético cambiante' },
    { t: 'El electromagnetismo', d: 'une la electricidad y el magnetismo' },
    { t: 'Las ondas electromagnéticas', d: 'incluyen radio, microondas, luz y rayos X' },
    { t: 'La relatividad', d: 'es la teoría de Einstein sobre espacio y tiempo' },
    { t: 'La física cuántica', d: 'estudia el comportamiento de las partículas subatómicas' },
    { t: 'El fotón', d: 'es la partícula de la luz' },
    { t: 'La energía nuclear', d: 'proviene de reacciones en el núcleo atómico' },
  ];

  function unitMatchUnit(u, n) {
    const exs = [];
    const units = [
      ['fuerza', 'newton'], ['trabajo', 'julio'], ['potencia', 'vatio'], ['presión', 'pascal'],
      ['frecuencia', 'hercio'], ['corriente', 'amperio'], ['voltaje', 'voltio'], ['resistencia', 'ohmio'],
      ['temperatura', 'kelvin'], ['longitud', 'metro'], ['masa', 'kilogramo'], ['tiempo', 'segundo'],
    ];
    for (let i = 0; i < n; i++) {
      const [mag, unit] = pick(units);
      const wrongs = pickN(units.filter(x => x[0] !== mag), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Cuál es la unidad de ${mag}?`, shuffle([unit, ...wrongs]), unit, 1, i));
    }
    return exs;
  }
  function formulaUnit(u, n) {
    const exs = [];
    const formulas = [
      ['velocidad', 'distancia / tiempo'], ['aceleración', 'cambio de velocidad / tiempo'],
      ['fuerza', 'masa × aceleración'], ['trabajo', 'fuerza × distancia'],
      ['potencia', 'trabajo / tiempo'], ['densidad', 'masa / volumen'],
      ['presión', 'fuerza / área'], ['voltaje', 'corriente × resistencia'],
      ['peso', 'masa × gravedad'], ['energía cinética', '½ × masa × velocidad²'],
    ];
    for (let i = 0; i < n; i++) {
      const [mag, f] = pick(formulas);
      const wrongs = pickN(formulas.filter(x => x[0] !== mag), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Cómo se calcula ${mag}?`, shuffle([f, ...wrongs]), f, 1, i));
    }
    return exs;
  }
  function calcUnit(u, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const kind = ri(0, 3);
      if (kind === 0) {
        const d = ri(10, 100), t = ri(2, 10);
        const v = d / t;
        const opts = shuffle([String(v), String(v + 1), String(v - 1)]);
        exs.push(mcQ(u, `Un auto recorre ${d} m en ${t} s. ¿Cuál es su velocidad (m/s)?`, opts, String(v), 1, i));
      } else if (kind === 1) {
        const m = ri(2, 10), a = ri(2, 10);
        const f = m * a;
        const opts = shuffle([String(f), String(f + m), String(f - m)]);
        exs.push(mcQ(u, `Fuerza = masa × aceleración. Si m = ${m} kg y a = ${a} m/s², ¿cuál es la fuerza (N)?`, opts, String(f), 1, i));
      } else if (kind === 2) {
        const m = ri(2, 10), g = 9.8;
        const w = Math.round(m * g * 10) / 10;
        const opts = shuffle([String(w), String(Math.round((w + 9.8) * 10) / 10), String(Math.round((w - 9.8) * 10) / 10)]);
        exs.push(mcQ(u, `Peso = masa × gravedad. Si m = ${m} kg y g = 9.8 m/s², ¿cuál es el peso (N)?`, opts, String(w), 1, i));
      } else {
        const v = ri(5, 20), r = ri(2, 10);
        const i = Math.round((v / r) * 10) / 10;
        const opts = shuffle([String(i), String(Math.round((i + 1) * 10) / 10), String(Math.round((i - 1) * 10) / 10)]);
        exs.push(mcQ(u, `Ley de Ohm: V = I × R. Si V = ${v} V y R = ${r} Ω, ¿cuál es la corriente (A)?`, opts, String(i), 1, i));
      }
    }
    return exs;
  }
  function heatUnit(u, n) {
    const exs = [];
    const items = [
      ['cuchara de metal en sopa caliente', 'conducción'], ['agua hirviendo en una olla', 'convección'],
      ['calor del Sol', 'radiación'], ['mango de sartén', 'conducción'], ['aire caliente sube', 'convección'],
      ['lámpara incandescente', 'radiación'], ['hielo derritiéndose en la mano', 'conducción'], ['radiador de casa', 'convección'],
    ];
    for (let i = 0; i < n; i++) {
      const [item, mode] = pick(items);
      const wrongs = pickN(['conducción', 'convección', 'radiación'].filter(x => x !== mode), 2);
      exs.push(mcQ(u, `¿Cómo se transfiere el calor en: ${item}?`, shuffle([mode, ...wrongs]), mode, 1, i));
    }
    return exs;
  }
  function waveUnit(u, n) {
    const exs = [];
    const waves = [
      ['sonido', 'onda mecánica'], ['luz', 'onda electromagnética'], ['radio', 'onda electromagnética'],
      ['microondas', 'onda electromagnética'], ['rayos X', 'onda electromagnética'], ['olas del mar', 'onda mecánica'],
      ['cuerda vibrante', 'onda mecánica'], ['ultrasonido', 'onda mecánica'],
    ];
    for (let i = 0; i < n; i++) {
      const [w, type] = pick(waves);
      const wrongs = pickN(['onda mecánica', 'onda electromagnética'].filter(x => x !== type), 1);
      exs.push(mcQ(u, `${w} es...`, shuffle([type, ...wrongs]), type, 1, i));
    }
    return exs;
  }
  function circuitUnit(u, n) {
    const exs = [];
    const items = [
      ['cobre', 'conductor'], ['aluminio', 'conductor'], ['oro', 'conductor'], ['plástico', 'aislante'],
      ['madera', 'aislante'], ['vidrio', 'aislante'], ['goma', 'aislante'], ['cerámica', 'aislante'],
      ['hierro', 'conductor'], ['papel', 'aislante'],
    ];
    for (let i = 0; i < n; i++) {
      const [mat, type] = pick(items);
      const wrongs = pickN(['conductor', 'aislante'].filter(x => x !== type), 1);
      exs.push(mcQ(u, `${mat} es un...`, shuffle([type, ...wrongs]), type, 1, i));
    }
    return exs;
  }

  const l = addLevel(s, 'fisica-sec', 'Secundaria', 'Secondary', 'Sekundarstufe');
  addUnit(s, l, 'Magnitudes y unidades', 'Quantities and units', 'Größen und Einheiten', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La física', 'La magnitud', 'La unidad', 'El metro', 'El kilogramo', 'El segundo', 'El amperio', 'El kelvin', 'El mol', 'La candela'].includes(f.t)), { fb: false }));
    exs.push(...unitMatchUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Movimiento', 'Motion', 'Bewegung', (u) => factUnit(u, F.filter(f => ['El movimiento', 'La trayectoria', 'La distancia', 'El desplazamiento', 'La velocidad', 'La aceleración', 'El movimiento rectilíneo uniforme', 'El movimiento uniformemente acelerado', 'La caída libre', 'La gravedad'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Fuerzas y leyes de Newton', 'Forces and Newton\'s laws', 'Kräfte und Newtons Gesetze', (u) => factUnit(u, F.filter(f => ['La fuerza', 'La fuerza neta', 'La masa', 'El peso', 'La inercia', 'La primera ley de Newton', 'La segunda ley de Newton', 'La tercera ley de Newton', 'La fricción', 'La tensión', 'La normal'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Trabajo y energía', 'Work and energy', 'Arbeit und Energie', (u) => factUnit(u, F.filter(f => ['El trabajo', 'La energía', 'La energía cinética', 'La energía potencial', 'La energía mecánica', 'La potencia', 'El vatio', 'El julio', 'El newton'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Máquinas simples', 'Simple machines', 'Einfache Maschinen', (u) => factUnit(u, F.filter(f => ['La palanca', 'La polea', 'El plano inclinado'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Presión y fluidos', 'Pressure and fluids', 'Druck und Flüssigkeiten', (u) => factUnit(u, F.filter(f => ['La presión', 'El pascal', 'La presión atmosférica', 'El principio de Arquímedes', 'La flotación', 'La densidad'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Calor y temperatura', 'Heat and temperature', 'Wärme und Temperatur', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La temperatura', 'El calor', 'La conducción', 'La convección', 'La radiación', 'La dilatación'].includes(f.t)), { fb: false }));
    exs.push(...heatUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Sonido y ondas', 'Sound and waves', 'Schall und Wellen', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['El sonido', 'La frecuencia', 'El hercio', 'La amplitud', 'La resonancia'].includes(f.t)), { fb: false }));
    exs.push(...waveUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Luz y óptica', 'Light and optics', 'Licht und Optik', (u) => factUnit(u, F.filter(f => ['La luz', 'La reflexión', 'La refracción', 'La difracción', 'El espectro visible', 'La velocidad de la luz', 'La óptica', 'La lente convergente', 'La lente divergente'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Electricidad', 'Electricity', 'Elektrizität', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La electricidad', 'La corriente eléctrica', 'El voltaje', 'La resistencia', 'La ley de Ohm', 'El circuito en serie', 'El circuito en paralelo', 'Los conductores', 'Los aislantes'].includes(f.t)), { fb: false }));
    exs.push(...circuitUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Magnetismo y electromagnetismo', 'Magnetism and electromagnetism', 'Magnetismus und Elektromagnetismus', (u) => factUnit(u, F.filter(f => ['El magnetismo', 'El campo magnético', 'La inducción electromagnética', 'El electromagnetismo', 'Las ondas electromagnéticas'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Física moderna', 'Modern physics', 'Moderne Physik', (u) => factUnit(u, F.filter(f => ['La relatividad', 'La física cuántica', 'El fotón', 'La energía nuclear'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Cálculos de física', 'Physics calculations', 'Physikberechnungen', (u) => {
    const exs = [];
    exs.push(...formulaUnit(u, 180));
    exs.push(...calcUnit(u, 240));
    return exs;
  });
  addUnit(s, l, 'Repaso de física', 'Physics review', 'Physik Wiederholung', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F, { fb: false }));
    exs.push(...unitMatchUnit(u, 120));
    return exs;
  });
};