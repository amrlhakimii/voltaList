import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-[#F6E9E9]/60 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-[#272121] border ${
          error ? 'border-red-500' : 'border-white/10'
        } text-[#F6E9E9] placeholder-white/25 rounded-xl px-4 py-3 min-h-[44px] text-sm focus:outline-none focus:border-[#E16428] transition-colors ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}
