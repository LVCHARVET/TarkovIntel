# Memopus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Introduction

Cette application Angular est un projet CRUD (Create, Read, Update, Delete) permettant de gérer une liste de cartes mémo sur l'univers d'Escape from Tarkov. Elle utilise Angular pour le frontend, json-server pour la gestion des cartes, colonnes, tags, user, et Bootstrap pour la mise en page et les composants interactifs.

## Choix technique

Bootstrap : j'ai intégré Bootstrap pour faciliter la création d'une interface utilisateur responsive et moderne, notamment pour les boutons, les cartes et les modales.

Modale : j'ai implémenté des modales pour la création de tag et de carte, pour la modification et la suppression des cartes. J'ai fais ce choix pour rendre ma page la plus réactive et interactive possible. J'ai voulu pousser un peu ma compréhension des modales par le biais de ce projet.

Components : je n'ai utilisé que deux components : login et home. J'ai décidé de laisser toute ma logique dans le component home pour plusieurs raison : 
- Favoriser le fonctionnement de mes modales, ainsi que centraliser les logiques similaires.
- Travailler par page en suivant le principe que je n'ai utilisé que des modales et que de ce fait nous restons sur cette page home.
- Le projet est petit et le fichier home.component.ts ne fait même pas 200 lignes, ce qui m'a conforté dans l'idée de ne pas créer des composants presque vide et d'éparpiller la logique.

J'ai pu me permettre cette structure car le projet ne s'étendra pas plus et que je voulais travailler sur les modales que je découvre.

Le choix le plus juditieux aurait surement était de faire plusieurs pages et plusieurs components dans ces pages, pour des raisons de maintenabilité et de progression de l'application.

## Prérequis

Avant de démarrer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js
- Angular CLI 
- Json-server

## Installation

1. Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/LVCHARVET/TarkovIntel.git
cd votre-repo
npm install
```

## Backend 

Attention à bien vous placer dans le répertoire qui contient le fichier db.json pour lancer le serveur :

```bash
npx json-server db.json
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## User 

Vous pouvez vous connecter à l'application en utilisant les identifiants suivant 
- Utilisateur : y
- Mot de passe : y

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
