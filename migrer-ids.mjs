// Migration unique (octobre 2026) : remplace les identifiants numérotés (« 641-12 ») par des
// identifiants durables dérivés du sujet, de l'auteur et du texte, dans data.js, explications.js
// et groupes.js. La table de correspondance est conservée dans data.js (champ legacy) pour
// migrer les sauvegardes existantes.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { idOf, groupIdOf } from "./identifiants.mjs";
const here = dirname(fileURLToPath(import.meta.url));
const load = (f, name) => { const w = {}; new Function("window", readFileSync(join(here, f), "utf8"))(w); return w[name]; };
const D = load("data.js", "PROGRAMMES"), E = load("explications.js", "EXPLICATIONS"), G = load("groupes.js", "GROUPES");
const legacy = Object.assign({}, D.legacy || {});
const seen = new Set();
D.themes.forEach(t => t.subs.forEach(s => s.ideas.forEach(i => {
  const nid = idOf(s.id, i.c, i.t);
  if (seen.has(nid)) throw new Error("Collision d'identifiant : " + nid);
  seen.add(nid);
  if (nid !== i.id) legacy[i.id] = nid;
  i.id = nid;
})));
const E2 = {}; let lostE = 0;
Object.entries(E).forEach(([k, v]) => { const n = legacy[k] || k; if (seen.has(n)) E2[n] = v; else lostE++; });
G.forEach(g => {
  g.members = g.members.map(m => legacy[m] || m).filter(m => seen.has(m));
  const sub = g.members[0].split("-")[0];
  const nid = groupIdOf(sub, g.t);
  if (nid !== g.id) legacy[g.id] = nid;
  g.id = nid;
});
D.legacy = legacy;
writeFileSync(join(here, "data.js"), "// Généré par extraire-donnees.mjs — source : " + D.source + "\nwindow.PROGRAMMES = " + JSON.stringify(D) + ";\n");
writeFileSync(join(here, "explications.js"), "// Explications en langage courant, une par proposition (clé = id de la proposition dans data.js).\n// Rédigées par Claude pour cet outil ; neutres, sans mention de l'auteur. Régénérer si data.js change.\nwindow.EXPLICATIONS = " + JSON.stringify(E2) + ";\n");
writeFileSync(join(here, "groupes.js"), "// Idées regroupées : une même mesure portée par plusieurs propositions (souvent plusieurs personnalités).\n// members = id des propositions de data.js ; t = formulation commune ; explication en langage courant.\nwindow.GROUPES = " + JSON.stringify(G) + ";\n");
console.log(`${seen.size} propositions migrées, ${Object.keys(legacy).length} correspondances, ${Object.keys(E2).length} explications (${lostE} perdues), ${G.length} groupes`);
