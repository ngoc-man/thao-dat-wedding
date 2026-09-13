import { Reveal } from '../components/reveal'
import { wedding } from '../data/wedding'

export default function ThankYouSection() {
  return <section className="bg-[#4a3029] px-5 py-20 text-center text-[#fff7ef] sm:py-28"><Reveal className="mx-auto max-w-2xl"><p className="text-xs tracking-[.28em] text-[#e6b8a1] uppercase">Thank you</p><h2 className="mt-4 font-display text-5xl sm:text-6xl">Cảm ơn vì đã đến</h2><p className="mt-7 text-sm leading-8 text-[#f5ded0] sm:text-base">Chúng mình thật sự hạnh phúc khi có gia đình và những người bạn thân thương cùng đồng hành, chia sẻ trong ngày đặc biệt này. Sự có mặt của bạn là mảnh ghép hoàn hảo nhất cho niềm vui của chúng mình. Hẹn sớm gặp bạn trong ngày vui nhé!</p><p className="mt-8 font-display text-3xl italic text-[#e9b89d]">{wedding.bride.name} &amp; {wedding.groom.name}</p><a href="#top" className="mt-10 inline-flex min-h-11 items-center border border-[#d69b81] px-6 text-xs tracking-[.18em] uppercase transition hover:bg-[#d69b81] hover:text-[#4a3029] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Lên đầu trang</a></Reveal></section>
}
