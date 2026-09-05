'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { QuantumField } from './quantum-field'

/**
 * Layered cinematic background — Islamic luxury with dark blue → light blue → gray.
 *
 * Inspired by reference image:
 *  - Vertical gradient: dark navy (top) → royal blue (mid) → sky blue (bottom)
 *  - PROMINENT Islamic geometric pattern with embossed/debossed effect (drop shadows)
 *  - Glowing cyan star bursts arranged in rows (like decorative lanterns)
 *  - Subtle quantum particle field
 *  - Soft vignette
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ minHeight: '100%' }}>
      {/* === 1. Base — gradient: dark navy (top) → slate gray (bottom)
         Covers full page height so gradient is visible across all sections === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0a194d 0%, #162e6e 15%, #1e3a5f 30%, #334155 50%, #475569 70%, #94a3b8 100%)',
          minHeight: '100%',
        }}
      />

      {/* === 2. Radial glow top-center (light source on dark blue) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37, 99, 235, 0.25) 0%, transparent 60%)',
        }}
      />

      {/* === 3. PROMINENT Islamic geometric pattern with embossed effect === */}
      <IslamicStarPattern />

      {/* === 4. Glowing star bursts — DISABLED to keep only dark blue + gray === */}
      {/* <StarBursts /> */}

      {/* === 5. Quantum particle field (subtle stardust) === */}
      <QuantumField density={100} />

      {/* === 6. Radial bokeh glows — gold + subtle blue === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 75% 30%, rgba(212, 175, 55, 0.14) 0%, transparent 55%), radial-gradient(ellipse 35% 25% at 25% 70%, rgba(37, 99, 235, 0.10) 0%, transparent 60%)',
        }}
      />

      {/* === 7. Floating orbs — gold + slate gray === */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[8%] top-[20%] h-80 w-80 rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/10 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[10%] top-[55%] h-96 w-96 rounded-full blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[#94a3b8]/12 animate-float-medium" />
      </motion.div>

      {/* === 8. Subtle arabesque pattern === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.05]" />

      {/* === 9. Noise/grain overlay === */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />

      {/* === 10. Soft vignette === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(10, 46, 92, 0.4) 100%)',
        }}
      />
    </div>
  )
}

/**
 * Islamic geometric star pattern — PROMINENT with embossed effect.
 * Uses SVG filters to create drop shadows that simulate carved/cut paper.
 * Colors: lighter blue lines on darker blue base, with subtle shadows.
 */
function IslamicStarPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.35]"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        {/* Drop shadow filter for embossed effect */}
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="1" dy="1" result="offsetBlur" />
          <feFlood floodColor="#0a194d" floodOpacity="0.6" />
          <feComposite in2="offsetBlur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <pattern
          id="islamicStarEmbossed"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <g
            transform="translate(100,100)"
            stroke="#64748b"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
            filter="url(#emboss)"
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
            {/* Inner small star — gold accent */}
            <rect x="-20" y="-20" width="40" height="40" stroke="#d4af37" strokeOpacity="0.4" strokeWidth="0.8" />
            {/* Outer connecting lines */}
            <line x1="0" y1="-100" x2="0" y2="-50" strokeOpacity="0.3" />
            <line x1="0" y1="50" x2="0" y2="100" strokeOpacity="0.3" />
            <line x1="-100" y1="0" x2="-50" y2="0" strokeOpacity="0.3" />
            <line x1="50" y1="0" x2="100" y2="0" strokeOpacity="0.3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamicStarEmbossed)" />
    </svg>
  )
}

/**
 * StarBursts — glowing cyan 8-pointed stars arranged in rows,
 * like decorative lanterns in the reference image.
 * Each star has a soft radial glow that simulates a light source.
 */
function StarBursts() {
  // Arrange stars in 2 rows
  const topRow = [15, 35, 55, 75, 95]
  const midRow = [25, 50, 75]

  return (
    <div className="absolute inset-0">
      {/* Top row of star bursts */}
      {topRow.map((x, i) => (
        <div
          key={`top-${i}`}
          className="absolute"
          style={{
            left: `${x}%`,
            top: '15%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <StarBurst delay={i * 0.5} />
        </div>
      ))}

      {/* Middle row of star bursts */}
      {midRow.map((x, i) => (
        <div
          key={`mid-${i}`}
          className="absolute"
          style={{
            left: `${x}%`,
            top: '45%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <StarBurst delay={i * 0.7 + 1} size={60} />
        </div>
      ))}
    </div>
  )
}

function StarBurst({ delay = 0, size = 40 }: { delay?: number; size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-lg"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%)',
        }}
      />
      {/* 8-pointed star SVG */}
      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full"
        fill="none"
      >
        <g
          transform="translate(50,50)"
          stroke="#2563eb"
          strokeWidth="1.5"
          opacity="0.8"
        >
          <rect x="-30" y="-30" width="60" height="60" />
          <rect
            x="-30"
            y="-30"
            width="60"
            height="60"
            transform="rotate(45)"
          />
        </g>
        {/* Center bright dot */}
        <circle cx="50" cy="50" r="3" fill="#2563eb" opacity="0.9" />
      </svg>
    </motion.div>
  )
}
