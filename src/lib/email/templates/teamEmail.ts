import type { InquiryPayload } from '../types';
import { escapeHtml, sanitizeHeaderValue } from '../security';
import { wrapInMsoContainer, renderSpecRow, renderBulletproofButton } from './components';

/**
 * Builds the list of structured specification key-value pairs for the team notification.
 */
function extractDetails(payload: InquiryPayload, referenceId: string): { label: string; value: string }[] {
  const { inquiryType, projectTitle, contact, badDetails, fliesenDetails, terminDetails, projektCheckDetails, timing, area } = payload;

  let typeLabel = 'Projektanfrage';
  if (inquiryType === 'termin') typeLabel = 'Terminvereinbarung Aufmaß';
  else if (inquiryType === 'bad') typeLabel = 'Badsanierung';
  else if (inquiryType === 'fliesen') typeLabel = 'Fliesen-Konfigurator';
  else if (inquiryType === 'projekt_check') typeLabel = 'Bad-Projektcheck';

  const details: { label: string; value: string }[] = [];

  details.push({ label: 'Vorgangsnummer', value: referenceId });
  details.push({ label: 'Projektart', value: projectTitle || typeLabel });
  details.push({ label: 'Kundenname', value: contact.name });
  details.push({ label: 'Telefonnummer', value: contact.phone });
  if (contact.email) details.push({ label: 'E-Mail', value: contact.email });
  if (contact.zipCity || contact.location) {
    details.push({ label: 'Einsatzort / PLZ', value: contact.zipCity || contact.location || '' });
  }
  if (contact.street) details.push({ label: 'Straße / Nr.', value: contact.street });

  if (inquiryType === 'termin' && terminDetails) {
    if (terminDetails.topicLabel) details.push({ label: 'Aufmaßthema', value: terminDetails.topicLabel });
    if (terminDetails.formattedDate || terminDetails.date) {
      details.push({ label: 'Wunschdatum', value: terminDetails.formattedDate || terminDetails.date || '' });
    }
    if (terminDetails.timeSlotLabel) details.push({ label: 'Zeitfenster', value: terminDetails.timeSlotLabel });
  } else if (inquiryType === 'bad' && badDetails) {
    if (badDetails.sqm) {
      const dim = badDetails.length && badDetails.width ? ` (${badDetails.length} x ${badDetails.width} m)` : '';
      details.push({ label: 'Badgröße', value: `${badDetails.sqm} m²${dim}` });
    }
    if (badDetails.scopeLabel) details.push({ label: 'Sanierungsumfang', value: badDetails.scopeLabel });
    if (badDetails.tierLabel) details.push({ label: 'Ausstattungsniveau', value: badDetails.tierLabel });
    if (badDetails.propertyTypeLabel) details.push({ label: 'Immobilie', value: badDetails.propertyTypeLabel });
    if (badDetails.personsLabel) details.push({ label: 'Personen im Haushalt', value: badDetails.personsLabel });
    if (badDetails.featureLabels && badDetails.featureLabels.length > 0) {
      details.push({ label: 'Ausstattungswünsche', value: badDetails.featureLabels.join(', ') });
    }
  } else if (inquiryType === 'fliesen' && fliesenDetails) {
    if (fliesenDetails.roomLabels && fliesenDetails.roomLabels.length > 0) {
      details.push({ label: 'Räume / Bereiche', value: fliesenDetails.roomLabels.join(', ') });
    }
    if (fliesenDetails.sqm) details.push({ label: 'Fläche', value: `ca. ${fliesenDetails.sqm} m²` });
    if (fliesenDetails.tileTypeLabel) details.push({ label: 'Fliesenart / Format', value: fliesenDetails.tileTypeLabel });
    if (fliesenDetails.substrateLabel) details.push({ label: 'Untergrund', value: fliesenDetails.substrateLabel });
    if (fliesenDetails.removalLabel) details.push({ label: 'Altbelag-Rückbau', value: fliesenDetails.removalLabel });
    if (fliesenDetails.underfloorHeatingLabel) details.push({ label: 'Fußbodenheizung', value: fliesenDetails.underfloorHeatingLabel });
    if (fliesenDetails.timingLabel) details.push({ label: 'Zeitraum', value: fliesenDetails.timingLabel });
  } else if (inquiryType === 'projekt_check' && projektCheckDetails) {
    if (projektCheckDetails.sqm) details.push({ label: 'Badgröße', value: `ca. ${projektCheckDetails.sqm} m²` });
    if (projektCheckDetails.scopeLabel) details.push({ label: 'Umfang', value: projektCheckDetails.scopeLabel });
    if (projektCheckDetails.tierLabel) details.push({ label: 'Niveau', value: projektCheckDetails.tierLabel });
    if (projektCheckDetails.extras && projektCheckDetails.extras.length > 0) {
      details.push({ label: 'Extras', value: projektCheckDetails.extras.join(', ') });
    }
  } else {
    if (area) details.push({ label: 'Umfang / Fläche', value: area });
    if (timing) details.push({ label: 'Zeitraum', value: timing });
  }

  return details;
}

