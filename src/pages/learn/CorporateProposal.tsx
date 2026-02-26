import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Building2, Users, Target, Calendar, FileText, GraduationCap, Cloud } from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading.tsx'
import { Button } from '../../components/ui/button.tsx'
import { corporateTracks } from '../../data/siteContent.ts'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'
import { gsap } from '../../lib/gsap.ts'

export function CorporateProposalPage() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 50 })
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])
  const [requirementType, setRequirementType] = useState<'training' | 'saas'>('training')
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const saasServices = [
    'ERP / Odoo Implementation',
    'Custom Dashboard Development',
    'Data Pipeline & ETL Setup',
    'Business Intelligence Platform',
    'HR & Payroll System',
    'Inventory Management System',
    'CRM Integration',
    'API Development & Integration',
    'Cloud Infrastructure Setup',
    'Process Automation (RPA)',
    'AI/ML Model Deployment',
    'Custom Software Development',
  ]

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  const handleTrackToggle = (track: string) => {
    setSelectedTracks((prev) =>
      prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = formRef.current
    if (!form) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { scale: 1 },
        { scale: 0.98, yoyo: true, repeat: 1, duration: 0.2, ease: 'power1.inOut' },
      )
    }, form)
    ctx.revert()
  }

  const inputClass =
    'w-full rounded-2xl border border-neutral-900/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 outline-none ring-brand-primary/20 focus:ring-2 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white'
  const labelClass = 'text-sm font-medium text-neutral-700 dark:text-neutral-200'

  return (
    <div ref={ref} className="space-y-12">
      <section className="container space-y-10">
        <div className="flex items-center gap-4">
          <Link
            to="/learn/corporations"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-brand-primary"
          >
            <ArrowLeft size={16} />
            Back to Corporate Training
          </Link>
        </div>

        <SectionHeading
          eyebrow="Corporate Proposal"
          title="Request a tailored training proposal for your team."
          description="Tell us about your organization, goals, and requirements. We'll craft a custom training program that fits your needs."
        />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-neutral-900/10 bg-white/90 p-8 shadow-soft dark:border-white/10 dark:bg-neutral-900/80"
        >
          {/* Section 1: Company Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="rounded-xl bg-brand-primary/10 p-2 text-brand-primary">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Company Information</h3>
                <p className="text-sm text-neutral-500">Tell us about your organization</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="companyName">
                  Company name *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  required
                  className={inputClass}
                  placeholder="Acme Corporation"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="industry">
                  Industry *
                </label>
                <select id="industry" name="industry" required className={inputClass}>
                  <option value="">Select industry</option>
                  <option>Financial Services</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Manufacturing</option>
                  <option>Retail & E-commerce</option>
                  <option>Telecommunications</option>
                  <option>Energy & Utilities</option>
                  <option>Government & Public Sector</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="companySize">
                  Company size *
                </label>
                <select id="companySize" name="companySize" required className={inputClass}>
                  <option value="">Select size</option>
                  <option>1-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>501-1000 employees</option>
                  <option>1000+ employees</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="country">
                  Country / Region *
                </label>
                <input
                  id="country"
                  name="country"
                  required
                  className={inputClass}
                  placeholder="Nigeria"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Person */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="rounded-xl bg-brand-teal/10 p-2 text-brand-teal">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Contact Person</h3>
                <p className="text-sm text-neutral-500">Who should we reach out to?</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="contactName">
                  Full name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="contactEmail">
                  Work email *
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="john.doe@company.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="contactPhone">
                  Phone number
                </label>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  className={inputClass}
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="contactRole">
                  Job title / Role *
                </label>
                <input
                  id="contactRole"
                  name="contactRole"
                  required
                  className={inputClass}
                  placeholder="HR Manager, L&D Lead, CTO..."
                />
              </div>
            </div>
          </div>

          {/* Section 3: Requirements Type Toggle */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="rounded-xl bg-accent-indigo/10 p-2 text-accent-indigo">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">What do you need?</h3>
                <p className="text-sm text-neutral-500">Select the type of service you're looking for</p>
              </div>
            </div>

            {/* Toggle Nav Panel */}
            <div className="flex rounded-2xl border border-neutral-200 p-1 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setRequirementType('training')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  requirementType === 'training'
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`}
              >
                <GraduationCap size={18} />
                Training Requirements
              </button>
              <button
                type="button"
                onClick={() => setRequirementType('saas')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  requirementType === 'saas'
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`}
              >
                <Cloud size={18} />
                SaaS Deployment / Assistance
              </button>
            </div>

            {/* Training Requirements Content */}
            {requirementType === 'training' && (
              <div className="space-y-6 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700">
                <div className="space-y-2">
                  <label className={labelClass}>
                    Select training tracks of interest *
                  </label>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {corporateTracks.map((track) => (
                      <label
                        key={track}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-all ${
                          selectedTracks.includes(track)
                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                            : 'border-neutral-200 text-neutral-700 hover:border-brand-primary/30 dark:border-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="tracks"
                          value={track}
                          checked={selectedTracks.includes(track)}
                          onChange={() => handleTrackToggle(track)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded border ${
                            selectedTracks.includes(track)
                              ? 'border-brand-primary bg-brand-primary text-white'
                              : 'border-neutral-300 dark:border-neutral-600'
                          }`}
                        >
                          {selectedTracks.includes(track) && (
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                            </svg>
                          )}
                        </span>
                        {track}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="teamSize">
                      Number of participants *
                    </label>
                    <select id="teamSize" name="teamSize" className={inputClass}>
                      <option value="">Select team size</option>
                      <option>1-10 participants</option>
                      <option>11-25 participants</option>
                      <option>26-50 participants</option>
                      <option>51-100 participants</option>
                      <option>100+ participants</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="skillLevel">
                      Current skill level
                    </label>
                    <select id="skillLevel" name="skillLevel" className={inputClass}>
                      <option value="">Select level</option>
                      <option>Beginner - No prior experience</option>
                      <option>Intermediate - Some experience</option>
                      <option>Advanced - Looking to upskill</option>
                      <option>Mixed levels</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SaaS Deployment Content */}
            {requirementType === 'saas' && (
              <div className="space-y-6 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700">
                <div className="space-y-2">
                  <label className={labelClass}>
                    Select services you need *
                  </label>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {saasServices.map((service) => (
                      <label
                        key={service}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-all ${
                          selectedServices.includes(service)
                            ? 'border-brand-teal bg-brand-teal/5 text-brand-teal'
                            : 'border-neutral-200 text-neutral-700 hover:border-brand-teal/30 dark:border-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded border ${
                            selectedServices.includes(service)
                              ? 'border-brand-teal bg-brand-teal text-white'
                              : 'border-neutral-300 dark:border-neutral-600'
                          }`}
                        >
                          {selectedServices.includes(service) && (
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                            </svg>
                          )}
                        </span>
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="deploymentType">
                      Deployment type *
                    </label>
                    <select id="deploymentType" name="deploymentType" className={inputClass}>
                      <option value="">Select deployment type</option>
                      <option>Cloud-hosted (SaaS)</option>
                      <option>On-premise</option>
                      <option>Hybrid</option>
                      <option>Not sure - need consultation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="userCount">
                      Expected number of users
                    </label>
                    <select id="userCount" name="userCount" className={inputClass}>
                      <option value="">Select user count</option>
                      <option>1-25 users</option>
                      <option>26-100 users</option>
                      <option>101-500 users</option>
                      <option>500+ users</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="existingSystems">
                      Existing systems to integrate with
                    </label>
                    <input
                      id="existingSystems"
                      name="existingSystems"
                      className={inputClass}
                      placeholder="e.g., SAP, Salesforce, QuickBooks..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="supportLevel">
                      Support level needed
                    </label>
                    <select id="supportLevel" name="supportLevel" className={inputClass}>
                      <option value="">Select support level</option>
                      <option>Basic - Email support</option>
                      <option>Standard - Email + Phone</option>
                      <option>Premium - Dedicated account manager</option>
                      <option>Enterprise - 24/7 support + SLA</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClass} htmlFor="technicalRequirements">
                    Technical requirements or constraints
                  </label>
                  <textarea
                    id="technicalRequirements"
                    name="technicalRequirements"
                    rows={3}
                    className={inputClass}
                    placeholder="Security requirements, compliance needs (GDPR, SOC2), data residency, performance requirements..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Timeline & Budget */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="rounded-xl bg-brand-warm/10 p-2 text-brand-warm">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Timeline & Budget</h3>
                <p className="text-sm text-neutral-500">Help us understand your constraints</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="startDate">
                  Preferred start date
                </label>
                <select id="startDate" name="startDate" className={inputClass}>
                  <option value="">Select timeframe</option>
                  <option>As soon as possible</option>
                  <option>Within 1 month</option>
                  <option>Within 3 months</option>
                  <option>Within 6 months</option>
                  <option>Flexible / Planning ahead</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="deliveryMode">
                  Preferred delivery mode
                </label>
                <select id="deliveryMode" name="deliveryMode" className={inputClass}>
                  <option value="">Select mode</option>
                  <option>In-person (on-site)</option>
                  <option>Virtual / Online</option>
                  <option>Hybrid (mix of both)</option>
                  <option>Self-paced with support</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="budget">
                Budget range (optional)
              </label>
              <select id="budget" name="budget" className={inputClass}>
                <option value="">Prefer not to say</option>
                <option>Under ₦1,000,000</option>
                <option>₦1,000,000 - ₦5,000,000</option>
                <option>₦5,000,000 - ₦10,000,000</option>
                <option>₦10,000,000 - ₦25,000,000</option>
                <option>₦25,000,000+</option>
                <option>Need guidance on budgeting</option>
              </select>
            </div>
          </div>

          {/* Section 5: Additional Context */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="rounded-xl bg-neutral-200 p-2 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Additional Context</h3>
                <p className="text-sm text-neutral-500">Help us understand your unique needs</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="goals">
                What are your primary goals? *
              </label>
              <textarea
                id="goals"
                name="goals"
                rows={3}
                required
                className={inputClass}
                placeholder={requirementType === 'training' 
                  ? 'e.g., Upskill data team for AI adoption, prepare developers for cloud migration, improve analytics capabilities...'
                  : 'e.g., Automate inventory management, build real-time dashboards, integrate HR systems...'
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="challenges">
                Current challenges or skill gaps
              </label>
              <textarea
                id="challenges"
                name="challenges"
                rows={3}
                className={inputClass}
                placeholder="Describe any specific challenges your team faces or skills they're lacking..."
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="additionalInfo">
                Anything else we should know?
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                className={inputClass}
                placeholder="Special requirements, certifications needed, integration with existing L&D programs, success metrics..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="border-t border-neutral-200 pt-6 dark:border-neutral-700">
            <Button type="submit" className="w-full md:w-auto">
              Submit Proposal Request
            </Button>
            <p className="mt-4 text-xs text-neutral-500">
              We'll review your request and get back to you within 2 business days with a tailored proposal.
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}
