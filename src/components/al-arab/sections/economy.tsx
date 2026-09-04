'use client'

import { motion } from 'framer-motion'
import {
  Coins,
  Store,
  Wallet,
  Layers,
  ShieldCheck,
  Repeat,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'

const FEATURES = [
  {
    icon: Store,
    title: 'Marketplace digital',
    arabic: 'السوق الرقمي',
    description:
      'Catálogo de productos digitales y experiencias dentro del ecosistema AlArab. Cada activo se publica con metadatos verificables que permiten trazabilidad y autoría comprobable.',
    status: 'Disponible',
  },
  {
    icon: Wallet,
    title: 'Billetera integrada',
    arabic: 'محفظة رقمية',
    description:
      'Cada usuario cuenta con una billetera nativa para gestionar saldo, historial de transacciones y activos dentro de la plataforma. No requiere configuración externa ni conocimientos técnicos.',
    status: 'Disponible',
  },
  {
    icon: Layers,
    title: 'Activos digitales',
    arabic: 'الأصول الرقمية',
    description:
      'Colecciones de objetos virtuales —skins, accesorios, landplots digitales y experiencias— emitidos y referenciados dentro del ecosistema AlArab.',
    status: 'En evolución',
  },
  {
    icon: Repeat,
    title: 'Sistema de pagos interno',
    arabic: 'نظام الدفع',
    description:
      'Mecanismo de pagos nativo para transacciones dentro del ecosistema, incluyendo compra de experiencias, acceso a eventos y servicios premium. Las funcionalidades financieras se limitan por ahora a este alcance.',
    status: 'Parcial',
  },
]

const NOTES = [
  {
    icon: ShieldCheck,
    text: 'Las operaciones financieras se desarrollan dentro del ecosistema AlArab y no constituyen instrumentos financieros regulados ni ofrecen rendimiento económico al portador.',
  },
  {
    icon: Coins,
    text: 'Cualquier referencia a token o activo digital describe únicamente las características actualmente implementadas. No se garantiza emisión, valor de mercado ni convertibilidad externa.',
  },
]

export function EconomySection() {
  return (
    <Section id="economy">
      <SectionHeading
        eyebrow="Digital Economy"
        arabic="الاقتصاد الرقمي"
        title={
          <>
            La economía interna
            <br />
            <span className="text-gradient-gold">del ecosistema AlArab</span>
          </>
        }
        description="AlArab está construyendo una capa económica digital donde creadores, marcas y usuarios intercambian valor dentro de la plataforma. Las funcionalidades descritas a continuación reflejan exclusivamente las características actualmente implementadas o en desarrollo activo dentro del ecosistema."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURES.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-7 transition-all hover:border-[#c9a85c]/45"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                <f.icon className="h-6 w-6 text-[#d4af37]" />
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  f.status === 'Disponible'
                    ? 'border border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]'
                    : f.status === 'Parcial'
                    ? 'border border-[#8a9bb8]/40 bg-[#8a9bb8]/10 text-[#8a9bb8]'
                    : 'border border-[#5d7ba8]/40 bg-[#5d7ba8]/10 text-[#5d7ba8]'
                }`}
              >
                {f.status}
              </span>
            </div>
            <div className="mt-5">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-2xl font-medium text-[#f4e9c9]">
                  {f.title}
                </h3>
                <span className="font-arabic-serif text-base text-[#c9a85c]/70">
                  {f.arabic}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#8a9bb8]">
                {f.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Disclaimer / transparency notes */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-10 rounded-2xl border border-[#c9a85c]/15 bg-[#0a1224]/40 p-6 backdrop-blur-md"
      >
        <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
          Nota de transparencia
        </h4>
        <ul className="mt-4 flex flex-col gap-3">
          {NOTES.map((n, i) => (
            <li key={i} className="flex items-start gap-3">
              <n.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a85c]" />
              <span className="text-xs leading-relaxed text-[#8a9bb8]">
                {n.text}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  )
}
