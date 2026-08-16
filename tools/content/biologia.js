/* ============================================================
 * BIOLOGÍA — 2 500 ejercicios, 1 nivel (sec)
 * Hechos (factUnit) + unidades procedimentales.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN, factUnit } = ctx;

  const s = addSubject('biologia', 'Biología', 'Biology', 'Biologie', '#8BC34A', '🧬');

  const F = [
    { t: 'La célula', d: 'es la unidad estructural y funcional de los seres vivos' },
    { t: 'La célula procariota', d: 'no tiene núcleo definido' },
    { t: 'La célula eucariota', d: 'tiene núcleo definido y orgánulos' },
    { t: 'La membrana plasmática', d: 'regula el paso de sustancias' },
    { t: 'El citoplasma', d: 'es el medio interno de la célula' },
    { t: 'El núcleo', d: 'contiene el material genético' },
    { t: 'Las mitocondrias', d: 'producen energía mediante la respiración celular' },
    { t: 'Los ribosomas', d: 'sintetizan proteínas' },
    { t: 'El retículo endoplasmático', d: 'transporta sustancias dentro de la célula' },
    { t: 'El aparato de Golgi', d: 'empaqueta y distribuye proteínas' },
    { t: 'Los lisosomas', d: 'digieren materiales dentro de la célula' },
    { t: 'Los cloroplastos', d: 'realizan la fotosíntesis en las plantas' },
    { t: 'La pared celular', d: 'da rigidez a las células vegetales' },
    { t: 'La vacuola', d: 'almacena agua y sustancias' },
    { t: 'El ADN', d: 'contiene la información genética' },
    { t: 'Los genes', d: 'son segmentos de ADN que determinan características' },
    { t: 'Los cromosomas', d: 'son estructuras que contienen el ADN' },
    { t: 'La mitosis', d: 'es la división celular que produce células idénticas' },
    { t: 'La meiosis', d: 'produce células sexuales con la mitad de cromosomas' },
    { t: 'La fotosíntesis', d: 'convierte luz, agua y CO2 en glucosa y oxígeno' },
    { t: 'La respiración celular', d: 'obtiene energía de la glucosa' },
    { t: 'La glucosa', d: 'es el azúcar que las plantas fabrican' },
    { t: 'La clorofila', d: 'captura la energía de la luz' },
    { t: 'Los estomas', d: 'son poros de las hojas que intercambian gases' },
    { t: 'La transpiración', d: 'es la pérdida de agua por las hojas' },
    { t: 'La savia bruta', d: 'es agua y minerales que suben por el tallo' },
    { t: 'La savia elaborada', d: 'es el alimento que circula por la planta' },
    { t: 'El xilema', d: 'transporta agua y minerales' },
    { t: 'El floema', d: 'transporta el alimento elaborado' },
    { t: 'La raíz', d: 'absorbe agua y nutrientes del suelo' },
    { t: 'El tallo', d: 'sostiene la planta y conduce la savia' },
    { t: 'La hoja', d: 'es el órgano donde ocurre la fotosíntesis' },
    { t: 'La flor', d: 'es el órgano reproductor de las plantas' },
    { t: 'La polinización', d: 'es el transporte del polen a la flor' },
    { t: 'La germinación', d: 'es el inicio del crecimiento de la semilla' },
    { t: 'El sistema digestivo', d: 'transforma los alimentos en nutrientes' },
    { t: 'El sistema respiratorio', d: 'intercambia oxígeno y dióxido de carbono' },
    { t: 'El sistema circulatorio', d: 'transporta sangre y nutrientes' },
    { t: 'El sistema nervioso', d: 'coordina las funciones del cuerpo' },
    { t: 'El sistema excretor', d: 'elimina desechos del cuerpo' },
    { t: 'El sistema endocrino', d: 'produce hormonas' },
    { t: 'El sistema inmunitario', d: 'defiende el cuerpo de infecciones' },
    { t: 'El sistema óseo', d: 'sostiene el cuerpo y protege órganos' },
    { t: 'El sistema muscular', d: 'permite el movimiento' },
    { t: 'Las neuronas', d: 'transmiten impulsos nerviosos' },
    { t: 'Las hormonas', d: 'son mensajeros químicos del cuerpo' },
    { t: 'Los anticuerpos', d: 'combaten los agentes patógenos' },
    { t: 'Las vacunas', d: 'previenen enfermedades' },
    { t: 'Los virus', d: 'son agentes infecciosos que necesitan células para reproducirse' },
    { t: 'Las bacterias', d: 'son microorganismos unicelulares' },
    { t: 'Los hongos', d: 'son organismos descomponedores' },
    { t: 'Los protozoos', d: 'son microorganismos unicelulares con núcleo' },
    { t: 'La taxonomía', d: 'clasifica a los seres vivos' },
    { t: 'Los reinos de la naturaleza', d: 'son Monera, Protista, Fungi, Plantae y Animalia' },
    { t: 'Los vertebrados', d: 'tienen columna vertebral' },
    { t: 'Los invertebrados', d: 'no tienen columna vertebral' },
    { t: 'Los artrópodos', d: 'tienen patas articuladas y exoesqueleto' },
    { t: 'Los moluscos', d: 'tienen cuerpo blando, muchos con concha' },
    { t: 'Los anélidos', d: 'tienen cuerpo segmentado como la lombriz' },
    { t: 'Los equinodermos', d: 'tienen simetría radial como la estrella de mar' },
    { t: 'Los cnidarios', d: 'tienen tentáculos como la medusa' },
    { t: 'La evolución', d: 'es el cambio de las especies a lo largo del tiempo' },
    { t: 'La selección natural', d: 'favorece a los organismos mejor adaptados' },
    { t: 'La adaptación', d: 'es una característica que mejora la supervivencia' },
    { t: 'La especie', d: 'es un grupo de organismos que pueden reproducirse entre sí' },
    { t: 'La población', d: 'es un grupo de individuos de la misma especie en un lugar' },
    { t: 'La comunidad', d: 'son las poblaciones que conviven en un lugar' },
    { t: 'El ecosistema', d: 'incluye seres vivos y su ambiente físico' },
    { t: 'La biósfera', d: 'es la capa de la Tierra donde hay vida' },
    { t: 'Los productores', d: 'fabrican su propio alimento' },
    { t: 'Los consumidores', d: 'se alimentan de otros organismos' },
    { t: 'Los descomponedores', d: 'reciclan la materia orgánica' },
    { t: 'La simbiosis', d: 'es una relación beneficiosa entre especies' },
    { t: 'El parasitismo', d: 'beneficia a uno y perjudica al otro' },
    { t: 'El mutualismo', d: 'beneficia a ambas especies' },
    { t: 'El comensalismo', d: 'beneficia a uno sin afectar al otro' },
    { t: 'La depredación', d: 'es la caza de una especie por otra' },
    { t: 'La competencia', d: 'es la disputa por recursos entre especies' },
    { t: 'La genética', d: 'estudia la herencia biológica' },
    { t: 'Los alelos', d: 'son versiones de un mismo gen' },
    { t: 'El genotipo', d: 'es la constitución genética de un individuo' },
    { t: 'El fenotipo', d: 'es la apariencia observable' },
    { t: 'El dominante', d: 'es el alelo que se expresa en heterocigosis' },
    { t: 'El recesivo', d: 'solo se expresa en homocigosis' },
    { t: 'La herencia', d: 'transmite características de padres a hijos' },
    { t: 'Las mutaciones', d: 'son cambios en el material genético' },
    { t: 'La biotecnología', d: 'usa organismos para crear productos útiles' },
    { t: 'La clonación', d: 'produce copias genéticamente idénticas' },
    { t: 'Los transgénicos', d: 'son organismos con genes modificados' },
    { t: 'La biodiversidad', d: 'es la variedad de especies de un lugar' },
    { t: 'La conservación', d: 'protege los ecosistemas y las especies' },
    { t: 'Las áreas protegidas', d: 'son zonas destinadas a conservar la naturaleza' },
    { t: 'La deforestación', d: 'es la pérdida de bosques' },
    { t: 'La contaminación', d: 'daña el aire, el agua o el suelo' },
    { t: 'El calentamiento global', d: 'es el aumento de la temperatura del planeta' },
    { t: 'La huella ecológica', d: 'mide el impacto ambiental de una persona' },
    { t: 'El desarrollo sostenible', d: 'satisface las necesidades sin dañar el futuro' },
  ];

  function organUnit(u, n) {
    const exs = [];
    const organs = [
      ['corazón', 'bombea la sangre'], ['pulmones', 'intercambian gases'], ['hígado', 'desintoxica la sangre'],
      ['riñones', 'filtran la sangre y forman orina'], ['cerebro', 'controla el organismo'], ['páncreas', 'produce insulina'],
      ['estómago', 'digiere los alimentos'], ['intestino delgado', 'absorbe nutrientes'], ['intestino grueso', 'absorbe agua'],
      ['bazo', 'filtra la sangre y produce defensas'], ['tiroides', 'regula el metabolismo'], ['piel', 'protege el cuerpo'],
    ];
    for (let i = 0; i < n; i++) {
      const [o, f] = pick(organs);
      const wrongs = pickN(organs.filter(x => x[0] !== o), 2).map(x => x[0]);
      exs.push(mcQ(u, `¿Qué órgano ${f}?`, shuffle([o, ...wrongs]), o, 1, i));
    }
    return exs;
  }
  function taxonomyUnit(u, n) {
    const exs = [];
    const taxa = [
      ['Dominio', 'la categoría más amplia'], ['Reino', 'agrupa filos'], ['Filo', 'agrupa clases'],
      ['Clase', 'agrupa órdenes'], ['Orden', 'agrupa familias'], ['Familia', 'agrupa géneros'],
      ['Género', 'agrupa especies'], ['Especie', 'la categoría más específica'],
    ];
    for (let i = 0; i < n; i++) {
      const [t, d] = pick(taxa);
      const wrongs = pickN(taxa.filter(x => x[0] !== t), 2).map(x => x[1]);
      exs.push(mcQ(u, `En taxonomía, ${t}...`, shuffle([d, ...wrongs]), d, 1, i));
    }
    return exs;
  }
  function cellPartUnit(u, n) {
    const exs = [];
    const parts = [
      ['mitocondria', 'produce energía'], ['ribosoma', 'sintetiza proteínas'], ['lisosoma', 'digiere materiales'],
      ['cloroplasto', 'hace fotosíntesis'], ['núcleo', 'guarda el ADN'], ['membrana', 'regula el paso de sustancias'],
      ['vacuola', 'almacena agua'], ['aparato de Golgi', 'empaqueta proteínas'],
    ];
    for (let i = 0; i < n; i++) {
      const [p, f] = pick(parts);
      const wrongs = pickN(parts.filter(x => x[0] !== p), 2).map(x => x[0]);
      exs.push(mcQ(u, `¿Qué orgánulo ${f}?`, shuffle([p, ...wrongs]), p, 1, i));
    }
    return exs;
  }

  const l = addLevel(s, 'biologia-sec', 'Secundaria', 'Secondary', 'Sekundarstufe');
  addUnit(s, l, 'La célula y sus orgánulos', 'The cell and its organelles', 'Die Zelle und ihre Organellen', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La célula', 'La célula procariota', 'La célula eucariota', 'La membrana plasmática', 'El citoplasma', 'El núcleo', 'Las mitocondrias', 'Los ribosomas', 'El retículo endoplasmático', 'El aparato de Golgi', 'Los lisosomas', 'Los cloroplastos', 'La pared celular', 'La vacuola'].includes(f.t)), { fb: false }));
    exs.push(...cellPartUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Genética y ADN', 'Genetics and DNA', 'Genetik und DNA', (u) => factUnit(u, F.filter(f => ['El ADN', 'Los genes', 'Los cromosomas', 'La mitosis', 'La meiosis', 'La genética', 'Los alelos', 'El genotipo', 'El fenotipo', 'El dominante', 'El recesivo', 'La herencia', 'Las mutaciones'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Fotosíntesis y nutrición vegetal', 'Photosynthesis and plant nutrition', 'Fotosynthese und Pflanzenernährung', (u) => factUnit(u, F.filter(f => ['La fotosíntesis', 'La respiración celular', 'La glucosa', 'La clorofila', 'Los estomas', 'La transpiración', 'La savia bruta', 'La savia elaborada', 'El xilema', 'El floema', 'La raíz', 'El tallo', 'La hoja', 'La flor', 'La polinización', 'La germinación'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Sistemas del cuerpo humano', 'Human body systems', 'Systeme des menschlichen Körpers', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['El sistema digestivo', 'El sistema respiratorio', 'El sistema circulatorio', 'El sistema nervioso', 'El sistema excretor', 'El sistema endocrino', 'El sistema inmunitario', 'El sistema óseo', 'El sistema muscular', 'Las neuronas', 'Las hormonas', 'Los anticuerpos', 'Las vacunas'].includes(f.t)), { fb: false }));
    exs.push(...organUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Microorganismos', 'Microorganisms', 'Mikroorganismen', (u) => factUnit(u, F.filter(f => ['Los virus', 'Las bacterias', 'Los hongos', 'Los protozoos'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Clasificación de los seres vivos', 'Classification of living things', 'Klassifikation der Lebewesen', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La taxonomía', 'Los reinos de la naturaleza', 'Los vertebrados', 'Los invertebrados', 'Los artrópodos', 'Los moluscos', 'Los anélidos', 'Los equinodermos', 'Los cnidarios'].includes(f.t)), { fb: false }));
    exs.push(...taxonomyUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Evolución y adaptación', 'Evolution and adaptation', 'Evolution und Anpassung', (u) => factUnit(u, F.filter(f => ['La evolución', 'La selección natural', 'La adaptación', 'La especie'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Ecología', 'Ecology', 'Ökologie', (u) => factUnit(u, F.filter(f => ['La población', 'La comunidad', 'El ecosistema', 'La biósfera', 'Los productores', 'Los consumidores', 'Los descomponedores', 'La simbiosis', 'El parasitismo', 'El mutualismo', 'El comensalismo', 'La depredación', 'La competencia'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Biotecnología', 'Biotechnology', 'Biotechnologie', (u) => factUnit(u, F.filter(f => ['La biotecnología', 'La clonación', 'Los transgénicos'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Conservación y medio ambiente', 'Conservation and environment', 'Naturschutz und Umwelt', (u) => factUnit(u, F.filter(f => ['La biodiversidad', 'La conservación', 'Las áreas protegidas', 'La deforestación', 'La contaminación', 'El calentamiento global', 'La huella ecológica', 'El desarrollo sostenible'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Repaso de biología', 'Biology review', 'Biologie Wiederholung', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F, { fb: false }));
    exs.push(...cellPartUnit(u, 120));
    return exs;
  });
};