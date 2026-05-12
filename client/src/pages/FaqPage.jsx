import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const faqData = [
  {
    id: 'doctorants',
    title: 'Questions fréquentes Doctorants',
    defaultOpen: true,
    questions: [
      { q: "Comment s'inscrire en thèse ?", a: "L'inscription en thèse se fait via la plateforme ADUM après accord du directeur de thèse et du directeur de laboratoire. Vous devez remplir votre dossier en ligne et fournir les pièces demandées." },
      { q: "Quelles sont les conditions de financement ?", a: "L'inscription en doctorat à plein temps nécessite un financement minimum de 3 ans (contrat doctoral, bourse CIFRE, etc.). Les doctorants salariés à temps plein pour autre chose peuvent faire une thèse à temps partiel." },
      { q: "Comment organiser ma soutenance ?", a: "La procédure de soutenance doit être initiée au moins 2 à 3 mois avant la date prévue dans votre espace ADUM. Vous devrez y renseigner vos rapporteurs, votre jury et soumettre votre manuscrit." },
      { q: "Qu'est-ce que le CSI (Comité de Suivi Individuel) ?", a: "Le CSI s'assure du bon déroulement de votre thèse. Il est obligatoire chaque année pour votre réinscription. Vous devez organiser une réunion avec ses membres et fournir le compte-rendu signé." },
      { q: "Combien d'heures de formation dois-je valider ?", a: "Chaque doctorant doit valider 100 heures de formation au cours de sa thèse (scientifiques et transversales) dont l'éthique de la recherche avant sa soutenance." },
    ],
  },
  {
    id: 'permanents',
    title: 'Questions fréquentes Permanents',
    defaultOpen: false,
    questions: [
      { q: 'Comment proposer un sujet de thèse ?', a: "Les propositions de sujets se font via l'espace ADUM. Vous devez être titulaire d'une HDR ou demander une dérogation temporelle pour diriger vos travaux." },
      { q: "Comment obtenir l'Habilitation à Diriger des Recherches (HDR) ?", a: "Le dossier de demande d'autorisation à concourir pour l'HDR doit être déposé auprès du conseil académique de l'établissement concerné. L'ED GEETS émettra un avis sur ce dossier." },
      { q: 'Comment organiser une soutenance en tant que directeur ?', a: "Le directeur de thèse propose les rapporteurs et la composition du jury dans l'espace ADUM du doctorant. Assurez-vous que les règles de parité et de proportion de membres extérieurs sont respectées." },
    ],
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-slate-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 text-slate-700 leading-relaxed">{a}</div>
      </div>
    </div>
  )
}

function FaqCategory({ title, questions, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="mb-6 border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left bg-brand-50 hover:bg-brand-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={open}
      >
        <h2 className="text-xl font-bold text-brand-900">{title}</h2>
        <ChevronDown className={`w-6 h-6 text-brand-600 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 sm:p-6 space-y-4 bg-white border-t border-brand-100">
          {questions.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
        </div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-univ-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav className="flex text-sm text-univ-200 mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><span className="mx-2 opacity-50">/</span></li>
              <li className="text-white" aria-current="page">FAQ</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Foire Aux Questions</h1>
          <p className="text-xl text-univ-100 leading-relaxed max-w-2xl">
            Retrouvez les réponses aux questions les plus fréquentes concernant le déroulement de votre thèse à l'ED GEETS.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqData.map((cat) => (
          <FaqCategory key={cat.id} title={cat.title} questions={cat.questions} defaultOpen={cat.defaultOpen} />
        ))}
        <div className="mt-12 bg-white border border-slate-200 border-l-4 border-l-brand-600 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-slate-900 font-bold mb-1">Vous n'avez pas trouvé votre réponse ?</h4>
            <p className="text-slate-600 text-sm">N'hésitez pas à nous contacter directement pour une assistance personnalisée.</p>
          </div>
          <a
            href="mailto:geets@laas.fr"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-700 text-white font-bold hover:bg-brand-600 transition-colors shrink-0"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  )
}
