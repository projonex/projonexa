'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  Brain,
  Smartphone,
  Globe,
  Cpu,
  Layers,
  Rocket,
  BookOpen,
  Zap,
  Database,
} from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easeSmooth } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────
   Node definitions — 10 service icons scattered around the hero
   x/y are pixel offsets from the vertical / horizontal centre of
   the hero section. rotate is the initial tilt angle.
───────────────────────────────────────────────────────────── */
type NodeDef = {
  id: number
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean }>
  label: string
  x: number
  y: number
  rotate: number
  color: string
  floatDelay: number
  inDelay: number
}

const NODES: NodeDef[] = [
  { id: 0, Icon: Code2,      label: 'Custom Software',       x: -368, y:  82, rotate: -12, color: '#00c8ff', floatDelay: 0.0, inDelay: 0.50 },
  { id: 1, Icon: Brain,      label: 'AI & Machine Learning', x: -488, y: -44, rotate:  12, color: '#6c63ff', floatDelay: 0.8, inDelay: 0.58 },
  { id: 2, Icon: Cpu,        label: 'IoT Systems',           x: -558, y:  66, rotate:  -6, color: '#3d8bff', floatDelay: 1.6, inDelay: 0.66 },
  { id: 3, Icon: Smartphone, label: 'Mobile Apps',           x:  386, y:  98, rotate:   6, color: '#00c8ff', floatDelay: 0.4, inDelay: 0.54 },
  { id: 4, Icon: Globe,      label: 'Web Applications',      x:  566, y: 120, rotate: -32, color: '#6c63ff', floatDelay: 1.2, inDelay: 0.62 },
  { id: 5, Icon: Rocket,     label: 'Startup MVP',           x:  472, y: -28, rotate:  32, color: '#3d8bff', floatDelay: 2.0, inDelay: 0.70 },
  { id: 6, Icon: BookOpen,   label: 'College Projects',      x: -205, y:-112, rotate:  18, color: '#67e8f9', floatDelay: 0.6, inDelay: 0.52 },
  { id: 7, Icon: Layers,     label: 'Full Stack Dev',        x:  240, y:-126, rotate: -18, color: '#67e8f9', floatDelay: 1.4, inDelay: 0.56 },
  { id: 8, Icon: Zap,        label: 'Fast Delivery',         x:  -76, y: 150, rotate:   8, color: '#00c8ff', floatDelay: 1.0, inDelay: 0.64 },
  { id: 9, Icon: Database,   label: 'Data & Backend',        x:   86, y: 154, rotate: -10, color: '#3d8bff', floatDelay: 1.8, inDelay: 0.68 },
]

