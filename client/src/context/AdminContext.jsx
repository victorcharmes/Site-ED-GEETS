import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext({ isAdmin: false, toggleAdmin: () => {} })

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isMockAdmin') === 'true') setIsAdmin(true)
  }, [])

  const toggleAdmin = () => {
    setIsAdmin((prev) => {
      const next = !prev
      localStorage.setItem('isMockAdmin', String(next))
      return next
    })
  }

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}
