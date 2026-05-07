import type { Timestamp } from 'firebase/firestore'

export interface GoalScorer {
  name: string
  goals: number
}

export interface MatchResult {
  homeScore: number
  awayScore: number
  scorers: GoalScorer[]
}

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
  result?: MatchResult
}
