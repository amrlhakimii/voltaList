import { useEffect, useState } from 'react'
import { subscribeToEntries } from '../firebase/entryService'
import type { Entry } from '../types/entry'

export function useEntries(sessionId: string) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) return
    return subscribeToEntries(sessionId, e => {
      setEntries(e)
      setLoading(false)
    })
  }, [sessionId])

  return { entries, loading }
}
