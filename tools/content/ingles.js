/* ============================================================
 * INGLÉS — 5 000 ejercicios, 5 niveles (basico, 3-6)
 * Vocabulario (vocabUnit) + gramática procedimental.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mc, fb, tf, dm, mcQ, tfQ, dmQ, T, ri, pick, shuffle, pickN, vocabUnit } = ctx;

  const s = addSubject('ingles', 'Inglés', 'English', 'Englisch', '#3F51B5', '🇬🇧');

  /* ---------- Números en inglés ---------- */
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function enNumber(n) {
    if (n < 20) return ONES[n];
    if (n < 100) {
      const t = Math.floor(n / 10), o = n % 10;
      return TENS[t] + (o ? '-' + ONES[o] : '');
    }
    if (n < 1000) {
      const h = Math.floor(n / 100), r = n % 100;
      return ONES[h] + ' hundred' + (r ? ' ' + enNumber(r) : '');
    }
    return String(n);
  }
  function numberUnit(u, min, max, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const num = ri(min, max);
      const word = enNumber(num);
      const wrongs = new Set();
      let guard = 0;
      while (wrongs.size < 2 && guard++ < 100) {
        const w = enNumber(num + ri(-3, 3));
        if (w !== word) wrongs.add(w);
      }
      exs.push(mc(u, T(`¿Cómo se dice ${num} en inglés?`, `How do you say ${num} in English?`, `Wie sagt man ${num} auf Englisch?`), shuffle([word, ...wrongs]), word, 1, i));
    }
    return exs;
  }

  /* ---------- Gramática procedimental ---------- */
  function aAnUnit(u, n) {
    const exs = [];
    const words = [
      ['apple', 'an'], ['orange', 'an'], ['umbrella', 'an'], ['egg', 'an'], ['ice cream', 'an'], ['hour', 'an'],
      ['cat', 'a'], ['dog', 'a'], ['book', 'a'], ['car', 'a'], ['house', 'a'], ['school', 'a'], ['banana', 'a'], ['table', 'a'],
    ];
    for (let i = 0; i < n; i++) {
      const [w, art] = pick(words);
      exs.push(mc(u, T(`___ ${w}`, `___ ${w}`, `___ ${w}`), shuffle(['a', 'an']), art, 1, i));
    }
    return exs;
  }
  function pluralUnit(u, n) {
    const exs = [];
    const words = [
      ['cat', 'cats'], ['dog', 'dogs'], ['book', 'books'], ['car', 'cars'], ['box', 'boxes'], ['bus', 'buses'],
      ['baby', 'babies'], ['city', 'cities'], ['child', 'children'], ['man', 'men'], ['woman', 'women'],
      ['foot', 'feet'], ['tooth', 'teeth'], ['mouse', 'mice'], ['sheep', 'sheep'], ['fish', 'fish'],
    ];
    for (let i = 0; i < n; i++) {
      const [sg, pl] = pick(words);
      const wrongs = pickN(words.filter(x => x[1] !== pl), 2).map(x => x[1]);
      exs.push(mc(u, T(`¿Cuál es el plural de «${sg}»?`, `What is the plural of "${sg}"?`, `Was ist der Plural von "${sg}"?`), shuffle([pl, ...wrongs]), pl, 1, i));
    }
    return exs;
  }
  function toBeUnit(u, n) {
    const exs = [];
    const P = [
      ['I', 'am'], ['you', 'are'], ['he', 'is'], ['she', 'is'], ['it', 'is'], ['we', 'are'], ['they', 'are'],
    ];
    for (let i = 0; i < n; i++) {
      const [p, v] = pick(P);
      const wrongs = pickN(['am', 'is', 'are'].filter(x => x !== v), 2);
      exs.push(mc(u, T(`Completa: ${p} ___`, `Complete: ${p} ___`, `Ergänze: ${p} ___`), shuffle([v, ...wrongs]), v, 1, i));
    }
    return exs;
  }
  function haveGotUnit(u, n) {
    const exs = [];
    const P = [
      ['I', 'have got'], ['you', 'have got'], ['he', 'has got'], ['she', 'has got'], ['it', 'has got'], ['we', 'have got'], ['they', 'have got'],
    ];
    for (let i = 0; i < n; i++) {
      const [p, v] = pick(P);
      exs.push(mc(u, T(`Completa: ${p} ___ a book`, `Complete: ${p} ___ a book`, `Ergänze: ${p} ___ a book`), shuffle(['have got', 'has got']), v, 1, i));
    }
    return exs;
  }
  function presentSimpleUnit(u, n) {
    const exs = [];
    const verbs = [
      ['play', 'plays'], ['eat', 'eats'], ['run', 'runs'], ['read', 'reads'], ['write', 'writes'],
      ['watch', 'watches'], ['go', 'goes'], ['study', 'studies'], ['work', 'works'], ['like', 'likes'],
    ];
    for (let i = 0; i < n; i++) {
      const [base, s3] = pick(verbs);
      const he = ri(0, 1) === 0;
      const correct = he ? s3 : base;
      const wrong = he ? base : s3;
      exs.push(mc(u, T(`Completa: ${he ? 'She' : 'They'} ___ every day`, `Complete: ${he ? 'She' : 'They'} ___ every day`, `Ergänze: ${he ? 'She' : 'They'} ___ every day`), shuffle([correct, wrong]), correct, 1, i));
    }
    return exs;
  }
  function pastSimpleUnit(u, n) {
    const exs = [];
    const verbs = [
      ['play', 'played'], ['work', 'worked'], ['watch', 'watched'], ['clean', 'cleaned'], ['study', 'studied'],
      ['go', 'went'], ['eat', 'ate'], ['see', 'saw'], ['come', 'came'], ['have', 'had'], ['do', 'did'],
      ['make', 'made'], ['take', 'took'], ['buy', 'bought'], ['think', 'thought'], ['write', 'wrote'],
    ];
    for (let i = 0; i < n; i++) {
      const [base, past] = pick(verbs);
      const wrongs = pickN(verbs.filter(x => x[1] !== past), 2).map(x => x[1]);
      exs.push(mc(u, T(`Pasado de «${base}»`, `Past of "${base}"`, `Vergangenheit von "${base}"`), shuffle([past, ...wrongs]), past, 1, i));
    }
    return exs;
  }
  function comparativeUnit(u, n) {
    const exs = [];
    const adj = [
      ['big', 'bigger'], ['small', 'smaller'], ['tall', 'taller'], ['short', 'shorter'], ['fast', 'faster'],
      ['slow', 'slower'], ['old', 'older'], ['young', 'younger'], ['hot', 'hotter'], ['cold', 'colder'],
      ['happy', 'happier'], ['easy', 'easier'], ['good', 'better'], ['bad', 'worse'], ['far', 'farther'],
    ];
    for (let i = 0; i < n; i++) {
      const [a, comp] = pick(adj);
      const wrongs = pickN(adj.filter(x => x[1] !== comp), 2).map(x => x[1]);
      exs.push(mc(u, T(`Comparativo de «${a}»`, `Comparative of "${a}"`, `Komparativ von "${a}"`), shuffle([comp, ...wrongs]), comp, 1, i));
    }
    return exs;
  }
  function futureUnit(u, n) {
    const exs = [];
    const verbs = ['play', 'eat', 'run', 'read', 'write', 'watch', 'study', 'work', 'like', 'visit'];
    for (let i = 0; i < n; i++) {
      const v = pick(verbs);
      const p = pick(['I', 'you', 'he', 'she', 'we', 'they']);
      exs.push(mc(u, T(`Completa: ${p} ___ ${v} tomorrow`, `Complete: ${p} ___ ${v} tomorrow`, `Ergänze: ${p} ___ ${v} tomorrow`), shuffle(['will', 'am', 'is']), 'will', 1, i));
    }
    return exs;
  }
  function thereIsUnit(u, n) {
    const exs = [];
    const words = ['apple', 'book', 'cat', 'dog', 'chair', 'table', 'pen', 'car', 'house', 'tree'];
    for (let i = 0; i < n; i++) {
      const w = pick(words);
      const plural = ri(0, 1) === 0;
      exs.push(mc(u, T(`Completa: There ___ ${plural ? 'two' : 'one'} ${w}${plural ? 's' : ''}`, `Complete: There ___ ${plural ? 'two' : 'one'} ${w}${plural ? 's' : ''}`, `Ergänze: There ___ ${plural ? 'two' : 'one'} ${w}${plural ? 's' : ''}`), shuffle(['is', 'are']), plural ? 'are' : 'is', 1, i));
    }
    return exs;
  }
  function prepositionUnit(u, n) {
    const exs = [];
    const prep = [
      ['on', 'sobre'], ['in', 'en/dentro'], ['under', 'debajo'], ['behind', 'detrás'], ['in front of', 'delante'],
      ['next to', 'al lado'], ['between', 'entre'], ['above', 'encima'],
    ];
    for (let i = 0; i < n; i++) {
      const [p, m] = pick(prep);
      const wrongs = pickN(prep.filter(x => x[0] !== p), 2).map(x => x[1]);
      exs.push(mc(u, T(`¿Qué significa «${p}»?`, `What does "${p}" mean?`, `Was bedeutet "${p}"?`), shuffle([m, ...wrongs]), m, 1, i));
    }
    return exs;
  }
  function presentPerfectUnit(u, n) {
    const exs = [];
    const verbs = [
      ['see', 'seen'], ['eat', 'eaten'], ['go', 'gone'], ['do', 'done'], ['write', 'written'],
      ['take', 'taken'], ['buy', 'bought'], ['make', 'made'], ['have', 'had'], ['be', 'been'],
    ];
    for (let i = 0; i < n; i++) {
      const [base, pp] = pick(verbs);
      const wrongs = pickN(verbs.filter(x => x[1] !== pp), 2).map(x => x[1]);
      exs.push(mc(u, T(`Participio de «${base}»`, `Past participle of "${base}"`, `Partizip von "${base}"`), shuffle([pp, ...wrongs]), pp, 1, i));
    }
    return exs;
  }
  function conditionalUnit(u, n) {
    const exs = [];
    const conds = [
      ['If it rains, I ___ stay home', 'will'], ['If I were you, I ___ study more', 'would'],
      ['If you heat water, it ___ boil', 'will'], ['If she comes, we ___ be happy', 'will'],
      ['If I had money, I ___ travel', 'would'], ['If he studies, he ___ pass', 'will'],
    ];
    for (let i = 0; i < n; i++) {
      const [q, ans] = pick(conds);
      exs.push(mc(u, T(q, q, q), shuffle(['will', 'would', 'can']), ans, 1, i));
    }
    return exs;
  }
  function connectorUnit(u, n) {
    const exs = [];
    const conn = [
      ['and', 'y'], ['but', 'pero'], ['or', 'o'], ['because', 'porque'], ['so', 'así que'],
      ['although', 'aunque'], ['if', 'si'], ['when', 'cuando'], ['while', 'mientras'], ['before', 'antes de'],
    ];
    for (let i = 0; i < n; i++) {
      const [c, m] = pick(conn);
      const wrongs = pickN(conn.filter(x => x[0] !== c), 2).map(x => x[1]);
      exs.push(mc(u, T(`¿Qué significa «${c}»?`, `What does "${c}" mean?`, `Was bedeutet "${c}"?`), shuffle([m, ...wrongs]), m, 1, i));
    }
    return exs;
  }
  function translationUnit(u, words, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const w = pick(words);
      exs.push(fb(u, T(`Escribe en inglés: ${w.es}`, `Write in English: ${w.es}`, `Schreibe auf Englisch: ${w.es}`), w.t, [w.t, w.t.toLowerCase()], 1, i));
    }
    return exs;
  }

  /* ---------- Bancos de vocabulario ---------- */
  const V_BASICO = [
    { es: 'manzana', t: 'apple' }, { es: 'perro', t: 'dog' }, { es: 'gato', t: 'cat' }, { es: 'casa', t: 'house' },
    { es: 'sol', t: 'sun' }, { es: 'luna', t: 'moon' }, { es: 'agua', t: 'water' }, { es: 'pan', t: 'bread' },
    { es: 'leche', t: 'milk' }, { es: 'libro', t: 'book' }, { es: 'escuela', t: 'school' }, { es: 'maestro', t: 'teacher' },
    { es: 'niño', t: 'boy' }, { es: 'niña', t: 'girl' }, { es: 'madre', t: 'mother' }, { es: 'padre', t: 'father' },
    { es: 'hermano', t: 'brother' }, { es: 'hermana', t: 'sister' }, { es: 'amigo', t: 'friend' }, { es: 'familia', t: 'family' },
    { es: 'rojo', t: 'red' }, { es: 'azul', t: 'blue' }, { es: 'verde', t: 'green' }, { es: 'amarillo', t: 'yellow' },
    { es: 'negro', t: 'black' }, { es: 'blanco', t: 'white' }, { es: 'grande', t: 'big' }, { es: 'pequeño', t: 'small' },
    { es: 'alto', t: 'tall' }, { es: 'bajo', t: 'short' }, { es: 'feliz', t: 'happy' }, { es: 'triste', t: 'sad' },
    { es: 'comer', t: 'eat' }, { es: 'beber', t: 'drink' }, { es: 'correr', t: 'run' }, { es: 'saltar', t: 'jump' },
    { es: 'dormir', t: 'sleep' }, { es: 'caminar', t: 'walk' }, { es: 'ver', t: 'see' }, { es: 'oír', t: 'hear' },
    { es: 'mano', t: 'hand' }, { es: 'pie', t: 'foot' }, { es: 'ojo', t: 'eye' }, { es: 'boca', t: 'mouth' },
    { es: 'nariz', t: 'nose' }, { es: 'oreja', t: 'ear' }, { es: 'cabeza', t: 'head' }, { es: 'pelo', t: 'hair' },
    { es: 'carro', t: 'car' }, { es: 'avión', t: 'plane' }, { es: 'tren', t: 'train' }, { es: 'barco', t: 'boat' },
    { es: 'bicicleta', t: 'bike' }, { es: 'pelota', t: 'ball' }, { es: 'juguete', t: 'toy' }, { es: 'juego', t: 'game' },
    { es: 'flor', t: 'flower' }, { es: 'árbol', t: 'tree' }, { es: 'pájaro', t: 'bird' }, { es: 'pez', t: 'fish' },
    { es: 'caballo', t: 'horse' }, { es: 'vaca', t: 'cow' }, { es: 'cerdo', t: 'pig' }, { es: 'oveja', t: 'sheep' },
    { es: 'puerta', t: 'door' }, { es: 'ventana', t: 'window' }, { es: 'mesa', t: 'table' }, { es: 'silla', t: 'chair' },
    { es: 'cama', t: 'bed' }, { es: 'cocina', t: 'kitchen' }, { es: 'baño', t: 'bathroom' }, { es: 'jardín', t: 'garden' },
    { es: 'día', t: 'day' }, { es: 'noche', t: 'night' }, { es: 'mañana', t: 'morning' }, { es: 'tarde', t: 'afternoon' },
    { es: 'hoy', t: 'today' }, { es: 'ayer', t: 'yesterday' }, { es: 'mañana (futuro)', t: 'tomorrow' }, { es: 'ahora', t: 'now' },
  ];
  const V_3 = [
    { es: 'lunes', t: 'Monday' }, { es: 'martes', t: 'Tuesday' }, { es: 'miércoles', t: 'Wednesday' },
    { es: 'jueves', t: 'Thursday' }, { es: 'viernes', t: 'Friday' }, { es: 'sábado', t: 'Saturday' },
    { es: 'domingo', t: 'Sunday' }, { es: 'enero', t: 'January' }, { es: 'febrero', t: 'February' },
    { es: 'marzo', t: 'March' }, { es: 'abril', t: 'April' }, { es: 'mayo', t: 'May' }, { es: 'junio', t: 'June' },
    { es: 'julio', t: 'July' }, { es: 'agosto', t: 'August' }, { es: 'septiembre', t: 'September' },
    { es: 'octubre', t: 'October' }, { es: 'noviembre', t: 'November' }, { es: 'diciembre', t: 'December' },
    { es: 'primavera', t: 'spring' }, { es: 'verano', t: 'summer' }, { es: 'otoño', t: 'autumn' }, { es: 'invierno', t: 'winter' },
    { es: 'ropa', t: 'clothes' }, { es: 'camisa', t: 'shirt' }, { es: 'pantalones', t: 'trousers' }, { es: 'zapatos', t: 'shoes' },
    { es: 'vestido', t: 'dress' }, { es: 'sombrero', t: 'hat' }, { es: 'abrigo', t: 'coat' }, { es: 'calcetines', t: 'socks' },
    { es: 'comida', t: 'food' }, { es: 'fruta', t: 'fruit' }, { es: 'verdura', t: 'vegetable' }, { es: 'carne', t: 'meat' },
    { es: 'pollo', t: 'chicken' }, { es: 'huevo', t: 'egg' }, { es: 'queso', t: 'cheese' }, { es: 'arroz', t: 'rice' },
    { es: 'sopa', t: 'soup' }, { es: 'ensalada', t: 'salad' }, { es: 'dulce', t: 'sweet' }, { es: 'pastel', t: 'cake' },
    { es: 'cuerpo', t: 'body' }, { es: 'brazo', t: 'arm' }, { es: 'pierna', t: 'leg' }, { es: 'espalda', t: 'back' },
    { es: 'hombro', t: 'shoulder' }, { es: 'rodilla', t: 'knee' }, { es: 'dedo', t: 'finger' }, { es: 'diente', t: 'tooth' },
    { es: 'animal', t: 'animal' }, { es: 'león', t: 'lion' }, { es: 'tigre', t: 'tiger' }, { es: 'elefante', t: 'elephant' },
    { es: 'mono', t: 'monkey' }, { es: 'oso', t: 'bear' }, { es: 'conejo', t: 'rabbit' }, { es: 'serpiente', t: 'snake' },
    { es: 'lugar', t: 'place' }, { es: 'ciudad', t: 'city' }, { es: 'pueblo', t: 'town' }, { es: 'calle', t: 'street' },
    { es: 'parque', t: 'park' }, { es: 'tienda', t: 'shop' }, { es: 'mercado', t: 'market' }, { es: 'hospital', t: 'hospital' },
    { es: 'tiempo', t: 'weather' }, { es: 'lluvia', t: 'rain' }, { es: 'nieve', t: 'snow' }, { es: 'viento', t: 'wind' },
    { es: 'nube', t: 'cloud' }, { es: 'cielo', t: 'sky' }, { es: 'caliente', t: 'hot' }, { es: 'frío', t: 'cold' },
    { es: 'rápido', t: 'fast' }, { es: 'lento', t: 'slow' }, { es: 'nuevo', t: 'new' }, { es: 'viejo', t: 'old' },
    { es: 'bonito', t: 'pretty' }, { es: 'feo', t: 'ugly' }, { es: 'fuerte', t: 'strong' }, { es: 'débil', t: 'weak' },
  ];
  const V_4 = [
    { es: 'familia', t: 'relatives' }, { es: 'abuelo', t: 'grandfather' }, { es: 'abuela', t: 'grandmother' },
    { es: 'tío', t: 'uncle' }, { es: 'tía', t: 'aunt' }, { es: 'primo', t: 'cousin' }, { es: 'sobrino', t: 'nephew' },
    { es: 'hijo', t: 'son' }, { es: 'hija', t: 'daughter' }, { es: 'esposo', t: 'husband' }, { es: 'esposa', t: 'wife' },
    { es: 'bebé', t: 'baby' }, { es: 'persona', t: 'person' }, { es: 'gente', t: 'people' }, { es: 'vecino', t: 'neighbour' },
    { es: 'trabajo', t: 'job' }, { es: 'oficina', t: 'office' }, { es: 'fábrica', t: 'factory' }, { es: 'granja', t: 'farm' },
    { es: 'granjero', t: 'farmer' }, { es: 'doctor', t: 'doctor' }, { es: 'enfermera', t: 'nurse' }, { es: 'policía', t: 'police officer' },
    { es: 'bombero', t: 'firefighter' }, { es: 'cocinero', t: 'cook' }, { es: 'conductor', t: 'driver' }, { es: 'cantante', t: 'singer' },
    { es: 'deporte', t: 'sport' }, { es: 'fútbol', t: 'football' }, { es: 'baloncesto', t: 'basketball' }, { es: 'tenis', t: 'tennis' },
    { es: 'natación', t: 'swimming' }, { es: 'ciclismo', t: 'cycling' }, { es: 'correr', t: 'running' }, { es: 'equipo', t: 'team' },
    { es: 'música', t: 'music' }, { es: 'canción', t: 'song' }, { es: 'guitarra', t: 'guitar' }, { es: 'piano', t: 'piano' },
    { es: 'violín', t: 'violin' }, { es: 'batería', t: 'drums' }, { es: 'flauta', t: 'flute' }, { es: 'cantar', t: 'sing' },
    { es: 'bailar', t: 'dance' }, { es: 'dibujar', t: 'draw' }, { es: 'pintar', t: 'paint' }, { es: 'escribir', t: 'write' },
    { es: 'leer', t: 'read' }, { es: 'estudiar', t: 'study' }, { es: 'aprender', t: 'learn' }, { es: 'enseñar', t: 'teach' },
    { es: 'preguntar', t: 'ask' }, { es: 'responder', t: 'answer' }, { es: 'ayudar', t: 'help' }, { es: 'comprar', t: 'buy' },
    { es: 'vender', t: 'sell' }, { es: 'pagar', t: 'pay' }, { es: 'dinero', t: 'money' }, { es: 'precio', t: 'price' },
    { es: 'barato', t: 'cheap' }, { es: 'caro', t: 'expensive' }, { es: 'tienda', t: 'store' }, { es: 'supermercado', t: 'supermarket' },
    { es: 'restaurante', t: 'restaurant' }, { es: 'hotel', t: 'hotel' }, { es: 'banco', t: 'bank' }, { es: 'biblioteca', t: 'library' },
    { es: 'museo', t: 'museum' }, { es: 'cine', t: 'cinema' }, { es: 'teatro', t: 'theatre' }, { es: 'estadio', t: 'stadium' },
    { es: 'montaña', t: 'mountain' }, { es: 'río', t: 'river' }, { es: 'lago', t: 'lake' }, { es: 'mar', t: 'sea' },
    { es: 'playa', t: 'beach' }, { es: 'bosque', t: 'forest' }, { es: 'desierto', t: 'desert' }, { es: 'isla', t: 'island' },
    { es: 'puente', t: 'bridge' }, { es: 'camino', t: 'road' }, { es: 'mapa', t: 'map' }, { es: 'viaje', t: 'trip' },
  ];
  const V_5 = [
    { es: 'salud', t: 'health' }, { es: 'enfermedad', t: 'illness' }, { es: 'fiebre', t: 'fever' }, { es: 'tos', t: 'cough' },
    { es: 'dolor', t: 'pain' }, { es: 'medicina', t: 'medicine' }, { es: 'pastilla', t: 'pill' }, { es: 'vitamina', t: 'vitamin' },
    { es: 'ejercicio', t: 'exercise' }, { es: 'dieta', t: 'diet' }, { es: 'descanso', t: 'rest' }, { es: 'energía', t: 'energy' },
    { es: 'medio ambiente', t: 'environment' }, { es: 'contaminación', t: 'pollution' }, { es: 'reciclar', t: 'recycle' },
    { es: 'basura', t: 'rubbish' }, { es: 'plástico', t: 'plastic' }, { es: 'papel', t: 'paper' }, { es: 'vidrio', t: 'glass' },
    { es: 'metal', t: 'metal' }, { es: 'naturaleza', t: 'nature' }, { es: 'planeta', t: 'planet' }, { es: 'tierra', t: 'earth' },
    { es: 'tecnología', t: 'technology' }, { es: 'computadora', t: 'computer' }, { es: 'teléfono', t: 'phone' },
    { es: 'internet', t: 'internet' }, { es: 'pantalla', t: 'screen' }, { es: 'teclado', t: 'keyboard' }, { es: 'ratón', t: 'mouse' },
    { es: 'aplicación', t: 'app' }, { es: 'mensaje', t: 'message' }, { es: 'correo', t: 'email' }, { es: 'foto', t: 'photo' },
    { es: 'video', t: 'video' }, { es: 'juego', t: 'game' }, { es: 'noticia', t: 'news' }, { es: 'información', t: 'information' },
    { es: 'educación', t: 'education' }, { es: 'ciencia', t: 'science' }, { es: 'historia', t: 'history' }, { es: 'geografía', t: 'geography' },
    { es: 'matemáticas', t: 'maths' }, { es: 'arte', t: 'art' }, { es: 'idioma', t: 'language' }, { es: 'examen', t: 'exam' },
    { es: 'tarea', t: 'homework' }, { es: 'nota', t: 'grade' }, { es: 'clase', t: 'class' }, { es: 'lección', t: 'lesson' },
    { es: 'sentimiento', t: 'feeling' }, { es: 'amor', t: 'love' }, { es: 'odio', t: 'hate' }, { es: 'miedo', t: 'fear' },
    { es: 'alegría', t: 'joy' }, { es: 'sorpresa', t: 'surprise' }, { es: 'enojo', t: 'anger' }, { es: 'preocupación', t: 'worry' },
    { es: 'esperanza', t: 'hope' }, { es: 'sueño', t: 'dream' }, { es: 'paz', t: 'peace' }, { es: 'guerra', t: 'war' },
    { es: 'libertad', t: 'freedom' }, { es: 'justicia', t: 'justice' }, { es: 'verdad', t: 'truth' }, { es: 'mentira', t: 'lie' },
    { es: 'amable', t: 'kind' }, { es: 'honesto', t: 'honest' }, { es: 'valiente', t: 'brave' }, { es: 'tímido', t: 'shy' },
    { es: 'curioso', t: 'curious' }, { es: 'paciente', t: 'patient' }, { es: 'responsable', t: 'responsible' }, { es: 'generoso', t: 'generous' },
  ];
  const V_6 = [
    { es: 'sociedad', t: 'society' }, { es: 'cultura', t: 'culture' }, { es: 'tradición', t: 'tradition' }, { es: 'costumbre', t: 'custom' },
    { es: 'celebración', t: 'celebration' }, { es: 'fiesta', t: 'party' }, { es: 'ceremonia', t: 'ceremony' }, { es: 'festival', t: 'festival' },
    { es: 'economía', t: 'economy' }, { es: 'negocio', t: 'business' }, { es: 'empresa', t: 'company' }, { es: 'producto', t: 'product' },
    { es: 'servicio', t: 'service' }, { es: 'cliente', t: 'customer' }, { es: 'venta', t: 'sale' }, { es: 'compra', t: 'purchase' },
    { es: 'política', t: 'politics' }, { es: 'gobierno', t: 'government' }, { es: 'ley', t: 'law' }, { es: 'derecho', t: 'right' },
    { es: 'deber', t: 'duty' }, { es: 'ciudadano', t: 'citizen' }, { es: 'voto', t: 'vote' }, { es: 'elección', t: 'election' },
    { es: 'comunicación', t: 'communication' }, { es: 'conversación', t: 'conversation' }, { es: 'opinión', t: 'opinion' },
    { es: 'idea', t: 'idea' }, { es: 'pensamiento', t: 'thought' }, { es: 'decisión', t: 'decision' }, { es: 'plan', t: 'plan' },
    { es: 'objetivo', t: 'goal' }, { es: 'éxito', t: 'success' }, { es: 'fracaso', t: 'failure' }, { es: 'esfuerzo', t: 'effort' },
    { es: 'habilidad', t: 'skill' }, { es: 'talento', t: 'talent' }, { es: 'experiencia', t: 'experience' }, { es: 'conocimiento', t: 'knowledge' },
    { es: 'imaginación', t: 'imagination' }, { es: 'creatividad', t: 'creativity' }, { es: 'memoria', t: 'memory' }, { es: 'atención', t: 'attention' },
    { es: 'concentración', t: 'concentration' }, { es: 'motivación', t: 'motivation' }, { es: 'disciplina', t: 'discipline' }, { es: 'hábito', t: 'habit' },
    { es: 'rutina', t: 'routine' }, { es: 'horario', t: 'schedule' }, { es: 'cita', t: 'appointment' }, { es: 'reunión', t: 'meeting' },
    { es: 'viaje', t: 'journey' }, { es: 'aventura', t: 'adventure' }, { es: 'descubrimiento', t: 'discovery' }, { es: 'invento', t: 'invention' },
    { es: 'investigación', t: 'research' }, { es: 'experimento', t: 'experiment' }, { es: 'prueba', t: 'evidence' }, { es: 'resultado', t: 'result' },
    { es: 'causa', t: 'cause' }, { es: 'efecto', t: 'effect' }, { es: 'consecuencia', t: 'consequence' }, { es: 'solución', t: 'solution' },
    { es: 'problema', t: 'problem' }, { es: 'desafío', t: 'challenge' }, { es: 'oportunidad', t: 'opportunity' }, { es: 'riesgo', t: 'risk' },
    { es: 'seguridad', t: 'safety' }, { es: 'peligro', t: 'danger' }, { es: 'protección', t: 'protection' }, { es: 'cuidado', t: 'care' },
    { es: 'responsabilidad', t: 'responsibility' }, { es: 'confianza', t: 'trust' }, { es: 'respeto', t: 'respect' }, { es: 'tolerancia', t: 'tolerance' },
    { es: 'igualdad', t: 'equality' }, { es: 'diversidad', t: 'diversity' }, { es: 'unidad', t: 'unity' }, { es: 'solidaridad', t: 'solidarity' },
  ];

  /* ===== Nivel básico ===== */
  {
    const l = addLevel(s, 'ingles-basico', 'Básico', 'Basic', 'Grundstufe');
    addUnit(s, l, 'Palabras esenciales', 'Essential words', 'Grundwortschatz', (u) => vocabUnit(u, 'inglés', V_BASICO, { allowFB: true }));
    addUnit(s, l, 'Los números 1-20', 'Numbers 1-20', 'Zahlen 1-20', (u) => numberUnit(u, 1, 20, 200));
    addUnit(s, l, 'Los colores', 'Colors', 'Farben', (u) => {
      const exs = [];
      const colors = [['rojo', 'red'], ['azul', 'blue'], ['verde', 'green'], ['amarillo', 'yellow'], ['negro', 'black'], ['blanco', 'white'], ['naranja', 'orange'], ['rosa', 'pink'], ['morado', 'purple'], ['marrón', 'brown'], ['gris', 'grey'], ['dorado', 'gold']];
      for (let i = 0; i < 120; i++) {
        const [es, en] = pick(colors);
        const wrongs = pickN(colors.filter(x => x[1] !== en), 2).map(x => x[1]);
        exs.push(mc(u, T(`¿Cómo se dice «${es}» en inglés?`, `How do you say "${es}" in English?`, `Wie sagt man "${es}" auf Englisch?`), shuffle([en, ...wrongs]), en, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Saludos y cortesía', 'Greetings', 'Begrüßungen', (u) => {
      const exs = [];
      const g = [['hola', 'hello'], ['adiós', 'goodbye'], ['por favor', 'please'], ['gracias', 'thank you'], ['buenos días', 'good morning'], ['buenas tardes', 'good afternoon'], ['buenas noches', 'good night'], ['sí', 'yes'], ['no', 'no'], ['perdón', 'sorry'], ['de nada', 'you are welcome'], ['hasta luego', 'see you later']];
      for (let i = 0; i < 120; i++) {
        const [es, en] = pick(g);
        const wrongs = pickN(g.filter(x => x[1] !== en), 2).map(x => x[1]);
        exs.push(mc(u, T(`¿Cómo se dice «${es}» en inglés?`, `How do you say "${es}" in English?`, `Wie sagt man "${es}" auf Englisch?`), shuffle([en, ...wrongs]), en, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'A o an', 'A or an', 'A oder an', (u) => aAnUnit(u, 200));
    addUnit(s, l, 'El verbo to be', 'The verb to be', 'Das Verb to be', (u) => toBeUnit(u, 200));
    addUnit(s, l, 'Plurales', 'Plurals', 'Pluralformen', (u) => pluralUnit(u, 200));
    addUnit(s, l, 'Escribe en inglés', 'Write in English', 'Schreibe auf Englisch', (u) => translationUnit(u, V_BASICO, 200));
  }

  /* ===== Nivel 3 ===== */
  {
    const l = addLevel(s, 'ingles-3', '3er grado', 'Grade 3', 'Klasse 3');
    addUnit(s, l, 'Días y meses', 'Days and months', 'Tage und Monate', (u) => vocabUnit(u, 'inglés', V_3.filter(w => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La ropa', 'Clothes', 'Kleidung', (u) => vocabUnit(u, 'inglés', V_3.filter(w => ['clothes', 'shirt', 'trousers', 'shoes', 'dress', 'hat', 'coat', 'socks'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La comida', 'Food', 'Essen', (u) => vocabUnit(u, 'inglés', V_3.filter(w => ['food', 'fruit', 'vegetable', 'meat', 'chicken', 'egg', 'cheese', 'rice', 'soup', 'salad', 'sweet', 'cake'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'El cuerpo', 'The body', 'Der Körper', (u) => vocabUnit(u, 'inglés', V_3.filter(w => ['body', 'arm', 'leg', 'back', 'shoulder', 'knee', 'finger', 'tooth'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Los animales', 'Animals', 'Tiere', (u) => vocabUnit(u, 'inglés', V_3.filter(w => ['animal', 'lion', 'tiger', 'elephant', 'monkey', 'bear', 'rabbit', 'snake'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Números 20-100', 'Numbers 20-100', 'Zahlen 20-100', (u) => numberUnit(u, 20, 100, 200));
    addUnit(s, l, 'Have got', 'Have got', 'Have got', (u) => haveGotUnit(u, 200));
    addUnit(s, l, 'Presente simple', 'Present simple', 'Präsens', (u) => presentSimpleUnit(u, 200));
    addUnit(s, l, 'El tiempo atmosférico', 'Weather', 'Wetter', (u) => {
      const exs = [];
      const w = [['lluvia', 'rain'], ['nieve', 'snow'], ['viento', 'wind'], ['nube', 'cloud'], ['cielo', 'sky'], ['sol', 'sun'], ['tormenta', 'storm'], ['niebla', 'fog']];
      for (let i = 0; i < 120; i++) {
        const [es, en] = pick(w);
        const wrongs = pickN(w.filter(x => x[1] !== en), 2).map(x => x[1]);
        exs.push(mc(u, T(`¿Cómo se dice «${es}» en inglés?`, `How do you say "${es}" in English?`, `Wie sagt man "${es}" auf Englisch?`), shuffle([en, ...wrongs]), en, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Escribe en inglés', 'Write in English', 'Schreibe auf Englisch', (u) => translationUnit(u, V_3, 200));
  }

  /* ===== Nivel 4 ===== */
  {
    const l = addLevel(s, 'ingles-4', '4to grado', 'Grade 4', 'Klasse 4');
    addUnit(s, l, 'La familia', 'The family', 'Die Familie', (u) => vocabUnit(u, 'inglés', V_4.filter(w => ['relatives', 'grandfather', 'grandmother', 'uncle', 'aunt', 'cousin', 'nephew', 'son', 'daughter', 'husband', 'wife', 'baby', 'person', 'people', 'neighbour'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Profesiones', 'Jobs', 'Berufe', (u) => vocabUnit(u, 'inglés', V_4.filter(w => ['job', 'office', 'factory', 'farm', 'farmer', 'doctor', 'nurse', 'police officer', 'firefighter', 'cook', 'driver', 'singer'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Deportes', 'Sports', 'Sport', (u) => vocabUnit(u, 'inglés', V_4.filter(w => ['sport', 'football', 'basketball', 'tennis', 'swimming', 'cycling', 'running', 'team'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Música y arte', 'Music and art', 'Musik und Kunst', (u) => vocabUnit(u, 'inglés', V_4.filter(w => ['music', 'song', 'guitar', 'piano', 'violin', 'drums', 'flute', 'sing', 'dance', 'draw', 'paint'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Verbos de acción', 'Action verbs', 'Aktionsverben', (u) => vocabUnit(u, 'inglés', V_4.filter(w => ['write', 'read', 'study', 'learn', 'teach', 'ask', 'answer', 'help', 'buy', 'sell', 'pay'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La ciudad', 'The city', 'Die Stadt', (u) => vocabUnit(u, 'inglés', V_4.filter(w => ['store', 'supermarket', 'restaurant', 'hotel', 'bank', 'library', 'museum', 'cinema', 'theatre', 'stadium'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Números 100-1000', 'Numbers 100-1000', 'Zahlen 100-1000', (u) => numberUnit(u, 100, 999, 200));
    addUnit(s, l, 'Pasado simple', 'Past simple', 'Einfache Vergangenheit', (u) => pastSimpleUnit(u, 200));
    addUnit(s, l, 'There is / There are', 'There is / There are', 'There is / There are', (u) => thereIsUnit(u, 200));
    addUnit(s, l, 'Preposiciones de lugar', 'Prepositions of place', 'Ortspräpositionen', (u) => prepositionUnit(u, 200));
    addUnit(s, l, 'Escribe en inglés', 'Write in English', 'Schreibe auf Englisch', (u) => translationUnit(u, V_4, 200));
  }

  /* ===== Nivel 5 ===== */
  {
    const l = addLevel(s, 'ingles-5', '5to grado', 'Grade 5', 'Klasse 5');
    addUnit(s, l, 'La salud', 'Health', 'Gesundheit', (u) => vocabUnit(u, 'inglés', V_5.filter(w => ['health', 'illness', 'fever', 'cough', 'pain', 'medicine', 'pill', 'vitamin', 'exercise', 'diet', 'rest', 'energy'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'El medio ambiente', 'The environment', 'Die Umwelt', (u) => vocabUnit(u, 'inglés', V_5.filter(w => ['environment', 'pollution', 'recycle', 'rubbish', 'plastic', 'paper', 'glass', 'metal', 'nature', 'planet', 'earth'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Tecnología', 'Technology', 'Technologie', (u) => vocabUnit(u, 'inglés', V_5.filter(w => ['technology', 'computer', 'phone', 'internet', 'screen', 'keyboard', 'mouse', 'app', 'message', 'email', 'photo', 'video', 'game', 'news', 'information'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La escuela', 'School', 'Die Schule', (u) => vocabUnit(u, 'inglés', V_5.filter(w => ['education', 'science', 'history', 'geography', 'maths', 'art', 'language', 'exam', 'homework', 'grade', 'class', 'lesson'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Sentimientos', 'Feelings', 'Gefühle', (u) => vocabUnit(u, 'inglés', V_5.filter(w => ['feeling', 'love', 'hate', 'fear', 'joy', 'surprise', 'anger', 'worry', 'hope', 'dream', 'peace', 'war', 'freedom', 'justice', 'truth', 'lie'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Adjetivos de personalidad', 'Personality adjectives', 'Persönlichkeitsadjektive', (u) => vocabUnit(u, 'inglés', V_5.filter(w => ['kind', 'honest', 'brave', 'shy', 'curious', 'patient', 'responsible', 'generous'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Comparativos', 'Comparatives', 'Komparative', (u) => comparativeUnit(u, 200));
    addUnit(s, l, 'Futuro con will', 'Future with will', 'Futur mit will', (u) => futureUnit(u, 200));
    addUnit(s, l, 'Verbos irregulares', 'Irregular verbs', 'Unregelmäßige Verben', (u) => pastSimpleUnit(u, 200));
    addUnit(s, l, 'Escribe en inglés', 'Write in English', 'Schreibe auf Englisch', (u) => translationUnit(u, V_5, 200));
  }

  /* ===== Nivel 6 ===== */
  {
    const l = addLevel(s, 'ingles-6', '6to grado', 'Grade 6', 'Klasse 6');
    addUnit(s, l, 'La sociedad', 'Society', 'Gesellschaft', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['society', 'culture', 'tradition', 'custom', 'celebration', 'party', 'ceremony', 'festival'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Economía y negocios', 'Economy and business', 'Wirtschaft', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['economy', 'business', 'company', 'product', 'service', 'customer', 'sale', 'purchase'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Política y derechos', 'Politics and rights', 'Politik und Rechte', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['politics', 'government', 'law', 'right', 'duty', 'citizen', 'vote', 'election'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Comunicación', 'Communication', 'Kommunikation', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['communication', 'conversation', 'opinion', 'idea', 'thought', 'decision', 'plan', 'goal'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Éxito y esfuerzo', 'Success and effort', 'Erfolg und Anstrengung', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['success', 'failure', 'effort', 'skill', 'talent', 'experience', 'knowledge', 'imagination', 'creativity', 'memory', 'attention', 'concentration', 'motivation', 'discipline', 'habit', 'routine'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Ciencia y descubrimiento', 'Science and discovery', 'Wissenschaft', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['journey', 'adventure', 'discovery', 'invention', 'research', 'experiment', 'evidence', 'result', 'cause', 'effect', 'consequence', 'solution', 'problem', 'challenge', 'opportunity', 'risk'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Valores', 'Values', 'Werte', (u) => vocabUnit(u, 'inglés', V_6.filter(w => ['safety', 'danger', 'protection', 'care', 'responsibility', 'trust', 'respect', 'tolerance', 'equality', 'diversity', 'unity', 'solidarity'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Presente perfecto', 'Present perfect', 'Perfekt', (u) => presentPerfectUnit(u, 200));
    addUnit(s, l, 'Condicionales', 'Conditionals', 'Konditionalsätze', (u) => conditionalUnit(u, 200));
    addUnit(s, l, 'Conectores', 'Connectors', 'Konjunktionen', (u) => connectorUnit(u, 200));
    addUnit(s, l, 'Escribe en inglés', 'Write in English', 'Schreibe auf Englisch', (u) => translationUnit(u, V_6, 200));
  }
};