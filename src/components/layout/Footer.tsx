import { Link } from 'react-router-dom'

const buildLinks = [
  { label: 'Services', to: '/build/services' },
  { label: 'Projects & Demos', to: '/build/projects' },
]

const learnLinks = [
  { label: 'For Individuals', to: '/learn/individuals' },
  { label: 'For Corporations', to: '/learn/corporations' },
]

const bridgeLinks = [
  { label: 'For Talent', to: '/coming-soon', comingSoon: true },
  { label: 'For Companies', to: '/coming-soon', comingSoon: true },
]

const generalLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Legal', to: '/legal' },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-900/5 bg-white/80 py-12 text-sm text-neutral-600 dark:border-white/5 dark:bg-neutral-950/80 dark:text-neutral-300">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center" aria-label="Onebit Hub">
              <img
                src="/onebit-logo-light.png"
                alt="Onebit"
                className="block h-9 w-auto dark:hidden"
                draggable={false}
              />
              <img
                src="/onebit-logo-dark.png"
                alt="Onebit"
                className="hidden h-9 w-auto dark:block"
                draggable={false}
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
              Modern enterprise technology, talent accelerators, and industry bridges built for ambitious teams.
            </p>
          </div>

          {/* Build Column */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Build
            </h4>
            <ul className="space-y-2">
              {buildLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition hover:text-brand-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Learn
            </h4>
            <ul className="space-y-2">
              {learnLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition hover:text-brand-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bridge Column */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Bridge
            </h4>
            <ul className="space-y-2">
              {bridgeLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="inline-flex items-center gap-2 transition hover:text-brand-primary">
                    {link.label}
                    {link.comingSoon && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-primary to-brand-indigo px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800 md:flex-row">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Onebit Hub. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {generalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-xs transition hover:text-brand-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
