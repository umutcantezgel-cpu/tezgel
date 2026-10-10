'use client';

// Startet das Bewegungsmodul und sucht nach jedem clientseitigen Seitenwechsel neue Elemente (KERN K-007).
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { beobachte } from '@/lib/motion/bewegung';

export default function BewegungsWaechter() {
  const pfad = usePathname();
  useEffect(() => {
    const id = requestAnimationFrame(() => beobachte());
    return () => cancelAnimationFrame(id);
  }, [pfad]);
  return null;
}
