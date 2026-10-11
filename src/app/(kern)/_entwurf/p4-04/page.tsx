import type { Metadata } from 'next';
import Icon, { type IconGroesse } from '@/components/kern/icons/Icon';
import { FAMILIEN_NAMEN, ICONS, MARKEN_NAMEN, VOLLSATZ_NAMEN, type IconName } from '@/components/kern/icons/geometrie';
import { BESTAND_ICON_NAMEN, KONFIG_ICON_NAMEN, KONTEXT_ABBILDUNG, iconAbbildung, type IconAbbildung } from '@/lib/kern/icons';

// Vorschau P4-04 (wird nie freigeschaltet): Icon-Vollsatz als Tafel in 16/20/24 px mit Namen, auf Fliese (hell) und Tinte,
// dazu die Abbildung aller Bestandsnamen (Konfig-Strings, lucide- und Phosphor-Importe) und die Kontext-Abbildung.
// Kein eigenes IconSprite: das Kern-Layout rendert den ganzen Satz.
export const metadata: Metadata = { title: 'Vorschau P4-04 · Icon-Vollsatz', robots: { index: false, follow: false } };

const GROESSEN: readonly IconGroesse[] = [16, 20, 24];
const ALLE: readonly IconName[] = [...FAMILIEN_NAMEN, ...MARKEN_NAMEN];
const istNeu = (name: IconName) => (VOLLSATZ_NAMEN as readonly string[]).includes(name);
const istMarke = (name: IconName) => (MARKEN_NAMEN as readonly string[]).includes(name);
const schraegeVon = (name: IconName) => (name in ICONS ? (ICONS as Record<string, { schraege?: string }>)[name].schraege : undefined);

function Feld({ name, nacht = false }: { name: IconName; nacht?: boolean }) {
  const zweit = nacht ? 'text-k-nacht-2' : 'text-k-tinte-2';
  const merkmale = [istNeu(name) ? 'Vollsatz' : 'Grundsatz', istMarke(name) ? 'Marke' : null, schraegeVon(name) ? 'Schräge' : null].filter(
    (m): m is string => m !== null,
  );
  return (
    <div className={`flex min-w-0 flex-col gap-k-3 p-k-4 ${nacht ? 'bg-k-tinte text-k-kalk' : 'bg-k-fliese text-k-tinte'}`}>
      <div className="flex items-end gap-k-3">
        {GROESSEN.map((g) => (
          <Icon key={g} name={name} groesse={g} />
        ))}
      </div>
      <div className="k-mono text-k-2 wrap-break-word">{name}</div>
      <div className={`k-mono text-k-1 wrap-break-word ${zweit}`}>{merkmale.join(' · ')}</div>
    </div>
  );
}

function Tafel({ nacht = false }: { nacht?: boolean }) {
  return (
    <div className={`mt-k-4 grid grid-cols-2 gap-px md:grid-cols-4 lg:grid-cols-6 ${nacht ? 'bg-k-nacht-fuge' : 'bg-k-fuge'}`}>
      {ALLE.map((n) => (
        <Feld key={n} name={n} nacht={nacht} />
      ))}
    </div>
  );
}

const statusText = (a: IconAbbildung | null) => {
  if (a === null) return 'nicht verzeichnet';
  if (a.status === 'icon') return a.hinweis ?? 'Kern-Icon';
  if (a.status === 'marke') return `${a.marke} · ${a.grund}`;
  if (a.status === 'vollsatz') return `${a.grund} · ${a.fachzeichen}`;
  return a.hinweis ? `${a.grund} · ${a.hinweis}` : a.grund;
};

const ZELLE = 'min-w-0 border border-k-fuge p-k-2 align-top wrap-break-word hyphens-auto';

