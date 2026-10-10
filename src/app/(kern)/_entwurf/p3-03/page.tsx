// Vorschau P3-03 (ruhender Entwurf, wird nie freigeschaltet): alle Grundbausteine in allen Zuständen.
// Hover, Fokus und aktiv lassen sich nicht per Klasse vorführen – sie sind beschriftet und mit Maus, Tab bzw. Gedrückthalten zu prüfen.
// Wortlaute stammen aus dem Bestand (HeroContactForm, LeadQuickForm, /schadensanalyse) oder aus den freigegebenen Mikrotexten (K-012).
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import {
  Akkordeon,
  AkkordeonEintrag,
  Ankreuzfeld,
  Auswahl,
  Auswahlknopf,
  Etikett,
  Feld,
  Feldgruppe,
  Feldraster,
  Fugenlinie,
  Hinweis,
  Knopf,
  Mehrzeilig,
  Rasterfeld,
  Textlink,
  type Breite,
} from '@/components/kern/basis';
import { SendeProbe } from './Probe';

export const metadata: Metadata = {
  title: 'Vorschau P3-03 Grundbausteine',
  robots: { index: false, follow: false },
};

const VORHABEN = ['Badsanierung', 'Fliesenverlegung', 'Balkon & Terrasse', 'Reparatur & Fugen'];

const FRAGEN = [
  {
    frage: 'Was kostet die Schadensanalyse?',
    antwort:
      'Die Begutachtung von Schäden ist Teil unseres kostenfreien Vor-Ort-Aufmaßes. Sie erhalten danach eine Einschätzung der Ursache und – wenn Sie möchten – ein Festpreisangebot für die Lösung.',
  },
  {
    frage: 'Muss bei einem Schaden immer die ganze Fläche erneuert werden?',
    antwort:
      'Nein. Ist der Schaden örtlich begrenzt und die Ursache geklärt, genügt oft eine Reparatur oder die Erneuerung der Fugen. Eine Neuverlegung empfehlen wir erst, wenn Untergrund, Verbund oder Abdichtung großflächig geschädigt sind.',
  },
  {
    frage: 'Wie kann ich den Termin vorbereiten?',
    antwort:
      'Hilfreich sind Fotos vom Schaden, Angaben zum Alter des Belags, eventuell vorhandene Restfliesen und Informationen zu früheren Reparaturen. Fotos können Sie vorab per WhatsApp senden.',
  },
];

const EINWILLIGUNG = (
  <>
    Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Hinweise in der <Textlink href="/datenschutz">Datenschutzerklärung</Textlink>.
  </>
);

function Abschnitt({ id, titel, children }: { id: string; titel: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-k-5 py-k-7">
      <h2 id={id} className="k-anzeige text-k-5">
        {titel}
      </h2>
      {children}
    </section>
  );
}

const DRITTEL: Breite = { mobil: 4, tablett: 4, desktop: 4 };
const HALB: Breite = { mobil: 4, tablett: 4, desktop: 6 };

// voll: Bausteine nehmen die Feldbreite ein (Felder, Gruppen, Hinweise); sonst stehen sie bündig links (Knöpfe, Etiketten).
function Zustand({ name, breite = DRITTEL, tinte = false, voll = false, children }: { name: string; breite?: Breite; tinte?: boolean; voll?: boolean; children: ReactNode }) {
  return (
    <Rasterfeld breite={breite} flaeche={tinte ? 'tinte' : 'keine'} className={voll ? 'flex flex-col items-stretch gap-k-4' : 'flex flex-col items-start gap-k-4'}>
      <Etikett kreuz auf={tinte ? 'tinte' : 'hell'}>
        {name}
      </Etikett>
      {children}
    </Rasterfeld>
  );
}

