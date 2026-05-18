import { Link } from 'react-router-dom'
import { Plus, LayoutDashboard, Trophy, ChevronRight, Zap } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useSessions } from '../hooks/useSession'
import { useEntries } from '../hooks/useEntries'
import { Spinner } from '../components/ui/Spinner'
import { Button } from '../components/ui/Button'
import { SessionStatusBadge } from '../components/session/SessionStatusBadge'
import { formatDate } from '../utils/date'
import { getCountdown } from '../utils/countdown'
import type { Session } from '../types/session'

function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 21) return 'Good evening'
  return 'Good night'
}

function AdminSessionRow({ session }: { session: Session }) {
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
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h3 className="font-bold text-[#F6E9E9] text-sm truncate">{session.title}</h3>
              <SessionStatusBadge isOpen={session.isOpen} isFull={isFull} />
            </div>
            <p className="text-xs text-[#F6E9E9]/40">
              {formatDate(session.date)} · {session.venue}
            </p>
            {countdown && countdown !== 'Started' && session.isOpen && (
              <p className="mt-1.5 text-xs font-semibold text-[#E16428]/70">⏱ {countdown}</p>
            )}
            {session.result && (
              <div className="mt-1.5 flex items-center gap-1.5">
                <Trophy size={11} className="text-amber-400/70" />
                <span className="text-xs text-amber-400/80 font-semibold">
                  {session.result.homeScore} – {session.result.awayScore}
                </span>
                {session.opponent && (
                  <span className="text-xs text-[#F6E9E9]/30">vs {session.opponent}</span>
                )}
              </div>
            )}
            <div className="mt-2.5 flex items-center gap-2">
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

export function AdminHomePage() {
  const { user } = useAuth()
  const { sessions, loading } = useSessions()

  const firstName = user?.displayName?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'Captain'
  const openCount = sessions.filter(s => s.isOpen).length
  const open = sessions.filter(s => s.isOpen)
  const past = sessions.filter(s => !s.isOpen)

  return (
    <div className="px-4 py-5 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-[#E16428] bg-[#E16428]/10 border border-[#E16428]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Captain
          </span>
          <p className="text-sm text-[#F6E9E9]/40 mt-2">{getGreeting()},</p>
          <h1
            className="text-2xl font-extrabold text-[#F6E9E9] mt-0.5"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            {firstName}
          </h1>
        </div>
        <Link to="/admin/session/new">
          <Button size="sm"><Plus size={14} /> New</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4">
          <p className="text-2xl font-extrabold text-[#E16428]">{sessions.length}</p>
          <p className="text-xs text-[#F6E9E9]/40 mt-0.5">Total Sessions</p>
        </div>
        <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4">
          <p className="text-2xl font-extrabold text-emerald-400">{openCount}</p>
          <p className="text-xs text-[#F6E9E9]/40 mt-0.5">Open Now</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner className="w-7 h-7" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E16428]/10 flex items-center justify-center mx-auto">
            <Zap size={22} className="text-[#E16428]/60" />
          </div>
          <p className="text-sm text-[#F6E9E9]/40">No sessions yet.</p>
          <Link to="/admin/session/new">
            <Button>Create First Session</Button>
          </Link>
        </div>
      ) : (
        <>
          {open.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Open</p>
              {open.map(s => <AdminSessionRow key={s.id} session={s} />)}
            </div>
          )}
          {past.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-[#F6E9E9]/25 uppercase tracking-widest">Past</p>
              {past.map(s => <AdminSessionRow key={s.id} session={s} />)}
            </div>
          )}
          <Link
            to="/admin"
            className="flex items-center justify-center gap-2 text-sm text-[#F6E9E9]/35 hover:text-[#F6E9E9]/60 transition-colors py-2"
          >
            <LayoutDashboard size={14} />
            Manage sessions
          </Link>
        </>
      )}
    </div>
  )
}
