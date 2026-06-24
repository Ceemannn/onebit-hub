import type { ReactNode } from 'react'
import type { CourseDetail } from '../../data/courseDetails.ts'
import { TradingPlayground } from './TradingPlayground.tsx'
import { DataLab } from './DataLab.tsx'
import { CodeLab } from './CodeLab.tsx'
import { PythonRepl } from './techlabs/PythonRepl.tsx'
import { SqlConsole } from './techlabs/SqlConsole.tsx'
import { PowerBiCanvas } from './techlabs/PowerBiCanvas.tsx'
import { MlPlayground } from './techlabs/MlPlayground.tsx'
import { PromptPlayground } from './techlabs/PromptPlayground.tsx'
import { CloudArchitect } from './techlabs/CloudArchitect.tsx'
import { SecurityConsole } from './techlabs/SecurityConsole.tsx'
import { DesignStudio } from './techlabs/DesignStudio.tsx'
import { PipelineBuilder } from './techlabs/PipelineBuilder.tsx'

type LabMeta = { eyebrow: string; title: string; blurb: string; render: (c: CourseDetail) => ReactNode }

// Per-course interactive for the Tech & Data track — each tailored to the subject.
const TECH_LABS: Record<string, LabMeta> = {
  'data-analytics': {
    eyebrow: 'Try it · Analytics workbench',
    title: 'Explore the data the way analysts do',
    blurb: 'Slice a live dataset by metric and region, switch chart types, and watch the KPIs recompute — the exploratory loop you’ll run every day.',
    render: () => <DataLab />,
  },
  'data-science': {
    eyebrow: 'Try it · Classifier playground',
    title: 'Train a model and watch accuracy move',
    blurb: 'Drag the decision boundary or hit “Train” to auto-fit the best separator. This is the supervised-learning intuition at the heart of the track.',
    render: () => <MlPlayground />,
  },
  'python-programming': {
    eyebrow: 'Try it · Python REPL',
    title: 'Write Python and actually run it',
    blurb: 'Edit the script and press Run — a real (mini) interpreter executes variables, loops, f-strings and lists. Break it, fix it, learn it.',
    render: (c) => <PythonRepl courseId={c.id} />,
  },
  'python-for-data-science': {
    eyebrow: 'Try it · Python REPL',
    title: 'Crunch numbers in Python',
    blurb: 'Run a pandas-style aggregation in the editor — totals, means and growth computed live. Edit the data and re-run to see it change.',
    render: (c) => <PythonRepl courseId={c.id} />,
  },
  'automation-with-python': {
    eyebrow: 'Try it · Python REPL',
    title: 'Automate a task in Python',
    blurb: 'Run a batch-automation script and watch it process files step by step. Tweak the logic and re-run — exactly how you’ll script real workflows.',
    render: (c) => <PythonRepl courseId={c.id} />,
  },
  'sql-for-analytics': {
    eyebrow: 'Try it · SQL console',
    title: 'Query a real table',
    blurb: 'Write SELECT statements with WHERE, ORDER BY and LIMIT against a sample table — the query actually runs and returns rows.',
    render: () => <SqlConsole />,
  },
  'power-bi': {
    eyebrow: 'Try it · Power BI report',
    title: 'Build and cross-filter a report',
    blurb: 'Click a region slicer or a donut slice and every visual cross-filters — the core interactive-report workflow Power BI is built around.',
    render: () => <PowerBiCanvas />,
  },
  'big-data-engineering': {
    eyebrow: 'Try it · ETL pipeline',
    title: 'Run a streaming data pipeline',
    blurb: 'Kick off a batch and watch 5M records flow through ingest → clean → transform → aggregate → warehouse with live throughput.',
    render: () => <PipelineBuilder />,
  },
  'cloud-foundations': {
    eyebrow: 'Try it · Cloud architect',
    title: 'Provision a cloud architecture',
    blurb: 'Toggle services on and off and watch the architecture diagram, monthly cost and availability update — design for scale and budget.',
    render: () => <CloudArchitect />,
  },
  'product-design': {
    eyebrow: 'Try it · Design tokens studio',
    title: 'Design with live tokens',
    blurb: 'Adjust radius, spacing, color and type and watch the component preview update instantly — design-systems thinking, hands-on.',
    render: () => <DesignStudio />,
  },
  'cybersecurity-foundations': {
    eyebrow: 'Try it · Security operations',
    title: 'Scan, triage and remediate',
    blurb: 'Run a vulnerability scan, prioritise findings by severity, and patch them to watch your security posture climb to 100.',
    render: () => <SecurityConsole />,
  },
  'ai-prompt-engineering': {
    eyebrow: 'Try it · Prompt playground',
    title: 'Engineer a prompt',
    blurb: 'Change the technique and temperature and watch the model’s response change — the exact levers prompt engineering is about.',
    render: () => <PromptPlayground />,
  },
}

const TRADING: LabMeta = {
  eyebrow: 'Try it · Trade simulator',
  title: 'Practice the setup before you risk a cent',
  blurb: 'Place paper trades on a simulated market — set your entry, stop and target and watch your risk:reward update live.',
  render: (c) => <TradingPlayground instrument={c.id === 'crypto-trading' ? 'BTC/USD' : 'EUR/USD'} />,
}

const SOFTWARE: LabMeta = {
  eyebrow: 'Try it · Dev environment',
  title: 'Ship it through a real pipeline',
  blurb: 'Watch the build stream through tests and a CI/CD pipeline — the exact workflow you’ll own as an engineer. Hit “Run pipeline” to replay it.',
  render: (c) => <CodeLab courseId={c.id} />,
}

function resolveLab(course: CourseDetail): LabMeta {
  if (course.track === 'Trading') return TRADING
  if (course.track === 'Software Engineering') return SOFTWARE
  return TECH_LABS[course.id] ?? TECH_LABS['data-analytics']
}

/** Picks a course-specific interactive widget tailored to the subject. */
export function CourseInteractive({ course }: { course: CourseDetail }) {
  const lab = resolveLab(course)
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">{lab.eyebrow}</p>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{lab.title}</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">{lab.blurb}</p>
      </div>
      {lab.render(course)}
    </section>
  )
}
