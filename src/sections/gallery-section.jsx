import { useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import GalleryCarousel from '../components/gallery-carousel'
import GalleryLightbox from '../components/gallery-lightbox'
import { Reveal, SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

const crops = {
  '/images/DSC05702.webp': 'object-[50%_35%]',
  '/images/DSC05891.webp': 'object-[50%_35%]',
  '/images/DSC06025.webp': 'object-[50%_35%]',
  '/images/DSC06464.webp': 'object-[50%_35%]',
}

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const opener = useRef(null)

  const open = index => {
    opener.current = document.activeElement
    setSelectedIndex(index)
  }

  const close = () => {
    setSelectedIndex(null)
    requestAnimationFrame(() => opener.current?.focus())
  }

  return (
    <section className="section-shell" id="gallery">
      <SectionHeading eyebrow="Captured moments" title="Những khoảnh khắc của chúng mình" />
      <Reveal>
        <GalleryCarousel photos={wedding.gallery} crops={crops} onOpen={open} />
      </Reveal>
      <AnimatePresence>
        {selectedIndex !== null && (
          <GalleryLightbox
            photos={wedding.gallery}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
