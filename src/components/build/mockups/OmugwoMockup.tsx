import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Wallet,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CountUp } from '../../shared/CountUp.tsx'

const V = '#7C3AED'
const NAV: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Students', icon: Users },
  { label: 'Classes', icon: BookOpen },
  { label: 'Attendance', icon: CalendarCheck },
  { label: 'Results', icon: GraduationCap },
  { label: 'Fees', icon: Wallet },
]

const KPIS = [
  { label: 'Students', value: '482', icon: Users },
  { label: 'Classes', value: '18', icon: BookOpen },
  { label: 'Attendance', value: '94%', icon: CalendarCheck },
  { label: 'Fees collected', value: '86%', icon: Wallet },
]

const CLASSES = [
  { name: 'JSS 1 — Science', meta: '42 students' },
  { name: 'SS 2 — Commercial', meta: '38 students' },
  { name: 'Primary 5 — Gold', meta: '29 students' },
]

/** In-browser preview of the standalone schools admin portal (Omugwo-derived). */
export function OmugwoMockup() {
  return (
    <div className="flex bg-[#f7f7fb] text-neutral-800">
      {/* Sidebar */}
      <aside className="hidden w-36 shrink-0 border-r border-neutral-200 bg-white p-3 sm:block">
        <div className="mb-4 flex items-center gap-2 px-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg text-white" style={{ background: V }}>
            <GraduationCap size={13} />
          </span>
          <span className="text-sm font-bold text-neutral-900">Scholar</span>
        </div>
        <nav className="space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon
            return (
              <span
                key={n.label}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium"
                style={n.active ? { background: 'rgba(124,58,237,0.1)', color: V } : { color: '#64748B' }}
              >
                <Icon size={13} /> {n.label}
              </span>
            )
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-4">
        <p className="text-sm font-bold text-neutral-900">Dashboard overview</p>
        <p className="text-[11px] text-neutral-400">Welcome back — here's your school today.</p>

        {/* KPI cards */}
        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {KPIS.map((k) => {
            const Icon = k.icon
            return (
              <div key={k.label} className="rounded-xl border border-neutral-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <Icon size={13} />
                  </span>
                  <TrendingUp size={13} className="text-emerald-500" />
                </div>
                <p className="mt-2 font-mono text-lg font-bold text-neutral-900">
                  <CountUp value={k.value} />
                </p>
                <p className="text-[10px] text-neutral-400">{k.label}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {/* Recent activity */}
          <div className="rounded-xl border border-neutral-200 bg-white p-3">
            <p className="text-xs font-semibold text-neutral-900">Recent activity</p>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-neutral-50 px-2.5 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: 'rgba(124,58,237,0.12)', color: V }}>
                <BookOpen size={12} />
              </span>
              <div>
                <p className="text-[11px] text-neutral-700">
                  <span className="font-semibold">Chosen B.</span> enrolled in JSS 1
                </p>
                <p className="text-[9px] text-neutral-400">2 hours ago</p>
              </div>
            </div>
          </div>

          {/* Top classes */}
          <div className="rounded-xl border border-neutral-200 bg-white p-3">
            <p className="text-xs font-semibold text-neutral-900">Top classes</p>
            <div className="mt-2 space-y-1.5">
              {CLASSES.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <p className="text-[11px] text-neutral-700">{c.name}</p>
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
                    {c.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick action */}
        <button
          className="mt-3 w-full rounded-xl py-2.5 text-xs font-semibold text-white"
          style={{ background: `linear-gradient(90deg, ${V}, #5B21B6)` }}
        >
          Manage school site
        </button>
      </div>
    </div>
  )
}
