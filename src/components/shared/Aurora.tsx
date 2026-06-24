import { cn } from '../../lib/utils.ts'

/**
 * Slow-drifting aurora/mesh gradient for deep-ink sections. Indigo + emerald +
 * gold blobs at low opacity behind content. Purely decorative; the drift is
 * paused under reduced-motion via the .aurora-blob CSS rule.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <span className="aurora-blob absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-500/30 blur-[80px]" />
      <span className="aurora-blob absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-500/20 blur-[90px] [animation-delay:-6s]" />
      <span className="aurora-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-[80px] [animation-delay:-12s]" />
    </div>
  )
}
