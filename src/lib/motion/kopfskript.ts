import { CONSENT_COOKIE_NAME, CONSENT_VERSION } from '@/lib/cookie-inventory';
import { EINGANG_ABBRUCH, EINGANG_GRENZE, KLASSE_EINGANG, KLASSE_WIEDERKEHR, SPEICHER_EINGANG } from '@/lib/intro/ablauf';
import { BEWEGUNG_ATTRIBUT, BEWEGUNG_SPEICHER } from './schalter';

// Zwei Kopfskripte für zwei Dokumente. Beide setzen html.k-bewegung vor dem ersten Rendern, aber nur ohne Wunsch nach
// reduzierter Bewegung; sie unterscheiden sich im Notaus, weil die beiden Bewegungsmodule sich verschieden melden.

// Aktives Dokument (Gruppe (bestand), KERN v2, bewegung.css + BewegungsWaechter):
// Meldet sich das Bewegungsmodul (html.k-modul) nicht binnen 2 s, setzt es html.k-notaus – dann gelten keine
// Startzustände und alles ist sichtbar (KERN K-007).
// Bewegungsschalter (UM-E3-MOD, E-080): Ist „ruhig“ gewählt (localStorage), setzt es html[data-bewegung="ruhig"] und keine
// Startklasse – wie bei reduzierter Bewegung; dann gibt es auch keinen Eingang.
//
// Eingang ohne Vorhang (E-067-4, UM-E3-EIN; ersetzt Intro B-02 und den Belag des Startbilds): Nur mit k-bewegung setzt es
// html.k-eingang, beim ersten Aufruf im Besuch (Merker im sessionStorage, sofort gesetzt) ohne, danach mit
// html.k-wiederkehr (nur Zeilenmasken, kürzer; ebenso, wenn der Speicher nicht lesbar ist). Der Ablauf läuft als CSS ab dem
// ersten Bild (bewegung.css); das Skript setzt nur Klassen. Jeder Tipp, Klick, Tastendruck, Scroll oder jedes Mausrad nimmt
// beide Klassen sofort weg (Lauscher passiv, once, capture), spätestens das Zeitlimit: danach gilt der Endzustand. Lauscher
// und Zeitlimit stehen vor den Klassen, damit ein Fehler dort keinen Eingang ohne Ende hinterlässt; das Notaus bleibt der
// letzte Zeitgeber. B-01 nimmt beim ersten Seitenwechsel weiter k-startbild, k-intro-start und k-intro-sig weg (E-078,
// eingefroren); die Klassen gibt es nicht mehr, das läuft folgenlos ins Leere.
const EINGANG = `try{var w=1;try{var s=window.sessionStorage;w=s.getItem(${JSON.stringify(SPEICHER_EINGANG)})?1:0;s.setItem(${JSON.stringify(SPEICHER_EINGANG)},'1')}catch(e){w=1}var aus=0,ende=function(){if(aus)return;aus=1;d.classList.remove(${JSON.stringify(KLASSE_EINGANG)});d.classList.remove(${JSON.stringify(KLASSE_WIEDERKEHR)})};${JSON.stringify(EINGANG_ABBRUCH)}.forEach(function(n){window.addEventListener(n,ende,{passive:true,once:true,capture:true})});setTimeout(ende,${EINGANG_GRENZE});d.classList.add(${JSON.stringify(KLASSE_EINGANG)});if(w)d.classList.add(${JSON.stringify(KLASSE_WIEDERKEHR)})}catch(e){}`;

const BEWEGUNG_BESTAND = `var ruhig=0;try{ruhig=window.localStorage.getItem(${JSON.stringify(BEWEGUNG_SPEICHER)})==='ruhig'}catch(e){}if(ruhig)d.setAttribute(${JSON.stringify(BEWEGUNG_ATTRIBUT)},'ruhig');try{if(ruhig||!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('k-bewegung');${EINGANG}setTimeout(function(){if(!d.classList.contains('k-modul'))d.classList.add('k-notaus');},2000);}catch(e){d.classList.add('k-notaus');}`;

export const KOPFSKRIPT = `(function(){var d=document.documentElement;${BEWEGUNG_BESTAND}})();`;

// Ruhendes Dokument (Gruppe (kern), kern.css + BewegungsRegie): Inline-Kopfskript des Kern-Layouts, läuft im <head> vor dem ersten Rendern (CSP erlaubt Inline-Skripte).
// Zwei unabhängige Teile, jeder in eigenem try – ein Fehler im einen hält den anderen nicht auf.
//
// 1. Einwilligungsbanner (P4-13, E-033 Weg C): Ist keine gültige Entscheidung gespeichert, steht `data-k-banner="offen"`
//    schon vor dem ersten Bild am <html>. Platz am Seitenende und scroll-padding für den Banner kommen dann aus festen
//    Werten in `src/styles/kern.css`; nach dem Laden ändert sich der Stil von <html> nicht mehr (vorher volle
//    Stilneuberechnung beim Erscheinen des Banners, P4-12). Entfernt wird das Attribut erst durch eine Wahl im Banner.
//    Nur lesend: Cookie und Version wie `readConsentCookie` + `useConsent` (`@/hooks/useConsent`) – erster Eintrag mit dem
//    Namen, Wert URI-dekodiert, JSON, gültig nur mit derselben Version; Fehler gelten als „keine Entscheidung“. Name und
//    Version stammen aus derselben Quelle (`@/lib/cookie-inventory`). Ohne JavaScript läuft nichts davon: kein Banner,
//    kein Platz. Läuft nur dieses Skript, die App aber nicht (ein Skript aus /_next/ lädt nicht), fällt das Attribut
//    wieder weg, solange der Banner noch nicht eingehängt ist (`window.__kBanner`, gesetzt in `Banner.tsx`) – sonst bliebe
//    Platz für einen Banner reserviert, der nie erscheint. Bricht die App ohne Ladefehler ab (Laufzeitfehler bei der
//    Hydrierung), bleibt der Platz am Seitenende leer stehen; Inhalt und Links sind davon nicht betroffen (Rückgabe P4-13).
// 2. K-009 Sichtbarkeit: Startklasse nur bei erlaubter Bewegung. Meldet sich das Bewegungsmodul nicht innerhalb von 2 s
//    (Skript fehlt oder lädt zu langsam), fällt die Klasse weg und alles ist sichtbar.
const EINWILLIGUNG = `try{var c=document.cookie.split('; '),p=${JSON.stringify(`${CONSENT_COOKIE_NAME}=`)},w=null;for(var i=0;i<c.length;i++){if(c[i].indexOf(p)===0){try{w=JSON.parse(decodeURIComponent(c[i].split('=').slice(1).join('=')))}catch(e){w=null}break}}if(!w||w.version!==${JSON.stringify(CONSENT_VERSION)}){d.setAttribute('data-k-banner','offen');window.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='SCRIPT'&&String(t.src).indexOf('/_next/')>-1&&!window.__kBanner)d.removeAttribute('data-k-banner')},true)}}catch(e){}`;

const BEWEGUNG = `try{if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('k-bewegung');setTimeout(function(){if(!window.__kBewegung)d.classList.remove('k-bewegung')},2000)}catch(e){}`;

export const KOPF_SKRIPT = `(function(){var d=document.documentElement;${EINWILLIGUNG}${BEWEGUNG}})();`;
