# DSGVO & TTDSG Cookie Consent Banner

Ein rechtssicheres, voll funktionsfähiges Cookie-Consent-System für Next.js Projekte (App Router kompatibel).

## Struktur

Das System besteht aus drei Teilen:
1. **`lib/cookie-inventory.ts`**: Die Single Source of Truth (SSOT). Hier definierst du alle Cookies, Kategorien und Datenverarbeitungen deines Projekts.
2. **`hooks/useConsent.ts`**: Die Logik. Speichert den Consent-Status, verwaltet das Setzen/Löschen der Cookies und liest die Versionierung aus dem Inventory.
3. **`components/CookieConsent.tsx`**: Die Benutzeroberfläche. Enthält das Consent-Banner und das Einstellungs-Modal.

Alle projektspezifischen Farben wurden entfernt und durch Standard-Tailwind-Klassen (z.B. `bg-blue-600`, `text-gray-900`) ersetzt, damit das Banner sofort gut aussieht und du es leicht an das Branding deines neuen Projekts anpassen kannst.

## Installation

1. Kopiere den Ordner `lib` (oder die Datei darin) in dein `lib` Verzeichnis.
2. Kopiere den Ordner `hooks` in dein `hooks` Verzeichnis.
3. Kopiere den Ordner `components` in dein `components` Verzeichnis.
4. Öffne deine `app/layout.tsx` (oder den Root-Bereich deines Projekts) und füge das Banner ein:

```tsx
// WICHTIG: Dynamischer Import, da das Banner client-side Logik (Cookies) verwendet
import dynamic from "next/dynamic";

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
```

## Features anpassen

- **Backend-Tracking (Consent-Proof):** Im `useConsent.ts` Hook ist ein Beispiel-API-Call (`/api/consent-audit`) auskommentiert. Du kannst ihn reaktivieren, falls du die Einwilligungen in einer Datenbank protokollieren möchtest (Art. 7 Abs. 1 DSGVO).
- **Neue Cookies hinzufügen:** Öffne die `cookie-inventory.ts` und füge neue Cookies dem Array `COOKIE_INVENTORY` hinzu.
- **Widerruf im Footer:** Verlinke in deinem neuen Projekt irgendwo (z.B. im Footer) auf `#cookie-settings`. Das Banner öffnet sich dann automatisch wieder!
  Beispiel: `<a href="#cookie-settings">Cookie-Einstellungen</a>`
