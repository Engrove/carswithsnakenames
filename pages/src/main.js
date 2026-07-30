import './styles.css';

/**
 * Everything here is progressive enhancement. With scripting off, every page
 * is complete: the codex is a full table, the skin follows the OS, and the
 * progress bar simply does not exist.
 */

/* ------------------------------------------------------- basking toggle */

const SKIN_KEY = 'ophidiary-skin';

function currentSkin() {
  const set = document.documentElement.dataset.skin;
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'bask' : 'night';
}

function applySkin(skin) {
  document.documentElement.dataset.skin = skin;
  try {
    localStorage.setItem(SKIN_KEY, skin);
  } catch {
    /* private browsing; the snake does not mind */
  }
  for (const label of document.querySelectorAll('[data-skin-label]')) {
    label.textContent = skin === 'bask' ? 'Night' : 'Bask';
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', skin === 'bask' ? '#f4f1e8' : '#07100c');
}

function initSkin() {
  const toggle = document.querySelector('[data-skin-toggle]');
  if (!toggle) return;
  applySkin(currentSkin());
  toggle.addEventListener('click', () => {
    applySkin(currentSkin() === 'bask' ? 'night' : 'bask');
  });
}

/* ------------------------------------------------------------- progress */

function initProgress() {
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.width = `${(pct * 100).toFixed(2)}%`;
    ticking = false;
  };

  update();
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  window.addEventListener('resize', update, { passive: true });
}

/* ---------------------------------------------------------- codex filter */

function initCodex() {
  const input = document.querySelector('[data-codex-search]');
  const table = document.querySelector('[data-codex]');
  if (!input || !table) return;

  const status = document.querySelector('[data-codex-status]');
  const empty = document.querySelector('[data-codex-empty]');
  const rows = [...table.querySelectorAll('tbody tr')];
  const total = rows.length;

  const filter = (queryRaw) => {
    const terms = queryRaw.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;

    for (const row of rows) {
      const haystack = row.dataset.search || '';
      const hit = terms.every((t) => haystack.includes(t));
      row.hidden = !hit;
      if (hit) shown += 1;
    }

    if (status) {
      status.textContent = terms.length
        ? `${shown} of ${total} entries`
        : `${total} entries`;
    }
    if (empty) empty.hidden = shown !== 0;
    table.hidden = shown === 0;
  };

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => filter(input.value), 90);
  });

  // Deep links from the schema.org SearchAction land here with ?q=…
  const q = new URLSearchParams(location.search).get('q');
  if (q) {
    input.value = q;
    filter(q);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    input.value = '';
    filter('');
  });
}

/* ------------------------------------------------------------ the eyes */

/**
 * The floating eyes follow the pointer. Purely decorative, disabled outright
 * when the visitor has asked for less motion, and skipped entirely on devices
 * with no pointer to follow.
 */
function initOmenEyes() {
  const eyes = document.querySelectorAll('[data-omen-eye]');
  if (!eyes.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let queued = false;
  let px = 0;
  let py = 0;

  const track = () => {
    for (const eye of eyes) {
      const group = eye.querySelector('.pupil-group');
      if (!group) continue;
      const box = eye.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) continue;

      const dx = px - (box.left + box.width / 2);
      const dy = py - (box.top + box.height / 2);
      const angle = Math.atan2(dy, dx);
      // Clamped so the pupil never leaves the sclera.
      const reach = Math.min(7, Math.hypot(dx, dy) / 26);
      group.setAttribute(
        'transform',
        `translate(${(Math.cos(angle) * reach).toFixed(2)} ${(Math.sin(angle) * reach).toFixed(2)})`,
      );
    }
    queued = false;
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      px = e.clientX;
      py = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(track);
    },
    { passive: true },
  );
}

/* ------------------------------------------------------------------ boot */

const start = () => {
  initSkin();
  initProgress();
  initCodex();
  initOmenEyes();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
