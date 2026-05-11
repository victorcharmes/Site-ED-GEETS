import { useEffect, useRef } from 'react'
import { Search, ArrowRight, X } from 'lucide-react'

const quickLinks = [
  { label: 'Consulter les sujets de thèse STIC', href: '#offres', color: 'bg-brand-50 text-brand-600 group-hover:bg-brand-100' },
  { label: "Démarches d'inscription et réinscription", href: '#doctorants', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' },
  { label: 'Laboratoire LAAS-CNRS', href: '#laboratoires', color: 'bg-slate-200 text-slate-600 group-hover:bg-slate-300', short: 'LAAS' },
]

export default function SearchModal({ isOpen, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) onClose() // le parent gère l'ouverture via onOpenSearch
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-4 sm:top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-300 z-[60] ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <div className="flex items-center px-4 py-4 border-b border-slate-100">
          <Search className="w-6 h-6 text-brand-600 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-lg text-slate-900 placeholder-slate-400 focus:outline-none"
            placeholder="Rechercher une thèse, un laboratoire, une démarche..."
            autoComplete="off"
          />
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Fermer la recherche"
          >
            ESC
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-slate-50">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3" id="search-modal-title">
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
                  <div className={`w-8 h-8 flex items-center justify-center transition-colors ${color} ${short ? 'font-bold text-[10px]' : ''}`}>
                    {short ?? <Search className="w-4 h-4" />}
                  </div>
                  {label}
                  <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-brand-500 transition-colors" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
