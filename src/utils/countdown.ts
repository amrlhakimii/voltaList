import type { Timestamp } from 'firebase/firestore'

export function getCountdown(date: Timestamp | null | undefined, timeStart: string): string {
  if (!date) return ''
  try {
    const d = date.toDate()
    const [h, m] = timeStart.split(':').map(Number)
    const matchTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m)
    const diff = matchTime.getTime() - Date.now()

    if (diff <= 0) return 'Started'

    const days = Math.floor(diff / 86_400_000)
    const hours = Math.floor((diff % 86_400_000) / 3_600_000)
    const mins = Math.floor((diff % 3_600_000) / 60_000)

    if (days > 0) return `${days}d ${hours}h to kickoff`
    if (hours > 0) return `${hours}h ${mins}m to kickoff`
    return `${mins}m to kickoff`
  } catch {
    return ''
  }
}
