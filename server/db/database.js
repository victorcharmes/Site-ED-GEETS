import Database from 'better-sqlite3'
import { schema } from './schema.js'
import { seed } from './seed.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const db = new Database(join(__dirname, 'geets.sqlite'))

db.pragma('journal_mode = WAL')
db.exec(schema)

// Migration pour ajouter is_protected si la table existait avant
const tableInfo = db.pragma('table_info(resources)')
const hasIsProtected = tableInfo.some(column => column.name === 'is_protected')
if (!hasIsProtected) {
  try {
    db.exec('ALTER TABLE resources ADD COLUMN is_protected INTEGER NOT NULL DEFAULT 0')
  } catch (e) {
    throw new Error(`Migration 'is_protected' failed: ${e.message}`)
  }
}
const tableInfoPerm = db.pragma('table_info(permanent_resources)')
const hasIsProtectedPerm = tableInfoPerm.some(column => column.name === 'is_protected')
if (!hasIsProtectedPerm) {
  try {
    db.exec('ALTER TABLE permanent_resources ADD COLUMN is_protected INTEGER NOT NULL DEFAULT 0')
  } catch (e) {
    console.error("Migration 'is_protected' for permanent_resources failed:", e)
  }
}
seed(db)

export default db
