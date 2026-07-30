import { TRUTH, CHAPTER_BY_ID } from '../data/site.mjs';
import { esc, typo, plain, truncate } from '../lib/html.mjs';

const AXES = [
  ['bite', 'Bite', 'Violence immediately available'],
  ['patience', 'Patience', 'Willingness to wait'],
  ['mystique', 'Mystique', 'Mythic charge per kilogram'],
  ['iridescence', 'Iridescence', 'Beauty under raking light'],
  ['candour', 'Candour', 'How literally it means the snake'],
];

/**
 * A five-axis radar, drawn as inline SVG. No chart library, no runtime cost,
 * and it survives being read with images and scripts disabled.
 */
export function venomChart(entry) {
  // Wider than tall: the side labels ("Iridescence", "Patience") need room to
  // sit outside the pentagon without being clipped by the viewBox.
  const W = 300;
  const H = 200;
  const cx = W / 2;
  const cy = H / 2;
  const rMax = 66;
  const n = AXES.length;

  const point = (i, value) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (value / 100) * rMax;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };

  const rings = [25, 50, 75, 100]
    .map((pct) => {
      const pts = AXES.map((_, i) => point(i, pct).map((v) => v.toFixed(1)).join(',')).join(' ');
      return `<polygon class="radar__ring" points="${pts}"/>`;
    })
    .join('');

  const spokes = AXES.map((_, i) => {
    const [x, y] = point(i, 100);
    return `<line class="radar__spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
  }).join('');

  const shape = AXES.map(([key], i) => point(i, entry.venom[key]).map((v) => v.toFixed(1)).join(',')).join(' ');

  const dots = AXES.map(([key], i) => {
    const [x, y] = point(i, entry.venom[key]);
    return `<circle class="radar__dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>`;
  }).join('');

  const labels = AXES.map(([key, label], i) => {
    const [x, y] = point(i, 130);
    const anchor = x < cx - 6 ? 'end' : x > cx + 6 ? 'start' : 'middle';
    return `<text class="radar__label" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${esc(label)}</text>`;
  }).join('');

  const summary = AXES.map(([key, label]) => `${label} ${entry.venom[key]}`).join(', ');

  return `<figure class="venom">
  <svg class="radar" viewBox="0 0 ${W} ${H}" role="img"
       aria-label="${esc(`Venom profile for ${entry.name}: ${summary}. Composite dread index ${entry.dread} of 100.`)}">
    <g>${rings}${spokes}</g>
    <polygon class="radar__shape" points="${shape}"/>
    ${dots}${labels}
  </svg>
  <figcaption>
    <dl class="venom__list">
      ${AXES.map(
        ([key, label, gloss]) => `<div>
        <dt title="${esc(gloss)}">${esc(label)}</dt>
        <dd><span class="venom__bar" style="--v:${entry.venom[key]}%"></span><b>${entry.venom[key]}</b></dd>
      </div>`,
      ).join('\n      ')}
    </dl>
    <p class="venom__index"><span>Dread index</span> <b>${entry.dread}</b><small>/100</small></p>
  </figcaption>
</figure>`;
}

export function provenanceList(entry) {
  return `<section class="provenance" id="provenance" aria-labelledby="provenance-h">
  <h2 id="provenance-h">Provenance of claims</h2>
  <p class="provenance__intro">
    This is a satire with a research habit. Every load-bearing statement above
    is listed here and labelled, so you can tell which sentences would survive
    a librarian.
  </p>
  <ul class="provenance__list">
    ${entry.provenance
      .map(
        (p) => `<li class="provenance__item provenance__item--${p.truth}">
      <span class="tag tag--${p.truth}" title="${esc(TRUTH[p.truth].gloss)}">${esc(TRUTH[p.truth].label)}</span>
      <p class="provenance__claim">${typo(p.claim)}</p>
      ${p.note ? `<p class="provenance__note">${typo(p.note)}</p>` : ''}
    </li>`,
      )
      .join('\n    ')}
  </ul>
</section>`;
}

