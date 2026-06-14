document.documentElement.classList.add('js');

const FLOW_URL = 'https://default4657d5eea660475fbb1099b5df3efd.46.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/c97a8f2b84b040b5be50435684ab6929/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oxl9Wkor3lw3UEdn0sqVmonGpEJT0uIm2zGbtAjmiW4';

// Fire-and-forget — used when no response is needed from the flow
function postToFlow(payload) {
  fetch(FLOW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(function () {});
}

for (const tabs of document.querySelectorAll('[data-tabs]')) {
  const buttons = Array.from(tabs.querySelectorAll('[data-tab-button]'));
  const panels = Array.from(tabs.querySelectorAll('[data-tab-panel]'));

  const activate = (name) => {
    for (const button of buttons) {
      const selected = button.dataset.tabButton === name;
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
    }

    for (const panel of panels) {
      panel.classList.toggle('active', panel.dataset.tabPanel === name);
    }
  };

  for (const button of buttons) {
    button.addEventListener('click', () => activate(button.dataset.tabButton));
  }

  const current = tabs.querySelector('[aria-selected="true"]')?.dataset.tabButton || buttons[0]?.dataset.tabButton;
  if (current) {
    activate(current);
  }
}

const currentPath = window.location.pathname.split('/').pop() || 'index.html';

for (const link of document.querySelectorAll('[data-nav-link]')) {
  const target = link.getAttribute('href');
  if (target === currentPath) {
    link.setAttribute('aria-current', 'page');
  }
}

for (const button of document.querySelectorAll('[data-copy-text]')) {
  button.addEventListener('click', async () => {
    const text = button.getAttribute('data-copy-text') || '';

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', 'true');
      field.style.position = 'absolute';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }

    const original = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('copied');
    window.setTimeout(() => {
      button.textContent = original;
      button.classList.remove('copied');
    }, 1400);
  });
}

document.querySelectorAll('.details-img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').classList.add('open');
  });
});

for (const figure of document.querySelectorAll('.figure')) {
  const img = figure.querySelector('img');
  if (!img) continue;
  const btn = document.createElement('button');
  btn.className = 'figure-expand-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Open image in new tab');
  btn.innerHTML = '<i class="ti ti-external-link" aria-hidden="true"></i>';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.open(img.src, '_blank');
  });
  figure.appendChild(btn);
}


