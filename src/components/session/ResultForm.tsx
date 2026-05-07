import { useState } from 'react'
import type { FormEvent } from 'react'
import { Trophy, Minus, Plus } from 'lucide-react'
import type { Entry } from '../../types/entry'
import type { MatchResult } from '../../types/session'
import { Button } from '../ui/Button'

interface ResultFormProps {
  entries: Entry[]
  existing?: MatchResult
  onSave: (result: MatchResult) => Promise<void>
}

export function ResultForm({ entries, existing, onSave }: ResultFormProps) {
  const [homeScore, setHomeScore] = useState(existing?.homeScore ?? 0)
  const [awayScore, setAwayScore] = useState(existing?.awayScore ?? 0)
  const [goals, setGoals] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    for (const s of existing?.scorers ?? []) map[s.name] = s.goals
    return map
  })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(!!existing)

  function setGoalCount(name: string, delta: number) {
    setGoals(g => ({ ...g, [name]: Math.max(0, (g[name] ?? 0) + delta) }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    const scorers = entries
      .filter(en => (goals[en.playerName] ?? 0) > 0)
      .map(en => ({ name: en.playerName, goals: goals[en.playerName] }))
    await onSave({ homeScore, awayScore, scorers })
    setLoading(false)
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#E16428] bg-[#E16428]/8 hover:bg-[#E16428]/15 border border-[#E16428]/20 py-2.5 rounded-xl transition-colors"
      >
        <Trophy size={13} />
        {existing ? 'Edit match result' : 'Post match result'}
      </button>
    )
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
      <div className="flex items-center gap-1.5">
        <Trophy size={14} className="text-[#E16428]" />
        <p className="text-xs font-bold text-[#E16428] uppercase tracking-wider">Match Result</p>
      </div>

      {/* Score row */}
      <div className="flex items-center gap-3">
        <div className="flex-1 text-center">
          <p className="text-xs text-[#F6E9E9]/40 mb-1.5">Us</p>
          <input
            type="number"
            min={0}
            value={homeScore}
            onChange={e => setHomeScore(parseInt(e.target.value) || 0)}
            className="w-full bg-[#1a1717] border border-white/10 text-[#F6E9E9] text-center text-2xl font-black rounded-xl px-3 py-3 focus:outline-none focus:border-[#E16428] transition-colors"
          />
        </div>
        <span className="text-[#F6E9E9]/30 text-xl font-bold">-</span>
        <div className="flex-1 text-center">
          <p className="text-xs text-[#F6E9E9]/40 mb-1.5">Them</p>
          <input
            type="number"
            min={0}
            value={awayScore}
            onChange={e => setAwayScore(parseInt(e.target.value) || 0)}
            className="w-full bg-[#1a1717] border border-white/10 text-[#F6E9E9] text-center text-2xl font-black rounded-xl px-3 py-3 focus:outline-none focus:border-[#E16428] transition-colors"
          />
        </div>
      </div>

      {/* Goal scorers */}
      {entries.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-[#F6E9E9]/35 font-medium">Goal scorers</p>
          {entries.map(entry => {
            const count = goals[entry.playerName] ?? 0
            return (
              <div key={entry.id} className="flex items-center justify-between px-3 py-2 bg-[#1a1717] rounded-xl border border-white/5">
                <span className="text-sm text-[#F6E9E9]/80 font-medium">{entry.playerName}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGoalCount(entry.playerName, -1)}
                    disabled={count === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-[#F6E9E9]/40 hover:bg-white/10 disabled:opacity-25 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className={`text-sm font-bold w-4 text-center tabular-nums ${count > 0 ? 'text-[#E16428]' : 'text-[#F6E9E9]/20'}`}>
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGoalCount(entry.playerName, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-[#F6E9E9]/40 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : 'Save result'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="px-4">
          Cancel
        </Button>
      </div>
    </form>
  )
}
