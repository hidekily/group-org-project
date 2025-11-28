import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  out: path.join(__dirname, '../drizzle'),
  schema: path.join(__dirname, './db/schema.ts'),
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/mydb',
  },
}
