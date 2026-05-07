import { Outlet, Link } from 'react-router-dom'
import { AuthButton } from '../../components/auth/AuthButton'
import { useCaptain } from '../../hooks/useCaptain'

export function MainLayout() {
  const { isCaptain } = useCaptain()

  return (
    <div className="min-h-screen bg-[#272121]">
      <header className="sticky top-0 z-50 bg-[#272121]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-[#E16428] text-lg tracking-tight">
            VoltaList
          </Link>
          <div className="flex items-center gap-3">
            {isCaptain && (
              <Link
                to="/admin"
                className="text-xs text-[#F6E9E9]/50 hover:text-[#F6E9E9] transition-colors"
              >
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
