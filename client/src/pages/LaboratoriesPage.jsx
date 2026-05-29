import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Check, X } from 'lucide-react'
import Laboratories from '../components/Laboratories.jsx'
import { useAdmin } from '../context/AdminContext'
import { useEditableText } from '../hooks/useEditableText'

export default function LaboratoriesPage() {
  const { isAdmin } = useAdmin()
  const labsHeader = useEditableText('labs_page_header', "Découvrez les 13 unités de recherche de l'ED GEETS, intégrées dans les pôles de compétitivité AESE et CBS.")

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Laboratoires</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Laboratoires</h1>

          {labsHeader.editing ? (
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-univ-200 mb-2">Édition admin</p>
              <textarea value={labsHeader.editValue} onChange={e => labsHeader.setEditValue(e.target.value)} rows={3}
                className="w-full px-4 py-3 text-slate-900 bg-white text-sm outline-none focus:ring-2 focus:ring-white/50 resize-none" />
              <div className="flex gap-3 mt-2">
                <button onClick={labsHeader.save} disabled={labsHeader.saving}
                  className="inline-flex items-center gap-1.5 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 disabled:opacity-50 transition-colors">
                  <Check className="h-3.5 w-3.5" />{labsHeader.saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button onClick={labsHeader.cancelEdit}
                  className="inline-flex items-center gap-1.5 border border-white/40 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                  <X className="h-3.5 w-3.5" />Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">{labsHeader.text}</p>
              {isAdmin && (
                <button onClick={labsHeader.startEdit}
                  className="inline-flex items-center gap-1.5 border border-white/40 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors shrink-0 mt-1">
                  <Pencil className="h-3.5 w-3.5" />Modifier
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Laboratories />
    </div>
  )
}