export default function VorschauGrundbausteine() {
  const telefon = `tel:${COMPANY_DATA.contact.phoneLink}`;
  return (
    <div className="mx-auto w-full max-w-(--k-seite) px-(--k-rand) py-k-7">
      <header className="flex flex-col gap-k-3 pb-k-5">
        <Etikett rahmen>Vorschau P3-03 · Kern v1.2 · ruhender Entwurf</Etikett>
        <h1 className="k-anzeige text-k-6">Grundbausteine</h1>
        <p className="k-text max-w-(--k-mass) text-k-3 text-k-tinte-2">
          Hover nur bei feinem Zeiger, Fokus per Tab (2 px Tinte, auf Tinte Kalk), aktiv per Gedrückthalten. Ohne JavaScript bleiben alle Bausteine bedienbar.
        </p>
      </header>

      <Fugenlinie />

      <Abschnitt id="t-knopf" titel="Knopf">
        <Feldraster>
          <Zustand name="Hauptknopf · klein · normal · gross">
            <Knopf groesse="klein">Anrufen</Knopf>
            <Knopf>Aufmaß anfragen</Knopf>
            <Knopf groesse="gross">Kostenfreies Aufmaß anfragen</Knopf>
          </Zustand>
          <Zustand name="Nebenknopf · klein · normal · gross">
            <Knopf art="neben" groesse="klein">Anrufen</Knopf>
            <Knopf art="neben">Per WhatsApp schreiben</Knopf>
            <Knopf art="neben" groesse="gross">Aufmaß anfragen</Knopf>
          </Zustand>
          <Zustand name="Textknopf · klein · normal · gross">
            <Knopf art="text" groesse="klein">Anrufen</Knopf>
            <Knopf art="text">Per WhatsApp schreiben</Knopf>
            <Knopf art="text" groesse="gross">Aufmaß anfragen</Knopf>
          </Zustand>
          <Zustand name="als Link · intern · tel: · extern">
            <Knopf href="/kontakt">Aufmaß anfragen</Knopf>
            <Knopf href={telefon} art="neben">
              Anrufen
            </Knopf>
            <Knopf href={COMPANY_DATA.contact.whatsappLink} art="text" target="_blank" rel="noopener noreferrer">
              Per WhatsApp schreiben
            </Knopf>
          </Zustand>
          <Zustand name="deaktiviert · aria-disabled, Cursor, gestrichelt">
            <Knopf deaktiviert>Aufmaß anfragen</Knopf>
            <Knopf art="neben" deaktiviert>
              Anrufen
            </Knopf>
            <Knopf art="text" deaktiviert>
              Per WhatsApp schreiben
            </Knopf>
            <Knopf href="/kontakt" deaktiviert>
              Aufmaß anfragen
            </Knopf>
          </Zustand>
          <Zustand name="lädt · Fuge läuft, reduziert nur Text">
            <Knopf laedt>Anfrage senden</Knopf>
            <Knopf art="neben" laedt>
              Anfrage senden
            </Knopf>
            <Knopf laedt={false}>Anfrage senden</Knopf>
          </Zustand>
          <Zustand name="auf Tinte · Ruhe" tinte>
            <Knopf auf="tinte">Aufmaß anfragen</Knopf>
            <Knopf auf="tinte" art="neben">
              Anrufen
            </Knopf>
            <Knopf auf="tinte" art="text">
              Per WhatsApp schreiben
            </Knopf>
          </Zustand>
          <Zustand name="auf Tinte · deaktiviert · lädt" tinte>
            <Knopf auf="tinte" deaktiviert>
              Aufmaß anfragen
            </Knopf>
            <Knopf auf="tinte" art="text" deaktiviert>
              Per WhatsApp schreiben
            </Knopf>
            <Knopf auf="tinte" laedt>
              Anfrage senden
            </Knopf>
          </Zustand>
          <Zustand name="breit · Hover/Fokus/aktiv: Maus, Tab, Gedrückthalten">
            <Knopf breit>Aufmaß anfragen</Knopf>
            <Knopf breit art="neben">
              Anrufen
            </Knopf>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-senden" titel="Absenden mit Ladeanzeige">
        <Feldraster>
          <Zustand voll name="Antwort nach 1,2 s · Anzeige ab 300 ms · ein Feld: Enter gesperrt, solange gesendet wird" breite={HALB}>
            <SendeProbe dauer={1200} kennung="Probe lange Antwort" mitFeld />
          </Zustand>
          <Zustand name="Antwort nach 0,15 s · keine Anzeige" breite={HALB}>
            <SendeProbe dauer={150} kennung="Probe kurze Antwort" />
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-textlink" titel="Textlink">
        <Feldraster>
          <Zustand name="im Fließtext · Hover: Linie Tinte 2 px" breite={HALB}>
            <p className="k-text max-w-(--k-mass) text-k-3">{EINWILLIGUNG}</p>
          </Zustand>
          <Zustand name="auf Tinte" breite={HALB} tinte>
            <p className="k-text max-w-(--k-mass) text-k-3 text-k-nacht-2">
              Hinweise in der{' '}
              <Textlink href="/datenschutz" auf="tinte">
                Datenschutzerklärung
              </Textlink>
              .
            </p>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-feld" titel="Feld">
        <Feldraster>
          <Zustand voll name="Ruhe · Text · Pflicht">
            <Feld beschriftung="Name" zusatz="*" name="name" autoComplete="name" placeholder="Vor- und Nachname" required />
          </Zustand>
          <Zustand voll name="Telefon · Mono · autocomplete tel">
            <Feld beschriftung="Telefonnummer" zusatz="*" art="tel" name="phone" placeholder="Für den Rückruf" required />
          </Zustand>
          <Zustand voll name="E-Mail · Zusatz">
            <Feld beschriftung="E-Mail" zusatz="(für Bestätigung)" art="email" name="email" placeholder="ihre.adresse@beispiel.de" />
          </Zustand>
          <Zustand voll name="mit Hilfetext">
            <Feld
              beschriftung="Ort / PLZ"
              name="location"
              autoComplete="address-level2"
              placeholder="z. B. Aßlar, Wetzlar, Gießen"
              hilfe="Beschreiben Sie Ihr Projekt in 30 Sekunden – Herr Tezgel meldet sich direkt persönlich bei Ihnen."
            />
          </Zustand>
          <Zustand voll name="Fehler · role=alert · aria-invalid">
            <Feld
              beschriftung="Name"
              zusatz="*"
              name="name-fehler"
              autoComplete="name"
              fehler="Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an."
            />
          </Zustand>
          <Zustand voll name="Erfolg · Haken + Text">
            <Feld beschriftung="Telefonnummer" art="tel" name="phone-ok" defaultValue={COMPANY_DATA.contact.phone} erfolg="Notiert." />
          </Zustand>
          <Zustand voll name="deaktiviert">
            <Feld beschriftung="Ort / PLZ" name="location-aus" defaultValue={COMPANY_DATA.headquarters.city} disabled />
          </Zustand>
          <Zustand voll name="mehrzeilig · Ruhe" breite={{ mobil: 4, tablett: 8, desktop: 8 }}>
            <Mehrzeilig beschriftung="Projektnotiz (optional)" name="notes" placeholder="z. B. ca. 15 m² Fliesen, Altbau, Walk-In Dusche" />
          </Zustand>
          <Zustand voll name="Formular · Pflichthinweis einmal je Formular (Feldgruppe)" breite={{ mobil: 4, tablett: 8, desktop: 12 }}>
            {/* „* Pflichtfeld“: Mikrotext Klasse 1, nur in der Vorschau (Entscheidung Orchestrator P3-03b) */}
            <Feldgruppe legende="Direktanfrage an Deniz Tezgel" pflichthinweis="* Pflichtfeld" anordnung="felder">
              <Feld beschriftung="Name" zusatz="*" name="name-formular" autoComplete="name" placeholder="Vor- und Nachname" required />
              <Feld beschriftung="Telefonnummer" zusatz="*" art="tel" name="phone-formular" placeholder="Für den Rückruf" required />
              <Feld beschriftung="E-Mail" zusatz="(für Bestätigung)" art="email" name="email-formular" placeholder="ihre.adresse@beispiel.de" />
            </Feldgruppe>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-auswahl" titel="Auswahl">
        <Feldraster>
          <Zustand voll name="Ruhe · Leerzustand">
            <Auswahl beschriftung="1. Ihr Vorhaben wählen" name="vorhaben" defaultValue="">
              <option value="" disabled>
                1. Ihr Vorhaben wählen
              </option>
              {VORHABEN.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Auswahl>
          </Zustand>
          <Zustand voll name="Fehler">
            <Auswahl beschriftung="1. Ihr Vorhaben wählen" name="vorhaben-fehler" defaultValue="" fehler="Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an.">
              <option value="" disabled>
                1. Ihr Vorhaben wählen
              </option>
              {VORHABEN.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Auswahl>
          </Zustand>
          <Zustand voll name="deaktiviert">
            <Auswahl beschriftung="1. Ihr Vorhaben wählen" name="vorhaben-aus" defaultValue={VORHABEN[0]} disabled>
              {VORHABEN.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Auswahl>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-ankreuz" titel="Checkbox und Auswahlknopf">
        <Feldraster>
          <Zustand voll name="Checkbox · Ruhe" breite={HALB}>
            <Ankreuzfeld name="consent-1">{EINWILLIGUNG}</Ankreuzfeld>
          </Zustand>
          <Zustand voll name="Checkbox · gesetzt" breite={HALB}>
            <Ankreuzfeld name="consent-2" defaultChecked>
              {EINWILLIGUNG}
            </Ankreuzfeld>
          </Zustand>
          <Zustand voll name="Checkbox · Fehler" breite={HALB}>
            <Ankreuzfeld name="consent-3" required fehler="Bitte füllen Sie Name und Telefonnummer aus und stimmen Sie der Datenschutzerklärung zu.">
              {EINWILLIGUNG}
            </Ankreuzfeld>
          </Zustand>
          <Zustand voll name="Checkbox · deaktiviert · deaktiviert gesetzt" breite={HALB}>
            <Ankreuzfeld name="consent-4" disabled>
              {EINWILLIGUNG}
            </Ankreuzfeld>
            <Ankreuzfeld name="consent-5" disabled defaultChecked>
              {EINWILLIGUNG}
            </Ankreuzfeld>
          </Zustand>
          <Zustand voll name="Auswahlknopf · Zeile · Pfeiltasten" breite={HALB}>
            <Feldgruppe legende="1. Ihr Vorhaben wählen">
              {VORHABEN.map((v, i) => (
                <Auswahlknopf key={v} name="vorhaben-zeile" value={v} defaultChecked={i === 0} disabled={i === 3}>
                  {v}
                </Auswahlknopf>
              ))}
            </Feldgruppe>
          </Zustand>
          <Zustand voll name="Auswahlknopf · Fehler der Gruppe" breite={HALB}>
            <Feldgruppe legende="1. Ihr Vorhaben wählen" anordnung="nebeneinander" fehler="Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an.">
              {VORHABEN.map((v) => (
                <Auswahlknopf key={v} name="vorhaben-fehler-zeile" value={v} ungueltig>
                  {v}
                </Auswahlknopf>
              ))}
            </Feldgruppe>
          </Zustand>
          <Zustand voll name="Auswahlknopf · Kacheln · gesetzt Tinte" breite={{ mobil: 4, tablett: 8, desktop: 12 }}>
            <Feldgruppe legende="1. Ihr Vorhaben wählen" anordnung="kacheln" spalten={4}>
              {VORHABEN.map((v, i) => (
                <Auswahlknopf key={v} art="kachel" name="vorhaben-kachel" value={v} defaultChecked={i === 0}>
                  {v}
                </Auswahlknopf>
              ))}
            </Feldgruppe>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-akkordeon" titel="Akkordeon">
        <Feldraster>
          <Zustand voll name="details/summary · ohne JS bedienbar · name-Gruppe" breite={{ mobil: 4, tablett: 8, desktop: 8 }}>
            <Akkordeon>
              {FRAGEN.map((f, i) => (
                <AkkordeonEintrag key={f.frage} titel={f.frage} name="vorschau-fragen" offen={i === 0}>
                  <p>{f.antwort}</p>
                </AkkordeonEintrag>
              ))}
            </Akkordeon>
          </Zustand>
          <Zustand voll name="gross · ohne Gruppe">
            <Akkordeon>
              <AkkordeonEintrag titel={FRAGEN[2].frage} groesse="gross">
                <p>{FRAGEN[2].antwort}</p>
              </AkkordeonEintrag>
            </Akkordeon>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-hinweis" titel="Hinweis">
        <Feldraster>
          <Zustand voll name="Info · Rahmen Strich">
            <Hinweis>Beschreiben Sie Ihr Projekt in 30 Sekunden – Herr Tezgel meldet sich direkt persönlich bei Ihnen.</Hinweis>
          </Zustand>
          <Zustand voll name="Erfolg · Haken zeichnet sich · status">
            <Hinweis art="erfolg" titel="Notiert." ankuendigen={false}>
              Ihre Anfrage für Badsanierung ist direkt bei Herrn Deniz Tezgel eingegangen.
            </Hinweis>
          </Zustand>
          <Zustand voll name="Fehler · Versatz-Zeichen · alert">
            <Hinweis art="fehler" ankuendigen={false}>
              Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an.
            </Hinweis>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-etikett" titel="Etikett">
        <Feldraster>
          <Zustand name="frei · Rahmen · Kreuz">
            <Etikett>Direktanfrage an Deniz Tezgel</Etikett>
            <Etikett rahmen>Anfrage übermittelt</Etikett>
            <Etikett kreuz ton="tinte">
              DIN 18534
            </Etikett>
          </Zustand>
          <Zustand name="auf Tinte" tinte>
            <Etikett auf="tinte">Direktanfrage an Deniz Tezgel</Etikett>
            <Etikett auf="tinte" rahmen>
              Anfrage übermittelt
            </Etikett>
          </Zustand>
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-raster" titel="Feldraster">
        <Feldraster>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} innen="eng">
            <Etikett>4 · 8 · 12</Etikett>
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 2, tablett: 4, desktop: 6 }} innen="eng" flaeche="fliese">
            <Etikett>2 · 4 · 6</Etikett>
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 2, tablett: 4, desktop: 6 }} innen="eng">
            <Etikett>2 · 4 · 6</Etikett>
          </Rasterfeld>
          {[1, 2, 3].map((n) => (
            <Rasterfeld key={n} breite={{ mobil: 4, tablett: 8, desktop: 4 }} innen="eng">
              <Etikett>4 · 8 · 4</Etikett>
            </Rasterfeld>
          ))}
          {[1, 2, 3, 4, 5].map((n) => (
            <Rasterfeld key={n} breite={{ mobil: 1, tablett: 2, desktop: 2 }} innen="eng">
              <Etikett>1 · 2 · 2</Etikett>
            </Rasterfeld>
          ))}
        </Feldraster>
      </Abschnitt>

      <Abschnitt id="t-fugenlinie" titel="Fugenlinie">
        <Feldraster>
          <Zustand voll name="Kreuz Anfang · Mitte · Ende" breite={HALB}>
            <Fugenlinie />
            <Fugenlinie kreuz="mitte" />
            <Fugenlinie kreuz="ende" trennt />
          </Zustand>
          <Zustand voll name="Kreuz Tinte · Kreuz Laser (nur auf der Achse)" breite={HALB}>
            <Fugenlinie ton="tinte" />
            <Fugenlinie ton="laser" kreuz="mitte" />
          </Zustand>
          <Zustand voll name="auf Tinte" breite={{ mobil: 4, tablett: 8, desktop: 12 }} tinte>
            <Fugenlinie auf="tinte" kreuz="mitte" />
          </Zustand>
        </Feldraster>
      </Abschnitt>
    </div>
  );
}
