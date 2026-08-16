/* ============================================================
 * HISTORIA — 3 000 ejercicios, 1 nivel (5)
 * Hechos (factUnit) + unidades procedimentales.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN, factUnit } = ctx;

  const s = addSubject('historia', 'Historia', 'History', 'Geschichte', '#FF5722', '🏛️');

  const F = [
    { t: 'La prehistoria', d: 'es el periodo anterior a la escritura' },
    { t: 'La Edad de Piedra', d: 'es la etapa en que se usaban herramientas de piedra' },
    { t: 'La Edad de los Metales', d: 'es la etapa en que se usaron el cobre, bronce y hierro' },
    { t: 'El Paleolítico', d: 'es la etapa de los cazadores-recolectores nómadas' },
    { t: 'El Neolítico', d: 'es la etapa del descubrimiento de la agricultura' },
    { t: 'La agricultura', d: 'permitió que los humanos se volvieran sedentarios' },
    { t: 'La escritura', d: 'marca el inicio de la historia' },
    { t: 'Mesopotamia', d: 'es la civilización entre los ríos Tigris y Éufrates' },
    { t: 'Egipto', d: 'se desarrolló a orillas del río Nilo' },
    { t: 'Los faraones', d: 'eran los gobernantes del antiguo Egipto' },
    { t: 'Las pirámides', d: 'eran tumbas de los faraones egipcios' },
    { t: 'Los jeroglíficos', d: 'eran la escritura del antiguo Egipto' },
    { t: 'La civilización griega', d: 'creó la democracia y la filosofía' },
    { t: 'La democracia', d: 'nació en Atenas, Grecia' },
    { t: 'Los Juegos Olímpicos', d: 'se originaron en la antigua Grecia' },
    { t: 'Alejandro Magno', d: 'fue un gran conquistador de Macedonia' },
    { t: 'Roma', d: 'fue una civilización que creó el derecho y las calzadas' },
    { t: 'El Imperio Romano', d: 'dominó el Mediterráneo durante siglos' },
    { t: 'Julio César', d: 'fue un famoso general y gobernante romano' },
    { t: 'El latín', d: 'es la lengua del Imperio Romano' },
    { t: 'El cristianismo', d: 'se expandió durante el Imperio Romano' },
    { t: 'La caída de Roma', d: 'ocurrió en el año 476 d.C.' },
    { t: 'La Edad Media', d: 'va desde la caída de Roma hasta el siglo XV' },
    { t: 'El feudalismo', d: 'organizó la sociedad medieval en feudos' },
    { t: 'Los señores feudales', d: 'gobernaban sus feudos y protegían a los campesinos' },
    { t: 'Los castillos', d: 'eran las fortalezas de la Edad Media' },
    { t: 'Los caballeros', d: 'eran guerreros de la nobleza medieval' },
    { t: 'Las cruzadas', d: 'fueron expediciones religiosas a Tierra Santa' },
    { t: 'El Islam', d: 'surgió en el siglo VII con el profeta Mahoma' },
    { t: 'El Imperio Bizantino', d: 'fue la continuación del Imperio Romano de Oriente' },
    { t: 'Constantinopla', d: 'fue la capital del Imperio Bizantino' },
    { t: 'La peste negra', d: 'fue una epidemia que devastó Europa en el siglo XIV' },
    { t: 'La Edad Moderna', d: 'va del siglo XV al XVIII' },
    { t: 'El Renacimiento', d: 'fue el renacer del arte y la ciencia en Europa' },
    { t: 'Leonardo da Vinci', d: 'fue un genio del Renacimiento' },
    { t: 'Miguel Ángel', d: 'fue un gran artista del Renacimiento' },
    { t: 'La imprenta', d: 'fue inventada por Gutenberg en el siglo XV' },
    { t: 'Cristóbal Colón', d: 'llegó a América en 1492' },
    { t: 'El descubrimiento de América', d: 'ocurrió en 1492' },
    { t: 'La conquista de México', d: 'fue liderada por Hernán Cortés' },
    { t: 'La conquista del Perú', d: 'fue liderada por Francisco Pizarro' },
    { t: 'Los aztecas', d: 'fueron una civilización de Mesoamérica con capital en Tenochtitlan' },
    { t: 'Los mayas', d: 'fueron una civilización con grandes avances en astronomía' },
    { t: 'Los incas', d: 'fueron una civilización de los Andes con capital en Cusco' },
    { t: 'Tenochtitlan', d: 'fue la capital del Imperio azteca' },
    { t: 'La colonización', d: 'impuso el dominio europeo en América' },
    { t: 'El virreinato', d: 'fue la forma de gobierno colonial en América' },
    { t: 'La independencia de México', d: 'se consumó en 1821' },
    { t: 'Miguel Hidalgo', d: 'inició la independencia de México con el Grito de Dolores' },
    { t: 'Simón Bolívar', d: 'liberó varios países de Sudamérica' },
    { t: 'José de San Martín', d: 'liberó Argentina, Chile y Perú' },
    { t: 'La Revolución Francesa', d: 'comenzó en 1789' },
    { t: 'La Revolución Industrial', d: 'comenzó en Inglaterra en el siglo XVIII' },
    { t: 'La máquina de vapor', d: 'impulsó la Revolución Industrial' },
    { t: 'Napoleón Bonaparte', d: 'fue emperador de Francia' },
    { t: 'La Primera Guerra Mundial', d: 'ocurrió de 1914 a 1918' },
    { t: 'La Revolución Rusa', d: 'ocurrió en 1917' },
    { t: 'La Gran Depresión', d: 'fue la crisis económica de 1929' },
    { t: 'La Segunda Guerra Mundial', d: 'ocurrió de 1939 a 1945' },
    { t: 'Adolf Hitler', d: 'lideró la Alemania nazi' },
    { t: 'El Holocausto', d: 'fue el genocidio de millones de judíos' },
    { t: 'La bomba atómica', d: 'se usó en Hiroshima y Nagasaki en 1945' },
    { t: 'La ONU', d: 'se fundó en 1945 para mantener la paz mundial' },
    { t: 'La Guerra Fría', d: 'enfrentó a Estados Unidos y la Unión Soviética' },
    { t: 'El muro de Berlín', d: 'cayó en 1989' },
    { t: 'La caída de la Unión Soviética', d: 'ocurrió en 1991' },
    { t: 'La Revolución Mexicana', d: 'comenzó en 1910' },
    { t: 'Emiliano Zapata', d: 'fue un líder de la Revolución Mexicana' },
    { t: 'Pancho Villa', d: 'fue un líder revolucionario mexicano' },
    { t: 'La Constitución de 1917', d: 'fue la constitución surgida de la Revolución Mexicana' },
    { t: 'La independencia de Estados Unidos', d: 'se declaró en 1776' },
    { t: 'George Washington', d: 'fue el primer presidente de Estados Unidos' },
    { t: 'La guerra civil estadounidense', d: 'enfrentó al norte y al sur de EE.UU.' },
    { t: 'Abraham Lincoln', d: 'fue presidente de EE.UU. durante la guerra civil' },
    { t: 'La esclavitud', d: 'fue abolida en EE.UU. en 1865' },
    { t: 'El colonialismo', d: 'fue el dominio de potencias europeas sobre otros territorios' },
    { t: 'La descolonización', d: 'liberó a las colonias en el siglo XX' },
    { t: 'La globalización', d: 'conecta la economía y la cultura mundial' },
    { t: 'La tecnología', d: 'ha transformado la vida en el siglo XXI' },
    { t: 'El internet', d: 'revolucionó la comunicación mundial' },
  ];

  function dateUnit(u, n) {
    const exs = [];
    const dates = [
      ['llegada de Colón a América', '1492'], ['Revolución Francesa', '1789'], ['independencia de México', '1821'],
      ['Primera Guerra Mundial', '1914'], ['Segunda Guerra Mundial', '1939'], ['caída del muro de Berlín', '1989'],
      ['Revolución Mexicana', '1910'], ['independencia de Estados Unidos', '1776'], ['caída de Roma', '476'],
      ['invención de la imprenta', '1450'], ['Revolución Rusa', '1917'], ['fundación de la ONU', '1945'],
    ];
    for (let i = 0; i < n; i++) {
      const [event, year] = pick(dates);
      const wrongs = pickN(dates.filter(x => x[1] !== year), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿En qué año ocurrió la ${event}?`, shuffle([year, ...wrongs]), year, 1, i));
    }
    return exs;
  }
  function periodUnit(u, n) {
    const exs = [];
    const periods = [
      ['Prehistoria', 'antes de la escritura'], ['Edad Antigua', 'desde la escritura hasta la caída de Roma'],
      ['Edad Media', 'del 476 al siglo XV'], ['Edad Moderna', 'del siglo XV al XVIII'],
      ['Edad Contemporánea', 'desde la Revolución Francesa hasta hoy'],
    ];
    for (let i = 0; i < n; i++) {
      const [p, d] = pick(periods);
      const wrongs = pickN(periods.filter(x => x[0] !== p), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Qué es ${p}?`, shuffle([d, ...wrongs]), d, 1, i));
    }
    return exs;
  }
  function figureUnit(u, n) {
    const exs = [];
    const figures = [
      ['Miguel Hidalgo', 'inició la independencia de México'], ['Simón Bolívar', 'liberó Sudamérica'],
      ['José de San Martín', 'liberó Argentina, Chile y Perú'], ['Benito Juárez', 'fue presidente de México y defensor de la República'],
      ['Emiliano Zapata', 'luchó por la tierra en la Revolución Mexicana'], ['Pancho Villa', 'fue un líder revolucionario del norte'],
      ['Cristóbal Colón', 'llegó a América en 1492'], ['Hernán Cortés', 'conquistó el Imperio azteca'],
      ['Francisco Pizarro', 'conquistó el Imperio inca'], ['Napoleón Bonaparte', 'fue emperador de Francia'],
      ['Julio César', 'fue un general y gobernante romano'], ['Alejandro Magno', 'fue un gran conquistador macedonio'],
      ['Leonardo da Vinci', 'fue un genio del Renacimiento'], ['George Washington', 'fue el primer presidente de EE.UU.'],
      ['Abraham Lincoln', 'abolicionista y presidente de EE.UU.'], ['Adolf Hitler', 'lideró la Alemania nazi'],
    ];
    for (let i = 0; i < n; i++) {
      const [name, deed] = pick(figures);
      const wrongs = pickN(figures.filter(x => x[0] !== name), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Quién ${deed}?`, shuffle([name, ...wrongs]), name, 1, i));
    }
    return exs;
  }
  function civilizationUnit(u, n) {
    const exs = [];
    const civs = [
      ['Egipto', 'el río Nilo y las pirámides'], ['Mesopotamia', 'los ríos Tigris y Éufrates'],
      ['Grecia', 'la democracia y la filosofía'], ['Roma', 'el derecho y las calzadas'],
      ['Aztecas', 'Tenochtitlan y el águila sobre el nopal'], ['Mayas', 'la astronomía y el cero'],
      ['Incas', 'Machu Picchu y los Andes'], ['Bizantinos', 'Constantinopla y los mosaicos'],
    ];
    for (let i = 0; i < n; i++) {
      const [civ, feat] = pick(civs);
      const wrongs = pickN(civs.filter(x => x[0] !== civ), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Qué civilización se caracteriza por ${feat}?`, shuffle([civ, ...wrongs]), civ, 1, i));
    }
    return exs;
  }
  function timelineUnit(u, n) {
    const exs = [];
    const events = [
      ['Prehistoria', 'Edad Antigua', 'Edad Media', 'Edad Moderna'],
      ['Paleolítico', 'Neolítico', 'Edad de los Metales', 'Edad Antigua'],
      ['Caída de Roma', 'Edad Media', 'Renacimiento', 'Revolución Industrial'],
      ['Revolución Francesa', 'Primera Guerra Mundial', 'Segunda Guerra Mundial', 'Guerra Fría'],
      ['Llegada de Colón', 'Colonia', 'Independencia', 'Revolución Mexicana'],
    ];
    for (let i = 0; i < n; i++) {
      const seq = pick(events);
      const shuffled = shuffle(seq);
      const correct = seq[0];
      exs.push(mcQ(u, `¿Qué ocurrió primero? ${shuffled.join(', ')}`, shuffle(seq), correct, 1, i));
    }
    return exs;
  }

  const l = addLevel(s, 'historia-5', '5to grado', 'Grade 5', 'Klasse 5');
  addUnit(s, l, 'La prehistoria', 'Prehistory', 'Vorgeschichte', (u) => factUnit(u, F.filter(f => ['La prehistoria', 'La Edad de Piedra', 'La Edad de los Metales', 'El Paleolítico', 'El Neolítico', 'La agricultura', 'La escritura'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Las primeras civilizaciones', 'The first civilizations', 'Die ersten Zivilisationen', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['Mesopotamia', 'Egipto', 'Los faraones', 'Las pirámides', 'Los jeroglíficos'].includes(f.t)), { fb: false }));
    exs.push(...civilizationUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Grecia y Roma', 'Greece and Rome', 'Griechenland und Rom', (u) => factUnit(u, F.filter(f => ['La civilización griega', 'La democracia', 'Los Juegos Olímpicos', 'Alejandro Magno', 'Roma', 'El Imperio Romano', 'Julio César', 'El latín', 'El cristianismo', 'La caída de Roma'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'La Edad Media', 'The Middle Ages', 'Das Mittelalter', (u) => factUnit(u, F.filter(f => ['La Edad Media', 'El feudalismo', 'Los señores feudales', 'Los castillos', 'Los caballeros', 'Las cruzadas', 'El Islam', 'El Imperio Bizantino', 'Constantinopla', 'La peste negra'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'La Edad Moderna', 'The Modern Age', 'Die Neuzeit', (u) => factUnit(u, F.filter(f => ['La Edad Moderna', 'El Renacimiento', 'Leonardo da Vinci', 'Miguel Ángel', 'La imprenta', 'Cristóbal Colón', 'El descubrimiento de América'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Las civilizaciones de América', 'American civilizations', 'Zivilisationen Amerikas', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['Los aztecas', 'Los mayas', 'Los incas', 'Tenochtitlan'].includes(f.t)), { fb: false }));
    exs.push(...civilizationUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'La conquista y la colonia', 'The conquest and the colony', 'Eroberung und Kolonie', (u) => factUnit(u, F.filter(f => ['La conquista de México', 'La conquista del Perú', 'La colonización', 'El virreinato'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Las independencias', 'Independences', 'Unabhängigkeiten', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F.filter(f => ['La independencia de México', 'Miguel Hidalgo', 'Simón Bolívar', 'José de San Martín', 'La independencia de Estados Unidos', 'George Washington'].includes(f.t)), { fb: false }));
    exs.push(...figureUnit(u, 180));
    return exs;
  });
  addUnit(s, l, 'Revoluciones del siglo XVIII y XIX', 'Revolutions of the 18th and 19th centuries', 'Revolutionen des 18. und 19. Jahrhunderts', (u) => factUnit(u, F.filter(f => ['La Revolución Francesa', 'La Revolución Industrial', 'La máquina de vapor', 'Napoleón Bonaparte', 'La guerra civil estadounidense', 'Abraham Lincoln', 'La esclavitud'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'La Revolución Mexicana', 'The Mexican Revolution', 'Die Mexikanische Revolution', (u) => factUnit(u, F.filter(f => ['La Revolución Mexicana', 'Emiliano Zapata', 'Pancho Villa', 'La Constitución de 1917'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'El siglo XX', 'The 20th century', 'Das 20. Jahrhundert', (u) => factUnit(u, F.filter(f => ['La Primera Guerra Mundial', 'La Revolución Rusa', 'La Gran Depresión', 'La Segunda Guerra Mundial', 'Adolf Hitler', 'El Holocausto', 'La bomba atómica', 'La ONU', 'La Guerra Fría', 'El muro de Berlín', 'La caída de la Unión Soviética'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'El mundo actual', 'The modern world', 'Die moderne Welt', (u) => factUnit(u, F.filter(f => ['El colonialismo', 'La descolonización', 'La globalización', 'La tecnología', 'El internet'].includes(f.t)), { fb: false }));
  addUnit(s, l, 'Fechas importantes', 'Important dates', 'Wichtige Daten', (u) => dateUnit(u, 300));
  addUnit(s, l, 'Periodos históricos', 'Historical periods', 'Historische Perioden', (u) => periodUnit(u, 300));
  addUnit(s, l, 'Personajes históricos', 'Historical figures', 'Historische Persönlichkeiten', (u) => figureUnit(u, 300));
  addUnit(s, l, 'Ordenar en el tiempo', 'Order in time', 'In der Zeit ordnen', (u) => timelineUnit(u, 300));
  addUnit(s, l, 'Repaso de historia', 'History review', 'Geschichte Wiederholung', (u) => {
    const exs = [];
    exs.push(...factUnit(u, F, { fb: false }));
    exs.push(...dateUnit(u, 120));
    return exs;
  });
};