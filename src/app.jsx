import { useEffect, useState } from 'react'
import { BankQrSection, CoupleSection, EventDetailsSection, GallerySection, HeroSection, InvitationSelector, ThankYouSection, WishesSection } from './sections'
import { wedding } from './data/wedding'

function getInvitationSide() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return path === '/groom' || path === '/bride' ? path.slice(1) : null
}

export default function App() {
  const [invitationSide, setInvitationSide] = useState(getInvitationSide)

  useEffect(() => {
    const syncInvitationSide = () => setInvitationSide(getInvitationSide())
    window.addEventListener('popstate', syncInvitationSide)
    return () => window.removeEventListener('popstate', syncInvitationSide)
  }, [])

  const selectInvitation = (side) => {
    window.history.pushState({}, '', `/${side}`)
    setInvitationSide(side)
  }

  if (!invitationSide) return <InvitationSelector onSelect={selectInvitation} />

  return (
    <main className="overflow-hidden bg-[#f7f0e8] text-[#40332d]">
      <HeroSection />
      <CoupleSection />
      <EventDetailsSection />
      <GallerySection />
      <BankQrSection gift={wedding.gifts[invitationSide]} />
      <WishesSection />
      <ThankYouSection />
    </main>
  )
}
