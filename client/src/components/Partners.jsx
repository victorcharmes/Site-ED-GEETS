import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const partners = [
  { name: 'Université Toulouse III - Paul Sabatier', logo: 'https://upload.wikimedia.org/wikipedia/fr/e/eb/COMUE_Toulouse_2025.png' },
  { name: 'INSA Toulouse', logo: 'https://adum.fr/logos/et241.jpg' },
  { name: 'ISAE-SUPAERO', logo: 'https://adum.fr/logos/et261.jpg' },
  { name: 'INP Toulouse', logo: 'https://www.univ-tlse3.fr/medias/photo/logo-ut-site_1747041194008-png?ID_FICHE=1019451' },
  { name: 'ENAC', logo: 'https://adum.fr/logos/etenac.jpg' },
  { name: 'Université Jean Jaurès', logo: 'https://adum.fr/logos/et246.jpg' },
  { name: 'REDOC SPI', logo: 'https://static.wixstatic.com/media/69d215_50a6f3e993f7407587f9d14e8541ccf3~mv2.png/v1/fill/w_179,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/69d215_50a6f3e993f7407587f9d14e8541ccf3~mv2.png'},
]

export default function Partners() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -250 : 250, behavior: 'smooth' })
  }

  const fallbackSrc = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128&font-size=0.3`

  return (
    <section className="py-6 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Nos partenaires et laboratoires associés</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="shrink-0 w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-500 bg-white shadow-sm hover:text-brand-700 hover:border-brand-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Partenaires précédents"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-8 md:gap-12 snap-x snap-mandatory px-2"
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-none snap-center flex items-center justify-center w-24 sm:w-28 h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.target.src = fallbackSrc(partner.name) }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="shrink-0 w-8 h-8 border border-slate-200 flex items-center justify-center text-slate-500 bg-white shadow-sm hover:text-brand-700 hover:border-brand-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Partenaires suivants"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
