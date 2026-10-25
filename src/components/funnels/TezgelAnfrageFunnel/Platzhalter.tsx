// Platzhalter der nachgeladenen Formulare (R-01b, Aufgabe 3 b): `loading` von next/dynamic für Express-Anfrage,
// Badanfrage, Projekt-Check, Fliesen-Konfigurator, Preisrechner und Schnellanfrage. Ohne JavaScript bleibt genau dieser
// Platzhalter stehen (das Server-HTML des Formulars liegt im verborgenen Streaming-Behälter), daher trägt er neben dem
// Wortlaut „Anfrageformular wird geladen...“ die direkten Wege als ruhiges Schriftfeld: Anruf (tel:), WhatsApp und E-Mail
// (mailto:) als echte Links, Etiketten und Werte wie in `kern/Rueckfrage` nur aus COMPANY_DATA, Ziele ≥ 44 px.
// Spalten nach der Breite des Platzes (@container): gestapelt, ab 42 rem drei Felder nebeneinander.
// Server-Komponente ohne Zustand und ohne IDs (darf mehrfach je Seite stehen).
//
// Schalter Variante a (direkter Import, Formular ohne JavaScript sichtbar): in der einbindenden Datei die Zeile
//   const X = dynamic(() => import('@/components/…/X'), { loading: () => <FormularPlatzhalter /> });
// ersetzen durch
//   import X from '@/components/…/X';
// (dann entfällt dort der Import dieses Platzhalters). Lighthouse mobil vorher/nachher messen; nur bei neutralem Ergebnis.
import clsx from 'clsx';
import Schriftfeld from '@/components/kern/Schriftfeld';
import { linkKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

const WEG = clsx(linkKlassen, 'inline-flex min-h-11 items-center');

export default function FormularPlatzhalter() {
  const { contact } = COMPANY_DATA;
  return (
    <div className="@container py-12">
      <p className="font-mono text-fs-1 text-tinte-2">Formular wird geladen …</p>
      <Schriftfeld
        spalten={1}
        className="mt-4 @2xl:grid-cols-3"
        felder={[
          {
            etikett: 'Telefon',
            wert: (
              <a href={`tel:${contact.phoneLink}`} className={clsx(WEG, 'font-mono')}>
                {contact.phone}
              </a>
            ),
          },
          {
            etikett: 'Mobil und WhatsApp',
            wert: (
              <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className={clsx(WEG, 'font-mono')}>
                {contact.mobile}
              </a>
            ),
          },
          {
            etikett: 'E-Mail',
            wert: (
              <a href={`mailto:${contact.email}`} className={WEG}>
                {contact.email}
              </a>
            ),
          },
        ]}
      />
    </div>
  );
}
