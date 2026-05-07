import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { useSessions } from '../hooks/useSession'

export function HomePage() {
  const { sessions, loading } = useSessions()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading || sessions.length === 0) return
    const open = sessions.find(s => s.isOpen)
    const target = open ?? sessions[0]
    navigate(`/session/${target.id}`, { replace: true })
  }, [loading, sessions, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  return (
    <EmptyState
      title="No sessions yet"
      description="Ask the captain to create a session."
    />
  )
}
