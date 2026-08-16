/* ============================================================
 * ESPAÑOL — 9 000 ejercicios, 9 niveles (g1-g6, s1-s3)
 * Bancos léxicos + generación procedimental.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN } = ctx;

  const s = addSubject('espanol', 'Español', 'Spanish', 'Spanisch', '#E91E63', '📖');

  /* ---------- Helpers léxicos ---------- */
  function countSyllables(w) {
    const t = w.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
    const groups = t.match(/[aeiouáéíóúü]+/g) || [];
    return groups.length;
  }
  function pluralOf(w) {
    if (w.endsWith('z')) return w.slice(0, -1) + 'ces';
    if (w.endsWith('s') || w.endsWith('x')) return w;
    if (w.endsWith('ión')) return w.slice(0, -2) + 'ones';
    if (/[aeiouáéíóú]$/.test(w)) return w + 's';
    return w + 'es';
  }
  function wrongSpelling(w) {
    const rules = [
      x => x.replace(/b/g, 'v').replace(/v/g, 'b'),
      x => x.replace(/c(?=[eí])/g, 's').replace(/s(?=[eí])/g, 'c'),
      x => x.replace(/z/g, 's').replace(/s/g, 'z'),
      x => x.replace(/h/g, ''),
      x => x.replace(/(.)\1/g, '$1'),
      x => x.replace(/y/g, 'll').replace(/ll/g, 'y'),
      x => x.replace(/g(?=[eí])/g, 'j').replace(/j(?=[eí])/g, 'g'),
      x => x.replace(/r/g, 'rr').replace(/rr/g, 'r'),
    ];
    return pick(rules)(w);
  }
  function uniqueWrong(w, n) {
    const out = new Set();
    let guard = 0;
    while (out.size < n && guard++ < 300) {
      const v = wrongSpelling(w);
      if (v !== w && v.length > 1) out.add(v);
    }
    return [...out];
  }
  function conjugate(verb, tense, person) {
    const stem = verb.slice(0, -2);
    const end = verb.slice(-2);
    const P = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
    const i = P.indexOf(person);
    if (tense === 'presente') {
      const suf = { ar: ['o', 'as', 'a', 'amos', 'an'], er: ['o', 'es', 'e', 'emos', 'en'], ir: ['o', 'es', 'e', 'imos', 'en'] }[end];
      return stem + suf[i];
    }
    if (tense === 'preterito') {
      const suf = { ar: ['é', 'aste', 'ó', 'amos', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'ieron'], ir: ['í', 'iste', 'ió', 'imos', 'ieron'] }[end];
      return stem + suf[i];
    }
    if (tense === 'futuro') {
      const suf = ['é', 'ás', 'á', 'emos', 'án'];
      return verb + suf[i];
    }
    return verb;
  }
  function wrongConj(verb, tense, person) {
    const P = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
    const i = P.indexOf(person);
    const j = (i + ri(1, 4)) % 5;
    return conjugate(verb, tense, P[j]);
  }

  /* ---------- Bancos léxicos ---------- */
  const SYL = [
    ['sol', 1], ['pan', 1], ['mar', 1], ['flor', 1], ['luz', 1], ['tren', 1], ['sal', 1], ['pez', 1],
    ['casa', 2], ['mesa', 2], ['luna', 2], ['perro', 2], ['gato', 2], ['mano', 2], ['pato', 2], ['sapo', 2],
    ['lobo', 2], ['nube', 2], ['plato', 2], ['brazo', 2], ['globo', 2], ['queso', 2], ['silla', 2], ['libro', 2],
    ['ventana', 3], ['escuela', 3], ['camisa', 3], ['zapato', 3], ['caballo', 3], ['jirafa', 3], ['cuchara', 3],
    ['bicicleta', 4], ['elefante', 4], ['mariposa', 4], ['computadora', 5], ['mariposa', 4], ['teléfono', 4],
    ['murciélago', 4], ['pájaro', 3], ['árbol', 2], ['reloj', 2], ['tijeras', 3], ['verde', 2], ['amarillo', 4],
  ];
  const SPELL = {
    g1: ['casa', 'mesa', 'sol', 'luna', 'perro', 'gato', 'mano', 'pato', 'sapo', 'lobo', 'nube', 'flor', 'pez', 'pan', 'mar', 'sal', 'tren', 'globo', 'plato', 'brazo', 'queso', 'silla', 'libro', 'puerta'],
    g2: ['bicicleta', 'vaca', 'zapato', 'cuchara', 'escuela', 'camisa', 'ventana', 'caballo', 'jirafa', 'cereza', 'verde', 'blanco', 'negro', 'amarillo', 'rojo', 'azul', 'naranja', 'reloj', 'tijeras', 'cuchillo', 'tenedor', 'plátano', 'manzana', 'naranja'],
    g3: ['huevo', 'hueso', 'hielo', 'hacha', 'hongo', 'hormiga', 'hueso', 'guitarra', 'guante', 'guiso', 'girasol', 'jirafa', 'jabón', 'jardín', 'jueves', 'jugar', 'gente', 'genio', 'gigante', 'geografía', 'cocina', 'cigüeña', 'cigarro', 'cebolla'],
    g4: ['llave', 'lluvia', 'llanta', 'llorar', 'llegar', 'lleno', 'yema', 'yate', 'yogur', 'yerno', 'rayo', 'carro', 'perro', 'barro', 'torre', 'sierra', 'arroz', 'tierra', 'guerra', 'cerro', 'correr', 'arriba', 'abajo', 'alrededor'],
    g5: ['médico', 'página', 'teléfono', 'sábado', 'miércoles', 'rápido', 'fácil', 'difícil', 'lápiz', 'árbol', 'canción', 'corazón', 'león', 'ratón', 'jamás', 'también', 'después', 'mamá', 'papá', 'café', 'menú', 'sofá', 'rubí', 'bebé'],
    g6: ['haya', 'halla', 'valla', 'vaya', 'bello', 'vello', 'botar', 'votar', 'cabo', 'cavo', 'tubo', 'tuvo', 'barón', 'varón', 'basta', 'vasta', 'hola', 'ola', 'haber', 'a ver', 'rebelar', 'revelar', 'cocer', 'coser'],
    s1: ['excepción', 'excelente', 'explicar', 'expresar', 'extraño', 'extranjero', 'examen', 'exacto', 'exigir', 'exhausto', 'exhibir', 'exhortar', 'exhalar', 'exhorto', 'exilio', 'existir', 'éxito', 'expediente', 'experiencia', 'experimento'],
    s2: ['absorber', 'abstracto', 'absurdo', 'obscuro', 'subrayar', 'subterráneo', 'subvención', 'advertir', 'adviento', 'adverbio', 'obtener', 'obvio', 'observar', 'obstáculo', 'obstinado', 'obstruir', 'subasta', 'subdesarrollo', 'subdirector', 'submarino'],
    s3: ['psicología', 'psiquiatra', 'pseudónimo', 'gnomo', 'gnosis', 'mnemotecnia', 'neumático', 'neumonía', 'xilófono', 'xenofobia', 'xerografía', 'yunque', 'yugo', 'yacer', 'hierba', 'hierro', 'hielo', 'hiena', 'hiato', 'hígado'],
  };
  const SYN = {
    g1: [['alegre', 'contento'], ['rápido', 'veloz'], ['grande', 'enorme'], ['bonito', 'lindo'], ['pequeño', 'chico'], ['caminar', 'andar'], ['mirar', 'observar'], ['saltar', 'brincar'], ['casa', 'hogar'], ['niño', 'chico'], ['hablar', 'conversar'], ['comer', 'alimentarse']],
    g2: [['feliz', 'contento'], ['triste', 'apenado'], ['enojado', 'molesto'], ['cansado', 'agotado'], ['fuerte', 'robusto'], ['débil', 'frágil'], ['limpio', 'aseado'], ['sucio', 'mugriento'], ['bonito', 'hermoso'], ['feo', 'horrible'], ['listo', 'inteligente'], ['tonto', 'bobo'], ['valiente', 'audaz'], ['miedoso', 'temeroso'], ['amable', 'cordial'], ['grosero', 'maleducado']],
    g3: [['iniciar', 'comenzar'], ['terminar', 'finalizar'], ['ayudar', 'colaborar'], ['comprar', 'adquirir'], ['vender', 'comercializar'], ['buscar', 'indagar'], ['encontrar', 'hallar'], ['pensar', 'reflexionar'], ['decir', 'expresar'], ['contar', 'narrar'], ['ver', 'contemplar'], ['oír', 'escuchar'], ['caminar', 'deambular'], ['correr', 'apresurarse'], ['saltar', 'brincar'], ['nadar', 'flotar']],
    g4: [['abundante', 'copioso'], ['escaso', 'limitado'], ['antiguo', 'viejo'], ['moderno', 'actual'], ['sencillo', 'simple'], ['complicado', 'complejo'], ['correcto', 'acertado'], ['incorrecto', 'erróneo'], ['importante', 'relevante'], ['insignificante', 'trivial'], ['famoso', 'célebre'], ['desconocido', 'anónimo'], ['generoso', 'dadivoso'], ['egoísta', 'interesado'], ['tranquilo', 'sereno'], ['nervioso', 'inquieto']],
    g5: [['efímero', 'pasajero'], ['permanente', 'duradero'], ['sincero', 'honesto'], ['falso', 'mentiroso'], ['prudente', 'cauteloso'], ['imprudente', 'temerario'], ['sabio', 'erudito'], ['ignorante', 'inculto'], ['rico', 'adinerado'], ['pobre', 'humilde'], ['fuerte', 'vigoroso'], ['débil', 'endeble'], ['claro', 'nítido'], ['oscuro', 'tenebroso'], ['amplio', 'espacioso'], ['estrecho', 'angosto']],
    g6: [['obstáculo', 'impedimento'], ['ventaja', 'beneficio'], ['desventaja', 'inconveniente'], ['solución', 'respuesta'], ['problema', 'dificultad'], ['cambio', 'transformación'], ['permanencia', 'estabilidad'], ['crecer', 'desarrollarse'], ['disminuir', 'reducir'], ['aumentar', 'incrementar'], ['unir', 'juntar'], ['separar', 'dividir'], ['aceptar', 'admitir'], ['rechazar', 'negar'], ['recordar', 'rememorar'], ['olvidar', 'omitir']],
    s1: [['cóncavo', 'hundido'], ['convexo', 'abombado'], ['lúcido', 'claro'], ['obscuro', 'tenebroso'], ['prolijo', 'detallado'], ['sucinto', 'breve'], ['veraz', 'honesto'], ['falaz', 'engañoso'], ['óptimo', 'excelente'], ['pésimo', 'malísimo'], ['cauteloso', 'precavido'], ['osado', 'atrevido'], ['frugal', 'austero'], ['suntuoso', 'lujoso'], ['lacónico', 'conciso'], ['verboso', 'hablador']],
    s2: [['elocuente', 'persuasivo'], ['taciturno', 'callado'], ['magnánimo', 'generoso'], ['mezquino', 'tacaño'], ['perspicaz', 'agudo'], ['ingenuo', 'cándido'], ['tenaz', 'perseverante'], ['voluble', 'inconstante'], ['afable', 'amable'], ['huraño', 'arisco'], ['espléndido', 'magnífico'], ['lamentable', 'deplorable'], ['coherente', 'lógico'], ['incoherente', 'ilógico'], ['próspero', 'floreciente'], ['adverso', 'desfavorable']],
    s3: [['eufemismo', 'atenuación'], ['disuasivo', 'persuasivo'], ['intrínseco', 'inherente'], ['extrínseco', 'externo'], ['paradigma', 'modelo'], ['anomalía', 'irregularidad'], ['conjetura', 'suposición'], ['certeza', 'seguridad'], ['ambigüedad', 'imprecisión'], ['claridad', 'nitidez'], ['subjetivo', 'personal'], ['objetivo', 'imparcial'], ['abstracto', 'conceptual'], ['concreto', 'específico'], ['efímero', 'transitorio'], ['perdurable', 'eterno']],
  };
  const ANT = {
    g1: [['grande', 'pequeño'], ['día', 'noche'], ['alto', 'bajo'], ['arriba', 'abajo'], ['frío', 'caliente'], ['rápido', 'lento'], ['abierto', 'cerrado'], ['feliz', 'triste'], ['bueno', 'malo'], ['limpio', 'sucio'], ['lejos', 'cerca'], ['mucho', 'poco']],
    g2: [['fuerte', 'débil'], ['gordo', 'flaco'], ['joven', 'viejo'], ['nuevo', 'viejo'], ['seco', 'mojado'], ['duro', 'blando'], ['largo', 'corto'], ['ancho', 'estrecho'], ['claro', 'oscuro'], ['lleno', 'vacío'], ['primero', 'último'], ['entrar', 'salir'], ['subir', 'bajar'], ['ganar', 'perder'], ['reír', 'llorar'], ['dar', 'recibir']],
    g3: [['amable', 'grosero'], ['valiente', 'cobarde'], ['sincero', 'falso'], ['generoso', 'egoísta'], ['paciente', 'impaciente'], ['ordenado', 'desordenado'], ['atento', 'distraído'], ['tranquilo', 'nervioso'], ['abundante', 'escaso'], ['frecuente', 'raro'], ['posible', 'imposible'], ['seguro', 'peligroso'], ['fácil', 'difícil'], ['simple', 'complicado'], ['barato', 'caro'], ['pesado', 'ligero']],
    g4: [['aumentar', 'disminuir'], ['unir', 'separar'], ['aceptar', 'rechazar'], ['recordar', 'olvidar'], ['aparecer', 'desaparecer'], ['empezar', 'terminar'], ['avanzar', 'retroceder'], ['acelerar', 'frenar'], ['construir', 'destruir'], ['crear', 'eliminar'], ['incluir', 'excluir'], ['abrir', 'cerrar'], ['encender', 'apagar'], ['llenar', 'vaciar'], ['subir', 'bajar'], ['adelantar', 'atrasar']],
    g5: [['prudente', 'imprudente'], ['sabio', 'ignorante'], ['rico', 'pobre'], ['moderno', 'anticuado'], ['permanente', 'temporal'], ['efímero', 'duradero'], ['sincero', 'hipócrita'], ['honesto', 'deshonesto'], ['claro', 'confuso'], ['preciso', 'impreciso'], ['orden', 'caos'], ['paz', 'guerra'], ['amor', 'odio'], ['alegría', 'tristeza'], ['esperanza', 'desesperación'], ['calma', 'agitación']],
    g6: [['obstáculo', 'facilidad'], ['ventaja', 'desventaja'], ['solución', 'problema'], ['cambio', 'estabilidad'], ['crecer', 'decrecer'], ['aumentar', 'reducir'], ['aceptar', 'rechazar'], ['unir', 'separar'], ['recordar', 'olvidar'], ['concreto', 'abstracto'], ['objetivo', 'subjetivo'], ['real', 'imaginario'], ['natural', 'artificial'], ['original', 'copia'], ['directo', 'indirecto'], ['activo', 'pasivo']],
    s1: [['cóncavo', 'convexo'], ['lúcido', 'confuso'], ['prolijo', 'sucinto'], ['veraz', 'falaz'], ['óptimo', 'pésimo'], ['cauteloso', 'osado'], ['frugal', 'suntuoso'], ['lacónico', 'verboso'], ['ascender', 'descender'], ['incluir', 'excluir'], ['interno', 'externo'], ['superior', 'inferior'], ['anterior', 'posterior'], ['inicial', 'final'], ['positivo', 'negativo'], ['activo', 'pasivo']],
    s2: [['elocuente', 'taciturno'], ['magnánimo', 'mezquino'], ['perspicaz', 'ingenuo'], ['tenaz', 'voluble'], ['afable', 'huraño'], ['espléndido', 'lamentable'], ['coherente', 'incoherente'], ['próspero', 'adverso'], ['sintético', 'analítico'], ['teórico', 'práctico'], ['abstracto', 'concreto'], ['general', 'particular'], ['simple', 'complejo'], ['estable', 'inestable'], ['flexible', 'rígido'], ['abierto', 'cerrado']],
    s3: [['intrínseco', 'extrínseco'], ['paradigma', 'anomalía'], ['conjetura', 'certeza'], ['ambigüedad', 'claridad'], ['subjetivo', 'objetivo'], ['abstracto', 'concreto'], ['efímero', 'perdurable'], ['disuasivo', 'persuasivo'], ['explícito', 'implícito'], ['literal', 'figurado'], ['denotativo', 'connotativo'], ['sincrónico', 'diacrónico'], ['estático', 'dinámico'], ['homogéneo', 'heterogéneo'], ['continuo', 'discontinuo'], ['regular', 'irregular']],
  };
  const VERBS = ['hablar', 'comer', 'vivir', 'cantar', 'correr', 'escribir', 'leer', 'saltar', 'bailar', 'dibujar', 'estudiar', 'jugar', 'nadar', 'dormir', 'caminar', 'trabajar', 'comprar', 'vender', 'abrir', 'cerrar', 'escuchar', 'mirar', 'pensar', 'sentir', 'viajar', 'cocinar', 'limpiar', 'lavar', 'pintar', 'cantar'];
  const NOUNS = [
    ['el', 'perro'], ['la', 'casa'], ['el', 'gato'], ['la', 'mesa'], ['el', 'sol'], ['la', 'luna'], ['el', 'libro'], ['la', 'silla'],
    ['el', 'zapato'], ['la', 'camisa'], ['el', 'caballo'], ['la', 'ventana'], ['el', 'plato'], ['la', 'cuchara'], ['el', 'reloj'], ['la', 'puerta'],
    ['el', 'árbol'], ['la', 'flor'], ['el', 'pan'], ['la', 'manzana'], ['el', 'queso'], ['la', 'naranja'], ['el', 'plátano'], ['la', 'escuela'],
    ['el', 'maestro'], ['la', 'maestra'], ['el', 'doctor'], ['la', 'doctora'], ['el', 'niño'], ['la', 'niña'], ['el', 'amigo'], ['la', 'amiga'],
    ['el', 'carro'], ['la', 'bicicleta'], ['el', 'avión'], ['la', 'lancha'], ['el', 'tren'], ['la', 'moto'], ['el', 'barco'], ['la', 'calle'],
    ['el', 'pájaro'], ['la', 'mariposa'], ['el', 'pez'], ['la', 'ballena'], ['el', 'león'], ['la', 'jirafa'], ['el', 'tigre'], ['la', 'cebra'],
  ];
  const PLURALS = ['casa', 'mesa', 'perro', 'gato', 'libro', 'silla', 'zapato', 'camisa', 'plato', 'cuchara', 'reloj', 'árbol', 'flor', 'pan', 'queso', 'manzana', 'naranja', 'plátano', 'escuela', 'maestro', 'doctor', 'niño', 'amigo', 'carro', 'avión', 'tren', 'barco', 'pájaro', 'pez', 'león', 'ratón', 'corazón', 'canción', 'lápiz', 'juez', 'luz', 'voz', 'nariz', 'cruz', 'feliz'];
  const ACCENT = [
    ['árbol', true], ['café', true], ['lápiz', true], ['canción', true], ['rápido', true], ['fácil', true], ['difícil', true],
    ['médico', true], ['página', true], ['teléfono', true], ['sábado', true], ['miércoles', true], ['jamás', true], ['también', true],
    ['después', true], ['mamá', true], ['papá', true], ['corazón', true], ['león', true], ['ratón', true], ['menú', true], ['sofá', true],
    ['rubí', true], ['bebé', true], ['reloj', false], ['pared', false], ['mesa', false], ['libro', false], ['ventana', false],
    ['escuela', false], ['camisa', false], ['zapato', false], ['manzana', false], ['naranja', false], ['plátano', false],
    ['computadora', false], ['escritorio', false], ['cuaderno', false], ['mochila', false], ['pizarra', false], ['tijeras', false],
  ];
  const HOMOPHONES = [
    ['hola', 'ola'], ['haber', 'a ver'], ['haya', 'halla'], ['valla', 'vaya'], ['bello', 'vello'],
    ['botar', 'votar'], ['cabo', 'cavo'], ['tubo', 'tuvo'], ['barón', 'varón'], ['basta', 'vasta'],
    ['rebelar', 'revelar'], ['cocer', 'coser'], ['casa', 'caza'], ['hora', 'ora'], ['onda', 'honda'],
    ['asta', 'hasta'], ['echo', 'hecho'], ['errar', 'herrar'], ['grabar', 'gravar'], ['hierba', 'hierva'],
  ];
  const REFRANES = [
    ['Más vale tarde que nunca', 'Es mejor llegar tarde que no llegar'],
    ['A quien madruga, Dios lo ayuda', 'Levantarse temprano trae beneficios'],
    ['El que ríe último, ríe mejor', 'El resultado final es lo que importa'],
    ['No hay mal que por bien no venga', 'De todo problema puede salir algo bueno'],
    ['Ojos que no ven, corazón que no siente', 'Lo que no se ve no causa dolor'],
    ['En boca cerrada no entran moscas', 'Es mejor callar que hablar de más'],
    ['Más vale pájaro en mano que ciento volando', 'Es mejor lo seguro que lo incierto'],
    ['A caballo regalado no le mires el diente', 'No critiques lo que te regalan'],
    ['El que mucho abarca, poco aprieta', 'Quien intenta demasiado, logra poco'],
    ['Perro que ladra no muerde', 'Quien amenaza mucho, poco hace'],
    ['Camarón que se duerme, se lo lleva la corriente', 'Hay que estar alerta'],
    ['De tal palo, tal astilla', 'Los hijos se parecen a los padres'],
    ['Más sabe el diablo por viejo que por diablo', 'La experiencia enseña'],
    ['Cuando el río suena, agua lleva', 'Los rumores suelen tener fundamento'],
    ['El hábito no hace al monje', 'Las apariencias engañan'],
    ['No dejes para mañana lo que puedas hacer hoy', 'No procrastines'],
  ];
  const OBRAS = [
    ['Don Quijote de la Mancha', 'Miguel de Cervantes'], ['Cien años de soledad', 'Gabriel García Márquez'],
    ['La casa de Bernarda Alba', 'Federico García Lorca'], ['El principito', 'Antoine de Saint-Exupéry'],
    ['Romeo y Julieta', 'William Shakespeare'], ['La Odisea', 'Homero'], ['La Ilíada', 'Homero'],
    ['El Lazarillo de Tormes', 'Anónimo'], ['Fuenteovejuna', 'Lope de Vega'], ['La Celestina', 'Fernando de Rojas'],
    ['Platero y yo', 'Juan Ramón Jiménez'], ['La metamorfosis', 'Franz Kafka'], ['1984', 'George Orwell'],
    ['Orgullo y prejuicio', 'Jane Austen'], ['Crimen y castigo', 'Fiódor Dostoyevski'], ['Rayuela', 'Julio Cortázar'],
    ['Pedro Páramo', 'Juan Rulfo'], ['La vorágine', 'José Eustasio Rivera'], ['Doña Bárbara', 'Rómulo Gallegos'],
    ['Martín Fierro', 'José Hernández'],
  ];
  const FIGURAS = [
    ['Metáfora', 'Comparación sin usar «como»'], ['Símil', 'Comparación usando «como»'],
    ['Hipérbole', 'Exageración de la realidad'], ['Personificación', 'Dar cualidades humanas a objetos'],
    ['Onomatopeya', 'Palabra que imita un sonido'], ['Aliteración', 'Repetición de sonidos'],
    ['Ironía', 'Decir lo contrario de lo que se piensa'], ['Anáfora', 'Repetición de una palabra al inicio de versos'],
    ['Hipérbaton', 'Alterar el orden lógico de la oración'], ['Antítesis', 'Contraposición de ideas'],
    ['Paradoja', 'Idea aparentemente contradictoria'], ['Sinestesia', 'Mezclar sensaciones de distintos sentidos'],
    ['Epíteto', 'Adjetivo que resalta una cualidad'], ['Asíndeton', 'Suprimir conjunciones'],
    ['Polisíndeton', 'Abusar de las conjunciones'], ['Apóstrofe', 'Invocación a alguien o algo'],
  ];
  const MOVIMIENTOS = [
    ['Renacimiento', 'Recuperación de la cultura clásica grecolatina'],
    ['Barroco', 'Época de contrastes y complejidad en el siglo XVII'],
    ['Neoclasicismo', 'Predominio de la razón y las reglas clásicas'],
    ['Romanticismo', 'Exaltación de los sentimientos y la libertad'],
    ['Realismo', 'Representación objetiva de la realidad social'],
    ['Modernismo', 'Renovación estética con influencia francesa'],
    ['Generación del 98', 'Reflexión sobre España tras el desastre colonial'],
    ['Vanguardismo', 'Movimientos experimentales del siglo XX'],
    ['Generación del 27', 'Poetas españoles que renovaron la lírica'],
    ['Boom latinoamericano', 'Éxito mundial de la novela latinoamericana'],
    ['Naturalismo', 'Aplicación del método científico a la literatura'],
    ['Simbolismo', 'Sugerir realidades mediante símbolos'],
  ];
  const SINTAXIS = [
    ['Sujeto', 'Quien realiza la acción del verbo'], ['Predicado', 'Lo que se dice del sujeto'],
    ['Núcleo del sujeto', 'Sustantivo o pronombre principal'], ['Núcleo del predicado', 'Verbo principal'],
    ['Complemento directo', 'Recibe directamente la acción'], ['Complemento indirecto', 'Recibe el beneficio o daño'],
    ['Complemento circunstancial', 'Indica tiempo, lugar, modo...'], ['Atributo', 'Cualidad del sujeto con verbos copulativos'],
    ['Oración simple', 'Un solo verbo conjugado'], ['Oración compuesta', 'Dos o más verbos conjugados'],
    ['Oración coordinada', 'Oraciones unidas por conjunciones'], ['Oración subordinada', 'Depende de la principal'],
    ['Sustantivo', 'Nombra personas, animales o cosas'], ['Adjetivo', 'Califica al sustantivo'],
    ['Verbo', 'Expresa acción o estado'], ['Adverbio', 'Modifica al verbo, adjetivo u otro adverbio'],
  ];

  /* ---------- Generadores de unidades ---------- */
  function spellingUnit(u, words, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const w = pick(words);
      const wrongs = uniqueWrong(w, 2);
      if (wrongs.length < 2) { i--; continue; }
      exs.push(mcQ(u, `¿Cuál palabra está bien escrita?`, shuffle([w, ...wrongs]), w, 1, i));
    }
    return exs;
  }
  function syllableUnit(u, words, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [w, c] = pick(words);
      const opts = shuffle([String(c), String(c + 1), String(Math.max(1, c - 1))]);
      exs.push(mcQ(u, `¿Cuántas sílabas tiene «${w}»?`, opts, String(c), 1, i));
    }
    return exs;
  }
  function synUnit(u, pairs, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [a, b] = pick(pairs);
      const wrongs = pickN(pairs.filter(p => p[0] !== a && p[1] !== b), 2).map(p => p[1]);
      exs.push(mcQ(u, `¿Cuál es un sinónimo de «${a}»?`, shuffle([b, ...wrongs]), b, 1, i));
    }
    return exs;
  }
  function antUnit(u, pairs, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [a, b] = pick(pairs);
      const wrongs = pickN(pairs.filter(p => p[0] !== a && p[1] !== b), 2).map(p => p[1]);
      exs.push(mcQ(u, `¿Cuál es un antónimo de «${a}»?`, shuffle([b, ...wrongs]), b, 1, i));
    }
    return exs;
  }
  function verbUnit(u, verbs, tense, n) {
    const exs = [];
    const P = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
    for (let i = 0; i < n; i++) {
      const v = pick(verbs);
      const person = pick(P);
      const correct = conjugate(v, tense, person);
      const wrongs = new Set();
      let guard = 0;
      while (wrongs.size < 2 && guard++ < 50) {
        const w = wrongConj(v, tense, person);
        if (w !== correct) wrongs.add(w);
      }
      exs.push(mcQ(u, `Conjuga en ${tense}: ${person} (${v})`, shuffle([correct, ...wrongs]), correct, 1, i));
    }
    return exs;
  }
  function genderUnit(u, nouns, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [g, w] = pick(nouns);
      exs.push(mcQ(u, `¿Qué artículo corresponde? __ ${w}`, shuffle(['el', 'la']), g, 1, i));
    }
    return exs;
  }
  function pluralUnit(u, words, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const w = pick(words);
      const correct = pluralOf(w);
      const wrongs = new Set();
      let guard = 0;
      while (wrongs.size < 2 && guard++ < 50) {
        const cand = w + (ri(0, 1) ? 's' : 'es');
        if (cand !== correct) wrongs.add(cand);
      }
      exs.push(mcQ(u, `¿Cuál es el plural de «${w}»?`, shuffle([correct, ...wrongs]), correct, 1, i));
    }
    return exs;
  }
  function accentUnit(u, words, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [w, has] = pick(words);
      exs.push(mcQ(u, `¿La palabra «${w}» lleva tilde?`, shuffle(['Sí', 'No']), has ? 'Sí' : 'No', 1, i));
    }
    return exs;
  }
  function homophoneUnit(u, pairs, n) {
    const exs = [];
    const ctxs = [
      ['saludar', 'ola'], ['saludar', 'hola'], ['cocinar', 'cocer'], ['costura', 'coser'],
      ['onda del mar', 'ola'], ['onda del mar', 'honda'], ['saludo', 'hola'], ['saludo', 'ola'],
    ];
    for (let i = 0; i < n; i++) {
      const [a, b] = pick(pairs);
      const useA = ri(0, 1) === 0;
      const correct = useA ? a : b;
      const wrong = useA ? b : a;
      exs.push(mcQ(u, `¿Cuál es la palabra correcta en esta oración? «${useA ? 'Me gusta la ___ del mar' : 'Le dije ___ a mi amigo'}»`, shuffle([correct, wrong]), correct, 1, i));
    }
    return exs;
  }
  function factUnit(u, facts, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const [t, d] = pick(facts);
      const wrongs = pickN(facts.filter(f => f[0] !== t), 2).map(f => f[1]);
      exs.push(mcQ(u, `¿Qué significa «${t}»?`, shuffle([d, ...wrongs]), d, 1, i));
      const wrongT = pickN(facts.filter(f => f[0] !== t), 2).map(f => f[0]);
      exs.push(mcQ(u, `¿Qué refrán/obra/figura corresponde a: «${d}»?`, shuffle([t, ...wrongT]), t, 1, i));
    }
    return exs;
  }
  function mixedUnit(u, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const kind = ri(0, 4);
      if (kind === 0) {
        const w = pick(SPELL.g1.concat(SPELL.g2));
        const wrongs = uniqueWrong(w, 2);
        if (wrongs.length < 2) { i--; continue; }
        exs.push(mcQ(u, `¿Cuál palabra está bien escrita?`, shuffle([w, ...wrongs]), w, 1, i));
      } else if (kind === 1) {
        const [w, c] = pick(SYL);
        exs.push(mcQ(u, `¿Cuántas sílabas tiene «${w}»?`, shuffle([String(c), String(c + 1), String(Math.max(1, c - 1))]), String(c), 1, i));
      } else if (kind === 2) {
        const [a, b] = pick(SYN.g1.concat(SYN.g2));
        exs.push(mcQ(u, `¿Cuál es un sinónimo de «${a}»?`, shuffle([b, ...pickN(SYN.g1.concat(SYN.g2).filter(p => p[0] !== a), 2).map(p => p[1])]), b, 1, i));
      } else if (kind === 3) {
        const [a, b] = pick(ANT.g1.concat(ANT.g2));
        exs.push(mcQ(u, `¿Cuál es un antónimo de «${a}»?`, shuffle([b, ...pickN(ANT.g1.concat(ANT.g2).filter(p => p[0] !== a), 2).map(p => p[1])]), b, 1, i));
      } else {
        const [g, w] = pick(NOUNS);
        exs.push(mcQ(u, `¿Qué artículo corresponde? __ ${w}`, shuffle(['el', 'la']), g, 1, i));
      }
    }
    return exs;
  }

  /* ===== 1er grado ===== */
  {
    const l = addLevel(s, 'espanol-g1', '1er grado', 'Grade 1', 'Klasse 1');
    addUnit(s, l, 'Vocales y letras', 'Vowels and letters', 'Vokale und Buchstaben', (u) => {
      const exs = [];
      const vocales = ['a', 'e', 'i', 'o', 'u'];
      for (let i = 0; i < 60; i++) {
        const v = pick(vocales);
        const opts = shuffle(vocales.filter(x => x !== v).slice(0, 2).concat([v]));
        exs.push(mcQ(u, `¿Cuál es la vocal?`, opts, v, 1, i));
      }
      for (let i = 0; i < 40; i++) {
        const w = pick(['casa', 'mesa', 'sol', 'luna', 'perro', 'gato']);
        const letter = pick(w.split(''));
        exs.push(mcQ(u, `¿Qué letra está en «${w}»?`, shuffle([letter, ...pickN('abcdefghijklmnopqrstuvwxyz'.split('').filter(x => x !== letter), 2)]), letter, 1, 60 + i));
      }
      return exs;
    });
    addUnit(s, l, 'Contar sílabas', 'Counting syllables', 'Silben zählen', (u) => syllableUnit(u, SYL, 100));
    addUnit(s, l, 'Palabras bien escritas', 'Correctly spelled words', 'Richtig geschriebene Wörter', (u) => spellingUnit(u, SPELL.g1, 100));
    addUnit(s, l, 'Sinónimos básicos', 'Basic synonyms', 'Grundlegende Synonyme', (u) => synUnit(u, SYN.g1, 100));
    addUnit(s, l, 'Antónimos básicos', 'Basic antonyms', 'Grundlegende Antonyme', (u) => antUnit(u, ANT.g1, 100));
    addUnit(s, l, 'El y la (género)', 'El and la (gender)', 'El und la (Geschlecht)', (u) => genderUnit(u, NOUNS, 100));
    addUnit(s, l, 'Plurales sencillos', 'Simple plurals', 'Einfache Pluralformen', (u) => pluralUnit(u, PLURALS, 100));
    addUnit(s, l, 'Verbos en presente', 'Verbs in present', 'Verben im Präsens', (u) => verbUnit(u, VERBS, 'presente', 100));
    addUnit(s, l, 'Completar oraciones', 'Complete sentences', 'Sätze vervollständigen', (u) => {
      const exs = [];
      const oraciones = [
        ['El ___ ladra en la noche', ['perro', 'gato', 'pez']],
        ['La ___ brilla en el cielo', ['luna', 'mesa', 'silla']],
        ['El ___ sale por la mañana', ['sol', 'pan', 'mar']],
        ['Me gusta beber ___', ['agua', 'piedra', 'lápiz']],
        ['El ___ vuela alto', ['pájaro', 'pez', 'carro']],
        ['La ___ tiene flores', ['planta', 'zapato', 'reloj']],
        ['El ___ nada en el río', ['pez', 'perro', 'avión']],
        ['La ___ es dulce', ['manzana', 'piedra', 'silla']],
        ['El ___ escribe en la pizarra', ['maestro', 'gato', 'sol']],
        ['La ___ está en la pared', ['puerta', 'luna', 'pan']],
      ];
      for (let i = 0; i < 100; i++) {
        const [q, opts] = pick(oraciones);
        exs.push(mcQ(u, q, shuffle(opts), opts[0], 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 2do grado ===== */
  {
    const l = addLevel(s, 'espanol-g2', '2do grado', 'Grade 2', 'Klasse 2');
    addUnit(s, l, 'Ortografía: b y v', 'Spelling: b and v', 'Rechtschreibung: b und v', (u) => spellingUnit(u, SPELL.g2, 100));
    addUnit(s, l, 'Ortografía: c, s y z', 'Spelling: c, s and z', 'Rechtschreibung: c, s und z', (u) => spellingUnit(u, SPELL.g2, 100));
    addUnit(s, l, 'Contar sílabas', 'Counting syllables', 'Silben zählen', (u) => syllableUnit(u, SYL, 100));
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.g2, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.g2, 100));
    addUnit(s, l, 'Sustantivos y adjetivos', 'Nouns and adjectives', 'Substantive und Adjektive', (u) => {
      const exs = [];
      const sust = ['perro', 'casa', 'libro', 'maestra', 'ciudad', 'árbol', 'flor', 'niño', 'carro', 'escuela'];
      const adj = ['grande', 'rojo', 'feliz', 'rápido', 'limpio', 'fuerte', 'bonito', 'nuevo', 'triste', 'alto'];
      for (let i = 0; i < 100; i++) {
        const w = ri(0, 1) ? pick(sust) : pick(adj);
        const isNoun = sust.includes(w);
        exs.push(mcQ(u, `¿«${w}» es un sustantivo o un adjetivo?`, shuffle(['Sustantivo', 'Adjetivo']), isNoun ? 'Sustantivo' : 'Adjetivo', 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Verbos en presente', 'Verbs in present', 'Verben im Präsens', (u) => verbUnit(u, VERBS, 'presente', 100));
    addUnit(s, l, 'Género: el y la', 'Gender: el and la', 'Geschlecht: el und la', (u) => genderUnit(u, NOUNS, 100));
    addUnit(s, l, 'Plurales', 'Plurals', 'Pluralformen', (u) => pluralUnit(u, PLURALS, 100));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 3er grado ===== */
  {
    const l = addLevel(s, 'espanol-g3', '3er grado', 'Grade 3', 'Klasse 3');
    addUnit(s, l, 'Ortografía: g y j', 'Spelling: g and j', 'Rechtschreibung: g und j', (u) => spellingUnit(u, SPELL.g3, 100));
    addUnit(s, l, 'Ortografía: la h', 'Spelling: the h', 'Rechtschreibung: das h', (u) => spellingUnit(u, SPELL.g3, 100));
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.g3, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.g3, 100));
    addUnit(s, l, 'Verbos: presente y pasado', 'Verbs: present and past', 'Verben: Präsens und Vergangenheit', (u) => {
      const exs = [];
      exs.push(...verbUnit(u, VERBS, 'presente', 50));
      exs.push(...verbUnit(u, VERBS, 'preterito', 50));
      return exs;
    });
    addUnit(s, l, 'Prefijos', 'Prefixes', 'Präfixe', (u) => {
      const exs = [];
      const pref = [['re', 'volver a'], ['des', 'lo contrario de'], ['in', 'no'], ['pre', 'antes de'], ['sub', 'debajo de'], ['super', 'por encima de']];
      for (let i = 0; i < 100; i++) {
        const [p, m] = pick(pref);
        const wrongs = pickN(pref.filter(x => x[0] !== p), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué significa el prefijo «${p}-»?`, shuffle([m, ...wrongs]), m, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sufijos', 'Suffixes', 'Suffixe', (u) => {
      const exs = [];
      const suf = [['-ito', 'pequeño o cariñoso'], ['-ción', 'acción o efecto'], ['-ero', 'oficio o lugar'], ['-oso', 'que tiene'], ['-mente', 'de manera'], ['-dad', 'cualidad']];
      for (let i = 0; i < 100; i++) {
        const [p, m] = pick(suf);
        const wrongs = pickN(suf.filter(x => x[0] !== p), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué indica el sufijo «${p}»?`, shuffle([m, ...wrongs]), m, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sujeto y predicado', 'Subject and predicate', 'Subjekt und Prädikat', (u) => {
      const exs = [];
      const oraciones = [
        ['El perro corre rápido', 'El perro'], ['La niña canta bonito', 'La niña'], ['Los pájaros vuelan alto', 'Los pájaros'],
        ['Mi mamá cocina rico', 'Mi mamá'], ['El sol brilla fuerte', 'El sol'], ['Los niños juegan en el patio', 'Los niños'],
        ['La maestra explica la lección', 'La maestra'], ['El gato duerme en el sofá', 'El gato'], ['Juan estudia mucho', 'Juan'],
        ['Las flores crecen en el jardín', 'Las flores'],
      ];
      for (let i = 0; i < 100; i++) {
        const [q, subj] = pick(oraciones);
        const wrongs = pickN(oraciones.map(o => o[1]).filter(x => x !== subj), 2);
        exs.push(mcQ(u, `¿Cuál es el sujeto de: «${q}»?`, shuffle([subj, ...wrongs]), subj, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 4to grado ===== */
  {
    const l = addLevel(s, 'espanol-g4', '4to grado', 'Grade 4', 'Klasse 4');
    addUnit(s, l, 'Ortografía: ll y y', 'Spelling: ll and y', 'Rechtschreibung: ll und y', (u) => spellingUnit(u, SPELL.g4, 100));
    addUnit(s, l, 'Ortografía: r y rr', 'Spelling: r and rr', 'Rechtschreibung: r und rr', (u) => spellingUnit(u, SPELL.g4, 100));
    addUnit(s, l, 'Acentuación: agudas y graves', 'Accents: acute and grave', 'Akzente: agudas und graves', (u) => accentUnit(u, ACCENT, 100));
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.g4, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.g4, 100));
    addUnit(s, l, 'Verbos en pretérito', 'Verbs in past tense', 'Verben in der Vergangenheit', (u) => verbUnit(u, VERBS, 'preterito', 100));
    addUnit(s, l, 'Pronombres personales', 'Personal pronouns', 'Personalpronomen', (u) => {
      const exs = [];
      const P = ['yo', 'tú', 'él', 'ella', 'nosotros', 'nosotras', 'ellos', 'ellas'];
      for (let i = 0; i < 100; i++) {
        const p = pick(P);
        const wrongs = pickN(P.filter(x => x !== p), 2);
        exs.push(mcQ(u, `¿Qué pronombre corresponde a «${p}»?`, shuffle([p, ...wrongs]), p, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Adverbios', 'Adverbs', 'Adverbien', (u) => {
      const exs = [];
      const adv = [['aquí', 'lugar'], ['ahora', 'tiempo'], ['rápidamente', 'modo'], ['mucho', 'cantidad'], ['sí', 'afirmación'], ['no', 'negación'], ['quizás', 'duda'], ['cerca', 'lugar']];
      for (let i = 0; i < 100; i++) {
        const [a, m] = pick(adv);
        const wrongs = pickN(adv.filter(x => x[0] !== a), 2).map(x => x[1]);
        exs.push(mcQ(u, `«${a}» es un adverbio de...`, shuffle([m, ...wrongs]), m, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Refranes', 'Proverbs', 'Sprichwörter', (u) => factUnit(u, REFRANES, 100));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 5to grado ===== */
  {
    const l = addLevel(s, 'espanol-g5', '5to grado', 'Grade 5', 'Klasse 5');
    addUnit(s, l, 'Acentuación: esdrújulas', 'Accents: esdrújulas', 'Akzente: esdrújulas', (u) => accentUnit(u, ACCENT, 100));
    addUnit(s, l, 'Acentuación general', 'General accents', 'Allgemeine Akzente', (u) => accentUnit(u, ACCENT, 100));
    addUnit(s, l, 'Verbos en futuro', 'Verbs in future', 'Verben im Futur', (u) => verbUnit(u, VERBS, 'futuro', 100));
    addUnit(s, l, 'Conjunciones', 'Conjunctions', 'Konjunktionen', (u) => {
      const exs = [];
      const conj = [['y', 'unión'], ['o', 'alternativa'], ['pero', 'oposición'], ['porque', 'causa'], ['aunque', 'concesión'], ['si', 'condición'], ['cuando', 'tiempo'], ['mientras', 'simultaneidad']];
      for (let i = 0; i < 100; i++) {
        const [c, m] = pick(conj);
        const wrongs = pickN(conj.filter(x => x[0] !== c), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué expresa la conjunción «${c}»?`, shuffle([m, ...wrongs]), m, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Preposiciones', 'Prepositions', 'Präpositionen', (u) => {
      const exs = [];
      const prep = ['a', 'ante', 'bajo', 'con', 'contra', 'de', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'sin', 'sobre'];
      for (let i = 0; i < 100; i++) {
        const p = pick(prep);
        const wrongs = pickN(prep.filter(x => x !== p), 2);
        exs.push(mcQ(u, `¿Cuál de estas es una preposición?`, shuffle([p, ...wrongs]), p, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Figuras literarias', 'Literary devices', 'Stilmittel', (u) => factUnit(u, FIGURAS, 100));
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.g5, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.g5, 100));
    addUnit(s, l, 'Palabras homófonas', 'Homophones', 'Homophone', (u) => homophoneUnit(u, HOMOPHONES, 100));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 6to grado ===== */
  {
    const l = addLevel(s, 'espanol-g6', '6to grado', 'Grade 6', 'Klasse 6');
    addUnit(s, l, 'Ortografía completa', 'Complete spelling', 'Vollständige Rechtschreibung', (u) => spellingUnit(u, SPELL.g6, 100));
    addUnit(s, l, 'Acentuación completa', 'Complete accents', 'Vollständige Akzente', (u) => accentUnit(u, ACCENT, 100));
    addUnit(s, l, 'Verbos: los tres tiempos', 'Verbs: three tenses', 'Verben: drei Zeiten', (u) => {
      const exs = [];
      exs.push(...verbUnit(u, VERBS, 'presente', 35));
      exs.push(...verbUnit(u, VERBS, 'preterito', 35));
      exs.push(...verbUnit(u, VERBS, 'futuro', 30));
      return exs;
    });
    addUnit(s, l, 'Palabras homófonas', 'Homophones', 'Homophone', (u) => homophoneUnit(u, HOMOPHONES, 100));
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.g6, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.g6, 100));
    addUnit(s, l, 'Análisis sintáctico', 'Syntactic analysis', 'Syntaktische Analyse', (u) => factUnit(u, SINTAXIS, 100));
    addUnit(s, l, 'Refranes y dichos', 'Proverbs and sayings', 'Sprichwörter und Redewendungen', (u) => factUnit(u, REFRANES, 100));
    addUnit(s, l, 'Figuras literarias', 'Literary devices', 'Stilmittel', (u) => factUnit(u, FIGURAS, 100));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 1er año Secundaria ===== */
  {
    const l = addLevel(s, 'espanol-s1', '1er año Secundaria', 'Secondary 1', 'Sekundarstufe 1');
    addUnit(s, l, 'Ortografía avanzada', 'Advanced spelling', 'Fortgeschrittene Rechtschreibung', (u) => spellingUnit(u, SPELL.s1, 100));
    addUnit(s, l, 'Acentuación avanzada', 'Advanced accents', 'Fortgeschrittene Akzente', (u) => accentUnit(u, ACCENT, 100));
    addUnit(s, l, 'Verbos irregulares', 'Irregular verbs', 'Unregelmäßige Verben', (u) => {
      const exs = [];
      const irr = [
        ['ser', ['soy', 'eres', 'es', 'somos', 'son']], ['estar', ['estoy', 'estás', 'está', 'estamos', 'están']],
        ['ir', ['voy', 'vas', 'va', 'vamos', 'van']], ['tener', ['tengo', 'tienes', 'tiene', 'tenemos', 'tienen']],
        ['hacer', ['hago', 'haces', 'hace', 'hacemos', 'hacen']], ['decir', ['digo', 'dices', 'dice', 'decimos', 'dicen']],
        ['venir', ['vengo', 'vienes', 'viene', 'venimos', 'vienen']], ['poder', ['puedo', 'puedes', 'puede', 'podemos', 'pueden']],
        ['poner', ['pongo', 'pones', 'pone', 'ponemos', 'ponen']], ['saber', ['sé', 'sabes', 'sabe', 'sabemos', 'saben']],
        ['querer', ['quiero', 'quieres', 'quiere', 'queremos', 'quieren']], ['dar', ['doy', 'das', 'da', 'damos', 'dan']],
        ['ver', ['veo', 'ves', 've', 'vemos', 'ven']], ['salir', ['salgo', 'sales', 'sale', 'salimos', 'salen']],
        ['traer', ['traigo', 'traes', 'trae', 'traemos', 'traen']], ['caer', ['caigo', 'caes', 'cae', 'caemos', 'caen']],
      ];
      const P = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
      for (let i = 0; i < 100; i++) {
        const [v, forms] = pick(irr);
        const person = pick(P);
        const idx = P.indexOf(person);
        const correct = forms[idx];
        const wrongs = new Set();
        let guard = 0;
        while (wrongs.size < 2 && guard++ < 50) {
          const j = ri(0, 4);
          if (j !== idx) wrongs.add(forms[j]);
        }
        exs.push(mcQ(u, `Conjuga en presente: ${person} (${v})`, shuffle([correct, ...wrongs]), correct, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sintaxis: oraciones simples', 'Syntax: simple sentences', 'Syntax: einfache Sätze', (u) => factUnit(u, SINTAXIS, 100));
    addUnit(s, l, 'Literatura: obras y autores', 'Literature: works and authors', 'Literatur: Werke und Autoren', (u) => factUnit(u, OBRAS, 100));
    addUnit(s, l, 'Figuras retóricas', 'Rhetorical figures', 'Rhetorische Figuren', (u) => factUnit(u, FIGURAS, 100));
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.s1, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.s1, 100));
    addUnit(s, l, 'Léxico culto', 'Formal vocabulary', 'Gehobener Wortschatz', (u) => {
      const exs = [];
      const lex = [['óptimo', 'excelente'], ['pésimo', 'malísimo'], ['veraz', 'honesto'], ['falaz', 'engañoso'], ['lúcido', 'claro'], ['prolijo', 'detallado'], ['sucinto', 'breve'], ['cauteloso', 'precavido'], ['osado', 'atrevido'], ['frugal', 'austero'], ['suntuoso', 'lujoso'], ['lacónico', 'conciso'], ['verboso', 'hablador'], ['cóncavo', 'hundido'], ['convexo', 'abombado'], ['efímero', 'pasajero']];
      for (let i = 0; i < 100; i++) {
        const [a, b] = pick(lex);
        const wrongs = pickN(lex.filter(x => x[0] !== a), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué significa «${a}»?`, shuffle([b, ...wrongs]), b, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 2do año Secundaria ===== */
  {
    const l = addLevel(s, 'espanol-s2', '2do año Secundaria', 'Secondary 2', 'Sekundarstufe 2');
    addUnit(s, l, 'Ortografía avanzada', 'Advanced spelling', 'Fortgeschrittene Rechtschreibung', (u) => spellingUnit(u, SPELL.s2, 100));
    addUnit(s, l, 'Análisis sintáctico', 'Syntactic analysis', 'Syntaktische Analyse', (u) => factUnit(u, SINTAXIS, 100));
    addUnit(s, l, 'Literatura: obras y autores', 'Literature: works and authors', 'Literatur: Werke und Autoren', (u) => factUnit(u, OBRAS, 100));
    addUnit(s, l, 'Verbos: modos', 'Verbs: moods', 'Verben: Modi', (u) => {
      const exs = [];
      const modos = [['indicativo', 'hechos reales'], ['subjuntivo', 'deseos y dudas'], ['imperativo', 'órdenes'], ['infinitivo', 'forma base (-ar, -er, -ir)'], ['gerundio', 'acción en curso (-ando, -iendo)'], ['participio', 'forma para tiempos compuestos (-ado, -ido)']];
      for (let i = 0; i < 100; i++) {
        const [m, d] = pick(modos);
        const wrongs = pickN(modos.filter(x => x[0] !== m), 2).map(x => x[1]);
        exs.push(mcQ(u, `El modo «${m}» expresa...`, shuffle([d, ...wrongs]), d, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Léxico culto', 'Formal vocabulary', 'Gehobener Wortschatz', (u) => {
      const exs = [];
      const lex = [['elocuente', 'persuasivo'], ['taciturno', 'callado'], ['magnánimo', 'generoso'], ['mezquino', 'tacaño'], ['perspicaz', 'agudo'], ['ingenuo', 'cándido'], ['tenaz', 'perseverante'], ['voluble', 'inconstante'], ['afable', 'amable'], ['huraño', 'arisco'], ['espléndido', 'magnífico'], ['lamentable', 'deplorable'], ['coherente', 'lógico'], ['incoherente', 'ilógico'], ['próspero', 'floreciente'], ['adverso', 'desfavorable']];
      for (let i = 0; i < 100; i++) {
        const [a, b] = pick(lex);
        const wrongs = pickN(lex.filter(x => x[0] !== a), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué significa «${a}»?`, shuffle([b, ...wrongs]), b, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Figuras retóricas', 'Rhetorical figures', 'Rhetorische Figuren', (u) => factUnit(u, FIGURAS, 100));
    addUnit(s, l, 'Tipos de texto', 'Text types', 'Textsorten', (u) => {
      const exs = [];
      const txt = [['narrativo', 'cuenta una historia'], ['descriptivo', 'describe personas o lugares'], ['expositivo', 'explica un tema'], ['argumentativo', 'defiende una opinión'], ['instructivo', 'da instrucciones'], ['poético', 'expresa sentimientos con belleza']];
      for (let i = 0; i < 100; i++) {
        const [t, d] = pick(txt);
        const wrongs = pickN(txt.filter(x => x[0] !== t), 2).map(x => x[1]);
        exs.push(mcQ(u, `El texto «${t}»...`, shuffle([d, ...wrongs]), d, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.s2, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.s2, 100));
    addUnit(s, l, 'Repaso mixto', 'Mixed review', 'Gemischte Wiederholung', (u) => mixedUnit(u, 100));
  }

  /* ===== 3er año Secundaria ===== */
  {
    const l = addLevel(s, 'espanol-s3', '3er año Secundaria', 'Secondary 3', 'Sekundarstufe 3');
    addUnit(s, l, 'Ortografía avanzada', 'Advanced spelling', 'Fortgeschrittene Rechtschreibung', (u) => spellingUnit(u, SPELL.s3, 100));
    addUnit(s, l, 'Movimientos literarios', 'Literary movements', 'Literarische Strömungen', (u) => factUnit(u, MOVIMIENTOS, 100));
    addUnit(s, l, 'Análisis sintáctico avanzado', 'Advanced syntax', 'Fortgeschrittene Syntax', (u) => factUnit(u, SINTAXIS, 100));
    addUnit(s, l, 'Léxico culto', 'Formal vocabulary', 'Gehobener Wortschatz', (u) => {
      const exs = [];
      const lex = [['eufemismo', 'atenuación'], ['disuasivo', 'persuasivo'], ['intrínseco', 'inherente'], ['extrínseco', 'externo'], ['paradigma', 'modelo'], ['anomalía', 'irregularidad'], ['conjetura', 'suposición'], ['certeza', 'seguridad'], ['ambigüedad', 'imprecisión'], ['claridad', 'nitidez'], ['subjetivo', 'personal'], ['objetivo', 'imparcial'], ['abstracto', 'conceptual'], ['concreto', 'específico'], ['efímero', 'transitorio'], ['perdurable', 'eterno']];
      for (let i = 0; i < 100; i++) {
        const [a, b] = pick(lex);
        const wrongs = pickN(lex.filter(x => x[0] !== a), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué significa «${a}»?`, shuffle([b, ...wrongs]), b, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Figuras retóricas', 'Rhetorical figures', 'Rhetorische Figuren', (u) => factUnit(u, FIGURAS, 100));
    addUnit(s, l, 'Textos argumentativos', 'Argumentative texts', 'Argumentative Texte', (u) => {
      const exs = [];
      const arg = [['tesis', 'idea principal que se defiende'], ['argumento', 'razón que apoya la tesis'], ['contraargumento', 'razón en contra'], ['conclusión', 'cierre del texto'], ['premisa', 'base del razonamiento'], ['falacia', 'razonamiento inválido']];
      for (let i = 0; i < 100; i++) {
        const [t, d] = pick(arg);
        const wrongs = pickN(arg.filter(x => x[0] !== t), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Qué es ${t}?`, shuffle([d, ...wrongs]), d, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Sinónimos', 'Synonyms', 'Synonyme', (u) => synUnit(u, SYN.s3, 100));
    addUnit(s, l, 'Antónimos', 'Antonyms', 'Antonyme', (u) => antUnit(u, ANT.s3, 100));
    addUnit(s, l, 'Literatura: obras y autores', 'Literature: works and authors', 'Literatur: Werke und Autoren', (u) => factUnit(u, OBRAS, 100));
    addUnit(s, l, 'Repaso general', 'General review', 'Allgemeine Wiederholung', (u) => mixedUnit(u, 100));
  }
};