// Themenmotive der Ratgeber (E4-N2-12/-13): Plan je Beitrag (Slug), sonst je Kategorie, sonst das Fugenbild; dazu das
// Fachzeichen je Kategorie. Eine Quelle für Liste (BlogCard), Filter, Seitenleiste, Verwandte und den Einstieg des Artikels.
// Pläne aus `src/lib/plaene/vorgaben.ts`, Zeichen aus der Icon-Familie (`src/components/icons/namen.ts`). Dekorativ.

/** Plan und Fachzeichen je Kategorie-ID; Kategorien ohne Eintrag zeigen kein Zeichen */
export const KATEGORIE_MOTIV = {
    bad: { plan: 'bad', zeichen: 'bad' },
    fliesen: { plan: 'naturstein', zeichen: 'naturstein' },
    aussen: { plan: 'balkon', zeichen: 'balkon' },
    ratgeber: { plan: 'wohnen', zeichen: 'dokument' },
};

/** Plan je Beitrag (Slug): jede Vorschau zeigt ihr Thema */
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

const hat = (objekt, schluessel) => Object.prototype.hasOwnProperty.call(objekt, schluessel);

/** Planname des Beitrags: zuerst je Slug, dann je Kategorie, sonst das Fugenbild */
export const planFuer = (post) => {
    if (post && hat(BEITRAG_MOTIV, post.slug)) return BEITRAG_MOTIV[post.slug];
    if (post && hat(KATEGORIE_MOTIV, post.category)) return KATEGORIE_MOTIV[post.category].plan;
    return 'fugen';
};

/** Fachzeichen der Kategorie, oder undefined (dann kein Zeichen) */
export const zeichenFuer = (kategorie) => (hat(KATEGORIE_MOTIV, kategorie) ? KATEGORIE_MOTIV[kategorie].zeichen : undefined);
