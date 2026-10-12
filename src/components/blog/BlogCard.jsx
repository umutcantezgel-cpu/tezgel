"use client";
import Link from 'next/link';
import { useContent } from '@/contexts/ContentContext';
import Icon from '@/components/icons/Icon';
import Verlegeplan from '@/components/kern/Verlegeplan';

/**
 * Plan und Fachzeichen je Kategorie-ID (Befund 24/26). Der Plan kommt aus `src/lib/plaene/vorgaben.ts`, das Zeichen aus
 * der Icon-Familie. Jede Kategorie hat ein eigenes Zeichen; Kategorien ohne Eintrag zeigen kein Zeichen.
 * Unbekannte Kategorien zeigen das Fugenbild ohne Zeichen.
 */
export const KATEGORIE_MOTIV = {
    bad: { plan: 'bad', zeichen: 'bad' },
    fliesen: { plan: 'naturstein', zeichen: 'naturstein' },
    untergrund: { plan: 'abdichtung', zeichen: 'abdichtung' },
    aussen: { plan: 'balkon', zeichen: 'balkon' },
    pflege: { plan: 'fugen', zeichen: 'reparatur' },
    ratgeber: { plan: 'wohnen', zeichen: 'dokument' },
    news: { plan: 'grossformat', zeichen: 'kalender' },
};

/**
 * Plan je Beitrag (Slug, Befund 20/21): jede Vorschau zeigt ihr Thema. Ohne Eintrag gilt das Kategorie-Motiv.
 */
export const BEITRAG_MOTIV = {
    'handwerkerbonus-fliesenarbeiten': 'wohnen',
    'undichte-dusche-warnzeichen': 'reparatur',
    'feinsteinzeug-oder-naturstein-vergleich': 'naturstein',
    'fliesen-fuer-allergiker': 'grossformat',
    'fliesen-mythen-faktencheck': 'fussbodenheizung',
    'fliesen-reinigen-pflegen': 'fugen',
    'fliesenleger-gesucht-geselle-meister': 'untergrund',
    'gaeste-wc-fliesen': 'bad',
    'rutschfeste-fliesen-r-klassen': 'treppe',
    'schimmel-fliesenfugen-vermeiden': 'fugen',
    'duschrinne-oder-punktablauf': 'abdichtung',
    'wandnischen-dusche-planen': 'badsanierung',
    'barrierefreier-balkonaustritt': 'balkon',
};

const STANDARD_MOTIV = { plan: 'fugen' };

const hat = (objekt, schluessel) => Object.prototype.hasOwnProperty.call(objekt, schluessel);

/** Plan des Beitrags: zuerst der Eintrag je Slug, dann das Kategorie-Motiv, sonst das Fugenbild */
const motivFuer = (post) => {
    if (post && hat(BEITRAG_MOTIV, post.slug)) return { plan: BEITRAG_MOTIV[post.slug] };
    if (post && hat(KATEGORIE_MOTIV, post.category)) return { plan: KATEGORIE_MOTIV[post.category].plan };
    return STANDARD_MOTIV;
};

/** Fachzeichen der Kategorie, oder undefined (dann kein Zeichen) */
export const zeichenFuer = (kategorie) => (hat(KATEGORIE_MOTIV, kategorie) ? KATEGORIE_MOTIV[kategorie].zeichen : undefined);

/**
 * Gezeichnetes Themenmotiv statt Foto (dekorativ, aria-hidden über Verlegeplan): Plan des Beitrags ohne Achse und ohne
 * Bemaßung auf Fliese im Fugenrahmen. `className` setzt Größe und Rahmen des jeweiligen Ortes.
 */
export function Themenmotiv({ post, className }) {
    return (
        <div className={`flex items-center justify-center overflow-hidden p-3 ${className}`}>
            <Verlegeplan plan={motivFuer(post).plan} ohneAchse bemassung={false} className="h-full w-full" />
        </div>
    );
}

/**
 * Blog Card (Zeile an der Fuge, Halbverband wie RatgeberListe): auf dem Telefon die Zeichnung klein links neben dem Titel,
 * ab md im Fugenrahmen links; Kennzeile als umbrechende Mono-Zeile (Kategorie · Lesezeit · Datum), Titel als Link über
 * die ganze Zeile, Auszug (dreizeilig gekürzt per CSS, voller Text im Dokument), „Artikel lesen“.
 */
const BlogCard = ({ post, lesezeit }) => {
    const { blogCategories = [] } = useContent();
    const categoryData = (blogCategories || []).find(c => c.id === post.category);
    const zeichen = zeichenFuer(post.category);

    return (
        <div className="group relative flex items-start gap-4 border-b border-fuge py-6 transition-colors dauer-1 ease-setzen hover:border-strich focus-within:border-strich md:gap-6 md:px-6 md:py-8 md:hover:bg-fliese md:focus-within:bg-fliese lg:gap-8 lg:px-8" data-motion="zustand">
            {/* Themenmotiv */}
            <Themenmotiv
                post={post}
                className="size-24 shrink-0 border border-fuge bg-fliese md:size-32"
            />

            {/* Kennzeile, Titel, Auszug */}
            <div className="min-w-0 flex-1">
                <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-fs-1 text-tinte-2">
                    <span className="flex min-w-0 items-center gap-2 text-tinte">
                        {zeichen && <Icon name={zeichen} groesse={4} />}
                        <span className="min-w-0">{categoryData?.name || post.category}</span>
                    </span>
                    {lesezeit && (
                        <>
                            <span aria-hidden="true">·</span>
                            <span className="flex min-w-0 items-center gap-2">
                                <Icon name="uhr" groesse={4} />
                                <span>{lesezeit}</span>
                            </span>
                        </>
                    )}
                    {post.date && (
                        <>
                            <span aria-hidden="true">·</span>
                            <span className="min-w-0">{post.date}</span>
                        </>
                    )}
                </p>

                <h3 className="mt-2 text-fs-4 text-tinte">
                    <Link href={`/blog/${post.slug}`} className="text-tinte no-underline decoration-strich underline-offset-4 hover:underline focus-visible:underline after:absolute after:inset-0">
                        {post.title}
                    </Link>
                </h3>

                <p className="mt-2 max-w-mass font-text text-fs-3 text-tinte-2 line-clamp-3">
                    {post.excerpt}
                </p>

                <span className="mt-4 flex items-center gap-2 font-text text-fs-2 font-semibold text-tinte">
                    Artikel lesen
                    <Icon name="pfeil-rechts" groesse={5} />
                </span>
            </div>
        </div>
    );
};

export default BlogCard;
