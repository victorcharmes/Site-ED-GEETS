import { ArrowRight, FileText, Calendar, BookOpen, GraduationCap } from 'lucide-react'

const cards = [
  { icon: FileText, title: 'Inscription & Réinscription', desc: 'Procédures internes et conventions.' },
  { icon: Calendar, title: 'Comité de Suivi (CSI)', desc: "Directives de l'ED GEETS et dates clés." },
  { icon: BookOpen, title: 'Catalogue Formations', desc: "Offre scientifique de l'établissement." },
  { icon: GraduationCap, title: 'Démarches Soutenance', desc: 'Manuscrit, jury et soutenance.' },
]

export default function Hub() {
  return (
    <section id="doctorants" className="py-24 bg-univ-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex text-sm text-univ-400 mb-8 font-medium" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
            <li><span className="mx-2" aria-hidden="true">/</span></li>
            <li className="text-brand-400" aria-current="page">Espace Doctorants</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6 tracking-tight">Hub Doctorant</h2>
            <p className="text-lg text-univ-200 mb-8 leading-relaxed">
              Retrouvez les guides administratifs de l'ED et accédez au réseau national pour gérer votre
              dossier, vos formations et votre CSI.
            </p>
            <div className="flex flex-col gap-3 items-start">
              <a
                href="https://www.adum.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-bold hover:bg-brand-500 transition-colors shadow-lg focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                Accès Doctorant ADUM
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <span className="text-xs text-univ-400">Plateforme nationale de gestion du doctorat</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map(({ icon: Icon, title, desc }) => (
              <a
                key={title}
                href="#"
                className="block p-6 bg-univ-800 border border-univ-700 hover:bg-univ-700 hover:border-brand-400 transition-all group focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Icon className="w-8 h-8 text-brand-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-univ-300">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
