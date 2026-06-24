import { Link } from 'react-router-dom'
import { Mark } from '../shared/Logo.tsx'

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

type FooterLink = { label: string; to: string; comingSoon?: boolean }
const columns: { heading: string; accent: string; links: FooterLink[] }[] = [
  { heading: 'Build', accent: 'bg-arm-build', links: buildLinks },
  { heading: 'Learn', accent: 'bg-arm-learn', links: learnLinks },
  { heading: 'Bridge', accent: 'bg-arm-bridge', links: bridgeLinks },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-950 py-16 text-sm text-neutral-400">
      {/* Faint node-grid watermark */}
      <div
        className="pointer-events-none absolute inset-0 text-white/[0.06] [background-image:radial-gradient(currentColor_1.1px,transparent_1.1px)] [background-size:24px_24px]"
        aria-hidden
      />
      <div className="container relative">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Onebit Hub">
              <Mark size={32} />
              <span className="font-heading text-2xl font-bold tracking-[-0.04em] text-white">onebit</span>
            </Link>
            <p className="mt-4 max-w-sm leading-relaxed text-neutral-400">
              Building technology. Developing people. Connecting opportunity. Engineered
              intelligence, built for people — Africa-first, to a global standard.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
              Abuja, Nigeria · hello@onebit.io
            </p>
          </div>

          {/* Arm Columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white">
                <span className={`h-2 w-2 rounded-[3px] ${col.accent}`} />
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="inline-flex items-center gap-2 transition hover:text-white"
                    >
                      {link.label}
                      {link.comingSoon && (
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="font-mono text-xs tracking-[0.03em] text-neutral-500">
            © {new Date().getFullYear()} Onebit Digital Solutions. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {generalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-xs transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
