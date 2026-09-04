'use client'

import { DecorBackground } from '@/components/al-arab/decor-background'
import { Navbar } from '@/components/al-arab/navbar'
import { HeroSection } from '@/components/al-arab/sections/hero'
import { VisionSection } from '@/components/al-arab/sections/vision'
import { MetaverseSection } from '@/components/al-arab/sections/metaverse'
import { EconomySection } from '@/components/al-arab/sections/economy'
import { TechnologySection } from '@/components/al-arab/sections/technology'
import { EcosystemSection } from '@/components/al-arab/sections/ecosystem'
import { RoadmapSection } from '@/components/al-arab/sections/roadmap'
import { InvestorsSection } from '@/components/al-arab/sections/investors'
import { Footer } from '@/components/al-arab/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <DecorBackground />
      <Navbar />
      <HeroSection />
      <VisionSection />
      <MetaverseSection />
      <EconomySection />
      <TechnologySection />
      <EcosystemSection />
      <RoadmapSection />
      <InvestorsSection />
      <Footer />
    </main>
  )
}
