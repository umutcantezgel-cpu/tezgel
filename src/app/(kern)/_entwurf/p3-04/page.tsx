import type { Metadata } from 'next';
import Icon, { ICON_GROESSEN } from '@/components/kern/icons/Icon';
import { FAMILIEN_NAMEN, ICONS, MARKEN_NAMEN, RICHTUNGEN, type IconName, type Richtung } from '@/components/kern/icons/geometrie';
import { KONFIG_ICON_NAMEN, iconAbbildung } from '@/lib/kern/icons';
import { RATING_SUMMARY } from '@/config/reviews';

// Vorschau P3-04 (wird nie freigeschaltet): Icon-Grundsatz in 16/20/24/32 px auf Kalk und Tinte, Drehungen,
// Zugänglichkeit (dekorativ / mit Titel), Farben über currentColor und die Kern-Abbildung der Konfig-Namen.
export const metadata: Metadata = { title: 'Vorschau P3-04 · Icons', robots: { index: false, follow: false } };

const RICHTUNGS_LISTE = Object.keys(RICHTUNGEN) as Richtung[];
const ALLE: readonly IconName[] = [...FAMILIEN_NAMEN, ...MARKEN_NAMEN];

function Groessen({ name }: { name: IconName }) {
  return (
    <span className="flex items-end gap-k-3">
      {ICON_GROESSEN.map((g) => (
        <Icon key={g} name={name} groesse={g} />
      ))}
    </span>
  );
}

function Feld({ name, nacht = false }: { name: IconName; nacht?: boolean }) {
  const schraege = name in ICONS ? (ICONS as Record<string, { schraege?: string }>)[name].schraege : undefined;
  return (
    <div className={`flex flex-col gap-k-3 p-k-4 ${nacht ? 'bg-k-tinte text-k-kalk' : 'bg-k-fliese text-k-tinte'}`}>
      <Groessen name={name} />
      <span className={`k-mono text-k-1 ${nacht ? 'text-k-nacht-2' : 'text-k-tinte-2'}`}>
        {name}
        {MARKEN_NAMEN.includes(name as (typeof MARKEN_NAMEN)[number]) ? ' · Marke' : ''}
        {schraege ? ' · Schräge' : ''}
      </span>
    </div>
  );
}

