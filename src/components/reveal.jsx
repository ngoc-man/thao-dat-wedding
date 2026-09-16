import { motion } from 'motion/react'

export function Reveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, description, titleClassName = 'text-4xl sm:text-5xl' }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-xl text-center">
      <p className="mb-3 text-xs font-medium tracking-[0.28em] text-[#a56c61] uppercase">{eyebrow}</p>
      <h2 className={`font-display leading-tight text-[#4a3029] ${titleClassName}`}>{title}</h2>
      {description && <p className="mt-4 text-sm leading-7 text-[#725f56] sm:text-base">{description}</p>}
    </Reveal>
  )
}
