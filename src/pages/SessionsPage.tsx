import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Clock, ChevronRight } from 'lucide-react'
import { useSessions } from '../hooks/useSession'
import { useEntries } from '../hooks/useEntries'
import { Spinner } from '../components/ui/Spinner'
import { SessionStatusBadge } from '../components/session/SessionStatusBadge'
import { formatDate } from '../utils/date'
import { getCountdown } from '../utils/countdown'
import type { Session } from '../types/session'

function SessionRow({ session }: { session: Session }) {
  const { entries } = useEntries(session.id)
  const entryCount = entries.length
  const isFull = entryCount >= session.maxSpots
  const pct = Math.min(100, (entryCount / session.maxSpots) * 100)
  const countdown = getCountdown(session.date, session.timeStart)

  return (
    <Link to={`/session/${session.id}`}>
      <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4 hover:border-[#E16428]/30 hover:bg-[#2f2c2c] active:scale-[0.99] transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className="font-bold text-[#F6E9E9] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {session.title}
              </h3>
              <SessionStatusBadge isOpen={session.isOpen} isFull={isFull} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#F6E9E9]/45">
                <CalendarDays size={11} className="text-[#E16428]/60 shrink-0" />
                {formatDate(session.date)}
                <span className="text-[#F6E9E9]/20">·</span>
                <Clock size={11} className="text-[#E16428]/60 shrink-0" />
                {session.timeStart} – {session.timeEnd}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#F6E9E9]/35">
                <MapPin size={11} className="text-[#E16428]/60 shrink-0" />
                <span className="truncate">{session.venue}</span>
              </div>
            </div>

            {countdown && countdown !== 'Started' && session.isOpen && (
              <p className="mt-2 text-xs font-semibold text-[#E16428]/70">⏱ {countdown}</p>
            )}

            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-white/8 rounded-full h-1 overflow-hidden">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    background: pct >= 100 ? '#ef4444' : 'linear-gradient(90deg, #E16428, #f08340)',
                  }}
                />
              </div>
              <span className="text-xs text-[#F6E9E9]/35 tabular-nums shrink-0">
                {entryCount}/{session.maxSpots}
              </span>
            </div>
          </div>

          <ChevronRight size={16} className="text-[#F6E9E9]/20 mt-0.5 shrink-0" />
        </div>
      </div>
    </Link>
  )
}

export function SessionsPage() {
  const { sessions, loading } = useSessions()

  const open = sessions.filter(s => s.isOpen)
  const closed = sessions.filter(s => !s.isOpen)

  return (
    <div className="px-4 py-5 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#F6E9E9]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Sessions
        </h1>
        <p className="text-sm text-[#F6E9E9]/35 mt-0.5">All futsal sessions</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="w-7 h-7" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#F6E9E9]/30 text-sm">No sessions yet.</p>
        </div>
      ) : (
        <>
          {open.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Open</p>
              {open.map(s => <SessionRow key={s.id} session={s} />)}
            </div>
          )}
          {closed.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-[#F6E9E9]/25 uppercase tracking-widest">Past sessions</p>
              {closed.map(s => <SessionRow key={s.id} session={s} />)}
            </div>
          )}
        </>
      )}
    </div>
  )
}
