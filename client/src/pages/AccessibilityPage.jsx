import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AccessibilityPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Accessibilité</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Déclaration d'accessibilité</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Statut de conformité</h2>
            <p className="mb-4">
              L'Université de Toulouse - ED GEETS s'engage à rendre ses sites internet accessibles conformément à l'article 47 de la loi n°2005-102 du 11 février 2005.
            </p>
            <p>
              Ce site web est <strong>partiellement conforme</strong> avec le Référentiel Général d'Amélioration de l'Accessibilité (RGAA), version 4, en raison des non-conformités énumérées ci-dessous.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Établissement de la déclaration</h2>
            <p>Cette déclaration a été établie à la date de publication du site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Retour d'information et contact</h2>
            <p>
              Si vous n'arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site web pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
            </p>
            <p className="mt-2">
              Envoyer un message : <a href="mailto:geets@laas.fr" className="text-brand-700 hover:underline">geets@laas.fr</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}