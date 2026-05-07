import { Badge } from '../ui/Badge'

interface SessionStatusBadgeProps {
  isOpen: boolean
  isFull: boolean
}

export function SessionStatusBadge({ isOpen, isFull }: SessionStatusBadgeProps) {
  if (!isOpen) return <Badge variant="red">Closed</Badge>
  if (isFull) return <Badge variant="red">Full</Badge>
  return <Badge variant="green">Open</Badge>
}
