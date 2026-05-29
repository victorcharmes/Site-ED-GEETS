import { Router } from 'express'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM site_texts').all()
  const result = {}
  for (const row of rows) result[row.key] = row.value
  res.json(result)
})

router.put('/:key', requireAuth, (req, res) => {
  const { value } = req.body
  if (typeof value !== 'string') return res.status(400).json({ error: 'Valeur invalide' })
  const existing = db.prepare('SELECT key FROM site_texts WHERE key = ?').get(req.params.key)
  if (!existing) return res.status(404).json({ error: 'Clé introuvable' })
  db.prepare('UPDATE site_texts SET value = ? WHERE key = ?').run(value.trim(), req.params.key)
  res.json({ key: req.params.key, value: value.trim() })
})

export default router
