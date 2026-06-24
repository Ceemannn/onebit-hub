import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button.tsx'
import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { TestimonialCarousel } from '../components/shared/TestimonialCarousel.tsx'
import { HeroConstellation } from '../components/shared/HeroConstellation.tsx'
import { DemoReelVisual } from '../components/shared/DemoReelVisual.tsx'
import { CountUp } from '../components/shared/CountUp.tsx'
import { Magnetic, TiltCard } from '../components/shared/interactions.tsx'
import { DecodeText } from '../components/shared/DecodeText.tsx'
import { Aurora } from '../components/shared/Aurora.tsx'
import { ArmFlow } from '../components/shared/ArmFlow.tsx'
import {
  heroPillars,
  heroStats,
  pillars,

  projectCards,
  demoWidgets,
  testimonials,
  featuredTestimonial,
  trustedBy,
  onebitArms,
} from '../data/siteContent.ts'
import { useGsapReveal } from '../hooks/useGsapReveal.ts'
import worldMapDots from '../assets/world-map-dots.png'
import creditIntelligenceImage from '../assets/Credit Intelligence Platform.jpeg'
import demandForecastingImage from '../assets/Demand Forecasting Engine.jpeg'
import hrWorkflowAutomationImage from '../assets/HR Workflow Automation System.jpeg'
import hrApplicationWorkforceCoreImage from '../assets/HR Application (WorkforceCore).jpeg'
import inventoryManagementBuildStockImage from '../assets/Inventory Management System (BuildStock).jpeg'
import appraisalTaskManagementImage from '../assets/Appraisal & Task Management System.jpeg'

