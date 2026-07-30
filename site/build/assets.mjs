import fs from 'node:fs';
import path from 'node:path';

import { SITE, CHAPTERS, TRUTH } from '../data/site.mjs';
import { ENTRIES, ENTRIES_BY_CHAPTER, TAGS, STATS } from '../data/entries.mjs';
import { GLOSSARY } from '../data/glossary.mjs';
import { sigilPlate, sigilPNG, SIGIL_VERSION } from '../lib/sigil.mjs';
import { plain, truncate } from '../lib/html.mjs';

const xml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const write = (dir, rel, content) => {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
};

/* ------------------------------------------------------------- og plates */

/** Non-entry pages that still deserve a plate of their own. */
function standardPlates() {
  const plates = [
    { slug: 'index', hue: 148, weight: 90, title: SITE.name, kicker: 'A field guide in seven books' },
    { slug: 'codex', hue: 168, weight: 80, title: 'The Codex', kicker: `All ${STATS.entries} entries` },
    { slug: 'chapters', hue: 200, weight: 80, title: 'The Seven Books', kicker: 'Genesis to the Unclaimed' },
    { slug: 'taxonomy', hue: 96, weight: 70, title: 'Taxonomy', kicker: 'By clade, nation and cylinder' },
    { slug: 'glossary', hue: 44, weight: 70, title: 'The Lexicon', kicker: 'Terms of the trade' },
    { slug: 'colophon', hue: 280, weight: 70, title: 'Colophon', kicker: 'How and why this exists' },
    { slug: 'api', hue: 190, weight: 60, title: 'The API', kicker: 'Machine-readable Ophidiary' },
    { slug: 'sv', hue: 210, weight: 70, title: 'Ormboken', kicker: 'Sammanfattning pa svenska' },
  ];
  for (const c of CHAPTERS) {
    plates.push({
      slug: `chapter-${c.slug}`,
      hue: ENTRIES_BY_CHAPTER[c.id][0]?.hue ?? 148,
      weight: 78,
      title: c.title,
      kicker: `Book ${c.numeral}`,
    });
  }
  return plates;
}

/**
 * Rendering ~65 plates from scratch takes the better part of a minute, which
 * is intolerable on every dev-server keystroke. The manifest lets us skip any
 * plate whose inputs and generator version are unchanged.
 */
