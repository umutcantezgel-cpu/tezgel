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
import { checkRecipientRateLimit } from './security';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Weg der Anfrage-Mails (Auftraggeber 31.10.2026, E-109): kontakt@tezgel.de ist der Absender und damit der
 * Mittelpunkt. Von dort geht die Anfrage an info@tezgel.de und die Eingangsbestätigung an den Kunden.
 * Antworten des Kunden auf seine Bestätigung gehen an info@tezgel.de, Antworten des Teams auf die Anfrage
 * direkt an den Kunden. Vorher schrieb info@ an info@ selbst; solche Mails landen leicht im Spam.
 * In der Hosting-Umgebung gehen CONTACT_EMAIL (Empfänger) und RESEND_FROM_EMAIL (Absender) vor, damit sich
 * beides ohne Codeänderung umstellen lässt. Die angezeigte Firmenadresse (COMPANY_DATA.contact.email:
 * Impressum, Fuß, strukturierte Daten, Kundenmail) bleibt davon unberührt.
 */
export const ANFRAGE_EMPFAENGER = 'info@tezgel.de';
export const ANFRAGE_ABSENDER = 'Fliesenverlegung Tezgel <kontakt@tezgel.de>';

type Umgebung = Record<string, string | undefined>;

export function anfrageEmpfaenger(env: Umgebung = process.env): string {
  return env.CONTACT_EMAIL?.trim() || ANFRAGE_EMPFAENGER;
}

export function anfrageAbsender(env: Umgebung = process.env): string {
  return env.RESEND_FROM_EMAIL?.trim() || ANFRAGE_ABSENDER;
}

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
function recordFallbackLead(record: LeadFallbackRecord): boolean {
  try {
    const logDir = path.join(process.cwd(), '.leads-fallback');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, 'leads.jsonl');
    const logLine = JSON.stringify(record) + '\n';
    fs.appendFileSync(logFile, logLine, 'utf8');
    console.warn(`[Lead-FailSafe] Lead ${record.referenceId} saved to fallback store due to delivery failure.`);
    return true;
  } catch (err) {
    // Auf Vercel ist das Dateisystem schreibgeschützt: dann ist die Anfrage NICHT gesichert (E-110)
    console.error('[Lead-FailSafe] Could not write fallback lead:', err);
    return false;
  }
}

/**
 * Absicherung des Versands (Auftraggeber 31.10.2026, E-110). Resend 6 wirft bei API-Fehlern nicht, sondern gibt
 * `{ data, error }` zurück; ohne diese Prüfung galt jede abgelehnte Mail als versendet. `sendeMail` macht aus einem
 * `error` einen Ausnahmefehler, damit Wiederholung, Notfallspeicher und Fehlermeldung greifen.
 */
