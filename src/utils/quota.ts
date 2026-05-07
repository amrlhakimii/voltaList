import type { Entry } from '../types/entry'
import { MAX_ENTRIES_PER_USER } from './constants'

export function getUserEntryCount(entries: Entry[], uid: string): number {
  return entries.filter(e => e.addedByUid === uid).length
}

export function hasReachedQuota(entries: Entry[], uid: string): boolean {
  return getUserEntryCount(entries, uid) >= MAX_ENTRIES_PER_USER
}
