import { Zap, Users, ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function LandingPage() {
  const { signIn } = useAuth()

  return (
    <div className="bg-[#1a1717] text-[#F6E9E9]">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[380px] rounded-full bg-[#E16428]/15 blur-[100px]" />
          <div className="absolute top-60 -right-20 w-64 h-64 rounded-full bg-violet-600/8 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#F6E9E9 1px, transparent 1px), linear-gradient(90deg, #F6E9E9 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Nav */}
        <header className="relative z-10 px-6 pt-7 flex items-center justify-between max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E16428] flex items-center justify-center shadow-lg shadow-[#E16428]/40">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="font-extrabold text-[#F6E9E9] text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Volta<span className="text-[#E16428]">List</span>
            </span>
          </div>
          <button
            onClick={() => void signIn()}
            className="text-sm font-semibold text-[#F6E9E9]/60 hover:text-[#F6E9E9] transition-colors"
          >
            Sign in
          </button>
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-lg mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-[#E16428]/10 border border-[#E16428]/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E16428] animate-pulse" />
            <span className="text-xs font-semibold text-[#E16428] tracking-wide uppercase">Futsal Sign-Up App</span>
          </div>

          <h1
            className="text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Your futsal squad,<br />
            <span className="text-[#E16428]">organized.</span>
          </h1>

          <p className="text-[#F6E9E9]/50 text-base leading-relaxed max-w-sm mb-10">
            Sign up for sessions, lock in your GK, and see who's playing — all in real time.
          </p>

          {/* CTA */}
          <button
            onClick={() => void signIn()}
            className="group flex items-center gap-3 bg-white hover:bg-[#F6E9E9] text-[#1a1717] font-bold text-base px-8 py-4 rounded-2xl shadow-2xl shadow-black/40 transition-all duration-200 active:scale-95 mb-4"
          >
            <GoogleIcon />
            Continue with Google
            <ArrowRight size={16} className="text-[#1a1717]/40 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <p className="text-xs text-[#F6E9E9]/25">Free · No account setup needed</p>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex flex-col items-center pb-8 gap-1.5 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#F6E9E9]/20" />
          <span className="text-xs text-[#F6E9E9]/20">scroll</span>
        </div>
      </section>

      {/* ── APP PREVIEW ───────────────────────────── */}
      <section className="px-6 py-16 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-[#E16428] uppercase tracking-widest mb-2">Live Preview</p>
          <h2 className="text-2xl font-bold text-[#F6E9E9]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            See who's in
          </h2>
        </div>

        {/* Mock session card */}
        <div className="bg-[#2c2929] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
          {/* Captain bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#E16428]/10 border-b border-[#E16428]/15">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#E16428]" />
              <span className="text-xs font-bold text-[#E16428] uppercase tracking-widest">Captain</span>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open
            </span>
          </div>

          {/* Session info */}
          <div className="px-4 pt-4 pb-3">
            <h3 className="text-lg font-bold text-[#F6E9E9]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Friday Night Futsal
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
              <InfoRow icon="📅" text="Fri, 9 May 2025" />
              <InfoRow icon="🕗" text="7:00 PM – 9:00 PM" />
              <InfoRow icon="📍" text="Arena Futsal PJ" />
              <InfoRow icon="⚡" text="2 days to kickoff" />
            </div>
            {/* Progress */}
            <div className="mt-3.5">
              <div className="flex justify-between text-xs text-[#F6E9E9]/35 mb-1.5">
                <span>4 of 12 spots filled</span>
                <span>33%</span>
              </div>
              <div className="bg-white/8 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full w-1/3" style={{ background: 'linear-gradient(90deg, #E16428, #f08340)' }} />
              </div>
            </div>
          </div>

          {/* Player list */}
          <div className="border-t border-white/5">
            <MockPlayerRow number={1} name="Khairul Azmi" isGK color="bg-violet-500/20 text-violet-300" />
            <MockPlayerRow number={2} name="Hafiz Rahman" color="bg-emerald-500/20 text-emerald-300" />
            <MockPlayerRow number={3} name="Danial Haris" color="bg-blue-500/20 text-blue-300" />
            <MockPlayerRow number={4} name="Aiman Syafiq" color="bg-amber-500/20 text-amber-300" />
            {[5, 6, 7, 8].map(n => (
              <div key={n} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-0">
                <span className="text-xs text-white/10 w-5 text-right">{n}</span>
                <div className="w-8 h-8 rounded-full border border-dashed border-white/10" />
                <span className="text-[#F6E9E9]/15 text-sm">Open slot</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section className="px-6 py-16 max-w-lg mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-[#E16428] uppercase tracking-widest mb-2">Simple</p>
          <h2 className="text-2xl font-bold text-[#F6E9E9]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            How it works
          </h2>
        </div>

        <div className="space-y-4">
          <StepCard
            number="01"
            icon={<CheckCircle2 size={20} className="text-[#E16428]" />}
            title="Captain creates a session"
            desc="Set the venue, time, opponent, and max spots. Open it when ready."
          />
          <StepCard
            number="02"
            icon={<Users size={20} className="text-[#E16428]" />}
            title="Players sign up"
            desc="Sign in with Google and add yourself. Grab the GK slot if you're in goal."
          />
          <StepCard
            number="03"
            icon={<Clock size={20} className="text-[#E16428]" />}
            title="See the lineup in real time"
            desc="Everyone sees updates instantly. Share the link — no WhatsApp chaos."
          />
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────── */}
      <section className="px-6 py-10 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard icon={<Zap size={18} />} title="Real-time" desc="Updates live as players sign up" />
          <FeatureCard icon={<ShieldCheck size={18} />} title="GK tracking" desc="One dedicated goalkeeper slot" />
          <FeatureCard icon={<Users size={18} />} title="Player quota" desc="Max 2 entries per person" />
          <FeatureCard icon={<Clock size={18} />} title="Countdown" desc="See time left until kickoff" />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <section className="px-6 py-20 max-w-lg mx-auto text-center">
        <div className="bg-[#2c2929] border border-white/8 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full bg-[#E16428]/10 blur-[60px]" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#E16428] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#E16428]/30">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#F6E9E9] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to play?
            </h2>
            <p className="text-[#F6E9E9]/40 text-sm mb-7">
              Sign in and see if there's an open session waiting for you.
            </p>
            <button
              onClick={() => void signIn()}
              className="group flex items-center gap-3 bg-white hover:bg-[#F6E9E9] text-[#1a1717] font-bold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-black/30 transition-all duration-200 active:scale-95 mx-auto"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="border-t border-white/5 px-6 py-6 text-center">
        <p className="text-xs text-[#F6E9E9]/20">
          VoltaList · Built for ballers ⚡
        </p>
      </footer>
    </div>
  )
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[#F6E9E9]/45">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function MockPlayerRow({ number, name, isGK, color }: { number: number; name: string; isGK?: boolean; color: string }) {
  const initials = name.split(' ').slice(0, 2).map((w: string) => w[0]).join('')
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5">
      <span className="text-xs font-bold text-[#E16428]/50 w-5 text-right">{number}</span>
      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${color}`}>
        {initials}
      </div>
      <span className="text-[#F6E9E9]/80 font-medium text-sm flex-1">{name}</span>
      {isGK && (
        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#E16428]/15 text-[#E16428] border border-[#E16428]/25">
          GK
        </span>
      )}
    </div>
  )
}

function StepCard({ number, icon, title, desc }: { number: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 bg-[#2c2929] border border-white/6 rounded-2xl p-4">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#E16428]/10 border border-[#E16428]/15 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-[#E16428]/50 mb-0.5">{number}</p>
        <p className="font-semibold text-[#F6E9E9] text-sm mb-0.5">{title}</p>
        <p className="text-xs text-[#F6E9E9]/40 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-[#2c2929] border border-white/6 rounded-2xl p-4">
      <div className="w-9 h-9 rounded-lg bg-[#E16428]/12 flex items-center justify-center text-[#E16428] mb-3">
        {icon}
      </div>
      <p className="font-semibold text-[#F6E9E9] text-sm mb-1">{title}</p>
      <p className="text-xs text-[#F6E9E9]/35 leading-relaxed">{desc}</p>
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
