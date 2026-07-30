import { esc } from '../lib/html.mjs';

/**
 * THE REAPER LAYER
 *
 * Skulls, flames and a handful of strange objects that drift about behind the
 * text. Drawn angular and high-contrast rather than gothic — the register is
 * angry anime, not churchyard.
 *
 * Everything here is decorative and additive. It sits behind the content, it
 * is aria-hidden, it stops moving under prefers-reduced-motion, and removing
 * this module would leave the catalogue underneath completely intact.
 */

/**
 * One symbol sheet per page, referenced by <use>. Avoids repeating several
 * kilobytes of path data for every omen on the page.
 */
export function reaperSprites() {
  return `<svg class="sprites" aria-hidden="true" focusable="false" width="0" height="0" style="position:absolute">
  <defs>
    <linearGradient id="grad-flame" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="var(--blood)"/>
      <stop offset="55%" stop-color="var(--ember)"/>
      <stop offset="100%" stop-color="var(--ember-hot)"/>
    </linearGradient>
  </defs>

  <symbol id="omen-skull" viewBox="0 0 48 48">
    <path class="bone" d="M24 3C13 3 5 11.5 5 22c0 6.2 2.8 10.4 6 12.8V40a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4v-5.2c3.2-2.4 6-6.6 6-12.8C43 11.5 35 3 24 3Z"/>
    <path class="socket" d="M9.5 17.5 22.5 23 15 31.5Z"/>
    <path class="socket" d="M38.5 17.5 25.5 23 33 31.5Z"/>
    <path class="bone-dark" d="M24 27.5 27.8 35h-7.6Z"/>
    <path class="bone-dark" d="M14 38h20v2H14zM18 38h2v6h-2zM24 38h2v6h-2zM30 38h2v6h-2z"/>
  </symbol>

  <symbol id="omen-scythe" viewBox="0 0 64 64">
    <path class="haft" d="M47 11 20 60" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path class="blade" d="M47 11C31 7 15 13 7 25c13-8 28-9 40-4Z"/>
    <path class="blade-edge" d="M7 25c13-8 28-9 40-4" fill="none" stroke-width="1.6"/>
    <circle class="stud" cx="47" cy="11" r="3.2"/>
  </symbol>

  <symbol id="omen-flame" viewBox="0 0 32 48">
    <path class="flame-outer" d="M16 1S3 15 3 27a13 13 0 0 0 26 0c0-6-4-10-6-14-2 5-4 7-7 8 3-8 0-16 0-20Z"/>
    <path class="flame-inner" d="M16 20s-6 6-6 11a6 6 0 0 0 12 0c0-4-3-7-3-7-1 2-2 3-3 3Z"/>
  </symbol>

  <symbol id="omen-hourglass" viewBox="0 0 40 56">
    <path class="frame" d="M6 3h28M6 53h28" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path class="glass" d="M10 5h20c0 9-10 15-10 23s10 14 10 23H10c0-9 10-15 10-23S10 14 10 5Z"/>
    <path class="sand" d="M13 8h14c0 6-7 11-7 11s-7-5-7-11Z"/>
    <path class="sand" d="M20 40s7 4 7 11H13c0-7 7-11 7-11Z"/>
    <rect class="grain" x="19.2" y="26" width="1.6" height="12"/>
  </symbol>

  <symbol id="omen-eye" viewBox="0 0 56 56">
    <path class="ray" d="M28 0v7M28 49v7M0 28h7M49 28h7M8 8l5 5M43 43l5 5M48 8l-5 5M13 43l-5 5"
          stroke-width="3" stroke-linecap="round" fill="none"/>
    <circle class="sclera" cx="28" cy="28" r="17"/>
    <g class="pupil-group">
      <circle class="iris" cx="28" cy="28" r="8.5"/>
      <circle class="pupil" cx="28" cy="28" r="3.6"/>
      <circle class="glint" cx="24.6" cy="24.6" r="2.1"/>
    </g>
  </symbol>

  <symbol id="omen-wheel" viewBox="0 0 56 56">
    <circle class="rim" cx="28" cy="28" r="19" fill="none" stroke-width="3.4"/>
    <circle class="hub" cx="28" cy="28" r="4"/>
    <path class="spoke" d="M28 9v38M9 28h38M14.6 14.6l26.8 26.8M41.4 14.6 14.6 41.4"
          stroke-width="2" fill="none"/>
    <path class="lick" d="M28 3c2 4 6 4 6 4s-3 2-3 5c-3-3-3-9-3-9ZM53 28c-4 2-4 6-4 6s-2-3-5-3c3-3 9-3 9-3ZM28 53c-2-4-6-4-6-4s3-2 3-5c3 3 3 9 3 9ZM3 28c4-2 4-6 4-6s2 3 5 3c-3 3-9 3-9 3Z"/>
  </symbol>

  <symbol id="omen-bones" viewBox="0 0 56 56">
    <g class="bone">
      <path d="M12 12 44 44" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M44 12 12 44" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="10" cy="9" r="4.6"/><circle cx="9" cy="15" r="4.6"/>
      <circle cx="46" cy="9" r="4.6"/><circle cx="47" cy="15" r="4.6"/>
      <circle cx="10" cy="47" r="4.6"/><circle cx="9" cy="41" r="4.6"/>
      <circle cx="46" cy="47" r="4.6"/><circle cx="47" cy="41" r="4.6"/>
    </g>
  </symbol>

  <symbol id="omen-wisp" viewBox="0 0 44 56">
    <path class="wisp" d="M22 2C11 2 4 11 4 23v27c3 0 4-4 7-4s4 4 7 4 4-4 7-4 4 4 7 4 4-4 7-4V23C39 11 33 2 22 2Z"/>
    <path class="socket" d="M12 20 21 24 15 30Z"/>
    <path class="socket" d="M32 20 23 24 29 30Z"/>
  </symbol>

  <symbol id="omen-reaper" viewBox="0 0 56 64">
    <path class="cowl" d="M28 2C16 2 8 12 8 26c0 12 4 20 4 28l8-5 8 5 8-5 8 5c0-8 4-16 4-28C48 12 40 2 28 2Z"/>
    <path class="void" d="M28 12c-8 0-13 6-13 13 0 6 5 11 13 11s13-5 13-11c0-7-5-13-13-13Z"/>
    <path class="glare" d="M17 20 26 25 20 30ZM39 20 30 25 36 30Z"/>
  </symbol>
</svg>`;
}

