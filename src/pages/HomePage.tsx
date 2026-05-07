import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { LandingPage } from './LandingPage'
import { useSessions } from '../hooks/useSession'
import { useAuth } from '../hooks/useAuth'

export function HomePage() {
  const { user, loading: authLoading } = useAuth()
  const { sessions, loading: sessionsLoading } = useSessions()
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionsLoading || sessions.length === 0) return
    const open = sessions.find(s => s.isOpen)
    const target = open ?? sessions[0]
    navigate(`/session/${target.id}`, { replace: true })
  }, [sessionsLoading, sessions, navigate])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (!user) return <LandingPage />

  if (sessionsLoading) {
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
