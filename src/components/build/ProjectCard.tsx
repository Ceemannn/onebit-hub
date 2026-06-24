import { useState, type ReactNode } from 'react'
import { ArrowUpRight, MousePointerClick } from 'lucide-react'
import type { FeaturedProject } from '../../data/featuredProjects.ts'
import { ProjectPoster } from './ProjectPoster.tsx'

/**
 * Gallery card: a calm static poster by default; on hover (fine-pointer) the
 * live mockup mounts in place ("comes to life"); click opens the detail drawer.
 * Mounting the heavy demo only on hover keeps the grid light.
 */
export function ProjectCard({
  project,
  mockup,
  onOpen,
}: {
  project: FeaturedProject
  mockup: ReactNode
  onOpen: () => void
}) {
  const [hover, setHover] = useState(false)
  const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Open ${project.name} demo`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-neutral-900/70"
    >
      {/* Preview */}
      <div className="relative h-56 overflow-hidden border-b border-neutral-100 dark:border-white/5">
        <ProjectPoster project={project} />
        {finePointer && hover && (
          <div className="absolute inset-0 overflow-hidden bg-white dark:bg-ink-950">
            {mockup}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        {/* hint */}
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <MousePointerClick size={11} /> {finePointer ? 'Hover · click to open' : 'Tap to open'}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-bold text-neutral-900 dark:text-white">{project.name}</h3>
          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{project.category}</p>
        </div>
        <span
          className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold transition-all group-hover:gap-1.5"
          style={{ color: project.accent }}
        >
          Open demo <ArrowUpRight size={14} />
        </span>
      </div>
    </button>
  )
}
