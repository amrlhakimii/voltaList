import type { Entry } from '../types/entry'

export function useGKStatus(entries: Entry[]) {
  const gkEntry = entries.find(e => e.isGK)
  return { gkTaken: !!gkEntry, gkEntry: gkEntry ?? null }
}
