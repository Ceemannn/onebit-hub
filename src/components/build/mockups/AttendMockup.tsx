import { QrCode, MapPin, Monitor, CalendarClock, Check } from 'lucide-react'
import { CountUp } from '../../shared/CountUp.tsx'

const TABS = [
  { label: 'QR Code', icon: QrCode, active: true },
  { label: 'Location', icon: MapPin },
  { label: 'Kiosk', icon: Monitor },
  { label: 'Recurring', icon: CalendarClock },
]

const ROSTER = [
  { name: 'Sarah Johnson', when: 'Just now', initial: 'S' },
  { name: 'Michael Chen', when: '2 min ago', initial: 'M' },
  { name: 'Emily Davis', when: '5 min ago', initial: 'E' },
]

/** In-browser preview of AttendOS — a live attendance dashboard. */
export function AttendMockup() {
  return (
    <div className="bg-[#fdf6f1] p-5 text-neutral-800">
      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-neutral-900">Live Dashboard</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-1 rounded-lg bg-neutral-100 p-1">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <span
                key={t.label}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium ${
                  t.active ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400'
                }`}
              >
                <Icon size={12} /> {t.label}
              </span>
            )
          })}
        </div>

        <p className="mt-3 text-sm font-semibold text-neutral-900">QR Code Check-in</p>
        <p className="text-[11px] text-neutral-400">Scan personal badges or session codes</p>

        {/* Stat trio */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg border border-neutral-100 p-3 text-center">
          <div>
            <p className="font-mono text-2xl font-bold text-emerald-600">
              <CountUp value="847" />
            </p>
            <p className="text-[10px] text-neutral-400">Present</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-amber-500">
              <CountUp value="23" />
            </p>
            <p className="text-[10px] text-neutral-400">Late</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-rose-500">
              <CountUp value="12" />
            </p>
            <p className="text-[10px] text-neutral-400">Absent</p>
          </div>
        </div>

        {/* Roster */}
        <div className="mt-3 space-y-2">
          {ROSTER.map((r) => (
            <div key={r.name} className="flex items-center justify-between rounded-lg bg-emerald-50/70 px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                  {r.initial}
                </span>
                <div>
                  <p className="text-xs font-medium text-neutral-900">{r.name}</p>
                  <p className="text-[10px] text-neutral-400">{r.when}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <Check size={12} /> Present
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
