import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Clock, Trophy, ChevronRight, Zap } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUserSessions } from '../hooks/useUserSessions'
import { Spinner } from '../components/ui/Spinner'
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

function MySessionRow({ session }: { session: Session }) {
  const countdown = getCountdown(session.date, session.timeStart)

  return (
    <Link to={`/session/${session.id}`}>
      <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4 hover:border-[#E16428]/30 hover:bg-[#2f2c2c] active:scale-[0.99] transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#F6E9E9] text-sm mb-2">{session.title}</h3>
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
            {session.result && (
              <div className="mt-2 flex items-center gap-1.5">
                <Trophy size={11} className="text-amber-400/70" />
                <span className="text-xs text-amber-400/80 font-semibold">
                  {session.result.homeScore} – {session.result.awayScore}
                </span>
                {session.opponent && (
                  <span className="text-xs text-[#F6E9E9]/30">vs {session.opponent}</span>
                )}
              </div>
            )}
          </div>
          <ChevronRight size={16} className="text-[#F6E9E9]/20 mt-0.5 shrink-0" />
        </div>
      </div>
    </Link>
  )
}

export function UserHomePage() {
  const { user } = useAuth()
  const { sessions, gkCount, loading } = useUserSessions(user?.uid ?? null)

  const firstName = user?.displayName?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'Player'
  const open = sessions.filter(s => s.isOpen)
  const past = sessions.filter(s => !s.isOpen)

  return (
    <div className="px-4 py-5 space-y-6">
      <div>
        <p className="text-sm text-[#F6E9E9]/40">{getGreeting()},</p>
        <h1
          className="text-2xl font-extrabold text-[#F6E9E9] mt-0.5"
          style={{ fontFamily: 'Raleway, sans-serif' }}
        >
          {firstName}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4">
          <p className="text-2xl font-extrabold text-[#E16428]">{sessions.length}</p>
          <p className="text-xs text-[#F6E9E9]/40 mt-0.5">Sessions Joined</p>
        </div>
        <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4">
          <p className="text-2xl font-extrabold text-[#E16428]">{gkCount}</p>
          <p className="text-xs text-[#F6E9E9]/40 mt-0.5">GK Games</p>
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
          <p className="text-sm text-[#F6E9E9]/40">You haven't joined any sessions yet.</p>
          <Link
            to="/sessions"
            className="inline-block text-sm font-semibold text-[#E16428] hover:text-[#f08340] transition-colors"
          >
            Browse sessions →
          </Link>
        </div>
      ) : (
        <>
          {open.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Upcoming</p>
              {open.map(s => <MySessionRow key={s.id} session={s} />)}
            </div>
          )}
          {past.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-[#F6E9E9]/25 uppercase tracking-widest">Past</p>
              {past.map(s => <MySessionRow key={s.id} session={s} />)}
            </div>
          )}
          <Link
            to="/sessions"
            className="block text-center text-sm text-[#F6E9E9]/35 hover:text-[#F6E9E9]/60 transition-colors py-2"
          >
            Browse all sessions →
          </Link>
        </>
      )}
    </div>
  )
}
