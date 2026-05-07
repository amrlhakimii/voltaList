import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firestore'
import type { Session } from '../types/session'

export function subscribeToSessions(
  callback: (sessions: Session[]) => void,
  onError?: (err: Error) => void,
): () => void {
  const q = query(collection(db, 'sessions'), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    snapshot => {
      const sessions = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Session))
      callback(sessions)
    },
    err => {
      console.error('subscribeToSessions error:', err)
      onError?.(err)
    },
  )
}

export function subscribeToSession(
  sessionId: string,
  callback: (session: Session | null) => void,
  onError?: (err: Error) => void,
): () => void {
  return onSnapshot(
    doc(db, 'sessions', sessionId),
    snap => {
      callback(snap.exists() ? ({ id: snap.id, ...snap.data() } as Session) : null)
    },
    err => {
      console.error('subscribeToSession error:', err)
      onError?.(err)
    },
  )
}

export async function createSession(
  data: Omit<Session, 'id' | 'createdAt' | 'isOpen'>,
): Promise<string> {
  const ref = await addDoc(collection(db, 'sessions'), {
    ...data,
    createdAt: serverTimestamp(),
    isOpen: true,
  })
  return ref.id
}

export async function toggleSession(sessionId: string, isOpen: boolean): Promise<void> {
  await updateDoc(doc(db, 'sessions', sessionId), { isOpen })
}

export { Timestamp }
