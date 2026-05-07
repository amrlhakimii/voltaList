import { Shield } from 'lucide-react'

export function GKBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-[#E16428]/15 text-[#E16428] border border-[#E16428]/25">
      <Shield size={10} className="fill-[#E16428]/40" />
      GK
    </span>
  )
}
