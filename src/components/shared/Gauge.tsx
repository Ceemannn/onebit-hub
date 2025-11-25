type GaugeProps = {
  value: number
  max: number
  label?: string
}

export function Gauge({ value, max, label }: GaugeProps) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(max, Math.max(0, value))
  const offset = circumference - (clamped / max) * circumference

  return (
    <div className="flex flex-col items-center text-white">
      <svg width="100" height="100" className="rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#gauge-gradient)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
        />
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0c63ff" />
          </linearGradient>
        </defs>
      </svg>
      <p className="mt-2 text-2xl font-semibold">{clamped}</p>
      {label && <p className="text-xs uppercase tracking-[0.3em] opacity-70">{label}</p>}
    </div>
  )
}
