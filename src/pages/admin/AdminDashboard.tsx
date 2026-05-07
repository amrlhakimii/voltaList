import { Link } from 'react-router-dom'
import { useCaptain } from '../../hooks/useCaptain'
import { useSessions } from '../../hooks/useSession'
import { useEntries } from '../../hooks/useEntries'
import { SessionCard } from '../../components/admin/SessionCard'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
import { EmptyState } from '../../components/ui/EmptyState'
import { NotFoundPage } from '../NotFoundPage'
import type { Session } from '../../types/session'

function SessionCardWithCount({ session }: { session: Session }) {
  const { entries } = useEntries(session.id)
  return <SessionCard session={session} entryCount={entries.length} />
}

export function AdminDashboard() {
  const { isCaptain } = useCaptain()
  const { sessions, loading } = useSessions()

  if (!isCaptain) return <NotFoundPage />

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#F6E9E9]">Sessions</h2>
        <Link to="/admin/session/new">
          <Button size="sm">+ New</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner className="w-8 h-8" />
        </div>
      ) : sessions.length === 0 ? (
        <EmptyState
          title="No sessions yet"
          description="Create your first session to get started."
          action={
            <Link to="/admin/session/new">
              <Button>Create Session</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-2">
          {sessions.map(s => (
            <SessionCardWithCount key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  )
}
