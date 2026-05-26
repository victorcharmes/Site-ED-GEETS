import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText, Download, X, Eye, File as FileIcon,
  Pencil, Trash2, Plus, Check, ExternalLink, AlertCircle, Upload, Link as LinkIcon,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

// ── Catégories suggérées ────────────────────────────────────────────────────
const CATEGORIES = ['Réglementation', 'Soutenance', 'Suivi', 'Inscription', 'Formation', 'Général']

// ── Données de secours ──────────────────────────────────────────────────────
const fallbackResources = [
  { id: 1, title: "Charte des thèses de l'Université de Toulouse", category: 'Réglementation', type: 'pdf', date: 'Mars 2023', size: '1.2 MB', url: '', content: "Charte encadrant les droits et devoirs des doctorants et de leurs directeurs de thèse." },
  { id: 2, title: 'Guide de la soutenance de thèse', category: 'Soutenance', type: 'texte', date: 'Janvier 2024', size: '15 KB', url: '', content: "Procédure de soutenance :\n1. Désignation des rapporteurs (2 mois avant).\n2. Dépôt du manuscrit en ligne.\n3. Retour des pré-rapports (14 jours avant).\n4. Jour de la soutenance.\n5. Dépôt définitif avec corrections." },
  { id: 3, title: "Formulaire d'enregistrement du CSI", category: 'Suivi', type: 'pdf', date: 'Février 2024', size: '450 KB', url: '', content: "Formulaire type pour le rapport du Comité de Suivi Individuel." },
  { id: 4, title: "Procédure d'inscription en 1ère année", category: 'Inscription', type: 'texte', date: 'Septembre 2023', size: '12 KB', url: '', content: "Pour vous inscrire en 1ère année de doctorat :\n- Avoir validé un diplôme de master.\n- Avoir l'accord d'un directeur de thèse.\n- Bénéficier d'un financement pour au moins 3 ans.\n- Créer votre dossier sur ADUM." },
  { id: 5, title: 'Liste des formations transversales éligibles', category: 'Formation', type: 'pdf', date: 'Novembre 2023', size: '2.1 MB', url: '', content: "Catalogue complet des formations transversales (100h minimum dont éthique obligatoire)." },
  { id: 6, title: 'Vade-Mecum du doctorant GEETS', category: 'Général', type: 'texte', date: 'Octobre 2023', size: '18 KB', url: '', content: "Guide pratique : accès aux locaux, informatique, congés, missions, publications et affiliation." },
]

// ── Icône selon le type ─────────────────────────────────────────────────────
function ResourceIcon({ type, size = 'md' }) {
  const cls = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
  const wrapCls = size === 'lg'
    ? `p-4 border ${type === 'pdf' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-700'}`
    : `p-3 border ${type === 'pdf' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-700'}`
  return (
    <div className={wrapCls}>
      {type === 'pdf' ? <FileIcon className={cls} /> : <FileText className={cls} />}
    </div>
  )
}

