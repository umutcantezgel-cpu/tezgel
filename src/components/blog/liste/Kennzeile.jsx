import Icon from '@/components/icons/Icon';

// Kennzeile der Ratgeber-Liste (F-03, Fusion E-039): Mono-Angaben mit eigenem Zeichen je Angabe statt Trennpunkt
// (Fassung B). So bricht die Zeile in schmalen Spalten zwischen den Angaben um, ohne dass ein „·“ am Zeilenende hängt.

/** Umbrechende Zeile in Mono (Kategorie, Lesezeit, Datum); Kinder sind die einzelnen Angaben */
export default function Kennzeile({ children, className = '' }) {
    return (
        <p className={`flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 font-mono text-fs-1 text-tinte-2 ${className}`}>
            {children}
        </p>
    );
}

/** Eine Angabe der Kennzeile: Zeichen (dekorativ) und Text */
export function Angabe({ zeichen, children, className = '' }) {
    return (
        <span className={`inline-flex min-w-0 items-center gap-2 ${className}`}>
            {zeichen && <Icon name={zeichen} groesse={4} />}
            <span className="min-w-0">{children}</span>
        </span>
    );
}

/** Datum maschinenlesbar: <time> mit dem Tag aus `publishedAt` (ISO), sichtbar der Wortlaut aus `date`. Seit E4-W0-BLOG (E-062)
 *  tragen die Beiträge kein Datum (alle hatten den Tag ihrer Anlage); mit echten Daten (M-27) erscheint es wieder. */
export function Datum({ post }) {
    if (!post.date) return null;
    const iso = typeof post.publishedAt === 'string' ? post.publishedAt.slice(0, 10) : undefined;
    return (
        <time dateTime={iso} className="inline-flex min-w-0 items-center gap-2">
            <Icon name="kalender" groesse={4} />
            <span className="min-w-0">{post.date}</span>
        </time>
    );
}
