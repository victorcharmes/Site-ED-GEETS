import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext({ isAdmin: false, login: async () => {}, logout: () => {} })

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState(null)

  // Vérifier si un token valide existe au chargement
  useEffect(() => {
    const saved = localStorage.getItem('adminToken')
    if (!saved) return
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${saved}` },
    })
      .then((r) => r.ok ? (setToken(saved), setIsAdmin(true)) : localStorage.removeItem('adminToken'))
      .catch(() => localStorage.removeItem('adminToken'))
  }, [])

  const login = async (username, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error ?? 'Erreur de connexion')
    }
    const { token } = await res.json()
    localStorage.setItem('adminToken', token)
    setToken(token)
    setIsAdmin(true)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}
