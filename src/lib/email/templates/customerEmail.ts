import { InquiryPayload } from '../types';
import { COMPANY_DATA } from '@/config/company';

/**
 * Generates an individualized, high-end responsive HTML confirmation email for the customer.
 */
export function generateCustomerEmailHtml(payload: InquiryPayload, referenceId: string): string {
  const { inquiryType, projectTitle, contact, notes, badDetails, fliesenDetails, terminDetails, projektCheckDetails, timing, area } = payload;

  const currentYear = new Date().getFullYear();
  const timestamp = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  }).format(new Date());

  // 1. Dynamic Subject & Type-specific titles
  let typeBadge = 'Fachbetriebs-Anfrage';
  let dynamicTitle = 'Ihre Anfrage bei Fliesenverlegung Tezgel';
  let dynamicSubtitle = 'Vielen Dank für Ihr Vertrauen in unser Handwerk';

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

  // 2. Build Structured Specifications Table Rows
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
    // General Express
    if (area) specRows.push({ label: 'Geschätzte Fläche', value: area });
    if (timing) specRows.push({ label: 'Gewünschter Zeitraum', value: timing });
  }

  // 3. Contextual Next Steps
  let nextStepsHtml = '';
  if (inquiryType === 'termin') {
    nextStepsHtml = `
      <div style="margin-bottom: 12px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">1</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Terminabgleich im Kalender:</strong> Inhaber Deniz Tezgel prüft den gewünschten Termin für das Vor-Ort-Aufmaß.
        </div>
      </div>
      <div style="margin-bottom: 12px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">2</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Verbindliche Rückmeldung:</strong> Wir bestätigen Ihnen das Zeitfenster telefonisch oder schlagen bei Überschneidungen eine Alternative vor.
        </div>
      </div>
      <div style="margin-bottom: 4px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">3</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Kostenfreies Vor-Ort-Aufmaß:</strong> Pünktlicher Termin bei Ihnen vor Ort für millimetergenaues Aufmaß und Ihr Festpreisangebot.
        </div>
      </div>
    `;
  } else if (inquiryType === 'bad') {
    nextStepsHtml = `
      <div style="margin-bottom: 12px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">1</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Fachliche Bedarfsanalyse:</strong> Prüfung Ihrer Raummaße, Sanitäranordnung und Verbundabdichtung (DIN 18534).
        </div>
      </div>
      <div style="margin-bottom: 12px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">2</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Persönlicher Vor-Ort-Check:</strong> Wir vereinbaren einen Termin für Untergrundprüfung und exaktes Aufmaß.
        </div>
      </div>
      <div style="margin-bottom: 4px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">3</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Verbindliches Festpreisangebot:</strong> Transparenter Kostenvoranschlag aller Positionen – garantiert ohne versteckte Nachforderungen.
        </div>
      </div>
    `;
  } else {
    nextStepsHtml = `
      <div style="margin-bottom: 12px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">1</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Persönliche Durchsicht:</strong> Inhaber Deniz Tezgel sichtet Ihre Angaben und prüft Materialbedarf und Machbarkeit.
        </div>
      </div>
      <div style="margin-bottom: 12px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">2</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Kontaktaufnahme:</strong> Wir melden uns in der Regel binnen 24–48 Stunden telefonisch bei Ihnen zur kurzen Vorab-Klärung.
        </div>
      </div>
      <div style="margin-bottom: 4px; display: table; width: 100%;">
        <div style="display: table-cell; width: 28px; vertical-align: top;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ea580c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; line-height: 22px;">3</div>
        </div>
        <div style="display: table-cell; vertical-align: top; padding-left: 10px; font-size: 13.5px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">Kostenfreies Vor-Ort-Aufmaß:</strong> Unverbindliche Begutachtung vor Ort für Ihr individuelles Festpreisangebot.
        </div>
      </div>
    `;
  }

  // 4. Clean Table Rows Markup
  const tableRowsHtml = specRows
    .map(
      (row, idx) => `
      <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #64748b; width: 160px; border-bottom: 1px solid #e2e8f0;">
          ${row.label}:
        </td>
        <td style="padding: 10px 14px; font-size: 13.5px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
          ${row.value}
        </td>
      </tr>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${dynamicTitle}</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
    
    <!-- Top Brand Accent -->
    <div style="background-color: #ea580c; height: 6px; width: 100%;"></div>

    <!-- Header -->
    <div style="background-color: #0f172a; padding: 32px 28px 28px 28px; text-align: left;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <span style="display: inline-block; background-color: rgba(234, 88, 12, 0.2); border: 1px solid rgba(234, 88, 12, 0.4); color: #fb923c; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 10px; border-radius: 6px; margin-bottom: 8px;">
              ${typeBadge}
            </span>
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 900; letter-spacing: -0.02em;">
              Fliesenverlegung Tezgel
            </h1>
            <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">
              Eingetragener HWK-Fachbetrieb &middot; Aßlar &amp; Wetzlar
            </p>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 6px 12px; display: inline-block; text-align: right;">
              <span style="display: block; font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Vorgangs-ID</span>
              <span style="display: block; font-size: 13px; color: #ffffff; font-weight: 800; letter-spacing: 0.03em;">${referenceId}</span>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Body Content -->
    <div style="padding: 30px 28px;">
      
      <!-- Greeting -->
      <h2 style="margin: 0 0 10px 0; font-size: 19px; font-weight: 800; color: #0f172a;">
        Guten Tag ${contact.name},
      </h2>
      <p style="margin: 0 0 20px 0; font-size: 14.5px; line-height: 1.6; color: #475569;">
        ${dynamicSubtitle}. Ihre Angaben sind erfolgreich bei uns eingegangen und wurden unter der Vorgangsnummer <strong>${referenceId}</strong> registriert.
      </p>

      <!-- Specifications Card -->
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
        <div style="background-color: #f8fafc; padding: 12px 16px; border-bottom: 1px solid #cbd5e1;">
          <strong style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">
            Ihre erfassten Projektdetails:
          </strong>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>

      ${
        notes
          ? `
      <!-- Customer Notes Box -->
      <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; border-radius: 0 10px 10px 0; padding: 14px 16px; margin-bottom: 24px;">
        <span style="display: block; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #9a3412; margin-bottom: 4px;">
          Ihre Anmerkung an unser Team:
        </span>
        <p style="margin: 0; font-size: 13.5px; color: #7c2d12; line-height: 1.5;">
          ${notes.replace(/\n/g, '<br>')}
        </p>
      </div>`
          : ''
      }

      <!-- Next Steps Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 18px; margin-bottom: 26px;">
        <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px;">
          Wie geht es jetzt weiter?
        </h3>
        ${nextStepsHtml}
      </div>

      <!-- Craftsman Card & Direct Contact -->
      <div style="border: 1px solid #fed7aa; background: linear-gradient(180deg, #fffbeb 0%, #fff7ed 100%); border-radius: 14px; padding: 22px 20px; text-align: left; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: top;">
              <span style="font-size: 11px; font-weight: 800; color: #c2410c; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 4px;">
                Ihr persönlicher Ansprechpartner
              </span>
              <strong style="font-size: 16px; color: #0f172a; display: block;">
                ${COMPANY_DATA.owner.fullName}
              </strong>
              <span style="font-size: 12.5px; color: #64748b; display: block; margin-bottom: 12px;">
                ${COMPANY_DATA.owner.title}
              </span>
              <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5;">
                📞 Telefon: <a href="tel:${COMPANY_DATA.contact.phoneLink}" style="color: #ea580c; font-weight: 700; text-decoration: none;">${COMPANY_DATA.contact.phone}</a><br>
                💬 WhatsApp / Mobil: <a href="${COMPANY_DATA.contact.whatsappLink}" style="color: #ea580c; font-weight: 700; text-decoration: none;">${COMPANY_DATA.contact.mobile}</a>
              </p>
            </td>
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 18px;">
          <a href="${COMPANY_DATA.contact.whatsappLink}" style="display: inline-block; background-color: #16a34a; color: #ffffff !important; font-weight: 700; font-size: 13.5px; padding: 11px 22px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);">
            💬 Direkt per WhatsApp schreiben
          </a>
        </div>
      </div>

      <!-- Closing -->
      <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #334155;">
        Herzliche Grüße aus Aßlar,<br>
        <strong>${COMPANY_DATA.owner.fullName}</strong> &amp; das Team von Fliesenverlegung Tezgel
      </p>

    </div>

    <!-- Legal Footer -->
    <div style="background-color: #0f172a; color: #94a3b8; padding: 24px 28px; font-size: 12px; line-height: 1.6; border-top: 1px solid #1e293b; text-align: center;">
      <strong style="color: #ffffff; font-size: 13px;">${COMPANY_DATA.legalName}</strong><br>
      ${COMPANY_DATA.headquarters.street} &middot; ${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}<br>
      ${COMPANY_DATA.authority.certification} &middot; USt-IdNr.: ${COMPANY_DATA.tax.ustId}<br>
      E-Mail: <a href="mailto:${COMPANY_DATA.contact.email}" style="color: #fb923c; text-decoration: none;">${COMPANY_DATA.contact.email}</a> &middot; Web: <a href="https://tezgel.de" style="color: #fb923c; text-decoration: none;">www.tezgel.de</a>
      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #1e293b; font-size: 11px;">
        <a href="https://tezgel.de/impressum" style="color: #94a3b8; text-decoration: underline; margin: 0 6px;">Impressum</a> &middot; 
        <a href="https://tezgel.de/datenschutz" style="color: #94a3b8; text-decoration: underline; margin: 0 6px;">Datenschutz</a> &middot; 
        <a href="https://tezgel.de/widerruf" style="color: #94a3b8; text-decoration: underline; margin: 0 6px;">Widerrufsbelehrung</a>
      </div>
      <p style="margin: 10px 0 0 0; font-size: 11px; color: #64748b;">
        Eingegangen am ${timestamp} &middot; &copy; ${currentYear} ${COMPANY_DATA.legalName}. Alle Rechte vorbehalten.
      </p>
    </div>

  </div>
</body>
</html>`;
}
