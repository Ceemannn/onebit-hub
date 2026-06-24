import { useMemo, useState } from 'react'
import { Play, Terminal as TerminalIcon, RotateCcw } from 'lucide-react'
import { runPython } from './pythonInterpreter.ts'

type Variant = 'python-programming' | 'python-for-data-science' | 'automation-with-python'

const STARTERS: Record<Variant, { title: string; code: string }> = {
  'python-programming': {
    title: 'main.py',
    code: `# Python basics — edit me and press Run
name = "Onebit"
skills = ["Python", "Data", "AI"]

for i in range(len(skills)):
    print(f"{i + 1}. {skills[i]}")

total = 0
for n in range(1, 6):
    total = total + n
print("Sum 1..5 =", total)
print("Welcome to " + name + "!")`,
  },
  'python-for-data-science': {
    title: 'analysis.py',
    code: `# Pandas-style aggregation (simulated)
revenue = [40, 49, 58, 67, 82, 91]
n = len(revenue)

total = 0
for i in range(n):
    total = total + revenue[i]

mean = total / n
peak = max(revenue)
growth = (revenue[n - 1] - revenue[0]) / revenue[0] * 100

print("rows:", n)
print("total:", total)
print("mean:", mean)
print("peak:", peak)
print(f"growth: {growth}%")`,
  },
  'automation-with-python': {
    title: 'automate.py',
    code: `# Batch-rename report files (simulated)
files = ["jan.csv", "feb.csv", "mar.csv"]
prefix = "2026_"

renamed = 0
for i in range(len(files)):
    print("rename " + files[i] + " -> " + prefix + files[i])
    renamed = renamed + 1

print("Done. Files processed:", renamed)`,
  },
}

/**
 * Python-tailored lab: an editable code editor with line numbers running a small
 * real interpreter (assignments, arithmetic, f-strings, range loops, lists,
 * print, len/max/min/sum) so edits actually execute.
 */
export function PythonRepl({ courseId }: { courseId: string }) {
  const variant = (courseId in STARTERS ? courseId : 'python-programming') as Variant
  const starter = STARTERS[variant]
  const [code, setCode] = useState(starter.code)
  const [output, setOutput] = useState<{ lines: string[]; error: boolean } | null>(null)

  const lineCount = useMemo(() => code.split('\n').length, [code])

  const run = () => {
    const result = runPython(code)
    setOutput(result)
  }

  const reset = () => {
    setCode(starter.code)
    setOutput(null)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5484D]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="ml-1 font-mono text-xs text-white/50">{starter.title}</span>
          <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 font-mono text-[10px] text-indigo-300">Python 3</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={run}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-gold-400"
          >
            <Play size={13} /> Run
          </button>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        {/* Editor */}
        <div className="relative flex border-b border-white/10 md:border-b-0 md:border-r">
          <div
            aria-hidden
            className="select-none border-r border-white/5 bg-white/[0.02] px-3 py-4 text-right font-mono text-xs leading-6 text-white/25"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-72 w-full resize-none bg-transparent px-4 py-4 font-mono text-xs leading-6 text-indigo-100 outline-none"
          />
        </div>

        {/* Console */}
        <div className="flex flex-col bg-black/40">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-wider text-white/40">
            <TerminalIcon size={12} /> Console
          </div>
          <div className="h-72 space-y-1 overflow-auto p-4 font-mono text-xs leading-6">
            {!output && <p className="text-white/30">Press Run to execute the script ▶</p>}
            {output?.lines.map((l, i) => (
              <div key={i} className={output.error ? 'text-[#ff9ea1]' : 'text-emerald-300'}>
                {l}
              </div>
            ))}
            {output && !output.error && <div className="text-white/30">[process finished — exit 0]</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
