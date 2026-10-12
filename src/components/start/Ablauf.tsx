// Startseite · Ablauf (E020-F-3, KERN v2): „In 3 Schritten zu Ihrem neuen Belag“, Anker #ablauf.
// Nachbau des Vorbilds (src/components/kern/start/Ablauf.tsx) im KERN-v2-System: Zeitleiste mit durchgehender Linie,
// je Schritt ein Kästchen auf der Linie. Abweichung zum Vorbild: Im Kästchen steht die Schrittziffer (Mono), kein
// Haken – ein Haken liest sich wie „bereits erledigt“. Dafür entfällt die zweite große Ziffer unter dem Kästchen,
// damit es je Schritt nur eine Ziffer gibt.
// Seit E3-ORCH-01 mit den drei Planständen „Verlegeplan entsteht“ (SzeneAblauf) statt der Zeitleiste – die Sichtabnahme
// E2-SICHT-2 nannte die Drei-Schritte-Leiste generisch. Seit E4-NACH-02 ruhig (ohne Scrollbindung): der große Moment der
// Startseite ist SIG-1, je Erzählansicht genau einer (K-007; E3-SICHT-ERZ Befund 9).
// Inhalt wörtlich aus dem Bestand, Daten aus `@/config/company` (processSteps, owner.fullName).
import { COMPANY_DATA, processSteps } from '@/config/company';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import SzeneAblauf from '@/components/kern/SzeneAblauf';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';

export default function Ablauf() {
  const { owner } = COMPANY_DATA;
  return (
    <section id="ablauf" aria-labelledby="ablauf-heading" className="spaet-zeichnen py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="max-w-mass">
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            Transparenter Ablauf
          </span>
          <h2 id="ablauf-heading" className="mt-4 text-fs-6 text-tinte">
            In 3 Schritten zu Ihrem neuen Belag
          </h2>
          <p className="mt-6 text-fs-4 text-tinte-2">
            Keine Überraschungen, keine versteckten Kosten – von der ersten Begutachtung bis zur sauberen Abnahme durch{' '}
            {owner.fullName} persönlich.
          </p>
        </div>

        {/* „Verlegeplan entsteht“ (E3-ORCH-01): je Schritt der Plan im passenden Stand – Aufmaß mit Prüfmarken, Fugenbild
            mit Passstücken, verlegt und abgenommen; ruhig, ohne Scrollbindung (E4-NACH-02). Wortlaut und Reihenfolge
            (Untertitel, Titel, Text) wie bisher; Motiv „wohnen“, damit der Badplan des Einstiegs nicht doppelt steht. */}
        <div className="mt-16">
          <SzeneAblauf
            plan="wohnen"
            bewegt={false}
            untertitelOben
            schritte={processSteps.map((schritt) => ({
              nummer: schritt.step,
              untertitel: schritt.subtitle,
              titel: schritt.title,
              text: <p className="max-w-mass">{schritt.description}</p>,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
