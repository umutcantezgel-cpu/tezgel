// Popover-Hilfen für die Client-Teile des Kopfs (Variante A).
// Öffnen, Schließen, Escape, Light-Dismiss und Fokus zurück erledigt der Browser über `popover` + `popovertarget` –
// schon vor der Hydrierung (V-06). Diese Datei liest nur den Zustand und schaltet dort, wo der Browser keinen Auslöser
// hat (Hover-Absicht, Klick auf einen Link, Seitenwechsel). Browser ohne Popover-API (etwa Safari < 17): Ersatz über
// das Attribut `open` (die Klasse `not-open:hidden` blendet das Element sonst aus), dann ohne Escape/Light-Dismiss.
import { useCallback, useSyncExternalStore } from 'react';

const unterstuetzt = () => typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype;

export function istOffen(el: HTMLElement): boolean {
  if (!unterstuetzt()) return el.hasAttribute('open');
  return el.matches(':popover-open');
}

function ersatzSetzen(el: HTMLElement, offen: boolean) {
  el.toggleAttribute('open', offen);
  el.dispatchEvent(new Event('toggle'));
}

export function zeige(el: HTMLElement | null) {
  if (!el || istOffen(el)) return;
  if (unterstuetzt()) el.showPopover();
  else ersatzSetzen(el, true);
}

export function verberge(el: HTMLElement | null) {
  if (!el || !istOffen(el)) return;
  if (unterstuetzt()) el.hidePopover();
  else ersatzSetzen(el, false);
}

/** Klick-Ersatz für `popovertarget` in Browsern ohne Popover-API; mit API tut er nichts (der Browser schaltet). */
export function ersatzUmschalten(id: string) {
  if (unterstuetzt()) return;
  const el = document.getElementById(id);
  if (el) ersatzSetzen(el, !istOffen(el));
}

/**
 * Offen-Zustand eines Popovers als React-Wert. Vor der Hydrierung (Server-Schnappschuss) `null`: dann rendert der Schalter
 * kein `aria-expanded`, und der Browser meldet den Zustand des `popovertarget`-Auslösers selbst richtig – auch wenn vor der
 * Hydrierung schon getippt wurde. Nach der Hydrierung ist der Wert der echte Zustand des Elements.
 */
export function usePopoverOffen(id: string): boolean | null {
  const abonnieren = useCallback(
    (melden: () => void) => {
      const el = document.getElementById(id);
      el?.addEventListener('toggle', melden);
      return () => el?.removeEventListener('toggle', melden);
    },
    [id],
  );
  return useSyncExternalStore<boolean | null>(
    abonnieren,
    () => {
      const el = document.getElementById(id);
      return el ? istOffen(el) : false;
    },
    () => null,
  );
}
