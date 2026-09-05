'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Handshake } from 'lucide-react'

/**
 * PartnersPhoto — displays the official partners group photo with
 * cinematic treatment: glass overlay frame, gold accent border,
 * and bilingual caption.
 */
export function PartnersPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-[#d4af37]/35 shadow-deep"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src="/partners-photo-optimized.jpg"
          alt="AL ARAB — Official partners and leadership team"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
          loading="lazy"
          unoptimized
        />

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10, 46, 92, 0.95) 0%, rgba(10, 46, 92, 0.4) 35%, transparent 60%), linear-gradient(to right, rgba(10, 46, 92, 0.6) 0%, transparent 30%)',
          }}
        />

        {/* Top-right badge */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#0a2e5c]/70 px-4 py-2 backdrop-blur-md">
          <Handshake className="h-4 w-4 text-[#d4af37]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            Official Partners
          </span>
        </div>

        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-[#d4af37]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Leadership & Partners
            </span>
          </div>
          <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl">
            Strategic alliances driving the ecosystem
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8a96a8]">
            A unified network of leaders, investors, and cultural ambassadors
            shaping the digital future of the Arab world.
          </p>
        </div>
      </div>

      {/* Gold accent border bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
    </motion.div>
  )
}
