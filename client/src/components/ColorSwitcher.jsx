import { useState, useEffect } from 'react'
import { Palette, X } from 'lucide-react'

const THEMES = [
  { id: 'default',    name: 'Émeraude (Défaut)',  color: '#0f766e' },
  { id: 'palette-1',  name: 'Océan Doux',          color: '#4872c2' },
  { id: 'palette-2',  name: 'Nature',              color: '#6cb250' },
  { id: 'palette-3',  name: 'Crépuscule',          color: '#6079b4' },
  { id: 'palette-4',  name: 'Forêt Douce',         color: '#489b65' },
  { id: 'palette-5',  name: 'Améthyste Douce',     color: '#8248c2' },
  { id: 'palette-6',  name: 'Rose Doux',           color: '#c24861' },
]

function applyTheme(id) {
  if (id === 'default') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', id)
  }
  localStorage.setItem('site-theme', id)
}

export default function ColorSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState('default')

  useEffect(() => {
    const saved = localStorage.getItem('site-theme')
    if (saved && THEMES.some((t) => t.id === saved)) {
      setCurrent(saved)
      applyTheme(saved)
    }
  }, [])

  const setTheme = (id) => {
    setCurrent(id)
    applyTheme(id)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white p-4 shadow-2xl border border-slate-200 w-64">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Palette de couleurs</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-700" aria-label="Fermer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`w-full flex items-center gap-3 p-2 transition-colors border ${
                  current === theme.id ? 'border-brand-500 bg-brand-50' : 'border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="w-6 h-6 shadow-sm border border-slate-200 flex-shrink-0" style={{ backgroundColor: theme.color }} />
                <span className={`text-sm font-medium ${current === theme.id ? 'text-brand-900' : 'text-slate-700'}`}>
                  {theme.name}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Les couleurs sont appliquées globalement sur tout le site.
          </p>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white flex items-center justify-center text-slate-700 shadow-xl border border-slate-200 hover:text-brand-600 hover:border-brand-300 transition-all outline-none focus:ring-4 focus:ring-brand-500/20"
        aria-label="Changer les couleurs du site"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  )
}
