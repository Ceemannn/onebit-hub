import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils.ts'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:bg-gradient-primary hover:-translate-y-0.5 focus-visible:ring-brand-primary transition-all',
        secondary:
          'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary/10 hover:border-brand-accent focus-visible:ring-brand-primary',
        ghost:
          'bg-transparent text-neutral-700 hover:text-brand-primary dark:text-neutral-300 dark:hover:text-brand-accent focus-visible:ring-neutral-300',
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
