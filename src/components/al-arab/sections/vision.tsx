'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Sparkles,
  ShoppingBag,
  Landmark,
  Lightbulb,
  Users,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'

const PILLARS = [
  {
    icon: Cpu,
    title: 'Tecnología',
    arabic: 'التكنولوجيا',
    description:
      'Infraestructura digital de última generación: inteligencia artificial, blockchain y computación en la nube diseñadas para escalar el patrimonio árabe al mundo digital del mañana.',
  },
  {
    icon: Sparkles,
    title: 'Entretenimiento',
    arabic: 'الترفيه',
    description:
      'Experiencias inmersivas que combinan cine, música y narrativas árabes llevadas al metaverso, abriendo nuevas formas de conectar con audiencias globales.',
  },
  {
    icon: ShoppingBag,
    title: 'Comercio',
    arabic: 'التجارة',
    description:
      'Un marketplace digital con activos verificables on-chain, donde marcas y creadores ofrecen productos culturales y digitales a una comunidad conectada.',
  },
  {
    icon: Landmark,
    title: 'Cultura',
    arabic: 'الثقافة',
    description:
      'Preservación y proyección del patrimonio árabe en formato digital: arte, caligrafía, arquitectura y tradiciones reinterpretadas para una nueva era.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    arabic: 'الابتكار',
    description:
      'Programas de investigación aplicada, laboratorios de creadores y partnerships estratégicos que impulsan el siguiente salto tecnológico regional.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    arabic: 'المجتمع',
    description:
      'Una red global de usuarios, creadores, marcas y desarrolladores que comparten identidad, valores y oportunidades dentro del ecosistema AlArab.',
  },
]

export function VisionSection() {
  return (
    <Section id="vision">
      <SectionHeading
        eyebrow="La Visión"
        arabic="الرؤية"
        title={
          <>
            Un ecosistema digital,
            <br />
            <span className="text-gradient-gold">no solo una plataforma</span>
          </>
        }
        description="AlArab se concibe como un entorno integrado donde convergen seis dominios estratégicos. No es un producto, es una capa de civilización digital: cada pilar fortalece a los demás, formando una infraestructura cultural y económica para el mundo árabe del futuro."
      />

      <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/20 glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a85c]/45 hover:shadow-gold"
          >
            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <p.icon className="h-6 w-6 text-[#d4af37]" />
                </div>
                <span className="font-arabic-serif text-xl text-[#c9a85c]/70">
                  {p.arabic}
                </span>
              </div>
              <h3 className="font-display text-2xl font-medium text-[#f4e9c9]">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#8a9bb8]">
                {p.description}
              </p>
              <div className="mt-2 flex items-center gap-2 text-[#d4af37]/80">
                <span className="h-px w-6 bg-[#c9a85c]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                  Pillar {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
