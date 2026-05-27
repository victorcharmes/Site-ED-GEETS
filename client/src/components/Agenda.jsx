import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, MapPin, Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

function parseDate(dateStr) {
  const d = new Date(dateStr)
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: d.toLocaleString('fr-FR', { month: 'short', timeZone: 'UTC' }),
  }
}

function AgendaForm({ initial = {}, onSave, onCancel, token }) {
  const [form, setForm] = useState({
    title: initial.title ?? '',
    date: initial.date ?? new Date().toISOString().slice(0, 10),
    time: initial.time ?? '',
    location: initial.location ?? '',
    type: initial.type ?? 'Événement',
    content: initial.content ?? '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const method = initial.id ? 'PUT' : 'POST'
    const url = initial.id ? `/api/agenda/${initial.id}` : '/api/agenda'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    setLoading(false)
    onSave()
  }

  return (
    <div className="border-2 border-brand-300 bg-brand-50 p-6 flex flex-col gap-3">
      <input
        className="border border-slate-300 px-3 py-2 text-sm w-full"
        placeholder="Titre"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="border border-slate-300 px-3 py-2 text-sm w-full"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        className="border border-slate-300 px-3 py-2 text-sm w-full"
        placeholder="Heure (ex: 14:00)"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
      />
      <input
        className="border border-slate-300 px-3 py-2 text-sm w-full"
        placeholder="Lieu"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        className="border border-slate-300 px-3 py-2 text-sm w-full"
        placeholder="Type (ex: Soutenance, CSI, Journée...)"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />
      <textarea
        className="border border-slate-300 px-3 py-2 text-sm w-full h-20 resize-none"
        placeholder="Description (optionnel)"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !form.title}
          className="flex items-center gap-1 px-4 py-2 bg-brand-700 text-white text-sm font-semibold hover:bg-brand-600 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-4 py-2 border border-slate-300 text-sm font-semibold hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
          Annuler
        </button>
      </div>
    </div>
  )
}

function AgendaCard({ event, isAdmin, token, onRefresh }) {
  const navigate = useNavigate()
  const { day, month } = parseDate(event.date)
  const [editing, setEditing] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Supprimer "${event.title}" ?`)) return
    await fetch(`/api/agenda/${event.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    onRefresh()
  }

  if (editing) {
    return (
      <AgendaForm
        initial={event}
        token={token}
        onSave={() => { setEditing(false); onRefresh() }}
        onCancel={() => setEditing(false)}
      />
    )
  }

  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-linear-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
      <article
        className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 cursor-pointer"
        onClick={() => navigate(`/agenda?openId=${event.id}`)}
      >
        <div className="bg-brand-700 text-white p-5 flex items-center justify-between group-hover:bg-brand-800 transition-colors">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black leading-none">{day}</span>
            <span className="text-sm font-bold uppercase tracking-wider">{month}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2.5 py-1 backdrop-blur-sm">
              {event.type}
            </span>
            {/* Boutons admin */}
            {isAdmin && (
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 bg-white/20 hover:bg-white hover:text-brand-700 text-white transition-colors"
                  title="Modifier"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1.5 bg-white/20 hover:bg-red-500 hover:text-white text-white transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex-1 line-clamp-2">{event.title}</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600 mt-auto pt-4 border-t border-slate-200/60">
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate" title={event.location}>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Agenda() {
  const [events, setEvents] = useState([])
  const [adding, setAdding] = useState(false)
  const { isAdmin, token } = useAdmin()

  const fetchEvents = () => {
    fetch('/api/agenda')
      .then((r) => r.json())
      .then((data) => setEvents(data.slice(0, 3)))
      .catch(() => {})
  }

  useEffect(() => { fetchEvents() }, [])

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">AGENDA</h2>
            <p className="mt-2 text-slate-600">Les dates importantes à retenir pour l'année universitaire.</p>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={() => setAdding(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-700 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            )}
            <Link to="/agenda" className="hidden sm:inline-block text-brand-700 font-bold hover:text-brand-800">
              Voir tout l'agenda &rarr;
            </Link>
          </div>
        </div>

        {adding && (
          <div className="mb-8">
            <AgendaForm
              token={token}
              onSave={() => { setAdding(false); fetchEvents() }}
              onCancel={() => setAdding(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <AgendaCard key={event.id} event={event} isAdmin={isAdmin} token={token} onRefresh={fetchEvents} />
          ))}
        </div>
      </div>
    </section>
  )
}
