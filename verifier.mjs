// Contrôle avant publication : identifiants, auteurs, explications, groupes, codage.
// Échoue (code 1) si une référence manque. Usage : node verifier.mjs
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { idOf, groupIdOf } from "./identifiants.mjs";
const here = dirname(fileURLToPath(import.meta.url));
const load = (f, name) => { if (!existsSync(join(here, f))) return null; const w = {}; new Function("window", readFileSync(join(here, f), "utf8"))(w); return w[name]; };
const D = load("data.js", "PROGRAMMES"), E = load("explications.js", "EXPLICATIONS") || {}, G = load("groupes.js", "GROUPES") || [], C = load("codage.js", "CODAGE");
const errors = [], warns = [];
const cands = new Set(D.candidates.map(c => c.id));
const ideas = new Map(), subOf = new Map();
D.themes.forEach(t => t.subs.forEach(s => s.ideas.forEach(i => {
  if (ideas.has(i.id)) errors.push("identifiant en double : " + i.id);
  ideas.set(i.id, i); subOf.set(i.id, s.id);
  if (!cands.has(i.c)) errors.push("auteur inconnu " + i.c + " pour " + i.id);
  if (!i.t || !i.t.trim()) errors.push("texte vide : " + i.id);
  const expected = idOf(s.id, i.c, i.t);
  if (i.id !== expected && !i.id.startsWith(expected + "-")) errors.push("identifiant non conforme : " + i.id + " attendu " + expected);
})));
Object.entries(D.legacy || {}).forEach(([o, n]) => { if (!ideas.has(n) && !G.some(g => g.id === n)) errors.push("correspondance legacy vers une cible absente : " + o + " → " + n); });
ideas.forEach((i, id) => { if (!E[id]) warns.push("explication manquante : " + id); });
Object.keys(E).forEach(id => { if (!ideas.has(id)) errors.push("explication orpheline : " + id); });
const inGroup = new Map(), gids = new Set();
G.forEach(g => {
  if (gids.has(g.id)) errors.push("groupe en double : " + g.id); gids.add(g.id);
  if (!g.t || !g.explication) warns.push("groupe sans titre ou explication : " + g.id);
  if (!Array.isArray(g.members) || g.members.length < 2) { errors.push("groupe de moins de deux membres : " + g.id); return; }
  const subs = new Set();
  g.members.forEach(m => { if (!ideas.has(m)) errors.push("membre inconnu " + m + " dans " + g.id); else { subs.add(subOf.get(m)); if (inGroup.has(m)) errors.push("membre " + m + " dans deux groupes : " + inGroup.get(m) + " et " + g.id); inGroup.set(m, g.id); } });
  if (subs.size > 1) errors.push("groupe " + g.id + " à cheval sur plusieurs sujets");
  const sub = [...subs][0]; if (sub && g.id !== groupIdOf(sub, g.t)) errors.push("identifiant de groupe non conforme : " + g.id);
});
if (C) {
  const AX = ["etat", "ordre", "societe", "europe", "ecologie"];
  const cards = [...ideas.keys()].filter(id => !inGroup.has(id)).concat(G.map(g => g.id));
  cards.forEach(id => { const c = C[id]; if (!c) { errors.push("codage manquant : " + id); return; }
    AX.forEach(a => { const v = c[a]; if (!Number.isInteger(v) || v < -2 || v > 2) errors.push("codage hors bornes " + id + "." + a + " = " + v); }); });
  Object.keys(C).forEach(id => { if (!ideas.has(id) && !gids.has(id)) errors.push("codage orphelin : " + id); });
}
console.log(`${ideas.size} propositions, ${G.length} groupes, ${Object.keys(E).length} explications${C ? ", " + Object.keys(C).length + " codages" : ""}`);
warns.slice(0, 20).forEach(w => console.warn("avertissement : " + w)); if (warns.length > 20) console.warn(`… ${warns.length - 20} autres avertissements`);
if (errors.length) { errors.slice(0, 30).forEach(e => console.error("ERREUR : " + e)); console.error(`${errors.length} erreur(s)`); process.exit(1); }
console.log("Contrôle OK");
