// Fuß der Kern-Schale (P3-07, KERN v1.2 K-003 Prinzip 5, K-006, K-008 „Fläche Tinte für den Fuß“, K-011).
// Aufbau als Schriftfeld eines Plans: Felder auf Tinte, getrennt nur durch 1-px-Fugen in Nacht-Fuge, Feldköpfe in Mono.
// Inhalt wörtlich aus dem Bestand `src/components/common/Footer.jsx` (Texte, Links, Ziele, zugängliche Namen, Credits);
// Daten gelesen aus `@/config/navigation` und `@/config/company`. Reihenfolge und Gruppierung folgen dem Formsystem,
// nichts fällt weg, nichts kommt hinzu (Inhaltsabgleich in `_relaunch/pakete/P3-07.rueckgabe.md`).
// Mobil eigene Reihenfolge: Stammdaten/Kontakt zuerst, Linkgruppen als knappe Spalten (zwei je Gruppe) – ohne JavaScript
// vollständig sichtbar und bedienbar. Server-Komponente: kein 'use client', keine Hooks.
// Öffnungsstatus: Der Bestand zeigt keinen (nur die Zeiten) – daher keine Client-Insel.
// `data-kanal-frei`: der WhatsApp-Kanal (Desktop) weicht diesem Bereich aus und verdeckt ihn nie (WhatsAppKanal.tsx).
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import {
  footerBathLinks,
  footerServiceLinks,
  footerLocationLinks,
  footerCompanyLinks,
  footerLegalLinks,
} from '@/config/navigation';
import { Feldraster, Knopf, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';

type Verweis = { name: string; path: string };

// Überschriften der Linkgruppen wörtlich aus dem Bestand (LINK_COLUMNS); zugleich Name der jeweiligen Navigation.
const LINKGRUPPEN: ReadonlyArray<{ title: string; links: readonly Verweis[] }> = [
  { title: 'Badsanierung', links: footerBathLinks },
  { title: 'Fachgewerke & Fachthemen', links: footerServiceLinks },
  { title: 'Standorte Hessen', links: footerLocationLinks },
  { title: 'Unternehmen & Ratgeber', links: footerCompanyLinks },
];

// Garantie-Sockel wörtlich aus dem Bestand (GUARANTEES); Etiketten (K-012 Kl. 3) – Wortlaut bleibt, Form wird Feldkopf in Mono.
// Die lucide-Zeichen der Kacheln entfallen (Icon-Kachel, S-11; Abbildung `src/lib/kern/icons.ts`).
const GARANTIEN: ReadonlyArray<{ title: string; text: string }> = [
  { title: 'HWK Fachbetrieb', text: COMPANY_DATA.authority.shortName },
  { title: 'DIN 18534', text: 'Verbundabdichtung' },
  { title: 'Staubschutz-Garantie', text: 'bei bewohnten Sanierungen' },
  { title: 'Festpreisgarantie', text: 'transparent kalkuliert' },
];

// Fokus auf Tinte: 2 px Kalk, 2 px Abstand (K-006).
const FOKUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-kalk';

// Listenlink auf Tinte: Ruhe Nacht-Text, Hover (feiner Zeiger)/aktiv Kalk mit Unterstreichung, Fokus Kalk.
// Trefferfläche ≥ 48 px (K-007); nur mit feinem Zeiger ab lg 32 px, damit lange Listen dicht bleiben (WCAG 2.5.8 erfüllt).
const LISTENLINK_BASIS = verbinde(
  'inline-flex min-h-k-7 items-center rounded-k-1 k-text text-k-nacht-2',
  'decoration-1 underline-offset-4 decoration-k-nacht-2',
  'pointer-fine:hover:text-k-kalk pointer-fine:hover:underline active:text-k-kalk active:underline',
  'lg:pointer-fine:min-h-k-6',
  FOKUS,
);
const LISTENLINK = verbinde(LISTENLINK_BASIS, 'text-k-2');
const RECHTSLINK = verbinde(LISTENLINK_BASIS, 'text-k-1');

// Link im Satz auf Tinte (Kontaktzeilen, Credits): immer unterstrichen, Kalk.
const SATZLINK = verbinde(
  'rounded-k-1 text-k-kalk underline decoration-1 underline-offset-4 decoration-k-nacht-2',
  'pointer-fine:hover:decoration-k-kalk pointer-fine:hover:decoration-2 active:decoration-k-kalk active:decoration-2',
  FOKUS,
);

const FELDKOPF = 'k-mono text-k-1 text-k-nacht-2';

function Verweisziel({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  // Interne Pfade über next/link; Anker wie `#cookie-settings` als schlichtes <a> (Bestand: Link mit Hash, gleiches Ziel).
  if (href.startsWith('/')) {
    return (
      <Link href={href} data-motion="zustand" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} data-motion="zustand" className={className}>
      {children}
    </a>
  );
}

function Kontaktzeile({ icon, children }: { icon?: IconName; children: ReactNode }) {
  // Zeichen dekorativ (Bedeutung trägt der Text); ohne Zeichen (Fax: Drucker-Zeichen entfällt) bleibt die Spalte frei,
  // damit alle Zeilen an derselben Flucht beginnen.
  return (
    <p className="flex items-start gap-k-3">
      <span className="flex h-lh w-k-5 shrink-0 items-center text-k-nacht-2">
        {icon ? <Icon name={icon} groesse={16} /> : null}
      </span>
      <span className="min-w-0">{children}</span>
    </p>
  );
}

export default function Fuss() {
  const currentYear = new Date().getFullYear();
  const { headquarters, contact, hours, authority, tax, owner, motto } = COMPANY_DATA;

  return (
    <footer className="bg-k-tinte text-k-nacht-2">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-7 lg:py-k-8">
        <Feldraster auf="tinte">
          {/* Feld 1 · Stammdaten und Kontakt (mobil zuerst; Desktop links über zwei Reihen) */}
          <Rasterfeld flaeche="tinte" breite={{ mobil: 4, tablett: 8, desktop: 4 }} className="flex flex-col gap-k-6 lg:row-span-2">
            <Link
              href="/"
              className={verbinde('inline-flex w-fit flex-col gap-k-3 rounded-k-1', FOKUS)}
              aria-label={`Fliesenverlegung Tezgel – Inh. ${owner.fullName} · Fachbetrieb Aßlar / Wetzlar – Startseite`}
            >
              <Image
                src="/images/logo/tezgel-logo-dark.webp"
                alt="Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar"
                width={220}
                height={68}
                className="h-k-7 w-auto object-contain"
              />
              <span className={FELDKOPF}>Inh. {owner.fullName} &middot; Fachbetrieb Aßlar / Wetzlar</span>
            </Link>

            <blockquote className="border-l border-k-nacht-fuge pl-k-4 k-text text-k-3 text-k-kalk">
              &bdquo;{motto}&ldquo;
            </blockquote>

            <address className="flex flex-col gap-k-2 k-mono text-k-2 not-italic text-k-kalk">
              <Kontaktzeile icon="ort">
                {headquarters.street}, {headquarters.postalCode} {headquarters.city}
              </Kontaktzeile>
              <Kontaktzeile icon="telefon">
                <a
                  href={`tel:${contact.phoneLink}`}
                  data-motion="zustand"
                  className={SATZLINK}
                  aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                >
                  {contact.phone}
                </a>
              </Kontaktzeile>
              <Kontaktzeile icon="whatsapp">
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-motion="zustand"
                  className={SATZLINK}
                  aria-label={`Mobil & WhatsApp: ${contact.mobile} – Chat mit Deniz Tezgel starten`}
                >
                  Mobil &amp; WhatsApp: {contact.mobile}
                </a>
              </Kontaktzeile>
              <Kontaktzeile>Fax: {contact.fax}</Kontaktzeile>
              <Kontaktzeile icon="mail">
                <a
                  href={`mailto:${contact.email}`}
                  data-motion="zustand"
                  className={SATZLINK}
                  aria-label={`E-Mail an Fliesenverlegung Tezgel senden: ${contact.email}`}
                >
                  {contact.email}
                </a>
              </Kontaktzeile>
              <Kontaktzeile icon="uhr">
                {hours.formattedWeekdays}
                <br />
                {hours.formattedSaturday}
              </Kontaktzeile>
            </address>

            {/* Kammer und USt-IdNr. als Schriftfeld-Zeile: zwei Felder mit Fuge, Feldkopf in Mono */}
            <dl className="grid grid-cols-2 gap-px border border-k-nacht-fuge bg-k-nacht-fuge">
              <div className="flex flex-col gap-k-1 bg-k-tinte p-k-3">
                <dt className={FELDKOPF}>Kammer</dt>
                <dd className="k-text text-k-2 text-k-kalk">{authority.name}</dd>
              </div>
              <div className="flex flex-col gap-k-1 bg-k-tinte p-k-3">
                <dt className={FELDKOPF}>USt-IdNr.</dt>
                <dd className="k-mono text-k-2 text-k-kalk">{tax.ustId}</dd>
              </div>
            </dl>

            <Knopf href="/kontakt" auf="tinte" className="self-start" hinten={<Icon name="pfeil" groesse={20} />}>
              Kostenfreies Vor-Ort-Aufmaß
            </Knopf>
          </Rasterfeld>

          {/* Feld 2 · Garantie-Sockel: vier Felder mit Fugen (mobil 2 × 2, ab Tablett 4 nebeneinander) */}
          <Rasterfeld flaeche="tinte" innen="keiner" breite={{ mobil: 4, tablett: 8, desktop: 8 }}>
            <ul className="grid grid-cols-2 gap-px bg-k-nacht-fuge md:grid-cols-4">
              {GARANTIEN.map(({ title, text }) => (
                <li key={title} className="flex min-w-0 flex-col gap-k-1 bg-k-tinte p-k-4 lg:p-k-5">
                  {/* Lange Einzelwörter („Festpreisgarantie“) brechen bei 320 px in der Zelle um statt die Seite zu verbreitern (Reflow, P3-16) */}
                  <span className="k-mono text-k-2 text-k-kalk wrap-break-word hyphens-auto">{title}</span>
                  <span className="k-text text-k-2 text-k-nacht-2 wrap-break-word hyphens-auto">{text}</span>
                </li>
              ))}
            </ul>
          </Rasterfeld>

          {/* Feld 3 · Linkkatalog: vier Gruppen mit Fugen; mobil je Gruppe zwei knappe Spalten, Desktop eine Spalte je Gruppe */}
          <Rasterfeld flaeche="tinte" innen="keiner" breite={{ mobil: 4, tablett: 8, desktop: 8 }}>
            <div className="grid grid-cols-1 gap-px bg-k-nacht-fuge md:grid-cols-2 lg:grid-cols-4">
              {LINKGRUPPEN.map((gruppe) => (
                <nav key={gruppe.title} aria-label={gruppe.title} className="flex flex-col gap-k-3 bg-k-tinte p-k-4 lg:p-k-5">
                  <p className={FELDKOPF}>{gruppe.title}</p>
                  <ul className="grid grid-cols-2 gap-x-k-4 lg:grid-cols-1">
                    {gruppe.links.map((item) => (
                      <li key={item.path + item.name} className="min-w-0">
                        <Verweisziel href={item.path} className={LISTENLINK}>
                          {item.name}
                        </Verweisziel>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </Rasterfeld>

          {/* Feld 4 · Abschlusszeile des Schriftfelds: Rechte · Rechtliches · Credits */}
          <Rasterfeld
            flaeche="tinte"
            innen="keiner"
            breite={{ mobil: 4, tablett: 8, desktop: 12 }}
            data-kanal-frei=""
          >
            <div className="grid grid-cols-1 gap-px bg-k-nacht-fuge lg:grid-cols-12">
              <p className="bg-k-tinte p-k-4 k-text text-k-1 text-k-nacht-2 lg:col-span-4 lg:p-k-5">
                &copy; {currentYear} {COMPANY_DATA.legalName} &middot; Inh. {owner.fullName} &middot; Alle Rechte vorbehalten.
              </p>
              <nav aria-label="Rechtliches" className="bg-k-tinte p-k-4 lg:col-span-5 lg:p-k-5">
                <ul className="flex flex-wrap gap-x-k-5">
                  {footerLegalLinks.map((item: Verweis) => (
                    <li key={item.path}>
                      <Verweisziel href={item.path} className={RECHTSLINK}>
                        {item.name}
                      </Verweisziel>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="bg-k-tinte p-k-4 k-text text-k-1 text-k-nacht-2 lg:col-span-3 lg:p-k-5">
                Webdesign &amp; SEO:{' '}
                <a
                  href="https://www.codayweb.de/de"
                  target="_blank"
                  rel="noopener"
                  title="Coday – Webdesign-Agentur Wetzlar | Webseiten, SEO & Branding"
                  data-motion="zustand"
                  className={verbinde(SATZLINK, 'inline-flex min-h-k-7 items-center font-semibold lg:pointer-fine:min-h-k-6')}
                >
                  Webdesign Wetzlar – Coday
                </a>
              </p>
            </div>
          </Rasterfeld>
        </Feldraster>
      </div>
    </footer>
  );
}
