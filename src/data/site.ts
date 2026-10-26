// Fonti: casadasergio.it, menù PDF 2026, Google Maps, TripAdvisor, Instagram @casadasergio

export const site = {
  name: 'Casa da Sergio',
  legalName: 'Casa da Sergio Società Cooperativa Sociale Onlus',
  vat: '02447180445',
  motto: 'Quando cucinare diventa inclusione',
  igBio: 'Che la diversità non sia mai causa di divisione, ma ricchezza fenomenale.',
  phone: '+39 339 660 9398',
  phoneHref: 'tel:+393396609398',
  whatsapp: '393396609398',
  email: 'info@casadasergio.it',
  address: 'Via Romolo Murri, 26',
  city: '63900 Marina Palmense (FM)',
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Casa+Da+Sergio+cooperativa+sociale+Onlus+Marina+Palmense',
  instagram: 'https://www.instagram.com/casadasergio/',
  facebook: 'https://www.facebook.com/casadasergio/',
  tripadvisor:
    'https://www.tripadvisor.it/Restaurant_Review-g1741825-d17704332-Reviews-Da_Sergio_Pasta_Fresca-Marina_Palmense_Fermo_Province_of_Fermo_Marche.html',
  google:
    'https://www.google.com/maps/place/Casa+Da+Sergio+cooperativa+sociale+Onlus/@43.1478411,13.8117158,17z',
  iban: 'IT48 U034 4069 6600 0000 0195 600',
  bic: 'BDBDIT22',
  bank: 'Banco di Desio e della Brianza',
  ratings: {
    google: { value: '4,7', count: 228 },
    tripadvisor: { value: '4,7', count: 35 },
  },
  tastingPrice: 25,
}

export const team = {
  sala: ['Michela', 'Chicca', 'Evey', 'Simov'],
  cucina: ['Bobocà', 'Alessio', 'Matteo', 'Marco', 'Sabrina', 'Giulia'],
  musica: ['Mattia'],
}

// Orari da Google Maps (ottobre 2026). 0 = domenica.
export const hours: Record<number, [number, number][]> = {
  0: [[10, 15]],
  1: [],
  2: [[9, 15]],
  3: [[9, 15]],
  4: [[11, 14], [16, 18]],
  5: [[10, 15]],
  6: [[10, 15]],
}

export const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
export const dayShort = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

export type Review = {
  title: string
  text: string
  author: string
  when: string
  who: string
  source: 'TripAdvisor' | 'Google'
}

export const reviews: Review[] = [
  {
    title: 'Compleanno da favola',
    text: 'Stringozzi con totani e zucchine croccanti, fettuccine fritte al cavolo nero, ravioli di ricotta e mascarpone, fritti misti eccezionali. Conto onestissimo. Ad agosto ho già il tavolo prenotato.',
    author: 'FRN',
    when: 'giu 2026',
    who: 'In famiglia',
    source: 'TripAdvisor',
  },
  {
    title: 'Da provare assolutamente',
    text: 'Trovato per caso, e mai caso fu più fortunato: ravioli spaziali e olive ascolane deliziose, tutto fatto da loro.',
    author: 'Roberta G.',
    when: 'set 2025',
    who: 'In coppia',
    source: 'TripAdvisor',
  },
  {
    title: 'Olive ascolane meravigliose',
    text: 'Siamo della zona e di olive ce ne intendiamo. Queste sono da non perdere. E i ravioli, deliziosi anche quelli.',
    author: 'Emanuele C.',
    when: 'gen 2025',
    who: 'In coppia',
    source: 'TripAdvisor',
  },
  {
    title: 'Genuinità e atmosfera',
    text: 'Cercavamo sapori veri e abbiamo trovato anche persone genuine. Seduti sotto un ulivo e le stelle.',
    author: 'Sonia',
    when: 'set 2022',
    who: 'In coppia',
    source: 'TripAdvisor',
  },
  {
    title: 'Pasta all’uovo sensazionale',
    text: 'Abbiamo comprato le olive e i ravioli di carne, conditi a casa con burro e salvia: strepitosi.',
    author: 'Laura',
    when: 'gen 2025',
    who: 'Da asporto',
    source: 'TripAdvisor',
  },
  {
    title: 'Tutto speciale',
    text: 'Sembra di fare un picnic in mezzo ad amici. Tre primi buonissimi e assaggi di fritto. Ho lasciato il cuore sul pecorino fritto.',
    author: 'Filippo C.',
    when: 'lug 2023',
    who: 'In famiglia',
    source: 'TripAdvisor',
  },
  {
    title: 'Grande Sergio',
    text: 'Cucina top con ingredienti a km 0 coltivati da loro. E grande il cane presidente Oz.',
    author: 'Stefano F.',
    when: 'set 2024',
    who: 'In coppia',
    source: 'TripAdvisor',
  },
  {
    title: 'Consigliatissimo',
    text: 'Un giardino splendido di ulivi e uno staff che unisce simpatia e spirito di comunità. Cibo ottimo.',
    author: 'Mattia L.',
    when: 'ago 2024',
    who: 'Con amici',
    source: 'TripAdvisor',
  },
]

export const img = (name: string) => ({
  src: `/img/${name}.webp`,
  srcSet: `/img/${name}-sm.webp 640w, /img/${name}.webp 1024w`,
})
