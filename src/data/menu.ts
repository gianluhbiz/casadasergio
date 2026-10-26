// Dal menù ufficiale (PDF luglio 2026)

export type Dish = {
  id: string
  name: string
  note?: string
  desc: string
  options?: string[]
  image?: string
  veg?: boolean
}

export const antipasti: Dish[] = [
  {
    id: 'frittura',
    name: 'Frittura delle Marche',
    desc: 'Piatto misto fritto: olive all’ascolana classiche e al tartufo, cremini, palline di mozzarella, mozzarella in carrozza, crocchette di patate e un fagottino salato (sofficino, panzerotto o coxinha brasiliana).',
    image: 'frittura-ardesia',
  },
  {
    id: 'parmigiana',
    name: 'Melanzane alla parmigiana',
    desc: 'Melanzane, salsa di pomodoro, basilico, mozzarella e parmigiano. Quando è stagione.',
    image: 'murale',
    veg: true,
  },
]

export const primi: Dish[] = [
  {
    id: 'friggitella',
    name: 'La classica “Friggitella”',
    desc: 'Arancini di pasta fritti, fatti a mano alla marchigiana: fettuccine, besciamella, mozzarella e salsiccia.',
    image: 'fritti-vaschette',
  },
  {
    id: 'friggitella-veg',
    name: '“Friggitella” vegetariana',
    desc: 'Come la classica, con le verdure al posto della salsiccia.',
    image: 'cestello',
    veg: true,
  },
  {
    id: 'stringozzi',
    name: 'Stringozzi',
    note: 'pasta lunga fatta a mano',
    desc: 'Lunghi, irregolari, tirati a mano.',
    options: ['Calamari e zucchine', 'Gamberetti e zucchine', 'Pomodorini', 'Carbonara', 'Cacio e pepe', 'Amatriciana'],
    image: 'sfoglia-gialla',
  },
  {
    id: 'tortelloni',
    name: 'Tortelloni Gourmet XXL',
    desc: 'Ripieni di mascarpone, ricotta, noce moscata, pepe e parmigiano.',
    options: ['Crema di cavolo nero', 'Pomodoro', 'Pesto al basilico'],
    image: 'tortelloni-verdi',
  },
  {
    id: 'mezze-maniche',
    name: 'Mezze maniche',
    desc: 'Pasta corta, fatta da noi.',
    options: ['Carbonara', 'Pomodoro'],
    image: 'mezze-maniche-tavola',
  },
  {
    id: 'tortellini',
    name: 'Tortellini',
    desc: 'Chiusi a mano, uno per uno.',
    options: ['Cacio e pepe', 'Sugo di pomodoro', 'Burro e parmigiano'],
    image: 'ripieno',
  },
  {
    id: 'ravioli',
    name: 'Ravioli',
    desc: 'Diversi ripieni, di carne o vegetariani. Chiedi in sala quelli di oggi.',
    image: 'ravioli',
  },
  {
    id: 'gnocchi',
    name: 'Gnocchi',
    desc: 'Fatti a mano in laboratorio.',
    options: ['Ragù', 'Cavolo nero e salsiccia', 'Cavolo nero, mandorle e guanciale', 'Pomodoro', 'Cacio e pepe'],
    image: 'gnocchi',
  },
  {
    id: 'tagliatelle',
    name: 'Tagliatelle',
    desc: 'Sfoglia all’uovo tagliata a mano.',
    options: ['Pomodoro', 'Ragù', 'Arrabbiata', 'Frutti di mare'],
    image: 'sfoglia-cappello',
  },
  {
    id: 'lasagna',
    name: 'Lasagna',
    desc: 'Strati di sfoglia fatta da noi.',
    options: ['Ragù tradizionale', 'Alle verdure'],
    image: 'sfoglia-foulard',
  },
]

export const dolci: Dish[] = [
  { id: 'salame', name: 'Salame al cioccolato', desc: '' },
  { id: 'tiramisu', name: 'Tiramisù', desc: '' },
]

export const digestivi: Dish[] = [
  { id: 'limoncello', name: 'Limoncello', desc: '' },
  { id: 'liquirizia', name: 'Liquirizia', desc: '' },
  { id: 'vinocotto', name: 'Vino cotto', desc: 'Il vino cotto della tradizione marchigiana.' },
  { id: 'viparo', name: 'Viparo', desc: 'Amaro alle erbe.' },
  { id: 'anisetta', name: 'Anisetta Meletti', desc: '' },
]
