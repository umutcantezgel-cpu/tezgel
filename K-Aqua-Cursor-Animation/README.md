# WaterCursor WebGL2 Animation Component

Exportierte WebGL2-basierte Cursor-Animation mit elastischem Ribbon-Schweif, Magnet-Hover und Klick-Wellen.

## Features
- Elastisches Ribbon-Band mit physikalischer Federung und Dämpfung
- Magnetischer Andock-Effekt an Buttons und Links (`a, button, [data-cursor-magnetic]`)
- Klick-Effekt ("Stein im Teich" mit Partikeln und Ringwelle)
- Automatische Deaktivierung auf Touchscreens (`pointer: coarse`) und bei `prefers-reduced-motion`

## Verwendung in React / Next.js
```tsx
import WaterCursor from './WaterCursor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <WaterCursor tint="violet" />
        {children}
      </body>
    </html>
  );
}
```
