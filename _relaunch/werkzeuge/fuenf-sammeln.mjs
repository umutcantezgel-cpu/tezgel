// Fünf-Sekunden-Probe (PROBELAUF §8): sammelt die rohen Antworten aus dem Workflow-Journal.
// Nutzung: node fuenf-sammeln.mjs <journal.jsonl> <zuordnung.json> <ausgabe.json> [<server>]
import fs from 'node:fs';
const [, , journal, zuordnung, ausgabe, server = ''] = process.argv;
const zeilen = fs.readFileSync(journal, 'utf8').split('\n').filter(Boolean).map((z) => JSON.parse(z));
const label = Object.fromEntries(zeilen.filter((z) => z.type === 'started').map((z) => [z.agentId, z.label]));
const antworten = zeilen.filter((z) => z.type === 'result' && z.result).map((z) => {
  const [bild, durchgang] = label[z.agentId].split('#');
  return { bild, durchgang: Number(durchgang), ...z.result };
}).sort((a, b) => a.bild.localeCompare(b.bild) || a.durchgang - b.durchgang);
const z = JSON.parse(fs.readFileSync(zuordnung, 'utf8'));
fs.writeFileSync(ausgabe, JSON.stringify({ protokoll: 'PROBELAUF §8', server, einwilligung: 'erstbesuch', erstbetrachter: 'je Bild 5 frische Haiku-Agenten', zuordnung: z, antworten }, null, 1));
console.log(antworten.length, 'Antworten →', ausgabe);
