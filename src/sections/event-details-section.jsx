import { Reveal, SectionHeading } from '../components/reveal'
import { wedding } from '../data/wedding'

export default function EventDetailsSection() {
  return <section className="bg-[#ead8ca] px-5 py-20 sm:py-28" id="event"><SectionHeading eyebrow="The celebration" title="Ngày chung đôi" />
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">{wedding.ceremonies.map(ceremony => <Reveal key={ceremony.title} className="border border-[#b77d6e]/35 bg-[#fdf8f2] p-7 text-center shadow-[0_18px_50px_rgba(91,60,48,0.08)] sm:p-10">
      <p className="font-display text-4xl text-[#4a3029]">{ceremony.title}</p>
      <div className="my-6 border-y border-[#d6b4a4] py-6 text-sm leading-7 text-[#725f56]"><p>{ceremony.date}</p><p className="mt-3 whitespace-pre-line">{ceremony.venue}</p></div>
      <a href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-[#9c6257] px-6 text-xs font-medium tracking-[0.16em] text-white uppercase transition hover:bg-[#704139] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#704139]">Mở Google Maps</a>
    </Reveal>)}</div>
    <Reveal className="mx-auto mt-8 max-w-5xl text-center text-sm italic text-[#725f56]">{wedding.attireNote}</Reveal>
  </section>
}
