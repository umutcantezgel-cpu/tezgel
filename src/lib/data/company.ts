import { COMPANY_DATA } from '@/config/company';

export const companyInfo = {
  name: COMPANY_DATA.legalName,
  tradeName: COMPANY_DATA.tradeName,
  owner: COMPANY_DATA.owner.fullName,
  socialMedia: {
    whatsapp: COMPANY_DATA.contact.whatsappNumber,
    instagram: COMPANY_DATA.social.instagram,
  },
  phone: COMPANY_DATA.contact.phone,
  phoneLink: COMPANY_DATA.contact.phoneLink,
  mobile: COMPANY_DATA.contact.mobile,
  mobileLink: COMPANY_DATA.contact.mobileLink,
  email: COMPANY_DATA.contact.email,
  website: COMPANY_DATA.contact.website,
  address: COMPANY_DATA.headquarters.fullAddress,
  city: COMPANY_DATA.headquarters.city,
  postalCode: COMPANY_DATA.headquarters.postalCode,
  street: COMPANY_DATA.headquarters.street,
  motto: COMPANY_DATA.motto,
  business: COMPANY_DATA.business,
  hours: COMPANY_DATA.hours,
};

export { COMPANY_DATA };
export default companyInfo;
