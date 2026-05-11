import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

function NewsCard({ item }) {
  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
      <article className="relative h-full flex flex-col border border-slate-200 bg-white shadow-sm overflow-hidden group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
        <div className="h-48 bg-slate-200 relative overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-700">
              <Calendar className="w-16 h-16" />
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">
            {item.category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
          <p
            className="text-sm text-slate-600 flex-1 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </article>
    </div>
  )
}

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => setNews(data.slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <section className="pt-24 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">DERNIÈRES ACTUALITÉS</h2>
            <p className="mt-2 text-slate-600">La vie scientifique et administrative de l'école doctorale.</p>
          </div>
          <Link to="/actualites" className="hidden sm:inline-block text-brand-700 font-bold hover:text-brand-800">
            Toutes les actualités &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
