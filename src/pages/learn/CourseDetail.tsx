import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    Calendar,
    Users,
    Award,
    BookOpen,
    ArrowRight,
    Quote
} from 'lucide-react'
import { courseDetails } from '../../data/courseDetails.ts'
import { Button } from '../../components/ui/button.tsx'
import { useGsapReveal } from '../../hooks/useGsapReveal.ts'
import { generateForexSyllabusPdf } from '../../lib/generateForexSyllabusPdf.ts'

export function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const course = courseId ? courseDetails[courseId] : null
    const containerRef = useGsapReveal<HTMLDivElement>()
    const [isDownloading, setIsDownloading] = useState(false)

    // Handle syllabus download for Forex course
    const handleDownloadSyllabus = async () => {
        if (courseId === 'forex-trading') {
            setIsDownloading(true)
            try {
                await generateForexSyllabusPdf()
            } catch (error) {
                console.error('Error generating PDF:', error)
                alert('There was an error generating the syllabus. Please try again.')
            } finally {
                setIsDownloading(false)
            }
        }
    }

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [courseId])

    const showSuccessBanner = searchParams.get('status') === 'success'

    if (!course) {
        return (
            <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Course Not Found</h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                    The course you are looking for does not exist or has been moved.
                </p>
                <Button className="mt-8" onClick={() => navigate('/learn/individuals')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learn
                </Button>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="container py-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Link to="/learn/individuals" className="hover:text-brand-primary transition-colors">
                        Learn
                    </Link>
                    <span>/</span>
                    <span className="text-neutral-900 font-medium dark:text-white">{course.title}</span>
                </div>

                {showSuccessBanner && (
                    <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-900 shadow-sm dark:border-emerald-500/60 dark:bg-emerald-950/60 dark:text-emerald-100 flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                        <div>
                            <p className="font-semibold">Enrollment successful</p>
                            <p className="mt-0.5 text-xs text-emerald-900/80 dark:text-emerald-100/80">
                                We've received your enrollment. You'll get an email shortly with payment confirmation and next steps.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-neutral-900 py-20 text-white dark:bg-neutral-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/20 via-neutral-900/0 to-transparent"></div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                            {course.track}
                        </div>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                            {course.title}
                        </h1>
                        <p className="mb-8 text-lg text-neutral-300 md:text-xl leading-relaxed">
                            {course.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {courseId === 'forex-trading' ? (
                                <>
                                    <Button
                                        size="lg"
                                        className="bg-brand-primary hover:bg-brand-primary/90 text-white border-none"
                                        onClick={() => navigate(`/learn/enroll/${courseId}`)}
                                    >
                                        Enroll Now
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="border-white/20 text-white hover:bg-white/10"
                                        onClick={handleDownloadSyllabus}
                                        disabled={isDownloading}
                                    >
                                        {isDownloading ? 'Generating...' : 'Download Syllabus'}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white border-none">
                                        Enroll Now
                                    </Button>
                                    <Button size="lg" variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                                        Download Syllabus
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mt-16 grid gap-12 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Overview & Objectives */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">What you'll learn</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {course.objectives.map((objective, i) => (
                                <div key={i} className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-primary" />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{objective}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Curriculum */}
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Curriculum</h2>
                        <div className="space-y-4">
                            {course.curriculum.map((module, i) => (
                                <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                                    <div className="bg-neutral-100 px-6 py-4 font-semibold text-neutral-900 dark:bg-neutral-900 dark:text-white">
                                        Module {i + 1}: {module.title}
                                    </div>
                                    <div className="bg-white p-6 dark:bg-neutral-950/50">
                                        <ul className="space-y-2">
                                            {module.topics.map((topic, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-primary/50"></div>
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {course.id === 'forex-trading' && (
                        <>
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Daily Habits for Success</h2>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Throughout the 6 weeks, commit to:
                                </p>
                                <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                    <li>30-60 minutes of chart time daily</li>
                                    <li>Journaling at least 3 observations per day</li>
                                    <li>Reviewing one previous day's price action</li>
                                    <li>Asking questions in your learning community</li>
                                    <li>Avoiding live trading until Week 6 completion</li>
                                </ul>
                            </section>

                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Tools You'll Need</h2>
                                <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                    <li>Trading Platform: MetaTrader 4/5 or TradingView</li>
                                    <li>Demo Account: Start with $10,000 virtual money</li>
                                    <li>Trading Journal: Spreadsheet or dedicated app</li>
                                    <li>Economic Calendar: ForexFactory or similar</li>
                                    <li>Learning Mindset: Patience and discipline</li>
                                </ul>
                            </section>

                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Success Metrics</h2>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    By the end of 6 weeks, you should be able to:
                                </p>
                                <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                    <li>Identify market structure confidently</li>
                                    <li>Spot order blocks and fair value gaps</li>
                                    <li>Understand liquidity concepts</li>
                                    <li>Execute trades with proper risk management</li>
                                    <li>Maintain a 1:2 minimum risk-reward ratio</li>
                                    <li>Complete top-down analysis independently</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Remember: Forex trading is a skill that takes time to master. These 6 weeks are just the
                                    beginning of your journey. Stay patient, stay disciplined, and never stop learning!
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Disclaimer: Trading involves risk. Never trade with money you cannot afford to lose. Always
                                    start with a demo account and only transition to live trading when consistently profitable over
                                    at least 3 months.
                                </p>
                            </section>
                        </>
                    )}

                    {/* Instructor */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Your Instructor</h2>
                        <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center">
                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                                {/* Placeholder for instructor image */}
                                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-neutral-400">
                                    {course.instructor.name.charAt(0)}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{course.instructor.name}</h3>
                                <p className="text-brand-primary font-medium mb-2">{course.instructor.role}</p>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    {course.instructor.bio}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    {course.testimonials.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Student Stories</h2>
                            <div className="grid gap-6">
                                {course.testimonials.map((testimonial, i) => (
                                    <div key={i} className="relative rounded-2xl bg-brand-primary/5 p-8">
                                        <Quote className="absolute top-6 left-6 h-8 w-8 text-brand-primary/20" />
                                        <p className="relative z-10 mb-6 text-lg italic text-neutral-700 dark:text-neutral-300">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-brand-primary/20 flex items-center justify-center font-bold text-brand-primary text-sm">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</div>
                                                <div className="text-xs text-neutral-500">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <h3 className="mb-6 text-lg font-bold text-neutral-900 dark:text-white">Course Details</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Clock className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Duration</div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{course.duration}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Calendar className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Format</div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{course.format}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Users className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Target Audience</div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {course.targetAudience.join(', ')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <BookOpen className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Prerequisites</div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {course.prerequisites.join(', ')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Award className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Certification</div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{course.certification}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                            <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white">
                                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <p className="mt-3 text-center text-xs text-neutral-500">
                                Limited spots available for next cohort.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