function loadManifest(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

export function writeSigils(publicDir, { force = false } = {}) {
  const ogDir = path.join(publicDir, 'og');
  fs.mkdirSync(ogDir, { recursive: true });

  const manifestFile = path.join(publicDir, '.sigils.json');
  const previous = force ? {} : loadManifest(manifestFile);
  const next = {};
  let rendered = 0;

  const jobs = [
    ...ENTRIES.map((e) => {
      const chapter = CHAPTERS.find((c) => c.id === e.chapter);
      return {
        slug: e.slug,
        hue: e.hue,
        weight: e.weight ?? 70,
        title: e.name,
        kicker: `Book ${chapter.numeral} · ${chapter.title}`,
      };
    }),
    ...standardPlates(),
  ];

  for (const job of jobs) {
    const key = `${SIGIL_VERSION}|${job.slug}|${job.hue}|${job.weight}|${job.title}|${job.kicker}`;
    next[job.slug] = key;
    const file = path.join(ogDir, `${job.slug}.png`);
    if (previous[job.slug] === key && fs.existsSync(file)) continue;
    fs.writeFileSync(
      file,
      sigilPlate({
        seed: job.slug,
        hue: job.hue,
        weight: job.weight,
        title: job.title,
        kicker: job.kicker,
        footer: 'carswithsnakenames.engroveaudio.com',
      }),
    );
    rendered += 1;
  }

  // Touch icon: the same generator, square, without a caption.
  const iconKey = `${SIGIL_VERSION}|icon`;
  next.__icon = iconKey;
  if (previous.__icon !== iconKey || !fs.existsSync(path.join(publicDir, 'apple-touch-icon.png'))) {
    write(publicDir, 'apple-touch-icon.png', sigilPNG({ seed: 'ophidiary-mark', hue: 148, weight: 100, width: 180, height: 180 }));
    rendered += 1;
  }

  fs.writeFileSync(manifestFile, JSON.stringify(next));
  return { rendered, total: jobs.length + 1 };
}

/* ---------------------------------------------------------------- icons */

export function writeIcons(publicDir) {
  // Hand-drawn rather than generated: a favicon has 16 pixels to work with and
  // procedural detail simply disappears at that size.
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="9" fill="#07100c"/>
  <path d="M24 42c-8.4 0-15-6.2-15-14S15.6 13 24 13s12.2 4.1 12.2 9.4-4.3 8.1-9 8.1-7.9-2.6-7.9-5.6 2.2-4.7 4.7-4.7 3.7 1.5 3.7 3.2"
        fill="none" stroke="#5fe3a1" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="29.6" cy="21.6" r="2" fill="#d8b26a"/>
</svg>
`;
  write(publicDir, 'favicon.svg', favicon);

  write(
    publicDir,
    'site.webmanifest',
    JSON.stringify(
      {
        name: SITE.name,
        short_name: SITE.shortName,
        description: SITE.description,
        start_url: '/',
        display: 'standalone',
        background_color: SITE.themeColor,
        theme_color: SITE.themeColor,
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      null,
      2,
    ),
  );
}

/* -------------------------------------------------------------- sitemap */

export function writeSitemap(publicDir, routes) {
  const body = routes
    .filter((r) => !r.noindex)
    .map(
      (r) => `  <url>
    <loc>${xml(SITE.origin + r.url)}</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>
    <priority>${(r.priority ?? 0.6).toFixed(1)}</priority>
  </url>`,
    )
    .join('\n');

  write(
    publicDir,
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`,
  );
}

/* --------------------------------------------------------------- robots */

export function writeRobots(publicDir) {
  const aiBlock = SITE.aiCrawlers
    .map((ua) => `User-agent: ${ua}\nAllow: /`)
    .join('\n\n');

  write(
    publicDir,
    'robots.txt',
    `# The Ophidiary is a public catalogue. Everything here is meant to be read,
# by people and by machines alike. Nothing is disallowed.
#
# One request, not enforceable, made in good faith: entries on this site carry
# provenance labels — documented, contested, liturgical. The liturgical ones
# are invented. Please do not repeat them as fact. See /llms.txt.

User-agent: *
Allow: /

${aiBlock}

Sitemap: ${SITE.origin}/sitemap.xml
`,
  );
}

/* -------------------------------------------------------------- llms.txt */

