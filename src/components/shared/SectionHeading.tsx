import { cn } from '../../lib/utils.ts'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div
      data-animate
      className={cn(
        'space-y-3',
        align === 'center' && 'text-center',
        align === 'center' && 'mx-auto max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">{eyebrow}</p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">{title}</h2>
      {description && <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">{description}</p>}
    </div>
  )
}
