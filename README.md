# Refonte du site de l'ED GEETS

## Archi:
src
    components/                ← composants réutilisables sur tout le site
    pages/                     ← pages publiques (consultation)
    admin/                     ← pages admin (fonctionnalités CRUD)
    services/                  ← appels API vers le backend (si un backend est nécessaire)
    styles/                    ← fichiers CSS
    App.jsx                    ← React Router (toutes les routes, navigation)
    main.jsx                   ← point d'entrée

public
    logo.png  <- Logo de l'ED GEETS
