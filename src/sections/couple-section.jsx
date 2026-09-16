import { Reveal, SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

const bios = ['Chàng trai điềm tĩnh, trân trọng những điều bình dị và luôn khiến mọi ngày trở nên ấm áp.', 'Cô gái dịu dàng, yêu cái đẹp, những bông hoa và những khoảnh khắc có người thương bên cạnh.']

export default function CoupleSection() {
  return <section className="section-shell" id="couple"><SectionHeading eyebrow="Our story" title="Hai tâm hồn, một hành trình" />
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      {[wedding.groom, wedding.bride].map((person, index) => <Reveal key={person.role} className="group overflow-hidden bg-[#fcf9f4] shadow-[0_18px_50px_rgba(91,60,48,0.09)]">
        <div className="aspect-[3/4] overflow-hidden"><img src={person.photo} alt={person.role} className={`h-full w-full -translate-x-[1.5%] scale-[1.03] object-cover transition duration-700 group-hover:scale-105 ${person.role === 'Cô dâu' ? 'object-[50%_95%]' : 'object-[50%_80%]'}`} /></div>
        <div className="p-7 sm:p-9"><p className="text-xs tracking-[0.24em] text-[#a56c61] uppercase">{person.role}</p><h3 className="mt-2 font-display text-5xl leading-none tracking-[-0.03em] text-[#4a3029]">{person.name}</h3><p className="mt-5 text-sm leading-7 text-[#725f56]">{bios[index]}</p></div>
      </Reveal>)}
    </div>
  </section>
}
