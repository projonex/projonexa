import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface SiteAmbientBackgroundProps {
  reducedMotion: boolean
  showCursor: boolean
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
  isActive: MotionValue<number>
}

const spring = { stiffness: 90, damping: 22, mass: 0.35 }

export function SiteAmbientBackground({
  reducedMotion,
  showCursor,
  mouseX,
  mouseY,
  parallaxX,
  parallaxY,
  isActive,
}: SiteAmbientBackgroundProps) {
  const spotlightX = useSpring(mouseX, spring)
  const spotlightY = useSpring(mouseY, spring)
  const orbX = useSpring(useTransform(parallaxX, (v) => v * 24), spring)
  const orbY = useSpring(useTransform(parallaxY, (v) => v * 24), spring)
  const orb2X = useSpring(useTransform(parallaxX, (v) => v * -18), spring)
  const orb2Y = useSpring(useTransform(parallaxY, (v) => v * -14), spring)
  const spotlightOpacity = useSpring(
    useTransform(isActive, (v) => (showCursor ? 0.38 + v * 0.28 : 0.35)),
    spring,
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/90 via-white to-violet-50/70 dark:from-[#030712] dark:via-black dark:to-[#0a0614]" />
      <div className="hero-mesh absolute inset-0 opacity-90" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-20%,rgba(0,200,255,0.28),transparent_62%)] dark:bg-[radial-gradient(ellipse_120%_90%_at_50%_-20%,rgba(0,200,255,0.18),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_100%_40%,rgba(108,99,255,0.16),transparent_58%)] dark:bg-[radial-gradient(ellipse_80%_55%_at_100%_40%,rgba(108,99,255,0.1),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_90%,rgba(61,139,255,0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_0%_90%,rgba(61,139,255,0.08),transparent_55%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-aurora-blob hero-aurora-blob-a absolute -left-[12%] top-[0%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.32)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,transparent_68%)]" />
        <div className="hero-aurora-blob hero-aurora-blob-b absolute -right-[8%] top-[18%] h-[48%] w-[48%] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.26)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(108,99,255,0.16)_0%,transparent_68%)]" />
        <div className="hero-aurora-blob hero-aurora-blob-c absolute bottom-[5%] left-[12%] h-[42%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.22)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(61,139,255,0.12)_0%,transparent_68%)]" />
      </div>

      <motion.div
        className="absolute right-[6%] top-[22%] h-[min(28rem,45vw)] w-[min(28rem,45vw)] rounded-full bg-brand-primary/18 blur-[100px] dark:bg-brand-primary/12"
        style={showCursor ? { x: orbX, y: orbY } : undefined}
      />
      <motion.div
        className="absolute left-[2%] top-[55%] h-80 w-80 rounded-full bg-brand-secondary/20 blur-[90px] dark:bg-brand-secondary/12"
        style={showCursor ? { x: orb2X, y: orb2Y } : undefined}
      />

      {showCursor && (
        <>
          <motion.div
            className="absolute z-[2] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spotlightX,
              top: spotlightY,
              opacity: spotlightOpacity,
              background:
                'radial-gradient(circle, rgba(0, 200, 255, 0.32) 0%, rgba(61, 139, 255, 0.14) 38%, transparent 68%)',
            }}
          />
          <motion.div
            className="absolute z-[3] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spotlightX,
              top: spotlightY,
              opacity: spotlightOpacity,
              background:
                'radial-gradient(circle, rgba(108, 99, 255, 0.22) 0%, transparent 62%)',
            }}
          />
          <motion.div
            className="absolute z-[4] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary shadow-[0_0_20px_4px_rgba(0,200,255,0.45)] ring-2 ring-brand-primary/30 dark:shadow-[0_0_24px_6px_rgba(0,200,255,0.35)]"
            style={{ left: spotlightX, top: spotlightY }}
          />
        </>
      )}

      <div className="hero-grid absolute inset-0 opacity-40 dark:opacity-28" />
      <div className="hero-dots absolute inset-0 opacity-30 dark:opacity-20" />

      {!reducedMotion && (
        <>
          <div className="hero-beam hero-beam-a absolute -left-1/4 top-[20%] h-px w-[150%] rotate-[-10deg] bg-gradient-to-r from-transparent via-brand-primary/22 to-transparent" />
          <div className="hero-beam hero-beam-b absolute -right-1/4 top-[65%] h-px w-[150%] rotate-[6deg] bg-gradient-to-r from-transparent via-brand-secondary/18 to-transparent" />
        </>
      )}
    </div>
  )
}
