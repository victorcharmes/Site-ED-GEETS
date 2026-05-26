import { Router } from 'express'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function parseStat(row) {
  if (!row) return row

  let detail = row.detail
  if (row.detail_type === 'list') {
    try {
      detail = JSON.parse(row.detail || '[]')
    } catch {
      detail = []
    }
  }

  return {
    ...row,
    detail,
    detailType: row.detail_type,
  }
}

router.get('/', (req, res) => {
  const stats = db.prepare('SELECT * FROM stats ORDER BY id ASC').all().map(parseStat)
  res.json(stats)
})

router.put('/:id', requireAuth, (req, res) => {
  const { value, title, detail, detailType } = req.body
  const existing = db.prepare('SELECT * FROM stats WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const nextDetailType = detailType ?? existing.detail_type
  const nextDetail = nextDetailType === 'list'
    ? JSON.stringify(Array.isArray(detail) ? detail : [])
    : (detail ?? '')

  db.prepare('UPDATE stats SET value = ?, title = ?, detail = ?, detail_type = ? WHERE id = ?').run(
    value ?? existing.value,
    title ?? existing.title,
    nextDetail,
    nextDetailType,
    req.params.id
  )

  res.json(parseStat(db.prepare('SELECT * FROM stats WHERE id = ?').get(req.params.id)))
})

export default router