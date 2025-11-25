import { useState } from 'react'
import { Loader2, Users } from 'lucide-react'
import { Button } from '../../../components/ui/button.tsx'
import { useGsapReveal } from '../../../hooks/useGsapReveal.ts'
import { DemoPageLayout } from './DemoLayout.tsx'
import { demoProjects } from '../../../data/demos.ts'

const project = demoProjects.find((demo) => demo.slug === 'workforcecore-hr-app')!

const onboardingSteps = ['Offer accepted', 'Contracts signed', 'Accounts provisioned', 'Equipment ready', 'Day-1 agenda sent']

export function DemoHrPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Adaobi Ogun', status: 4 },
    { id: 2, name: 'Samir Hassan', status: 2 },
  ])
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setEmployees((prev) => [
      ...prev,
      { id: prev.length + 1, name: `New hire ${prev.length + 1}`, status: 0 },
    ])
    setLoading(false)
  }

  const handleAdvance = (id: number) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id
          ? { ...employee, status: Math.min(onboardingSteps.length - 1, employee.status + 1) }
          : employee,
      ),
    )
  }

  return (
    <DemoPageLayout project={project} ref={ref}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Org Builder</p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Add employees</h2>
            </div>
            {loading && <Loader2 className="animate-spin text-brand-primary" size={20} />}
          </header>
          <Button onClick={handleAdd} disabled={loading} className="inline-flex items-center gap-2">
            <Users size={18} /> Add employee
          </Button>
          <div className="space-y-4">
            {employees.map((employee) => (
              <article key={employee.id} className="rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-neutral-900/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{employee.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                      Step {employee.status + 1} / {onboardingSteps.length}
                    </p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => handleAdvance(employee.id)}>
                    Advance
                  </Button>
                </div>
                <div className="mt-4 grid gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {onboardingSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${index <= employee.status ? 'bg-brand-primary' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                      ></span>
                      {step}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="space-y-6 rounded-3xl border border-brand-primary/20 bg-gradient-to-b from-brand-primary/90 to-brand-teal/80 p-8 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Onboarding checklist</p>
            <div className="mt-4 space-y-3 text-sm">
              {onboardingSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/20 bg-white/10 p-3">
                  <p className="font-semibold">{step}</p>
                  <p className="text-white/70">
                    {index === 0 && 'HR triggers offer + Supabase Auth invite.'}
                    {index === 1 && 'Automated e-sign + document storage.'}
                    {index === 2 && 'Provision Google Workspace, Slack, Jira.'}
                    {index === 3 && 'IT logistics + asset serial logging.'}
                    {index === 4 && 'Managers receive checklists + day-1 runbook.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/80">
            <p className="font-semibold">Leave management + policy hub</p>
            <p className="mt-2">
              Track approvals, payroll exports, and policy versioning. Every action is logged for compliance and surfaced in the analytics board.
            </p>
          </div>
        </section>
      </div>
    </DemoPageLayout>
  )
}
