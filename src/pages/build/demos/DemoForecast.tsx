import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts'
import { Button } from '../../../components/ui/button.tsx'
import { useGsapReveal } from '../../../hooks/useGsapReveal.ts'
import { DemoPageLayout } from './DemoLayout.tsx'
import { demoProjects } from '../../../data/demos.ts'
import { buildForecastSeries } from '../../../lib/demoApi.ts'

const project = demoProjects.find((demo) => demo.slug === 'demand-forecasting-engine')!

export function DemoForecastPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })
  const [horizon, setHorizon] = useState(32)
  const [uplift, setUplift] = useState(8)
  const [showHistoric, setShowHistoric] = useState(true)

  const data = useMemo(() => buildForecastSeries(horizon, uplift), [horizon, uplift])

  const handleDownload = () => {
    const csvHeader = 'week,actual,forecast\n'
    const csvBody = data.map((point) => `${point.week},${point.actual},${point.forecast}`).join('\n')
    const blob = new Blob([csvHeader + csvBody], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'forecast-export.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <DemoPageLayout project={project} ref={ref}>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-6 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <header>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Scenario Builder</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Tune promotion uplift</h2>
          </header>
          <div className="space-y-5">
            <label className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span>Forecast horizon (weeks)</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{horizon}</span>
              </div>
              <input
                type="range"
                min={12}
                max={52}
                step={1}
                value={horizon}
                onChange={(event) => setHorizon(Number(event.target.value))}
                className="w-full accent-brand-primary"
              />
            </label>
            <label className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span>Promotion uplift (%)</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{uplift}%</span>
              </div>
              <input
                type="range"
                min={-5}
                max={25}
                step={1}
                value={uplift}
                onChange={(event) => setUplift(Number(event.target.value))}
                className="w-full accent-brand-primary"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowHistoric(true)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${showHistoric ? 'bg-brand-primary text-white' : 'bg-neutral-900/5 dark:bg-white/10'}`}
            >
              Show history
            </button>
            <button
              onClick={() => setShowHistoric(false)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${!showHistoric ? 'bg-brand-primary text-white' : 'bg-neutral-900/5 dark:bg-white/10'}`}
            >
              Forecast only
            </button>
            <Button variant="secondary" size="sm" onClick={handleDownload}>
              Download CSV
            </Button>
          </div>
          <div className="rounded-2xl border border-dashed border-brand-primary/30 bg-brand-primary/5 p-4 text-sm text-neutral-600 dark:text-neutral-200">
            <p>
              Lead time adjustments of <span className="font-semibold">+{uplift}%</span> will add {Math.round((horizon / 4) * uplift)} units to next-quarter demand. Use this to
              pre-build POs and logistics slots.
            </p>
          </div>
        </section>
        <section className="space-y-6 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Forecast viewer</p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Multi-horizon view</h2>
            </div>
          </header>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 16, left: -20, right: 12 }}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c63ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0c63ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                {showHistoric && (
                  <Area type="monotone" dataKey="actual" stroke="#0c63ff" strokeWidth={2} fillOpacity={1} fill="url(#actualGradient)" />
                )}
                <Area type="monotone" dataKey="forecast" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#forecastGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 0, left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="forecast" stroke="#06b6d4" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </DemoPageLayout>
  )
}
