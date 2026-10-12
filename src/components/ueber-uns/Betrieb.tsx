// Über uns · Unser Betrieb (KERN K-006 „Text an der Fuge“): Abschnittskopf wie die Startseite, darunter eine Fuge in
// Strich, an der Text und Zitat hängen – die drei Absätze links (Maß 66ch), das Motto rechts daneben mit der Linie in
// Tinte und der Quelle in Mono wie auf /kontakt; mobil steht das Zitat unter dem Text. Die Kennzahlen des Bestands
// stehen jetzt in der Randspalte des Einstiegs (`Kennzahlen`), hier bleibt der Text allein.
// Ohne Auftritt: Die Bewegung trägt die Firmengeschichte (höchstens jeder zweite Abschnitt, K-007).
// Wortlaut wörtlich aus `src/app/(bestand)/ueber-uns/page.jsx` („Unser Betrieb“), Daten aus `@/config/company`.
import { COMPANY_DATA } from '@/config/company';
import Abschnitt from '@/components/kern/Abschnitt';

export default function Betrieb() {
  const { legalName, owner, authority, headquarters, business, motto } = COMPANY_DATA;
  return (
    <Abschnitt
      id="unser-betrieb"
      titelId="unser-betrieb-heading"
      etikett="Unser Betrieb"
      titel={<>Handwerkliche Präzision aus {headquarters.city}</>}
    >
      <div className="grid grid-cols-4 gap-y-12 border-t border-strich pt-8 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:pt-12">
        <div className="col-span-4 flex max-w-mass flex-col gap-4 text-fs-3 text-tinte-2 md:col-span-8 lg:col-span-7">
          <p>
            Seit der Gründung im Jahr {business.establishmentYear} steht <strong className="font-semibold text-tinte">{legalName}</strong> für handwerkliche Präzision in Mittelhessen – als {authority.certification}.
          </p>
          <p>
            Unter der Führung von Inhaber <strong className="font-semibold text-tinte">{owner.fullName}</strong> und mit unserem Team von bis zu 12 Fachkräften liegt unser Schwerpunkt auf Badsanierungen und barrierefreien Walk-In-Duschen, fugenarmen XXL-Großformaten, Wohnbereichen, Balkonen und Terrassen sowie der normgerechten Verbundabdichtung nach <span className="whitespace-nowrap font-mono text-fs-2">DIN 18534</span>.
          </p>
          <p>
            Von unserem Firmensitz in der {headquarters.street}, {headquarters.postalCode} {headquarters.city} aus betreuen wir Großprojekte ebenso wie private Sanierungsvorhaben – persönlich, transparent und mit verbindlichem Festpreisangebot.
          </p>
        </div>

        <figure className="col-span-4 self-start border-l-2 border-tinte pl-6 md:col-span-6 lg:col-span-4 lg:col-start-9">
          <blockquote className="text-fs-4 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
          <figcaption className="mt-4 font-mono text-fs-1 text-tinte-2">
            — {owner.fullName}, {owner.title}
          </figcaption>
        </figure>
      </div>
    </Abschnitt>
  );
}
