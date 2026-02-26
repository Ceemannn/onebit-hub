import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Mail, Users, Briefcase } from 'lucide-react'
import { Button } from '../components/ui/button.tsx'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'

export function ComingSoonPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })

  return (
    <div ref={ref} className="container">
      <div className="mx-auto max-w-4xl space-y-12 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm text-brand-primary">
          <Clock size={16} />
          Coming Soon
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-6xl">
            Onebit Bridge
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-600 dark:text-neutral-300">
            We're building a talent-to-industry platform that connects skilled professionals to real job opportunities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 text-left shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-primary/10 p-3 text-brand-primary">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">For Talents</h3>
            </div>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
              Launch your career with portfolio reviews, readiness interviews, and direct connections to hiring companies.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 text-left shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-teal/10 p-3 text-brand-teal">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">For Companies</h3>
            </div>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
              Hire vetted talent with verified portfolios, capstone projects, and readiness scores from our accelerator programs.
            </p>
          </div>
        </div>

        {/* Photo Collage Section */}
        <div className="py-8">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-neutral-500">What to expect</p>
          <div className="relative mx-auto h-[320px] w-[320px]">
            {/* Center large image - z-10 */}
            <div className="absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop"
                alt="Team collaboration"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Top left - portrait */}
            <div className="absolute left-[12%] top-[8%] z-[5] h-28 w-20 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=300&fit=crop"
                alt="Professional talent"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Top center */}
            <div className="absolute left-1/2 top-[5%] z-[6] h-20 w-24 -translate-x-1/2 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=240&fit=crop"
                alt="Team meeting"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Top right - portrait */}
            <div className="absolute right-[12%] top-[10%] z-[4] h-24 w-20 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=280&fit=crop"
                alt="Business professional"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Left side */}
            <div className="absolute left-[5%] top-[38%] z-[7] h-24 w-24 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=280&h=280&fit=crop"
                alt="Interview session"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Right side */}
            <div className="absolute right-[5%] top-[35%] z-[8] h-20 w-28 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=320&h=240&fit=crop"
                alt="Hiring discussion"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Bottom left */}
            <div className="absolute bottom-[8%] left-[18%] z-[9] h-24 w-20 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=240&h=280&fit=crop"
                alt="Workshop session"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Bottom right */}
            <div className="absolute bottom-[10%] right-[15%] z-[3] h-20 w-24 overflow-hidden rounded-lg border-2 border-white shadow-xl dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=280&h=240&fit=crop"
                alt="Career growth"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/10 to-brand-teal/10 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary/70">Stay updated</p>
          <h3 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
            Be the first to know when Bridge launches
          </h3>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            We're finalizing our matching engine and onboarding our first cohort of verified professionals.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Button asChild>
              <Link to="/contact" className="inline-flex items-center gap-2">
                <Mail size={16} />
                Get notified
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/learn/individuals" className="inline-flex items-center gap-2">
                Join Accelerator Program
              </Link>
            </Button>
          </div>
        </div>

        <div className="pt-8">
          <Button asChild variant="ghost">
            <Link to="/learn/individuals" className="inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Learn
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
