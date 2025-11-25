import { useState } from 'react'
import { Button } from '../../../components/ui/button.tsx'
import { useGsapReveal } from '../../../hooks/useGsapReveal.ts'
import { DemoPageLayout } from './DemoLayout.tsx'
import { demoProjects } from '../../../data/demos.ts'

const project = demoProjects.find((demo) => demo.slug === 'perform-deliver')!

export function DemoAppraisalPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 40 })
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Ship workflow builder', metric: 'Innovation', progress: 60 },
    { id: 2, title: 'Coach team leads', metric: 'Leadership', progress: 45 },
  ])
  const [score, setScore] = useState(68)

  const handleCreateTask = () => {
    const id = tasks.length + 1
    setTasks((prev) => [...prev, { id, title: `Task ${id}`, metric: 'Execution', progress: 0 }])
  }

  const handleMarkDone = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, progress: Math.min(100, task.progress + 25) } : task)),
    )
    setScore((prev) => Math.min(100, prev + 5))
  }

  return (
    <DemoPageLayout project={project} ref={ref}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="space-y-6 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Task orchestration</p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Create & link tasks</h2>
            </div>
            <Button onClick={handleCreateTask} size="sm">
              Create task
            </Button>
          </header>
          <div className="space-y-4">
            {tasks.map((task) => (
              <article key={task.id} className="rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-neutral-900/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{task.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">Metric: {task.metric}</p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => handleMarkDone(task.id)}>
                    Mark done
                  </Button>
                </div>
                <div className="mt-4 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div className="h-full rounded-full bg-brand-primary" style={{ width: `${task.progress}%` }}></div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="space-y-6 rounded-3xl border border-brand-primary/20 bg-gradient-to-b from-brand-primary/90 to-brand-teal/80 p-8 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Quarter scorecard</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
                <p className="text-4xl font-semibold">{score}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Q3 Score</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
                <p className="text-4xl font-semibold">4.6/5</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">360 Feedback</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Radar skills</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              {['Execution', 'Collaboration', 'Product thinking', 'Leadership'].map((skill, index) => (
                <div key={skill} className="rounded-2xl border border-white/20 bg-white/10 p-3">
                  <p className="font-semibold">{skill}</p>
                  <p className="text-white/70">{70 + index * 5}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/80">
            <p className="font-semibold">Calibration workflow</p>
            <p className="mt-2">
              HR + managers calibrate promotion readiness using real-time scorecards, objective feedback, and OKR completion.
            </p>
          </div>
        </section>
      </div>
    </DemoPageLayout>
  )
}
