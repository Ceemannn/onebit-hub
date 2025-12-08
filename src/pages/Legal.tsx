import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'

export function LegalPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Legal"
          title="Terms, Privacy & Policies"
          description="Important information about how we operate, protect your data, and the terms of using Onebit services."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Terms of Service</p>
            <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">
              Using Onebit Services
            </h3>
            <div className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <p>
                By accessing and using Onebit Hub services, you agree to be bound by these terms and conditions.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0"></span>
                  <span>Services are provided "as is" for enterprise, education, and talent solutions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0"></span>
                  <span>Users must be 18+ or have guardian consent for Learn programs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0"></span>
                  <span>Commercial use of demo content requires written permission.</span>
                </li>
              </ul>
            </div>
          </article>

          <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Privacy Policy</p>
            <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">
              How We Handle Your Data
            </h3>
            <div className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <p>
                We respect your privacy and are committed to protecting your personal information.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0"></span>
                  <span>We collect only necessary data to provide our services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0"></span>
                  <span>Your data is never sold to third parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0"></span>
                  <span>You can request data deletion at any time.</span>
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div className="rounded-3xl border border-neutral-900/10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-10 text-white">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Cookie Policy</p>
              <h3 className="mt-3 text-2xl font-semibold">Cookies & Tracking</h3>
              <p className="mt-4 text-white/80">
                We use essential cookies to ensure the website functions properly. Analytics cookies help us understand how visitors interact with our site.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-sm">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-brand-teal"></span>
                  <span>Essential cookies: Always active</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-brand-teal"></span>
                  <span>Analytics: Optional, anonymized</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-brand-teal"></span>
                  <span>Marketing: Only with consent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Contact</p>
          <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">
            Questions About Our Policies?
          </h3>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
            If you have any questions about our terms, privacy practices, or cookie usage, please reach out to us at{' '}
            <a href="mailto:legal@onebit.io" className="text-brand-primary hover:underline">
              legal@onebit.io
            </a>
            {' '}or through our{' '}
            <a href="/contact" className="text-brand-primary hover:underline">
              contact page
            </a>.
          </p>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Last updated: December 2024
          </p>
        </article>
      </section>
    </div>
  )
}
