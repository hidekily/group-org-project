    // backend/src/db/manwha-schema.ts
import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { user } from './auth-schema'

export const manwhaChapters = pgTable('manwha_chapters', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  chapterNumber: integer('chapter_number').notNull(),
  link: text('link'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const manwhaChaptersRelations = relations(manwhaChapters, ({ one }) => ({
  addedBy: one(user, {
    fields: [manwhaChapters.userId],
    references: [user.id],
  }),
}))