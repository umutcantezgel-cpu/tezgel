// Fokusführung der Anfrage-Formulare (P3-13a, K-011): Nach dem Wechsel ins Erfolgsbild geht der Fokus auf die
// Erfolgsmeldung (tabIndex -1), damit Screenreader sie hören – der Absende-Knopf ist dann nicht mehr im Baum und der
// Fokus fiele sonst auf <body>. Zurück ins Formular („Weitere Anfrage stellen“) geht er auf den Formularkopf.
// Nur beim Wechsel, nie beim ersten Rendern: Ein Formular, das schon im Erfolg startet (Vorschau), zieht keinen Fokus.
// Ohne 'use client': nur aus Client-Komponenten importiert.
import { useEffect, useRef } from 'react';

export function useFokusWechsel(erfolg: boolean) {
  const erfolgRef = useRef<HTMLDivElement>(null);
  const formularRef = useRef<HTMLDivElement>(null);
  const vorher = useRef(erfolg);

  useEffect(() => {
    if (erfolg === vorher.current) return;
    vorher.current = erfolg;
    (erfolg ? erfolgRef.current : formularRef.current)?.focus();
  }, [erfolg]);

  return { erfolgRef, formularRef };
}
