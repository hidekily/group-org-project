import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

config()

async function runMigration() {
  console.log('🔄 Starting database migration...')

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  })

  const db = drizzle(pool)

  try {
    console.log('📦 Running migrations...')
    // Como estamos usando db:push, vamos apenas testar a conexão
    await pool.query('SELECT NOW()')
    console.log('✅ Database connection successful!')
    console.log('ℹ️  Use "pnpm run db:push" to sync schema')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
