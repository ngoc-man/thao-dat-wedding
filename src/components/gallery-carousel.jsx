import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { useInfiniteCarousel } from './use-infinite-carousel'

const PHOTOS_PER_COLUMN = 2
const wrap = (value, length) => ((value % length) + length) % length

export default function GalleryCarousel({ photos, crops, onOpen }) {
  const stage = useRef(null)
  const [stageWidth, setStageWidth] = useState(0)
  const [visibleColumns, setVisibleColumns] = useState(4)
  const [activeColumn, setActiveColumn] = useState(0)
  const columnCount = Math.ceil(photos.length / PHOTOS_PER_COLUMN)
  const columnWidth = Math.max(stageWidth / visibleColumns, 1)
  const { position, navigate, pointerHandlers, consumeDraggedClick } = useInfiniteCarousel({
    initialIndex: 0,
    itemSize: columnWidth,
    itemCount: columnCount,
    maxSteps: Math.min(6, Math.max(columnCount - 1, 1)),
    onSettled: setActiveColumn,
  })

  useLayoutEffect(() => {
    const measure = () => {
      const width = stage.current?.getBoundingClientRect().width ?? 0
      setStageWidth(width)
      setVisibleColumns(width >= 768 ? 4 : 2)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (stage.current) observer.observe(stage.current)
    return () => observer.disconnect()
  }, [])

  if (!photos.length) return null

  return (
    <div className="relative mx-auto max-w-7xl">
      <div ref={stage} className="relative aspect-square select-none overflow-hidden rounded-sm touch-pan-y md:aspect-[2/1]" {...pointerHandlers}>
        {Array.from({ length: columnCount }, (_, columnIndex) => (
          <GalleryColumn
            key={columnIndex}
            columnIndex={columnIndex}
            columnCount={columnCount}
            columnWidth={columnWidth}
            visibleColumns={visibleColumns}
            activeColumn={activeColumn}
            photos={photos}
            crops={crops}
            position={position}
            consumeDraggedClick={consumeDraggedClick}
            onOpen={onOpen}
          />
        ))}
      </div>
      <CarouselArrow direction={-1} onClick={() => navigate(-1)} label="Xem ảnh trước" />
      <CarouselArrow direction={1} onClick={() => navigate(1)} label="Xem ảnh tiếp theo" />
    </div>
  )
}

function GalleryColumn({ columnIndex, columnCount, columnWidth, visibleColumns, activeColumn, photos, crops, position, consumeDraggedClick, onOpen }) {
  const metrics = useRef({ columnCount, columnWidth, visibleColumns })
  const width = useMotionValue(columnWidth)
  metrics.current = { columnCount, columnWidth, visibleColumns }
  useLayoutEffect(() => { width.set(columnWidth) }, [columnWidth, width])
  const relative = useTransform(position, value => {
    const { columnCount: count, visibleColumns: visible } = metrics.current
    const direct = wrap(columnIndex - value, count)
    const previousCycle = direct - count
    const center = (visible - 1) / 2
    return Math.abs(previousCycle - center) <= Math.abs(direct - center)
      ? previousCycle
      : direct
  })
  const x = useTransform([relative, width], ([offset, itemWidth]) => offset * itemWidth)
  const visibleOffset = wrap(columnIndex - activeColumn, columnCount)
  const isInteractive = visibleOffset < visibleColumns
  const photoIndexes = [columnIndex * 2, columnIndex * 2 + 1].filter(index => index < photos.length)

  return (
    <motion.div className={`absolute inset-y-0 left-0 grid grid-rows-2 gap-3 px-1.5 ${isInteractive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`} style={{ width: columnWidth, x }} aria-hidden={!isInteractive}>
      {photoIndexes.map(index => <button key={photos[index]} type="button" tabIndex={isInteractive ? 0 : -1} onClick={() => { if (!consumeDraggedClick()) onOpen(index) }} className="group relative min-h-0 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#fff7ef]" aria-label={`Phóng to ảnh cưới ${index + 1}`}>
        <img src={photos[index]} alt={`Khoảnh khắc cưới ${index + 1}`} loading="lazy" draggable="false" className={`h-full w-full object-cover ${crops[photos[index]] ?? 'object-center'}`} />
        <span className="absolute inset-0 bg-[#4a3029]/0 transition group-hover:bg-[#4a3029]/15" />
      </button>)}
    </motion.div>
  )
}

function CarouselArrow({ direction, onClick, label }) {
  return <button type="button" onClick={onClick} className={`absolute top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-[#4a3029]/85 text-2xl text-white shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-[#6b463c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9c6257] ${direction < 0 ? 'left-1 sm:-left-5' : 'right-1 sm:-right-5'}`} aria-label={label}>{direction < 0 ? '‹' : '›'}</button>
}
