import { useEffect, useRef, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { Activity } from 'lucide-react'

const I = '#5A4FE0'
const E = '#13B97A'
const G = '#F5A623'

type Preset = {
  label: string
  unit: string
  series: string
  bars: { name: string; value: number }[]
  kpis: { label: string; value: string; accent: string }[]
}

// Per-demo flavor so each dashboard reads like that product's ops console.
const presets: Record<string, Preset> = {
  'credit-intelligence': {
    label: 'Decisioning throughput',
    unit: 'decisions/min',
    series: 'Approvals',
    bars: [
      { name: 'Low', value: 62 },
      { name: 'Med', value: 28 },
      { name: 'High', value: 10 },
    ],
    kpis: [
      { label: 'Approval rate', value: '74%', accent: E },
      { label: 'Avg decision', value: '1.2s', accent: I },
      { label: 'PAR > 30', value: '3.1%', accent: G },
    ],
  },
  'demand-forecasting-engine': {
    label: 'Forecast accuracy',
    unit: 'MAPE %',
    series: 'Accuracy',
    bars: [
      { name: 'Wk1', value: 88 },
      { name: 'Wk2', value: 91 },
      { name: 'Wk3', value: 84 },
      { name: 'Wk4', value: 94 },
    ],
    kpis: [
      { label: 'Forecast accuracy', value: '94%', accent: E },
      { label: 'SKUs modeled', value: '12k', accent: I },
      { label: 'Stockout risk', value: '-38%', accent: G },
    ],
  },
  'workforcecore-hr-app': {
    label: 'Onboarding flow',
    unit: 'tasks/hr',
    series: 'Completed',
    bars: [
      { name: 'Apply', value: 100 },
      { name: 'Verify', value: 82 },
      { name: 'Setup', value: 67 },
      { name: 'Active', value: 58 },
    ],
    kpis: [
      { label: 'Time-to-onboard', value: '-45%', accent: E },
      { label: 'Automation rate', value: '88%', accent: I },
      { label: 'Compliance', value: '100%', accent: G },
    ],
  },
  'perform-deliver': {
    label: 'Appraisal cycle',
    unit: 'reviews/day',
    series: 'Reviews',
    bars: [
      { name: 'Q1', value: 71 },
      { name: 'Q2', value: 80 },
      { name: 'Q3', value: 76 },
      { name: 'Q4', value: 90 },
    ],
    kpis: [
      { label: 'Goal alignment', value: '92%', accent: E },
      { label: 'Calibration', value: '4.5/5', accent: I },
      { label: 'On-time reviews', value: '96%', accent: G },
    ],
  },
  'buildstock-hommes': {
    label: 'Inventory turnover',
    unit: 'units/min',
    series: 'Throughput',
    bars: [
      { name: 'Wh-A', value: 84 },
      { name: 'Wh-B', value: 61 },
      { name: 'Wh-C', value: 73 },
    ],
    kpis: [
      { label: 'Fill rate', value: '97%', accent: E },
      { label: 'Reorder lead', value: '-30%', accent: I },
      { label: 'Dead stock', value: '2.4%', accent: G },
    ],
  },
}

const fallback: Preset = presets['credit-intelligence']

function seedSeries() {
  return Array.from({ length: 16 }, (_, i) => ({
    t: i,
    v: 40 + Math.round(Math.sin(i / 2) * 14 + Math.random() * 12),
  }))
}

/**
 * Live operations dashboard for a Build demo: a streaming area chart, a category
 * bar chart, and KPI tiles. The stream advances on an interval, paused under
 * reduced-motion.
 */
export function LiveDashboard({ slug }: { slug: string }) {
  const preset = presets[slug] ?? fallback
  const [data, setData] = useState(seedSeries)
  const counter = useRef(16)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1)
        const last = prev[prev.length - 1].v
        const v = Math.max(20, Math.min(98, last + Math.round((Math.random() - 0.5) * 22)))
        next.push({ t: counter.current++, v })
        return next
      })
    }, 1800)
    return () => clearInterval(id)
  }, [slug])

  const barMax = Math.max(...preset.bars.map((b) => b.value))

  return (
    <section className="rounded-3xl border border-white/10 bg-ink-950 p-6 text-white shadow-card md:p-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-300">Live operations</p>
          <h3 className="mt-1 text-xl font-semibold md:text-2xl">Real-time dashboard</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-emerald-300">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Streaming
        </span>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Streaming area chart */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Activity size={13} className="text-indigo-300" /> {preset.label}
            </span>
            <span className="font-mono">{preset.unit}</span>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={I} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={I} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="t" hide />
                <Tooltip
                  contentStyle={{
                    background: '#12172A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ display: 'none' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  name={preset.series}
                  stroke={I}
                  strokeWidth={2.5}
                  fill="url(#liveFill)"
                  isAnimationActive={false}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category bars */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-2 text-xs text-white/60">Distribution</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={preset.bars} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#12172A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {preset.bars.map((b, i) => (
                    <Cell key={b.name} fill={b.value === barMax ? G : i % 2 ? E : I} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {preset.kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-2xl font-bold" style={{ color: kpi.accent }}>
              {kpi.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">{kpi.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
