import { useRef, useState } from 'react'
import { Play, Database, Filter, Shuffle, Sigma, Warehouse, CheckCircle2, Loader2, Circle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Stage = { key: string; label: string; icon: LucideIcon; throughput: string }

const STAGES: Stage[] = [
  { key: 'ingest', label: 'Ingest (Kafka)', icon: Database, throughput: '1.2M rec/s' },
  { key: 'clean', label: 'Clean & validate', icon: Filter, throughput: '980k rec/s' },
  { key: 'transform', label: 'Transform (Spark)', icon: Shuffle, throughput: '760k rec/s' },
  { key: 'aggregate', label: 'Aggregate', icon: Sigma, throughput: '540k rec/s' },
  { key: 'warehouse', label: 'Load → Warehouse', icon: Warehouse, throughput: '310k rec/s' },
]

const TOTAL = 5_000_000

/**
 * Big-data-tailored lab: a streaming ETL DAG. Run a batch and watch records flow
 * stage by stage with live throughput — the pipeline-thinking the course builds.
 */
export function PipelineBuilder() {
  const [stage, setStage] = useState(-1)
  const [processed, setProcessed] = useState(0)
  const [running, setRunning] = useState(false)
  const timers = useRef<number[]>([])

  const run = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRunning(true)
    setStage(0)
    setProcessed(0)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setStage(STAGES.length)
      setProcessed(TOTAL)
      setRunning(false)
      return
    }

    // Count records up across the whole run.
    for (let i = 1; i <= 40; i++) {
      timers.current.push(window.setTimeout(() => setProcessed(Math.round((TOTAL / 40) * i)), i * 60))
    }
    STAGES.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStage(i + 1), 500 * (i + 1)))
    })
    timers.current.push(window.setTimeout(() => setRunning(false), 500 * STAGES.length + 200))
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Shuffle size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Data pipeline · ETL DAG</span>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-60"
        >
          <Play size={13} /> {running ? 'Running…' : 'Run batch'}
        </button>
      </div>

      <div className="space-y-5 p-5">
        {/* DAG */}
        <div className="flex items-stretch gap-1.5 overflow-x-auto pb-1">
          {STAGES.map((s, i) => {
            const status = i < stage ? 'done' : i === stage && running ? 'running' : 'pending'
            const Icon = s.icon
            return (
              <div key={s.key} className="flex items-center gap-1.5">
                <div
                  className={`min-w-[124px] rounded-2xl border p-3 transition ${
                    status === 'done'
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : status === 'running'
                        ? 'border-indigo-400/50 bg-indigo-500/10'
                        : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={16} className={status === 'pending' ? 'text-white/40' : 'text-indigo-300'} />
                    {status === 'done' ? (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    ) : status === 'running' ? (
                      <Loader2 size={14} className="animate-spin text-indigo-300" />
                    ) : (
                      <Circle size={12} className="text-white/25" />
                    )}
                  </div>
                  <p className="mt-2 text-xs font-medium">{s.label}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-white/40">{status === 'pending' ? '—' : s.throughput}</p>
                </div>
                {i < STAGES.length - 1 && (
                  <span className={`h-px w-4 ${i < stage ? 'bg-indigo-400' : 'bg-white/15'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <Metric label="Records processed" value={processed.toLocaleString()} />
          <Metric label="Stages complete" value={`${Math.min(stage, STAGES.length)} / ${STAGES.length}`} />
          <Metric
            label="Status"
            value={running ? 'Streaming' : stage >= STAGES.length ? 'Complete' : 'Idle'}
            color={running ? '#F5A623' : stage >= STAGES.length ? '#13B97A' : '#8A96AE'}
          />
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-gold-500 transition-all duration-300"
            style={{ width: `${(Math.min(stage, STAGES.length) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="font-mono text-lg font-bold" style={{ color: color ?? '#fff' }}>
        {value}
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  )
}