export function faqSection(entry) {
  if (!entry.faq?.length) return '';
  return `<section class="faq" id="questions" aria-labelledby="faq-h">
  <h2 id="faq-h">Questions people actually ask</h2>
  <div class="faq__list">
    ${entry.faq
      .map(
        (qa) => `<details class="faq__item">
      <summary><h3>${typo(qa.q)}</h3></summary>
      <div class="faq__answer"><p>${typo(qa.a)}</p></div>
    </details>`,
      )
      .join('\n    ')}
  </div>
</section>`;
}

export function fieldTable(entry) {
  return `<section class="fieldnotes" aria-labelledby="field-h">
  <h2 id="field-h" class="fieldnotes__h">Field notes</h2>
  <dl class="fieldnotes__dl">
    ${entry.field
      .map(([k, v]) => `<div><dt>${typo(k)}</dt><dd>${typo(v)}</dd></div>`)
      .join('\n    ')}
  </dl>
</section>`;
}

export function entryCard(entry, { compact = false } = {}) {
  const chapter = CHAPTER_BY_ID[entry.chapter];
  return `<li class="card${compact ? ' card--compact' : ''}" style="--hue:${entry.hue}">
  <a class="card__link" href="${esc(entry.url)}">
    <span class="card__book">Book ${esc(chapter.numeral)}</span>
    <h3 class="card__title">${typo(entry.name)}</h3>
    <p class="card__epithet">${typo(entry.epithet)}</p>
    ${compact ? '' : `<p class="card__lede">${typo(truncate(entry.lede, 150))}</p>`}
    <span class="card__meta">
      <span>${esc(entry.years)}</span>
      ${entry.nation ? `<span>${esc(entry.nation)}</span>` : ''}
      <span class="card__dread" title="Dread index">${entry.dread}</span>
    </span>
  </a>
</li>`;
}

export function entryGrid(entries, opts) {
  return `<ul class="grid" role="list">
  ${entries.map((e) => entryCard(e, opts)).join('\n  ')}
</ul>`;
}

export function verseBlock(entry) {
  if (!entry.verse?.length) return '';
  return `<blockquote class="verse">
  ${entry.verse.map((line) => `<span class="verse__line">${typo(line)}</span>`).join('\n  ')}
</blockquote>`;
}

/**
 * The taxonomic strip at the head of an entry. Written as a definition list
 * because that is genuinely what it is.
 */
export function classification(entry) {
  const chapter = CHAPTER_BY_ID[entry.chapter];
  const rows = [
    ['Book', `Book ${chapter.numeral} — ${chapter.title}`],
    ['Marque', entry.marque],
    ['Model', entry.model],
    ['Years', entry.years],
    ['Origin', entry.nation],
    ['Namesake', entry.species],
    ['Binomial', entry.binomial],
  ].filter(([, v]) => v);

  return `<dl class="classification">
  ${rows
    .map(
      ([k, v]) =>
        `<div><dt>${esc(k)}</dt><dd${k === 'Binomial' ? ' class="latin"' : ''}>${typo(v)}</dd></div>`,
    )
    .join('\n  ')}
  ${entry.verdict ? `<div><dt>Verdict</dt><dd class="verdict">${typo(entry.verdict)}</dd></div>` : ''}
</dl>`;
}

export function relatedList(entry, bySlug) {
  const related = (entry.related ?? []).map((slug) => bySlug[slug]).filter(Boolean);
  if (!related.length) return '';
  return `<section class="related" aria-labelledby="related-h">
  <h2 id="related-h">Read next</h2>
  ${entryGrid(related, { compact: true })}
</section>`;
}

export function pagination(entry) {
  if (!entry.prev && !entry.next) return '';
  return `<nav class="pager" aria-label="Entry">
  ${
    entry.prev
      ? `<a class="pager__link pager__link--prev" href="${esc(entry.prev.url)}" rel="prev">
    <span>Previous</span><b>${typo(entry.prev.name)}</b></a>`
      : '<span></span>'
  }
  ${
    entry.next
      ? `<a class="pager__link pager__link--next" href="${esc(entry.next.url)}" rel="next">
    <span>Next</span><b>${typo(entry.next.name)}</b></a>`
      : '<span></span>'
  }
</nav>`;
}

export function scripture(entry) {
  return entry.scripture
    .map((para, i) =>
      i === 0
        ? `<p class="scripture__open">${typo(para)}</p>`
        : `<p>${typo(para)}</p>`,
    )
    .join('\n    ');
}

export { plain };
