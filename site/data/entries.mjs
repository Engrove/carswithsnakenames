import { CHAPTERS, CHAPTER_BY_ID, TRUTH } from './site.mjs';

import genesis from './book-1-genesis.mjs';
import coiled from './book-2-coiled.mjs';
import venom from './book-3-venom.mjs';
import heraldry from './book-4-heraldry.mjs';
import adversaries from './book-5-adversaries.mjs';
import apocrypha from './book-6-apocrypha.mjs';
import unclaimed from './book-7-unclaimed.mjs';

const BOOKS = [genesis, coiled, venom, heraldry, adversaries, apocrypha, unclaimed];

/** Chapter order drives everything: reading order, sitemap order, prev/next. */
const chapterRank = Object.fromEntries(CHAPTERS.map((c, i) => [c.id, i]));

const raw = BOOKS.flat();

// ---------------------------------------------------------------------------
// Validation. A corpus this size will develop a broken cross-reference the
// moment nobody is looking, so we check at build time and fail loudly.
// ---------------------------------------------------------------------------

const seen = new Set();
for (const e of raw) {
  const where = e.slug ?? e.name ?? '(unnamed entry)';
  if (!e.slug) throw new Error(`Entry without a slug: ${JSON.stringify(e).slice(0, 120)}`);
  if (seen.has(e.slug)) throw new Error(`Duplicate slug: ${e.slug}`);
  seen.add(e.slug);
  if (!CHAPTER_BY_ID[e.chapter]) throw new Error(`${where}: unknown chapter "${e.chapter}"`);
  for (const required of ['name', 'lede', 'scripture', 'field', 'venom', 'provenance', 'tags']) {
    if (!e[required]) throw new Error(`${where}: missing "${required}"`);
  }
  for (const p of e.provenance) {
    if (!TRUTH[p.truth]) throw new Error(`${where}: unknown provenance label "${p.truth}"`);
  }
}

for (const e of raw) {
  for (const r of e.related ?? []) {
    if (!seen.has(r)) throw new Error(`${e.slug}: related entry "${r}" does not exist`);
  }
}

// ---------------------------------------------------------------------------
// Derivation
// ---------------------------------------------------------------------------

export const ENTRIES = raw
  .map((e) => ({
    ...e,
    url: `/entry/${e.slug}/`,
    words: e.scripture.join(' ').split(/\s+/).length,
    // A single 0–100 figure so the codex can be sorted by something.
    dread: Math.round(
      (e.venom.bite * 0.32 +
        e.venom.patience * 0.16 +
        e.venom.mystique * 0.26 +
        e.venom.iridescence * 0.12 +
        e.venom.candour * 0.14),
    ),
  }))
  .sort((a, b) => chapterRank[a.chapter] - chapterRank[b.chapter] || (b.weight ?? 0) - (a.weight ?? 0));

ENTRIES.forEach((e, i) => {
  e.prev = ENTRIES[i - 1] ? { slug: ENTRIES[i - 1].slug, name: ENTRIES[i - 1].name, url: ENTRIES[i - 1].url } : null;
  e.next = ENTRIES[i + 1] ? { slug: ENTRIES[i + 1].slug, name: ENTRIES[i + 1].name, url: ENTRIES[i + 1].url } : null;
  e.index = i + 1;
});

export const ENTRY_BY_SLUG = Object.fromEntries(ENTRIES.map((e) => [e.slug, e]));

export const ENTRIES_BY_CHAPTER = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, ENTRIES.filter((e) => e.chapter === c.id)]),
);

