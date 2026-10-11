// /leistungen · Fachgewerke als Planmappe (P4-08b, KERN v1.2 K-001, K-003 Nr. 5, K-007, K-009 SIG-3, K-010).
// Bestand: „Grid der 4 Fachgewerke“ (`div#gewerke`, je Leistung `article#<id>`). Kern: vier Planblätter untereinander, durch
// Fugen getrennt, statt vier gleicher Karten mit Icon-Kachel (S-04/S-11). Je Blatt ab lg:
//   Sp. 1–5  Planfeld: der Verlegeplan der Leistung (`PLAN_JE_LEISTUNG`), klebt unter dem Kopf, solange das Blatt läuft –
//            so steht je Bildschirmhöhe ein Plan mit seiner Laserachse (K-003 Nr. 2: ein roter Blickfang je Ansicht).
//   Sp. 6–12 Textspalte in Bestandsreihenfolge: Feldkopf, H2, Text, Unterleistungen als Stückliste, Merkmale, Wege.
// Unter lg (eigenes Blatt, K-003 Nr. 7): Plan oben (Tablett halb so breit), Text darunter.
//
// SIG-3 „Verlegeplan je Leistung“ (Register `sig-plan`, Regel in kern.css): Das ganze Blatt trägt SIG_PLAN_AUSLOESER. Hover mit
// feinem Zeiger, Fokus auf einem seiner Wege („Fachdetails & Ratgeber: …“, „Aufmaß anfragen“) oder Antippen (:active) rückt
// Achse und Passstücke aller Pläne des Blatts in die Flucht. Reduziert: Sofortzustand. Ohne JavaScript gleich (reines CSS).
// Der Plan selbst ist dekorativ (aria-hidden); seine Bedeutung trägt der Name der Leistung daneben.
//
// Unterleistungen (Bestand: Mono-Schildchen ohne Link): Stückliste mit Detailblättern. Eine Zeile je Unterleistung; wo
// `PLAN_JE_UNTERLEISTUNG` einen eigenen Plan nennt, der vom Plan der Leistung abweicht und im Blatt noch nicht steht, zeigt die
// Zeile ihn klein (Detailblatt). Gleiche Pläne werden nicht wiederholt (z. B. Untergrund: alle vier Unterleistungen liegen im
// Hauptplan Abdichtung) – die Dichte der Blätter wechselt damit mit dem Inhalt. Detailblätter stehen ganz in Strich
// (`**:text-k-strich` färbt auch ihre Laserachse): Das eine Rot des Blatts ist die Achse des Hauptplans (K-003 Nr. 2); sie rücken
// mit dem Hauptplan in die Flucht.
//
// Wortlaut wörtlich aus `SERVICES` (`@/config/services`) und `src/app/(bestand)/leistungen/page.jsx`. Mikrotexte des Bestands
// bleiben (Klasse 3: „Geprüfte Fachkompetenz“, „Ausstattungsmerkmale & Vorteile:“; Klasse 1: „Aufmaß anfragen“) – Vorschlag
// zur Wahrheit von „Geprüfte Fachkompetenz“ steht in der Rückgabe P4-08b (Lehre 1). IDs `gewerke` und `<leistung.id>` wie im
// Bestand (Sprungziele `/leistungen#bad` usw.). H2-Stufe für alle Namen gleich, nach dem längsten Wort (`stufeFuerAlle`).
// Server-Komponente; kein `auftritt` (der Signaturmoment ist SIG-3, K-009 S-02).
import { SERVICES } from '@/config/services';
import { Etikett, Knopf, verbinde } from '@/components/kern/basis';
import { PLAENE, PLAN_JE_LEISTUNG, PLAN_JE_UNTERLEISTUNG, SIG_PLAN_AUSLOESER, type PlanName } from '@/components/kern/motive/plaene';
import { Pfeillink, Punkte, stufeFuerAlle, UMBRUCH } from '@/components/kern/vorlagen/teile';

type Leistung = (typeof SERVICES)[number];

/** Plan der Leistung; ohne Zuordnung der allgemeine Plan Kreuzfuge (bisher hat jede Leistung einen Eintrag). */
function planDerLeistung(leistung: Leistung): PlanName {
  return PLAN_JE_LEISTUNG[leistung.id] ?? 'kreuzfuge';
}

