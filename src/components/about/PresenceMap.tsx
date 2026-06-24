import { useState } from 'react'
import worldMapDots from '../../assets/world-map-dots.png'

const I = '#5A4FE0'
const E = '#13B97A'
const G = '#F5A623'

type Node = { city: string; note: string; x: number; y: number; accent: string; hq?: boolean }

// Percentages over an equirectangular world map (x = (lon+180)/360, y = (90-lat)/180).
const NODES: Node[] = [
  { city: 'Abuja, NG', note: 'Global HQ', x: 52, y: 45, accent: G, hq: true },
  { city: 'Lagos, NG', note: 'Delivery hub', x: 50.9, y: 46.4, accent: I },
  { city: 'Accra, GH', note: 'Partner network', x: 49.9, y: 46.9, accent: E },
  { city: 'Nairobi, KE', note: 'Talent network', x: 60.2, y: 50.7, accent: E },
  { city: 'Johannesburg, ZA', note: 'Enterprise', x: 57.8, y: 64.4, accent: I },
  { city: 'Cairo, EG', note: 'Partner network', x: 58.6, y: 33.3, accent: E },
  { city: 'London, UK', note: 'Global partner', x: 49.9, y: 21.4, accent: I },
  { city: 'New York, US', note: 'Global partner', x: 29.4, y: 27.4, accent: I },
  { city: 'Dubai, AE', note: 'Global partner', x: 65.3, y: 36.1, accent: I },
]

const HQ = NODES[0]

/** Interactive presence map — pulsing region nodes wired to the Abuja HQ. */
export function PresenceMap() {
  const [active, setActive] = useState<number | null>(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-950 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-300">Global presence</p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
            Africa-first, to a global standard.
          </h3>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="font-mono text-2xl font-bold text-white">10+</p>
            <p className="text-[11px] uppercase tracking-wider text-white/50">Regions</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-white">65+</p>
            <p className="text-[11px] uppercase tracking-wider text-white/50">Global partners</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative mt-6 aspect-[2/1] w-full">
        <img
          src={worldMapDots}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain opacity-30 [filter:hue-rotate(200deg)_saturate(1.4)]"
        />

        {/* connecting lines from HQ */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {NODES.slice(1).map((n) => (
            <line
              key={n.city}
              x1={HQ.x}
              y1={HQ.y}
              x2={n.x}
              y2={n.y}
              stroke="rgba(90,79,224,0.35)"
              strokeWidth={0.3}
              strokeDasharray="1 1"
            />
          ))}
        </svg>

        {/* nodes */}
        {NODES.map((n, i) => (
          <button
            key={n.city}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-label={`${n.city} — ${n.note}`}
          >
            {!reduce && (
              <span
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                style={{ background: n.accent, opacity: 0.5 }}
              />
            )}
            <span
              className="relative block rounded-full ring-2 ring-ink-950"
              style={{ background: n.accent, width: n.hq ? 12 : 8, height: n.hq ? 12 : 8 }}
            />
            {/* tooltip */}
            <span
              className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900 px-2.5 py-1.5 text-left transition-opacity ${
                active === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span className="block text-xs font-semibold text-white">{n.city}</span>
              <span className="block font-mono text-[10px] uppercase tracking-wider" style={{ color: n.accent }}>
                {n.note}
              </span>
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
        Hover a node · live network
      </p>
    </div>
  )
}
