import type { InquiryPayload } from '../types';
import { COMPANY_DATA } from '@/config/company';
import { escapeHtml, sanitizeHeaderValue, stripUrls } from '../security';
import { wrapInMsoContainer, renderSpecRow, renderBulletproofButton } from './components';

/**
 * Builds customer-facing specification rows.
 */
function extractCustomerSpecRows(payload: InquiryPayload, referenceId: string): { label: string; value: string }[] {
  const { inquiryType, projectTitle, contact, badDetails, fliesenDetails, terminDetails, projektCheckDetails, timing, area } = payload;

  const specRows: { label: string; value: string }[] = [];

  specRows.push({ label: 'Vorgangsnummer', value: referenceId });
  specRows.push({ label: 'Vorhaben', value: projectTitle || 'Fliesen- und Sanierungsarbeiten' });

  if (contact.zipCity || contact.location) {
    specRows.push({ label: 'Einsatzort', value: contact.zipCity || contact.location || 'Aßlar / Wetzlar' });
  }

  if (inquiryType === 'termin' && terminDetails) {
    if (terminDetails.topicLabel) specRows.push({ label: 'Beratungsthema', value: terminDetails.topicLabel });
    if (terminDetails.formattedDate || terminDetails.date) {
      specRows.push({ label: 'Wunschdatum', value: terminDetails.formattedDate || terminDetails.date || '' });
    }
    if (terminDetails.timeSlotLabel) specRows.push({ label: 'Zeitfenster', value: terminDetails.timeSlotLabel });
  } else if (inquiryType === 'bad' && badDetails) {
    if (badDetails.sqm) {
      const dim = badDetails.length && badDetails.width ? ` (${badDetails.length} x ${badDetails.width} m)` : '';
      specRows.push({ label: 'Raumgröße', value: `ca. ${badDetails.sqm} m²${dim}` });
    }
    if (badDetails.scopeLabel) specRows.push({ label: 'Sanierungsumfang', value: badDetails.scopeLabel });
    if (badDetails.tierLabel) specRows.push({ label: 'Ausstattungsniveau', value: badDetails.tierLabel });
    if (badDetails.propertyTypeLabel) specRows.push({ label: 'Objektart', value: badDetails.propertyTypeLabel });
    if (badDetails.personsLabel) specRows.push({ label: 'Personen im Haushalt', value: badDetails.personsLabel });
    if (badDetails.featureLabels && badDetails.featureLabels.length > 0) {
      specRows.push({ label: 'Ausstattungswünsche', value: badDetails.featureLabels.join(', ') });
    }
  } else if (inquiryType === 'fliesen' && fliesenDetails) {
    if (fliesenDetails.roomLabels && fliesenDetails.roomLabels.length > 0) {
      specRows.push({ label: 'Bereiche / Räume', value: fliesenDetails.roomLabels.join(', ') });
    }
    if (fliesenDetails.sqm) specRows.push({ label: 'Geschätzte Fläche', value: `ca. ${fliesenDetails.sqm} m²` });
    if (fliesenDetails.tileTypeLabel) specRows.push({ label: 'Fliesenart / Format', value: fliesenDetails.tileTypeLabel });
    if (fliesenDetails.substrateLabel) specRows.push({ label: 'Untergrundzustand', value: fliesenDetails.substrateLabel });
    if (fliesenDetails.removalLabel) specRows.push({ label: 'Altbelag entfernen', value: fliesenDetails.removalLabel });
    if (fliesenDetails.underfloorHeatingLabel) specRows.push({ label: 'Fußbodenheizung', value: fliesenDetails.underfloorHeatingLabel });
    if (fliesenDetails.timingLabel) specRows.push({ label: 'Gewünschter Zeitraum', value: fliesenDetails.timingLabel });
  } else if (inquiryType === 'projekt_check' && projektCheckDetails) {
    if (projektCheckDetails.sqm) specRows.push({ label: 'Badezimmergröße', value: `ca. ${projektCheckDetails.sqm} m²` });
    if (projektCheckDetails.scopeLabel) specRows.push({ label: 'Umfang', value: projektCheckDetails.scopeLabel });
    if (projektCheckDetails.tierLabel) specRows.push({ label: 'Ausstattung', value: projektCheckDetails.tierLabel });
    if (projektCheckDetails.extras && projektCheckDetails.extras.length > 0) {
      specRows.push({ label: 'Gewählte Extras', value: projektCheckDetails.extras.join(', ') });
    }
  } else {
    if (area) specRows.push({ label: 'Geschätzte Fläche', value: area });
    if (timing) specRows.push({ label: 'Gewünschter Zeitraum', value: timing });
  }

  return specRows;
}

