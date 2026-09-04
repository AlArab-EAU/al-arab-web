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

const TECH = [
  {
    icon: Brain,
    title: 'Inteligencia Artificial',
    arabic: 'الذكاء الاصطناعي',
    description:
      'Modelos de IA generativa y análisis inteligente potencian la creación de contenidos, la moderación, la personalización de experiencias y los asistentes virtuales dentro del ecosistema.',
    points: ['Generación de contenido', 'Moderación automática', 'Asistentes virtuales', 'Personalización'],
  },
  {
    icon: Boxes,
    title: 'Blockchain',
    arabic: 'البلوكتشين',
    description:
      'Registro distribuido para autenticidad, trazabilidad de activos digitales y verificación de identidad. Cada activo del ecosistema es referenciable on-chain.',
    points: ['Trazabilidad de activos', 'Identidad verificable', 'Contratos programables', 'Auditoría pública'],
  },
  {
    icon: Glasses,
    title: 'Realidad Virtual',
    arabic: 'الواقع الافتراضي',
    description:
      'Experiencias inmersivas accesibles desde Web, móvil y headsets VR. El mismo mundo puede ser explorado en 2D, 3D y VR manteniendo continuidad de estado.',
    points: ['Multiplataforma', 'Avatares en tiempo real', 'Voz espacial', 'Eventos en vivo'],
  },
  {
    icon: Server,
    title: 'Infraestructura Digital',
    arabic: 'البنية التحتية',
    description:
      'Arquitectura cloud-native con edge nodes en regiones estratégicas, garantizando baja latencia y disponibilidad continua para usuarios en Medio Oriente y globalmente.',
    points: ['Cloud-native', 'Edge nodes regionales', 'Baja latencia', 'Alta disponibilidad'],
  },
  {
    icon: Lock,
    title: 'Seguridad',
    arabic: 'الأمن',
    description:
      'Cifrado end-to-end, autenticación multifactor y auditoría continua. La seguridad se aplica en cada capa: red, aplicación, identidad y datos.',
    points: ['Cifrado E2E', 'MFA / biometría', 'Auditoría continua', 'Cumplimiento GDPR'],
  },
  {
    icon: Cpu,
    title: 'Computación Avanzada',
    arabic: 'الحوسبة المتقدمة',
    description:
      'Pipeline de render 3D en tiempo real, procesamiento paralelo y servicios escalables para soportar millones de usuarios concurrentes en el metaverso.',
    points: ['Render en tiempo real', 'GPU bajo demanda', 'Escalado horizontal', 'Streaming adaptativo'],
  },
]

export function TechnologySection() {
  return (
    <Section id="technology">
      <SectionHeading
        eyebrow="Tecnología"
        arabic="التكنولوجيا"
        title={
          <>
            Una infraestructura
            <br />
            <span className="text-gradient-gold">diseñada para perdurar</span>
          </>
        }
        description="AlArab combina seis pilares tecnológicos que operan en conjunto: inteligencia artificial, blockchain, realidad virtual, infraestructura cloud, seguridad multicapa y computación avanzada. Cada pilar se construye con estándares abiertos y auditables, listo para escalar a millones de usuarios."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TECH.map((t, i) => (
          <motion.article
            key={t.title}
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
                  <t.icon className="h-6 w-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-[#f4e9c9]">
                    {t.title}
                  </h3>
                  <span className="font-arabic-serif text-sm text-[#c9a85c]/70">
                    {t.arabic}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#8a9bb8]">
                {t.description}
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-2">
                {t.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-[11px] text-[#c9b88a]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
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
              Arquitectura por capas
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8a9bb8]">
              El ecosistema se estructura en cinco capas independientes pero
              integradas. Esta separación permite evolucionar cada capa sin
              comprometer la estabilidad del conjunto, y facilita partnerships
              tecnológicos selectivos en cada nivel.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { layer: 'Capa de experiencia', tech: 'Web · Mobile · VR · AR' },
              { layer: 'Capa de aplicación', tech: 'Marketplace · Social · Events' },
              { layer: 'Capa de datos', tech: 'Identidad · Activos · Perfiles' },
              { layer: 'Capa de consenso', tech: 'Blockchain · Smart contracts' },
              { layer: 'Capa de infraestructura', tech: 'Cloud · Edge · GPU' },
            ].map((row, i) => (
              <motion.div
                key={row.layer}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#c9a85c]/15 bg-[#0a1224]/60 px-4 py-3"
              >
                <span className="font-display text-sm text-[#f4e9c9]">
                  {row.layer}
                </span>
                <span className="text-xs text-[#8a9bb8]">{row.tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
