import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, ArrowRight, ExternalLink, Check } from 'lucide-react'
import type { FeaturedProject } from '../../data/featuredProjects.ts'
import { BrowserFrame } from './BrowserFrame.tsx'

/** Right-side drawer showing the full interactive demo + details for a project. */
export function ProjectDrawer({
  project,
  mockup,
  tone,
  onClose,
}: {
  project: FeaturedProject | null
  mockup: ReactNode
  tone: 'light' | 'dark'
  onClose: () => void
}) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[110]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} details`}
            initial={reduce ? { x: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl dark:bg-ink-900"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: project.accent }} />
                <div>
                  <h2 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">{project.name}</h2>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">{project.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <p className="text-lg font-medium" style={{ color: project.accent }}>
                {project.tagline}
              </p>

              {/* live interactive demo */}
              <BrowserFrame url={project.liveUrl.replace(/^https?:\/\//, '')} tone={tone}>
                {mockup}
              </BrowserFrame>

              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{project.summary}</p>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${project.accent}26`, color: project.accent }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-mono text-xl font-bold text-neutral-900 dark:text-white">{m.value}</p>
                    <p className="text-[11px] uppercase tracking-wider text-neutral-400">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* footer CTA */}
            <div className="flex flex-wrap items-center gap-3 border-t border-neutral-200 px-6 py-4 dark:border-white/10">
              <Link
                to={`/contact?project=${project.slug}`}
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: project.accent, boxShadow: `0 10px 30px ${project.accent}40` }}
              >
                Request the full experience <ArrowRight size={16} />
              </Link>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 dark:border-white/15 dark:text-neutral-200"
              >
                See it live <ExternalLink size={14} />
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