export interface MailNachricht {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

export interface MailClient {
  emails: {
    send: (
      nachricht: MailNachricht
    ) => Promise<{ data?: unknown; error?: { message?: string; name?: string; statusCode?: number | null } | null }>;
  };
}

async function sendeMail(client: MailClient, nachricht: MailNachricht): Promise<string> {
  const antwort = await client.emails.send(nachricht);
  const fehler = antwort?.error;
  if (fehler) {
    throw new Error(`Resend ${fehler.statusCode ?? ''} ${fehler.name ?? ''}: ${fehler.message ?? 'unbekannter Fehler'}`.replace(/\s+/g, ' '));
  }
  // Resend-ID für das Protokoll (in Resend unter „Emails“ auffindbar); ohne Namen oder Adressen
  const daten = antwort?.data as { id?: string } | null | undefined;
  return daten?.id ?? 'ohne ID';
}

/** Nur die Produktion auf Vercel versendet zwingend echt; lokal, in Tests und in Vorschauen bleibt der Probemodus. */
export function istLiveProduktion(env: Umgebung = process.env): boolean {
  return env.VERCEL_ENV === 'production';
}

/** Einstellbar für Tests: Umgebung, nachgebauter Client, Notfallspeicher, Wartezeiten der Wiederholung. */
export interface VersandOptionen {
  env?: Umgebung;
  client?: MailClient;
  notfallSpeichern?: (record: LeadFallbackRecord) => boolean;
  wartezeiten?: { team: number[]; kunde: number[] };
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
export async function sendInquiryEmails(payload: InquiryPayload, optionen: VersandOptionen = {}): Promise<SendEmailResult> {
  const env = optionen.env ?? process.env;
  const wartezeiten = optionen.wartezeiten ?? { team: [500, 1500], kunde: [500] };
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

  const resendApiKey = env.RESEND_API_KEY;
  // Weg der Mails: Absender kontakt@tezgel.de, Anfrage an info@tezgel.de (siehe anfrageAbsender, anfrageEmpfaenger)
  const recipientEmail = anfrageEmpfaenger(env);
  const fromSender = anfrageAbsender(env);

  // 2. Dev Mock Mode: In development without a key, simulate delivery and log details
  if (!resendApiKey || resendApiKey.trim() === '' || resendApiKey.startsWith('re_your_api_key')) {
    if (istLiveProduktion(env)) {
      // Produktion ohne Schlüssel: nicht „erfolgreich“ melden, sonst gehen Anfragen still verloren (E-110)
      console.error(`[E-Mail Mailer] RESEND_API_KEY fehlt in der Produktion: Anfrage ${referenceId} wurde nicht versendet.`);
      return {
        success: false,
        referenceId,
        teamSent: false,
        customerSent: false,
        error: 'mail_nicht_eingerichtet',
        message: 'Die Anfrage konnte derzeit nicht übertragen werden.'
      };
    }
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

  const client: MailClient = optionen.client ?? (new Resend(resendApiKey) as unknown as MailClient);

  const teamSubject = getTeamEmailSubject(payload, referenceId);
  const customerSubject = getCustomerEmailSubject(payload, referenceId);

  let teamSent = false;
  let customerSent = false;

  // 3. Send Team Lead Alert with Retry & Backoff (an den Anfrage-Empfänger, siehe anfrageEmpfaenger)
  try {
    const teamId = await withRetry(async () => {
      return await sendeMail(client, {
        from: fromSender,
        to: recipientEmail,
        replyTo: payload.contact.email || recipientEmail,
        subject: teamSubject,
        html: teamHtml,
        text: teamText
      });
    }, 2, wartezeiten.team);
    teamSent = true;
    console.info(`[E-Mail Mailer] Vorgang ${referenceId}: Anfrage-Mail von Resend angenommen (ID ${teamId}).`);
  } catch (teamError) {
    console.error('[E-Mail Mailer] Error dispatching team notification after retries:', teamError);

    // Fail-safe storage: save lead to disk so no inquiry is ever lost!
    const gesichert = (optionen.notfallSpeichern ?? recordFallbackLead)({
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

    if (!gesichert) {
      // Weder versendet noch gesichert (auf Vercel immer so): ehrlich als Fehler melden, damit der Besucher den Hinweis
      // auf Telefon und WhatsApp sieht, statt einer Bestätigung für eine verlorene Anfrage (E-110)
      return {
        success: false,
        referenceId,
        teamSent: false,
        customerSent: false,
        error: 'versand_fehlgeschlagen',
        message: 'Die Anfrage konnte derzeit nicht übertragen werden.'
      };
    }

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
        const kundeId = await withRetry(async () => {
          return await sendeMail(client, {
            from: fromSender,
            to: payload.contact.email!.trim(),
            replyTo: recipientEmail, // Antworten der Kunden gehen an info@tezgel.de
            subject: customerSubject,
            html: customerHtml,
            text: customerText
          });
        }, 1, wartezeiten.kunde);
        customerSent = true;
        console.info(`[E-Mail Mailer] Vorgang ${referenceId}: Eingangsbestätigung von Resend angenommen (ID ${kundeId}).`);
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
