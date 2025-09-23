# Application Mobile Clone Polymarket - Plan Simplifié

## Vue d'ensemble du projet

Cette application mobile permet aux utilisateurs de créer et participer à des marchés de prédiction avec deux types de paris : normaux (Oui/Non) et à choix multiples.

## Stack technique

- **Framework** : React Native avec Expo
- **Langage** : TypeScript
- **Styling** : Tailwind CSS (NativeWind)
- **Thèmes** : Mode sombre et clair
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
- Paramètres de l'application
- Basculement mode sombre/clair
- Bouton de déconnexion

**Composants nécessaires :**
- BalanceCard (carte de solde)
- BetHistoryList (liste historique des paris)
- StatsChart (graphique des stats)
- SettingsSection (section paramètres)
- ThemeToggle (basculement de thème)

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

### Composants de thème
- ThemeToggle (basculement mode sombre/clair)
- SettingsSection (section paramètres)
- ThemeProvider (fournisseur de thème)

---

## Structure des fichiers

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── Input/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── Text/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── Icon/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   └── Spinner/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── molecules/
│   │   ├── Card/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── SearchBar/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── FilterButton/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── OddsDisplay/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   └── ThemeToggle/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── organisms/
│   │   ├── Header/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── TabBar/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── BetCard/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── BetForm/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── LoginForm/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── RegisterForm/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   └── UserProfile/
│   │       ├── index.tsx
│   │       └── types.ts
│   └── templates/
│       ├── AuthLayout/
│       │   ├── index.tsx
│       │   └── types.ts
│       ├── MainLayout/
│       │   ├── index.tsx
│       │   └── types.ts
│       └── ModalLayout/
│           ├── index.tsx
│           └── types.ts
├── screens/
│   ├── Auth/
│   │   ├── LoginScreen/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   └── RegisterScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── Home/
│   │   └── HomeScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── Search/
│   │   └── SearchScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── Leaderboard/
│   │   └── LeaderboardScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── Trending/
│   │   └── TrendingScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── CreateBet/
│   │   └── CreateBetScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── Profile/
│   │   └── ProfileScreen/
│   │       ├── index.tsx
│   │       └── types.ts
│   └── Shared/
│       └── BetDetailsScreen/
│           ├── index.tsx
│           └── types.ts
├── navigation/
│   ├── AppNavigator/
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── TabNavigator/
│   │   ├── index.tsx
│   │   └── types.ts
│   └── AuthNavigator/
│       ├── index.tsx
│       └── types.ts
├── services/
│   ├── api/
│   │   ├── auth.ts
│   │   ├── bets.ts
│   │   ├── users.ts
│   │   └── index.ts
│   ├── storage/
│   │   ├── async-storage.ts
│   │   ├── secure-storage.ts
│   │   └── index.ts
│   └── notifications/
│       ├── push-notifications.ts
│       └── index.ts
├── hooks/
│   ├── common/
│   │   ├── useStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useAsync.ts
│   ├── auth/
│   │   ├── useAuth.ts
│   │   └── useUser.ts
│   ├── bets/
│   │   ├── useBets.ts
│   │   ├── useBetDetails.ts
│   │   └── useCreateBet.ts
│   └── theme/
│       └── useTheme.ts
├── context/
│   ├── providers/
│   │   ├── AppProvider.tsx
│   │   ├── AuthProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   └── types/
│       ├── app.ts
│       ├── auth.ts
│       ├── theme.ts
│       └── index.ts
├── utils/
│   ├── helpers/
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   ├── calculations.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── sizes.ts
│   │   ├── routes.ts
│   │   └── index.ts
│   └── config/
│       ├── app.ts
│       ├── theme.ts
│       └── index.ts
├── types/
│   ├── global/
│   │   ├── common.ts
│   │   ├── navigation.ts
│   │   └── index.ts
│   ├── entities/
│   │   ├── user.ts
│   │   ├── bet.ts
│   │   ├── market.ts
│   │   └── index.ts
│   └── api/
│       ├── requests.ts
│       ├── responses.ts
│       └── index.ts
└── assets/
    ├── images/
    │   ├── icons/
    │   ├── logos/
    │   └── illustrations/
    ├── fonts/
    └── data/
        └── mock-data.ts
```
