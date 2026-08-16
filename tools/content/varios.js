/* ============================================================
 * VARIOS — 2 000 ejercicios
 * Preescolar, Música, Computación, Socioemocional.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mcQ, tfQ, dmQ, fb, T, ri, pick, shuffle, pickN, factUnit, countUnitN, compareUnitN, patternUnitN } = ctx;

  /* ===== PREESCOLAR ===== */
  {
    const s = addSubject('preescolar', 'Preescolar', 'Preschool', 'Vorschule', '#FF9800', '🧸');
    const l = addLevel(s, 'preescolar', 'Preescolar', 'Preschool', 'Vorschule');

    addUnit(s, l, 'Contar objetos', 'Counting objects', 'Objekte zählen', (u) => countUnitN(u, ['🍎', '⭐', '🐟', '🌸', '⚽', '🍬', '🦋', '🚗'], 1, 10, 160));
    addUnit(s, l, 'Comparar cantidades', 'Comparing quantities', 'Mengen vergleichen', (u) => compareUnitN(u, 1, 10, 160));
    addUnit(s, l, 'Los colores', 'Colors', 'Farben', (u) => {
      const exs = [];
      const colors = [['🔴', 'rojo'], ['🔵', 'azul'], ['🟢', 'verde'], ['🟡', 'amarillo'], ['⚫', 'negro'], ['⚪', 'blanco'], ['🟠', 'naranja'], ['🟣', 'morado'], ['🟤', 'marrón'], ['🩷', 'rosa']];
      for (let i = 0; i < 160; i++) {
        const [emoji, name] = pick(colors);
        const wrongs = pickN(colors.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿De qué color es?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Las formas', 'Shapes', 'Formen', (u) => {
      const exs = [];
      const shapes = [['🔺', 'triángulo'], ['⬛', 'cuadrado'], ['🔵', 'círculo'], ['📏', 'rectángulo'], ['⭐', 'estrella'], ['💟', 'corazón'], ['⬭', 'óvalo'], ['⬠', 'pentágono']];
      for (let i = 0; i < 160; i++) {
        const [emoji, name] = pick(shapes);
        const wrongs = pickN(shapes.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿Qué forma es?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Los animales', 'Animals', 'Tiere', (u) => {
      const exs = [];
      const animals = [['🐶', 'perro'], ['🐱', 'gato'], ['🐮', 'vaca'], ['🐷', 'cerdo'], ['🐔', 'gallina'], ['🐑', 'oveja'], ['🐴', 'caballo'], ['🦆', 'pato'], ['🐟', 'pez'], ['🐦', 'pájaro'], ['🐸', 'rana'], ['🐰', 'conejo']];
      for (let i = 0; i < 160; i++) {
        const [emoji, name] = pick(animals);
        const wrongs = pickN(animals.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿Qué animal es?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Las vocales', 'Vowels', 'Vokale', (u) => {
      const exs = [];
      const words = [['a', 'avión'], ['e', 'elefante'], ['i', 'iguana'], ['o', 'oso'], ['u', 'uva']];
      for (let i = 0; i < 160; i++) {
        const [v, w] = pick(words);
        const wrongs = pickN(words.filter(x => x[0] !== v), 2).map(x => x[0]);
        exs.push(mcQ(u, `¿Con qué vocal empieza «${w}»?`, shuffle([v, ...wrongs]), v, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Patrones', 'Patterns', 'Muster', (u) => patternUnitN(u, 160));
    addUnit(s, l, 'Partes del cuerpo', 'Body parts', 'Körperteile', (u) => {
      const exs = [];
      const parts = [['👁️', 'ojo'], ['👃', 'nariz'], ['👄', 'boca'], ['👂', 'oreja'], ['✋', 'mano'], ['🦶', 'pie'], ['🦵', 'pierna'], ['💪', 'brazo']];
      for (let i = 0; i < 160; i++) {
        const [emoji, name] = pick(parts);
        const wrongs = pickN(parts.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿Qué parte del cuerpo es?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'La familia', 'Family', 'Familie', (u) => {
      const exs = [];
      const fam = [['👩', 'mamá'], ['👨', 'papá'], ['👧', 'niña'], ['👦', 'niño'], ['👵', 'abuela'], ['👴', 'abuelo'], ['👶', 'bebé'], ['🧑', 'persona']];
      for (let i = 0; i < 160; i++) {
        const [emoji, name] = pick(fam);
        const wrongs = pickN(fam.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿Quién es?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Los números 1-10', 'Numbers 1-10', 'Zahlen 1-10', (u) => {
      const exs = [];
      const nums = [['1', 'uno'], ['2', 'dos'], ['3', 'tres'], ['4', 'cuatro'], ['5', 'cinco'], ['6', 'seis'], ['7', 'siete'], ['8', 'ocho'], ['9', 'nueve'], ['10', 'diez']];
      for (let i = 0; i < 160; i++) {
        const [n, name] = pick(nums);
        const wrongs = pickN(nums.filter(x => x[0] !== n), 2).map(x => x[0]);
        exs.push(mcQ(u, `¿Qué número es «${name}»?`, shuffle([n, ...wrongs]), n, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Repaso preescolar', 'Preschool review', 'Vorschule Wiederholung', (u) => {
      const exs = [];
      exs.push(...countUnitN(u, ['🍎', '⭐', '🐟', '🌸'], 1, 10, 80));
      exs.push(...patternUnitN(u, 80));
      return exs;
    });
  }

  /* ===== MÚSICA ===== */
  {
    const s = addSubject('musica', 'Música', 'Music', 'Musik', '#E91E63', '🎵');
    const l = addLevel(s, 'musica-1', '1er ciclo', 'Cycle 1', 'Zyklus 1');

    const F = [
      { t: 'La nota musical', d: 'es un sonido con una altura determinada' },
      { t: 'Las notas musicales', d: 'son do, re, mi, fa, sol, la, si' },
      { t: 'El pentagrama', d: 'tiene cinco líneas y cuatro espacios' },
      { t: 'La clave de sol', d: 'se escribe al inicio del pentagrama' },
      { t: 'La figura redonda', d: 'dura cuatro tiempos' },
      { t: 'La figura blanca', d: 'dura dos tiempos' },
      { t: 'La figura negra', d: 'dura un tiempo' },
      { t: 'La figura corchea', d: 'dura medio tiempo' },
      { t: 'El compás', d: 'organiza los tiempos de la música' },
      { t: 'El ritmo', d: 'es la organización de los sonidos en el tiempo' },
      { t: 'La melodía', d: 'es una sucesión de notas con sentido musical' },
      { t: 'La armonía', d: 'es la combinación de sonidos simultáneos' },
      { t: 'El tempo', d: 'indica la velocidad de la música' },
      { t: 'El volumen', d: 'se llama dinámica en música' },
      { t: 'El forte', d: 'significa tocar fuerte' },
      { t: 'El piano', d: 'significa tocar suave' },
      { t: 'La voz', d: 'es el instrumento musical más antiguo' },
      { t: 'El coro', d: 'es un grupo de personas que cantan juntas' },
      { t: 'El director de orquesta', d: 'coordina a los músicos' },
      { t: 'La orquesta', d: 'es un conjunto de instrumentos' },
      { t: 'La sinfonía', d: 'es una obra musical para orquesta' },
      { t: 'La ópera', d: 'combina música, canto y teatro' },
      { t: 'El ballet', d: 'combina música y danza' },
      { t: 'La música clásica', d: 'es la música culta de tradición europea' },
      { t: 'El jazz', d: 'nació en Estados Unidos con improvisación' },
      { t: 'El rock', d: 'es un género con guitarra eléctrica y batería' },
      { t: 'La música folclórica', d: 'es la música tradicional de un pueblo' },
      { t: 'La música popular', d: 'es la música que escucha la mayoría de la gente' },
      { t: 'El sonido', d: 'se produce por vibraciones' },
      { t: 'El silencio', d: 'también es parte de la música' },
      { t: 'La altura del sonido', d: 'depende de la frecuencia' },
      { t: 'La intensidad del sonido', d: 'depende de la amplitud' },
      { t: 'El timbre', d: 'permite distinguir los instrumentos' },
      { t: 'La duración del sonido', d: 'es el tiempo que se mantiene' },
      { t: 'La escala musical', d: 'es la sucesión ordenada de notas' },
      { t: 'El intervalo', d: 'es la distancia entre dos notas' },
      { t: 'La octava', d: 'es la distancia entre una nota y su repetición' },
      { t: 'El acorde', d: 'es la combinación de tres o más notas' },
      { t: 'La improvisación', d: 'es crear música en el momento' },
      { t: 'La composición', d: 'es crear una obra musical' },
    ];
    const INSTRUMENTS = [
      ['🎻', 'violín', 'cuerda'], ['🎸', 'guitarra', 'cuerda'], ['🎹', 'piano', 'teclado'], ['🎺', 'trompeta', 'viento'],
      ['🥁', 'batería', 'percusión'], ['🎷', 'saxofón', 'viento'], ['🎤', 'micrófono', 'voz'], ['🪈', 'flauta', 'viento'],
      ['🎼', 'partitura', 'notación'], ['🎧', 'audífonos', 'audio'], ['🎵', 'nota musical', 'notación'], ['🎶', 'notas musicales', 'notación'],
    ];
    function instrumentUnit(u, n) {
      const exs = [];
      for (let i = 0; i < n; i++) {
        const [emoji, name, group] = pick(INSTRUMENTS);
        const wrongs = pickN(['cuerda', 'viento', 'percusión', 'teclado'].filter(x => x !== group), 2);
        exs.push(mcQ(u, `${emoji} ¿A qué familia pertenece ${name}?`, shuffle([group, ...wrongs]), group, 1, i));
      }
      return exs;
    }
    function noteUnit(u, n) {
      const exs = [];
      const notes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
      for (let i = 0; i < n; i++) {
        const note = pick(notes);
        const wrongs = pickN(notes.filter(x => x !== note), 2);
        exs.push(mcQ(u, `¿Qué nota sigue después de «${note}» en la escala?`, shuffle([notes[(notes.indexOf(note) + 1) % 7], ...wrongs]), notes[(notes.indexOf(note) + 1) % 7], 1, i));
      }
      return exs;
    }
    function durationUnit(u, n) {
      const exs = [];
      const figs = [['redonda', '4'], ['blanca', '2'], ['negra', '1'], ['corchea', '0.5'], ['semicorchea', '0.25']];
      for (let i = 0; i < n; i++) {
        const [f, d] = pick(figs);
        const wrongs = pickN(figs.filter(x => x[0] !== f), 2).map(x => x[1]);
        exs.push(mcQ(u, `¿Cuántos tiempos dura la figura ${f}?`, shuffle([d, ...wrongs]), d, 1, i));
      }
      return exs;
    }

    addUnit(s, l, 'Las notas musicales', 'Musical notes', 'Noten', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F.filter(f => ['La nota musical', 'Las notas musicales', 'La escala musical', 'El intervalo', 'La octava', 'El acorde'].includes(f.t)), { fb: false }));
      exs.push(...noteUnit(u, 120));
      return exs;
    });
    addUnit(s, l, 'Figuras y duraciones', 'Figures and durations', 'Notenwerte', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F.filter(f => ['La figura redonda', 'La figura blanca', 'La figura negra', 'La figura corchea', 'El compás', 'El ritmo'].includes(f.t)), { fb: false }));
      exs.push(...durationUnit(u, 120));
      return exs;
    });
    addUnit(s, l, 'Los instrumentos', 'Instruments', 'Instrumente', (u) => instrumentUnit(u, 200));
    addUnit(s, l, 'Elementos de la música', 'Elements of music', 'Elemente der Musik', (u) => factUnit(u, F.filter(f => ['La melodía', 'La armonía', 'El tempo', 'El volumen', 'El forte', 'El piano', 'La altura del sonido', 'La intensidad del sonido', 'El timbre', 'La duración del sonido'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Géneros musicales', 'Music genres', 'Musikgenres', (u) => factUnit(u, F.filter(f => ['La música clásica', 'El jazz', 'El rock', 'La música folclórica', 'La música popular'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'La voz y el canto', 'Voice and singing', 'Stimme und Gesang', (u) => factUnit(u, F.filter(f => ['La voz', 'El coro', 'El director de orquesta', 'La orquesta', 'La sinfonía', 'La ópera', 'El ballet'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'El sonido', 'Sound', 'Klang', (u) => factUnit(u, F.filter(f => ['El sonido', 'El silencio', 'La improvisación', 'La composición'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Repaso de música', 'Music review', 'Musik Wiederholung', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F, { fb: false }));
      exs.push(...instrumentUnit(u, 80));
      return exs;
    });
  }

  /* ===== COMPUTACIÓN ===== */
  {
    const s = addSubject('computacion', 'Computación', 'Computing', 'Informatik', '#607D8B', '💻');
    const l = addLevel(s, 'computacion-1', '1er ciclo', 'Cycle 1', 'Zyklus 1');

    const F = [
      { t: 'La computadora', d: 'es una máquina que procesa información' },
      { t: 'El hardware', d: 'son las partes físicas de la computadora' },
      { t: 'El software', d: 'son los programas de la computadora' },
      { t: 'La CPU', d: 'es el cerebro de la computadora' },
      { t: 'La memoria RAM', d: 'guarda datos temporalmente mientras se trabaja' },
      { t: 'El disco duro', d: 'almacena los datos de forma permanente' },
      { t: 'El monitor', d: 'muestra la información en pantalla' },
      { t: 'El teclado', d: 'sirve para escribir texto' },
      { t: 'El ratón', d: 'sirve para mover el cursor' },
      { t: 'La impresora', d: 'imprime documentos en papel' },
      { t: 'El sistema operativo', d: 'es el programa principal que gestiona la computadora' },
      { t: 'El archivo', d: 'es un conjunto de datos guardado con un nombre' },
      { t: 'La carpeta', d: 'organiza los archivos' },
      { t: 'El internet', d: 'conecta computadoras de todo el mundo' },
      { t: 'El navegador', d: 'sirve para visitar páginas web' },
      { t: 'El correo electrónico', d: 'envía mensajes por internet' },
      { t: 'La contraseña', d: 'protege el acceso a las cuentas' },
      { t: 'El virus informático', d: 'es un programa dañino' },
      { t: 'El antivirus', d: 'protege la computadora de virus' },
      { t: 'La copia de seguridad', d: 'guarda una copia de los datos importantes' },
      { t: 'El algoritmo', d: 'es una secuencia de pasos para resolver un problema' },
      { t: 'El programa', d: 'es un conjunto de instrucciones para la computadora' },
      { t: 'El código', d: 'es el lenguaje que entiende la computadora' },
      { t: 'La programación', d: 'crea programas y aplicaciones' },
      { t: 'El dato', d: 'es la información que procesa la computadora' },
      { t: 'El bit', d: 'es la unidad más pequeña de información' },
      { t: 'El byte', d: 'equivale a 8 bits' },
      { t: 'La inteligencia artificial', d: 'permite que las máquinas aprendan' },
      { t: 'La robótica', d: 'diseña y construye robots' },
      { t: 'La nube', d: 'guarda datos en servidores remotos' },
      { t: 'La red social', d: 'conecta personas por internet' },
      { t: 'El videojuego', d: 'es un programa de entretenimiento interactivo' },
      { t: 'La aplicación', d: 'es un programa para una tarea específica' },
      { t: 'El buscador', d: 'encuentra información en internet' },
      { t: 'La página web', d: 'es un documento en internet' },
      { t: 'El enlace', d: 'conecta páginas web entre sí' },
      { t: 'La descarga', d: 'trae archivos de internet a la computadora' },
      { t: 'La subida', d: 'envía archivos a internet' },
      { t: 'El wifi', d: 'conecta dispositivos sin cables' },
      { t: 'El bluetooth', d: 'conecta dispositivos a corta distancia' },
      { t: 'El USB', d: 'es un puerto para conectar dispositivos' },
      { t: 'La batería', d: 'da energía a los dispositivos portátiles' },
      { t: 'La pantalla táctil', d: 'se controla con los dedos' },
      { t: 'La cámara web', d: 'captura video para videollamadas' },
      { t: 'El micrófono', d: 'captura el sonido' },
      { t: 'Los audífonos', d: 'reproducen el sonido' },
      { t: 'La seguridad digital', d: 'protege los datos en internet' },
      { t: 'El phishing', d: 'es un engaño para robar datos' },
      { t: 'La huella digital', d: 'es el rastro que dejamos en internet' },
      { t: 'La netiqueta', d: 'son las normas de cortesía en internet' },
    ];
    function partUnit(u, n) {
      const exs = [];
      const parts = [
        ['🖥️', 'monitor', 'muestra la información'], ['⌨️', 'teclado', 'escribir texto'], ['🖱️', 'ratón', 'mover el cursor'],
        ['🖨️', 'impresora', 'imprimir documentos'], ['🎧', 'audífonos', 'reproducir sonido'], ['📷', 'cámara', 'tomar fotos'],
        ['🔊', 'bocina', 'emitir sonido'], ['💾', 'disco', 'guardar datos'],
      ];
      for (let i = 0; i < n; i++) {
        const [emoji, name, func] = pick(parts);
        const wrongs = pickN(parts.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿Qué dispositivo sirve para ${func}?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    }
    function safetyUnit(u, n) {
      const exs = [];
      const tips = [
        ['compartir tu contraseña', 'no'], ['usar contraseñas seguras', 'sí'], ['abrir correos de desconocidos', 'no'],
        ['actualizar el antivirus', 'sí'], ['descargar de sitios oficiales', 'sí'], ['compartir tu dirección con extraños', 'no'],
        ['hacer copias de seguridad', 'sí'], ['aceptar a desconocidos en redes', 'no'], ['avisar a un adulto si algo te incomoda', 'sí'],
        ['publicar tu número de teléfono', 'no'],
      ];
      for (let i = 0; i < n; i++) {
        const [tip, ans] = pick(tips);
        exs.push(mcQ(u, `¿Debes ${tip}?`, shuffle(['Sí', 'No']), ans === 'sí' ? 'Sí' : 'No', 1, i));
      }
      return exs;
    }

    addUnit(s, l, '¿Qué es una computadora?', 'What is a computer?', 'Was ist ein Computer?', (u) => factUnit(u, F.filter(f => ['La computadora', 'El hardware', 'El software', 'La CPU', 'La memoria RAM', 'El disco duro'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Partes de la computadora', 'Computer parts', 'Computerteile', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F.filter(f => ['El monitor', 'El teclado', 'El ratón', 'La impresora'].includes(f.t)), { fb: false }));
      exs.push(...partUnit(u, 120));
      return exs;
    });
    addUnit(s, l, 'Archivos y programas', 'Files and programs', 'Dateien und Programme', (u) => factUnit(u, F.filter(f => ['El sistema operativo', 'El archivo', 'La carpeta', 'El programa', 'La aplicación'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Internet', 'Internet', 'Internet', (u) => factUnit(u, F.filter(f => ['El internet', 'El navegador', 'El correo electrónico', 'El buscador', 'La página web', 'El enlace', 'La descarga', 'La subida', 'El wifi', 'El bluetooth', 'El USB', 'La nube', 'La red social'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Seguridad digital', 'Digital safety', 'Digitale Sicherheit', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F.filter(f => ['La contraseña', 'El virus informático', 'El antivirus', 'La copia de seguridad', 'La seguridad digital', 'El phishing', 'La huella digital', 'La netiqueta'].includes(f.t)), { fb: false }));
      exs.push(...safetyUnit(u, 120));
      return exs;
    });
    addUnit(s, l, 'Programación', 'Programming', 'Programmierung', (u) => factUnit(u, F.filter(f => ['El algoritmo', 'El código', 'La programación', 'El dato', 'El bit', 'El byte'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Tecnología moderna', 'Modern technology', 'Moderne Technologie', (u) => factUnit(u, F.filter(f => ['La inteligencia artificial', 'La robótica', 'El videojuego', 'La pantalla táctil', 'La cámara web', 'El micrófono', 'Los audífonos', 'La batería'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Repaso de computación', 'Computing review', 'Informatik Wiederholung', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F, { fb: false }));
      exs.push(...partUnit(u, 80));
      return exs;
    });
  }

  /* ===== SOCIOEMOCIONAL ===== */
  {
    const s = addSubject('socioemocional', 'Socioemocional', 'Social-emotional', 'Sozial-emotional', '#FFC107', '💛');
    const l = addLevel(s, 'socioemocional-1', '1er ciclo', 'Cycle 1', 'Zyklus 1');

    const F = [
      { t: 'Las emociones', d: 'son reacciones que sentimos ante lo que nos pasa' },
      { t: 'La alegría', d: 'es la emoción de sentirnos felices' },
      { t: 'La tristeza', d: 'es la emoción de sentirnos decaídos' },
      { t: 'El enojo', d: 'es la emoción de sentirnos molestos' },
      { t: 'El miedo', d: 'es la emoción ante un peligro' },
      { t: 'La sorpresa', d: 'es la emoción ante algo inesperado' },
      { t: 'El asco', d: 'es la emoción ante algo desagradable' },
      { t: 'La calma', d: 'es un estado de tranquilidad' },
      { t: 'La empatía', d: 'es ponerse en el lugar del otro' },
      { t: 'La amistad', d: 'es un vínculo de cariño y confianza' },
      { t: 'El respeto', d: 'es tratar bien a los demás' },
      { t: 'La honestidad', d: 'es decir la verdad' },
      { t: 'La responsabilidad', d: 'es cumplir con nuestras obligaciones' },
      { t: 'La gratitud', d: 'es agradecer lo que recibimos' },
      { t: 'La generosidad', d: 'es compartir con los demás' },
      { t: 'La tolerancia', d: 'es aceptar las diferencias' },
      { t: 'La cooperación', d: 'es trabajar juntos por un objetivo' },
      { t: 'La autoestima', d: 'es valorarnos a nosotros mismos' },
      { t: 'La confianza', d: 'es creer en nosotros y en los demás' },
      { t: 'La resiliencia', d: 'es recuperarse de las dificultades' },
      { t: 'La paciencia', d: 'es esperar con tranquilidad' },
      { t: 'La perseverancia', d: 'es no rendirse ante las dificultades' },
      { t: 'La disciplina', d: 'es cumplir con lo que nos proponemos' },
      { t: 'La comunicación', d: 'es expresar lo que sentimos y pensamos' },
      { t: 'La escucha activa', d: 'es prestar atención a quien habla' },
      { t: 'El conflicto', d: 'es un desacuerdo entre personas' },
      { t: 'La negociación', d: 'busca un acuerdo entre las partes' },
      { t: 'El acoso escolar', d: 'es molestar o lastimar a un compañero' },
      { t: 'El bullying', d: 'debe reportarse a un adulto' },
      { t: 'La inclusión', d: 'es aceptar a todos sin excluir a nadie' },
      { t: 'La igualdad', d: 'es que todos tengan los mismos derechos' },
      { t: 'La diversidad', d: 'es la variedad de personas y culturas' },
      { t: 'La familia', d: 'es nuestro primer grupo de apoyo' },
      { t: 'Los amigos', d: 'nos acompañan y apoyan' },
      { t: 'El autocuidado', d: 'es cuidar nuestro cuerpo y mente' },
      { t: 'La alimentación saludable', d: 'nutre nuestro cuerpo' },
      { t: 'El ejercicio', d: 'fortalece el cuerpo y la mente' },
      { t: 'El descanso', d: 'recupera nuestra energía' },
      { t: 'La respiración', d: 'ayuda a calmarnos' },
      { t: 'La meditación', d: 'tranquiliza la mente' },
      { t: 'El pensamiento positivo', d: 'nos ayuda a ver lo bueno' },
      { t: 'El error', d: 'es una oportunidad para aprender' },
      { t: 'La crítica constructiva', d: 'ayuda a mejorar' },
      { t: 'Los límites', d: 'protegen nuestro bienestar' },
      { t: 'Decir no', d: 'es válido cuando algo nos incomoda' },
      { t: 'Pedir ayuda', d: 'es una señal de fortaleza' },
      { t: 'La meta', d: 'es un objetivo que queremos lograr' },
      { t: 'El esfuerzo', d: 'es necesario para lograr metas' },
      { t: 'La celebración', d: 'reconoce nuestros logros' },
      { t: 'El perdón', d: 'libera el rencor' },
    ];
    function emotionUnit(u, n) {
      const exs = [];
      const emo = [
        ['🎉', 'alegría'], ['😢', 'tristeza'], ['😡', 'enojo'], ['😨', 'miedo'], ['😲', 'sorpresa'], ['🤢', 'asco'], ['😌', 'calma'], ['🥰', 'amor'],
      ];
      for (let i = 0; i < n; i++) {
        const [emoji, name] = pick(emo);
        const wrongs = pickN(emo.filter(x => x[1] !== name), 2).map(x => x[1]);
        exs.push(mcQ(u, `${emoji} ¿Qué emoción expresa?`, shuffle([name, ...wrongs]), name, 1, i));
      }
      return exs;
    }
    function scenarioUnit(u, n) {
      const exs = [];
      const scen = [
        ['Tu amigo está triste porque perdió su juguete', 'consolarlo y ayudarlo a buscarlo'],
        ['Un compañero te molesta', 'avisar a un adulto'],
        ['Viste a alguien siendo excluido', 'invitarlo a jugar'],
        ['Cometiste un error en un examen', 'aprender de él y seguir adelante'],
        ['Un amigo te pide que guardes un secreto que te preocupa', 'contárselo a un adulto de confianza'],
        ['Ganaste un premio', 'celebrarlo y agradecer'],
        ['Tienes miedo de hablar en público', 'respirar profundo y practicar'],
        ['Un compañero te copió la tarea', 'hablar con él y con el maestro'],
      ];
      for (let i = 0; i < n; i++) {
        const [situation, action] = pick(scen);
        const wrongs = pickN(scen.filter(x => x[0] !== situation), 2).map(x => x[1]);
        exs.push(mcQ(u, `${situation}. ¿Qué harías?`, shuffle([action, ...wrongs]), action, 1, i));
      }
      return exs;
    }

    addUnit(s, l, 'Las emociones', 'Emotions', 'Gefühle', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F.filter(f => ['Las emociones', 'La alegría', 'La tristeza', 'El enojo', 'El miedo', 'La sorpresa', 'El asco', 'La calma'].includes(f.t)), { fb: false }));
      exs.push(...emotionUnit(u, 120));
      return exs;
    });
    addUnit(s, l, 'Valores', 'Values', 'Werte', (u) => factUnit(u, F.filter(f => ['La empatía', 'La amistad', 'El respeto', 'La honestidad', 'La responsabilidad', 'La gratitud', 'La generosidad', 'La tolerancia', 'La cooperación'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Conocerme a mí mismo', 'Knowing myself', 'Mich selbst kennen', (u) => factUnit(u, F.filter(f => ['La autoestima', 'La confianza', 'La resiliencia', 'La paciencia', 'La perseverancia', 'La disciplina'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Comunicación', 'Communication', 'Kommunikation', (u) => factUnit(u, F.filter(f => ['La comunicación', 'La escucha activa', 'El conflicto', 'La negociación', 'La crítica constructiva', 'Decir no', 'Pedir ayuda'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Convivencia', 'Living together', 'Zusammenleben', (u) => factUnit(u, F.filter(f => ['El acoso escolar', 'El bullying', 'La inclusión', 'La igualdad', 'La diversidad', 'La familia', 'Los amigos', 'Los límites'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Cuidar mi cuerpo y mente', 'Caring for body and mind', 'Körper und Geist pflegen', (u) => factUnit(u, F.filter(f => ['El autocuidado', 'La alimentación saludable', 'El ejercicio', 'El descanso', 'La respiración', 'La meditación', 'El pensamiento positivo'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Metas y logros', 'Goals and achievements', 'Ziele und Erfolge', (u) => factUnit(u, F.filter(f => ['La meta', 'El esfuerzo', 'La celebración', 'El error', 'El perdón'].includes(f.t)), { fb: false }));
    addUnit(s, l, 'Situaciones de la vida', 'Life situations', 'Lebenssituationen', (u) => scenarioUnit(u, 200));
    addUnit(s, l, 'Repaso socioemocional', 'Social-emotional review', 'Sozial-emotional Wiederholung', (u) => {
      const exs = [];
      exs.push(...factUnit(u, F, { fb: false }));
      exs.push(...emotionUnit(u, 80));
      return exs;
    });
  }
};