/** Skull + flame lockup used as the site mark. The serpent still runs through it. */
export function reaperMark() {
  return `<svg class="mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path class="mark__skull" d="M24 5C14.6 5 8 12.2 8 21c0 5.2 2.3 8.8 5 10.8V36a3.4 3.4 0 0 0 3.4 3.4h15.2A3.4 3.4 0 0 0 35 36v-4.2c2.7-2 5-5.6 5-10.8C40 12.2 33.4 5 24 5Z"/>
    <path class="mark__socket" d="M12.4 17.4 23 22l-6.2 7Z"/>
    <path class="mark__socket" d="M35.6 17.4 25 22l6.2 7Z"/>
    <path class="mark__body" d="M6 40c6-5 12 2 18-2s10 3 18-3" fill="none"/>
    <circle class="mark__eye" cx="40.5" cy="35.6" r="1.9"/>
  </svg>`;
}

const OMENS = [
  { id: 'omen-scythe', cls: 'omen--scythe' },
  { id: 'omen-skull', cls: 'omen--skull' },
  { id: 'omen-hourglass', cls: 'omen--hourglass' },
  { id: 'omen-eye', cls: 'omen--eye', track: true },
  { id: 'omen-wheel', cls: 'omen--wheel' },
  { id: 'omen-bones', cls: 'omen--bones' },
  { id: 'omen-wisp', cls: 'omen--wisp' },
  { id: 'omen-reaper', cls: 'omen--reaper' },
];

/** Deterministic per-URL pick, so a page always haunts itself the same way. */
function pick(seed, count) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const start = (h >>> 0) % OMENS.length;
  return Array.from({ length: count }, (_, i) => OMENS[(start + i * 3) % OMENS.length]);
}

/**
 * The drifting objects. Fixed behind everything, never interactive, and
 * frozen entirely when the visitor has asked for reduced motion.
 */
export function omenLayer(url) {
  const chosen = pick(url, 5);
  return `<div class="omens" aria-hidden="true">
  ${chosen
    .map(
      (o, i) =>
        `<svg class="omen ${o.cls}" style="--i:${i}"${o.track ? ' data-omen-eye' : ''}><use href="#${esc(o.id)}"/></svg>`,
    )
    .join('\n  ')}
</div>`;
}

/** A row of embers climbing the page edge. Pure decoration, pure CSS. */
export function emberField() {
  return `<div class="embers" aria-hidden="true">${Array.from(
    { length: 14 },
    (_, i) => `<i style="--i:${i}"></i>`,
  ).join('')}</div>`;
}

/**
 * The dread index, rendered as skulls. Five of them, lit in proportion, with
 * the numeral kept alongside because a rating you cannot read precisely is
 * just a mood.
 */
export function skullRating(value, { compact = false } = {}) {
  const lit = Math.round((value / 100) * 5);
  const skulls = Array.from(
    { length: 5 },
    (_, i) =>
      `<svg class="skullrate__s${i < lit ? ' is-lit' : ''}" aria-hidden="true"><use href="#omen-skull"/></svg>`,
  ).join('');
  return `<span class="skullrate${compact ? ' skullrate--compact' : ''}" title="Dread index ${value} of 100">
    <span class="visually-hidden">Dread index ${value} of 100</span>
    <span class="skullrate__row" aria-hidden="true">${skulls}</span>
    <b aria-hidden="true">${value}</b>
  </span>`;
}

/** A small flaming rule used to break up long sections. */
export function flameRule() {
  return `<div class="flamerule" aria-hidden="true">
  <svg class="flamerule__f"><use href="#omen-flame"/></svg>
</div>`;
}
