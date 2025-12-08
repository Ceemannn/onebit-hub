import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { FloatingCta } from './components/layout/FloatingCta.tsx'
import { initGsap } from './lib/gsap.ts'

// Lazy load pages for code splitting and better performance
const HomePage = lazy(() => import('./pages/Home.tsx').then(m => ({ default: m.HomePage })))
const ProjectsPage = lazy(() => import('./pages/build/Projects.tsx').then(m => ({ default: m.ProjectsPage })))
const ServicesPage = lazy(() => import('./pages/build/Services.tsx').then(m => ({ default: m.ServicesPage })))
const DemoPage = lazy(() => import('./pages/build/Demo.tsx').then(m => ({ default: m.DemoPage })))
const DemoCreditPage = lazy(() => import('./pages/build/demos/DemoCredit.tsx').then(m => ({ default: m.DemoCreditPage })))
const DemoForecastPage = lazy(() => import('./pages/build/demos/DemoForecast.tsx').then(m => ({ default: m.DemoForecastPage })))
const DemoHrPage = lazy(() => import('./pages/build/demos/DemoHr.tsx').then(m => ({ default: m.DemoHrPage })))
const DemoAppraisalPage = lazy(() => import('./pages/build/demos/DemoAppraisal.tsx').then(m => ({ default: m.DemoAppraisalPage })))
const DemoInventoryPage = lazy(() => import('./pages/build/demos/DemoInventory.tsx').then(m => ({ default: m.DemoInventoryPage })))
const IndividualsPage = lazy(() => import('./pages/learn/Individuals.tsx').then(m => ({ default: m.IndividualsPage })))
const CourseDetailPage = lazy(() => import('./pages/learn/CourseDetail.tsx').then(m => ({ default: m.CourseDetailPage })))
const CorporationsPage = lazy(() => import('./pages/learn/Corporations.tsx').then(m => ({ default: m.CorporationsPage })))
const BridgePage = lazy(() => import('./pages/Bridge.tsx').then(m => ({ default: m.BridgePage })))
const AboutPage = lazy(() => import('./pages/About.tsx').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('./pages/Contact.tsx').then(m => ({ default: m.ContactPage })))
const LegalPage = lazy(() => import('./pages/Legal.tsx').then(m => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFound.tsx').then(m => ({ default: m.NotFoundPage })))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
  </div>
)

function App() {
  useEffect(() => {
    initGsap()
  }, [])

  return (
    <div className="min-h-screen bg-surface text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-surface">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/build/projects" element={<ProjectsPage />} />
            <Route path="/build/services" element={<ServicesPage />} />
            <Route path="/build/demo" element={<DemoPage />} />
            <Route path="/build/demo/tdafrica-credit-intelligence" element={<DemoCreditPage />} />
            <Route path="/build/demo/demand-forecasting-engine" element={<DemoForecastPage />} />
            <Route path="/build/demo/workforcecore-hr-app" element={<DemoHrPage />} />
            <Route path="/build/demo/perform-deliver" element={<DemoAppraisalPage />} />
            <Route path="/build/demo/buildstock-hommes" element={<DemoInventoryPage />} />
            <Route path="/learn/individuals" element={<IndividualsPage />} />
            <Route path="/learn/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/learn/corporations" element={<CorporationsPage />} />
            <Route path="/bridge" element={<BridgePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            {/* Redirect /learn to /learn/individuals */}
            <Route path="/learn" element={<Navigate to="/learn/individuals" replace />} />
            {/* Redirect /build to /build/projects */}
            <Route path="/build" element={<Navigate to="/build/projects" replace />} />
            {/* 404 fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <FloatingCta />
      <Footer />
    </div>
  )
}

export default App
