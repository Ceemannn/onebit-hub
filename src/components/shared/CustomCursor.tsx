import { useEffect, useRef } from 'react'

/**
 * A trailing "bit-cell" cursor: a small indigo node tracks the pointer exactly
 * while a soft ring follows with lag, expanding and turning gold over
 * interactive elements. Desktop (fine-pointer) only; skipped under
 * reduced-motion. The native cursor is left intact for accessibility.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduce) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let visible = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      if (!visible) {
        visible = true
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea, select')
      ring.dataset.hover = interactive ? 'true' : 'false'
    }
    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    let raf = 0
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] h-8 w-8 rounded-[10px] border border-indigo-500/70 opacity-0 transition-[width,height,border-color,border-radius] duration-200 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:rounded-2xl data-[hover=true]:border-gold-500"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-[2px] bg-indigo-500 opacity-0"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
