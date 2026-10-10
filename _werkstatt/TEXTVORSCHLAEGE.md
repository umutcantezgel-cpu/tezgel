# TEXTVORSCHLAEGE

TEXTE-Regel: Mikrotexte (Knöpfe, Labels, Badges/Etiketten, Alt-Texte, Zustands- und Fehlermeldungen) ändere ich direkt und protokolliere sie unter „Direkt geändert“ mit Fundstelle, alt → neu. Überschriften und Fließtexte stehen hier nur als Vorschlag. Getestete Namen (Liste in `berichte/E0-KUN-05-qualitaet.md`, Abschnitt 2) bleiben unverändert.

## Direkt geändert (Mikrotexte)
| Paket | Fundstelle | alt | neu | Grund |
|---|---|---|---|---|
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | Icon mit `aria-label="Verifizierter Kunde"` | (entfällt) | nicht belegbare Zusicherung (Leitplanke Wahrheit) |
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | 5 Stern-Icons (aria-hidden) und Fußzeile „{Quelle} Rezension“ | „{Bewertung} von 5“ in Mono, Etikett „{Quelle} · {Thema}“ | Maß statt Behauptung (K-003) |
| E2-ORCH-04 | `src/components/reviews/ReviewCard.tsx` | – | Randnotiz „→ Ablauf 02 · Material & Fugenbild“ u. a. (`src/lib/stimmen.ts`) | Vertrauensschicht K-001; Texte aus den Ablaufschritten in `company.js` |
| E2-ORCH-04 | `src/components/ui/FinalCTA.tsx` | Knopftext „WhatsApp“ (nur ab sm sichtbar) | „Per WhatsApp schreiben“ | Knöpfe sagen, was passiert (K-009); aria-label unverändert |
| E2-ORCH-04 | `src/components/ui/FAQAccordion.tsx` | Fragezeichen-Icon vor jeder Frage | (entfällt) | Zierrat ohne Information |

## Vorschläge (Überschriften, Fließtext)
_noch keine_
