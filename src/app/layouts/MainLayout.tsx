import { Outlet, Link } from 'react-router-dom'
import { Zap, LayoutDashboard } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { useCaptain } from '../../hooks/useCaptain'

export function MainLayout() {
  const { isCaptain } = useCaptain()

  return (
    <div className="min-h-screen bg-[#1a1717]">
      <header className="sticky top-0 z-50 bg-[#1a1717]/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E16428] flex items-center justify-center shadow-lg shadow-[#E16428]/30">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-extrabold text-[#F6E9E9] text-base tracking-tight">
              Volta<span className="text-[#E16428]">List</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {isCaptain && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-xs text-[#F6E9E9]/50 hover:text-[#F6E9E9] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5"
              >
                <LayoutDashboard size={13} />
                Dashboard
              </Link>
            )}
            <AuthButton />
          </div>
        </div>
      </header>
      <main className="max-w-lg mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
