// Zwei Kopfskripte für zwei Dokumente. Beide setzen html.k-bewegung vor dem ersten Rendern, aber nur ohne Wunsch nach
// reduzierter Bewegung; sie unterscheiden sich im Notaus, weil die beiden Bewegungsmodule sich verschieden melden.

// Aktives Dokument (Gruppe (bestand), KERN v2, bewegung.css + BewegungsWaechter):
// Meldet sich das Bewegungsmodul (html.k-modul) nicht binnen 2 s, setzt es html.k-notaus – dann gelten keine
// Startzustände und alles ist sichtbar (KERN K-007).
export const KOPFSKRIPT = `(function(){var d=document.documentElement;try{if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('k-bewegung');setTimeout(function(){if(!d.classList.contains('k-modul'))d.classList.add('k-notaus');},2000);}catch(e){d.classList.add('k-notaus');}})();`;

// Ruhendes Dokument (Gruppe (kern), kern.css + BewegungsRegie):
// K-009 Sichtbarkeit: läuft im <head> vor dem ersten Rendern (CSP erlaubt Inline-Skripte).
// Setzt die Startklasse nur bei erlaubter Bewegung. Meldet sich das Bewegungsmodul nicht
// innerhalb von 2 s (Skript fehlt oder lädt zu langsam), fällt die Klasse weg und alles ist sichtbar.
export const KOPF_SKRIPT = `(function(){try{var d=document.documentElement;if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('k-bewegung');setTimeout(function(){if(!window.__kBewegung)d.classList.remove('k-bewegung')},2000)}catch(e){}})();`;
