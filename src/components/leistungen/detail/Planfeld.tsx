// /leistungen/[id] · Planfeld (S-04, KERN v2 K-006 Randspalte, K-008): die gezeichnete Vignette der Leistung in der
// Randspalte des Einstiegs – dieselbe Zeichnung wie im Plan-Feld der Leistung auf `/leistungen` (S-01, `Gewerk`), mit
// derselben Mono-Nummer im Feldkopf (01 Bäder … 04 Untergrund). So setzt die Detailseite die Übersicht sichtbar fort.
// Ab lg sitzt das Feld unten in der Randspalte, auf Höhe der Aktionen (wie das Schriftfeld eines Planblatts rechts unten);
// mobil steht es nach den Aktionen (Einstieg: H1 → Text → Aktionen → Plan).
// Der Wrapper der Zeichnung trägt `[data-plan-feld]` wie auf `/leistungen`: Ansatzpunkt für den Plan-Morph des
// Seitenwechsels (K-007, Register `seitenwechsel`), ohne Markup-Umbau. Dekorativ (Vignette aria-hidden), Server-Komponente.
import { SERVICES } from '@/config/services';
import { VIGNETTEN, istVignette } from '@/components/start/vignetten';
import { gewerkNummer } from '@/components/leistungen/Sprungindex';

export default function Planfeld({ id }: { id: string }) {
  if (!istVignette(id)) return null;
  const Vignette = VIGNETTEN[id];
  const nr = SERVICES.findIndex((leistung) => leistung.id === id);

  return (
    <div className="flex h-full flex-col justify-end">
      <div className="border border-fuge bg-fliese">
        {/* Feldkopf: Nummer der Leistung in Mono (wie im Feldkopf auf /leistungen) */}
        <div className="border-b border-fuge px-6 py-3">
          <span className="font-mono text-fs-1 text-tinte">{gewerkNummer(nr)}</span>
        </div>
        <div className="p-6 md:p-12">
          <div data-plan-feld={id} className="mx-auto max-w-md text-tinte">
            <Vignette />
          </div>
        </div>
      </div>
    </div>
  );
}
