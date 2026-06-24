import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Database, Filter, Play } from 'lucide-react'
import { useToast } from '../shared/Toast.tsx'
import { CountUp } from '../shared/CountUp.tsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

type MetricKey = 'revenue' | 'users' | 'churn'
const METRICS: Record<MetricKey, { label: string; color: string; unit: string }> = {
  revenue: { label: 'Revenue', color: '#5A4FE0', unit: '₦m' },
  users: { label: 'Active users', color: '#13B97A', unit: 'k' },
  churn: { label: 'Churn', color: '#F5A623', unit: '%' },
}

const REGIONS = ['All', 'Lagos', 'Abuja', 'Nairobi'] as const
type Region = (typeof REGIONS)[number]

// A tiny synthetic dataset keyed by region.
const DATA: Record<Region, { month: string; revenue: number; users: number; churn: number }[]> = {
  All: MONTHS.map((m, i) => ({ month: m, revenue: 40 + i * 9 + (i % 2 ? 6 : 0), users: 12 + i * 3, churn: 9 - i * 0.6 })),
  Lagos: MONTHS.map((m, i) => ({ month: m, revenue: 22 + i * 6, users: 6 + i * 1.8, churn: 8 - i * 0.5 })),
  Abuja: MONTHS.map((m, i) => ({ month: m, revenue: 12 + i * 2.5, users: 4 + i * 0.9, churn: 7 - i * 0.4 })),
  Nairobi: MONTHS.map((m, i) => ({ month: m, revenue: 8 + i * 2, users: 3 + i * 0.7, churn: 10 - i * 0.7 })),
}

type ChartKind = 'area' | 'bar' | 'line'

/**
 * Data-tailored interactive: a mini analytics workbench. Pick a metric, region
 * and chart type and the visualization + KPIs recompute live — the EDA loop the
 * Tech & Data track teaches.
 */
export function DataLab() {
  const { toast } = useToast()
  const [metric, setMetric] = useState<MetricKey>('revenue')
  const [region, setRegion] = useState<Region>('All')
  const [kind, setKind] = useState<ChartKind>('area')

  const rows = DATA[region]
  const meta = METRICS[metric]

  const { total, avg, peak, growth } = useMemo(() => {
    const vals = rows.map((r) => r[metric])
    const sum = vals.reduce((a, b) => a + b, 0)
    const first = vals[0] || 1
    const last = vals[vals.length - 1]
    return {
      total: sum,
      avg: sum / vals.length,
      peak: Math.max(...vals),
      growth: Math.round(((last - first) / first) * 100),
    }
  }, [rows, metric])

  const chartData = rows.map((r) => ({ month: r.month, value: Number(r[metric].toFixed(1)) }))
  const peakMonth = chartData.reduce((a, b) => (b.value > a.value ? b : a), chartData[0])

  const tooltipStyle = {
    background: '#12172A',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    fontSize: 12,
    color: '#fff',
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Database size={18} className="text-indigo-300" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Analytics workbench</p>
        </div>
        <button
          onClick={() =>
            toast({
              variant: 'success',
              title: 'Query run',
              description: `${meta.label} · ${region} · peak in ${peakMonth.month} (${peakMonth.value}${meta.unit})`,
            })
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/40 hover:text-white"
        >
          <Play size={13} /> Run query
        </button>
      </div>

      <div className="space-y-5 p-6">
        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-3">
          <Control label="Metric">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(METRICS) as MetricKey[]).map((k) => (
                <Chip key={k} active={metric === k} onClick={() => setMetric(k)} color={METRICS[k].color}>
                  {METRICS[k].label}
                </Chip>
              ))}
            </div>
          </Control>
          <Control label="Region" icon>
            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map((r) => (
                <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                  {r}
                </Chip>
              ))}
            </div>
          </Control>
          <Control label="Chart">
            <div className="flex flex-wrap gap-1.5">
              {(['area', 'bar', 'line'] as ChartKind[]).map((k) => (
                <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
                  {k}
                </Chip>
              ))}
            </div>
          </Control>
        </div>

        {/* Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
            <span>
              {meta.label} · {region}
            </span>
            <span className="font-mono">{meta.unit}</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              {kind === 'area' ? (
                <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                  <defs>
                    <linearGradient id="dataFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={meta.color} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={meta.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} width={36} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} />
                  <Area type="monotone" dataKey="value" stroke={meta.color} strokeWidth={2.5} fill="url(#dataFill)" />
                </AreaChart>
              ) : kind === 'bar' ? (
                <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} width={36} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                    {chartData.map((d) => (
                      <Cell key={d.month} fill={d.value === peakMonth.value ? '#F5A623' : meta.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} width={36} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} />
                  <Line type="monotone" dataKey="value" stroke={meta.color} strokeWidth={2.5} dot={{ r: 3, fill: meta.color }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPIs recompute on selection */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Kpi label="Total" value={`${total.toFixed(0)}${meta.unit}`} />
          <Kpi label="Average" value={`${avg.toFixed(1)}${meta.unit}`} />
          <Kpi label="Peak" value={`${peak.toFixed(1)}${meta.unit}`} />
          <Kpi label="Growth" value={`${growth > 0 ? '+' : ''}${growth}%`} color={growth >= 0 ? '#13B97A' : '#E5484D'} />
        </div>
      </div>
    </div>
  )
}

function Control({ label, children, icon }: { label: string; children: React.ReactNode; icon?: boolean }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/50">
        {icon && <Filter size={12} />} {label}
      </p>
      {children}
    </div>
  )
}

function Chip({
  children,
  active,
  onClick,
  color = '#5A4FE0',
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
        active ? 'border-transparent text-ink-950' : 'border-white/15 text-white/70 hover:text-white'
      }`}
      style={active ? { background: color } : undefined}
    >
      {children}
    </button>
  )
}

function Kpi({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="font-mono text-lg font-bold" style={{ color: color ?? '#fff' }}>
        <CountUp value={value} duration={900} />
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  )
}
