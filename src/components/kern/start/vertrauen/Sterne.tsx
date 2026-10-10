// Bewertungssterne (P3-12, K-003 „Maß statt Behauptung“): zeigen genau den Wert – volle Sterne bis zum ganzzahligen Anteil,
// der Rest als Kontur; bei 5,0 von 5 sind alle gefüllt. Immer dekorativ (aria-hidden): Der Textwert steht daneben,
// nie trägt die Form allein die Information. Farbe Tinte an der Hülle (forced-colors, siehe Zeichen.tsx), kein Gelb.
import Icon from '@/components/kern/icons/Icon';

export type SterneProps = { wert: number; max: number };

export default function Sterne({ wert, max }: SterneProps) {
  const voll = Math.floor(wert);
  return (
    <span aria-hidden="true" className="inline-flex shrink-0 items-center text-k-tinte">
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} name={i < voll ? 'stern-voll' : 'stern'} groesse={16} />
      ))}
    </span>
  );
}
