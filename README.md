# portfolio_drToky

Projet final de Web 1 : portfolio vitrine de Dr Toky / Tokimahery Ramarozaka.

## Auteurs

- STD25003
- STD25014

## Important

Il est fortement recommande d'executer ce projet avec `Live Server` dans VS Code plutot que d'ouvrir directement les fichiers HTML dans le navigateur.

Cela permet d'eviter certains problemes de fonctionnement lies :
- aux fichiers JavaScript charges en type module
- aux restrictions du navigateur sur les fichiers locaux
- a certains elements integres qui peuvent mal s'afficher sans serveur local

## Description

Ce projet est un site web statique multi-pages qui presente le profil professionnel de Tokimahery Ramarozaka, ses services, ses cours, ses recherches, des articles de blog et des temoignages.

Le site met en avant plusieurs domaines :
- enseignement
- developpement
- recherche academique
- traduction
- collaboration professionnelle

## Pages du site

- `index.html` : page d'accueil et presentation generale
- `courses.html` : catalogue de cours avec recherche, filtres et panier
- `blog.html` : articles et contenus de blog
- `research.html` : section dediee a la recherche
- `testimonial.html` : temoignages et avis
- `getInTouch.html` : page de contact / collaboration

## Fonctionnalites

- navigation responsive desktop / mobile
- menu mobile
- recherche sur le site
- affichage dynamique de contenus via JavaScript
- catalogue de cours avec filtrage
- panier de selection de cours
- section temoignages
- structure simple en HTML, CSS et JavaScript

## Technologies utilisees

- HTML5
- CSS3
- JavaScript
- Tailwind CSS via CDN
- Font Awesome
- Google Fonts

## Structure du projet

```text
portfolio_drToky/
|- index.html
|- blog.html
|- courses.html
|- research.html
|- testimonial.html
|- getInTouch.html
|- style.css
|- tailwind.css
|- README.md
|- assets/
`- JS/
```

## Lancer le projet

Aucune installation n'est necessaire.

1. Telecharger ou cloner le projet
2. Ouvrir le dossier dans VS Code
3. Lancer `Live Server` depuis `index.html`

L'ouverture directe du fichier HTML dans le navigateur peut fonctionner partiellement, mais `Live Server` est la methode recommandee pour un comportement normal du site.



## Remarque

Le projet utilise plusieurs ressources chargees par CDN. Une connexion internet est donc recommandee pour afficher correctement les icones, les polices et Tailwind.
