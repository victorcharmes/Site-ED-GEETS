import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uploadsDir = join(__dirname, '../uploads')

// Créer le dossier uploads si nécessaire
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

// ── Multer ──────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    // Préserver le nom original lisible, préfixé par un timestamp
    const safe = file.originalname.replace(/[^a-z0-9.\-_]/gi, '_')
    cb(null, `${Date.now()}-${safe}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 Mo max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Seuls les fichiers PDF sont acceptés'))
  },
})

function formatSize(bytes) {
  const kb = bytes / 1024
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

function deleteUploadedFile(url) {
  if (!url?.startsWith('/uploads/')) return
  const filepath = join(uploadsDir, url.replace('/uploads/', ''))
  fs.unlink(filepath, () => {}) // silencieux si le fichier n'existe plus
}

const router = Router()

// ── Upload de fichier PDF (admin) ───────────────────────────────────────────
router.post('/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' })
  res.json({
    url: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    size: formatSize(req.file.size),
  })
})

// ── Lecture publique ────────────────────────────────────────────────────────
router.get('/', (_req, res) => {
  res.json(db.prepare('SELECT * FROM permanent_resources ORDER BY id ASC').all())
})

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM permanent_resources WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

// ── Création (admin) ────────────────────────────────────────────────────────
router.post('/', requireAuth, (req, res) => {
  const { title, category, type, date, size, url, content } = req.body
  if (!title) return res.status(400).json({ error: 'title is required' })

  const result = db
    .prepare('INSERT INTO permanent_resources (title, category, type, date, size, url, content) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, category ?? 'Général', type ?? 'pdf', date ?? '', size ?? '', url ?? '', content ?? '')

  res.status(201).json(db.prepare('SELECT * FROM permanent_resources WHERE id = ?').get(result.lastInsertRowid))
})

// ── Mise à jour (admin) ─────────────────────────────────────────────────────
router.put('/:id', requireAuth, (req, res) => {
  const { title, category, type, date, size, url, content } = req.body
  const existing = db.prepare('SELECT * FROM permanent_resources WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  // Si une nouvelle URL uploadée remplace l'ancienne, supprimer l'ancien fichier
  if (url && url !== existing.url && existing.url?.startsWith('/uploads/')) {
    deleteUploadedFile(existing.url)
  }

  db.prepare(
    'UPDATE permanent_resources SET title = ?, category = ?, type = ?, date = ?, size = ?, url = ?, content = ? WHERE id = ?'
  ).run(
    title ?? existing.title,
    category ?? existing.category,
    type ?? existing.type,
    date ?? existing.date,
    size ?? existing.size,
    url ?? existing.url,
    content ?? existing.content,
    req.params.id
  )

  res.json(db.prepare('SELECT * FROM permanent_resources WHERE id = ?').get(req.params.id))
})

// ── Suppression (admin) ─────────────────────────────────────────────────────
router.delete('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM permanent_resources WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  if (existing.is_protected) {
    return res.status(403).json({ error: 'Cannot delete a protected resource' })
  }

  db.prepare('DELETE FROM permanent_resources WHERE id = ?').run(req.params.id)
  deleteUploadedFile(existing.url) // nettoyage du fichier si uploadé

  res.status(204).send()
})

export default router
