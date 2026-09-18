import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

const bios = ['Chàng trai điềm tĩnh, trân trọng những điều bình dị và luôn khiến mọi ngày trở nên ấm áp.', 'Cô gái dịu dàng, yêu cái đẹp, những bông hoa và những khoảnh khắc có người thương bên cạnh.']

export default function CoupleSection() {
  const reduceMotion = useReducedMotion()

  return <section className="section-shell" id="couple"><SectionHeading eyebrow="Our story" title="Hai tâm hồn, một hành trình" />
    <div className="group/couple relative mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-6 md:[perspective:1200px]">
      <CoupleCard person={wedding.groom} bio={bios[0]} direction="left" reduceMotion={reduceMotion} />
      <CoupleConnection reduceMotion={reduceMotion} />
      <CoupleCard person={wedding.bride} bio={bios[1]} direction="right" reduceMotion={reduceMotion} />
    </div>
  </section>
}

function CoupleCard({ person, bio, direction, reduceMotion }) {
  const isBride = person.role === 'Cô dâu'
  const initialX = direction === 'left' ? -34 : 34
  const initialRotateY = direction === 'left' ? -7 : 7
  const pulseClass = direction === 'left' ? 'couple-card-pulse-left' : 'couple-card-pulse-right'

  return <motion.div initial={reduceMotion ? false : { opacity: 0, x: initialX, rotateY: initialRotateY }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0.01 : 0.78, delay: direction === 'right' ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }} style={{ transformStyle: 'preserve-3d' }} className={direction === 'left' ? 'relative z-0' : 'relative z-10'}>
    <div className={`group h-full overflow-hidden rounded-[1.25rem] border border-[#e7cec1] bg-[#fcf9f4] shadow-[0_28px_55px_rgba(91,60,48,0.16),inset_0_1px_0_rgba(255,255,255,0.9)] ${pulseClass}`}>
      <div className="aspect-[3/4] overflow-hidden"><img src={person.photo} alt={person.role} className={`h-full w-full -translate-x-[1.5%] scale-[1.03] object-cover transition duration-700 group-hover:scale-105 ${isBride ? 'object-[50%_95%]' : 'object-[50%_80%]'}`} /></div>
      <div className="p-4 sm:p-9"><p className="text-[9px] tracking-[0.16em] text-[#a56c61] uppercase sm:text-xs sm:tracking-[0.24em]">{person.role}</p><h3 className="mt-1.5 font-display text-3xl leading-none tracking-[-0.03em] text-[#4a3029] sm:mt-2 sm:text-5xl">{person.name}</h3><p className="mt-3 text-xs leading-5 text-[#725f56] sm:mt-5 sm:text-sm sm:leading-7">{bio}</p></div>
    </div>
  </motion.div>
}

function CoupleConnection({ reduceMotion }) {
  return <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.65 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: 0.42 }} className="absolute left-1/2 top-[30%] z-20 flex h-auto w-20 -translate-x-1/2 items-center justify-center sm:top-[35%] sm:w-36">
    <span className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#c78e78] to-transparent" />
    <span className="couple-rings-pulse relative grid h-10 w-10 place-items-center rounded-full border border-[#d7a58f] bg-[#fcf9f4] text-[#a56c61] shadow-[0_8px_18px_rgba(91,60,48,.16),inset_0_1px_0_white] sm:h-12 sm:w-12"><RingsIcon /></span>
  </motion.div>
}

function RingsIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.6]"><circle cx="12.5" cy="17.5" r="6.5" /><circle cx="19.5" cy="14.5" r="6.5" /><path d="m19.5 6.5 1.4 2.5 2.8.5-2 2 .4 2.8-2.6-1.2-2.6 1.2.4-2.8-2-2 2.8-.5 1.4-2.5Z" /></svg>
}
