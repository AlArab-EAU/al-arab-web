'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Twitter, Youtube } from 'lucide-react'

const LINKS = [
  {
    title: 'Ecosistema',
    items: [
      { label: 'Visión', href: '#vision' },
      { label: 'Metaverso', href: '#metaverse' },
      { label: 'Economía digital', href: '#economy' },
      { label: 'Tecnología', href: '#technology' },
    ],
  },
  {
    title: 'Oportunidades',
    items: [
      { label: 'Ecosistema completo', href: '#ecosystem' },
      { label: 'Roadmap', href: '#roadmap' },
      { label: 'Empresas', href: '#investors' },
      { label: 'Inversores', href: '#investors' },
    ],
  },
  {
    title: 'Recursos',
    items: [
      { label: 'Video oficial', href: '#top' },
      { label: 'Showcase metaverso', href: '#metaverse' },
      { label: 'Identidad', href: '#ecosystem' },
      { label: 'Contacto', href: '#investors' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[#c9a85c]/15 bg-[#050810]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a85c]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#c9a85c]/40 animate-spin-slower" />
                <span className="font-arabic-serif text-lg font-bold text-gradient-gold">
                  ع
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold tracking-[0.32em] text-gradient-gold">
                  AL ARAB
                </span>
                <span className="font-arabic text-[10px] tracking-[0.3em] text-[#8a9bb8]">
                  العرب
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#8a9bb8]">
              Un ecosistema digital que combina tecnología, cultura, comercio y
              comunidad para proyectar el mundo árabe al futuro digital.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Social ${i}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a85c]/25 bg-[#0a1224]/60 text-[#c9b88a] transition-all hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {LINKS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
            >
              <h4 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-[#8a9bb8] transition-colors hover:text-[#f4e9c9]"
                    >
                      <span className="h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#c9a85c]/10 pt-8 md:flex-row">
          <p className="text-center text-[11px] leading-relaxed text-[#5d7ba8] md:text-left">
            © {new Date().getFullYear()} AL ARAB. Proyecto conceptual — la información
            presentada describe características actualmente implementadas o en
            desarrollo dentro del ecosistema.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full border border-[#c9a85c]/30 bg-[#0a1224]/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9b88a] transition-all hover:border-[#d4af37] hover:text-[#f4e9c9]"
          >
            Volver arriba
            <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
