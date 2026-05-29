import { Link } from 'react-router-dom'
import { ArrowRight, FileBadge, Users, Award, FileCheck2, Pencil, Check, X } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useEditableText } from '../hooks/useEditableText'

const cards = [
  { icon: FileBadge, title: 'Obtenir son HDR', desc: 'Procédure et conditions requises.' },
  { icon: Users, title: 'Direction de thèse', desc: "Demande d'encadrement et convention." },
  { icon: Award, title: 'Soutenances & Jurys', desc: 'Composition du jury et démarches.' },
  { icon: FileCheck2, title: 'Proposer un sujet', desc: 'Déposer une offre de thèse sur ADUM.' },
]

export default function HubPermanent() {
  const { isAdmin } = useAdmin()
  const hubSubtitle = useEditableText('hub_permanent_subtitle', "Vos informations concernant l'Habilitation à Diriger des Recherches, les demandes d'encadrement, et la participation aux jurys et comités de suivi.")

  return (
    <section id="permanents" className="py-24 bg-brand-900 text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex text-sm text-brand-300 mb-8 font-medium" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
            <li><span className="mx-2" aria-hidden="true">/</span></li>
            <li className="text-white font-semibold" aria-current="page">Hub Permanents</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:pr-10">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6 tracking-tight">Hub Permanent</h2>

            {hubSubtitle.editing ? (
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 mb-2">Édition admin</p>
                <textarea value={hubSubtitle.editValue} onChange={e => hubSubtitle.setEditValue(e.target.value)} rows={3}
                  className="w-full px-4 py-3 text-slate-900 bg-white text-sm outline-none focus:ring-2 focus:ring-white/50 resize-none" />
                <div className="flex gap-3 mt-2">
                  <button onClick={hubSubtitle.save} disabled={hubSubtitle.saving}
                    className="inline-flex items-center gap-1.5 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 disabled:opacity-50 transition-colors">
                    <Check className="h-3.5 w-3.5" />{hubSubtitle.saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button onClick={hubSubtitle.cancelEdit}
                    className="inline-flex items-center gap-1.5 border border-white/40 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                    <X className="h-3.5 w-3.5" />Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 mb-8">
                <p className="text-lg text-brand-100 leading-relaxed">{hubSubtitle.text}</p>
                {isAdmin && (
                  <button onClick={hubSubtitle.startEdit}
                    className="inline-flex items-center gap-1 border border-white/30 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10 transition-colors shrink-0 mt-1">
                    <Pencil className="h-3.5 w-3.5" />Modifier
                  </button>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3 items-start">
              <a
                href="https://adum.fr/identification.pl?menu_transparent=oui&site=GEET&redirection=maj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-900 font-bold hover:bg-brand-50 transition-colors shadow-lg focus-visible:ring-2 focus-visible:ring-white"
              >
                Accès encadrant ADUM
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <span className="text-xs text-brand-300">Suivi des doctorants et propositions de sujets</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map(({ icon: Icon, title, desc }) => (
              <Link
                key={title}
                to={`/ressources-permanents?openTitle=${encodeURIComponent(title)}`}
                className="block p-6 bg-brand-800 border border-brand-700 hover:bg-brand-700 hover:border-white transition-all group focus-visible:ring-2 focus-visible:ring-white"
              >
                <Icon className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-brand-200">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
