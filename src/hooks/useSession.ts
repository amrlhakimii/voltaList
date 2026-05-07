import { useEffect, useState } from 'react'
import { subscribeToSession, subscribeToSessions } from '../firebase/sessionService'
import type { Session } from '../types/session'

export function useSession(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    return subscribeToSession(
      sessionId,
      s => { setSession(s); setLoading(false) },
      () => setLoading(false),
    )
  }, [sessionId])

  return { session, loading }
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return subscribeToSessions(
      s => { setSessions(s); setLoading(false) },
      () => setLoading(false),
    )
  }, [])

  return { sessions, loading }
}
