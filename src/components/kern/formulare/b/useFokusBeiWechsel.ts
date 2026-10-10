// Fokusführung der Formulare P3-13b: Wechselt die Ansicht (Schritt, Erfolg, zurück zum Formular), geht der Fokus auf das
// Ziel der neuen Ansicht – die Schrittüberschrift bzw. die Erfolgsmeldung (tabIndex={-1}). Beim ersten Rendern nicht,
// damit das Laden der Seite den Fokus nicht verschiebt. Das Ziel ist genau ein Element je Ansicht (ein Ref für alle).
import { useEffect, useRef, type RefObject } from 'react';

export function useFokusBeiWechsel(ansicht: string, ziel: RefObject<HTMLElement | null>) {
  const vorher = useRef(ansicht);
  useEffect(() => {
    if (vorher.current === ansicht) return;
    vorher.current = ansicht;
    ziel.current?.focus();
  }, [ansicht, ziel]);
}
