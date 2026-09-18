import { useEffect, useRef, useState } from 'react'
import { motion, useTransform } from 'motion/react'
import { useInfiniteCarousel } from './use-infinite-carousel'

const SLIDE_WIDTH = 0.34
const MAX_MOMENTUM_STEPS = 6

export default function GalleryLightbox({ photos, selectedIndex, onSelect, onClose }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const [travel, setTravel] = useState(() => window.innerWidth * SLIDE_WIDTH)
  const { position, navigate, pointerHandlers, consumeDraggedClick, reduceMotion } = useInfiniteCarousel({
    initialIndex: selectedIndex,
    itemSize: travel,
    itemCount: photos.length,
    maxSteps: Math.min(MAX_MOMENTUM_STEPS, Math.max(photos.length - 1, 1)),
    onSettled: onSelect,
  })
  useEffect(() => {
    const overflow = document.body.style.overflow
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') navigate(-1)
      if (event.key === 'ArrowRight') navigate(1)
      if (event.key === 'Tab') trapFocus(event, dialog.current)
    }
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    const updateTravel = () => setTravel(window.innerWidth * SLIDE_WIDTH)
    window.addEventListener('resize', updateTravel)
    return () => window.removeEventListener('resize', updateTravel)
  }, [])

  const handleBackdropClick = event => {
    if (consumeDraggedClick()) return
    if (!event.target.closest('[data-lightbox-content]')) onClose()
  }

  return (
    <motion.div ref={dialog} role="dialog" aria-modal="true" aria-label="Ảnh cưới phóng to" className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#2b1b17]/55 p-2 backdrop-blur-[3px] sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.25 }} onClick={handleBackdropClick} {...pointerHandlers}>
      <button ref={closeButton} type="button" data-lightbox-content data-no-drag onClick={onClose} className="absolute right-4 top-3 z-50 grid min-h-11 min-w-11 place-items-center rounded-full bg-[#4a3029]/65 text-3xl text-white backdrop-blur focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Đóng ảnh">×</button>
      <div className="relative h-[82svh] w-full select-none [perspective:1400px] touch-pan-y">
        {photos.map((photo, index) => <LightboxSlide key={photo} photo={photo} index={index} count={photos.length} position={position} reduceMotion={reduceMotion} />)}
      </div>
      <LightboxArrow direction={-1} onClick={() => navigate(-1)} />
      <LightboxArrow direction={1} onClick={() => navigate(1)} />
      <p className="sr-only" aria-live="polite">Ảnh {selectedIndex + 1} trong {photos.length}</p>
    </motion.div>
  )
}

function LightboxSlide({ photo, index, count, position, reduceMotion }) {
  const relative = useTransform(position, value => nearestOffset(index - value, count))
  const x = useTransform(relative, value => `${value * 34}vw`)
  const rotateY = useTransform(relative, value => reduceMotion ? 0 : value * -24)
  const scale = useTransform(relative, value => reduceMotion ? 1 : 1 - Math.min(Math.abs(value), 1.6) * 0.2)
  const opacity = useTransform(relative, value => Math.max(0, 1 - Math.abs(value) * 0.52))
  const zIndex = useTransform(relative, value => 30 - Math.round(Math.abs(value) * 10))

  return <motion.div className="absolute inset-0 m-auto flex h-full w-[72vw] max-w-3xl items-center justify-center" style={{ x, rotateY, scale, opacity, zIndex, transformStyle: 'preserve-3d' }}>
    <img data-lightbox-content src={photo} alt={`Ảnh cưới ${index + 1}`} draggable="false" className="max-h-full max-w-full rounded-sm object-contain shadow-[0_24px_70px_rgba(32,19,16,.35)]" />
  </motion.div>
}

function LightboxArrow({ direction, onClick }) {
  return <button type="button" data-lightbox-content data-no-drag onClick={onClick} className={`absolute top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-[#4a3029]/60 text-3xl text-white backdrop-blur transition hover:scale-110 hover:bg-[#4a3029]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${direction < 0 ? 'left-2 sm:left-6' : 'right-2 sm:right-6'}`} aria-label={direction < 0 ? 'Ảnh trước' : 'Ảnh tiếp theo'}>{direction < 0 ? '‹' : '›'}</button>
}

function nearestOffset(value, count) {
  let offset = value % count
  if (offset > count / 2) offset -= count
  if (offset < -count / 2) offset += count
  return offset
}

function trapFocus(event, container) {
  const buttons = [...(container?.querySelectorAll('button') ?? [])]
  const first = buttons[0]
  const last = buttons.at(-1)
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
