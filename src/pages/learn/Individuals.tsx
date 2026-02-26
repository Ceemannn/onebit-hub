import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading.tsx'
import { Button } from '../../components/ui/button.tsx'
import {
  professionalTracks,
  programExperience,
  kidsCourses,
  kidsOutcomes,
} from '../../data/siteContent.ts'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'

export function IndividualsPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Learn"
          title="Onebit Professionals — job-ready training powered by case studies, mock interviews, and studio builds."
          description="Get career-ready in 4–8 weeks with tracks across data, software engineering, trading, and AI."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {professionalTracks.map((track) => (
            <article key={track.title} className="group rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-primary/30 dark:border-white/10 dark:bg-neutral-900/80 dark:hover:border-brand-primary/40">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">{track.duration}</p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">{track.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                {track.programs.map((program) => (
                  <li key={program.slug} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0"></span>
                    <Link
                      to={`/learn/course/${program.slug}`}
                      className="hover:text-brand-primary hover:underline transition-colors"
                    >
                      {program.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="rounded-3xl border border-neutral-900/10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-10 text-white">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Program experience</p>
              <h3 className="mt-3 text-3xl font-semibold">Immersive. Industry-backed. Outcomes obsessed.</h3>
              <p className="mt-4 text-white/80">
                Studio-grade curriculum designed with hiring teams. Every learner ships capstones, compiles a portfolio, and
                gets career support through Onebit Bridge.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button>Apply to Onebit Professionals</Button>
                <Button asChild variant="secondary">
                  <Link to="/coming-soon">Meet hiring partners</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm">
              <ul className="space-y-3">
                {programExperience.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <BookOpen className="text-brand-teal" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Onebit Kids"
          title="Future-ready creativity for ages 6–16."
          description="Discovery-led learning with robotics, coding, design, storytelling, and safe AI explorations."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-primary/10 p-3 text-brand-primary">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Kids Courses</p>
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">Project-based learning</h3>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-neutral-700 dark:text-neutral-300">
              {kidsCourses.map((course) => (
                <li key={course} className="rounded-2xl border border-neutral-900/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  {course}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-neutral-900/10 bg-neutral-900 p-8 text-white shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Learning outcomes</p>
            <h3 className="mt-3 text-3xl font-semibold">Confidence, curiosity, and collaboration.</h3>
            <p className="mt-4 text-white/80">
              Every cohort ships a showcase project—ranging from mini-robots to interactive websites and storytelling games.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {kidsOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-brand-warm"></span>
                  {outcome}
                </li>
              ))}
            </ul>
            <Button variant="ghost" className="mt-8 border border-white/30 text-white">
              Enroll for Onebit Kids
            </Button>
          </article>
        </div>
      </section>

      <section className="container rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Bridge-ready</p>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
              Job placement support via Onebit Bridge.
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Once you graduate, the Bridge team gets you interview-ready with portfolio reviews, referrals, and talent showcases.
            </p>
          </div>
          <Button asChild variant="secondary" className="w-full md:w-auto">
            <Link to="/coming-soon" className="inline-flex items-center gap-2">
              Explore Bridge <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
