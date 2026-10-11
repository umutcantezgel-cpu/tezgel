// Kopf Variante B: liest Navigation und Kontakt aus den eingefrorenen Konfigurationen (`@/config/navigation`,
// `@/config/company`) und formt daraus serialisierbare Daten für die Client-Teile. Nur auf dem Server importieren
// (Kopf.tsx, Vorschau) – so landen Städte- und Themenlisten nicht im Client-Bündel. Kein Eintrag fällt weg, keiner kommt hinzu.
import { navigationLinks, primaryCta } from '@/config/navigation';
import { COMPANY_DATA } from '@/config/company';
import type { Eintrag, Kontakt, Ziel } from '@/components/kern/kopf-b/modell';

type RohPunkt = { name: string; path: string; desc?: string };
type RohKategorie = { category: string; items: RohPunkt[] };
type RohEintrag = {
  name: string;
  path: string;
  description?: string;
  submenu?: RohKategorie[];
  featured?: { eyebrow: string; title: string; text: string; cta: { label: string; path: string } };
};

export function kopfEintraege(): Eintrag[] {
  return (navigationLinks as RohEintrag[]).map((link) => {
    let lauf = 0;
    return {
      name: link.name,
      pfad: link.path,
      beschreibung: link.description ?? '',
      kategorien: (link.submenu ?? []).map((kat) => ({
        titel: kat.category,
        punkte: kat.items.map((p) => {
          lauf += 1;
          return { name: p.name, pfad: p.path, beschreibung: p.desc, nr: lauf };
        }),
      })),
      hervorhebung: link.featured
        ? {
            etikett: link.featured.eyebrow,
            titel: link.featured.title,
            text: link.featured.text,
            ziel: { name: link.featured.cta.label, pfad: link.featured.cta.path },
          }
        : undefined,
    };
  });
}

export function kopfKontakt(): Kontakt {
  const c = COMPANY_DATA.contact;
  return {
    telefon: c.phone,
    telefonLink: c.phoneLink,
    whatsapp: c.whatsapp,
    whatsappNummer: c.whatsappNumber,
    whatsappLink: c.whatsappLink,
    zeiten: COMPANY_DATA.hours.formattedWeekdays,
  };
}

/** Ziel des Hauptknopfs bleibt `primaryCta.path` (/kontakt); die Beschriftung kommt aus TEXT.hauptknopf (K-012). */
export function kopfAnfrage(): Ziel {
  return { name: primaryCta.name, pfad: primaryCta.path };
}
