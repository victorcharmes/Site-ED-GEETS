import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db/database.js'

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

export default router
