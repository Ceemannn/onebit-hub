export type DemoProjectContent = {
  slug: string
  name: string
  heroTagline: string
  summary: string
  atGlance: string
  challenge: string[]
  solution: string[]
  achievements: string[]
  techStack: string[]
  architecture: string[]
  screenshots: { title: string; description: string }[]
}

export const demoProjects: DemoProjectContent[] = [
  {
    slug: 'tdafrica-credit-intelligence',
    name: 'Credit Intelligence Platform for TDAfrica',
    heroTagline:
      'Credit Intelligence Platform — Real-time scoring, policy engine, and collections automation for West Africa’s largest tech distributor.',
    summary:
      'Built a production credit rating and portfolio management platform for TDAfrica to enable scalable, data-driven credit decisions across a predominantly credit-based supply chain.',
    atGlance:
      'Reduced credit decision time from weeks to minutes by automating underwriting, policy enforcement, and collections workflows across 100% of credit customers.',
    challenge: [
      'Manual and time-consuming credit decisions with reactive workflows.',
      'Portfolio risk visibility was limited; delinquencies surfaced too late.',
      'High operational cost for collections and lengthy approval cycles.',
    ],
    solution: [
      'Real-time customer scoring (0–850), risk bands, and recommended credit lines.',
      'Customer segmentation using RFM + behavioral clustering with explainability UI (SHAP).',
      'Automated policy engine to approve, flag, or request collateral plus alerts & mobile collections workflows.',
      'Back-office dashboards with cohort churn, PAR heatmaps, and sandbox simulations.',
    ],
    achievements: [
      'Reduced time to decision: [INSERT METRIC]',
      'Automated credit limit recommendations covering 100% of retail customers.',
    ],
    techStack: [
      'Data ingestion: POS, ERP, payment APIs via Airflow + Supabase jobs.',
      'Model: LightGBM ensemble with SHAP explainability + drift detection.',
      'Backend: FastAPI endpoints with Redis cache and rate limiting.',
      'Frontend: Recharts + Framer Motion visual insights with secure PII masking.',
    ],
    architecture: [
      'Source systems → Airflow ETL → Supabase/Postgres warehouse.',
      'Feature store → Training pipeline → LightGBM models with SHAP.',
      'FastAPI scoring endpoint → Redis cache → Frontend dashboard.',
      'Simulation sandbox hitting /api/demo/credit-score for what-if modeling.',
    ],
    screenshots: [
      { title: 'Portfolio heatmap', description: 'Visual PAR and cohort churn heatmaps for risk teams.' },
      { title: 'Customer detail + SHAP', description: 'Driver insights for each applicant with SHAP bars.' },
      { title: 'Credit sandbox', description: 'Interactive sliders to test credit policy impacts.' },
    ],
  },
  {
    slug: 'demand-forecasting-engine',
    name: 'Demand Forecasting Engine',
    heroTagline: 'Demand Forecasting Engine — Multi-horizon forecasting and scenario planning for distribution & retail.',
    summary:
      'Forecasting platform delivering multi-store, multi-SKU projections with promotion uplift modeling, scenario plans, and replenishment-ready exports.',
    atGlance:
      'Improved forecast accuracy for top SKUs by [INSERT METRIC] and enabled automated replenishment that reduced stockouts by [INSERT METRIC].',
    challenge: [
      'Frequent stockouts on high-velocity SKUs and costly overstocks on slow movers.',
      'No integrated promotion uplift modeling across channels.',
    ],
    solution: [
      'Forecast decomposition (trend, seasonality, holidays) with ensembles of Prophet, LSTM, and gradient boosting.',
      'Scenario builder toggling lead time, service levels, and promotion uplift.',
      'Forecast quality dashboard covering MAPE, RMSE, bias with exportable datasets.',
      'Auto-scheduled forecasts and CSV/BI integrations for replenishment teams.',
    ],
    achievements: [
      'Improved forecast accuracy for top SKUs by [INSERT METRIC].',
      'Enabled automated replenishment that reduced stockouts by [INSERT METRIC].',
    ],
    techStack: [
      'Backend Python containers (Prophet, NeuralProphet, LSTM) running on managed jobs.',
      'API route /api/forecast providing JSON forecasts with metadata.',
      'Frontend Vega-Lite/Recharts visualizations with lazy-loaded heavy charts.',
    ],
    architecture: [
      'POS & ERP feeds → Feature engineering → Model orchestration service.',
      'Model registry + evaluation store → Forecast API → Scenario dashboards.',
    ],
    screenshots: [
      { title: 'Forecast decomposition', description: 'Trend + seasonality overlays for multi-store SKUs.' },
      { title: 'Scenario panel', description: 'Lead time, service level, and promo uplift controls.' },
      { title: 'Forecast accuracy dashboard', description: 'MAPE, RMSE, and bias trends with alerts.' },
    ],
  },
  {
    slug: 'workforcecore-hr-app',
    name: 'WorkforceCore HR Application',
    heroTagline: 'WorkforceCore — End-to-end HR platform: onboarding, org intelligence, and compliance.',
    summary: 'HR platform for hiring, onboarding, role management, and compliance reporting for high-growth teams.',
    atGlance: 'Streamlined onboarding to reduce time-to-productivity by [INSERT METRIC].',
    challenge: [
      'Manual onboarding checklists, document chaos, and compliance gaps.',
      'No single source of truth for roles, policies, and analytics.',
    ],
    solution: [
      'Employee directory with secure document storage and RBAC.',
      'Onboarding workflows, e-signature hooks, provisioning checklists.',
      'Leave management, payroll exports, policy versioning, and analytics.',
      'Org chart with drag/zoom plus attrition risk insights.',
    ],
    achievements: ['Streamlined onboarding to reduce time-to-productivity by [INSERT METRIC].'],
    techStack: [
      'Supabase Auth + storage for documents and audit logs.',
      'Analytics powered by serverless functions feeding dashboards.',
    ],
    architecture: [
      'Applicant tracking → WorkforceCore workflows → Supabase collections.',
      'Audit logs + analytics → Insights surfaced in dashboards.',
    ],
    screenshots: [
      { title: 'Org intelligence', description: 'Org chart plus attrition risk overlays.' },
      { title: 'Onboarding checklist', description: 'Step-by-step provisioning with automation.' },
      { title: 'Policy center', description: 'Versioned policies with acknowledgements.' },
    ],
  },
  {
    slug: 'perform-deliver',
    name: 'Perform & Deliver',
    heroTagline: 'Perform & Deliver — Continuous performance cycles, task-traceability and calibration.',
    summary: 'Unified appraisal and task platform tying daily execution to performance reviews and calibration workflows.',
    atGlance: 'Enabled continuous performance review cycles replacing annual-only reviews.',
    challenge: ['Disconnected task tools and performance systems created lagging reviews.'],
    solution: [
      'Link tasks to appraisal metrics with automatic score aggregation.',
      '360° feedback, manager calibration, and promotion readiness index.',
      'OKR tracker, timeline visualization, and automated nudges.',
      'One-click feedback requests with push & Slack/Teams integrations.',
    ],
    achievements: ['Enabled continuous performance review cycles replacing annual-only reviews.'],
    techStack: [
      'Task queue + notification workers with web push + Teams/Slack hooks.',
      'Analytics pipeline producing radar skill charts and promotion readiness scoring.',
    ],
    architecture: [
      'Task intake → Workflow engine → Appraisal service → Insights dashboards.',
    ],
    screenshots: [
      { title: 'Scorecard radar', description: 'Radar + timeline view of quarterly performance.' },
      { title: 'Task linkage', description: 'Traceability from tasks to appraisal metrics.' },
      { title: 'Calibration flow', description: 'Manager view with promotion readiness index.' },
    ],
  },
  {
    slug: 'buildstock-hommes',
    name: 'BuildStock — Inventory for Hommes Estates',
    heroTagline: 'BuildStock — Construction inventory visibility and procurement automation.',
    summary: 'Inventory system for multi-site construction operations, handling materials tracking, transfers, and PO automation.',
    atGlance: 'Provided site-level stock control and procurement automation with verified audit trails.',
    challenge: [
      'Materials lost or misallocated across sites; delivery delays and cost overruns.',
    ],
    solution: [
      'Site-level stock control with movement logs and BOM reservations.',
      'Reorder rules with supplier lead-time ranking and auto-generated POs.',
      'Mobile scanning with offline sync and QR/Barcode support.',
      'Cost breakdown by project with materials usage analytics.',
    ],
    achievements: ['Optimized material utilization with automated procurements and auditability.'],
    techStack: [
      'Mobile-first PWA with IndexedDB caching + background sync.',
      'APIs orchestrating procurement, supplier SLAs, and analytics.',
    ],
    architecture: [
      'Site capture → Sync service → Inventory core → Procurement + analytics pipelines.',
    ],
    screenshots: [
      { title: 'Site map', description: 'Drag & drop transfers with live counts.' },
      { title: 'PO automation', description: 'Generate purchase orders with supplier SLAs.' },
      { title: 'Usage analytics', description: 'Material consumption vs forecast views.' },
    ],
  },
]
