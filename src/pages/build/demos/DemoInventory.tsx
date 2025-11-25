import { useState } from 'react'
import { ClipboardCheck, Truck } from 'lucide-react'
import { Button } from '../../../components/ui/button.tsx'
import { useGsapReveal } from '../../../hooks/useGsapReveal.ts'
import { DemoPageLayout } from './DemoLayout.tsx'
import { demoProjects } from '../../../data/demos.ts'

const project = demoProjects.find((demo) => demo.slug === 'buildstock-hommes')!

const initialSites = [
  { id: 'Lagos HQ', cement: 120, rebars: 60, blocks: 800 },
  { id: 'Lekki Site', cement: 40, rebars: 30, blocks: 300 },
  { id: 'Abuja Site', cement: 70, rebars: 50, blocks: 420 },
]

export function DemoInventoryPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })
  const [sites, setSites] = useState(initialSites)
  const [poLog, setPoLog] = useState<string[]>([])

  const handleTransfer = (from: string, to: string, material: keyof typeof initialSites[number], qty: number) => {
    setSites((prev) =>
      prev.map((site) => {
        if (site.id === from) {
          return { ...site, [material]: Math.max(0, (site[material] as number) - qty) }
        }
        if (site.id === to) {
          return { ...site, [material]: (site[material] as number) + qty }
        }
        return site
      }),
    )
  }

  const generatePO = (site: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setPoLog((prev) => [`${timestamp}: Auto-generated PO for ${site}`, ...prev].slice(0, 4))
  }

  return (
    <DemoPageLayout project={project} ref={ref}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="space-y-6 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Site map</p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Drag & drop transfers</h2>
            </div>
          </header>
          <div className="space-y-4">
            {sites.map((site) => (
              <article key={site.id} className="rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-neutral-900/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{site.id}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">Inventory snapshot</p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => generatePO(site.id)}>
                    <ClipboardCheck size={16} /> Generate PO
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-neutral-600 dark:text-neutral-200">
                  {['cement', 'rebars', 'blocks'].map((material) => (
                    <div key={material} className="rounded-xl border border-neutral-900/10 bg-white/60 p-3 dark:bg-neutral-900/60">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">{material}</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-white">{(site as never)[material]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  {sites
                    .filter((other) => other.id !== site.id)
                    .map((other) => (
                      <button
                        key={other.id}
                        className="rounded-full border border-neutral-300 px-3 py-1 text-neutral-600 hover:border-brand-primary hover:text-brand-primary"
                        onClick={() => handleTransfer(site.id, other.id, 'cement', 10)}
                      >
                        Transfer 10 cement → {other.id}
                      </button>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="space-y-6 rounded-3xl border border-brand-primary/20 bg-gradient-to-b from-brand-primary/90 to-brand-teal/80 p-8 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Procurement automation</p>
            <div className="mt-4 space-y-3">
              {poLog.length === 0 && <p className="text-sm text-white/80">No purchase orders yet. Trigger one from a site card.</p>}
              {poLog.map((entry) => (
                <div key={entry} className="rounded-2xl border border-white/20 bg-white/10 p-3 text-sm">
                  <Truck className="mb-1 text-brand-teal" size={16} />
                  {entry}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/80">
            <p className="font-semibold">Movement log</p>
            <p className="mt-2">
              Every transfer is captured with QR/Barcode scans and synced to IndexedDB when offline. Once connectivity returns, BuildStock reconciles counts and pushes analytics into the cost dashboard.
            </p>
          </div>
        </section>
      </div>
    </DemoPageLayout>
  )
}
