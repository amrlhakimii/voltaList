import { useParams } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { useEntries } from '../hooks/useEntries'
import { useAuth } from '../hooks/useAuth'
import { useCaptain } from '../hooks/useCaptain'
import { useQuota } from '../hooks/useQuota'
import { useGKStatus } from '../hooks/useGKStatus'
import { SessionHeader } from '../components/session/SessionHeader'
import { EntryList } from '../components/session/EntryList'
import { AddEntryForm } from '../components/session/AddEntryForm'
import { CaptainToolbar } from '../components/admin/CaptainToolbar'
import { AuthButton } from '../components/auth/AuthButton'
import { Card } from '../components/ui/Card'
import { Spinner } from '../components/ui/Spinner'
import { addEntry, removeEntry } from '../firebase/entryService'
import { toggleSession } from '../firebase/sessionService'
import { NotFoundPage } from './NotFoundPage'

export function SessionPage() {
  const { id } = useParams<{ id: string }>()
  const { session, loading: sessionLoading } = useSession(id!)
  const { entries, loading: entriesLoading } = useEntries(id!)
  const { user } = useAuth()
  const { isCaptain } = useCaptain()
  const { count: quotaCount, reached: quotaReached } = useQuota(entries)
  const { gkTaken } = useGKStatus(entries)

  if (sessionLoading || entriesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (!session) return <NotFoundPage />

  const isFull = entries.length >= session.maxSpots
  const formDisabled = !session.isOpen || (!isCaptain && isFull)

  async function handleAdd(playerName: string, isGK: boolean) {
    if (!user || !session) return
    await addEntry(session.id, {
      playerName,
      isGK,
      addedByUid: user.uid,
      addedByEmail: user.email ?? '',
      addedByDisplayName: user.displayName ?? user.email ?? 'Unknown',
    })
  }

  async function handleRemove(entryId: string) {
    if (!session) return
    await removeEntry(session.id, entryId)
  }

  async function handleToggle() {
    if (!session) return
    await toggleSession(session.id, !session.isOpen)
  }

  const showForm = !!user && (isCaptain || (!quotaReached && session.isOpen && !isFull))

  return (
    <div className="px-4 py-4 space-y-2.5">
      <Card>
        {isCaptain && (
          <CaptainToolbar isOpen={session.isOpen} onToggle={() => void handleToggle()} />
        )}
        <SessionHeader session={session} entries={entries} />
      </Card>

      <Card>
        <EntryList
          entries={entries}
          maxSpots={session.maxSpots}
          userUid={user?.uid ?? null}
          isCaptain={isCaptain}
          onRemove={(id) => void handleRemove(id)}
        />
      </Card>

      {!user ? (
        <Card className="p-5 text-center">
          <p className="text-[#F6E9E9]/60 text-sm font-medium mb-3">
            Sign in to join this session
          </p>
          <div className="flex justify-center">
            <AuthButton />
          </div>
        </Card>
      ) : showForm ? (
        <Card>
          <AddEntryForm
            onAdd={handleAdd}
            quotaCount={quotaCount}
            quotaReached={quotaReached}
            gkTaken={gkTaken}
            isCaptain={isCaptain}
            disabled={formDisabled}
          />
        </Card>
      ) : (
        <Card className="px-4 py-3.5">
          <p className="text-[#F6E9E9]/30 text-sm text-center">
            {!session.isOpen
              ? '🔒 Registration is closed'
              : isFull
                ? '⚡ Session is full'
                : '✓ You have reached your entry limit'}
          </p>
        </Card>
      )}
    </div>
  )
}
