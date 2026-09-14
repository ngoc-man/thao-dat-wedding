import { motion } from 'motion/react'
import { wedding } from '../data/wedding'

const invitations = [
  { side: 'groom', href: '/groom', label: 'Nhà trai', name: wedding.groom.name, photo: wedding.groom.photo, position: 'object-[50%_36%]' },
  { side: 'bride', href: '/bride', label: 'Nhà gái', name: wedding.bride.name, photo: wedding.bride.photo, position: 'object-[50%_41%]' },
]

export default function InvitationSelector({ onSelect }) {
  return <main className="relative grid min-h-svh place-items-center overflow-hidden bg-[#39251f] px-5 py-10 text-[#fff8f0]">
    <img src="/images/hero-wedding.webp" alt="" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-25 blur-sm" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(149,97,78,.25),rgba(38,23,19,.88))]" />
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10 w-full max-w-4xl text-center">
      <p className="text-[10px] tracking-[.35em] text-[#e6bfa9] uppercase sm:text-xs">Save the date</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">Ngọc Đạt <i className="px-1 text-[#e7b99e]">&amp;</i> Nguyễn Thảo</h1>
      <p className="mt-3 text-[10px] tracking-[.22em] text-[#ecd8ca] sm:text-xs">26 . 09 . 2026 &nbsp;•&nbsp; 01 . 10 . 2026</p>
      <div className="mx-auto my-7 h-px w-16 bg-[#dba98e]/70" />
      <p className="font-display text-2xl italic text-[#fff4ea] sm:text-3xl">Lời mời này dành cho bạn từ...</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {invitations.map((invitation, index) => <motion.a key={invitation.href} href={invitation.href} onClick={(event) => { event.preventDefault(); onSelect(invitation.side) }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + index * .12, duration: .55 }} className="group relative isolate min-h-60 overflow-hidden border border-[#f3d4c2]/55 bg-[#5e4036] text-left shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff4ea]">
          <img src={invitation.photo} alt="" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.09] ${invitation.position}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c1915] via-[#2c1915]/30 to-transparent" />
          <div className="relative flex min-h-60 flex-col justify-end p-6 sm:p-7"><p className="text-[10px] tracking-[.25em] text-[#efc9b1] uppercase">Lời mời từ</p><p className="mt-2 font-display text-3xl">{invitation.label}</p><p className="mt-1 text-sm text-[#fff0e4]">{invitation.name}</p><span className="mt-5 inline-flex items-center gap-2 text-xs tracking-[.16em] text-[#f2cfba] uppercase">Mở lời mời <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span></span></div>
        </motion.a>)}
      </div>
    </motion.section>
  </main>
}
