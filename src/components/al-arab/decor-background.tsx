'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Layered decorative background — combines:
 * - Deep gradient sky (midnight → black)
 * - Animated golden grid (cybernetic cityscape floor)
 * - Radial gold halo
 * - Subtle arabesque pattern
 * - Floating orbs
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,45,80,0.55) 0%, rgba(10,16,32,0.85) 35%, #050810 70%)',
        }}
      />
      {/* Soft gold halo top */}
      <div className="absolute inset-0 bg-radial-gold" />
      {/* Arabesque pattern */}
      <div className="absolute inset-0 arab-pattern opacity-[0.18]" />
      {/* Grid floor perspective */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-x-0 bottom-0 h-[60vh] bg-grid-gold opacity-30"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(5,8,16,1) 0%, rgba(5,8,16,0.6) 30%, transparent 100%)',
        }}
      />
      {/* Floating orbs */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full blur-[100px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/15 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[6%] top-[55%] h-96 w-96 rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[#3a5a8a]/25 animate-float-medium" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[35%] top-[80%] h-64 w-64 rounded-full blur-[90px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/10 animate-float-slow" />
      </motion.div>
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />
    </div>
  )
}
