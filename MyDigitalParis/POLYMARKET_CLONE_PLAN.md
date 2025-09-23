# Application Mobile Clone Polymarket - Plan Simplifié

## Vue d'ensemble du projet

Cette application mobile permet aux utilisateurs de créer et participer à des marchés de prédiction avec deux types de paris : normaux (Oui/Non) et à choix multiples.

## Stack technique

- **Framework** : React Native avec Expo
- **Langage** : TypeScript
- **Styling** : Tailwind CSS (NativeWind)
- **Plateforme** : Cross-platform (iOS/Android)

## Navigation par onglets

L'application utilise une navigation par onglets en bas de l'écran avec 5 onglets principaux :

- **🏠 Accueil** : Feed principal des marchés de paris actifs
- **🏆 Classement** : Top des utilisateurs et performeurs
- **🔍 Recherche** : Trouver des marchés spécifiques avec filtres
- **⚡ Tendances** : Marchés tendance et urgents
- **➕ Ajouter Pari** : Créer de nouveaux marchés de prédiction

## Types de paris

1. **Paris Normaux** : Résultats binaires Oui/Non
2. **Paris à Choix Multiples** : Plusieurs options de résultats

---

## Onglets et leur contenu

### 1. Onglet Accueil (HomeScreen)
**Contenu :**
- Liste des marchés de paris actifs
- Filtres par catégorie (Sport, Politique, Crypto, Divertissement)
- Actualisation par glissement
- Interface de pari rapide

**Composants nécessaires :**
- BetCard (carte de pari)
- CategoryFilter (filtre de catégorie)
- QuickBetModal (modal de pari rapide)

### 2. Onglet Recherche (SearchScreen)
**Contenu :**
- Barre de recherche en temps réel
- Filtres par catégorie et statut
- Options de tri (nouveau, fin prochaine, populaire, volume élevé)
- Historique de recherche

**Composants nécessaires :**
- SearchBar (barre de recherche)
- FilterModal (modal de filtres)
- SearchResultsList (liste des résultats)

### 3. Onglet Tendances (BreakingScreen)
**Contenu :**
- Marchés tendance (basés sur les changements de volume)
- Marchés récemment créés
- Marchés se terminant dans les 24h
- Marchés à fort volume

**Composants nécessaires :**
- TrendingIndicator (indicateur de tendance)
- TimeRemaining (temps restant)
- VolumeChart (graphique de volume)

### 4. Onglet Classement (LeaderboardScreen)
**Contenu :**
- Top 100 des utilisateurs par profit
- Filtre par période (quotidien, hebdomadaire, mensuel, tout)
- Affichage des statistiques utilisateur
- Indicateurs de changement de rang

**Composants nécessaires :**
- UserRankCard (carte de rang utilisateur)
- TimeFilter (filtre de temps)
- StatsDisplay (affichage des stats)

### 5. Onglet Ajouter Pari (AddBetScreen)
**Contenu :**
- Formulaire de création de pari
- Saisie de question avec limite de caractères
- Sélection de catégorie
- Sélecteur de date de fin
- Basculer entre normal et choix multiple
- Gestion dynamique des options pour choix multiple

**Composants nécessaires :**
- BetForm (formulaire de pari)
- CategoryPicker (sélecteur de catégorie)
- DatePicker (sélecteur de date)
- OptionManager (gestionnaire d'options)

## Écrans supplémentaires (navigation par stack)

Ces écrans sont accessibles en naviguant depuis les onglets principaux :

### 6. Écran Connexion (LoginScreen)
**Contenu :**
- Formulaire de connexion (email/mot de passe)
- Bouton "Se connecter"
- Lien vers l'écran d'inscription
- Option "Mot de passe oublié"
- Connexion avec réseaux sociaux (optionnel)

**Composants nécessaires :**
- LoginForm (formulaire de connexion)
- SocialLoginButtons (boutons réseaux sociaux)
- ForgotPasswordLink (lien mot de passe oublié)

### 7. Écran Inscription (RegisterScreen)
**Contenu :**
- Formulaire d'inscription (nom, email, mot de passe, confirmation)
- Validation des champs en temps réel
- Conditions d'utilisation à accepter
- Bouton "S'inscrire"
- Lien vers l'écran de connexion

**Composants nécessaires :**
- RegisterForm (formulaire d'inscription)
- PasswordStrengthIndicator (indicateur de force du mot de passe)
- TermsCheckbox (case à cocher conditions)

### 8. Écran Détails du Pari (BetDetailsScreen)
**Contenu :**
- Informations détaillées du marché
- Volume de paris dans le temps
- Liste des participants
- Détails de résolution du marché

**Composants nécessaires :**
- BetDetails (détails du pari)
- ParticipantsList (liste des participants)
- ResolutionInfo (info de résolution)

### 9. Écran Profil (ProfileScreen)
**Contenu :**
- Affichage du solde actuel
- Historique des paris avec pagination
- Suivi des paris actifs
- Statistiques de profit/perte

**Composants nécessaires :**
- BalanceCard (carte de solde)
- BetHistoryList (liste historique des paris)
- StatsChart (graphique des stats)

---

## Composants principaux

### Composants communs
- Button (bouton)
- Card (carte)
- Input (champ de saisie)
- LoadingSpinner (indicateur de chargement)

### Composants de paris
- BetCard (carte de pari)
- MultichoiceBetCard (carte de pari à choix multiples)
- QuickBetModal (modal de pari rapide)
- OddsDisplay (affichage des cotes)

### Composants d'interface
- CategoryFilter (filtre de catégorie)
- SearchBar (barre de recherche)
- TabBar (barre d'onglets)

### Composants d'authentification
- LoginForm (formulaire de connexion)
- RegisterForm (formulaire d'inscription)
- SocialLoginButtons (boutons réseaux sociaux)
- PasswordStrengthIndicator (indicateur de force du mot de passe)
- TermsCheckbox (case à cocher conditions)

---

## Structure des fichiers

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── LoadingSpinner.tsx
│   ├── bets/
│   │   ├── BetCard.tsx
│   │   ├── MultichoiceBetCard.tsx
│   │   ├── BetDetails.tsx
│   │   └── QuickBetModal.tsx
│   ├── navigation/
│   │   └── TabBar.tsx
│   └── ui/
│       ├── CategoryFilter.tsx
│       ├── SearchBar.tsx
│       ├── OddsDisplay.tsx
│       └── auth/
│           ├── LoginForm.tsx
│           ├── RegisterForm.tsx
│           ├── SocialLoginButtons.tsx
│           ├── PasswordStrengthIndicator.tsx
│           └── TermsCheckbox.tsx
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── SearchScreen.tsx
│   ├── BreakingScreen.tsx
│   ├── AddBetScreen.tsx
│   ├── BetDetailsScreen.tsx
│   └── ProfileScreen.tsx
├── context/
│   ├── AppContext.tsx
│   └── types.ts
├── hooks/
│   ├── useBets.ts
│   ├── useUser.ts
│   ├── useAuth.ts
│   └── useStorage.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── storage.ts
├── types/
│   └── index.ts
├── navigation/
│   ├── AppNavigator.tsx (Navigation principale avec onglets)
│   ├── TabNavigator.tsx (Navigation par onglets)
│   ├── AuthNavigator.tsx (Navigation d'authentification)
│   └── types.ts
└── assets/
    ├── images/
    └── icons/
```
