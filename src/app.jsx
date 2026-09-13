import { BankQrSection, CoupleSection, EventDetailsSection, GallerySection, HeroSection, ThankYouSection, WishesSection } from './sections'

export default function App() {
  return (
    <main className="overflow-hidden bg-[#f7f0e8] text-[#40332d]">
      <HeroSection />
      <CoupleSection />
      <EventDetailsSection />
      <GallerySection />
      <BankQrSection />
      <WishesSection />
      <ThankYouSection />
    </main>
  )
}
