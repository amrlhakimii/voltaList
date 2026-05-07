import { Crown, Target } from 'lucide-react'
import type { MatchResult } from '../../types/session'

interface MatchResultCardProps {
  result: MatchResult
  opponent?: string
}

export function MatchResultCard({ result, opponent }: MatchResultCardProps) {
  const { homeScore, awayScore, scorers } = result
  const won = homeScore > awayScore
  const lost = homeScore < awayScore

  const maxGoals = scorers.length > 0 ? Math.max(...scorers.map(s => s.goals)) : 0
  const mvps = scorers.filter(s => s.goals === maxGoals && maxGoals > 0)

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Score */}
      <div className="text-center">
        <p className="text-xs font-bold text-[#F6E9E9]/30 uppercase tracking-widest mb-3">Final Score</p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 text-right">
            <p className="text-xs text-[#F6E9E9]/40 mb-1">Us</p>
            <p className={`text-5xl font-black tabular-nums ${won ? 'text-emerald-400' : lost ? 'text-red-400' : 'text-[#F6E9E9]/60'}`}
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              {homeScore}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black text-[#F6E9E9]/20">-</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              won ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : lost ? 'bg-red-500/15 text-red-400 border border-red-500/20'
              : 'bg-white/8 text-[#F6E9E9]/40 border border-white/10'
          }`}>
              {won ? 'WIN' : lost ? 'LOSS' : 'DRAW'}
            </span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs text-[#F6E9E9]/40 mb-1">{opponent ?? 'Them'}</p>
            <p className={`text-5xl font-black tabular-nums ${lost ? 'text-red-400' : won ? 'text-[#F6E9E9]/40' : 'text-[#F6E9E9]/60'}`}
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              {awayScore}
            </p>
          </div>
        </div>
      </div>

      {/* MVP */}
      {mvps.length > 0 && (
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl px-3 py-2.5 flex items-center gap-2">
          <Crown size={15} className="text-amber-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-400">
              MVP{mvps.length > 1 ? 's' : ''} — {mvps.map(m => m.name).join(', ')}
            </p>
            <p className="text-xs text-[#F6E9E9]/30">{maxGoals} goal{maxGoals !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      {/* Scorers list */}
      {scorers.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#F6E9E9]/30 uppercase tracking-widest">Scorers</p>
          {[...scorers].sort((a, b) => b.goals - a.goals).map(scorer => (
            <div key={scorer.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={12} className="text-[#E16428]/60" />
                <span className="text-sm text-[#F6E9E9]/70">{scorer.name}</span>
                {scorer.goals === maxGoals && maxGoals > 0 && (
                  <Crown size={11} className="text-amber-400" />
                )}
              </div>
              <span className="text-sm font-bold text-[#E16428] tabular-nums">{scorer.goals}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
