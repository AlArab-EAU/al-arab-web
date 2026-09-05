'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { QuantumField } from './quantum-field'

/**
 * Layered cinematic background — quantum edition.
 *
 * Replaces the previous diagonal "rayas doradas" with:
 *  - Animated quantum particle field (stardust + gold + cyan)
 *  - Animated sine-wave frequency lines (oscilloscope-style)
 *  - Energy waves with stroke-dasharray animation
 *  - Radial bokeh glows (gold + cyan)
 *  - Subtle Islamic star pattern (much fainter than before)
 *  - Soft depth-of-field vignette
 *
 * Inspired by particle physics visualizations and Web3 hero designs.
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* === 1. Base deep Islamic blue (smooth gradient, no harsh edges) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 75% at 50% 25%, #1a6ba8 0%, #0f4c81 25%, #0b3a63 50%, #061a2e 80%, #020812 100%)',
        }}
      />

      {/* === 2. Quantum particle field (animated canvas) === */}
      <QuantumField density={220} />

      {/* === 3. Islamic geometric star pattern — VERY subtle now === */}
      <IslamicStarPattern />

      {/* === 4. Radial bokeh glows — combined with cyan star-burst effect from reference === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 70% 30%, rgba(0, 212, 255, 0.14) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 25% 65%, rgba(0, 212, 255, 0.10) 0%, transparent 60%), radial-gradient(ellipse 35% 25% at 50% 90%, rgba(212, 175, 55, 0.08) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 80% 70%, rgba(212, 175, 55, 0.10) 0%, transparent 60%)',
        }}
      />

      {/* === 5. Animated quantum sine-wave frequency lines === */}
      <QuantumWaves />

      {/* === 6. Energy trails (light streams with gradient) === */}
      <EnergyTrails />

      {/* === 7. Floating orbs (bokeh-style with heavy blur) — enhanced cyan + gold === */}
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

      {/* === 8. Subtle arabesque pattern (kept faint) === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.04]" />

      {/* === 9. Noise/grain overlay for quantum field texture === */}
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />

      {/* === 10. Depth-of-field vignette — softened (reference has uniform lighting) === */}
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
 * Islamic geometric star pattern — uses exact reference colors #1A6BA8 (light blue)
 * and #0B3A63 (dark shadow) for the embossed laser-cut effect.
 * Opacity raised to 0.22 to evoke the Islamic Background reference more clearly.
 */
function IslamicStarPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.22]"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <pattern
          id="islamicStar2"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <g
            transform="translate(100,100)"
            stroke="#1a6ba8"
            strokeWidth="1.2"
            fill="none"
            opacity="0.85"
          >
            <rect x="-40" y="-40" width="80" height="80" />
            <rect
              x="-40"
              y="-40"
              width="80"
              height="80"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="22" strokeOpacity="0.5" />
            {/* Inner small star — darker shadow */}
            <rect x="-18" y="-18" width="36" height="36" stroke="#0b3a63" strokeOpacity="0.7" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamicStar2)" />
    </svg>
  )
}

/**
 * QuantumWaves — animated sine-wave lines that flow across the screen,
 * evoking oscilloscope / frequency / vibration aesthetics.
 *
 * Implemented as SVG paths with stroke-dasharray animation that moves
 * along the path, creating the illusion of flowing energy.
 */
function QuantumWaves() {
  // We render 5 sine wave lines at different Y positions and phases
  const waves = [
    { y: 180, amp: 30, freq: 0.012, phase: 0, color: '#d4af37', opacity: 0.35, speed: 14 },
    { y: 320, amp: 45, freq: 0.009, phase: 1.2, color: '#00d4ff', opacity: 0.25, speed: 20 },
    { y: 460, amp: 25, freq: 0.014, phase: 2.4, color: '#d4af37', opacity: 0.30, speed: 16 },
    { y: 620, amp: 38, freq: 0.010, phase: 3.6, color: '#00d4ff', opacity: 0.22, speed: 22 },
    { y: 760, amp: 28, freq: 0.013, phase: 4.8, color: '#d4af37', opacity: 0.28, speed: 18 },
  ]

  const pathFor = (wave: (typeof waves)[number]) => {
    const points: string[] = []
    for (let x = -100; x <= 1600; x += 8) {
      const y = wave.y + Math.sin(x * wave.freq + wave.phase) * wave.amp
      points.push(`${x},${y}`)
    }
    return `M ${points.join(' L ')}`
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
      fill="none"
    >
      <defs>
        <linearGradient id="waveFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="80%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {waves.map((wave, i) => (
        <g key={i} style={{ color: wave.color }}>
          <path
            d={pathFor(wave)}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity={wave.opacity}
            fill="none"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              animation: `quantum-flow ${wave.speed}s linear infinite`,
              strokeDasharray: '12 8',
              strokeDashoffset: 0,
            }}
          />
        </g>
      ))}

      <style>{`
        @keyframes quantum-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }
      `}</style>
    </svg>
  )
}

/**
 * EnergyTrails — long, soft, blurred light streams that fade in/out,
 * evoking long-exposure photography and quantum particle trails.
 *
 * Implemented as SVG paths with linear gradients and large blur filter.
 */
function EnergyTrails() {
  const trails = [
    {
      d: 'M -100 700 Q 300 400 720 480 T 1600 200',
      color: '#d4af37',
      width: 1.5,
      opacity: 0.4,
      duration: 8,
      delay: 0,
    },
    {
      d: 'M -100 200 Q 350 550 720 460 T 1600 720',
      color: '#00d4ff',
      width: 1,
      opacity: 0.3,
      duration: 10,
      delay: 2,
    },
    {
      d: 'M -100 450 Q 400 350 720 420 T 1600 380',
      color: '#d4af37',
      width: 0.8,
      opacity: 0.25,
      duration: 12,
      delay: 4,
    },
  ]

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
      fill="none"
    >
      <defs>
        <linearGradient id="trailFade1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trailFade2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
        <filter id="trailBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
        </filter>
      </defs>

      <g filter="url(#trailBlur)">
        <motion.path
          d={trails[0].d}
          stroke="url(#trailFade1)"
          strokeWidth={trails[0].width}
          fill="none"
          style={{ opacity: trails[0].opacity }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: trails[0].duration, delay: trails[0].delay, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.path
          d={trails[1].d}
          stroke="url(#trailFade2)"
          strokeWidth={trails[1].width}
          fill="none"
          style={{ opacity: trails[1].opacity }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: trails[1].duration, delay: trails[1].delay, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.path
          d={trails[2].d}
          stroke="url(#trailFade1)"
          strokeWidth={trails[2].width}
          fill="none"
          style={{ opacity: trails[2].opacity }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: trails[2].duration, delay: trails[2].delay, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </g>
    </svg>
  )
}
