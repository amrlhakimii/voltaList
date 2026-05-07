import { MAX_ENTRIES_PER_USER } from '../../utils/constants'

interface QuotaIndicatorProps {
  count: number
}

export function QuotaIndicator({ count }: QuotaIndicatorProps) {
  const remaining = MAX_ENTRIES_PER_USER - count
  return (
    <span className="text-xs text-[#F6E9E9]/40">
      {remaining > 0
        ? `${remaining} slot${remaining !== 1 ? 's' : ''} left`
        : 'Quota reached'}
    </span>
  )
}
