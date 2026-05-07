import { useAuth } from './useAuth'
import { getUserEntryCount, hasReachedQuota } from '../utils/quota'
import { MAX_ENTRIES_PER_USER } from '../utils/constants'
import type { Entry } from '../types/entry'

export function useQuota(entries: Entry[]) {
  const { user } = useAuth()
  const uid = user?.uid ?? ''
  return {
    count: getUserEntryCount(entries, uid),
    reached: hasReachedQuota(entries, uid),
    max: MAX_ENTRIES_PER_USER,
  }
}
