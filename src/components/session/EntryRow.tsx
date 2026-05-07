import { X } from 'lucide-react'
import type { Entry } from '../../types/entry'
import { GKBadge } from './GKBadge'

interface EntryRowProps {
  entry: Entry
  number: number
  canRemove: boolean
  onRemove: () => void
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

const AVATAR_COLORS = [
  'bg-violet-500/20 text-violet-300',
  'bg-blue-500/20 text-blue-300',
  'bg-emerald-500/20 text-emerald-300',
  'bg-amber-500/20 text-amber-300',
  'bg-pink-500/20 text-pink-300',
  'bg-cyan-500/20 text-cyan-300',
]

function avatarColor(name: string) {
  let hash = 0
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function EntryRow({ entry, number, canRemove, onRemove }: EntryRowProps) {
  const initials = getInitials(entry.playerName)
  const color = avatarColor(entry.playerName)

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
      <span className="text-xs font-bold text-[#E16428]/70 w-5 shrink-0 tabular-nums text-right">{number}</span>
      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${color}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#F6E9E9] font-semibold text-sm truncate">{entry.playerName}</span>
          {entry.isGK && <GKBadge />}
        </div>
        <p className="text-xs text-[#F6E9E9]/30 mt-0.5 truncate">by {entry.addedByDisplayName}</p>
      </div>
      {canRemove && (
        <button
          onClick={onRemove}
          className="shrink-0 w-8 h-8 flex items-center justify-center text-[#F6E9E9]/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          aria-label="Remove entry"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
