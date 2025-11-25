import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, Users } from 'lucide-react'
import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { Button } from '../components/ui/button.tsx'
import { bridgeTalent, bridgeCompanies } from '../data/siteContent.ts'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'

export function BridgePage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 60 })

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Bridge"
          title="Bridge connects skilled talent to real job opportunities."
          description="Onebit’s talent-to-industry platform matches verified professionals to companies seeking modern tech skills."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article id="talent" className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-brand-primary/10 p-3 text-brand-primary">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">For Talents</p>
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">Launch your career</h3>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              {bridgeTalent.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal"></span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link to="/learn/individuals" className="inline-flex items-center justify-center gap-2">
                Join Accelerator Program <ArrowUpRight size={16} />
              </Link>
            </Button>
          </article>
          <article id="companies" className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-brand-teal/10 p-3 text-brand-teal">
                <Briefcase size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">For Companies</p>
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">Hire vetted talent</h3>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              {bridgeCompanies.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="secondary" className="mt-6 w-full">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2">
                Request Screening <ArrowUpRight size={16} />
              </Link>
            </Button>
          </article>
        </div>
      </section>

      <section className="container rounded-3xl border border-neutral-900/10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-10 text-white">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Matching engine</p>
            <h3 className="mt-3 text-3xl font-semibold">Portfolio intelligence + employer briefs.</h3>
            <p className="mt-4 text-white/80">
              Bridge evaluates capstones, assessments, and interview performance to generate a readiness score and auto-match professionals to briefs shared by partner companies.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/5 p-6 text-sm">
            <ul className="space-y-3">
              {['Portfolio optimization studio', 'Readiness interviews with hiring mentors', 'Company-specific skill sprints', 'On-demand upskilling for placed talent'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Button variant="ghost" className="mt-6 border border-white/30 text-white">
              Partner with Bridge
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
