import { motion, useReducedMotion } from 'framer-motion'
import { Play, MessageSquare } from 'lucide-react'

const O = '#F97316'
const VIS = ['STRAND', 'PULSE', 'ECLIPSE', 'BLOOM']
const BARS = [38, 62, 48, 80, 95, 70, 52, 88, 64, 42, 76, 58, 90, 50, 68, 44, 82, 60, 36, 72]

/** In-browser preview of Aura — dark studio with a frequency-reactive waveform. */
export function AuraMockup() {
  const reduce = useReducedMotion()
  return (
    <div className="bg-[#070709] p-5 text-[#F4EFE7]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: O }}>
            Previewing · Strand
          </p>
          <h4 className="mt-1 text-lg font-semibold">Midnight Drive — v3</h4>
          <p className="text-xs text-white/40">Onebit Studio · 3:24</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 3 live
        </span>
      </div>

      {/* Waveform */}
      <div className="mt-5 flex h-24 items-center gap-[3px] rounded-lg border border-white/10 bg-black/40 px-3">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full"
            style={{ background: i % 4 === 0 ? O : 'rgba(249,115,22,0.45)' }}
            initial={{ height: `${h * 0.5}%` }}
            animate={reduce ? { height: `${h * 0.7}%` } : { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`] }}
            transition={{ duration: 1.6, repeat: reduce ? 0 : Infinity, delay: i * 0.05, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Timeline with comment markers */}
      <div className="relative mt-4 h-1.5 rounded-full bg-white/10">
        <div className="absolute left-0 top-0 h-full w-1/3 rounded-full" style={{ background: O }} />
        <span className="absolute left-1/3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ring-2 ring-[#070709]" style={{ background: '#fff' }} />
        {[0.22, 0.55, 0.78].map((p) => (
          <span key={p} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${p * 100}%` }}>
            <MessageSquare size={11} className="text-orange-300" fill={O} />
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: O }}>
            <Play size={16} className="text-[#070709]" fill="#070709" />
          </span>
          <div className="flex -space-x-2">
            {['#F97316', '#A855F7', '#13B97A'].map((c) => (
              <span key={c} className="h-7 w-7 rounded-full border-2 border-[#070709]" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="flex gap-1.5">
          {VIS.map((v, i) => (
            <span
              key={v}
              className="rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-wider"
              style={i === 0 ? { background: 'rgba(249,115,22,0.15)', color: O } : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