/**
 * Generates an actionable, structured, MSO-compatible HTML lead notification email for the craftsman team.
 */
export function generateTeamEmailHtml(payload: InquiryPayload, referenceId: string): string {
  const { inquiryType, contact, notes } = payload;

  const timestamp = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(new Date());

  let typeLabel = 'Projektanfrage';
  if (inquiryType === 'termin') typeLabel = 'Terminvereinbarung Aufmaß';
  else if (inquiryType === 'bad') typeLabel = 'Badsanierung';
  else if (inquiryType === 'fliesen') typeLabel = 'Fliesen-Konfigurator';
  else if (inquiryType === 'projekt_check') typeLabel = 'Bad-Projektcheck';

  // Build clean phone link for WhatsApp & Tel
  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? '49' + cleanPhone.slice(1) : cleanPhone;
  const telLink = `tel:${contact.phone.replace(/[\s/]/g, '')}`;

  const details = extractDetails(payload, referenceId);
  const rowsHtml = details.map((item, idx) => renderSpecRow(item.label, item.value, idx % 2 === 0)).join('');

  const quickActionButtons = `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
      <tr>
        <td style="padding:4px;" align="center">
          ${renderBulletproofButton({
            href: telLink,
            label: `📞 Anrufen (${contact.phone})`,
            bgColor: '#ea580c',
            width: 190
          })}
        </td>
        <td style="padding:4px;" align="center">
          ${renderBulletproofButton({
            href: `https://wa.me/${waPhone}`,
            label: '💬 WhatsApp Chat',
            bgColor: '#16a34a',
            width: 170
          })}
        </td>
        ${
          contact.email
            ? `
        <td style="padding:4px;" align="center">
          ${renderBulletproofButton({
            href: `mailto:${contact.email}`,
            label: '✉️ E-Mail',
            bgColor: '#0f172a',
            width: 130
          })}
        </td>`
            : ''
        }
      </tr>
    </table>
  `;

  const innerContent = `
    <!-- Top Accent Bar -->
    <div style="background-color:#ea580c;height:6px;width:100%;font-size:0;line-height:0;">&nbsp;</div>

    <!-- Header Section -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#0f172a;color:#ffffff;">
      <tr>
        <td style="padding:24px 22px;">
          <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;background-color:rgba(234,88,12,0.25);color:#fed7aa;border:1px solid rgba(234,88,12,0.4);display:inline-block;padding:3px 8px;border-radius:4px;margin-bottom:8px;">
            ${escapeHtml(typeLabel)} &middot; Vorgang ${escapeHtml(referenceId)}
          </div>
          <h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.25;">
            Neue Website-Anfrage eingegangen
          </h1>
          <p style="margin:6px 0 0 0;font-size:12.5px;color:#94a3b8;">
            Eingang am ${escapeHtml(timestamp)} (Europe/Berlin)
          </p>
        </td>
      </tr>
    </table>

    <!-- Quick Action Bar (Table-based for Outlook Classic compatibility) -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#fff7ed;border-bottom:1px solid #fed7aa;">
      <tr>
        <td style="padding:16px 20px;text-align:center;">
          <span style="display:block;font-size:11.5px;font-weight:800;color:#9a3412;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;">
            Sofortkontakt zum Interessenten:
          </span>
          ${quickActionButtons}
        </td>
      </tr>
    </table>

    <!-- Specifications Table -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
      <tr>
        <td style="padding:22px;">
          <h3 style="margin:0 0 12px 0;font-size:13.5px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">
            Projektdaten &amp; Kontaktdaten:
          </h3>
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;border-collapse:collapse;">
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          ${
            notes
              ? `
          <div style="margin-top:20px;">
            <span style="font-size:11.5px;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">
              Anmerkungen des Kunden:
            </span>
            <div style="background:#f8fafc;border-left:4px solid #ea580c;padding:14px 16px;border-radius:0 8px 8px 0;font-size:13.5px;line-height:1.55;color:#1e293b;word-break:break-word;">
              ${escapeHtml(notes).replace(/\n/g, '<br>')}
            </div>
          </div>`
              : ''
          }
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;">
      <tr>
        <td style="padding:16px 20px;font-size:11.5px;color:#64748b;text-align:center;">
          Fliesenverlegung Tezgel &middot; Internes Lead-Management &middot; Vorgangsnummer: <strong>${escapeHtml(referenceId)}</strong>
        </td>
      </tr>
    </table>
  `;

  return `<!DOCTYPE html>
