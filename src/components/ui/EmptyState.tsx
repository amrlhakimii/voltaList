import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4">⚽</div>
      <p className="text-[#F6E9E9]/80 font-semibold">{title}</p>
      {description && <p className="text-[#F6E9E9]/40 text-sm mt-1">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
