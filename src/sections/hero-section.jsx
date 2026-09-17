import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { wedding } from '../data/wedding'

function getCountdown(startAt, now) {
  const diff = new Date(startAt).getTime() - now
  if (diff <= 0) return null
  return { ngày: Math.floor(diff / 86400000), giờ: Math.floor(diff / 3600000) % 24, phút: Math.floor(diff / 60000) % 60, giây: Math.floor(diff / 1000) % 60 }
}

function CountdownCard({ ceremony, timeLeft }) {
  return (
    <div className="border border-white/30 bg-[#2e1c18]/35 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-5">
      <p className="font-display text-xl text-[#ffe7d8] sm:text-2xl">{ceremony.title}</p>
      <p className="mt-1.5 text-[10px] tracking-[0.12em] text-white/75 uppercase sm:text-[11px]">{ceremony.date}</p>
      {timeLeft ? <div className="mt-4 grid grid-cols-4 border-t border-white/20 pt-4">
        {Object.entries(timeLeft).map(([unit, value]) => <div key={unit}><strong className="block font-display text-xl sm:text-2xl">{String(value).padStart(2, '0')}</strong><span className="text-[7px] tracking-[0.08em] text-white/65 uppercase sm:text-[8px]">{unit}</span></div>)}
      </div> : <p className="mt-4 border-t border-white/20 pt-4 text-sm leading-6 text-[#ffe8da]">Cảm ơn bạn đã dành tình cảm và cùng lưu giữ niềm vui của chúng mình.</p>}
    </div>
  )
}

export default function HeroSection() {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const hasFutureCeremony = (currentTime) => wedding.ceremonies.some(({ startAt }) => new Date(startAt).getTime() > currentTime)
    const updateClock = () => {
      const currentTime = Date.now()
      setNow(currentTime)
      if (!hasFutureCeremony(currentTime)) clearInterval(interval)
    }
    if (!hasFutureCeremony(Date.now())) return
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-svh items-start justify-center bg-[#3f2a26] px-5 pb-12 pt-28 text-center text-white sm:items-center sm:pb-0" id="top">
      <img className="absolute inset-x-0 top-0 h-[50svh] w-full object-[50%_70%] object-cover opacity-65 sm:inset-0 sm:h-full sm:object-[50%_65%]" src="/images/hero-wedding.webp" alt="Cặp đôi trong ngày cưới" fetchPriority="high" decoding="async" />
      <div className="absolute inset-x-0 top-0 h-[50svh] bg-gradient-to-b from-[#271612]/45 via-[#271612]/15 to-[#3f2a26] sm:inset-0 sm:h-full sm:to-[#271612]/75" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} className={`hero-petal hero-petal-${index + 1}`}>✦</span>)}</div>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative w-full max-w-6xl">
        <div className="-translate-y-20 sm:-translate-y-28">
          <p className="mb-5 text-xs tracking-[0.42em] uppercase text-[#f4d8c7]">Save the date</p>
          <p className="font-display whitespace-nowrap text-[1.45rem] leading-none tracking-[-0.04em] sm:text-6xl lg:text-7xl">{wedding.groom.name} <span className="mx-2 italic text-[#e9b89d] sm:mx-4">&amp;</span> {wedding.bride.name}</p>
          <p className="mt-8 text-sm tracking-[0.22em] text-[#fff7ef] uppercase">{wedding.displayDate}</p>
        </div>
        <p className="mt-64 text-[11px] tracking-[0.28em] text-[#f4d8c7] uppercase sm:mt-36 sm:translate-y-10 sm:text-xs">Đếm ngược ngày vui</p>
        <div className="mx-auto mt-5 grid max-w-3xl gap-3 sm:translate-y-10 sm:grid-cols-2 sm:gap-4">
          {wedding.ceremonies.map(ceremony => <CountdownCard key={ceremony.title} ceremony={ceremony} timeLeft={getCountdown(ceremony.startAt, now)} />)}
        </div>
        <a href="#event" className="mt-9 inline-flex min-h-11 items-center border border-[#f2c9b3] px-6 text-xs font-medium tracking-[0.2em] text-[#fff7ef] uppercase transition hover:bg-[#f2c9b3] hover:text-[#4a3029] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:translate-y-10">Xem lời mời</a>
      </motion.div>
    </section>
  )
}
