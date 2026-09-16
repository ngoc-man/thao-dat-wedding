import { useEffect, useRef, useState } from 'react'

export default function BackgroundMusic() {
  const audio = useRef(null)
  const volumeFrame = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isVolumeOpen, setIsVolumeOpen] = useState(false)

  const play = async () => {
    try {
      await audio.current?.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    audio.current.volume = 0.5
    play()
    const resume = () => play()
    document.addEventListener('pointerdown', resume, { once: true })
    document.addEventListener('keydown', resume, { once: true })
    return () => {
      document.removeEventListener('pointerdown', resume)
      document.removeEventListener('keydown', resume)
    }
  }, [])

  const changeVolume = (event) => {
    const nextVolume = Number(event.target.value)
    setVolume(nextVolume)
    const startVolume = audio.current.volume
    const startedAt = performance.now()
    cancelAnimationFrame(volumeFrame.current)
    const easeVolume = (now) => {
      const progress = Math.min((now - startedAt) / 120, 1)
      audio.current.volume = startVolume + (nextVolume - startVolume) * progress
      if (progress < 1) volumeFrame.current = requestAnimationFrame(easeVolume)
    }
    volumeFrame.current = requestAnimationFrame(easeVolume)
  }

  return <><audio ref={audio} src="/audio/wedding-theme.mp3" loop preload="metadata" /><div className="fixed bottom-5 right-5 z-40"><div className={`absolute bottom-14 right-0 w-48 overflow-hidden rounded-xl border border-[#f0c4a8]/70 bg-[#4a3029]/95 p-3 text-[#fff7ef] shadow-[0_16px_40px_rgba(61,35,29,.35)] backdrop-blur transition duration-300 ${isVolumeOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-95 opacity-0'}`}><div className="flex items-center justify-between"><p className="font-display text-base">Âm lượng</p><span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#f0b18c]/15 px-1 text-[10px] text-[#f7d5bd]">{Math.round(volume * 100)}%</span></div><label className="sr-only" htmlFor="music-volume">Âm lượng nhạc nền</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={changeVolume} className="volume-slider mt-3 w-full" style={{ background: `linear-gradient(90deg, #f4b58f ${volume * 100}%, rgb(255 247 239 / .22) ${volume * 100}%)` }} aria-label="Âm lượng nhạc nền" /></div><button onClick={() => setIsVolumeOpen(open => !open)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-[#d9a98f] bg-[#4a3029]/90 text-[#fff7ef] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-[#82594e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82594e]" aria-label="Điều chỉnh âm lượng nhạc nền" aria-expanded={isVolumeOpen} title="Điều chỉnh âm lượng">{isPlaying ? <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-1.8" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4Z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></svg> : <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-1.8" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4Z" /><path d="m16 10 4 4m0-4-4 4" /></svg>}</button></div></>
}
