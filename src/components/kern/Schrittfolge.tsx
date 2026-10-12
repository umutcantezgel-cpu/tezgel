// Schrittfolge (KERN K-009, K-008): Ablauf in nummerierten Schritten.
// Senkrecht: Lot aus 1-px-Fuge mit einem Fugenkreuz (size-3) je Schritt, Nummer in Mono.
// Waagrecht (ab lg): Felder an der Fuge in einer Reihe (Feldraster-Optik), Nummer oben; mobil fällt die Folge auf senkrecht zurück.
// Bewegung nur über das Register: data-motion="auftritt" am Listenelement, Standard aus.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';

export interface SchrittfolgeSchritt {
  /** Schrittnummer in Mono; Standard „01“, „02“ … */
  nummer?: string;
  titel: ReactNode;
  /** Untertitel in Mono */
  untertitel?: ReactNode;
  text?: ReactNode;
}

export interface SchrittfolgeProps {
  schritte: SchrittfolgeSchritt[];
  ausrichtung?: 'senkrecht' | 'waagrecht';
  /** data-motion="auftritt" am Listenelement (Register, Standard aus) */
  auftritt?: boolean;
  /** Element der Schritt-Titel (Gliederung der Seite): h3 (Standard), h4 oder div */
  titelEbene?: 'h3' | 'h4' | 'div';
  /** Untertitel über dem Titel statt darunter (Lesefolge des Bestands, z. B. Startseite) */
  untertitelOben?: boolean;
  /** Nummer nur sichtbar (aria-hidden), wenn der Titel sie für Screenreader selbst nennt (z. B. „Schritt 01: …“ als sr-only) */
  nummerStumm?: boolean;
  className?: string;
}

const SPALTEN = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const;

export default function Schrittfolge({ schritte, ausrichtung = 'senkrecht', auftritt = false, titelEbene = 'h3', untertitelOben = false, nummerStumm = false, className }: SchrittfolgeProps) {
  const Titel = titelEbene;
  const waagrecht = ausrichtung === 'waagrecht';
  const spalten = Math.min(Math.max(schritte.length, 2), 4) as keyof typeof SPALTEN;
  return (
    <ol
      className={clsx(
        'flex flex-col',
        waagrecht && clsx('lg:grid lg:gap-px lg:border lg:border-fuge lg:bg-fuge', SPALTEN[spalten]),
        className,
      )}
      data-motion={auftritt ? 'auftritt' : undefined}
    >
      {schritte.map((schritt, index) => {
        const letzter = index === schritte.length - 1;
        return (
          <li key={index} className={clsx('flex gap-6', waagrecht && 'lg:block lg:bg-fliese lg:p-8')}>
            <div aria-hidden="true" className={clsx('flex w-3 shrink-0 flex-col items-center', waagrecht && 'lg:hidden')}>
              <Fugenkreuz className="mt-1 size-3 text-tinte" />
              {!letzter && <span className="flex-1 border-l border-fuge" />}
            </div>
            <div className={clsx('min-w-0 flex-1', !letzter && 'pb-12', waagrecht && 'lg:pb-0')}>
              <div aria-hidden={nummerStumm || undefined} className="font-mono text-fs-1 text-tinte">{schritt.nummer ?? String(index + 1).padStart(2, '0')}</div>
              {untertitelOben && schritt.untertitel && <div className="mt-2 font-mono text-fs-2 text-tinte-2">{schritt.untertitel}</div>}
              <Titel className={clsx('font-text text-fs-4 font-semibold text-tinte', untertitelOben && schritt.untertitel ? 'mt-1' : 'mt-2')}>{schritt.titel}</Titel>
              {!untertitelOben && schritt.untertitel && <div className="mt-1 font-mono text-fs-2 text-tinte-2">{schritt.untertitel}</div>}
              {schritt.text && <div className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">{schritt.text}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
