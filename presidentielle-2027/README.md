# Boussole 2027

Comparateur de programmes pour la présidentielle 2027, en un fichier HTML sans
serveur. Les propositions viennent du
[comparateur de la Fondation iFRAP](https://www.ifrap.org/comparateurs/presidentielles-2027)
(1 164 propositions, 32 sujets regroupés en 10 thèmes, 20 personnalités).

Ouvrez `index.html` dans un navigateur. Les choix restent dans le navigateur
(stockage local).

## Parcours

Le parcours se fait **thème par thème** (10 thèmes, 32 sujets).

1. **Choisir** : sujet par sujet, cochez les propositions qui vous conviennent.
   Les auteurs sont cachés et l'ordre est mélangé, pour choisir sur le fond.
2. **Terminer le thème** : pour chaque sujet où plusieurs idées ont été
   retenues, notez l'importance de chacune de 1 à 5 (une idée non notée
   compte 3). Vous obtenez aussitôt **votre orientation sur ce thème** :
   position gauche–droite, les trois personnalités les plus proches et vos
   idées avec leur auteur.
3. **Pré-orientation** : accessible dès deux thèmes terminés, c'est le bilan
   provisoire (classement, spectre, récapitulatif) calculé sur les seuls thèmes
   terminés. Un bandeau rappelle les thèmes restants, car la tendance peut
   encore beaucoup changer. On peut y choisir de terminer sans parcourir les
   thèmes restants.
4. **Résultats** (une fois les dix thèmes terminés ou écartés) :
   - les cinq personnalités les plus représentées, avec leur part de vos choix
     pondérés et la part de leur programme que vous avez retenue ;
   - votre position thème par thème sur l'axe gauche–droite (moyenne pondérée
     des positions des auteurs de vos idées, avec l'écart entre l'auteur le plus
     à gauche et le plus à droite), plus une vue tableau ;
   - le récapitulatif des thèmes, sujets et idées retenus, avec leur note et
     leur auteur ;
   - **votre carte d'identité politique**, rédigée par Claude à partir de vos
     choix (clé API Anthropic à saisir ; modèle par défaut `claude-fable-5-1`).
     Cette dernière étape appelle directement `api.anthropic.com` depuis le
     navigateur : elle fonctionne quand la page est ouverte en local ou servie
     depuis un hébergement qui autorise les appels sortants.

## Fichiers

- `index.html` : l'application.
- `data.js` : les propositions, généré par le script ci-dessous.
- `extraire-donnees.mjs` : extraction depuis la page iFRAP (Node 18+) :

  ```sh
  node extraire-donnees.mjs            # télécharge la page
  node extraire-donnees.mjs page.html  # ou à partir d'une copie locale
  ```

  Le script contient aussi la table `POSITIONS` qui place chaque personnalité
  sur l'axe gauche (−10) / droite (+10). C'est une échelle indicative propre à
  cet outil, pas une donnée iFRAP : ajustez-la puis relancez le script.
