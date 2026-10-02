import { Resend } from 'resend';
import { InquiryPayload, SendEmailResult } from './types';
import { generateReferenceId } from './reference';
import { generateCustomerEmailHtml } from './templates/customerEmail';
import { generateTeamEmailHtml } from './templates/teamEmail';
import { COMPANY_DATA } from '@/config/company';

/**
 * Dispatches both the internal team notification and the personalized customer confirmation email.
 */
export async function sendInquiryEmails(payload: InquiryPayload): Promise<SendEmailResult> {
  const referenceId = generateReferenceId();

  // Generate customized HTML content for both parties
  const teamHtml = generateTeamEmailHtml(payload, referenceId);
  const customerHtml = generateCustomerEmailHtml(payload, referenceId);

  const resendApiKey = process.env.RESEND_API_KEY;
  // info@tezgel.de is the authoritative single email address for all incoming inquiries
  const recipientEmail = COMPANY_DATA.contact.email || process.env.CONTACT_EMAIL || 'info@tezgel.de';
  const fromSender = process.env.RESEND_FROM_EMAIL || `Fliesenverlegung Tezgel <${recipientEmail}>`;

  // In development without an API key, simulate delivery and log details
  if (!resendApiKey || resendApiKey.trim() === '' || resendApiKey.startsWith('re_your_api_key')) {
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

  // Subject line for team
  const locationTag = payload.contact.zipCity || payload.contact.location || 'Aßlar/Wetzlar';
  const teamSubject = `[Neue Anfrage] ${payload.projectTitle} - ${payload.contact.name} (${locationTag}) [${referenceId}]`;

  // Dynamic subject line for customer
  let customerSubject = `Ihre Anfrage bei Fliesenverlegung Tezgel (Vorgang ${referenceId})`;
  if (payload.inquiryType === 'termin') {
    customerSubject = `Ihre Terminanfrage für Vor-Ort-Aufmaß (Vorgang ${referenceId}) – Fliesenverlegung Tezgel`;
  } else if (payload.inquiryType === 'bad') {
    customerSubject = `Ihre Badsanierungs-Anfrage (Vorgang ${referenceId}) – Fliesenverlegung Tezgel`;
  } else if (payload.inquiryType === 'fliesen') {
    customerSubject = `Ihre Fliesen-Konfiguration (Vorgang ${referenceId}) – Fliesenverlegung Tezgel`;
  } else if (payload.inquiryType === 'projekt_check') {
    customerSubject = `Ihre Bad-Projektcheck Zusammenfassung (Vorgang ${referenceId}) – Fliesenverlegung Tezgel`;
  }

  let teamSent = false;
  let customerSent = false;

  try {
    // 1. Send team lead alert (always arrives at info@tezgel.de)
    await resend.emails.send({
      from: fromSender,
      to: recipientEmail,
      replyTo: payload.contact.email || recipientEmail,
      subject: teamSubject,
      html: teamHtml
    });
    teamSent = true;
  } catch (teamError) {
    console.error('[E-Mail Mailer] Error dispatching team notification:', teamError);
    throw new Error('E-Mail an Fachbetrieb konnte nicht gesendet werden.');
  }

  // 2. Send customer confirmation if an email address was supplied
  if (payload.contact.email && payload.contact.email.includes('@')) {
    try {
      await resend.emails.send({
        from: fromSender,
        to: payload.contact.email.trim(),
        replyTo: recipientEmail, // Direct customer replies directly into info@tezgel.de
        subject: customerSubject,
        html: customerHtml
      });
      customerSent = true;
    } catch (custError) {
      console.error('[E-Mail Mailer] Error dispatching customer confirmation:', custError);
      // Non-blocking for overall success: team lead was already delivered
    }
  }

  return {
    success: true,
    referenceId,
    teamSent,
    customerSent,
    message: 'Ihre Anfrage wurde erfolgreich an Fliesenverlegung Tezgel übermittelt.'
  };
}
