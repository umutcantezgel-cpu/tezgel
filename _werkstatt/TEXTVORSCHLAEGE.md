# TEXTVORSCHLAEGE

TEXTE-Regel: Mikrotexte (Knöpfe, Labels, Badges/Etiketten, Alt-Texte, Zustands- und Fehlermeldungen) ändere ich direkt und protokolliere sie unter „Direkt geändert“ mit Fundstelle, alt → neu. Überschriften und Fließtexte stehen hier nur als Vorschlag. Getestete Namen (Liste in `berichte/E0-KUN-05-qualitaet.md`, Abschnitt 2) bleiben unverändert.

## Direkt geändert (Mikrotexte)
| Paket | Fundstelle | alt | neu | Grund |
|---|---|---|---|---|
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | Icon mit `aria-label="Verifizierter Kunde"` | (entfällt) | nicht belegbare Zusicherung (Leitplanke Wahrheit) |
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | 5 Stern-Icons (aria-hidden) und Fußzeile „{Quelle} Rezension“ | „{Bewertung} von 5“ in Mono, Etikett „{Quelle} · {Thema}“ | Maß statt Behauptung (K-003) |
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | – | Randnotiz „→ Ablauf 02 · Material & Fugenbild“ u. a. (`src/lib/stimmen.ts`) | Vertrauensschicht K-001; Texte aus den Ablaufschritten in `company.js` |
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | Anfangsbuchstabe des Namens als Kreis-Bild; Zitat in geraden Anführungszeichen "…" | (entfällt); deutsche Anführungszeichen „…“ | Typografie K-006; Zitattext wörtlich, Lesefolge Name – Thema – Zitat – Quelle wie im Bestand |
| E2-ORCH-04 | `src/components/ui/FinalCTA.tsx` | Knopftext „WhatsApp“ (nur ab sm sichtbar) | „Per WhatsApp schreiben“ | Knöpfe sagen, was passiert (K-009); aria-label unverändert |
| E2-ORCH-04 | `src/components/ui/FAQAccordion.tsx` | Fragezeichen-Icon vor jeder Frage | (entfällt) | Zierrat ohne Information |
| E2-ORCH-05a | `src/components/common/Footer.jsx` | Linktext „Mobil & WhatsApp: 0172 / 67 28 504“ | „0172 / 67 28 504“ unter dem Etikett „Mobil & WhatsApp“ | Etikett steht im Schriftfeld darüber; aria-label unverändert |
| E2-ORCH-05a | `src/components/common/Footer.jsx` | „Fax: 06441 / 44 83 548“ | „06441 / 44 83 548“ unter dem Etikett „Fax“ | wie oben |
| E2-ORCH-05a | `src/components/common/Footer.jsx` | Icons vor Zusagen und Stammdaten (Award, ShieldCheck, Sparkles, Receipt, MapPin …) | Fugenkreuz bzw. Mono-Etiketten „Anschrift“, „Telefon“, „Mobil & WhatsApp“, „E-Mail“, „Fax“, „Zeiten“, „Betrieb seit 2008“ (aus COMPANY_DATA.business.establishmentYear) | Schriftfeld statt Icon-Liste (K-009) |
| E2-ORCH-05a | `src/components/common/Header.jsx` | WhatsApp-Symbolknopf im Kopf | (entfällt im Kopf) | gleichwertig vorhanden: flacher WhatsApp-Knopf `#whatsapp-floating-btn` (Desktop), untere Leiste (mobil), Menüblatt und Fuß |
| E2-ORCH-05a | `src/components/common/MobileMenu.jsx` | Kategorie-Schalter „Badsanierung …“ (ganze Zeile) | Zeile = Link zur Übersicht; Schalter rechts mit Namen „Badsanierung – Unterseiten öffnen/schließen“ | Übersicht auch vor der Hydrierung erreichbar (V-06) |
| E2-ORCH-05a | `src/components/common/Header.jsx` | Unterzeile „Fachbetrieb · Aßlar · Wetzlar“ immer sichtbar | bei 1280–1535 px ausgeblendet (Text bleibt im DOM); die Rufnummer bleibt ab 1024 px in Mono sichtbar | Kopfzeile passt sonst nicht neben die Navigation |
| E2-BAU-01 | `src/components/reviews/GoogleReviewsBadge.tsx` | „{Anzahl} verifizierte Google-Rezensionen“ | „{Anzahl} Google-Rezensionen“ | „verifiziert“ ist nicht belegbar (Leitplanke Wahrheit, wie ReviewCard) |
| E2-BAU-01 | `src/components/sections/QualityPromise.jsx` | Etikett „Punkt 01 … 08“ in Versalien (CSS) | gleiche Zeichen als Mono-Etikett ohne Versalien | Merkliste nach KERN K-009; Wortlaut unverändert |
| E2-BAU-02 | `src/components/kern/Hinweis.tsx` | (Hinweis ohne Titel: Art nur über Icon/Farbe) | unsichtbares Präfix „Hinweis:“, „Warnung:“, „Fehler:“, „Erledigt:“ (nur Screenreader) | Art nie allein über Farbe/Icon (WCAG 1.4.1, 1.1.1) |

## Vorschläge (Überschriften, Fließtext)
_noch keine_
