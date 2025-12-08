import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Play, ChevronUp, X, MessageCircle } from 'lucide-react'
import { cn } from '../../lib/utils.ts'

export function FloatingCta() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Hide on contact page since there's already a form
  const isContactPage = location.pathname === '/contact'

  // Show after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
      setShowScrollTop(scrollY > 800)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close expanded state on route change
  useEffect(() => {
    setIsExpanded(false)
  }, [location.pathname])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get context-aware CTA text based on current route
  const getCtaText = () => {
    if (location.pathname.startsWith('/build')) {
      return 'Start a Project'
    }
    if (location.pathname.startsWith('/learn')) {
      return 'Enroll Now'
    }
    if (location.pathname === '/bridge') {
      return 'Join Bridge'
    }
    return 'Book a Call'
  }

  if (isContactPage) return null

  return (
    <>
      {/* Mobile: Fixed bottom bar */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-lg px-4 py-3 transition-transform duration-300 md:hidden dark:border-neutral-800 dark:bg-neutral-950/95',
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary/90 active:scale-[0.98]"
          >
            <Phone size={16} />
            {getCtaText()}
          </Link>
          <Link
            to="/build/demo"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-brand-primary hover:text-brand-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
          >
            <Play size={14} />
            Demos
          </Link>
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all hover:border-brand-primary hover:text-brand-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
              aria-label="Scroll to top"
            >
              <ChevronUp size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop: Floating pill in bottom-right */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-40 hidden md:block transition-all duration-300',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        )}
      >
        {/* Expanded panel */}
        <div
          className={cn(
            'absolute bottom-full right-0 mb-3 w-64 origin-bottom-right rounded-2xl border border-neutral-200 bg-white p-4 shadow-card transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900',
            isExpanded ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Quick Actions</p>
            <button
              onClick={() => setIsExpanded(false)}
              className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
              aria-label="Close menu"
            >
              <X size={14} />
            </button>
          </div>
          <div className="space-y-2">
            <Link
              to="/contact"
              className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-brand-primary/5 hover:text-brand-primary dark:text-neutral-200 dark:hover:bg-brand-primary/10"
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <Phone size={14} />
              </div>
              <div>
                <p className="font-semibold">Book a Discovery Call</p>
                <p className="text-xs text-neutral-500">Free 30-min consultation</p>
              </div>
            </Link>
            <Link
              to="/build/demo"
              className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-brand-teal/5 hover:text-brand-teal dark:text-neutral-200 dark:hover:bg-brand-teal/10"
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                <Play size={14} />
              </div>
              <div>
                <p className="font-semibold">View Live Demos</p>
                <p className="text-xs text-neutral-500">Interactive sandboxes</p>
              </div>
            </Link>
            <a
              href="mailto:hello@onebit.io"
              className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-accent-aqua/5 hover:text-accent-aqua dark:text-neutral-200 dark:hover:bg-accent-aqua/10"
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-aqua/10 text-accent-aqua">
                <MessageCircle size={14} />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-xs text-neutral-500">hello@onebit.io</p>
              </div>
            </a>
          </div>
        </div>

        {/* Main floating button group */}
        <div className="flex items-center gap-2">
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-soft transition-all hover:border-brand-primary hover:text-brand-primary hover:-translate-y-0.5 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
              aria-label="Scroll to top"
            >
              <ChevronUp size={18} />
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-card transition-all hover:-translate-y-0.5',
              isExpanded
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-brand-primary text-white hover:bg-brand-primary/90'
            )}
            aria-expanded={isExpanded}
            aria-label="Toggle quick actions menu"
          >
            {isExpanded ? (
              <X size={16} />
            ) : (
              <>
                <MessageCircle size={16} />
                <span>Let's Talk</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
