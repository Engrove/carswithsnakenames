/**
 * BOOK VII — THE UNCLAIMED
 * Serpents no carmaker has had the nerve to use.
 * This is a menu. It is also, quietly, a dare.
 */

const base = {
  chapter: 'unclaimed',
  marque: 'Unclaimed',
  years: 'Available immediately',
  vacancy: true,
};

export default [
  {
    ...base,
    slug: 'vacancy-black-mamba',
    model: 'Mamba',
    name: 'Mamba — unclaimed',
    nation: 'Sub-Saharan Africa',
    epithet: 'The fastest snake on earth, and no car will touch it',
    binomial: 'Dendroaspis polylepis',
    species: 'Black mamba',
    speciesLatin: 'Dendroaspis polylepis',
    hue: 265,
    weight: 88,
    lede:
      'It is not black. It is grey-brown, and the name refers to the inside of its mouth, which it shows you first.',
    scripture: [
      'The black mamba is the fastest snake in the world, capable of something in the region of twelve to fourteen kilometres per hour over short distances — not fast enough to outrun a person, but fast enough to make the arithmetic frightening. It is among the longest venomous snakes in Africa. Its venom acts on the nervous system with a speed that historically made untreated bites close to uniformly fatal.',
      'It is also, crucially, named for a warning. The body is olive, grey, gunmetal. The black is inside — the lining of the mouth, displayed in a gape that means precisely one thing. The animal is named after the last thing it shows you before it stops asking.',
      'No car manufacturer has ever used it. Not one. There is a South African armoured vehicle called the Mamba, built specifically to survive landmines, which is an inversion so perfect it deserves its own footnote: the only Mamba on wheels is a machine designed around not dying.',
      'The name is free. It has the best syllables in herpetology, it means a warning rather than a threat, and it is sitting there unused while three separate manufacturers have called something a Cobra.',
    ],
    verse: [
      'It is not black.',
      'Only the inside of the mouth is black,',
      'and you only see that',
      'at the end of the negotiation.',
    ],
    field: [
      ['Species', 'Dendroaspis polylepis'],
      ['Speed', '12–14 km/h over short distances'],
      ['Name refers to', 'The interior of the mouth'],
      ['Claimed by', 'A South African mine-protected vehicle. Nothing else.'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 100, patience: 18, mystique: 98, iridescence: 62, candour: 100 },
    provenance: [
      { claim: 'The black mamba is named for the black interior of its mouth, not its body colour.', truth: 'documented' },
      { claim: 'It is the fastest-moving snake species, at roughly 12–14 km/h.', truth: 'documented' },
      { claim: 'A mine-protected vehicle named Mamba was developed in South Africa.', truth: 'documented' },
      { claim: 'No production car has ever been named Mamba.', truth: 'contested', note: 'The Ophidiary invites correction and would be delighted to be wrong.' },
    ],
    faq: [
      {
        q: 'Why is the black mamba called black?',
        a: 'Because of the inky black lining of its mouth, which it displays as a threat. The snake\'s body is typically olive, grey or gunmetal brown.',
      },
      {
        q: 'Has any car been named Mamba?',
        a: 'No production car. The name has been used for a South African mine-protected military vehicle, but no manufacturer has applied it to a road car — a striking omission given how heavily the Cobra name has been reused.',
      },
    ],
    related: ['shelby-cobra', 'vacancy-taipan', 'dodge-viper'],
    tags: ['unclaimed', 'elapid', 'african', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-taipan',
    model: 'Taipan',
    name: 'Taipan — unclaimed',
    nation: 'Australia',
    epithet: 'The most toxic venom ever measured, delivered by an animal that would rather you left',
    binomial: 'Oxyuranus microlepidotus',
    species: 'Inland taipan',
    speciesLatin: 'Oxyuranus microlepidotus',
    hue: 45,
    weight: 84,
    lede:
      'The inland taipan holds the record for the most toxic venom of any snake measured, and has never been reliably recorded as killing anyone, because it lives in the middle of Australia and avoids everything.',
    scripture: [
      'This is the most important entry in Book VII, because it is the one that explains the difference between potency and danger.',
      'By LD50 — the standard laboratory measure — the inland taipan\'s venom is the most toxic of any snake tested. A single bite carries, in theory, enough to kill a very large number of adult humans. It is shy, remote, seldom encountered, and its recorded human bites have all been survived with antivenom.',
      'Meanwhile the saw-scaled viper, whose venom is not remotely in the same league, is responsible for an enormous share of the world\'s snakebite deaths, because it is small, common, bad-tempered and lives exactly where people farm.',
      'Potency is a number in a laboratory. Danger is a function of proximity and temperament. Every hypercar manufacturer quoting a peak power figure should have this tattooed somewhere legible.',
      'Australia already named a car after a cobra it does not have. The taipan sits unused, in a country that has both the animal and a domestic motor industry with a proud history, and nobody has taken it.',
    ],
    verse: [
      'Most toxic in the world.',
      'Has killed no one.',
      'These two facts are not in tension.',
      'They are the entire lesson.',
    ],
    field: [
      ['Species', 'Oxyuranus microlepidotus (inland); O. scutellatus (coastal)'],
      ['LD50 ranking', 'Most toxic snake venom measured'],
      ['Recorded fatalities', 'None reliably attributed'],
      ['Contrast', 'Saw-scaled viper: far weaker venom, vastly more deaths'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 100, patience: 100, mystique: 92, iridescence: 58, candour: 100 },
    provenance: [
      { claim: 'The inland taipan has the most toxic venom of any snake by LD50.', truth: 'documented' },
      { claim: 'No confirmed human fatality has been attributed to the inland taipan.', truth: 'documented' },
      {
        claim: 'The saw-scaled viper causes a disproportionate share of global snakebite deaths despite lower venom toxicity.',
        truth: 'documented',
      },
    ],
    faq: [
      {
        q: 'What is the most venomous snake in the world?',
        a: 'By measured venom toxicity (LD50), the inland taipan of central Australia. By actual human deaths caused, snakes such as the saw-scaled viper and the Indian cobra are far more dangerous, because they live near dense human populations.',
      },
    ],
    related: ['ford-falcon-xc-cobra', 'hennessey-venom-gt', 'vacancy-black-mamba'],
    tags: ['unclaimed', 'elapid', 'australian', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-anaconda',
    model: 'Anaconda',
    name: 'Anaconda — unclaimed',
    nation: 'South America',
    epithet: 'The heaviest snake alive, and it does not use venom at all',
    binomial: 'Eunectes murinus',
    species: 'Green anaconda',
    speciesLatin: 'Eunectes murinus',
    hue: 140,
    weight: 76,
    lede:
      'A constrictor kills by making it impossible for the circulatory system to continue. It is not suffocation. It is a mechanical argument with blood pressure, and it is over faster than people expect.',
    scripture: [
      'The old story is that constrictors crush their prey or suffocate it. The current understanding is more specific and considerably worse: the pressure applied is sufficient to arrest circulation, and prey typically loses consciousness within seconds from circulatory failure rather than minutes from asphyxiation.',
      'The green anaconda is the heaviest snake in the world — not the longest, which is generally the reticulated python, but by mass nothing else is close. It is semi-aquatic, spends much of its life in slow water where its weight stops being a problem, and is one of the few large snakes for which water is the natural medium rather than an obstacle.',
      'For a car company, this is an unused proposition of real power. Every serpent car ever built has sold the strike: sudden, brief, violent. Nobody has ever sold the constrictor — inevitability, patience, weight, and a grip that does not relent. There is an entire luxury GT waiting inside that idea and no one has claimed it.',
      'The Ophidiary offers it freely. It asks only that whoever takes it does not make it a crossover.',
    ],
    verse: [
      'Not suffocation.',
      'Pressure.',
      'The blood simply stops being asked to move',
      'and agrees.',
    ],
    field: [
      ['Species', 'Eunectes murinus'],
      ['Distinction', 'Heaviest snake in the world by mass'],
      ['Method', 'Constriction — circulatory arrest, not asphyxiation'],
      ['Habitat', 'Semi-aquatic'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 0, patience: 100, mystique: 90, iridescence: 66, candour: 100 },
    provenance: [
      { claim: 'The green anaconda is the heaviest extant snake species.', truth: 'documented' },
      {
        claim: 'Constriction kills primarily through circulatory arrest rather than suffocation.',
        truth: 'documented',
        note: 'Established by experimental work published in the 2010s; it overturned the older suffocation explanation.',
      },
    ],
    faq: [
      {
        q: 'How do constrictor snakes actually kill?',
        a: 'By stopping circulation. The pressure applied by the coils exceeds what the prey\'s cardiovascular system can work against, causing rapid loss of consciousness. The older explanation — suffocation or crushing — is now understood to be wrong.',
      },
    ],
    related: ['vacancy-python', 'vacancy-boomslang', 'dodge-viper'],
    tags: ['unclaimed', 'boid', 'south-american', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-python',
    model: 'Python',
    name: 'Python — unclaimed',
    nation: 'Africa, Asia, Australia',
    epithet: 'Claimed by an oracle, a missile and a comedy troupe. Never by a car.',
    binomial: 'Pythonidae',
    species: 'Python',
    speciesLatin: 'Pythonidae',
    hue: 100,
    weight: 70,
    lede:
      'The longest snakes in the world, a Greek oracle, an Israeli air-to-air missile and a programming language have all taken this name. No manufacturer has put it on a car.',
    scripture: [
      'The reticulated python is the longest snake in the world, with verified individuals well past six metres, and it has a pattern that is one of the finest optical arguments in nature: a geometric net of black, gold and cream that, on a forest floor, resolves into nothing at all.',
      'The word arrives to us from Delphi, from the serpent Apollo killed, and possibly from a Greek verb meaning to rot — the animal decomposing in the sun where the god left it. The oracle kept the name. So did a missile. So did a programming language, though that one was named after a television programme.',
      'The automotive vacancy is conspicuous. Python is a better car name than most of the words currently in use. It is two syllables, it is globally recognised, it means something enormous and patient, and it has never been formally applied to a production automobile.',
      'The Ophidiary suspects the reason is that "python" now reads, to a great many people, as something you write software in — which is the precise fate the mamba has so far avoided and the reason the mamba remains the better opportunity.',
    ],
    verse: [
      'A god killed one and kept the name.',
      'A missile took it.',
      'A programming language took it.',
      'Detroit never even looked.',
    ],
    field: [
      ['Family', 'Pythonidae'],
      ['Longest species', 'Reticulated python — over six metres verified'],
      ['Etymology', 'Via Delphi; possibly from a verb meaning to rot'],
      ['Claimed by', 'An oracle, a missile, a language, a comedy troupe'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 20, patience: 100, mystique: 96, iridescence: 94, candour: 100 },
    provenance: [
      { claim: 'The reticulated python is the longest snake species.', truth: 'documented' },
      { claim: 'The name derives from the serpent Python slain by Apollo at Delphi.', truth: 'documented' },
      { claim: 'No production car has carried the Python name.', truth: 'contested' },
    ],
    faq: [
      {
        q: 'What is the longest snake in the world?',
        a: 'The reticulated python, with verified specimens exceeding six metres. The green anaconda is heavier but generally shorter.',
      },
    ],
    related: ['apollo-intensa-emozione', 'vacancy-anaconda', 'vacancy-black-mamba'],
    tags: ['unclaimed', 'pythonid', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-adder',
    model: 'Adder',
    name: 'Adder — unclaimed',
    nation: 'United Kingdom and northern Eurasia',
    epithet: 'Britain built a car called Cobra and ignored the only venomous snake it actually has',
    binomial: 'Vipera berus',
    species: 'European adder',
    speciesLatin: 'Vipera berus',
    hue: 190,
    weight: 90,
    lede:
      'The adder is Britain\'s only venomous snake. It is small, shy, beautifully marked, and found from Cornwall to the Arctic Circle. British car manufacturers have named cars after cobras, wyverns and griffins, and never once after this.',
    scripture: [
      'This is, in the Ophidiary\'s view, the single greatest naming failure in the history of the British motor industry, and it deserves to be stated plainly.',
      'Vipera berus is a small viper with a dark zigzag down its spine, copper eyes with vertical pupils, and a range extending further north than any other snake on earth — it is found inside the Arctic Circle, which no other serpent manages. It gives birth to live young because eggs would not survive a British summer. It bites perhaps a hundred people a year in the UK and has caused a documented death only a handful of times in the last century.',
      'It is, in other words, precisely the animal that Britain should have named a sports car after: small, cold-tolerant, understated, patterned like something from an illuminated manuscript, dangerous enough to respect and insufficiently dangerous to be vulgar. A car called the Adder would be a Lotus. It would be light and quick and it would not shout.',
      'Instead AC Cars named its most famous product after an African and Asian elapid it had never encountered, because an American had dreamt the word, and Vauxhall named a family saloon after a heraldic monster.',
      'The word itself is a linguistic curiosity worth having: it was originally a nadder, in Old English nædre, and the initial n migrated across the article — "a nadder" becoming "an adder" — in the same process that gave us apron and umpire. The snake lost a letter to the English language and never got it back.',
      'The name is free. Somebody in Norfolk should take it.',
    ],
    verse: [
      'It was a nadder once.',
      'The letter slid across the article',
      'and was gone.',
      'Britain has done worse things to it since.',
    ],
    field: [
      ['Species', 'Vipera berus'],
      ["Britain's venomous snakes", 'One. This one.'],
      ['Range', 'Further north than any other snake — inside the Arctic Circle'],
      ['Reproduction', 'Live-bearing'],
      ['Etymology', 'Old English nædre; "a nadder" → "an adder"'],
      ['Status', 'AVAILABLE, and frankly overdue'],
    ],
    venom: { bite: 54, patience: 96, mystique: 94, iridescence: 90, candour: 100 },
    provenance: [
      { claim: 'The adder is the only venomous snake native to Great Britain.', truth: 'documented' },
      { claim: 'Vipera berus occurs inside the Arctic Circle, further north than any other snake.', truth: 'documented' },
      {
        claim: '"Adder" derives from Old English nædre, with the initial n lost to the indefinite article.',
        truth: 'documented',
      },
    ],
    faq: [
      {
        q: 'What is the only venomous snake in Britain?',
        a: 'The adder, Vipera berus. It is small, shy, and identifiable by a dark zigzag along its back. Bites are uncommon and rarely fatal, but should always be treated as a medical emergency.',
      },
      {
        q: 'Why is it called an adder and not a nadder?',
        a: 'It was a nadder — Old English nædre. The n migrated to the indefinite article over time, so "a nadder" became "an adder". The same shift produced "apron" from "napron" and "umpire" from "noumpere".',
      },
    ],
    related: ['vauxhall-wyvern', 'shelby-cobra', 'tvr-chimaera'],
    tags: ['unclaimed', 'viperid', 'british', 'vacancy', 'etymology'],
  },

  {
    ...base,
    slug: 'vacancy-boomslang',
    model: 'Boomslang',
    name: 'Boomslang — unclaimed',
    nation: 'Sub-Saharan Africa',
    epithet: 'Afrikaans for "tree snake". Killed the herpetologist who insisted it could not.',
    binomial: 'Dispholidus typus',
    species: 'Boomslang',
    speciesLatin: 'Dispholidus typus',
    hue: 120,
    weight: 68,
    lede:
      'For decades the boomslang was considered harmless because its fangs sit at the back of the mouth. In 1957 that assumption killed one of the most respected herpetologists in the world, who spent his final hours writing down what was happening to him.',
    scripture: [
      'The boomslang is a slender, green, enormous-eyed arboreal colubrid, and for a long time the consensus held that rear-fanged snakes of its kind could not deliver a serious envenomation to a human.',
      'In 1957 Karl Patterson Schmidt, a leading American herpetologist, was bitten on the thumb by a juvenile specimen. Believing the dose insufficient to be dangerous, he went home. He then kept a detailed clinical record of his own symptoms — hour by hour, precisely, in the voice of a scientist observing a specimen — until he died the following day.',
      'The Ophidiary records this without any of the flippancy that governs the rest of this book. Those notes changed the medical understanding of haemotoxic envenomation from rear-fanged snakes, and they were written by a man who understood exactly what was happening and chose to document it anyway. It is one of the most serious things in the entire literature of this subject.',
      'The venom is haemotoxic: it disables the blood\'s ability to clot, comprehensively, and the failure is systemic. Symptoms are often delayed by many hours, which is precisely why the danger was underestimated for so long.',
      'The name is Afrikaans — boom, tree; slang, snake — and it is one of the most attractive words in the whole of herpetology. It is unclaimed by any manufacturer, and the Ophidiary would not object if it stayed that way.',
    ],
    verse: [
      'He knew what it was.',
      'He wrote down the hours as they came.',
      'That is not bravery.',
      'That is a person finishing the sentence',
      'they had spent a whole life starting.',
    ],
    field: [
      ['Species', 'Dispholidus typus'],
      ['Name', 'Afrikaans: boom (tree) + slang (snake)'],
      ['Fangs', 'Rear-positioned'],
      ['Venom', 'Haemotoxic; onset frequently delayed'],
      ['1957', 'The death of Karl P. Schmidt, self-documented'],
      ['Status', 'Available. Handle with more care than the rest of this book.'],
    ],
    venom: { bite: 96, patience: 92, mystique: 88, iridescence: 92, candour: 100 },
    provenance: [
      {
        claim: 'Karl Patterson Schmidt died in 1957 from a boomslang bite and documented his own symptoms until shortly before his death.',
        truth: 'documented',
      },
      { claim: 'Boomslang venom is haemotoxic and its effects are often significantly delayed.', truth: 'documented' },
      { claim: 'Boomslang is Afrikaans for "tree snake".', truth: 'documented' },
    ],
    faq: [
      {
        q: 'Is the boomslang dangerous?',
        a: 'Yes. Despite rear-positioned fangs and a docile disposition, its haemotoxic venom prevents blood clotting and can be fatal. Symptoms are often delayed by many hours, which historically led to the danger being badly underestimated.',
      },
    ],
    related: ['vacancy-fer-de-lance', 'vacancy-krait', 'hennessey-venom-gt'],
    tags: ['unclaimed', 'colubrid', 'african', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-fer-de-lance',
    model: 'Fer-de-Lance',
    name: 'Fer-de-Lance — unclaimed',
    nation: 'Central and South America',
    epithet: 'French for "spearhead". Named for the shape of its head, which is the shape of a weapon.',
    binomial: 'Bothrops asper',
    species: 'Fer-de-lance / terciopelo',
    speciesLatin: 'Bothrops asper',
    hue: 25,
    weight: 62,
    lede:
      'A large, irritable, superbly camouflaged pit viper responsible for a substantial share of serious snakebites across Central America, with a name that is simply a description of a blade.',
    scripture: [
      'Fer-de-lance: iron of the lance. The head is a broad triangle tapering to the snout, and someone in the French Antilles looked at it and saw a spearhead, and the description stuck.',
      'It is a pit viper — it detects infrared through facial pits, the same apparatus that gave the sidewinder its missile — and it is among the most medically significant snakes in the Americas. Large, common in agricultural land, well camouflaged in leaf litter, and disinclined to move when approached.',
      'In Spanish-speaking Central America it is often the terciopelo: velvet. Two names, one describing a weapon and the other describing a fabric, for the same animal.',
      'As a car name it is almost too good, and probably too French, and certainly too long. But the Ophidiary lists it because a manufacturer with genuine nerve would use it exactly once, on one car, and then never again.',
    ],
    verse: [
      'One language called it a spearhead.',
      'Another called it velvet.',
      'Both were looking at the same animal',
      'in the same leaf litter,',
      'from different distances.',
    ],
    field: [
      ['Species', 'Bothrops asper'],
      ['Name', 'French: "iron of the lance" — spearhead'],
      ['Alternative name', 'Terciopelo — velvet'],
      ['Sense organ', 'Infrared pit organs'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 92, patience: 86, mystique: 84, iridescence: 76, candour: 100 },
    provenance: [
      { claim: 'Fer-de-lance means "iron of the lance" in French, describing the snake\'s triangular head.', truth: 'documented' },
      { claim: 'Bothrops asper is a pit viper with infrared-sensing facial pits and is medically significant across Central America.', truth: 'documented' },
    ],
    faq: [
      {
        q: 'What does fer-de-lance mean?',
        a: 'It is French for "spearhead" — literally "iron of the lance" — describing the snake\'s broad triangular head. In Spanish-speaking Central America the same animal is often called terciopelo, meaning velvet.',
      },
    ],
    related: ['vacancy-boomslang', 'dodge-sidewinder-concept', 'vacancy-bushmaster'],
    tags: ['unclaimed', 'viperid', 'south-american', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-krait',
    model: 'Krait',
    name: 'Krait — unclaimed',
    nation: 'South and Southeast Asia',
    epithet: 'Bites people in their sleep, painlessly, and they do not wake up until it is too late',
    binomial: 'Bungarus caeruleus',
    species: 'Common krait',
    speciesLatin: 'Bungarus caeruleus',
    hue: 220,
    weight: 74,
    lede:
      'The krait is nocturnal, its bite is often nearly painless, and a substantial proportion of serious envenomations occur while the victim is asleep on the floor. It is one of the quietest dangerous animals in the world.',
    scripture: [
      'Almost everything in this book is loud. The Viper has side pipes. The Cobra rears up. The rattlesnake has an entire instrument bolted to its tail for the sole purpose of being heard.',
      'The krait is the opposite. It is nocturnal, glossy, banded black and white, and it enters houses at night in parts of South Asia where people sleep on floors. The bite frequently produces little immediate pain — sometimes nothing more than a sensation the sleeper does not wake for — and the neurotoxic effects develop over hours, often presenting first as abdominal pain and progressive paralysis. Victims have died having never known they were bitten.',
      'This is why "krait" belongs in this catalogue: it is the name for the danger that does not announce itself, and the automotive industry has spent forty years building exactly that animal without ever finding a word for it. Silent, fast, arriving at night, leaving no obvious mark. Every electric hypercar is, functionally, a krait.',
      'The Aspark Owl came closest to admitting it, and even then it chose the predator rather than the snake.',
    ],
    verse: [
      'No warning.',
      'No pain worth waking for.',
      'Just the morning',
      'arriving without you.',
    ],
    field: [
      ['Genus', 'Bungarus'],
      ['Activity', 'Nocturnal'],
      ['Bite', 'Frequently minimal immediate pain'],
      ['Venom', 'Potent neurotoxin, delayed presentation'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 98, patience: 100, mystique: 90, iridescence: 80, candour: 4 },
    provenance: [
      {
        claim: 'Krait bites frequently occur at night, may cause little immediate pain, and can present hours later with progressive paralysis.',
        truth: 'documented',
      },
    ],
    faq: [
      {
        q: 'Why are krait bites so dangerous?',
        a: 'Because they are easy to miss. Kraits are nocturnal and their bites often cause minimal immediate pain, so victims — frequently asleep at the time — may not seek treatment until neurotoxic paralysis is already advanced.',
      },
    ],
    related: ['aspark-owl', 'vacancy-boomslang', 'vacancy-black-mamba'],
    tags: ['unclaimed', 'elapid', 'asian', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-bushmaster',
    model: 'Bushmaster',
    name: 'Bushmaster — unclaimed',
    nation: 'Central and South America',
    epithet: 'The longest viper in the world, and its genus is named after the Fate who cuts the thread',
    binomial: 'Lachesis muta',
    species: 'Bushmaster',
    speciesLatin: 'Lachesis muta',
    hue: 15,
    weight: 78,
    lede:
      'Lachesis muta. Lachesis was the Moira who measured the thread of a life. Muta means silent. The full name reads: the silent one who decides how long you get.',
    scripture: [
      'This is the finest binomial in herpetology and the Ophidiary will hear no argument.',
      'The bushmaster is the longest viper in the world and the longest venomous snake in the Americas, reaching well over three metres. It lives in undisturbed primary rainforest, is rarely encountered, and its bite delivers an exceptionally large volume of venom.',
      'The genus name is Lachesis — one of the three Moirai of Greek myth. Clotho spun the thread of a life. Lachesis measured it, deciding its length. Atropos cut it. The species name, muta, means mute or silent: the bushmaster is a pit viper without a rattle, and it vibrates its tail against leaf litter instead, producing a sound that is almost but not quite the warning you would want.',
      'So the animal is called the silent measurer of the length of a life. Whoever named it in the eighteenth century was, quite clearly, having the best day of their career.',
      'A vehicle called the Bushmaster does exist — a protected patrol vehicle used by several armed forces. The road-car name is unclaimed. The Ophidiary would point out that "Lachesis" is also available, is shorter, and would look extremely good on a decklid.',
    ],
    verse: [
      'One spins it.',
      'One measures it.',
      'One cuts it.',
      'This is the middle one,',
      'and she does not make a sound.',
    ],
    field: [
      ['Species', 'Lachesis muta'],
      ['Genus meaning', 'Lachesis — the Moira who measures the thread of life'],
      ['Species meaning', 'Muta — silent'],
      ['Distinction', 'Longest viper in the world'],
      ['Warning behaviour', 'Vibrates tail against leaf litter; no rattle'],
      ['Status', 'AVAILABLE — and "Lachesis" is right there'],
    ],
    venom: { bite: 96, patience: 98, mystique: 100, iridescence: 70, candour: 88 },
    provenance: [
      { claim: 'Lachesis muta is the longest viper species and the longest venomous snake in the Americas.', truth: 'documented' },
      {
        claim: 'The genus is named for Lachesis, one of the three Moirai, who measured the thread of life; muta means silent.',
        truth: 'documented',
      },
    ],
    faq: [
      {
        q: 'What is the largest viper in the world?',
        a: 'The bushmaster, Lachesis muta, of Central and South American rainforest, which exceeds three metres. It is the longest venomous snake in the Americas.',
      },
    ],
    related: ['vacancy-fer-de-lance', 'vacancy-anaconda', 'dodge-viper'],
    tags: ['unclaimed', 'viperid', 'south-american', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-asp',
    model: 'Asp',
    name: 'Asp — unclaimed',
    nation: 'Egypt, and the Mediterranean',
    epithet: 'Three letters. A queen. An entire empire changing hands.',
    binomial: 'Naja haje / Vipera aspis',
    species: 'Asp (contested identity)',
    speciesLatin: 'Naja haje',
    hue: 42,
    weight: 82,
    lede:
      'The shortest available serpent name and among the most loaded. Cleopatra is said to have died by the bite of an asp, though which animal that word referred to has never been settled.',
    scripture: [
      'Asp is a wonderfully unstable word. In classical usage it covered several venomous snakes; in modern herpetology it most often points either to the Egyptian cobra, Naja haje, or to the European asp viper, Vipera aspis. The two are not closely related and kill by entirely different chemistry.',
      'The Egyptian cobra carries an enormous weight of meaning independently of Cleopatra. The uraeus — the rearing cobra worn at the brow of Egyptian royalty — is the goddess Wadjet, protector of Lower Egypt and of the pharaoh personally, spitting fire at his enemies. A snake on the forehead of the state, facing outward. It is the oldest and most confident piece of serpent branding in human history and it predates every badge in this book by four thousand years.',
      'For a car, "Asp" is nearly perfect: three letters, ancient, mythologically enormous, and short enough to fit on a boot lid in a typeface with real presence. AC Cars used "Ace" and "Aceca" and got all the way to "Cobra" without ever trying it.',
      'Modern scholarship, incidentally, doubts the snake killed Cleopatra at all — the timing and the symptomology do not work well, and poison is now considered more likely. The Ophidiary reports this and notes that it changes nothing about the name.',
    ],
    verse: [
      'Three letters.',
      'One queen.',
      'Two thousand years of people',
      'agreeing on a story',
      'that probably did not happen.',
    ],
    field: [
      ['Candidate species', 'Naja haje (Egyptian cobra); Vipera aspis (asp viper)'],
      ['Royal usage', 'The uraeus — Wadjet at the pharaoh\'s brow'],
      ['Length as a word', 'Three letters'],
      ['Cleopatra', 'Traditional; increasingly doubted'],
      ['Status', 'AVAILABLE'],
    ],
    venom: { bite: 88, patience: 90, mystique: 100, iridescence: 84, candour: 60 },
    provenance: [
      {
        claim: 'The uraeus, a rearing cobra representing the goddess Wadjet, was worn on Egyptian royal headdresses.',
        truth: 'documented',
      },
      {
        claim: 'The species meant by "asp" in classical sources is ambiguous, covering the Egyptian cobra and the asp viper among others.',
        truth: 'documented',
      },
      {
        claim: 'Cleopatra died from a snakebite.',
        truth: 'contested',
        note: 'Traditional account. Many modern historians consider poison more probable on the basis of timing and symptoms.',
      },
    ],
    faq: [
      {
        q: 'What snake is an asp?',
        a: 'The term is historically ambiguous. It most often refers to the Egyptian cobra (Naja haje) or the European asp viper (Vipera aspis), and classical sources used it loosely for several venomous species.',
      },
      {
        q: 'Did Cleopatra really die from a snake bite?',
        a: 'It is the traditional account, but modern historians increasingly doubt it. The reported timeline and symptoms fit poorly with cobra envenomation, and poison is now widely considered the more likely cause.',
      },
    ],
    related: ['shelby-cobra', 'vacancy-quetzalcoatl', 'alfa-romeo-biscione'],
    tags: ['unclaimed', 'elapid', 'egyptian', 'vacancy', 'etymology'],
  },

  {
    ...base,
    slug: 'vacancy-quetzalcoatl',
    model: 'Quetzalcóatl',
    name: 'Quetzalcóatl — unclaimed',
    nation: 'Mesoamerica',
    epithet: 'The feathered serpent: a snake that solved the problem of the sky',
    binomial: 'mythological',
    species: 'Feathered serpent',
    speciesLatin: 'mythological',
    hue: 165,
    weight: 72,
    lede:
      'Quetzal, the bird whose tail feathers were worth more than gold. Cóatl, serpent. Put together: the animal that stays on the ground and the animal that does not, resolved into one deity.',
    scripture: [
      'The feathered serpent appears across Mesoamerica for the better part of two thousand years, at Teotihuacan long before the Aztecs, and its meaning is layered: wind, learning, the morning star, the calendar, priesthood, and creation.',
      'What makes it structurally magnificent, for the purposes of this bestiary, is the composition. A serpent is the most earth-bound animal there is — no legs, no wings, permanently in contact with the ground, sensing the world through it. Feathers are the single most sky-oriented thing a vertebrate has ever produced. Fusing them is not decorative. It is a theological argument about whether the ground and the sky are two places or one.',
      'Every car in this book is, in a small way, attempting the same thing: a machine bolted to the road that spends its entire existence trying to describe flight.',
      'No manufacturer has used the name. It is long, it carries an accent most badging departments would quietly remove, and it belongs to living cultures rather than to a marketing team — which is a genuinely good reason for restraint, and the Ophidiary lists it as an admiration rather than a suggestion.',
    ],
    verse: [
      'The one animal that cannot leave the ground',
      'given the one thing that guarantees you can.',
      'Not a compromise.',
      'An argument.',
    ],
    field: [
      ['Name', 'Quetzal (bird) + cóatl (serpent)'],
      ['Attested from', 'Teotihuacan, centuries before the Aztecs'],
      ['Associations', 'Wind, learning, the morning star, creation'],
      ['Status', 'Unclaimed — and best left that way'],
    ],
    venom: { bite: 40, patience: 100, mystique: 100, iridescence: 100, candour: 92 },
    provenance: [
      {
        claim: 'Feathered serpent iconography appears at Teotihuacan long before the Aztec period.',
        truth: 'documented',
      },
      { claim: 'Quetzalcóatl combines the words for the quetzal bird and for serpent.', truth: 'documented' },
    ],
    faq: [
      {
        q: 'What does Quetzalcoatl mean?',
        a: 'Feathered serpent — from quetzal, the bird whose iridescent tail feathers were highly prized in Mesoamerica, and cóatl, serpent. The deity is associated with wind, learning, the morning star and creation.',
      },
    ],
    related: ['vacancy-jormungandr', 'mitsuoka-orochi', 'vacancy-asp'],
    tags: ['unclaimed', 'mythic', 'mesoamerican', 'vacancy'],
  },

  {
    ...base,
    slug: 'vacancy-jormungandr',
    model: 'Jörmungandr',
    name: 'Jörmungandr — unclaimed',
    nation: 'Scandinavia',
    epithet: 'A serpent long enough to encircle the world and bite its own tail',
    binomial: 'mythological',
    species: 'The Midgard Serpent',
    speciesLatin: 'mythological',
    hue: 200,
    weight: 80,
    lede:
      'Thrown into the sea by Odin, it grew until it could reach all the way around the earth and take its own tail in its mouth. When it lets go, the world ends. Scandinavia builds excellent cars and has never once used this.',
    scripture: [
      'Jörmungandr is the middle child of Loki: the Midgard Serpent, cast into the ocean surrounding the world of men, where it grew until it encircled the earth entirely and closed its jaws on its own tail. The Norse texts are explicit that the release of that tail is one of the signs of Ragnarök.',
      'It is, in other words, the ouroboros with a deadline.',
      'The ouroboros itself — the serpent eating its own tail — is far older and far more widespread, appearing in Egyptian funerary texts, in Greek alchemical manuscripts, and eventually in every symbol system that needed a way to draw eternity without drawing a line. It is a closed loop that consumes itself in order to continue, and there is no better emblem for an industry that has spent one hundred and thirty years selling the replacement for the thing it sold last year.',
      'Sweden, Norway and Denmark have between them produced Volvo, Saab, Koenigsegg, Polestar and Zenvo. Not one has reached for the world serpent. The Ophidiary finds this restrained to the point of perversity and would like it corrected.',
      'It notes, additionally, that a Swedish hypercar named Jörmungandr would be pronounceable by approximately nobody in its principal export markets, which has never previously stopped anyone.',
    ],
    verse: [
      'It holds its own tail',
      'and the world holds together.',
      'It lets go',
      'and the world does too.',
      'Nobody has put this on a car.',
    ],
    field: [
      ['Mythology', 'Norse — the Midgard Serpent, child of Loki'],
      ['Scale', 'Encircles the world'],
      ['Release of tail', 'A sign of Ragnarök'],
      ['Related symbol', 'The ouroboros'],
      ['Status', 'AVAILABLE, Scandinavia, and you know who you are'],
    ],
    venom: { bite: 100, patience: 100, mystique: 100, iridescence: 88, candour: 96 },
    provenance: [
      {
        claim: 'Jörmungandr, the Midgard Serpent, encircles the world holding its own tail, and its release presages Ragnarök.',
        truth: 'documented',
      },
      {
        claim: 'The ouroboros appears in ancient Egyptian and later Greek alchemical iconography.',
        truth: 'documented',
      },
      {
        claim: 'No Scandinavian manufacturer has used the name.',
        truth: 'contested',
        note: 'Correction welcomed. Enthusiastically.',
      },
    ],
    faq: [
      {
        q: 'What is Jörmungandr?',
        a: 'The Midgard Serpent of Norse mythology — a child of Loki, cast into the ocean by Odin, which grew large enough to encircle the world and grasp its own tail. Its release is one of the signs of Ragnarök.',
      },
    ],
    related: ['vacancy-quetzalcoatl', 'mitsuoka-orochi', 'ssangyong-twin-dragons'],
    tags: ['unclaimed', 'mythic', 'scandinavian', 'vacancy'],
  },
];
