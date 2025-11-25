import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { Button } from '../components/ui/button.tsx'
import { leadership, missionStatements } from '../data/siteContent.ts'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'

export function AboutPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="About"
          title="Building technology. Developing people. Connecting opportunity."
          description={missionStatements.mission}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Story</p>
            <p className="mt-4 text-neutral-700 dark:text-neutral-200">
              Onebit is a technology and education company helping individuals and organizations embrace modern digital systems.
              We build enterprise software, train job-ready tech talent, and bridge graduates to real opportunities.
            </p>
          </article>
          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Vision</p>
            <p className="mt-4 text-neutral-700 dark:text-neutral-200">{missionStatements.vision}</p>
            <div className="mt-6 grid gap-3 text-sm text-neutral-600 dark:text-neutral-300">
              {missionStatements.values.map((value) => (
                <div key={value} className="rounded-2xl border border-neutral-900/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  {value}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="container space-y-8">
        <SectionHeading eyebrow="Leadership" title="People powering Onebit." description="Founders and leadership team driving the Build, Learn, and Bridge pillars." />
        <div className="grid gap-6 md:grid-cols-4">
          {leadership.map((leader) => (
            <article key={leader.role} className="rounded-3xl border border-neutral-900/10 bg-white/80 p-6 text-sm text-neutral-600 shadow-soft dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-200">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/60">{leader.role}</p>
              <p className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">{leader.name}</p>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                Leads {leader.role.includes('Bridge') ? 'Bridge platform operations.' : 'enterprise, learning, or platform initiatives.'}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container space-y-8">
        <SectionHeading
          eyebrow="Why we exist"
          title="Mission, vision, and ecosystem impact."
          description="Our mandate is to empower Africans and global partners with future-ready technology."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Why we exist</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              {missionStatements.whyWeExist.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                  {reason}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/90 to-brand-teal/80 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Partner with us</p>
            <h3 className="mt-4 text-3xl font-semibold">Let’s build Africa’s most trusted talent-driven ecosystem.</h3>
            <p className="mt-4 text-white/80">
              Engage Onebit for enterprise build programs, nationwide academies, or Bridge-powered hiring initiatives.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild>
                <a href="/contact">Book a Discovery Call</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="/build/projects" className="inline-flex items-center gap-2">
                  Explore Projects
                </a>
              </Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
