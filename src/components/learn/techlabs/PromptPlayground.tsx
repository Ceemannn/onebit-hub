import { useRef, useState } from 'react'
import { Sparkles, Bot, User } from 'lucide-react'

type Technique = 'zero-shot' | 'few-shot' | 'chain-of-thought'

const PRESETS = [
  'Summarize our Q1 sales report for executives.',
  'Classify this review sentiment: "Delivery was late but support fixed it fast."',
  'Write a product description for a solar inverter.',
]

const RESPONSES: Record<Technique, (temp: number) => string> = {
  'zero-shot': () =>
    'Q1 revenue rose 18% QoQ, led by AI and Analytics in Lagos. Margins held at 34%. Watch: pending receivables in Abuja.',
  'few-shot': () =>
    'Label: NEGATIVE→NEUTRAL. Rationale: complaint (late delivery) offset by positive resolution (fast support). Confidence: 0.82.',
  'chain-of-thought': (temp) =>
    `Let's reason step by step:\n1) Identify the core benefit (reliable backup power).\n2) Name the audience (homes + small businesses).\n3) Lead with outcome, then specs.\n\nDraft: "Keep the lights on, always. The Onebit solar inverter delivers clean, automatic backup power${
      temp > 0.7 ? ' — quietly brilliant, endlessly dependable' : ''
    }."`,
}

/**
 * AI/prompt-engineering-tailored lab: a prompt console where the technique and
 * temperature visibly change the model's (simulated) response — the exact levers
 * the course teaches. Output streams token-by-token.
 */
export function PromptPlayground() {
  const [prompt, setPrompt] = useState(PRESETS[0])
  const [technique, setTechnique] = useState<Technique>('zero-shot')
  const [temp, setTemp] = useState(0.4)
  const [streamed, setStreamed] = useState('')
  const [busy, setBusy] = useState(false)
  const timer = useRef<number[]>([])

  const generate = () => {
    timer.current.forEach(clearTimeout)
    timer.current = []
    const full = RESPONSES[technique](temp)
    setStreamed('')
    setBusy(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStreamed(full)
      setBusy(false)
      return
    }
    full.split('').forEach((_, i) => {
      timer.current.push(
        window.setTimeout(() => {
          setStreamed(full.slice(0, i + 1))
          if (i === full.length - 1) setBusy(false)
        }, 12 * i),
      )
    })
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-indigo-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Prompt playground</span>
        </div>
        <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/60">model: onebit-sim</span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr]">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <p className="mb-1.5 text-xs uppercase tracking-wider text-white/50">Prompt</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-24 w-full resize-none rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none focus:border-indigo-400"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(p)}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/60 transition hover:text-white"
                >
                  preset {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs uppercase tracking-wider text-white/50">Technique</p>
            <div className="flex flex-wrap gap-1.5">
              {(['zero-shot', 'few-shot', 'chain-of-thought'] as Technique[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTechnique(t)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    technique === t ? 'border-transparent bg-indigo-500 text-white' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-1.5">
            <span className="flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
              <span>Temperature</span>
              <span className="font-mono text-white">{temp.toFixed(1)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <span className="text-[11px] text-white/40">{temp < 0.4 ? 'precise & deterministic' : temp < 0.8 ? 'balanced' : 'creative & varied'}</span>
          </label>

          <button
            onClick={generate}
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-60"
          >
            <Sparkles size={14} /> {busy ? 'Generating…' : 'Generate'}
          </button>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/70">
            <User size={14} className="shrink-0 text-indigo-300" />
            <span className="line-clamp-2">{prompt}</span>
          </div>
          <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/40">
              <Bot size={12} /> Response · {technique}
            </div>
            <p className="min-h-[160px] whitespace-pre-wrap text-sm leading-relaxed text-emerald-100">
              {streamed || <span className="text-white/30">Hit Generate to see how technique + temperature shape the output.</span>}
              {busy && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-indigo-300 align-middle" />}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
