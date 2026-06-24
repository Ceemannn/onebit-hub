import { useRef, useState } from 'react'
import { ShieldCheck, ScanLine, AlertTriangle, Wrench } from 'lucide-react'

type Severity = 'Critical' | 'High' | 'Medium' | 'Low'
type Finding = { id: string; sev: Severity; title: string; fixed: boolean }

const SEV_COLOR: Record<Severity, string> = {
  Critical: '#E5484D',
  High: '#F5A623',
  Medium: '#5A4FE0',
  Low: '#13B97A',
}
const SEV_WEIGHT: Record<Severity, number> = { Critical: 28, High: 16, Medium: 8, Low: 3 }

const BASE: Omit<Finding, 'fixed'>[] = [
  { id: 'CVE-1', sev: 'Critical', title: 'Exposed admin port 22 to 0.0.0.0/0' },
  { id: 'CVE-2', sev: 'High', title: 'Outdated TLS 1.0 on load balancer' },
  { id: 'CVE-3', sev: 'High', title: 'S3 bucket world-readable' },
  { id: 'CVE-4', sev: 'Medium', title: 'Missing rate limiting on /login' },
  { id: 'CVE-5', sev: 'Medium', title: 'Verbose error stack traces in prod' },
  { id: 'CVE-6', sev: 'Low', title: 'Missing security headers (CSP)' },
]

/**
 * Cybersecurity-tailored lab: run a vulnerability scan, triage findings by
 * severity, and remediate them to watch the posture score climb — the
 * detect → prioritize → fix loop the course teaches.
 */
export function SecurityConsole() {
  const [findings, setFindings] = useState<Finding[]>([])
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const timer = useRef<number[]>([])

  const scan = () => {
    timer.current.forEach(clearTimeout)
    timer.current = []
    setScanning(true)
    setProgress(0)
    setFindings([])
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setProgress(100)
      setFindings(BASE.map((f) => ({ ...f, fixed: false })))
      setScanning(false)
      return
    }
    for (let i = 1; i <= 10; i++) {
      timer.current.push(window.setTimeout(() => setProgress(i * 10), i * 90))
    }
    BASE.forEach((f, i) => {
      timer.current.push(
        window.setTimeout(() => {
          setFindings((prev) => [...prev, { ...f, fixed: false }])
          if (i === BASE.length - 1) setScanning(false)
        }, 300 + i * 130),
      )
    })
  }

  const fix = (id: string) => setFindings((prev) => prev.map((f) => (f.id === id ? { ...f, fixed: true } : f)))
  const fixAll = () => setFindings((prev) => prev.map((f) => ({ ...f, fixed: true })))

  const openRisk = findings.filter((f) => !f.fixed).reduce((s, f) => s + SEV_WEIGHT[f.sev], 0)
  const maxRisk = BASE.reduce((s, f) => s + SEV_WEIGHT[f.sev], 0)
  const score = findings.length ? Math.round(100 - (openRisk / maxRisk) * 100) : 100
  const counts = (['Critical', 'High', 'Medium', 'Low'] as Severity[]).map((sev) => ({
    sev,
    n: findings.filter((f) => f.sev === sev && !f.fixed).length,
  }))

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Security operations</span>
        </div>
        <div className="flex gap-2">
          {findings.some((f) => !f.fixed) && (
            <button
              onClick={fixAll}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
            >
              <Wrench size={12} /> Remediate all
            </button>
          )}
          <button
            onClick={scan}
            disabled={scanning}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-60"
          >
            <ScanLine size={13} /> {scanning ? 'Scanning…' : 'Run scan'}
          </button>
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.4fr]">
        {/* Posture */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p
              className="font-mono text-5xl font-bold"
              style={{ color: score >= 90 ? '#13B97A' : score >= 60 ? '#F5A623' : '#E5484D' }}
            >
              {score}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Security posture</p>
          </div>
          {scanning && (
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {counts.map((c) => (
              <div key={c.sev} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                <p className="font-mono text-lg font-bold" style={{ color: SEV_COLOR[c.sev] }}>
                  {c.n}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/50">{c.sev}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-white/50">Findings</p>
          {findings.length === 0 && !scanning && (
            <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center text-sm text-white/40">
              <ScanLine size={22} className="mb-2 text-white/30" />
              Run a scan to surface vulnerabilities.
            </div>
          )}
          <div className="max-h-72 space-y-2 overflow-auto pr-1">
            {findings.map((f) => (
              <div
                key={f.id}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                  f.fixed ? 'border-emerald-500/30 bg-emerald-500/5 text-white/40' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <span
                  className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase"
                  style={{ background: `${SEV_COLOR[f.sev]}22`, color: SEV_COLOR[f.sev] }}
                >
                  {f.sev}
                </span>
                <span className={`flex-1 ${f.fixed ? 'line-through' : ''}`}>{f.title}</span>
                {f.fixed ? (
                  <span className="font-mono text-[11px] text-emerald-400">patched</span>
                ) : (
                  <button
                    onClick={() => fix(f.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[11px] font-medium transition hover:bg-white/20"
                  >
                    <Wrench size={11} /> Fix
                  </button>
                )}
              </div>
            ))}
          </div>
          {findings.length > 0 && !findings.some((f) => !f.fixed) && (
            <p className="flex items-center gap-1.5 pt-1 text-sm text-emerald-400">
              <ShieldCheck size={15} /> All findings remediated — posture 100.
            </p>
          )}
          {scanning && (
            <p className="flex items-center gap-1.5 text-sm text-white/50">
              <AlertTriangle size={14} className="text-gold-500" /> Scanning infrastructure…
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
