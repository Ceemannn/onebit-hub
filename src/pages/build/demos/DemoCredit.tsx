import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useGsapReveal } from '../../../hooks/useGsapReveal.ts'
import { Gauge } from '../../../components/shared/Gauge.tsx'
import { DemoPageLayout } from './DemoLayout.tsx'
import { demoProjects } from '../../../data/demos.ts'
import { simulateCreditScore } from '../../../lib/demoApi.ts'

const sliders = [
  { key: 'monthlyRevenue', label: 'Monthly revenue (₦)', min: 100000, max: 5000000, step: 50000 },
  { key: 'avgOrderValue', label: 'Average order value (₦)', min: 50000, max: 500000, step: 5000 },
  { key: 'paymentHistory', label: 'Payment history score', min: 0, max: 100, step: 5 },
  { key: 'daysPastDue', label: 'Days past due', min: 0, max: 120, step: 5 },
  { key: 'returns', label: 'Returns %', min: 0, max: 35, step: 1 },
] as const

const project = demoProjects.find((demo) => demo.slug === 'tdafrica-credit-intelligence')!

type SliderKey = (typeof sliders)[number]['key']

export function DemoCreditPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })
  const [values, setValues] = useState<Record<SliderKey, number>>({
    monthlyRevenue: 1200000,
    avgOrderValue: 110000,
    paymentHistory: 78,
    daysPastDue: 12,
    returns: 4,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({
    score: 712,
    risk_band: 'Low',
    recommended_limit: 1200000,
    explain: [
      { feature: 'DaysPastDue', impact: -42 },
      { feature: 'AvgOrderValue', impact: 15 },
    ],
  })

  const explainPositive = useMemo(() => result.explain.filter((item) => item.impact >= 0), [result])
  const explainNegative = useMemo(() => result.explain.filter((item) => item.impact < 0), [result])

  const runSimulation = async (payload: Record<SliderKey, number>) => {
    setLoading(true)
    try {
      const response = await simulateCreditScore({
        monthlyRevenue: payload.monthlyRevenue,
        avgOrderValue: payload.avgOrderValue,
        paymentHistory: payload.paymentHistory,
        daysPastDue: payload.daysPastDue,
        returns: payload.returns,
      })
      setResult(response)
    } catch (error) {
      console.error('Credit score simulation failed', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (key: SliderKey, val: number) => {
    const next = { ...values, [key]: val }
    setValues(next)
    void runSimulation(next)
  }

  useEffect(() => {
    void runSimulation(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DemoPageLayout project={project} ref={ref}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Interactive Sandbox</p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Credit scoring tuner</h2>
            </div>
            {loading && <Loader2 className="animate-spin text-brand-primary" size={20} />}
          </header>
          <div className="grid gap-5">
            {sliders.map((slider) => (
              <label key={slider.key} className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500">
                  <span>{slider.label}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{values[slider.key].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={values[slider.key]}
                  onChange={(event) => handleChange(slider.key, Number(event.target.value))}
                  className="w-full accent-brand-primary"
                />
              </label>
            ))}
          </div>
        </section>
        <section className="space-y-6 rounded-3xl border border-brand-primary/20 bg-gradient-to-b from-brand-primary/90 to-brand-teal/80 p-8 text-white">
          <div className="flex flex-wrap items-center gap-4">
            <Gauge value={result.score} max={850} label="Credit Score" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Risk band</p>
              <span className="mt-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                {result.risk_band}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Recommended limit</p>
              <p className="mt-2 text-2xl font-semibold">₦{result.recommended_limit.toLocaleString()}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Positive drivers</p>
              <div className="mt-3 space-y-2">
                {explainPositive.map((item) => (
                  <div key={item.feature} className="rounded-2xl bg-white/10 p-3">
                    <p className="text-xs text-white/70">{item.feature}</p>
                    <div className="mt-2 h-2 rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-brand-teal"
                        style={{ width: `${Math.min(100, item.impact * 4)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Negative drivers</p>
              <div className="mt-3 space-y-2">
                {explainNegative.map((item) => (
                  <div key={item.feature} className="rounded-2xl bg-white/10 p-3">
                    <p className="text-xs text-white/70">{item.feature}</p>
                    <div className="mt-2 h-2 rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-brand-warm"
                        style={{ width: `${Math.min(100, Math.abs(item.impact) * 4)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </DemoPageLayout>
  )
}
