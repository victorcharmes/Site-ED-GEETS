import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export default function Footer() {
  const { isAdmin, toggleAdmin } = useAdmin()

  return (
    <footer className="bg-univ-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">

          {/* Coordonnées */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-700 flex items-center justify-center shadow-md overflow-hidden p-0.5">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvYA-E9F_0m_v0jV_xDPCSOARdTGimGNXjMQ&s"
                  alt="Logo Université de Toulouse"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white">GEETS</span>
            </div>
            <address className="not-italic text-sm text-slate-400 space-y-2 mb-6">
              <p className="font-bold text-slate-300">LAAS - CNRS</p>
              <p>7 av. du Colonel Roche, BP 54200</p>
              <p>31031 Toulouse Cedex 4</p>
              <div className="pt-3 space-y-3">
                <p>
                  <span className="text-slate-500 text-xs block mb-0.5">Secrétariat (M. Estruga / F. Rocher) :</span>
                  <a href="mailto:geets@laas.fr" className="hover:text-white transition-colors">
                    geets@laas.fr
                  </a>
                </p>
                <p>
                  <span className="text-slate-500 text-xs block mb-0.5">Direction (F. Caignet / S. Diaham) :</span>
                  <a href="mailto:edgeets.dir@univ-tlse3.fr" className="hover:text-white transition-colors">
                    edgeets.dir@univ-tlse3.fr
                  </a>
                </p>
              </div>
              <p className="pt-2">
                <a href="tel:+33561336284" className="hover:text-white transition-colors">
                  Tél : 05 61 33 62 84
                </a>
              </p>
            </address>
          </div>

          {/* Liens rapides */}
          <div className="pt-2">
            <h4 className="text-slate-400 text-sm font-semibold mb-6 uppercase tracking-wider">Liens Rapides</h4>
            <ul className="space-y-5">
              <li>
                <Link to="/qui-sommes-nous" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Foire Aux Questions
                </Link>
              </li>
              <li>
                <Link to="/laboratoires" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Laboratoires
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div className="pt-2">
            <h4 className="text-slate-400 text-sm font-semibold mb-6 uppercase tracking-wider">Informations Légales</h4>
            <ul className="space-y-5">
              <li>
                <Link to="/mentions-legales" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/rgpd" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Informations RGPD
                </Link>
              </li>
              <li>
                <Link to="/accessibilite" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                  Déclaration d'accessibilité (RGAA)
                  <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" title="Statut RGAA : Partiellement conforme" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contributeurs */}
        <div className="pt-10 pb-10 border-t border-slate-800">
          <h4 className="text-slate-400 text-sm font-semibold mb-3 uppercase tracking-wider">Contributeurs</h4>
          <p className="text-sm text-slate-500 mb-5 max-w-2xl">
            Ce site a été réalisé par des étudiants en L3 Informatique à l'Université de Toulouse,
            dans le cadre de leur projet de fin de licence, sous la supervision de{' '}
            <span className="text-slate-400 font-medium">Bruno Roussel</span>, professeur encadrant.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              'Cédric Roussel',
              'Aurélien Janet',
              'Victor Charmes',
              'Eliott Boulanger',
              'Lucas Gorgues',
              'Alban Gilles',
              'Anthony Piquemal',
              'Raffael Dwyyana',
              'TRAN Bui Xuan Vinh',
            ].map((name) => (
              <li key={name} className="text-sm text-slate-400">
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* Bas de page */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; 2026 Université de Toulouse — École Doctorale GEETS.</p>
          <button
            onClick={toggleAdmin}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border transition-colors ${
              isAdmin
                ? 'bg-red-900/40 text-red-400 border-red-800 outline outline-1 outline-red-700'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Activer/Désactiver le mode administrateur (démo)"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {isAdmin ? 'Mode Admin Actif' : 'Simuler Admin'}
          </button>
        </div>
      </div>
    </footer>
  )
}
