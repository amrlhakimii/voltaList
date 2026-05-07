import type { HTMLAttributes } from 'react'

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-[#363333] rounded-2xl overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  )
}
