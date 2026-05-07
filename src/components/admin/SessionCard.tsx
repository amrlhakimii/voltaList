import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, ChevronRight } from 'lucide-react'
import type { Session } from '../../types/session'
import { formatDate } from '../../utils/date'
import { SessionStatusBadge } from '../session/SessionStatusBadge'
import { Card } from '../ui/Card'

interface SessionCardProps {
  session: Session
  entryCount: number
}

export function SessionCard({ session, entryCount }: SessionCardProps) {
  const isFull = entryCount >= session.maxSpots
  const pct = Math.min(100, (entryCount / session.maxSpots) * 100)

  return (
    <Link to={`/session/${session.id}`}>
      <Card className="px-4 py-3.5 hover:bg-[#3a3535] active:scale-[0.99] transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#F6E9E9] text-sm truncate">{session.title}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-[#F6E9E9]/40">
                <CalendarDays size={11} className="text-[#E16428]/60" />
                {formatDate(session.date)}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#F6E9E9]/35 truncate">
                <MapPin size={11} className="text-[#E16428]/60 shrink-0" />
                <span className="truncate">{session.venue}</span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 bg-white/8 rounded-full h-1">
                <div
                  className="h-1 rounded-full bg-[#E16428] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-[#F6E9E9]/35 tabular-nums shrink-0">
                {entryCount}/{session.maxSpots}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <SessionStatusBadge isOpen={session.isOpen} isFull={isFull} />
            <ChevronRight size={14} className="text-[#F6E9E9]/20 mt-1" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
