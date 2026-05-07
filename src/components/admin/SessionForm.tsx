import { useState } from 'react'
import type { FormEvent } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

export interface SessionFormData {
  title: string
  venue: string
  date: string
  timeStart: string
  timeEnd: string
  opponent: string
  maxSpots: number
}

interface SessionFormProps {
  onSubmit: (data: SessionFormData) => Promise<void>
}

export function SessionForm({ onSubmit }: SessionFormProps) {
  const [data, setData] = useState<SessionFormData>({
    title: '',
    venue: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    opponent: '',
    maxSpots: 14,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function update<K extends keyof SessionFormData>(key: K, value: SessionFormData[K]) {
    setData(d => ({ ...d, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!data.title || !data.venue || !data.date || !data.timeStart || !data.timeEnd) {
      setError('Please fill in all required fields')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await onSubmit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create session')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
      <Input
        id="title"
        label="Session Title *"
        placeholder="Futsal Wednesday"
        value={data.title}
        onChange={e => update('title', e.target.value)}
      />
      <Input
        id="venue"
        label="Venue *"
        placeholder="Sports Complex, PJ"
        value={data.venue}
        onChange={e => update('venue', e.target.value)}
      />
      <Input
        id="date"
        label="Date *"
        type="date"
        value={data.date}
        onChange={e => update('date', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          id="timeStart"
          label="Start *"
          type="time"
          value={data.timeStart}
          onChange={e => update('timeStart', e.target.value)}
        />
        <Input
          id="timeEnd"
          label="End *"
          type="time"
          value={data.timeEnd}
          onChange={e => update('timeEnd', e.target.value)}
        />
      </div>
      <Input
        id="opponent"
        label="Opponent (optional)"
        placeholder="Team XYZ"
        value={data.opponent}
        onChange={e => update('opponent', e.target.value)}
      />
      <Input
        id="maxSpots"
        label="Max Players *"
        type="number"
        min={1}
        max={50}
        value={data.maxSpots}
        onChange={e => update('maxSpots', parseInt(e.target.value) || 14)}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? 'Creating…' : 'Create Session'}
      </Button>
    </form>
  )
}
