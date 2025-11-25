import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.ts'

interface Options {
  y?: number
  delay?: number
  duration?: number
  stagger?: number
  targets?: string
  once?: boolean
}

export function useGsapReveal<T extends HTMLElement>({
  y = 24,
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  targets = '[data-animate]',
  once = false,
}: Options = {}) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      const children = targets ? element.querySelectorAll<HTMLElement>(targets) : []
      const timeline = gsap.timeline({
        delay,
        defaults: { ease: 'power3.out', duration },
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })

      timeline.fromTo(
        element,
        { autoAlpha: 0, y },
        { autoAlpha: 1, y: 0, duration: duration * 0.9 },
      )

      if (children.length) {
        timeline.fromTo(
          children,
          { autoAlpha: 0, y: y / 2 },
          { autoAlpha: 1, y: 0, stagger },
          '-=0.15',
        )
      }
    }, element)

    return () => ctx.revert()
  }, [delay, duration, once, stagger, targets, y])

  return ref
}
