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
 * SpinningCoin — renders the AlArab coin rotating in a full 360° circle.
 *
 * The coin rotates around its center axis (like a record/disc spinning),
 * with a 3D perspective effect that gives it depth. A subtle brightness
 * modulation simulates light catching the surface as it turns.
 *
 * Architecture: three nested layers:
 *   - Outer div: parallax/float (translateY)
 *   - Middle div: floating animation (translateY)
 *   - Inner div: 360° rotation (rotate)
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

  // CSS keyframes for circular rotation + float
  const keyframes = `
    @keyframes alarab-coin-rotate {
      0%   { transform: rotate(0deg)   rotateY(0deg);  filter: brightness(1) drop-shadow(0 0 20px rgba(212,175,55,0.3)); }
      25%  { transform: rotate(90deg)  rotateY(15deg); filter: brightness(1.15) drop-shadow(0 0 25px rgba(212,175,55,0.4)); }
      50%  { transform: rotate(180deg) rotateY(0deg);  filter: brightness(1) drop-shadow(0 0 20px rgba(212,175,55,0.3)); }
      75%  { transform: rotate(270deg) rotateY(15deg); filter: brightness(0.85) drop-shadow(0 0 15px rgba(212,175,55,0.2)); }
      100% { transform: rotate(360deg) rotateY(0deg);  filter: brightness(1) drop-shadow(0 0 20px rgba(212,175,55,0.3)); }
    }
    @keyframes alarab-coin-float {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }
    @keyframes alarab-coin-orbit {
      0%   { transform: scale(1.08) rotate(0deg); }
      100% { transform: scale(1.08) rotate(360deg); }
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

        {/* Orbiting ring (rotates in circle, opposite direction, slower) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full border border-[#c9a85c]/20"
          style={{
            animation: reduced
              ? 'none'
              : `alarab-coin-orbit ${spinDuration * 1.4}s linear infinite`,
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
          {/* Inner rotating layer — 360° circular rotation with 3D perspective */}
          <div
            className="relative"
            style={{
              width: size,
              height: size,
              maxWidth: '90vw',
              maxHeight: '90vw',
              perspective: '800px',
              transformStyle: 'preserve-3d',
              animation: reduced
                ? 'none'
                : `alarab-coin-rotate ${spinDuration}s linear infinite`,
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
