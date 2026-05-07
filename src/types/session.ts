import type { Timestamp } from 'firebase/firestore'

export interface Session {
  id: string
  title: string
  date: Timestamp
  venue: string
  timeStart: string
  timeEnd: string
  opponent?: string
  maxSpots: number
  createdBy: string
  createdAt: Timestamp
  isOpen: boolean
}
