'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { Section, SectionHeading } from '../section'

const PHASES = [
  {
    id: '01',
    title: 'Fundación',
    arabic: 'التأسيس',
    period: 'Fase inicial',
    description:
      'Concepción del ecosistema, definición de la arquitectura tecnológica, partnerships estratégicos iniciales y diseño de la identidad visual del universo AlArab.',
    deliverables: [
      'Identidad de marca',
      'Arquitectura tecnológica',
      'Equipo fundador',
      'Alianzas iniciales',
    ],
    status: 'done',
  },
  {
    id: '02',
    title: 'Lanzamiento',
    arabic: 'الإطلاق',
    period: 'Activación inicial',
    description:
      'Lanzamiento de la presencia pública de AlArab, teaser cinematográfico, los primeros distritos del metaverso y el marketplace digital en versión inicial.',
    deliverables: [
      'Web oficial',
      'Metaverso v1',
      'Marketplace beta',
      'Comunidad inicial',
    ],
    status: 'active',
  },
  {
    id: '03',
    title: 'Expansión',
    arabic: 'التوسع',
    period: 'Crecimiento regional',
    description:
      'Apertura de nuevos distritos, integración de partners corporativos, programa para creadores y despliegue de la capa de identidad y billetera en producción.',
    deliverables: [
      'Nuevos distritos',
      'Programa de creadores',
      'Billetera en producción',
      'Partners corporativos',
    ],
    status: 'next',
  },
  {
    id: '04',
    title: 'Metaverso completo',
    arabic: 'الميتافيرس الكامل',
    period: 'Madurez del ecosistema',
    description:
      'Integración de VR nativa, voz espacial, eventos en vivo a gran escala y conectividad cross-platform. El mundo virtual alcanza su forma definitiva.',
    deliverables: [
      'VR nativa',
      'Eventos en vivo',
      'Conectividad total',
      'Comunidad global',
    ],
    status: 'planned',
  },
  {
    id: '05',
    title: 'Ecosistema global',
    arabic: 'المنظومة العالمية',
    period: 'Escalado internacional',
    description:
      'Expansión del modelo AlArab a otras geografías y culturas, manteniendo la identidad árabe como núcleo, con hubs regionales y una red federada de ecosistemas.',
    deliverables: [
      'Hubs regionales',
      'Red federada',
      'Expansión cultural',
      'Comunidad mundial',
    ],
    status: 'planned',
  },
]

const STATUS_MAP = {
  done: {
    icon: CheckCircle2,
    label: 'Completado',
    color: '#d4af37',
  },
  active: {
    icon: Loader2,
    label: 'En curso',
    color: '#c9a85c',
  },
  next: {
    icon: Circle,
    label: 'Próxima',
    color: '#5d7ba8',
  },
  planned: {
    icon: Circle,
    label: 'Planificada',
    color: '#5d7ba8',
  },
} as const

export function RoadmapSection() {
  return (
    <Section id="roadmap">
      <SectionHeading
        eyebrow="Roadmap"
        arabic="خريطة الطريق"
        title={
          <>
            Cinco fases hacia
            <br />
            <span className="text-gradient-gold">el ecosistema global</span>
          </>
        }
        description="La hoja de ruta de AlArab se estructura en cinco fases que conectan la concepción del proyecto con su consolidación como ecosistema global. Cada fase tiene entregables verificables y marca el inicio de la siguiente."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {PHASES.map((phase, i) => {
          const status = STATUS_MAP[phase.status as keyof typeof STATUS_MAP]
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
              {i < PHASES.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-5 -translate-y-1/2 translate-x-full bg-gradient-to-r from-[#c9a85c]/40 to-transparent lg:block" />
              )}

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-3xl font-semibold text-gradient-gold">
                  {phase.id}
                </span>
                <status.icon
                  className={`h-5 w-5 ${phase.status === 'active' ? 'animate-spin' : ''}`}
                  style={{ color: status.color }}
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
                style={{ color: status.color }}
              >
                {status.label}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#5d7ba8]">
                {phase.period}
              </span>

              <p className="mt-4 text-xs leading-relaxed text-[#8a9bb8]">
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
                      style={{ background: status.color }}
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
