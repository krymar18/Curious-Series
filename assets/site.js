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

document.getElementById('lightbox').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('open');
});