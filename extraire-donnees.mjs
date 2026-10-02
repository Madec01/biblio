// Extrait les propositions du comparateur IFRAP « Présidentielles 2027 »
// et écrit data.js (chargé par index.html).
//
// Usage :
//   node extraire-donnees.mjs                 # télécharge la page
//   node extraire-donnees.mjs page.html       # utilise une copie locale
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { existsSync } from "node:fs";
import { idOf } from "./identifiants.mjs";

const SOURCE = "https://www.ifrap.org/comparateurs/presidentielles-2027";
const here = dirname(fileURLToPath(import.meta.url));

// Position indicative de chaque personnalité sur l'axe gauche (-10) / droite (+10).
// Échelle éditoriale propre à cet outil, pas une donnée IFRAP : à ajuster librement.
const POSITIONS = {
  "Arthaud": -9.5, "Mélenchon": -7.5, "Roussel": -7, "Ruffin": -6.5,
  "Maurel": -6, "Tondelier": -5.5, "Guedj": -4.5, "Faure": -4,
  "Royal": -3.5, "Glucksmann": -3, "Hollande": -3, "Cazeneuve": -2.5,
  "Attal": 1.5, "Philippe": 3, "Bertrand": 4, "Lisnard": 5.5,
  "Retailleau": 6, "Dupont-Aignan": 7, "Le Pen": 7.5, "Zemmour": 9,
};

const html = process.argv[2]
  ? readFileSync(process.argv[2], "utf8")
  : await (await fetch(SOURCE, { headers: { "user-agent": "Mozilla/5.0" } })).text();

const start = html.indexOf("window.__NUXT__");
const end = html.indexOf("</script>", start);
if (start < 0) throw new Error("Données __NUXT__ introuvables dans la page");
const sandbox = { window: {} };
vm.runInNewContext(html.slice(start, end), sandbox);
const state = sandbox.window.__NUXT__.state.comparator;

const ENTITIES = { nbsp: " ", amp: "&", quot: '"', rsquo: "’", lsquo: "‘", laquo: "«", raquo: "»",
  hellip: "…", ndash: "–", mdash: "—", euro: "€", oelig: "œ", eacute: "é", egrave: "è", agrave: "à" };
const toText = (h) => h
  .replace(/<\/(p|li|div)>|<br\s*\/?>/gi, "\n")
  .replace(/<li[^>]*>/gi, "• ")
  .replace(/<[^>]+>/g, "")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&([a-z]+);/gi, (m, e) => ENTITIES[e.toLowerCase()] ?? m)
  .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");

const candidates = state.candidates.map((c) => {
  const last = c.last_name.trim();
  return {
    id: c.id, first: c.first_name.trim(), last,
    party: (c.political_party || "").trim(),
    photo: c.photo?.url || "",
    pos: POSITIONS[last] ?? 0,
  };
});

let n = 0;
const ids = new Set();
const themes = state.content.map((t) => ({
  id: t.id, name: t.name,
  subs: t.items.map((s) => ({
    id: s.id, name: s.name,
    ideas: s.items.flatMap((c) => (c.content.proposals || []).map((p) => {
      const text = toText(p.text); if (!text) return null;
      let id = idOf(s.id, c.id, text), k = 1;
      while (ids.has(id)) id = idOf(s.id, c.id, text) + "-" + (++k); // même texte répété chez le même auteur
      ids.add(id); n++;
      return { id, c: c.id, t: text };
    }).filter(Boolean)),
  })).filter((s) => s.ideas.length),
})).filter((t) => t.subs.length);

// Table de correspondance des anciens identifiants (sauvegardes antérieures) : on conserve
// celle du data.js précédent, limitée aux cibles encore présentes. Une proposition dont le
// texte a changé obtient un nouvel identifiant sans correspondance : la réponse sera signalée
// comme non résolue, jamais rattachée au hasard.
let legacy = {};
const prevPath = join(here, "data.js");
if (existsSync(prevPath)) {
  try { const w = {}; new Function("window", readFileSync(prevPath, "utf8"))(w);
    Object.entries(w.PROGRAMMES.legacy || {}).forEach(([o, nw]) => { if (ids.has(nw)) legacy[o] = nw; });
    const missing = []; w.PROGRAMMES.themes.forEach((t) => t.subs.forEach((s) => s.ideas.forEach((i) => { if (!ids.has(i.id)) missing.push(i.id); })));
    if (missing.length) console.warn(`${missing.length} proposition(s) de l'extraction précédente n'existent plus ou ont changé de texte : ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? "…" : ""}`);
  } catch (e) { console.warn("data.js précédent illisible, correspondances non reprises"); }
}

const data = { source: SOURCE, extractedAt: new Date().toISOString().slice(0, 10), candidates, themes, legacy };
writeFileSync(join(here, "data.js"),
  "// Généré par extraire-donnees.mjs — source : " + SOURCE + "\n" +
  "window.PROGRAMMES = " + JSON.stringify(data) + ";\n");
console.log(`${themes.length} thèmes, ${n} propositions, ${candidates.length} personnalités`);
