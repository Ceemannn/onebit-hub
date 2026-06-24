import { useState } from 'react'
import { Palette, Check } from 'lucide-react'

const COLORS = [
  { name: 'Indigo', v: '#5A4FE0' },
  { name: 'Emerald', v: '#13B97A' },
  { name: 'Gold', v: '#F5A623' },
  { name: 'Rose', v: '#E5484D' },
]
const FONTS = ['Sora', 'Plus Jakarta Sans', 'JetBrains Mono']

/**
 * Product-design-tailored lab: a live design-token editor. Tweak radius,
 * spacing, color and type and the component preview updates instantly — the
 * design-systems thinking the UI/UX course builds.
 */
export function DesignStudio() {
  const [radius, setRadius] = useState(16)
  const [pad, setPad] = useState(24)
  const [color, setColor] = useState(COLORS[0].v)
  const [font, setFont] = useState(FONTS[0])
  const [elevation, setElevation] = useState(2)

  const shadows = [
    'none',
    '0 1px 2px rgba(18,23,42,.1)',
    '0 8px 24px rgba(18,23,42,.12)',
    '0 20px 50px rgba(18,23,42,.2)',
  ]

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Design tokens studio</span>
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_1.1fr]">
        {/* Controls */}
        <div className="space-y-5">
          <Range label="Corner radius" value={radius} min={0} max={32} unit="px" onChange={setRadius} />
          <Range label="Padding" value={pad} min={8} max={48} unit="px" onChange={setPad} />
          <Range label="Elevation" value={elevation} min={0} max={3} unit="" onChange={setElevation} />

          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-white/50">Primary color</p>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.v}
                  onClick={() => setColor(c.v)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg ring-2 ring-offset-2 ring-offset-ink-950 transition"
                  style={{ background: c.v, boxShadow: color === c.v ? `0 0 0 2px ${c.v}` : 'none' }}
                  aria-label={c.name}
                >
                  {color === c.v && <Check size={15} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-white/50">Typeface</p>
            <div className="flex flex-wrap gap-1.5">
              {FONTS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFont(f)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    font === f ? 'border-transparent bg-indigo-500 text-white' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="flex flex-col">
          <p className="mb-2 text-xs uppercase tracking-wider text-white/40">Live preview</p>
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(90,79,224,0.12),transparent_60%)] p-6">
            <div
              className="w-full max-w-xs bg-white"
              style={{ borderRadius: radius, padding: pad, boxShadow: shadows[elevation], fontFamily: font }}
            >
              <span
                className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `${color}1a`, color }}
              >
                Component
              </span>
              <h4 className="mt-3 text-lg font-bold text-neutral-900" style={{ fontFamily: font }}>
                Card title
              </h4>
              <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: font }}>
                Adjust the tokens and watch this update in real time.
              </p>
              <button
                className="mt-4 w-full rounded-lg py-2.5 text-sm font-semibold text-white transition"
                style={{ background: color, borderRadius: Math.max(8, radius - 4) }}
              >
                Primary action
              </button>
            </div>
          </div>
          <p className="mt-3 font-mono text-[11px] text-white/40">
            radius: {radius}px · padding: {pad}px · color: {color}
          </p>
        </div>
      </div>
    </div>
  )
}

function Range({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (v: number) => void
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
        <span>{label}</span>
        <span className="font-mono text-white">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />
    </label>
  )
}
