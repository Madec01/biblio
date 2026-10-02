# Boussole 2027

> Ce dépôt hébergeait auparavant « Biblio » (bibliothèque de documents liés).
> Cette version reste consultable sous le tag `biblio-v1`.

Comparateur de programmes pour la présidentielle 2027, en un fichier HTML sans
serveur. Les propositions viennent du
[comparateur de la Fondation iFRAP](https://www.ifrap.org/comparateurs/presidentielles-2027)
(1 164 propositions, 32 sujets regroupés en 10 thèmes, 20 personnalités).

**En ligne : https://madec01.github.io/biblio/** (publié automatiquement depuis
`main` par GitHub Pages). Sur téléphone, l'application s'installe sur l'écran
d'accueil : bouton « Installer l'application » sur Android/Chrome, ou Partager →
« Sur l'écran d'accueil » sur iPhone. Elle fonctionne ensuite hors connexion.

Ouvrez sinon `index.html` dans un navigateur, sur ordinateur comme sur téléphone.
Les choix restent dans le navigateur (stockage local) ; le bouton
**Sauvegarder / restaurer** donne un code (ou un fichier) à coller sur un autre
appareil ou navigateur pour reprendre là où vous en étiez.

## Deux façons de répondre

Les deux modes alimentent les mêmes choix et les mêmes résultats ; on passe de
l'un à l'autre avec le bouton « Passer en mode swipe / pages ».

### Mode pages (ordinateur)

Une page d'accueil présente une carte par thème (10 thèmes, 32 sujets) avec
son état d'avancement. La page d'un thème empile tous ses sujets : on coche les
propositions qui conviennent (auteurs cachés, ordre mélangé, doublons regroupés
en « idées communes » créditant chacun de leurs auteurs), puis « Terminer ce
thème » : pondération + / ++ / +++ des idées retenues, et orientation du thème
(position gauche–droite, trois personnalités les plus proches, idées avec
auteur).

### Mode swipe (téléphone, par défaut sous 900 px)

Au premier lancement, deux réglages (périmètre et rythme), modifiables ensuite
dans « Options » ; l'accueil se réduit ensuite à un récapitulatif et un bouton
Continuer.

Une idée à l'écran à la fois : swipe à droite (ou ✓) = d'accord, à gauche
(ou ✕) = pas d'accord, vers le haut (ou ?) = pas sûr. Flèches du clavier
sur ordinateur, bouton « Annuler » pour le dernier swipe, explication en
langage courant sur la carte.

- **Périmètre** : *panaché* (idées au hasard dans tous les thèmes, tirage
  corrigé pour garder l'équilibre gauche–droite des dernières cartes et servir
  tous les thèmes, sans ordre prévisible) ou *par thème* (thème et sujets au
  choix, on arrête quand on veut).
- **Rythme** : objectif quotidien de 10 à 50 idées, avec dates estimées de fin
  (pré-orientation fiable à 15 idées par thème ; toutes les idées).
- **Pondération** : toutes les N idées jugées (5 à 20, réglable), un écran
  « Pause pondération » annonce le lot, puis une touche par idée pour affiner,
  cartes regroupées par type, avec l'explication ouverte. D'accord : **+** oui mais,
  **++** d'accord, **+++** essentiel ; pas d'accord : **−** non mais, **−−** pas
  d'accord, **−−−** hors de mes valeurs ; pas sûr : plutôt non / je ne sais
  pas du tout / plutôt oui, avec « remettre dans la pile » pour y revenir plus
  tard. Reportable à tout moment.

### Méthode

**Poids des réponses.** Chaque idée jugée reçoit un poids signé de −100 à +100 :
d'accord 60 / 80 / 100 (80 par défaut), pas d'accord en miroir, pas sûr ±30
selon la tendance et 0 sans avis (les idées « je ne sais pas du tout » sont
listées dans les résultats et peuvent être réexaminées). Une réponse
**tranchée** est un « d'accord » ou un « pas d'accord ».

**Positions (M01).** Elles ne dépendent pas des auteurs : chaque carte est codée
dans `codage.js` sur cinq axes, de −2 à +2, d'après le seul contenu de la mesure
(grille ci-dessous). La position gauche-droite d'une carte est la moyenne de ses
axes non nuls (×5, soit −10 à +10) ; celle d'un thème ou de l'ensemble est la
moyenne de ces positions pondérée par les poids signés : approuver une mesure
« de droite » tire vers la droite, la rejeter tire vers la gauche. Chaque axe se
calcule de même, uniquement sur les cartes qui le concernent.

| Axe | −2 | +2 |
| --- | --- | --- |
| `etat` Rôle de l'État | plus d'intervention, de dépense, de redistribution, d'impôts sur les plus aisés | moins d'État : baisse des dépenses et impôts, privatisation, concurrence, conditionnalité |
| `ordre` Ordre et libertés | plus de libertés, moins de répression, accueil, régularisation | plus d'autorité, sanctions, immigration restreinte, durcissement pénal |
| `societe` Société | progressisme : nouveaux droits, égalité, inclusion, participation | conservatisme : valeurs traditionnelles, famille, identité, mérite et discipline |
| `europe` Europe et monde | plus d'intégration européenne, de coopération, d'ouverture | souveraineté nationale, protectionnisme, sortie ou renégociation des traités |
| `ecologie` Écologie | priorité à la transition : normes, taxes, sobriété | assouplissement des contraintes environnementales au profit de la production |

0 = la mesure ne porte pas sur l'axe ; ±1 = orientation nette mais modérée. Le
codage a été rédigé par Claude pour cet outil ; `node verifier.mjs` contrôle
qu'il couvre toutes les cartes et mesure sa cohérence avec les positions
indicatives des auteurs (corrélation 0,85 à la première passe : les écarts
viennent surtout des programmes qui mêlent économie protectrice et droite
régalienne). Les positions indicatives par personnalité (`POSITIONS` dans
`extraire-donnees.mjs`) ne servent plus qu'au repère « famille » affiché à côté
du parti et au taux d'accord par famille.

