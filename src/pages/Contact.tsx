import { useRef } from 'react'
import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { Button } from '../components/ui/button.tsx'
import { contactChannels } from '../data/siteContent.ts'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'
import { gsap } from '../lib/gsap.ts'

export function ContactPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = formRef.current
    if (!form) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { scale: 1 },
        { scale: 0.98, yoyo: true, repeat: 1, duration: 0.2, ease: 'power1.inOut' },
      )
    }, form)
    ctx.revert()
  }

  return (
    <div ref={ref} className="space-y-16">
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build your next enterprise system."
          description="Book a discovery call, send us a note, or visit the Onebit Hub studio."
        />
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-2xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-primary/20 focus:ring-2 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-2xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-primary/20 focus:ring-2 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  className="w-full rounded-2xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-primary/20 focus:ring-2 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white"
                  placeholder="Onebit Labs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="interest">
                  What do you need?
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full rounded-2xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-primary/20 focus:ring-2 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white"
                >
                  <option>Enterprise build / automation</option>
                  <option>Corporate training</option>
                  <option>Talent placement</option>
                  <option>General inquiry</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-2xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-primary/20 focus:ring-2 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white"
                placeholder="Tell us about your goals, timelines, and success metrics."
              />
            </div>
            <Button type="submit" className="w-full">
              Book a Discovery Call
            </Button>
          </form>
          <div className="space-y-6">
            <article className="rounded-3xl border border-neutral-900/10 bg-white/90 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/70">Contact</p>
              <div className="mt-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-200">
                <p>Email: {contactChannels.email}</p>
                <p>Phone: {contactChannels.phone}</p>
                <p>Office: {contactChannels.address}</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-3xl border border-neutral-900/10 bg-white shadow-soft dark:border-white/10">
              <iframe
                title="Onebit Hub Map"
                src="https://www.google.com/maps?q=Benny%20Otuya%20street%2C%20F01%2C%20Kubwa%2C%20Abuja&output=embed"
                className="h-72 w-full"
                loading="lazy"
                allowFullScreen
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
