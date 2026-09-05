'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  hue: number
}

interface ParticleFieldProps {
  density?: number
  className?: string
}

/**
 * Animated particle/star canvas — gold + soft blue specks floating upward
 * evokes a sense of cosmic scale and digital arabesque.
 */
export function ParticleField({ density = 80, className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio)
    let h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio)

    const init = () => {
      particlesRef.current = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.35 - 0.05,
        r: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.4 ? 45 : 215,
      }))
    }
    init()

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio
      init()
    }
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        const color =
          p.hue === 45
            ? `rgba(212, 175, 55, ${p.alpha})`
            : `rgba(140, 170, 220, ${p.alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * window.devicePixelRatio, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowBlur = 8 * window.devicePixelRatio
        ctx.shadowColor = color
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