function Zeile({ name, a }: { name: string; a: IconAbbildung | null }) {
  return (
    <tr>
      <td className={`k-mono ${ZELLE}`}>{name}</td>
      <td className={ZELLE}>
        {a?.status === 'icon' ? (
          <div className="flex flex-wrap items-center gap-k-2">
            <Icon {...a.ziel} groesse={20} />
            <div className="k-mono text-k-1 min-w-0 wrap-break-word">
              {a.ziel.name}
              {a.ziel.richtung ? ` · ${a.ziel.richtung}` : ''}
            </div>
          </div>
        ) : (
          <div className="k-mono text-k-1 text-k-tinte-2">–</div>
        )}
      </td>
      <td className={`text-k-tinte-2 ${ZELLE}`}>{statusText(a)}</td>
    </tr>
  );
}

function Tabelle({ titelId, titel, zeilen }: { titelId: string; titel: string; zeilen: readonly { name: string; a: IconAbbildung | null }[] }) {
  return (
    <section aria-labelledby={titelId} className="mt-k-7">
      <h2 id={titelId} className="k-anzeige text-k-4">
        {titel}
      </h2>
      <table className="mt-k-4 w-full table-fixed border-collapse bg-k-fliese text-k-2">
        <thead>
          <tr className="k-mono text-k-1 text-k-tinte-2">
            <th scope="col" className={`${ZELLE} text-left font-normal`}>Name</th>
            <th scope="col" className={`${ZELLE} text-left font-normal`}>Kern</th>
            <th scope="col" className={`${ZELLE} text-left font-normal`}>Status</th>
          </tr>
        </thead>
        <tbody>
          {zeilen.map((z) => (
            <Zeile key={z.name} name={z.name} a={z.a} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function VorschauIconVollsatz() {
  const konfig = KONFIG_ICON_NAMEN.map((name) => ({ name, a: iconAbbildung(name) }));
  const bestand = BESTAND_ICON_NAMEN.map((name) => ({ name, a: iconAbbildung(name) }));
  const kontext = Object.keys(KONTEXT_ABBILDUNG).map((name) => ({ name, a: iconAbbildung(null, name) }));
  const zaehle = (s: IconAbbildung['status']) => bestand.filter((z) => z.a?.status === s).length;
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-8 k-text">
      <h1 className="k-anzeige text-k-6">Vorschau P4‑04 · Icon-Vollsatz</h1>
      <p className="mt-k-3 max-w-(--k-mass) text-k-2 text-k-tinte-2">
        24er-Raster · Strich 1,5 · square · miter · currentColor. Je Feld 16, 20 und 24 px.
      </p>
      <dl className="mt-k-4 grid grid-cols-2 gap-px bg-k-fuge md:grid-cols-5">
        {[
          ['Familie', FAMILIEN_NAMEN.length],
          ['davon Vollsatz', VOLLSATZ_NAMEN.length],
          ['Bestandsnamen', bestand.length],
          ['auf Kern-Icon', zaehle('icon')],
          ['entfällt / Marke', `${zaehle('entfaellt')} / ${zaehle('marke')}`],
        ].map(([k, v]) => (
          <div key={k} className="min-w-0 bg-k-fliese p-k-3">
            <dt className="k-mono text-k-1 text-k-tinte-2">{k}</dt>
            <dd className="k-mono text-k-4">{v}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="t-hell" className="mt-k-7">
        <h2 id="t-hell" className="k-anzeige text-k-4">Tafel auf Fliese</h2>
        <Tafel />
      </section>

      <section aria-labelledby="t-tinte" className="mt-k-7">
        <h2 id="t-tinte" className="k-anzeige text-k-4">Tafel auf Tinte</h2>
        <Tafel nacht />
      </section>

      <Tabelle titelId="t-kontext" titel="Kontext vor Name (services.js)" zeilen={kontext} />
      <Tabelle titelId="t-konfig" titel="Konfig-Strings (src/config)" zeilen={konfig} />
      <Tabelle titelId="t-bestand" titel="lucide- und Phosphor-Importe (Bestand)" zeilen={bestand} />
    </div>
  );
}
