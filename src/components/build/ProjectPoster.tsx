import type { FeaturedProject } from '../../data/featuredProjects.ts'

/**
 * Calm, static "cover" for a project card — the resting state before hover swaps
 * in the live mockup. Lightweight (no animation), branded with the app accent
 * and a small slug-specific motif so each reads as that product at a glance.
 */
export function ProjectPoster({ project }: { project: FeaturedProject }) {
  const a = project.accent
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5"
      style={{ background: `linear-gradient(155deg, ${a}14, transparent 60%), #0b0e1a` }}
    >
      {/* faux chrome dots */}
      <div className="flex items-center gap-1.5 opacity-60">
        <span className="h-2 w-2 rounded-full bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>

      {/* motif */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.18]">
        <Motif slug={project.slug} accent={a} />
      </div>

      <div className="relative">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: `${a}26`, color: a }}
        >
          {project.category}
        </span>
        <h3 className="mt-2 font-heading text-2xl font-bold text-white">{project.name}</h3>
        <p className="text-sm" style={{ color: a }}>
          {project.tagline}
        </p>
      </div>
    </div>
  )
}

function Motif({ slug, accent }: { slug: string; accent: string }) {
  if (slug === 'aura') {
    return (
      <svg viewBox="0 0 200 80" className="w-3/4">
        {Array.from({ length: 22 }).map((_, i) => {
          const h = 12 + Math.abs(Math.sin(i * 0.9)) * 56
          return <rect key={i} x={i * 9} y={(80 - h) / 2} width={5} height={h} rx={2.5} fill={accent} />
        })}
      </svg>
    )
  }
  if (slug === 'attendos') {
    return (
      <svg viewBox="0 0 120 120" className="w-1/2">
        <rect x="20" y="20" width="80" height="80" rx="12" fill="none" stroke={accent} strokeWidth="6" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={34 + c * 18} y={34 + r * 18} width="10" height="10" rx="2" fill={accent} opacity={(r + c) % 2 ? 0.4 : 1} />
          )),
        )}
      </svg>
    )
  }
  // omugwo — sidebar + cards
  return (
    <svg viewBox="0 0 160 100" className="w-3/4">
      <rect x="6" y="6" width="34" height="88" rx="6" fill={accent} opacity="0.5" />
      <rect x="50" y="6" width="46" height="40" rx="6" fill={accent} opacity="0.8" />
      <rect x="104" y="6" width="46" height="40" rx="6" fill={accent} opacity="0.55" />
      <rect x="50" y="54" width="100" height="40" rx="6" fill={accent} opacity="0.7" />
    </svg>
  )
}
