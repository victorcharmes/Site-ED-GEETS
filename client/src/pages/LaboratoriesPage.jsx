import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Laboratories from '../components/Laboratories.jsx'

export default function LaboratoriesPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">Laboratoires</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Laboratoires</h1>
          <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
            Découvrez les 13 unités de recherche de l'ED GEETS, intégrées dans les pôles de compétitivité AESE et CBS.
          </p>
        </div>
      </div>
      <Laboratories />
    </div>
  )
}
