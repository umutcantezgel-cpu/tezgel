import { z } from 'zod';

/**
 * Phone number regex allowing international formats (+49...), spaces, dashes, slashes and parens.
 * Minimum 5 digits/chars, maximum 40 chars.
 */
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{4,35}$/;

/**
 * Strips carriage returns and newlines to prevent header injection.
 */
export function stripNewlines(str: string): string {
  return str.replace(/[\r\n\x00-\x1f\x7f]/g, ' ').trim();
}

/**
 * Normalizes multi-line text (e.g. notes): cleans CRLF to LF, limits excessive newlines,
 * strips control characters except tab and newline.
 */
export function normalizeMultiline(str: string): string {
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Zod schema for customer contact data
 */
export const CustomerContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Bitte geben Sie einen Namen mit mindestens 2 Zeichen ein.')
    .max(100, 'Der Name darf maximal 100 Zeichen lang sein.')
    .transform(stripNewlines),
  phone: z
    .string()
    .min(5, 'Bitte geben Sie eine gültige Telefonnummer an.')
    .max(40, 'Die Telefonnummer darf maximal 40 Zeichen lang sein.')
    .refine((val) => PHONE_REGEX.test(val.trim()), {
      message: 'Bitte geben Sie eine gültige Telefonnummer an (z. B. 0172 / 1234567).'
    })
    .transform(stripNewlines),
  email: z
    .string()
    .max(100, 'Die E-Mail-Adresse darf maximal 100 Zeichen lang sein.')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
    .transform((val) => stripNewlines(val.toLowerCase()))
    .optional()
    .or(z.literal('')),
  street: z
    .string()
    .max(120, 'Die Straße darf maximal 120 Zeichen lang sein.')
    .transform(stripNewlines)
    .optional()
    .or(z.literal('')),
  zipCity: z
    .string()
    .max(120, 'Der Ort/PLZ darf maximal 120 Zeichen lang sein.')
    .transform(stripNewlines)
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(120, 'Der Einsatzort darf maximal 120 Zeichen lang sein.')
    .transform(stripNewlines)
    .optional()
    .or(z.literal(''))
});

/**
 * Funnel-specific details schemas with strict bounds
 */
export const BadDetailsSchema = z.object({
  scope: z.string().max(80).optional(),
  scopeLabel: z.string().max(100).optional(),
  tier: z.string().max(80).optional(),
  tierLabel: z.string().max(100).optional(),
  sqm: z.union([z.number().min(1).max(500), z.string().max(20)]).optional(),
  length: z.union([z.number().min(0).max(50), z.string().max(20)]).optional(),
  width: z.union([z.number().min(0).max(50), z.string().max(20)]).optional(),
  persons: z.string().max(50).optional(),
  personsLabel: z.string().max(80).optional(),
  propertyType: z.string().max(80).optional(),
  propertyTypeLabel: z.string().max(100).optional(),
  features: z.array(z.string().max(80)).max(20).optional(),
  featureLabels: z.array(z.string().max(100)).max(20).optional()
}).optional();

export const FliesenDetailsSchema = z.object({
  rooms: z.array(z.string().max(80)).max(20).optional(),
  roomLabels: z.array(z.string().max(100)).max(20).optional(),
  sqm: z.union([z.number().min(1).max(2000), z.string().max(20)]).optional(),
  substrate: z.string().max(80).optional(),
  substrateLabel: z.string().max(100).optional(),
  tileType: z.string().max(80).optional(),
  tileTypeLabel: z.string().max(100).optional(),
  removal: z.string().max(80).optional(),
  removalLabel: z.string().max(100).optional(),
  underfloorHeating: z.string().max(80).optional(),
  underfloorHeatingLabel: z.string().max(100).optional(),
  timing: z.string().max(80).optional(),
  timingLabel: z.string().max(100).optional()
}).optional();

