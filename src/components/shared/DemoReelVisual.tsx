import { motion } from 'framer-motion'

/**
 * Compact, live-looking mini-visualizations for the hero demo reel. Each one
 * keys off `active` so it re-plays whenever its slide becomes active. Animations
 * are short, looping where it reads as "live", and skipped under reduced-motion
 * (framer-motion respects the user's MotionConfig / reduced-motion automatically
 * for transforms when the OS pref is set).
 */
const I = '#5A4FE0'
const E = '#13B97A'
const G = '#F5A623'
const L = '#A99FEF'

export function DemoReelVisual({ index, active }: { index: number; active: boolean }) {
  const key = `${index}-${active}`
  switch (index) {
    case 0:
      return <Bars k={key} active={active} />
    case 1:
      return <ForecastLine k={key} active={active} />
    case 2:
      return <FlowPipeline k={key} active={active} />
    case 3:
      return <Scorecards k={key} active={active} />
    default:
      return <InventoryGrid k={key} active={active} />
  }
}

const wrap = 'h-[96px] w-full rounded-lg border border-white/10 bg-black/30 p-3'

/* 0 — Credit scoring: bars growing, one risk band highlighted */
function Bars({ k, active }: { k: string; active: boolean }) {
  const heights = [38, 64, 50, 82, 70, 92, 58]
  return (
    <div className={wrap} key={k}>
      <div className="flex h-full items-end gap-1.5">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: i === 5 ? G : i % 2 ? I : L }}
            initial={{ height: active ? 0 : `${h}%` }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  )
}

/* 1 — Demand forecast: actual line draws, gold forecast continues dashed */
function ForecastLine({ k, active }: { k: string; active: boolean }) {
  return (
    <div className={wrap} key={k}>
      <svg viewBox="0 0 240 70" className="h-full w-full" preserveAspectRatio="none">
        <motion.path
          d="M2,52 L40,40 L78,46 L116,24 L150,30"
          fill="none"
          stroke={I}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: active ? 0 : 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <motion.path
          d="M150,30 L186,20 L222,10"
          fill="none"
          stroke={G}
          strokeWidth={2.5}
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={{ pathLength: active ? 0 : 1, opacity: active ? 0 : 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={222}
          cy={10}
          r={3.5}
          fill={G}
          initial={{ scale: active ? 0 : 1 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ duration: 0.4, delay: 1.5 }}
        />
      </svg>
    </div>
  )
}

/* 2 — HR onboarding: a pipeline of steps lighting up in sequence */
function FlowPipeline({ k, active }: { k: string; active: boolean }) {
  const steps = ['Apply', 'Verify', 'Setup', 'Active']
  return (
    <div className={wrap} key={k}>
      <div className="flex h-full items-center justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1">
            <motion.div
              className="flex flex-1 flex-col items-center gap-1 rounded-md py-1.5 text-[8px] font-semibold uppercase tracking-wider"
              style={{ color: '#cfd6e6' }}
              initial={{ opacity: active ? 0.25 : 1, scale: active ? 0.9 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.35, duration: 0.4 }}
            >
              <motion.span
                className="h-5 w-5 rounded-md"
                style={{ background: i === steps.length - 1 ? E : I }}
                initial={{ opacity: active ? 0.2 : 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.35 }}
              />
              {s}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                className="h-px w-3 origin-left"
                style={{ background: L }}
                initial={{ scaleX: active ? 0 : 1 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.35, duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* 3 — Performance scorecards: labelled progress bars filling */
function Scorecards({ k, active }: { k: string; active: boolean }) {
  const rows = [
    { label: 'Delivery', pct: 88, c: I },
    { label: 'Quality', pct: 72, c: E },
    { label: 'OKRs', pct: 64, c: G },
  ]
  return (
    <div className={wrap} key={k}>
      <div className="flex h-full flex-col justify-center gap-2">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="w-12 text-[8px] uppercase tracking-wider text-white/70">{r.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: r.c }}
                initial={{ width: active ? 0 : `${r.pct}%` }}
                animate={{ width: `${r.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 4 — Inventory: a grid of cells filling, with a reorder pulse */
function InventoryGrid({ k, active }: { k: string; active: boolean }) {
  const cells = Array.from({ length: 24 })
  return (
    <div className={wrap} key={k}>
      <div className="grid h-full grid-cols-12 grid-rows-2 gap-1">
        {cells.map((_, i) => {
          const low = i === 7 || i === 18
          return (
            <motion.span
              key={i}
              className="rounded-[3px]"
              style={{ background: low ? G : i % 3 === 0 ? I : 'rgba(169,159,239,0.35)' }}
              initial={{ opacity: active ? 0 : 1, scale: active ? 0.6 : 1 }}
              animate={
                low
                  ? { opacity: [1, 0.4, 1], scale: 1 }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                low
                  ? { opacity: { duration: 1, repeat: Infinity }, scale: { delay: i * 0.015 } }
                  : { duration: 0.3, delay: i * 0.015 }
              }
            />
          )
        })}
      </div>
    </div>
  )
}
