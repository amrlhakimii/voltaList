import { Button } from '../ui/Button'

interface CaptainToolbarProps {
  isOpen: boolean
  onToggle: () => void
}

export function CaptainToolbar({ isOpen, onToggle }: CaptainToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#E16428]/10 border-b border-[#E16428]/15">
      <span className="text-xs font-semibold text-[#E16428] uppercase tracking-widest">
        Captain
      </span>
      <Button variant={isOpen ? 'danger' : 'primary'} size="sm" onClick={onToggle}>
        {isOpen ? 'Close session' : 'Open session'}
      </Button>
    </div>
  )
}
