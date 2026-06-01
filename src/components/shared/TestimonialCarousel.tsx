import { useEffect, useState, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

type Testimonial = {
  quote: string
  name: string
  role: string
  metricLabelLeft: string
  metricValueLeft: string
  metricLabelRight: string
  metricValueRight: string
}

type TestimonialCarouselProps = {
  testimonials: Testimonial[]
}

/**
 * 3D fanned "coverflow" testimonial carousel. The active card sits upright and
 * centered while the others fan out, tilted and faded. Clicking a side card,
 * the arrows, or a progress bar brings a testimonial to the front.
 */
export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const count = testimonials.length
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Gentle auto-advance; restarts on each change and pauses while hovered.
  useEffect(() => {
    if (count <= 1 || isPaused) return
    const timeout = setTimeout(() => setActive((prev) => (prev + 1) % count), 6000)
    return () => clearTimeout(timeout)
  }, [active, isPaused, count])

  const go = (dir: number) => setActive((prev) => (prev + dir + count) % count)

  // Signed distance from the active card, wrapped so the fan stays balanced.
  const getOffset = (index: number) => {
    let offset = index - active
    if (offset > count / 2) offset -= count
    if (offset < -count / 2) offset += count
    return offset
  }

  const cardStyle = (offset: number): CSSProperties => {
    const dir = offset > 0 ? 1 : -1
    const abs = Math.abs(offset)
    if (abs === 0) {
      return { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, zIndex: 30 }
    }
    if (abs === 1) {
      return {
        transform: `translate(-50%, -50%) translateX(${dir * 64}%) translateY(22px) rotate(${dir * 7}deg) scale(0.84)`,
        opacity: 0.5,
        zIndex: 20,
      }
    }
    if (abs === 2) {
      return {
        transform: `translate(-50%, -50%) translateX(${dir * 118}%) translateY(52px) rotate(${dir * 12}deg) scale(0.7)`,
        opacity: 0.28,
        zIndex: 10,
      }
    }
    return {
      transform: `translate(-50%, -50%) translateX(${dir * 150}%) scale(0.6)`,
      opacity: 0,
      zIndex: 0,
    }
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Radial glow that anchors the active card. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/15 blur-3xl" />

      <div className="relative mx-auto h-[440px] max-w-4xl">
        {testimonials.map((item, index) => {
          const offset = getOffset(index)
          const isActive = offset === 0
          return (
            <article
              key={item.name}
              onClick={() => !isActive && setActive(index)}
              style={cardStyle(offset)}
              aria-hidden={!isActive}
              className={`absolute left-1/2 top-1/2 flex h-[380px] w-[300px] flex-col justify-between rounded-2xl border p-6 transition-all duration-500 ease-out sm:w-[360px] md:w-[400px] md:p-7 ${
                isActive
                  ? 'border-brand-teal/40 bg-gradient-to-br from-[#1C1E24] to-[#2A2E38] shadow-[0_30px_80px_-20px_rgba(50,154,146,0.5)]'
                  : 'cursor-pointer border-white/10 bg-gradient-to-br from-[#1C1E24] to-[#23262F] shadow-2xl'
              }`}
            >
              {/* Glowing top accent on the active card. */}
              {isActive && (
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent" />
              )}

              <p className="text-base leading-relaxed text-neutral-100/90 md:text-lg">
                “{item.quote}”
              </p>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <p className="font-semibold text-brand-light">{item.metricValueLeft}</p>
                    <p className="text-neutral-400">{item.metricLabelLeft}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand-light">{item.metricValueRight}</p>
                    <p className="text-neutral-400">{item.metricLabelRight}</p>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-400">{item.role}</p>
                  </div>
                  <span
                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-teal transition-shadow ${
                      isActive ? 'shadow-[0_0_28px_rgba(50,154,146,0.55)]' : ''
                    }`}
                  >
                    <Quote size={18} />
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Controls: arrows + segmented progress bars. */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/10 bg-white/80 text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:text-brand-primary dark:border-white/10 dark:bg-white/10 dark:text-neutral-200"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active
                  ? 'w-7 bg-gradient-to-r from-brand-primary to-brand-teal'
                  : 'w-2.5 bg-neutral-900/15 hover:bg-neutral-900/30 dark:bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/10 bg-white/80 text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:text-brand-primary dark:border-white/10 dark:bg-white/10 dark:text-neutral-200"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
