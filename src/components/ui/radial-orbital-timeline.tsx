import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from './button.tsx'

interface TimelineItem {
  id: number
  title: string
  content: string
  category: string
  icon: React.ElementType
  href: string
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null)
      setAutoRotate(true)
    }
  }

  const centerViewOnNode = useCallback(
    (nodeId: number) => {
      const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
      const totalNodes = timelineData.length
      const targetAngle = (nodeIndex / totalNodes) * 360
      setRotationAngle(270 - targetAngle)
    },
    [timelineData],
  )

  const toggleItem = useCallback(
    (id: number) => {
      setExpandedId((prev) => {
        if (prev === id) {
          setAutoRotate(true)
          return null
        }
        setAutoRotate(false)
        centerViewOnNode(id)
        return id
      })
    },
    [centerViewOnNode],
  )

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360
          return Number(newAngle.toFixed(3))
        })
      }, 50)
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer)
      }
    }
  }, [autoRotate])

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 280
    const radian = (angle * Math.PI) / 180

    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)

    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    )

    return { x, y, zIndex, opacity }
  }

  return (
    <div
      className="flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-neutral-900/10 bg-surface-light dark:border-white/10 dark:bg-neutral-950"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{ perspective: '1000px' }}
        >
          {/* Center hub */}
          <div className="absolute z-10 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-primary">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-brand-primary/30 opacity-70"></div>
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-brand-primary/20 opacity-50"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div className="h-8 w-8 rounded-full bg-white/90 dark:bg-white/80 backdrop-blur-md"></div>
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-brand-primary/20 dark:border-brand-primary/15"
            style={{ width: '560px', height: '560px' }}
          ></div>
          <div
            className="absolute rounded-full border border-brand-primary/10 dark:border-brand-primary/8"
            style={{ width: '620px', height: '620px' }}
          ></div>

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedId === item.id
            const Icon = item.icon

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            }

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
              >
                {/* Glow behind node */}
                <div
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background: `radial-gradient(circle, rgba(50,154,146,0.25) 0%, transparent 70%)`,
                  }}
                ></div>

                {/* Node circle */}
                <div
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300
                    ${
                      isExpanded
                        ? 'scale-150 border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/40'
                        : 'border-brand-primary/50 bg-white text-brand-primary dark:bg-neutral-900 dark:text-brand-light'
                    }
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* Node label */}
                <div
                  className={`
                    absolute left-1/2 top-14 -translate-x-1/2 whitespace-nowrap text-center
                    text-xs font-semibold tracking-wider transition-all duration-300
                    ${
                      isExpanded
                        ? 'scale-110 text-brand-primary dark:text-brand-light'
                        : 'text-neutral-700 dark:text-neutral-400'
                    }
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded card — mirrors original demo card layout */}
                {isExpanded && (
                  <div
                    className="absolute left-1/2 top-24 w-72 -translate-x-1/2 rounded-3xl border border-neutral-900/10 bg-white/95 p-5 shadow-card backdrop-blur-lg dark:border-white/10 dark:bg-neutral-900/95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-brand-primary/50"></div>
                    <header className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-teal/70">
                        Live Preview
                      </span>
                    </header>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {item.content}
                    </p>
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-brand-primary/30 bg-brand-primary/5 p-3">
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-brand-primary/20"></div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                          Interactive controls
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          Adjust variables and watch metrics update in real-time.
                        </p>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="mt-4 inline-flex items-center gap-2"
                    >
                      <a href={item.href}>
                        Launch demo <ArrowRight size={14} />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
