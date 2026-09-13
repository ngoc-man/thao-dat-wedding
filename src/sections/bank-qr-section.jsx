import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal, SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

function copyAccountNumber(account) {
  if (navigator.clipboard) return navigator.clipboard.writeText(account)
  const input = document.createElement('input')
  input.value = account
  document.body.append(input)
  input.select()
  document.execCommand('copy')
  input.remove()
  return Promise.resolve()
}

export default function BankQrSection() {
  const [isQrOpen, setIsQrOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const qrButton = useRef(null)
  const closeQr = () => {
    setIsQrOpen(false)
    requestAnimationFrame(() => qrButton.current?.focus())
  }
  const copy = async (account) => {
    try {
      await copyAccountNumber(account)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => {
    if (!isQrOpen) return
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => event.key === 'Escape' && closeQr()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isQrOpen])

  return <section className="bg-[#e9ded2] px-5 py-20 sm:py-28" id="gifts"><SectionHeading eyebrow="With love" title="Hộp Mừng Cưới" description="Sự hiện diện và lời chúc của bạn đã là món quà quý giá nhất dành cho chúng mình. Nếu không thể đến chung vui hoặc muốn gửi thêm chút tình cảm từ xa, bạn có thể gửi qua đây nhé!" />
    <div className="mx-auto max-w-sm">{wedding.gifts.map(gift => <Reveal key={gift.owner} className="bg-[#fdf9f4] p-7 text-center shadow-[0_15px_40px_rgba(91,60,48,.08)]"><p className="text-xs tracking-[.18em] text-[#a56c61] uppercase">{gift.owner}</p><button ref={qrButton} onClick={() => setIsQrOpen(true)} className="group relative mx-auto my-5 block aspect-square w-44 border-8 border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9c6257]" aria-label="Phóng to mã QR mừng cưới"><img className="h-full w-full object-contain" src={gift.qr} alt="Mã QR mừng cưới" loading="lazy" /><span className="absolute inset-0 grid place-items-center bg-[#4a3029]/0 text-xs tracking-[.14em] text-white opacity-0 transition group-hover:bg-[#4a3029]/45 group-hover:opacity-100 group-focus-visible:bg-[#4a3029]/45 group-focus-visible:opacity-100">Phóng to</span></button><p className="font-display text-2xl text-[#4a3029]">{gift.bank}</p><div className="mt-2 flex items-center justify-center gap-2"><p className="text-sm tracking-[.1em] text-[#725f56]">{gift.account}</p><button onClick={() => copy(gift.account)} className="grid min-h-9 min-w-9 place-items-center border border-[#c9a692] text-[#82594e] transition hover:bg-[#82594e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9c6257]" aria-label={copied ? 'Đã sao chép số tài khoản' : 'Sao chép số tài khoản'} title={copied ? 'Đã sao chép' : 'Sao chép số tài khoản'}>{copied ? <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2"><path d="m5 12 4 4L19 6" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2"><rect x="9" y="9" width="10" height="10" rx="1" /><path d="M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4" /></svg>}</button></div></Reveal>)}</div>
    <AnimatePresence>{isQrOpen && <motion.div role="dialog" aria-modal="true" aria-label="Mã QR mừng cưới phóng to" className="fixed inset-0 z-50 grid place-items-center bg-[#201310]/90 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeQr}><button className="absolute right-5 top-5 min-h-11 min-w-11 text-3xl text-white focus-visible:outline-2 focus-visible:outline-white" onClick={closeQr} aria-label="Đóng mã QR">×</button><motion.img initial={{ scale: .94 }} animate={{ scale: 1 }} exit={{ scale: .94 }} onClick={event => event.stopPropagation()} src={wedding.gifts[0].qr} alt="Mã QR mừng cưới phóng to" className="max-h-[82svh] max-w-full bg-white object-contain p-3" /></motion.div>}</AnimatePresence>
  </section>
}
