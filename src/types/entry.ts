import type { Timestamp } from 'firebase/firestore'

export interface Entry {
  id: string
  playerName: string
  isGK: boolean
  addedByUid: string
  addedByEmail: string
  addedByDisplayName: string
  addedAt: Timestamp
}
