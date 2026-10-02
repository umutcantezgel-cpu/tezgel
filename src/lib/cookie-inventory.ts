/**
 * ══════════════════════════════════════════════════════════════
 * Cookie & Data Processing Inventory (SSOT) - Fliesenverlegung Tezgel
 * ══════════════════════════════════════════════════════════════
 * Single Source of Truth für alle Cookies und Datenverarbeitungen.
 * Wird von CookieConsent-Banner UND Datenschutzerklärung konsumiert.
 * ══════════════════════════════════════════════════════════════
 */

// ─── Types ───

export type ConsentCategory = "essential" | "analytics" | "marketing";

export interface CookieEntry {
  /** Cookie-Name (oder Pattern wie `_ga_*`) */
  name: string;
  /** Consent-Kategorie */
  category: ConsentCategory;
  /** Menschenlesbare Speicherdauer */
  duration: string;
  /** Zweck des Cookies */
  purpose: string;
  /** Anbieter / Setzer */
  provider: string;
}

export interface DataProcessingEntry {
  /** Bezeichnung der Verarbeitung */
  name: string;
  /** Welche Daten werden erhoben */
  dataCollected: string[];
  /** DSGVO-Rechtsgrundlage */
  legalBasis: string;
  /** Empfänger / Auftragsverarbeiter */
  recipient: string;
  /** Speicherdauer */
  retentionPeriod: string;
  /** Consent-Kategorie (null = kein Consent erforderlich) */
  consentCategory: ConsentCategory | null;
  /** Drittlandtransfer */
  thirdCountryTransfer: string | null;
}

export interface ConsentState {
  /** Immer true und technisch notwendig, nicht deaktivierbar */
  essential: true;
  /** GA4, Scroll-Tracking, Web Vitals an GA4 */
  analytics: boolean;
  /** Google Maps, Calendly, Meta-Pixel */
  marketing: boolean;
  /** ISO-Timestamp der Einwilligung */
  timestamp: string;
  /** Consent-Konfigurationsversion (bei Änderung → Re-Consent) */
  version: string;
  /** Eindeutige cryptografische ID zur Nachweisbarkeit im Backend-Log (Art 5 Abs. 2 DSGVO) */
  receiptId?: string;
}

// ─── Current Consent Version ───
// Bump this when cookie categories change → triggers re-consent
export const CONSENT_VERSION = "2.1.0";

// ─── Cookie Consent Cookie Config ───
export const CONSENT_COOKIE_NAME = "tezgel_consent_status";
export const CONSENT_COOKIE_MAX_AGE_DAYS = 365;

// ─── Cookie Inventory (SSOT) ───

export const COOKIE_INVENTORY: readonly CookieEntry[] = [
  // ── ESSENTIAL ──
  {
    name: "tezgel_consent_status",
    category: "essential",
    duration: "365 Tage",
    purpose: "Speichert Ihre Cookie-Einwilligung (Kategorien, Zeitstempel, Version)",
    provider: "Fliesenverlegung Tezgel",
  },
  {
    name: "tezgel_wa_button_pos",
    category: "essential",
    duration: "Sitzung",
    purpose: "Speichert die gewählte Andockposition des schwebenden WhatsApp-Buttons für konsistente Seitennavigation",
    provider: "Fliesenverlegung Tezgel",
  },
  {
    name: "visitor_type",
    category: "essential",
    duration: "365 Tage",
    purpose: "Unterscheidet Erstbesucher von wiederkehrenden Besuchern für optimierte Ladezeiten",
    provider: "Fliesenverlegung Tezgel",
  },
  // ── ANALYTICS ──
  {
    name: "_ga",
    category: "analytics",
    duration: "2 Jahre",
    purpose: "Wird von Google Analytics verwendet, um Nutzer pseudonymisiert zu unterscheiden.",
    provider: "Google Ireland Limited",
  },
  {
    name: "_ga_*",
    category: "analytics",
    duration: "2 Jahre",
    purpose: "Wird von Google Analytics verwendet, um den Sitzungsstatus zu erhalten.",
    provider: "Google Ireland Limited",
  },
  // ── MARKETING ──
  {
    name: "_fbp",
    category: "marketing",
    duration: "3 Monate",
    purpose: "Wird von Meta/Facebook genutzt, um Werbemaßnahmen zu messen und relevante Anzeigen bereitzustellen.",
    provider: "Meta Platforms Ireland Ltd.",
  },
  {
    name: "NID / AEC / SOCS",
    category: "marketing",
    duration: "6 Monate",
    purpose: "Wird von Google Maps in interaktiven Umgebungskarten genutzt, um Nutzerpräferenzen zu speichern.",
    provider: "Google Ireland Limited",
  },
  {
    name: "Calendly_*",
    category: "marketing",
    duration: "App-Sitzung",
    purpose: "Wird für die Funktionsfähigkeit des Terminbuchungs-Widgets (Vor-Ort-Aufmaß & Beratung) verwendet.",
    provider: "Calendly LLC",
  },
] as const;