<html lang="de" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Anfrage: ${escapeHtml(typeLabel)} - ${escapeHtml(contact.name)}</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f1f5f9;color:#0f172a;margin:0;padding:20px 10px;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  ${wrapInMsoContainer(innerContent, 600)}
</body>
</html>`;
}

/**
 * Generates structured Plain-Text companion for the team lead notification.
 */
export function generateTeamEmailText(payload: InquiryPayload, referenceId: string): string {
  const { contact, notes } = payload;
  const timestamp = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(new Date());

  const details = extractDetails(payload, referenceId);
  const detailsText = details.map((d) => `* ${d.label}: ${d.value}`).join('\n');

  return `===========================================================
NEUE WEBSITE-ANFRAGE [${referenceId}]
Fliesenverlegung Tezgel - Internes Lead-Management
===========================================================

Eingegangen am: ${timestamp} (Europe/Berlin)
Vorgangsnummer: ${referenceId}

SCHNELLKONTAKT ZUM INTERESSENTEN:
- Telefon: ${contact.phone}
- E-Mail:  ${contact.email || 'Nicht angegeben'}

PROJEKTDATEN & SPEZIFIKATIONEN:
${detailsText}

${notes ? `ANMERKUNGEN DES KUNDEN:\n${notes}\n` : ''}
===========================================================
Diese Nachricht wurde automatisch über das Kontaktformular von tezgel.de generiert.
Antworten auf diese E-Mail gehen direkt an den Interessenten (Reply-To).
`;
}

/**
 * Generates the standardized subject line for the team lead notification.
 * Preserves the exact "[Neue Anfrage]" prefix for existing Outlook rules.
 */
export function getTeamEmailSubject(payload: InquiryPayload, referenceId: string): string {
  const locationTag = sanitizeHeaderValue(payload.contact.zipCity || payload.contact.location || 'Aßlar/Wetzlar');
  const title = sanitizeHeaderValue(payload.projectTitle || 'Projektanfrage');
  const name = sanitizeHeaderValue(payload.contact.name);
  const ref = sanitizeHeaderValue(referenceId);

  return `[Neue Anfrage] ${title} - ${name} (${locationTag}) [${ref}]`;
}