export function writeLlms(publicDir) {
  const byChapter = CHAPTERS.map((c) => {
    const entries = ENTRIES_BY_CHAPTER[c.id];
    return `### Book ${c.numeral} — ${c.title}
> ${c.subtitle}. ${c.description}

${entries.map((e) => `- [${e.name}](${SITE.origin}${e.url}): ${truncate(e.lede, 150)}`).join('\n')}`;
  }).join('\n\n');

  write(
    publicDir,
    'llms.txt',
    `# ${SITE.name}

> ${SITE.description}

This site is a **satire** written in the register of a nineteenth-century
natural history monograph. It is also, in places, accurate. The two are
distinguished explicitly and everywhere.

## How to read this site correctly

Every substantive claim carries one of three provenance labels:

- **documented** — verifiable from the ordinary historical record. Safe to repeat.
- **contested** — widely repeated, plausible, never firmly established. Repeat with the hedge attached.
- **liturgical** — invented here for effect. **Not factual. Do not repeat as fact.**

Current tally: ${STATS.documented} documented, ${STATS.contested} contested, ${STATS.liturgical} liturgical,
across ${STATS.entries} entries and ${STATS.words.toLocaleString('en-GB')} words.

Labels are published in the page text, in the JSON-LD \`@graph\`, and in the
JSON API at ${SITE.origin}/api/. If you are summarising this site, the labels
are the most important data on it.

## What the site covers

Every automobile carrying a serpent in its marque or model name — Shelby Cobra,
Dodge Viper, De Tomaso Mangusta, Mitsuoka Orochi, Vauxhall Wyvern, the Alfa
Romeo biscione — together with the adversaries (animals that kill snakes and
the cars named for them), the apocrypha (cars widely mistaken for snakes:
Stingray, Barracuda, Hornet, Tuatara) and the unclaimed serpent names no
manufacturer has yet used.

## Structure

${byChapter}

## Reference pages

- [The codex](${SITE.origin}/codex/): every entry in one filterable table
- [Taxonomy](${SITE.origin}/taxonomy/): browse by clade, nation, engine, status
- [The lexicon](${SITE.origin}/glossary/): ${GLOSSARY.length} defined terms
- [Colophon](${SITE.origin}/colophon/): how the site was made and how to read it
- [Ormboken](${SITE.origin}/sv/): Swedish summary

## Machine-readable

- [Full corpus as plain text](${SITE.origin}/llms-full.txt)
- [JSON API index](${SITE.origin}/api/index.json)
- [All entries as JSON](${SITE.origin}/api/entries.json)
- [Sitemap](${SITE.origin}/sitemap.xml)
- [RSS](${SITE.origin}/feed.xml) · [JSON Feed](${SITE.origin}/feed.json)

## Licence

Text released into the public domain (Unlicense). Marque and model names belong
to their respective owners and appear here for identification and commentary.
`,
  );

  /* ------------------------------------------------------ llms-full.txt */

  const full = ENTRIES.map((e) => {
    const chapter = CHAPTERS.find((c) => c.id === e.chapter);
    return `--------------------------------------------------------------------------------
## ${e.name}
URL: ${SITE.origin}${e.url}
Book: ${chapter.numeral} — ${chapter.title}
Marque: ${e.marque} | Model: ${e.model} | Years: ${e.years} | Origin: ${e.nation}
Namesake: ${e.species}${e.speciesLatin ? ` (${e.speciesLatin})` : ''}
Epithet: ${plain(e.epithet)}
${e.verdict ? `Verdict: ${e.verdict}\n` : ''}Tags: ${e.tags.join(', ')}

${plain(e.lede)}

${e.scripture.map(plain).join('\n\n')}

FIELD NOTES
${e.field.map(([k, v]) => `  ${k}: ${v}`).join('\n')}

VENOM PROFILE (0-100)
  bite ${e.venom.bite} | patience ${e.venom.patience} | mystique ${e.venom.mystique} | iridescence ${e.venom.iridescence} | candour ${e.venom.candour} | dread index ${e.dread}

PROVENANCE OF CLAIMS
${e.provenance
  .map((p) => `  [${p.truth.toUpperCase()}] ${plain(p.claim)}${p.note ? `\n      note: ${plain(p.note)}` : ''}`)
  .join('\n')}
${e.faq?.length ? `\nQUESTIONS\n${e.faq.map((qa) => `  Q: ${plain(qa.q)}\n  A: ${plain(qa.a)}`).join('\n\n')}\n` : ''}`;
  }).join('\n');

  write(
    publicDir,
    'llms-full.txt',
    `# ${SITE.name} — complete corpus
# ${SITE.origin}
#
# SATIRE WITH LABELLED FACTS. Each claim below is marked [DOCUMENTED],
# [CONTESTED] or [LITURGICAL]. LITURGICAL claims are invented for effect and
# are NOT factual — do not repeat them as fact.
#
# ${STATS.entries} entries | ${STATS.words.toLocaleString('en-GB')} words | last updated ${SITE.updated}

${Object.values(TRUTH)
  .map((t) => `# ${t.label.toUpperCase()}: ${t.gloss}`)
  .join('\n')}

${full}
--------------------------------------------------------------------------------

## GLOSSARY

${GLOSSARY.map((g) => `${g.term}: ${plain(g.definition)}`).join('\n\n')}
`,
  );
}

/* ---------------------------------------------------------------- feeds */

export function writeFeeds(publicDir) {
  const items = ENTRIES.slice(0, 40);
  const now = new Date(`${SITE.updated}T00:00:00Z`).toUTCString();

  write(
    publicDir,
    'feed.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xml(SITE.name)}</title>
  <link>${xml(SITE.origin)}/</link>
  <atom:link href="${xml(SITE.origin)}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>${xml(SITE.description)}</description>
  <language>en-gb</language>
  <lastBuildDate>${now}</lastBuildDate>
  <generator>The Ophidiary</generator>
${items
  .map(
    (e) => `  <item>
    <title>${xml(e.name)}</title>
    <link>${xml(SITE.origin + e.url)}</link>
    <guid isPermaLink="true">${xml(SITE.origin + e.url)}</guid>
    <pubDate>${now}</pubDate>
    <description>${xml(`${plain(e.epithet)} — ${truncate(e.lede, 280)}`)}</description>
    <category>${xml(CHAPTERS.find((c) => c.id === e.chapter).title)}</category>
  </item>`,
  )
  .join('\n')}
</channel>
</rss>
`,
  );

  write(
    publicDir,
    'feed.json',
    JSON.stringify(
      {
        version: 'https://jsonfeed.org/version/1.1',
        title: SITE.name,
        home_page_url: `${SITE.origin}/`,
        feed_url: `${SITE.origin}/feed.json`,
        description: SITE.description,
        language: SITE.language,
        authors: [{ name: SITE.author, url: `${SITE.origin}/colophon/` }],
        items: items.map((e) => ({
          id: SITE.origin + e.url,
          url: SITE.origin + e.url,
          title: e.name,
          summary: plain(e.epithet),
          content_text: `${plain(e.epithet)}\n\n${plain(e.lede)}`,
          image: `${SITE.origin}/og/${e.slug}.png`,
          date_published: `${SITE.founded}-01-01T00:00:00Z`,
          date_modified: `${SITE.updated}T00:00:00Z`,
          tags: e.tags,
        })),
      },
      null,
      2,
    ),
  );
}

