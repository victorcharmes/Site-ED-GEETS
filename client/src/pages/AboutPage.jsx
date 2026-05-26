import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Target, BookOpen, Pencil, X, Check } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

// Icônes associées aux chiffres clés (dans l'ordre)
const CHIFFRES_ICONS = [Users, BookOpen, Target]

// Données de secours si l'API est indisponible
const fallbackBlocks = [
  {
    block_key: 'presentation',
    title: "Présentation de l'École Doctorale GEETS",
    content_type: 'paragraphs',
    content: [
      "L'École Doctorale GEETS est l'une des quinze composantes de l'École des Docteurs de Toulouse et forme des docteurs issus de diverses filières (Ingénieurs, Masters Nationaux et Internationaux) au sein de Laboratoires de réputation internationale et adossées aux pôles de compétitivité AESE et CBS.",
      "Les doctorants sont formés par la recherche sur 7 spécialités touchant principalement aux Départements Scientifiques Sciences pour l'Ingénieur (SPI) et Sciences et Technologies de l'Information et de la Communication (STIC) et plus en marge au département Sciences du Vivant et de la Santé.",
      "Toutes les thèses sont financées soit par des contrats doctoraux universitaires issus de nos établissements de tutelle, soit par des conventions CIFRES, des contrats DGA, ou encore de contrats de recherches. Des cotutelles avec des Universités étrangères représentent environ 10% des thèses.",
      "De nombreux programmes internationaux développés par l'École des Docteurs de Toulouse enrichissent notre ouverture, par exemple le programme CSC (China Scholarship Council).",
    ],
  },
  {
    block_key: 'industrie',
    title: "De l'École Doctorale GEETS à l'Industrie",
    content_type: 'paragraphs',
    content: [
      "Nos docteurs sont en majorité (55% environ) voués à des carrières en R&D dans des entreprises allant des PMI aux grands groupes, en France et à l'International : AIRBUS et ses sous-traitants, SAFRAN, LIEBHERR, ACTIA, LEROY SOMER, THALES, FREESCALE, CONTINENTAL.",
      "La forte dynamique de l'École Doctorale GEETS a également permis la création par ces docteurs de plusieurs Start Up. De nombreuses Start Up sont nées grâce à nos docteurs et aux laboratoires.",
    ],
  },
  {
    block_key: 'expertises',
    title: "Domaines d'expertise",
    content_type: 'list',
    content: [
      "Génie Électrique et Gestion de l'Énergie : du Composant au Système",
      "Ingénierie des Plasmas",
      "Haute Fréquence et Optique : de l'Électromagnétisme au Système",
      "Nano Ingénierie et Intégration, Monitoring",
      "Micro et Nano Bio Technologies",
      "Radio Physique et Imagerie Médicale",
      "Ingénierie pour la santé et pour le vivant",
    ],
  },
  {
    block_key: 'chiffres',
    title: "Chiffres clés",
    content_type: 'keyvalue',
    content: [
      { value: '250 à 300', label: "doctorant(e)s dont environ 40% internationaux" },
      { value: '309', label: "cadres scientifiques dont 170 HDR" },
      { value: '55 à 65', label: "diplômé(e)s les 3 dernières années" },
    ],
  },
  {
    block_key: 'unites',
    title: "Unités de Recherche de renom",
    content_type: 'richtext',
    content: {
      grands: "LAPLACE, LAAS, OLIMPES (ONERA-Équipes ISAE SUPAERO)\nONCOPOLE - CRCT (Imagerie Cérébrale et Handicaps Neurologiques) - TONIC",
      autres: "LPCNO, CEMES, LGP, IRAP",
    },
  },
]

// ── Bouton "Modifier" réutilisable ──────────────────────────────────────────
function EditButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors"
      title="Modifier ce bloc"
    >
      <Pencil className="h-3.5 w-3.5" />
      Modifier
    </button>
  )
}

// ── Panneau d'édition générique ─────────────────────────────────────────────
function EditPanel({ title, onClose, onSave, saving, children }) {
  return (
    <div className="mt-4 border border-brand-200 bg-slate-50 px-6 py-6 sm:px-8 sm:py-7 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Édition admin</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
          Fermer
        </button>
      </div>

      {children}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Check className="h-4 w-4" />
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          Annuler
        </button>
      </div>
    </div>
  )
}

