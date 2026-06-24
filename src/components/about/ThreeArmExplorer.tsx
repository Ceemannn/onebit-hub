import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Boxes, GraduationCap, GitMerge, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CountUp } from '../shared/CountUp.tsx'

type Arm = {
  key: string
  name: string
  idea: string
  color: string
  icon: LucideIcon
  href: string
  desc: string
  stat: { value: string; label: string }
}

const ARMS: Arm[] = [
  {
    key: 'build',
    name: 'Build',
    idea: 'Systems',
    color: '#5A4FE0',
    icon: Boxes,
    href: '/build/projects',
    desc: 'We design, engineer and ship intelligent enterprise systems — data platforms, AI, credit intelligence and automation. We build the thing that runs your business.',
    stat: { value: '120+', label: 'Enterprise launches' },
  },
  {
    key: 'learn',
    name: 'Learn',
    idea: 'People',
    color: '#13B97A',
    icon: GraduationCap,
    href: '/learn/individuals',
    desc: 'Cohort-based, job-ready tech education for individuals and corporate teams. We grow the people who build the future.',
    stat: { value: '4,500+', label: 'Learners trained' },
  },
  {
    key: 'bridge',
    name: 'Bridge',
    idea: 'Opportunity',
    color: '#F5A623',
    icon: GitMerge,
    href: '/bridge',
    desc: 'We match vetted, Onebit-trained talent to real industry roles — connecting capable people to the work that needs them.',
    stat: { value: '10+', label: 'Regions served' },
  },
]

/**
 * Interactive "one hub, three arms" explorer — hover/click an arm and its panel
 * expands to reveal what it does, a key stat and a link. Collapsed panels stay
 * legible. Responsive (panels stack on mobile).
 */
export function ThreeArmExplorer() {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3 md:h-80 md:flex-row">
      {ARMS.map((arm, i) => {
        const isActive = i === active
        const Icon = arm.icon
        return (
          <motion.div
            key={arm.key}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            animate={{ flexGrow: isActive ? 2.6 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex min-h-[180px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-colors duration-500 md:min-h-0"
            style={{
              background: '#0B0E1A',
              borderColor: isActive ? `${arm.color}80` : 'rgba(255,255,255,0.1)',
            }}
          >
            {/* accent glow */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: isActive ? 1 : 0.25,
                background: `radial-gradient(circle at 30% 0%, ${arm.color}26, transparent 60%)`,
              }}
            />
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: arm.color }} />

            <div className="relative">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: `${arm.color}26`, color: arm.color }}
              >
                <Icon size={24} />
              </span>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: arm.color }}>
                {arm.idea}
              </p>
              <h3 className="mt-1 font-heading text-2xl font-bold text-white md:text-3xl">{arm.name}</h3>
            </div>

            {/* Detail (active only) */}
            <motion.div
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, delay: isActive ? 0.15 : 0 }}
              className="relative mt-4"
            >
              {isActive && (
                <>
                  <p className="max-w-md text-sm leading-relaxed text-white/70">{arm.desc}</p>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-2xl font-bold" style={{ color: arm.color }}>
                        <CountUp value={arm.stat.value} />
                      </p>
                      <p className="text-[11px] uppercase tracking-wider text-white/50">{arm.stat.label}</p>
                    </div>
                    <Link
                      to={arm.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-950 transition-transform hover:-translate-y-0.5"
                      style={{ background: arm.color }}
                    >
                      Explore <ArrowRight size={15} />
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
