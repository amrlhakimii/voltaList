import { ShieldCheck, Lock, Unlock } from 'lucide-react'
import { Button } from '../ui/Button'

interface CaptainToolbarProps {
  isOpen: boolean
  onToggle: () => void
}

export function CaptainToolbar({ isOpen, onToggle }: CaptainToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#E16428]/8 border-b border-[#E16428]/12">
      <div className="flex items-center gap-1.5">
        <ShieldCheck size={13} className="text-[#E16428]" />
        <span className="text-xs font-bold text-[#E16428] uppercase tracking-widest">Captain</span>
      </div>
      <Button variant={isOpen ? 'danger' : 'primary'} size="sm" onClick={onToggle}>
        {isOpen ? (
          <><Lock size={13} /> Close session</>
        ) : (
          <><Unlock size={13} /> Open session</>
        )}
      </Button>
    </div>
  )
}
