import { Router } from 'express'
import db from '../db/database.js'

const router = Router()

router.get('/', (req, res) => {
  const events = db.prepare('SELECT * FROM agenda ORDER BY date ASC').all()
  res.json(events)
})

router.get('/:id', (req, res) => {
  const event = db.prepare('SELECT * FROM agenda WHERE id = ?').get(req.params.id)
  if (!event) return res.status(404).json({ error: 'Not found' })
  res.json(event)
})

router.post('/', (req, res) => {
  const { title, date, time, location, type, content } = req.body
  if (!title || !date) return res.status(400).json({ error: 'title and date are required' })

  const result = db
    .prepare(
      'INSERT INTO agenda (title, date, time, location, type, content) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(title, date, time ?? '', location ?? '', type ?? 'Événement', content ?? '')

  const created = db.prepare('SELECT * FROM agenda WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(created)
})

router.put('/:id', (req, res) => {
  const { title, date, time, location, type, content } = req.body
  const existing = db.prepare('SELECT * FROM agenda WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  db.prepare(
    'UPDATE agenda SET title = ?, date = ?, time = ?, location = ?, type = ?, content = ? WHERE id = ?'
  ).run(
    title ?? existing.title,
    date ?? existing.date,
    time ?? existing.time,
    location ?? existing.location,
    type ?? existing.type,
    content ?? existing.content,
    req.params.id
  )

  res.json(db.prepare('SELECT * FROM agenda WHERE id = ?').get(req.params.id))
})

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM agenda WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.status(204).send()
})

export default router
