// Verlegeplan (KERN K-008): gezeichnete Draufsicht mit Fugenbild, schraffierten Passstücken, Laserachse
// und Bemaßung „=“. Serverkomponente ohne JavaScript. Mit `interaktiv` trägt die Hülle data-motion="sig-plan":
// am Desktop rückt das Raster bei Hover/Fokus in die Flucht, mobil beim Eintritt (Register K-007).
// `zustand` zeigt den Plan im Ablauf (Szene „Verlegeplan entsteht“): aufmass (Raum, Achsen, drei Prüfmarken),
// fugenbild (Standard: Raster mit Passstücken), verlegt (Belag und Abnahme-Haken).
// `schnitt` zeigt den Plan an der waagrechten Achse geschnitten (obere Hälfte, Planblatt der Startseite): Das Lot bleibt
// und endet an der Schnittkante; die Waage zeichnet das umgebende Blatt als Schnittlinie. `wandEinzug()` liefert den
// Abstand der Wand vom Rand der Zeichnung als Anteil der Breite – damit setzt das Blatt die Wände nach unten fort.
import { useId } from 'react';
import clsx from 'clsx';
import { fugenbild, startversatz } from '@/lib/plaene/geometrie';
import { PLAENE, type PlanName } from '@/lib/plaene/vorgaben';
import type { Planelement, Planvorgabe } from '@/lib/plaene/typen';

const S = 10; // Rastereinheit → Zeichnungseinheiten

export interface VerlegeplanProps {
  plan: PlanName | Planvorgabe;
  /** bedeutungstragend (mit Beschreibung) statt dekorativ */
  beschriftet?: boolean;
  bemassung?: boolean;
  interaktiv?: boolean;
  /** ohne Laserachse (z. B. kleine Planmarken, damit je Bildschirm nur ein roter Blickfang bleibt) */
  ohneAchse?: boolean;
  /** Stand im Ablauf (K-007 szene-ablauf); Standard fugenbild */
  zustand?: 'aufmass' | 'fugenbild' | 'verlegt';
  /** an der waagrechten Achse geschnitten: nur die obere Hälfte, Lot bis zur Schnittkante, keine Waage */
  schnitt?: boolean;
  className?: string;
}

const RAND_MIT_BEMASSUNG = 22;
const RAND_OHNE_BEMASSUNG = 6;

/** Wandabstand vom linken bzw. rechten Rand der Zeichnung als Anteil ihrer Breite (0–1) */
export function wandEinzug(plan: PlanName | Planvorgabe, bemassung = true): number {
  const vorgabe: Planvorgabe = typeof plan === 'string' ? PLAENE[plan] : plan;
  const rand = bemassung ? RAND_MIT_BEMASSUNG : RAND_OHNE_BEMASSUNG;
  return rand / (vorgabe.raum.b * S + rand * 2);
}

