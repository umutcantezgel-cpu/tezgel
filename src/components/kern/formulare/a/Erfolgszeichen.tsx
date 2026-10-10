// Erfolgszeichen der Anfrage-Formulare (P3-13a, K-006 „Erfolg = Haken + Text“, K-009 Register `notiert`):
// Haken inline (Pfade mit pathLength=1), damit `notiert` an der Hülle ihn zeichnen kann; reduziert steht er sofort.
// Farbe Abnahme an der Hülle (forced-colors erbt die Textfarbe). Dekorativ – die Bedeutung trägt der Text daneben.
import Icon from '@/components/kern/icons/Icon';

export default function Erfolgszeichen() {
  return (
    <span data-motion="notiert" className="flex h-lh shrink-0 items-center text-k-abnahme">
      <Icon name="haken" groesse={24} inline />
    </span>
  );
}
