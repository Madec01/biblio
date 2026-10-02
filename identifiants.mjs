// Identifiants durables des propositions et des groupes : indépendants de l'ordre d'extraction.
// Proposition : <sujet>-<auteur>-<empreinte du texte>. Groupe : g-<sujet>-<empreinte du titre>.
// Si l'iFRAP modifie le texte d'une proposition, son identifiant change : la réponse associée
// devient « non résolue » et est signalée, jamais rattachée au hasard.
export const fnv = (s) => { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return (x >>> 0).toString(36).padStart(7, "0"); };
const norm = (t) => t.normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
export const idOf = (sub, cand, text) => `${sub}-${cand}-${fnv(norm(text))}`;
export const groupIdOf = (sub, title) => `g-${sub}-${fnv(norm(title))}`;
