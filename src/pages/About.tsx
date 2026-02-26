import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { Button } from '../components/ui/button.tsx'
import { leadership, missionStatements } from '../data/siteContent.ts'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'

export function AboutPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })
  const leaderDescriptions: Record<string, string> = {
    'Founder & CEO': 'Sets the vision and leads the Onebit organization.',
    'Chief Financial Officer': 'Leads financial strategy, operations, and governance.',
    'Chief Learning Officer': 'Leads curriculum, learning experience, and outcomes.',
  }

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="About"
          title="Building technology. Developing people. Connecting opportunity."
          description={missionStatements.mission}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="relative min-h-[420px] overflow-visible rounded-3xl border border-neutral-900/10 bg-white/90 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div
              className="absolute inset-y-0 left-0 w-2/5 rounded-l-3xl bg-gradient-to-br from-brand-teal/40 via-brand-primary/30 to-sky-200/50 dark:from-brand-teal/30 dark:via-brand-primary/25 dark:to-sky-900/30"
              aria-hidden="true"
            />
            <img
              src="/about-story-3d.jpg"
              alt="Onebit story"
              className="absolute -left-60 -top-5 z-10 h-[115%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              style={{ maxHeight: '500px' }}
              loading="lazy"
              draggable={false}
            />
            <div className="relative z-20 ml-auto flex w-full flex-col justify-center p-8 md:w-3/5 md:pl-10">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Story</p>
              <p className="mt-4 text-neutral-700 dark:text-neutral-200">
                Onebit is a technology and education company helping individuals and organizations embrace modern digital systems.
                We build enterprise software, train job-ready tech talent, and bridge graduates to real opportunities.
              </p>
            </div>
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
        <SectionHeading
          eyebrow="Words from the CEO"
          title="Clarity, alignment, and systems that actually work."
          description="A short note on why Onebit exists and how we think about transformation."
        />
        <div className="relative grid gap-6 md:grid-cols-[360px_1fr] md:items-center">
          <article className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-brand-teal/25 via-brand-primary/20 to-sky-200/40 shadow-soft dark:border-white/10 dark:from-brand-teal/20 dark:via-brand-primary/15 dark:to-sky-900/20 md:w-[360px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-28 w-28 rounded-full bg-white/70 shadow-soft ring-1 ring-neutral-900/10 dark:bg-white/10 dark:ring-white/10" />
            </div>
            <img
              src="/ceo.jpg"
              alt="Testimony Adegoke"
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
              draggable={false}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-x-0 bottom-0 z-20 p-4">
              <div className="rounded-2xl bg-neutral-950/55 px-4 py-3 backdrop-blur-sm">
                <p className="font-semibold text-white">Testimony Adegoke</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/80">Founder &amp; CEO</p>
              </div>
            </div>
          </article>

          <article className="relative rounded-3xl bg-neutral-950/95 p-8 text-white shadow-soft md:-ml-16">
            <div className="space-y-4 text-sm leading-relaxed text-white/80">
              <p>
                In a world moving rapidly toward digital transformation, technology alone is no longer enough. What organizations
                truly need is clarity, alignment, and systems that actually work.
              </p>
              <p>
                Onebit Tech Hub, a technology solutions company built on a simple but powerful belief:
              </p>
              <p className="font-semibold text-white">Technology should serve people, not confuse them.</p>
              <p>
                With over a decade of experience spanning enterprise systems, data analytics, ERP implementations, and digital
                transformation initiatives, I have worked across multinationals, government institutions, faith-based
                organizations, and growing businesses. Throughout this journey, one pattern became clear - most technology
                projects do not fail because of poor tools. They fail because of misalignment and complexity without a clear
                strategy.
              </p>
              <p className="text-white">Onebit was born out of that realization.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="container space-y-8">
        <SectionHeading eyebrow="Leadership" title="People powering Onebit." description="Founders and leadership team driving the Build, Learn, and Bridge pillars." />
        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((leader) => (
            <article key={leader.role} className="rounded-3xl border border-neutral-900/10 bg-white/80 p-6 text-sm text-neutral-600 shadow-soft dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-200">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 flex-none rounded-2xl bg-neutral-200/80 dark:bg-neutral-800" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/60">{leader.role}</p>
                  <p className="mt-2 text-xl font-semibold text-neutral-900 dark:text-white">{leader.name}</p>
                </div>
              </div>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300">{leaderDescriptions[leader.role]}</p>
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
                <a href="/build/projects" className="inline-flex items-center gap-2 text-white hover:text-white">
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