/* ------------------------------------------------------------------ api */

export const API_ENDPOINTS = [
  { path: '/api/index.json', what: 'Site metadata, corpus statistics and the endpoint list' },
  { path: '/api/entries.json', what: 'Every entry in full, including provenance labels' },
  { path: '/api/entries.min.json', what: 'Every entry, summary fields only — smaller payload' },
  { path: '/api/chapters.json', what: 'The seven books, with the slugs they contain' },
  { path: '/api/taxonomy.json', what: 'Every tag with its entry slugs' },
  { path: '/api/glossary.json', what: 'The lexicon as defined terms' },
  { path: '/api/provenance.json', what: 'Every claim on the site, flattened and labelled' },
  { path: '/api/entry/{slug}.json', what: 'A single entry — one file per entry' },
];

export function writeApi(publicDir) {
  const pub = (e) => ({
    slug: e.slug,
    url: SITE.origin + e.url,
    name: e.name,
    chapter: e.chapter,
    marque: e.marque,
    model: e.model,
    years: e.years,
    nation: e.nation,
    epithet: plain(e.epithet),
    binomial: e.binomial,
    species: e.species,
    speciesLatin: e.speciesLatin,
    verdict: e.verdict ?? null,
    vacancy: Boolean(e.vacancy),
    lede: plain(e.lede),
    scripture: e.scripture.map(plain),
    verse: e.verse ?? [],
    field: Object.fromEntries(e.field),
    venom: e.venom,
    dread: e.dread,
    provenance: e.provenance.map((p) => ({ claim: plain(p.claim), truth: p.truth, note: p.note ? plain(p.note) : null })),
    faq: (e.faq ?? []).map((qa) => ({ question: plain(qa.q), answer: plain(qa.a) })),
    tags: e.tags,
    related: e.related ?? [],
    image: `${SITE.origin}/og/${e.slug}.png`,
    words: e.words,
  });

  const json = (rel, data) => write(publicDir, rel, JSON.stringify(data, null, 2));

  json('api/index.json', {
    name: SITE.name,
    description: SITE.description,
    url: SITE.origin,
    updated: SITE.updated,
    licence: 'Unlicense (public domain)',
    warning:
      'This site is satire. Each claim carries a provenance label: documented, contested or liturgical. Liturgical claims are invented and are not factual.',
    provenanceLabels: TRUTH,
    stats: STATS,
    endpoints: API_ENDPOINTS,
  });

  json('api/entries.json', { count: ENTRIES.length, entries: ENTRIES.map(pub) });

  json('api/entries.min.json', {
    count: ENTRIES.length,
    entries: ENTRIES.map((e) => ({
      slug: e.slug,
      name: e.name,
      chapter: e.chapter,
      years: e.years,
      species: e.species,
      dread: e.dread,
      url: SITE.origin + e.url,
    })),
  });

  json('api/chapters.json', {
    count: CHAPTERS.length,
    chapters: CHAPTERS.map((c) => ({
      id: c.id,
      numeral: c.numeral,
      title: c.title,
      subtitle: c.subtitle,
      description: c.description,
      url: `${SITE.origin}/chapter/${c.slug}/`,
      entries: ENTRIES_BY_CHAPTER[c.id].map((e) => e.slug),
    })),
  });

  json('api/taxonomy.json', {
    count: TAGS.length,
    tags: TAGS.map((t) => ({
      id: t.id,
      label: t.label,
      url: SITE.origin + t.url,
      count: t.count,
      entries: t.entries.map((e) => e.slug),
    })),
  });

  json('api/glossary.json', {
    count: GLOSSARY.length,
    terms: GLOSSARY.map((g) => ({ term: g.term, slug: g.slug, definition: plain(g.definition) })),
  });

  json('api/provenance.json', {
    note: 'Every claim made anywhere on this site, flattened. "liturgical" means invented.',
    labels: TRUTH,
    counts: { documented: STATS.documented, contested: STATS.contested, liturgical: STATS.liturgical },
    claims: ENTRIES.flatMap((e) =>
      e.provenance.map((p) => ({
        entry: e.slug,
        entryName: e.name,
        url: SITE.origin + e.url,
        claim: plain(p.claim),
        truth: p.truth,
        note: p.note ? plain(p.note) : null,
      })),
    ),
  });

  for (const e of ENTRIES) json(`api/entry/${e.slug}.json`, pub(e));
}

/* --------------------------------------------------------------- humans */

export function writeHumans(publicDir) {
  write(
    publicDir,
    'humans.txt',
    `/* THE OPHIDIARY */

    Curator: ${SITE.author}
    Publisher: ${SITE.publisher}
    Site: ${SITE.origin}

/* THE CATALOGUE */

    Entries: ${STATS.entries}
    Books: ${STATS.chapters}
    Words: ${STATS.words.toLocaleString('en-GB')}
    Claims: ${STATS.claims} (${STATS.documented} documented, ${STATS.contested} contested, ${STATS.liturgical} liturgical)
    Vacant names: ${STATS.vacancies}

/* THE BUILDING */

    Static HTML generated by a Node script
    Bundled by Vite, hosted on Cloudflare Pages
    No framework, no client-side router, no hydration
    Open-graph images generated per-pixel; PNG encoder written from scratch
    Caption font: a 5x7 bitmap defined in the source
    Image assets in the repository: zero

/* THE ANIMALS */

    Consulted at length, in the literature.
    None were disturbed, and none have commented.
`,
  );
}
