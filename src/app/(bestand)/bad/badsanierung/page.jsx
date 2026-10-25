// Badsanierung (E3-BAU-02, KERN v3.6, K-016 „Ruhe“, E-025): Erzählseite auf der Vorlage ErzaehlSeite. Inhalt als Daten in
// `src/inhalte/bad-badsanierung.ts` (Konstante BADSANIERUNG), Metadaten aus dem Inhalt. Das Werkzeug der Seite, die Badanfrage
// (Kennung `anfrage`, Bestand) steht nach dem nächsten Schritt; der Funnel wird nachgeladen (TEMPO).
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { createMetadata } from '@/lib/metadata';
import { BADSANIERUNG } from '@/inhalte/bad-badsanierung';

// Anfrageformular nachladen wie auf der Startseite und in der Familienreferenz (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: BADSANIERUNG.meta.titel,
    description: BADSANIERUNG.meta.beschreibung,
    path: '/bad/badsanierung'
});

// Werkzeug der Seite (Bestand: Abschnitt `anfrage`, aria-label „Badanfrage“): der Funnel allein. Die Rückfrage-Spalte des
// Bestands (Ansprechpartner, Sitz) entfällt: K-016 verlangt einen Strang je Bildschirm, und der Sitz ist ein Firmendatum.
const ANFRAGE = {
    id: 'anfrage',
    titel: 'Badanfrage',
    kopf: 'gestapelt',
    flaeche: 'fliese',
    inhalt: <BadanfrageFunnel />
};

export default function BadsanierungPage() {
    return <ErzaehlSeite inhalt={BADSANIERUNG} werkzeug={ANFRAGE} />;
}
