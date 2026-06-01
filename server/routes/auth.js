import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db/database.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json({ error: 'Username et password requis' })

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  if (!admin) return res.status(401).json({ error: 'Identifiants incorrects' })

  const valid = bcrypt.compareSync(password, admin.password)
  if (!valid) return res.status(401).json({ error: 'Identifiants incorrects' })

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  )

  res.json({ token })
})

// GET /api/auth/me — vérifier si le token est valide
router.get('/me', (req, res) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Non autorisé' })
  try {
    const payload = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    res.json({ username: payload.username })
  } catch {
    res.status(401).json({ error: 'Token invalide' })
  }
})

// POST /api/auth/change-password — accessible sans JWT, avec l'ancien mdp
router.post('/change-password', (req, res) => {
  const { username, oldPassword, newPassword } = req.body
  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Tous les champs sont requis' })
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Le nouveau mot de passe est trop court (6 caractères minimum)' })
  }

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  if (!admin || !bcrypt.compareSync(oldPassword, admin.password)) {
    return res.status(401).json({ error: 'Identifiants incorrects' })
  }

  const hashed = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hashed, admin.id)

  res.json({ ok: true })
})

// POST /api/auth/reset-password
router.post('/reset-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Mot de passe actuel et nouveau requis' })
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Le nouveau mot de passe est trop court' })
  }

  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.id)
  if (!admin) return res.status(404).json({ error: 'Admin introuvable' })

  const valid = bcrypt.compareSync(currentPassword, admin.password)
  if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect' })

  const hashed = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hashed, admin.id)

  res.json({ ok: true })
})

export default router