function Element({ e, b, h }: { e: Planelement; b: number; h: number }) {
  switch (e.art) {
    case 'wanne':
      return <g className="plan-element"><rect x={e.x * S} y={e.y * S} width={e.b * S} height={e.h * S} /><rect x={e.x * S + 8} y={e.y * S + 8} width={e.b * S - 16} height={e.h * S - 16} /></g>;
    case 'rinne':
      return e.richtung === 'waagrecht'
        ? <g className="plan-element"><rect x={e.x * S} y={e.y * S - 3} width={e.laenge * S} height={6} /></g>
        : <g className="plan-element"><rect x={e.x * S - 3} y={e.y * S} width={6} height={e.laenge * S} /></g>;
    case 'gefaelle': {
      const x = e.x * S, y = e.y * S, l = e.laenge * S;
      const ziel: Record<string, [number, number]> = { unten: [x, y + l], oben: [x, y - l], links: [x - l, y], rechts: [x + l, y] };
      const [x2, y2] = ziel[e.richtung];
      const dx = Math.sign(x2 - x), dy = Math.sign(y2 - y);
      return <g className="plan-element"><path d={`M${x} ${y}L${x2} ${y2}M${x2 - dx * 7 - dy * 7} ${y2 - dy * 7 - dx * 7}L${x2} ${y2}L${x2 - dx * 7 + dy * 7} ${y2 - dy * 7 + dx * 7}`} /></g>;
    }
    case 'tuer': {
      const v = e.von * S, w = e.breite * S;
      if (e.seite === 'unten') return <g className="plan-tuer"><path d={`M${v} ${h * S}h${w}`} className="plan-luecke" /><path d={`M${v} ${h * S}v${-w}A${w} ${w} 0 0 1 ${v + w} ${h * S}`} /></g>;
      if (e.seite === 'oben') return <g className="plan-tuer"><path d={`M${v} 0h${w}`} className="plan-luecke" /><path d={`M${v} 0v${w}A${w} ${w} 0 0 0 ${v + w} 0`} /></g>;
      if (e.seite === 'links') return <g className="plan-tuer"><path d={`M0 ${v}v${w}`} className="plan-luecke" /><path d={`M0 ${v}h${w}A${w} ${w} 0 0 1 0 ${v + w}`} /></g>;
      return <g className="plan-tuer"><path d={`M${b * S} ${v}v${w}`} className="plan-luecke" /><path d={`M${b * S} ${v}h${-w}A${w} ${w} 0 0 0 ${b * S} ${v + w}`} /></g>;
    }
    case 'stufen': {
      const schritt = (e.h * S) / e.anzahl;
      return <g className="plan-element">{Array.from({ length: e.anzahl - 1 }, (_, i) => <path key={i} d={`M${e.x * S} ${e.y * S + schritt * (i + 1)}h${e.b * S}`} />)}</g>;
    }
    case 'heizung': {
      const x = e.x * S, y = e.y * S, bb = e.b * S, hh = e.h * S, n = e.schleifen;
      const dy = hh / n;
      let d = `M${x} ${y}`;
      for (let i = 0; i < n; i++) d += `h${i % 2 === 0 ? bb : -bb}v${i < n - 1 ? dy : 0}`;
      return <path className="plan-heizung" d={d} />;
    }
    case 'fehlstelle':
      return null; // wird im Raster gezeichnet
    case 'dichtband':
      return <rect className="plan-dichtband" x={4} y={4} width={b * S - 8} height={h * S - 8} />;
    case 'stelzlager':
      return null; // Punkte an den Fugenkreuzen, im Raster gezeichnet
  }
}

