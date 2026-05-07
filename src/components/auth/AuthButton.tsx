import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

export function AuthButton() {
  const { user, signIn, signOut } = useAuth()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.photoURL && (
          <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full ring-1 ring-white/20" />
        )}
        <Button variant="ghost" size="sm" onClick={() => void signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => void signIn()}>
      Sign in with Google
    </Button>
  )
}
