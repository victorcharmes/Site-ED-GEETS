import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import slide1 from '../images/DSCN0033.jpg'
import slide2 from '../images/Femtika ecriture.jpg'
import slide3 from '../images/Four oxydation.jpg'
import slide4 from '../images/IMG20220728094019.jpg'
import slide5 from '../images/IMG_5417.jpg'
import slide6 from '../images/Image MNBT.png'
import slide7 from '../images/Z PHTOLITHO_contrainte physique.jpg'

const SLIDES = [
  { id: 1, image: slide1, label: 'Laboratoire 1' },
  { id: 2, image: slide2, label: 'Femtika' },
  { id: 3, image: slide3, label: 'Four oxydation' },
  { id: 4, image: slide4, label: 'Image 2022' },
  { id: 5, image: slide5, label: 'Laboratoire 2' },
  { id: 6, image: slide6, label: 'Image MNBT' },
  { id: 7, image: slide7, label: 'PHTOLITHO' },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 8000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-36 overflow-hidden bg-black">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-4 sm:px-6">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-2 sm:p-3 bg-white/10 text-white hover:bg-white/20 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-md"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-2 sm:p-3 bg-white/10 text-white hover:bg-white/20 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-md"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-widest opacity-95">
            École Doctorale
          </h2>
          <h1 className="flex flex-col font-extrabold text-white mb-8 tracking-tight">
            {[
              ['G', 'énie'],
              ['E', 'lectrique,'],
              ['E', 'lectronique,'],
              ['T', 'élécommunications,'],
              ['S', 'anté'],
            ].map(([letter, rest], i) => (
              <div key={i} className="flex items-baseline">
                <span className="text-7xl sm:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-br from-brand-300 to-brand-100 leading-[0.85]">
                  {letter}
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl leading-none ml-1">{rest}</span>
              </div>
            ))}
          </h1>
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#offres"
              className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-brand-700 hover:bg-brand-600 shadow-lg transition-all hover:-translate-y-1 focus:ring-4 focus:ring-brand-500/50"
            >
              Découvrir les offres de thèse
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#doctorants"
              className="inline-flex justify-center items-center px-8 py-4 border-2 border-slate-300 text-base font-semibold text-white hover:bg-slate-800 hover:border-slate-800 transition-all backdrop-blur-sm bg-univ-900/40 focus:ring-4 focus:ring-slate-500/50"
            >
              Accès Doctorants
            </a>
          </div> */}
        </div>
      </div>
    </section>
  )
}