/* ─────────────────────────────────────────────────────────────
   Framer Motion variants — custom receives the full NodeDef
───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.5,
    },
  },
  converged: {},
}

const nodeVariants = {
  hidden: (n: NodeDef) => ({
    x: n.x,
    y: n.y + 24,
    scale: 0.55,
    opacity: 0,
    rotate: 0,
  }),
  visible: (n: NodeDef) => ({
    x: n.x,
    y: n.y,
    scale: 1,
    opacity: 0.88,
    rotate: n.rotate,
    transition: {
      x: { duration: 0.75, ease: easeSmooth },
      y: { duration: 0.75, ease: easeSmooth },
      scale: { duration: 0.6, ease: easeSmooth },
      opacity: { duration: 0.5 },
      rotate: { duration: 0.6, ease: easeSmooth },
    },
  }),
  converged: {
    x: 0,
    y: 0,
    scale: 0.68,
    opacity: 0.28,
    rotate: 0,
    transition: {
      x: { duration: 0.62, ease: easeSmooth },
      y: { duration: 0.62, ease: easeSmooth },
      scale: { duration: 0.5, ease: easeSmooth },
      opacity: { duration: 0.35 },
      rotate: { duration: 0.5, ease: easeSmooth },
    },
  },
}

/* ─────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────── */
interface Props {
  isConverged: boolean
}

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export function HeroNodeAnimation({ isConverged }: Props) {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return null on both SSR and the initial client render so the
  // server-rendered HTML and the first hydration pass match exactly.
  // The animation enters only after mount (a client-only state update).
  if (!mounted || reduced) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      {/* ── Ambient radial glow — always present ── */}
      <div className="absolute left-1/2 top-[42%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.07] blur-[80px]" />
      <div className="absolute left-1/2 top-[42%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-secondary/[0.1] blur-[48px]" />

      {/* ── Convergence glow pulse (visible on hover) ── */}
      <motion.div
        className="absolute left-1/2 top-[42%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.35) 0%, transparent 70%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isConverged ? { scale: [0.8, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
      />

      {/* ── Node + SVG layer — anchored at hero vertical centre ── */}
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        variants={containerVariants}
        initial="hidden"
        animate={isConverged ? 'converged' : 'visible'}
      >
        {/* ── SVG connection lines ── */}
        <svg
          className="absolute pointer-events-none"
          style={{ left: -720, top: -220, width: 1440, height: 440 }}
          viewBox="-720 -220 1440 440"
        >
          {/* Dashed spoke lines from centre to each node */}
          {NODES.map((node) => (
            <motion.line
              key={`line-${node.id}`}
              x1={0}
              y1={0}
              x2={node.x}
              y2={node.y}
              stroke={node.color}
              strokeWidth="1"
              strokeDasharray="5 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: isConverged ? 0.5 : 0 }}
              transition={{ duration: 0.3, delay: isConverged ? node.id * 0.025 : 0 }}
            />
          ))}

          {/* Centre dot */}
          <motion.circle
            cx={0}
            cy={0}
            r={5}
            fill="#00c8ff"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isConverged
                ? { scale: [0, 1.6, 1], opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.45, ease: easeSmooth }}
          />

          {/* Outer pulsing ring */}
          <motion.circle
            cx={0}
            cy={0}
            r={20}
            fill="none"
            stroke="#00c8ff"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isConverged
                ? { scale: [0, 1.1, 1], opacity: 0.45 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.55, ease: easeSmooth, delay: 0.08 }}
          />
        </svg>

        {/* ── Individual nodes ── */}
        {NODES.map((node) => (
          <motion.div
            key={`node-${node.id}`}
            className="absolute"
            style={{ marginLeft: -32, marginTop: -32 }}
            custom={node}
            variants={nodeVariants}
          >
            {/* Float wrapper — only bobs when NOT converged */}
            <motion.div
              animate={!isConverged ? { y: [-5, 5] } : { y: 0 }}
              transition={{
                y: {
                  duration: 2.6 + node.floatDelay * 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: node.floatDelay,
                },
              }}
            >
              {/* Card */}
              <div
                className="group relative flex h-16 w-16 items-center justify-center rounded-xl backdrop-blur-[3px]"
                style={{
                  backgroundColor: `${node.color}12`,
                  border: `1px dashed ${node.color}55`,
                  boxShadow: `0 0 0 0 ${node.color}00`,
                }}
              >
                {/* Corner brackets — design accent */}
                {['top-[-3px] left-[-3px]', 'top-[-3px] right-[-3px]', 'bottom-[-3px] left-[-3px]', 'bottom-[-3px] right-[-3px]'].map(
                  (pos, i) => (
                    <span
                      key={i}
                      className={`absolute h-1.5 w-1.5 rounded-[2px] ${pos}`}
                      style={{ backgroundColor: node.color, opacity: 0.7 }}
                    />
                  ),
                )}

                {/* Soft glow behind icon */}
                <span
                  className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500"
                  style={{ backgroundColor: node.color }}
                />

                <node.Icon
                  className="relative h-[26px] w-[26px]"
                  style={{ color: node.color }}
                  aria-hidden
                />
              </div>

              {/* Label tooltip — subtle, desktop only */}
              <span
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: node.color, opacity: 0.45 }}
              >
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
