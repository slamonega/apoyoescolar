/* ===== Apoyo Escolar - App JS ===== */
const STORAGE_KEY = 'anton_progress_v1';

const state = {
  lang: 'es',
  subjects: [],
  currentSubject: null,
  currentLevel: null,
  currentUnit: null,
  currentExercises: [],
  exerciseIndex: 0,
  currentExercise: null,
  matchSelected: null,
  lastResult: null,
  progress: null,   // { points, done, byUnit: {unitId: [exIds]}, streak: {current, best, lastActive} }
  unitTotals: {},   // {unitId: totalExercises}
};

// ===== Progreso local (localStorage) =====
function defaultProgress() {
  return {
    points: 0,
    done: 0,
    byUnit: {},
    streak: { current: 0, best: 0, lastActive: null },
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      state.progress = { ...defaultProgress(), ...p, streak: { ...defaultProgress().streak, ...(p.streak || {}) } };
      return;
    }
  } catch (e) { /* ignorar */ }
  state.progress = defaultProgress();
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (e) { /* ignorar */ }
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function yesterdayStr() {
  const d = new Date(Date.now() - 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function recordCorrect(ex) {
  const p = state.progress;
  const today = todayStr();
  // Racha (misma lógica que el backend)
  const s = p.streak;
  if (s.lastActive !== today) {
    s.current = s.lastActive === yesterdayStr() ? s.current + 1 : 1;
    s.best = Math.max(s.best, s.current);
    s.lastActive = today;
  }
  // Puntos y ejercicios completados
  p.points += ex.points;
  p.done += 1;
  if (!p.byUnit[ex.unit_id]) p.byUnit[ex.unit_id] = [];
  if (!p.byUnit[ex.unit_id].includes(ex.id)) p.byUnit[ex.unit_id].push(ex.id);
  saveProgress();
}

const I18N = {
  es: {
    login: 'Iniciar sesión', register: 'Crear cuenta nueva',
    student: 'Estudiante', teacher: 'Docente',
    subjects: 'Materias', levels: 'Niveles', units: 'Unidades',
    exercises: 'ejercicios', progress: 'Mi progreso', teacherPanel: 'Panel docente',
    correct: '¡Correcto!', incorrect: '¡Inténtalo de nuevo!',
    points: 'puntos', streak: 'racha', bestStreak: 'mejor racha',
    done: 'completados', totalPoints: 'puntos totales',
    next: 'Continuar', tryAgain: 'Reintentar',
    back: 'Volver', logout: 'Salir',
    welcome: '¡Hola', chooseSubject: 'Elige una materia',
    chooseLevel: 'Elige un nivel', chooseUnit: 'Elige una unidad',
    chooseExercise: 'Elige un ejercicio', noExercises: 'Pronto habrá más temas.',
    createClass: 'Crear clase', joinClass: 'Unirse a clase',
    assign: 'Asignar tarea', myClasses: 'Mis clases',
    joinCode: 'Código de clase', className: 'Nombre de la clase',
    assignmentTitle: 'Título de la tarea', dueDate: 'Fecha de entrega',
    create: 'Crear', join: 'Unirse', assignBtn: 'Asignar',
    correctAnswer: '¡Respuesta correcta!', wrongAnswer: 'Respuesta incorrecta',
    fillHint: 'Escribe tu respuesta', check: 'Comprobar',
    matchHint: 'Toca un elemento de la izquierda y luego su pareja',
    matchDone: '¡Todo emparejado!',
  },
  en: {
    login: 'Log in', register: 'Create account',
    student: 'Student', teacher: 'Teacher',
    subjects: 'Subjects', levels: 'Levels', units: 'Units',
    exercises: 'exercises', progress: 'My progress', teacherPanel: 'Teacher panel',
    correct: 'Correct!', incorrect: 'Try again!',
    points: 'points', streak: 'streak', bestStreak: 'best streak',
    done: 'completed', totalPoints: 'total points',
    next: 'Continue', tryAgain: 'Retry',
    back: 'Back', logout: 'Log out',
    welcome: 'Hello', chooseSubject: 'Choose a subject',
    chooseLevel: 'Choose a level', chooseUnit: 'Choose a unit',
    chooseExercise: 'Choose an exercise', noExercises: 'More topics coming soon.',
    createClass: 'Create class', joinClass: 'Join class',
    assign: 'Assign task', myClasses: 'My classes',
    joinCode: 'Class code', className: 'Class name',
    assignmentTitle: 'Assignment title', dueDate: 'Due date',
    create: 'Create', join: 'Join', assignBtn: 'Assign',
    correctAnswer: 'Correct answer!', wrongAnswer: 'Wrong answer',
    fillHint: 'Type your answer', check: 'Check',
    matchHint: 'Tap an item on the left, then its match',
    matchDone: 'All matched!',
  },
  de: {
    login: 'Anmelden', register: 'Konto erstellen',
    student: 'Schüler', teacher: 'Lehrer',
    subjects: 'Fächer', levels: 'Klassen', units: 'Einheiten',
    exercises: 'Übungen', progress: 'Mein Fortschritt', teacherPanel: 'Lehrerbereich',
    correct: 'Richtig!', incorrect: 'Nochmal versuchen!',
    points: 'Punkte', streak: 'Serie', bestStreak: 'beste Serie',
    done: 'erledigt', totalPoints: 'Gesamtpunkte',
    next: 'Weiter', tryAgain: 'Erneut',
    back: 'Zurück', logout: 'Abmelden',
    welcome: 'Hallo', chooseSubject: 'Wähle ein Fach',
    chooseLevel: 'Wähle eine Klasse', chooseUnit: 'Wähle eine Einheit',
    chooseExercise: 'Wähle eine Übung', noExercises: 'Weitere Themen folgen bald.',
    createClass: 'Klasse erstellen', joinClass: 'Klasse beitreten',
    assign: 'Aufgabe zuweisen', myClasses: 'Meine Klassen',
    joinCode: 'Klassencode', className: 'Klassenname',
    assignmentTitle: 'Aufgabentitel', dueDate: 'Abgabedatum',
    create: 'Erstellen', join: 'Beitreten', assignBtn: 'Zuweisen',
    correctAnswer: 'Richtige Antwort!', wrongAnswer: 'Falsche Antwort',
    fillHint: 'Tippe deine Antwort', check: 'Prüfen',
    matchHint: 'Tippe links ein Element, dann sein Paar',
    matchDone: 'Alles zugeordnet!',
  },
};

const t = (key) => (I18N[state.lang] || I18N.es)[key] || key;

// Traducción de campos del catálogo (name_es/name_en/name_de, title_*, prompt_*)
function tr(obj, field) {
  return obj[field + '_' + state.lang] || obj[field + '_es'];
}

// Escapar texto para HTML (evita romper el DOM con <, >, &, ")
function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Escapar string JS dentro de un atributo onclick="..."
function escJsAttr(s) {
  return escHtml(s).replace(/'/g, "\\'");
}

// ===== Utilidades =====
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function el(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

// ===== Catálogo local (sin servidor) =====
const CAT = window.CATALOG;

function getSubject(code) {
  return CAT.subjects.find(s => s.code === code);
}

function getSubjectById(id) {
  return CAT.subjects.find(s => s.id === Number(id));
}

function getLevel(code) {
  return CAT.levels.find(l => l.code === code);
}

function getLevelById(id) {
  return CAT.levels.find(l => l.id === Number(id));
}

function getUnit(id) {
  return CAT.units.find(u => u.id === Number(id));
}

function getExercise(id) {
  return CAT.exercises.find(e => e.id === Number(id));
}

function getLevelsForSubject(subjectId) {
  return CAT.levels
    .map(l => ({
      ...l,
      unit_count: CAT.units.filter(u => u.subject_id === subjectId && u.level_id === l.id).length,
    }))
    .filter(l => l.unit_count > 0);
}

function getUnitsFor(subjectId, levelId) {
  return CAT.units
    .filter(u => u.subject_id === subjectId && u.level_id === levelId)
    .map(u => ({ ...u, exercise_count: CAT.exercises.filter(e => e.unit_id === u.id).length }));
}

function getExercisesForUnit(unitId) {
  return CAT.exercises
    .filter(e => e.unit_id === Number(unitId))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(({ payload, ...rest }) => rest);
}

// ===== Init =====
function initApp() {
  loadProgress();
  state.subjects = CAT.subjects;
  renderStats();
  showSubjects();
}

// ===== Selector de idioma =====
function setLang(lang) {
  state.lang = lang;
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
  // Re-render de la vista actual
  if (state.currentUnit) showExercises(state.currentUnit.id);
  else if (state.currentLevel) showUnits(state.currentSubject.code, state.currentLevel.code);
  else if (state.currentSubject) showLevels(state.currentSubject.code);
  else showSubjects();
  renderStats();
}

// ===== Stats bar =====
function renderStats() {
  const p = state.progress;
  const bar = document.getElementById('stats-bar');
  bar.innerHTML = `
    <div class="stat-pill"><span class="s-icon">⭐</span> ${p.points} ${t('points')}</div>
    <div class="stat-pill"><span class="s-icon">✅</span> ${p.done} ${t('done')}</div>
    <div class="stat-pill"><span class="s-icon">🔥</span> ${p.streak.current} ${t('streak')}</div>
    <div class="stat-pill"><span class="s-icon">🏆</span> ${p.streak.best} ${t('bestStreak')}</div>
  `;
}

// ===== Breadcrumb =====
function setBreadcrumb(items) {
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = items.map((it, i) => {
    const sep = i > 0 ? '<span class="sep">›</span>' : '';
    const cls = it.action ? 'crumb' : '';
    const onclick = it.action ? `onclick="${it.action}"` : '';
    return `${sep}<span class="${cls}" ${onclick}>${it.label}</span>`;
  }).join('');
}

// ===== Vistas =====
function showSubjects() {
  setBreadcrumb([{ label: '🎓 Apoyo Escolar' }]);
  const page = document.getElementById('page');
  page.innerHTML = `<h1 class="page-title">🎉 ${t('welcome')}!</h1>
    <h2 class="page-title" style="font-size:1.1em;color:var(--scout-texto-claro);">${t('chooseSubject')}</h2>
    <div class="subject-list">${state.subjects.map(s => `
      <div class="subject-tile" data-subject="${s.code}" onclick="showLevels('${s.code}')">
        <div class="icon">${s.icon}</div>
        <div class="name">${escHtml(tr(s, 'name'))}</div>
      </div>`).join('')}
    </div>`;
}

function showLevels(subjectCode) {
  const subject = getSubject(subjectCode);
  const levels = getLevelsForSubject(subject.id);
  state.currentSubject = subject;
  setBreadcrumb([
    { label: '🎓 Apoyo Escolar', action: 'showSubjects()' },
    { label: tr(subject, 'name') },
  ]);
  const page = document.getElementById('page');
  page.innerHTML = `<h1 class="page-title">${subject.icon} ${escHtml(tr(subject, 'name'))}</h1>
    <h2 class="page-title" style="font-size:1.1em;color:var(--scout-texto-claro);">${t('chooseLevel')}</h2>
    <div class="level-list">${levels.map(l => `
      <div class="level-tile" onclick="showUnits('${subject.code}','${l.code}')">
        <div class="icon">🎒</div>
        <div class="name">${escHtml(tr(l, 'name'))}</div>
        <div class="count">${l.unit_count} ${t('units').toLowerCase()}</div>
      </div>`).join('')}
    </div>`;
}

function showUnits(subjectCode, levelCode) {
  const subject = getSubject(subjectCode);
  const level = getLevel(levelCode);
  const units = getUnitsFor(subject.id, level.id);
  state.currentLevel = level;
  setBreadcrumb([
    { label: '🎓 Apoyo Escolar', action: 'showSubjects()' },
    { label: tr(subject, 'name'), action: `showLevels('${subject.code}')` },
    { label: tr(level, 'name') },
  ]);
  const page = document.getElementById('page');
  page.innerHTML = `<h1 class="page-title">${subject.icon} ${escHtml(tr(subject, 'name'))} · ${escHtml(tr(level, 'name'))}</h1>
    <div class="unit-block">
      ${units.map(u => {
        const doneIds = state.progress.byUnit[u.id] || [];
        const unitDone = doneIds.length >= u.exercise_count;
        return `
        <div class="unit-title"><span class="u-icon">📚</span> ${escHtml(tr(u, 'title'))}
          <span class="unit-progress">(${u.exercise_count} ${t('exercises')})</span>
        </div>
        <div class="topic-row" onclick="showExercises(${u.id})">
          <div class="t-icon">${unitDone ? '✅' : '📝'}</div>
          <div class="t-info">
            <div class="t-name">${escHtml(tr(u, 'title'))}</div>
            <div class="t-desc">${doneIds.length}/${u.exercise_count} ${t('exercises')}</div>
          </div>
          <div class="t-count">→</div>
        </div>`;
      }).join('')}
    </div>`;
}

function showExercises(unitId) {
  const unit = getUnit(unitId);
  const exercises = getExercisesForUnit(unitId);
  state.currentUnit = unit;
  state.currentExercises = exercises;
  state.unitTotals[unitId] = exercises.length;
  setBreadcrumb([
    { label: '🎓 Apoyo Escolar', action: 'showSubjects()' },
    { label: tr(state.currentSubject, 'name'), action: `showLevels('${state.currentSubject.code}')` },
    { label: tr(state.currentLevel, 'name'), action: `showUnits('${state.currentSubject.code}','${state.currentLevel.code}')` },
    { label: tr(unit, 'title') },
  ]);
  const page = document.getElementById('page');
  if (!exercises.length) {
    page.innerHTML = `<h1 class="page-title">${escHtml(tr(unit, 'title'))}</h1><p style="color:var(--scout-texto-claro);">${t('noExercises')}</p>`;
    return;
  }
  const doneIds = state.progress.byUnit[unitId] || [];
  page.innerHTML = `<h1 class="page-title">📚 ${escHtml(tr(unit, 'title'))}</h1>
    <div class="exercise-list">${exercises.map((e, i) => {
      const done = doneIds.includes(e.id);
      return `<div class="exercise-card ${done ? 'done' : ''}" onclick="startExercise(${i})">
        <div class="e-icon">${done ? '✅' : typeIcon(e.type)}</div>
        <div class="e-name">${escHtml(tr(e, 'prompt'))}</div>
        <div class="e-type">${typeName(e.type)}</div>
      </div>`;
    }).join('')}
    </div>`;
}

function typeIcon(type) {
  return { multiple_choice: '🔘', fill_blank: '✏️', true_false: '✅', drag_match: '🧩' }[type] || '📝';
}
function typeName(type) {
  const names = { multiple_choice: 'Opción múltiple', fill_blank: 'Completar', true_false: 'Verdadero/Falso', drag_match: 'Emparejar' };
  return names[type] || type;
}

// ===== Player =====
function startExercise(index) {
  state.exerciseIndex = index;
  const ex = state.currentExercises[index];
  state.currentExercise = getExercise(ex.id);
  renderExercise();
}

function renderExercise() {
  const ex = state.currentExercise;
  const payload = JSON.parse(ex.payload);
  const page = document.getElementById('page');
  const prompt = ex['prompt_' + state.lang] || ex.prompt_es;
  matchPairs = []; // reiniciar estado de emparejado entre ejercicios

  let visual = '';
  if (payload.image === 'apples') visual = `<div class="visual"><div class="emoji-row">🍎🍎</div></div>`;
  else if (payload.image === 'dice') visual = `<div class="visual"><div class="emoji-row">⚀⚁</div></div>`;
  else if (payload.image === 'sheep') visual = `<div class="visual"><div class="emoji-row">🐑🐑🐑</div></div>`;
  else if (payload.image === 'number') visual = `<div class="visual"><div class="big-number">${payload.number}</div></div>`;
  else if (payload.image === 'shapes') visual = `<div class="visual"><div class="emoji-row">△ □ ○</div></div>`;

  let body = '';
  if (ex.type === 'multiple_choice') {
    body = `<div class="options-grid">${payload.options.map((opt, i) => `
      <button class="option-btn" onclick="answerMC(${i})">${opt}</button>`).join('')}
    </div>`;
  } else if (ex.type === 'fill_blank') {
    body = `<div style="text-align:center;">
      <input class="fill-input" id="fill-input" placeholder="?" onkeydown="if(event.key==='Enter')checkFill()" />
      <div style="margin-top:1em;"><button class="btn btn-primary" onclick="checkFill()">${t('check')}</button></div>
    </div>`;
  } else if (ex.type === 'true_false') {
    body = `<div class="tf-grid">
      <button class="tf-btn" onclick="answerTF(true)">✅ Verdadero</button>
      <button class="tf-btn" onclick="answerTF(false)">❌ Falso</button>
    </div>`;
  } else if (ex.type === 'drag_match') {
    state.matchSelected = null;
    const left = payload.pairs.map(p => p[0]);
    const right = payload.pairs.map(p => p[1]).sort(() => Math.random() - 0.5);
    body = `<div class="match-area">
      <div class="match-col"><h4>${t('matchHint').split(',')[0]}</h4>
        ${left.map((l, i) => `<div class="match-item" data-side="left" data-idx="${i}" onclick="matchClick(this)">${l}</div>`).join('')}
      </div>
      <div class="match-col"><h4>${t('matchHint').split(',')[1] || ''}</h4>
        ${right.map((r, i) => `<div class="match-item" data-side="right" data-val="${r}" onclick="matchClick(this)">${r}</div>`).join('')}
      </div>
    </div>`;
  }

  page.innerHTML = `<div class="player">
    <div class="instruction">
      <button class="speaker" onclick="speak('${escJsAttr(prompt)}')">🔊</button>
      <span>${escHtml(prompt)}</span>
    </div>
    ${visual}
    ${body}
  </div>`;
  if (ex.type === 'fill_blank') setTimeout(() => document.getElementById('fill-input').focus(), 100);
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = state.lang === 'es' ? 'es-ES' : state.lang === 'de' ? 'de-DE' : 'en-US';
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
}

// ===== Respuestas =====
function answerMC(idx) {
  const payload = JSON.parse(state.currentExercise.payload);
  const correct = idx === payload.correct;
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach((b, i) => {
    b.classList.add(i === payload.correct ? 'correct' : 'wrong');
    b.disabled = true;
  });
  submitResult(correct, payload.options[idx]);
}

function answerTF(val) {
  const payload = JSON.parse(state.currentExercise.payload);
  const correct = val === payload.answer;
  const btns = document.querySelectorAll('.tf-btn');
  btns.forEach((b, i) => {
    const clicked = (val && i === 0) || (!val && i === 1);
    if (clicked) b.classList.add(correct ? 'correct' : 'wrong');
    else if (correct) b.classList.add('wrong'); // mostrar la respuesta correcta
    b.disabled = true;
  });
  submitResult(correct, String(val));
}

function checkFill() {
  const input = document.getElementById('fill-input');
  const val = input.value.trim().toLowerCase();
  const payload = JSON.parse(state.currentExercise.payload);
  const accept = (payload.accept || [payload.answer]).map(a => String(a).toLowerCase());
  const correct = accept.includes(val);
  input.style.borderColor = correct ? 'var(--scout-exito)' : 'var(--scout-error)';
  input.disabled = true;
  submitResult(correct, input.value.trim());
}

let matchPairs = [];
function matchClick(item) {
  const payload = JSON.parse(state.currentExercise.payload);
  if (item.classList.contains('matched')) return;
  if (item.dataset.side === 'left') {
    document.querySelectorAll('.match-item.selected').forEach(x => x.classList.remove('selected'));
    item.classList.add('selected');
    state.matchSelected = item;
  } else {
    if (!state.matchSelected) return;
    const left = state.matchSelected;
    const leftVal = payload.pairs[left.dataset.idx][0];
    const rightVal = item.dataset.val;
    const correct = payload.pairs[left.dataset.idx][1] === rightVal;
    if (correct) {
      left.classList.remove('selected');
      left.classList.add('matched');
      item.classList.add('matched');
      matchPairs.push(leftVal + '=' + rightVal);
      if (matchPairs.length === payload.pairs.length) {
        setTimeout(() => submitResult(true, matchPairs.join(',')), 400);
      }
    } else {
      left.classList.remove('selected');
      left.classList.add('wrong');
      item.classList.add('wrong');
      setTimeout(() => {
        left.classList.remove('wrong');
        item.classList.remove('wrong');
      }, 600);
    }
    state.matchSelected = null;
  }
}

function submitResult(correct, response) {
  const ex = state.currentExercise;
  const points = correct ? ex.points : 0;
  if (correct) recordCorrect(ex);
  state.lastResult = { correct, points };
  // Registrar en xAPI (statement estándar; cola offline + LRS si está configurado)
  try {
    XAPI.recordAnswer(ex, correct, response, points);
  } catch (e) { /* xAPI es opcional */ }
  showFeedback(correct, points);
  renderStats();
}

function showFeedback(correct, points) {
  document.getElementById('fb-emoji').textContent = correct ? '🎉' : '😅';
  document.getElementById('fb-title').textContent = correct ? t('correct') : t('incorrect');
  document.getElementById('fb-stars').textContent = correct ? '⭐⭐⭐' : '⭐';
  document.getElementById('fb-points').textContent = correct ? `+${points} ${t('points')}` : `+0 ${t('points')}`;
  document.getElementById('fb-next').textContent = correct ? t('next') : t('tryAgain');
  document.getElementById('feedback').classList.add('show');
}

function nextExercise() {
  document.getElementById('feedback').classList.remove('show');
  if (state.lastResult && !state.lastResult.correct) {
    // Reintentar el mismo ejercicio
    startExercise(state.exerciseIndex);
    return;
  }
  const next = state.exerciseIndex + 1;
  if (next < state.currentExercises.length) {
    startExercise(next);
  } else {
    // Unidad completada: statement xAPI "completed"
    const done = (state.progress.byUnit[state.currentUnit.id] || []).length;
    try {
      XAPI.recordUnitCompleted(state.currentUnit.id, tr(state.currentUnit, 'title'), done, state.currentExercises.length);
    } catch (e) { /* xAPI es opcional */ }
    toast('🎉 ¡Unidad completada!');
    showExercises(state.currentUnit.id);
  }
}

// ===== Configuración xAPI (LRS) =====
function openXAPISettings() {
  const cfg = XAPI.getConfig();
  document.getElementById('xapi-name').value = cfg.learnerName || '';
  document.getElementById('xapi-email').value = cfg.learnerEmail || '';
  document.getElementById('xapi-endpoint').value = cfg.endpoint || '';
  document.getElementById('xapi-username').value = cfg.username || '';
  document.getElementById('xapi-password').value = cfg.password || '';
  document.getElementById('xapi-status').textContent = '';
  document.getElementById('xapi-modal').classList.add('show');
}

function saveXAPISettings() {
  XAPI.setConfig({
    learnerName: document.getElementById('xapi-name').value.trim(),
    learnerEmail: document.getElementById('xapi-email').value.trim(),
    endpoint: document.getElementById('xapi-endpoint').value.trim().replace(/\/$/, ''),
    username: document.getElementById('xapi-username').value.trim(),
    password: document.getElementById('xapi-password').value,
  });
  document.getElementById('xapi-modal').classList.remove('show');
  toast('✅ Configuración xAPI guardada');
}

async function flushXAPI() {
  const res = await XAPI.flush();
  document.getElementById('xapi-status').textContent =
    `Enviados: ${res.sent} · Pendientes: ${res.pending}`;
}

// ===== Progreso =====
function goToUnit(uid) {
  const unit = getUnit(uid);
  if (!unit) return;
  state.currentSubject = getSubjectById(unit.subject_id);
  state.currentLevel = getLevelById(unit.level_id);
  showExercises(uid);
}

function showProgress() {
  const p = state.progress;
  setBreadcrumb([
    { label: '🎓 Apoyo Escolar', action: 'showSubjects()' },
    { label: t('progress') },
  ]);
  const page = document.getElementById('page');
  // Unidades con avance
  const unitIds = Object.keys(p.byUnit).map(Number);
  const rows = unitIds.map(uid => {
    const done = p.byUnit[uid].length;
    const unit = getUnit(uid);
    const total = state.unitTotals[uid] || (unit ? CAT.exercises.filter(e => e.unit_id === uid).length : 0);
    const pct = total ? Math.round(done / total * 100) : 0;
    return { uid, title: unit ? tr(unit, 'title') : `Unidad ${uid}`, done, total, pct };
  });
  page.innerHTML = `<h1 class="page-title">📊 ${t('progress')}</h1>
    <div class="progress-grid">
      <div class="progress-card"><div class="p-icon">⭐</div><div class="p-value">${p.points}</div><div class="p-label">${t('totalPoints')}</div></div>
      <div class="progress-card"><div class="p-icon">✅</div><div class="p-value">${p.done}</div><div class="p-label">${t('done')}</div></div>
      <div class="progress-card"><div class="p-icon">🔥</div><div class="p-value">${p.streak.current}</div><div class="p-label">${t('streak')}</div></div>
      <div class="progress-card"><div class="p-icon">🏆</div><div class="p-value">${p.streak.best}</div><div class="p-label">${t('bestStreak')}</div></div>
    </div>
    <h2 class="page-title" style="font-size:1.2em;">📚 ${t('units')}</h2>
    ${rows.length ? rows.map(r => `
      <div class="unit-progress-row" onclick="goToUnit(${r.uid})">
        <div class="up-name">${escHtml(r.title)}</div>
        <div class="up-bar"><div class="up-fill" style="width:${r.pct}%"></div></div>
        <div class="up-pct">${r.done}/${r.total} (${r.pct}%)</div>
      </div>`).join('') : '<p style="color:var(--scout-texto-claro);">' + t('noExercises') + '</p>'}
  `;
}

// ===== Init =====
// Sin landing: la app arranca directo en la selección de materias.
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});