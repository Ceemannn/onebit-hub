import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '../../lib/utils.ts'

const prefersReduce = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Magnetic wrapper — the element drifts toward the cursor and springs back on
 * leave. Great for buttons and small CTAs. Disabled under reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || prefersReduce()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
    </span>
  )
}

/**
 * Tilt card — 3D perspective tilt that follows the cursor, with an optional
 * cursor-tracked spotlight (set `--mx`/`--my` consumers via the .spotlight-card
 * utility). Disabled under reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  ...rest
}: {
  children: ReactNode
  className?: string
  max?: number
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || prefersReduce()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg)`
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    rest.onMouseMove?.(e)
  }
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'
    rest.onMouseLeave?.(e)
  }

  return (
    <div
      {...rest}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
    </div>
  )
}

/* ---- scroll reveals (framer-motion) ------------------------------------- */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/** Single element reveal on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Container that staggers its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  )
}
