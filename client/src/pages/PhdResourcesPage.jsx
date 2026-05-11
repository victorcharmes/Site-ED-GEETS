import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, X, Eye, File as FileIcon } from 'lucide-react'

const resources = [
  { id: 1, title: "Charte des thèses de l'Université de Toulouse", category: 'Réglementation', type: 'pdf', date: 'Mars 2023', size: '1.2 MB', content: "Ceci est un aperçu du document PDF. Dans un environnement de production, ce serait une iframe ou un viewer PDF pointant vers le fichier réel." },
  { id: 2, title: 'Guide de la soutenance de thèse', category: 'Soutenance', type: 'texte', date: 'Janvier 2024', size: '15 KB', content: `Procédure de soutenance :\n1. Désignation des rapporteurs (2 mois avant).\n2. Dépôt du manuscrit en ligne.\n3. Retour des pré-rapports (14 jours avant).\n4. Jour de la soutenance (présentation, questions, délibération).\n5. Dépôt définitif avec les corrections demandées par le jury.` },
  { id: 3, title: "Formulaire d'enregistrement du CSI", category: 'Suivi', type: 'pdf', date: 'Février 2024', size: '450 KB', content: "Formulaire type pour le rapport du Comité de Suivi Individuel. Ce document doit être rempli et signé par tous les membres du CSI et remis au secrétariat lors de la demande de réinscription." },
  { id: 4, title: "Procédure d'inscription en 1ère année", category: 'Inscription', type: 'texte', date: 'Septembre 2023', size: '12 KB', content: `Pour vous inscrire en 1ère année de doctorat :\n- Avoir validé un diplôme de master (ou équivalent reconnu).\n- Avoir l'accord d'un directeur de thèse rattaché à l'une de nos équipes.\n- Bénéficier d'un financement assuré pour au moins 3 ans.\n- Créer et renseigner votre dossier sur ADUM avant la date limite.` },
  { id: 5, title: 'Liste des formations transversales éligibles', category: 'Formation', type: 'pdf', date: 'Novembre 2023', size: '2.1 MB', content: "Catalogue complet des formations transversales. Rappel : les doctorants doivent valider au moins 100 heures de formations dont une formation obligatoire à l'éthique de la recherche." },
  { id: 6, title: 'Vade-Mecum du doctorant GEETS', category: 'Général', type: 'texte', date: 'Octobre 2023', size: '18 KB', content: `Le Vade-Mecum répond aux questions pratiques du doctorant dès son arrivée :\n- Horaires et accès aux locaux\n- Utilisation des ressources informatiques\n- Congés et absences\n- Organisation des déplacements et missions\n- Obligations en matière de publication et d'affiliation` },
]

function ResourceModal({ resource, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4 pr-4">
            <div className={`p-3 border hidden sm:block ${resource.type === 'pdf' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
              {resource.type === 'pdf' ? <FileIcon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{resource.title}</h3>
              <div className="text-sm text-slate-500 mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="font-medium text-slate-700">{resource.category}</span>
                <span className="text-slate-300">•</span>
                <span>Document {resource.type.toUpperCase()}</span>
                <span className="text-slate-300">•</span>
                <span>{resource.size}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="bg-white border border-slate-200 shadow-sm min-h-[50vh] flex flex-col relative">
            <div className="p-8 sm:p-12 text-slate-800 flex-grow">
              {resource.type === 'pdf' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
                  <FileIcon className="w-20 h-20 text-red-100 mb-6" />
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Aperçu du document PDF</h4>
                  <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg leading-relaxed">{resource.content}</p>
                  <button className="flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-bold hover:bg-brand-600 transition-colors text-lg">
                    <Download className="w-5 h-5" />
                    Télécharger le document
                  </button>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-line text-lg text-slate-700">{resource.content}</div>
                </div>
              )}
            </div>
            <div className="border-t border-slate-100 p-4 text-center text-sm text-slate-400 bg-white">
              Document édité par l'École Doctorale GEETS — {resource.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PhdResourcesPage() {
  const [selected, setSelected] = useState(null)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Ressources Doctorants</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Ressources Doctorants</h1>
          <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
            Consultez l'ensemble des fiches, documents et formulaires nécessaires au déroulement de votre projet de thèse.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div key={r.id} className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
              <article className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm p-6 overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 border ${r.type === 'pdf' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    {r.type === 'pdf' ? <FileIcon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1">
                    {r.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex-grow group-hover:text-brand-700 transition-colors">{r.title}</h3>
                <div className="text-sm text-slate-500 mb-6 flex items-center justify-between">
                  <span>{r.date}</span>
                  <span className="bg-slate-50 px-2 py-0.5 border border-slate-100">{r.type.toUpperCase()} • {r.size}</span>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => setSelected(r)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <Eye className="w-4 h-4" />
                    Visualiser
                  </button>
                  {r.type === 'pdf' && (
                    <button className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors" title="Télécharger">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {selected && <ResourceModal resource={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
