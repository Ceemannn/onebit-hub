import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gradient progress rail fixed to the top of the viewport, tracking how far
 * the user has scrolled through the page. Reads as a "tech app" affordance.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-indigo-500 via-emerald-500 to-gold-500"
    />
  )
}
