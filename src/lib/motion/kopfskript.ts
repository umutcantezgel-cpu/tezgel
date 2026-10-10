// Inline-Skript für <head>: setzt html.k-bewegung vor dem ersten Rendern, aber nur ohne Wunsch nach
// reduzierter Bewegung. Meldet sich das Bewegungsmodul (html.k-modul) nicht binnen 2 s, setzt es
// html.k-notaus – dann gelten keine Startzustände und alles ist sichtbar (KERN K-007).
export const KOPFSKRIPT = `(function(){var d=document.documentElement;try{if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('k-bewegung');setTimeout(function(){if(!d.classList.contains('k-modul'))d.classList.add('k-notaus');},2000);}catch(e){d.classList.add('k-notaus');}})();`;
