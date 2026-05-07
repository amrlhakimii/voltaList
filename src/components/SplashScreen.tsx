import { useEffect } from 'react'

interface SplashScreenProps {
  onDone: () => void
}

// Timing (seconds)
const T = {
  welcomeDelay:   0.15,
  toDelay:        0.72,
  voltaDelay:     1.30,
  slideDuration:  0.68,
  jiggleDelay:    2.30,
  jiggleDuration: 0.65,
  fadeDelay:      3.20,
  fadeDuration:   0.60,
  doneMs:         3900,
}

const SPRING = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, T.doneMs)
    return () => clearTimeout(timer)
  }, [onDone])

  // Slide animation for each word (on the inner element)
  const slideAnim = (dir: 'left' | 'right' | 'bottom', delay: number): React.CSSProperties => ({
    animation: `splash-from-${dir} ${T.slideDuration}s ${SPRING} ${delay}s both`,
  })

  // Jiggle animation (on the outer wrapper — separate element, no transform conflict)
  const jiggleAnim = (extraDelay = 0): React.CSSProperties => ({
    display: 'block',
    animation: `splash-jiggle ${T.jiggleDuration}s ease-in-out ${T.jiggleDelay + extraDelay}s`,
  })

  // Fade-out on the root
  const fadeOut: React.CSSProperties = {
    animation: `splash-out ${T.fadeDuration}s ease ${T.fadeDelay}s forwards`,
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#1a1717]"
      style={fadeOut}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[300px] rounded-full bg-[#E16428]"
        style={{ animation: `splash-glow 2s ease-in-out infinite`, opacity: 0.12, filter: 'blur(90px)' }}
      />

      {/* Text stack */}
      <div
        className="relative z-10 flex flex-col items-center gap-1 select-none"
        style={{ fontFamily: 'Raleway, sans-serif' }}
      >
        {/* WELCOME */}
        <span style={jiggleAnim(0)}>
          <span
            className="block text-[clamp(2.4rem,12vw,4rem)] font-black uppercase tracking-[0.14em] text-[#F6E9E9] leading-none"
            style={slideAnim('left', T.welcomeDelay)}
          >
            WELCOME
          </span>
        </span>

        {/* TO */}
        <span style={jiggleAnim(0.04)}>
          <span
            className="block text-[clamp(1.6rem,8vw,2.6rem)] font-black uppercase tracking-[0.55em] text-[#E16428] leading-none pl-[0.55em]"
            style={slideAnim('right', T.toDelay)}
          >
            TO
          </span>
        </span>

        {/* VOLTA LIST */}
        <span style={jiggleAnim(0.08)}>
          <span
            className="block text-[clamp(2rem,11vw,3.5rem)] font-black uppercase leading-none mt-1"
            style={slideAnim('bottom', T.voltaDelay)}
          >
            <span className="text-[#F6E9E9] tracking-[0.06em]">VOLTA</span>
            <span className="text-[#E16428] tracking-[0.06em]">LIST</span>
          </span>
        </span>
      </div>
    </div>
  )
}
