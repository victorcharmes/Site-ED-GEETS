# Site ED GEETS

Site de l'École Doctorale Génie Électrique, Électronique, Télécommunications et Santé (Université de Toulouse).

## Stack — SERN

| Lettre | Techno | Rôle |
|--------|--------|------|
| S | SQLite + better-sqlite3 | Base de données |
| E | Express | Serveur API REST |
| R | React 19 + Vite | Interface utilisateur |
| N | Node.js | Runtime serveur |

## Architecture

```
Site-ED-GEETS/
├── client/                        ← Frontend React
│   ├── src/
│   │   ├── components/            ← Composants réutilisables
│   │   ├── pages/                 ← Une page par route
│   │   ├── context/               ← Contextes React (Admin…)
│   │   ├── hooks/                 ← Hooks personnalisés
│   │   ├── App.jsx                ← Routes (react-router-dom)
│   │   ├── main.jsx               ← Point d'entrée
│   │   └── index.css              ← Styles globaux + thèmes Tailwind
│   ├── public/
│   ├── vite.config.js             ← Proxy /api → localhost:3001
│   └── package.json
│
├── server/                        ← Backend Express
│   ├── routes/
│   │   ├── news.js                ← GET/POST/PUT/DELETE /api/news
│   │   └── agenda.js              ← GET/POST/PUT/DELETE /api/agenda
│   ├── db/
│   │   ├── database.js            ← Connexion SQLite + init
│   │   ├── schema.js              ← Schéma des tables
│   │   ├── seed.js                ← Données de départ
│   │   └── geets.sqlite           ← Fichier base de données (gitignore)
│   ├── index.js                   ← Serveur Express (port 3001)
│   └── package.json
│
├── .env                           ← Variables d'environnement
└── package.json                   ← Scripts racine
```

## Installation

```bash
# Cloner et se placer dans le dossier
git clone https://github.com/victorcharmes/Site-ED-GEETS.git
cd Site-ED-GEETS

# Installer toutes les dépendances (racine + client + server)
npm run install:all
```

## Lancer en développement

```bash
npm run dev
```

- Frontend : http://localhost:3000
- API : http://localhost:3001/api

## API disponible

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/news` | Liste toutes les actualités |
| POST | `/api/news` | Créer une actualité |
| PUT | `/api/news/:id` | Modifier une actualité |
| DELETE | `/api/news/:id` | Supprimer une actualité |
| GET | `/api/agenda` | Liste tous les événements |
| POST | `/api/agenda` | Créer un événement |
| PUT | `/api/agenda/:id` | Modifier un événement |
| DELETE | `/api/agenda/:id` | Supprimer un événement |
| GET | `/api/health` | Statut du serveur |

## Build production

```bash
npm run build   # génère client/dist/
```