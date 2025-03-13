```
# Probrandon

## Description
Probrandon est une application web conçue pour gérer efficacement les commandes, les produits et les utilisateurs. Elle fournit une API robuste pour gérer diverses opérations liées aux fonctionnalités de commerce électronique.

## Fonctionnalités
- Authentification et autorisation des utilisateurs
- Gestion des commandes
- Gestion des produits
- Validation des entrées et gestion des erreurs

## Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- TypeScript (version 4 ou supérieure)
- MongoDB (ou toute autre base de données configurée)

### Étapes
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Brareyesb15/Probrandon.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd Probrandon
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Configurez les paramètres de la base de données dans `src/config/database.ts`.

## Utilisation
Pour démarrer l'application, exécutez la commande suivante :
```bash
npm start
```
Le serveur démarrera sur le port configuré (par défaut 3000).

### Points de terminaison API
- **Routes Utilisateur**
  - `POST /api/users` - Créer un nouvel utilisateur
  - `GET /api/users` - Récupérer tous les utilisateurs
- **Routes Produit**
  - `POST /api/products` - Ajouter un nouveau produit
  - `GET /api/products` - Récupérer tous les produits
- **Routes Commande**
  - `POST /api/orders` - Créer une nouvelle commande
  - `GET /api/orders` - Récupérer toutes les commandes

## Middleware
L'application inclut des middleware pour :
- Authentification (`src/middleware/auth.middleware.ts`)
- Gestion des erreurs (`src/middleware/error.middleware.ts`)
- Validation des entrées (`src/middleware/validation.middleware.ts`)

## Contribuer
Les contributions sont les bienvenues ! Veuillez suivre ces étapes :
1. Forkez le dépôt.
2. Créez une nouvelle branche (`git checkout -b feature/VotreFonctionnalité`).
3. Apportez vos modifications et validez-les (`git commit -m 'Ajoutez une fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/VotreFonctionnalité`).
5. Ouvrez une demande de tirage.

## Licence
Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
```