/**
 * Inhaltsspeicher lesen (UM-E4-LEISTUNG): Schlüssel und Lesen ohne Vorgabedaten und ohne Prüfschema.
 * Wörtlich aus dataService.get herausgelöst, damit Leser wie die Ratgeber-Liste /blog (ContentContext) nur die Daten
 * laden, die sie lesen; dataService.get nutzt dieselbe Funktion. Reihenfolge wie vorher:
 * 1. Überschreibung aus localStorage, 2. sonst die Vorgabe (config-Dateien, Single Source of Truth).
 */

export const STORAGE_KEYS = {
    SITE: 'tezgel_content_site',
    SERVICES: 'tezgel_content_services',
    COMPANY: 'tezgel_content_company',
    PROJECTS: 'tezgel_content_projects',
    BLOG_CATEGORIES: 'tezgel_content_blog_categories',
    BLOG_POSTS: 'tezgel_content_blog_posts',
    TEAM: 'tezgel_content_team',
    SETTINGS: 'tezgel_content_settings'
};

/**
 * Gespeicherten Stand zu `key` lesen, sonst `vorgabe`. `anpassen` (optional) formt einen gespeicherten Stand um
 * (dataService: Seitendaten mit frischen Kontaktdaten); ein Fehler darin führt wie ein Lesefehler zur Vorgabe.
 */
export function liesInhalt(key, vorgabe, anpassen) {
    try {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(key);
            if (stored) {
                const parsed = JSON.parse(stored);
                return anpassen ? anpassen(parsed) : parsed;
            }
        }
    } catch (e) {
        console.error(`Error reading ${key} from storage:`, e);
    }
    return vorgabe;
}
