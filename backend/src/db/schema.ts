import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// ✅ Importar schema do Better Auth
export * from './auth-schema'
export * from './manwha-schema'

// Suas tabelas existentes
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})