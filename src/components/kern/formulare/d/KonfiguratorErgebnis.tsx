// Ergebnis des Fliesen-Konfigurators (F-06, P4-05b, KERN v1.2): Projekt in Kürze, Materialbedarf (Richtwert) und
// Prüfliste – die Kern-Fassung von `ResultSummary` aus `src/components/funnels/FliesenKonfigurator.jsx`.
// Ohne eigene Logik: Zeilen, Rechnung und Prüfliste kommen aus den Funktionen des Hooks (`buildSummaryLines`,
// `calculateArea`, `calculateStairs`, `buildChecklist`, `fmt`), dieselben wie im Bestand (G9).
// Felder ohne Zwischenraum mit 1-px-Fugen (K-003 „Fuge statt Karte“). Zahlen mit Einheit stehen je in einem eigenen
// Element in Mono (K-005, Lehren P3 Nr. 2), der Richtwert zusätzlich kräftig. Wortlaut und Überschriften-Elemente (h4)
// wie im Bestand.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { buildChecklist, buildSummaryLines, calculateArea, calculateStairs, fmt, type FliesenDaten } from '@/lib/formulare/useFliesenKonfigurator';
import Textlink from '@/components/kern/basis/Textlink';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';

const FELD = 'flex min-w-0 flex-col gap-k-3 border-r border-b border-k-fuge bg-k-fliese p-k-4 lg:p-k-5';
const KOPF = 'flex items-center gap-k-2 k-text text-k-3 font-semibold text-k-tinte';
const TEXT = 'min-w-0 wrap-break-word hyphens-auto';

function Kopf({ children }: { children: string }) {
  return (
    <h4 className={KOPF}>
      <Fugenkreuz className="size-k-3 shrink-0" />
      {children}
    </h4>
  );
}

/** Zahl mit Einheit als eigene Texteinheit (Mono). */
function Mass({ children, kraeftig = false }: { children: ReactNode; kraeftig?: boolean }) {
  return kraeftig ? (
    <strong className="k-mono font-semibold whitespace-nowrap text-k-tinte">{children}</strong>
  ) : (
    <span className="k-mono whitespace-nowrap">{children}</span>
  );
}

export default function KonfiguratorErgebnis({ data }: { data: FliesenDaten }) {
  const summary = buildSummaryLines(data);
  const area = calculateArea(data);
  const stairs = calculateStairs(data);
  const checklist = buildChecklist(data);

  return (
    <div className="grid grid-cols-1 border-l border-t border-k-fuge">
      <div className={FELD}>
        <Kopf>Ihr Projekt in Kürze</Kopf>
        <dl className="m-0 border-l border-t border-k-fuge k-text text-k-2">
          {summary.map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-x-k-4 gap-y-k-1 border-r border-b border-k-fuge px-k-3 py-k-2 md:grid-cols-3">
              <dt className={`font-semibold text-k-tinte ${TEXT}`}>{k}</dt>
              <dd className={`m-0 text-k-tinte-2 md:col-span-2 ${TEXT}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={FELD}>
        <Kopf>Materialbedarf (Richtwert)</Kopf>
        <ul className="m-0 flex list-none flex-col gap-k-2 p-0 k-text text-k-2 text-k-tinte-2">
          {area && area.valid && (
            <li className={TEXT}>
              <strong className="text-k-tinte">Fläche:</strong> <Mass>{fmt(area.net)} m²</Mass> netto. Mit einem Verschnitt von
              ca. <Mass>{area.pattern.min}–{area.pattern.max} %</Mass> ({area.pattern.label}) ergibt sich ein Richtwert von{' '}
              <Mass kraeftig>ca. {fmt(area.low)}–{fmt(area.high)} m²</Mass>.
            </li>
          )}
          {area && !area.valid && (
            <li className={TEXT}>
              <strong className="text-k-tinte">Fläche:</strong> Noch keine m²-Angabe – die Fläche wird beim Aufmaß ermittelt.
            </li>
          )}
          {area && area.skirting && (
            <li className={TEXT}>
              <strong className="text-k-tinte">Sockel:</strong> ca. <Mass>{fmt(area.skirting)} laufende Meter</Mass> (separat, ohne Zuschlag).
            </li>
          )}
          {stairs && stairs.valid && (
            <li className={TEXT}>
              <strong className="text-k-tinte">Treppe (netto):</strong> Trittstufen <Mass>{fmt(stairs.treadArea, 2)} m²</Mass>
              {stairs.withRisers && (
                <>
                  {' '}
                  + Setzstufen <Mass>{fmt(stairs.riserArea, 2)} m²</Mass>
                </>
              )}{' '}
              = <Mass kraeftig>{fmt(stairs.total, 2)} m²</Mass>. Bei Treppen nennen wir bewusst keinen Verschnittzuschlag, weil
              er stark von Format und Stufenmaß abhängt.
            </li>
          )}
          {stairs && !stairs.valid && (
            <li className={TEXT}>
              <strong className="text-k-tinte">Treppe:</strong> {stairs.reason}
            </li>
          )}
        </ul>
        <p className="max-w-(--k-mass) k-text text-k-1 text-k-tinte-2">
          Alle Mengen sind reine Orientierungswerte. Die tatsächliche Menge ermittelt {COMPANY_DATA.owner.fullName} beim
          kostenfreien Vor-Ort-Aufmaß – dort werden auch Treppensockel, Anschlüsse und Zuschnitte festgelegt.
        </p>
      </div>

      {checklist.length > 0 && (
        <div className={FELD}>
          <Kopf>Das prüfen wir vorab</Kopf>
          <ul className="m-0 flex list-none flex-col gap-k-2 p-0 k-text text-k-2 text-k-tinte-2">
            {checklist.map((item) => (
              <li key={item.text} className="flex items-start gap-k-2">
                <span className="flex h-lh shrink-0 items-center text-k-tinte">
                  <Fugenkreuz className="size-k-3" />
                </span>
                <span className={TEXT}>
                  {item.text} <Textlink href={item.href}>{item.label}</Textlink>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
