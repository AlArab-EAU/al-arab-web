'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { QuantumField } from './quantum-field'

/**
 * Layered cinematic background — dark futuristic vault edition.
 *
 * Inspired by the reference image:
 *  - Very dark base (almost black with slight purple tint #0f0f13)
 *  - Purple/violet radial glows (#8b5cf6) creating spotlight effects
 *  - Blurred bokeh orbs in purple and blue
 *  - Subtle grid/matrix pattern overlay
 *  - Glowing geometric network lines (hexagonal nodes)
 *  - Noise/grain texture for premium feel
 *  - Vignette for depth
 */
export function DecorBackground() {
  const { scrollYProgress } = useScroll()
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ minHeight: '100%' }}>
      {/* === 1. Base — very dark with slight purple tint (like a digital vault) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 20%, #1a1a2e 0%, #0f0f1a 30%, #0a0a0f 60%, #050508 100%)',
          minHeight: '100%',
        }}
      />

      {/* === 2. Purple radial spotlight (top center) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 15%, rgba(139, 92, 246, 0.20) 0%, transparent 60%)',
        }}
      />

      {/* === 3. Blue secondary glow (left center) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 25% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* === 4. Purple glow (right center) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 35% 25% at 75% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* === 5. Subtle grid/matrix pattern overlay === */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* === 6. Glowing geometric network nodes (fixed for full page visibility) === */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.4]">
        <NetworkNodes />
      </div>

      {/* === 7. Quantum particle field (subtle stardust) === */}
      <QuantumField density={80} />

      {/* === 8. Floating bokeh orbs (heavy blur, purple + blue) === */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[12%] top-[15%] h-72 w-72 rounded-full blur-[100px]"
      >
        <div className="h-full w-full rounded-full bg-[#8b5cf6]/12 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[#3b82f6]/10 animate-float-medium" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[40%] top-[75%] h-80 w-80 rounded-full blur-[110px]"
      >
        <div className="h-full w-full rounded-full bg-[#8b5cf6]/8 animate-float-slow" />
      </motion.div>
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[30%] top-[85%] h-64 w-64 rounded-full blur-[90px]"
      >
        <div className="h-full w-full rounded-full bg-[#3b82f6]/8 animate-float-medium" />
      </motion.div>

      {/* === 9. Subtle arabesque pattern (very faint, for Arab identity) === */}
      <div className="absolute inset-0 arab-pattern opacity-[0.03]" />

      {/* === 10. Noise/grain overlay for premium texture === */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />

      {/* === 11. Vignette (darken edges, focus center) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 40%, rgba(5, 5, 8, 0.6) 100%)',
        }}
      />
    </div>
  )
}

/**
 * NetworkNodes — glowing hexagonal/geometric nodes connected by faint lines,
 * evoking a network topology / blockchain aesthetic.
 */
function NetworkNodes() {
  const nodes = [
    { x: 15, y: 25 }, { x: 35, y: 15 }, { x: 60, y: 20 }, { x: 85, y: 30 },
    { x: 20, y: 55 }, { x: 50, y: 45 }, { x: 75, y: 55 }, { x: 40, y: 75 },
    { x: 65, y: 80 }, { x: 90, y: 70 }, { x: 10, y: 80 }, { x: 30, y: 40 },
  ]

  const connections = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
    [4, 5], [5, 6], [6, 9], [4, 11], [5, 7], [7, 8], [8, 9], [10, 4],
  ]

  return (
    <div className="absolute inset-0 opacity-[0.4]">
      <svg
        className="absolute inset-0 h-screen w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 700"
        fill="none"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {connections.map(([a, b], i) => (
          <line
            key={`line-${i}`}
            x1={nodes[a].x * 10}
            y1={nodes[a].y * 7}
            x2={nodes[b].x * 10}
            y2={nodes[b].y * 7}
            stroke="#8b5cf6"
            strokeWidth="1.5"
            opacity="0.6"
          />
        ))}

        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle cx={node.x * 10} cy={node.y * 7} r="20" fill="url(#nodeGlow)" />
            <circle cx={node.x * 10} cy={node.y * 7} r="4" fill="#a78bfa" opacity="1" />
          </g>
        ))}
      </svg>
    </div>
  )
}
