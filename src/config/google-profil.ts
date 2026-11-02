// Google-Unternehmensprofil (SEO-Runde T05; Umut, 02.11.2026: „Sorge dafür, dass auch das Unternehmensprofil … direkt damit
// verknüpft ist“). Den Link schickt Umut (im Profil auf „Teilen“, Link kopieren); er wird nie selbst ermittelt, weil es einen
// zweiten Betrieb „Özcan Tezgel“ gibt (docs/seo/arbeit/p7-liste-fuer-umut.md, Abschnitt 1). Solange er fehlt, verweist die Website
// nirgends auf ein Profil; mit Link tragen ihn der Knoten LocalBusiness (sameAs, hasMap, src/lib/schema.ts), der Weg „Alle Bewertungen
// bei Google lesen“ (src/components/vorlagen/teile/Stimmen.tsx) und die Plakette (src/components/reviews/GoogleReviewsBadge.tsx).
export const GOOGLE_PROFIL: string | null = null;

/** Formen eines geteilten Profil-Links, jede mit einer Kennung des Profils: maps.app.goo.gl (auch mit ?g_st=… aus der Maps-App),
 *  g.page/r/… und alte Kurznamen g.page/<name>, google.com/maps mit cid, place_id oder Ortskennung (…/place/<Name>/…!1s0x…:0x…),
 *  maps.google.com mit cid. Nie eine Suche, auch kein Ort nur mit Namen (…/place/<Name>), kein g.co/kgs/… aus der Google-Suche
 *  (dann um den Link aus Google Maps bitten) und nie „Rezension schreiben“ (…/review). Gegenprüfung CT-02 */
export function istGoogleProfilLink(url: string): boolean {
  return /^https:\/\/(maps\.app\.goo\.gl\/[A-Za-z0-9]+(\?g_st=[\w.]+)?|g\.page\/(r\/)?[\w-]+|(www\.)?google\.(com|de)\/maps(\/place\/(\?q=place_id:[\w-]+|[^?\s/]+\/\S*!1s0x[\da-f]+:0x[\da-f]+\S*)|\/?\?cid=\d+)|maps\.google\.(com|de)\/(maps)?\?cid=\d+)$/.test(url);
}
