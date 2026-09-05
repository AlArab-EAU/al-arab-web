'use client'

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

interface SpinningCoinProps {
  src: string
  alt: string
  /** Diameter in pixels for desktop. Auto-scales on mobile. */
  size?: number
  /** Rotation duration in seconds (one full revolution). Default: 18s */
  spinDuration?: number
  /** Optional parallax: bind Y to scroll progress for floating effect */
  parallax?: boolean
  /** Glow intensity (0–1). Default: 0.5 */
  glow?: number
  className?: string
}

/**
 * SpinningCoin — renders the AlArab coin as a 3D-rotating element.
 *
 * The "rotation" effect is achieved by horizontally squishing the coin from
 * scaleX(1) → scaleX(0.05) → scaleX(-1) → scaleX(-0.05) → scaleX(1) over a
 * long duration. Combined with a subtle brightness modulation (simulating
 * light catching the rim), the result reads as a coin spinning on its
 * vertical axis — the classic Bitcoin/crypto coin animation.
 *
 * Architecture: two nested divs:
 *   - Outer div: handles parallax/float (translateY)
 *   - Inner div: handles the spin (scaleX)
 * This separation is necessary because CSS animations can only animate a
 * given property once per element.
 */
export function SpinningCoin({
  src,
  alt,
  size = 280,
  spinDuration = 18,
  parallax = false,
  glow = 0.5,
  className = '',
}: SpinningCoinProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // CSS keyframes for spin (scaleX) and float (translateY).
  // The two animations target DIFFERENT CSS properties so they can coexist
  // on a single element via the `animation` shorthand multi-value syntax.
  // BUT: `transform` itself can only be owned by one animation per element.
  // So we split:
  //   - .alarab-coin-float-layer animates translateY (outer)
  //   - .alarab-coin-spin-layer animates scaleX (inner)
  const keyframes = `
    @keyframes alarab-coin-spin {
      0%   { transform: scaleX(1);    filter: brightness(1); }
      25%  { transform: scaleX(0.05); filter: brightness(0.55); }
      50%  { transform: scaleX(-1);   filter: brightness(1); }
      75%  { transform: scaleX(-0.05); filter: brightness(0.55); }
      100% { transform: scaleX(1);    filter: brightness(1); }
    }
    @keyframes alarab-coin-float {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }
  `

  const containerStyle: React.CSSProperties = parallax
    ? { y: y as unknown as MotionValue<string>, willChange: 'transform' }
    : {}

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <motion.div
        ref={ref}
        style={containerStyle}
        className={`relative inline-flex ${className}`}
      >
        {/* Glow halo behind coin */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(212,175,55,${glow}) 0%, rgba(212,175,55,0) 70%)`,
          }}
        />

        {/* Orbiting ring (also spins, opposite direction, slower) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full border border-[#c9a85c]/20"
          style={{
            transform: 'scale(1.08)',
            animation: reduced
              ? 'none'
              : `alarab-coin-spin ${spinDuration * 1.4}s linear infinite`,
          }}
        />

        {/* Outer floating layer (translateY only) */}
        <div
          style={{
            animation: reduced
              ? 'none'
              : `alarab-coin-float ${spinDuration * 0.7}s ease-in-out infinite`,
          }}
        >
          {/* Inner spinning layer (scaleX only) — contains the coin image */}
          <div
            className="relative"
            style={{
              width: size,
              height: size,
              maxWidth: '90vw',
              maxHeight: '90vw',
              animation: reduced
                ? 'none'
                : `alarab-coin-spin ${spinDuration}s linear infinite`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={size}
              height={size}
              sizes={`${size}px`}
              className="h-full w-full object-contain"
              style={{
                filter: `drop-shadow(0 12px 40px rgba(212,175,55,${glow * 0.8}))`,
              }}
              priority={size > 200}
              loading={size > 200 ? 'eager' : 'lazy'}
              unoptimized
            />
          </div>
        </div>

        {/* Reflective gradient overlay (static, on top, suggests 3D embossing) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.2) 100%)',
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </>
  )
}
