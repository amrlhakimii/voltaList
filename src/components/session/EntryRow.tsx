import type { Entry } from '../../types/entry'
import { GKBadge } from './GKBadge'

interface EntryRowProps {
  entry: Entry
  number: number
  canRemove: boolean
  onRemove: () => void
}

export function EntryRow({ entry, number, canRemove, onRemove }: EntryRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
      <span className="text-sm font-bold text-[#E16428] w-6 shrink-0 tabular-nums">{number}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#F6E9E9] font-medium text-sm truncate">{entry.playerName}</span>
          {entry.isGK && <GKBadge />}
        </div>
        <p className="text-xs text-[#F6E9E9]/35 mt-0.5 truncate">added by {entry.addedByDisplayName}</p>
      </div>
      {canRemove && (
        <button
          onClick={onRemove}
          className="shrink-0 w-11 h-11 flex items-center justify-center text-[#F6E9E9]/25 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
          aria-label="Remove entry"
        >
          ✕
        </button>
      )}
    </div>
  )
}
