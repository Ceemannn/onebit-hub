import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Build', to: '/build/projects' },
  { label: 'Learn', to: '/learn/individuals' },
  { label: 'Bridge', to: '/bridge' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Legal', to: '/legal' },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-900/5 bg-white/80 py-12 text-sm text-neutral-600 dark:border-white/5 dark:bg-neutral-950/80 dark:text-neutral-300">
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
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
          <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
            Modern enterprise technology, talent accelerators, and industry bridges built for ambitious teams.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.to} className="transition hover:text-brand-primary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
