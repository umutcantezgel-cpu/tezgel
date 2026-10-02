import { InquiryPayload } from '../types';

/**
 * Generates an actionable, structured HTML lead notification email for the craftsman team.
 */
export function generateTeamEmailHtml(payload: InquiryPayload, referenceId: string): string {
  const { inquiryType, projectTitle, contact, notes, badDetails, fliesenDetails, terminDetails, projektCheckDetails, timing, area } = payload;

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

  // Build clean phone link for WhatsApp
  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? '49' + cleanPhone.slice(1) : cleanPhone;

  // Build list of details
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

  const rowsHtml = details
    .map(
      (item, idx) => `
    <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
      <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #475569; width: 160px; border-bottom: 1px solid #e2e8f0;">
        ${item.label}:
      </td>
      <td style="padding: 10px 14px; font-size: 13.5px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
        ${item.value}
      </td>
    </tr>
  `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Neue Anfrage: ${typeLabel} - ${contact.name}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: #ffffff; padding: 26px 24px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background-color: rgba(255,255,255,0.2); display: inline-block; padding: 3px 8px; border-radius: 4px; margin-bottom: 8px;">
        ${typeLabel} &middot; Vorgang ${referenceId}
      </div>
      <h1 style="margin: 0; font-size: 21px; font-weight: 800; letter-spacing: -0.02em;">
        Neue Website-Anfrage eingegangen
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #fed7aa;">
        Eingegangen am ${timestamp}
      </p>
    </div>

    <!-- Quick Action Bar -->
    <div style="background-color: #fff7ed; border-bottom: 1px solid #fed7aa; padding: 18px 24px; text-align: center;">
      <span style="display: block; font-size: 12px; font-weight: 800; color: #9a3412; text-transform: uppercase; margin-bottom: 10px;">
        Schnellkontakt zum Interessenten:
      </span>
      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
        <a href="tel:${contact.phone}" style="display: inline-block; background-color: #ea580c; color: #ffffff !important; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin: 3px;">
          📞 Jetzt anrufen (${contact.phone})
        </a>
        <a href="https://wa.me/${waPhone}" style="display: inline-block; background-color: #16a34a; color: #ffffff !important; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin: 3px;">
          💬 WhatsApp Chat öffnen
        </a>
        ${
          contact.email
            ? `<a href="mailto:${contact.email}" style="display: inline-block; background-color: #0f172a; color: #ffffff !important; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin: 3px;">
          ✉️ E-Mail senden
        </a>`
            : ''
        }
      </div>
    </div>

    <!-- Specifications Table -->
    <div style="padding: 24px;">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
        Projektdaten &amp; Kontaktdaten:
      </h3>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      ${
        notes
          ? `
      <div style="margin-top: 20px;">
        <span style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
          Anmerkungen des Kunden:
        </span>
        <div style="background: #f8fafc; border-left: 4px solid #ea580c; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.5; color: #334155;">
          ${notes.replace(/\n/g, '<br>')}
        </div>
      </div>`
          : ''
      }
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center;">
      Fliesenverlegung Tezgel &middot; Internes Lead-Management &middot; Vorgangsnummer: <strong>${referenceId}</strong>
    </div>

  </div>
</body>
</html>`;
}
