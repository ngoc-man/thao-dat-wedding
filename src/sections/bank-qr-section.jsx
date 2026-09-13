import { Reveal, SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

export default function BankQrSection() {
  return <section className="bg-[#e9ded2] px-5 py-20 sm:py-28" id="gifts"><SectionHeading eyebrow="With love" title="Hộp Mừng Cưới" description="Sự hiện diện và lời chúc của bạn đã là món quà quý giá nhất dành cho chúng mình. Nếu không thể đến chung vui hoặc muốn gửi thêm chút tình cảm từ xa, bạn có thể gửi qua đây nhé!" />
    <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">{wedding.gifts.map(gift => <Reveal key={gift.owner} className="bg-[#fdf9f4] p-7 text-center shadow-[0_15px_40px_rgba(91,60,48,.08)]"><p className="text-xs tracking-[.18em] text-[#a56c61] uppercase">{gift.owner}</p><img className="mx-auto my-5 aspect-square w-44 border-8 border-white object-contain" src={gift.qr} alt={`Mã QR mừng cưới ${gift.owner}`} loading="lazy" /><p className="font-display text-2xl text-[#4a3029]">{gift.bank}</p><p className="mt-1 text-sm tracking-[.1em] text-[#725f56]">{gift.account}</p></Reveal>)}</div>
  </section>
}
