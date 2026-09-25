// Global site configuration - Fliesenverlegung Tezgel
import { COMPANY_DATA } from './company';

export const siteConfig = {
    name: COMPANY_DATA.legalName,
    tradeName: COMPANY_DATA.tradeName,
    description: 'Fliesenverlegung Tezgel ist Ihr Fachbetrieb für fugenarme Großformate, hochwertige Badsanierung, Wohnbereiche, Terrassen und normgerechte DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.',
    url: 'https://tezgel.de',

    contact: {
        phone: COMPANY_DATA.contact.phone,
        phoneLink: COMPANY_DATA.contact.phoneLink,
        mobile: COMPANY_DATA.contact.mobile,
        mobileLink: COMPANY_DATA.contact.mobileLink,
        whatsapp: COMPANY_DATA.contact.whatsapp,
        whatsappLink: COMPANY_DATA.contact.whatsappLink,
        email: COMPANY_DATA.headquarters.email,
        fax: COMPANY_DATA.headquarters.fax,
        headquarters: {
            street: COMPANY_DATA.headquarters.street,
            zipCity: `${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}`,
            fullAddress: COMPANY_DATA.headquarters.fullAddress,
            mapsUrl: COMPANY_DATA.headquarters.mapsUrl
        },
        address: {
            street: COMPANY_DATA.address.street,
            zipCity: `${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}`,
            country: COMPANY_DATA.address.country || 'Deutschland'
        },
        hours: {
            weekdays: COMPANY_DATA.hours.formattedWeekdays,
            saturday: COMPANY_DATA.hours.formattedSaturday
        }
    },

    social: {
        instagram: ''
    },

    serviceAreas: COMPANY_DATA.business.serviceArea,

    legal: {
        owner: COMPANY_DATA.owner.fullName,
        director: COMPANY_DATA.owner.fullName,
        taxId: COMPANY_DATA.tax.ustId,
        taxNumber: COMPANY_DATA.tax.taxNumber,
        court: COMPANY_DATA.tax.court,
        authority: COMPANY_DATA.authority.name,
        dataProtectionAuthority: {
            name: 'Der Hessische Beauftragte für Datenschutz und Informationsfreiheit',
            street: 'Gustav-Stresemann-Ring 1',
            zipCity: '65189 Wiesbaden',
            website: 'https://datenschutz.hessen.de'
        }
    },

    legalName: COMPANY_DATA.legalName
};

export default siteConfig;
