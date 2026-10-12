import React from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReadingProgress from '@/components/blog/ReadingProgress';
import BlogAuthorCard from '@/components/blog/BlogAuthorCard';
import RelatedPosts, { motivFuer } from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import BlogVoteButton from '@/components/blog/BlogVoteButton';
import QualityPromise from '@/components/sections/QualityPromise';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, knopfKlassen, linkKlassen, seitenKlassen } from '@/components/kern/stile';
import { posts } from '@/config/posts';
import { categories } from '@/config/blog';
import { createMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Ratgeber Artikel' };

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image
  });
}

// Helper to extract text from React children
const extractText = (children) => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return children.toString();
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children?.props?.children) return extractText(children.props.children);
  return '';
};

// Helper to generate IDs for headings
const generateSlug = (children) => {
  const text = extractText(children);
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Klartext einer Überschrift (ohne Markdown-Zeichen und Links) für den Namen einer Tabelle
const klartext = (text) => text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();

// Überschriften des Artikels mit ihrer Stelle im Quelltext: die nächste Überschrift vor einer Tabelle benennt sie
const ueberschriften = (markdown) => {
  const liste = [];
  const muster = /^#{2,3}[ \t]+(.+)$/gm;
  let treffer;
  while ((treffer = muster.exec(markdown)) !== null) {
    liste.push({ stelle: treffer.index, text: klartext(treffer[1]) });
  }
  return liste;
};

// Klassen, Gruppen und Messwerte in Tabellen (R9, B, 12°, 2 mm) in Mono; die Wörter drum herum bleiben in Grotesk
const MESSWERT = /R\d{1,2}|\b[ABC]\b|\d+(?:[.,]\d+)?(?:\s?(?:°|%|mm|cm|m)(?!\p{L}))?/gu;
const messwerte = (kinder) =>
  React.Children.toArray(kinder).flatMap((kind, i) => {
    if (typeof kind !== 'string') return [kind];
    const teile = [];
    let rest = 0;
    let n = 0;
    for (const treffer of kind.matchAll(MESSWERT)) {
      if (treffer.index > rest) teile.push(kind.slice(rest, treffer.index));
      teile.push(<span key={`m${i}-${n++}`} className="font-mono">{treffer[0]}</span>);
      rest = treffer.index + treffer[0].length;
    }
    if (rest < kind.length) teile.push(kind.slice(rest));
    return teile;
  });

// Spaltenköpfe einer Tabelle als Klartext, je Spalte: Etiketten im Stapel-Layout unter sm
const kopfTexte = (thead) => {
  const zeile = React.Children.toArray(thead?.props?.children).find((k) => React.isValidElement(k));
  return React.Children.toArray(zeile?.props?.children)
    .filter((k) => React.isValidElement(k))
    .map((k) => extractText(k.props.children).trim());
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const categoryData = categories.find((c) => c.id === post.category);

  const displayDate = post.date || (post.created_date
    ? new Date(post.created_date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
    : null);
  const readingTime = post.readTime || `${post.reading_time || '5'} Min.`;
  const kapitel = ueberschriften(post.content);

  return (
    <>
      <ReadingProgress />

      {/* KOPF (Arbeitsansicht, wie Einstieg art="arbeit"): Rückweg zuerst, dann Etikett, H1 und Angaben an der Fuge */}
      <header className="relative border-b border-fuge pt-32 pb-12 lg:pb-16">
        <div className={seitenKlassen}>
          <Knopf variante="text" href="/blog" iconLinks="pfeil-links">
            Zurück zur Ratgeber-Übersicht
          </Knopf>

          <div className="mt-8 grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-9">
              {(categoryData || post.featured) && (
                <p className={`${etikettKlassen} mb-6 flex-wrap`}>
                  {categoryData && <span>{categoryData.name}</span>}
                  {categoryData && post.featured && <span aria-hidden="true">·</span>}
                  {post.featured && <span>Empfehlung</span>}
                </p>
              )}

              <h1 className="text-fs-6 text-tinte">{post.title}</h1>

              <p className="mt-8 max-w-mass text-fs-3 text-tinte-2">
                {post.title} – Fachwissen, Praxistipps und rechtliche Vorgaben für Bauherren und Modernisierer von Fachbetrieb Tezgel.
              </p>

              <p className={`${etikettKlassen} mt-6 flex-wrap`}>
                {displayDate && (
                  <>
                    <span className="inline-flex items-center gap-2">
                      <Icon name="kalender" groesse={4} />
                      {displayDate}
                    </span>
                    <span aria-hidden="true" className="shrink-0">·</span>
                  </>
                )}
                <span className="inline-flex items-center gap-2">
                  <Icon name="uhr" groesse={4} />
                  {readingTime} Lesezeit
                </span>
              </p>
            </div>

            {/* Motiv im Einstieg: dasselbe Themenmotiv wie in der Liste, dekorativ und ohne Laserachse (ARB 28) */}
            <div aria-hidden="true" className="col-span-4 flex justify-start md:col-span-8 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-start">
              <div className="flex size-24 items-center justify-center overflow-hidden border border-fuge bg-fliese p-3 md:size-32">
                <Verlegeplan plan={motivFuer(post)} ohneAchse bemassung={false} className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LESEMODUS: Inhaltsverzeichnis links (ab lg), Artikel im Satzspiegel max-w-mass rechts */}
      <div className={`${seitenKlassen} py-12 lg:py-16`}>
        <div className="grid grid-cols-4 items-start gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8">

          {/* INHALTSVERZEICHNIS (Left - Desktop) */}
          <aside className="hidden lg:sticky lg:top-24 lg:col-span-3 lg:block">
            <TableOfContents content={post.content} />
          </aside>

          {/* ARTIKEL (Rechts) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-9">

            {/* Vorspann: gleiche Lesebreite wie der Text (66ch in Textgröße fs-3), die Schrift bleibt fs-4 */}
            <div className="max-w-mass text-fs-3">
              <p className="border-l-2 border-tinte pl-6 text-fs-4 text-tinte">
                Praxis-Leitfaden von Fachbetriebsleiter Deniz Tezgel: {post.excerpt}
              </p>
            </div>

            {/* Artikeltext */}
            <div className="mt-12 max-w-mass text-fs-3 text-tinte">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                /* eslint-disable @typescript-eslint/no-unused-vars */
                components={{
                  h1: ({ node: _node, children }) => (
                    <h2 className="mt-0 mb-6 text-fs-5 text-tinte">{children}</h2>
                  ),
                  h2: ({ node: _node, children }) => (
                    <h2 id={generateSlug(children)} className="mt-16 mb-6 border-t border-fuge pt-8 text-fs-5 text-tinte first:mt-0 first:border-t-0 first:pt-0">{children}</h2>
                  ),
                  h3: ({ node: _node, children }) => (
                    <h3 id={generateSlug(children)} className="mt-12 mb-4 text-fs-4 text-tinte">{children}</h3>
                  ),
                  p: ({ node: _node, children }) => (
                    <p className="mt-6 first:mt-0">{children}</p>
                  ),
                  a: ({ node: _node, children, ...props }) => (
                    <a className={linkKlassen} {...props}>{children}</a>
                  ),
                  ul: ({ node: _node, children }) => (
                    <ul className="mt-6 border-t border-fuge">
                      {React.Children.map(children, (eintrag) => (React.isValidElement(eintrag) ? (
                        <li className="flex items-start gap-4 border-b border-fuge py-3">
                          <Fugenkreuz className="mt-2 size-3 shrink-0 text-strich" />
                          <div className="min-w-0 flex-1">{eintrag.props.children}</div>
                        </li>
                      ) : null))}
                    </ul>
                  ),
                  ol: ({ node: _node, children }) => (
                    <ol className="mt-6 list-decimal space-y-3 pl-8 marker:font-mono marker:text-tinte-2">{children}</ol>
                  ),
                  blockquote: ({ node: _node, children }) => (
                    <blockquote className="mt-8 border-l-2 border-tinte pl-6 text-fs-3 text-tinte-2">{children}</blockquote>
                  ),
                  table: ({ node, children }) => {
                    // Name der Tabelle: die Überschrift davor, sonst der Artikeltitel
                    const stelle = node?.position?.start?.offset;
                    const ueber = stelle === undefined ? undefined : kapitel.filter((k) => k.stelle < stelle).pop();
                    // Unter sm stapeln sich die Zeilen als Blöcke: jede Zelle trägt ihren Spaltenkopf als Etikett (data-label);
                    // die Kopfzeile bleibt für Screenreader im Baum, ab sm sichtbar
                    const teile = React.Children.toArray(children).filter((t) => React.isValidElement(t));
                    const kopf = teile.find((t) => t.type === 'thead');
                    const koerper = teile.find((t) => t.type === 'tbody');
                    const etiketten = kopfTexte(kopf);
                    return (
                      <div role="region" aria-label={`Tabelle: ${ueber ? ueber.text : post.title}`} tabIndex={0} className="mt-8 overflow-x-auto border border-fuge bg-fliese">
                        {/* Rollen ausdrücklich: unter sm stehen Zeilen und Zellen als Blöcke (display: block), Safari verliert sonst die Tabellenrolle */}
                        <table role="table" className="block w-full border-collapse text-left sm:table">
                          {kopf && <thead role="rowgroup" className="sr-only sm:not-sr-only sm:table-header-group">{kopf.props.children}</thead>}
                          {koerper && (
                            <tbody role="rowgroup" className="block sm:table-row-group">
                              {React.Children.map(koerper.props.children, (zeile) => {
                                if (!React.isValidElement(zeile)) return zeile;
                                let n = 0;
                                const zellen = React.Children.map(zeile.props.children, (zelle) =>
                                  React.isValidElement(zelle) ? React.cloneElement(zelle, { etikett: etiketten[n++] }) : zelle
                                );
                                return <tr role="row" className="block border-b border-fuge px-3 py-3 last:border-b-0 sm:table-row sm:border-b-0 sm:p-0">{zellen}</tr>;
                              })}
                            </tbody>
                          )}
                        </table>
                      </div>
                    );
                  },
                  th: ({ node: _node, children }) => (
                    <th scope="col" role="columnheader" className="min-w-0 break-words hyphens-auto border-b-2 border-tinte px-3 py-3 text-left align-bottom font-mono text-fs-1 font-normal text-tinte-2 sm:px-4">{children}</th>
                  ),
                  td: ({ node: _node, children, etikett }) => (
                    <td role="cell" className="block min-w-0 break-words hyphens-auto py-1 align-top text-fs-2 text-tinte sm:table-cell sm:border-b sm:border-fuge sm:px-4 sm:py-3">
                      {etikett && <span className="mb-1 block font-mono text-fs-1 text-tinte-2 sm:hidden">{etikett}</span>}
                      {messwerte(children)}
                    </td>
                  ),
                }}
                /* eslint-enable @typescript-eslint/no-unused-vars */
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Schlagworte */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 flex max-w-mass flex-wrap gap-x-6 gap-y-2 border-t border-fuge pt-6 text-fs-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="font-mono text-fs-1 text-tinte-2">{tag}</span>
                ))}
              </div>
            )}

            {/* Rückmeldung und Teilen */}
            <div className="mt-16 flex max-w-mass flex-col gap-6 border-y border-fuge py-6 text-fs-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-fs-2 text-tinte">War dieser Leitfaden hilfreich?</span>
                <BlogVoteButton />
              </div>

              <ShareButtons title={post.title} description={post.excerpt} />
            </div>

            {/* PDF-Checkliste, falls vorhanden */}
            {post.download_url && (
              <div className="mt-8 flex max-w-mass flex-col gap-6 border border-fuge bg-fliese p-6 text-fs-3 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-center gap-4">
                  <Icon name="download" groesse={6} />
                  <div>
                    <h4 className="text-fs-3 text-tinte">Kostenlose Checkliste (PDF)</h4>
                    <p className="mt-1 text-fs-2 text-tinte-2">Zum Ausdrucken &amp; Vorbereiten Ihres Projekts</p>
                  </div>
                </div>
                <a
                  href={post.download_url}
                  className={knopfKlassen('haupt')}
                  data-motion="druck"
                  download
                >
                  PDF jetzt herunterladen
                </a>
              </div>
            )}

            {/* Autor */}
            <div className="mt-16 max-w-mass text-fs-3">
              <BlogAuthorCard author={post.author} />
            </div>

            {/* Weitere Artikel */}
            <div className="mt-16 max-w-mass text-fs-3">
              <RelatedPosts
                currentPost={post}
                allPosts={posts}
                categories={categories}
              />
            </div>

          </div>
        </div>
      </div>

      <QualityPromise art="arbeit" />
    </>
  );
}
