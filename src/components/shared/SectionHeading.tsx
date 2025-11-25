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
        <p className="text-xs uppercase tracking-[0.3em] text-brand-teal/80">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold text-neutral-900 dark:text-white md:text-4xl">{title}</h2>
      {description && <p className="text-base text-neutral-600 dark:text-neutral-200">{description}</p>}
    </div>
  )
}
