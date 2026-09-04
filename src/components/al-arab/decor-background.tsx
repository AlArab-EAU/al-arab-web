'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Layered cinematic background — inspired by the Islamic luxury reference:
 *
 *  - Deep Islamic blue base (#0b4065)
 *  - Geometric Islamic star pattern overlay
 *  - Cyan/teal radial glows for ethereal depth
 *  - Sweeping golden curves crossing the composition
 *  - Gold halo top + arabesque pattern (subtle)
 *  - Vignette + grain for premium cinematic finish
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const curveY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* === 1. Base deep Islamic blue === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 0%, #0d4568 0%, #0b4065 40%, #082740 80%)',
        }}
      />

      {/* === 2. Islamic geometric star pattern overlay === */}
      <IslamicStarPattern />

      {/* === 3. Cyan/teal radial glows === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 25% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 75% 70%, rgba(0, 212, 255, 0.06) 0%, transparent 60%)',
        }}
      />

      {/* === 4. Overlapping translucent dark blue curves === */}
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <defs>
          <linearGradient id="curveDark1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f5b8a" stopOpacity="0" />
            <stop offset="50%" stopColor="#1565a8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f5b8a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveDark2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082740" stopOpacity="0" />
            <stop offset="50%" stopColor="#0b4065" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#082740" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M -200 800 Q 400 400 800 500 T 1700 100"
          stroke="url(#curveDark1)"
          strokeWidth="280"
          fill="none"
        />
        <path
          d="M -200 100 Q 400 500 800 400 T 1700 800"
          stroke="url(#curveDark2)"
          strokeWidth="220"
          fill="none"
        />
      </svg>

      {/* === 5. Halftone dot patterns on left & right borders === */}
      <HalftoneDots side="left" />
      <HalftoneDots side="right" />

      {/* === 6. Sweeping golden curves === */}
      <motion.svg
        style={{ y: curveY }}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <defs>
          <linearGradient id="goldCurve1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#f4e9c9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldCurve2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a85c" stopOpacity="0" />
            <stop offset="50%" stopColor="#c9a85c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c9a85c" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M -100 750 Q 400 400 720 420 T 1600 150"
          stroke="url(#goldCurve1)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M -100 760 Q 400 410 720 430 T 1600 160"
          stroke="url(#goldCurve2)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -100 780 Q 400 430 720 450 T 1600 180"
          stroke="url(#goldCurve2)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M -100 740 Q 400 390 720 410 T 1600 140"
          stroke="url(#goldCurve2)"
          strokeWidth="0.5"
          fill="none"
        />

        <path
          d="M -100 150 Q 400 500 720 480 T 1600 750"
          stroke="url(#goldCurve1)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M -100 160 Q 400 510 720 490 T 1600 760"
          stroke="url(#goldCurve2)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M -100 140 Q 400 490 720 470 T 1600 740"
          stroke="url(#goldCurve2)"
          strokeWidth="0.4"
          fill="none"
        />
      </motion.svg>

      {/* === 7. Subtle arabesque pattern === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.08]" />

      {/* === 8. Gold halo top center === */}
      <div className="absolute inset-0 bg-radial-gold opacity-80" />

      {/* === 9. Floating orbs === */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full blur-[110px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/12 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[6%] top-[55%] h-96 w-96 rounded-full blur-[130px]"
      >
        <div className="h-full w-full rounded-full bg-[#00d4ff]/10 animate-float-medium" />
      </motion.div>

      {/* === 10. Perspective grid floor (very subtle) === */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-x-0 bottom-0 h-[50vh] bg-grid-gold opacity-10"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[50vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(11, 64, 101, 1) 0%, rgba(11, 64, 101, 0.7) 30%, transparent 100%)',
        }}
      />

      {/* === 11. Noise/grain overlay === */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />

      {/* === 12. Vignette === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(8, 39, 64, 0.55) 100%)',
        }}
      />
    </div>
  )
}

/**
 * Islamic geometric star pattern — renders an SVG with 8-pointed stars
 * (Khatam-style) tiled across the screen in slightly darker blue,
 * with cyan glows at star intersections.
 */
function IslamicStarPattern() {
  // 8-pointed star: two overlapping squares at 0° and 45°
  // We tile them every 200px in a 5-column pattern
  const stars = []
  for (let x = -50; x < 1450; x += 200) {
    for (let y = -50; y < 950; y += 200) {
      stars.push({ x, y })
    }
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-30"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
      fill="none"
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="islamicStar"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* 8-pointed star = two overlapping squares */}
          <g
            transform="translate(100,100)"
            stroke="#1565a8"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          >
            <rect x="-40" y="-40" width="80" height="80" />
            <rect
              x="-40"
              y="-40"
              width="80"
              height="80"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="22" strokeOpacity="0.4" />
          </g>
        </pattern>
      </defs>

      {/* Tile the pattern */}
      <rect width="100%" height="100%" fill="url(#islamicStar)" />

      {/* Cyan glow dots at strategic intersections (every 3rd star) */}
      {stars
        .filter((_, i) => i % 5 === 0)
        .map((s, i) => (
          <circle
            key={i}
            cx={s.x + 100}
            cy={s.y + 100}
            r="50"
            fill="url(#starGlow)"
          />
        ))}
    </svg>
  )
}

/**
 * Halftone dot pattern on the side borders — denser at the edges,
 * fading toward the center.
 */
function HalftoneDots({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} w-1/4 md:w-1/5`}
      style={{
        maskImage:
          side === 'left'
            ? 'linear-gradient(to right, black 0%, transparent 100%)'
            : 'linear-gradient(to left, black 0%, transparent 100%)',
        WebkitMaskImage:
          side === 'left'
            ? 'linear-gradient(to right, black 0%, transparent 100%)'
            : 'linear-gradient(to left, black 0%, transparent 100%)',
        opacity: 0.4,
      }}
    >
      <svg className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern
            id={`halftone-${side}`}
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.1" fill="#1565a8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#halftone-${side})`} />
      </svg>
    </div>
  )
}
