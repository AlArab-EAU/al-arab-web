'use client'

import { motion } from 'framer-motion'
import {
  Globe2,
  Building2,
  Glasses,
  Store,
  Palette,
  Network,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { YouTubeCinematic } from '../youtube-cinematic'

const DISTRICTS = [
  {
    name: 'Ciudad Dorada',
    arabic: 'المدينة الذهبية',
    description:
      'Distrito financiero digital donde empresas y bancos establecen presencia, rooftops de oro y arquitectura neo-futurista inspirada en Abu Dhabi.',
  },
  {
    name: 'Plaza de la Cultura',
    arabic: 'ساحة الثقافة',
    description:
      'Galerías, museos y espacios de exposición virtual con caligrafía árabe viva, arte interactivo y archivos patrimoniales preservados on-chain.',
  },
  {
    name: 'Souk Digital',
    arabic: 'السوق الرقمي',
    description:
      'Marketplace inmersivo donde marcas ofrecen productos físicos y digitales, con try-on virtual y experiencias de compra social.',
  },
  {
    name: 'Distrito Creativo',
    arabic: 'الحي الإبداعي',
    description:
      'Studios, escenarios y laboratorios para creadores: cine, música, gaming y arte digital tienen aquí su espacio de producción y exhibición.',
  },
]

const CAPABILITIES = [
  {
    icon: Globe2,
    title: 'Mundo virtual persistente',
    description: 'Accesible 24/7 desde web, móvil y VR.',
  },
  {
    icon: Building2,
    title: 'Distritos digitales temáticos',
    description: 'Zonas dedicadas a cada industria del ecosistema.',
  },
  {
    icon: Glasses,
    title: 'Experiencias inmersivas',
    description: 'VR, AR y web 3D con la misma calidad visual.',
  },
  {
    icon: Store,
    title: 'Espacios para marcas',
    description: 'Landplots editables y experiencias propias.',
  },
  {
    icon: Palette,
    title: 'Creadores y artistas',
    description: 'Galerías, escenarios y talleres digitales.',
  },
  {
    icon: Network,
    title: 'Conectividad social',
    description: 'Avatares, voz espacial y eventos en vivo.',
  },
]

export function MetaverseSection() {
  return (
    <Section id="metaverse">
      <SectionHeading
        eyebrow="AlArab Metaverse"
        arabic="الميتافيرس العربي"
        title={
          <>
            Un mundo virtual,
            <br />
            <span className="text-gradient-gold">una nueva geografía árabe</span>
          </>
        }
        description="AlArab Metaverse es un entorno 3D persistente donde la civilización árabe se expande al plano digital. Cuatro distritos principales estructuran la experiencia, conectando a usuarios, marcas y creadores en un espacio social, comercial y cultural sin equivalentes en la región."
      />

      {/* Video */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3"
        >
          <YouTubeCinematic
            videoId="b6ffAuBYf8g"
            title="AlArab Metaverse — Official Showcase"
            description="Recorrido cinematográfico por los distritos, la arquitectura y las experiencias interactivas que conforman el mundo virtual de AlArab."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center gap-4 lg:col-span-2"
        >
          <h3 className="font-display text-3xl font-medium text-[#f4e9c9]">
            Cuatro distritos, una visión
          </h3>
          <p className="text-sm leading-relaxed text-[#8a9bb8]">
            La arquitectura del metaverso combina la geometría sagrada del arte
            islámico con la escala y la tecnología de las ciudades árabes
            contemporáneas. Cada distrito es una unidad funcional con identidad
            propia.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DISTRICTS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="rounded-xl border border-[#c9a85c]/20 bg-[#0a1224]/60 p-4 backdrop-blur-md"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-medium text-[#d4af37]">
                    {d.name}
                  </h4>
                  <span className="font-arabic-serif text-xs text-[#c9a85c]/70">
                    {d.arabic}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#8a9bb8]">
                  {d.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Capabilities grid */}
      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {CAPABILITIES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group flex flex-col items-center gap-3 rounded-xl border border-[#c9a85c]/15 glass-gold p-5 text-center transition-all hover:border-[#c9a85c]/40"
          >
            <c.icon className="h-6 w-6 text-[#d4af37]" />
            <h4 className="font-display text-sm font-medium text-[#f4e9c9]">
              {c.title}
            </h4>
            <p className="text-[11px] leading-relaxed text-[#8a9bb8]">
              {c.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
