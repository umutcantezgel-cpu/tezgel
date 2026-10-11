'use client';

// WhatsApp-Kanal am Desktop (P3-07, E-012, K-011): flacher, rechteckiger Knopf rechts unten im Formsystem –
// ohne Abzeichen, ohne Physik/Ziehen, ohne Tooltip. Erst ab lg; darunter liegt der Weg in der unteren Leiste.
// Logik nur über den Hook `useWhatsAppKanal` (P3-00p): seitenbezogener Text, Ereignis `whatsapp_click`, 450-ms-Sperre,
// Desktop über window.open. Ohne Nummer kein Knopf – Sperre wie im Bestand (`companyInfo.socialMedia.whatsapp`).
// `id="whatsapp-floating-btn"` und der zugängliche Name bleiben wörtlich (Tests, Analyse).
// Als Link mit echtem Ziel: vor der Hydrierung öffnet ein Klick dasselbe Ziel (gleicher Text) in einem neuen Tab.
//
// Verdeckt nie Formularfelder oder die Hauptaktion: Liegt ein Feld, ein Knopf in einem Formular, ein Element mit
// `data-hauptaktion` oder ein Bereich mit `data-kanal-frei` (z. B. Abschlusszeile des Fußes) unter dem Knopf, oder hat ein
// Element unter ihm den Fokus (WCAG 2.4.11), ist er unsichtbar (visibility: hidden – auch aus Tab-Folge und Barrierebaum).
// Er startet unsichtbar und erscheint nach der ersten Prüfung; ohne JavaScript bleibt er aus (WhatsApp steht im Fuß).
// Bewegung nur über das Register: `druck` (1 px, :active) und Farbwechsel; Ein-/Ausblenden ohne Übergang.
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { companyInfo } from '@/lib/data/company';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useWhatsAppKanal } from '@/lib/formulare/useWhatsAppKanal';
import { fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

/** Was der Kanal nie verdecken darf. Seiten markieren ihre Hauptaktion mit `data-hauptaktion`. */
export const FREIHALTEN =
  'input:not([type="hidden"]), select, textarea, form button, [data-hauptaktion], [data-kanal-frei]';

const BREIT = '(min-width: 1024px)';

function ueberlappt(a: DOMRect, b: DOMRect): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export default function WhatsAppKanal() {
  const pathname = usePathname() || '';
  const { triggerWhatsAppAction, contextMessage } = useWhatsAppKanal(pathname);
  const knopfRef = useRef<HTMLAnchorElement>(null);
  const [frei, setFrei] = useState(false);

  useEffect(() => {
    const knopf = knopfRef.current;
    if (!knopf) return;
    const breit = window.matchMedia(BREIT);
    const unter = new Set<Element>();
    let fokusUnter = false;
    let io: IntersectionObserver | null = null;
    let rahmen = 0;

    const melden = () => setFrei(breit.matches && unter.size === 0 && !fokusUnter);

    const pruefeFokus = () => {
      const aktiv = document.activeElement;
      fokusUnter =
        aktiv instanceof HTMLElement && aktiv !== knopf && aktiv !== document.body &&
        ueberlappt(aktiv.getBoundingClientRect(), knopf.getBoundingClientRect());
    };

    // Beobachtungsfläche = Fläche des Knopfs (rootMargin aus seinem Rechteck, nach jeder Größenänderung neu).
    const beobachten = () => {
      io?.disconnect();
      io = null;
      unter.clear();
      if (breit.matches) {
        const r = knopf.getBoundingClientRect();
        const rand = `${-r.top}px ${-(window.innerWidth - r.right)}px ${-(window.innerHeight - r.bottom)}px ${-r.left}px`;
        const beobachter = new IntersectionObserver(
          (eintraege) => {
            for (const e of eintraege) {
              if (e.isIntersecting) unter.add(e.target);
              else unter.delete(e.target);
            }
            melden();
          },
          { rootMargin: rand },
        );
        let beobachtet = 0;
        document.querySelectorAll(FREIHALTEN).forEach((el) => {
          if (!knopf.contains(el)) { beobachter.observe(el); beobachtet++; }
        });
        io = beobachter;
        pruefeFokus();
        // Erst der erste Bericht des Beobachters weiß, was unter dem Knopf liegt – vorher nicht freigeben (kein Aufblitzen
        // über der Hauptaktion beim Laden). Ohne beobachtete Elemente kommt kein Bericht: dann sofort melden.
        if (beobachtet === 0) melden();
        return;
      }
      pruefeFokus();
      melden();
    };

    const spaeter = (aufgabe: () => void) => {
      cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(aufgabe);
    };
    const neu = () => spaeter(beobachten);
    const fokusNeu = () =>
      spaeter(() => {
        pruefeFokus();
        melden();
      });

    // Nachgeladene Formulare (dynamische Inseln) und Seitenwechsel erfassen.
    const mo = new MutationObserver(neu);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', neu);
    breit.addEventListener('change', neu);
    document.addEventListener('focusin', fokusNeu);
    document.addEventListener('focusout', fokusNeu);
    window.addEventListener('scroll', fokusNeu, { passive: true });
    neu();

    return () => {
      cancelAnimationFrame(rahmen);
      io?.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', neu);
      breit.removeEventListener('change', neu);
      document.removeEventListener('focusin', fokusNeu);
      document.removeEventListener('focusout', fokusNeu);
      window.removeEventListener('scroll', fokusNeu);
    };
  }, [pathname]);

  const whatsappNumber = companyInfo.socialMedia.whatsapp;
  if (!whatsappNumber) return null;

  const oeffnen = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    triggerWhatsAppAction();
  };

  return (
    <a
      ref={knopfRef}
      id="whatsapp-floating-btn"
      href={buildWhatsAppUrl(whatsappNumber, contextMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-Nachricht an Fliesenverlegung Tezgel senden"
      onClick={oeffnen}
      data-motion="druck"
      data-frei={frei ? '' : undefined}
      className={verbinde(
        'fixed right-(--k-rand) bottom-k-6 z-40 hidden min-h-k-7 items-center gap-k-3 px-k-4 lg:inline-flex',
        'rounded-k-0 border border-k-strich bg-k-fliese text-k-tinte',
        'k-mono text-k-2',
        'cursor-pointer pointer-fine:hover:border-k-tinte pointer-fine:hover:bg-k-kalk active:border-k-tinte active:bg-k-fuge',
        fokus('hell'),
        !frei && 'invisible',
      )}
    >
      <Icon name="whatsapp" groesse={20} />
      <span>WhatsApp</span>
    </a>
  );
}
