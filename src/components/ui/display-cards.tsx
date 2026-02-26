import { useState } from 'react'
import { cn } from '../../lib/utils.ts'
import { Sparkles, X } from 'lucide-react'

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
  children?: React.ReactNode
  contentCount?: number
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-brand-light" />,
  title = 'Featured',
  description = 'Discover amazing content',
  date = 'Just now',
  iconClassName = 'text-brand-primary',
  titleClassName = 'text-brand-primary',
  children,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[10rem] w-[22rem] flex-col justify-between rounded-xl border-2 border-neutral-900/10 bg-white/70 px-4 py-3 backdrop-blur-sm transition-all duration-700 hover:border-brand-primary/30 hover:bg-white dark:border-white/10 dark:bg-neutral-900/70 dark:hover:border-brand-primary/40 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn('relative inline-block rounded-full bg-brand-primary/15 p-1', iconClassName)}>
          {icon}
        </span>
        <p className={cn('text-lg font-medium', titleClassName)}>{title}</p>
      </div>
      {children ? (
        <div className="mt-3">{children}</div>
      ) : (
        <p className="mt-3 whitespace-nowrap text-lg text-neutral-900 dark:text-white">{description}</p>
      )}
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">{date}</p>
    </div>
  )
}

interface TrackCardItem extends DisplayCardProps {
  key?: string
}

interface DisplayCardsProps {
  cards: TrackCardItem[]
  defaultActiveIndex?: number
}

function DisplayCards({ cards, defaultActiveIndex = 0 }: DisplayCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActiveIndex)

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
  }

  const handleClose = () => {
    setActiveIndex(null)
  }

  return (
    <div className="flex min-h-[420px] w-full items-start justify-center gap-8 py-10">
      {/* Deck side */}
      <div
        className={cn(
          'relative transition-all duration-700',
          activeIndex !== null ? 'w-1/3 shrink-0' : 'w-full max-w-3xl',
        )}
      >
        <div className="grid [grid-template-areas:'stack'] place-items-center">
          {(() => {
            const deckIndices = cards
              .map((_, i) => i)
              .filter((i) => i !== activeIndex)

            const sortedDeckIndices = [...deckIndices].sort(
              (a, b) => (cards[b].contentCount ?? 0) - (cards[a].contentCount ?? 0),
            )

            const deckOffsets = [
              '',
              'translate-x-12 translate-y-8',
              'translate-x-24 translate-y-16',
            ]

            const compactDeckOffsets = [
              '',
              'translate-x-6 translate-y-6',
              'translate-x-12 translate-y-12',
            ]

            const offsets = activeIndex !== null ? compactDeckOffsets : deckOffsets

            return sortedDeckIndices.map((cardIndex, positionInDeck) => {
              const cardProps = cards[cardIndex]
              const isTopOfDeck = positionInDeck === sortedDeckIndices.length - 1
              const offsetClass = offsets[positionInDeck] ?? ''

              return (
                <div
                  key={cardIndex}
                  className={cn(
                    '[grid-area:stack] cursor-pointer transition-all duration-700',
                    offsetClass,
                    !isTopOfDeck
                      ? "before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:rounded-xl before:bg-white/50 before:outline-1 before:outline-neutral-900/10 before:transition-opacity before:duration-700 before:content-[''] hover:before:opacity-0 dark:before:bg-neutral-950/50 dark:before:outline-white/10 grayscale-[100%] hover:grayscale-0"
                      : '',
                  )}
                  onClick={() => handleCardClick(cardIndex)}
                >
                  <DisplayCard
                    {...cardProps}
                    className={cn(
                      '-skew-y-[8deg]',
                      activeIndex !== null ? 'w-[16rem] min-h-[8rem]' : 'w-[22rem]',
                      "after:pointer-events-none after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-surface after:to-transparent after:content-[''] dark:after:from-surface-dark",
                      cardProps.className,
                    )}
                  />
                </div>
              )
            })
          })()}
        </div>
      </div>

      {/* Expanded card side */}
      {activeIndex !== null && (
        <div className="flex-1 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="relative rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-card backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/90">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="relative inline-block rounded-full bg-brand-primary/15 p-1.5">
                {cards[activeIndex].icon}
              </span>
              <h3 className="text-xl font-semibold text-brand-primary dark:text-brand-light">
                {cards[activeIndex].title}
              </h3>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-brand-primary/60">
              {cards[activeIndex].date}
            </p>
            <div className="mt-5">
              {cards[activeIndex].children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { DisplayCard, DisplayCards }
export type { DisplayCardProps }
export default DisplayCards
