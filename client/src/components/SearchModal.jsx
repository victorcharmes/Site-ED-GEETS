import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, X, FileText, GraduationCap, HelpCircle, Newspaper, Calendar, Loader2 } from 'lucide-react'

const TYPE_CONFIG = {
  'ressource-doctorant': { label: 'Ressource doctorant', icon: GraduationCap, color: 'bg-brand-50 text-brand-600' },
  'ressource-permanent': { label: 'Ressource permanent', icon: FileText, color: 'bg-teal-50 text-teal-600' },
  'faq':                 { label: 'FAQ', icon: HelpCircle, color: 'bg-blue-50 text-blue-600' },
  'actualite':           { label: 'Actualité', icon: Newspaper, color: 'bg-amber-50 text-amber-600' },
  'agenda':              { label: 'Agenda', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
}

const quickLinks = [
  { label: 'Consulter les sujets de thèse STIC', href: '#offres', color: 'bg-brand-50 text-brand-600 group-hover:bg-brand-100' },
  { label: "Démarches d'inscription et réinscription", href: '#doctorants', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' },
  { label: 'Laboratoire LAAS-CNRS', href: '#laboratoires', color: 'bg-slate-200 text-slate-600 group-hover:bg-slate-300', short: 'LAAS' },
]

export default function SearchModal({ isOpen, onClose }) {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  // Focus à l'ouverture
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
    else { setQuery(''); setResults([]) }
  }, [isOpen])

  // Focus trap et raccourcis clavier
  useEffect(() => {
    const handler = (e) => {
      const modal = document.getElementById('search-modal-dialog')
      
      if (e.key === 'Escape' && isOpen) {
        onClose()
        return
      }

      if (e.key === 'Tab' && isOpen && modal) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Recherche avec debounce
  const fetchResults = useCallback((q) => {
    if (q.length < 2) { setResults([]); setLoading(false); return }
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data) => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchResults(val), 280)
  }

  const handleSelect = (url) => {
    onClose()
    navigate(url)
  }

  const showQuickLinks = query.length < 2
  const showEmpty = !loading && query.length >= 2 && results.length === 0

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Modale */}
      <div
        id="search-modal-dialog"
        className={`fixed top-4 sm:top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-300 z-60 ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        {/* Champ de saisie */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100">
          {loading
            ? <Loader2 className="w-5 h-5 text-brand-600 mr-3 shrink-0 animate-spin" />
            : <Search className="w-5 h-5 text-brand-600 mr-3 shrink-0" />
          }
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            className="flex-1 bg-transparent text-lg text-slate-900 placeholder-slate-400 focus:outline-none"
            placeholder="Rechercher une ressource, une question FAQ..."
            autoComplete="off"
            id="search-modal-title"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
              className="ml-2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Effacer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-3 shrink-0 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Fermer la recherche"
          >
            ESC
          </button>
        </div>

        {/* Corps */}
        <div className="p-4 sm:p-5 bg-slate-50 max-h-[60vh] overflow-y-auto">

          {/* Liens rapides (quand pas de saisie) */}
          {showQuickLinks && (
            <>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                Recherches fréquentes
              </h4>
              <ul className="space-y-2">
                {quickLinks.map(({ label, href, color, short }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-sm font-medium text-slate-700 group outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center transition-colors shrink-0 ${color} ${short ? 'font-bold text-[10px]' : ''}`}>
                        {short ?? <Search className="w-4 h-4" />}
                      </div>
                      {label}
                      <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-brand-500 transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Résultats */}
          {!showQuickLinks && !showEmpty && results.length > 0 && (
            <>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                {results.length} résultat{results.length > 1 ? 's' : ''}
              </h4>
              <ul className="space-y-1.5">
                {results.map((r) => {
                  const cfg = TYPE_CONFIG[r.type] ?? TYPE_CONFIG['faq']
                  const Icon = cfg.icon
                  return (
                    <li key={`${r.type}-${r.id}`}>
                      <button
                        onClick={() => handleSelect(r.url)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-left group outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${cfg.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{cfg.label} · {r.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors shrink-0" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          {/* Aucun résultat */}
          {showEmpty && (
            <div className="text-center py-10">
              <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-500">Aucun résultat pour <span className="text-slate-800">« {query} »</span></p>
              <p className="text-xs text-slate-400 mt-1">Essayez avec d'autres mots-clés.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
