import { useState } from 'react'
import type { FormEvent } from 'react'
import { UserPlus, Shield } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { QuotaIndicator } from './QuotaIndicator'
import { validatePlayerName } from '../../utils/validation'

interface AddEntryFormProps {
  onAdd: (name: string, isGK: boolean) => Promise<void>
  quotaCount: number
  quotaReached: boolean
  gkTaken: boolean
  isCaptain: boolean
  disabled: boolean
}

export function AddEntryForm({
  onAdd,
  quotaCount,
  quotaReached,
  gkTaken,
  isCaptain,
  disabled,
}: AddEntryFormProps) {
  const [name, setName] = useState('')
  const [isGK, setIsGK] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const canAdd = isCaptain || !quotaReached
  const gkBlocked = gkTaken && !isCaptain

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationError = validatePlayerName(name)
    if (validationError) {
      setError(validationError)
      return
    }
    if (isGK && gkBlocked) {
      setError('GK slot is already taken')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await onAdd(name.trim(), isGK)
      setName('')
      setIsGK(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add player')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="p-4 space-y-3">
      <p className="text-xs font-semibold text-[#F6E9E9]/40 uppercase tracking-wider">Add Player</p>
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <Input
            id="player-name"
            placeholder="Player name..."
            value={name}
            onChange={e => setName(e.target.value)}
            error={error ?? undefined}
            disabled={disabled || !canAdd}
            maxLength={50}
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          className="mt-0 shrink-0 gap-1.5"
          disabled={disabled || !canAdd || loading}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <UserPlus size={15} />
          )}
          Add
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <label
          className={`flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg border transition-colors ${
            isGK && !gkBlocked
              ? 'border-[#E16428]/40 bg-[#E16428]/10'
              : gkBlocked
              ? 'border-white/5 opacity-40 cursor-not-allowed'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <input
            type="checkbox"
            checked={isGK}
            onChange={e => setIsGK(e.target.checked)}
            disabled={gkBlocked}
            className="hidden"
          />
          <Shield size={14} className={isGK && !gkBlocked ? 'text-[#E16428]' : 'text-[#F6E9E9]/40'} />
          <span className={`text-sm font-medium ${isGK && !gkBlocked ? 'text-[#E16428]' : 'text-[#F6E9E9]/50'}`}>
            Goalkeeper{gkBlocked ? ' (taken)' : ''}
          </span>
        </label>
        {!isCaptain && <QuotaIndicator count={quotaCount} />}
      </div>
    </form>
  )
}
