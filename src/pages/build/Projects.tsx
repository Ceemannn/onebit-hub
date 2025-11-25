import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectCards } from '../../data/siteContent.ts'
import { SectionHeading } from '../../components/shared/SectionHeading.tsx'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'

export function ProjectsPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })

  return (
    <div ref={ref} className="container space-y-12">
      <SectionHeading
        eyebrow="Projects"
        title="See how we deliver high-impact technology solutions."
        description="Enterprise-grade case studies spanning data platforms, ERP, automation, and AI systems."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {projectCards.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-3xl border border-neutral-900/10 bg-white p-6 shadow-card dark:border-white/5 dark:bg-neutral-900/70"
            data-animate
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{project.category}</p>
            <h3 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white">{project.title}</h3>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>
            <Link to="/contact" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-primary">
              Request detailed case study
              <ArrowUpRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
