// Einstieg von /bad (P4-08a, KERN v1.2 K-001, K-002, K-007, K-011 Erzählseite): ein Planblatt aus zwei Abschnitten –
// links der Hero (H1 links bündig, nie zentriert), rechts das Leistungsverzeichnis. Eigene Komposition, nicht die
// Fachseiten-Vorlage und nicht das Planblatt von `/` (dort Plan + Formular): /bad ist die Übersicht des Bad-Clusters, der
// erste Bildschirm zeigt darum die Wege in die Bad-Leistungen statt einer Zeichnung.
//
// Raster ab lg (12 Spalten ohne Zwischenraum), drei Zeilen; Hero Sp. 1–7, Leistungen Sp. 9–12, je als Subgrid:
//   1  Kennzeile: Etikett und Bewertung (Sp. 1–7)         | Fuge läuft bis zum Rand weiter (Sp. 8–12)
//   2  H1 (unten bündig)                                   | Kopf der Leistungen (unten bündig)
//   ── Waage (Laser, 2 px, ruhend) am Anfang von Zeile 3 über alle Spalten: H1 und Leistungskopf stehen auf ihr ──
//   3  Absatz, Knöpfe, Zusagen                             | Leistungsliste, hängt an der Waage
// Unter lg (eigenes Blatt, K-003 Nr. 7) eine Spalte in Bestandsreihenfolge; Achse als Lot am linken Rand über die volle
// Höhe, Text 16 px eingerückt. Das Lot setzt sich in den Stationen des Ablaufs fort (SIG-2, `Schrittfuge`).
// Die Achse des Einstiegs ruht (kein `data-motion`): Der Signaturmoment von /bad ist SIG-2 im Ablauf (höchstens einer je
// Seite, K-009). H1 und Absatz (LCP) stehen ab dem ersten Bild.
// Tab-Folge = Lesefolge (Lehre 7): Hero-Knöpfe, dann die Leistungen; der Rücksprung nach oben rechts bleibt unter einer
// Bildschirmhöhe. `data-hauptaktion` am Hero: Der WhatsApp-Kanal weicht den Knöpfen aus (Lehre 9).
// Wortlaut, IDs und Ziele wörtlich aus `src/app/(bestand)/bad/page.jsx` (Hero, Sub-Services); Bewertung aus `RATING_SUMMARY`.
import { Etikett, Knopf, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { UMBRUCH, Zusagen, stufeNachWort } from '@/components/kern/vorlagen/teile';
import { RATING_SUMMARY } from '@/config/reviews';
import { BAD_ZUSAGEN } from '@/components/kern/seiten/bad/daten';
import Leistungen from '@/components/kern/seiten/bad/Leistungen';

// H1 des Bestands: „Ihr Traumbad schlüsselfertig{' '}<span>in Fachqualität</span>“ – zwei Zeilen, ein Satz.
const H1_TEIL_1 = 'Ihr Traumbad schlüsselfertig';
const H1_TEIL_2 = 'in Fachqualität';

export default function Einstieg() {
  const google = RATING_SUMMARY.google;
  const stufe = stufeNachWort(`${H1_TEIL_1} ${H1_TEIL_2}`, 'einstieg', 'text-k-7');

  return (
    <div className="relative pt-k-6 pb-k-9 lg:pt-k-5">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="relative grid grid-cols-1 pl-k-4 lg:grid-cols-12 lg:pl-0">
          {/* Hero: Sp. 1–7 über alle drei Zeilen */}
          <section
            aria-labelledby="bad-hero-heading"
            data-hauptaktion=""
            className="min-w-0 lg:col-span-7 lg:row-span-3 lg:grid lg:grid-rows-subgrid"
          >
            {/* Zeile 1 · Kennzeile: Eyebrows des Bestands als Etiketten (Klasse 3, Wortlaut gleich), je ein Element */}
            <div className="flex flex-col gap-k-2 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-k-5 lg:border-b lg:border-k-fuge lg:pr-k-6 lg:pb-k-3">
              <Etikett als="p" kreuz ton="tinte">
                HWK Fachbetrieb für Badsanierung &middot; Aßlar &amp; Wetzlar
              </Etikett>
              <p className="flex items-start gap-k-2 k-mono text-k-1 text-k-tinte">
                <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
                  <Icon name="stern-voll" groesse={16} />
                </span>
                <span>{`${google.displayRating} · ${google.count} ${google.label}`}</span>
              </p>
            </div>

            {/* Zeile 2 · H1, steht auf der Waage */}
            <h1 id="bad-hero-heading" className={verbinde('mt-k-5 k-anzeige text-k-tinte lg:mt-k-6 lg:self-end lg:pr-k-6 lg:pb-k-4', stufe, UMBRUCH)}>
              <span className="block">{H1_TEIL_1}</span>{' '}
              <span className="block text-k-tinte-2">{H1_TEIL_2}</span>
            </h1>

            {/* Zeile 3 · Absatz, Knöpfe, Zusagen */}
            <div className="mt-k-5 min-w-0 lg:mt-0 lg:pt-k-6 lg:pr-k-6">
              <p className="max-w-(--k-mass) k-text text-k-4 text-k-tinte">
                Ihr Fachbetrieb Tezgel realisiert Ihre schlüsselfertige Badsanierung in Aßlar, Wetzlar und ganz Mittelhessen. Von
                der ersten Planungsskizze bis zur schlüsselfertigen Übergabe Ihres Traumbads in Fachqualität koordinieren wir alle
                Gewerke, garantieren transparente Festpreise und verbauen normgerechte Verbundabdichtungen nach{' '}
                {/* Mono eine Stufe kleiner, ohne Umbruch (wie im Einstieg von `/`, P3-09c Auflage 4) */}
                <span className="k-mono text-k-3 whitespace-nowrap">DIN 18534</span>.
              </p>

              <div className="mt-k-6 flex flex-wrap gap-k-3">
                <Knopf href="/bad/projekt-check" className="w-full sm:w-auto" hinten={<Icon name="pfeil" groesse={20} />}>
                  Bad-Projektcheck starten
                </Knopf>
                <Knopf art="neben" href="/bad/musterbaeder" className="w-full sm:w-auto">
                  Musterbäder entdecken
                </Knopf>
              </div>

              <Zusagen punkte={BAD_ZUSAGEN} className="mt-k-5" />
            </div>
          </section>

          {/* Fuge der Kennzeile läuft über die rechte Spalte weiter (ab lg) */}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:block lg:border-b lg:border-k-fuge" />

          {/* Leistungen: Sp. 9–12, Zeilen 2–3 (Kopf auf der Waage, Liste darunter) */}
          <Leistungen className="mt-k-9 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-2 lg:mt-0 lg:grid lg:grid-rows-subgrid" />

          {/* Waage (ab lg): ruhende Achse am Anfang von Zeile 3 über alle Spalten */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-(--k-linie-2) -translate-y-1/2 bg-k-laser lg:col-span-full lg:row-start-3 lg:block"
          />
        </div>
      </div>

      {/* Lot (unter lg): am linken Rand über die volle Höhe des Einstiegs; setzt sich in den Stationen fort */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />
    </div>
  );
}
