import { cn } from '../../lib/utils.ts'

/**
 * Onebit "bit cell" symbol — a rounded-square unit branching into three nodes
 * (Build = indigo, Learn = emerald, Bridge = gold). Pure geometry, scales to 16px.
 */
export function Mark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Onebit"
      className={className}
    >
      <g stroke="#A99FEF" strokeWidth="2.6" strokeLinecap="round">
        <line x1="24" y1="22" x2="24" y2="7" />
        <line x1="24" y1="22" x2="8" y2="37" />
        <line x1="24" y1="22" x2="40" y2="37" />
      </g>
      <rect x="17" y="15" width="14" height="14" rx="4.5" fill="#5A4FE0" />
      <rect x="20" y="3" width="8" height="8" rx="2.6" fill="#5A4FE0" />
      <rect x="4" y="33" width="8" height="8" rx="2.6" fill="#13B97A" />
      <rect x="36" y="33" width="8" height="8" rx="2.6" fill="#F5A623" />
    </svg>
  )
}

/**
 * Lockup: bit-cell mark + lowercase "onebit" wordmark (Sora 700).
 */
export function Logo({
  size = 34,
  className,
  wordClassName,
}: {
  size?: number
  className?: string
  wordClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Mark size={size} />
      <span
        className={cn(
          'font-heading text-2xl font-bold tracking-[-0.04em] text-neutral-900 dark:text-white',
          wordClassName,
        )}
      >
        onebit
      </span>
    </span>
  )
}