/** Detailblätter: Unterleistung → eigener Plan, nur wenn er vom Plan der Leistung abweicht und im Blatt neu ist. */
export function detailplaene(leistung: Leistung): ReadonlyMap<string, PlanName> {
  const haupt = planDerLeistung(leistung);
  const gezeigt = new Set<PlanName>([haupt]);
  const details = new Map<string, PlanName>();
  for (const unter of leistung.subcategories) {
    const plan = PLAN_JE_UNTERLEISTUNG[unter.id];
    if (!plan || gezeigt.has(plan)) continue;
    gezeigt.add(plan);
    details.set(unter.id, plan);
  }
  return details;
}

function Stueckliste({ leistung }: { leistung: Leistung }) {
  const details = detailplaene(leistung);
  return (
    <div className="@container mt-k-6">
      <ul className="grid grid-cols-1 gap-x-k-6 @xl:grid-cols-2">
        {leistung.subcategories.map((unter) => {
          const plan = details.get(unter.id);
          const Detail = plan ? PLAENE[plan].Plan : null;
          return (
            <li
              key={unter.id}
              className="flex min-h-k-8 min-w-0 items-center justify-between gap-k-4 border-b border-k-fuge py-k-2 first:border-t first:border-t-k-strich @xl:nth-2:border-t @xl:nth-2:border-t-k-strich"
            >
              <span className={verbinde('k-text text-k-2 font-semibold text-k-tinte', UMBRUCH)}>{unter.name}</span>
              {Detail ? (
                <span className="block w-k-9 shrink-0 border border-k-fuge bg-k-fliese p-k-1 text-k-strich **:text-k-strich sm:w-k-10">
                  <Detail />
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Blatt({ leistung, titelStufe }: { leistung: Leistung; titelStufe: string }) {
  const { Plan } = PLAENE[planDerLeistung(leistung)];
  const titelId = `gewerk-${leistung.id}-titel`;
  return (
    <article
      id={leistung.id}
      aria-labelledby={titelId}
      className={verbinde(SIG_PLAN_AUSLOESER, 'grid grid-cols-1 border-b border-k-fuge lg:grid-cols-12')}
    >
      {/* Planfeld: klebt ab lg unter dem Kopf, solange das Blatt im Bild ist */}
      <div className="min-w-0 border-b border-k-fuge pt-k-6 pb-k-6 lg:col-span-5 lg:border-r lg:border-b-0 lg:pt-k-8 lg:pr-k-7 lg:pb-k-8">
        <div className="w-full md:w-1/2 lg:sticky lg:top-(--k-kopf-hoehe) lg:w-full lg:pt-k-5">
          <div className="border border-k-fuge bg-k-fliese p-k-4 text-k-tinte lg:p-k-5">
            <Plan />
          </div>
        </div>
      </div>

      {/* Textspalte in Bestandsreihenfolge */}
      <div className="min-w-0 pt-k-6 pb-k-7 lg:col-span-7 lg:pt-k-8 lg:pb-k-8 lg:pl-k-7">
        <Etikett rahmen>Geprüfte Fachkompetenz</Etikett>
        <h2 id={titelId} className={verbinde('mt-k-4 k-anzeige text-k-tinte', titelStufe, UMBRUCH)}>
          {leistung.name}
        </h2>
        <p className={verbinde('mt-k-5 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2', UMBRUCH)}>{leistung.detailText}</p>

        <Stueckliste leistung={leistung} />

        <div className="mt-k-7">
          <p className="k-mono text-k-1 text-k-tinte-2">Ausstattungsmerkmale &amp; Vorteile:</p>
          <Punkte className="mt-k-3" punkte={leistung.features} spalten={2} groesse="dicht" />
        </div>

        <div className="mt-k-7 flex flex-wrap items-center justify-between gap-k-3 border-t border-k-fuge pt-k-3">
          <Pfeillink href={`/leistungen/${leistung.id}`}>Fachdetails &amp; Ratgeber: {leistung.name}</Pfeillink>
          <Knopf href="#express-anfrage" art="neben" className="w-full sm:w-auto">
            Aufmaß anfragen
          </Knopf>
        </div>
      </div>
    </article>
  );
}

export default function Gewerke() {
  const titelStufe = stufeFuerAlle(
    SERVICES.map((leistung) => leistung.name),
    'abschnitt',
    'text-k-6',
  );
  return (
    <div id="gewerke" className="pb-k-9 lg:pb-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        {/* Blattkante in Strich: die Mappe beginnt */}
        <div className="border-t border-k-strich">
          {SERVICES.map((leistung) => (
            <Blatt key={leistung.id} leistung={leistung} titelStufe={titelStufe} />
          ))}
        </div>
      </div>
    </div>
  );
}
