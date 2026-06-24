import { AnimatePresence, motion } from 'framer-motion'
import { Moon, SunMedium } from 'lucide-react'
import { useTheme } from '../../context/theme.tsx'
import { cn } from '../../lib/utils.ts'

/**
 * Animated theme toggle — the sun/moon glyph rotates and cross-fades on switch.
 */
export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-900/10 p-2 text-neutral-700 transition hover:border-indigo-500/40 hover:text-indigo-600 dark:border-white/10 dark:text-white dark:hover:text-indigo-300',
        className,
      )}
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
          </motion.span>
        </AnimatePresence>
      </span>
      {withLabel && <span className="text-sm font-medium">{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  )
}
