import { Link } from 'react-router-dom'
import { Info, HelpCircle, GraduationCap, Briefcase } from 'lucide-react'

const items = [
  {
    icon: Info,
    title: 'Qui sommes-nous ?',
    desc: "Découvrez la mission, la communauté et l'histoire de l'École Doctorale GEETS.",
    to: '/qui-sommes-nous',
    isLink: true,
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    desc: 'Trouvez rapidement les réponses à vos questions sur le déroulement de votre thèse.',
    to: '/faq',
    isLink: true,
  },
  {
    icon: GraduationCap,
    title: 'Ressources Doctorants',
    desc: 'Fiches, procédures, formulaires et documents utiles pour votre thèse.',
    to: '/ressources-doctorants',
    isLink: true,
  },
  {
    icon: Briefcase,
    title: 'Ressources Permanents',
    desc: 'Informations et démarches pour les directeurs de thèse et les personnels de laboratoire.',
    href: '#permanents',
    isLink: false,
  },
]

function Card({ icon: Icon, title, desc, to, href, isLink }) {
  const inner = (
    <>
      <div className="w-12 h-12 bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
        <Icon className="w-6 h-6 text-brand-700" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </>
  )

  const className =
    'relative h-full flex flex-col bg-white shadow-sm border border-slate-200 p-8 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500'

  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-teal-800 translate-y-2 translate-x-2 opacity-0 group-hover:opacity-20 transition-all duration-300" />
      {isLink ? (
        <Link to={to} className={className}>{inner}</Link>
      ) : (
        <a href={href} className={className}>{inner}</a>
      )}
    </div>
  )
}

export default function EssentialInfo() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">VOS INFORMATIONS ESSENTIELLES</h2>
          <p className="mt-4 text-lg text-slate-600">
            Retrouvez rapidement les documents, contacts et réponses à vos questions les plus fréquentes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <Card key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
