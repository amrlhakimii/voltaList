import { Spinner } from '../components/ui/Spinner'
import { LandingPage } from './LandingPage'
import { UserHomePage } from './UserHomePage'
import { AdminHomePage } from './AdminHomePage'
import { useAuth } from '../hooks/useAuth'
import { useCaptain } from '../hooks/useCaptain'

export function HomePage() {
  const { user, loading: authLoading } = useAuth()
  const { isCaptain } = useCaptain()

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (!user) return <LandingPage />

  if (isCaptain) return <AdminHomePage />

  return <UserHomePage />
}
