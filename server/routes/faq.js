import { Router } from 'express'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCategories() {
  const cats = db.prepare('SELECT * FROM faq_categories ORDER BY position ASC, id ASC').all()
  const questions = db.prepare('SELECT * FROM faq_questions ORDER BY position ASC, id ASC').all()
  return cats.map((cat) => ({
    ...cat,
    questions: questions.filter((q) => q.category_id === cat.id),
  }))
}

// ── Lecture publique ─────────────────────────────────────────────────────────

router.get('/', (_req, res) => {
  res.json(getCategories())
})

// ── Catégories (admin) ───────────────────────────────────────────────────────

router.post('/categories', requireAuth, (req, res) => {
  const { title, position } = req.body
  if (!title) return res.status(400).json({ error: 'title est requis' })

  const maxPos = db.prepare('SELECT COALESCE(MAX(position), -1) as m FROM faq_categories').get().m
  const result = db
    .prepare('INSERT INTO faq_categories (title, position) VALUES (?, ?)')
    .run(title, position ?? maxPos + 1)

  const created = db.prepare('SELECT * FROM faq_categories WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json({ ...created, questions: [] })
})

router.put('/categories/:id', requireAuth, (req, res) => {
  const { title, position } = req.body
  const existing = db.prepare('SELECT * FROM faq_categories WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  db.prepare('UPDATE faq_categories SET title = ?, position = ? WHERE id = ?').run(
    title ?? existing.title,
    position ?? existing.position,
    req.params.id
  )

  res.json(db.prepare('SELECT * FROM faq_categories WHERE id = ?').get(req.params.id))
})

router.delete('/categories/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM faq_categories WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  // Les questions sont supprimées en cascade (ON DELETE CASCADE)
  db.prepare('DELETE FROM faq_categories WHERE id = ?').run(req.params.id)
  res.status(204).send()
})

// ── Questions (admin) ────────────────────────────────────────────────────────

router.post('/questions', requireAuth, (req, res) => {
  const { category_id, question, answer, position } = req.body
  if (!category_id || !question) return res.status(400).json({ error: 'category_id et question sont requis' })

  const cat = db.prepare('SELECT id FROM faq_categories WHERE id = ?').get(category_id)
  if (!cat) return res.status(404).json({ error: 'Catégorie introuvable' })

  const maxPos = db
    .prepare('SELECT COALESCE(MAX(position), -1) as m FROM faq_questions WHERE category_id = ?')
    .get(category_id).m

  const result = db
    .prepare('INSERT INTO faq_questions (category_id, question, answer, position) VALUES (?, ?, ?, ?)')
    .run(category_id, question, answer ?? '', position ?? maxPos + 1)

  res.status(201).json(db.prepare('SELECT * FROM faq_questions WHERE id = ?').get(result.lastInsertRowid))
})

router.put('/questions/:id', requireAuth, (req, res) => {
  const { question, answer, position } = req.body
  const existing = db.prepare('SELECT * FROM faq_questions WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  db.prepare('UPDATE faq_questions SET question = ?, answer = ?, position = ? WHERE id = ?').run(
    question ?? existing.question,
    answer ?? existing.answer,
    position ?? existing.position,
    req.params.id
  )

  res.json(db.prepare('SELECT * FROM faq_questions WHERE id = ?').get(req.params.id))
})

router.delete('/questions/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM faq_questions WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  db.prepare('DELETE FROM faq_questions WHERE id = ?').run(req.params.id)
  res.status(204).send()
})

export default router
