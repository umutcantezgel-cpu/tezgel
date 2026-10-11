// Lesesatz des Artikels (P4-02, KERN v1.2, K-005): Bausteine für den Markdown-Text der Blogartikel (react-markdown
// `components`). Ebenen wie im Bestand (`(bestand)/blog/[slug]/page.jsx`): `#` → h2 ohne Anker, `##` → h2 mit Anker,
// `###` → h3 mit Anker. Maß 66ch, Text k-3 mit Zeilenhöhe 1,6, Überschriften in Archivo-Anzeige, Listenmarken in Tinte-2,
// Zitate mit Fuge links (kein Orange-Kasten), Tabellen als echte <table> mit Fugen; breite Tabellen scrollen in einer
// fokussierbaren Hülle (Tastatur, WCAG 2.1.1) statt die Seite bei 320 px zu verbreitern.
// Die Kennung der Überschriften (Bestand: `generateSlug`) liefert der Aufrufer über `anker` – die Ableitung gehört in
// einen gemeinsamen Helfer, den Bestand und Kern nutzen (OFFENE FRAGE, G9). Links im Text: Kern-Textlink.
import type { ReactNode } from 'react';
import type { Components } from 'react-markdown';
import { Textlink, verbinde } from '@/components/kern/basis';
import { stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

export type Anker = (kinder: ReactNode) => string | undefined;

// Überschriften: Stufe nach dem längsten Wort (P4-10a, Ort `abschnitt`), höchstens k-5 bzw. k-4.
const H2 = verbinde('mt-k-8 mb-k-4 border-b border-k-fuge pb-k-3 k-anzeige text-k-tinte first:mt-0', UMBRUCH);
const H3 = verbinde('mt-k-7 mb-k-3 k-anzeige text-k-tinte', UMBRUCH);
const ABSATZ = 'mb-k-5 max-w-(--k-mass) k-text text-k-3 text-k-tinte';
const LISTE = 'mb-k-5 max-w-(--k-mass) pl-k-6 k-text text-k-3 text-k-tinte marker:text-k-tinte-2';

/** Bausteine für `<ReactMarkdown components={lesesatz({ anker })}>`. */
export function lesesatz({ anker }: { anker: Anker }): Components {
  return {
    h1: ({ children }) => <h2 className={verbinde(H2, stufeNachWort(children, 'abschnitt', 'text-k-5'))}>{children}</h2>,
    h2: ({ children }) => (
      <h2 id={anker(children)} className={verbinde(H2, stufeNachWort(children, 'abschnitt', 'text-k-5'))}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={anker(children)} className={verbinde(H3, stufeNachWort(children, 'abschnitt', 'text-k-4'))}>
        {children}
      </h3>
    ),
    p: ({ children }) => <p className={ABSATZ}>{children}</p>,
    ul: ({ children }) => <ul className={verbinde(LISTE, 'list-disc')}>{children}</ul>,
    ol: ({ children }) => <ol className={verbinde(LISTE, 'list-decimal marker:font-k-mono')}>{children}</ol>,
    li: ({ children }) => <li className="mb-k-2 pl-k-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    blockquote: ({ children }) => <blockquote className="my-k-6 max-w-(--k-mass) border-l-2 border-k-tinte pl-k-5 k-text text-k-3 text-k-tinte-2 *:mb-0">{children}</blockquote>,
    a: ({ href, children }) => (href ? <Textlink href={href}>{children}</Textlink> : <>{children}</>),
    table: ({ children }) => (
      <div tabIndex={0} className="my-k-6 max-w-full overflow-x-auto border border-k-fuge bg-k-fliese focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-tinte">
        <table className="w-full border-collapse text-left k-text text-k-2 text-k-tinte">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="border-b border-k-tinte">{children}</thead>,
    th: ({ children }) => <th className="px-k-4 py-k-3 align-bottom font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-t border-k-fuge px-k-4 py-k-3 align-top">{children}</td>,
  };
}

/** Hülle des Lesetexts (Satz-Familie, Mindestbreite 0 im Raster). */
export function Lesetext({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={verbinde('min-w-0 k-text', className)}>{children}</div>;
}
