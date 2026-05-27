import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Éditeur du site',
    content: (
      <>
        <p className="mb-2">Le site de l'École Doctorale GEETS est édité par l'Université de Toulouse.</p>
        <p><strong>Adresse de l'ED GEETS :</strong><br />LAAS - CNRS<br />7 av. du Colonel Roche, BP 54200<br />31031 Toulouse Cedex 4</p>
      </>
    ),
  },
  {
    title: '2. Directeur de la publication',
    content: <p>Direction de l'ED GEETS : F. Caignet / S. Diaham.</p>,
  },
  {
    title: '3. Hébergement',
    content: <p>Ce site est hébergé par les services informatiques de l'Université de Toulouse.</p>,
  },
  {
    title: '4. Données personnelles',
    content: <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition aux données vous concernant. Pour plus de détails, veuillez consulter notre <Link to="/rgpd" className="text-brand-700 hover:underline">page dédiée aux informations RGPD</Link>.</p>,
  },
  {
    title: '5. Propriété intellectuelle',
    content: <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>,
  },
]

export default function LegalNoticePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Mentions légales</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Mentions Légales</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h2>
              {s.content}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