export const TerminDetailsSchema = z.object({
  topic: z.string().max(80).optional(),
  topicLabel: z.string().max(100).optional(),
  date: z.string().max(40).optional(),
  formattedDate: z.string().max(60).optional(),
  timeSlot: z.string().max(40).optional(),
  timeSlotLabel: z.string().max(60).optional()
}).optional();

export const ProjektCheckDetailsSchema = z.object({
  sqm: z.union([z.number().min(1).max(500), z.string().max(20)]).optional(),
  scope: z.string().max(80).optional(),
  scopeLabel: z.string().max(100).optional(),
  tier: z.string().max(80).optional(),
  tierLabel: z.string().max(100).optional(),
  extras: z.array(z.string().max(100)).max(20).optional()
}).optional();

/**
 * Master Inquiry Submission Schema
 */
export const InquirySubmissionSchema = z.object({
  inquiryType: z
    .enum(['general', 'bad', 'fliesen', 'termin', 'projekt_check'])
    .default('general'),
  projectTitle: z
    .string()
    .max(120, 'Der Projekttitel darf maximal 120 Zeichen lang sein.')
    .transform(stripNewlines)
    .optional(),
  projectType: z
    .string()
    .max(60)
    .transform(stripNewlines)
    .optional(),
  contact: CustomerContactSchema,
  timing: z
    .string()
    .max(80, 'Der Zeitraum darf maximal 80 Zeichen lang sein.')
    .transform(stripNewlines)
    .optional(),
  area: z
    .string()
    .max(80, 'Die Flächenangabe darf maximal 80 Zeichen lang sein.')
    .transform(stripNewlines)
    .optional(),
  notes: z
    .string()
    .max(2000, 'Ihre Anmerkungen dürfen maximal 2.000 Zeichen lang sein.')
    .transform(normalizeMultiline)
    .optional()
    .or(z.literal('')),
  // Anti-bot honeypot: Must be empty or undefined
  honeypot: z
    .string()
    .max(100)
    .optional()
    .or(z.literal('')),
  // Submission timestamp for fast-bot barrier (Unix epoch in ms)
  _t: z
    .union([z.number(), z.string()])
    .optional(),
  // Specific details
  badDetails: BadDetailsSchema,
  fliesenDetails: FliesenDetailsSchema,
  terminDetails: TerminDetailsSchema,
  projektCheckDetails: ProjektCheckDetailsSchema
});

export type ValidatedInquiryInput = z.infer<typeof InquirySubmissionSchema>;

/**
 * Validates and normalizes raw inquiry payload. Returns typed result or throws friendly Error.
 */
export function validateInquiryPayload(rawBody: unknown): {
  success: boolean;
  data?: ValidatedInquiryInput;
  error?: string;
  fieldErrors?: Record<string, string>;
} {
  // Normalize legacy flat fields to contact object if needed
  let normalizedBody = rawBody;
  if (typeof rawBody === 'object' && rawBody !== null) {
    const obj = rawBody as Record<string, unknown>;
    const contactObj = (typeof obj.contact === 'object' && obj.contact !== null)
      ? { ...(obj.contact as Record<string, unknown>) }
      : {};

    if (!contactObj.name && obj.name) contactObj.name = obj.name;
    if (!contactObj.phone && obj.phone) contactObj.phone = obj.phone;
    if (!contactObj.email && obj.email) contactObj.email = obj.email;
    if (!contactObj.location && (obj.location || obj.zipCity)) {
      contactObj.location = obj.location || obj.zipCity;
    }
    if (!contactObj.street && obj.street) contactObj.street = obj.street;

    normalizedBody = {
      ...obj,
      contact: contactObj
    };
  }

  const result = InquirySubmissionSchema.safeParse(normalizedBody);

  if (!result.success) {
    const issues = result.error.issues;
    const firstIssue = issues[0];
    const fieldErrors: Record<string, string> = {};
    for (const issue of issues) {
      const key = issue.path.join('.');
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      success: false,
      error: firstIssue?.message || 'Ungültige Formulardaten.',
      fieldErrors
    };
  }

  return {
    success: true,
    data: result.data
  };
}
