# Biblio

Bibliothèque de documents liés, en un seul fichier HTML. Chaque document est une
fiche (nom, référence, groupe, note) reliée à tous les documents qui le
concernent. Une carte dessine ces relations, regroupées par grandes familles
(Qualité, Préparation, Équipe commune, CNPE, Mode Op / CA, etc.).

Aucun serveur, aucune dépendance : ouvrez `index.html` dans un navigateur.
Les données restent dans le navigateur (stockage local) et peuvent être
exportées ou importées en JSON.

## Utilisation

### Fiches

- **Nouveau document** (bouton en haut, ou touche `N`) : nom, référence, groupe,
  note facultative, puis les documents liés.
- **Lier un document** : tapez un nom ou une référence dans le champ
  « Lier un document ». Si le document n'existe pas encore, l'option
  « Créer … et le lier » l'ajoute à la base sans quitter la fiche.
  Flèche bas dans le champ vide affiche les documents récemment modifiés.
- Les fiches existantes s'enregistrent automatiquement à chaque modification.
- Cliquer sur un document lié ouvre sa fiche ; « Retour à … » revient en arrière.
- **Dupliquer** (bas de la fiche) crée une copie du document avec tous ses
  liens, et ouvre la copie prête à renommer. Pratique pour une nouvelle version
  ou un document jumeau.
- L'index à gauche filtre par groupe ou « Sans lien », et cherche par nom ou
  référence (`Ctrl K`).

### Carte

- Chaque document est un nœud, coloré par groupe ; sa taille suit son nombre
  de liens. Les groupes forment des territoires nommés.
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
  propose ses sous-groupes pour affiner.
- Sur la carte, chaque sous-groupe forme un territoire dessiné à l'intérieur
  de celui de son grand groupe ; la légende permet de masquer l'un ou l'autre.

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
| `1` / `2` | Vue Fiches / Carte |
| `Échap` | Fermer le tiroir, annuler la création |

## Format des données

```json
{
  "version": 1,
  "groups": [
    { "id": "g_equipe", "name": "Équipe commune", "color": "#6a4d9c" },
    { "id": "g_ec_base", "name": "Base documentaire EC", "color": "#9d88ba", "parent": "g_equipe" }
  ],
  "docs":   [{ "id": "d…", "name": "Manuel qualité", "ref": "MQ-001", "group": "g_qualite", "note": "" }],
  "links":  [{ "a": "d…", "b": "d…" }]
}
```

Les liens sont non orientés : un lien de A vers B apparaît sur les deux fiches.
Un groupe avec `parent` est un sous-groupe de ce grand groupe (un seul niveau).

## Hébergement

Le fichier fonctionne ouvert localement (`file://`) ou déposé sur n'importe quel
hébergement statique, par exemple GitHub Pages. Les polices Google sont
facultatives : sans réseau, des polices système prennent le relais.
