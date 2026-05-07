import { CalendarDays, MapPin, Clock, Swords, Users, Shield, Timer } from 'lucide-react'
import type { Session } from '../../types/session'
import type { Entry } from '../../types/entry'
import { formatDate } from '../../utils/date'
import { getCountdown } from '../../utils/countdown'
import { SessionStatusBadge } from './SessionStatusBadge'

interface SessionHeaderProps {
  session: Session
  entries: Entry[]
}

export function SessionHeader({ session, entries }: SessionHeaderProps) {
  const entryCount = entries.length
  const isFull = entryCount >= session.maxSpots
  const pct = Math.min(100, (entryCount / session.maxSpots) * 100)
  const gkCount = entries.filter(e => e.isGK).length
  const fieldCount = entryCount - gkCount
  const countdown = getCountdown(session.date, session.timeStart)

  return (
    <div className="px-4 pt-5 pb-4">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3">
        <h1
          className="text-xl font-bold text-[#F6E9E9] leading-tight tracking-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {session.title}
        </h1>
        <SessionStatusBadge isOpen={session.isOpen} isFull={isFull} />
      </div>

      {/* Countdown */}
      {countdown && countdown !== 'Started' && (
        <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#E16428]/10 border border-[#E16428]/20 rounded-full px-3 py-1">
          <Timer size={11} className="text-[#E16428]" />
          <span className="text-xs font-semibold text-[#E16428]">{countdown}</span>
        </div>
      )}

      {/* Session info grid */}
      <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2">
        <Row icon={<CalendarDays size={13} />} text={formatDate(session.date)} />
        <Row icon={<Clock size={13} />} text={`${session.timeStart} – ${session.timeEnd}`} />
        <Row icon={<MapPin size={13} />} text={session.venue} />
        {session.opponent && <Row icon={<Swords size={13} />} text={`vs ${session.opponent}`} />}
      </div>

      {/* Progress */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#F6E9E9]/35">
          <span>{entryCount} of {session.maxSpots} spots filled</span>
          <span className="tabular-nums font-bold text-[#F6E9E9]/50">{Math.round(pct)}%</span>
        </div>
        <div className="bg-white/8 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: pct >= 100 ? '#ef4444' : 'linear-gradient(90deg, #E16428, #f08340)',
            }}
          />
        </div>
        <div className="flex items-center gap-4 pt-0.5">
          <StatPill icon={<Users size={11} />} label="Field" value={fieldCount} />
          <StatPill icon={<Shield size={11} />} label="GK" value={gkCount} />
          <StatPill icon={<Users size={11} />} label="Open" value={Math.max(0, session.maxSpots - entryCount)} dim />
        </div>
      </div>
    </div>
  )
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#F6E9E9]/45">
      <span className="text-[#E16428]/60 shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  )
}

function StatPill({ icon, label, value, dim }: { icon: React.ReactNode; label: string; value: number; dim?: boolean }) {
  return (
    <div className={`flex items-center gap-1 text-xs ${dim ? 'text-[#F6E9E9]/20' : 'text-[#F6E9E9]/45'}`}>
      {icon}
      <span className={`font-bold ${dim ? 'text-[#F6E9E9]/30' : 'text-[#F6E9E9]/70'}`}>{value}</span>
      <span>{label}</span>
    </div>
  )
}
