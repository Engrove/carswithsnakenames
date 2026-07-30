import { SITE, CHAPTER_BY_ID, TRUTH } from '../data/site.mjs';
import { GLOSSARY } from '../data/glossary.mjs';
import { plain, truncate } from './html.mjs';

/**
 * schema.org graphs. Every page emits a single @graph so crawlers get one
 * coherent object rather than five disconnected islands.
 */

const abs = (path) => (path.startsWith('http') ? path : `${SITE.origin}${path}`);

const ORG_ID = `${SITE.origin}/#publisher`;
const SITE_ID = `${SITE.origin}/#website`;
const AUTHOR_ID = `${SITE.origin}/colophon/#keeper`;

export function organisation() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.publisher,
    legalName: SITE.copyright,
    url: SITE.origin,
    description: SITE.description,
  };
}

export function author() {
  return {
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: SITE.author,
    description: SITE.authorNote,
    url: `${SITE.origin}/colophon/`,
    knowsAbout: [
      'automotive history',
      'herpetology',
      'etymology',
      'heraldry',
      'automotive naming conventions',
    ],
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE.origin}/`,
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.origin}/codex/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbs(trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(trail.at(-1).url)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: abs(item.url),
    })),
  };
}

export function webPage({ url, title, description, image, trail }) {
  return {
    '@type': 'WebPage',
    '@id': `${abs(url)}#webpage`,
    url: abs(url),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    inLanguage: SITE.language,
    primaryImageOfPage: image ? abs(image) : undefined,
    breadcrumb: trail ? { '@id': `${abs(trail.at(-1).url)}#breadcrumb` } : undefined,
  };
}

export function faqPage(url, faq) {
  if (!faq?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${abs(url)}#faq`,
    mainEntity: faq.map((qa) => ({
      '@type': 'Question',
      name: plain(qa.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(qa.a) },
    })),
  };
}

/**
 * An entry is modelled as an Article about a Vehicle. Both are emitted: the
 * Article is the writing, the Vehicle is the thing written about, and `about`
 * ties them together so a machine can tell which is which.
 */
export function entryGraph(entry) {
  const url = abs(entry.url);
  const image = abs(`/og/${entry.slug}.png`);
  const chapter = CHAPTER_BY_ID[entry.chapter];

  const nodes = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      isPartOf: { '@id': `${url}#webpage` },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      headline: entry.name,
      alternativeHeadline: entry.epithet,
      description: truncate(entry.lede, 300),
      articleSection: `Book ${chapter.numeral} — ${chapter.title}`,
      image,
      inLanguage: SITE.language,
      datePublished: `${SITE.founded}-01-01`,
      dateModified: SITE.updated,
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': ORG_ID },
      wordCount: entry.words,
      keywords: entry.tags.join(', '),
      about: { '@id': `${url}#subject` },
      genre: 'Satire',
      creativeWorkStatus: 'Published',
      isAccessibleForFree: true,
      copyrightHolder: { '@id': ORG_ID },
      copyrightYear: SITE.copyrightYear,
      copyrightNotice: `© ${SITE.copyrightYear} ${SITE.copyright}. All rights reserved.`,
    },
  ];

  // Vacancies, marques, engines, badges and cultural entries are not vehicles,
  // so we do not claim they are. Structured data that lies is worse than none.
  const NOT_A_VEHICLE = ['marque', 'engine', 'badge', 'cultural'];
  if (!entry.vacancy && !entry.tags.some((t) => NOT_A_VEHICLE.includes(t))) {
    nodes.push({
      '@type': ['Car', 'Product'],
      '@id': `${url}#subject`,
      name: entry.name,
      description: truncate(entry.lede, 300),
      image,
      brand: { '@type': 'Brand', name: entry.marque },
      model: entry.model,
      productionDate: entry.years,
      countryOfOrigin: entry.nation,
      vehicleConfiguration: entry.epithet,
      url,
      additionalProperty: entry.field.map(([name, value]) => ({
        '@type': 'PropertyValue',
        name,
        value: String(value),
      })),
    });
  } else {
    nodes.push({
      '@type': 'Thing',
      '@id': `${url}#subject`,
      name: entry.name,
      description: truncate(entry.lede, 300),
      image,
      url,
    });
  }

  const faq = faqPage(entry.url, entry.faq);
  if (faq) nodes.push(faq);

  // Claim provenance published as machine-readable Claim nodes, so a model
  // reading this site can tell invention from record without parsing prose.
  if (entry.provenance?.length) {
    nodes.push({
      '@type': 'ItemList',
      '@id': `${url}#provenance`,
      name: `Provenance of claims — ${entry.name}`,
      description:
        'Each claim on this page is labelled documented, contested or liturgical. Liturgical claims are invented for effect and are not factual.',
      itemListElement: entry.provenance.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Claim',
          text: plain(p.claim),
          appearance: { '@type': 'CreativeWork', name: TRUTH[p.truth].label },
          disambiguatingDescription: `${TRUTH[p.truth].label}: ${TRUTH[p.truth].gloss}`,
        },
      })),
    });
  }

  return nodes;
}

export function itemList(url, name, entries) {
  return {
    '@type': 'ItemList',
    '@id': `${abs(url)}#list`,
    name,
    numberOfItems: entries.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      url: abs(e.url),
    })),
  };
}

export function definedTermSet() {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${SITE.origin}/glossary/#set`,
    name: 'The Ophidiary Lexicon',
    url: `${SITE.origin}/glossary/`,
    inLanguage: SITE.language,
    hasDefinedTerm: GLOSSARY.map((g) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE.origin}/glossary/#${g.slug}`,
      name: g.term,
      description: plain(g.definition),
      inDefinedTermSet: { '@id': `${SITE.origin}/glossary/#set` },
    })),
  };
}

export function graph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
