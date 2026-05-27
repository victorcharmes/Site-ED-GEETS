import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Calendar, Plus, Edit2, Trash2, X, MapPin, Clock } from 'lucide-react'
import { useAdmin } from '../context/AdminContext.jsx'
import SimpleEditor from '../components/SimpleEditor.jsx'

function parseDate(isoDate) {
  const d = new Date(isoDate)
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: d.toLocaleString('fr-FR', { month: 'short', timeZone: 'UTC' }),
    full: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
  }
}

function EventModal({ event, onClose }) {
  const { full } = parseDate(event.date)
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-30 bg-white/80 backdrop-blur p-1 text-slate-600 hover:text-slate-900 border border-slate-300">
          <X className="w-6 h-6" />
        </button>
        <div className="bg-brand-50 p-8 md:p-12 text-center border-b border-brand-100">
          <div className="w-20 h-20 bg-white flex items-center justify-center mx-auto mb-6 text-brand-600 shadow-sm border border-brand-100 rounded-full">
            <Calendar className="w-10 h-10" />
          </div>
          <span className="inline-block bg-white text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1 border border-brand-100 mb-4">
            {event.type}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight max-w-2xl mx-auto">
            {event.title}
          </h2>
        </div>
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-6 mb-8 justify-center bg-slate-50 p-6 border border-slate-200">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</span>
              <span className="text-sm font-semibold text-slate-800">{full}</span>
            </div>
            {event.time && (
              <>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Heure</span>
                  <span className="text-sm font-semibold text-slate-800">{event.time}</span>
                </div>
              </>
            )}
            {event.location && (
              <>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lieu</span>
                  <span className="text-sm font-semibold text-slate-800 text-center">{event.location}</span>
                </div>
              </>
            )}
          </div>
          <div
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        </div>
      </div>
    </div>
  )
}

function EditModal({ event, onClose, onSave }) {
  const [form, setForm] = useState({
    title: event?.title ?? '',
    date: event?.date ?? new Date().toISOString().slice(0, 10),
    time: event?.time ?? '',
    location: event?.location ?? '',
    type: event?.type ?? 'Événement',
    content: event?.content ?? '',
  })

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.date) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-10 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {event?.id ? "Modifier l'événement" : 'Nouvel événement'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Titre</label>
            <input
              type="text" required value={form.title} onChange={set('title')}
              className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="Ex: Soutenance de thèse…"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
              <input
                type="date" required value={form.date} onChange={set('date')}
                className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Heure</label>
              <input
                type="text" value={form.time} onChange={set('time')}
                className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                placeholder="Ex: 14:00"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Lieu</label>
              <input
                type="text" value={form.location} onChange={set('location')}
                className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                placeholder="Ex: Amphithéâtre Shannon"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
              <input
                type="text" value={form.type} onChange={set('type')}
                className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                placeholder="Ex: Soutenance, CSI, Rentrée…"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <SimpleEditor
              value={form.content}
              onChange={(val) => setForm((f) => ({ ...f, content: val }))}
              className="h-48 mb-12"
            />
          </div>
          <div className="flex justify-end gap-4 mt-2 border-t pt-4 border-slate-100">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-slate-300 text-slate-600 font-medium hover:bg-slate-50">
              Annuler
            </button>
            <button type="submit" className="px-6 py-2 bg-brand-700 text-white font-bold hover:bg-brand-600">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AgendaPage() {
  const { isAdmin } = useAdmin()
  const [searchParams, setSearchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [editTarget, setEditTarget] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    fetch('/api/agenda')
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => {})
  }, [])

  // Ouvre automatiquement l'événement si l'URL contient openId
  useEffect(() => {
    const openId = searchParams.get('openId')
    if (openId && events.length > 0) {
      const target = events.find((e) => String(e.id) === openId)
      if (target) {
        setSelectedEvent(target)
        const next = new URLSearchParams(searchParams)
        next.delete('openId')
        setSearchParams(next, { replace: true })
      }
    }
  }, [searchParams, events, setSearchParams])

  const handleCreate = async (form) => {
    const res = await fetch('/api/agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const created = await res.json()
    setEvents((prev) => [...prev, created].sort((a, b) => a.date.localeCompare(b.date)))
    setIsCreating(false)
  }

  const handleEdit = async (form) => {
    const res = await fetch(`/api/agenda/${editTarget.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const updated = await res.json()
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
    setEditTarget(null)
  }

  const handleDelete = async (id) => {
    await fetch(`/api/agenda/${id}`, { method: 'DELETE' })
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Bandeau */}
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Agenda</li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Agenda</h1>
              <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
                Découvrez les événements à venir, les soutenances et les dates importantes de l'ED GEETS.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 shrink-0 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Ajouter un événement
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {events.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 italic">Aucun événement à venir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((item) => {
              const { day, month } = parseDate(item.date)
              return (
                <div
                  key={item.id}
                  className="relative group h-full cursor-pointer"
                  onClick={() => setSelectedEvent(item)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
                  <article className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                    {isAdmin && (
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur shadow-sm px-2 py-1 flex gap-2 z-30 border border-slate-200">
                        <button onClick={(e) => { e.stopPropagation(); setEditTarget(item) }} className="text-brand-600 hover:text-brand-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="bg-brand-700 text-white p-5 flex items-center justify-between group-hover:bg-brand-800 transition-colors">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black leading-none">{day}</span>
                        <span className="text-sm font-bold uppercase tracking-wider">{month}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2.5 py-1 backdrop-blur-sm">
                        {item.type}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex-1 line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex flex-col gap-3 text-sm text-slate-600 mt-auto pt-4 border-t border-slate-200/60">
                        {item.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="truncate" title={item.location}>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {isCreating && <EditModal onClose={() => setIsCreating(false)} onSave={handleCreate} />}
      {editTarget && <EditModal event={editTarget} onClose={() => setEditTarget(null)} onSave={handleEdit} />}
      {selectedEvent && !isCreating && !editTarget && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}
