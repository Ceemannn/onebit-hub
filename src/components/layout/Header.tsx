import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, SunMedium, Moon, ArrowRight, X, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils.ts'
import { useTheme } from '../../context/theme.tsx'
import { buttonVariants } from '../ui/button.tsx'
import { gsap } from '../../lib/gsap.ts'

type MegaMenuKey = 'build' | 'learn' | 'bridge'

type NavLinkDef = { label: string; to: string; mega?: MegaMenuKey }

const navLinks: NavLinkDef[] = [
  { label: 'Build', to: '/build/projects', mega: 'build' },
  { label: 'Learn', to: '/learn/individuals', mega: 'learn' },
  { label: 'Bridge', to: '/bridge', mega: 'bridge' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const menuIds: Record<MegaMenuKey, string> = {
  build: 'mega-build-menu',
  learn: 'mega-learn-menu',
  bridge: 'mega-bridge-menu',
}

const buildMenu = [
  {
    label: 'Projects',
    to: '/build/projects',
    description: 'Explore our portfolio of enterprise systems and AI solutions'
  },
  {
    label: 'Services',
    to: '/build/services',
    description: 'End-to-end technology consulting and implementation'
  },
  {
    label: 'Demo',
    to: '/build/demo',
    description: 'Interactive demonstrations of our solutions in action'
  },
]

const learnMenu = [
  {
    label: 'For Individuals',
    to: '/learn/individuals',
    description: 'Job-ready tech education with real-world projects'
  },
  {
    label: 'For Corporations',
    to: '/learn/corporations',
    description: 'Custom training programs for your entire team'
  },
]

const bridgeMenu = [
  {
    label: 'For Talent',
    items: [
      {
        label: 'Apply for Opportunities',
        to: '/bridge#talent',
        description: 'Join our network of vetted professionals'
      },
      {
        label: 'Get Verified',
        to: '/bridge#talent',
        description: 'Complete our skills verification process'
      }, {
        label: 'Join Accelerator',
        to: '/bridge#talent',
        description: 'Fast-track your career with mentorship'
      },
    ],
  },
  {
    label: 'For Companies',
    items: [
      {
        label: 'Hire Tech Talent',
        to: '/bridge#companies',
        description: 'Access pre-vetted, job-ready professionals'
      },
      {
        label: 'Request Screening',
        to: '/bridge#companies',
        description: 'Custom talent screening for your needs'
      },
      {
        label: 'Corporate Training',
        to: '/bridge#companies',
        description: 'Upskill your team with tailored programs'
      },
    ],
  },
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [megaMenu, setMegaMenu] = useState<MegaMenuKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<MegaMenuKey | null>(null)
  const menuRefs: Record<MegaMenuKey, React.RefObject<HTMLDivElement | null>> = {
    build: useRef<HTMLDivElement>(null),
    learn: useRef<HTMLDivElement>(null),
    bridge: useRef<HTMLDivElement>(null),
  }
  const timelineRefs = useRef<Partial<Record<MegaMenuKey, gsap.core.Timeline>>>({})
  const closeTimerRef = useRef<number | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setMegaMenu(null)
    }, 500)
  }, [clearCloseTimer])

  const handleOpen = useCallback(
    (key: MegaMenuKey | null) => {
      clearCloseTimer()

      // If switching from one menu to another, instantly close the current one
      if (megaMenu && key && megaMenu !== key) {
        const currentTl = timelineRefs.current[megaMenu]
        if (currentTl) {
          currentTl.progress(0).pause() // Instantly reset the old menu
        }
      }

      if (!key) return setMegaMenu(null)
      setMegaMenu(key)
    },
    [clearCloseTimer, megaMenu],
  )

  useEffect(() => {
    const keys: MegaMenuKey[] = ['build', 'learn', 'bridge']
    const ctx = gsap.context(() => {
      keys.forEach((key) => {
        try {
          const el = menuRefs[key].current
          if (!el) return
          const items = el.querySelectorAll<HTMLElement>('[data-menu-item]')
          gsap.set(el, { autoAlpha: 0, y: 12, scale: 0.97, transformOrigin: '50% 0%' })
          gsap.set(items, { autoAlpha: 0, y: 8 })

          const tl = gsap
            .timeline({ paused: true, defaults: { ease: 'power2.out' } })
            .to(el, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3 }, 0)
            .to(
              items,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
              },
              0.05,
            )

          timelineRefs.current[key] = tl
        } catch (error) {
          console.error('Mega menu timeline error', error)
        }
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const keys: MegaMenuKey[] = ['build', 'learn', 'bridge']
    keys.forEach((key) => {
      const tl = timelineRefs.current[key]
      if (!tl) return
      if (megaMenu === key) {
        // Play the animation for the active menu
        tl.play()
      } else {
        // Quickly reverse inactive menus (faster close)
        tl.timeScale(2).reverse()
      }
    })
  }, [megaMenu])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpen(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl dark:bg-neutral-950/80">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-brand-primary">Onebit</span> Hub
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.mega && handleOpen(link.mega)}
              onMouseLeave={() => link.mega && scheduleClose()}
              onFocus={() => link.mega && setMegaMenu(link.mega ?? null)}
              onBlur={() => link.mega && scheduleClose()}
              onTouchStart={(event) => {
                if (!link.mega) return
                event.preventDefault()
                handleOpen(link.mega)
              }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn('transition-colors hover:text-brand-primary', isActive && 'text-brand-primary')
                }
                aria-haspopup={link.mega ? 'true' : undefined}
                aria-expanded={link.mega ? megaMenu === link.mega : undefined}
                aria-controls={link.mega ? menuIds[link.mega] : undefined}
                onClick={(event) => {
                  if (!link.mega) return
                  event.preventDefault()
                  handleOpen(link.mega)
                }}
                onFocus={() => link.mega && handleOpen(link.mega)}
                onBlur={() => link.mega && scheduleClose()}
                onMouseEnter={() => link.mega && handleOpen(link.mega)}
                onMouseLeave={() => link.mega && scheduleClose()}
                onTouchStart={(event) => {
                  if (!link.mega) return
                  event.preventDefault()
                  handleOpen(link.mega)
                }}
              >
                {link.label}
              </NavLink>

              {link.mega === 'build' && (
                <MegaMenuBuild
                  ref={menuRefs.build}
                  isActive={megaMenu === 'build'}
                  menuKey="build"
                  menuId={menuIds.build}
                  onInteractStart={handleOpen}
                  onInteractEnd={scheduleClose}
                />
              )}
              {link.mega === 'learn' && (
                <MegaMenuLearn
                  ref={menuRefs.learn}
                  isActive={megaMenu === 'learn'}
                  menuKey="learn"
                  menuId={menuIds.learn}
                  onInteractStart={handleOpen}
                  onInteractEnd={scheduleClose}
                />
              )}
              {link.mega === 'bridge' && (
                <MegaMenuBridge
                  ref={menuRefs.bridge}
                  isActive={megaMenu === 'bridge'}
                  menuKey="bridge"
                  menuId={menuIds.bridge}
                  onInteractStart={handleOpen}
                  onInteractEnd={scheduleClose}
                />
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-neutral-900/10 p-2 text-neutral-700 transition hover:text-brand-primary dark:border-white/10 dark:text-white"
          >
            {theme === 'light' ? <Moon size={18} /> : <SunMedium size={18} />}
          </button>
          <Link to="/contact" className={cn(buttonVariants({ size: 'sm' }), 'shadow-soft')}>Book a Call</Link>
        </div>

        <button
          className="rounded-full border border-neutral-900/10 p-2 text-neutral-700 dark:border-white/10 dark:text-neutral-200 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-[65px] z-40 bg-surface/98 backdrop-blur-xl transition-all duration-300 md:hidden dark:bg-neutral-950/98',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container h-full overflow-y-auto py-6">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.mega ? (
                  // Expandable menu item
                  <div className="rounded-xl border border-neutral-200 bg-white/80 dark:border-neutral-800 dark:bg-neutral-900/80">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.mega ? null : link.mega!)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-neutral-900 dark:text-white"
                      aria-expanded={mobileExpanded === link.mega}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          'text-neutral-500 transition-transform duration-200',
                          mobileExpanded === link.mega && 'rotate-180'
                        )}
                      />
                    </button>
                    {/* Expanded content */}
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200',
                        mobileExpanded === link.mega ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        {link.mega === 'build' && (
                          <div className="space-y-2">
                            {buildMenu.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg p-3 text-sm transition-colors hover:bg-brand-primary/5"
                              >
                                <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                              </Link>
                            ))}
                          </div>
                        )}
                        {link.mega === 'learn' && (
                          <div className="space-y-2">
                            {learnMenu.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg p-3 text-sm transition-colors hover:bg-brand-primary/5"
                              >
                                <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                              </Link>
                            ))}
                          </div>
                        )}
                        {link.mega === 'bridge' && (
                          <div className="space-y-4">
                            {bridgeMenu.map((group) => (
                              <div key={group.label}>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">{group.label}</p>
                                <div className="space-y-1">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      to={item.to}
                                      onClick={() => setMobileOpen(false)}
                                      className="block rounded-lg p-2 text-sm transition-colors hover:bg-brand-primary/5"
                                    >
                                      <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Simple link
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 font-medium transition-colors dark:border-neutral-800 dark:bg-neutral-900/80',
                        isActive
                          ? 'border-brand-primary/30 bg-brand-primary/5 text-brand-primary'
                          : 'text-neutral-900 hover:border-brand-primary/20 dark:text-white'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile footer actions */}
          <div className="mt-6 space-y-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ size: 'lg' }), 'w-full justify-center')}
            >
              Book a Discovery Call
            </Link>
            <button
              onClick={() => {
                toggleTheme()
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            >
              {theme === 'light' ? <Moon size={16} /> : <SunMedium size={16} />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

type MegaShellProps = {
  children: React.ReactNode
  isActive: boolean
  menuKey: MegaMenuKey
  menuId: string
  onInteractStart: (key: MegaMenuKey) => void
  onInteractEnd: () => void
}

const MegaShell = forwardRef<HTMLDivElement, MegaShellProps>(
  ({ children, isActive, menuKey, menuId, onInteractStart, onInteractEnd }, ref) => {
    return (
      <div
        ref={ref}
        id={menuId}
        role="menu"
        aria-hidden={!isActive}
        aria-label={`${menuKey} menu`}
        data-state={isActive ? 'open' : 'closed'}
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        className="absolute left-1/2 top-full mt-4 hidden w-[900px] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-8 shadow-2xl shadow-brand-primary/5 dark:border-neutral-800 dark:bg-neutral-950 md:block"
        onMouseEnter={() => onInteractStart(menuKey)}
        onMouseLeave={onInteractEnd}
        onFocusCapture={() => onInteractStart(menuKey)}
        onBlurCapture={onInteractEnd}
        onTouchStart={() => onInteractStart(menuKey)}
      >
        {children}
      </div>
    )
  },
)
MegaShell.displayName = 'MegaShell'

type MegaMenuProps = {
  isActive: boolean
  menuKey: MegaMenuKey
  menuId: string
  onInteractStart: (key: MegaMenuKey) => void
  onInteractEnd: () => void
}

const MegaMenuBuild = forwardRef<HTMLDivElement, MegaMenuProps>(({ isActive, menuKey, menuId, onInteractStart, onInteractEnd }, ref) => {
  return (
    <MegaShell
      ref={ref}
      isActive={isActive}
      menuKey={menuKey}
      menuId={menuId}
      onInteractStart={onInteractStart}
      onInteractEnd={onInteractEnd}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-2">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500" data-menu-item>
            Our Solutions
          </p>
          <div className="grid gap-1">
            {buildMenu.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-menu-item
                role="menuitem"
                className="group rounded-lg p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
              >
                <div className="mb-1 font-semibold text-neutral-900 group-hover:text-brand-primary dark:text-white">
                  {item.label}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Content - 1 column */}
        <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-brand-primary/5 to-transparent p-6 dark:border-neutral-800" data-menu-item>
          <div className="mb-3 inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
            Featured
          </div>
          <h4 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
            Book a Consultation
          </h4>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Let's discuss how we can help transform your business with AI and automation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3 transition-all"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </MegaShell>
  )
})
MegaMenuBuild.displayName = 'MegaMenuBuild'

const MegaMenuLearn = forwardRef<HTMLDivElement, MegaMenuProps>(({ isActive, menuKey, menuId, onInteractStart, onInteractEnd }, ref) => {
  return (
    <MegaShell
      ref={ref}
      isActive={isActive}
      menuKey={menuKey}
      menuId={menuId}
      onInteractStart={onInteractStart}
      onInteractEnd={onInteractEnd}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-2">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500" data-menu-item>
            Education Programs
          </p>
          <div className="grid gap-1">
            {learnMenu.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-menu-item
                role="menuitem"
                className="group rounded-lg p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
              >
                <div className="mb-1 font-semibold text-neutral-900 group-hover:text-brand-primary dark:text-white">
                  {item.label}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Content - 1 column */}
        <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-accent-aqua/5 to-transparent p-6 dark:border-neutral-800" data-menu-item>
          <div className="mb-3 inline-flex rounded-full bg-accent-aqua/10 px-3 py-1 text-xs font-semibold text-accent-aqua">
            Next Cohort
          </div>
          <h4 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
            Join Our Next Program
          </h4>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Limited spots available. Start your journey to becoming job-ready in weeks.
          </p>
          <Link
            to="/learn/individuals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-aqua hover:gap-3 transition-all"
          >
            Enroll Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </MegaShell>
  )
})
MegaMenuLearn.displayName = 'MegaMenuLearn'

const MegaMenuBridge = forwardRef<HTMLDivElement, MegaMenuProps>(({ isActive, menuKey, menuId, onInteractStart, onInteractEnd }, ref) => {
  return (
    <MegaShell
      ref={ref}
      isActive={isActive}
      menuKey={menuKey}
      menuId={menuId}
      onInteractStart={onInteractStart}
      onInteractEnd={onInteractEnd}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 grid grid-cols-2 gap-8">
          {bridgeMenu.map((group) => (
            <div key={group.label} data-menu-item>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                {group.label}
              </p>
              <div className="grid gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    data-menu-item
                    role="menuitem"
                    className="group rounded-lg p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                  >
                    <div className="mb-1 font-semibold text-neutral-900 group-hover:text-brand-primary dark:text-white">
                      {item.label}
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Content - 1 column */}
        <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-accent-indigo/5 to-transparent p-6 dark:border-neutral-800" data-menu-item>
          <div className="mb-3 inline-flex rounded-full bg-accent-indigo/10 px-3 py-1 text-xs font-semibold text-accent-indigo">
            Talent Network
          </div>
          <h4 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
            Hire Vetted Talent
          </h4>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Access our network of pre-screened, job-ready professionals today.
          </p>
          <Link
            to="/bridge#companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-indigo hover:gap-3 transition-all"
          >
            View Talent Pool
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </MegaShell>
  )
})
MegaMenuBridge.displayName = 'MegaMenuBridge'
