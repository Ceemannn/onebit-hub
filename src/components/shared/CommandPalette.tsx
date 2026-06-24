import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Home,
  Boxes,
  Wrench,
  GraduationCap,
  Building2,
  GitMerge,
  Info,
  Phone,
  FileText,
  Moon,
  SunMedium,
  CornerDownLeft,
  type LucideIcon,
} from 'lucide-react'
import { useTheme } from '../../context/theme.tsx'

type Command = {
  id: string
  label: string
  hint?: string
  icon: LucideIcon
  keywords?: string
  run: (ctx: { navigate: (p: string) => void; toggleTheme: () => void }) => void
}

const go = (path: string): Command['run'] => ({ navigate }) => navigate(path)

const baseCommands: Command[] = [
  { id: 'home', label: 'Home', icon: Home, run: go('/'), keywords: 'start landing' },
  { id: 'build-projects', label: 'Build · Projects & Demos', icon: Boxes, run: go('/build/projects'), keywords: 'portfolio systems' },
  { id: 'build-services', label: 'Build · Services', icon: Wrench, run: go('/build/services'), keywords: 'consulting' },
  { id: 'demo-credit', label: 'Demo · Credit Intelligence', icon: Boxes, run: go('/build/demo/credit-intelligence'), keywords: 'sandbox scoring' },
  { id: 'demo-forecast', label: 'Demo · Demand Forecasting', icon: Boxes, run: go('/build/demo/demand-forecasting-engine'), keywords: 'sandbox' },
  { id: 'demo-hr', label: 'Demo · WorkforceCore HR', icon: Boxes, run: go('/build/demo/workforcecore-hr-app'), keywords: 'sandbox onboarding' },
  { id: 'demo-inventory', label: 'Demo · BuildStock Inventory', icon: Boxes, run: go('/build/demo/buildstock-hommes'), keywords: 'sandbox stock' },
  { id: 'learn-individuals', label: 'Learn · For Individuals', icon: GraduationCap, run: go('/learn/individuals'), keywords: 'courses education' },
  { id: 'learn-corporations', label: 'Learn · For Corporations', icon: Building2, run: go('/learn/corporations'), keywords: 'teams training' },
  { id: 'bridge', label: 'Bridge · Talent matching', icon: GitMerge, run: go('/bridge'), keywords: 'jobs hire' },
  { id: 'about', label: 'About Onebit', icon: Info, run: go('/about'), keywords: 'team mission' },
  { id: 'contact', label: 'Contact · Book a call', icon: Phone, run: go('/contact'), keywords: 'email talk discovery' },
  { id: 'legal', label: 'Legal', icon: FileText, run: go('/legal'), keywords: 'privacy terms' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const commands = useMemo<Command[]>(
    () => [
      ...baseCommands,
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: theme === 'dark' ? SunMedium : Moon,
        keywords: 'theme dark light toggle',
        run: ({ toggleTheme }) => toggleTheme(),
      },
    ],
    [theme],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q))
  }, [query, commands])

  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const runCommand = (cmd: Command) => {
    setOpen(false)
    cmd.run({ navigate, toggleTheme })
  }

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      runCommand(results[active])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-ink-900"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3.5 dark:border-white/10">
              <Search size={18} className="text-neutral-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, demos, actions…"
                className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white"
              />
              <kbd className="hidden rounded-md border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 dark:border-white/10 sm:block">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-neutral-400">No results for “{query}”.</li>
              )}
              {results.map((cmd, i) => {
                const Icon = cmd.icon
                const isActive = i === active
                return (
                  <li key={cmd.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => runCommand(cmd)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200'
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-indigo-500' : 'text-neutral-400'} />
                      <span className="flex-1">{cmd.label}</span>
                      {isActive && <CornerDownLeft size={14} className="text-indigo-400" />}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:border-white/10">
              <span>Onebit command menu</span>
              <span className="hidden sm:inline">↑↓ navigate · ↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
