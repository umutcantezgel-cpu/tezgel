import { z } from 'zod';

// ============================================================================
// AUTH SERVICE – ADMIN-ZUGANG DEAKTIVIERT
// ============================================================================
// Die Website ist eine rein statische Seite. Eine Anmeldung im Browser kann
// keinen echten Zugriffsschutz bieten (Zugangsdaten und Sitzungen im
// Client-Bundle bzw. localStorage sind für jeden auslesbar und fälschbar).
// Daher enthält dieser Service keine Zugangsdaten und lässt keine Anmeldung
// zu. Ein Admin-Bereich muss serverseitig (z. B. per Next.js proxy.ts mit
// Zugangsdaten aus Umgebungsvariablen) umgesetzt werden, bevor er aktiviert
// wird.
// ============================================================================

const loginSchema = z.object({
    username: z.string().min(1, 'Benutzername erforderlich'),
    password: z.string().min(1, 'Passwort erforderlich')
});

export const ADMIN_DISABLED_MESSAGE =
    'Der Admin-Bereich ist für diese Website nicht eingerichtet. Bitte wenden Sie sich an den Website-Betreuer.';

// Storage keys used by earlier versions of this site.
const LEGACY_STORAGE_KEYS = [
    'baris_user_profile',
    'baris_secure_session',
    'baris_auth_config',
    'tezgel_user_profile',
    'tezgel_secure_session'
];

export const authService = {
    getProfile() {
        return null;
    },

    async login(username, password) {
        const result = loginSchema.safeParse({ username, password });
        if (!result.success) {
            return { success: false, error: 'Ungültige Eingabe' };
        }
        return { success: false, error: ADMIN_DISABLED_MESSAGE };
    },

    async updateProfile() {
        return { success: false, error: ADMIN_DISABLED_MESSAGE };
    },

    logout() {
        this.cleanupLegacyStorage();
    },

    getSession() {
        return null;
    },

    isAuthenticated() {
        return false;
    },

    cleanupLegacyStorage() {
        if (typeof window === 'undefined') return;
        try {
            LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
        } catch {
            // Storage may be unavailable (private mode) – nothing to clean up.
        }
    }
};

// Remove sessions/profiles stored by earlier versions on load.
authService.cleanupLegacyStorage();