function initActivityWidget() {
  var taskInput = document.getElementById('task-input');
  if (!taskInput) return;

  var selectedType = null;
  var lastResult = null; // stores the most recent API response for copy

  function selectType(type) {
    selectedType = type;
    document.getElementById('btn-search').className = 'toggle-btn' + (type === 'Search' ? ' selected-search' : '');
    document.getElementById('btn-ai').className = 'toggle-btn' + (type === 'AI' ? ' selected-ai' : '');
    checkReady();
  }

  function checkReady() {
    var task = taskInput.value.trim();
    var btn = document.getElementById('submit-btn');
    btn.className = 'submit-btn' + (task.length > 0 && selectedType ? ' ready' : '');
  }

  function showLoading() {
    var badge = document.getElementById('verdict-badge');
    badge.textContent = '…';
    badge.className = 'verdict-badge';
    var reflect = document.getElementById('reflect-row');
    reflect.className = 'reflect-row';
    document.getElementById('reflect-icon').className = '';
    document.getElementById('reflect-text').textContent = 'Analyzing your task…';
    document.getElementById('result-explanation').textContent = '';
    document.getElementById('result-reframe').textContent = '';
  }

  function renderResult(data) {
    lastResult = data;
    var badge = document.getElementById('verdict-badge');
    badge.textContent = data.ai_type;
    badge.className = 'verdict-badge ' + (data.ai_type === 'Search' ? 'badge-search' : 'badge-ai');
    var userCorrect = selectedType === data.ai_type;
    var reflect = document.getElementById('reflect-row');
    var reflectIcon = document.getElementById('reflect-icon');
    var reflectText = document.getElementById('reflect-text');
    if (userCorrect) {
      reflect.className = 'reflect-row reflect-correct';
      reflectIcon.className = 'ti ti-check';
      reflectText.textContent = 'You got it right — this is a ' + data.ai_type + ' task.';
    } else {
      reflect.className = 'reflect-row reflect-wrong';
      reflectIcon.className = 'ti ti-x';
      reflectText.textContent = 'You selected ' + selectedType + ', but this is actually a ' + data.ai_type + ' task.';
    }
    document.getElementById('result-explanation').textContent = data.explanation;
    document.getElementById('result-reframe').textContent = data.reframe;
  }

  function showError(msg) {
    var badge = document.getElementById('verdict-badge');
    badge.textContent = '—';
    badge.className = 'verdict-badge';
    var reflect = document.getElementById('reflect-row');
    reflect.className = 'reflect-row reflect-wrong';
    document.getElementById('reflect-icon').className = 'ti ti-alert-triangle';
    document.getElementById('reflect-text').textContent = msg;
    document.getElementById('result-explanation').textContent = '';
    document.getElementById('result-reframe').textContent = '';
  }

  function copyResult() {
    if (!lastResult) return;
    var task = taskInput.value.trim();
    var userCorrect = selectedType === lastResult.ai_type;
    var text = [
      'Task: ' + task,
      'My selection: ' + selectedType,
      'Correct answer: ' + lastResult.ai_type,
      userCorrect ? 'Result: Correct' : 'Result: Incorrect',
      '',
      'Explanation: ' + lastResult.explanation,
      '',
      'Reframing: ' + lastResult.reframe,
    ].join('\n');
    navigator.clipboard.writeText(text).catch(function() {
      var el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    });
    var btn = document.getElementById('act-copy-btn');
    btn.className = 'act-copy-btn copied';
    btn.innerHTML = '<i class="ti ti-check" style="font-size:15px;" aria-hidden="true"></i> Copied';
    setTimeout(function() {
      btn.className = 'act-copy-btn';
      btn.innerHTML = '<i class="ti ti-copy" style="font-size:15px;" aria-hidden="true"></i> Copy result';
    }, 1600);
  }

  var resetBtn = document.getElementById('reset-btn');
  var btnSearch = document.getElementById('btn-search');
  var btnAi = document.getElementById('btn-ai');
  var submitBtn = document.getElementById('submit-btn');
  var copyBtn = document.getElementById('act-copy-btn');

  if (!btnSearch || !submitBtn) return;

  taskInput.addEventListener('input', checkReady);
  btnSearch.addEventListener('click', function() { selectType('Search'); });
  btnAi.addEventListener('click', function() { selectType('AI'); });

  submitBtn.addEventListener('click', async function() {
    var task = taskInput.value.trim();
    if (!task || !selectedType) return;

    document.getElementById('result-wrap').className = 'result-wrap visible';
    showLoading();
    submitBtn.disabled = true;

    var data = null;
    try {
      var response = await fetch(FLOW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity: 'ai_vs_search',
          task: task,
          user_selection: selectedType,
        }),
      });
      var ct = response.headers.get('content-type') || '';
      var raw = ct.includes('application/json') ? await response.json() : null;
      if (raw && raw.ai_type && raw.explanation && raw.reframe) data = raw;
    } catch (_) {}

    if (data) {
      renderResult(data);
    } else {
      showError('Could not reach the analysis flow. Check your connection and try again.');
    }
    submitBtn.disabled = false;
  });

  copyBtn.addEventListener('click', copyResult);
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      taskInput.value = '';
      selectedType = null;
      lastResult = null;
      selectType(null);
      document.getElementById('result-wrap').className = 'result-wrap';
      checkReady();
    });
  }
}

initActivityWidget();

