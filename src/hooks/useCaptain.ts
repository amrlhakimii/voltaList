import { useAuth } from './useAuth'

const CAPTAIN_UID = import.meta.env.VITE_CAPTAIN_UID

export function useCaptain() {
  const { user } = useAuth()
  return { isCaptain: !!user && user.uid === CAPTAIN_UID }
}
