// Direkter Kontakt (E2-ORCH-09, hell seit E3-NACH-04): Schriftfeld auf Fliese – Wege zu Inhaber Deniz Tezgel als Zeilen
// an der Fuge, Etikett in Mono über dem Wert; alle Werte (Telefon, Zeiten, Adresse) gleich in Mono gesetzt. Vor dem Fuß
// bleibt so nur eine dunkle Fläche (Abschluss). Serverkomponente; Adressen, Texte und Ziele unverändert (SITE_CONFIG).
import React from 'react';
import clsx from 'clsx';
import Icon, { type IconName } from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { SITE_CONFIG } from '@/shared/config/site';

export interface DirectContactCardProps {
  className?: string;
}

const etikett = 'block font-mono text-fs-1 text-tinte-2';

function Weg({ href, icon, label, wert, extern }: { href: string; icon: IconName; label: string; wert: string; extern?: boolean }) {
  return (
    <a
      href={href}
      {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex min-h-11 items-center justify-between gap-4 border-b border-fuge py-4 text-tinte"
    >
      <span className="flex items-center gap-4">
        <Icon name={icon} groesse={5} className="text-tinte-2" />
        <span>
          <span className={etikett}>{label}</span>
          <span className="mt-1 block font-mono text-fs-3 underline decoration-transparent underline-offset-4 group-hover:decoration-tinte">{wert}</span>
        </span>
      </span>
      <Icon name={extern ? 'link-extern' : 'pfeil-rechts'} groesse={5} className="text-tinte-2" />
    </a>
  );
}

/**
 * Direct Contact Information Card
 * Immediate direct contact pathways to Inhaber Deniz Tezgel without wait times.
 */
export function DirectContactCard({ className = '' }: DirectContactCardProps) {
  return (
    <div className={clsx('bg-fliese p-6 text-tinte sm:p-8 lg:p-12', className)}>
      <span className="inline-flex items-center gap-2 font-mono text-fs-1 text-tinte">
        <Fugenkreuz className="size-3 text-strich" />
        <span>Eingetragener HWK-Fachbetrieb</span>
      </span>
      <h3 className="mt-4 text-fs-5 text-tinte">Direkter Kontakt</h3>
      <p className="mt-2 text-fs-2 text-tinte-2">
        Sprechen Sie direkt mit Inhaber Deniz Tezgel – ohne Callcenter oder Warteschleifen.
      </p>

      <div className="mt-6 border-t border-strich">
        <Weg href={`tel:${SITE_CONFIG.contact.telephone}`} icon="telefon" label="Büro / Festnetz" wert={SITE_CONFIG.contact.telephoneFormatted} />
        <Weg href={SITE_CONFIG.contact.whatsappLink} icon="sprechblase" label="Mobil & WhatsApp" wert={SITE_CONFIG.contact.mobileFormatted} extern />
        <Weg href={`mailto:${SITE_CONFIG.contact.email}`} icon="mail" label="E-Mail Adresse" wert={SITE_CONFIG.contact.email} />

        <div className="flex items-start gap-4 border-b border-fuge py-4">
          <Icon name="uhr" groesse={5} className="mt-1 text-tinte-2" />
          <div>
            <span className={etikett}>Bürozeiten</span>
            <div className="mt-1 font-mono text-fs-2 text-tinte">
              Mo–Do: {SITE_CONFIG.contact.openingHours.opens} – {SITE_CONFIG.contact.openingHours.closes} Uhr
            </div>
            <div className="font-mono text-fs-2 text-tinte">
              Fr: {SITE_CONFIG.contact.openingHours.opens} – {SITE_CONFIG.contact.openingHours.fridayCloses} Uhr
            </div>
            <div className="font-mono text-fs-2 text-tinte-2">
              Sa: {SITE_CONFIG.contact.openingHours.saturday}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <Icon name="ort" groesse={5} className="mt-1 text-tinte-2" />
          <div>
            <span className={etikett}>Betriebssitz (HQ)</span>
            <div className="mt-1 font-mono text-fs-2 text-tinte">
              {SITE_CONFIG.headquarters.streetAddress}
            </div>
            <div className="font-mono text-fs-2 text-tinte-2">
              {SITE_CONFIG.headquarters.postalCode} {SITE_CONFIG.headquarters.addressLocality} (Mittelhessen)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectContactCard;
