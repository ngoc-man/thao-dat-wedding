import { useEffect, useRef, useState } from 'react'
import { Reveal, SectionHeading } from '../components/reveal'

const turnstileSiteKey = import.meta.env[['VITE', 'TURNSTILE', 'SITE', 'KEY'].join('_')]

function formatTime(value) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(value))
}

export default function WishesSection() {
  const [wishes, setWishes] = useState([])
  const [form, setForm] = useState({ name: '', message: '' })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const turnstileElement = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    fetch('/api/wishes').then(async result => {
      if (!result.ok) return
      setWishes(await result.json())
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileElement.current) return
    const renderWidget = () => {
      if (widgetId.current !== null || !window.turnstile) return
      widgetId.current = window.turnstile.render(turnstileElement.current, {
        sitekey: turnstileSiteKey,
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
      })
    }
    const existing = document.getElementById('turnstile-script')
    if (existing) {
      existing.addEventListener('load', renderWidget)
      renderWidget()
      return () => existing.removeEventListener('load', renderWidget)
    }
    const script = document.createElement('script')
    script.id = 'turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = renderWidget
    document.head.append(script)
  }, [])

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    if (!turnstileToken) {
      setError('Vui lòng hoàn tất xác nhận chống bot.')
      return
    }
    setIsSending(true)
    try {
      const result = await fetch('/api/wishes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...form, turnstileToken }) })
      const payload = await result.json()
      if (!result.ok) throw new Error(payload.error)
      setForm({ name: '', message: '' })
      setTurnstileToken('')
      window.turnstile?.reset(widgetId.current)
      setNotice(payload.message)
    } catch (requestError) {
      setError(requestError.message || 'Chưa thể gửi lời chúc. Vui lòng thử lại.')
    } finally {
      setIsSending(false)
    }
  }

  return <section className="section-shell bg-[#f4e9df]" id="wishes"><SectionHeading eyebrow="With love" title="Gửi lời chúc" description="Mỗi lời chúc của bạn là một món quà nhỏ, làm ngày vui của chúng mình thêm trọn vẹn." />
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[.85fr_1.15fr]">
      <Reveal className="bg-[#fdf9f4] p-6 shadow-[0_15px_40px_rgba(91,60,48,.08)] sm:p-8"><form onSubmit={submit} className="space-y-4"><label className="block text-xs tracking-[.16em] text-[#82594e] uppercase">Tên của bạn<input required minLength="2" maxLength="60" name="name" value={form.name} onChange={update} className="mt-2 min-h-11 w-full border border-[#d9c7ba] bg-white px-3 text-base tracking-normal text-[#40332d] outline-none focus:border-[#9c6257]" /></label><label className="block text-xs tracking-[.16em] text-[#82594e] uppercase">Lời chúc<textarea required minLength="2" maxLength="300" name="message" value={form.message} onChange={update} className="mt-2 min-h-28 w-full border border-[#d9c7ba] bg-white p-3 text-base leading-6 tracking-normal text-[#40332d] outline-none focus:border-[#9c6257]" /></label>{turnstileSiteKey ? <div ref={turnstileElement} /> : <p className="text-sm leading-6 text-[#82594e]">Chức năng lời chúc đang được thiết lập.</p>}{error && <p className="text-sm text-[#a23d36]" role="alert">{error}</p>}{notice && <p className="text-sm text-[#567047]" role="status">{notice}</p>}<button disabled={isSending || !turnstileSiteKey} className="min-h-11 border border-[#82594e] px-5 text-xs font-medium tracking-[.18em] text-[#82594e] uppercase transition hover:bg-[#82594e] hover:text-white disabled:cursor-not-allowed disabled:opacity-50">{isSending ? 'Đang gửi...' : 'Gửi lời chúc'}</button></form></Reveal>
      <div><p className="mb-4 text-xs tracking-[.16em] text-[#82594e] uppercase">Lời chúc từ mọi người</p><div className="space-y-3">{wishes.length ? wishes.map(wish => <Reveal key={wish.id} className="bg-white/70 p-5"><p className="font-display text-xl text-[#4a3029]">{wish.name}</p><p className="mt-2 leading-7 text-[#725f56]">{wish.message}</p><p className="mt-3 text-[10px] tracking-[.12em] text-[#a56c61] uppercase">{formatTime(wish.created_at)}</p></Reveal>) : <p className="border border-dashed border-[#c9a692] p-5 text-sm leading-6 text-[#725f56]">Những lời chúc đầu tiên sẽ sớm được lưu lại ở đây.</p>}</div></div>
    </div>
  </section>
}
