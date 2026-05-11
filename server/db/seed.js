export function seed(db) {
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get()
  if (newsCount.count > 0) return

  const insertNews = db.prepare(
    'INSERT INTO news (title, date, category, content, image) VALUES (?, ?, ?, ?, ?)'
  )
  const insertAgenda = db.prepare(
    'INSERT INTO agenda (title, date, time, location, type, content) VALUES (?, ?, ?, ?, ?, ?)'
  )

  const seedNews = db.transaction(() => {
    insertNews.run(
      'Journée des doctorants ED GEETS 2025',
      '2025-06-15',
      'Événement',
      '<p>La journée annuelle des doctorants se tiendra le 15 juin 2025 à l\'ENSEEIHT. Au programme : présentations des travaux de thèse, networking et remise des prix.</p>',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    )
    insertNews.run(
      'Nouveaux financements ANR pour les laboratoires',
      '2025-05-20',
      'Financement',
      '<p>Trois laboratoires de l\'ED GEETS ont obtenu des financements ANR pour des projets de recherche en électronique et télécommunications.</p>',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
    )
    insertNews.run(
      'Ouverture des inscriptions en thèse 2025-2026',
      '2025-04-01',
      'Administrative',
      '<p>Les inscriptions pour les nouvelles thèses débutant à la rentrée 2025-2026 sont ouvertes. Consultez la procédure sur ADUM.</p>',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
    )
  })

  const seedAgenda = db.transaction(() => {
    insertAgenda.run(
      'Journée des doctorants ED GEETS',
      '2025-06-15',
      '09:00',
      'ENSEEIHT, Toulouse',
      'Journée',
      '<p>Présentation des travaux de thèse et networking entre doctorants et permanents.</p>'
    )
    insertAgenda.run(
      'Comité de Suivi Individuel — Session printemps',
      '2025-05-28',
      '14:00',
      'En ligne / Présentiel',
      'CSI',
      '<p>Session de CSI pour les doctorants en 2ème et 3ème année.</p>'
    )
    insertAgenda.run(
      'Soutenance de thèse — Marie Dupont',
      '2025-06-03',
      '10:00',
      'Salle des thèses, Université Paul Sabatier',
      'Soutenance',
      '<p>Soutenance de la thèse intitulée "Optimisation des réseaux 5G en milieu urbain".</p>'
    )
  })

  seedNews()
  seedAgenda()
}