export default function Verlegeplan({ plan, beschriftet = false, bemassung = true, interaktiv = false, ohneAchse = false, zustand = 'fugenbild', schnitt = false, className }: VerlegeplanProps) {
  const vorgabe: Planvorgabe = typeof plan === 'string' ? PLAENE[plan] : plan;
  const bild = fugenbild(vorgabe);
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const schraffur = `schraffur-${uid}`;
  const titelId = `plan-titel-${uid}`;
  const { b, h } = vorgabe.raum;
  const W = b * S, H = h * S;
  const rand = bemassung ? RAND_MIT_BEMASSUNG : RAND_OHNE_BEMASSUNG;
  const elemente = vorgabe.elemente ?? [];
  const fehl = elemente.find((e) => e.art === 'fehlstelle');
  const stelz = elemente.some((e) => e.art === 'stelzlager');
  const kreuzpunkte = stelz ? bild.waagrecht.flatMap((y) => bild.senkrecht.filter(([, y1, y2]) => y1 <= y * 1 && y2 >= y).map(([x]) => [x, y])) : [];
  const links = bild.passstuecke.find(([x]) => x === 0);
  const zeigeLot = !ohneAchse && vorgabe.achse !== 'waage';
  const zeigeWaage = !ohneAchse && !schnitt && vorgabe.achse !== 'lot';
  const zeigeRaster = zustand !== 'aufmass';
  // Prüfmarken beim Aufmaß (Ebenheit, Restfeuchte, Tragfähigkeit): drei Messpunkte auf der Diagonale
  const pruefpunkte = [[0.22, 0.28], [0.5, 0.5], [0.78, 0.72]].map(([fx, fy]) => [fx * W, fy * H]);

  return (
    <svg
      viewBox={`${-rand} ${-rand} ${W + rand * 2} ${schnitt ? bild.achseY * S + rand : H + rand * 2}`}
      className={clsx('verlegeplan block h-auto w-full', schnitt && 'overflow-hidden', className)}
      {...(beschriftet ? { role: 'img', 'aria-labelledby': titelId } : { 'aria-hidden': true, focusable: false })}
      data-motion={interaktiv ? 'sig-plan' : undefined}
    >
      {beschriftet && <title id={titelId}>{vorgabe.beschreibung}</title>}
      <defs>
        <pattern id={schraffur} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0v6" className="plan-schraffur-linie" />
        </pattern>
      </defs>
      {zustand === 'verlegt' && <rect className="plan-belag" x={0} y={0} width={W} height={H} />}
      {zeigeRaster && (
        <g className="plan-raster">
          {bild.passstuecke.map(([x, y, pb, ph], i) => (
            <rect key={i} x={x * S} y={y * S} width={pb * S} height={ph * S} fill={`url(#${schraffur})`} className="plan-passstueck" />
          ))}
          {fehl && fehl.art === 'fehlstelle' && (
            <rect className="plan-fehlstelle" x={(startversatz(b, vorgabe.platte.b) + fehl.spalte * vorgabe.platte.b) * S} y={(startversatz(h, vorgabe.platte.h) + fehl.zeile * vorgabe.platte.h) * S} width={vorgabe.platte.b * S} height={vorgabe.platte.h * S} />
          )}
          {bild.waagrecht.map((y, i) => <path key={`w${i}`} className="plan-fuge" d={`M0 ${y * S}H${W}`} />)}
          {bild.senkrecht.map(([x, y1, y2], i) => <path key={`s${i}`} className="plan-fuge" d={`M${x * S} ${y1 * S}V${y2 * S}`} />)}
          {kreuzpunkte.map(([x, y], i) => <rect key={`k${i}`} className="plan-stelzlager" x={x * S - 3} y={y * S - 3} width={6} height={6} />)}
        </g>
      )}
      <rect className="plan-raum" x={0} y={0} width={W} height={H} />
      {elemente.map((e, i) => <Element key={i} e={e} b={b} h={h} />)}
      {zeigeLot && <path className="plan-achse" d={`M${bild.achseX * S} ${-rand + 4}V${H + rand - 4}`} />}
      {zeigeWaage && <path className="plan-achse" d={`M${-rand + 4} ${bild.achseY * S}H${W + rand - 4}`} />}
      {zeigeLot && zeigeWaage && <path className="plan-kreuz" d={`M${bild.achseX * S - 1.5} ${bild.achseY * S - 6}h3v4.5h4.5v3h-4.5v4.5h-3v-4.5h-4.5v-3h4.5z`} />}
      {zustand === 'aufmass' && (
        <g className="plan-pruefung">
          {pruefpunkte.map(([px, py], i) => (
            <g key={i} transform={`translate(${px} ${py})`}>
              <g className="plan-marke">
                <circle r={8} />
                <path d="M-3.5 0l2.5 2.5 4.5-5" />
              </g>
            </g>
          ))}
        </g>
      )}
      {zustand === 'verlegt' && (
        <g transform={`translate(${W - 14} ${H - 14})`}>
          <g className="plan-abnahme">
            <circle r={10} />
            <path d="M-4.5 0l3 3 6-6.5" />
          </g>
        </g>
      )}
      {bemassung && links && (
        <g className="plan-bemassung">
          <path d={`M0 ${-12}H${W}M0 ${-16}v8M${links[2] * S} ${-16}v8M${W - links[2] * S} ${-16}v8M${W} ${-16}v8`} />
          <text x={(links[2] * S) / 2} y={-17} textAnchor="middle">=</text>
          <text x={W - (links[2] * S) / 2} y={-17} textAnchor="middle">=</text>
        </g>
      )}
    </svg>
  );
}
