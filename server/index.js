import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import newsRouter from './routes/news.js'
import agendaRouter from './routes/agenda.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/api/news', newsRouter)
app.use('/api/agenda', agendaRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
