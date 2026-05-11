export default function Stats() {
  return (
    <section className="relative -mt-20 lg:-mt-[5.5rem] z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl border border-slate-200 p-8">
        <h2 className="sr-only">Indicateurs de performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
          <div className="p-4 transition-transform hover:scale-105 duration-300">
            <p className="text-5xl font-extrabold text-brand-700 tracking-tight">250</p>
            <p className="mt-2 font-bold text-slate-700 uppercase tracking-wide">Doctorantes & Doctorants</p>
            <p className="text-sm text-slate-500 mt-1">Dont xx% d'internationaux</p>
          </div>
          <div className="p-4 pt-8 md:pt-4 transition-transform hover:scale-105 duration-300">
            <p className="text-5xl font-extrabold text-brand-700 tracking-tight">15</p>
            <p className="mt-2 font-bold text-slate-700 uppercase tracking-wide">Laboratoires</p>
          </div>
          <div className="p-4 pt-8 md:pt-4 transition-transform hover:scale-105 duration-300">
            <p className="text-5xl font-extrabold text-brand-700 tracking-tight">4</p>
            <p className="mt-2 font-bold text-slate-700 uppercase tracking-wide">Axes thématiques</p>
          </div>
        </div>
      </div>
    </section>
  )
}
