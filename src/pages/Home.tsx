import { useEffect, useState } from 'react'
import { ArrowUpRight, Play, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button.tsx'
import { SectionHeading } from '../components/shared/SectionHeading.tsx'
import { SegmentedTabs } from '../components/shared/SegmentedTabs.tsx'
import DotGrid from '../components/shared/DotGrid.tsx'
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
  const [activeArmIndex, setActiveArmIndex] = useState(0)
  const [armAutoRotate, setArmAutoRotate] = useState(true)

  useEffect(() => {
    if (demoWidgets.length <= 1) return

    const interval = setInterval(() => {
      setActiveDemoIndex((prev) => (prev + 1) % demoWidgets.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (onebitArms.length <= 1 || !armAutoRotate) return

    const interval = setInterval(() => {
      setActiveArmIndex((prev) => (prev + 1) % onebitArms.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [armAutoRotate])

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

  // Prepare tabs data for SegmentedTabs
  const armTabs = onebitArms.map((arm) => ({
    key: arm.key,
    label: arm.key.charAt(0).toUpperCase() + arm.key.slice(1),
  }))

  return (
    <div className="space-y-24">
      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 -z-10 opacity-10">
          <DotGrid
            dotSize={5}
            gap={10}
            baseColor="#0C63FF"
            activeColor="#06B6D4"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            className="h-full w-full"
          />
        </div>
        <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="container relative grid gap-10 py-16 md:grid-cols-2 md:items-center lg:gap-16 lg:py-24">
          <div className="space-y-6 lg:space-y-8 max-w-xl" data-animate>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-brand-teal/80">
              Onebit Hub
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-5xl lg:text-6xl">
              Onebit - Build. Learn. Grow. Lead.
            </h1>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 md:text-base">
              Watch live sandboxes of our credit, HR, and forecasting systems while discovering the learning and
              talent engine behind them.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Button size="lg" className="shadow-card shadow-brand-primary/30 text-sm md:text-base px-5 md:px-6">
                Get Started with Onebit
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-sm md:text-base px-5 md:px-6">
                <Link to="/build/projects" className="inline-flex items-center gap-2">
                  Explore Our Work <ArrowUpRight size={16} />
                </Link>
              </Button>
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
            className="relative space-y-5 rounded border border-neutral-900/10 bg-gradient-to-b from-white/80 to-white/40 p-5 shadow-card dark:border-white/10 dark:from-neutral-900/80 dark:to-neutral-900/60"
            data-animate
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
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white md:text-sm">{stat.value}</p>
                    <p className="text-[0.55rem] uppercase tracking-[0.25em] text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-2 h-[240px] overflow-hidden rounded border border-neutral-900/10 bg-neutral-950/90 text-white shadow-inner md:h-[260px] lg:h-[280px]">
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
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                        <span>Interactive sandbox</span>
                      </div>
                      <h2 className="text-2xl font-semibold leading-snug">{demo.title}</h2>
                      <p className="max-w-md text-sm text-white/80">{demo.description}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        to={demo.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal hover:text-brand-primary"
                      >
                        Open full demo
                        <ArrowUpRight size={16} />
                      </Link>
                      <div className="flex items-center gap-2 text-[0.7rem] text-white/60">
                        {demoWidgets.map((_, dotIndex) => (
                          <span
                            key={dotIndex}
                            className={`h-1.5 w-1.5 rounded-full transition ${dotIndex === activeDemoIndex ? 'bg-brand-teal' : 'bg-white/30'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
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
        className="relative w-full min-h-screen overflow-hidden bg-surface py-12 dark:bg-neutral-950/90 flex items-center"
      >
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <img
            src={worldMapDots}
            alt="World map"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="container relative space-y-12 lg:space-y-14">
          <div className="max-w-3xl space-y-3" data-animate>
            {/* <p className="text-xs uppercase tracking-[0.35em] text-brand-teal/80">Why Onebit?</p> */}
            <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-brand-primary via-brand-teal to-brand-primary bg-clip-text drop-shadow-[0_0_22px_rgba(6,182,212,0.6)] md:text-4xl lg:text-[2.5rem]">
              Why Onebit?
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 md:text-base">
              We partner with ambitious teams to design resilient systems, upscale their people, and connect finished
              talent to opportunities.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.3fr)] md:items-center lg:gap-16">
            <div className="space-y-7 lg:space-y-8 max-w-xl" data-animate>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-3 rounded-lg bg-white/80 px-5 py-2.5 text-sm font-medium text-neutral-800 shadow-soft dark:bg-neutral-900/80 dark:text-neutral-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-brand-primary to-brand-teal text-white text-xs font-semibold">
                    OB
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-[0.32em] text-neutral-500">Onebit Hub</span>
                </div>
                <SegmentedTabs
                  tabs={armTabs}
                  activeKey={onebitArms[activeArmIndex].key}
                  onChange={handleArmTabChange}
                  size="sm"
                />
              </div>
              {(() => {
                const arm = onebitArms[activeArmIndex]
                return (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal/80 lg:text-sm">
                      {arm.label}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-white md:text-4xl lg:text-[2.6rem] lg:leading-tight">
                      {arm.heading}
                    </h2>
                    <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-200 md:text-base lg:max-w-xl">
                      {arm.description}
                    </p>
                    <div className="mt-5">
                      <Link
                        to={arm.href}
                        className="group inline-flex items-center text-sm font-semibold text-brand-primary dark:text-brand-teal"
                      >
                        <span className="relative inline-flex items-center gap-2 rounded-full border border-transparent px-0 py-0 text-sm transition group-hover:border-brand-primary group-hover:bg-brand-primary/5 group-hover:px-3 group-hover:py-1 dark:group-hover:border-brand-teal">
                          <span>{arm.cta}</span>
                          <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      </Link>
                    </div>
                  </>
                )
              })()}
            </div>
            <div className="space-y-5 lg:space-y-6" data-animate>
              <div
                className="relative overflow-hidden rounded border border-neutral-900/10 bg-neutral-900 p-0 text-white shadow-card dark:border-white/10 md:min-h-[280px] lg:min-h-[320px]"
              >
                {onebitArms[activeArmIndex].key === 'bridge' && <div className="arm-visual arm-visual--bridge" />}
                {onebitArms[activeArmIndex].key === 'build' && <div className="arm-visual arm-visual--build" />}
                {onebitArms[activeArmIndex].key === 'learn' && <div className="arm-visual arm-visual--learn" />}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              </div>
              <div className="grid gap-4 rounded bg-[#06B6D4]/90 p-5 text-xs text-white md:grid-cols-3">
                {onebitArms[activeArmIndex].stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-sm font-semibold md:text-base lg:text-lg">{stat.value}</p>
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/80">{stat.label}</p>
                  </div>
                ))}
              </div>
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
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <button
              key={pillar.title}
              type="button"
              className="group flex flex-col justify-between rounded border border-neutral-900/10 bg-white/80 p-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-brand-primary/40 hover:bg-white hover:shadow-card dark:border-white/10 dark:bg-neutral-900/80 dark:hover:border-brand-teal/50"
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
            </button>
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
        <div className="relative overflow-hidden rounded" data-animate>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-neutral-950" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-neutral-950" />
          <div className="testimonials-marquee flex gap-6 md:gap-8">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex h-full min-w-[260px] max-w-sm flex-col justify-between rounded-lg border border-neutral-200 bg-white p-6 text-left shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:border-brand-teal/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)] dark:border-white/10 dark:bg-neutral-900/90"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Quote size={16} />
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-200">“{item.quote}”</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.role}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-100 pt-4 text-xs text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">{item.metricValueLeft}</p>
                    <p>{item.metricLabelLeft}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">{item.metricValueRight}</p>
                    <p>{item.metricLabelRight}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded border border-brand-primary/20 bg-gradient-to-r from-brand-primary/90 via-brand-teal/90 to-brand-primary/90 p-8 text-white shadow-card" data-animate>
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

      <section ref={projectsRef} className="relative w-full bg-[#329A92] py-16">
        <div className="container space-y-16">
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
                  <div key={project.title} className="magnetic-card group relative h-full">
                    <article
                      className="relative flex h-full flex-col overflow-hidden rounded border border-neutral-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50"
                      data-animate
                    >
                      {/* Image area */}
                      <div className="relative h-36 w-full overflow-hidden bg-gradient-to-tr from-brand-primary/20 via-brand-teal/10 to-brand-primary/30">
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
                      <div className="flex flex-1 flex-col p-5">
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
                    </article>
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
              <div className="group relative overflow-hidden rounded border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 transition-all hover:border-brand-teal/50 hover:shadow-lg dark:from-neutral-900 dark:to-neutral-900/80 dark:hover:border-brand-teal/30">
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

              {/* Bridge Card */}
              <div className="group relative overflow-hidden rounded border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 transition-all hover:border-brand-primary/50 hover:shadow-lg dark:from-neutral-900 dark:to-neutral-900/80 dark:hover:border-brand-primary/30">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-brand-primary/10 px-4 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                    <span className="text-sm font-medium text-brand-primary">Bridge</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Hire Top Tech Talent</h3>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                    Access a curated pool of vetted tech professionals trained in the latest technologies and ready to contribute from day one.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/bridge"
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary px-0 py-0 transition-all group-hover:rounded-full group-hover:border group-hover:border-brand-primary group-hover:bg-white group-hover:px-3 group-hover:py-1 focus-visible:rounded-full focus-visible:border focus-visible:border-brand-primary focus-visible:bg-white focus-visible:px-3 focus-visible:py-1 focus-visible:outline-none"
                    >
                      <span>Find your next hire</span>
                      <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="container rounded border border-neutral-900/10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-10 text-white shadow-card">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
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
