import { Link } from 'react-router-dom'
import { ArrowRight, FileBadge, Users, Award, FileCheck2 } from 'lucide-react'

const cards = [
  { icon: FileBadge, title: 'Obtenir son HDR', desc: 'Procédure et conditions requises.' },
  { icon: Users, title: 'Direction de thèse', desc: "Demande d'encadrement et convention." },
  { icon: Award, title: 'Soutenances & Jurys', desc: 'Composition du jury et démarches.' },
  { icon: FileCheck2, title: 'Proposer un sujet', desc: 'Déposer une offre de thèse sur ADUM.' },
]

export default function HubPermanent() {
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
            <p className="text-lg text-brand-100 mb-8 leading-relaxed">
              Vos informations concernant l'Habilitation à Diriger des Recherches, les demandes
              d'encadrement, et la participation aux jurys et comités de suivi.
            </p>
            <div className="flex flex-col gap-3 items-start">
              <a
                href="https://www.adum.fr"
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
