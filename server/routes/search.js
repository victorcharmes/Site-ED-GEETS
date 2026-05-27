import express from 'express'
import db from '../db/database.js'

const router = express.Router()

// GET /api/search?q=...
router.get('/', (req, res) => {
  const q = (req.query.q ?? '').trim()
  if (q.length < 2) return res.json([])

  const like = `%${q}%`

  const results = []

  // ── Ressources doctorants ──────────────────────────────────────────────────
  const docResources = db.prepare(`
    SELECT id, title, category, 'ressource-doctorant' AS type
    FROM resources
    WHERE title LIKE ? OR content LIKE ? OR category LIKE ?
    LIMIT 5
  `).all(like, like, like)
  docResources.forEach((r) =>
    results.push({ ...r, url: `/ressources-doctorants?openTitle=${encodeURIComponent(r.title)}` })
  )

  // ── Ressources permanents ──────────────────────────────────────────────────
  const permResources = db.prepare(`
    SELECT id, title, category, 'ressource-permanent' AS type
    FROM permanent_resources
    WHERE title LIKE ? OR content LIKE ? OR category LIKE ?
    LIMIT 5
  `).all(like, like, like)
  permResources.forEach((r) =>
    results.push({ ...r, url: `/ressources-permanents?openTitle=${encodeURIComponent(r.title)}` })
  )

  // ── FAQ ────────────────────────────────────────────────────────────────────
  const faqResults = db.prepare(`
    SELECT q.id, q.question AS title, c.title AS category, 'faq' AS type
    FROM faq_questions q
    JOIN faq_categories c ON c.id = q.category_id
    WHERE q.question LIKE ? OR q.answer LIKE ?
    LIMIT 5
  `).all(like, like)
  faqResults.forEach((r) =>
    results.push({ ...r, url: `/faq` })
  )

  // ── Actualités ────────────────────────────────────────────────────────────
  const newsResults = db.prepare(`
    SELECT id, title, category, 'actualite' AS type
    FROM news
    WHERE title LIKE ? OR content LIKE ? OR category LIKE ?
    LIMIT 3
  `).all(like, like, like)
  newsResults.forEach((r) =>
    results.push({ ...r, url: `/actualites?openId=${r.id}` })
  )

  // ── Agenda ────────────────────────────────────────────────────────────────
  const agendaResults = db.prepare(`
    SELECT id, title, type AS category, 'agenda' AS type
    FROM agenda
    WHERE title LIKE ? OR content LIKE ? OR location LIKE ?
    LIMIT 3
  `).all(like, like, like)
  agendaResults.forEach((r) =>
    results.push({ ...r, url: `/agenda?openId=${r.id}` })
  )

  res.json(results)
})

export default router
