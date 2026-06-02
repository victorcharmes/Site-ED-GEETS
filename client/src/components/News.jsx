import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, Pencil, Trash2, Plus, X, Check, FileText } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

function NewsForm({ initial = {}, onSave, onCancel, token }) {
  const [form, setForm] = useState({
    title: initial.title ?? '',
    date: initial.date ?? new Date().toISOString().slice(0, 10),
    category: initial.category ?? 'Actualité',
    content: initial.content ?? '',
    image: initial.image ?? '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const method = initial.id ? 'PUT' : 'POST'
    const url = initial.id ? `/api/news/${initial.id}` : '/api/news'
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
        placeholder="Catégorie"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        className="border border-slate-300 px-3 py-2 text-sm w-full"
        placeholder="URL image (optionnel)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <textarea
        className="border border-slate-300 px-3 py-2 text-sm w-full h-24 resize-none"
        placeholder="Contenu"
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

function NewsCard({ item, isAdmin, token, onRefresh }) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Supprimer "${item.title}" ?`)) return
    await fetch(`/api/news/${item.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    onRefresh()
  }

  if (editing) {
    return (
      <NewsForm
        initial={item}
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
        onClick={() => navigate(`/actualites?openId=${item.id}`)}
      >
        <div className="h-48 bg-slate-200 relative overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-700">
              <FileText className="w-16 h-16" />
            </div>
          )}
          {/* Boutons admin */}
          {isAdmin && (
            <div className="absolute top-2 right-2 flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 bg-white/90 hover:bg-brand-700 hover:text-white text-slate-700 shadow transition-colors"
                title="Modifier"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 bg-white/90 hover:bg-red-600 hover:text-white text-slate-700 shadow transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">{item.category}</span>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
          <p className="text-sm text-slate-600 flex-1 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </article>
    </div>
  )
}

export default function News() {
  const [news, setNews] = useState([])
  const [adding, setAdding] = useState(false)
  const { isAdmin, token } = useAdmin()

  const fetchNews = () => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => setNews(data.slice(0, 3)))
      .catch(() => {})
  }

  useEffect(() => { fetchNews() }, [])

  return (
    <section className="pt-24 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">DERNIÈRES ACTUALITÉS</h2>
            <p className="mt-2 text-slate-600">La vie scientifique et administrative de l'école doctorale.</p>
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
            <Link to="/actualites" className="hidden sm:inline-block text-brand-700 font-bold hover:text-brand-800">
              Toutes les actualités &rarr;
            </Link>
          </div>
        </div>

        {adding && (
          <div className="mb-8">
            <NewsForm
              token={token}
              onSave={() => { setAdding(false); fetchNews() }}
              onCancel={() => setAdding(false)}
            />
          </div>
        )}

        {news.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Aucune actualité pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} isAdmin={isAdmin} token={token} onRefresh={fetchNews} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
