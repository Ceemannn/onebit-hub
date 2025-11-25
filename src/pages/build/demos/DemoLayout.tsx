import { forwardRef, type ReactNode } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { DemoProjectContent } from '../../../data/demos.ts'

interface DemoPageLayoutProps {
  project: DemoProjectContent
  children: ReactNode
}

export const DemoPageLayout = forwardRef<HTMLDivElement, DemoPageLayoutProps>(
  ({ project, children }, ref) => {
    return (
      <div ref={ref} className="space-y-16">
        <section className="container space-y-6">
          <Link to="/build/demo" className="inline-flex items-center gap-2 text-sm text-brand-primary">
            <ArrowLeft size={16} /> Back to Demo Hub
          </Link>
          <div className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-card dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Onebit Build — Demo</p>
            <h1 className="mt-4 text-4xl font-semibold text-neutral-900 dark:text-white">{project.name}</h1>
            <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-200">{project.heroTagline}</p>
            <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-300">{project.summary}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-neutral-900/60">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">At a glance</p>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">{project.atGlance}</p>
              </div>
              <div className="rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-neutral-900/60">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Achievements</p>
                <ul className="mt-2 space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                  {project.achievements.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container">{children}</section>

        <section className="container grid gap-6 md:grid-cols-2">
          <article className="space-y-4 rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Challenge</p>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-200">
              {project.challenge.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="space-y-4 rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Solution & features</p>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-200">
              {project.solution.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="container grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Tech & implementation</p>
                <h3 className="mt-2 text-2xl font-semibold">Architecture highlights</h3>
              </div>
              <ExternalLink size={18} className="text-brand-primary" />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-200">
              {project.techStack.concat(project.architecture).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-primary/70" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-dashed border-brand-primary/30 bg-brand-primary/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Screens & mockups</p>
            <div className="mt-4 space-y-4">
              {project.screenshots.map((shot) => (
                <div key={shot.title} className="rounded-2xl border border-white/20 bg-white/80 p-4 shadow-soft dark:bg-neutral-900/80">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">{shot.title}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">{shot.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    )
  },
)
DemoPageLayout.displayName = 'DemoPageLayout'
