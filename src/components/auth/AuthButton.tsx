import { LogIn, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export function AuthButton() {
  const { user, signIn, signOut } = useAuth()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.photoURL && (
          <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full ring-2 ring-white/15" />
        )}
        <button
          onClick={() => void signOut()}
          className="flex items-center gap-1.5 text-xs text-[#F6E9E9]/50 hover:text-[#F6E9E9] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => void signIn()}
      className="flex items-center gap-1.5 text-sm font-medium text-[#F6E9E9] bg-white/10 hover:bg-white/15 border border-white/15 px-3 py-1.5 rounded-lg transition-colors"
    >
      <LogIn size={14} />
      Sign in
    </button>
  )
}
