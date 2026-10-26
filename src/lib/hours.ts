import { dayNames, dayShort, hours } from '../data/site'

// Ora attuale a Marina Palmense, indipendente dal fuso di chi visita
export function romeNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return { day: map[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const pad = (h: number) => `${String(h).padStart(2, '0')}:00`

export function formatSlots(day: number) {
  const slots = hours[day]
  if (!slots.length) return 'Chiuso'
  return slots.map(([a, b]) => `${pad(a)}–${pad(b)}`).join(' · ')
}

export type OpenStatus = { open: boolean; label: string; today: number }

export function openStatus(date = new Date()): OpenStatus {
  const { day, minutes } = romeNow(date)
  const current = hours[day].find(([a, b]) => minutes >= a * 60 && minutes < b * 60)
  if (current) return { open: true, label: `Aperto ora · fino alle ${pad(current[1])}`, today: day }

  const laterToday = hours[day].find(([a]) => minutes < a * 60)
  if (laterToday) return { open: false, label: `Chiuso · apre alle ${pad(laterToday[0])}`, today: day }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    if (hours[d].length) {
      const when = i === 1 ? 'domani' : dayShort[d].toLowerCase()
      return { open: false, label: `Chiuso · riapre ${when} alle ${pad(hours[d][0][0])}`, today: day }
    }
  }
  return { open: false, label: 'Chiuso', today: day }
}

// Prossimi giorni di apertura, per scegliere quando venire
export function nextOpenDays(count = 6, date = new Date()) {
  const { day } = romeNow(date)
  const out: { label: string; sub: string; value: string }[] = []
  for (let i = 0; out.length < count && i < 14; i++) {
    const d = (day + i) % 7
    if (!hours[d].length) continue
    const real = new Date(date.getTime() + i * 86400000)
    const dm = real.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', timeZone: 'Europe/Rome' })
    const label = i === 0 ? 'Oggi' : i === 1 ? 'Domani' : dayShort[d]
    out.push({ label, sub: dm, value: `${i === 0 ? 'oggi' : i === 1 ? 'domani' : dayNames[d].toLowerCase()} ${dm}` })
  }
  return out
}
