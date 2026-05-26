import { Router } from 'express'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function parseBlock(row) {
  if (!row) return row
  let content
  try {
    content = JSON.parse(row.content)
  } catch {
    content = row.content
  }
  return {
    id: row.id,
    block_key: row.block_key,
    title: row.title,
    content,
    content_type: row.content_type,
  }
}

router.get('/', (req, res) => {
  const blocks = db.prepare('SELECT * FROM about_blocks ORDER BY id ASC').all().map(parseBlock)
  res.json(blocks)
})

router.put('/:key', requireAuth, (req, res) => {
  const { content } = req.body
  const existing = db.prepare('SELECT * FROM about_blocks WHERE block_key = ?').get(req.params.key)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const contentStr = typeof content === 'string' ? content : JSON.stringify(content)
  db.prepare('UPDATE about_blocks SET content = ? WHERE block_key = ?').run(contentStr, req.params.key)

  res.json(parseBlock(db.prepare('SELECT * FROM about_blocks WHERE block_key = ?').get(req.params.key)))
})

export default router
