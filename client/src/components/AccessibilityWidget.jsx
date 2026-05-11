import { useState, useEffect } from 'react'
import { Eye, ZoomIn, ZoomOut, Contrast } from 'lucide-react'

const ZOOM_STEPS = [80, 90, 100, 110, 120, 130, 140]
const DEFAULT_ZOOM = 100

function applyZoom(zoom) {
  document.documentElement.style.fontSize = `${zoom}%`
}

export default function AccessibilityWidget() {
  const [zoomIndex, setZoomIndex] = useState(ZOOM_STEPS.indexOf(DEFAULT_ZOOM))
  const [contrastMode, setContrastMode] = useState(false)

  useEffect(() => {
    const savedZoom = parseInt(localStorage.getItem('a11y-zoom') ?? DEFAULT_ZOOM)
    const idx = ZOOM_STEPS.indexOf(savedZoom)
    if (idx !== -1) { setZoomIndex(idx); applyZoom(savedZoom) }

    const savedContrast = localStorage.getItem('a11y-contrast') === 'true'
    if (savedContrast) { setContrastMode(true); document.documentElement.classList.add('daltonien-mode') }
  }, [])

  const zoomIn = () => {
    const next = Math.min(zoomIndex + 1, ZOOM_STEPS.length - 1)
    setZoomIndex(next)
    applyZoom(ZOOM_STEPS[next])
    localStorage.setItem('a11y-zoom', ZOOM_STEPS[next])
  }

  const zoomOut = () => {
    const prev = Math.max(zoomIndex - 1, 0)
    setZoomIndex(prev)
    applyZoom(ZOOM_STEPS[prev])
    localStorage.setItem('a11y-zoom', ZOOM_STEPS[prev])
  }

  const toggleContrast = () => {
    const next = !contrastMode
    setContrastMode(next)
    document.documentElement.classList.toggle('daltonien-mode', next)
    localStorage.setItem('a11y-contrast', String(next))
  }

  const buttons = [
    { icon: ZoomIn,   label: "Augmenter le texte",          action: zoomIn,         disabled: zoomIndex >= ZOOM_STEPS.length - 1 },
    { icon: ZoomOut,  label: "Réduire le texte",             action: zoomOut,        disabled: zoomIndex <= 0 },
    null,
    {
      icon: Contrast,
      label: contrastMode ? "Désactiver le mode contraste" : "Contraste & Daltonisme",
      action: toggleContrast,
      active: contrastMode,
    },
  ]

  return (
    <div className="fixed bottom-4 left-4 z-50 group pointer-events-none">
      {/* Menu — visible au survol */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 origin-bottom">
        <div className="flex flex-col items-center gap-2 bg-white/95 backdrop-blur-md p-2 shadow-xl border border-slate-200 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {buttons.map((btn, i) =>
            btn === null ? (
              <div key={i} className="w-6 h-px bg-slate-200" />
            ) : (
              <div key={btn.label} className="relative group/btn flex items-center">
                <button
                  onClick={btn.action}
                  disabled={btn.disabled}
                  className={`w-10 h-10 flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-sm border ${
                    btn.active
                      ? 'bg-brand-100 text-brand-800 border-brand-300'
                      : 'bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700 border-slate-100 disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                  aria-label={btn.label}
                >
                  <btn.icon className="w-5 h-5" />
                </button>
                <span className="absolute left-14 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                  {btn.label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Bouton principal */}
      <button
        className="bg-brand-700 border border-brand-600 shadow-xl p-3.5 text-white hover:bg-brand-800 transition-all outline-none focus-visible:ring-4 focus-visible:ring-brand-500 relative z-10 pointer-events-auto"
        aria-label="Menu d'accessibilité"
      >
        <Eye className="w-6 h-6" />
      </button>
    </div>
  )
}
