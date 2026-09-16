import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal, SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

const cropPositions = {
  '/images/DSC05702.webp': 'object-[50%_35%]',
  '/images/DSC05891.webp': 'object-[50%_35%]',
  '/images/DSC06025.webp': 'object-[50%_35%]',
  '/images/DSC06464.webp': 'object-[50%_35%]',
}

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const openButton = useRef(null)
  const selected = selectedIndex === null ? null : wedding.gallery[selectedIndex]
  const close = () => { setSelectedIndex(null); requestAnimationFrame(() => openButton.current?.focus()) }
  const move = (direction) => setSelectedIndex(index => (index + direction + wedding.gallery.length) % wedding.gallery.length)
  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'Tab') {
        const buttons = [...dialog.current.querySelectorAll('button')]
        const first = buttons[0]
        const last = buttons.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [selectedIndex])
  return <section className="section-shell" id="gallery"><SectionHeading eyebrow="Captured moments" title="Những khoảnh khắc của chúng mình" />
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {wedding.gallery.map((photo, index) => <Reveal key={photo + index}><button onClick={event => { openButton.current = event.currentTarget; setSelectedIndex(index) }} className="group relative block aspect-square w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9c6257]" aria-label={`Phóng to ảnh cưới ${index + 1}`}><img src={photo} alt={`Khoảnh khắc cưới ${index + 1}`} loading="lazy" className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 group-focus-visible:scale-110 ${cropPositions[photo] ?? 'object-center'}`} /><span className="absolute inset-0 bg-[#4a3029]/0 transition group-hover:bg-[#4a3029]/20" /></button></Reveal>)}
    </div>
    <AnimatePresence>{selected && <motion.div ref={dialog} role="dialog" aria-modal="true" aria-label="Ảnh cưới phóng to" className="fixed inset-0 z-50 grid place-items-center bg-[#201310]/90 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}><button ref={closeButton} className="absolute right-5 top-5 min-h-11 min-w-11 text-3xl text-white focus-visible:outline-2 focus-visible:outline-white" onClick={close} aria-label="Đóng ảnh">×</button><button onClick={event => { event.stopPropagation(); move(-1) }} aria-label="Ảnh trước" className="absolute left-3 min-h-11 min-w-11 text-4xl text-white sm:left-8">‹</button><motion.img initial={{ scale: .94 }} animate={{ scale: 1 }} exit={{ scale: .94 }} onClick={event => event.stopPropagation()} src={selected} alt={`Ảnh cưới ${selectedIndex + 1}`} className="max-h-[86svh] max-w-full object-contain" /><button onClick={event => { event.stopPropagation(); move(1) }} aria-label="Ảnh tiếp theo" className="absolute right-3 min-h-11 min-w-11 text-4xl text-white sm:right-8">›</button></motion.div>}</AnimatePresence>
  </section>
}
