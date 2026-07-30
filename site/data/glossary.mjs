/**
 * The Lexicon. Published as a schema.org DefinedTermSet because machines
 * deserve a glossary too.
 */

export const GLOSSARY = [
  {
    term: 'Ophidiary',
    slug: 'ophidiary',
    definition:
      'A catalogue of serpents. Coined here by analogy with bestiary and aviary, from Ophidia, an older name for the snake group. This website is one.',
  },
  {
    term: 'Serpentes',
    slug: 'serpentes',
    definition:
      'The suborder containing all snakes, nested within the order Squamata. Snakes evolved from within the lizards; a snake is, cladistically, a lizard that has committed to a decision.',
  },
  {
    term: 'Squamata',
    slug: 'squamata',
    definition:
      'The order of scaled reptiles, containing lizards, snakes and amphisbaenians. It is the largest order of reptiles and the reason the Wiesmann gecko counts as a genuine relative of the Dodge Viper.',
  },
  {
    term: 'Elapid',
    slug: 'elapid',
    definition:
      'A member of the family Elapidae: fixed front fangs, generally neurotoxic venom. Cobras, mambas, taipans, kraits, coral snakes and all sea snakes. The Shelby Cobra is an elapid by name.',
  },
  {
    term: 'Viperid',
    slug: 'viperid',
    definition:
      'A member of the family Viperidae: long hinged fangs that fold against the roof of the mouth, generally haemotoxic or cytotoxic venom, and an ambush hunting strategy. The Dodge Viper is a viperid by name and, arguably, by conduct.',
  },
  {
    term: 'Pit organ',
    slug: 'pit-organ',
    definition:
      'A heat-sensing structure between the eye and nostril of pit vipers, capable of detecting infrared radiation. It is why the AIM-9 Sidewinder missile is named after a rattlesnake rather than after anything that flies.',
  },
  {
    term: 'LD50',
    slug: 'ld50',
    definition:
      'The dose of a substance that kills half of a test population. The standard laboratory measure of venom toxicity, and a number that correlates poorly with how dangerous a snake actually is to people.',
  },
  {
    term: 'Venom',
    slug: 'venom',
    definition:
      'A toxin actively delivered through a wound by a dedicated apparatus. Distinct from poison, which is passive and must be ingested or absorbed. Every car named Venom is naming the delivery, not the chemistry.',
  },
  {
    term: 'Neurotoxin',
    slug: 'neurotoxin',
    definition:
      'Venom that acts on the nervous system, typically by interfering with signal transmission at the neuromuscular junction. Characteristic of elapids. Produces paralysis rather than tissue destruction.',
  },
  {
    term: 'Haemotoxin',
    slug: 'haemotoxin',
    definition:
      'Venom that acts on blood and blood vessels, frequently by disrupting coagulation. Characteristic of many vipers and of the boomslang. Effects may be severely delayed.',
  },
  {
    term: 'Biscione',
    slug: 'biscione',
    definition:
      'The heraldic serpent of the Visconti of Milan, shown crowned with a human figure at its mouth. It has appeared on the badge of every Alfa Romeo since 1910.',
  },
  {
    term: 'Wyvern',
    slug: 'wyvern',
    definition:
      'A heraldic serpent-dragon with two legs, wings and a barbed tail. Distinguished from a dragon by having two legs rather than four. Vauxhall sold one to British families from 1948 to 1957.',
  },
  {
    term: 'Draco',
    slug: 'draco',
    definition:
      'The Dacian military standard: a metal head with a long fabric body that inflated in the wind and howled as the bearer rode. Later adopted by Roman cavalry, and an ancestor of European dragon heraldry.',
  },
  {
    term: 'Ouroboros',
    slug: 'ouroboros',
    definition:
      'A serpent devouring its own tail, symbolising cyclical renewal. Attested in ancient Egyptian funerary texts and in Greek alchemical manuscripts. The most accurate available diagram of the motor industry.',
  },
  {
    term: 'Uraeus',
    slug: 'uraeus',
    definition:
      'The rearing cobra worn at the brow of Egyptian royalty, representing the goddess Wadjet. The oldest confident piece of serpent branding in human history.',
  },
  {
    term: 'Brumation',
    slug: 'brumation',
    definition:
      'The reptilian analogue of hibernation: a prolonged period of dormancy in cold conditions, from which the animal emerges unchanged. Applied in this Ophidiary to any significant car that spent decades in a lock-up.',
  },
  {
    term: 'Batesian mimicry',
    slug: 'batesian-mimicry',
    definition:
      'When a harmless species evolves to resemble a dangerous one and gains protection from the resemblance. The scarlet kingsnake does it to the coral snake. The Mustang Cobra II did it to the Shelby Cobra.',
  },
  {
    term: 'Threat display',
    slug: 'threat-display',
    definition:
      'A signal intended to avoid a fight by advertising the cost of starting one. A cobra\'s hood, a rattle, a saw-scaled viper\'s rasp, and the idle of a large naturally aspirated V8 are functionally identical.',
  },
  {
    term: 'Rhynchocephalia',
    slug: 'rhynchocephalia',
    definition:
      'The reptile order that split from Squamata around 250 million years ago and now contains only the tuatara. The SSC Tuatara is named after the last survivor of the branch that lost.',
  },
  {
    term: 'Nāga',
    slug: 'naga',
    definition:
      'A semi-divine serpent of Indian and Southeast Asian tradition, associated with water, rain, treasure and the guarding of thresholds. Not the origin of the Bolwell Nagari, however much it sounds like it.',
  },
  {
    term: 'Liturgical',
    slug: 'liturgical',
    definition:
      'In this Ophidiary, a provenance label marking a statement as invented for effect rather than reported as fact. Every claim on this site carries one of three labels: documented, contested or liturgical.',
  },
];

export const GLOSSARY_BY_SLUG = Object.fromEntries(GLOSSARY.map((g) => [g.slug, g]));
