import { SITE_CONFIG } from '@/shared/config/site';

/**
 * Renders quick client confirmation email via Resend
 */
export function renderClientConfirmationEmail(lead: {
  name: string;
  referenceId?: string;
}): { subject: string; html: string } {
  const subject = `Vielen Dank für Ihre Anfrage – ${SITE_CONFIG.companyName}`;

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;margin:0;padding:24px;color:#1e293b;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(135deg,#ea580c,#c2410c);padding:28px 24px;color:#ffffff;text-align:center;">
      <h1 style="margin:0;font-size:22px;font-weight:800;">Fliesenverlegung Tezgel</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.95;">Ihr Fachbetrieb für Bäder &amp; Großformatfliesen in Mittelhessen</p>
    </div>

    <div style="padding:28px 24px;line-height:1.6;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#0f172a;">Guten Tag ${lead.name},</h2>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;">
        vielen Dank für Ihre Kontaktaufnahme über unsere Website. Wir haben Ihre Projektdaten erfolgreich erhalten.
      </p>

      ${lead.referenceId ? `
      <div style="margin:16px 0;padding:12px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;font-size:13px;color:#9a3412;">
        Ihre Vorgangsnummer: <strong>${lead.referenceId}</strong>
      </div>` : ''}

      <p style="margin:0 0 16px;color:#475569;font-size:14px;">
        Inhaber Deniz Tezgel prüft Ihre Anfrage persönlich und meldet sich innerhalb von <strong>24 Stunden</strong> telefonisch bei Ihnen, um die Details zu besprechen und auf Wunsch einen kostenfreien Vor-Ort-Termin für das Aufmaß zu vereinbaren.
      </p>

      <div style="margin:24px 0;padding:16px;background:#f8fafc;border-left:4px solid #ea580c;border-radius:6px;">
        <p style="margin:0;color:#1e293b;font-size:13px;">
          <strong>Dringende Frage oder eiliges Anliegen?</strong><br>
          Sie erreichen uns jederzeit direkt unter <a href="tel:${SITE_CONFIG.contact.telephone}" style="color:#ea580c;font-weight:700;text-decoration:none;">${SITE_CONFIG.contact.telephoneFormatted}</a> oder per WhatsApp unter <a href="${SITE_CONFIG.contact.whatsappLink}" style="color:#16a34a;font-weight:700;text-decoration:none;">${SITE_CONFIG.contact.mobileFormatted}</a>.
        </p>
      </div>

      <p style="margin:24px 0 0;color:#475569;font-size:14px;">
        Mit freundlichen Grüßen aus Aßlar,<br>
        <strong>${SITE_CONFIG.founder.name}</strong><br>
        <span style="font-size:12px;color:#64748b;">${SITE_CONFIG.founder.jobTitle} &bull; ${SITE_CONFIG.companyName}</span>
      </p>
    </div>

    <div style="padding:16px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:11px;color:#64748b;text-align:center;line-height:1.5;">
      ${SITE_CONFIG.companyName} &bull; ${SITE_CONFIG.headquarters.streetAddress}, ${SITE_CONFIG.headquarters.postalCode} ${SITE_CONFIG.headquarters.addressLocality}<br>
      Eingetragener Fachbetrieb der ${SITE_CONFIG.authority.name}
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}
