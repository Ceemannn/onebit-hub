import { useMemo, useRef, useState } from 'react'
import { Brain, Sparkles, RotateCcw } from 'lucide-react'

type Point = { x: number; y: number; cls: 0 | 1 }

function makeData(): Point[] {
  const pts: Point[] = []
  const gauss = () => (Math.random() + Math.random() + Math.random()) / 3
  for (let i = 0; i < 22; i++) pts.push({ x: 0.2 + gauss() * 0.4, y: 0.45 + gauss() * 0.45, cls: 0 })
  for (let i = 0; i < 22; i++) pts.push({ x: 0.45 + gauss() * 0.45, y: 0.1 + gauss() * 0.4, cls: 1 })
  return pts
}

const A = '#5A4FE0'
const B = '#F5A623'

/**
 * Data-science-tailored lab: a 2D classifier. Drag the slope/intercept of the
 * decision boundary and watch accuracy change, or hit "Train" to auto-fit the
 * best separating line — the supervised-learning intuition the track teaches.
 */
export function MlPlayground() {
  const [data, setData] = useState(makeData)
  const [m, setM] = useState(-1)
  const [b, setB] = useState(1.1)
  const [training, setTraining] = useState(false)
  const raf = useRef(0)

  const predict = (x: number, y: number, mm: number, bb: number) => (y >= mm * x + bb ? 0 : 1)

  const accuracy = useMemo(() => {
    const correct = data.filter((p) => predict(p.x, p.y, m, b) === p.cls).length
    return Math.round((correct / data.length) * 100)
  }, [data, m, b])

  const train = () => {
    // Coarse grid search for the best separating line, then animate to it.
    let best = { m, b, acc: -1 }
    for (let mm = -3; mm <= 3; mm += 0.25) {
      for (let bb = -0.5; bb <= 2; bb += 0.1) {
        const acc = data.filter((p) => predict(p.x, p.y, mm, bb) === p.cls).length
        if (acc > best.acc) best = { m: mm, b: bb, acc }
      }
    }
    cancelAnimationFrame(raf.current)
    setTraining(true)
    const startM = m
    const startB = b
    const t0 = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 700)
      const e = 1 - Math.pow(1 - t, 3)
      setM(startM + (best.m - startM) * e)
      setB(startB + (best.b - startB) * e)
      if (t < 1) raf.current = requestAnimationFrame(step)
      else setTraining(false)
    }
    raf.current = requestAnimationFrame(step)
  }

  const reset = () => {
    cancelAnimationFrame(raf.current)
    setData(makeData())
    setM(-1)
    setB(1.1)
    setTraining(false)
  }

  // Map data space [0,1] → svg 100x100 (y inverted).
  const sx = (x: number) => x * 100
  const sy = (y: number) => (1 - y) * 100
  const lineY1 = sy(m * 0 + b)
  const lineY2 = sy(m * 1 + b)

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Classifier playground</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
          >
            <RotateCcw size={12} /> New data
          </button>
          <button
            onClick={train}
            disabled={training}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-60"
          >
            <Sparkles size={13} /> {training ? 'Training…' : 'Train model'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <svg viewBox="0 0 100 100" className="aspect-square w-full">
            <defs>
              <clipPath id="ml-clip">
                <rect x="0" y="0" width="100" height="100" />
              </clipPath>
            </defs>
            <g clipPath="url(#ml-clip)">
              {/* shaded half-planes */}
              <polygon points={`0,0 100,0 100,${lineY2} 0,${lineY1}`} fill={A} opacity={0.08} />
              <polygon points={`0,${lineY1} 100,${lineY2} 100,100 0,100`} fill={B} opacity={0.08} />
              {/* decision boundary */}
              <line x1={0} y1={lineY1} x2={100} y2={lineY2} stroke="#fff" strokeWidth={0.7} strokeDasharray="2 2" />
              {/* points */}
              {data.map((p, i) => {
                const correct = predict(p.x, p.y, m, b) === p.cls
                return (
                  <circle
                    key={i}
                    cx={sx(p.x)}
                    cy={sy(p.y)}
                    r={1.8}
                    fill={p.cls === 0 ? A : B}
                    stroke={correct ? 'none' : '#E5484D'}
                    strokeWidth={correct ? 0 : 0.8}
                  />
                )
              })}
            </g>
          </svg>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className="font-mono text-4xl font-bold" style={{ color: accuracy >= 90 ? '#13B97A' : accuracy >= 75 ? '#F5A623' : '#E5484D' }}>
              {accuracy}%
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Training accuracy</p>
          </div>

          <Slider label="Slope (weight)" value={m} min={-3} max={3} step={0.05} onChange={setM} />
          <Slider label="Intercept (bias)" value={b} min={-0.5} max={2} step={0.05} onChange={setB} />

          <div className="flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: A }} /> Class A
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: B }} /> Class B
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-[#E5484D]" /> misclassified
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
        <span>{label}</span>
        <span className="font-mono text-white">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />
    </label>
  )
}
