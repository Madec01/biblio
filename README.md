# Biblio

Bibliothèque de documents liés, en un seul fichier HTML. Chaque document est une
fiche (nom, référence, groupe, note) reliée à tous les documents qui le
concernent. Une carte dessine ces relations, regroupées par grandes familles
(Qualité, Préparation, Équipe commune, CNPE, Mode Op / CA, etc.).

Aucun serveur, aucune dépendance : ouvrez `index.html` dans un navigateur.
Les données restent dans le navigateur (stockage local) et peuvent être
exportées ou importées en JSON.

## Utilisation

### Accueil

- Vue opérationnelle avec recherche directe, compteurs, références à vérifier,
  documents récemment modifiés, parcours et documents sans relation.
- Un clic sur un résultat ouvre immédiatement sa fiche.

### Fiches

- **Nouveau document** (bouton en haut, ou touche `N`) : nom, référence, groupe,
  note facultative, puis les documents liés.
- **Lier un document** : tapez un nom ou une référence dans le champ
  « Lier un document ». Si le document n'existe pas encore, l'option
  « Créer … et le lier » l'ajoute à la base sans quitter la fiche.
  Flèche bas dans le champ vide affiche les documents récemment modifiés.
- Avant de choisir le document, sélectionnez la **nature de la relation** :
  lié à, nécessite, produit, s’applique à, remplace ou justifie. Les relations
  orientées sont reformulées automatiquement depuis l’autre document.
- Chaque fiche peut préciser son **type**, son **statut**, sa **version / indice**
  et ses **mots-clés**. La référence reste l’identifiant opérationnel à copier
  dans l’application documentaire professionnelle.
- Les fiches existantes s'enregistrent automatiquement à chaque modification.
- Cliquer sur un document lié ouvre sa fiche ; « Retour à … » revient en arrière.
- **Dupliquer** (bas de la fiche) crée une copie du document avec tous ses
  liens, et ouvre la copie prête à renommer. Pratique pour une nouvelle version
  ou un document jumeau.
- L'index à gauche filtre par groupe ou « Sans lien », et cherche par nom ou
  référence (`Ctrl K`). La recherche couvre aussi les notes, types, statuts,
  versions, mots-clés et groupes. Deux filtres rapides ciblent type et statut.
- Une référence déjà utilisée est signalée afin de limiter les doublons.
- **Référence vérifiée** mémorise la date du dernier contrôle manuel dans
  l'application professionnelle. **Analyser l'impact** remonte les documents
  susceptibles d'être affectés par une modification.
- Une relation peut recevoir une importance (informative, recommandée,
  obligatoire ou conditionnelle) et une note de contexte.

### Parcours documentaires

- Un parcours ordonne les références utilisées pour une activité, de la
  préparation à l'archivage.
- Les étapes peuvent être déplacées, rendues obligatoires ou facultatives et
  recevoir une consigne propre au parcours.

### Carte

- Chaque document est un nœud, coloré par groupe ; sa taille suit son nombre
  de liens. Les groupes forment des territoires nommés.
