import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const trail = useRef(null)
  const lastBurst = useRef(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (event) => {
      if (event.timeStamp - lastBurst.current < 75) return
      lastBurst.current = event.timeStamp
      const heart = document.createElement('span')
      heart.className = 'cursor-heart'
      heart.textContent = '♥'
      heart.style.left = `${event.clientX}px`
      heart.style.top = `${event.clientY}px`
      heart.style.color = ['#ff7597', '#ffbd59', '#b48cff', '#61d7c5', '#ff8b6a'][Math.floor(Math.random() * 5)]
      heart.style.setProperty('--drift-x', `${Math.round(Math.random() * 48 - 24)}px`)
      trail.current?.append(heart)
      window.setTimeout(() => heart.remove(), 1050)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <div ref={trail} className="pointer-events-none fixed inset-0 z-60" aria-hidden="true" />
}
