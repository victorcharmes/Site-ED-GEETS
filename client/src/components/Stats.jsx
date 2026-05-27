import { useEffect, useState } from 'react'
import { ChevronDown, Check, Pencil, X } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const fallbackStats = [
  {
    id: 'doctorants',
    value: '250',
    title: 'Doctorantes & Doctorants',
    detail: "Afficher par exemple le pourcentage d'internationaux.",
    detailType: 'text',
  },
  {
    id: 'docteurs',
    value: 'xx',
    title: 'Docteurs',
    detail: 'A modifier selon vos besoins.',
    detailType: 'text',
  },
  {
    id: 'specialites',
    value: '8',
    title: 'Domaines de spécialités',
    detail: [
      'Micro et Nanosystèmes',
      'Électromagnétisme et systèmes haute fréquence',
      'Photonique et systèmes optoélectroniques',
      "Composants et systèmes de gestion de l'énergie",
      'Génie électrique',
      'Ingénierie des plasmas',
      'Radio-physique et imagerie médicale',
      'Ingénierie pour la santé et pour le vivant',
    ],
    detailType: 'list',
  },
]

function formatDetailValue(stat) {
  if (stat.detailType === 'list' && Array.isArray(stat.detail)) {
    return stat.detail.join('\n')
  }

  return stat.detail ?? ''
}

function normalizeDetail(detailType, value) {
  if (detailType === 'list') {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  }

  return value
}

export default function Stats() {
  const [stats, setStats] = useState(fallbackStats)
  const [activeStat, setActiveStat] = useState(null)
  const [editingStat, setEditingStat] = useState(null)
  const [saving, setSaving] = useState(false)
  const { isAdmin, token } = useAdmin()

  useEffect(() => {
    fetch('/api/stats')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStats(data)
        }
      })
      .catch(() => {})
  }, [])

  const selectedStat = stats.find((stat) => stat.id === activeStat) ?? null
  const editingStatData = stats.find((stat) => stat.id === editingStat) ?? null

  const toggleStat = (statId) => {
    setActiveStat((currentStat) => (currentStat === statId ? null : statId))
  }

  const saveStat = async (event) => {
    event.preventDefault()
    if (!editingStatData) return

    const formData = new FormData(event.currentTarget)
    const value = formData.get('value')?.toString().trim() ?? ''
    const title = formData.get('title')?.toString().trim() ?? ''
    const detail = normalizeDetail(editingStatData.detailType, formData.get('detail')?.toString() ?? '')

    setSaving(true)
    try {
      const response = await fetch(`/api/stats/${editingStatData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value,
          title,
          detail,
          detailType: editingStatData.detailType,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement')
      }

      const updatedStat = await response.json()
      setStats((currentStats) => currentStats.map((stat) => (stat.id === updatedStat.id ? updatedStat : stat)))
      setEditingStat(null)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="relative -mt-20 lg:-mt-22 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl border border-slate-200 p-8">
        <h2 className="sr-only">Indicateurs de performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          {stats.map((stat) => {
            const isActive = stat.id === activeStat

            return (
              <div key={stat.id} className="flex flex-col items-stretch relative">
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setEditingStat(stat.id)}
                    className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm hover:border-brand-300 hover:text-brand-700"
                    title="Modifier l'indicateur"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Modifier
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toggleStat(stat.id)}
                  className={`w-full border px-6 py-8 text-center transition-all duration-300 outline-none hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    isActive
                      ? "border-white bg-brand-50 shadow-sm"
                      : "border-white bg-white hover:border-slate-300"
                  }`}
                  aria-expanded={isActive}
                  aria-controls={`stats-panel-${stat.id}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-5xl font-extrabold text-brand-700 tracking-tight">{stat.value}</p>
                    <p className="font-bold text-slate-700 uppercase tracking-wide leading-snug">{stat.title}</p>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-700 transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {editingStatData && isAdmin ? (
          <form onSubmit={saveStat} className="mt-8 border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8 sm:py-7 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Édition admin</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{editingStatData.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingStat(null)}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
                Fermer
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Valeur
                <input
                  name="value"
                  defaultValue={editingStatData.value}
                  className="border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                Titre
                <input
                  name="title"
                  defaultValue={editingStatData.title}
                  className="border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Détails {editingStatData.detailType === 'list' ? '(une ligne par spécialité)' : ''}
              <textarea
                name="detail"
                defaultValue={formatDetailValue(editingStatData)}
                className="min-h-40 border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </label>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Check className="h-4 w-4" />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={() => setEditingStat(null)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : null}

        <div
          id={selectedStat ? `stats-panel-${selectedStat.id}` : undefined}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            selectedStat ? "mt-8 max-h-128 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {selectedStat ? (
            <div className="border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8 sm:py-7 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Détails</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">{selectedStat.title}</h3>

              {Array.isArray(selectedStat.detail) ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {selectedStat.detail.map((item) => (
                    <div key={item} className="border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mx-auto mt-4 max-w-3xl text-slate-600 leading-relaxed">{selectedStat.detail}</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
