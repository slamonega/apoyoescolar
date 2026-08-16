/* ============================================================
 * QUÍMICA — 2 500 ejercicios, 1 nivel (sec)
 * Hechos (factUnit) + unidades procedimentales.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN, factUnit } = ctx;

  const s = addSubject('quimica', 'Química', 'Chemistry', 'Chemie', '#9C27B0', '⚗️');

  const F = [
    { t: 'La materia', d: 'es todo lo que tiene masa y ocupa un lugar' },
    { t: 'El átomo', d: 'es la unidad más pequeña de un elemento' },
    { t: 'El protón', d: 'tiene carga positiva y está en el núcleo' },
    { t: 'El neutrón', d: 'no tiene carga y está en el núcleo' },
    { t: 'El electrón', d: 'tiene carga negativa y orbita el núcleo' },
    { t: 'El núcleo atómico', d: 'contiene protones y neutrones' },
    { t: 'El número atómico', d: 'es el número de protones' },
    { t: 'La masa atómica', d: 'es la suma de protones y neutrones' },
    { t: 'Los isótopos', d: 'son átomos del mismo elemento con distinto número de neutrones' },
    { t: 'El elemento', d: 'es una sustancia formada por un solo tipo de átomo' },
    { t: 'El compuesto', d: 'es una sustancia formada por dos o más elementos' },
    { t: 'La molécula', d: 'es la unión de dos o más átomos' },
    { t: 'La tabla periódica', d: 'organiza los elementos por número atómico' },
    { t: 'Los grupos de la tabla periódica', d: 'son las columnas' },
    { t: 'Los periodos de la tabla periódica', d: 'son las filas' },
    { t: 'Los metales', d: 'conducen electricidad y calor' },
    { t: 'Los no metales', d: 'no conducen bien la electricidad' },
    { t: 'Los metaloides', d: 'tienen propiedades intermedias' },
    { t: 'Los gases nobles', d: 'son muy estables y no reaccionan fácilmente' },
    { t: 'Los halógenos', d: 'son elementos muy reactivos del grupo 17' },
    { t: 'Los alcalinos', d: 'son metales muy reactivos del grupo 1' },
    { t: 'La valencia', d: 'es la capacidad de combinación de un elemento' },
    { t: 'El enlace iónico', d: 'transfiere electrones entre átomos' },
    { t: 'El enlace covalente', d: 'comparte electrones entre átomos' },
    { t: 'El enlace metálico', d: 'une átomos de metales' },
    { t: 'El ion positivo', d: 'se llama catión' },
    { t: 'El ion negativo', d: 'se llama anión' },
    { t: 'La reacción química', d: 'transforma unas sustancias en otras' },
    { t: 'Los reactivos', d: 'son las sustancias que reaccionan' },
    { t: 'Los productos', d: 'son las sustancias que se forman' },
    { t: 'La ecuación química', d: 'representa una reacción con símbolos' },
    { t: 'La ley de conservación de la masa', d: 'la masa no se crea ni se destruye' },
    { t: 'La combustión', d: 'es una reacción con oxígeno que libera calor' },
    { t: 'La oxidación', d: 'es la reacción de una sustancia con oxígeno' },
    { t: 'La reducción', d: 'es la pérdida de oxígeno o ganancia de electrones' },
    { t: 'La catálisis', d: 'acelera una reacción sin consumirse' },
    { t: 'El catalizador', d: 'acelera las reacciones químicas' },
    { t: 'La solución', d: 'es una mezcla homogénea' },
    { t: 'El soluto', d: 'es la sustancia que se disuelve' },
    { t: 'El disolvente', d: 'es la sustancia que disuelve' },
    { t: 'La concentración', d: 'indica la cantidad de soluto en la solución' },
    { t: 'La mezcla homogénea', d: 'tiene una composición uniforme' },
    { t: 'La mezcla heterogénea', d: 'sus componentes se distinguen a simple vista' },
    { t: 'La destilación', d: 'separa líquidos por su punto de ebullición' },
    { t: 'La filtración', d: 'separa sólidos de líquidos' },
    { t: 'La decantación', d: 'separa líquidos inmiscibles' },
    { t: 'La evaporación', d: 'separa un sólido disuelto en un líquido' },
    { t: 'El pH', d: 'mide la acidez o basicidad' },
    { t: 'Los ácidos', d: 'tienen pH menor que 7' },
    { t: 'Las bases', d: 'tienen pH mayor que 7' },
    { t: 'Las sustancias neutras', d: 'tienen pH igual a 7' },
    { t: 'La neutralización', d: 'es la reacción entre un ácido y una base' },
    { t: 'La sal', d: 'se forma en la neutralización' },
    { t: 'El agua', d: 'es el disolvente universal' },
    { t: 'La fórmula química', d: 'indica los elementos y su proporción' },
    { t: 'El símbolo químico', d: 'representa un elemento con una o dos letras' },
    { t: 'El mol', d: 'es la unidad de cantidad de sustancia' },
    { t: 'El número de Avogadro', d: 'es 6.022 × 10²³ partículas' },
    { t: 'La masa molar', d: 'es la masa de un mol de sustancia' },
    { t: 'La estequiometría', d: 'calcula las cantidades en las reacciones' },
    { t: 'La energía de activación', d: 'es la energía mínima para iniciar una reacción' },
    { t: 'La reacción exotérmica', d: 'libera energía' },
    { t: 'La reacción endotérmica', d: 'absorbe energía' },
    { t: 'La velocidad de reacción', d: 'depende de temperatura, concentración y superficie' },
    { t: 'El equilibrio químico', d: 'ocurre cuando las velocidades directa e inversa se igualan' },
    { t: 'La química orgánica', d: 'estudia los compuestos del carbono' },
    { t: 'Los hidrocarburos', d: 'son compuestos de carbono e hidrógeno' },
    { t: 'Los alcanos', d: 'son hidrocarburos con enlaces simples' },
    { t: 'Los alquenos', d: 'tienen un doble enlace' },
    { t: 'Los alquinos', d: 'tienen un triple enlace' },
    { t: 'Los alcoholes', d: 'contienen el grupo -OH' },
    { t: 'Los ácidos carboxílicos', d: 'contienen el grupo -COOH' },
    { t: 'Los polímeros', d: 'son moléculas grandes formadas por unidades repetidas' },
    { t: 'El plástico', d: 'es un polímero sintético' },
    { t: 'La química inorgánica', d: 'estudia los compuestos sin carbono' },
    { t: 'Los óxidos', d: 'son compuestos de un elemento con oxígeno' },
    { t: 'Los hidróxidos', d: 'son compuestos con el grupo OH' },
    { t: 'Los ácidos', d: 'liberan iones H+ en agua' },
    { t: 'Las sales', d: 'son compuestos iónicos formados por un metal y un no metal' },
    { t: 'La radiactividad', d: 'es la emisión de partículas por núcleos inestables' },
    { t: 'La fisión nuclear', d: 'divide un núcleo pesado' },
    { t: 'La fusión nuclear', d: 'une núcleos ligeros' },
    { t: 'La química verde', d: 'diseña procesos químicos sostenibles' },
    { t: 'El reciclaje químico', d: 'transforma residuos en nuevos materiales' },
  ];

  /* ---------- Elementos ---------- */
  const ELEMENTS = [
    ['H', 'Hidrógeno'], ['He', 'Helio'], ['Li', 'Litio'], ['Be', 'Berilio'], ['B', 'Boro'], ['C', 'Carbono'],
    ['N', 'Nitrógeno'], ['O', 'Oxígeno'], ['F', 'Flúor'], ['Ne', 'Neón'], ['Na', 'Sodio'], ['Mg', 'Magnesio'],
    ['Al', 'Aluminio'], ['Si', 'Silicio'], ['P', 'Fósforo'], ['S', 'Azufre'], ['Cl', 'Cloro'], ['Ar', 'Argón'],
    ['K', 'Potasio'], ['Ca', 'Calcio'], ['Fe', 'Hierro'], ['Cu', 'Cobre'], ['Zn', 'Zinc'], ['Ag', 'Plata'],
    ['Au', 'Oro'], ['Hg', 'Mercurio'], ['Pb', 'Plomo'], ['Sn', 'Estaño'], ['I', 'Yodo'], ['Br', 'Bromo'],
  ];
  function symbolUnit(u, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [sym, name] = pick(ELEMENTS);
      const wrongs = pickN(ELEMENTS.filter(x => x[0] !== sym), 2).map(x => x[0]);
      exs.push(mcQ(u, `¿Cuál es el símbolo de ${name}?`, shuffle([sym, ...wrongs]), sym, 1, i));
    }
    return exs;
  }
  function nameUnit(u, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [sym, name] = pick(ELEMENTS);
      const wrongs = pickN(ELEMENTS.filter(x => x[1] !== name), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Qué elemento tiene el símbolo ${sym}?`, shuffle([name, ...wrongs]), name, 1, i));
    }
    return exs;
  }
  function stateUnit(u, n) {
    const exs = [];
    const states = [
      ['Hidrógeno', 'gas'], ['Oxígeno', 'gas'], ['Nitrógeno', 'gas'], ['Cloro', 'gas'], ['Flúor', 'gas'],
      ['Helio', 'gas'], ['Neón', 'gas'], ['Mercurio', 'líquido'], ['Bromo', 'líquido'], ['Hierro', 'sólido'],
      ['Oro', 'sólido'], ['Cobre', 'sólido'], ['Aluminio', 'sólido'], ['Azufre', 'sólido'], ['Carbono', 'sólido'],
    ];
    for (let i = 0; i < n; i++) {
      const [el, st] = pick(states);
      const wrongs = pickN(['gas', 'líquido', 'sólido'].filter(x => x !== st), 2);
      exs.push(mcQ(u, `¿En qué estado está ${el} a temperatura ambiente?`, shuffle([st, ...wrongs]), st, 1, i));
    }
    return exs;
  }
  function compoundUnit(u, n) {
    const exs = [];
    const comps = [
      ['H₂O', 'agua'], ['CO₂', 'dióxido de carbono'], ['NaCl', 'sal común'], ['O₂', 'oxígeno molecular'],
      ['N₂', 'nitrógeno molecular'], ['CH₄', 'metano'], ['NH₃', 'amoníaco'], ['H₂SO₄', 'ácido sulfúrico'],
      ['HCl', 'ácido clorhídrico'], ['CaCO₃', 'carbonato de calcio'], ['C₆H₁₂O₆', 'glucosa'], ['C₂H₅OH', 'etanol'],
    ];
    for (let i = 0; i < n; i++) {
      const [f, name] = pick(comps);
      const wrongs = pickN(comps.filter(x => x[0] !== f), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Qué compuesto es ${f}?`, shuffle([name, ...wrongs]), name, 1, i));
    }
    return exs;
  }
  function phUnit(u, n) {
    const exs = [];
    const items = [
      ['jugo de limón', 'ácido'], ['vinagre', 'ácido'], ['café', 'ácido'], ['agua pura', 'neutro'],
      ['jabón', 'base'], ['leche de magnesia', 'base'], ['bicarbonato', 'base'], ['refresco', 'ácido'],
      ['agua de mar', 'base'], ['tomate', 'ácido'],
    ];
    for (let i = 0; i < n; i++) {
      const [item, type] = pick(items);
      const wrongs = pickN(['ácido', 'neutro', 'base'].filter(x => x !== type), 2);
      exs.push(mcQ(u, `¿${item} es ácido, neutro o base?`, shuffle([type, ...wrongs]), type, 1, i));
    }
    return exs;
  }
  function separationUnit(u, n) {
    const exs = [];
    const methods = [
      ['arena y agua', 'filtración'], ['sal disuelta en agua', 'evaporación'], ['aceite y agua', 'decantación'],
      ['alcohol y agua', 'destilación'], ['hierro y arena', 'imán'], ['harina y piedras', 'tamizado'],
    ];
    for (let i = 0; i < n; i++) {
      const [mix, method] = pick(methods);
      const wrongs = pickN(methods.filter(x => x[0] !== mix), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Cómo separas ${mix}?`, shuffle([method, ...wrongs]), method, 1, i));
    }
    return exs;
  }

  const l = addLevel(s, 'quimica-sec', 'Secundaria', 'Secondary', 'Sekundarstufe');
  addUnit(s, l, 'La materia y sus propiedades', 'Matter and its properties', 'Materie und ihre Eigenschaften', (u) => factUnit(u, F.filter(f => ['La materia', 'La mezcla homogénea', 'La mezcla heterogénea', 'La solución', 'El soluto', 'El disolvente', 'La concentración'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'El átomo', 'The atom', 'Das Atom', (u) => factUnit(u, F.filter(f => ['El átomo', 'El protón', 'El neutrón', 'El electrón', 'El núcleo atómico', 'El número atómico', 'La masa atómica', 'Los isótopos'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Elementos y símbolos', 'Elements and symbols', 'Elemente und Symbole', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['El elemento', 'El compuesto', 'La molécula', 'El símbolo químico', 'La fórmula química'].includes(f.t)), { fb: false }));
    exs.push(...symbolUnit(u, 180));
    exs.push(...nameUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'La tabla periódica', 'The periodic table', 'Das Periodensystem', (u) => factUnit(u, F.filter(f => ['La tabla periódica', 'Los grupos de la tabla periódica', 'Los periodos de la tabla periódica', 'Los metales', 'Los no metales', 'Los metaloides', 'Los gases nobles', 'Los halógenos', 'Los alcalinos', 'La valencia'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Estados de los elementos', 'States of elements', 'Zustände der Elemente', (u) => stateUnit(u, 300));
  addUnit(s, l, 'Enlaces químicos', 'Chemical bonds', 'Chemische Bindungen', (u) => factUnit(u, F.filter(f => ['El enlace iónico', 'El enlace covalente', 'El enlace metálico', 'El ion positivo', 'El ion negativo'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Reacciones químicas', 'Chemical reactions', 'Chemische Reaktionen', (u) => factUnit(u, F.filter(f => ['La reacción química', 'Los reactivos', 'Los productos', 'La ecuación química', 'La ley de conservación de la masa', 'La combustión', 'La oxidación', 'La reducción', 'La catálisis', 'El catalizador', 'La energía de activación', 'La reacción exotérmica', 'La reacción endotérmica', 'La velocidad de reacción', 'El equilibrio químico'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Compuestos comunes', 'Common compounds', 'Häufige Verbindungen', (u) => compoundUnit(u, 300));
  addUnit(s, l, 'Ácidos, bases y pH', 'Acids, bases and pH', 'Säuren, Basen und pH', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['El pH', 'Los ácidos', 'Las bases', 'Las sustancias neutras', 'La neutralización', 'La sal'].includes(f.t)), { fb: false }));
    exs.push(...phUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Separación de mezclas', 'Separation of mixtures', 'Trennung von Gemischen', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La destilación', 'La filtración', 'La decantación', 'La evaporación'].includes(f.t)), { fb: false }));
    exs.push(...separationUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Química orgánica', 'Organic chemistry', 'Organische Chemie', (u) => factUnit(u, F.filter(f => ['La química orgánica', 'Los hidrocarburos', 'Los alcanos', 'Los alquenos', 'Los alquinos', 'Los alcoholes', 'Los ácidos carboxílicos', 'Los polímeros', 'El plástico'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Química nuclear y verde', 'Nuclear and green chemistry', 'Kern- und grüne Chemie', (u) => factUnit(u, F.filter(f => ['La radiactividad', 'La fisión nuclear', 'La fusión nuclear', 'La química verde', 'El reciclaje químico'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Repaso de química', 'Chemistry review', 'Chemie Wiederholung', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F, { fb: false }));
    exs.push(...symbolUnit(u, 120));
    return exs;
  });
};