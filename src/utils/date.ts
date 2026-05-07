import type { Timestamp } from 'firebase/firestore'

export function formatDate(timestamp: Timestamp | null | undefined): string {
  if (!timestamp) return 'Date TBD'
  try {
    return timestamp.toDate().toLocaleDateString('en-MY', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}
