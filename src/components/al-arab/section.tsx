'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  arabic?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  arabic,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      {(eyebrow || arabic) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          {arabic && (
            <span className="font-arabic-serif text-base text-[#c9a85c]/80">
              {arabic}
            </span>
          )}
          {eyebrow && (
            <>
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a85c]" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a85c]">
                {eyebrow}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a85c]" />
            </>
          )}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl font-medium leading-tight tracking-tight text-[#f4e9c9] md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`max-w-2xl text-base leading-relaxed text-[#a8b8c8] md:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** When true, adds a dark blue background to this section */
  dark?: boolean
}

export function Section({ id, children, className = '', dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${
        dark
          ? 'bg-[#0a2e5c]/60 backdrop-blur-sm border-y border-[#d4af37]/15'
          : ''
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
        {children}
      </div>
    </section>
  )
}
