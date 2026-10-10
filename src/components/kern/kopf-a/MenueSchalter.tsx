'use client';

// Menü-Schalter unter lg (Variante A): ein Feld am rechten Rand des Kopfs. Öffnet das Mobilblatt über `popovertarget`,
// also schon vor der Hydrierung (V-06). Nach der Hydrierung folgen `aria-expanded` und der Name dem echten Zustand.
import Icon from '@/components/kern/icons/Icon';
import { fokus } from '@/components/kern/basis/klassen';
import { ersatzUmschalten, usePopoverOffen } from '@/components/kern/kopf-a/popover';
import { BLATT_ID, TEXTE } from '@/components/kern/kopf-a/texte';

export default function MenueSchalter() {
  const offen = usePopoverOffen(BLATT_ID);
  return (
    <button
      type="button"
      popoverTarget={BLATT_ID}
      aria-controls={BLATT_ID}
      aria-haspopup="dialog"
      aria-expanded={offen ?? undefined}
      aria-label={TEXTE.menue(offen === true)}
      onClick={() => ersatzUmschalten(BLATT_ID)}
      data-motion="zustand"
      className={`flex h-full w-(--k-kopf-hoehe) shrink-0 cursor-pointer items-center justify-center border-l border-k-fuge text-k-tinte pointer-fine:hover:bg-k-kalk active:bg-k-fuge lg:hidden ${fokus('hell')}`}
    >
      <Icon name="menue" groesse={24} />
    </button>
  );
}