for (const activity of document.querySelectorAll('[data-activity-chat]')) {
  const form = activity.querySelector('[data-activity-form]');
  const log = activity.querySelector('[data-activity-log]');
  const input = activity.querySelector('[data-activity-input]');
  const sendButton = activity.querySelector('[data-activity-send]');
  const resetButton = activity.querySelector('[data-activity-reset]');
  const status = activity.querySelector('[data-activity-status]');
  const count = activity.querySelector('[data-activity-count]');
  const activityName = activity.dataset.activityName || 'Activity';
  const initialLogMarkup = log ? log.innerHTML : '';
  const state = { messages: [], userCount: 0, busy: false };

  const renderState = () => {
    if (count) count.textContent = `${state.userCount}/4`;
    if (input) input.disabled = state.busy || state.userCount >= 4;
    if (sendButton) sendButton.disabled = state.busy || state.userCount >= 4;
    if (resetButton) resetButton.disabled = state.busy && state.userCount === 0;
  };

  const updateStatus = (text) => { if (status) status.textContent = text; };
  const clearLog = () => { if (log) log.innerHTML = initialLogMarkup; };

  const addMessage = (role, text) => {
    if (!log) return;
    const emptyMessage = log.querySelector('[data-chat-empty]');
    if (emptyMessage) emptyMessage.remove();
    const message = document.createElement('div');
    message.className = `chat-message ${role}`;
    message.textContent = text;
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  };

  const extractReply = (data) => {
    if (typeof data === 'string') return data;
    if (!data || typeof data !== 'object') return '';
    return (
      data.mostRecentMessage ||
      data.message ||
      data.reply ||
      data.content ||
      data.text ||
      data.output ||
      data.result ||
      data?.choices?.[0]?.message?.content ||
      ''
    );
  };

  const resetActivity = () => {
    state.messages = [];
    state.userCount = 0;
    state.busy = false;
    clearLog();
    updateStatus('Ready. Send up to 4 messages, then reset to start the activity again.');
    renderState();
    if (input) { input.value = ''; input.focus(); }
  };

  const submitMessage = async () => {
    if (!input || !log || state.busy || state.userCount >= 4) return;
    const currentMessage = input.value.trim();
    if (!currentMessage) return;

    state.busy = true;
    addMessage('user', currentMessage);
    state.messages.push({ role: 'user', content: currentMessage });
    state.userCount += 1;
    input.value = '';
    updateStatus('Sending...');
    renderState();

    const payload = {
      activity: activityName,
      current_message: currentMessage,
      conversation: state.messages,
      message_count: state.userCount,
    };

    let replyText = '';

    try {
      const response = await fetch(FLOW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const contentType = response.headers.get('content-type') || '';
      const responseData = contentType.includes('application/json')
        ? await response.json()
        : await response.text();
      if (typeof responseData === 'string') {
        const trimmed = responseData.trim().toLowerCase();
        replyText = trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')
          ? ''
          : responseData;
      } else {
        replyText = extractReply(responseData);
      }
      replyText = replyText || (response.ok ? 'The flow returned no message.' : 'The flow responded with an error.');
    } catch {
      replyText = 'Could not reach the Power Automate flow. Check your connection and try again.';
    }

    addMessage('assistant', replyText);
    state.messages.push({ role: 'assistant', content: replyText });
    state.busy = false;
    updateStatus(state.userCount >= 4
      ? 'Message limit reached. Reset to start a new chat.'
      : 'Reply added. You can send up to 4 messages.');
    renderState();
  };

  if (form) form.addEventListener('submit', (event) => { event.preventDefault(); submitMessage(); });
  if (resetButton) resetButton.addEventListener('click', resetActivity);

  renderState();
  clearLog();
  updateStatus('Ready. Send up to 4 messages, then reset to start the activity again.');
}

// ── Persona guess activity ───────────────────────────────────────────

function initPersonaGuessActivity() {
  const activity = document.getElementById('persona-guess-activity');
  if (!activity) return;

  const PERSONAS = [
    { key: 'nutritionist', label: 'Sports nutritionist' },
    { key: 'cardiologist',  label: 'Cardiologist' },
    { key: 'influencer',    label: 'Wellness influencer' },
    { key: 'ceo',           label: 'Brewery CEO' },
  ];

  const lockBtn  = document.getElementById('lock-check-btn');
  const resetBtn = document.getElementById('reset-persona-btn');
  const cards    = Array.from(activity.querySelectorAll('.persona-card'));

  // Build choice buttons for each card
  for (const card of cards) {
    const choicesDiv = document.createElement('div');
    choicesDiv.className = 'persona-choices';
    choicesDiv.appendChild(Object.assign(document.createElement('span'), {
      className: 'persona-choices-label',
      textContent: 'Guess the persona',
    }));

    for (const p of PERSONAS) {
      const btn = document.createElement('button');
      btn.className = 'persona-choice-btn';
      btn.type = 'button';
      btn.dataset.key = p.key;
      btn.textContent = p.label;
      btn.addEventListener('click', () => {
        for (const b of choicesDiv.querySelectorAll('.persona-choice-btn')) {
          b.classList.remove('selected');
        }
        btn.classList.add('selected');
      });
      choicesDiv.appendChild(btn);
    }

    card.insertBefore(choicesDiv, card.querySelector('.persona-reveal'));
  }

  lockBtn.addEventListener('click', () => {
    for (const card of cards) {
      const correctKey = card.dataset.personaKey;
      const selected   = card.querySelector('.persona-choice-btn.selected');
      const isCorrect  = selected && selected.dataset.key === correctKey;
      const reveal     = card.querySelector('.persona-reveal');
      const revealLabel = card.querySelector('.persona-reveal-label');
      const revealText  = card.querySelector('.persona-reveal-text');

      // Lock and style all buttons
      for (const btn of card.querySelectorAll('.persona-choice-btn')) {
        btn.disabled = true;
        if (btn.dataset.key === correctKey) btn.classList.add('correct');
      }
      if (selected && !isCorrect) selected.classList.add('wrong');

      // Card border and reveal text
      card.classList.add(isCorrect ? 'checked' : 'wrong');
      revealLabel.textContent = isCorrect ? '✓ Correct — persona used' : '✗ The persona used was';
      revealText.textContent  = card.dataset.personaAnswer;
      reveal.hidden = false;
    }

    lockBtn.disabled = true;
    lockBtn.textContent = 'Checked';

    const guessResults = cards.map((card, idx) => {
      const sel = card.querySelector('.persona-choice-btn.selected');
      const correctKey = card.dataset.personaKey;
      const correctPersona = PERSONAS.find(p => p.key === correctKey);
      const selectedPersona = sel ? PERSONAS.find(p => p.key === sel.dataset.key) : null;
      return {
        card: String.fromCharCode(65 + idx),
        user_selection: selectedPersona ? selectedPersona.label : null,
        correct_answer_key: correctKey,
        correct_answer_label: correctPersona ? correctPersona.label : correctKey,
        is_correct: sel ? sel.dataset.key === correctKey : false,
      };
    });
    postToFlow({
      activity: 'persona_guess',
      results: guessResults,
      score: guessResults.filter(r => r.is_correct).length,
      total: cards.length,
    });
  });

  resetBtn.addEventListener('click', () => {
    for (const card of cards) {
      for (const btn of card.querySelectorAll('.persona-choice-btn')) {
        btn.disabled = false;
        btn.classList.remove('selected', 'correct', 'wrong');
      }
      const reveal     = card.querySelector('.persona-reveal');
      const revealLabel = card.querySelector('.persona-reveal-label');
      const revealText  = card.querySelector('.persona-reveal-text');
      reveal.hidden = true;
      revealLabel.textContent = 'Persona used';
      revealText.textContent  = '';
      card.classList.remove('checked', 'wrong');
    }
    lockBtn.disabled = false;
    lockBtn.textContent = 'Lock & check';
  });
}

initPersonaGuessActivity();

// ── Prompt constructor exercise ──────────────────────────────────────

function initPromptConstructor() {
  const activity = document.getElementById('prompt-constructor');
  if (!activity) return;


  const PC_SAMPLES = {
    traffic: {
      role: 'You are a senior traffic coordinator at a cable TV network with expertise in political advertising compliance and makegood processing.',
      context: 'I need to draft a makegood offer for a US Senate campaign whose :30 spot was preempted last night due to breaking news. The original order was primetime on a cable news network. The client is in the final two weeks of the campaign and is sensitive about last-minute changes.',
      tasks: [
        'Draft a makegood offer that includes two alternative placement options, with a one-sentence rationale for each.',
        'Write a one-sentence explanation of the preemption that is appropriate to send directly to the client.'
      ],
      constraints: [
        'Professional but direct — no filler language.',
        'Do not include rates or dollar figures.',
        'Both options must comply with political advertising placement rules.'
      ]
    },
    sales: {
      role: 'You are a senior cable TV account executive preparing for a client renewal meeting.',
      context: "I have a renewal meeting tomorrow with a local auto dealer who has been a client for three years. Their annual spend is $180K. They have been asking questions about digital alternatives. I need to walk in with a compelling case for staying on linear TV.",
      tasks: [
        'Summarise the three strongest arguments for linear TV over digital for a local auto dealer.',
        'Draft five talking points I can use when the client raises the "digital is cheaper" objection.'
      ],
      constraints: [
        'Plain language — no media jargon.',
        'Each talking point one to two sentences maximum.',
        'Focus on local market reach, not national statistics.'
      ]
    },
    finance: {
      role: 'You are a senior finance analyst at a media company preparing internal reports for leadership.',
      context: 'I need to write a variance explanation for a revenue line that came in 12% below budget in Q3. The shortfall was primarily due to cancelled political inventory in two markets. The audience is our CFO and VP of Finance — they want clarity, not excuses.',
      tasks: [
        'Write a three-sentence variance explanation: what happened, why, and what the Q4 outlook is.',
        'Identify two questions the CFO is likely to ask and draft a one-sentence answer to each.'
      ],
      constraints: [
        'Lead with the number, not the context.',
        'Avoid passive voice.',
        'Do not use the word "challenging".'
      ]
    }
  };

  const PC_FALLBACK_EVALS = [
    {
      role: 'Strong — domain expertise and context are clearly set. This is exactly the kind of role statement that changes the vocabulary and depth of output.',
      context: 'Well-structured — audience and situation are both present. If you want to go further, note anything that has already been decided or ruled out.',
      tasks: 'Verb-led and specific. Each operation is discrete and the AI knows exactly what to produce.',
      constraints: 'Good boundary-setting. A content constraint — what to avoid claiming or including — tends to be where final output quality lives.',
      overall: 'A high-quality prompt that will produce targeted, usable output on the first try. The main optional refinement: one content constraint would close the loop completely.',
      score: 'strong'
    },
    {
      role: "A reasonable start. Adding a behavioural tendency — 'who approaches problems by…' or 'who always flags…' — would give the AI a more specific lens.",
      context: 'The audience is clear. Consider whether situational context is missing — what is at stake, or what has already been tried and rejected.',
      tasks: 'Specific enough to be actionable. If the output feels too broad, breaking it into two separate operations (analyse then produce) usually sharpens the result.',
      constraints: 'One constraint is better than none. What is the most predictable way the AI could disappoint you on this output? That is your next constraint.',
      overall: "A solid working prompt that will produce a competent first draft. One iteration on the role's behavioural trait and one more constraint would get this to first-try quality.",
      score: 'good'
    },
    {
      role: 'Too generic — this gives the AI very little to calibrate from. Add a specific domain and at least one behavioural trait.',
      context: 'The AI is missing its most important input: who is this for? Add audience and situation before anything else. Without them, the AI will invent both — usually wrong.',
      tasks: 'This reads as a topic, not a task. Start with a verb: Summarise, Draft, Evaluate, Identify. What specific operation do you want performed?',
      constraints: 'No constraints means the AI uses its defaults — usually too long, too formal, too hedged. What would bad output look like here? That is your first constraint.',
      overall: 'This prompt needs the four ingredients filled in before it will produce consistent output. Start with a specific role, add audience and situation to context, lead each task with a verb, and add one format constraint.',
      score: 'needs-work'
    }
  ];

  let pcTaskCount = 0;
  let pcConstraintCount = 0;

  const roleTA = document.getElementById('pc-role');
  const contextTA = document.getElementById('pc-context');
  const taskList = document.getElementById('pc-task-list');
  const constraintList = document.getElementById('pc-constraint-list');
  const outputBox = document.getElementById('pc-output');
  const generateBtn = document.getElementById('pc-generate');
  const copyBtn = document.getElementById('pc-copy');
  const evaluateBtn = document.getElementById('pc-evaluate');
  const clearBtn = document.getElementById('pc-clear');
  const feedbackWrap = document.getElementById('pc-feedback-wrap');
  const feedbackContent = document.getElementById('pc-feedback-content');

  function addRow(list, isTask) {
    if (isTask) pcTaskCount++; else pcConstraintCount++;
    const count = isTask ? pcTaskCount : pcConstraintCount;
    const row = document.createElement('div');
    row.className = 'pc-row';
    const num = document.createElement('span');
    num.className = 'pc-row-num';
    num.textContent = count;
    const ta = document.createElement('textarea');
    ta.rows = 2;
    ta.placeholder = isTask
      ? 'e.g. Summarise the top 3 risks with supporting figures…'
      : 'e.g. No jargon. / Under 200 words. / Bullet points only.';
    const rm = document.createElement('button');
    rm.className = 'pc-row-remove';
    rm.type = 'button';
    rm.innerHTML = '&times;';
    rm.title = 'Remove';
    rm.addEventListener('click', () => {
      row.remove();
      list.querySelectorAll('.pc-row-num').forEach((el, i) => { el.textContent = i + 1; });
    });
    row.appendChild(num);
    row.appendChild(ta);
    row.appendChild(rm);
    list.appendChild(row);
    return ta;
  }

  function getValues(list) {
    return Array.from(list.querySelectorAll('textarea')).map(t => t.value.trim()).filter(Boolean);
  }

  function assemblePrompt() {
    const parts = [];
    const role = roleTA.value.trim();
    const ctx = contextTA.value.trim();
    const tasks = getValues(taskList);
    const cons = getValues(constraintList);
    if (role) parts.push('Role\n' + role);
    if (ctx) parts.push('Context & Background\n' + ctx);
    if (tasks.length === 1) parts.push('Task\n' + tasks[0]);
    else if (tasks.length > 1) parts.push('Tasks\n' + tasks.map((t, i) => (i + 1) + '. ' + t).join('\n'));
    if (cons.length === 1) parts.push('Constraint\n' + cons[0]);
    else if (cons.length > 1) parts.push('Constraints\n' + cons.map((c, i) => (i + 1) + '. ' + c).join('\n'));
    return parts.join('\n\n');
  }

  function renderFeedback(data) {
    const scoreLabels = { strong: 'Strong prompt', good: 'Good — some refinement possible', 'needs-work': 'Needs work' };
    const fieldsHTML = [
      { key: 'role', label: 'Role' },
      { key: 'context', label: 'Context' },
      { key: 'tasks', label: 'Tasks' },
      { key: 'constraints', label: 'Constraints' },
    ].map(f => `<div class="pc-feedback-field">
        <div class="pc-feedback-field-label">${f.label}</div>
        <div class="pc-feedback-field-text">${data[f.key] || '—'}</div>
      </div>`).join('');
    const score = data.score || 'good';
    feedbackContent.innerHTML = `
      <div class="pc-feedback-fields">${fieldsHTML}</div>
      <div class="pc-feedback-overall score-${score}">
        <div class="pc-feedback-overall-label">${scoreLabels[score] || 'Overall'}</div>
        <div class="pc-feedback-overall-text">${data.overall || ''}</div>
      </div>`;
    feedbackWrap.hidden = false;
    feedbackWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function loadSample(key) {
    const s = PC_SAMPLES[key];
    if (!s) return;
    roleTA.value = s.role;
    contextTA.value = s.context;
    taskList.innerHTML = '';
    pcTaskCount = 0;
    s.tasks.forEach(t => { const ta = addRow(taskList, true); ta.value = t; });
    constraintList.innerHTML = '';
    pcConstraintCount = 0;
    s.constraints.forEach(c => { const ta = addRow(constraintList, false); ta.value = c; });
    outputBox.textContent = 'Fill in the fields above and click Generate to assemble your prompt.';
    outputBox.classList.add('pc-output-empty');
    copyBtn.style.display = 'none';
    evaluateBtn.style.display = 'none';
    feedbackWrap.hidden = true;
  }

  activity.querySelectorAll('.pc-sample-btn').forEach(btn => {
    btn.addEventListener('click', () => loadSample(btn.dataset.sample));
  });

  document.getElementById('pc-add-task').addEventListener('click', () => addRow(taskList, true));
  document.getElementById('pc-add-constraint').addEventListener('click', () => addRow(constraintList, false));

  generateBtn.addEventListener('click', () => {
    const prompt = assemblePrompt();
    if (!prompt.trim()) {
      outputBox.textContent = 'Add at least a role and one task before generating.';
      outputBox.classList.add('pc-output-empty');
      copyBtn.style.display = 'none';
      evaluateBtn.style.display = 'none';
      return;
    }
    outputBox.textContent = prompt;
    outputBox.classList.remove('pc-output-empty');
    copyBtn.style.display = '';
    evaluateBtn.style.display = '';
    feedbackWrap.hidden = true;
  });

  copyBtn.addEventListener('click', async () => {
    const text = outputBox.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    const orig = copyBtn.textContent;
    copyBtn.textContent = 'Copied';
    copyBtn.classList.add('copied');
    window.setTimeout(() => {
      copyBtn.textContent = orig;
      copyBtn.classList.remove('copied');
    }, 1400);
  });

  evaluateBtn.addEventListener('click', async () => {
    const role = roleTA.value.trim();
    const context = contextTA.value.trim();
    const tasks = getValues(taskList);
    const constraints = getValues(constraintList);
    if (!role && !context && !tasks.length) return;

    evaluateBtn.disabled = true;
    feedbackWrap.hidden = false;
    feedbackContent.innerHTML = '<span class="pc-spinner">Evaluating your prompt…</span>';

    const payload = {
      activity: 'prompt_constructor',
      role,
      context,
      tasks,
      constraints,
      combined_prompt: assemblePrompt(),
    };

    let data = null;
    try {
      const response = await fetch(FLOW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const ct = response.headers.get('content-type') || '';
      const raw = ct.includes('application/json') ? await response.json() : await response.text();
      if (raw && typeof raw === 'object' && raw.role && raw.overall) data = raw;
    } catch (_) {}

    if (!data) {
      const len = payload.combined_prompt.length;
      data = PC_FALLBACK_EVALS[len > 600 ? 0 : len > 280 ? 1 : 2];
    }

    renderFeedback(data);
    evaluateBtn.disabled = false;
  });

  clearBtn.addEventListener('click', () => {
    roleTA.value = '';
    contextTA.value = '';
    taskList.innerHTML = '';
    pcTaskCount = 0;
    constraintList.innerHTML = '';
    pcConstraintCount = 0;
    addRow(taskList, true);
    addRow(constraintList, false);
    outputBox.textContent = 'Fill in the fields above and click Generate to assemble your prompt.';
    outputBox.classList.add('pc-output-empty');
    copyBtn.style.display = 'none';
    evaluateBtn.style.display = 'none';
    feedbackWrap.hidden = true;
  });

  addRow(taskList, true);
  addRow(constraintList, false);
}

initPromptConstructor();

// ── Department table highlights & filter ─────────────────────────

(function initDeptFilters() {
  const HL_COLORS = [
    { bg: '#e8eef8', fg: '#204d89' },
    { bg: '#f5e8d7', fg: '#a06b17' },
    { bg: '#e6f2ea', fg: '#1d6a3b' },
    { bg: '#fbe9e6', fg: '#a63023' },
    { bg: '#fef9cc', fg: '#8a6d0a' },
    { bg: '#ede8f8', fg: '#6a4ab3' },
  ];

  let activeCloseMenu = null;

  for (const table of document.querySelectorAll('table')) {
    const firstTh = table.querySelector('thead th:first-child');
    if (!firstTh || !/^depart/i.test(firstTh.textContent.trim())) continue;

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const depts = [...new Set(rows.map(r => r.querySelector('td:first-child')?.textContent.trim()).filter(Boolean))];
    if (!depts.length) continue;

    // Stable color per department, by first-appearance order
    const deptColors = new Map();
    depts.forEach((dept, i) => deptColors.set(dept, i % HL_COLORS.length));

    const wrap = table.closest('.table-wrap') || table;

    // "Apply highlights" checkbox bar
    const hlBar = document.createElement('div');
    hlBar.className = 'dept-hl-bar';
    const hlLabel = document.createElement('label');
    hlLabel.className = 'dept-hl-toggle';
    const hlCb = document.createElement('input');
    hlCb.type = 'checkbox';
    hlCb.checked = true;
    hlLabel.appendChild(hlCb);
    hlLabel.appendChild(Object.assign(document.createElement('span'), { textContent: 'Apply highlights' }));
    hlBar.appendChild(hlLabel);
    wrap.before(hlBar);

    // Filter icon button inside the Department th
    const thText = firstTh.textContent.trim();
    firstTh.textContent = '';
    const thWrap = document.createElement('div');
    thWrap.className = 'dept-th-wrap';
    thWrap.appendChild(Object.assign(document.createElement('span'), { textContent: thText }));
    const filterBtn = document.createElement('button');
    filterBtn.className = 'dept-filter-th-btn';
    filterBtn.type = 'button';
    filterBtn.setAttribute('aria-label', 'Filter by department');
    filterBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M1.5 2h13a.5.5 0 0 1 .354.854L9.5 8.207V14a.5.5 0 0 1-.724.447l-3-1.5A.5.5 0 0 1 5.5 12.5V8.207L1.146 2.854A.5.5 0 0 1 1.5 2z"/></svg>';
    thWrap.appendChild(filterBtn);
    firstTh.appendChild(thWrap);

    // Dropdown menu appended to body, positioned fixed
    const menu = document.createElement('div');
    menu.className = 'dept-filter-menu';
    document.body.appendChild(menu);

    const checkboxes = [];
    for (const dept of depts) {
      const item = document.createElement('label');
      item.className = 'dept-filter-item';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      const dot = document.createElement('span');
      dot.className = 'dept-filter-dot';
      dot.style.background = HL_COLORS[deptColors.get(dept)].fg;
      item.appendChild(cb);
      item.appendChild(dot);
      item.appendChild(Object.assign(document.createElement('span'), { textContent: dept }));
      menu.appendChild(item);
      checkboxes.push({ cb, dept });
    }

    let highlightOn = true;

    function getSelectedDepts() {
      return checkboxes.filter(c => c.cb.checked).map(c => c.dept);
    }

    function applyState() {
      const selected = getSelectedDepts();
      for (const row of rows) {
        const dept = row.querySelector('td:first-child')?.textContent.trim();
        const hidden = selected.length > 0 && !selected.includes(dept);
        row.classList.toggle('dept-hidden', hidden);
        for (let i = 0; i < HL_COLORS.length; i++) row.classList.remove('dept-hl-' + i);
        if (!hidden && highlightOn && deptColors.has(dept)) {
          row.classList.add('dept-hl-' + deptColors.get(dept));
        }
      }
      filterBtn.classList.toggle('active', selected.length > 0);
    }

    applyState();

    hlCb.addEventListener('change', () => { highlightOn = hlCb.checked; applyState(); });

    function closeMenu() {
      menu.classList.remove('open');
      filterBtn.classList.remove('open');
      if (activeCloseMenu === closeMenu) activeCloseMenu = null;
    }

    function openMenu() {
      if (activeCloseMenu) activeCloseMenu();
      const rect = filterBtn.getBoundingClientRect();
      menu.style.top = (rect.bottom + 4) + 'px';
      menu.style.left = rect.left + 'px';
      menu.classList.add('open');
      filterBtn.classList.add('open');
      activeCloseMenu = closeMenu;
    }

    filterBtn.addEventListener('click', e => {
      e.stopPropagation();
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', e => {
      if (activeCloseMenu === closeMenu && !menu.contains(e.target)) closeMenu();
    });

    for (const { cb } of checkboxes) {
      cb.addEventListener('change', () => applyState());
    }
  }
})();

// Section navigation sidebar
(function () {
  const headings = Array.from(document.querySelectorAll('main h2'));
  if (headings.length < 2) return;

  // Assign IDs to any heading that lacks one, avoiding collisions
  const usedIds = new Set(Array.from(document.querySelectorAll('[id]')).map(el => el.id));
  headings.forEach((h, i) => {
    if (!h.id) {
      const base = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
      let id = base;
      let n = 2;
      while (usedIds.has(id)) { id = base + '-' + n++; }
      h.id = id;
      usedIds.add(id);
    }
  });

  // Build nav
  const nav = document.createElement('nav');
  nav.className = 'section-nav';
  nav.setAttribute('aria-label', 'Page sections');
  nav.style.display = 'none';

  const ul = document.createElement('ul');
  ul.className = 'section-nav-list';

  const items = headings.map(h => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.className = 'section-nav-item';
    a.textContent = h.textContent.trim();
    a.addEventListener('click', e => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(a);
    ul.appendChild(li);
    return { a, h };
  });

  nav.appendChild(ul);
  document.body.appendChild(nav);

  // Show/hide and position based on available left margin
  const SIDEBAR_W = 140;
  const MIN_GAP = 12;

  function reposition() {
    const shell = document.querySelector('main .shell') || document.querySelector('.shell');
    if (!shell) return;
    const availLeft = shell.getBoundingClientRect().left;
    if (availLeft >= SIDEBAR_W + MIN_GAP) {
      nav.style.display = '';
      nav.style.left = Math.floor(availLeft - SIDEBAR_W - MIN_GAP) + 'px';
    } else {
      nav.style.display = 'none';
    }
  }

  reposition();
  window.addEventListener('resize', reposition);

  // Active section tracking by scroll position
  let activeId = null;

  function updateActive() {
    const threshold = window.scrollY + 130;
    let current = headings[0].id;
    for (const h of headings) {
      if (h.getBoundingClientRect().top + window.scrollY <= threshold) {
        current = h.id;
      }
    }
    if (current !== activeId) {
      activeId = current;
      for (const { a, h } of items) {
        a.classList.toggle('active', h.id === activeId);
      }
    }
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();