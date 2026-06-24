import { cn } from '../../lib/utils.ts'

/** Shimmering placeholder block. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-neutral-200/70 dark:bg-white/5',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent dark:before:via-white/10',
        className,
      )}
    />
  )
}

/** Full-page skeleton used as the route Suspense fallback. */
export function PageSkeleton() {
  return (
    <div className="container space-y-8 py-10">
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-12 w-3/4 max-w-2xl" />
        <Skeleton className="h-12 w-1/2 max-w-xl" />
        <Skeleton className="h-5 w-2/3 max-w-lg" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-11 w-44 rounded-full" />
          <Skeleton className="h-11 w-40 rounded-full" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
