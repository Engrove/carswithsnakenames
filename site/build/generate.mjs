import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CHAPTERS } from '../data/site.mjs';
import { ENTRIES, TAGS } from '../data/entries.mjs';
import * as pages from '../templates/pages.mjs';
import {
  writeSigils,
  writeIcons,
  writeSitemap,
  writeRobots,
  writeLlms,
  writeFeeds,
  writeApi,
  writeHumans,
  API_ENDPOINTS,
} from './assets.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../..');
const PAGES = path.join(ROOT, 'pages');
const PUBLIC_SRC = path.join(ROOT, 'public');
const PUBLIC_GEN = path.join(ROOT, 'public-gen');

/**
 * Every route the site publishes. `url` is canonical and site-absolute;
 * `file` is where the generator writes it inside the Vite root.
 */
export function routes() {
  const list = [
    { url: '/', file: 'index.html', render: pages.home, priority: 1.0, changefreq: 'weekly' },
    { url: '/codex/', file: 'codex/index.html', render: pages.codex, priority: 0.9, changefreq: 'weekly' },
    { url: '/chapter/', file: 'chapter/index.html', render: pages.chapterIndex, priority: 0.8 },
    { url: '/taxonomy/', file: 'taxonomy/index.html', render: pages.taxonomyIndex, priority: 0.7 },
    { url: '/glossary/', file: 'glossary/index.html', render: pages.glossary, priority: 0.7 },
    { url: '/colophon/', file: 'colophon/index.html', render: pages.colophon, priority: 0.6 },
    { url: '/sv/', file: 'sv/index.html', render: pages.svenska, priority: 0.5 },
    { url: '/api/', file: 'api/index.html', render: () => pages.apiIndex(API_ENDPOINTS), priority: 0.5 },
  ];

  for (const chapter of CHAPTERS) {
    list.push({
      url: `/chapter/${chapter.slug}/`,
      file: `chapter/${chapter.slug}/index.html`,
      render: () => pages.chapterPage(chapter),
      priority: 0.8,
    });
  }

  for (const entry of ENTRIES) {
    list.push({
      url: entry.url,
      file: `entry/${entry.slug}/index.html`,
      render: () => pages.entryPage(entry),
      priority: 0.9,
    });
  }

  for (const tag of TAGS) {
    list.push({
      url: tag.url,
      file: `taxonomy/${tag.id}/index.html`,
      render: () => pages.taxonomyPage(tag),
      priority: 0.4,
    });
  }

  list.push({
    url: '/404.html',
    file: '404.html',
    render: pages.notFound,
    noindex: true,
  });

  return list;
}

/** Remove previously generated HTML without touching pages/src. */
function cleanPages() {
  if (!fs.existsSync(PAGES)) return;
  for (const item of fs.readdirSync(PAGES, { withFileTypes: true })) {
    if (item.name === 'src') continue;
    fs.rmSync(path.join(PAGES, item.name), { recursive: true, force: true });
  }
}

/** public/ is committed; public-gen/ is public/ plus everything we generate. */
function seedPublic() {
  fs.mkdirSync(PUBLIC_GEN, { recursive: true });
  if (fs.existsSync(PUBLIC_SRC)) {
    fs.cpSync(PUBLIC_SRC, PUBLIC_GEN, { recursive: true });
  }
}

export async function generate({ mode = 'production', force = false } = {}) {
  const started = Date.now();

  cleanPages();
  seedPublic();

  const all = routes();
  for (const route of all) {
    const full = path.join(PAGES, route.file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, route.render());
  }

  const sigils = writeSigils(PUBLIC_GEN, { force });
  writeIcons(PUBLIC_GEN);
  writeSitemap(PUBLIC_GEN, all);
  writeRobots(PUBLIC_GEN);
  writeLlms(PUBLIC_GEN);
  writeFeeds(PUBLIC_GEN);
  writeApi(PUBLIC_GEN);
  writeHumans(PUBLIC_GEN);

  const summary = {
    pages: all.length,
    entries: ENTRIES.length,
    sigils: sigils.rendered,
    sigilsTotal: sigils.total,
    ms: Date.now() - started,
    mode,
  };

  if (process.env.OPHIDIARY_QUIET !== '1') {
    console.log(
      `  ophidiary · ${summary.pages} pages · ${summary.entries} entries · ` +
        `${summary.sigils}/${summary.sigilsTotal} sigils rendered · ${summary.ms}ms`,
    );
  }

  return summary;
}

// `npm run generate` runs this file directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  await generate({ force: process.argv.includes('--force') });
}
