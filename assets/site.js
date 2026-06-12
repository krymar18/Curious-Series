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