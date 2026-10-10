// K-009 Sichtbarkeit: läuft im <head> vor dem ersten Rendern (CSP erlaubt Inline-Skripte).
// Setzt die Startklasse nur bei erlaubter Bewegung. Meldet sich das Bewegungsmodul nicht
// innerhalb von 2 s (Skript fehlt oder lädt zu langsam), fällt die Klasse weg und alles ist sichtbar.
export const KOPF_SKRIPT = `(function(){try{var d=document.documentElement;if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('k-bewegung');setTimeout(function(){if(!window.__kBewegung)d.classList.remove('k-bewegung')},2000)}catch(e){}})();`;
