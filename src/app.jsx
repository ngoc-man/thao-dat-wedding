import { BankQrSection, CoupleSection, EventDetailsSection, GallerySection, HeroSection, ThankYouSection } from './sections'

export default function App() {
  return (
    <main className="overflow-hidden bg-[#f7f0e8] text-[#40332d]">
      <HeroSection />
      <CoupleSection />
      <EventDetailsSection />
      <GallerySection />
      <BankQrSection />
      <ThankYouSection />
    </main>
  )
}
