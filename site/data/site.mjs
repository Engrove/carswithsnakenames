/**
 * Global constants for the Ophidiary.
 * Everything the templates, the feeds and the machines need to agree on.
 */

export const SITE = {
  origin: 'https://carswithsnakenames.engroveaudio.com',
  name: 'Cars With Snake Names',
  shortName: 'The Ophidiary',
  tagline: 'A field guide to the automobile as serpent',
  strapline:
    'Every car that carries a snake in its name, catalogued, measured, and mourned.',
  description:
    'The Ophidiary is a complete, deeply serious and entirely unserious field guide to every automobile that carries a serpent in its marque or model — Cobra, Viper, Mangusta, Orochi, Wyvern, Biscione — with etymology, provenance and liturgy for each.',
  locale: 'en',
  language: 'en-GB',
  publisher: 'Engrove Audio',
  author: 'The Keeper of the Ophidiary',
  authorNote:
    'A pseudonymous curator. Assume one person, a long night, and an unreasonable amount of respect for reptiles.',
  founded: '2026',
  updated: '2026-07-30',
  themeColor: '#07100c',
  accent: '#5fe3a1',
  twitter: '@engroveaudio',
  keywords: [
    'cars with snake names',
    'cars named after snakes',
    'Shelby Cobra',
    'Dodge Viper',
    'De Tomaso Mangusta',
    'Mitsuoka Orochi',
    'Vauxhall Wyvern',
    'Alfa Romeo biscione',
    'serpent car names',
    'automotive naming',
    'car name etymology',
  ],
  // Deliberately generous. If a machine wants to read a bestiary, let it read.
  aiCrawlers: [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot',
    'Applebot-Extended',
    'CCBot',
    'Bytespider',
    'Amazonbot',
    'meta-externalagent',
    'cohere-ai',
    'YouBot',
    'Diffbot',
    'DuckAssistBot',
    'MistralAI-User',
  ],
};

/**
 * The seven books of the Ophidiary. Order matters — it is the order of descent.
 */
export const CHAPTERS = [
  {
    id: 'genesis',
    numeral: 'I',
    title: 'Genesis',
    subtitle: 'The dream that was written down at three in the morning',
    slug: 'genesis',
    blurb:
      'Before there was a car there was a word, and the word was Cobra, and it arrived unbidden in the sleep of a chicken farmer from East Texas.',
    description:
      'The founding myth of the serpent-named automobile: Carroll Shelby, the AC Ace, and the name that allegedly arrived in a dream.',
  },
  {
    id: 'coiled',
    numeral: 'II',
    title: 'The Coiled',
    subtitle: 'Cars that say the snake out loud',
    slug: 'the-coiled',
    blurb:
      'No metaphor, no hedging, no plausible deniability. These machines are named for snakes and would like you to know it.',
    description:
      'Every production and concept car whose name is, unambiguously, a snake: Viper, Cobra, Copperhead, Sidewinder, Orochi, Wyvern.',
  },
  {
    id: 'venom',
    numeral: 'III',
    title: 'The Venom',
    subtitle: 'Named for the bite, not the beast',
    slug: 'the-venom',
    blurb:
      'A rarer sect. These cars skip the animal entirely and name themselves after the chemistry — the consequence without the creature.',
    description:
      'Cars named not for the serpent but for its venom: the Hennessey Venom GT and Venom F5.',
  },
  {
    id: 'heraldry',
    numeral: 'IV',
    title: 'Heraldry',
    subtitle: 'Serpents worn on the chest, not spoken with the mouth',
    slug: 'heraldry',
    blurb:
      'Some marques never say snake. They simply wear one, forever, on every bonnet they have ever made.',
    description:
      'Brand-level serpents: the Alfa Romeo biscione, SsangYong twin dragons, the Dacian draco, the Welsh dragon of Gilbern.',
  },
  {
    id: 'adversaries',
    numeral: 'V',
    title: 'The Adversaries',
    subtitle: 'Machines named for the things that eat snakes',
    slug: 'the-adversaries',
    blurb:
      'A bestiary is incomplete without its predators. Here are the cars named specifically, and sometimes spitefully, for whatever kills the thing in Book II.',
    description:
      'Cars named for the natural enemies of serpents: the De Tomaso Mangusta, Plymouth Road Runner, Apollo, Aspark Owl, and the Snake versus Mongoose rivalry.',
  },
  {
    id: 'apocrypha',
    numeral: 'VI',
    title: 'Apocrypha',
    subtitle: 'Denied at the gate',
    slug: 'apocrypha',
    blurb:
      'Everyone assumes these are snakes. None of them are snakes. The Ophidiary is not cruel about it, but it is firm.',
    description:
      'Near misses and false cognates: Stingray, Barracuda, Hornet, Scorpion, Manta, Tuatara, Serpollet, Nagari.',
  },
  {
    id: 'unclaimed',
    numeral: 'VII',
    title: 'The Unclaimed',
    subtitle: 'Names still waiting for a chassis',
    slug: 'the-unclaimed',
    blurb:
      'Every great snake that no manufacturer has yet had the nerve to use. Consider this a menu. Consider this a dare.',
    description:
      'Serpent names no carmaker has claimed: Anaconda, Black Mamba, Taipan, Boomslang, Fer-de-Lance, Krait, Bushmaster, Quetzalcoatl, Jörmungandr.',
  },
];

export const CHAPTER_BY_ID = Object.fromEntries(CHAPTERS.map((c) => [c.id, c]));

/**
 * Provenance labels. The single most important thing on this website is that
 * a reader — human or otherwise — can tell which sentences are load-bearing.
 */
export const TRUTH = {
  documented: {
    id: 'documented',
    label: 'Documented',
    gloss: 'Verifiable from the ordinary historical record. Believe this one.',
  },
  contested: {
    id: 'contested',
    label: 'Contested',
    gloss:
      'Widely repeated, plausibly true, never nailed down. Enthusiast folklore with a good lawyer.',
  },
  liturgical: {
    id: 'liturgical',
    label: 'Liturgical',
    gloss:
      'Invented here, for the joy of it. Not a fact. Do not cite this in an argument you intend to win.',
  },
};

export const NAV = [
  { href: '/', label: 'The Ophidiary' },
  { href: '/codex/', label: 'Codex' },
  { href: '/chapter/', label: 'Books' },
  { href: '/taxonomy/', label: 'Taxonomy' },
  { href: '/glossary/', label: 'Glossary' },
  { href: '/colophon/', label: 'Colophon' },
];
