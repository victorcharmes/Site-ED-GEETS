import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Responsable du traitement',
    content: (
      <p>
        Le traitement des données personnelles liées au site de l'École Doctorale GEETS est assuré par l'Université de Toulouse, en lien avec l'équipe administrative de l'ED.
      </p>
    ),
  },
  {
    title: '2. Données susceptibles d’être collectées',
    content: (
      <p>
        Selon les formulaires ou les échanges effectués via le site, nous pouvons collecter des données d'identification et de contact, ainsi que des informations utiles au suivi administratif des demandes.
      </p>
    ),
  },
  {
    title: '3. Finalités du traitement',
    content: (
      <p>
        Les données sont utilisées uniquement pour répondre aux sollicitations, assurer la gestion administrative de l'École Doctorale et diffuser les informations utiles aux doctorants et aux partenaires.
      </p>
    ),
  },
  {
    title: '4. Durée de conservation',
    content: (
      <p>
        Les données sont conservées pendant la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations applicables à l'établissement.
      </p>
    ),
  },
  {
    title: '5. Vos droits',
    content: (
      <p>
        Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité lorsque cela s'applique.
      </p>
    ),
  },
  {
    title: '6. Exercice des droits',
    content: (
      <p>
        Pour toute demande concernant vos données personnelles, vous pouvez contacter l'ED GEETS à l'adresse <a href="mailto:geets@laas.fr" className="text-brand-700 hover:underline">geets@laas.fr</a>.
      </p>
    ),
  },
  {
    title: '7. Réclamation',
    content: (
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
      </p>
    ),
  },
]

export default function RgpdPage() {
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
              <li className="text-white" aria-current="page">Informations RGPD</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Informations RGPD</h1>
          <p className="max-w-3xl text-univ-100 text-lg leading-relaxed">
            Cette page présente les informations essentielles sur la collecte et l'utilisation des données personnelles dans le cadre du site de l'École Doctorale GEETS.
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