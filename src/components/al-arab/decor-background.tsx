'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Layered cinematic background — inspired by the user's reference image:
 *
 *  - Deep matte black base (#050505 / #0A0A0A)
 *  - Overlapping translucent dark curves creating depth
 *  - Halftone dot patterns fading from edges toward center
 *  - Sweeping golden curves crossing the composition (1–2 bold + hairlines)
 *  - Subtle grain/noise for premium texture
 *
 * Combined with the existing arabesque pattern and gold halo for the
 * cinematic AL ARAB identity.
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const curveY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* === 1. Base deep matte black === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 0%, #0d0d0d 0%, #080808 40%, #050505 80%)',
        }}
      />

      {/* === 2. Overlapping translucent dark curves (depth layers) === */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <defs>
          <linearGradient id="curveDark1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e0e0e" stopOpacity="0" />
            <stop offset="50%" stopColor="#181818" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0e0e0e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveDark2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0" />
            <stop offset="50%" stopColor="#1a1a1a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveDark3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#080808" stopOpacity="0" />
            <stop offset="50%" stopColor="#161616" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sweeping dark curve 1 — bottom-left to top-right */}
        <path
          d="M -200 800 Q 400 400 800 500 T 1700 100"
          stroke="url(#curveDark1)"
          strokeWidth="280"
          fill="none"
        />
        {/* Sweeping dark curve 2 — top-left to bottom-right */}
        <path
          d="M -200 100 Q 400 500 800 400 T 1700 800"
          stroke="url(#curveDark2)"
          strokeWidth="220"
          fill="none"
        />
        {/* Subtle vertical dark curve */}
        <path
          d="M 720 -100 Q 720 400 720 900"
          stroke="url(#curveDark3)"
          strokeWidth="500"
          fill="none"
        />
      </svg>

      {/* === 3. Halftone dot patterns on left & right borders === */}
      <HalftoneDots side="left" />
      <HalftoneDots side="right" />

      {/* === 4. Sweeping golden curves === */}
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
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#f4e9c9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldCurve2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a85c" stopOpacity="0" />
            <stop offset="50%" stopColor="#c9a85c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c9a85c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Bold golden sweep — bottom-left to top-right */}
        <path
          d="M -100 750 Q 400 400 720 420 T 1600 150"
          stroke="url(#goldCurve1)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Hairline companion curves */}
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

        {/* Bold golden sweep — top-left to bottom-right */}
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

      {/* === 5. Subtle arabesque pattern (kept from original) === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.06]" />

      {/* === 6. Soft gold halo top center === */}
      <div className="absolute inset-0 bg-radial-gold opacity-60" />

      {/* === 7. Floating orbs (kept, tuned down) === */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full blur-[110px]"
      >
        <div className="h-full w-full rounded-full bg-[#d4af37]/8 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[6%] top-[55%] h-96 w-96 rounded-full blur-[130px]"
      >
        <div className="h-full w-full rounded-full bg-[#3a3a3a]/12 animate-float-medium" />
      </motion.div>

      {/* === 8. Perspective grid floor (kept, more subtle) === */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-x-0 bottom-0 h-[50vh] bg-grid-gold opacity-15"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[50vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.7) 30%, transparent 100%)',
        }}
      />

      {/* === 9. Noise/grain overlay for premium texture === */}
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />

      {/* === 10. Vignette to deepen edges === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  )
}

/**
 * Halftone dot pattern — fades from dense (outer edge) to sparse (center).
 * Implemented as an SVG pattern so it scales crisply at any resolution.
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
        opacity: 0.5,
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
            <circle cx="2" cy="2" r="1.1" fill="#2a2a2a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#halftone-${side})`} />
      </svg>
    </div>
  )
}
