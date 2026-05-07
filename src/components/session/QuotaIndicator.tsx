import { MAX_ENTRIES_PER_USER } from '../../utils/constants'

interface QuotaIndicatorProps {
  count: number
}

export function QuotaIndicator({ count }: QuotaIndicatorProps) {
  const remaining = MAX_ENTRIES_PER_USER - count
  const dots = Array.from({ length: MAX_ENTRIES_PER_USER }, (_, i) => i < count)

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {dots.map((filled, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${filled ? 'bg-[#E16428]' : 'bg-white/15'}`}
          />
        ))}
      </div>
      <span className="text-xs text-[#F6E9E9]/35">
        {remaining > 0 ? `${remaining} left` : 'Quota full'}
      </span>
    </div>
  )
}
