import type { HTMLAttributes } from 'react'

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-[#2c2929] border border-white/5 rounded-2xl overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  )
}
