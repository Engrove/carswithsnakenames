import { SITE, NAV } from '../data/site.mjs';
import { esc, escJson, truncate, join } from '../lib/html.mjs';
import { graph, organisation, author, website } from '../lib/jsonld.mjs';

const abs = (path) => (path.startsWith('http') ? path : `${SITE.origin}${path}`);

/**
 * Relative path from a generated page back to the Vite root, so the shared
 * bundle resolves from any depth. Vite rewrites these at build time.
 */
function assetBase(url) {
  const segments = url.split('/').filter(Boolean);
  // Directory routes ("/entry/x/") nest one level per segment; file routes
  // ("/404.html") sit in the directory their last segment names.
  const depth = url.endsWith('/') ? segments.length : segments.length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
}

/**
 * Runs before first paint to stop the basking-mode toggle flashing. This is
 * the only inline script on the site that does anything; everything else is
 * in the bundle.
 */
const THEME_BOOTSTRAP = `(function(){try{var m=localStorage.getItem("ophidiary-skin");if(m==="bask"||m==="night"){document.documentElement.dataset.skin=m}}catch(e){}})();`;

function nav(current) {
  return `<nav class="masthead__nav" aria-label="Primary">
      <ul>
        ${NAV.map((item) => {
          const active = item.href === current || (item.href !== '/' && current.startsWith(item.href));
          return `<li><a href="${esc(item.href)}"${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
        }).join('\n        ')}
      </ul>
    </nav>`;
}

/**
 * @param {object} page
 * @param {string} page.url        site-absolute, with trailing slash
 * @param {string} page.title      the <title>, without the site suffix
 * @param {string} page.description
 * @param {string} [page.image]    site-absolute path to an og image
 * @param {Array}  [page.jsonld]   extra schema.org nodes
 * @param {string} page.body
 */
export function layout(page) {
  const {
    url,
    title,
    description,
    image = '/og/index.png',
    jsonld = [],
    body,
    bodyClass = '',
    trail = [],
    lang = SITE.language,
    noindex = false,
    kicker,
  } = page;

  const fullTitle = url === '/' ? `${SITE.name} — ${SITE.tagline}` : `${title} — ${SITE.name}`;
  const desc = truncate(description, 300);
  const base = assetBase(url);

  const nodes = graph([organisation(), author(), website(), ...jsonld]);

  return `<!doctype html>
<html lang="${esc(lang)}" prefix="og: https://ogp.me/ns#">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(abs(url))}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'}
<meta name="author" content="${esc(SITE.author)}">
<meta name="keywords" content="${esc(SITE.keywords.join(', '))}">
<meta name="theme-color" content="${esc(SITE.themeColor)}">
<meta name="color-scheme" content="dark light">
<meta name="generator" content="Vite, and an unreasonable amount of reading about snakes">

<meta property="og:type" content="${url === '/' ? 'website' : 'article'}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(abs(url))}">
<meta property="og:image" content="${esc(abs(image))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(`A procedurally generated serpent sigil for ${title}`)}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="${esc(SITE.twitter)}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(abs(image))}">

<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)}" href="/feed.xml">
<link rel="alternate" type="application/feed+json" title="${esc(SITE.name)}" href="/feed.json">
<link rel="alternate" hreflang="en" href="${esc(abs(url))}">
<link rel="alternate" hreflang="sv" href="${esc(abs('/sv/'))}">
<link rel="alternate" hreflang="x-default" href="${esc(abs(url))}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="author" href="/humans.txt">

<script>${THEME_BOOTSTRAP}</script>
<script type="application/ld+json">${escJson(nodes)}</script>

<link rel="stylesheet" href="${base}src/styles.css">
<script type="module" src="${base}src/main.js"></script>
</head>
<body class="${esc(bodyClass)}">
<a class="skip" href="#main">Skip to the text</a>

<header class="masthead">
  <div class="masthead__inner">
    <a class="masthead__mark" href="/" aria-label="${esc(SITE.name)} — home">
      <svg class="mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path class="mark__body" d="M24 44c-9 0-16-6.6-16-15S15 14 24 14s13 4.4 13 10-4.6 8.6-9.6 8.6S19 29.4 19 26.2s2.4-5 5-5 4 1.6 4 3.4"/>
        <circle class="mark__eye" cx="30.4" cy="24" r="1.9"/>
      </svg>
      <span class="masthead__words">
        <span class="masthead__title">Cars With Snake&nbsp;Names</span>
        <span class="masthead__sub">The Ophidiary</span>
      </span>
    </a>
    ${nav(url)}
    <button class="skin-toggle" type="button" data-skin-toggle aria-live="polite">
      <span data-skin-label>Bask</span>
    </button>
  </div>
  <div class="progress" aria-hidden="true"><span class="progress__bar" data-progress></span></div>
</header>

<main id="main"${kicker ? ` data-kicker="${esc(kicker)}"` : ''}>
${trail.length > 1 ? breadcrumbNav(trail) : ''}
${body}
</main>

<footer class="colophon-foot">
  <div class="colophon-foot__inner">
    <p class="colophon-foot__note">
      <strong>${esc(SITE.name)}</strong> is satire. It is also, in the places marked
      <em>documented</em>, accurate. Every factual claim on this site carries a
      provenance label — <a href="/colophon/#truth">here is how to read them</a>.
    </p>
    <nav class="colophon-foot__links" aria-label="Footer">
      <a href="/codex/">Codex</a>
      <a href="/chapter/">Books</a>
      <a href="/taxonomy/">Taxonomy</a>
      <a href="/glossary/">Glossary</a>
      <a href="/colophon/">Colophon</a>
      <a href="/sv/" hreflang="sv" lang="sv">Svenska</a>
      <a href="/llms.txt">llms.txt</a>
      <a href="/api/">API</a>
      <a href="/feed.xml">RSS</a>
    </nav>
    <p class="colophon-foot__legal">
      Text released into the public domain. Marque and model names are the
      property of their owners and are used here for identification, criticism
      and comment. No serpent was consulted during production, though several
      were read about at length.
    </p>
  </div>
</footer>
</body>
</html>
`;
}

function breadcrumbNav(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb">
  <ol>
    ${trail
      .map((item, i) =>
        i === trail.length - 1
          ? `<li><span aria-current="page">${esc(item.label)}</span></li>`
          : `<li><a href="${esc(item.url)}">${esc(item.label)}</a></li>`,
      )
      .join('\n    ')}
  </ol>
</nav>`;
}

export { join };
