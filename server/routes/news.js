import { Router } from 'express'
import db from '../db/database.js'

const router = Router()

router.get('/', (req, res) => {
  const news = db.prepare('SELECT * FROM news ORDER BY date DESC').all()
  res.json(news)
})

router.get('/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

router.post('/', (req, res) => {
  const { title, date, category, content, image } = req.body
  if (!title || !date) return res.status(400).json({ error: 'title and date are required' })

  const result = db
    .prepare('INSERT INTO news (title, date, category, content, image) VALUES (?, ?, ?, ?, ?)')
    .run(title, date, category ?? 'Actualité', content ?? '', image ?? '')

  const created = db.prepare('SELECT * FROM news WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(created)
})

router.put('/:id', (req, res) => {
  const { title, date, category, content, image } = req.body
  const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  db.prepare(
    'UPDATE news SET title = ?, date = ?, category = ?, content = ?, image = ? WHERE id = ?'
  ).run(
    title ?? existing.title,
    date ?? existing.date,
    category ?? existing.category,
    content ?? existing.content,
    image ?? existing.image,
    req.params.id
  )

  res.json(db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id))
})

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.status(204).send()
})

export default router
