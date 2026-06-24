import { useEffect, useRef, useState } from 'react'

const GLYPHS = '01<>/\\{}[]=+*#'

/**
 * "Decode" reveal — scrambles through random glyphs and resolves to the final
 * text, left to right. Reads as a futuristic terminal boot. Honours
 * prefers-reduced-motion (renders the final text immediately).
 */
export function DecodeText({
  text,
  className,
  speed = 28,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  speed?: number
  as?: 'span' | 'div'
}) {
  const [output, setOutput] = useState(text)
  const frame = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text)
      return
    }
    let raf = 0
    let revealed = 0
    let tick = 0
    const animate = () => {
      tick++
      if (tick % 2 === 0) revealed += 0.5
      const out = text
        .split('')
        .map((ch, i) => {
          if (i < Math.floor(revealed) || ch === ' ') return ch
          return GLYPHS[(frame.current + i) % GLYPHS.length]
        })
        .join('')
      frame.current++
      setOutput(out)
      if (revealed < text.length) {
        raf = window.setTimeout(() => requestAnimationFrame(animate), speed) as unknown as number
      } else {
        setOutput(text)
      }
    }
    animate()
    return () => {
      clearTimeout(raf)
      cancelAnimationFrame(raf)
    }
  }, [text, speed])

  return <Tag className={className}>{output}</Tag>
}