export default function VorschauIcons() {
  const google = RATING_SUMMARY.google;
  const volle = Math.round(google.rating);
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-8 k-text">
      <h1 className="k-anzeige text-k-6">Vorschau P3‑04 · Icons</h1>
      <p className="mt-k-3 max-w-(--k-mass) text-k-2 text-k-tinte-2">
        24er-Raster · Strich 1,5 · square · miter · currentColor. Je Feld 16, 20, 24 und 32 px.
      </p>

      <section aria-labelledby="t-kalk" className="mt-k-7">
        <h2 id="t-kalk" className="k-anzeige text-k-4">Grundsatz auf Kalk</h2>
        <div className="mt-k-4 grid grid-cols-2 gap-px bg-k-fuge md:grid-cols-4 lg:grid-cols-6">
          {ALLE.map((n) => (
            <Feld key={n} name={n} />
          ))}
        </div>
      </section>

      <section aria-labelledby="t-tinte" className="mt-k-7">
        <h2 id="t-tinte" className="k-anzeige text-k-4">Grundsatz auf Tinte</h2>
        <div className="mt-k-4 grid grid-cols-2 gap-px bg-k-nacht-fuge md:grid-cols-4 lg:grid-cols-6">
          {ALLE.map((n) => (
            <Feld key={n} name={n} nacht />
          ))}
        </div>
      </section>

      <section aria-labelledby="t-dreh" className="mt-k-7">
        <h2 id="t-dreh" className="k-anzeige text-k-4">Drehung (pfeil, winkel)</h2>
        <div className="mt-k-4 grid grid-cols-2 gap-px bg-k-fuge md:grid-cols-4">
          {(['pfeil', 'winkel'] as const).flatMap((name) =>
            RICHTUNGS_LISTE.map((r) => (
              <div key={`${name}-${r}`} className="flex items-center gap-k-3 bg-k-fliese p-k-4">
                <Icon name={name} richtung={r} groesse={24} />
                <Icon name={name} richtung={r} groesse={16} />
                <span className="k-mono text-k-1 text-k-tinte-2">
                  {name} · {r}
                </span>
              </div>
            )),
          )}
        </div>
      </section>

      <section aria-labelledby="t-farbe" className="mt-k-7">
        <h2 id="t-farbe" className="k-anzeige text-k-4">Farbe über currentColor</h2>
        <div className="mt-k-4 grid grid-cols-1 gap-px bg-k-fuge md:grid-cols-4">
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4 text-k-tinte">
            <Icon name="telefon" groesse={20} />
            <span className="k-mono text-k-2">tinte</span>
          </p>
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4 text-k-laser-tief">
            <Icon name="fehler" groesse={20} />
            <span className="k-mono text-k-2">laser-tief · Fehlerzeichen</span>
          </p>
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4 text-k-abnahme">
            <Icon name="haken" groesse={20} />
            <span className="k-mono text-k-2">abnahme · Erfolg</span>
          </p>
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4 text-k-abnahme">
            <span data-motion="notiert" className="flex">
              <Icon name="haken" groesse={20} inline />
            </span>
            <span className="k-mono text-k-2">inline · notiert</span>
          </p>
        </div>
      </section>

      <section aria-labelledby="t-zugang" className="mt-k-7">
        <h2 id="t-zugang" className="k-anzeige text-k-4">Zugänglichkeit</h2>
        <div className="mt-k-4 grid grid-cols-1 gap-px bg-k-fuge md:grid-cols-3">
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4">
            <Icon name="telefon" groesse={20} />
            <span>Anrufen</span>
            <span className="k-mono text-k-1 text-k-tinte-2">· dekorativ, Text trägt</span>
          </p>
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4">
            <Icon name="whatsapp" groesse={20} titel="Per WhatsApp schreiben" />
            <span className="k-mono text-k-1 text-k-tinte-2">role=img · title · aria-labelledby</span>
          </p>
          <p className="flex items-center gap-k-2 bg-k-fliese p-k-4">
            <span className="flex gap-k-1" aria-hidden="true">
              {Array.from({ length: google.maxRating }, (_, i) => (
                <Icon key={i} name={i < volle ? 'stern-voll' : 'stern'} groesse={16} />
              ))}
            </span>
            <span className="k-mono text-k-2">
              {google.displayRating} bei {google.count} {google.label}
            </span>
          </p>
        </div>
      </section>

      <section aria-labelledby="t-abb" className="mt-k-7">
        <h2 id="t-abb" className="k-anzeige text-k-4">Abbildung der Konfig-Namen</h2>
        <table className="mt-k-4 w-full border-collapse bg-k-fliese text-k-2">
          <thead>
            <tr className="k-mono text-k-1 text-k-tinte-2">
              <th scope="col" className="border border-k-fuge p-k-2 text-left font-normal">Name</th>
              <th scope="col" className="border border-k-fuge p-k-2 text-left font-normal">Kern</th>
              <th scope="col" className="border border-k-fuge p-k-2 text-left font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {KONFIG_ICON_NAMEN.map((n) => {
              const a = iconAbbildung(n);
              return (
                <tr key={n}>
                  <td className="k-mono border border-k-fuge p-k-2">{n}</td>
                  <td className="border border-k-fuge p-k-2">
                    {a?.status === 'icon' ? (
                      <span className="flex items-center gap-k-2">
                        <Icon {...a.ziel} groesse={20} />
                        <span className="k-mono text-k-1">{a.ziel.name}</span>
                      </span>
                    ) : (
                      <span className="k-mono text-k-1 text-k-tinte-2">–</span>
                    )}
                  </td>
                  <td className="border border-k-fuge p-k-2 text-k-tinte-2">
                    {a === null ? 'nicht verzeichnet' : a.status === 'icon' ? (a.hinweis ?? 'Kern-Icon') : a.status === 'vollsatz' ? `${a.grund} · ${a.fachzeichen}` : a.grund}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
