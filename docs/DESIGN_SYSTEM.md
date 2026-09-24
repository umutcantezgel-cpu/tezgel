# Fliesenverlegung Tezgel – Design System „Clean Architectural Ceramic Light“

Helles, keramisch-klares Designsystem für tezgel.de: weiße und Alabaster-Flächen, Schiefer-Typografie,
Smaragd als Primärakzent, Ceramic Sky für Wasser/Abdichtung und Bernstein für Bewertungen.

## 1. Tokens & Theme

- **Rohe Tokens**: `src/styles/tokens.css` (`:root`) – Canvas, Slate, Mint, Sky, Amber, Glas, Schatten,
  Kompatibilitäts-Aliase (`--color-brand-primary`, `--color-button-*` usw.). Radius-Tokens heißen
  `--radius-ceramic-*`, damit Tailwinds eigene `rounded-*`-Skala unverändert bleibt.
- **Tailwind-Theme**: `src/app/globals.css` (`@theme`) – `primary-50…900` (Smaragd), `secondary-50…900`
  (Sky), `font-sans` (Inter), `font-display`/`font-heading` (Plus Jakarta Sans).

## 2. Farben & Kontrast (WCAG)

| Rolle | Wert | Einsatz |
|---|---|---|
| Canvas | `#FFFFFF`, `#F8FAFC`, `#F1F5F9` | Seiten- und Kartenflächen |
| Überschriften | `slate-900` | H1–H4 |
| Fließtext | `slate-700` / Meta `slate-600` | Nie `slate-400/500` für Text |
| Primär-CTA | `#047857` → Hover `#065F46` | Weiße Schrift (≥ 5,5 : 1) |
| Links | `emerald-800` / `sky-800` | Interaktiver Text |
| Akzente | `#059669`, `#10B981`, `#0284C7`, `#38BDF8` | Nur Icons, Rahmen, Glows |
| Sterne | `amber-500` | Bewertungen; Text in `amber-800` |

## 3. Bausteine (`globals.css`, `@layer components`)

- `ceramic-hero` / `ceramic-band` – helle Hero-Panels bzw. Vollbreiten-Bänder mit Mint/Sky-Glasur
- `eyebrow` (+ `eyebrow-sky`, `eyebrow-neutral`, `eyebrow-amber`) – All-Caps-Micro-Badges
- `btn-primary`, `btn-ghost` – Pill-CTAs mit Hover-Lift und Fokusring
- `glass-surface`, `glass-surface-subtle`, `glass-bezel-outer/inner`, `glass-pill` – Frosted-Glass-Karten
- `icon-chip` – Icon-Kachel, die bei `.group:hover` smaragdgrün glasiert
- `text-ceramic-gradient` – Verlaufstext für Schlüsselbegriffe in Überschriften
- `prose-ceramic` – Typografie für Ratgeber- und Rechtstexte
- `ambient-glow-mint|sky|slate` – dekorative Glow-Flächen

Referenzumsetzungen: `src/app/page.tsx`, `src/components/sections/QualityPromise.jsx`,
`src/components/common/Footer.jsx`, `src/components/funnels/TezgelAnfrageFunnel.tsx`.

## 4. Formensprache & Interaktion

- Karten `rounded-2xl` bis `rounded-[2rem]`, Pills `rounded-full`
- Hover: `hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300`
- Fokus: sichtbarer Smaragd-Outline (global in `globals.css`), `prefers-reduced-motion` wird respektiert

## 5. Marke

- Logo: `public/images/logo/tezgel-logo.svg` (Wortmarke), `tezgel-mark.svg` (Fliesen-Signet), Favicon
  `src/app/icon.svg`
- Stammdaten ausschließlich aus `src/config/company.js`; Kundenbewertungen aus `src/config/reviews.js`