// ─── Data Processing Inventory (DSGVO Art. 30) ───

export const DATA_PROCESSING_INVENTORY: readonly DataProcessingEntry[] = [
  {
    name: "Projektanfrage & Kontaktformular (/api/anfrage)",
    dataCollected: ["Name", "E-Mail-Adresse", "Telefonnummer", "Postleitzahl / Ort", "Projektbeschreibung"],
    legalBasis: "Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) / Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kundenanfragen)",
    recipient: "Fliesenverlegung Tezgel (Inhaber Deniz Tezgel) / Resend (E-Mail-Transaktionsdienst)",
    retentionPeriod: "Bis zur vollständigen Abwicklung der Anfrage bzw. gesetzlicher Aufbewahrungsfristen",
    consentCategory: null, // Vertragsanbahnung
    thirdCountryTransfer: "EU-Rechenzentren / Auftragsverarbeitungsvertrag vorhanden",
  },
  {
    name: "Google Analytics 4",
    dataCollected: ["Anonymisierte IP-Adresse", "Geräteinformationen", "Seitenpfade", "Verweildauer"],
    legalBasis: "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)",
    recipient: "Google Ireland Limited",
    retentionPeriod: "14 Monate",
    consentCategory: "analytics",
    thirdCountryTransfer: "USA · EU-US Data Privacy Framework (DPF) zertifiziert",
  },
  {
    name: "Meta / Facebook Pixel",
    dataCollected: ["Pseudonyme Kennung", "Browser-Informationen", "Conversion-Events (Anfragen)"],
    legalBasis: "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)",
    recipient: "Meta Platforms Ireland Ltd.",
    retentionPeriod: "Gemäß Meta-Datenschutzrichtlinie",
    consentCategory: "marketing",
    thirdCountryTransfer: "USA · EU-US Data Privacy Framework zertifiziert",
  },
  {
    name: "Google Maps (Standort- & Einzugsgebiet-Karten)",
    dataCollected: ["IP-Adresse", "Browser-Typ", "Karteninteraktionen"],
    legalBasis: "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)",
    recipient: "Google Ireland Limited",
    retentionPeriod: "Gemäß Google-Datenschutzrichtlinie",
    consentCategory: "marketing",
    thirdCountryTransfer: "USA · EU-US Data Privacy Framework zertifiziert",
  },
  {
    name: "Technisch notwendige Cookies",
    dataCollected: ["Consent-Status", "Widget-Docking-Position", "Sitzungsdaten"],
    legalBasis: "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Funktionsfähigkeit und Barrierefreiheit)",
    recipient: "Fliesenverlegung Tezgel (keine Weitergabe)",
    retentionPeriod: "Maximal 365 Tage",
    consentCategory: null,
    thirdCountryTransfer: null,
  },
] as const;

// ─── Consent Category Descriptions (for Banner UI) ───

export const CONSENT_CATEGORY_INFO: Record<ConsentCategory, { label: string; description: string; required: boolean }> = {
  essential: {
    label: "Technisch notwendig",
    description: "Diese Cookies sind für den sicheren Betrieb, die Navigation und Grundfunktionen der Website unverzichtbar. Sie können nicht deaktiviert werden.",
    required: true,
  },
  analytics: {
    label: "Analyse & Reichweitenmessung",
    description: "Hilft uns zu verstehen, wie Besucher unsere Fliesen- und Badangebote nutzen, um die Benutzerfreundlichkeit stetig zu verbessern. Alle Daten werden anonymisiert verarbeitet.",
    required: false,
  },
  marketing: {
    label: "Externe Medien & Marketing",
    description: "Ermöglicht die Anzeige interaktiver Standortkarten (Google Maps) und Terminbuchungs-Funktionen für Vor-Ort-Aufmaße.",
    required: false,
  },
};
