import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Target, BookOpen } from 'lucide-react'

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white border border-slate-200 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Présentation de l'École Doctorale GEETS</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {[
              "L'École Doctorale GEETS est l'une des quinze composantes de l'École des Docteurs de Toulouse et forme des docteurs issus de diverses filières (Ingénieurs, Masters Nationaux et Internationaux) au sein de Laboratoires de réputation internationale et adossées aux pôles de compétitivité AESE et CBS.",
              "Les doctorants sont formés par la recherche sur 7 spécialités touchant principalement aux Départements Scientifiques Sciences pour l'Ingénieur (SPI) et Sciences et Technologies de l'Information et de la Communication (STIC) et plus en marge au département Sciences du Vivant et de la Santé.",
              "Toutes les thèses sont financées soit par des contrats doctoraux universitaires issus de nos établissements de tutelle, soit par des conventions CIFRES, des contrats DGA, ou encore de contrats de recherches. Des cotutelles avec des Universités étrangères représentent environ 10% des thèses.",
              "De nombreux programmes internationaux développés par l'École des Docteurs de Toulouse enrichissent notre ouverture, par exemple le programme CSC (China Scholarship Council).",
            ].map((text, i) => (
              <p key={i} className="flex items-start">
                <span className="text-brand-600 mr-3 mt-1.5 text-xl shrink-0">•</span>
                <span>{text}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">De l'École Doctorale GEETS à l'Industrie</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>Nos docteurs sont en majorité (55% environ) voués à des carrières en R&D dans des entreprises allant des PMI aux grands groupes, en France et à l'International : AIRBUS et ses sous-traitants, SAFRAN, LIEBHERR, ACTIA, LEROY SOMER, THALES, FREESCALE, CONTINENTAL.</p>
            <p>La forte dynamique de l'École Doctorale GEETS a également permis la création par ces docteurs de plusieurs Start Up. De nombreuses Start Up sont nées grâce à nos docteurs et aux laboratoires.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-brand-50 border border-brand-200 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-brand-900 mb-6">Domaines d'expertise</h2>
            <ul className="space-y-3 text-brand-800">
              {[
                "Génie Électrique et Gestion de l'Énergie : du Composant au Système",
                "Ingénierie des Plasmas",
                "Haute Fréquence et Optique : de l'Électromagnétisme au Système",
                "Nano Ingénierie et Intégration, Monitoring",
                "Micro et Nano Bio Technologies",
                "Radio Physique et Imagerie Médicale",
                "Ingénierie pour la santé et pour le vivant",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-brand-500 mr-3 mt-1 text-xl shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-8 sm:p-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-brand-400" />
              Chiffres clés
            </h2>
            <div className="space-y-6">
              {[
                { icon: Users, value: '250 à 300', label: "doctorant(e)s dont environ 40% internationaux" },
                { icon: BookOpen, value: '309', label: "cadres scientifiques dont 170 HDR" },
                { icon: Target, value: '55 à 65', label: "diplômé(e)s les 3 dernières années" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={value} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1">{value}</div>
                    <div className="text-slate-400 leading-snug">{label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h3 className="font-bold text-lg mb-4 text-brand-300">Unités de Recherche de renom :</h3>
              <p className="text-slate-300 mb-2">
                <strong className="text-white">Grands Laboratoires :</strong> LAPLACE, LAAS, OLIMPES (ONERA-Équipes ISAE SUPAERO)<br />
                ONCOPOLE - CRCT (Imagerie Cérébrale et Handicaps Neurologiques) - TONIC
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Autres :</strong> LPCNO, CEMES, LGP, IRAP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
