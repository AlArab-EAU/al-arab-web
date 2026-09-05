'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { QuantumField } from './quantum-field'

/**
 * Layered cinematic background — elegant Arab culture edition.
 *
 * Design inspired by Islamic luxury references:
 *  - Diagonal gradient from deep navy (top-left) to soft royal blue (bottom-right)
 *  - PROMINENT Islamic geometric star pattern (Khatam 8-pointed stars)
 *  - Subtle radial light glow top-center (like dawn breaking)
 *  - Floating orbs with soft blur
 *  - Subtle arabesque overlay + noise + vignette
 *
 * The gradient creates an elegant transition between dark and light blue,
 * evoking the passage from night to dawn — a key motif in Islamic poetry.
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* === 1. Base — elegant diagonal gradient: deep navy → royal blue → soft light blue === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0a1a3a 0%, #0d2657 25%, #1a3a6b 50%, #2c5a9e 75%, #4a7bc4 100%)',
        }}
      />

      {/* === 2. Radial light glow top-center (like dawn breaking) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168, 197, 232, 0.25) 0%, transparent 50%)',
        }}
      />

      {/* === 3. Quantum particle field (animated canvas — subtle stardust) === */}
      <QuantumField density={120} />

      {/* === 4. PROMINENT Islamic geometric star pattern === */}
      <IslamicStarPattern />

      {/* === 5. Radial bokeh glows — gold + cyan accents === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 75% 25%, rgba(212, 175, 55, 0.12) 0%, transparent 60%), radial-gradient(ellipse 35% 25% at 20% 70%, rgba(0, 212, 255, 0.10) 0%, transparent 60%), radial-gradient(ellipse 30% 20% at 50% 90%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* === 6. Floating orbs (bokeh-style with heavy blur) === */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[8%] top-[20%] h-80 w-80 rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[#a8c5e8]/15 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[10%] top-[55%] h-96 w-96 rounded-full blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/10 animate-float-medium" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[40%] top-[80%] h-72 w-72 rounded-full blur-[110px]"
      >
        <div className="h-full w-full rounded-full bg-[#4a7bc4]/15 animate-float-slow" />
      </motion.div>

      {/* === 7. Subtle arabesque pattern === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.06]" />

      {/* === 8. Noise/grain overlay === */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />

      {/* === 9. Soft vignette (very subtle for elegant look) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(10, 26, 58, 0.4) 100%)',
        }}
      />
    </div>
  )
}

/**
 * Islamic geometric star pattern — PROMINENT and elegant.
 * Uses colors that complement the gradient: lighter blue stars on darker blue base.
 * Opacity 0.30 — clearly visible but doesn't compete with content.
 */
function IslamicStarPattern() {
  return (
    <>
      {/* Main star pattern — larger stars */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.30]"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="islamicStarMain"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <g
              transform="translate(100,100)"
              stroke="#a8c5e8"
              strokeWidth="1.2"
              fill="none"
              opacity="0.7"
            >
              {/* 8-pointed star = two overlapping squares */}
              <rect x="-45" y="-45" width="90" height="90" />
              <rect
                x="-45"
                y="-45"
                width="90"
                height="90"
                transform="rotate(45)"
              />
              <circle cx="0" cy="0" r="28" strokeOpacity="0.5" />
              {/* Inner small star — darker for embossed effect */}
              <rect x="-20" y="-20" width="40" height="40" stroke="#d4af37" strokeOpacity="0.4" strokeWidth="0.8" />
              {/* Outer connecting lines */}
              <line x1="0" y1="-100" x2="0" y2="-50" strokeOpacity="0.3" />
              <line x1="0" y1="50" x2="0" y2="100" strokeOpacity="0.3" />
              <line x1="-100" y1="0" x2="-50" y2="0" strokeOpacity="0.3" />
              <line x1="50" y1="0" x2="100" y2="0" strokeOpacity="0.3" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicStarMain)" />
      </svg>

      {/* Secondary finer pattern — small dots at intersections */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.20]"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="islamicDots"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="1" fill="#a8c5e8" opacity="0.5" />
            <circle cx="0" cy="0" r="0.7" fill="#d4af37" opacity="0.3" />
            <circle cx="50" cy="0" r="0.7" fill="#d4af37" opacity="0.3" />
            <circle cx="0" cy="50" r="0.7" fill="#d4af37" opacity="0.3" />
            <circle cx="50" cy="50" r="0.7" fill="#d4af37" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicDots)" />
      </svg>
    </>
  )
}
