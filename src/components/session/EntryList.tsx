import type { Entry } from '../../types/entry'
import { EntryRow } from './EntryRow'
import { canRemoveEntry } from '../../utils/permissions'

interface EntryListProps {
  entries: Entry[]
  maxSpots: number
  userUid: string | null
  isCaptain: boolean
  onRemove: (entryId: string) => void
}

export function EntryList({ entries, maxSpots, userUid, isCaptain, onRemove }: EntryListProps) {
  const emptySlots = Math.max(0, maxSpots - entries.length)

  return (
    <div>
      {entries.map((entry, i) => (
        <EntryRow
          key={entry.id}
          entry={entry}
          number={i + 1}
          canRemove={canRemoveEntry(entry, userUid, isCaptain)}
          onRemove={() => onRemove(entry.id)}
        />
      ))}
      {Array.from({ length: emptySlots }, (_, i) => (
        <div
          key={`empty-${i}`}
          className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0"
        >
          <span className="text-xs font-bold text-white/10 w-5 shrink-0 tabular-nums text-right">
            {entries.length + i + 1}
          </span>
          <div className="w-8 h-8 rounded-full shrink-0 border border-dashed border-white/10" />
          <span className="text-[#F6E9E9]/15 text-sm">Open slot</span>
        </div>
      ))}
    </div>
  )
}
