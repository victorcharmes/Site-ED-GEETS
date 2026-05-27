import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Clock, Plus, Edit2, Trash2, X, FileText } from 'lucide-react'
import { useAdmin } from '../context/AdminContext.jsx'
import SimpleEditor from '../components/SimpleEditor.jsx'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

function NewsModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-white/80 backdrop-blur p-1 text-slate-600 hover:text-slate-900 border border-slate-300"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="aspect-[21/9] bg-slate-200 overflow-hidden">
          <img src={item.image || DEFAULT_IMAGE} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1 border border-brand-100">
              {item.category}
            </span>
            <div className="flex items-center text-sm text-slate-500 font-medium">
              <Clock className="w-4 h-4 mr-1.5" />
              {formatDate(item.date)}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">{item.title}</h2>
          <div
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </div>
  )
}

function EditModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    title: item?.title ?? '',
    category: item?.category ?? 'Général',
    image: item?.image ?? '',
    date: item?.date ?? new Date().toISOString().slice(0, 10),
    content: item?.content ?? '',
  })

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.content) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {item?.id ? "Modifier l'actualité" : 'Nouvelle actualité'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Titre</label>
            <input
              type="text" required value={form.title} onChange={set('title')}
              className="w-full border border-slate-300 p-3 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="Titre de l'actualité"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
              <input
                type="text" value={form.category} onChange={set('category')}
                className="w-full border border-slate-300 p-3 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                placeholder="Événement, Scolarité…"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
              <input
                type="date" required value={form.date} onChange={set('date')}
                className="w-full border border-slate-300 p-3 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">URL image (optionnel)</label>
            <input
              type="text" value={form.image} onChange={set('image')}
              className="w-full border border-slate-300 p-3 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="https://…"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contenu</label>
            <SimpleEditor
              value={form.content}
              onChange={(val) => setForm((f) => ({ ...f, content: val }))}
              className="h-64 mb-12"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
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

export default function NewsPage() {
  const { isAdmin } = useAdmin()
  const [searchParams, setSearchParams] = useSearchParams()
  const [news, setNews] = useState([])
  const [editTarget, setEditTarget] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then(setNews)
      .catch(() => {})
  }, [])

  // Ouvre automatiquement l'actualité si l'URL contient openId
  useEffect(() => {
    const openId = searchParams.get('openId')
    if (openId && news.length > 0) {
      const target = news.find((n) => String(n.id) === openId)
      if (target) {
        setSelectedNews(target)
        const next = new URLSearchParams(searchParams)
        next.delete('openId')
        setSearchParams(next, { replace: true })
      }
    }
  }, [searchParams, news, setSearchParams])

  const handleCreate = async (form) => {
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const created = await res.json()
    setNews((prev) => [created, ...prev])
    setIsCreating(false)
  }

  const handleEdit = async (form) => {
    const res = await fetch(`/api/news/${editTarget.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const updated = await res.json()
    setNews((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
    setEditTarget(null)
  }

  const handleDelete = async (id) => {
    await fetch(`/api/news/${id}`, { method: 'DELETE' })
    setNews((prev) => prev.filter((n) => n.id !== id))
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
              <li className="text-white" aria-current="page">Actualités</li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Actualités</h1>
              <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
                Suivez toutes les dernières informations concernant la vie de l'École Doctorale.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 shrink-0 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Ajouter une actualité
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {news.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 italic">Aucune actualité pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="relative group h-full cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <article className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                  {isAdmin && (
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur shadow-sm px-2 py-1 flex gap-2 z-30 border border-slate-200">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditTarget(item) }}
                        className="text-brand-600 hover:text-brand-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="h-48 bg-slate-200 overflow-hidden">
                    <img
                      src={item.image || DEFAULT_IMAGE}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">{item.category}</span>
                    <div className="flex items-center text-sm text-slate-500 mb-3 font-medium">
                      <Clock className="w-4 h-4 mr-2 text-brand-500" />
                      {formatDate(item.date)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                      {item.title}
                    </h3>
                    <div
                      className="text-sm text-slate-600 flex-1 line-clamp-3 prose prose-slate prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {isCreating && <EditModal onClose={() => setIsCreating(false)} onSave={handleCreate} />}
      {editTarget && <EditModal item={editTarget} onClose={() => setEditTarget(null)} onSave={handleEdit} />}
      {selectedNews && !isCreating && !editTarget && (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  )
}
