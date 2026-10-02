/**
 * Types & Interfaces for Fliesenverlegung Tezgel E-Mail Processing Pipeline
 */

export type InquiryType = 'general' | 'bad' | 'fliesen' | 'termin' | 'projekt_check';

export interface CustomerContact {
  name: string;
  phone: string;
  email?: string;
  street?: string;
  zipCity?: string;
  location?: string;
}

export interface BadSpecifics {
  scope?: string;
  scopeLabel?: string;
  tier?: string;
  tierLabel?: string;
  sqm?: number | string;
  length?: number | string;
  width?: number | string;
  persons?: string;
  personsLabel?: string;
  propertyType?: string;
  propertyTypeLabel?: string;
  features?: string[];
  featureLabels?: string[];
}

export interface FliesenSpecifics {
  rooms?: string[];
  roomLabels?: string[];
  sqm?: number | string;
  substrate?: string;
  substrateLabel?: string;
  tileType?: string;
  tileTypeLabel?: string;
  removal?: string;
  removalLabel?: string;
  underfloorHeating?: string;
  underfloorHeatingLabel?: string;
  timing?: string;
  timingLabel?: string;
}

export interface TerminSpecifics {
  topic?: string;
  topicLabel?: string;
  date?: string;
  formattedDate?: string;
  timeSlot?: string;
  timeSlotLabel?: string;
}

export interface ProjektCheckSpecifics {
  sqm?: number | string;
  scope?: string;
  scopeLabel?: string;
  tier?: string;
  tierLabel?: string;
  extras?: string[];
}

export interface InquiryPayload {
  inquiryType: InquiryType;
  projectTitle: string;
  projectType?: string;
  contact: CustomerContact;
  timing?: string;
  area?: string;
  notes?: string;
  honeypot?: string;
  _t?: number | string;
  // Specific extensions per funnel
  badDetails?: BadSpecifics;
  fliesenDetails?: FliesenSpecifics;
  terminDetails?: TerminSpecifics;
  projektCheckDetails?: ProjektCheckSpecifics;
}

export interface SendEmailResult {
  success: boolean;
  referenceId: string;
  teamSent: boolean;
  customerSent: boolean;
  mocked?: boolean;
  message: string;
  error?: string;
  fallbackLogged?: boolean;
}

export interface LeadFallbackRecord {
  referenceId: string;
  timestamp: string;
  inquiryType: InquiryType;
  projectTitle: string;
  contact: CustomerContact;
  notes?: string;
  teamSent: boolean;
  customerSent: boolean;
  error?: string;
}