export function HomePage() {
  const heroRef = useGsapReveal<HTMLDivElement>({ y: 60 })
  const trustBarRef = useGsapReveal<HTMLDivElement>({ delay: 0.05 })
  const pillarsRef = useGsapReveal<HTMLDivElement>({ delay: 0.1 })
  const trustRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 })
  const projectsRef = useGsapReveal<HTMLDivElement>({ delay: 0.2 })
  const aboutRef = useGsapReveal<HTMLDivElement>({ delay: 0.25 })

  const [activeDemoIndex, setActiveDemoIndex] = useState(0)
  const [isDemoPaused, setIsDemoPaused] = useState(false)
  const [activeArmIndex, setActiveArmIndex] = useState(0)
  const [armAutoRotate, setArmAutoRotate] = useState(true)

  // Advance the hero demo reel, restarting the timer on each change so the
  // progress bar stays in sync. Pauses while the user hovers the widget.
  useEffect(() => {
    if (demoWidgets.length <= 1 || isDemoPaused) return

    const timeout = setTimeout(() => {
      setActiveDemoIndex((prev) => (prev + 1) % demoWidgets.length)
    }, 7000)

    return () => clearTimeout(timeout)
  }, [activeDemoIndex, isDemoPaused])

  useEffect(() => {
    if (onebitArms.length <= 1 || !armAutoRotate) return

    const interval = setInterval(() => {
      setActiveArmIndex((prev) => (prev + 1) % onebitArms.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [armAutoRotate])

  // Tracks the cursor within a card so the CSS spotlight glow follows it.
  const handleSpotlight = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  // Handler for manual tab selection
  const handleArmTabChange = (key: string) => {
    const index = onebitArms.findIndex((arm) => arm.key === key)
    if (index !== -1) {
      setActiveArmIndex(index)
      setArmAutoRotate(false) // Stop auto-rotation when user manually selects
      // Resume auto-rotation after 10 seconds of inactivity
      setTimeout(() => setArmAutoRotate(true), 10000)
    }
  }

  const activeArm = onebitArms[activeArmIndex]

  return (
    <div className="space-y-24">
      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        <HeroConstellation className="absolute inset-0 -z-10 h-full w-full opacity-70 dark:opacity-90" />
        <div className="animate-floaty pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="animate-floaty pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full bg-brand-teal/10 blur-3xl [animation-delay:3s]" />
        <div className="container relative grid gap-10 py-16 md:grid-cols-2 md:items-center lg:gap-16 lg:py-24">
          <div className="space-y-6 lg:space-y-8 max-w-xl" data-animate>
            <p className="eyebrow">Onebit Hub</p>
            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-white md:text-5xl lg:text-[4rem]">
              <DecodeText text="Build. Learn." className="grad-text" />
              <br />
              <DecodeText text="Grow. Lead." speed={34} />
            </h1>
            <p className="max-w-md text-base leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg">
              One unit of technology — the systems it builds, the people it grows, and the
              opportunities it opens. Africa-first, built to a global standard.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Magnetic>
                <Button asChild size="lg" className="text-sm md:text-base px-5 md:px-6">
                  <Link to="/contact">Get Started with Onebit</Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="secondary" className="text-sm md:text-base px-5 md:px-6">
                  <Link to="/build/projects" className="inline-flex items-center gap-2">
                    Explore Our Work <ArrowUpRight size={16} />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="icon" variant="ghost" className="border border-white/10 bg-white/40">
                <Link to="/build/demo">
                  <Play size={16} />
                </Link>
              </Button>
            </div>
            <div className="grid gap-2 rounded border border-neutral-900/10 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-neutral-900/70">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Onebit in three moves
              </p>
              <div className="grid gap-2 md:grid-cols-3">
                {heroPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded bg-neutral-50 px-3 py-2 text-[0.7rem] font-medium text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:bg-neutral-900/70 dark:text-neutral-100"
                    data-animate
                  >
                    <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-brand-teal/80">
                      {pillar.title}
                    </span>
                    <span className="mt-1 block text-[0.65rem] text-neutral-600 dark:text-neutral-300">
                      {pillar.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="glow-border relative space-y-5 rounded border border-neutral-900/10 bg-gradient-to-b from-white/80 to-white/40 p-5 shadow-card transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(90,79,224,0.25)] dark:border-white/10 dark:from-neutral-900/80 dark:to-neutral-900/60"
            data-animate
            onMouseEnter={() => setIsDemoPaused(true)}
            onMouseLeave={() => setIsDemoPaused(false)}
          >
            <div className="pointer-events-none absolute inset-x-8 -top-6 h-20 rounded bg-gradient-to-r from-brand-primary/15 via-brand-teal/10 to-brand-primary/15 blur-2xl" />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">Live demo reel</p>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 md:text-sm">
                  Rotate through build, learn, and bridge experiences.
                </p>
              </div>
              <div className="flex gap-2">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded border border-white/40 bg-white/60 px-3 py-1.5 text-right text-[0.65rem] dark:border-white/10 dark:bg-white/10"
                  >
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white md:text-sm">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="text-[0.55rem] uppercase tracking-[0.25em] text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-2 h-[320px] overflow-hidden rounded border border-neutral-900/10 bg-neutral-950/90 text-white shadow-inner md:h-[340px]">
              {demoWidgets.map((demo, index) => {
                const isActive = index === activeDemoIndex
                return (
                  <article
                    key={demo.slug}
                    className={`absolute inset-0 flex flex-col justify-between p-6 transition-all duration-700 ease-out ${isActive
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-6 opacity-0'
                      }`}
                  >
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em]">
                        <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand-teal" />
                        <span>Interactive sandbox</span>
                      </div>
                      <h2 className="text-xl font-semibold leading-snug md:text-2xl">{demo.title}</h2>
                      <p className="max-w-md text-xs text-white/80 md:text-sm">{demo.description}</p>
                      <DemoReelVisual index={index} active={isActive} />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        to={demo.href}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition-colors hover:text-brand-primary"
                      >
                        Open full demo
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                      <div className="flex items-center gap-1.5">
                        {demoWidgets.map((dot, dotIndex) => (
                          <button
                            key={dot.slug}
                            type="button"
                            onClick={() => setActiveDemoIndex(dotIndex)}
                            aria-label={`Show ${dot.title}`}
                            aria-current={dotIndex === activeDemoIndex}
                            className={`h-1.5 rounded-full transition-all duration-300 ${dotIndex === activeDemoIndex
                              ? 'w-5 bg-brand-teal'
                              : 'w-1.5 bg-white/30 hover:bg-white/60'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
              <div
                key={activeDemoIndex}
                className="demo-progress-bar h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-teal"
                style={{ animationPlayState: isDemoPaused ? 'paused' : 'running' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={trustBarRef}
        className="border-y border-neutral-900/5 bg-surface py-4 dark:border-white/5 dark:bg-neutral-950"
      >
        <div className="container space-y-4" data-animate>
          <div className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-neutral-700 shadow-sm dark:bg-neutral-900/80 dark:text-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              TRUSTED BY TEAMS ACROSS AFRICA
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {trustedBy.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center rounded border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-500 shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={trustRef}
        className="relative w-full overflow-hidden bg-surface py-16 dark:bg-neutral-950/90 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <img
            src={worldMapDots}
            alt="World map"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="container relative space-y-10 lg:space-y-12">
          <div className="mx-auto max-w-3xl space-y-3 text-center" data-animate>
            <p className="eyebrow">Why Onebit?</p>
            <h2 className="animate-gradient-text bg-gradient-to-r from-indigo-600 via-emerald-500 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-[2.5rem]">
              Engineered intelligence, built for people.
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 md:text-base">
              We partner with ambitious teams to design resilient systems, upscale their people, and connect finished
              talent to opportunities.
            </p>
          </div>

          {/* Large swapping visual for the active arm */}
          <div
            className="relative overflow-hidden rounded-2xl border border-neutral-900/10 shadow-card dark:border-white/10"
            data-animate
          >
            <div className="relative aspect-[16/10] w-full bg-neutral-900 sm:aspect-[16/8] lg:aspect-[16/6]">
              {onebitArms.map((arm) => (
                <div
                  key={arm.key}
                  aria-hidden={arm.key !== activeArm.key}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    arm.key === activeArm.key ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className={`arm-visual arm-visual--${arm.key}`} />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand-teal" />
                {activeArm.label}
              </div>
            </div>
          </div>

          {/* Stepped progress-bar navigation */}
          <div className="grid grid-cols-3 gap-4 md:gap-6" data-animate>
            {onebitArms.map((arm, index) => {
              const isActive = index === activeArmIndex
              return (
                <button
                  key={arm.key}
                  type="button"
                  onClick={() => handleArmTabChange(arm.key)}
                  aria-label={`Show ${arm.label}`}
                  aria-current={isActive}
                  className="group text-left"
                >
                  <span className="block h-1 w-full overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/15">
                    {isActive && (
                      <span
                        key={activeArmIndex}
                        style={{ animationPlayState: armAutoRotate ? 'running' : 'paused' }}
                        className="arm-progress-bar block h-full w-full rounded-full bg-gradient-to-r from-brand-primary to-brand-teal"
                      />
                    )}
                  </span>
                  <span className="mt-3 flex items-center gap-2 text-xs font-semibold">
                    <span className={isActive ? 'text-brand-primary dark:text-brand-teal' : 'text-neutral-400 dark:text-neutral-500'}>
                      0{index + 1}
                    </span>
                    <span
                      className={`uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? 'text-neutral-900 dark:text-white'
                          : 'text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500'
                      }`}
                    >
                      {arm.key}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active step details */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:items-center" data-animate>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal/80 lg:text-sm">
                {activeArm.label}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                {activeArm.heading}
              </h3>
              <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-200 md:text-base lg:max-w-xl">
                {activeArm.description}
              </p>
              <div className="mt-6">
                <Link
                  to={activeArm.href}
                  className="group inline-flex items-center text-sm font-semibold text-brand-primary dark:text-brand-teal"
                >
                  <span className="relative inline-flex items-center gap-2 rounded-full border border-transparent px-0 py-0 text-sm transition group-hover:border-brand-primary group-hover:bg-brand-primary/5 group-hover:px-3 group-hover:py-1 dark:group-hover:border-brand-teal">
                    <span>{activeArm.cta}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </div>
            </div>
            <div className="grid gap-4 rounded-xl bg-gradient-primary p-6 text-xs text-white shadow-glow-indigo sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {activeArm.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="font-mono text-base font-bold md:text-lg lg:text-xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={pillarsRef} className="container space-y-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From idea to intelligent systems and career-ready talent."
          description="Three connected steps—build the system, train the people, bridge them to opportunity."
          align="center"
        />
        <ArmFlow />
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <TiltCard
              key={pillar.title}
              max={6}
              className="glow-border spotlight-card group relative flex flex-col justify-between rounded-xl border border-neutral-900/10 bg-white/80 p-5 text-left shadow-soft hover:border-brand-primary/40 hover:bg-white hover:shadow-card dark:border-white/10 dark:bg-neutral-900/80 dark:hover:border-brand-teal/50"
              data-animate
            >
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-brand-teal/80">
                  {pillar.title.split(' — ')[0]}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900 transition group-hover:text-brand-primary dark:text-white dark:group-hover:text-brand-teal">
                  {pillar.title.split(' — ')[1]}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 line-clamp-3 group-hover:line-clamp-none dark:text-neutral-300">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-6 rounded-full bg-brand-primary/80 group-hover:w-10 group-hover:bg-brand-primary" />
                  <span className="h-1.5 w-4 rounded-full bg-brand-teal/70 group-hover:w-7 group-hover:bg-brand-teal" />
                  <span className="h-1.5 w-3 rounded-full bg-brand-warm/70 group-hover:w-5 group-hover:bg-brand-warm" />
                </div>
                <Link
                  to={pillar.href}
                  className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-brand-primary group-hover:gap-2 dark:text-brand-teal"
                >
                  {pillar.cta}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Real Stories, Real Outcomes"
          title="The Impact of Building with Onebit"
          description="From systems to skills to real career opportunities, Onebit equips teams and talents to operate on a higher level. Here’s how our work is transforming their processes, performance, and potential."
          align="center"
        />
        <div data-animate>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
        <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-white shadow-glow-indigo [background-image:var(--gradient-brand),var(--gradient-spark)]" data-animate>
          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] md:items-center">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                Trusted delivery & talent partner
              </p>
              <p className="text-lg leading-relaxed">“{featuredTestimonial.quote}”</p>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{featuredTestimonial.name}</p>
                <p className="text-xs text-white/80">{featuredTestimonial.role}</p>
              </div>
            </div>
            <div className="space-y-3 rounded bg-white/10 p-4 text-xs text-white/85">
              {featuredTestimonial.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="relative w-full overflow-hidden bg-ink-950 py-16">
        <Aurora />
        <div
          className="pointer-events-none absolute inset-0 text-white/[0.05] [background-image:radial-gradient(currentColor_1.1px,transparent_1.1px)] [background-size:26px_26px]"
          aria-hidden
        />
        <div className="container relative space-y-16">
          {/* Build Projects Section */}
          <div className="space-y-8">
            <div className="max-w-3xl text-white">
              <h2 className="text-3xl font-bold md:text-4xl lg:text-[2.5rem]">
                Build: Enterprise Solutions
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/80">
                Transformative technology solutions for forward-thinking businesses. Explore our portfolio of enterprise-grade applications.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectCards.map((project) => {
                const imageMap: Record<string, string> = {
                  'Credit Intelligence Platform': creditIntelligenceImage,
                  'Demand Forecasting Engine': demandForecastingImage,
                  'HR Workflow Automation System': hrWorkflowAutomationImage,
                  'HR Application (WorkforceCore)': hrApplicationWorkforceCoreImage,
                  'Inventory Management System (BuildStock)': inventoryManagementBuildStockImage,
                  'Appraisal & Task Management System': appraisalTaskManagementImage,
                }

                const imageSrc = imageMap[project.title]

                return (
                  <div key={project.title} className="group relative h-full">
                    <TiltCard
                      max={5}
                      className="spotlight-card glow-border relative flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50"
                      data-animate
                    >
                      {/* Image area */}
                      <div className="relative z-10 h-36 w-full overflow-hidden bg-gradient-to-tr from-brand-primary/20 via-brand-teal/10 to-brand-primary/30">
                        {imageSrc && (
                          <img
                            src={imageSrc}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                          {project.category}
                        </div>
                      </div>

                      {/* Text content area */}
                      <div className="relative z-10 flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{project.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>
                        <div className="mt-4">
                          <Link
                            to="/build/projects"
                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary px-0 py-0 transition-all group-hover:rounded-full group-hover:border group-hover:border-brand-primary group-hover:bg-white group-hover:px-3 group-hover:py-1 focus-visible:rounded-full focus-visible:border focus-visible:border-brand-primary focus-visible:bg-white focus-visible:px-3 focus-visible:py-1 focus-visible:outline-none"
                          >
                            <span>View case study</span>
                            <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Learn & Bridge Section */}
          <div className="space-y-8">
            <div className="max-w-3xl text-white">
              <h2 className="text-3xl font-bold md:text-4xl lg:text-[2.5rem]">
                What best suits your needs?
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/80">
                Whether you're looking to enhance your skills or find top tech talent, we have the perfect solution for you.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Learn Card */}
              <div
                onMouseMove={handleSpotlight}
                className="spotlight-card glow-border group relative overflow-hidden rounded border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-lg dark:from-neutral-900 dark:to-neutral-900/80 dark:hover:border-brand-teal/30"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-teal/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-brand-teal/10 px-4 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-teal"></span>
                    <span className="text-sm font-medium text-brand-teal">Learn</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Upskill with Our Programs</h3>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                    Join our immersive learning programs designed to make you job-ready. Gain in-demand skills through hands-on projects and expert mentorship.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/learn"
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal px-0 py-0 transition-all group-hover:rounded-full group-hover:border group-hover:border-brand-teal group-hover:bg-white group-hover:px-3 group-hover:py-1 focus-visible:rounded-full focus-visible:border focus-visible:border-brand-teal focus-visible:bg-white focus-visible:px-3 focus-visible:py-1 focus-visible:outline-none"
                    >
                      <span>Explore learning paths</span>
                      <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Build Card */}
              <div
                onMouseMove={handleSpotlight}
                className="spotlight-card glow-border group relative overflow-hidden rounded border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg dark:from-neutral-900 dark:to-neutral-900/80 dark:hover:border-brand-primary/30"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-brand-primary/10 px-4 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                    <span className="text-sm font-medium text-brand-primary">Build</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Build Scalable Solutions</h3>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                    Turn your vision into reality. Our expert team leverages the latest technologies to build, test, and launch scalable digital products efficiently.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/bridge"
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary px-0 py-0 transition-all group-hover:rounded-full group-hover:border group-hover:border-brand-primary group-hover:bg-white group-hover:px-3 group-hover:py-1 focus-visible:rounded-full focus-visible:border focus-visible:border-brand-primary focus-visible:bg-white focus-visible:px-3 focus-visible:py-1 focus-visible:outline-none"
                    >
                      <span>Build with Onebit</span>
                      <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="container relative overflow-hidden rounded-xl border border-white/10 bg-ink-950 p-10 text-white shadow-card">
        <Aurora />
        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div data-animate>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">About Onebit</p>
            <h3 className="mt-3 text-3xl font-semibold">Building technology. Developing people. Connecting opportunity.</h3>
            <p className="mt-4 text-white/80">
              We are a technology company focused on building world-class systems, training people to thrive in tech roles,
              and bridging the gap between talent and opportunity.
            </p>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-6" data-animate>
            <p className="text-sm text-white/80">Need a partner for your digital roadmap?</p>
            <h4 className="mt-2 text-2xl font-semibold">Let’s architect the future together.</h4>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild variant="secondary">
                <Link to="/contact">Book a Discovery Call</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/about">Meet the team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
