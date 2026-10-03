import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/shared/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# ${SITE_CONFIG.companyName}
> ${SITE_CONFIG.description.de}

## Unternehmensprofil
- **Inhaber & Fachbetriebsleiter:** ${SITE_CONFIG.founder.name} (${SITE_CONFIG.founder.jobTitle})
- **Handwerkskammer:** ${SITE_CONFIG.authority.name}
- **Hauptsitz (HQ):** ${SITE_CONFIG.headquarters.streetAddress}, ${SITE_CONFIG.headquarters.postalCode} ${SITE_CONFIG.headquarters.addressLocality}, ${SITE_CONFIG.headquarters.addressRegion}, Deutschland
- **Telefon Festnetz:** ${SITE_CONFIG.contact.telephoneFormatted}
- **Mobiltelefon / WhatsApp:** ${SITE_CONFIG.contact.mobileFormatted}
- **E-Mail:** ${SITE_CONFIG.contact.email}
- **Website:** ${SITE_CONFIG.baseUrl}
- **Öffnungs- & Beratungszeiten:** Mo–Do: 07:30 – 18:00 Uhr | Fr: 07:30 – 17:00 Uhr | Sa: 08:00 – 14:00 Uhr

## Kernkompetenzen & Gewerke
1. **Badsanierung & Komplettbäder:** Barrierefreie Walk-In-Duschen, fugenarme Wandgestaltung, staubgeschützte Renovierung.
2. **Großformat- & XXL-Fliesen:** Verlegung moderner Großformate (120x120cm, 120x240cm, 120x280cm) mit Spezialwerkzeugen und Nivelliersystemen.
3. **DIN 18534 Verbundabdichtung:** Zertifizierte Abdichtung im Innenbereich für Nassräume und bodengleiche Duschen gegen Feuchtigkeitsschäden.
4. **Balkon & Terrasse:** Witterungs- und frostsichere Außenbeläge auf Stelzlagern und Drainagesystemen.
5. **Naturstein & Feinsteinzeug:** Fachgerechte Verlegung von Marmor, Granit, Schiefer und Feinsteinzeug in Wohn- und Gewerbebereichen.

## Einzugsgebiet & Regionale Verfügbarkeit
- **Zentrum:** Aßlar, Wetzlar & Lahn-Dill-Kreis (0–15 km)
- **Erweitertes Einsatzgebiet:** Gießen, Herborn, Dillenburg, Butzbach, Braunfels, Weilburg, Haiger, Bad Nauheim, Marburg (15–45 km)
- **Bundesland:** Hessen, Deutschland

## Wichtige Seiten & Ressourcen
- [Startseite](${SITE_CONFIG.baseUrl})
- [Badsanierung & Fliesen](${SITE_CONFIG.baseUrl}/bad)
- [Leistungsübersicht](${SITE_CONFIG.baseUrl}/leistungen)
- [Regionale Standorte](${SITE_CONFIG.baseUrl}/standorte)
- [Termin buchen & Aufmaß](${SITE_CONFIG.baseUrl}/termin)
- [Kontakt & Anfrage](${SITE_CONFIG.baseUrl}/kontakt)
- [Referenzen & Kundenbewertungen](${SITE_CONFIG.baseUrl}/referenzen)
- [Ratgeber & Fachwissen](${SITE_CONFIG.baseUrl}/blog)

## Vertrauensmerkmale & Garantien
- **5,0 Sterne Google-Bewertung** (27 verifizierte Kundenstimmen)
- **Kostenfreies Vor-Ort-Aufmaß** & Beratung direkt durch Inhaber Deniz Tezgel
- **Verbindlicher Festpreis** ohne versteckte Nachforderungen
- **Staubschutz-Garantie** mit Unterdruck-Luftreinigern bei bewohnten Sanierungen
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
