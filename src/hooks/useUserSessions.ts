import { useState, useEffect } from 'react'
import { subscribeToUserEntries } from '../firebase/entryService'
import { useSessions } from './useSession'

export function useUserSessions(uid: string | null) {
  const [userEntries, setUserEntries] = useState<Array<{ sessionId: string; isGK: boolean }>>([])
  const [entriesLoading, setEntriesLoading] = useState(true)
  const { sessions: allSessions, loading: sessionsLoading } = useSessions()

  useEffect(() => {
    if (!uid) {
      setEntriesLoading(false)
      return
    }
    return subscribeToUserEntries(uid, items => {
      setUserEntries(items)
      setEntriesLoading(false)
    })
  }, [uid])

  const sessionIds = new Set(userEntries.map(e => e.sessionId))
  const sessions = allSessions.filter(s => sessionIds.has(s.id))
  const gkCount = new Set(userEntries.filter(e => e.isGK).map(e => e.sessionId)).size

  return {
    sessions,
    gkCount,
    loading: entriesLoading || sessionsLoading,
  }
}
