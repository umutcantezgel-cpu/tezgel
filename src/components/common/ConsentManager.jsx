"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ChevronRight, MapPin, BarChart3, Megaphone, Settings2 } from 'lucide-react';
import { cn } from '@/utils';

// Consent Version - Increment when privacy policy changes to reset consent
const CONSENT_VERSION = '2.0';
// Storage key scoped to the current site operator (consent given to a previous
// operator under a different key is intentionally not carried over).
const CONSENT_KEY = 'tezgel_consent_settings';

// Context for sharing consent state across the app
const ConsentContext = createContext(null);

export const useConsent = () => {
    const context = useContext(ConsentContext);
    if (!context) {
        // Return default values if context is not available
        return {
            consent: { essential: true, analytics: false, marketing: false, maps: false, externalContent: false },
            hasConsent: (category) => category === 'essential',
            updateConsent: () => { },
            showBanner: () => { }
        };
    }
    return context;
};

// Helper function to get consent without context (for non-React code)
export const getStoredConsent = () => {
    if (typeof window === 'undefined') return null;
    try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Check version - if outdated, return null to trigger re-consent
            if (parsed.version !== CONSENT_VERSION) {
                localStorage.removeItem(CONSENT_KEY);
                return null;
            }
            return parsed.settings;
        }
    } catch (e) {
        console.error('Error reading consent:', e);
    }
    return null;
};

export const hasStoredConsent = (category) => {
    const consent = getStoredConsent();
    if (!consent) return category === 'essential';
    return consent[category] === true;
};

