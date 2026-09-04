'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { ParticleField } from '../particle-field'
import { YouTubeCinematic } from '../youtube-cinematic'

export function HeroSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Particle layer */}
      <ParticleField density={120} />

      {/* Decorative ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="h-[520px] w-[520px] rounded-full border border-[#c9a85c]/15 animate-spin-slower" />
        <div className="absolute inset-12 rounded-full border border-[#c9a85c]/10 animate-spin-slow" />
        <div className="absolute inset-32 rounded-full border border-[#c9a85c]/8" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pt-24 text-center md:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a85c]" />
          <span className="font-arabic-serif text-base text-[#d4af37]">
            المستقبل الرقمي للعالم العربي
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a85c]" />
        </motion.div>

        {/* Title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 1.08, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, scale: 1, letterSpacing: '0.18em' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[18vw] font-semibold leading-none tracking-[0.18em] text-gradient-gold text-glow-gold md:text-[10rem] lg:text-[12rem]"
          >
            AL ARAB
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="font-arabic-serif text-3xl text-[#d4af37]/80 md:text-5xl"
            style={{ marginTop: '-0.5rem' }}
          >
            العرب
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 max-w-2xl text-base font-light leading-relaxed text-[#c9b88a] md:text-xl"
        >
          <span className="font-display italic text-[#f4e9c9]">
            The Digital Future of the Arab World
          </span>{' '}
          — un ecosistema unificado donde la tecnología, la cultura y la innovación
          convergen en un metaverso inspirado en el patrimonio árabe.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#vision"
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#d4af37] via-[#c9a85c] to-[#8a6f2e] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#050810] shadow-gold transition-all hover:scale-[1.02]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-full" />
            <Sparkles className="h-4 w-4" />
            Descubrir el ecosistema
          </a>
          <a
            href="#metaverse"
            className="rounded-full border border-[#c9a85c]/40 bg-[#050810]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#f4e9c9] backdrop-blur-md transition-all hover:border-[#d4af37] hover:bg-[#c9a85c]/10"
          >
            Explorar el metaverso
          </a>
        </motion.div>

        {/* Hero video */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 w-full max-w-4xl"
        >
          <YouTubeCinematic
            videoId="5L6tvrXrUWM"
            title="AL ARAB — Official Teaser"
            description="Una mirada cinematográfica al universo digital que está redefiniendo la presencia árabe en el mundo tecnológico global."
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ opacity: titleOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#8a9bb8]">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-[#c9a85c]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
