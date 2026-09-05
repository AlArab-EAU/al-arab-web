'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { QuantumField } from './quantum-field'

/**
 * Layered cinematic background — Islamic luxury edition.
 *
 * Composition:
 *  - Deep royal blue gradient base (#1A6BA8 → #0F4C81 → #0B3A63 → dark)
 *  - Animated quantum particle field (stardust + gold + cyan)
 *  - PROMINENT Islamic geometric star pattern (Khatam 8-pointed stars)
 *  - Radial bokeh glows (gold + cyan star-bursts)
 *  - Floating orbs (bokeh-style with heavy blur)
 *  - Subtle arabesque overlay + noise + vignette
 *
 * No diagonal stripes, no sine waves, no energy trails — pure Islamic luxury.
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* === 1. Base deep Islamic blue (smooth gradient) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 75% at 50% 25%, #1a6ba8 0%, #0f4c81 25%, #0b3a63 50%, #061a2e 80%, #020812 100%)',
        }}
      />

      {/* === 2. Quantum particle field (animated canvas) === */}
      <QuantumField density={180} />

      {/* === 3. PROMINENT Islamic geometric star pattern === */}
      <IslamicStarPattern />

      {/* === 4. Radial bokeh glows — cyan star-bursts + gold accents === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 70% 30%, rgba(0, 212, 255, 0.14) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 25% 65%, rgba(0, 212, 255, 0.10) 0%, transparent 60%), radial-gradient(ellipse 35% 25% at 50% 90%, rgba(212, 175, 55, 0.08) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 80% 70%, rgba(212, 175, 55, 0.10) 0%, transparent 60%)',
        }}
      />

      {/* === 5. Floating orbs (bokeh-style with heavy blur) === */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[10%] top-[15%] h-80 w-80 rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[#00d4ff]/12 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[8%] top-[60%] h-96 w-96 rounded-full blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/10 animate-float-medium" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[45%] top-[85%] h-64 w-64 rounded-full blur-[100px]"
      >
        <div className="h-full w-full rounded-full bg-[#00d4ff]/8 animate-float-slow" />
      </motion.div>

      {/* === 6. Subtle arabesque pattern === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.06]" />

      {/* === 7. Noise/grain overlay === */}
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />

      {/* === 8. Depth-of-field vignette === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 45%, transparent 40%, rgba(2, 8, 18, 0.5) 100%)',
        }}
      />
    </div>
  )
}

/**
 * Islamic geometric star pattern — PROMINENT.
 * Uses exact reference colors: #1A6BA8 (light) and #0B3A63 (dark shadow).
 * Opacity 0.35 — clearly visible embossed laser-cut effect.
 * Multiple layers of stars at different scales for richness.
 */
function IslamicStarPattern() {
  return (
    <>
      {/* Main star pattern — larger stars */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
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
              stroke="#1a6ba8"
              strokeWidth="1.4"
              fill="none"
              opacity="0.9"
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
              <circle cx="0" cy="0" r="28" strokeOpacity="0.55" />
              {/* Inner small star — darker shadow */}
              <rect x="-20" y="-20" width="40" height="40" stroke="#0b3a63" strokeOpacity="0.8" />
              <rect
                x="-20"
                y="-20"
                width="40"
                height="40"
                stroke="#0b3a63"
                strokeOpacity="0.6"
                transform="rotate(45)"
              />
              {/* Outer connecting lines — network feel */}
              <line x1="0" y1="-100" x2="0" y2="-50" strokeOpacity="0.4" />
              <line x1="0" y1="50" x2="0" y2="100" strokeOpacity="0.4" />
              <line x1="-100" y1="0" x2="-50" y2="0" strokeOpacity="0.4" />
              <line x1="50" y1="0" x2="100" y2="0" strokeOpacity="0.4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicStarMain)" />
      </svg>

      {/* Secondary finer pattern — small dots at intersections */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.25]"
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
            <circle cx="25" cy="25" r="1.2" fill="#1a6ba8" opacity="0.6" />
            <circle cx="0" cy="0" r="0.8" fill="#0b3a63" opacity="0.5" />
            <circle cx="50" cy="0" r="0.8" fill="#0b3a63" opacity="0.5" />
            <circle cx="0" cy="50" r="0.8" fill="#0b3a63" opacity="0.5" />
            <circle cx="50" cy="50" r="0.8" fill="#0b3a63" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicDots)" />
      </svg>
    </>
  )
}

