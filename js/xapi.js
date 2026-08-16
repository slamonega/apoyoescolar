/* ===== Apoyo Escolar - xAPI (Experience API / Tin Can) =====
 * Registra cada respuesta como un statement xAPI estándar.
 * - Sin LRS configurado: los statements se acumulan en una cola local (localStorage).
 * - Con LRS configurado: se envían por HTTP POST (Basic Auth) y la cola se vacía.
 * Verbos estándar ADL: answered, completed, attempted, progressed.
 */
window.XAPI = (function () {
  const CFG_KEY = 'anton_xapi_config';
  const QUEUE_KEY = 'anton_xapi_queue';

  // ---- Configuración (localStorage) ----
  let config = loadConfig();

  function loadConfig() {
    try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveConfig() {
    try { localStorage.setItem(CFG_KEY, JSON.stringify(config)); } catch (e) {}
  }
  function setConfig(c) { config = Object.assign({}, config, c); saveConfig(); }
  function getConfig() { return config; }

  // ---- Cola offline ----
  function loadQueue() {
    try { return JSON.parse(localStorage.getItem(QUEUE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveQueue(q) {
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch (e) {}
  }
  function queueLength() { return loadQueue().length; }

  // ---- Helpers de construcción ----
  const VERBS = {
    answered: 'http://adlnet.gov/expapi/verbs/answered',
    completed: 'http://adlnet.gov/expapi/verbs/completed',
    attempted: 'http://adlnet.gov/expapi/verbs/attempted',
    progressed: 'http://adlnet.gov/expapi/verbs/progressed',
  };
  const VERB_DISPLAY = {
    answered: { 'en-US': 'answered', 'es': 'respondió' },
    completed: { 'en-US': 'completed', 'es': 'completó' },
    attempted: { 'en-US': 'attempted', 'es': 'intentó' },
    progressed: { 'en-US': 'progressed', 'es': 'avanzó' },
  };
  const ACTIVITY_TYPES = {
    course: 'http://adlnet.gov/expapi/activities/course',
    lesson: 'http://adlnet.gov/expapi/activities/lesson',
    module: 'http://adlnet.gov/expapi/activities/module',
    interaction: 'http://adlnet.gov/expapi/activities/cmi.interaction',
  };
  // Mapeo tipo de ejercicio ANTON -> interactionType xAPI
  const INTERACTION_TYPES = {
    multiple_choice: 'choice',
    fill_blank: 'fill-in',
    true_false: 'true-false',
    drag_match: 'matching',
  };

  function baseIRI() {
    return (config.baseIRI || location.origin || 'http://localhost:3000').replace(/\/$/, '');
  }

  function makeActor() {
    const a = { objectType: 'Agent' };
    if (config.learnerName) a.name = config.learnerName;
    if (config.learnerEmail) a.mbox = 'mailto:' + config.learnerEmail;
    else a.account = { homePage: baseIRI(), name: 'local-learner' };
    return a;
  }

  function makeActivity(id, name, type, extra) {
    const act = {
      objectType: 'Activity',
      id: baseIRI() + id,
      definition: Object.assign({
        name: { 'es': name },
        type: type,
      }, extra || {}),
    };
    return act;
  }

  function makeStatement(verb, object, result, context) {
    return {
      actor: makeActor(),
      verb: {
        id: VERBS[verb],
        display: VERB_DISPLAY[verb],
      },
      object: object,
      result: result || {},
      context: context || {},
      timestamp: new Date().toISOString(),
    };
  }

  // ---- Envío ----
  async function postStatement(stmt) {
    const res = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Experience-API-Version': '1.0.3',
        'Authorization': 'Basic ' + btoa((config.username || '') + ':' + (config.password || '')),
      },
      body: JSON.stringify(stmt),
    });
    if (!res.ok) throw new Error('LRS HTTP ' + res.status);
    return res;
  }

  function enqueue(stmt) {
    const q = loadQueue();
    q.push(stmt);
    saveQueue(q);
  }

  async function flush() {
    if (!config.endpoint) return { sent: 0, pending: queueLength() };
    const q = loadQueue();
    let sent = 0;
    const remaining = [];
    for (const stmt of q) {
      try {
        await postStatement(stmt);
        sent++;
      } catch (e) {
        remaining.push(stmt); // reintentar después
      }
    }
    saveQueue(remaining);
    return { sent, pending: remaining.length };
  }

  // ---- API pública ----
  function recordAnswer(ex, correct, response, points) {
    const interactionType = INTERACTION_TYPES[ex.type] || 'other';
    const payload = (() => { try { return JSON.parse(ex.payload); } catch (e) { return {}; } })();

    // Definición de la interacción según el tipo
    const def = { interactionType: interactionType };
    if (interactionType === 'choice') {
      def.choices = (payload.options || []).map((o, i) => ({ id: String(i), description: { 'es': String(o) } }));
      def.correctResponsesPattern = [String(payload.correct)];
    } else if (interactionType === 'fill-in') {
      def.correctResponsesPattern = [String(payload.answer)];
    } else if (interactionType === 'true-false') {
      def.correctResponsesPattern = [String(payload.answer)];
    } else if (interactionType === 'matching') {
      def.source = (payload.pairs || []).map((p, i) => ({ id: 's' + i, description: { 'es': String(p[0]) } }));
      def.target = (payload.pairs || []).map((p, i) => ({ id: 't' + i, description: { 'es': String(p[1]) } }));
      def.correctResponsesPattern = [(payload.pairs || []).map((p, i) => 's' + i + '[,]t' + i).join('[.]')];
    }

    const object = makeActivity('/exercises/' + ex.id, ex.prompt_es, ACTIVITY_TYPES.interaction, def);
    // Para "choice", el response debe ser el id de la opción (índice) para
    // coincidir con correctResponsesPattern; el resto envía el valor textual.
    let resp = String(response == null ? '' : response);
    if (interactionType === 'choice') {
      const idx = (payload.options || []).indexOf(response);
      if (idx >= 0) resp = String(idx);
    }
    const result = {
      success: !!correct,
      completion: !!correct,
      response: resp,
      score: { raw: correct ? points : 0, min: 0, max: points },
    };
    const context = {
      contextActivities: {
        parent: [
          makeActivity('/units/' + ex.unit_id, 'Unidad ' + ex.unit_id, ACTIVITY_TYPES.lesson),
        ],
        grouping: [
          makeActivity('/subjects', 'Apoyo Escolar', ACTIVITY_TYPES.course),
        ],
      },
    };
    const stmt = makeStatement(correct ? 'answered' : 'attempted', object, result, context);
    enqueue(stmt);
    flush().catch(() => {});
    return stmt;
  }

  function recordUnitCompleted(unitId, unitTitle, done, total) {
    const object = makeActivity('/units/' + unitId, unitTitle, ACTIVITY_TYPES.lesson);
    const result = {
      completion: true,
      success: true,
      score: { raw: done, min: 0, max: total },
    };
    const stmt = makeStatement('completed', object, result, {
      contextActivities: {
        grouping: [makeActivity('/subjects', 'Apoyo Escolar', ACTIVITY_TYPES.course)],
      },
    });
    enqueue(stmt);
    flush().catch(() => {});
    return stmt;
  }

  return {
    setConfig, getConfig, queueLength, flush, recordAnswer, recordUnitCompleted,
  };
})();