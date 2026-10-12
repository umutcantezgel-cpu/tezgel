// /leistungen/[id] · Seitenspalte „Direktkontakt“ (S-04, KERN v2 K-009 Schriftfeld; Fusion F-02): Bestand `aside` als klebende
// Glas-Karte mit Schatten (Eyebrow, H2, Text, Telefon- und WhatsApp-Kachel, Hauptknopf, Motto). Jetzt ein Schriftfeld auf
// Fliese mit Blattkante in Tinte, gegliedert durch Fugen: Kopf (Mono-Etikett, H2, Text) · Wege (Telefon und WhatsApp als
// Nebenknöpfe, „Kostenfreies Aufmaß buchen“ als einziger Hauptknopf dieses Abschnitts) · E-Mail · Leitsatz.
// Fusion F-02 (Gutachten u2): Komposition aus Fassung B; aus Fassung A die eigene benannte `section` (aria-labelledby, statt
// eines unbenannten Blocks im Fachkompetenz-Abschnitt) und der E-Mail-Weg (mailto) als eigene Zeile mit Ziel ≥ 44 px.
// Telefon und WhatsApp stehen nur einmal als Weg da (keine zweite Kontaktliste mit 16–19 px hohen Links wie in A).
// Kein Kleben (Bestand: lg:sticky lg:top-28). Geprüft mit `lg:sticky lg:top-24` (Kopfhöhe + Abstand): Sobald die Spalte
// endet, läuft das klebende Feld unter den festen Kopf – `einzelbild` meldet es als Überdeckung (d1440: 2 × sticky über
// Telefon und „Aufmaß anfragen“ im Kopf). Neben Kopf und unterer Leiste gibt es darum keine weitere feste Ebene (K-009,
// wie Plan-Feld auf /leistungen und Blog-Leiste). Das Feld steht neben dem Text, mobil direkt nach den Vorteilen.
// Zoom (Abnahme S-04): Bei 200 % CSS-Zoom liefen die drei Knöpfe über die Spalte (a11y-zusatz). Jetzt Rand p-6 im ganzen
// Feld, Knöpfe mit `wrap-anywhere` und unter 16rem Behälterbreite px-4 (Containerabfrage) – `Knopf` selbst bleibt unverändert.
// Wortlaut, Ziele (`tel:`, WhatsApp mit target/rel, `#express-anfrage`, `mailto:`) wie im Bestand bzw. in Fassung A.
// Server-Komponente.
import { COMPANY_DATA } from '@/config/company';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { etikettKlassen } from '@/components/kern/stile';
import type { Leistung } from '@/components/leistungen/Gewerk';
import { fugen, UNTERSTRICH } from '@/components/leistungen/detail/satz';

// Knopf im Schriftfeld: volle Breite, darf schrumpfen und umbrechen; in schmalem Behälter kleinerer Seitenrand
const WEG = 'w-full min-w-0 wrap-anywhere @max-3xs:px-4';

export default function Seitenspalte({ leistung, text }: { leistung: Leistung; text: string }) {
  const { contact, motto } = COMPANY_DATA;

  return (
    <section aria-labelledby="direktkontakt-titel" className="border border-fuge border-t-tinte bg-fliese">
      <div className="p-6">
        <p className={etikettKlassen}>
          <Fugenkreuz className="size-3 text-strich" />
          Direktkontakt
        </p>
        <h2 id="direktkontakt-titel" className="mt-4 text-fs-5 text-tinte">
          Projekt in {fugen(leistung.name)} anfragen?
        </h2>
        <p className="mt-4 text-fs-2 text-tinte-2">{text}</p>
      </div>

      {/* Wege: gestapelt in voller Breite. Die Spalte ist schmal (ab lg 4/12, bei 200 % Zoom rund 80 px Innenmaß): Knopftext
          darf umbrechen (`wrap-anywhere`, greift erst, wenn ein Wort allein nicht mehr in die Zeile passt), und unter 16rem
          Behälterbreite rückt der Knopfrand von px-6 auf px-4 (`@max-3xs`, Containerabfrage auf diesen Block). Ab 16rem
          bleibt die Telefonnummer auf einer Zeile (`@3xs:whitespace-nowrap`); das gilt für alle Breiten ab 375 px. */}
      <div className="@container grid gap-3 border-t border-fuge p-6">
        <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon" className={WEG}>
          <span className="font-mono font-normal @3xs:whitespace-nowrap">{contact.phone}</span>
        </Knopf>
        <Knopf href={contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />} className={WEG}>
          WhatsApp Chat
        </Knopf>
        <Knopf href="#express-anfrage" icon="pfeil-rechts" className={WEG}>
          Kostenfreies Aufmaß buchen
        </Knopf>
      </div>

      {/* E-Mail (aus Fassung A): Etikett in Mono und Adresse als ein Link, ganze Zeile Ziel (min-h-11); die Adresse darf bei
          200 % Zoom an beliebiger Stelle umbrechen */}
      <p className="border-t border-fuge px-6 py-1">
        <a
          href={`mailto:${contact.email}`}
          data-motion="zustand"
          className="group flex min-h-11 flex-wrap items-center gap-x-3 text-tinte"
        >
          <span className="font-mono text-fs-1 text-tinte-2">E-Mail</span>
          <span className={`min-w-0 text-fs-2 wrap-anywhere ${UNTERSTRICH}`}>{contact.email}</span>
        </a>
      </p>

      <p className="border-t border-fuge px-6 py-4 text-fs-2 text-tinte-2">&bdquo;{motto}&ldquo;</p>
    </section>
  );
}
