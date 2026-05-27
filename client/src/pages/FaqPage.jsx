import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Plus, Edit2, Trash2, X, FolderPlus } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

// ── Modale d'édition d'une catégorie ─────────────────────────────────────────
function CategoryModal({ category, onClose, onSave }) {
  const [title, setTitle] = useState(category?.title ?? '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">
            {category?.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Titre</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="Ex: Questions fréquentes Doctorants"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-300 text-slate-600 font-medium hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-700 text-white font-bold hover:bg-brand-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Modale d'édition d'une question ──────────────────────────────────────────
function QuestionModal({ question, categoryId, onClose, onSave }) {
  const [form, setForm] = useState({
    question: question?.question ?? '',
    answer: question?.answer ?? '',
  })

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.question.trim() || !form.answer.trim()) return
    onSave({ ...form, category_id: categoryId })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">
            {question?.id ? 'Modifier la question' : 'Nouvelle question'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Question</label>
            <input
              type="text"
              required
              value={form.question}
              onChange={set('question')}
              className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="Ex: Comment s'inscrire en thèse ?"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Réponse</label>
            <textarea
              required
              value={form.answer}
              onChange={set('answer')}
              rows={5}
              className="w-full border border-slate-300 p-2.5 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-y"
              placeholder="Saisir la réponse détaillée…"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-300 text-slate-600 font-medium hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-700 text-white font-bold hover:bg-brand-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Item d'une question ───────────────────────────────────────────────────────
function FaqItem({ item, isAdmin, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 bg-white">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-slate-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-expanded={open}
        >
          <span className="font-bold text-slate-900 pr-16">{item.question}</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {isAdmin && (
          <div className="absolute top-1/2 -translate-y-1/2 right-10 flex gap-1 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(item) }}
              className="p-1.5 text-brand-600 hover:text-brand-800 hover:bg-brand-50 transition-colors"
              title="Modifier"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 text-slate-700 leading-relaxed whitespace-pre-line">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

// ── Bloc d'une catégorie ──────────────────────────────────────────────────────
function FaqCategory({
  category,
  isAdmin,
  token,
  onCategoryEdit,
  onCategoryDelete,
  onCategoryUpdated,
}) {
  const [open, setOpen] = useState(true)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [questions, setQuestions] = useState(category.questions)

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const handleAddQuestion = async (form) => {
    const res = await fetch('/api/faq/questions', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(form),
    })
    if (!res.ok) return
    const created = await res.json()
    setQuestions((prev) => [...prev, created])
    setIsAddingQuestion(false)
    onCategoryUpdated()
  }

  const handleEditQuestion = async (form) => {
    const res = await fetch(`/api/faq/questions/${editingQuestion.id}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(form),
    })
    if (!res.ok) return
    const updated = await res.json()
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)))
    setEditingQuestion(null)
    onCategoryUpdated()
  }

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Supprimer cette question ?')) return
    const res = await fetch(`/api/faq/questions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return
    setQuestions((prev) => prev.filter((q) => q.id !== id))
    onCategoryUpdated()
  }

  return (
    <div className="mb-6 border border-slate-200 bg-white shadow-sm">
      {/* En-tête de catégorie */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left bg-brand-50 hover:bg-brand-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-expanded={open}
        >
          <h2 className="text-xl font-bold text-brand-900 pr-24">{category.title}</h2>
          <ChevronDown
            className={`w-6 h-6 text-brand-600 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {isAdmin && (
          <div className="absolute top-1/2 -translate-y-1/2 right-12 flex gap-1 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); onCategoryEdit(category) }}
              className="p-1.5 text-brand-600 hover:text-brand-800 hover:bg-brand-100 transition-colors"
              title="Modifier la catégorie"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onCategoryDelete(category.id) }}
              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              title="Supprimer la catégorie"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Corps */}
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 sm:p-6 space-y-4 bg-white border-t border-brand-100">
          {questions.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              onEdit={setEditingQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
          {questions.length === 0 && (
            <p className="text-slate-400 italic text-sm">Aucune question dans cette catégorie.</p>
          )}
          {isAdmin && (
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-900 font-medium mt-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter une question
            </button>
          )}
        </div>
      </div>

      {/* Modales question */}
      {isAddingQuestion && (
        <QuestionModal
          categoryId={category.id}
          onClose={() => setIsAddingQuestion(false)}
          onSave={handleAddQuestion}
        />
      )}
      {editingQuestion && (
        <QuestionModal
          question={editingQuestion}
          categoryId={category.id}
          onClose={() => setEditingQuestion(null)}
          onSave={handleEditQuestion}
        />
      )}
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function FaqPage() {
  const { isAdmin, token } = useAdmin()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState(null)
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const loadFaq = () => {
    fetch('/api/faq')
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadFaq() }, [])

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const handleAddCategory = async (form) => {
    const res = await fetch('/api/faq/categories', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(form),
    })
    if (!res.ok) return
    const created = await res.json()
    setCategories((prev) => [...prev, created])
    setIsAddingCategory(false)
  }

  const handleEditCategory = async (form) => {
    const res = await fetch(`/api/faq/categories/${editingCategory.id}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(form),
    })
    if (!res.ok) return
    const updated = await res.json()
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
    )
    setEditingCategory(null)
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Supprimer cette catégorie et toutes ses questions ?')) return
    const res = await fetch(`/api/faq/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return
    setCategories((prev) => prev.filter((c) => c.id !== id))
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
              <li className="text-white" aria-current="page">FAQ</li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Foire Aux Questions
              </h1>
              <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
                Retrouvez les réponses aux questions les plus fréquentes concernant le déroulement de
                votre thèse à l'ED GEETS.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 shrink-0 transition-colors shadow-lg"
              >
                <FolderPlus className="w-5 h-5" />
                Nouvelle catégorie
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20 text-slate-400 italic">Chargement…</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 text-slate-400 italic">
            Aucune catégorie de FAQ.{isAdmin && ' Ajoutez-en une via le bouton ci-dessus.'}
          </div>
        ) : (
          categories.map((cat) => (
            <FaqCategory
              key={cat.id}
              category={cat}
              isAdmin={isAdmin}
              token={token}
              onCategoryEdit={setEditingCategory}
              onCategoryDelete={handleDeleteCategory}
              onCategoryUpdated={loadFaq}
            />
          ))
        )}

        {/* Contact */}
        <div className="mt-12 bg-white border border-slate-200 border-l-4 border-l-brand-600 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-slate-900 font-bold mb-1">Vous n'avez pas trouvé votre réponse ?</h4>
            <p className="text-slate-600 text-sm">
              N'hésitez pas à nous contacter directement pour une assistance personnalisée.
            </p>
          </div>
          <a
            href="mailto:geets@laas.fr"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-700 text-white font-bold hover:bg-brand-600 transition-colors shrink-0"
          >
            Nous contacter
          </a>
        </div>
      </div>

      {/* Modales catégorie */}
      {isAddingCategory && (
        <CategoryModal onClose={() => setIsAddingCategory(false)} onSave={handleAddCategory} />
      )}
      {editingCategory && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleEditCategory}
        />
      )}
    </div>
  )
}
