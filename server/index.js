import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })
import bcrypt from 'bcryptjs'
import newsRouter from './routes/news.js'
import agendaRouter from './routes/agenda.js'
import authRouter from './routes/auth.js'
import db from './db/database.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/api/news', newsRouter)
app.use('/api/agenda', agendaRouter)
app.use('/api/auth', authRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Créer un admin par défaut si aucun n'existe
const adminExists = db.prepare('SELECT id FROM admins LIMIT 1').get()
if (!adminExists) {
  const hashed = bcrypt.hashSync(process.env.ADMIN_PASSWORD ?? 'admin123', 10)
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(
    process.env.ADMIN_USERNAME ?? 'admin',
    hashed
  )
  console.log('✅ Admin créé — username: admin, password: admin123')
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
