import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })
import bcrypt from 'bcryptjs'
import newsRouter from './routes/news.js'
import agendaRouter from './routes/agenda.js'
import statsRouter from './routes/stats.js'
import authRouter from './routes/auth.js'
import aboutRouter from './routes/about.js'
import resourcesRouter from './routes/resources.js'
import permanentResourcesRouter from './routes/permanent_resources.js'
import faqRouter from './routes/faq.js'
import db from './db/database.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// Servir les fichiers uploadés
const uploadsDir = join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

app.use('/api/news', newsRouter)
app.use('/api/agenda', agendaRouter)
app.use('/api/stats', statsRouter)
app.use('/api/auth', authRouter)
app.use('/api/about', aboutRouter)
app.use('/api/resources', resourcesRouter)
app.use('/api/permanent-resources', permanentResourcesRouter)
app.use('/api/faq', faqRouter)

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
