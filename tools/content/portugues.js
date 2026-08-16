/* ============================================================
 * PORTUGUÉS — 5 000 ejercicios, 3 niveles (basico, intermedio, avanzado)
 * Vocabulario (vocabUnit) + gramática procedimental.
 * ============================================================ */
module.exports = (ctx) => {
  const { addSubject, addLevel, addUnit, mc, fb, tf, dm, mcQ, tfQ, dmQ, T, ri, pick, shuffle, pickN, vocabUnit } = ctx;

  const s = addSubject('portugues', 'Portugués', 'Portuguese', 'Portugiesisch', '#009688', '🇵🇹');

  /* ---------- Números en portugués ---------- */
  const ONES = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const TENS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  function ptNumber(n) {
    if (n < 20) return ONES[n];
    if (n < 100) {
      const t = Math.floor(n / 10), o = n % 10;
      return TENS[t] + (o ? ' e ' + ONES[o] : '');
    }
    if (n < 1000) {
      const h = Math.floor(n / 100), r = n % 100;
      return (h === 1 ? 'cem' : ONES[h] + ' centos') + (r ? ' e ' + ptNumber(r) : '');
    }
    return String(n);
  }
  function numberUnit(u, min, max, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const num = ri(min, max);
      const word = ptNumber(num);
      const wrongs = new Set();
      let guard = 0;
      while (wrongs.size < 2 && guard++ < 100) {
        const w = ptNumber(num + ri(-3, 3));
        if (w !== word) wrongs.add(w);
      }
      exs.push(mc(u, T(`¿Cómo se dice ${num} en portugués?`, `How do you say ${num} in Portuguese?`, `Wie sagt man ${num} auf Portugiesisch?`), shuffle([word, ...wrongs]), word, 1, i));
    }
    return exs;
  }

  /* ---------- Gramática procedimental ---------- */
  function serEstarUnit(u, n) {
    const exs = [];
    const P = [
      ['eu', 'sou', 'estou'], ['você', 'é', 'está'], ['ele', 'é', 'está'], ['ela', 'é', 'está'],
      ['nós', 'somos', 'estamos'], ['eles', 'são', 'estão'],
    ];
    const ctxs = [
      ['Eu ___ brasileiro', 'sou'], ['Você ___ feliz', 'está'], ['Ele ___ professor', 'é'],
      ['Nós ___ cansados', 'estamos'], ['Eles ___ amigos', 'são'], ['Ela ___ em casa', 'está'],
    ];
    for (let i = 0; i < n; i++) {
      const [q, ans] = pick(ctxs);
      exs.push(mc(u, T(`Completa: ${q}`, `Complete: ${q}`, `Ergänze: ${q}`), shuffle(['é', 'está', 'sou', 'estou', 'somos', 'estamos', 'são', 'estão']), ans, 1, i));
    }
    return exs;
  }
  function pluralUnit(u, n) {
    const exs = [];
    const words = [
      ['casa', 'casas'], ['livro', 'livros'], ['cachorro', 'cachorros'], ['gato', 'gatos'], ['flor', 'flores'],
      ['pão', 'pães'], ['coração', 'corações'], ['canção', 'canções'], ['leão', 'leões'], ['mês', 'meses'],
      ['feliz', 'felizes'], ['luz', 'luzes'], ['nariz', 'narizes'], ['cruz', 'cruzes'], ['jovem', 'jovens'],
      ['homem', 'homens'], ['pão', 'pães'], ['animal', 'animais'], ['papel', 'papéis'], ['azul', 'azuis'],
    ];
    for (let i = 0; i < n; i++) {
      const [sg, pl] = pick(words);
      const wrongs = pickN(words.filter(x => x[1] !== pl), 2).map(x => x[1]);
      exs.push(mc(u, T(`¿Cuál es el plural de «${sg}»?`, `What is the plural of "${sg}"?`, `Was ist der Plural von "${sg}"?`), shuffle([pl, ...wrongs]), pl, 1, i));
    }
    return exs;
  }
  function genderUnit(u, n) {
    const exs = [];
    const nouns = [
      ['o', 'menino'], ['a', 'menina'], ['o', 'livro'], ['a', 'casa'], ['o', 'carro'], ['a', 'escola'],
      ['o', 'professor'], ['a', 'professora'], ['o', 'cachorro'], ['a', 'gata'], ['o', 'sol'], ['a', 'lua'],
      ['o', 'pão'], ['a', 'mesa'], ['o', 'relógio'], ['a', 'porta'], ['o', 'amigo'], ['a', 'amiga'],
      ['o', 'médico'], ['a', 'médica'], ['o', 'avião'], ['a', 'bicicleta'], ['o', 'trem'], ['a', 'rua'],
    ];
    for (let i = 0; i < n; i++) {
      const [g, w] = pick(nouns);
      exs.push(mc(u, T(`¿Qué artículo corresponde? __ ${w}`, `Which article? __ ${w}`, `Welcher Artikel? __ ${w}`), shuffle(['o', 'a']), g, 1, i));
    }
    return exs;
  }
  function verbUnit(u, n) {
    const exs = [];
    const verbs = [
      ['falar', ['falo', 'falas', 'fala', 'falamos', 'falam']], ['comer', ['como', 'comes', 'come', 'comemos', 'comem']],
      ['viver', ['vivo', 'vives', 'vive', 'vivemos', 'vivem']], ['cantar', ['canto', 'cantas', 'canta', 'cantamos', 'cantam']],
      ['correr', ['corro', 'corres', 'corre', 'corremos', 'correm']], ['abrir', ['abro', 'abres', 'abre', 'abrimos', 'abrem']],
      ['estudar', ['estudo', 'estudas', 'estuda', 'estudamos', 'estudam']], ['jogar', ['jogo', 'jogas', 'joga', 'jogamos', 'jogam']],
      ['beber', ['bebo', 'bebes', 'bebe', 'bebemos', 'bebem']], ['dormir', ['durmo', 'dormes', 'dorme', 'dormimos', 'dormem']],
    ];
    const P = ['eu', 'você', 'ele/ela', 'nós', 'eles'];
    for (let i = 0; i < n; i++) {
      const [v, forms] = pick(verbs);
      const person = pick(P);
      const idx = P.indexOf(person);
      const correct = forms[idx];
      const wrongs = new Set();
      let guard = 0;
      while (wrongs.size < 2 && guard++ < 50) {
        const j = ri(0, 4);
        if (j !== idx) wrongs.add(forms[j]);
      }
      exs.push(mc(u, T(`Conjuga en presente: ${person} (${v})`, `Conjugate in present: ${person} (${v})`, `Konjugiere im Präsens: ${person} (${v})`), shuffle([correct, ...wrongs]), correct, 1, i));
    }
    return exs;
  }
  function pastUnit(u, n) {
    const exs = [];
    const verbs = [
      ['falar', 'falou'], ['comer', 'comeu'], ['viver', 'viveu'], ['cantar', 'cantou'], ['correr', 'correu'],
      ['abrir', 'abriu'], ['estudar', 'estudou'], ['jogar', 'jogou'], ['beber', 'bebeu'], ['dormir', 'dormiu'],
      ['ser', 'foi'], ['ir', 'foi'], ['ter', 'teve'], ['fazer', 'fez'], ['ver', 'viu'], ['vir', 'veio'],
    ];
    for (let i = 0; i < n; i++) {
      const [base, past] = pick(verbs);
      const wrongs = pickN(verbs.filter(x => x[1] !== past), 2).map(x => x[1]);
      exs.push(mc(u, T(`Pasado de «${base}» (ele)`, `Past of "${base}" (he)`, `Vergangenheit von "${base}" (er)`), shuffle([past, ...wrongs]), past, 1, i));
    }
    return exs;
  }
  function cognateUnit(u, n) {
    const exs = [];
    const cog = [
      ['importante', 'importante'], ['diferente', 'diferente'], ['possível', 'posible'], ['família', 'familia'],
      ['escola', 'escuela'], ['telefone', 'teléfono'], ['música', 'música'], ['teatro', 'teatro'],
      ['hospital', 'hospital'], ['hotel', 'hotel'], ['restaurante', 'restaurante'], ['animal', 'animal'],
      ['problema', 'problema'], ['sistema', 'sistema'], ['programa', 'programa'], ['clima', 'clima'],
      ['planeta', 'planeta'], ['continente', 'continente'], ['oceano', 'océano'], ['montanha', 'montaña'],
    ];
    for (let i = 0; i < n; i++) {
      const [pt, es] = pick(cog);
      const wrongs = pickN(cog.filter(x => x[0] !== pt), 2).map(x => x[1]);
      exs.push(mc(u, T(`¿Qué significa «${pt}» en español?`, `What does "${pt}" mean in Spanish?`, `Was bedeutet "${pt}" auf Spanisch?`), shuffle([es, ...wrongs]), es, 1, i));
    }
    return exs;
  }
  function falseFriendUnit(u, n) {
    const exs = [];
    const ff = [
      ['embaraçada', 'avergonzada (no embarazada)'], ['exquisito', 'extraño (no exquisito)'], ['apoiar', 'apoyar'],
      ['criança', 'niño (no criatura)'], ['polvo', 'pulpo (no polvo)'], ['rato', 'ratón (no rato)'],
      ['tirar', 'sacar (no tirar)'], ['puxar', 'empujar (no jalar)'], ['esquisito', 'raro (no exquisito)'],
      ['largo', 'ancho (no largo)'], ['saco', 'bolsa (no saco)'], ['borracha', 'goma de borrar (no borracha)'],
      ['cena', 'cena (misma)'], ['fecha', 'fecha (misma)'], ['oficina', 'oficina (misma)'], ['escritório', 'oficina (no escritorio)'],
    ];
    for (let i = 0; i < n; i++) {
      const [pt, es] = pick(ff);
      const wrongs = pickN(ff.filter(x => x[0] !== pt), 2).map(x => x[1]);
      exs.push(mc(u, T(`«${pt}» en español significa...`, `"${pt}" in Spanish means...`, `"${pt}" bedeutet auf Spanisch...`), shuffle([es, ...wrongs]), es, 1, i));
    }
    return exs;
  }
  function translationUnit(u, words, n) {
    const exs = [];
    for (let i = 0; i < n; i++) {
      const w = pick(words);
      exs.push(fb(u, T(`Escribe en portugués: ${w.es}`, `Write in Portuguese: ${w.es}`, `Schreibe auf Portugiesisch: ${w.es}`), w.t, [w.t, w.t.toLowerCase()], 1, i));
    }
    return exs;
  }

  /* ---------- Bancos de vocabulario ---------- */
  const V_BASICO = [
    { es: 'manzana', t: 'maçã' }, { es: 'perro', t: 'cachorro' }, { es: 'gato', t: 'gato' }, { es: 'casa', t: 'casa' },
    { es: 'sol', t: 'sol' }, { es: 'luna', t: 'lua' }, { es: 'agua', t: 'água' }, { es: 'pan', t: 'pão' },
    { es: 'leche', t: 'leite' }, { es: 'libro', t: 'livro' }, { es: 'escuela', t: 'escola' }, { es: 'maestro', t: 'professor' },
    { es: 'niño', t: 'menino' }, { es: 'niña', t: 'menina' }, { es: 'madre', t: 'mãe' }, { es: 'padre', t: 'pai' },
    { es: 'hermano', t: 'irmão' }, { es: 'hermana', t: 'irmã' }, { es: 'amigo', t: 'amigo' }, { es: 'familia', t: 'família' },
    { es: 'rojo', t: 'vermelho' }, { es: 'azul', t: 'azul' }, { es: 'verde', t: 'verde' }, { es: 'amarillo', t: 'amarelo' },
    { es: 'negro', t: 'preto' }, { es: 'blanco', t: 'branco' }, { es: 'grande', t: 'grande' }, { es: 'pequeño', t: 'pequeno' },
    { es: 'alto', t: 'alto' }, { es: 'bajo', t: 'baixo' }, { es: 'feliz', t: 'feliz' }, { es: 'triste', t: 'triste' },
    { es: 'comer', t: 'comer' }, { es: 'beber', t: 'beber' }, { es: 'correr', t: 'correr' }, { es: 'saltar', t: 'pular' },
    { es: 'dormir', t: 'dormir' }, { es: 'caminar', t: 'andar' }, { es: 'ver', t: 'ver' }, { es: 'oír', t: 'ouvir' },
    { es: 'mano', t: 'mão' }, { es: 'pie', t: 'pé' }, { es: 'ojo', t: 'olho' }, { es: 'boca', t: 'boca' },
    { es: 'nariz', t: 'nariz' }, { es: 'oreja', t: 'orelha' }, { es: 'cabeza', t: 'cabeça' }, { es: 'pelo', t: 'cabelo' },
    { es: 'carro', t: 'carro' }, { es: 'avión', t: 'avião' }, { es: 'tren', t: 'trem' }, { es: 'barco', t: 'barco' },
    { es: 'bicicleta', t: 'bicicleta' }, { es: 'pelota', t: 'bola' }, { es: 'juguete', t: 'brinquedo' }, { es: 'juego', t: 'jogo' },
    { es: 'flor', t: 'flor' }, { es: 'árbol', t: 'árvore' }, { es: 'pájaro', t: 'pássaro' }, { es: 'pez', t: 'peixe' },
    { es: 'caballo', t: 'cavalo' }, { es: 'vaca', t: 'vaca' }, { es: 'cerdo', t: 'porco' }, { es: 'oveja', t: 'ovelha' },
    { es: 'puerta', t: 'porta' }, { es: 'ventana', t: 'janela' }, { es: 'mesa', t: 'mesa' }, { es: 'silla', t: 'cadeira' },
    { es: 'cama', t: 'cama' }, { es: 'cocina', t: 'cozinha' }, { es: 'baño', t: 'banheiro' }, { es: 'jardín', t: 'jardim' },
    { es: 'día', t: 'dia' }, { es: 'noche', t: 'noite' }, { es: 'mañana', t: 'manhã' }, { es: 'tarde', t: 'tarde' },
    { es: 'hoy', t: 'hoje' }, { es: 'ayer', t: 'ontem' }, { es: 'mañana (futuro)', t: 'amanhã' }, { es: 'ahora', t: 'agora' },
  ];
  const V_INT = [
    { es: 'lunes', t: 'segunda-feira' }, { es: 'martes', t: 'terça-feira' }, { es: 'miércoles', t: 'quarta-feira' },
    { es: 'jueves', t: 'quinta-feira' }, { es: 'viernes', t: 'sexta-feira' }, { es: 'sábado', t: 'sábado' },
    { es: 'domingo', t: 'domingo' }, { es: 'enero', t: 'janeiro' }, { es: 'febrero', t: 'fevereiro' },
    { es: 'marzo', t: 'março' }, { es: 'abril', t: 'abril' }, { es: 'mayo', t: 'maio' }, { es: 'junio', t: 'junho' },
    { es: 'julio', t: 'julho' }, { es: 'agosto', t: 'agosto' }, { es: 'septiembre', t: 'setembro' },
    { es: 'octubre', t: 'outubro' }, { es: 'noviembre', t: 'novembro' }, { es: 'diciembre', t: 'dezembro' },
    { es: 'primavera', t: 'primavera' }, { es: 'verano', t: 'verão' }, { es: 'otoño', t: 'outono' }, { es: 'invierno', t: 'inverno' },
    { es: 'ropa', t: 'roupa' }, { es: 'camisa', t: 'camisa' }, { es: 'pantalones', t: 'calças' }, { es: 'zapatos', t: 'sapatos' },
    { es: 'vestido', t: 'vestido' }, { es: 'sombrero', t: 'chapéu' }, { es: 'abrigo', t: 'casaco' }, { es: 'calcetines', t: 'meias' },
    { es: 'comida', t: 'comida' }, { es: 'fruta', t: 'fruta' }, { es: 'verdura', t: 'legume' }, { es: 'carne', t: 'carne' },
    { es: 'pollo', t: 'frango' }, { es: 'huevo', t: 'ovo' }, { es: 'queso', t: 'queijo' }, { es: 'arroz', t: 'arroz' },
    { es: 'sopa', t: 'sopa' }, { es: 'ensalada', t: 'salada' }, { es: 'dulce', t: 'doce' }, { es: 'pastel', t: 'bolo' },
    { es: 'cuerpo', t: 'corpo' }, { es: 'brazo', t: 'braço' }, { es: 'pierna', t: 'perna' }, { es: 'espalda', t: 'costas' },
    { es: 'hombro', t: 'ombro' }, { es: 'rodilla', t: 'joelho' }, { es: 'dedo', t: 'dedo' }, { es: 'diente', t: 'dente' },
    { es: 'animal', t: 'animal' }, { es: 'león', t: 'leão' }, { es: 'tigre', t: 'tigre' }, { es: 'elefante', t: 'elefante' },
    { es: 'mono', t: 'macaco' }, { es: 'oso', t: 'urso' }, { es: 'conejo', t: 'coelho' }, { es: 'serpiente', t: 'cobra' },
    { es: 'lugar', t: 'lugar' }, { es: 'ciudad', t: 'cidade' }, { es: 'pueblo', t: 'vila' }, { es: 'calle', t: 'rua' },
    { es: 'parque', t: 'parque' }, { es: 'tienda', t: 'loja' }, { es: 'mercado', t: 'mercado' }, { es: 'hospital', t: 'hospital' },
    { es: 'tiempo', t: 'tempo' }, { es: 'lluvia', t: 'chuva' }, { es: 'nieve', t: 'neve' }, { es: 'viento', t: 'vento' },
    { es: 'nube', t: 'nuvem' }, { es: 'cielo', t: 'céu' }, { es: 'caliente', t: 'quente' }, { es: 'frío', t: 'frio' },
    { es: 'rápido', t: 'rápido' }, { es: 'lento', t: 'lento' }, { es: 'nuevo', t: 'novo' }, { es: 'viejo', t: 'velho' },
    { es: 'bonito', t: 'bonito' }, { es: 'feo', t: 'feio' }, { es: 'fuerte', t: 'forte' }, { es: 'débil', t: 'fraco' },
  ];
  const V_AV = [
    { es: 'trabajo', t: 'trabalho' }, { es: 'oficina', t: 'escritório' }, { es: 'fábrica', t: 'fábrica' }, { es: 'granja', t: 'fazenda' },
    { es: 'doctor', t: 'médico' }, { es: 'enfermera', t: 'enfermeira' }, { es: 'policía', t: 'polícia' }, { es: 'bombero', t: 'bombeiro' },
    { es: 'cocinero', t: 'cozinheiro' }, { es: 'conductor', t: 'motorista' }, { es: 'cantante', t: 'cantor' }, { es: 'deporte', t: 'esporte' },
    { es: 'fútbol', t: 'futebol' }, { es: 'baloncesto', t: 'basquete' }, { es: 'tenis', t: 'tênis' }, { es: 'natación', t: 'natação' },
    { es: 'música', t: 'música' }, { es: 'canción', t: 'canção' }, { es: 'guitarra', t: 'violão' }, { es: 'piano', t: 'piano' },
    { es: 'violín', t: 'violino' }, { es: 'batería', t: 'bateria' }, { es: 'flauta', t: 'flauta' }, { es: 'cantar', t: 'cantar' },
    { es: 'bailar', t: 'dançar' }, { es: 'dibujar', t: 'desenhar' }, { es: 'pintar', t: 'pintar' }, { es: 'escribir', t: 'escrever' },
    { es: 'leer', t: 'ler' }, { es: 'estudiar', t: 'estudar' }, { es: 'aprender', t: 'aprender' }, { es: 'enseñar', t: 'ensinar' },
    { es: 'preguntar', t: 'perguntar' }, { es: 'responder', t: 'responder' }, { es: 'ayudar', t: 'ajudar' }, { es: 'comprar', t: 'comprar' },
    { es: 'vender', t: 'vender' }, { es: 'pagar', t: 'pagar' }, { es: 'dinero', t: 'dinheiro' }, { es: 'precio', t: 'preço' },
    { es: 'barato', t: 'barato' }, { es: 'caro', t: 'caro' }, { es: 'supermercado', t: 'supermercado' }, { es: 'restaurante', t: 'restaurante' },
    { es: 'hotel', t: 'hotel' }, { es: 'banco', t: 'banco' }, { es: 'biblioteca', t: 'biblioteca' }, { es: 'museo', t: 'museu' },
    { es: 'cine', t: 'cinema' }, { es: 'teatro', t: 'teatro' }, { es: 'estadio', t: 'estádio' }, { es: 'montaña', t: 'montanha' },
    { es: 'río', t: 'rio' }, { es: 'lago', t: 'lago' }, { es: 'mar', t: 'mar' }, { es: 'playa', t: 'praia' },
    { es: 'bosque', t: 'floresta' }, { es: 'desierto', t: 'deserto' }, { es: 'isla', t: 'ilha' }, { es: 'puente', t: 'ponte' },
    { es: 'camino', t: 'estrada' }, { es: 'mapa', t: 'mapa' }, { es: 'viaje', t: 'viagem' }, { es: 'salud', t: 'saúde' },
    { es: 'enfermedad', t: 'doença' }, { es: 'fiebre', t: 'febre' }, { es: 'tos', t: 'tosse' }, { es: 'dolor', t: 'dor' },
    { es: 'medicina', t: 'remédio' }, { es: 'pastilla', t: 'comprimido' }, { es: 'ejercicio', t: 'exercício' }, { es: 'dieta', t: 'dieta' },
    { es: 'medio ambiente', t: 'meio ambiente' }, { es: 'contaminación', t: 'poluição' }, { es: 'reciclar', t: 'reciclar' },
    { es: 'basura', t: 'lixo' }, { es: 'plástico', t: 'plástico' }, { es: 'papel', t: 'papel' }, { es: 'vidrio', t: 'vidro' },
    { es: 'naturaleza', t: 'natureza' }, { es: 'planeta', t: 'planeta' }, { es: 'tierra', t: 'terra' }, { es: 'tecnología', t: 'tecnologia' },
    { es: 'computadora', t: 'computador' }, { es: 'teléfono', t: 'telefone' }, { es: 'internet', t: 'internet' }, { es: 'pantalla', t: 'tela' },
    { es: 'teclado', t: 'teclado' }, { es: 'ratón', t: 'mouse' }, { es: 'aplicación', t: 'aplicativo' }, { es: 'mensaje', t: 'mensagem' },
    { es: 'correo', t: 'e-mail' }, { es: 'foto', t: 'foto' }, { es: 'video', t: 'vídeo' }, { es: 'noticia', t: 'notícia' },
  ];

  /* ===== Nivel básico ===== */
  {
    const l = addLevel(s, 'portugues-basico', 'Básico', 'Basic', 'Grundstufe');
    addUnit(s, l, 'Palabras esenciales', 'Essential words', 'Grundwortschatz', (u) => vocabUnit(u, 'portugués', V_BASICO, { allowFB: true }));
    addUnit(s, l, 'Los números 1-50', 'Numbers 1-50', 'Zahlen 1-50', (u) => numberUnit(u, 1, 50, 250));
    addUnit(s, l, 'Los colores', 'Colors', 'Farben', (u) => {
      const exs = [];
      const colors = [['rojo', 'vermelho'], ['azul', 'azul'], ['verde', 'verde'], ['amarillo', 'amarelo'], ['negro', 'preto'], ['blanco', 'branco'], ['naranja', 'laranja'], ['rosa', 'rosa'], ['morado', 'roxo'], ['marrón', 'marrom'], ['gris', 'cinza'], ['dorado', 'dourado']];
      for (let i = 0; i < 150; i++) {
        const [es, pt] = pick(colors);
        const wrongs = pickN(colors.filter(x => x[1] !== pt), 2).map(x => x[1]);
        exs.push(mc(u, T(`¿Cómo se dice «${es}» en portugués?`, `How do you say "${es}" in Portuguese?`, `Wie sagt man "${es}" auf Portugiesisch?`), shuffle([pt, ...wrongs]), pt, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Saludos y cortesía', 'Greetings', 'Begrüßungen', (u) => {
      const exs = [];
      const g = [['hola', 'olá'], ['adiós', 'tchau'], ['por favor', 'por favor'], ['gracias', 'obrigado'], ['buenos días', 'bom dia'], ['buenas tardes', 'boa tarde'], ['buenas noches', 'boa noite'], ['sí', 'sim'], ['no', 'não'], ['perdón', 'desculpa'], ['de nada', 'de nada'], ['hasta luego', 'até logo']];
      for (let i = 0; i < 150; i++) {
        const [es, pt] = pick(g);
        const wrongs = pickN(g.filter(x => x[1] !== pt), 2).map(x => x[1]);
        exs.push(mc(u, T(`¿Cómo se dice «${es}» en portugués?`, `How do you say "${es}" in Portuguese?`, `Wie sagt man "${es}" auf Portugiesisch?`), shuffle([pt, ...wrongs]), pt, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Ser y estar', 'Ser and estar', 'Ser und estar', (u) => serEstarUnit(u, 250));
    addUnit(s, l, 'Plurales', 'Plurals', 'Pluralformen', (u) => pluralUnit(u, 250));
    addUnit(s, l, 'O y A (género)', 'O and A (gender)', 'O und A (Geschlecht)', (u) => genderUnit(u, 250));
    addUnit(s, l, 'Verbos en presente', 'Verbs in present', 'Verben im Präsens', (u) => verbUnit(u, 250));
    addUnit(s, l, 'Escribe en portugués', 'Write in Portuguese', 'Schreibe auf Portugiesisch', (u) => translationUnit(u, V_BASICO, 250));
  }

  /* ===== Nivel intermedio ===== */
  {
    const l = addLevel(s, 'portugues-intermedio', 'Intermedio', 'Intermediate', 'Mittelstufe');
    addUnit(s, l, 'Días y meses', 'Days and months', 'Tage und Monate', (u) => vocabUnit(u, 'portugués', V_INT.filter(w => ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La ropa', 'Clothes', 'Kleidung', (u) => vocabUnit(u, 'portugués', V_INT.filter(w => ['roupa', 'camisa', 'calças', 'sapatos', 'vestido', 'chapéu', 'casaco', 'meias'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La comida', 'Food', 'Essen', (u) => vocabUnit(u, 'portugués', V_INT.filter(w => ['comida', 'fruta', 'legume', 'carne', 'frango', 'ovo', 'queijo', 'arroz', 'sopa', 'salada', 'doce', 'bolo'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'El cuerpo', 'The body', 'Der Körper', (u) => vocabUnit(u, 'portugués', V_INT.filter(w => ['corpo', 'braço', 'perna', 'costas', 'ombro', 'joelho', 'dedo', 'dente'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Los animales', 'Animals', 'Tiere', (u) => vocabUnit(u, 'portugués', V_INT.filter(w => ['animal', 'leão', 'tigre', 'elefante', 'macaco', 'urso', 'coelho', 'cobra'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Números 50-1000', 'Numbers 50-1000', 'Zahlen 50-1000', (u) => numberUnit(u, 50, 999, 250));
    addUnit(s, l, 'Pasado simple', 'Past simple', 'Einfache Vergangenheit', (u) => pastUnit(u, 250));
    addUnit(s, l, 'Cognados', 'Cognates', 'Verwandte Wörter', (u) => cognateUnit(u, 250));
    addUnit(s, l, 'El tiempo atmosférico', 'Weather', 'Wetter', (u) => {
      const exs = [];
      const w = [['lluvia', 'chuva'], ['nieve', 'neve'], ['viento', 'vento'], ['nube', 'nuvem'], ['cielo', 'céu'], ['sol', 'sol'], ['tormenta', 'tempestade'], ['niebla', 'névoa']];
      for (let i = 0; i < 150; i++) {
        const [es, pt] = pick(w);
        const wrongs = pickN(w.filter(x => x[1] !== pt), 2).map(x => x[1]);
        exs.push(mc(u, T(`¿Cómo se dice «${es}» en portugués?`, `How do you say "${es}" in Portuguese?`, `Wie sagt man "${es}" auf Portugiesisch?`), shuffle([pt, ...wrongs]), pt, 1, i));
      }
      return exs;
    });
    addUnit(s, l, 'Escribe en portugués', 'Write in Portuguese', 'Schreibe auf Portugiesisch', (u) => translationUnit(u, V_INT, 250));
  }

  /* ===== Nivel avanzado ===== */
  {
    const l = addLevel(s, 'portugues-avanzado', 'Avanzado', 'Advanced', 'Fortgeschritten');
    addUnit(s, l, 'Profesiones', 'Jobs', 'Berufe', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['trabalho', 'escritório', 'fábrica', 'fazenda', 'médico', 'enfermeira', 'polícia', 'bombeiro', 'cozinheiro', 'motorista', 'cantor'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Deportes y música', 'Sports and music', 'Sport und Musik', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['esporte', 'futebol', 'basquete', 'tênis', 'natação', 'música', 'canção', 'violão', 'piano', 'violino', 'bateria', 'flauta'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Verbos de acción', 'Action verbs', 'Aktionsverben', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['cantar', 'dançar', 'desenhar', 'pintar', 'escrever', 'ler', 'estudar', 'aprender', 'ensinar', 'perguntar', 'responder', 'ajudar', 'comprar', 'vender', 'pagar'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La ciudad', 'The city', 'Die Stadt', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['supermercado', 'restaurante', 'hotel', 'banco', 'biblioteca', 'museu', 'cinema', 'teatro', 'estádio'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'La naturaleza', 'Nature', 'Natur', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['montanha', 'rio', 'lago', 'mar', 'praia', 'floresta', 'deserto', 'ilha', 'ponte', 'estrada', 'mapa', 'viagem'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Salud y medio ambiente', 'Health and environment', 'Gesundheit und Umwelt', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['saúde', 'doença', 'febre', 'tosse', 'dor', 'remédio', 'comprimido', 'exercício', 'dieta', 'meio ambiente', 'poluição', 'reciclar', 'lixo', 'plástico', 'papel', 'vidro', 'natureza', 'planeta', 'terra'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Tecnología', 'Technology', 'Technologie', (u) => vocabUnit(u, 'portugués', V_AV.filter(w => ['tecnologia', 'computador', 'telefone', 'internet', 'tela', 'teclado', 'mouse', 'aplicativo', 'mensagem', 'e-mail', 'foto', 'vídeo', 'notícia'].includes(w.t)), { allowFB: false }));
    addUnit(s, l, 'Falsos amigos', 'False friends', 'Falsche Freunde', (u) => falseFriendUnit(u, 250));
    addUnit(s, l, 'Verbos en pasado', 'Verbs in past', 'Verben in der Vergangenheit', (u) => pastUnit(u, 250));
    addUnit(s, l, 'Escribe en portugués', 'Write in Portuguese', 'Schreibe auf Portugiesisch', (u) => translationUnit(u, V_AV, 250));
  }
};