/**
 * Generates an individualized, high-end, MSO-compatible responsive HTML confirmation email for the customer.
 */
export function generateCustomerEmailHtml(payload: InquiryPayload, referenceId: string): string {
  const { inquiryType, contact, notes } = payload;

  const currentYear = new Date().getFullYear();
  const timestamp = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(new Date());

  let typeBadge = 'Fachbetriebs-Anfrage';
  let dynamicTitle = 'Ihre Anfrage bei Fliesenverlegung Tezgel';
  let dynamicSubtitle = 'Vielen Dank für Ihr Interesse an unseren Handwerksleistungen';

  if (inquiryType === 'termin') {
    typeBadge = '📅 Terminanfrage Vor-Ort-Aufmaß';
    dynamicTitle = 'Ihr Wunschtermin für Vor-Ort-Aufmaß';
    dynamicSubtitle = 'Wir haben Ihre Terminanfrage erhalten und prüfen den Kalender';
  } else if (inquiryType === 'bad') {
    typeBadge = '🛁 Badsanierungs-Anfrage';
    dynamicTitle = 'Ihre Badsanierung & Komplettbad-Planung';
    dynamicSubtitle = 'Ihre Vorhabensdetails für ein Festpreisangebot sind eingegangen';
  } else if (inquiryType === 'fliesen') {
    typeBadge = '📐 Fliesen-Konfiguration';
    dynamicTitle = 'Ihre Fliesen-Konfiguration';
    dynamicSubtitle = 'Ihre Konfigurationsdaten für ein verbindliches Aufmaß';
  } else if (inquiryType === 'projekt_check') {
    typeBadge = '📋 Bad-Projektcheck';
    dynamicTitle = 'Ihre Bad-Projektcheck Zusammenfassung';
    dynamicSubtitle = 'Ihre Vorgaben für die Badmodernisierung';
  }

  const specRows = extractCustomerSpecRows(payload, referenceId);
  const tableRowsHtml = specRows.map((row, idx) => renderSpecRow(row.label, row.value, idx % 2 === 0)).join('');

  // Anti-Spam / Anti-Reflection: Clean notes from external links
  const safeNotes = notes ? escapeHtml(stripUrls(notes)).replace(/\n/g, '<br>') : '';

  // Polite German greeting with fallback
  const greeting = contact.name && contact.name.trim().length > 0
    ? `Guten Tag ${escapeHtml(contact.name)},`
    : 'Guten Tag,';

  const innerContent = `
    <!-- Top Brand Accent Bar -->
    <div style="background-color:#ea580c;height:6px;width:100%;font-size:0;line-height:0;">&nbsp;</div>

    <!-- Header -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#0f172a;color:#ffffff;">
      <tr>
        <td style="padding:28px 24px;">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;">
                <span style="display:inline-block;background-color:rgba(234,88,12,0.25);border:1px solid rgba(234,88,12,0.4);color:#fed7aa;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;padding:3px 9px;border-radius:4px;margin-bottom:8px;">
                  ${escapeHtml(typeBadge)}
                </span>
                <h1 style="margin:0;color:#ffffff;font-size:21px;font-weight:900;letter-spacing:-0.02em;line-height:1.25;">
                  Fliesenverlegung Tezgel
                </h1>
                <p style="margin:4px 0 0 0;color:#94a3b8;font-size:12.5px;">
                  Eingetragener HWK-Fachbetrieb &middot; Aßlar &amp; Wetzlar
                </p>
              </td>
              <td style="text-align:right;vertical-align:top;width:120px;">
                <div style="background-color:#1e293b;border:1px solid #334155;border-radius:6px;padding:6px 10px;text-align:right;">
                  <span style="display:block;font-size:9.5px;color:#94a3b8;font-weight:700;text-transform:uppercase;">Vorgangs-ID</span>
                  <span style="display:block;font-size:12px;color:#ffffff;font-weight:800;letter-spacing:0.03em;">${escapeHtml(referenceId)}</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Main Body Content -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
      <tr>
        <td style="padding:26px 24px;">

          <!-- Greeting -->
          <h2 style="margin:0 0 10px 0;font-size:18px;font-weight:800;color:#0f172a;">
            ${greeting}
          </h2>
          <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#334155;">
            ${escapeHtml(dynamicSubtitle)}. Ihre Anfrage ist erfolgreich bei unserem Fachbetrieb eingegangen und wurde unter der Vorgangsnummer <strong>${escapeHtml(referenceId)}</strong> registriert.
          </p>

          <!-- Specifications Table -->
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #cbd5e1;border-radius:10px;overflow:hidden;margin-bottom:22px;border-collapse:collapse;">
            <thead>
              <tr style="background-color:#f8fafc;border-bottom:1px solid #cbd5e1;">
                <th colspan="2" style="padding:10px 14px;font-size:12px;font-weight:800;color:#0f172a;text-align:left;text-transform:uppercase;letter-spacing:0.05em;">
                  Ihre erfassten Projektdaten:
                </th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>

          ${
            safeNotes
              ? `
          <!-- Notes Box (Sanitized, no active external links) -->
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#fff7ed;border-left:4px solid #ea580c;border-radius:0 8px 8px 0;margin-bottom:22px;">
            <tr>
              <td style="padding:12px 16px;">
                <span style="display:block;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#9a3412;margin-bottom:4px;">
                  Ihre Anmerkung an unser Team:
                </span>
                <p style="margin:0;font-size:13px;color:#7c2d12;line-height:1.55;word-break:break-word;">
                  ${safeNotes}
                </p>
              </td>
            </tr>
          </table>`
              : ''
          }

          <!-- Next Steps Box (Table-based for Outlook Classic) -->
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:24px;">
            <tr>
              <td style="padding:18px;">
                <h3 style="margin:0 0 14px 0;font-size:14px;font-weight:800;color:#0f172a;">
                  Wie geht es jetzt weiter?
                </h3>
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:26px;vertical-align:top;padding-bottom:10px;">
                      <div style="width:20px;height:20px;border-radius:50%;background-color:#ea580c;color:#ffffff;text-align:center;font-size:11px;font-weight:700;line-height:20px;">1</div>
                    </td>
                    <td style="padding-left:10px;padding-bottom:10px;font-size:13px;color:#334155;line-height:1.5;">
                      <strong style="color:#0f172a;">Persönliche Sichtung:</strong> Inhaber Deniz Tezgel prüft Ihre Angaben und den Material- bzw. Ausführungsaufwand.
                    </td>
                  </tr>
                  <tr>
                    <td style="width:26px;vertical-align:top;padding-bottom:10px;">
                      <div style="width:20px;height:20px;border-radius:50%;background-color:#ea580c;color:#ffffff;text-align:center;font-size:11px;font-weight:700;line-height:20px;">2</div>
                    </td>
                    <td style="padding-left:10px;padding-bottom:10px;font-size:13px;color:#334155;line-height:1.5;">
                      <strong style="color:#0f172a;">Telefonische Vorab-Klärung:</strong> Wir melden uns zeitnah bei Ihnen unter der angegebenen Rufnummer zur Abstimmung eines Termins.
                    </td>
                  </tr>
                  <tr>
                    <td style="width:26px;vertical-align:top;">
                      <div style="width:20px;height:20px;border-radius:50%;background-color:#ea580c;color:#ffffff;text-align:center;font-size:11px;font-weight:700;line-height:20px;">3</div>
                    </td>
                    <td style="padding-left:10px;font-size:13px;color:#334155;line-height:1.5;">
                      <strong style="color:#0f172a;">Kostenfreies Vor-Ort-Aufmaß:</strong> Pünktlicher Termin bei Ihnen vor Ort für millimetergenaues Aufmaß und Ihr verbindliches Festpreisangebot.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Direct Craftsman Card -->
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #fed7aa;background-color:#fffbeb;border-radius:10px;margin-bottom:24px;">
            <tr>
              <td style="padding:18px;">
                <span style="font-size:11px;font-weight:800;color:#c2410c;text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:3px;">
                  Ihr persönlicher Ansprechpartner
                </span>
                <strong style="font-size:15px;color:#0f172a;display:block;">
                  ${escapeHtml(COMPANY_DATA.owner.fullName)}
                </strong>
                <span style="font-size:12px;color:#64748b;display:block;margin-bottom:10px;">
                  ${escapeHtml(COMPANY_DATA.owner.title)}
                </span>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="font-size:12.5px;color:#334155;line-height:1.6;">
                  <tr>
                    <td style="padding:2px 0;">✉️ E-Mail:</td>
                    <td style="padding:2px 0 2px 8px;">
                      <a href="mailto:${escapeHtml(COMPANY_DATA.contact.email)}" style="color:#ea580c;font-weight:700;text-decoration:none;">${escapeHtml(COMPANY_DATA.contact.email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:2px 0;">📞 Telefon:</td>
                    <td style="padding:2px 0 2px 8px;">
                      <a href="tel:${escapeHtml(COMPANY_DATA.contact.phoneLink)}" style="color:#ea580c;font-weight:700;text-decoration:none;">${escapeHtml(COMPANY_DATA.contact.phone)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:2px 0;">💬 WhatsApp:</td>
                    <td style="padding:2px 0 2px 8px;">
                      <a href="${escapeHtml(COMPANY_DATA.contact.whatsappLink)}" style="color:#ea580c;font-weight:700;text-decoration:none;">${escapeHtml(COMPANY_DATA.contact.mobile)}</a>
                    </td>
                  </tr>
                </table>

                <div style="text-align:center;margin-top:16px;">
                  ${renderBulletproofButton({
                    href: COMPANY_DATA.contact.whatsappLink,
                    label: '💬 Per WhatsApp schreiben',
                    bgColor: '#16a34a',
                    width: 220
                  })}
                </div>
              </td>
            </tr>
          </table>

          <!-- Sign-off -->
          <p style="margin:0;font-size:13.5px;line-height:1.55;color:#334155;">
            Herzliche Grüße aus Aßlar,<br>
            <strong>${escapeHtml(COMPANY_DATA.owner.fullName)}</strong> &amp; das Team von Fliesenverlegung Tezgel
          </p>

        </td>
      </tr>
    </table>

    <!-- Legal Footer -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#0f172a;color:#94a3b8;border-top:1px solid #1e293b;">
      <tr>
        <td style="padding:22px 24px;font-size:11.5px;line-height:1.6;text-align:center;">
          <strong style="color:#ffffff;font-size:12.5px;">${escapeHtml(COMPANY_DATA.legalName)}</strong><br>
          ${escapeHtml(COMPANY_DATA.headquarters.street)} &middot; ${escapeHtml(COMPANY_DATA.headquarters.postalCode)} ${escapeHtml(COMPANY_DATA.headquarters.city)}<br>
          ${escapeHtml(COMPANY_DATA.authority.certification)} &middot; USt-IdNr.: ${escapeHtml(COMPANY_DATA.tax.ustId)}<br>
          E-Mail: <a href="mailto:${escapeHtml(COMPANY_DATA.contact.email)}" style="color:#fb923c;text-decoration:none;">${escapeHtml(COMPANY_DATA.contact.email)}</a> &middot; Web: <a href="https://www.tezgel.de" style="color:#fb923c;text-decoration:none;">www.tezgel.de</a>
          
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid #1e293b;font-size:10.5px;">
            <a href="https://www.tezgel.de/impressum" style="color:#94a3b8;text-decoration:underline;margin:0 5px;">Impressum</a> &middot;
            <a href="https://www.tezgel.de/datenschutz" style="color:#94a3b8;text-decoration:underline;margin:0 5px;">Datenschutz</a> &middot;
            <a href="https://www.tezgel.de/widerruf" style="color:#94a3b8;text-decoration:underline;margin:0 5px;">Widerrufsbelehrung</a>
          </div>
          <p style="margin:8px 0 0 0;font-size:10.5px;color:#64748b;">
            Eingegangen am ${escapeHtml(timestamp)} &middot; &copy; ${currentYear} ${escapeHtml(COMPANY_DATA.legalName)}. Alle Rechte vorbehalten.
          </p>
        </td>
      </tr>
    </table>
  `;

  return `<!DOCTYPE html>
<html lang="de" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeHtml(dynamicTitle)}</title>
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
 * Generates structured Plain-Text companion for the customer confirmation email.
 */
export function generateCustomerEmailText(payload: InquiryPayload, referenceId: string): string {
  const { contact, notes } = payload;
  const currentYear = new Date().getFullYear();
  const timestamp = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(new Date());

  const specRows = extractCustomerSpecRows(payload, referenceId);
  const specText = specRows.map((r) => `* ${r.label}: ${r.value}`).join('\n');

  const greeting = contact.name && contact.name.trim().length > 0
    ? `Guten Tag ${contact.name},`
    : 'Guten Tag,';

  return `===========================================================
FLIESENVERLEGUNG TEZGEL - EINGANGSBESTÄTIGUNG
Vorgangsnummer: ${referenceId}
===========================================================

${greeting}

Vielen Dank für Ihre Anfrage bei Fliesenverlegung Tezgel.
Ihre Angaben sind erfolgreich bei uns eingegangen und wurden unter der Vorgangsnummer ${referenceId} registriert.

IHRE ERFASSTEN PROJEKTDETAILS:
${specText}

${notes ? `IHRE ANMERKUNG AN UNSER TEAM:\n${stripUrls(notes)}\n` : ''}
WIE GEHT ES JETZT WEITER?
1. Persönliche Sichtung: Inhaber Deniz Tezgel prüft Ihre Angaben und den Leistungsumfang.
2. Telefonische Vorab-Klärung: Wir melden uns zeitnah bei Ihnen zur Abstimmung eines Termins.
3. Kostenfreies Vor-Ort-Aufmaß: Pünktlicher Termin bei Ihnen vor Ort für millimetergenaues Aufmaß und Ihr verbindliches Festpreisangebot.

DIREKTER KONTAKT:
Fliesenverlegung Tezgel
Inhaber: Deniz Tezgel
Telefon:  ${COMPANY_DATA.contact.phone}
WhatsApp: ${COMPANY_DATA.contact.mobile}
E-Mail:   ${COMPANY_DATA.contact.email}
Web:      https://www.tezgel.de

RECHTLICHE ANGABEN:
${COMPANY_DATA.legalName}
${COMPANY_DATA.headquarters.street}, ${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}
${COMPANY_DATA.authority.certification}
USt-IdNr.: ${COMPANY_DATA.tax.ustId}

Eingegangen am: ${timestamp}
(c) ${currentYear} ${COMPANY_DATA.legalName}. Alle Rechte vorbehalten.
`;
}

/**
 * Generates the standardized subject line for the customer confirmation email.
 */
export function getCustomerEmailSubject(payload: InquiryPayload, referenceId: string): string {
  const ref = sanitizeHeaderValue(referenceId);
  if (payload.inquiryType === 'termin') {
    return `Ihre Terminanfrage für Vor-Ort-Aufmaß (Vorgang ${ref}) – Fliesenverlegung Tezgel`;
  } else if (payload.inquiryType === 'bad') {
    return `Ihre Badsanierungs-Anfrage (Vorgang ${ref}) – Fliesenverlegung Tezgel`;
  } else if (payload.inquiryType === 'fliesen') {
    return `Ihre Fliesen-Konfiguration (Vorgang ${ref}) – Fliesenverlegung Tezgel`;
  } else if (payload.inquiryType === 'projekt_check') {
    return `Ihre Bad-Projektcheck Zusammenfassung (Vorgang ${ref}) – Fliesenverlegung Tezgel`;
  }
  return `Ihre Anfrage bei Fliesenverlegung Tezgel (Vorgang ${ref})`;
}
