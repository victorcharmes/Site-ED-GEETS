# Bienvenue sur le projet Site-ED-GEETS

Tu as été ajouté comme collaborateur sur le repo GitHub. Voici comment t'installer et commencer à bosser.

---

## 1 — Prérequis

- Avoir un compte GitHub (et avoir accepté l'invitation reçue par mail)
- Avoir Git installé sur ta machine : [git-scm.com/downloads](https://git-scm.com/downloads)
- Avoir Node.js installé : [nodejs.org](https://nodejs.org)

Pour vérifier :

```bash
git --version
node --version
npm --version
```

---

## 2 — Configurer Git (une seule fois)

```bash
git config --global user.name "Ton Prénom Nom"
git config --global user.email "ton-email@exemple.com"
```

> Utilise la même adresse mail que ton compte GitHub.

---

## 3 — Cloner le projet

```bash
git clone https://github.com/victorcharmes/Site-ED-GEETS.git
cd Site-ED-GEETS
```

---

## 4 — Se placer sur la branche develop

La branche `develop` est la branche principale de travail. On ne travaille **jamais directement sur `main`**.

```bash
git checkout develop
git pull origin develop
```

---

## 5 — Installer les dépendances

```bash
npm install
```

Pour lancer le site en local :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173` (ou le port indiqué dans le terminal).

---

## 6 — Créer ta première feature

### 6.1 — Créer ta branche

```bash
git checkout develop => se placer dans la branche develop
git pull origin develop => prendre les dernières mise à jours de cette branche
git checkout -b feature/nom-de-ta-feature => créer et se placer dans la nouvelle branche, où on va taffer, on est donc dans develop/feature/nom-de-ta-feature
```

Exemples de noms de branche :
- `feature/page-accueil`
- `feature/formulaire-contact`
- `fix/bug-header`

### 6.2 — Coder et commiter

```bash
# Après chaque avancée :
git add . => ajoute tout le fichier courant
git commit -m "feat: description courte de ce que tu as fait"
=> commit + commentaire

```

Préfixes à utiliser dans les messages de commit :

| Préfixe     | Quand l'utiliser                    |
|-------------|-------------------------------------|
| `feat:`     | Nouvelle fonctionnalité             |
| `fix:`      | Correction de bug                   |
| `style:`    | CSS, mise en forme                  |
| `docs:`     | Documentation                       |
| `chore:`    | Config, dépendances                 |

### 6.3 — Pusher ta branche

```bash
git push -u origin feature/nom-de-ta-feature
=> push dans la branche crée 
```

### 6.4 — Ouvrir une Pull Request

1. Va sur [github.com/victorcharmes/Site-ED-GEETS](https://github.com/victorcharmes/Site-ED-GEETS)
2. Tu verras un bandeau jaune proposant de créer une PR → clique dessus
3. Vérifie que c'est bien `feature/ta-branche` → `develop`
4. Décris ce que tu as fait
5. Clique **Create pull request**

Ensuite, un autre membre review ton code et merge la PR.

---

## 7 — Récupérer le travail des autres

Quand quelqu'un a mergé une feature :

```bash
git checkout develop
git pull origin develop
```

---

## 8 — Résoudre un conflit (si ça arrive)

Si Git te dit qu'il y a un conflit après un `git pull origin develop` :

1. Ouvre les fichiers marqués en conflit
2. Tu verras des blocs comme ça :

```
<<<<<<< HEAD
  ton code
=======
  le code des autres
>>>>>>> develop
```

3. Garde le bon code, supprime les marqueurs `<<<`, `===`, `>>>`
4. Puis :

```bash
git add .
git commit -m "fix: résolution de conflit"
git push
```

---

## 9 — Commandes utiles au quotidien

```bash
git status                        # voir où tu en es
git log --oneline --graph --all   # voir l'historique
git branch                        # voir tes branches locales
git checkout develop              # revenir sur develop
git pull origin develop           # récupérer les dernières modifs
git stash                         # mettre ton travail de côté temporairement
git stash pop                     # récupérer le travail mis de côté
```

---

## Règles du projet

1. **Ne jamais pusher directement sur `main` ou `develop`** — toujours passer par une branche + PR
2. **Toujours partir d'un `develop` à jour** avant de créer une branche
3. **Un commit = une étape logique**, pas tout d'un coup à la fin
4. **Nommer ses branches clairement** : `feature/...` ou `fix/...`
