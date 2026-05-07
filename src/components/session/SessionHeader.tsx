import type { Session } from '../../types/session'
import { formatDate } from '../../utils/date'
import { SessionStatusBadge } from './SessionStatusBadge'

interface SessionHeaderProps {
  session: Session
  entryCount: number
}

export function SessionHeader({ session, entryCount }: SessionHeaderProps) {
  const isFull = entryCount >= session.maxSpots
  const pct = Math.min(100, (entryCount / session.maxSpots) * 100)

  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-lg font-bold text-[#F6E9E9] leading-tight">{session.title}</h1>
        <SessionStatusBadge isOpen={session.isOpen} isFull={isFull} />
      </div>

      <div className="mt-3 space-y-1.5">
        <Row icon="📅" text={formatDate(session.date)} />
        <Row icon="📍" text={session.venue} />
        <Row icon="🕐" text={`${session.timeStart} – ${session.timeEnd}`} />
        {session.opponent && <Row icon="⚔️" text={`vs ${session.opponent}`} />}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 bg-white/10 rounded-full h-1.5">
          <div
            className="bg-[#E16428] h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-bold text-[#F6E9E9] tabular-nums">
          {entryCount}/{session.maxSpots}
        </span>
      </div>
    </div>
  )
}

function Row({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#F6E9E9]/55">
      <span className="w-4 text-center shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  )
}
