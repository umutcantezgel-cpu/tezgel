import { SITE_CONFIG } from '@/shared/config/site';

/**
 * Renders quick lead notification email for internal team alerting via Resend
 */
export function renderLeadNotificationEmail(lead: {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  source?: string;
  submittedAt?: string;
  referenceId?: string;
}): { subject: string; html: string } {
  const subject = `🔥 Neuer Lead eingegangen: ${lead.name} (${lead.source || 'Website'})`;
  const time = lead.submittedAt || new Date().toLocaleString('de-DE');

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;margin:0;padding:24px;color:#1e293b;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(135deg,#ea580c,#c2410c);padding:24px;color:#ffffff;">
      <h1 style="margin:0;font-size:20px;font-weight:800;">Neuer Lead eingegangen</h1>
      <p style="margin:4px 0 0;font-size:13px;opacity:0.9;">Eingetroffen über ${lead.source || 'Website-Schnellformular'} am ${time}</p>
    </div>

    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${lead.referenceId ? `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;font-weight:600;color:#64748b;width:140px;">Vorgang:</td><td style="padding:10px 0;font-family:monospace;font-weight:bold;color:#ea580c;">${lead.referenceId}</td></tr>` : ''}
        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;font-weight:600;color:#64748b;width:140px;">Kunde:</td><td style="padding:10px 0;font-weight:700;color:#0f172a;">${lead.name}</td></tr>
        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;font-weight:600;color:#64748b;">Telefon:</td><td style="padding:10px 0;"><a href="tel:${lead.phone}" style="color:#ea580c;font-weight:700;text-decoration:none;">${lead.phone}</a></td></tr>
        ${lead.email ? `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;font-weight:600;color:#64748b;">E-Mail:</td><td style="padding:10px 0;"><a href="mailto:${lead.email}" style="color:#ea580c;text-decoration:none;">${lead.email}</a></td></tr>` : ''}
        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;font-weight:600;color:#64748b;">Kanal:</td><td style="padding:10px 0;color:#64748b;"><code>${lead.source || 'Website'}</code></td></tr>
      </table>

      ${lead.message ? `
      <div style="margin-top:20px;padding:16px;background:#fff7ed;border-left:4px solid #ea580c;border-radius:8px;">
        <div style="font-weight:700;font-size:12px;text-transform:uppercase;color:#9a3412;margin-bottom:6px;">Nachricht / Projekt:</div>
        <div style="white-space:pre-wrap;font-size:14px;color:#1e293b;">${lead.message}</div>
      </div>` : ''}

      <div style="margin-top:24px;text-align:center;">
        <a href="tel:${lead.phone}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;">Kunden direkt anrufen</a>
      </div>
    </div>

    <div style="padding:16px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
      ${SITE_CONFIG.companyName} &bull; ${SITE_CONFIG.headquarters.streetAddress}, ${SITE_CONFIG.headquarters.postalCode} ${SITE_CONFIG.headquarters.addressLocality}
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}
