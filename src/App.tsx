import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Header } from './components/layout/Header.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { FloatingCta } from './components/layout/FloatingCta.tsx'
import { CommandPalette } from './components/shared/CommandPalette.tsx'
import { ScrollProgress } from './components/shared/ScrollProgress.tsx'
import { CustomCursor } from './components/shared/CustomCursor.tsx'
import { PageSkeleton } from './components/shared/Skeleton.tsx'
import { initGsap } from './lib/gsap.ts'

// Lazy load pages for code splitting and better performance
const HomePage = lazy(() => import('./pages/Home.tsx').then(m => ({ default: m.HomePage })))
const ProjectsPage = lazy(() => import('./pages/build/Projects.tsx').then(m => ({ default: m.ProjectsPage })))
const ServicesPage = lazy(() => import('./pages/build/Services.tsx').then(m => ({ default: m.ServicesPage })))
const DemoCreditPage = lazy(() => import('./pages/build/demos/DemoCredit.tsx').then(m => ({ default: m.DemoCreditPage })))
const DemoForecastPage = lazy(() => import('./pages/build/demos/DemoForecast.tsx').then(m => ({ default: m.DemoForecastPage })))
const DemoHrPage = lazy(() => import('./pages/build/demos/DemoHr.tsx').then(m => ({ default: m.DemoHrPage })))
const DemoAppraisalPage = lazy(() => import('./pages/build/demos/DemoAppraisal.tsx').then(m => ({ default: m.DemoAppraisalPage })))
const DemoInventoryPage = lazy(() => import('./pages/build/demos/DemoInventory.tsx').then(m => ({ default: m.DemoInventoryPage })))
const IndividualsPage = lazy(() => import('./pages/learn/Individuals.tsx').then(m => ({ default: m.IndividualsPage })))
const CourseDetailPage = lazy(() => import('./pages/learn/CourseDetail.tsx').then(m => ({ default: m.CourseDetailPage })))
const CorporationsPage = lazy(() => import('./pages/learn/Corporations.tsx').then(m => ({ default: m.CorporationsPage })))
const EnrollPage = lazy(() => import('./pages/learn/Enroll.tsx').then(m => ({ default: m.EnrollPage })))
const CorporateProposalPage = lazy(() => import('./pages/learn/CorporateProposal.tsx').then(m => ({ default: m.CorporateProposalPage })))
const BridgePage = lazy(() => import('./pages/Bridge.tsx').then(m => ({ default: m.BridgePage })))
const ComingSoonPage = lazy(() => import('./pages/ComingSoon.tsx').then(m => ({ default: m.ComingSoonPage })))
const AboutPage = lazy(() => import('./pages/About.tsx').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('./pages/Contact.tsx').then(m => ({ default: m.ContactPage })))
const LegalPage = lazy(() => import('./pages/Legal.tsx').then(m => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFound.tsx').then(m => ({ default: m.NotFoundPage })))

// Loading fallback — branded page skeleton
const PageLoader = () => <PageSkeleton />

function App() {
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    initGsap()
  }, [])

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-surface text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-surface">
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/build/projects" element={<ProjectsPage />} />
            <Route path="/build/services" element={<ServicesPage />} />
            <Route path="/build/demo" element={<Navigate to="/build/projects" replace />} />
            <Route path="/build/demo/credit-intelligence" element={<DemoCreditPage />} />
            <Route path="/build/demo/demand-forecasting-engine" element={<DemoForecastPage />} />
            <Route path="/build/demo/workforcecore-hr-app" element={<DemoHrPage />} />
            <Route path="/build/demo/perform-deliver" element={<DemoAppraisalPage />} />
            <Route path="/build/demo/buildstock-hommes" element={<DemoInventoryPage />} />
            <Route path="/learn/individuals" element={<IndividualsPage />} />
            <Route path="/learn/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/learn/enroll/:courseId" element={<EnrollPage />} />
            <Route path="/learn/corporations" element={<CorporationsPage />} />
            <Route path="/learn/corporate-proposal" element={<CorporateProposalPage />} />
            <Route path="/bridge" element={<BridgePage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
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
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <FloatingCta />
      <Footer />
    </div>
  )
}

export default App
