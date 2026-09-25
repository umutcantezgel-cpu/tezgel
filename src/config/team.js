/**
 * Default Team Configuration - Fliesenverlegung Tezgel
 */

import { COMPANY_DATA } from '@/config/company';

export const teamMembers = [
    {
        id: 1,
        name: COMPANY_DATA.owner.fullName,
        role: COMPANY_DATA.owner.title,
        email: COMPANY_DATA.contact.email,
        phone: COMPANY_DATA.contact.phone,
        image: '',
        specializations: ['Badsanierung', 'Fugenarme Großformate', 'DIN 18534 Verbundabdichtung'],
        bio: `Inhaber und Fachbetriebsleiter der ${COMPANY_DATA.legalName} in Aßlar – persönlicher Ansprechpartner vom Aufmaß bis zur Abnahme.`
    },
    {
        id: 2,
        name: 'Verlege-Team Tezgel',
        role: 'Fliesen-, Platten- und Mosaikleger',
        email: COMPANY_DATA.contact.email,
        phone: COMPANY_DATA.contact.phone,
        image: '',
        specializations: ['Bäder & Walk-In-Duschen', 'Wohnbereiche & Treppen', 'Balkon & Terrasse'],
        bio: 'Erfahrene Fliesenleger für saubere, staubgeschützte Ausführung in bewohnten Räumen.'
    },
];

export default teamMembers;
