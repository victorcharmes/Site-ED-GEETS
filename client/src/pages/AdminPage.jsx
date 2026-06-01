import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { Lock, User, AlertCircle } from 'lucide-react'

export default function AdminPage() {
  const { isAdmin, login, logout, token } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetError, setResetError] = useState('')
  const [resetSuccess, setResetSuccess] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [showChangeForm, setShowChangeForm] = useState(false)
  const [changeUsername, setChangeUsername] = useState('')
  const [changeOldPassword, setChangeOldPassword] = useState('')
  const [changeNewPassword, setChangeNewPassword] = useState('')
  const [changeConfirmPassword, setChangeConfirmPassword] = useState('')
  const [changeError, setChangeError] = useState('')
  const [changeSuccess, setChangeSuccess] = useState('')
  const [changeLoading, setChangeLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setResetError('')
    setResetSuccess('')

    if (!token) {
      setResetError('Vous devez etre connecte pour modifier le mot de passe.')
      return
    }

    if (newPassword !== confirmPassword) {
      setResetError('Les nouveaux mots de passe ne correspondent pas.')
      return
    }

    setResetLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Erreur lors de la mise a jour du mot de passe')
      }

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setResetSuccess('Mot de passe mis a jour.')
    } catch (err) {
      setResetError(err.message)
    } finally {
      setResetLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setChangeError('')
    setChangeSuccess('')

    if (changeNewPassword !== changeConfirmPassword) {
      setChangeError('Les nouveaux mots de passe ne correspondent pas.')
      return
    }

    setChangeLoading(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: changeUsername,
          oldPassword: changeOldPassword,
          newPassword: changeNewPassword,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Erreur lors du changement de mot de passe')
      }

      setChangeUsername('')
      setChangeOldPassword('')
      setChangeNewPassword('')
      setChangeConfirmPassword('')
      setChangeSuccess('Mot de passe mis à jour. Vous pouvez maintenant vous connecter.')
    } catch (err) {
      setChangeError(err.message)
    } finally {
      setChangeLoading(false)
    }
  }

  // Si déjà connecté
  if (isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Mode Admin actif</h1>
          <p className="text-slate-500 mb-8">Vous êtes connecté en tant qu'administrateur.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-brand-700 text-white font-semibold hover:bg-brand-600 transition-colors"
            >
              Retour au site
            </button>
            <button
              onClick={logout}
              className="w-full py-3 border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Se déconnecter
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-left">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Réinitialiser le mot de passe</h2>

            <form onSubmit={handleResetPassword} className="space-y-4">
              {resetError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm">
                  {resetSuccess}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-3 bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetLoading ? 'Mise a jour...' : 'Mettre a jour le mot de passe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-xl p-10 max-w-md w-full">
        <div className="w-16 h-16 bg-brand-100 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-brand-700" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Administration</h1>
        <p className="text-slate-500 text-center mb-8">ED GEETS — Accès réservé</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-700 text-white font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-200">
          <button
            type="button"
            onClick={() => { setShowChangeForm(v => !v); setChangeError(''); setChangeSuccess('') }}
            className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2"
          >
            {showChangeForm ? 'Annuler' : 'Changer le mot de passe'}
          </button>

          {showChangeForm && (
            <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
              {changeError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {changeError}
                </div>
              )}
              {changeSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm">
                  {changeSuccess}
                </div>
              )}

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={changeUsername}
                  onChange={(e) => setChangeUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={changeOldPassword}
                  onChange={(e) => setChangeOldPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="Ancien mot de passe"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={changeNewPassword}
                  onChange={(e) => setChangeNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="Nouveau mot de passe"
                  required
                  minLength={6}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={changeConfirmPassword}
                  onChange={(e) => setChangeConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="Confirmer le nouveau mot de passe"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={changeLoading}
                className="w-full py-3 bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {changeLoading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
