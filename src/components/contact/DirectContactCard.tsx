// Direkter Kontakt (E2-ORCH-09, hell seit E3-NACH-04; Abnahme E3-BAU-09 nach K-010 und K-016): die Wege zu Deniz Tezgel als
// Zeilen an der Fuge, Etikett über dem Wert, Werte in Mono. Ohne eigenes Etikett, eigene Überschrift und Werbesatz: die
// Überschrift „Lieber anrufen oder schreiben?“ setzt der Abschnitt der Seite. Etiketten wie in `_werkstatt/texte/kontakt.md`.
// Öffnungszeiten aus den Tageswerten (`oeffnungszeilen`, M-03: „Sa nach Vereinbarung“ wie im Fuß, kein Widerspruch auf der
// Seite). Serverkomponente; Rufnummern, Adresse und Ziele unverändert (SITE_CONFIG, G8).
import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Icon, { type IconName } from '@/components/icons/Icon';
import Rufnummer from '@/components/kern/Rufnummer';
import { oeffnungszeilen } from '@/lib/oeffnungszeiten';
import { SITE_CONFIG } from '@/shared/config/site';

export interface DirectContactCardProps {
  className?: string;
}

const etikett = 'block font-mono text-fs-1 text-tinte-2 @max-3xs:hyphens-auto wrap-break-word';

/** tel:-Ziel ohne Leerzeichen (RFC 3966); die Nummer selbst bleibt unverändert (G8) */
const telLink = (nummer: string) => `tel:${nummer.replace(/\s/g, '')}`;

function Weg({ href, icon, label, wert, extern, text = false }: { href: string; icon: IconName; label: string; wert: ReactNode; extern?: boolean; text?: boolean }) {
  return (
    <a
      href={href}
      {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex min-h-11 items-center justify-between gap-4 border-b border-fuge py-4 text-tinte"
    >
      <span className="flex min-w-0 items-center gap-4">
        <Icon name={icon} groesse={5} className="shrink-0 text-tinte-2" />
        <span className="min-w-0">
          <span className={etikett}>{label}</span>
          <span className={clsx('mt-1 block text-fs-3 underline decoration-transparent underline-offset-4 group-hover:decoration-tinte wrap-break-word', text ? 'font-text font-semibold' : 'font-mono')}>{wert}</span>
        </span>
      </span>
      <Icon name={extern ? 'link-extern' : 'pfeil-rechts'} groesse={5} className="shrink-0 text-tinte-2" />
    </a>
  );
}

/** Kontaktwege: Telefon, Mobil (Anruf), Nachricht per WhatsApp, E-Mail, Öffnungszeiten, Adresse */
export function DirectContactCard({ className = '' }: DirectContactCardProps) {
  return (
    <div className={clsx('@container border border-fuge bg-fliese p-6 text-tinte sm:p-8', className)}>
      <div className="border-t border-strich">
        <Weg href={telLink(SITE_CONFIG.contact.telephone)} icon="telefon" label="Telefon" wert={<Rufnummer nummer={SITE_CONFIG.contact.telephoneFormatted} />} />
        <Weg href={telLink(SITE_CONFIG.contact.mobile)} icon="telefon" label="Mobil" wert={<Rufnummer nummer={SITE_CONFIG.contact.mobileFormatted} />} />
        <Weg href={SITE_CONFIG.contact.whatsappLink} icon="sprechblase" label="WhatsApp" wert="Nachricht per WhatsApp" extern text />
        <Weg href={`mailto:${SITE_CONFIG.contact.email}`} icon="mail" label="E-Mail" wert={SITE_CONFIG.contact.email} />

        <div className="flex items-start gap-4 border-b border-fuge py-4">
          <Icon name="uhr" groesse={5} className="mt-1 shrink-0 text-tinte-2" />
          <div className="min-w-0">
            <span className={etikett}>Öffnungszeiten</span>
            <ul className="mt-1 font-mono text-fs-2 text-tinte wrap-break-word">
              {oeffnungszeilen().map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <Icon name="ort" groesse={5} className="mt-1 shrink-0 text-tinte-2" />
          <div className="min-w-0">
            <span className={etikett}>Adresse unseres Betriebs</span>
            <div className="mt-1 font-mono text-fs-2 text-tinte wrap-break-word">{SITE_CONFIG.headquarters.streetAddress}</div>
            <div className="font-mono text-fs-2 text-tinte wrap-break-word">
              {SITE_CONFIG.headquarters.postalCode} {SITE_CONFIG.headquarters.addressLocality}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectContactCard;
