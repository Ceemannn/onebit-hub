import { useState } from 'react'
import { Cloud, Server, Database, HardDrive, Network, Gauge, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Service = { key: string; label: string; icon: LucideIcon; cost: number }

const SERVICES: Service[] = [
  { key: 'compute', label: 'Compute (EC2)', icon: Server, cost: 42 },
  { key: 'storage', label: 'Object storage (S3)', icon: HardDrive, cost: 12 },
  { key: 'database', label: 'Managed DB (RDS)', icon: Database, cost: 58 },
  { key: 'lb', label: 'Load balancer', icon: Network, cost: 18 },
  { key: 'cdn', label: 'CDN edge', icon: Cloud, cost: 9 },
]

const TIERS = ['Dev', 'Staging', 'Prod'] as const
const TIER_MULT: Record<(typeof TIERS)[number], number> = { Dev: 1, Staging: 1.6, Prod: 3 }

/**
 * Cloud-tailored lab: provision services and watch the architecture diagram and
 * monthly cost update — the "design for scale & cost" intuition the course
 * teaches.
 */
export function CloudArchitect() {
  const [active, setActive] = useState<string[]>(['compute', 'storage', 'lb'])
  const [tier, setTier] = useState<(typeof TIERS)[number]>('Dev')

  const toggle = (k: string) => setActive((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))
  const monthly = Math.round(
    SERVICES.filter((s) => active.includes(s.key)).reduce((sum, s) => sum + s.cost, 0) * TIER_MULT[tier],
  )
  const availability = Math.min(99.99, 95 + active.length * (tier === 'Prod' ? 1.0 : 0.6)).toFixed(2)

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Cloud size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Cloud architect</span>
        </div>
        <div className="flex gap-1">
          {TIERS.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                tier === t ? 'bg-indigo-500 text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.2fr]">
        {/* Service palette */}
        <div className="space-y-2">
          <p className="mb-1 text-xs uppercase tracking-wider text-white/50">Resources</p>
          {SERVICES.map((s) => {
            const on = active.includes(s.key)
            const Icon = s.icon
            return (
              <button
                key={s.key}
                onClick={() => toggle(s.key)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                  on ? 'border-indigo-400/50 bg-indigo-500/10 text-white' : 'border-white/10 text-white/55 hover:text-white'
                }`}
              >
                <Icon size={16} className={on ? 'text-indigo-300' : 'text-white/40'} />
                <span className="flex-1">{s.label}</span>
                <span className="font-mono text-xs text-white/40">${s.cost}</span>
                {on && <Check size={14} className="text-emerald-400" />}
              </button>
            )
          })}
        </div>

        {/* Diagram + metrics */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <svg viewBox="0 0 320 150" className="w-full">
              {/* user → CDN/LB → compute → db/storage */}
              {(() => {
                const has = (k: string) => active.includes(k)
                const nodes: { x: number; y: number; label: string; on: boolean; color: string }[] = [
                  { x: 24, y: 75, label: 'Users', on: true, color: '#A99FEF' },
                  { x: 104, y: 75, label: has('cdn') ? 'CDN' : has('lb') ? 'LB' : 'Edge', on: has('cdn') || has('lb'), color: '#5A4FE0' },
                  { x: 192, y: 75, label: 'Compute', on: has('compute'), color: '#5A4FE0' },
                  { x: 284, y: 40, label: 'DB', on: has('database'), color: '#13B97A' },
                  { x: 284, y: 112, label: 'Storage', on: has('storage'), color: '#F5A623' },
                ]
                const edges = [
                  [0, 1],
                  [1, 2],
                  [2, 3],
                  [2, 4],
                ]
                return (
                  <>
                    {edges.map(([a, b], i) => (
                      <line
                        key={i}
                        x1={nodes[a].x}
                        y1={nodes[a].y}
                        x2={nodes[b].x}
                        y2={nodes[b].y}
                        stroke={nodes[a].on && nodes[b].on ? '#5A4FE0' : 'rgba(255,255,255,0.12)'}
                        strokeWidth={1.5}
                        strokeDasharray={nodes[a].on && nodes[b].on ? '0' : '3 3'}
                      />
                    ))}
                    {nodes.map((n, i) => (
                      <g key={i} opacity={n.on ? 1 : 0.35}>
                        <rect x={n.x - 20} y={n.y - 14} width={40} height={28} rx={7} fill={n.on ? n.color : '#1A2138'} />
                        <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', monospace" fill={n.on ? '#0B0E1A' : '#8A96AE'} fontWeight="700">
                          {n.label}
                        </text>
                      </g>
                    ))}
                  </>
                )
              })()}
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Metric label="Monthly cost" value={`$${monthly}`} icon={Gauge} />
            <Metric label="Availability" value={`${availability}%`} />
            <Metric label="Services" value={String(active.length)} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon?: LucideIcon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="flex items-center gap-1 font-mono text-lg font-bold text-white">
        {Icon && <Icon size={13} className="text-indigo-300" />}
        {value}
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  )
}