- Chaque nœud porte sa référence et son titre (replié sur deux lignes, tronqué
  s'il est très long). Quand la place manque, les documents les plus liés
  gardent leur titre et les autres n'affichent que leur référence : zoomez
  pour tout voir. Le survol montre toujours le titre complet.
- Molette pour zoomer, glisser pour déplacer, glisser un nœud pour le placer.
- Clic sur un nœud : tiroir de détail avec ses liens. Double-clic : ouvre la fiche.
- **Voisinage** (dans le tiroir) : n'affiche que le document et ses liens à
  1 ou 2 niveaux, pour retrouver rapidement ce qui gravite autour.
- La légende masque ou affiche un groupe. « Par groupe » ou « Libre » change la
  disposition ; « Réorganiser » relance la mise en place.
- Depuis une fiche, « Voir sur la carte » centre la carte sur le document et
  isole son voisinage.

### Groupes et sous-groupes

- Les **grands groupes** (Qualité, Préparation, Équipe commune, CNPE,
  Mode Op / CA, Autre par défaut) sont les grandes familles de documents.
- Chaque grand groupe peut contenir des **sous-groupes**, par exemple une base
  de documents propre à l'équipe commune. Un document appartient soit au grand
  groupe (« Général »), soit à l'un de ses sous-groupes.
- Sur la fiche, choisissez d'abord le grand groupe ; s'il a des sous-groupes,
  une seconde rangée apparaît pour préciser.
- Dans l'index, le filtre d'un grand groupe montre tous ses documents et
  propose ses sous-groupes. Choisir un sous-groupe le place en tête de liste
  et atténue le reste du grand groupe, qui reste visible.
- Un nouveau sous-groupe reçoit automatiquement une nuance de la couleur de
  son grand groupe (même teinte, luminosité différente), modifiable ensuite.
- Sur la carte, chaque sous-groupe forme un territoire dessiné à l'intérieur
  de celui de son grand groupe ; la légende permet de masquer l'un ou l'autre.

### Arbre des liens

- Troisième vue, façon arbre généalogique : un document racine en haut, ses
  documents liés en dessous, puis les leurs, sur 1 à 4 niveaux.
- Ouvrez-la depuis une fiche (« Arbre des liens »), depuis le tiroir de la
  carte, ou depuis l'onglet Arbre (touche `4`) en choisissant une racine.
- Chaque document n'apparaît qu'une fois, au niveau le plus proche de la
  racine. Le badge « ↺ n » signale des liens vers des documents déjà affichés
  ailleurs dans l'arbre ; « +n ▾ » signale des liens non déployés au dernier
  niveau.
- Cliquer sur un document le place à la racine (« ← » revient en arrière) ;
  le bouton « fiche » ouvre sa fiche. Les boutons − / + agrandissent ou
  réduisent l'arbre.
- Les branches peuvent être repliées individuellement. L'arbre se filtre par
  sens, type et importance de relation, et peut être imprimé ou exporté en PDF.
- L'affichage sépare visuellement trois niveaux : dépendances principales,
  guides/précisions et simples références associées. L'arbre peut également
  prendre un grand groupe ou un sous-groupe comme point de départ.

### Menu (⋯)

- **Gérer les groupes** : renommer, recolorer, ajouter ou supprimer un grand
  groupe, et ajouter un sous-groupe dans chacun (« + Sous-groupe dans … »).
  Supprimer un sous-groupe renvoie ses documents dans le grand groupe.
- **Exporter la base** : fichier `biblio-AAAA-MM-JJ.json` (sauvegarde ou partage).
- **Importer une base** : fusion (ajoute ce qui manque) ou remplacement.
- **Thème** : auto, clair ou sombre.
- **Charger un jeu d'exemple** : quelques fiches pour découvrir l'outil.

## Raccourcis

| Touche | Action |
| --- | --- |
| `N` | Nouveau document |
| `Ctrl K` | Recherche (index ou carte selon la vue) |
| `1` / `2` / `3` / `4` / `5` | Accueil / Fiches / Carte / Arbre / Parcours |
| `Échap` | Fermer le tiroir, annuler la création |

## Format des données

```json
{
  "version": 3,
  "groups": [
    { "id": "g_equipe", "name": "Équipe commune", "color": "#6a4d9c" },
    { "id": "g_ec_base", "name": "Base documentaire EC", "color": "#9d88ba", "parent": "g_equipe" }
  ],
  "docs":   [{ "id": "d…", "name": "Manuel qualité", "ref": "MQ-001", "group": "g_qualite", "type": "Référentiel", "status": "Applicable", "docVersion": "3", "tags": "qualité, organisation", "verifiedAt": 1789560000000, "note": "" }],
  "links":  [{ "a": "d…", "b": "d…", "type": "requires", "importance": "required", "note": "À contrôler avant intervention" }],
  "journeys": [{ "id": "j…", "name": "Préparer une intervention", "steps": [{ "docId": "d…", "required": true, "note": "" }] }]
}
```

Tous les liens apparaissent sur les deux fiches. Certains sont orientés : par
exemple « A nécessite B » devient « B est nécessaire à A » depuis la fiche B.
Les anciennes bases restent compatibles ; leurs liens deviennent « Est lié à ».
Un groupe avec `parent` est un sous-groupe de ce grand groupe (un seul niveau).

## Hébergement

Le fichier fonctionne ouvert localement (`file://`) ou déposé sur n'importe quel
hébergement statique, par exemple GitHub Pages. Les polices Google sont
facultatives : sans réseau, des polices système prennent le relais.
