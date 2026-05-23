import { useRef, useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const labs = [
  { name: 'LAPLACE',   desc: "Laboratoire PLAsma et Conversion d'Énergie",tags: ['SPI'],url: 'https://www.laplace.univ-tlse.fr/' },
  { name: 'LAAS',   desc: "Laboratoire d'Analyse et d'Architecture des Systèmes",tags: ['STIC', 'SPI'],url: 'https://www.laas.fr/fr/' },
  { name: 'OLIMPES',desc: 'Optronique, Laser, Imagerie Physique et Environnement Spatial',tags: ['SPI', 'Spatial'], url: 'https://www.isae-supaero.fr/offre-de-formations/formation-doctorale-isae-supaero/#onglet-lessentiel' },
  { name: 'CERCO',desc: 'Centre de Recherche Cerveau et Cognition',tags: ['Santé'],url: 'https://cerco.cnrs.fr/en/cerco-umr5549-2/' },
  { name: 'CRCT',desc: 'Centre de Recherches en Cancérologie de Toulouse',tags: ['Santé'],url: 'https://www.crct-inserm.fr/' },
  { name: 'DPHE',desc: 'Diagnostic des plasmas hors équilibre',tags: ['SPI'],url: 'https://doctorat.univ-toulouse.fr/as/ed/fiche.pl?mat=3217&site=EDT&ed=48' },
  { name: 'ENAC-LAB',desc: 'Laboratoire de Recherche ENAC',tags: ['SPI'],url: 'https://www.enac.fr/fr/le-laboratoire-de-recherche-enac' },
  { name: 'I2MC',desc: 'Institut des Maladies Métaboliques et Cardiovasculaires',tags: ['Santé'],url: 'https://www.i2mc.inserm.fr/' },
  { name: 'IRAP',desc: "Institut de Recherche en Astrophysique et Planétologie",tags: ['SPI'],url: 'https://www.irap.omp.eu/' },
  { name: 'IUCT',desc: "Institut universitaire du cancer de Toulouse",tags: ['Santé'],url: 'https://www.iuct-oncopole.fr/le-laboratoire-de-biologie-medicale-oncologique' },
  { name: 'LGP',    desc: 'Laboratoire Génie de Production',tags: ['SPI'],url: 'https://www.lgp.enit.fr/fr/lgp.html' },
  { name: 'LPCNO',   desc: 'Laboratoire de Physique et Chimie des Nano-Objets',tags: ['SPI'],url: 'https://lpcno.insa-toulouse.fr/fr/' },
  { name: 'ToNIC', desc: 'Toulouse NeuroImaging Center',tags: ['Santé'],url: 'https://tonic.inserm.fr/' },
]

export default function Laboratories() {
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [progress, setProgress] = useState(15)

  const updateState = () => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    const max = scrollWidth - clientWidth
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < max - 10)
    setProgress(max > 0 ? Math.max(15, (scrollLeft / max) * 100) : 15)
  }

  useEffect(() => {
    updateState()
    window.addEventListener('resize', updateState)
    return () => window.removeEventListener('resize', updateState)
  }, [])

  const scroll = (dir) =>
    carouselRef.current?.scrollBy({ left: dir === 'left' ? -344 : 344, behavior: 'smooth' })

  return (
    <section id="laboratoires" className="py-24 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-wide text-brand-700 uppercase mb-2">Réseau Scientifique</h2>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Nos 13 Laboratoires</h3>
            <p className="mt-4 text-lg text-slate-600">
              Les doctorants du GEETS sont intégrés au sein d'unités de recherche de pointe, bénéficiant
              d'infrastructures de niveau international.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all whitespace-nowrap"
          >
            Voir l'annuaire complet
          </a>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={carouselRef}
            onScroll={updateState}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 pt-4 cursor-grab active:cursor-grabbing"
          >
            {labs.map((lab, i) => (
              <a
                key={i}
                href={lab.url ?? '#'}
                target={lab.url ? '_blank' : undefined}
                rel={lab.url ? 'noopener noreferrer' : undefined}
                className="flex-none w-[280px] sm:w-[320px] relative group snap-start outline-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <div className="relative h-full flex flex-col p-8 bg-white border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden focus-visible:ring-2 focus-visible:ring-brand-500">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-slate-50 group-hover:bg-brand-50 transition-colors duration-500" />
                  <div className="relative z-10 flex-1">
                    <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-brand-700 transition-colors">
                      {lab.name}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed line-clamp-2">{lab.desc}</p>
                  </div>
                  <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider group-hover:bg-brand-100 group-hover:text-brand-800 transition-colors">
                      {lab.tags.join(' / ')}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="w-full sm:max-w-xs h-1.5 bg-slate-100 overflow-hidden">
            <div className="h-full bg-brand-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')} disabled={!canScrollLeft}
              className="w-12 h-12 border-2 border-slate-200 flex items-center justify-center text-slate-600 bg-white shadow-sm hover:text-brand-700 hover:border-brand-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              aria-label="Laboratoires précédents"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')} disabled={!canScrollRight}
              className="w-12 h-12 border-2 border-slate-200 flex items-center justify-center text-slate-600 bg-white shadow-sm hover:text-brand-700 hover:border-brand-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              aria-label="Laboratoires suivants"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
