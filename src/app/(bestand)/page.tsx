// Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06; E-044): die Erzählseite, an der
// sich alle anderen messen, gesetzt von der Vorlage ErzaehlSeite aus `src/inhalte/start.ts`. Sechs Abschnitte in fester
// Folge, ab dem zweiten an einer Laserlinie (Leitachse): 1 Worum es geht (Planblatt mit H1, Ort, Hauptknopf, Anruf,
// WhatsApp, Plan, Startbild), 2 Ihre Lage (sechs Fliesen), 3 Was wir tun, 4 So läuft es ab, 5 Beleg (Fotos, Stimmen, Orte),
// 6 Nächster Schritt (das eine Formular, #termin). Das Startbild (großer Moment `startbild`, nur auf `/`) und das Formular
// (HeroContactForm: Pflicht Name und Telefon, Ziel general, Empfänger unverändert, G8) kommen als Schlitze.
import type { Metadata } from 'next';
import HeroContactForm from '@/components/forms/HeroContactForm';
import Startbild from '@/components/start/Startbild';
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { START } from '@/inhalte/start';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
    title: START.meta.titel,
    description: START.meta.beschreibung,
    path: '/',
});

export default function HomePage() {
    return <ErzaehlSeite inhalt={START} einstiegBild={<Startbild sizes="(min-width: 768px) 75vw, 100vw" />} formular={<HeroContactForm titel={false} />} />;
}
