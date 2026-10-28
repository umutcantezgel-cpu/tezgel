'use client';

// Startet das Bewegungsmodul und sucht nach jedem clientseitigen Seitenwechsel neue Elemente (KERN K-007).
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { beobachte } from '@/lib/motion/bewegung';
import { naechstesBild } from '@/lib/motion/takt';

export default function BewegungsWaechter() {
  const pfad = usePathname();
  useEffect(() => naechstesBild(() => beobachte()), [pfad]);
  return null;
}
