export function seed(db) {
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get()
  const agendaCount = db.prepare('SELECT COUNT(*) as count FROM agenda').get()
  const statsCount = db.prepare('SELECT COUNT(*) as count FROM stats').get()
  const aboutCount = db.prepare('SELECT COUNT(*) as count FROM about_blocks').get()
  const resourcesCount = db.prepare('SELECT COUNT(*) as count FROM resources').get()
  const faqCount = db.prepare('SELECT COUNT(*) as count FROM faq_categories').get()

  const insertNews = db.prepare(
    'INSERT INTO news (title, date, category, content, image) VALUES (?, ?, ?, ?, ?)'
  )
  const insertAgenda = db.prepare(
    'INSERT INTO agenda (title, date, time, location, type, content) VALUES (?, ?, ?, ?, ?, ?)'
  )
  const insertStats = db.prepare(
    'INSERT INTO stats (stat_key, value, title, detail, detail_type) VALUES (?, ?, ?, ?, ?)'
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

  const seedStats = db.transaction(() => {
    insertStats.run(
      'doctorants',
      '250',
      'Doctorantes & Doctorants',
      "Afficher par exemple le pourcentage d'internationaux.",
      'text'
    )
    insertStats.run('docteurs', 'xx', 'Docteurs', 'A modifier selon vos besoins.', 'text')
    insertStats.run(
      'specialites',
      '8',
      'Domaines de spécialités',
      JSON.stringify([
        'Micro et Nanosystèmes',
        'Électromagnétisme et systèmes haute fréquence',
        'Photonique et systèmes optoélectroniques',
        "Composants et systèmes de gestion de l'énergie",
        'Génie électrique',
        'Ingénierie des plasmas',
        'Radio-physique et imagerie médicale',
        'Ingénierie pour la santé et pour le vivant',
      ]),
      'list'
    )
  })

  const insertAbout = db.prepare(
    'INSERT INTO about_blocks (block_key, title, content, content_type) VALUES (?, ?, ?, ?)'
  )

  const seedAbout = db.transaction(() => {
    insertAbout.run(
      'presentation',
      "Présentation de l'École Doctorale GEETS",
      JSON.stringify([
        "L'École Doctorale GEETS est l'une des quinze composantes de l'École des Docteurs de Toulouse et forme des docteurs issus de diverses filières (Ingénieurs, Masters Nationaux et Internationaux) au sein de Laboratoires de réputation internationale et adossées aux pôles de compétitivité AESE et CBS.",
        "Les doctorants sont formés par la recherche sur 7 spécialités touchant principalement aux Départements Scientifiques Sciences pour l'Ingénieur (SPI) et Sciences et Technologies de l'Information et de la Communication (STIC) et plus en marge au département Sciences du Vivant et de la Santé.",
        "Toutes les thèses sont financées soit par des contrats doctoraux universitaires issus de nos établissements de tutelle, soit par des conventions CIFRES, des contrats DGA, ou encore de contrats de recherches. Des cotutelles avec des Universités étrangères représentent environ 10% des thèses.",
        "De nombreux programmes internationaux développés par l'École des Docteurs de Toulouse enrichissent notre ouverture, par exemple le programme CSC (China Scholarship Council).",
      ]),
      'paragraphs'
    )
    insertAbout.run(
      'industrie',
      "De l'École Doctorale GEETS à l'Industrie",
      JSON.stringify([
        "Nos docteurs sont en majorité (55% environ) voués à des carrières en R&D dans des entreprises allant des PMI aux grands groupes, en France et à l'International : AIRBUS et ses sous-traitants, SAFRAN, LIEBHERR, ACTIA, LEROY SOMER, THALES, FREESCALE, CONTINENTAL.",
        "La forte dynamique de l'École Doctorale GEETS a également permis la création par ces docteurs de plusieurs Start Up. De nombreuses Start Up sont nées grâce à nos docteurs et aux laboratoires.",
      ]),
      'paragraphs'
    )
    insertAbout.run(
      'expertises',
      "Domaines d'expertise",
      JSON.stringify([
        "Génie Électrique et Gestion de l'Énergie : du Composant au Système",
        "Ingénierie des Plasmas",
        "Haute Fréquence et Optique : de l'Électromagnétisme au Système",
        "Nano Ingénierie et Intégration, Monitoring",
        "Micro et Nano Bio Technologies",
        "Radio Physique et Imagerie Médicale",
        "Ingénierie pour la santé et pour le vivant",
      ]),
      'list'
    )
    insertAbout.run(
      'chiffres',
      "Chiffres clés",
      JSON.stringify([
        { value: '250 à 300', label: "doctorant(e)s dont environ 40% internationaux" },
        { value: '309', label: "cadres scientifiques dont 170 HDR" },
        { value: '55 à 65', label: "diplômé(e)s les 3 dernières années" },
      ]),
      'keyvalue'
    )
    insertAbout.run(
      'unites',
      "Unités de Recherche de renom",
      JSON.stringify({
        grands: "LAPLACE, LAAS, OLIMPES (ONERA-Équipes ISAE SUPAERO)\nONCOPOLE - CRCT (Imagerie Cérébrale et Handicaps Neurologiques) - TONIC",
        autres: "LPCNO, CEMES, LGP, IRAP",
      }),
      'richtext'
    )
  })

  const insertResource = db.prepare(
    'INSERT INTO resources (title, category, type, date, size, url, content) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )

  const seedResources = db.transaction(() => {
    insertResource.run(
      "Charte des thèses de l'Université de Toulouse",
      'Réglementation', 'pdf', 'Mars 2023', '1.2 MB', '',
      "Charte encadrant les droits et devoirs des doctorants et de leurs directeurs de thèse au sein de l'Université de Toulouse."
    )
    insertResource.run(
      'Guide de la soutenance de thèse',
      'Soutenance', 'texte', 'Janvier 2024', '15 KB', '',
      "Procédure de soutenance :\n1. Désignation des rapporteurs (2 mois avant).\n2. Dépôt du manuscrit en ligne.\n3. Retour des pré-rapports (14 jours avant).\n4. Jour de la soutenance (présentation, questions, délibération).\n5. Dépôt définitif avec les corrections demandées par le jury."
    )
    insertResource.run(
      "Formulaire d'enregistrement du CSI",
      'Suivi', 'pdf', 'Février 2024', '450 KB', '',
      "Formulaire type pour le rapport du Comité de Suivi Individuel. Ce document doit être rempli et signé par tous les membres du CSI et remis au secrétariat lors de la demande de réinscription."
    )
    insertResource.run(
      "Procédure d'inscription en 1ère année",
      'Inscription', 'texte', 'Septembre 2023', '12 KB', '',
      "Pour vous inscrire en 1ère année de doctorat :\n- Avoir validé un diplôme de master (ou équivalent reconnu).\n- Avoir l'accord d'un directeur de thèse rattaché à l'une de nos équipes.\n- Bénéficier d'un financement assuré pour au moins 3 ans.\n- Créer et renseigner votre dossier sur ADUM avant la date limite."
    )
    insertResource.run(
      'Liste des formations transversales éligibles',
      'Formation', 'pdf', 'Novembre 2023', '2.1 MB', '',
      "Catalogue complet des formations transversales. Rappel : les doctorants doivent valider au moins 100 heures de formations dont une formation obligatoire à l'éthique de la recherche."
    )
    insertResource.run(
      'Vade-Mecum du doctorant GEETS',
      'Général', 'texte', 'Octobre 2023', '18 KB', '',
      "Le Vade-Mecum répond aux questions pratiques du doctorant dès son arrivée :\n- Horaires et accès aux locaux\n- Utilisation des ressources informatiques\n- Congés et absences\n- Organisation des déplacements et missions\n- Obligations en matière de publication et d'affiliation"
    )
  })

  const insertFaqCat = db.prepare(
    'INSERT INTO faq_categories (title, position) VALUES (?, ?)'
  )
  const insertFaqQ = db.prepare(
    'INSERT INTO faq_questions (category_id, question, answer, position) VALUES (?, ?, ?, ?)'
  )

  const seedFaq = db.transaction(() => {
    const cat1 = insertFaqCat.run('Questions fréquentes Doctorants', 0)
    insertFaqQ.run(cat1.lastInsertRowid, "Comment s'inscrire en thèse ?", "L'inscription en thèse se fait via la plateforme ADUM après accord du directeur de thèse et du directeur de laboratoire. Vous devez remplir votre dossier en ligne et fournir les pièces demandées.", 0)
    insertFaqQ.run(cat1.lastInsertRowid, "Quelles sont les conditions de financement ?", "L'inscription en doctorat à plein temps nécessite un financement minimum de 3 ans (contrat doctoral, bourse CIFRE, etc.). Les doctorants salariés à temps plein pour autre chose peuvent faire une thèse à temps partiel.", 1)
    insertFaqQ.run(cat1.lastInsertRowid, "Comment organiser ma soutenance ?", "La procédure de soutenance doit être initiée au moins 2 à 3 mois avant la date prévue dans votre espace ADUM. Vous devrez y renseigner vos rapporteurs, votre jury et soumettre votre manuscrit.", 2)
    insertFaqQ.run(cat1.lastInsertRowid, "Qu'est-ce que le CSI (Comité de Suivi Individuel) ?", "Le CSI s'assure du bon déroulement de votre thèse. Il est obligatoire chaque année pour votre réinscription. Vous devez organiser une réunion avec ses membres et fournir le compte-rendu signé.", 3)
    insertFaqQ.run(cat1.lastInsertRowid, "Combien d'heures de formation dois-je valider ?", "Chaque doctorant doit valider 100 heures de formation au cours de sa thèse (scientifiques et transversales) dont l'éthique de la recherche avant sa soutenance.", 4)

    const cat2 = insertFaqCat.run('Questions fréquentes Permanents', 1)
    insertFaqQ.run(cat2.lastInsertRowid, "Comment proposer un sujet de thèse ?", "Les propositions de sujets se font via l'espace ADUM. Vous devez être titulaire d'une HDR ou demander une dérogation temporelle pour diriger vos travaux.", 0)
    insertFaqQ.run(cat2.lastInsertRowid, "Comment obtenir l'Habilitation à Diriger des Recherches (HDR) ?", "Le dossier de demande d'autorisation à concourir pour l'HDR doit être déposé auprès du conseil académique de l'établissement concerné. L'ED GEETS émettra un avis sur ce dossier.", 1)
    insertFaqQ.run(cat2.lastInsertRowid, "Comment organiser une soutenance en tant que directeur ?", "Le directeur de thèse propose les rapporteurs et la composition du jury dans l'espace ADUM du doctorant. Assurez-vous que les règles de parité et de proportion de membres extérieurs sont respectées.", 2)
  })

  if (newsCount.count === 0) seedNews()
  if (agendaCount.count === 0) seedAgenda()
  if (statsCount.count === 0) seedStats()
  if (aboutCount.count === 0) seedAbout()
  if (resourcesCount.count === 0) seedResources()
  if (faqCount.count === 0) seedFaq()
}
