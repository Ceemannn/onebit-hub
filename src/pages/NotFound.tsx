import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '../components/ui/button.tsx'

export function NotFoundPage() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="space-y-6 max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <span className="text-4xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
          Page not found
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              <Home size={16} />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/contact" className="inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Contact Us
            </Link>
          </Button>
        </div>
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link to="/build/projects" className="text-brand-primary hover:underline">Build</Link>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <Link to="/learn/individuals" className="text-brand-primary hover:underline">Learn</Link>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <Link to="/bridge" className="text-brand-primary hover:underline">Bridge</Link>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <Link to="/about" className="text-brand-primary hover:underline">About</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
