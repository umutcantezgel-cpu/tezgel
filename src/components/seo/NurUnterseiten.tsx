'use client';

// Zeigt seine Kinder nur auf den Unterseiten eines Ordners, nicht auf der Ordnerseite selbst (UM-E4-EP4, E-068). Der Grund:
// Ein Layout kennt die Adresse der Seite nicht (Next-Leitfaden layout.md, „Pathname“), und die Ordnerseite trägt ihren
// Service-Knoten schon selbst; das Layout gäbe ihr einen zweiten. Das Lesen der Adresse braucht eine Clientkomponente; sie wird
// mit dem Seiten-HTML ausgegeben (usePathname), die Kinder sind Serverausgabe und kommen unverändert durch. Umschreibungen
// (rewrites) gibt es weder in next.config.ts noch im Proxy (src/proxy.ts liefert nur Status 410), die Adresse auf dem Server und
// im Browser ist also dieselbe. Regel: lib/ordnerdienst.ts.
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { zeigtOrdnerKnoten } from '@/lib/ordnerdienst';

export default function NurUnterseiten({ ordner, children }: { ordner: string; children: ReactNode }) {
  return zeigtOrdnerKnoten(usePathname(), ordner) ? <>{children}</> : null;
}
