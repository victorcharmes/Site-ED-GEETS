import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'

function parseDate(dateStr) {
  const d = new Date(dateStr)
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: d.toLocaleString('fr-FR', { month: 'short', timeZone: 'UTC' }),
  }
}

function AgendaCard({ event }) {
  const { day, month } = parseDate(event.date)
  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
      <article className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
        <div className="bg-brand-700 text-white p-5 flex items-center justify-between group-hover:bg-brand-800 transition-colors">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black leading-none">{day}</span>
            <span className="text-sm font-bold uppercase tracking-wider">{month}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2.5 py-1 backdrop-blur-sm">
            {event.type}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex-1 line-clamp-2">{event.title}</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600 mt-auto pt-4 border-t border-slate-200/60">
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
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

  useEffect(() => {
    fetch('/api/agenda')
      .then((r) => r.json())
      .then((data) => setEvents(data.slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">AGENDA</h2>
            <p className="mt-2 text-slate-600">Les dates importantes à retenir pour l'année universitaire.</p>
          </div>
          <Link to="/agenda" className="hidden sm:inline-block text-brand-700 font-bold hover:text-brand-800">
            Voir tout l'agenda &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <AgendaCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
