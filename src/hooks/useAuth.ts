import { useAuthContext } from '../contexts/AuthContext'
import { signInWithGoogle, signOutUser } from '../firebase/auth'

export function useAuth() {
  const { user, loading } = useAuthContext()
  return { user, loading, signIn: signInWithGoogle, signOut: signOutUser }
}
