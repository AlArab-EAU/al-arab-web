'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

type PhaseStatus = 'done' | 'active' | 'next' | 'planned'

interface StatusMeta {
  icon: typeof CheckCircle2
  color: string
}

export function RoadmapSection() {
  const { t } = useI18n()
  const rt = t.roadmap
  const statusLabels = rt.statusLabels as Record<PhaseStatus, string>

  const statusMeta = (status: PhaseStatus): StatusMeta => {
    switch (status) {
      case 'done':
        return { icon: CheckCircle2, color: '#d4af37' }
      case 'active':
        return { icon: Loader2, color: '#c9a85c' }
      case 'next':
        return { icon: Circle, color: '#0a2e5c' }
      case 'planned':
        return { icon: Circle, color: '#0a2e5c' }
    }
  }

  return (
    <Section id="roadmap">
      <SectionHeading
        eyebrow={rt.eyebrow}
        arabic={rt.arabic}
        title={
          <>
            {rt.title}
            <br />
            <span className="text-gradient-gold">{rt.titleHighlight}</span>
          </>
        }
        description={rt.description}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {rt.phases.map((phase, i) => {
          const meta = statusMeta(phase.status as PhaseStatus)
          const StatusIcon = meta.icon
          const label = statusLabels[phase.status as PhaseStatus] ?? phase.status
          return (
            <motion.article
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-6"
            >
              {/* Vertical line / connector */}
              {i < rt.phases.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-5 -translate-y-1/2 translate-x-full bg-gradient-to-r from-[#c9a85c]/40 to-transparent lg:block" />
              )}

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-3xl font-semibold text-gradient-gold">
                  {phase.id}
                </span>
                <StatusIcon
                  className={`h-5 w-5 ${phase.status === 'active' ? 'animate-spin' : ''}`}
                  style={{ color: meta.color }}
                />
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <h3 className="font-display text-lg font-medium text-[#f4e9c9]">
                  {phase.title}
                </h3>
                <span className="font-arabic-serif text-sm text-[#c9a85c]/70">
                  {phase.arabic}
                </span>
              </div>
              <span
                className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: meta.color }}
              >
                {label}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#0a2e5c]">
                {phase.period}
              </span>

              <p className="mt-4 text-xs leading-relaxed text-[#a8b8c8]">
                {phase.description}
              </p>

              <ul className="mt-5 flex flex-col gap-1.5 border-t border-[#c9a85c]/12 pt-4">
                {phase.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 text-[11px] text-[#c9b88a]"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: meta.color }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
