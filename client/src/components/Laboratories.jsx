import { ArrowRight, Pencil, Check, X } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useEditableText } from '../hooks/useEditableText'

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
  const { isAdmin } = useAdmin()
  const subtitle = useEditableText('labs_section_subtitle', "Les doctorants du GEETS sont intégrés au sein d'unités de recherche de pointe, bénéficiant d'infrastructures de niveau international.")

  return (
    <section id="laboratoires" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-wide text-brand-700 uppercase mb-2">Réseau Scientifique</h2>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Nos 13 Laboratoires</h3>

            {subtitle.editing ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 mb-2">Édition admin</p>
                <textarea value={subtitle.editValue} onChange={e => subtitle.setEditValue(e.target.value)} rows={3}
                  className="w-full px-4 py-3 text-slate-900 border border-slate-300 bg-white text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none" />
                <div className="flex gap-3 mt-2">
                  <button onClick={subtitle.save} disabled={subtitle.saving}
                    className="inline-flex items-center gap-1.5 bg-brand-700 text-white px-4 py-2 text-xs font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors">
                    <Check className="h-3.5 w-3.5" />{subtitle.saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button onClick={subtitle.cancelEdit}
                    className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                    <X className="h-3.5 w-3.5" />Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 mt-4">
                <p className="text-lg text-slate-600">{subtitle.text}</p>
                {isAdmin && (
                  <button type="button" onClick={subtitle.startEdit}
                    className="inline-flex items-center gap-1 rounded-none border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm hover:border-brand-300 hover:text-brand-700 shrink-0"
                    title="Modifier le sous-titre">
                    <Pencil className="h-3.5 w-3.5" />Modifier
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {labs.map((lab, i) => (
            <a
              key={i}
              href={lab.url ?? '#'}
              target={lab.url ? '_blank' : undefined}
              rel={lab.url ? 'noopener noreferrer' : undefined}
              className="block relative group outline-none"
            >
              <div className="absolute inset-0 bg-linear-to-r from-brand-500 to-teal-800 translate-y-1.5 translate-x-1.5 opacity-0 group-hover:opacity-15 transition-all duration-300" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-7 bg-white border border-slate-200 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden focus-visible:ring-2 focus-visible:ring-brand-500">
                <div className="absolute -right-10 -top-10 w-28 h-28 bg-slate-50 group-hover:bg-brand-50 transition-colors duration-500" />
                <div className="relative z-10">
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-brand-700 transition-colors">
                    {lab.name}
                  </h4>
                  <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">{lab.desc}</p>
                </div>
                <div className="relative z-10 flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
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
    </section>
  )
}
