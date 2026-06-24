import { motion, useReducedMotion } from 'framer-motion'

const NODES = [
  { x: 90, label: 'Build', sub: '01 · Systems', color: '#5A4FE0' },
  { x: 300, label: 'Learn', sub: '02 · People', color: '#13B97A' },
  { x: 510, label: 'Bridge', sub: '03 · Opportunity', color: '#F5A623' },
]

/**
 * Animated connector showing the three arms wired together: lines draw on
 * scroll, then a "data packet" pulses along each segment (Build → Learn →
 * Bridge). Decorative; hidden on small screens, static under reduced-motion.
 */
export function ArmFlow() {
  const reduce = useReducedMotion()

  return (
    <div className="hidden md:block" aria-hidden>
      <svg viewBox="0 0 600 120" className="mx-auto w-full max-w-3xl">
        <defs>
          <linearGradient id="armflow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5A4FE0" />
            <stop offset="50%" stopColor="#13B97A" />
            <stop offset="100%" stopColor="#F5A623" />
          </linearGradient>
        </defs>

        {/* Base connecting line that draws on scroll */}
        <motion.line
          x1={90}
          y1={50}
          x2={510}
          y2={50}
          stroke="url(#armflow-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Flowing data packet */}
        {!reduce && (
          <motion.circle
            r={4}
            cy={50}
            fill="#fff"
            initial={{ cx: 90, opacity: 0 }}
            whileInView={{ cx: [90, 510], opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 2.2, delay: 1, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
          />
        )}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.3 + i * 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${n.x}px 50px` }}
          >
            <circle cx={n.x} cy={50} r={16} fill={n.color} opacity={0.18} />
            <rect x={n.x - 9} y={41} width={18} height={18} rx={5} fill={n.color} />
            <text x={n.x} y={84} textAnchor="middle" className="fill-current text-neutral-900 dark:fill-white" fontSize="13" fontWeight="700" fontFamily="Sora, sans-serif">
              {n.label}
            </text>
            <text x={n.x} y={100} textAnchor="middle" fill={n.color} fontSize="8.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">
              {n.sub.toUpperCase()}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