const ConsentManager = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState(() => {
        const defaultPrefs = { essential: true, analytics: false, marketing: false, maps: false, externalContent: false };
        if (typeof window === 'undefined') return defaultPrefs;
        try {
            const savedConsent = localStorage.getItem(CONSENT_KEY);
            if (!savedConsent) return defaultPrefs;
            const parsed = JSON.parse(savedConsent);
            if (parsed.version !== CONSENT_VERSION) {
                localStorage.removeItem(CONSENT_KEY);
                return defaultPrefs;
            }
            return parsed.settings;
        } catch {
            localStorage.removeItem(CONSENT_KEY);
            return defaultPrefs;
        }
    });

    useEffect(() => {
        const hasValidConsent = (() => {
            try {
                const stored = localStorage.getItem(CONSENT_KEY);
                if (!stored) return false;
                const parsed = JSON.parse(stored);
                return parsed.version === CONSENT_VERSION;
            } catch {
                return false;
            }
        })();

        if (hasValidConsent) return;

        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleAcceptAll = () => {
        const all = {
            essential: true,
            analytics: true,
            marketing: true,
            maps: true,
            externalContent: true
        };
        saveConsent(all);
    };

    const handleAcceptSelected = () => {
        saveConsent(preferences);
    };

    const handleRejectAll = () => {
        const essentialOnly = {
            essential: true,
            analytics: false,
            marketing: false,
            maps: false,
            externalContent: false
        };
        saveConsent(essentialOnly);
    };

    const saveConsent = (settings) => {
        const consentData = {
            settings,
            version: CONSENT_VERSION,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
        setPreferences(settings);
        setIsVisible(false);

        // Dispatch custom event for components to react
        window.dispatchEvent(new CustomEvent('consentUpdated', { detail: settings }));

        // Reload page to apply consent changes
        if (settings.analytics || settings.marketing || settings.maps) {
            window.location.reload();
        }
    };

    // Allow external trigger to show banner (e.g., from footer link)
    useEffect(() => {
        const handleShowBanner = () => setIsVisible(true);
        window.addEventListener('showConsentBanner', handleShowBanner);
        return () => window.removeEventListener('showConsentBanner', handleShowBanner);
    }, []);

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-6 left-6 z-40 bg-[var(--color-brand-primary)] text-white p-3 rounded-full shadow-lg shadow-emerald-900/20 hover:bg-[var(--color-brand-primary-hover)] transition-all hover:scale-110 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                aria-label="Cookie-Einstellungen öffnen"
                title="Cookie-Einstellungen"
            >
                <Shield className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-sm font-medium">
                    Datenschutz
                </span>
            </button>
        );
    }

    const cookieCategories = [
        {
            id: 'essential',
            title: 'Technisch notwendig',
            icon: Settings2,
            description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich (Session, Consent-Speicherung). Können nicht deaktiviert werden.',
            required: true,
            examples: 'Session-ID, Cookie-Einstellungen'
        },
        {
            id: 'analytics',
            title: 'Statistik & Analyse',
            icon: BarChart3,
            description: 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt werden.',
            required: false,
            examples: 'Google Analytics, Matomo'
        },
        {
            id: 'marketing',
            title: 'Marketing & Werbung',
            icon: Megaphone,
            description: 'Werden verwendet, um Besuchern relevante Anzeigen zu zeigen und die Effektivität von Werbekampagnen zu messen.',
            required: false,
            examples: 'Facebook Pixel, Google Ads'
        },
        {
            id: 'maps',
            title: 'Kartendienste',
            icon: MapPin,
            description: 'Ermöglichen die Einbindung interaktiver Karten (Google Maps) zur Anzeige unseres Standorts. Daten werden an Google übermittelt.',
            required: false,
            examples: 'Google Maps'
        },
        {
            id: 'externalContent',
            title: 'Externe Inhalte',
            icon: Shield,
            description: 'Erlauben das Laden von Inhalten externer Anbieter wie Videos oder Social-Media-Beiträge.',
            required: false,
            examples: 'YouTube, Vimeo'
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-[var(--spacing-4)] md:p-[var(--spacing-6)] animate-fadeInUp">
            <div className="max-w-5xl mx-auto bg-[var(--color-neutral-0)] rounded-3xl shadow-[0_24px_48px_-18px_rgba(15,23,42,0.22)] border border-[var(--color-neutral-200)] overflow-hidden">
                {!showDetails ? (
                    <div className="p-[var(--spacing-6)] md:p-[var(--spacing-8)]">
                        <div className="flex flex-col md:flex-row gap-[var(--spacing-6)] items-start md:items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-2)]">
                                    <Shield className="w-5 h-5 text-[var(--color-blue-700)]" />
                                    <h3 className="text-[var(--font-size-lg)] font-bold text-[var(--color-neutral-900)]">
                                        Wir respektieren Ihre Privatsphäre
                                    </h3>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] leading-relaxed max-w-2xl">
                                    Wir verwenden Cookies und ähnliche Technologien. Einige sind technisch notwendig,
                                    andere helfen uns, die Website zu verbessern oder externe Dienste (wie Google Maps) einzubinden.
                                    Sie können Ihre Einwilligung jederzeit widerrufen.
                                </p>
                                <div className="flex flex-wrap gap-[var(--spacing-2)] mt-[var(--spacing-3)]">
                                    <button
                                        onClick={() => setShowDetails(true)}
                                        className="text-[var(--color-blue-600)] text-[var(--font-size-sm)] font-medium hover:underline flex items-center"
                                    >
                                        Einstellungen anpassen <ChevronRight className="w-3 h-3 ml-1" />
                                    </button>
                                    <span className="text-[var(--color-neutral-600)]" aria-hidden="true">|</span>
                                    <a
                                        href="/datenschutz"
                                        className="text-[var(--color-blue-600)] text-[var(--font-size-sm)] font-medium hover:underline"
                                    >
                                        Datenschutzerklärung
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-[var(--spacing-3)] w-full md:w-auto">
                                <Button
                                    variant="outline"
                                    onClick={handleRejectAll}
                                    className="border-[var(--color-neutral-300)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] min-w-[140px]"
                                >
                                    Nur Essenzielle
                                </Button>
                                <Button
                                    onClick={handleAcceptAll}
                                    className="bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)] shadow-sm min-w-[140px]"
                                >
                                    Alle akzeptieren
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-[var(--spacing-6)] md:p-[var(--spacing-8)]">
                        <div className="flex items-center justify-between mb-[var(--spacing-6)]">
                            <h3 className="text-[var(--font-size-xl)] font-bold text-[var(--color-neutral-900)]">
                                Datenschutzeinstellungen
                            </h3>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="text-[var(--color-neutral-700)] font-medium hover:text-[var(--color-neutral-900)] hover:underline"
                            >
                                Zurück
                            </button>
                        </div>

                        <div className="space-y-[var(--spacing-3)] mb-[var(--spacing-6)] max-h-[50vh] overflow-y-auto">
                            {cookieCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <div
                                        key={category.id}
                                        className={cn(
                                            "flex items-start gap-[var(--spacing-4)] p-[var(--spacing-4)] rounded-[var(--radius-base)] transition-colors",
                                            category.required
                                                ? "bg-[var(--color-neutral-50)]"
                                                : "border border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-50)]"
                                        )}
                                    >
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                checked={category.required ? true : preferences[category.id]}
                                                disabled={category.required}
                                                onChange={(e) => setPreferences({ ...preferences, [category.id]: e.target.checked })}
                                                className="w-4 h-4 accent-emerald-700 rounded border-[var(--color-neutral-300)] focus:ring-2 focus:ring-emerald-600"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-4 h-4 text-[var(--color-neutral-600)]" />
                                                <h4 className="font-bold text-[var(--color-neutral-900)] text-[var(--font-size-sm)]">
                                                    {category.title}
                                                    {category.required && (
                                                        <span className="ml-2 text-xs text-[var(--color-neutral-600)] font-normal">(erforderlich)</span>
                                                    )}
                                                </h4>
                                            </div>
                                            <p className="text-[var(--color-text-secondary)] text-xs mt-1">
                                                {category.description}
                                            </p>
                                            <p className="text-[var(--color-neutral-600)] text-xs mt-1">
                                                Beispiele: {category.examples}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap justify-end gap-[var(--spacing-3)] pt-[var(--spacing-4)] border-t border-[var(--color-neutral-200)]">
                            <Button
                                variant="outline"
                                onClick={handleRejectAll}
                                className="mr-auto border-[var(--color-neutral-300)] text-[var(--color-neutral-700)]"
                            >
                                Alle ablehnen
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleAcceptSelected}
                                className="border-[var(--color-neutral-300)] text-[var(--color-neutral-700)]"
                            >
                                Auswahl speichern
                            </Button>
                            <Button
                                onClick={handleAcceptAll}
                                className="bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)]"
                            >
                                Alle akzeptieren
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsentManager;
