import { BankQrSection, CoupleSection, EventDetailsSection, GallerySection, HeroSection, ThankYouSection, WishesSection } from './sections'
import BackgroundMusic from './components/background-music'
import CursorGlow from './components/cursor-glow'
import CelebrationEffects from './components/celebration-effects'
import { wedding } from './data/wedding'

export default function App() {
  return (
    <main className="overflow-hidden bg-[#f7f0e8] text-[#40332d]">
      <BackgroundMusic />
      <CursorGlow />
      <CelebrationEffects />
      <HeroSection />
      <CoupleSection />
      <EventDetailsSection />
      <GallerySection />
      <BankQrSection gift={wedding.gift} />
      <WishesSection />
      <ThankYouSection />
    </main>
  )
}