// ── Modal de visualisation ──────────────────────────────────────────────────
function ResourceModal({ resource, onClose }) {
  const [pdfError, setPdfError] = useState(false)
  const hasPdfUrl = resource.type === 'pdf' && resource.url

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">

        {/* En-tête */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4 pr-4 min-w-0">
            <div className="hidden sm:block shrink-0">
              <ResourceIcon type={resource.type} />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-slate-900 leading-tight truncate">{resource.title}</h3>
              <div className="text-sm text-slate-500 mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="font-medium text-slate-700">{resource.category}</span>
                <span className="text-slate-300">•</span>
                <span>Document {resource.type.toUpperCase()}</span>
                {resource.size && <><span className="text-slate-300">•</span><span>{resource.size}</span></>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
                title="Ouvrir dans un nouvel onglet"
              >
                <ExternalLink className="w-4 h-4" />
                Ouvrir
              </a>
            )}
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Corps */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {hasPdfUrl && !pdfError ? (
            // ── Viewer PDF ────────────────────────────────────────────────
            <div className="flex-1 flex flex-col min-h-0">
              <iframe
                src={resource.url}
                title={resource.title}
                className="w-full flex-1 border-0"
                style={{ minHeight: '65vh' }}
                onError={() => setPdfError(true)}
              />
              <div className="shrink-0 border-t border-slate-100 p-3 flex items-center justify-between bg-white text-sm text-slate-500">
                <span>Document édité par l'École Doctorale GEETS — {resource.date}</span>
                <a
                  href={resource.url}
                  download
                  className="flex items-center gap-1.5 text-brand-700 font-medium hover:text-brand-600"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </a>
              </div>
            </div>
          ) : resource.type === 'pdf' ? (
            // ── PDF sans URL (ou erreur) ───────────────────────────────────
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
              <div className="bg-white border border-slate-200 shadow-sm flex flex-col">
                <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-64">
                  <FileIcon className="w-20 h-20 text-red-100 mb-6" />
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {pdfError ? "Impossible d'afficher le PDF" : 'Aucun fichier lié'}
                  </h4>
                  <p className="text-slate-500 max-w-md mx-auto mb-8 text-base leading-relaxed">
                    {pdfError
                      ? "Le document ne peut pas être affiché directement. Cliquez sur le bouton ci-dessous pour le télécharger ou l'ouvrir dans un nouvel onglet."
                      : resource.content}
                  </p>
                  {resource.url ? (
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-brand-700 text-white font-bold hover:bg-brand-600 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Ouvrir dans un onglet
                      </a>
                      <a
                        href={resource.url}
                        download
                        className="flex items-center gap-2 px-6 py-3 border-2 border-brand-700 text-brand-700 font-bold hover:bg-brand-50 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger
                      </a>
                    </div>
                  ) : null}
                </div>
                <div className="border-t border-slate-100 p-4 text-center text-sm text-slate-400 bg-white">
                  Document édité par l'École Doctorale GEETS — {resource.date}
                </div>
              </div>
            </div>
          ) : (
            // ── Contenu texte ──────────────────────────────────────────────
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
              <div className="bg-white border border-slate-200 shadow-sm flex flex-col">
                <div className="p-8 sm:p-12 prose prose-slate max-w-none grow">
                  <div className="whitespace-pre-line text-lg text-slate-700 leading-relaxed">
                    {resource.content}
                  </div>
                </div>
                <div className="border-t border-slate-100 p-4 text-center text-sm text-slate-400 bg-white">
                  Document édité par l'École Doctorale GEETS — {resource.date}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Formulaire d'ajout / modification (modal) ───────────────────────────────
function ResourceFormModal({ resource, onClose, onSave, saving, token }) {
  const isNew = !resource?.id
  const formRef = useRef(null)
  const fileInputRef = useRef(null)
  const [type, setType] = useState(resource?.type ?? 'pdf')
  // 'upload' = déposer un fichier, 'url' = lien externe
  const [fileMode, setFileMode] = useState(
    resource?.url?.startsWith('/uploads/') ? 'upload' : 'url'
  )
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Nom du fichier déjà en ligne (ressource existante uploadée)
  const existingFilename = resource?.url?.startsWith('/uploads/')
    ? decodeURIComponent(resource.url.split('-').slice(1).join('-'))
    : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploadError('')
    const fd = new FormData(e.currentTarget)

    let url = resource?.url ?? ''
    let size = fd.get('size')?.toString().trim() ?? ''

    // ── Upload du fichier si nécessaire ──────────────────────────────────
    if (type === 'pdf' && fileMode === 'upload' && selectedFile) {
      setUploading(true)
      try {
        const uploadFd = new FormData()
        uploadFd.append('file', selectedFile)
        const res = await fetch('/api/resources/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadFd,
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error ?? 'Échec de l\'upload')
        }
        const data = await res.json()
        url = data.url
        if (!size) size = data.size
      } catch (err) {
        setUploadError(err.message)
        setUploading(false)
        return
      }
      setUploading(false)
    } else if (type === 'pdf' && fileMode === 'url') {
      url = fd.get('url')?.toString().trim() ?? ''
    } else if (type === 'texte') {
      url = ''
    }

    onSave({
      id: resource?.id,
      title: fd.get('title')?.toString().trim() ?? '',
      category: fd.get('category')?.toString().trim() ?? 'Général',
      type,
      date: fd.get('date')?.toString().trim() ?? '',
      size,
      url,
      content: fd.get('content')?.toString().trim() ?? '',
    })
  }

  const isWorking = uploading || saving

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">

        {/* En-tête */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0 bg-slate-50">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Édition admin</p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              {isNew ? 'Ajouter un document' : 'Modifier le document'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">

          {/* Titre */}
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            Titre <span className="text-red-500">*</span>
            <input
              name="title"
              defaultValue={resource?.title ?? ''}
              required
              className="border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
              placeholder="Ex : Charte des thèses…"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            {/* Catégorie */}
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
              Catégorie
              <input
                name="category"
                defaultValue={resource?.category ?? 'Général'}
                list="categories-list"
                className="border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
              />
              <datalist id="categories-list">
                {CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </label>

            {/* Type */}
            <fieldset className="flex flex-col gap-1.5">
              <legend className="text-sm font-semibold text-slate-700">Type</legend>
              <div className="flex gap-4 mt-1">
                {['pdf', 'texte'].map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer font-normal text-sm text-slate-700">
                    <input
                      type="radio" name="type" value={t}
                      defaultChecked={(resource?.type ?? 'pdf') === t}
                      onChange={() => setType(t)}
                      className="accent-brand-700"
                    />
                    {t.toUpperCase()}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
              Date
              <input
                name="date"
                defaultValue={resource?.date ?? ''}
                className="border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
                placeholder="Ex : Mars 2024"
              />
            </label>

            {/* Taille (auto si upload, sinon manuelle) */}
            {!(type === 'pdf' && fileMode === 'upload' && selectedFile) && (
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                Taille
                <input
                  name="size"
                  defaultValue={resource?.size ?? ''}
                  className="border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
                  placeholder="Ex : 1.2 MB"
                />
              </label>
            )}
          </div>

          {/* Section fichier PDF */}
          {type === 'pdf' && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">Fichier PDF</p>

              {/* Sélecteur de mode */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFileMode('upload')}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border transition-colors ${
                    fileMode === 'upload'
                      ? 'bg-brand-700 text-white border-brand-700'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-700'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Depuis ma machine
                </button>
                <button
                  type="button"
                  onClick={() => setFileMode('url')}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border transition-colors ${
                    fileMode === 'url'
                      ? 'bg-brand-700 text-white border-brand-700'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-700'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  URL externe
                </button>
              </div>

              {fileMode === 'upload' ? (
                <div>
                  {/* Zone de dépôt */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-300 hover:border-brand-400 bg-slate-50 hover:bg-brand-50 p-6 flex flex-col items-center gap-2 transition-colors group"
                  >
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-brand-600 transition-colors" />
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-brand-700">
                      {selectedFile ? selectedFile.name : 'Cliquer pour choisir un PDF'}
                    </span>
                    {!selectedFile && (
                      <span className="text-xs text-slate-400">PDF uniquement · 20 Mo max</span>
                    )}
                    {selectedFile && (
                      <span className="text-xs text-brand-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} Mo — cliquer pour changer
                      </span>
                    )}
                  </button>

                  {/* Fichier actuel (si édition) */}
                  {!selectedFile && existingFilename && (
                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                      <FileIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      Fichier actuel : <span className="font-medium text-slate-700">{existingFilename}</span>
                      <span className="text-slate-400">(non modifié)</span>
                    </p>
                  )}

                  {/* Erreur upload */}
                  {uploadError && (
                    <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {uploadError}
                    </p>
                  )}
                </div>
              ) : (
                <label className="flex flex-col gap-1.5 text-sm font-normal text-slate-700">
                  <input
                    name="url"
                    type="url"
                    defaultValue={resource?.url?.startsWith('/uploads/') ? '' : (resource?.url ?? '')}
                    className="border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    placeholder="https://…/document.pdf"
                  />
                  <span className="text-xs text-slate-500">
                    URL pointant directement vers le fichier .pdf
                  </span>
                </label>
              )}
            </div>
          )}

          {/* Contenu / description */}
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            {type === 'pdf' ? 'Description (affichée si aucun fichier)' : 'Contenu du document'}
            <textarea
              name="content"
              defaultValue={resource?.content ?? ''}
              className="min-h-32 border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal resize-y"
              placeholder={type === 'pdf' ? 'Décrivez brièvement le document…' : 'Contenu complet du document…'}
            />
          </label>
        </form>

        {/* Pied */}
        <div className="shrink-0 border-t border-slate-100 p-5 flex items-center gap-3 bg-slate-50">
          <button
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            disabled={isWorking}
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? <Upload className="h-4 w-4 animate-bounce" /> : <Check className="h-4 w-4" />}
            {uploading ? 'Envoi du fichier…' : saving ? 'Enregistrement…' : isNew ? 'Ajouter' : 'Enregistrer'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isWorking}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page principale ─────────────────────────────────────────────────────────
export default function PhdResourcesPage() {
  const [resources, setResources] = useState(fallbackResources)
  const [selected, setSelected] = useState(null)   // visualisation
  const [formResource, setFormResource] = useState(null) // null = fermé
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const { isAdmin, token } = useAdmin()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    fetch('/api/resources')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setResources(data) })
      .catch(() => {})
  }, [])

  // ── Sauvegarde (create ou update) ──────────────────────────────────────
  const handleSave = async (data) => {
    setSaving(true)
    try {
      const isNew = !data.id
      const res = await fetch(isNew ? '/api/resources' : `/api/resources/${data.id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Erreur lors de l\'enregistrement')
      const saved = await res.json()
      setResources((prev) =>
        isNew ? [...prev, saved] : prev.map((r) => (r.id === saved.id ? saved : r))
      )
      setFormResource(null)
    } finally {
      setSaving(false)
    }
  }

  // ── Suppression ─────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce document définitivement ?')) return
    setDeletingId(id)
    try {
      await fetch(`/api/resources/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setResources((prev) => prev.filter((r) => r.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">

      {/* En-tête */}
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Ressources Doctorants</li>
            </ol>
          </nav>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Ressources Doctorants
              </h1>
              <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
                Consultez l'ensemble des fiches, documents et formulaires nécessaires au déroulement de votre projet de thèse.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setFormResource({})}
                className="shrink-0 flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Ajouter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {resources.length === 0 ? (
          <p className="text-center text-slate-500 py-20">Aucun document disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <div key={r.id} className="relative group h-full">
                <div className="absolute inset-0 bg-linear-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <article className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm p-6 overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">

                  {/* Boutons admin */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => setFormResource(r)}
                        className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-700 shadow-sm"
                        title="Modifier"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deletingId === r.id}
                        className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600 shadow-sm disabled:opacity-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <ResourceIcon type={r.type} />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1">
                      {r.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 grow group-hover:text-brand-700 transition-colors leading-snug">
                    {r.title}
                  </h3>

                  <div className="text-sm text-slate-500 mb-6 flex items-center justify-between">
                    <span>{r.date}</span>
                    <span className="bg-slate-50 px-2 py-0.5 border border-slate-100">
                      {r.type.toUpperCase()}{r.size ? ` • ${r.size}` : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      onClick={() => setSelected(r)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <Eye className="w-4 h-4" />
                      Visualiser
                    </button>
                    {r.type === 'pdf' && r.url && (
                      <a
                        href={r.url}
                        download
                        className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de visualisation */}
      {selected && (
        <ResourceModal resource={selected} onClose={() => setSelected(null)} />
      )}

      {/* Modal de formulaire admin */}
      {formResource !== null && (
        <ResourceFormModal
          resource={Object.keys(formResource).length === 0 ? null : formResource}
          onClose={() => setFormResource(null)}
          onSave={handleSave}
          saving={saving}
          token={token}
        />
      )}
    </div>
  )
}
