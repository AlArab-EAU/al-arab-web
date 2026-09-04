'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  vx: number
  vy: number
  twinkle: number
  twinkleSpeed: number
  hue: 'white' | 'gold' | 'cyan'
}

interface QuantumFieldProps {
  density?: number
  className?: string
}

/**
 * QuantumField — renders a starfield-like canvas with three layers of particles:
 *  - White "stardust" points (background)
 *  - Gold points (warm accent)
 *  - Cyan points (cool accent)
 *
 * Each particle twinkles at its own frequency and drifts slowly, creating
 * an ethereal quantum-cloud atmosphere inspired by particle physics
 * visualizations and high-end Web3 hero designs.
 *
 * Includes Gaussian-blurred bokeh highlights for depth-of-field simulation.
 */
export function QuantumField({ density = 180, className = '' }: QuantumFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = (canvas.width = canvas.offsetWidth * dpr)
    let h = (canvas.height = canvas.offsetHeight * dpr)

    const init = () => {
      starsRef.current = Array.from({ length: density }, () => {
        const hueRoll = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.3,
          alpha: Math.random() * 0.7 + 0.2,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -Math.random() * 0.12 - 0.02,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.04 + 0.01,
          hue:
            hueRoll > 0.75
              ? ('gold' as const)
              : hueRoll > 0.55
                ? ('cyan' as const)
                : ('white' as const),
        }
      })
    }
    init()

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * dpr
      h = canvas.height = canvas.offsetHeight * dpr
      init()
    }
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const s of starsRef.current) {
        s.x += s.vx
        s.y += s.vy
        s.twinkle += s.twinkleSpeed

        if (s.y < -10) {
          s.y = h + 10
          s.x = Math.random() * w
        }
        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10

        // Twinkle factor 0.4..1.0
        const tw = 0.4 + Math.sin(s.twinkle) * 0.3 + 0.3

        const radius = s.r * dpr
        const color =
          s.hue === 'gold'
            ? `rgba(212, 175, 55, ${s.alpha * tw})`
            : s.hue === 'cyan'
              ? `rgba(0, 212, 255, ${s.alpha * tw * 0.8})`
              : `rgba(255, 255, 255, ${s.alpha * tw * 0.9})`

        // Soft bokeh-like glow
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius * 4)
        grad.addColorStop(0, color)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(s.x, s.y, radius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Sharp core
        ctx.beginPath()
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
