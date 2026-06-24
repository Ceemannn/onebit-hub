import { useCallback, useEffect, useRef, useState } from 'react'
import { Terminal, Play, CheckCircle2, Loader2, Circle, GitBranch } from 'lucide-react'
import { useToast } from '../shared/Toast.tsx'

type Script = { prompt: string; lines: { text: string; tone?: 'ok' | 'muted' | 'accent' }[]; stages: string[] }

const SCRIPTS: Record<string, Script> = {
  default: {
    prompt: 'onebit@learn:~/project$',
    lines: [
      { text: 'npm run test', tone: 'accent' },
      { text: '› onebit-app@1.0.0 test', tone: 'muted' },
      { text: '✓ renders without crashing (12ms)', tone: 'ok' },
      { text: '✓ handles user input (8ms)', tone: 'ok' },
      { text: '✓ calls API on submit (21ms)', tone: 'ok' },
      { text: 'Test Suites: 3 passed, 3 total', tone: 'ok' },
      { text: 'Tests:       18 passed, 18 total', tone: 'ok' },
    ],
    stages: ['Install', 'Lint', 'Test', 'Build', 'Deploy'],
  },
  'frontend-development': {
    prompt: 'onebit@learn:~/web-app$',
    lines: [
      { text: 'npm run build', tone: 'accent' },
      { text: 'vite v7.2.2 building for production…', tone: 'muted' },
      { text: '✓ 142 modules transformed', tone: 'ok' },
      { text: 'dist/assets/index.js   84.2 kB │ gzip: 27.1 kB', tone: 'muted' },
      { text: '✓ built in 1.92s', tone: 'ok' },
      { text: 'Lighthouse: Performance 98 · A11y 100', tone: 'ok' },
    ],
    stages: ['Install', 'Lint', 'Test', 'Bundle', 'Deploy'],
  },
  'backend-development': {
    prompt: 'onebit@learn:~/api$',
    lines: [
      { text: 'npm run start:dev', tone: 'accent' },
      { text: '[Nest] Starting Nest application…', tone: 'muted' },
      { text: '✓ AppModule dependencies initialized', tone: 'ok' },
      { text: '✓ Routes mapped: /auth /users /orders', tone: 'ok' },
      { text: 'GET /health 200 · 4ms', tone: 'muted' },
      { text: 'Server listening on :3000', tone: 'ok' },
    ],
    stages: ['Install', 'Migrate', 'Test', 'Build', 'Deploy'],
  },
  'api-development': {
    prompt: 'onebit@learn:~/api$',
    lines: [
      { text: 'curl -X POST /v1/score -d @payload.json', tone: 'accent' },
      { text: '< HTTP/1.1 200 OK', tone: 'ok' },
      { text: '< content-type: application/json', tone: 'muted' },
      { text: '{ "score": 712, "band": "low", "ms": 42 }', tone: 'ok' },
      { text: '✓ contract tests passed (OpenAPI)', tone: 'ok' },
    ],
    stages: ['Install', 'Contract', 'Test', 'Build', 'Publish'],
  },
  'devops-foundations': {
    prompt: 'onebit@learn:~/infra$',
    lines: [
      { text: 'terraform apply -auto-approve', tone: 'accent' },
      { text: 'Plan: 6 to add, 0 to change, 0 to destroy.', tone: 'muted' },
      { text: '✓ aws_ecs_service.api: Creation complete', tone: 'ok' },
      { text: '✓ aws_alb.web: Creation complete', tone: 'ok' },
      { text: 'Apply complete! Resources: 6 added.', tone: 'ok' },
    ],
    stages: ['Init', 'Plan', 'Apply', 'Smoke test', 'Promote'],
  },
}

const tones = {
  ok: 'text-emerald-400',
  muted: 'text-white/45',
  accent: 'text-indigo-300',
}

/**
 * Software-engineering-tailored interactive: a faux terminal that streams build
 * output line by line, plus a CI/CD pipeline that runs stage by stage. "Run
 * pipeline" replays it and toasts a green build.
 */
export function CodeLab({ courseId }: { courseId: string }) {
  const { toast } = useToast()
  const script = SCRIPTS[courseId] ?? SCRIPTS.default
  const [visibleLines, setVisibleLines] = useState(0)
  const [stage, setStage] = useState(0) // index of currently running stage
  const [running, setRunning] = useState(false)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
  }

  const run = useCallback(() => {
    clearTimers()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setRunning(true)
    setVisibleLines(0)
    setStage(0)

    if (reduce) {
      setVisibleLines(script.lines.length)
      setStage(script.stages.length)
      setRunning(false)
      return
    }

    script.lines.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setVisibleLines(i + 1), 350 * (i + 1)),
      )
    })
    const afterLines = 350 * (script.lines.length + 1)
    script.stages.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStage(i + 1), afterLines + 420 * i))
    })
    timers.current.push(
      window.setTimeout(() => {
        setRunning(false)
        toast({ variant: 'success', title: 'Pipeline green', description: 'All stages passed — deploy complete.' })
      }, afterLines + 420 * script.stages.length),
    )
  }, [script, toast])

  useEffect(() => {
    run()
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-indigo-300" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Dev environment</p>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/40 hover:text-white disabled:opacity-50"
        >
          {running ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />} Run pipeline
        </button>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Terminal */}
        <div className="rounded-2xl border border-white/10 bg-black/50 font-mono text-[13px]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5484D]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[11px] text-white/40">bash — onebit</span>
          </div>
          <div className="min-h-[220px] space-y-1.5 p-4">
            {script.lines.slice(0, visibleLines).map((l, i) => (
              <div key={i} className={tones[l.tone ?? 'muted']}>
                {i === 0 && <span className="mr-2 text-white/40">{script.prompt}</span>}
                {l.text}
              </div>
            ))}
            {running && visibleLines < script.lines.length && (
              <span className="inline-block h-3.5 w-2 animate-pulse bg-indigo-300 align-middle" />
            )}
          </div>
        </div>

        {/* Pipeline */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-4 flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/50">
            <GitBranch size={13} /> CI / CD pipeline
          </p>
          <ol className="space-y-3">
            {script.stages.map((s, i) => {
              const status = i < stage ? 'done' : i === stage && running ? 'running' : 'pending'
              return (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    {status === 'done' ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : status === 'running' ? (
                      <Loader2 size={16} className="animate-spin text-indigo-300" />
                    ) : (
                      <Circle size={14} className="text-white/25" />
                    )}
                  </span>
                  <span className={`text-sm ${status === 'pending' ? 'text-white/40' : 'text-white'}`}>{s}</span>
                  {status === 'done' && <span className="ml-auto font-mono text-[11px] text-emerald-400/80">passed</span>}
                  {status === 'running' && <span className="ml-auto font-mono text-[11px] text-indigo-300/80">running…</span>}
                </li>
              )
            })}
          </ol>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-gold-500 transition-all duration-500"
              style={{ width: `${(stage / script.stages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
