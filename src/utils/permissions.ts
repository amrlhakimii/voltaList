import type { Entry } from '../types/entry'

export function canRemoveEntry(
  entry: Entry,
  userUid: string | null,
  isCaptain: boolean,
): boolean {
  if (isCaptain) return true
  return entry.addedByUid === userUid
}
