import { useEffect, useRef, useState } from 'react'

/**
 * Animates the numeric part of a stat string (e.g. "4,500+", "96%", "-35% time",
 * "4x faster") from 0 to its value when it scrolls into view. Non-numeric values
 * (e.g. "End-to-end") render unchanged. Respects prefers-reduced-motion.
 */
export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState<string>(value)
  const done = useRef(false)

  useEffect(() => {
    // Parse "<prefix><number><suffix>" — keep the original number formatting.
    const match = value.match(/^(\D*?)([\d][\d,]*(?:\.\d+)?)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }
    const [, prefix, rawNum, suffix] = match
    const hasComma = rawNum.includes(',')
    const decimals = rawNum.includes('.') ? rawNum.split('.')[1].length : 0
    const target = parseFloat(rawNum.replace(/,/g, ''))

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fmt = (n: number) => {
      const fixed = n.toFixed(decimals)
      return hasComma ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals }) : fixed
    }

    if (reduce) {
      setDisplay(`${prefix}${fmt(target)}${suffix}`)
      return
    }

    setDisplay(`${prefix}${fmt(0)}${suffix}`)
    const el = ref.current
    if (!el) return

    // Allow re-animation whenever the value changes (e.g. interactive KPIs).
    done.current = false
    let raf = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setDisplay(`${prefix}${fmt(target * eased)}${suffix}`)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true
          run()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
