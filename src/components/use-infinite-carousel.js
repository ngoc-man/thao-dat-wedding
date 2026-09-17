import { useCallback, useEffect, useRef } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'motion/react'

const wrap = (value, length) => ((value % length) + length) % length

export function useInfiniteCarousel({ initialIndex, itemSize, itemCount, maxSteps, onSettled }) {
  const position = useMotionValue(initialIndex)
  const pointer = useRef(null)
  const dragged = useRef(false)
  const clearDragTimer = useRef(null)
  const moving = useRef(false)
  const animation = useRef(null)
  const onSettledRef = useRef(onSettled)
  const previousInitial = useRef(initialIndex)
  const mounted = useRef(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => { onSettledRef.current = onSettled }, [onSettled])
  useEffect(() => {
    if (previousInitial.current === initialIndex) return
    previousInitial.current = initialIndex
    position.set(initialIndex)
  }, [initialIndex, position])
  useEffect(() => () => {
    mounted.current = false
    animation.current?.stop()
    window.clearTimeout(clearDragTimer.current)
  }, [])

  const finish = useCallback((target, distance) => {
    moving.current = true
    animation.current = animate(position, target, reduceMotion
      ? { duration: 0.01 }
      : { type: 'tween', duration: Math.min(1.05, 0.26 + Math.abs(distance) * 0.12), ease: [0.16, 1, 0.3, 1] })
    animation.current.then(() => {
      if (!mounted.current) return
      moving.current = false
      onSettledRef.current(wrap(Math.round(target), itemCount))
    })
  }, [itemCount, position, reduceMotion])

  const navigate = useCallback(direction => {
    if (moving.current || itemCount < 2) return
    const current = position.get()
    finish(Math.round(current) + direction, direction)
  }, [finish, itemCount, position])

  const pointerHandlers = {
    onPointerDown: event => {
      if (moving.current || itemCount < 2) return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      if (event.target instanceof Element && event.target.closest('[data-no-drag]')) return
      pointer.current = { id: event.pointerId, startX: event.clientX, startPosition: position.get(), startedAt: performance.now() }
      dragged.current = false
      const captureTarget = event.target instanceof Element ? event.target : event.currentTarget
      captureTarget.setPointerCapture(event.pointerId)
    },
    onPointerMove: event => {
      if (pointer.current?.id !== event.pointerId || moving.current) return
      const delta = event.clientX - pointer.current.startX
      if (Math.abs(delta) > 7) dragged.current = true
      position.set(pointer.current.startPosition - delta / itemSize)
    },
    onPointerUp: event => {
      if (pointer.current?.id !== event.pointerId || moving.current) return
      const delta = event.clientX - pointer.current.startX
      const elapsed = Math.max(performance.now() - pointer.current.startedAt, 1)
      const startPosition = pointer.current.startPosition
      pointer.current = null

      // A touch/click should reach the thumbnail's click handler and open its lightbox.
      if (Math.abs(delta) <= 7) {
        position.set(startPosition)
        return
      }

      const velocity = -delta / elapsed * 1000 / itemSize
      event.preventDefault()
      const current = position.get()
      const projected = current + velocity * 0.32
      const start = Math.round(startPosition)
      const target = Math.max(start - maxSteps, Math.min(start + maxSteps, Math.round(projected)))
      finish(target, target - current)
      window.clearTimeout(clearDragTimer.current)
      clearDragTimer.current = window.setTimeout(() => { dragged.current = false }, 0)
    },
    onPointerCancel: () => {
      pointer.current = null
      dragged.current = false
      finish(Math.round(position.get()), 0)
    },
  }

  const consumeDraggedClick = useCallback(() => {
    const wasDragged = dragged.current
    dragged.current = false
    return wasDragged
  }, [])

  return { position, navigate, pointerHandlers, consumeDraggedClick, reduceMotion }
}
