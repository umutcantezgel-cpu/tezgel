// Badsanierung (E3-BAU-02, KERN v3.6, K-016 „Ruhe“, E-025): Erzählseite auf der Vorlage ErzaehlSeite. Inhalt als Daten in
// `src/inhalte/bad-badsanierung.ts` (Konstante BADSANIERUNG), Metadaten aus dem Inhalt. Das Werkzeug der Seite, die Badanfrage
// (Kennung `anfrage`, Bestand) steht nach dem nächsten Schritt; der Funnel wird nachgeladen (TEMPO).
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import { BADSANIERUNG } from '@/inhalte/bad-badsanierung';

// Anfrageformular nachladen wie auf der Startseite und in der Familienreferenz (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

const METADATEN = createMetadata({
    title: BADSANIERUNG.meta.titel,
    description: BADSANIERUNG.meta.beschreibung,
    path: '/bad/badsanierung'
});

export const metadata = METADATEN;

// Werkzeug der Seite (Bestand: Abschnitt `anfrage`, aria-label „Badanfrage“): der Funnel allein. Die Rückfrage-Spalte des
// Bestands (Ansprechpartner, Sitz) entfällt: K-016 verlangt einen Strang je Bildschirm, und der Sitz ist ein Firmendatum.
// ein Abschluss (UM-E4-SICHT-FIX M-B3): Badanfrage im nächsten Schritt unter dem Hauptknopf, geschlossen (F-04, E-104 Nr. 4); der
// Hilfen-Link „Angebot anfordern“ auf /bad/badanfrage entfällt dann (gleiches Werkzeug im Block)
const ANFRAGE = {
    id: 'anfrage',
    titel: 'Badanfrage',
    imSchritt: true,
    zu: 'Badanfrage öffnen',
    seite: '/bad/badanfrage',
    inhalt: <BadanfrageFunnel />
};

export default function BadsanierungPage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad/badsanierung"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={BADSANIERUNG.worum.brotkrumen}
            />
            <ErzaehlSeite inhalt={BADSANIERUNG} werkzeug={ANFRAGE} />
        </>
    );
}