// ── Hook : sauvegarde d'un bloc ─────────────────────────────────────────────
function useSaveBlock(token, setBlocks, onDone) {
  const [saving, setSaving] = useState(false)

  const save = async (blockKey, content) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/about/${blockKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) throw new Error('Erreur lors de l\'enregistrement')
      const updated = await res.json()
      setBlocks((prev) => prev.map((b) => (b.block_key === updated.block_key ? updated : b)))
      onDone()
    } finally {
      setSaving(false)
    }
  }

  return { save, saving }
}

// ── Composant principal ─────────────────────────────────────────────────────
export default function AboutPage() {
  const [blocks, setBlocks] = useState(fallbackBlocks)
  const [editingKey, setEditingKey] = useState(null)
  const { isAdmin, token } = useAdmin()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    fetch('/api/about')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setBlocks(data) })
      .catch(() => {})
  }, [])

  const getBlock = (key) => blocks.find((b) => b.block_key === key)

  const openEdit = (key) => setEditingKey(key)
  const closeEdit = () => setEditingKey(null)

  // ── Bloc "Présentation" ───────────────────────────────────────────────────
  function PresentationBlock() {
    const block = getBlock('presentation')
    const [draft, setDraft] = useState((block?.content ?? []).join('\n\n'))
    const { save, saving } = useSaveBlock(token, setBlocks, closeEdit)

    return (
      <div className="bg-white border border-slate-200 p-8 sm:p-12">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-slate-900">{block?.title}</h2>
          {isAdmin && <EditButton onClick={() => openEdit('presentation')} />}
        </div>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          {(block?.content ?? []).map((text, i) => (
            <p key={i} className="flex items-start">
              <span className="text-brand-600 mr-3 mt-1.5 text-xl shrink-0">•</span>
              <span>{text}</span>
            </p>
          ))}
        </div>
        {isAdmin && editingKey === 'presentation' && (
          <EditPanel
            title={block?.title}
            onClose={closeEdit}
            onSave={() => save('presentation', draft.split('\n\n').map((s) => s.trim()).filter(Boolean))}
            saving={saving}
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Paragraphes <span className="font-normal text-slate-500">(séparer chaque paragraphe par une ligne vide)</span>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-65 border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
              />
            </label>
          </EditPanel>
        )}
      </div>
    )
  }

  // ── Bloc "Industrie" ──────────────────────────────────────────────────────
  function IndustrieBlock() {
    const block = getBlock('industrie')
    const [draft, setDraft] = useState((block?.content ?? []).join('\n\n'))
    const { save, saving } = useSaveBlock(token, setBlocks, closeEdit)

    return (
      <div className="bg-white border border-slate-200 p-8 sm:p-12">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-slate-900">{block?.title}</h2>
          {isAdmin && <EditButton onClick={() => openEdit('industrie')} />}
        </div>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          {(block?.content ?? []).map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
        {isAdmin && editingKey === 'industrie' && (
          <EditPanel
            title={block?.title}
            onClose={closeEdit}
            onSave={() => save('industrie', draft.split('\n\n').map((s) => s.trim()).filter(Boolean))}
            saving={saving}
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Paragraphes <span className="font-normal text-slate-500">(séparer chaque paragraphe par une ligne vide)</span>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-45 border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
              />
            </label>
          </EditPanel>
        )}
      </div>
    )
  }

  // ── Bloc "Expertises" ─────────────────────────────────────────────────────
  function ExpertisesBlock() {
    const block = getBlock('expertises')
    const [draft, setDraft] = useState((block?.content ?? []).join('\n'))
    const { save, saving } = useSaveBlock(token, setBlocks, closeEdit)

    return (
      <div className="bg-brand-50 border border-brand-200 p-8 sm:p-12">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-brand-900">{block?.title}</h2>
          {isAdmin && <EditButton onClick={() => openEdit('expertises')} />}
        </div>
        <ul className="space-y-3 text-brand-800">
          {(block?.content ?? []).map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-brand-500 mr-3 mt-1 text-xl shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {isAdmin && editingKey === 'expertises' && (
          <EditPanel
            title={block?.title}
            onClose={closeEdit}
            onSave={() => save('expertises', draft.split('\n').map((s) => s.trim()).filter(Boolean))}
            saving={saving}
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Domaines <span className="font-normal text-slate-500">(un domaine par ligne)</span>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-50 border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 font-normal"
              />
            </label>
          </EditPanel>
        )}
      </div>
    )
  }

  // ── Bloc "Chiffres clés + Unités" ─────────────────────────────────────────
  function ChiffresBlock() {
    const block = getBlock('chiffres')
    const unites = getBlock('unites')
    const [draftChiffres, setDraftChiffres] = useState(block?.content ?? [])
    const [draftUnites, setDraftUnites] = useState(unites?.content ?? { grands: '', autres: '' })
    const { save: saveChiffres, saving: savingChiffres } = useSaveBlock(token, setBlocks, closeEdit)
    const { save: saveUnites, saving: savingUnites } = useSaveBlock(token, setBlocks, closeEdit)

    const updateChiffre = (i, field, value) => {
      setDraftChiffres((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
    }

    const handleSaveAll = async () => {
      await saveChiffres('chiffres', draftChiffres)
      await saveUnites('unites', draftUnites)
    }

    return (
      <div className="bg-slate-900 text-white p-8 sm:p-12">
        <div className="flex items-start justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Target className="w-8 h-8 text-brand-400" />
            {block?.title}
          </h2>
          {isAdmin && (
            <EditButton onClick={() => openEdit('chiffres')} />
          )}
        </div>

        <div className="space-y-6">
          {(block?.content ?? []).map(({ value, label }, i) => {
            const Icon = CHIFFRES_ICONS[i] ?? Target
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <div className="text-xl font-bold mb-1">{value}</div>
                  <div className="text-slate-400 leading-snug">{label}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <h3 className="font-bold text-lg mb-4 text-brand-300">{unites?.title} :</h3>
          {(() => {
            const c = unites?.content ?? {}
            const lines = typeof c.grands === 'string' ? c.grands.split('\n') : []
            return (
              <>
                <p className="text-slate-300 mb-2">
                  <strong className="text-white">Grands Laboratoires :</strong>{' '}
                  {lines.map((line, i) => (
                    <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
                  ))}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Autres :</strong> {c.autres}
                </p>
              </>
            )
          })()}
        </div>

        {isAdmin && editingKey === 'chiffres' && (
          <div className="mt-6 border border-brand-200 bg-slate-800 px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Édition admin</p>
                <h3 className="mt-1 text-xl font-bold text-white">Chiffres clés & Unités</h3>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="inline-flex items-center gap-1 rounded-full border border-slate-600 bg-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:bg-slate-600"
              >
                <X className="h-4 w-4" />
                Fermer
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-400">Chiffres</p>
              {draftChiffres.map((item, i) => {
                const Icon = CHIFFRES_ICONS[i] ?? Target
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-400" />
                    </div>
                    <input
                      value={item.value}
                      onChange={(e) => updateChiffre(i, 'value', e.target.value)}
                      placeholder="Valeur"
                      className="w-28 border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                    />
                    <input
                      value={item.label}
                      onChange={(e) => updateChiffre(i, 'label', e.target.value)}
                      placeholder="Libellé"
                      className="flex-1 border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                    />
                  </div>
                )
              })}
            </div>

            <div className="space-y-3 mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-400">Unités de Recherche</p>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-300">
                Grands Laboratoires
                <textarea
                  value={draftUnites.grands}
                  onChange={(e) => setDraftUnites((d) => ({ ...d, grands: e.target.value }))}
                  className="min-h-20 border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 font-normal"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-300">
                Autres
                <input
                  value={draftUnites.autres}
                  onChange={(e) => setDraftUnites((d) => ({ ...d, autres: e.target.value }))}
                  className="border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={savingChiffres || savingUnites}
                className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Check className="h-4 w-4" />
                {savingChiffres || savingUnites ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={closeEdit}
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-600"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    )
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
              <li className="text-white" aria-current="page">Qui sommes-nous ?</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">L'École Doctorale GEETS</h1>
          <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
            Génie Électrique, Électronique, Télécommunications et Santé
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <PresentationBlock />
        <IndustrieBlock />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ExpertisesBlock />
          <ChiffresBlock />
        </div>
      </div>
    </div>
  )
}
