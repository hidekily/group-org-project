import { createServer } from 'http'
import { auth } from './lib/auth.js'
import { createChapter, listChapters, deleteChapter } from './routes/manwha.js'

const PORT = process.env.PORT || 3001

// URLs permitidas (localhost + produção)
// Normalizar URLs removendo barras no final
const normalizeUrl = (url: string | undefined) => url?.replace(/\/$/, '')

const ALLOWED_ORIGINS = [
  normalizeUrl(process.env.FRONTEND_URL), // URL do Vercel (prioridade)
  'http://localhost:3000',
].filter(Boolean) as string[]

const server = createServer(async (req, res) => {
  // Enable CORS
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    // Usar a primeira URL válida (produção ou localhost)
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS[0] || 'http://localhost:3000')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url?.startsWith('/api/auth')) {
    try {
      // Converter Node.js Request para Web Request
      const protocol = req.headers['x-forwarded-proto'] || 'http'
      const host = req.headers.host || `localhost:${PORT}`
      const url = `${protocol}://${host}${req.url}`

      console.log('Auth request:', req.method, url)
      console.log('Request cookies:', req.headers.cookie || 'No cookies')

      // Coletar body da requisição
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })

      await new Promise(resolve => req.on('end', resolve))

      // Criar Web Request
      const headers = new Headers()
      Object.entries(req.headers).forEach(([key, value]) => {
        if (value) headers.set(key, Array.isArray(value) ? value[0] : value)
      })

      const webRequest = new Request(url, {
        method: req.method || 'GET',
        headers,
        body: body || undefined,
      })

      // Chamar Better Auth
      const response = await auth.handler(webRequest)

      console.log('Auth response status:', response.status)

      // Obter headers e modificar cookies se necessário
      const responseHeaders: Record<string, string | string[]> = Object.fromEntries(response.headers.entries())

      // Se houver Set-Cookie, garantir que está configurado para localhost
      if (responseHeaders['set-cookie']) {
        const cookies = Array.isArray(responseHeaders['set-cookie'])
          ? responseHeaders['set-cookie']
          : [responseHeaders['set-cookie']]

        console.log('Original cookies:', cookies)

        // Modificar cookies para funcionar em localhost
        const modifiedCookies = cookies.map(cookie => {
          // Remove domain específico e garante SameSite=Lax
          let modifiedCookie = cookie
            .replace(/Domain=[^;]+;?\s*/gi, '')
            .replace(/Secure;?\s*/gi, '')

          // Adiciona SameSite=Lax se não existir
          if (!modifiedCookie.includes('SameSite')) {
            modifiedCookie += '; SameSite=Lax'
          }

          // Garante que Path está correto
          if (!modifiedCookie.includes('Path')) {
            modifiedCookie += '; Path=/'
          }

          return modifiedCookie
        })

        responseHeaders['set-cookie'] = modifiedCookies

        console.log('Modified cookies:', modifiedCookies)
      } else {
        console.log('No Set-Cookie headers found')
      }

      // Converter Web Response para Node.js Response
      res.writeHead(response.status, responseHeaders as any)

      if (response.body) {
        const reader = response.body.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          res.write(value)
        }
      }

      res.end()
      return
    } catch (error) {
      console.error('Auth handler error:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal server error' }))
      return
    }
  }

    if (req.url === '/api/manwha' && req.method === 'POST') {
    await createChapter(req, res)
    return
  }

  if (req.url === '/api/manwha' && req.method === 'GET') {
    await listChapters(req, res)
    return
  }

  if (req.url?.startsWith('/api/manwha/') && req.method === 'DELETE') {
    const chapterId = req.url.split('/').pop() || ''
    await deleteChapter(req, res, chapterId)
    return
  }

  // Health check
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', message: 'Backend is running' }))
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

const main = async () => {
  server.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`)
    console.log(`Health check: http://localhost:${PORT}/api/health`)
  })
}

main().catch(console.error)