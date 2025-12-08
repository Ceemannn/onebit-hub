import { cn } from '../../lib/utils.ts'

export interface TabItem {
  key: string
  label: string
}

interface SegmentedTabsProps {
  tabs: TabItem[]
  activeKey: string
  onChange: (key: string) => void
  size?: 'sm' | 'md'
  className?: string
}

export function SegmentedTabs({
  tabs,
  activeKey,
  onChange,
  size = 'md',
  className,
}: SegmentedTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-neutral-200 bg-white/80 p-1 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cn(
              'relative rounded-full font-medium transition-all duration-200',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              isActive
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-neutral-600 hover:text-brand-primary dark:text-neutral-400 dark:hover:text-brand-teal'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
