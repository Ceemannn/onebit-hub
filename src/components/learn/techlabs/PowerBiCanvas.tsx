import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Filter, LayoutDashboard, RefreshCcw, Table2 } from 'lucide-react'

type Row = { region: string; product: string; amount: number; month: string }

const DATA: Row[] = [
  { region: 'Lagos', product: 'Analytics', amount: 240, month: 'Jan' },
  { region: 'Abuja', product: 'ERP', amount: 180, month: 'Jan' },
  { region: 'Lagos', product: 'AI', amount: 320, month: 'Feb' },
  { region: 'Nairobi', product: 'Analytics', amount: 150, month: 'Feb' },
  { region: 'Abuja', product: 'AI', amount: 410, month: 'Mar' },
  { region: 'Lagos', product: 'ERP', amount: 190, month: 'Mar' },
  { region: 'Nairobi', product: 'AI', amount: 260, month: 'Apr' },
  { region: 'Abuja', product: 'Analytics', amount: 200, month: 'Apr' },
]

const REGIONS = ['Lagos', 'Abuja', 'Nairobi']
const REGION_COLORS: Record<string, string> = { Lagos: '#5A4FE0', Abuja: '#13B97A', Nairobi: '#F5A623' }
const FIELDS = ['region', 'product', 'amount', 'month']

/**
 * Power BI-tailored lab: a mini report canvas. The region slicer and donut
 * cross-filter every visual — the core "interact to explore" Power BI workflow.
 */
export function PowerBiCanvas() {
  const [region, setRegion] = useState<string | null>(null)

  const filtered = useMemo(() => (region ? DATA.filter((d) => d.region === region) : DATA), [region])

  const total = filtered.reduce((s, d) => s + d.amount, 0)
  const orders = filtered.length
  const avg = orders ? Math.round(total / orders) : 0

  const byProduct = useMemo(() => {
    const map: Record<string, number> = {}
    filtered.forEach((d) => (map[d.product] = (map[d.product] || 0) + d.amount))
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [filtered])

  const byRegion = useMemo(() => {
    const map: Record<string, number> = {}
    DATA.forEach((d) => (map[d.region] = (map[d.region] || 0) + d.amount))
    return REGIONS.map((r) => ({ name: r, value: map[r] || 0 }))
  }, [])

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-[#f3f3f2] text-neutral-800 shadow-card dark:border-white/10">
      {/* Ribbon */}
      <div className="flex items-center justify-between border-b border-neutral-300/70 bg-[#f9c80e]/90 px-4 py-2">
        <div className="flex items-center gap-2 text-[#3b3b3b]">
          <LayoutDashboard size={15} />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">Power BI · Sales report</span>
        </div>
        {region && (
          <button
            onClick={() => setRegion(null)}
            className="inline-flex items-center gap-1.5 rounded-md bg-black/10 px-2 py-1 text-[11px] font-medium text-[#3b3b3b] transition hover:bg-black/20"
          >
            <RefreshCcw size={11} /> Clear filter
          </button>
        )}
      </div>

      <div className="grid gap-3 p-3 lg:grid-cols-[150px_1fr]">
        {/* Fields pane */}
        <aside className="hidden rounded-xl border border-neutral-300/60 bg-white p-3 lg:block">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            <Table2 size={12} /> Fields
          </p>
          <p className="mb-1 text-xs font-semibold text-neutral-700">sales</p>
          <ul className="space-y-1">
            {FIELDS.map((f) => (
              <li key={f} className="flex items-center gap-2 rounded px-1.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100">
                <input type="checkbox" defaultChecked readOnly className="accent-[#f2c811]" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            <Filter size={12} /> Slicer · region
          </p>
          <div className="space-y-1">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(region === r ? null : r)}
                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                  region === r ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: REGION_COLORS[r] }} />
                {r}
              </button>
            ))}
          </div>
        </aside>

        {/* Report canvas */}
        <div className="space-y-3">
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3">
            <Kpi label="Total sales" value={`₦${total}m`} />
            <Kpi label="Orders" value={String(orders)} />
            <Kpi label="Avg deal" value={`₦${avg}m`} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {/* Bar by product */}
            <Visual title={`Sales by product${region ? ` · ${region}` : ''}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byProduct} margin={{ top: 6, right: 6, bottom: 0, left: -22 }}>
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} stroke="#888" />
                  <YAxis fontSize={9} tickLine={false} axisLine={false} stroke="#aaa" width={34} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} contentStyle={tooltip} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {byProduct.map((d) => (
                      <Cell key={d.name} fill="#5A4FE0" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Visual>

            {/* Donut by region — clickable cross-filter */}
            <Visual title="Sales by region (click to filter)">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={tooltip} />
                  <Pie
                    data={byRegion}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={34}
                    outerRadius={58}
                    paddingAngle={3}
                    onClick={(d: { name?: string }) => d?.name && setRegion(region === d.name ? null : d.name)}
                  >
                    {byRegion.map((d) => (
                      <Cell
                        key={d.name}
                        fill={REGION_COLORS[d.name]}
                        opacity={region && region !== d.name ? 0.3 : 1}
                        className="cursor-pointer outline-none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Visual>
          </div>
        </div>
      </div>
    </div>
  )
}

const tooltip = { background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 12, color: '#333' }

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-300/60 bg-white p-3">
      <p className="font-mono text-xl font-bold text-neutral-900">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-neutral-500">{label}</p>
    </div>
  )
}

function Visual({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-300/60 bg-white p-3">
      <p className="mb-1 text-xs font-semibold text-neutral-700">{title}</p>
      <div className="h-40">{children}</div>
    </div>
  )
}
