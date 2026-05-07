import type { ReactNode } from 'react'
import { Footprints } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
        <Footprints size={28} className="text-[#F6E9E9]/20" />
      </div>
      <p className="text-[#F6E9E9]/70 font-semibold">{title}</p>
      {description && <p className="text-[#F6E9E9]/35 text-sm mt-1.5 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