**Proximités (M02).** Une personnalité est classée par son **taux d'accord
pondéré** sur ses idées que vous avez vues et tranchées (poids positifs sur
poids en valeur absolue), jamais par une somme de points : publier beaucoup de
propositions n'est pas un bonus. Il faut au moins 5 idées comparées (3 en
pré-orientation) ; en dessous, la personnalité est listée à part comme « pas
encore comparable ». Le nombre d'idées comparées et la part du programme vue
sont affichés.

**Incertitude (M03).** Une position (thème, ensemble, axe) est **indéterminée**
sous 5 réponses tranchées : quinze « pas sûr » ne donnent ni « Centre » ni
« consolidé ». Chaque thème porte un état fondé sur les réponses tranchées :
indéterminé / en cours / consolidé (15 réponses tranchées, ou 60 % des cartes
pour les thèmes plus petits) / exploré (toutes les cartes vues). L'estimation de
date sur l'accueil utilise ces mêmes cibles. Le profil est « en construction »
sous 10 réponses tranchées.

**Identifiants (F02).** Chaque proposition est identifiée par sujet, auteur et
empreinte de son texte (`identifiants.mjs`), un groupe par sujet et empreinte de
son titre. Si l'iFRAP modifie une proposition, elle change d'identifiant : la
réponse associée devient « non résolue », conservée dans la sauvegarde, signalée
à l'accueil, jamais rattachée au hasard. `data.js` garde une table `legacy` pour
migrer les sauvegardes antérieures à octobre 2026.

### Pré-orientation et résultats

- **Pré-orientation** : dès 20 idées jugées ou deux thèmes terminés ; bilan
  provisoire avec les thèmes encore fragiles. Chaque personnalité du classement
  (et des « plus éloignés ») déplie la liste de ses idées que vous avez jugées,
  avec leur marque. Le récapitulatif par thème se replie et se filtre par thème
  et sujet. On peut « terminer maintenant ».
- **Résultats** : cinq personnalités les plus proches, spectre par thème (plus
  vue tableau), récapitulatif des idées aimées et rejetées avec auteurs, et
  **carte d'identité politique** rédigée par Claude (clé API Anthropic à
  saisir ; modèle par défaut `claude-fable-5-1`). Cette dernière étape appelle
  `api.anthropic.com` depuis le navigateur : elle fonctionne quand la page est
  ouverte en local ou servie depuis un hébergement qui autorise les appels
  sortants.
- **Repères politiques** : six familles décrites de façon neutre (sans nommer
  de candidat), un lexique des termes courants, et la grille indicative de
  l'outil dans une section repliée.

## Mise à jour des données

Les programmes évoluent au fil des déclarations. Une routine Claude mensuelle
(le 1er de chaque mois) relance l'extraction, compare avec `data.js` et, en cas
de changement, ouvre une pull request avec le détail (propositions ajoutées,
nouvelles personnalités à positionner). Hors routine : `node
extraire-donnees.mjs` puis relecture de `POSITIONS` si une personnalité est
apparue. La page signale elle-même des données de plus de 45 jours.

### Profil politique et carte d'identité (calcul local)

À partir des idées jugées, l'application calcule un profil (par exemple « Libéral progressiste », « Gauche populaire et souverainiste », « Transversal, hors des camps ») en croisant les axes de contenu (rôle de l'État d'un côté ; ordre, société, Europe et écologie de l'autre) et le taux d'accord avec chaque famille politique. Le profil s'affiche dans la pré-orientation et les résultats ; le bouton « Créer ma carte d'identité politique » rassemble profil, axes, familles, personnalités les plus proches et les plus éloignées. Seuls les thèmes abordés comptent. La carte rédigée par Claude (clé API) reste disponible dans les résultats finaux.

Le bouton « Mettre à jour l'application » (accueil et menu) vide le cache hors connexion et recharge la dernière version publiée.

## Fichiers

- `index.html` : l'application.
- `manifest.webmanifest`, `sw.js`, `icons/` : installation sur téléphone (PWA)
  et fonctionnement hors connexion. Changer `CACHE` dans `sw.js` à chaque
  version qui doit remplacer le cache des utilisateurs.
- `.github/workflows/pages.yml` : publication sur GitHub Pages à chaque push sur
  `main`.
- `data.js` : les propositions, généré par le script ci-dessous (avec la table
  `legacy` des anciens identifiants).
- `groupes.js` : idées communes à plusieurs personnalités (une carte pour
  plusieurs propositions). `codage.js` : codage de contenu des 977 cartes sur
  cinq axes (section Méthode).
- `identifiants.mjs` : calcul des identifiants durables ; `migrer-ids.mjs` :
  migration unique d'octobre 2026 ; `verifier.mjs` : contrôle avant publication
  (identifiants, auteurs, explications, groupes, codage), exécuté par le
  workflow Pages.
- `explications.js` : une explication par proposition, rédigée par Claude
  (neutre, sans auteur). À compléter pour les propositions ajoutées lors d'une
  mise à jour.
- `extraire-donnees.mjs` : extraction depuis la page iFRAP (Node 18+) :

  ```sh
  node extraire-donnees.mjs            # télécharge la page
  node extraire-donnees.mjs page.html  # ou à partir d'une copie locale
  ```

  Le script contient aussi la table `POSITIONS` qui place chaque personnalité
  sur l'axe gauche (−10) / droite (+10). C'est une échelle indicative propre à
  cet outil, pas une donnée iFRAP : ajustez-la puis relancez le script.
