const jsonHeaders = { 'content-type': 'application/json; charset=UTF-8' }

function response(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders })
}

function supabaseHeaders(env) {
  return {
    apikey: env.SUPABASE_SECRET_KEY,
    'content-type': 'application/json',
  }
}

function configured(env) {
  return env.SUPABASE_URL && env.SUPABASE_SECRET_KEY && env.TURNSTILE_SECRET_KEY
}

async function verifyTurnstile(token, request, env) {
  const body = new FormData()
  body.append('secret', env.TURNSTILE_SECRET_KEY)
  body.append('response', token)
  body.append('remoteip', request.headers.get('CF-Connecting-IP') || '')
  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  return (await result.json()).success === true
}

function sanitize(value) {
  return String(value || '').trim().replace(/\s+/g, ' ')
}

export async function onRequestGet({ request, env }) {
  if (!configured(env)) return response({ error: 'Chức năng lời chúc đang được thiết lập.' }, 503)
  const requestUrl = new URL(request.url)
  const offset = Math.max(0, Number.parseInt(requestUrl.searchParams.get('offset'), 10) || 0)
  const url = new URL(`${env.SUPABASE_URL}/rest/v1/wishes`)
  url.searchParams.set('select', 'id,name,message,created_at')
  url.searchParams.set('is_approved', 'eq.true')
  url.searchParams.set('order', 'created_at.desc')
  url.searchParams.set('limit', '10')
  url.searchParams.set('offset', String(offset))
  const result = await fetch(url, { headers: supabaseHeaders(env) })
  if (!result.ok) return response({ error: 'Không tải được lời chúc lúc này.' }, 502)
  return response(await result.json())
}

export async function onRequestPost({ request, env }) {
  if (!configured(env)) return response({ error: 'Chức năng lời chúc đang được thiết lập.' }, 503)
  let payload
  try {
    payload = await request.json()
  } catch {
    return response({ error: 'Dữ liệu gửi lên không hợp lệ.' }, 400)
  }
  const name = sanitize(payload.name)
  const message = sanitize(payload.message)
  if (name.length < 2 || name.length > 60 || message.length < 2 || message.length > 300 || !payload.turnstileToken) {
    return response({ error: 'Vui lòng nhập tên, lời chúc hợp lệ và xác nhận chống bot.' }, 400)
  }
  if (!(await verifyTurnstile(payload.turnstileToken, request, env))) {
    return response({ error: 'Xác nhận chống bot chưa thành công. Vui lòng thử lại.' }, 400)
  }
  const result = await fetch(`${env.SUPABASE_URL}/rest/v1/wishes`, {
    method: 'POST',
    headers: { ...supabaseHeaders(env), prefer: 'return=minimal' },
    body: JSON.stringify({ name, message }),
  })
  if (!result.ok) return response({ error: 'Chưa thể gửi lời chúc. Vui lòng thử lại sau.' }, 502)
  return response({ message: 'Lời chúc đã được gửi. Cảm ơn bạn thật nhiều!' }, 201)
}
