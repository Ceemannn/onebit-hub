import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Rocket, Boxes, GraduationCap, GitMerge, TrendingUp, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Milestone = { year: string; title: string; content: string; icon: LucideIcon; accent: string }

const I = '#5A4FE0'
const E = '#13B97A'
const G = '#F5A623'

const MILESTONES: Milestone[] = [
  { year: '2019', title: 'Onebit is founded', content: 'Born in Abuja, Nigeria on one belief — technology should serve people, not confuse them.', icon: Rocket, accent: I },
  { year: '2021', title: 'Build ships', content: 'First intelligent enterprise systems delivered — credit intelligence, ERP and automation for African businesses.', icon: Boxes, accent: I },
  { year: '2022', title: 'Learn launches', content: 'Cohort-based, job-ready academies open. The first thousands of learners are trained.', icon: GraduationCap, accent: E },
  { year: '2023', title: 'Bridge connects', content: 'Vetted, Onebit-trained talent matched to real industry roles.', icon: GitMerge, accent: G },
  { year: '2024', title: 'Scale', content: '120+ enterprise launches, 4,500+ learners trained, 65+ partners, 96% satisfaction.', icon: TrendingUp, accent: E },
  { year: 'Now', title: 'One hub, three arms', content: 'Building technology, developing people, connecting opportunity — Africa-first, to a global standard.', icon: Sparkles, accent: G },
]

const STEP_MS = 4200

/**
 * Sleek horizontal milestone stepper: an auto-advancing progress rail with
 * clickable year-nodes and a crossfading detail card. Pauses on hover, resumes
 * after manual selection, and respects reduced-motion.
 */
export function MilestoneTimeline() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const resumeTimer = useRef<number | null>(null)
  const n = MILESTONES.length

  useEffect(() => {
    if (paused || reduce) return
    const t = setInterval(() => setActive((a) => (a + 1) % n), STEP_MS)
    return () => clearInterval(t)
  }, [paused, reduce, n])

  const select = (i: number) => {
    setActive(i)
    setPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 9000)
  }

  const m = MILESTONES[active]
  const Icon = m.icon
  const fill = n > 1 ? (active / (n - 1)) * 100 : 0

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-950 p-6 md:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 text-white/[0.04] [background-image:radial-gradient(currentColor_1.1px,transparent_1.1px)] [background-size:26px_26px]"
        aria-hidden
      />

      {/* Rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-[9px] h-0.5 rounded-full bg-white/10" />
        <motion.div
          className="absolute left-0 top-[9px] h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-gold-500"
          animate={{ width: `${fill}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="relative flex justify-between">
          {MILESTONES.map((item, i) => {
            const done = i <= active
            const isActive = i === active
            return (
              <button
                key={item.year}
                onClick={() => select(i)}
                aria-label={`${item.year} — ${item.title}`}
                aria-current={isActive}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300"
                  style={
                    done
                      ? { background: item.accent, borderColor: item.accent }
                      : { background: '#0B0E1A', borderColor: 'rgba(255,255,255,0.2)' }
                  }
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: `0 0 0 4px ${item.accent}33` }}
                    />
                  )}
                </span>
                <span
                  className="font-mono text-[11px] font-semibold tracking-wider transition-colors"
                  style={{ color: isActive ? item.accent : done ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}
                >
                  {item.year}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="relative mt-10 min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 sm:flex-row sm:items-start"
          >
            <span
              className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl"
              style={{ background: `${m.accent}1f`, color: m.accent }}
            >
              <Icon size={26} />
            </span>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-mono text-sm font-bold tracking-wider" style={{ color: m.accent }}>
                  {m.year}
                </p>
                <span className="font-mono text-[11px] text-white/30">
                  {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-1 font-heading text-2xl font-bold text-white md:text-3xl">{m.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{m.content}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
