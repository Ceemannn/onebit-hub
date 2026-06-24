import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw, LineChart } from 'lucide-react'
import { useToast } from '../shared/Toast.tsx'

type Candle = { o: number; h: number; l: number; c: number }

const W = 560
const H = 280
const PAD = { top: 16, right: 64, bottom: 16, left: 8 }

function genCandles(n = 30, base = 1000): Candle[] {
  const out: Candle[] = []
  let price = base
  for (let i = 0; i < n; i++) {
    const open = price
    const drift = (Math.random() - 0.47) * base * 0.022
    const close = Math.max(base * 0.55, open + drift)
    const high = Math.max(open, close) + Math.random() * base * 0.012
    const low = Math.min(open, close) - Math.random() * base * 0.012
    out.push({ o: open, h: high, l: low, c: close })
    price = close
  }
  return out
}

const fmt = (p: number) => p.toFixed(2)

/**
 * Trading-tailored interactive: a candlestick market with draggable entry /
 * stop / target levels, a live risk:reward + position calculator, and a paper
 * "place trade" action. Regenerate to get a fresh market.
 */
export function TradingPlayground({ instrument = 'EUR/USD' }: { instrument?: string }) {
  const { toast } = useToast()
  const [candles, setCandles] = useState(() => genCandles())
  const [direction, setDirection] = useState<'long' | 'short'>('long')

  const { min, max } = useMemo(() => {
    const lows = candles.map((c) => c.l)
    const highs = candles.map((c) => c.h)
    const lo = Math.min(...lows)
    const hi = Math.max(...highs)
    const pad = (hi - lo) * 0.08
    return { min: lo - pad, max: hi + pad }
  }, [candles])

  const range = max - min
  const last = candles[candles.length - 1].c

  // Level state as fractions of the price range (kept valid across regenerations).
  const [entryF, setEntryF] = useState(0.5)
  const [slF, setSlF] = useState(0.3)
  const [tpF, setTpF] = useState(0.8)
  const [riskAmt, setRiskAmt] = useState(100)

  const toPrice = (f: number) => min + f * range
  const entry = toPrice(entryF)
  const sl = toPrice(slF)
  const tp = toPrice(tpF)

  const risk = Math.abs(entry - sl)
  const reward = Math.abs(tp - entry)
  const rr = risk > 0 ? reward / risk : 0

  // Direction validity: long wants SL below & TP above entry; short the reverse.
  const valid = direction === 'long' ? sl < entry && tp > entry : sl > entry && tp < entry

  const plotH = H - PAD.top - PAD.bottom
  const plotW = W - PAD.left - PAD.right
  const y = (p: number) => PAD.top + ((max - p) / range) * plotH
  const cw = plotW / candles.length

  const regen = () => {
    setCandles(genCandles())
    setEntryF(0.5)
    setSlF(0.3)
    setTpF(0.8)
  }

  const placeTrade = () => {
    if (!valid) {
      toast({
        variant: 'warning',
        title: 'Invalid setup',
        description:
          direction === 'long'
            ? 'For a long, place the stop below and the target above entry.'
            : 'For a short, place the stop above and the target below entry.',
      })
      return
    }
    toast({
      variant: 'success',
      title: `Paper ${direction} placed on ${instrument}`,
      description: `Entry ${fmt(entry)} · R:R 1:${rr.toFixed(2)} · risking $${riskAmt} to make $${Math.round(
        riskAmt * rr,
      )}`,
    })
  }

  const levelLine = (price: number, color: string, label: string) => (
    <g>
      <line
        x1={PAD.left}
        x2={PAD.left + plotW}
        y1={y(price)}
        y2={y(price)}
        stroke={color}
        strokeWidth={1.4}
        strokeDasharray="5 4"
      />
      <rect x={PAD.left + plotW} y={y(price) - 9} width={PAD.right} height={18} rx={4} fill={color} />
      <text x={PAD.left + plotW + PAD.right / 2} y={y(price) + 4} textAnchor="middle" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="#0B0E1A" fontWeight="700">
        {label}
      </text>
    </g>
  )

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <LineChart size={18} className="text-indigo-300" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Trade simulator</p>
          <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs">{instrument}</span>
        </div>
        <button
          onClick={regen}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/40 hover:text-white"
        >
          <RefreshCw size={13} /> New market
        </button>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1={PAD.left} x2={PAD.left + plotW} y1={PAD.top + g * plotH} y2={PAD.top + g * plotH} stroke="rgba(255,255,255,0.05)" />
            ))}
            {candles.map((c, i) => {
              const up = c.c >= c.o
              const color = up ? '#13B97A' : '#E5484D'
              const cx = PAD.left + i * cw + cw / 2
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: i * 0.012, duration: 0.3 }}
                  style={{ transformOrigin: `${cx}px ${y((c.h + c.l) / 2)}px` }}
                >
                  <line x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1} />
                  <rect
                    x={cx - cw * 0.3}
                    y={y(Math.max(c.o, c.c))}
                    width={cw * 0.6}
                    height={Math.max(1, Math.abs(y(c.o) - y(c.c)))}
                    fill={color}
                    rx={1}
                  />
                </motion.g>
              )
            })}
            {levelLine(tp, '#13B97A', 'TP')}
            {levelLine(entry, '#A99FEF', 'ENTRY')}
            {levelLine(sl, '#E5484D', 'SL')}
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDirection('long')}
              className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition ${
                direction === 'long'
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                  : 'border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <TrendingUp size={15} /> Long
            </button>
            <button
              onClick={() => setDirection('short')}
              className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition ${
                direction === 'short'
                  ? 'border-[#E5484D] bg-[#E5484D]/15 text-[#ff9ea1]'
                  : 'border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <TrendingDown size={15} /> Short
            </button>
          </div>

          <Level label="Entry" value={entry} color="#A99FEF" f={entryF} onChange={setEntryF} />
          <Level label="Stop loss" value={sl} color="#E5484D" f={slF} onChange={setSlF} />
          <Level label="Take profit" value={tp} color="#13B97A" f={tpF} onChange={setTpF} />

          <label className="block space-y-1.5">
            <span className="flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
              <span>Risk amount</span>
              <span className="font-mono text-white">${riskAmt}</span>
            </span>
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={riskAmt}
              onChange={(e) => setRiskAmt(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </label>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <Stat label="R:R" value={`1:${rr.toFixed(2)}`} good={rr >= 2} />
            <Stat label="Reward" value={`$${Math.round(riskAmt * rr)}`} color="#13B97A" />
            <Stat label="Risk" value={`$${riskAmt}`} color="#E5484D" />
          </div>

          <button
            onClick={placeTrade}
            className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
              valid
                ? 'bg-gold-500 text-ink-950 hover:bg-gold-400'
                : 'cursor-not-allowed bg-white/10 text-white/50'
            }`}
          >
            {valid ? `Place paper ${direction}` : 'Adjust levels to place trade'}
          </button>
          <p className="text-center text-[11px] text-white/40">
            Simulated market · last price {fmt(last)} · for education only.
          </p>
        </div>
      </div>
    </div>
  )
}

function Level({
  label,
  value,
  color,
  f,
  onChange,
}: {
  label: string
  value: number
  color: string
  f: number
  onChange: (v: number) => void
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px]" style={{ background: color }} /> {label}
        </span>
        <span className="font-mono text-white">{fmt(value)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.005}
        value={f}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
    </label>
  )
}

function Stat({ label, value, color, good }: { label: string; value: string; color?: string; good?: boolean }) {
  return (
    <div>
      <p
        className="font-mono text-base font-bold"
        style={{ color: good === undefined ? color ?? '#fff' : good ? '#13B97A' : '#F5A623' }}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  )
}
