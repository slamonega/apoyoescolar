/* ============================================================
 * CIENCIAS NATURALES — 3 000 ejercicios, 2 niveles (1, 2)
 * Hechos (factUnit) + unidades procedimentales.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN, factUnit } = ctx;

  const s = addSubject('ciencias', 'Ciencias Naturales', 'Science', 'Naturwissenschaften', '#4CAF50', '🔬');

  /* ---------- Bancos de hechos ---------- */
  const F1 = [
    { t: 'El agua', d: 'es un líquido que necesitamos para vivir' },
    { t: 'El sol', d: 'es la estrella que nos da luz y calor' },
    { t: 'La luna', d: 'es el satélite natural de la Tierra' },
    { t: 'Las plantas', d: 'necesitan agua, luz y aire para vivir' },
    { t: 'Los animales', d: 'necesitan alimento, agua y aire' },
    { t: 'El aire', d: 'es una mezcla de gases que respiramos' },
    { t: 'El suelo', d: 'es la capa de tierra donde crecen las plantas' },
    { t: 'La raíz', d: 'es la parte de la planta que está bajo tierra' },
    { t: 'El tallo', d: 'sostiene la planta y transporta el agua' },
    { t: 'Las hojas', d: 'realizan la fotosíntesis' },
    { t: 'La flor', d: 'es la parte de la planta que produce semillas' },
    { t: 'El fruto', d: 'protege las semillas de la planta' },
    { t: 'La semilla', d: 'puede germinar y dar origen a una nueva planta' },
    { t: 'Los mamíferos', d: 'son animales que amamantan a sus crías' },
    { t: 'Las aves', d: 'son animales que tienen plumas y ponen huevos' },
    { t: 'Los peces', d: 'viven en el agua y respiran por branquias' },
    { t: 'Los reptiles', d: 'tienen escamas y sangre fría' },
    { t: 'Los anfibios', d: 'viven parte de su vida en el agua y parte en tierra' },
    { t: 'Los insectos', d: 'tienen seis patas y tres partes del cuerpo' },
    { t: 'El ciclo del agua', d: 'es evaporación, condensación y precipitación' },
    { t: 'La evaporación', d: 'es cuando el agua se convierte en vapor' },
    { t: 'La condensación', d: 'es cuando el vapor se convierte en nubes' },
    { t: 'La precipitación', d: 'es cuando el agua cae como lluvia o nieve' },
    { t: 'El día', d: 'dura 24 horas' },
    { t: 'El año', d: 'dura 365 días' },
    { t: 'La Tierra', d: 'gira alrededor del Sol' },
    { t: 'La rotación', d: 'es el giro de la Tierra sobre su propio eje' },
    { t: 'La traslación', d: 'es el movimiento de la Tierra alrededor del Sol' },
    { t: 'Los cinco sentidos', d: 'son vista, oído, olfato, gusto y tacto' },
    { t: 'El corazón', d: 'bombea la sangre por todo el cuerpo' },
    { t: 'Los pulmones', d: 'sirven para respirar' },
    { t: 'El estómago', d: 'digiere los alimentos' },
    { t: 'Los huesos', d: 'forman el esqueleto y sostienen el cuerpo' },
    { t: 'Los músculos', d: 'permiten el movimiento del cuerpo' },
    { t: 'El cerebro', d: 'controla todo el cuerpo' },
    { t: 'La piel', d: 'protege el cuerpo y nos da el sentido del tacto' },
    { t: 'Los dientes', d: 'sirven para masticar los alimentos' },
    { t: 'La sangre', d: 'transporta oxígeno por el cuerpo' },
    { t: 'Los alimentos', d: 'nos dan energía para crecer y movernos' },
    { t: 'Las frutas y verduras', d: 'son alimentos saludables con vitaminas' },
    { t: 'El ejercicio', d: 'mantiene el cuerpo sano y fuerte' },
    { t: 'El sueño', d: 'es necesario para descansar y crecer' },
    { t: 'La higiene', d: 'como lavarse las manos, previene enfermedades' },
    { t: 'El reciclaje', d: 'es reutilizar materiales para cuidar el planeta' },
    { t: 'La basura', d: 'debe tirarse en los botes de basura' },
    { t: 'El agua potable', d: 'es agua limpia que podemos beber' },
    { t: 'El ahorro de agua', d: 'es cerrar la llave mientras nos lavamos los dientes' },
    { t: 'Los imanes', d: 'atraen objetos de metal como el hierro' },
    { t: 'La luz', d: 'viaja en línea recta' },
    { t: 'El sonido', d: 'se produce por las vibraciones' },
  ];
  const F2 = [
    { t: 'La célula', d: 'es la unidad básica de los seres vivos' },
    { t: 'El núcleo', d: 'controla las funciones de la célula' },
    { t: 'La membrana celular', d: 'envuelve y protege la célula' },
    { t: 'El citoplasma', d: 'es el líquido interior de la célula' },
    { t: 'La fotosíntesis', d: 'es el proceso por el que las plantas fabrican su alimento' },
    { t: 'La clorofila', d: 'es el pigmento verde de las plantas' },
    { t: 'El oxígeno', d: 'es el gas que las plantas liberan en la fotosíntesis' },
    { t: 'El dióxido de carbono', d: 'es el gas que las plantas absorben' },
    { t: 'La cadena alimentaria', d: 'muestra quién se come a quién en la naturaleza' },
    { t: 'Los productores', d: 'son las plantas que fabrican su propio alimento' },
    { t: 'Los consumidores', d: 'son los animales que se alimentan de otros seres' },
    { t: 'Los descomponedores', d: 'descomponen los restos de los seres vivos' },
    { t: 'El ecosistema', d: 'es la comunidad de seres vivos y su ambiente' },
    { t: 'El hábitat', d: 'es el lugar donde vive un organismo' },
    { t: 'La biodiversidad', d: 'es la variedad de seres vivos en un lugar' },
    { t: 'La extinción', d: 'es la desaparición de una especie' },
    { t: 'Las especies en peligro', d: 'son especies que pueden desaparecer' },
    { t: 'El efecto invernadero', d: 'es el calentamiento de la atmósfera' },
    { t: 'El cambio climático', d: 'es el aumento de la temperatura del planeta' },
    { t: 'Las energías renovables', d: 'son la solar, eólica e hidráulica' },
    { t: 'La energía solar', d: 'proviene del Sol' },
    { t: 'La energía eólica', d: 'proviene del viento' },
    { t: 'La energía hidráulica', d: 'proviene del agua' },
    { t: 'Los combustibles fósiles', d: 'son el petróleo, el carbón y el gas natural' },
    { t: 'La materia', d: 'es todo lo que ocupa un lugar en el espacio' },
    { t: 'Los estados de la materia', d: 'son sólido, líquido y gaseoso' },
    { t: 'El sólido', d: 'tiene forma y volumen propios' },
    { t: 'El líquido', d: 'toma la forma del recipiente' },
    { t: 'El gas', d: 'se expande y ocupa todo el espacio disponible' },
    { t: 'La fusión', d: 'es el paso de sólido a líquido' },
    { t: 'La solidificación', d: 'es el paso de líquido a sólido' },
    { t: 'La evaporación', d: 'es el paso de líquido a gas' },
    { t: 'La condensación', d: 'es el paso de gas a líquido' },
    { t: 'La masa', d: 'es la cantidad de materia de un objeto' },
    { t: 'El volumen', d: 'es el espacio que ocupa un objeto' },
    { t: 'La densidad', d: 'es la masa dividida entre el volumen' },
    { t: 'La fuerza', d: 'es un empuje o tirón sobre un objeto' },
    { t: 'La gravedad', d: 'atrae los objetos hacia la Tierra' },
    { t: 'La fricción', d: 'es la fuerza que frena el movimiento' },
    { t: 'La energía', d: 'es la capacidad de producir cambios o trabajo' },
    { t: 'La energía cinética', d: 'es la energía del movimiento' },
    { t: 'La energía potencial', d: 'es la energía almacenada' },
    { t: 'La electricidad', d: 'es el flujo de electrones' },
    { t: 'El circuito eléctrico', d: 'necesita una fuente, cables y un receptor' },
    { t: 'Los conductores', d: 'son materiales que dejan pasar la electricidad' },
    { t: 'Los aislantes', d: 'son materiales que no dejan pasar la electricidad' },
    { t: 'El imán', d: 'tiene un polo norte y un polo sur' },
    { t: 'El magnetismo', d: 'es la fuerza que ejercen los imanes' },
    { t: 'El telescopio', d: 'sirve para observar los astros' },
    { t: 'El microscopio', d: 'sirve para observar objetos muy pequeños' },
  ];

  /* ---------- Unidades procedimentales ---------- */
  function animalUnit(u, n) {
    const exs = [];
    const animals = [
      ['🐶', 'perro', 'mamífero'], ['🐱', 'gato', 'mamífero'], ['🐮', 'vaca', 'mamífero'], ['🐘', 'elefante', 'mamífero'],
      ['🦁', 'león', 'mamífero'], ['🐬', 'delfín', 'mamífero'], ['🐋', 'ballena', 'mamífero'], ['🦇', 'murciélago', 'mamífero'],
      ['🐦', 'pájaro', 'ave'], ['🦅', 'águila', 'ave'], ['🦉', 'búho', 'ave'], ['🐧', 'pingüino', 'ave'],
      ['🦢', 'cisne', 'ave'], ['🦜', 'loro', 'ave'], ['🐟', 'pez', 'pez'], ['🦈', 'tiburón', 'pez'],
      ['🐠', 'pez payaso', 'pez'], ['🐡', 'pez globo', 'pez'], ['🐍', 'serpiente', 'reptil'], ['🐊', 'cocodrilo', 'reptil'],
      ['🦎', 'lagartija', 'reptil'], ['🐢', 'tortuga', 'reptil'], ['🐸', 'rana', 'anfibio'], ['🦎', 'salamandra', 'anfibio'],
      ['🐝', 'abeja', 'insecto'], ['🐜', 'hormiga', 'insecto'], ['🦋', 'mariposa', 'insecto'], ['🐞', 'catarina', 'insecto'],
    ];
    for (let i = 0; i < n; i++) {
      const [emoji, name, group] = pick(animals);
      const wrongs = pickN(['mamífero', 'ave', 'pez', 'reptil', 'anfibio', 'insecto'].filter(x => x !== group), 2);
      exs.push(mcQ(u, `${emoji} ¿A qué grupo pertenece ${name}?`, shuffle([group, ...wrongs]), group, 1, i));
    }
    return exs;
  }
  function plantUnit(u, n) {
    const exs = [];
    const parts = [
      ['raíz', 'absorbe agua y nutrientes'], ['tallo', 'transporta el agua'], ['hoja', 'hace la fotosíntesis'],
      ['flor', 'produce semillas'], ['fruto', 'protege las semillas'], ['semilla', 'germina en una nueva planta'],
    ];
    for (let i = 0; i < n; i++) {
      const [p, f] = pick(parts);
      const wrongs = pickN(parts.filter(x => x[0] !== p), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Qué parte de la planta ${f}?`, shuffle([p, ...wrongs.map(w => parts.find(x => x[1] === w)[0])]), p, 1, i));
    }
    return exs;
  }
  function bodyUnit(u, n) {
    const exs = [];
    const organs = [
      ['corazón', 'bombea la sangre'], ['pulmones', 'respiran'], ['estómago', 'digiere los alimentos'],
      ['cerebro', 'controla el cuerpo'], ['hígado', 'limpia la sangre'], ['riñones', 'filtran la sangre'],
      ['intestinos', 'absorben los nutrientes'], ['piel', 'protege el cuerpo'],
    ];
    for (let i = 0; i < n; i++) {
      const [o, f] = pick(organs);
      const wrongs = pickN(organs.filter(x => x[0] !== o), 2).map(x => x[0]);
      exs.push(mcQ(u, `¿Qué órgano ${f}?`, shuffle([o, ...wrongs]), o, 1, i));
    }
    return exs;
  }
  function matterUnit(u, n) {
    const exs = [];
    const items = [
      ['piedra', 'sólido'], ['agua', 'líquido'], ['aire', 'gaseoso'], ['hielo', 'sólido'], ['leche', 'líquido'],
      ['vapor', 'gaseoso'], ['madera', 'sólido'], ['jugo', 'líquido'], ['helio', 'gaseoso'], ['arena', 'sólido'],
      ['aceite', 'líquido'], ['humo', 'gaseoso'], ['hierro', 'sólido'], ['miel', 'líquido'], ['oxígeno', 'gaseoso'],
    ];
    for (let i = 0; i < n; i++) {
      const [item, state] = pick(items);
      const wrongs = pickN(['sólido', 'líquido', 'gaseoso'].filter(x => x !== state), 2);
      exs.push(mcQ(u, `¿En qué estado está ${item}?`, shuffle([state, ...wrongs]), state, 1, i));
    }
    return exs;
  }
  function energyUnit(u, n) {
    const exs = [];
    const energies = [
      ['solar', 'del Sol'], ['eólica', 'del viento'], ['hidráulica', 'del agua'], ['geotérmica', 'del calor de la Tierra'],
      ['nuclear', 'de los átomos'], ['química', 'de las sustancias'], ['eléctrica', 'de la electricidad'], ['cinética', 'del movimiento'],
    ];
    for (let i = 0; i < n; i++) {
      const [e, src] = pick(energies);
      const wrongs = pickN(energies.filter(x => x[0] !== e), 2).map(x => x[1]);
      exs.push(mcQ(u, `La energía ${e} proviene...`, shuffle([src, ...wrongs]), src, 1, i));
    }
    return exs;
  }
  function waterCycleUnit(u, n) {
    const exs = [];
    const steps = [
      ['evaporación', 'el agua se convierte en vapor'], ['condensación', 'el vapor forma nubes'],
      ['precipitación', 'el agua cae como lluvia'], ['infiltración', 'el agua entra en el suelo'],
      ['escurrimiento', 'el agua corre por los ríos'], ['transpiración', 'las plantas liberan vapor'],
    ];
    for (let i = 0; i < n; i++) {
      const [step, desc] = pick(steps);
      const wrongs = pickN(steps.filter(x => x[0] !== step), 2).map(x => x[1]);
      exs.push(mcQ(u, `¿Qué es ${step}?`, shuffle([desc, ...wrongs]), desc, 1, i));
    }
    return exs;
  }

  /* ===== Ciencias 1 ===== */
  {
    const l = addLevel(s, 'ciencias-1', '1er ciclo', 'Cycle 1', 'Zyklus 1');
    addUnit(s, l, 'Los seres vivos', 'Living things', 'Lebewesen', (u) => factUnit(u, F1.slice(0, 20), { fb: false }));
    addUnit(s, l, 'Las plantas', 'Plants', 'Pflanzen', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F1.filter(f => ['La raíz', 'El tallo', 'Las hojas', 'La flor', 'El fruto', 'La semilla', 'Las plantas'].includes(f.t)), { fb: false }));
      exs.push(...plantUnit(u, 180));
      return exs;
    });
    addUnit(s, l, 'Los animales', 'Animals', 'Tiere', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F1.filter(f => ['Los mamíferos', 'Las aves', 'Los peces', 'Los reptiles', 'Los anfibios', 'Los insectos'].includes(f.t)), { fb: false }));
      exs.push(...animalUnit(u, 240));
      return exs;
    });
    addUnit(s, l, 'El agua y el ciclo del agua', 'Water and the water cycle', 'Wasser und Wasserkreislauf', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F1.filter(f => ['El agua', 'El ciclo del agua', 'La evaporación', 'La condensación', 'La precipitación', 'El agua potable', 'El ahorro de agua'].includes(f.t)), { fb: false }));
      exs.push(...waterCycleUnit(u, 180));
      return exs;
    });
    addUnit(s, l, 'El cielo y la Tierra', 'The sky and the Earth', 'Himmel und Erde', (u) => factUnit(u, F1.filter(f => ['El sol', 'La luna', 'El día', 'El año', 'La Tierra', 'La rotación', 'La traslación'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Mi cuerpo', 'My body', 'Mein Körper', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F1.filter(f => ['Los cinco sentidos', 'El corazón', 'Los pulmones', 'El estómago', 'Los huesos', 'Los músculos', 'El cerebro', 'La piel', 'Los dientes', 'La sangre'].includes(f.t)), { fb: false }));
      exs.push(...bodyUnit(u, 180));
      return exs;
    });
    addUnit(s, l, 'Salud y hábitos', 'Health and habits', 'Gesundheit und Gewohnheiten', (u) => factUnit(u, F1.filter(f => ['Los alimentos', 'Las frutas y verduras', 'El ejercicio', 'El sueño', 'La higiene'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Cuidar el planeta', 'Caring for the planet', 'Den Planeten schützen', (u) => factUnit(u, F1.filter(f => ['El reciclaje', 'La basura', 'El suelo', 'El aire'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Luz, sonido e imanes', 'Light, sound and magnets', 'Licht, Ton und Magnete', (u) => factUnit(u, F1.filter(f => ['Los imanes', 'La luz', 'El sonido'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Repaso de ciencias', 'Science review', 'Naturwissenschaften Wiederholung', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F1, { fb: false }));
      exs.push(...animalUnit(u, 120));
      return exs;
    });
  }

  /* ===== Ciencias 2 ===== */
  {
    const l = addLevel(s, 'ciencias-2', '2do ciclo', 'Cycle 2', 'Zyklus 2');
    addUnit(s, l, 'La célula', 'The cell', 'Die Zelle', (u) => factUnit(u, F2.filter(f => ['La célula', 'El núcleo', 'La membrana celular', 'El citoplasma'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Fotosíntesis', 'Photosynthesis', 'Fotosynthese', (u) => factUnit(u, F2.filter(f => ['La fotosíntesis', 'La clorofila', 'El oxígeno', 'El dióxido de carbono'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Cadenas alimentarias', 'Food chains', 'Nahrungsketten', (u) => factUnit(u, F2.filter(f => ['La cadena alimentaria', 'Los productores', 'Los consumidores', 'Los descomponedores'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Ecosistemas', 'Ecosystems', 'Ökosysteme', (u) => factUnit(u, F2.filter(f => ['El ecosistema', 'El hábitat', 'La biodiversidad', 'La extinción', 'Las especies en peligro'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'La materia y sus estados', 'Matter and its states', 'Materie und ihre Zustände', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F2.filter(f => ['La materia', 'Los estados de la materia', 'El sólido', 'El líquido', 'El gas', 'La fusión', 'La solidificación', 'La evaporación', 'La condensación', 'La masa', 'El volumen', 'La densidad'].includes(f.t)), { fb: false }));
      exs.push(...matterUnit(u, 180));
      return exs;
    });
    addUnit(s, l, 'Fuerzas y energía', 'Forces and energy', 'Kräfte und Energie', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F2.filter(f => ['La fuerza', 'La gravedad', 'La fricción', 'La energía', 'La energía cinética', 'La energía potencial'].includes(f.t)), { fb: false }));
      exs.push(...energyUnit(u, 180));
      return exs;
    });
    addUnit(s, l, 'Electricidad y magnetismo', 'Electricity and magnetism', 'Elektrizität und Magnetismus', (u) => factUnit(u, F2.filter(f => ['La electricidad', 'El circuito eléctrico', 'Los conductores', 'Los aislantes', 'El imán', 'El magnetismo'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Cambio climático', 'Climate change', 'Klimawandel', (u) => factUnit(u, F2.filter(f => ['El efecto invernadero', 'El cambio climático', 'Las energías renovables', 'La energía solar', 'La energía eólica', 'La energía hidráulica', 'Los combustibles fósiles'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Instrumentos científicos', 'Scientific instruments', 'Wissenschaftliche Instrumente', (u) => factUnit(u, F2.filter(f => ['El telescopio', 'El microscopio'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Repaso de ciencias', 'Science review', 'Naturwissenschaften Wiederholung', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F2, { fb: false }));
      exs.push(...matterUnit(u, 120));
      return exs;
    });
  }
};