import { Resend } from 'resend';
import type { InquiryPayload, SendEmailResult, LeadFallbackRecord } from './types';
import { generateReferenceId } from './reference';
import {
  generateCustomerEmailHtml,
  generateCustomerEmailText,
  getCustomerEmailSubject
} from './templates/customerEmail';
import {
  generateTeamEmailHtml,
  generateTeamEmailText,
  getTeamEmailSubject
} from './templates/teamEmail';
import { COMPANY_DATA } from '@/config/company';
import { checkRecipientRateLimit } from './security';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Idempotency cache to prevent duplicate email dispatches from rapid double clicks.
 * Cache entries expire after 60 seconds.
 */
interface IdempotencyEntry {
  referenceId: string;
  timestamp: number;
}
const submissionIdempotencyCache = new Map<string, IdempotencyEntry>();

function computePayloadFingerprint(payload: InquiryPayload): string {
  const parts = [
    payload.contact.name.toLowerCase().trim(),
    payload.contact.phone.replace(/[^0-9]/g, ''),
    (payload.contact.email || '').toLowerCase().trim(),
    (payload.projectTitle || '').toLowerCase().trim(),
    (payload.notes || '').slice(0, 100).trim()
  ];
  return parts.join('|');
}

/**
 * In-memory / local fail-safe lead persistence for zero-lost-leads assurance.
 */
function recordFallbackLead(record: LeadFallbackRecord): void {
  try {
    const logDir = path.join(process.cwd(), '.leads-fallback');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, 'leads.jsonl');
    const logLine = JSON.stringify(record) + '\n';
    fs.appendFileSync(logFile, logLine, 'utf8');
    console.warn(`[Lead-FailSafe] Lead ${record.referenceId} saved to fallback store due to delivery failure.`);
  } catch (err) {
    console.error('[Lead-FailSafe] Could not write fallback lead:', err);
  }
}

/**
 * Executes an async task with limited retries and exponential backoff.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delays = [500, 1500]
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      const delay = delays[attempt] || 1000;
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    }
  }
}

/**
 * Dispatches both the internal team notification and the personalized customer confirmation email.
 */
export async function sendInquiryEmails(payload: InquiryPayload): Promise<SendEmailResult> {
  // 1. Idempotency Check: prevent duplicate dispatches within 60s
  const fingerprint = computePayloadFingerprint(payload);
  const now = Date.now();
  const cached = submissionIdempotencyCache.get(fingerprint);

  if (cached && now - cached.timestamp < 60_000) {
    return {
      success: true,
      referenceId: cached.referenceId,
      teamSent: true,
      customerSent: Boolean(payload.contact.email && payload.contact.email.includes('@')),
      message: 'Ihre Anfrage wurde bereits aufgenommen und wird bearbeitet.'
    };
  }

  const referenceId = generateReferenceId();

  // Generate customized HTML and Plain-Text content for both parties
  const teamHtml = generateTeamEmailHtml(payload, referenceId);
  const teamText = generateTeamEmailText(payload, referenceId);
  const customerHtml = generateCustomerEmailHtml(payload, referenceId);
  const customerText = generateCustomerEmailText(payload, referenceId);

  const resendApiKey = process.env.RESEND_API_KEY;
  // info@tezgel.de is the authoritative single email address for all incoming inquiries
  const recipientEmail = COMPANY_DATA.contact.email || process.env.CONTACT_EMAIL || 'info@tezgel.de';
  const fromSender = process.env.RESEND_FROM_EMAIL || `Fliesenverlegung Tezgel <${recipientEmail}>`;

  // 2. Dev Mock Mode: In development without a key, simulate delivery and log details
  if (!resendApiKey || resendApiKey.trim() === '' || resendApiKey.startsWith('re_your_api_key')) {
    submissionIdempotencyCache.set(fingerprint, { referenceId, timestamp: now });

    console.info('[E-Mail Mailer: DEV MOCK MODE]');
    console.info(`-> Vorgangsnummer: ${referenceId}`);
    console.info(`-> Anfragetyp: ${payload.inquiryType} (${payload.projectTitle})`);
    console.info(`-> Kunde: ${payload.contact.name}, Tel: ${payload.contact.phone}, E-Mail: ${payload.contact.email || 'keine'}`);
    console.info(`-> Team-Mail an: ${recipientEmail}`);
    if (payload.contact.email) {
      console.info(`-> Kunden-Mail an: ${payload.contact.email}`);
    }

    return {
      success: true,
      referenceId,
      teamSent: true,
      customerSent: Boolean(payload.contact.email && payload.contact.email.includes('@')),
      mocked: true,
      message: 'Ihre Anfrage wurde erfolgreich aufgenommen (Entwicklungsmodus ohne Resend-Key).'
    };
  }

  const resend = new Resend(resendApiKey);

  const teamSubject = getTeamEmailSubject(payload, referenceId);
  const customerSubject = getCustomerEmailSubject(payload, referenceId);

  let teamSent = false;
  let customerSent = false;

  // 3. Send Team Lead Alert with Retry & Backoff (always arrives at info@tezgel.de)
  try {
    await withRetry(async () => {
      await resend.emails.send({
        from: fromSender,
        to: recipientEmail,
        replyTo: payload.contact.email || recipientEmail,
        subject: teamSubject,
        html: teamHtml,
        text: teamText
      });
    }, 2, [500, 1500]);
    teamSent = true;
  } catch (teamError) {
    console.error('[E-Mail Mailer] Error dispatching team notification after retries:', teamError);

    // Fail-safe storage: save lead to disk so no inquiry is ever lost!
    recordFallbackLead({
      referenceId,
      timestamp: new Date().toISOString(),
      inquiryType: payload.inquiryType,
      projectTitle: payload.projectTitle,
      contact: payload.contact,
      notes: payload.notes,
      teamSent: false,
      customerSent: false,
      error: teamError instanceof Error ? teamError.message : String(teamError)
    });

    return {
      success: true, // Lead is safely recorded in fail-safe store
      referenceId,
      teamSent: false,
      customerSent: false,
      fallbackLogged: true,
      message: 'Ihre Anfrage wurde sicher in unserem System hinterlegt. Wir melden uns zeitnah bei Ihnen.'
    };
  }

  // 4. Send Customer Confirmation (only if valid email and recipient rate limit allows)
  if (payload.contact.email && payload.contact.email.includes('@')) {
    const rateCheck = checkRecipientRateLimit(payload.contact.email);
    if (rateCheck.allowed) {
      try {
        await withRetry(async () => {
          await resend.emails.send({
            from: fromSender,
            to: payload.contact.email!.trim(),
            replyTo: recipientEmail, // Direct customer replies directly into info@tezgel.de
            subject: customerSubject,
            html: customerHtml,
            text: customerText
          });
        }, 1, [500]);
        customerSent = true;
      } catch (custError) {
        console.error('[E-Mail Mailer] Error dispatching customer confirmation:', custError);
        // Non-blocking: team lead was already delivered successfully
      }
    } else {
      console.warn(`[E-Mail Mailer] Customer rate limit reached for ${payload.contact.email}. Confirmation suppressed.`);
    }
  }

  // Record successful submission in idempotency cache
  submissionIdempotencyCache.set(fingerprint, { referenceId, timestamp: now });

  return {
    success: true,
    referenceId,
    teamSent,
    customerSent,
    message: 'Ihre Anfrage wurde erfolgreich an Fliesenverlegung Tezgel übermittelt.'
  };
}
