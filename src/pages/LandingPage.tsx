import { Zap, Users, ShieldCheck, ClipboardList, LogIn } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function LandingPage() {
  const { signIn } = useAuth()

  return (
    <div className="min-h-screen bg-[#1a1717] flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#E16428]/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-[#E16428]/6 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-500/5 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#F6E9E9 1px, transparent 1px), linear-gradient(90deg, #F6E9E9 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-6 flex items-center justify-between max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E16428] flex items-center justify-center shadow-lg shadow-[#E16428]/40">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-extrabold text-[#F6E9E9] text-lg tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Volta<span className="text-[#E16428]">List</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto w-full text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-[#E16428]/12 border border-[#E16428]/25 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E16428] animate-pulse" />
          <span className="text-xs font-semibold text-[#E16428] tracking-wide uppercase">Futsal Sign-Up</span>
        </div>

        <h1
          className="text-4xl font-bold text-[#F6E9E9] leading-[1.15] tracking-tight mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Your futsal squad,<br />
          <span className="text-[#E16428]">organized.</span>
        </h1>

        <p className="text-[#F6E9E9]/50 text-base leading-relaxed max-w-xs mx-auto mb-10">
          Sign up for sessions, lock in your GK, and see who's playing — all in real time.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Pill icon={<Zap size={12} />} label="Real-time updates" />
          <Pill icon={<ShieldCheck size={12} />} label="Captain-controlled" />
          <Pill icon={<ClipboardList size={12} />} label="Instant sign-up" />
          <Pill icon={<Users size={12} />} label="GK slot tracking" />
        </div>

        {/* Sign in button */}
        <button
          onClick={() => void signIn()}
          className="group relative flex items-center gap-3 bg-white text-[#1a1717] font-bold text-sm px-7 py-4 rounded-2xl shadow-xl shadow-black/30 hover:shadow-[#E16428]/20 hover:bg-[#F6E9E9] transition-all duration-200 active:scale-95"
        >
          <GoogleIcon />
          Continue with Google
          <LogIn size={15} className="text-[#1a1717]/40 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <p className="mt-4 text-xs text-[#F6E9E9]/25">
          Sign in to join or view sessions
        </p>

        {/* Mock preview cards */}
        <div className="mt-14 w-full space-y-2 pointer-events-none select-none">
          <p className="text-xs text-[#F6E9E9]/20 uppercase tracking-widest mb-3 font-semibold">Live session preview</p>
          <MockCard number={1} name="Khairul Azmi" isGK color="bg-violet-500/20 text-violet-300" />
          <MockCard number={2} name="Hafiz Rahman" color="bg-emerald-500/20 text-emerald-300" />
          <MockCard number={3} name="Danial Haris" color="bg-blue-500/20 text-blue-300" />
          <div className="flex items-center gap-3 px-4 py-3 bg-[#2c2929]/60 border border-white/5 rounded-xl opacity-40">
            <span className="text-xs text-white/10 w-5 text-right">4</span>
            <div className="w-8 h-8 rounded-full border border-dashed border-white/15" />
            <span className="text-[#F6E9E9]/15 text-sm">Open slot</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-6">
        <p className="text-xs text-[#F6E9E9]/15">VoltaList · Built for ballers ⚡</p>
      </footer>
    </div>
  )
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F6E9E9]/50 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
      <span className="text-[#E16428]/70">{icon}</span>
      {label}
    </span>
  )
}

function MockCard({ number, name, isGK, color }: { number: number; name: string; isGK?: boolean; color: string }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#2c2929]/80 border border-white/5 rounded-xl">
      <span className="text-xs font-bold text-[#E16428]/50 w-5 text-right">{number}</span>
      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${color}`}>
        {initials}
      </div>
      <span className="text-[#F6E9E9]/70 font-medium text-sm flex-1">{name}</span>
      {isGK && (
        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#E16428]/15 text-[#E16428] border border-[#E16428]/25">
          GK
        </span>
      )}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
