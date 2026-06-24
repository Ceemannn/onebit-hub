import { Linkedin } from 'lucide-react'
import { Button } from '../components/ui/button.tsx'
import { leadership, missionStatements } from '../data/siteContent.ts'
import { DecodeText } from '../components/shared/DecodeText.tsx'
import { Reveal, RevealGroup, RevealItem, TiltCard } from '../components/shared/interactions.tsx'
import { Aurora } from '../components/shared/Aurora.tsx'
import { MilestoneTimeline } from '../components/about/MilestoneTimeline.tsx'
import { ThreeArmExplorer } from '../components/about/ThreeArmExplorer.tsx'

const leaderAccent: Record<string, string> = {
  'Founder & CEO': '#5A4FE0',
  'Chief Financial Officer': '#F5A623',
  'Chief Learning Officer': '#13B97A',
}
const leaderDescriptions: Record<string, string> = {
  'Founder & CEO': 'Sets the vision and leads the Onebit organization.',
  'Chief Financial Officer': 'Leads financial strategy, operations, and governance.',
  'Chief Learning Officer': 'Leads curriculum, learning experience, and outcomes.',
}

export function AboutPage() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">About Onebit</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 dark:text-white md:text-5xl lg:text-6xl">
            <DecodeText text="Building technology." />
            <br />
            <DecodeText text="Developing people." speed={30} />
            <br />
            <span className="grad-text">
              <DecodeText text="Connecting opportunity." speed={36} />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {missionStatements.mission}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="relative min-h-[420px] overflow-visible rounded-3xl border border-neutral-900/10 bg-white/90 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
              <div
                className="absolute inset-y-0 left-0 w-2/5 rounded-l-3xl bg-gradient-to-br from-indigo-500/40 via-emerald-500/25 to-indigo-300/40 dark:from-indigo-500/30 dark:via-emerald-500/20 dark:to-indigo-900/30"
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
                <p className="eyebrow">Our story</p>
                <p className="mt-4 text-neutral-700 dark:text-neutral-200">
                  Onebit is a technology and education company helping individuals and organizations embrace modern
                  digital systems. We build enterprise software, train job-ready tech talent, and bridge graduates to
                  real opportunities.
                </p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
              <p className="eyebrow">Vision</p>
              <p className="mt-4 text-neutral-700 dark:text-neutral-200">{missionStatements.vision}</p>
              <RevealGroup className="mt-6 grid gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                {missionStatements.values.map((value) => (
                  <RevealItem
                    key={value}
                    className="rounded-2xl border border-neutral-900/10 bg-white/60 px-4 py-3 transition hover:border-indigo-500/40 hover:bg-indigo-500/[0.04] dark:border-white/10 dark:bg-white/5"
                  >
                    {value}
                  </RevealItem>
                ))}
              </RevealGroup>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Journey — orbital timeline */}
      <section className="container space-y-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Our journey</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            One bit, compounding over time.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            From a single belief in Abuja to a hub with three connected arms. Click a year to explore.
          </p>
        </div>
        <Reveal>
          <MilestoneTimeline />
        </Reveal>
      </section>

      {/* One hub, three arms */}
      <section className="container space-y-8">
        <div className="max-w-2xl">
          <p className="eyebrow">One hub, three arms</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            Build. Learn. Bridge.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            One unit of technology, working three ways. Hover an arm to see how it connects.
          </p>
        </div>
        <Reveal>
          <ThreeArmExplorer />
        </Reveal>
      </section>

      {/* CEO note */}
      <section className="container space-y-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Words from the CEO</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            Clarity, alignment, and systems that actually work.
          </h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-[360px_1fr] md:items-center">
          <Reveal>
            <article className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-indigo-500/25 via-emerald-500/15 to-indigo-300/30 shadow-soft dark:border-white/10 md:w-[360px]">
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
                <div className="rounded-2xl bg-ink-950/55 px-4 py-3 backdrop-blur-sm">
                  <p className="font-semibold text-white">Testimony Adegoke</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/80">Founder &amp; CEO</p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 text-white shadow-soft md:-ml-16">
              <Aurora />
              <div className="relative space-y-4 text-sm leading-relaxed text-white/80">
                <p>
                  In a world moving rapidly toward digital transformation, technology alone is no longer enough. What
                  organizations truly need is clarity, alignment, and systems that actually work.
                </p>
                <p>Onebit Tech Hub, a technology solutions company built on a simple but powerful belief:</p>
                <p className="font-semibold text-white">Technology should serve people, not confuse them.</p>
                <p>
                  With over a decade of experience spanning enterprise systems, data analytics, ERP implementations, and
                  digital transformation initiatives, I have worked across multinationals, government institutions,
                  faith-based organizations, and growing businesses. Most technology projects do not fail because of poor
                  tools — they fail because of misalignment and complexity without a clear strategy.
                </p>
                <p className="text-white">Onebit was born out of that realization.</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Leadership — reactive cards */}
      <section className="container space-y-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            People powering Onebit.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            Founders and leadership driving the Build, Learn and Bridge pillars.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((leader) => {
            const accent = leaderAccent[leader.role] ?? '#5A4FE0'
            return (
              <TiltCard
                key={leader.role}
                max={7}
                className="spotlight-card group relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80"
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-lg font-bold text-white"
                    style={{ background: accent }}
                  >
                    {leader.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: accent }}>
                      {leader.role}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-white">{leader.name}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">{leaderDescriptions[leader.role]}</p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: accent }}
                >
                  <Linkedin size={15} /> Connect
                </a>
              </TiltCard>
            )
          })}
        </div>
      </section>

      {/* Why we exist + Partner CTA */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
              <p className="eyebrow">Why we exist</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {missionStatements.whyWeExist.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    {reason}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="relative h-full overflow-hidden rounded-3xl bg-gradient-primary p-8 text-white shadow-glow-indigo [background-image:var(--gradient-brand),var(--gradient-spark)]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/80">Partner with us</p>
              <h3 className="mt-4 font-heading text-3xl font-bold">Let's build Africa's most trusted talent-driven ecosystem.</h3>
              <p className="mt-4 text-white/85">
                Engage Onebit for enterprise build programs, nationwide academies, or Bridge-powered hiring initiatives.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="/contact">Book a Discovery Call</a>
                </Button>
                <Button asChild variant="secondary" className="border-white/40 text-white hover:bg-white/10">
                  <a href="/build/projects">Explore Projects</a>
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
