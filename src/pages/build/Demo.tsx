import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/shared/SectionHeading.tsx'
import { Button } from '../../components/ui/button.tsx'
import { demoWidgets } from '../../data/siteContent.ts'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'

export function DemoPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })

  return (
    <div ref={ref} className="container space-y-12">
      <SectionHeading
        eyebrow="Demo"
        title="Test live demos of our enterprise systems and see how Onebit builds intelligent technology solutions."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {demoWidgets.map((widget) => (
          <article key={widget.title} className="rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-card dark:border-white/10 dark:bg-neutral-900/80">
            <header className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{widget.title}</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Live Preview</span>
            </header>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{widget.description}</p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-brand-primary/30 bg-brand-primary/5 p-4">
              <div className="h-10 w-10 rounded-full bg-brand-primary/20"></div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">Interactive controls</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Adjust variables and watch metrics update in real-time.</p>
              </div>
            </div>
            <Button asChild variant="secondary" className="mt-6 inline-flex items-center gap-2">
              <Link to={widget.href}>
                Launch demo <ArrowRight size={16} />
              </Link>
            </Button>
          </article>
        ))}
      </div>
      <div className="rounded-3xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/90 to-brand-teal/80 p-10 text-white">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Sandbox access</p>
            <h3 className="mt-3 text-3xl font-semibold">Invite your teams for private sessions.</h3>
            <p className="mt-4 text-white/80">
              We configure your data slices, security roles, and guided walkthroughs so that stakeholders can explore with confidence.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-sm">
            <ul className="space-y-3">
              {['Executive readouts', 'Product team sandboxes', 'Change management workshops', 'API-first integration demos'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Button variant="ghost" className="mt-6 border border-white/30 text-white">
              Book a guided demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
