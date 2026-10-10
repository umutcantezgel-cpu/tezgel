'use client';

import { useEffect } from 'react';

declare global {
  interface Window { __kBewegung?: boolean }
}

// K-009: einziges Skript für Auslöser „Sicht“. Elemente mit data-motion und data-ausloeser="sicht"
// bekommen data-sichtbar, sobald ihr Schwellenwert (data-schwelle, Standard 0,2) erreicht ist.
// Die Bewegung selbst steckt im CSS (kern.css) und hängt an html.k-bewegung.
export default function BewegungsRegie() {
  useEffect(() => {
    const wurzel = document.documentElement;
    if (!wurzel.classList.contains('k-bewegung')) return;
    window.__kBewegung = true;
    if (!('IntersectionObserver' in window)) {
      wurzel.classList.remove('k-bewegung');
      return;
    }
    const beobachter = new Map<number, IntersectionObserver>();
    const holen = (schwelle: number) => {
      let b = beobachter.get(schwelle);
      if (!b) {
        b = new IntersectionObserver((eintraege, eigener) => {
          for (const e of eintraege) {
            if (!e.isIntersecting) continue;
            e.target.setAttribute('data-sichtbar', '');
            eigener.unobserve(e.target);
          }
        }, { threshold: schwelle });
        beobachter.set(schwelle, b);
      }
      return b;
    };
    document.querySelectorAll<HTMLElement>('[data-motion][data-ausloeser="sicht"]:not([data-sichtbar])').forEach((el) => {
      const schwelle = Number(el.dataset.schwelle ?? '0.2');
      holen(Number.isFinite(schwelle) ? schwelle : 0.2).observe(el);
    });
    return () => beobachter.forEach((b) => b.disconnect());
  }, []);
  return null;
}
