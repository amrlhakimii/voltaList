import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'orange' | 'green' | 'red' | 'gray'
}

export function Badge({ children, variant = 'gray' }: BadgeProps) {
  const variants = {
    orange: 'bg-[#E16428]/20 text-[#E16428] border border-[#E16428]/30',
    green: 'bg-green-500/20 text-green-400 border border-green-500/30',
    red: 'bg-red-500/20 text-red-400 border border-red-500/30',
    gray: 'bg-white/10 text-[#F6E9E9]/70 border border-white/10',
  }
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
