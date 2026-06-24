import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils.ts'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 active:scale-[0.975] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        // Primary action — gold, ALWAYS ink text (one gold CTA per screen)
        default:
          'bg-gold-500 text-ink-950 hover:bg-gold-400 hover:shadow-glow-gold active:bg-gold-600 focus-visible:ring-gold-500',
        // Indigo brand action (navigation / secondary emphasis)
        brand:
          'bg-indigo-500 text-white hover:bg-indigo-600 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25',
        secondary:
          'bg-transparent text-indigo-600 border border-indigo-500 hover:bg-indigo-500/[0.08] dark:text-indigo-300 dark:border-indigo-300',
        ghost:
          'bg-transparent text-neutral-700 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-300 focus-visible:ring-neutral-300',
        subtle:
          'bg-neutral-900/5 text-neutral-900 hover:bg-neutral-900/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
      },
      size: {
        default: 'px-6 py-3 text-sm',
        sm: 'px-4 py-2 text-xs',
        lg: 'px-8 py-4 text-base',
        icon: 'p-3 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
