import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RgpdPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Informations RGPD</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Informations RGPD</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Politique de protection des données personnelles</h2>
            <p className="mb-4">
              La présente politique vous informe sur la façon dont nous recueillons, traitons et protégeons vos données personnelles dans le cadre de votre utilisation du site de l'ED GEETS.
            </p>
            <p>
              Le responsable du traitement de vos données est l'Université de Toulouse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Données collectées</h2>
            <p>
              Nous collectons les données strictement nécessaires pour vous permettre d'accéder aux services de l'ED GEETS et communiquer avec nous.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Vos droits</h2>
            <p>
              Conformément à la réglementation applicable (RGPD et Loi Informatique et Libertés), vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Droit d'accès et de rectification de vos données</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité de vos données</li>
            </ul>
            <p className="mt-4">
              Pour exercer vos droits, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:geets@laas.fr" className="text-brand-700 hover:underline">geets@laas.fr</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}