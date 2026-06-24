import type { ReactNode } from 'react'
import { cn } from '../../lib/utils.ts'

/**
 * A faux browser-chrome wrapper used to frame product demo mockups. `tone`
 * controls the chrome (dark for Aura, light for the others).
 */
export function BrowserFrame({
  children,
  url,
  tone = 'light',
  className,
}: {
  children: ReactNode
  url: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border shadow-2xl',
        dark ? 'border-white/10 bg-[#070709]' : 'border-neutral-200 bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 border-b px-3 py-2.5',
          dark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-neutral-50',
        )}
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5484D]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F5A623]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#13B97A]/80" />
        </span>
        <div
          className={cn(
            'ml-2 flex-1 truncate rounded-md px-3 py-1 text-center font-mono text-[11px]',
            dark ? 'bg-white/5 text-white/40' : 'bg-white text-neutral-400',
          )}
        >
          {url}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
