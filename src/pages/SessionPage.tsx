import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Share2, Check } from 'lucide-react'
import { useSession } from '../hooks/useSession'
import { useEntries } from '../hooks/useEntries'
import { useAuth } from '../hooks/useAuth'
import { useCaptain } from '../hooks/useCaptain'
import { useQuota } from '../hooks/useQuota'
import { useGKStatus } from '../hooks/useGKStatus'
import { SessionHeader } from '../components/session/SessionHeader'
import { EntryList } from '../components/session/EntryList'
import { AddEntryForm } from '../components/session/AddEntryForm'
import { ResultForm } from '../components/session/ResultForm'
import { MatchResultCard } from '../components/session/MatchResultCard'
import { CaptainToolbar } from '../components/admin/CaptainToolbar'
import { AuthButton } from '../components/auth/AuthButton'
import { Card } from '../components/ui/Card'
import { Spinner } from '../components/ui/Spinner'
import { addEntry, removeEntry } from '../firebase/entryService'
import { toggleSession, setResult } from '../firebase/sessionService'
import { NotFoundPage } from './NotFoundPage'
import { formatDate } from '../utils/date'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export function SessionPage() {
  const { id } = useParams<{ id: string }>()
  const { session, loading: sessionLoading } = useSession(id!)
  const { entries, loading: entriesLoading } = useEntries(id!)
  const { user } = useAuth()
  const { isCaptain } = useCaptain()
  const { count: quotaCount, reached: quotaReached } = useQuota(entries)
  const { gkTaken } = useGKStatus(entries)
  const [copied, setCopied] = useState(false)

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

  function handleCopyLink() {
    void navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleWhatsApp() {
    if (!session) return
    const lines = [
      '*VoltaList*',
      '',
      `*${session.title}*`,
      session.opponent ? `vs ${session.opponent}` : '',
      `Date: ${formatDate(session.date)}`,
      `Time: ${session.timeStart} - ${session.timeEnd}`,
      `Venue: ${session.venue}`,
      '',
      `Sign up: ${window.location.href}`,
    ].filter(l => l !== '')
    window.open('https://wa.me/?text=' + encodeURIComponent(lines.join('\n')), '_blank')
  }

  const showForm = !!user && (isCaptain || (!quotaReached && session.isOpen && !isFull))

  return (
    <div className="px-4 py-4 space-y-2.5">
      {/* Session info card */}
      <Card>
        {isCaptain && (
          <CaptainToolbar isOpen={session.isOpen} onToggle={() => void handleToggle()} />
        )}
        <SessionHeader session={session} entries={entries} />

        {/* Captain share bar */}
        {isCaptain && (
          <div className="flex gap-2 px-4 pb-4">
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/20 py-2 rounded-xl transition-colors"
            >
              <WhatsAppIcon />
              WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold text-[#F6E9E9]/50 bg-white/5 hover:bg-white/10 border border-white/10 py-2 rounded-xl transition-colors"
            >
              {copied
                ? <><Check size={13} className="text-emerald-400" /> Copied!</>
                : <><Share2 size={13} /> Copy link</>
              }
            </button>
          </div>
        )}
      </Card>

      {/* Match result card — visible to everyone when posted */}
      {session.result && (
        <Card>
          <MatchResultCard result={session.result} opponent={session.opponent} />
        </Card>
      )}

      {/* Captain result form — only when session is closed */}
      {isCaptain && !session.isOpen && (
        <Card className="p-4">
          <ResultForm
            entries={entries}
            existing={session.result}
            onSave={result => setResult(session.id, result)}
          />
        </Card>
      )}

      {/* Player list */}
      <Card>
        <EntryList
          entries={entries}
          maxSpots={session.maxSpots}
          userUid={user?.uid ?? null}
          isCaptain={isCaptain}
          onRemove={(id) => void handleRemove(id)}
        />
      </Card>

      {/* Sign-in / Add entry / Status */}
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
              ? 'Registration is closed'
              : isFull
                ? 'Session is full'
                : 'You have reached your entry limit'}
          </p>
        </Card>
      )}
    </div>
  )
}
