export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-white/10 border-t-[#E16428] ${className}`}
    />
  )
}
