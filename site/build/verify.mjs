import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from '../data/site.mjs';
import { routes } from './generate.mjs';

/**
 * Post-build sanity checks. Not a test suite — a tripwire for the specific
 * ways a generated site rots: dead internal links, missing images, duplicate
 * titles, absent canonicals, malformed structured data.
 */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DIST = path.join(ROOT, 'dist');

const problems = [];
const notes = [];

function fail(msg) {
  problems.push(msg);
}

if (!fs.existsSync(DIST)) {
  console.error('No dist/. Run `npm run build` first.');
  process.exit(1);
}

/** Every file in dist, as site-absolute paths. */
function walk(dir, base = '') {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = `${base}/${item.name}`;
    if (item.isDirectory()) out.push(...walk(path.join(dir, item.name), rel));
    else out.push(rel);
  }
  return out;
}

const files = new Set(walk(DIST));
const htmlFiles = [...files].filter((f) => f.endsWith('.html'));

/* --------------------------------------------------- every route exists */

for (const route of routes()) {
  const expected = `/${route.file}`;
  if (!files.has(expected)) fail(`route ${route.url} did not produce ${expected}`);
}

/* -------------------------------------------- per-page structural checks */

const titles = new Map();
const descriptions = new Map();
const linkTargets = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(DIST, file), 'utf8');
  const where = file;

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(`${where}: no <title>`);
  else {
    if (title.length > 75) notes.push(`${where}: title is ${title.length} chars — "${title}"`);
    if (titles.has(title)) fail(`${where}: duplicate <title> with ${titles.get(title)}`);
    titles.set(title, where);
  }

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(`${where}: no meta description`);
  else {
    if (desc.length > 320) notes.push(`${where}: description is ${desc.length} chars`);
    if (desc.length < 50) notes.push(`${where}: description is only ${desc.length} chars`);
    if (descriptions.has(desc)) fail(`${where}: duplicate description with ${descriptions.get(desc)}`);
    descriptions.set(desc, where);
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) fail(`${where}: no canonical`);
  else if (!canonical.startsWith(SITE.origin)) fail(`${where}: canonical is not absolute — ${canonical}`);

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(`${where}: ${h1s.length} <h1> elements, expected exactly 1`);

  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!ogImage) fail(`${where}: no og:image`);
  else {
    const rel = ogImage.replace(SITE.origin, '');
    if (!files.has(rel)) fail(`${where}: og:image missing from dist — ${rel}`);
  }

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!ld) fail(`${where}: no JSON-LD`);
  else {
    try {
      const parsed = JSON.parse(ld);
      if (!parsed['@graph']?.length) fail(`${where}: empty JSON-LD @graph`);
    } catch (err) {
      fail(`${where}: JSON-LD does not parse — ${err.message}`);
    }
  }

  // Internal links, images and stylesheets.
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = m[1];
    if (!linkTargets.has(target)) linkTargets.set(target, new Set());
    linkTargets.get(target).add(where);
  }

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(m[0])) fail(`${where}: <img> without alt — ${m[0].slice(0, 90)}`);
  }
}

/* ------------------------------------------------------- link integrity */

const REDIRECTS = new Set(
  (fs.existsSync(path.join(DIST, '_redirects'))
    ? fs.readFileSync(path.join(DIST, '_redirects'), 'utf8')
    : ''
  )
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((l) => l.trim().split(/\s+/)[0]),
);

for (const [target, sources] of linkTargets) {
  const candidates = [target, `${target}index.html`, target.replace(/\/$/, '/index.html')];
  if (candidates.some((c) => files.has(c))) continue;
  if (REDIRECTS.has(target.replace(/\/$/, '')) || REDIRECTS.has(target)) continue;
  fail(`dead internal link ${target} (from ${[...sources].slice(0, 3).join(', ')})`);
}

/* ------------------------------------------------------ generated assets */

for (const required of [
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
  '/feed.xml',
  '/feed.json',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/site.webmanifest',
  '/humans.txt',
  '/_headers',
  '/_redirects',
  '/api/index.json',
  '/api/entries.json',
  '/404.html',
]) {
  if (!files.has(required)) fail(`missing generated asset ${required}`);
}

// Sitemap must list every indexable route and nothing that 404s.
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE.origin, ''));
for (const loc of locs) {
  if (!files.has(`${loc}index.html`) && !files.has(loc)) fail(`sitemap lists ${loc}, which is not in dist`);
}
for (const route of routes()) {
  if (route.noindex) continue;
  if (!locs.includes(route.url)) fail(`sitemap is missing ${route.url}`);
}

// JSON endpoints must actually parse.
for (const file of [...files].filter((f) => f.endsWith('.json'))) {
  try {
    JSON.parse(fs.readFileSync(path.join(DIST, file), 'utf8'));
  } catch (err) {
    fail(`${file}: invalid JSON — ${err.message}`);
  }
}

/* ----------------------------------------------------------------- done */

const totalBytes = [...files].reduce((n, f) => n + fs.statSync(path.join(DIST, f)).size, 0);

console.log(`\n  ${htmlFiles.length} HTML pages, ${files.size} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MB total`);

if (notes.length) {
  console.log(`\n  ${notes.length} note${notes.length === 1 ? '' : 's'}:`);
  for (const n of notes.slice(0, 12)) console.log(`    · ${n}`);
  if (notes.length > 12) console.log(`    · …and ${notes.length - 12} more`);
}

if (problems.length) {
  console.error(`\n  ${problems.length} problem${problems.length === 1 ? '' : 's'}:`);
  for (const p of problems) console.error(`    ✗ ${p}`);
  process.exit(1);
}

console.log('\n  ✓ verified: routes, titles, descriptions, canonicals, JSON-LD, links, assets\n');
