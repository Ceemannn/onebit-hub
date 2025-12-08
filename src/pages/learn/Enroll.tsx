import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, CreditCard, Shield, Clock, Users, Award } from 'lucide-react'
import { loadStripe, type Stripe as StripeClient } from '@stripe/stripe-js'
import { Button } from '../../components/ui/button.tsx'
import { courseDetails } from '../../data/courseDetails.ts'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'

// Course pricing configuration
const coursePricing: Record<string, { price: number; currency: string; stripePriceId: string }> = {
  'forex-trading': {
    price: 7000, // in cents ($70)
    currency: 'USD',
    stripePriceId: 'price_1Sc2IGCoN6Y6mDq5dBS1FPLX', // Replace with actual Stripe Price ID
  },
  // Add more courses as needed
}

export function EnrollPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const containerRef = useGsapReveal<HTMLDivElement>()
  
  const course = courseId ? courseDetails[courseId] : null
  const pricing = courseId ? coursePricing[courseId] : null
  
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: 'beginner',
  })

  if (!course || !pricing) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Course Not Found</h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          The course you are looking for is not available for enrollment.
        </p>
        <Button className="mt-8" onClick={() => navigate('/learn/individuals')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
      </div>
    )
  }

  const formatPrice = (amount: number, currency: string) => {
    if (currency === 'NGN') {
      return `₦${(amount / 100).toLocaleString()}`
    }
    return `$${(amount / 100).toLocaleString()}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Read Stripe publishable key from environment
      const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined

      if (!publishableKey) {
        alert('Payment is not available right now. Stripe publishable key is not configured.')
        return
      }

      const stripe = await loadStripe(publishableKey)

      if (!stripe) {
        alert('Unable to initialize payment. Please try again later.')
        return
      }

      const stripeClient = stripe as StripeClient

      const successUrl = `${window.location.origin}/learn/course/${courseId}?status=success`
      const cancelUrl = `${window.location.origin}/learn/enroll/${courseId}`

      const { error } = await stripeClient.redirectToCheckout({
        mode: 'payment',
        lineItems: [
          {
            price: pricing.stripePriceId,
            quantity: 1,
          },
        ],
        customerEmail: formData.email,
        clientReferenceId: courseId ?? undefined,
        successUrl,
        cancelUrl,
      })

      if (error) {
        console.error('Stripe redirect error:', error)
        alert(error.message ?? 'There was an error redirecting to the payment page. Please try again.')
      }
      
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('There was an error processing your enrollment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="container py-6">
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Link to="/learn/individuals" className="hover:text-brand-primary transition-colors">
            Learn
          </Link>
          <span>/</span>
          <Link to={`/learn/course/${courseId}`} className="hover:text-brand-primary transition-colors">
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium dark:text-white">Enroll</span>
        </div>
      </div>

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Enrollment Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
                Enroll in {course.title}
              </h1>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                Complete your enrollment to start your trading journey with Onebit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Trading Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 transition-colors focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  >
                    <option value="beginner">Complete Beginner</option>
                    <option value="some">Some Experience (less than 1 year)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>
              </div>

              {/* Payment Section */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-5 w-5 text-brand-primary" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white">Payment Details</h3>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-neutral-600 dark:text-neutral-400">Course Fee</span>
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">
                    {formatPrice(pricing.price, pricing.currency)}
                  </span>
                </div>
                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                  Secure payment powered by Stripe. Your payment information is encrypted and secure.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Pay {formatPrice(pricing.price, pricing.currency)} & Enroll
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Money-back Guarantee</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right: Course Summary */}
          <div className="lg:pl-8">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-6 inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                  {course.track}
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">{course.title}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">{course.description}</p>

                <div className="space-y-4 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brand-primary" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">Duration</div>
                      <div className="text-xs text-neutral-500">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-brand-primary" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">Format</div>
                      <div className="text-xs text-neutral-500">{course.format}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-brand-primary" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">Certification</div>
                      <div className="text-xs text-neutral-500">{course.certification}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    '6 weeks of structured learning',
                    'Live trading sessions with instructor',
                    'Access to private learning community',
                    'Trading journal templates',
                    'Certificate of completion',
                    'Lifetime access to course materials',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Your Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-lg font-bold text-brand-primary">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-white">{course.instructor.name}</div>
                    <div className="text-xs text-brand-primary">{course.instructor.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
