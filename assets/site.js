document.documentElement.classList.add('js');

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


function initActivityWidget() {
  var taskInput = document.getElementById('task-input');
  if (!taskInput) return;

  var selectedType = null;
  var mockMode = 'Search';

  var mockData = {
    Search: {
      ai_type: 'Search',
      explanation: 'This task requires current, specific, real-world information — a competitor announcement from last week. That content exists somewhere on the web right now. AI was not trained on it and cannot retrieve it. A search engine will find the actual source.',
      reframe: 'If you wanted AI instead, you could ask it to help you summarize or analyze the announcement once you have found it — drafting a competitive brief, pulling out key themes, or comparing it to your own positioning.'
    },
    AI: {
      ai_type: 'AI',
      explanation: 'This task is generative — you need structured output, a first draft, or a synthesis from existing knowledge. AI excels here because the hard part is structure and tone, not finding a live source.',
      reframe: 'If you used search instead, you would get a list of links about how others have done something similar — useful as reference material, but you would still need to do the synthesis yourself.'
    },
    Wrong: {
      ai_type: 'Search',
      explanation: 'This task requires current, specific, real-world information. AI was not trained on it and cannot retrieve it reliably. A search engine will surface the actual source.',
      reframe: 'If you wanted AI instead, you could use it after finding the information — to summarize, compare, or draft a response based on what you found.'
    }
  };

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

  function setMock(mode) {
    mockMode = mode;
    document.getElementById('mock-search').className = 'mock-opt' + (mode === 'Search' ? ' active' : '');
    document.getElementById('mock-ai').className = 'mock-opt' + (mode === 'AI' ? ' active' : '');
    document.getElementById('mock-wrong').className = 'mock-opt' + (mode === 'Wrong' ? ' active' : '');
    renderResult(mode);
  }

  function renderResult(mode) {
    var d = mockData[mode];
    var badge = document.getElementById('verdict-badge');
    badge.textContent = d.ai_type;
    badge.className = 'verdict-badge ' + (d.ai_type === 'Search' ? 'badge-search' : 'badge-ai');
    var userCorrect = mode !== 'Wrong';
    var reflect = document.getElementById('reflect-row');
    var reflectIcon = document.getElementById('reflect-icon');
    var reflectText = document.getElementById('reflect-text');
    if (userCorrect) {
      reflect.className = 'reflect-row reflect-correct';
      reflectIcon.className = 'ti ti-check';
      reflectText.textContent = 'You got it right — this is a ' + d.ai_type + ' task.';
    } else {
      reflect.className = 'reflect-row reflect-wrong';
      reflectIcon.className = 'ti ti-x';
      reflectText.textContent = 'You selected ' + selectedType + ', but this is actually a ' + d.ai_type + ' task.';
    }
    document.getElementById('result-explanation').textContent = d.explanation;
    document.getElementById('result-reframe').textContent = d.reframe;
  }

  function copyResult() {
    var task = taskInput.value.trim();
    var d = mockData[mockMode];
    var userCorrect = mockMode !== 'Wrong';
    var text = 'My task: ' + task + '\n\nMy selection: ' + selectedType + '\n\nCorrect answer: ' + d.ai_type + '\n\n' + (userCorrect ? 'I got it right.' : 'I got it wrong.') + '\n\nExplanation: ' + d.explanation + '\n\nReframing: ' + d.reframe;
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
  var mockSearchBtn = document.getElementById('mock-search');
  var mockAiBtn = document.getElementById('mock-ai');
  var mockWrongBtn = document.getElementById('mock-wrong');
  var copyBtn = document.getElementById('act-copy-btn');

  if (!btnSearch || !submitBtn) return;
  
  taskInput.addEventListener('input', checkReady);
  btnSearch.addEventListener('click', function() { selectType('Search'); });
  btnAi.addEventListener('click', function() { selectType('AI'); });
  submitBtn.addEventListener('click', function() {
    document.getElementById('result-wrap').className = 'result-wrap visible';
    renderResult(mockMode);
  });
  mockSearchBtn.addEventListener('click', function() { setMock('Search'); });
  mockAiBtn.addEventListener('click', function() { setMock('AI'); });
  mockWrongBtn.addEventListener('click', function() { setMock('Wrong'); });
  copyBtn.addEventListener('click', copyResult);
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
  const flowUrl = activity.dataset.flowUrl || '';
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
      activityName,
      currentMessage,
      messages: state.messages,
    };

    let replyText = '';

    try {
      const response = await fetch(flowUrl, {
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
      replyText = 'The Power Automate flow URL is still a placeholder. Replace it to start receiving replies.';
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

  const lockBtn = document.getElementById('lock-check-btn');
  const resetBtn = document.getElementById('reset-persona-btn');
  const cards = Array.from(activity.querySelectorAll('.persona-card'));

  lockBtn.addEventListener('click', () => {
    for (const card of cards) {
      const input = card.querySelector('.persona-input');
      const reveal = card.querySelector('.persona-reveal');
      const revealText = card.querySelector('.persona-reveal-text');
      input.disabled = true;
      revealText.textContent = card.dataset.personaAnswer;
      reveal.hidden = false;
      card.classList.add('checked');
    }
    lockBtn.disabled = true;
    lockBtn.textContent = 'Answers revealed';
  });

  resetBtn.addEventListener('click', () => {
    for (const card of cards) {
      const input = card.querySelector('.persona-input');
      const reveal = card.querySelector('.persona-reveal');
      const revealText = card.querySelector('.persona-reveal-text');
      input.disabled = false;
      input.value = '';
      reveal.hidden = true;
      revealText.textContent = '';
      card.classList.remove('checked');
    }
    lockBtn.disabled = false;
    lockBtn.textContent = 'Lock answers & check yourself';
  });
}

initPersonaGuessActivity();

// ── Prompt constructor exercise ──────────────────────────────────────

function initPromptConstructor() {
  const activity = document.getElementById('prompt-constructor');
  if (!activity) return;

  const FLOW_URL = 'https://YOUR-POWER-AUTOMATE-URL-HERE';

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

    const payload = { role, context, tasks, constraints, combinedPrompt: assemblePrompt() };

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
      const len = payload.combinedPrompt.length;
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

// ── Department table filter & highlight ──────────────────────────────

(function initDeptFilters() {
  const HL_COLORS = [
    { bg: '#e8eef8', fg: '#204d89' },
    { bg: '#f5e8d7', fg: '#a06b17' },
    { bg: '#e6f2ea', fg: '#1d6a3b' },
    { bg: '#fbe9e6', fg: '#a63023' },
    { bg: '#fef9cc', fg: '#8a6d0a' },
    { bg: '#ede8f8', fg: '#6a4ab3' },
  ];

  for (const table of document.querySelectorAll('table')) {
    const firstTh = table.querySelector('thead th:first-child');
    if (!firstTh || !/^depart/i.test(firstTh.textContent.trim())) continue;

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const depts = [...new Set(rows.map(r => r.querySelector('td:first-child')?.textContent.trim()).filter(Boolean))];
    if (!depts.length) continue;

    const wrap = table.closest('.table-wrap') || table;

    // Build UI
    const bar = document.createElement('div');
    bar.className = 'dept-filter-bar';

    // Controls row
    const controls = document.createElement('div');
    controls.className = 'dept-filter-controls';

    // Mode toggle
    const modeGroup = document.createElement('div');
    modeGroup.className = 'dept-filter-mode';
    const btnFilter = document.createElement('button');
    btnFilter.className = 'toggle-btn active';
    btnFilter.textContent = 'Filter rows';
    btnFilter.type = 'button';
    const btnHighlight = document.createElement('button');
    btnHighlight.className = 'toggle-btn';
    btnHighlight.textContent = 'Highlight';
    btnHighlight.type = 'button';
    modeGroup.appendChild(btnFilter);
    modeGroup.appendChild(btnHighlight);

    // Dropdown
    const ddWrap = document.createElement('div');
    ddWrap.className = 'dept-filter-dropdown';
    const trigger = document.createElement('button');
    trigger.className = 'dept-filter-trigger';
    trigger.type = 'button';
    const triggerLabel = document.createElement('span');
    triggerLabel.textContent = 'All departments';
    const arrow = document.createElement('span');
    arrow.className = 'dfdd-arrow';
    arrow.textContent = '▾';
    trigger.appendChild(triggerLabel);
    trigger.appendChild(arrow);
    const menu = document.createElement('div');
    menu.className = 'dept-filter-menu';

    const checkboxes = [];
    for (const dept of depts) {
      const item = document.createElement('label');
      item.className = 'dept-filter-item';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = dept;
      const dot = document.createElement('span');
      dot.className = 'dept-filter-dot';
      const lbl = document.createElement('span');
      lbl.textContent = dept;
      item.appendChild(cb);
      item.appendChild(dot);
      item.appendChild(lbl);
      menu.appendChild(item);
      checkboxes.push({ cb, dot, dept });
    }

    ddWrap.appendChild(trigger);
    ddWrap.appendChild(menu);
    controls.appendChild(modeGroup);
    controls.appendChild(ddWrap);

    // Legend
    const legend = document.createElement('div');
    legend.className = 'dept-filter-legend';
    legend.hidden = true;

    bar.appendChild(controls);
    bar.appendChild(legend);
    wrap.before(bar);

    // State
    let mode = 'filter'; // 'filter' | 'highlight'
    // Maps dept name → highlight slot index (in order of selection)
    const hlMap = new Map();

    function getSelected() {
      return checkboxes.filter(c => c.cb.checked).map(c => c.dept);
    }

    function updateTriggerLabel() {
      const sel = getSelected();
      triggerLabel.textContent = sel.length === 0 ? 'All departments' : `${sel.length} selected`;
    }

    function applyFilter() {
      const sel = getSelected();
      for (const row of rows) {
        const dept = row.querySelector('td:first-child')?.textContent.trim();
        row.classList.toggle('dept-hidden', sel.length > 0 && !sel.includes(dept));
        // Remove any highlight classes
        for (let i = 0; i < HL_COLORS.length; i++) row.classList.remove('dept-hl-' + i);
      }
      legend.hidden = true;
    }

    function applyHighlight() {
      // Rebuild hlMap from current checked order
      const sel = getSelected();
      // Assign slots in stable order (order boxes are checked)
      // hlMap already tracks order; prune removed items
      for (const [d] of hlMap) {
        if (!sel.includes(d)) hlMap.delete(d);
      }
      for (const d of sel) {
        if (!hlMap.has(d)) hlMap.set(d, hlMap.size % HL_COLORS.length);
      }
      // Re-normalise slot indices to fill gaps
      let slot = 0;
      for (const [d] of hlMap) { hlMap.set(d, slot++ % HL_COLORS.length); }

      for (const row of rows) {
        const dept = row.querySelector('td:first-child')?.textContent.trim();
        for (let i = 0; i < HL_COLORS.length; i++) row.classList.remove('dept-hl-' + i);
        row.classList.remove('dept-hidden');
        if (hlMap.has(dept)) {
          row.classList.add('dept-hl-' + hlMap.get(dept));
        }
      }

      // Legend
      legend.innerHTML = '';
      if (hlMap.size) {
        legend.hidden = false;
        for (const [d, s] of hlMap) {
          const chip = document.createElement('span');
          chip.className = 'dept-hl-chip';
          chip.style.background = HL_COLORS[s].bg;
          chip.style.borderColor = HL_COLORS[s].fg;
          chip.style.color = HL_COLORS[s].fg;
          chip.textContent = d;
          legend.appendChild(chip);
        }
      } else {
        legend.hidden = true;
      }
    }

    function updateDots() {
      for (const { cb, dot, dept } of checkboxes) {
        if (mode === 'highlight') {
          dot.style.display = 'inline-block';
          const s = hlMap.get(dept);
          if (s !== undefined) {
            dot.style.background = HL_COLORS[s].fg;
          } else {
            dot.style.background = cb.checked ? HL_COLORS[hlMap.size % HL_COLORS.length].fg : 'transparent';
            dot.style.border = '1.5px solid var(--border)';
          }
          dot.style.border = s !== undefined ? 'none' : '1.5px solid var(--border)';
        } else {
          dot.style.display = 'none';
        }
      }
    }

    function applyMode() {
      if (mode === 'filter') applyFilter();
      else applyHighlight();
      updateDots();
      updateTriggerLabel();
    }

    // Dropdown open/close
    trigger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      trigger.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!ddWrap.contains(e.target)) {
        menu.classList.remove('open');
        trigger.classList.remove('open');
      }
    });

    // Checkbox changes
    for (const { cb } of checkboxes) {
      cb.addEventListener('change', () => applyMode());
    }

    // Mode buttons
    btnFilter.addEventListener('click', () => {
      mode = 'filter';
      btnFilter.classList.add('active');
      btnHighlight.classList.remove('active');
      hlMap.clear();
      applyMode();
    });

    btnHighlight.addEventListener('click', () => {
      mode = 'highlight';
      btnHighlight.classList.add('active');
      btnFilter.classList.remove('active');
      applyMode();
    });
  }
})();