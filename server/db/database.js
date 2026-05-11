import Database from 'better-sqlite3'
import { schema } from './schema.js'
import { seed } from './seed.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const db = new Database(join(__dirname, 'geets.sqlite'))

db.pragma('journal_mode = WAL')
db.exec(schema)
seed(db)

export default db
