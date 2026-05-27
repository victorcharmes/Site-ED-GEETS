import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. État de conformité',
    content: (
      <p>
        Le site de l'École Doctorale GEETS est partiellement conforme au Référentiel Général d'Amélioration de l'Accessibilité (RGAA).
      </p>
    ),
  },
  {
    title: '2. Contenus non accessibles',
    content: (
      <p>
        Certains contenus peuvent encore présenter des limites d'accessibilité, notamment selon les documents intégrés, les composants dynamiques ou les ressources externes.
      </p>
    ),
  },
  {
    title: '3. Améliorations en cours',
    content: (
      <p>
        Des corrections sont apportées progressivement pour améliorer la navigation au clavier, la lisibilité, les contrastes et la compatibilité avec les lecteurs d'écran.
      </p>
    ),
  },
  {
    title: '4. Retour d’information',
    content: (
      <p>
        Si vous rencontrez une difficulté d'accès à un contenu ou à une fonctionnalité, vous pouvez nous contacter à l'adresse <a href="mailto:geets@laas.fr" className="text-brand-700 hover:underline">geets@laas.fr</a>.
      </p>
    ),
  },
  {
    title: '5. Voies de recours',
    content: (
      <p>
        Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou à un service, vous pouvez signaler le problème à la Défenseur des droits.
      </p>
    ),
  },
]

export default function RgaaPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Déclaration d'accessibilité</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Déclaration d'accessibilité</h1>
          <p className="max-w-3xl text-univ-100 text-lg leading-relaxed">
            Cette page présente le niveau d'accessibilité du site et les moyens de nous contacter si vous rencontrez une difficulté.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}