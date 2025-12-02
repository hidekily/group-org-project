// backend/src/routes/manwha.ts
import { IncomingMessage, ServerResponse } from 'http'
import { db } from '../db/index.js'
import { manwhaChapters } from '../db/schema.js'
import { auth } from '../lib/auth.js'
import { eq, desc } from 'drizzle-orm'

async function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        resolve({})
      }
    })
    req.on('error', reject)
  })
}

export async function createChapter(req: IncomingMessage, res: ServerResponse) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Você precisa estar logado' }))
      return
    }

    const { title, chapterNumber, link, notes } = await readBody(req)

    if (!title || !chapterNumber) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Título e capítulo são obrigatórios' }))
      return
    }

    const [newChapter] = await db.insert(manwhaChapters).values({
      userId: session.user.id,
      title,
      chapterNumber: parseInt(chapterNumber),
      link: link || null,
      notes: notes || null,
    }).returning()

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newChapter))
  } catch (error) {
    console.error('Erro ao criar:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Erro ao criar' }))
  }
}

export async function listChapters(_req: IncomingMessage, res: ServerResponse) {
  try {
    const chapters = await db.query.manwhaChapters.findMany({
      orderBy: [desc(manwhaChapters.createdAt)],
      with: {
        addedBy: {
          columns: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(chapters))
  } catch (error) {
    console.error('Erro ao listar:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Erro ao listar' }))
  }
}

export async function deleteChapter(req: IncomingMessage, res: ServerResponse, chapterId: string) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Não logado' }))
      return
    }

    const chapter = await db.query.manwhaChapters.findFirst({
      where: eq(manwhaChapters.id, chapterId)
    })

    if (!chapter) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Não encontrado' }))
      return
    }

    if (chapter.userId !== session.user.id) {
      res.writeHead(403, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Sem permissão' }))
      return
    }

    await db.delete(manwhaChapters).where(eq(manwhaChapters.id, chapterId))

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true }))
  } catch (error) {
    console.error('Erro ao deletar:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Erro ao deletar' }))
  }
}