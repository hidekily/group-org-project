import { createServer } from 'http'
import { db } from './db/index.js'
import { auth } from './lib/auth.js'

const PORT = 3001

const server = createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
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

      // Converter Web Response para Node.js Response
      res.writeHead(response.status, Object.fromEntries(response.headers.entries()))
      
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