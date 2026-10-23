// Öffnungszeiten als Text nach den Schreibregeln (K-010: Zeitspannen mit „bis“, kein Gedankenstrich).
// Quelle sind die strukturierten Tageszeiten in COMPANY_DATA.hours (unverändert, G8); die vorformatierten Zeilen dort
// widersprechen sich beim Freitag (M-03), deshalb gelten die Tageswerte (Annahme in MENSCHEN.md).
import { COMPANY_DATA } from '@/config/company';

type Tag = { open: string; close: string; type: string };
const TAGE = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
const KURZ: Record<(typeof TAGE)[number], string> = { monday: 'Mo', tuesday: 'Di', wednesday: 'Mi', thursday: 'Do', friday: 'Fr', saturday: 'Sa', sunday: 'So' };

/** „07:30“ → „7:30“, „18:00“ → „18“ */
export function uhrzeit(hhmm: string): string {
  const [h, m] = hhmm.split(':');
  return m === '00' ? String(Number(h)) : `${Number(h)}:${m}`;
}

/** Zeilen wie „Mo bis Do 7:30 bis 18 Uhr“, „Fr 7:30 bis 17 Uhr“, „Sa nach Vereinbarung“ (gleiche Tage zusammengefasst). */
export function oeffnungszeilen(hours: Record<string, unknown> = COMPANY_DATA.hours): string[] {
  const zeilen: string[] = [];
  let i = 0;
  while (i < TAGE.length) {
    const t = hours[TAGE[i]] as Tag | undefined;
    if (!t || t.type === 'closed') {
      i++;
      continue;
    }
    let j = i;
    while (j + 1 < TAGE.length) {
      const n = hours[TAGE[j + 1]] as Tag | undefined;
      if (!n || n.type !== t.type || n.open !== t.open || n.close !== t.close) break;
      j++;
    }
    const tage = i === j ? KURZ[TAGE[i]] : `${KURZ[TAGE[i]]} bis ${KURZ[TAGE[j]]}`;
    zeilen.push(t.type === 'appointment_only' ? `${tage} nach Vereinbarung` : `${tage} ${uhrzeit(t.open)} bis ${uhrzeit(t.close)} Uhr`);
    i = j + 1;
  }
  return zeilen;
}
