'use client';

// Servicegebiet-Karte (F-12, P3-12): bindet den Zwei-Klick-Platzhalter (P3-08) erst ein, wenn die Planfläche in die Nähe
// des Blicks kommt (200 px Vorlauf, wie der Bestand `ServiceMapWrapper`). Bis dahin dieselbe Box mit dem Bestandstext
// „Karte wird geladen...“ – gleiche Seitenverhältnisse wie der Platzhalter, kein Layoutsprung beim Wechsel.
// Die Karte selbst (`children`) lädt allein `KartenPlatzhalter`, und nur nach Marketing-Einwilligung
// (`useKartenEinwilligung`): vorher keine Anfrage an Karten-Hosts.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import KartenPlatzhalter from '@/components/kern/einwilligung/KartenPlatzhalter';

export default function KarteImBlick({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imBlick, setImBlick] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag?.isIntersecting) return;
        setImBlick(true);
        beobachter.disconnect();
      },
      { rootMargin: '200px' },
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      {imBlick ? (
        <KartenPlatzhalter>{children}</KartenPlatzhalter>
      ) : (
        <div className="@container w-full">
          <div className="k-muster-kreuzfuge relative flex aspect-4/5 w-full items-center justify-center border border-k-fuge bg-k-kalk @md:aspect-square @xl:aspect-video">
            <p className="bg-k-kalk px-k-2 k-mono text-k-1 text-k-tinte-2">Karte wird geladen...</p>
          </div>
        </div>
      )}
    </div>
  );
}