/** Human-readable names for the tag vocabulary, used by the taxonomy pages. */
const TAG_LABELS = {
  elapid: 'Elapidae — fixed fangs, neurotoxins',
  viperid: 'Viperidae — hinged fangs, ambush',
  colubrid: 'Colubridae — rear-fanged and various',
  pythonid: 'Pythonidae — constrictors',
  boid: 'Boidae — constrictors',
  squamate: 'Squamata — the wider order',
  mythic: 'Mythological serpents',
  heraldic: 'Heraldry and badges',
  adversary: 'Adversaries — predators of serpents',
  apocrypha: 'Apocrypha — denied at the gate',
  unclaimed: 'Unclaimed names',
  vacancy: 'Currently available',
  venom: 'Named for venom, not the animal',
  honorary: 'Honorary membership',
  mimicry: 'Mimicry',
  etymology: 'Etymological curiosities',
  foundational: 'Foundational to the tradition',
  cultural: 'Cultural impact',
  historical: 'Historical',
  badge: 'Badge or emblem',
  marque: 'Marque-level serpents',
  engine: 'Engines rather than cars',
  american: 'United States',
  british: 'United Kingdom',
  welsh: 'Wales',
  italian: 'Italy',
  german: 'Germany',
  french: 'France',
  swiss: 'Switzerland',
  japanese: 'Japan',
  korean: 'South Korea',
  australian: 'Australia',
  romanian: 'Romania',
  african: 'Africa',
  asian: 'Asia',
  egyptian: 'Egypt',
  'south-american': 'South America',
  mesoamerican: 'Mesoamerica',
  scandinavian: 'Scandinavia',
  v8: 'V8',
  v10: 'V10',
  v12: 'V12',
  v6: 'V6',
  'four-cylinder': 'Four-cylinder',
  'straight-six': 'Straight-six',
  electric: 'Electric',
  steam: 'Steam',
  supercharged: 'Supercharged',
  turbocharged: 'Turbocharged',
  roadster: 'Roadsters',
  coupe: 'Coupés',
  saloon: 'Saloons',
  truck: 'Trucks',
  'mid-engine': 'Mid-engined',
  'front-engine': 'Front-engined',
  'front-mid-engine': 'Front-mid-engined',
  aerodynamics: 'Aerodynamics',
  production: 'Production cars',
  concept: 'Concept cars',
  racing: 'Racing',
  'drag-racing': 'Drag racing',
  homologation: 'Homologation specials',
  muscle: 'Muscle cars',
  rare: 'Rare',
  'ultra-rare': 'Ultra-rare',
};

const tagMap = new Map();
for (const e of ENTRIES) {
  for (const t of e.tags) {
    if (!tagMap.has(t)) tagMap.set(t, []);
    tagMap.get(t).push(e);
  }
}

export const TAGS = [...tagMap.entries()]
  .map(([id, entries]) => ({
    id,
    label: TAG_LABELS[id] ?? id.replace(/-/g, ' '),
    url: `/taxonomy/${id}/`,
    entries,
    count: entries.length,
  }))
  .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));

export const TAG_BY_ID = Object.fromEntries(TAGS.map((t) => [t.id, t]));

/** Corpus-wide statistics, quoted on the home page and in the JSON API. */
export const STATS = {
  entries: ENTRIES.length,
  chapters: CHAPTERS.length,
  words: ENTRIES.reduce((n, e) => n + e.words, 0),
  claims: ENTRIES.reduce((n, e) => n + e.provenance.length, 0),
  documented: ENTRIES.reduce(
    (n, e) => n + e.provenance.filter((p) => p.truth === 'documented').length,
    0,
  ),
  contested: ENTRIES.reduce(
    (n, e) => n + e.provenance.filter((p) => p.truth === 'contested').length,
    0,
  ),
  liturgical: ENTRIES.reduce(
    (n, e) => n + e.provenance.filter((p) => p.truth === 'liturgical').length,
    0,
  ),
  questions: ENTRIES.reduce((n, e) => n + (e.faq?.length ?? 0), 0),
  vacancies: ENTRIES.filter((e) => e.vacancy).length,
  nations: new Set(ENTRIES.map((e) => e.nation).filter(Boolean)).size,
};
