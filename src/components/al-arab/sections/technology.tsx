'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  Boxes,
  Glasses,
  Server,
  Lock,
  Cpu,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

const TECH_ICONS = [Brain, Boxes, Glasses, Server, Lock, Cpu]

export function TechnologySection() {
  const { t } = useI18n()
  const tt = t.technology

  return (
    <Section id="technology">
      <SectionHeading
        eyebrow={tt.eyebrow}
        arabic={tt.arabic}
        title={
          <>
            {tt.title}
            <br />
            <span className="text-gradient-gold">{tt.titleHighlight}</span>
          </>
        }
        description={tt.description}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tt.stack.map((tech, i) => {
          const Icon = TECH_ICONS[i] ?? Cpu
          return (
            <motion.article
              key={tech.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a85c]/45 hover:shadow-gold"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#d4af37]/5 blur-3xl transition-opacity duration-500 group-hover:bg-[#d4af37]/15" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                    <Icon className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-[#f4e9c9]">
                      {tech.title}
                    </h3>
                    <span className="font-arabic-serif text-sm text-[#c9a85c]/70">
                      {tech.arabic}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#9a9a9a]">
                  {tech.description}
                </p>

                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {tech.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-[11px] text-[#c9b89a]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Tech stack visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-8 md:p-12"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-medium text-[#f4e9c9]">
              {tt.architectureTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9a9a9a]">
              {tt.architectureDescription}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {tt.layers.map((row, i) => (
              <motion.div
                key={row.layer}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#c9a85c]/15 bg-[#0a0a0a]/60 px-4 py-3"
              >
                <span className="font-display text-sm text-[#f4e9c9]">
                  {row.layer}
                </span>
                <span className="text-xs text-[#9a9a9a]">{row.tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
