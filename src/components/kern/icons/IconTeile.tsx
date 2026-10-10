import { ICONS, MARKEN, istMarke, type IconName } from '@/components/kern/icons/geometrie';

// Zeichnet die Geometrie eines Zeichens (gemeinsam für Sprite und Inline-Darstellung).
// `pfadLaenge`: setzt pathLength="1" an jedem Pfad, damit Linienzeichnen (Register `notiert`) greift.
export default function IconTeile({ name, pfadLaenge = false }: { name: IconName; pfadLaenge?: boolean }) {
  if (istMarke(name)) return <path d={MARKEN[name].d} />;
  const laenge = pfadLaenge ? 1 : undefined;
  return (
    <>
      {ICONS[name].teile.map((teil, i) => {
        if ('kreis' in teil) {
          const [cx, cy, r] = teil.kreis;
          return <circle key={i} cx={cx} cy={cy} r={r} pathLength={laenge} />;
        }
        if ('voll' in teil) return <path key={i} d={teil.d} fill="currentColor" pathLength={laenge} />;
        return <path key={i} d={teil.d} pathLength={laenge} />;
      })}
    </>
  );
}
