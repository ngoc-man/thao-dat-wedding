const symbols = ['✦', '✿', '♥', '✦', '❋', '♥', '✦', '✿', '♥', '❋', '✦', '♥']

export default function CelebrationEffects() {
  return <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">{symbols.map((symbol, index) => <span key={index} className={`celebration-particle celebration-particle-${index + 1}`}>{symbol}</span>)}</div>
}
