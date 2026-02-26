import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/shared/SectionHeading.tsx'
import { Button } from '../../components/ui/button.tsx'
import { corporateTracks, corporateFeatures } from '../../data/siteContent.ts'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'

export function CorporationsPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Corporate Training"
          title="Upskill your team with modern, industry-relevant technology training."
          description="Customized curriculum, hands-on workshops, and executive dashboards for measuring capability growth."
        />
        <div className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Training tracks</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {corporateTracks.map((track) => (
                  <li key={track} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal"></span>
                    {track}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-900/10 bg-neutral-900 p-6 text-white dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Features</p>
              <ul className="mt-4 space-y-3 text-sm">
                {corporateFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-warm"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant="secondary" className="mt-6 w-full border-white/30 text-white">
                <Link to="/learn/corporate-proposal">Request proposal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container rounded-3xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/90 to-brand-teal/80 p-10 text-white">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Enterprise dashboards</p>
            <h3 className="mt-3 text-3xl font-semibold">Measure adoption, skill gaps, and team ROI.</h3>
            <p className="mt-4 text-white/80">
              Let HR, L&D, and CTO teams visualize progress with cohort analytics, competency maps, and readiness scoring for upcoming projects.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm">
            <ul className="space-y-3">
              {['Live dashboards', 'Blended learning timeline', 'Budget & impact tracker', 'Post-training support SLAs'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Button variant="ghost" className="mt-6 border border-white/30 text-white">
              Schedule a discovery session
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
