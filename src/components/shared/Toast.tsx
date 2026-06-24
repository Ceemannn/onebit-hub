import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

type ToastVariant = 'success' | 'info' | 'warning'
type Toast = { id: number; title: string; description?: string; variant: ToastVariant }

type ToastContextValue = {
  toast: (t: { title: string; description?: string; variant?: ToastVariant }) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const config: Record<ToastVariant, { icon: typeof CheckCircle2; accent: string }> = {
  success: { icon: CheckCircle2, accent: 'text-emerald-500' },
  info: { icon: Info, accent: 'text-indigo-500' },
  warning: { icon: AlertTriangle, accent: 'text-gold-500' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const toast = useCallback<ToastContextValue['toast']>(
    ({ title, description, variant = 'success' }) => {
      const id = Date.now() + Math.random()
      setToasts((t) => [...t, { id, title, description, variant }])
      window.setTimeout(() => remove(id), 4200)
    },
    [remove],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[130] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-auto sm:right-6 sm:translate-x-0">
        <AnimatePresence>
          {toasts.map((t) => {
            const { icon: Icon, accent } = config[t.variant]
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-ink-900/95"
              >
                <Icon size={18} className={`mt-0.5 shrink-0 ${accent}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="text-neutral-400 transition hover:text-neutral-700 dark:hover:text-white"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
