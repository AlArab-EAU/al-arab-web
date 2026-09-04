'use client'

import { motion } from 'framer-motion'
import {
  Shirt,
  Music2,
  Film,
  UtensilsCrossed,
  Gamepad2,
  Cpu,
  Building2,
  Rocket,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'

const VERTICALS = [
  {
    icon: Shirt,
    title: 'Moda',
    arabic: 'الأزياء',
    description:
      'Marcas de moda regional y global con presencia en el metaverso: colecciones digitales, try-on virtual y desfiles en vivo dentro de la Ciudad Dorada.',
    accent: '#d4af37',
  },
  {
    icon: Music2,
    title: 'Música',
    arabic: 'الموسيقى',
    description:
      'Artistas árabes y internacionales, conciertos virtuales con audiencia global, sellos discográficos y experiencias de audio inmersivo espacial.',
    accent: '#c9a85c',
  },
  {
    icon: Film,
    title: 'Cine',
    arabic: 'السينما',
    description:
      'Producción audiovisual, premieres virtuales y distribuidores especializados en contenido árabe con alcance a audiencias globales.',
    accent: '#d4af37',
  },
  {
    icon: UtensilsCrossed,
    title: 'Gastronomía',
    arabic: 'فن الطهي',
    description:
      'Restaurantes y chefs reconocidos con experiencias digitales, recetas exclusivas y curaduría gastronómica inspirada en la cocina árabe contemporánea.',
    accent: '#c9a85c',
  },
  {
    icon: Gamepad2,
    title: 'Gaming',
    arabic: 'الألعاب',
    description:
      'Estudios de desarrollo, ligas deportivas electrónicas y experiencias jugables integradas al mundo virtual de AlArab.',
    accent: '#d4af37',
  },
  {
    icon: Cpu,
    title: 'Tecnología',
    arabic: 'التكنولوجيا',
    description:
      'Empresas tecnológicas, startups y laboratorios de innovación operando dentro del ecosistema con acceso directo a la comunidad.',
    accent: '#c9a85c',
  },
  {
    icon: Building2,
    title: 'Empresas',
    arabic: 'الشركات',
    description:
      'Marcas consolidadas con presencia corporativa, showrooms virtuales y partnerships estratégicos a largo plazo con AlArab.',
    accent: '#d4af37',
  },
  {
    icon: Rocket,
    title: 'Emprendedores',
    arabic: 'رواد الأعمال',
    description:
      'Programas de incubación, fondos de inversión y mentoría para founders que construyen dentro del ecosistema AlArab.',
    accent: '#c9a85c',
  },
]

export function EcosystemSection() {
  return (
    <Section id="ecosystem">
      <SectionHeading
        eyebrow="Ecosistema"
        arabic="المنظومة"
        title={
          <>
            Ocho verticales,
            <br />
            <span className="text-gradient-gold">una sola comunidad</span>
          </>
        }
        description="El ecosistema AlArab agrupa industrias que tradicionalmente operan de forma aislada. Al integrarlas en un mismo entorno digital, cada vertical se beneficia de la audiencia, la infraestructura y la identidad cultural compartida del conjunto."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VERTICALS.map((v, i) => (
          <motion.article
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
            className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/20 glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a85c]/45"
          >
            <div
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `${v.accent}25` }}
            />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <v.icon className="h-5 w-5 text-[#d4af37]" />
                </div>
                <span className="font-arabic-serif text-lg text-[#c9a85c]/70">
                  {v.arabic}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium text-[#f4e9c9]">
                {v.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#8a9bb8]">
                {v.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Vertical showcase banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass-strong p-8 md:p-12"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl">
              Una identidad cultural, infinitas manifestaciones
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8a9bb8]">
              Cada vertical preserva la esencia estética y narrativa del mundo
              árabe, reinterpretada a través del diseño digital contemporáneo.
              Caligrafía, geometría islámica y paletas inspiradas en el desierto
              y los metales preciosos se integran a cada experiencia.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {['Caligrafía', 'Geometría', 'Patrimonio', 'Diseño', 'Innovación'].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#c9a85c]/30 bg-[#c9a85c]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9b88a]"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
