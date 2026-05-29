import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, X, ChevronDown, Globe, LogOut, ShieldCheck } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const languages = [
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
]

const navItems = [
  {
    title: "L'École",
    href: '/',
    subItems: [
      { title: 'Accueil', href: '/' },
      { title: 'Qui sommes-nous ?', href: '/qui-sommes-nous' },
      { title: 'Laboratoires', href: '/laboratoires' },
    ],
  },
  {
    title: 'Événements',
    href: '/#',
    subItems: [
      { title: 'Actualités', href: '/actualites' },
      { title: 'Agenda', href: '/agenda' },
    ],
  },
  {
    title: 'Ressources',
    href: '/#',
    subItems: [
      { title: 'Doctorants', href: '/ressources-doctorants' },
      { title: 'Permanents', href: '/ressources-permanents' },
    ],
  },
  {
    title: 'Liens utiles',
    href: '/#',
    subItems: [
      { title: 'Hub Doctorant', href: '/#doctorants' },
      { title: 'Hub Permanent', href: '/#permanents' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'ADUM',
    href: 'https://adum.fr/identification.pl?menu_transparent=oui&site=GEET&redirection=maj',
    target: "_blank",
    rel: "noopener noreferrer",
    isHighlight: true,
    subItems: [],
  },
]


export default function Header({ onOpenSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef(null)
  const { isAdmin, logout } = useAdmin()

  const isExternalLink = (href) => /^https?:\/\//.test(href)

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-700 text-white px-4 py-2 z-50 rounded font-medium"
      >
        Aller au contenu principal
      </a>

      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 relative">

            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-700 flex items-center justify-center shadow-md overflow-hidden p-0.5">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvYA-E9F_0m_v0jV_xDPCSOARdTGimGNXjMQ&s"
                  alt="Logo Université de Toulouse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Université de Toulouse
                </span>
                <span className="text-xl font-bold text-slate-900 leading-tight">ED GEETS</span>
              </div>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex flex-1 space-x-6 lg:space-x-8 justify-end mr-8" aria-label="Menu principal">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {isExternalLink(item.href) ? (
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      className={`flex items-center gap-1 font-medium transition-colors border-b-2 border-transparent py-2 ${
                        item.isHighlight
                          ? 'text-brand-700 font-bold hover:border-brand-700'
                          : 'text-slate-700 hover:text-brand-700 hover:border-brand-700'
                      }`}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      aria-haspopup={item.subItems.length > 0 ? "true" : undefined}
                      className={`flex items-center gap-1 font-medium transition-colors border-b-2 border-transparent py-2 ${
                        item.isHighlight
                          ? 'text-brand-700 font-bold hover:border-brand-700'
                          : 'text-slate-700 hover:text-brand-700 hover:border-brand-700'
                      }`}
                    >
                      {item.title}
                      {item.subItems.length > 0 && (
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-700 transition-transform group-hover:rotate-180" />
                      )}
                    </Link>
                  )}

                  {item.subItems.length > 0 && (
                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 z-50">
                      <div className="bg-white shadow-xl border border-slate-100 overflow-hidden py-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className="block px-4 py-2.5 text-sm text-slate-600 hover:text-brand-700 hover:bg-slate-50 transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions desktop */}
            <div className="shrink-0 flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2">
                {isAdmin && (
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
                    aria-label="Quitter le mode admin"
                    title="Quitter le mode admin"
                  >
                    <ShieldCheck className="w-4 h-4 group-hover:hidden" />
                    <LogOut className="w-4 h-4 hidden group-hover:block" />
                    <span className="group-hover:hidden">Admin</span>
                    <span className="hidden group-hover:inline">Déconnexion</span>
                  </button>
                )}
                <button
                  onClick={onOpenSearch}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 hover:bg-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-label="Rechercher sur le site"
                >
                  <Search className="w-5 h-5" />
                  Recherche
                  <span className="hidden lg:flex items-center ml-1 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 shadow-sm">
                    Ctrl K
                  </span>
                </button>

                {/* Sélecteur de langue desktop */}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 hover:bg-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label="Changer de langue"
                    aria-expanded={isLangMenuOpen}
                  >
                    <Globe className="w-5 h-5" />
                    <span>{currentLang.code}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLangMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-xl border border-slate-100 py-1 z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setCurrentLang(lang); setIsLangMenuOpen(false) }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                            currentLang.code === lang.code
                              ? 'text-brand-700 bg-brand-50 font-semibold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{lang.flag}</span>
                            {lang.name}
                          </span>
                          {currentLang.code === lang.code && (
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bouton menu mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-slate-600 hover:text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-brand-700 p-2"
                aria-expanded={isMobileMenuOpen}
                aria-label="Ouvrir le menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={index} className="space-y-1">
                  {isExternalLink(item.href) ? (
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-3 text-base ${
                        item.isHighlight
                          ? 'font-bold text-brand-800 bg-brand-50 border-l-4 border-brand-700'
                          : 'font-medium text-slate-800 hover:text-brand-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-3 text-base ${
                        item.isHighlight
                          ? 'font-bold text-brand-800 bg-brand-50 border-l-4 border-brand-700'
                          : 'font-medium text-slate-800 hover:text-brand-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                  {item.subItems.length > 0 && (
                    <div className="pl-6 pr-3 py-1 space-y-1 border-l-2 border-slate-100 ml-3">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-700 hover:bg-slate-50"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 px-4 py-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Langue</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setCurrentLang(lang); setIsMobileMenuOpen(false) }}
                      className={`flex-1 flex flex-col items-center justify-center p-2 transition-colors border-2 ${
                        currentLang.code === lang.code
                          ? 'bg-brand-50 text-brand-700 border-brand-200'
                          : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xl mb-1">{lang.flag}</span>
                      <span className="text-xs font-medium">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { onOpenSearch?.(); setIsMobileMenuOpen(false) }}
                className="w-full flex items-center justify-center gap-2 px-3 py-3 text-sm font-bold text-white bg-brand-700 hover:bg-brand-600 shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Search className="w-5 h-5" />
                Rechercher
              </button>
              {isAdmin && (
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Quitter le mode admin
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
