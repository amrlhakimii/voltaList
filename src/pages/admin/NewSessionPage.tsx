import { useNavigate } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { useCaptain } from '../../hooks/useCaptain'
import { useAuth } from '../../hooks/useAuth'
import { createSession } from '../../firebase/sessionService'
import { SessionForm } from '../../components/admin/SessionForm'
import { NotFoundPage } from '../NotFoundPage'
import type { SessionFormData } from '../../components/admin/SessionForm'

export function NewSessionPage() {
  const { isCaptain } = useCaptain()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!isCaptain) return <NotFoundPage />

  async function handleCreate(data: SessionFormData) {
    if (!user) return
    const [year, month, day] = data.date.split('-').map(Number)
    const id = await createSession({
      title: data.title,
      venue: data.venue,
      date: Timestamp.fromDate(new Date(year, month - 1, day)),
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      ...(data.opponent ? { opponent: data.opponent } : {}),
      maxSpots: data.maxSpots,
      createdBy: user.uid,
    })
    navigate(`/session/${id}`)
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-base font-bold text-[#F6E9E9] mb-4">New Session</h2>
      <SessionForm onSubmit={handleCreate} />
    </div>
  )
}
