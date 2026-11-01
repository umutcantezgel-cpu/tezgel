// Bad (E3-BAU-01, KERN v3.6, Zusatz E3-BAU-K016): Erzählseite auf der Vorlage ErzaehlSeite. Der Inhalt steht als Daten in
// `src/inhalte/bad.ts`; die Metadaten kommen aus dem Inhalt. Der große Moment „schichten“ steht im Platz `momente.tun`
// (E-048: die Zeichnung des alten Einstiegs entfällt). Die Anfragewege (Projektcheck, darunter Badanfrage) stehen seit
// UM-E4-SICHT-FIX M-B3 im nächsten Schritt unter dem Hauptknopf (die Badanfrage geschlossen); die Funnel werden nachgeladen
// (TEMPO, Z-08 / E-025) wie im Bestand. Badanfrage und Badplaner stehen als eine Zeile (UM-E4-SICHT-FIX-2 M2-B4, Rückfall nach
// E-113 Nr. 1: der Projektcheck bleibt offen eingebettet, Specs unverändert): im Aufklapper „Badanfrage oder Badplaner öffnen“
// zuerst der Weg zum Badplaner, dann die Badanfrage (Zusammenlegen gleicher Wege; vorher je eine eigene Zeile).
// Strukturierte Daten (SeitenDaten) stehen auf dieser Seite; das Layout vererbt keine mehr.
import dynamic from 'next/dynamic';
import WeiterLink from '@/components/kern/WeiterLink';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import Schichten from '@/components/momente/schichten/Schichten';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { BAD } from '@/inhalte/bad';
import { buildServiceNode, SITE_URL } from '@/lib/schema';
import { createMetadata } from '@/lib/metadata';

// Service der Ordnerseite (vorher im Layout, E3-SEO-JSONLD-1): unverändert übernommen
const badService = buildServiceNode({
    name: 'Badsanierung & Badmodernisierung',
    serviceType: 'Badsanierung, Walk-In Duschen & Barrierefreie Bäder',
    description:
        'Fachmännische Badsanierung aus einer Hand in Aßlar, Wetzlar und Mittelhessen: Barrierefreie Bäder, bodengleiche Duschen, Großformatfliesen und Verbundabdichtung.',
    url: `${SITE_URL}/bad`,
    areaServed: 'Aßlar, Wetzlar & Mittelhessen',
});

// Anfragewege nachladen wie im Bestand (TEMPO, Z-08 / E-025)
const BadProjektCheck = dynamic(() => import('@/components/funnels/BadProjektCheck'), {
    loading: () => <FormularPlatzhalter />,
});
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

const METADATEN = createMetadata({
    title: BAD.meta.titel,
    description: BAD.meta.beschreibung,
    path: '/bad',
});

export const metadata = METADATEN;

export default function BadPage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={BAD.worum.brotkrumen}
                weitere={[badService]}
            />
            <ErzaehlSeite
                inhalt={BAD}
                // Zeichnung zuerst (M-C1, tun.momentZuerst): die Legende der Szene erklärt „Untergrund“ und „Abdichtung“
                momente={{ tun: <Schichten fachwort /> }}
                // ein Abschluss (UM-E4-SICHT-FIX M-B3): beide Werkzeuge im nächsten Schritt unter dem Hauptknopf, ohne Rückfrage
                // daneben (K-016); der Projektcheck offen (F-05 prüft sichtbare Inhalte in #projekt-check), die Badanfrage im
                // geschlossenen Aufklapper (F-04, E-104 Nr. 4); Kennungen und Regionsnamen wie bisher. Der Badplaner steht seit
                // M2-B4 (Rückfall) in derselben Zeile wie die Badanfrage, Zeile zum Öffnen als Mikrotext mit beiden Namen
                werkzeug={[
                    { id: 'projekt-check', titel: 'Projektcheck fürs Bad', imSchritt: true, seite: '/bad/projekt-check', inhalt: <BadProjektCheck /> },
                    {
                        id: 'anfrage',
                        titel: 'Badanfrage',
                        imSchritt: true,
                        zu: 'Badanfrage oder Badplaner öffnen',
                        seite: '/bad/badanfrage',
                        inhalt: (
                            <>
                                <p className="mb-8">
                                    <WeiterLink href="/bad/badplaner">Badplaner</WeiterLink>
                                </p>
                                <BadanfrageFunnel />
                            </>
                        ),
                    },
                ]}
            />
        </>
    );
}
