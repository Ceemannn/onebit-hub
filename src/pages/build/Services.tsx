import { SectionHeading } from '../../components/shared/SectionHeading.tsx'
import { servicesCatalog } from '../../data/siteContent.ts'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'

export function ServicesPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })

  return (
    <div ref={ref} className="container space-y-12">
      <SectionHeading
        eyebrow="Services"
        title="Enterprise solutions engineered for scale."
        description="From data platforms to advisory, Onebit delivers premium technology services that modernize operations."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {servicesCatalog.map((service) => (
          <article key={service.title} className="rounded-3xl border border-neutral-900/10 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{service.title}</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-brand-teal/60">Onebit Build</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/90 to-brand-teal/80 p-10 text-white">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Engagement model</p>
            <h3 className="mt-3 text-3xl font-semibold">Strategy. Build. Launch. Iterate.</h3>
            <p className="mt-4 text-white/80">
              We operate as embedded partners—pairing discovery sprints with agile delivery squads, playbooks, and adoption support.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-sm">
            <ol className="space-y-3">
              {['Discovery & Blueprint', 'Build & Integrations', 'Enablement & Training', 'Growth & Optimization'].map(
                (stage, index) => (
                  <li key={stage} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-base font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{stage}</p>
                      <p className="text-white/70">{index === 0 && 'Architecture, workshops, and success metrics.'}</p>
                      <p className="text-white/70">{index === 1 && 'Cross-functional squads deliver releases bi-weekly.'}</p>
                      <p className="text-white/70">{index === 2 && 'Playbooks, academy-style enablement, and change management.'}</p>
                      <p className="text-white/70">{index === 3 && 'Post-launch optimization with product analytics and L2 support.'}</p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
