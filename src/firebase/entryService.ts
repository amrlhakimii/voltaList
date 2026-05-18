import {
  collection,
  collectionGroup,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firestore'
import type { Entry } from '../types/entry'

export function subscribeToEntries(
  sessionId: string,
  callback: (entries: Entry[]) => void,
): () => void {
  const q = query(
    collection(db, 'sessions', sessionId, 'entries'),
    orderBy('addedAt', 'asc'),
  )
  return onSnapshot(q, snapshot => {
    const entries = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Entry))
    callback(entries)
  })
}

export async function addEntry(
  sessionId: string,
  entry: Omit<Entry, 'id' | 'addedAt'>,
): Promise<void> {
  await addDoc(collection(db, 'sessions', sessionId, 'entries'), {
    ...entry,
    addedAt: serverTimestamp(),
  })
}

export async function removeEntry(sessionId: string, entryId: string): Promise<void> {
  await deleteDoc(doc(db, 'sessions', sessionId, 'entries', entryId))
}

export function subscribeToUserEntries(
  uid: string,
  callback: (items: Array<{ sessionId: string; isGK: boolean }>) => void,
): () => void {
  const q = query(collectionGroup(db, 'entries'), where('addedByUid', '==', uid))
  return onSnapshot(q, snapshot => {
    const items = snapshot.docs.map(d => ({
      sessionId: d.ref.parent.parent!.id,
      isGK: (d.data() as Entry).isGK,
    }))
    callback(items)
  })
}
