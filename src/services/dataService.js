/**
 * Data Service
 * Handles reading and writing content data.
 * Implements a "Local-First" strategy:
 * 1. Checks localStorage for overrides.
 * 2. Falls back to default config files (Single Source of Truth).
 */

import COMPANY_DATA from '@/config/company';
import SERVICES from '@/config/services';
import PORTFOLIO_PROJECTS from '@/config/projects';
import { categories as blogCategories } from '@/config/blog';
import { posts as blogPosts } from '@/config/posts';
import { teamMembers } from '@/config/team';
import { schemas as validationSchemas } from '@/schemas/validation';
// Schlüssel und Lesen liegen in inhaltLesen.js (UM-E4-LEISTUNG), damit Leser ohne Vorgaben und zod auskommen
import { STORAGE_KEYS, liesInhalt } from './inhaltLesen';

// Adapter to map COMPANY_DATA to legacy siteConfig structure for UI compatibility
const getAdaptedSiteConfig = () => ({
    name: COMPANY_DATA.legalName,
    description: "Ihr Fachbetrieb für Fliesenverlegung, Badsanierung und fugenarme Großformate in Aßlar, Wetzlar und ganz Hessen.",
    contact: {
        phone: COMPANY_DATA.contact.phone,
        phoneLink: COMPANY_DATA.contact.phoneLink,
        email: COMPANY_DATA.contact.email,
        address: {
            street: COMPANY_DATA.address.street,
            zipCity: `${COMPANY_DATA.address.postalCode} ${COMPANY_DATA.address.city}`
        },
        hours: {
            weekdays: COMPANY_DATA.hours.formattedWeekdays,
            saturday: COMPANY_DATA.hours.formattedSaturday
        }
    },
    social: {
        instagram: COMPANY_DATA.social?.instagram || ""
    },
    serviceAreas: COMPANY_DATA.business.serviceArea,
    legal: {
        owner: COMPANY_DATA.owner.fullName,
        taxId: COMPANY_DATA.tax.ustId,
        register: COMPANY_DATA.authority.name
    }
});

const DEFAULTS = {
    [STORAGE_KEYS.SITE]: getAdaptedSiteConfig(),
    [STORAGE_KEYS.SERVICES]: SERVICES,
    [STORAGE_KEYS.COMPANY]: COMPANY_DATA,
    [STORAGE_KEYS.PROJECTS]: { projects: PORTFOLIO_PROJECTS, categories: [] },
    [STORAGE_KEYS.BLOG_CATEGORIES]: blogCategories,
    [STORAGE_KEYS.BLOG_POSTS]: blogPosts,
    [STORAGE_KEYS.SETTINGS]: {
        notifications: {
            emailNotifications: true,
            contactFormAlerts: true,
            weeklyReports: false,
            securityAlerts: true
        },
        appearance: {
            theme: 'light',
            compactMode: false
        }
    },
    [STORAGE_KEYS.TEAM]: teamMembers
};

export const dataService = {
    get(key) {
        if (key === STORAGE_KEYS.SITE) {
            return liesInhalt(key, DEFAULTS[key], (parsed) => {
                const freshConfig = getAdaptedSiteConfig();
                return {
                    ...parsed,
                    contact: {
                        ...freshConfig.contact,
                        ...parsed.contact
                    },
                    legal: freshConfig.legal
                };
            });
        }
        return liesInhalt(key, DEFAULTS[key]);
    },

    save(key, data) {
        try {
            if (validationSchemas[key]) {
                const result = validationSchemas[key].safeParse(data);
                if (!result.success) {
                    console.error(`Validation failed for ${key}:`, result.error);
                    return false;
                }
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(data));
                window.dispatchEvent(new Event('content-updated'));
            }
            return true;
        } catch (e) {
            console.error(`Error saving ${key} to storage:`, e);
            return false;
        }
    },

    getSiteConfig() { return this.get(STORAGE_KEYS.SITE); },
    getServices() { return this.get(STORAGE_KEYS.SERVICES); },
    getCompany() { return this.get(STORAGE_KEYS.COMPANY); },
    getProjects() { return this.get(STORAGE_KEYS.PROJECTS); },
    getBlogCategories() { return this.get(STORAGE_KEYS.BLOG_CATEGORIES); },
    getBlogPosts() { return this.get(STORAGE_KEYS.BLOG_POSTS); },
    getTeam() { return this.get(STORAGE_KEYS.TEAM); },
    getSettings() { return this.get(STORAGE_KEYS.SETTINGS); },

    reset(key) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
            window.dispatchEvent(new Event('content-updated'));
        }
    },

    clearAll() {
        if (typeof window !== 'undefined') {
            Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
            localStorage.removeItem('tezgel_auth_config');
            // Don't clear session automatically, let frontend handle it related to reload
            window.dispatchEvent(new Event('content-updated'));
        }
    },

    exportAll() {
        return {
            site: this.getSiteConfig(),
            services: this.getServices(),
            company: this.getCompany(),
            projects: this.getProjects(),
            blog: this.getBlogCategories(),
            team: this.getTeam(),
            settings: this.getSettings(),
            exportedAt: new Date().toISOString()
        };
    }
};

export const KEYS = STORAGE_KEYS;
