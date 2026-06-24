import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectCards } from '../../data/siteContent.ts'
import { featuredProjects, type FeaturedProject } from '../../data/featuredProjects.ts'
import { Button } from '../../components/ui/button.tsx'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'
import { ProjectCard } from '../../components/build/ProjectCard.tsx'
import { ProjectDrawer } from '../../components/build/ProjectDrawer.tsx'
import { AuraMockup } from '../../components/build/mockups/AuraMockup.tsx'
import { AttendMockup } from '../../components/build/mockups/AttendMockup.tsx'
import { OmugwoMockup } from '../../components/build/mockups/OmugwoMockup.tsx'

const MOCKUPS: Record<string, { node: React.ReactNode; tone: 'light' | 'dark' }> = {
  aura: { node: <AuraMockup />, tone: 'dark' },
  attendos: { node: <AttendMockup />, tone: 'light' },
  omugwo: { node: <OmugwoMockup />, tone: 'light' },
}

export function ProjectsPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })
  const [open, setOpen] = useState<FeaturedProject | null>(null)

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="container pt-4">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Onebit Build · Our work
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-white md:text-6xl">
            Real products, <span className="grad-text">shipped and running.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            A gallery of systems we've designed, engineered and launched. Hover a card to see it
            come alive, open it for a live demo, then request the full experience for your team.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              mockup={MOCKUPS[project.slug].node}
              onOpen={() => setOpen(project)}
            />
          ))}
        </div>
      </section>

      {/* Enterprise systems (breadth) */}
      <section className="container mt-24 space-y-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Enterprise systems
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            And the engines behind the business.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projectCards.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-2xl border border-neutral-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-card dark:border-white/5 dark:bg-neutral-900/70"
              data-animate
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">{project.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">{project.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>
              <Link
                to="/contact"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-indigo-600 transition-all group-hover:gap-3 dark:text-indigo-300"
              >
                Request case study <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA — the one gold action */}
      <section className="container mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-14 text-center text-white shadow-card md:px-12">
          <div
            className="pointer-events-none absolute inset-0 text-white/[0.05] [background-image:radial-gradient(currentColor_1.1px,transparent_1.1px)] [background-size:24px_24px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Have something to build?</h2>
            <p className="mt-4 text-white/70">
              Tell us what you're working on. We'll spin up a private walkthrough of the right product —
              or scope a custom build for your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Request the full experience <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/build/services">Explore our services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detail drawer */}
      <ProjectDrawer
        project={open}
        tone={open ? MOCKUPS[open.slug].tone : 'light'}
        mockup={open ? MOCKUPS[open.slug].node : null}
        onClose={() => setOpen(null)}
      />
    </div>
  )
}
