import { Link } from 'react-router-dom'
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

  return (
    <Link to={`/session/${session.id}`}>
      <Card className="px-4 py-3.5 hover:bg-[#3d3939] active:scale-[0.99] transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#F6E9E9] text-sm truncate">{session.title}</p>
            <p className="text-xs text-[#F6E9E9]/45 mt-0.5">{formatDate(session.date)}</p>
            <p className="text-xs text-[#F6E9E9]/35 mt-0.5 truncate">{session.venue}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <SessionStatusBadge isOpen={session.isOpen} isFull={isFull} />
            <span className="text-xs text-[#F6E9E9]/40 tabular-nums">
              {entryCount}/{session.maxSpots}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
