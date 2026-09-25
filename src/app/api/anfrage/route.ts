import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { COMPANY_DATA } from '@/config/company';

interface InquiryPayload {
  projectType: string;
  projectTitle: string;
  area: string;
  timing: string;
  location: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryPayload = await request.json();

    // Spam honeypot detection: bots fill hidden fields
    if (body.honeypot && body.honeypot.trim().length > 0) {
      // Silently return success to confuse spam bots
      return NextResponse.json({ success: true, message: 'Anfrage erhalten.' }, { status: 200 });
    }

    // Required fields validation
    if (!body.name || !body.phone || !body.projectType) {
      return NextResponse.json(
        { success: false, error: 'Bitte füllen Sie mindestens Name, Telefonnummer und Projektart aus.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@tezgel.de';
    const fromSender = process.env.RESEND_FROM_EMAIL || 'Fliesenverlegung Tezgel <anfrage@tezgel.de>';

    // Format current timestamp
    const timestamp = new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/Berlin'
    }).format(new Date());

    const projectTitle = body.projectTitle || body.projectType;
    const area = body.area || 'Nicht angegeben';
    const timing = body.timing || 'Flexibel';
    const location = body.location || 'Aßlar / Wetzlar / Hessen';

    // HTML Email for Meisterbetrieb Tezgel
    const teamNotificationHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Neue Anfrage: ${projectTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15,23,42,0.06); }
    .header { background: linear-gradient(135deg, #047857 0%, #064e3b 100%); color: #ffffff; padding: 28px 24px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #a7f3d0; }
    .content { padding: 28px 24px; }
    .highlight-card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
    .field-row { display: flex; border-bottom: 1px solid #f1f5f9; padding: 10px 0; font-size: 14px; }
    .field-label { width: 140px; color: #64748b; font-weight: 600; shrink-0; }
    .field-value { color: #0f172a; font-weight: 700; flex: 1; }
    .notes-box { background: #f8fafc; border-left: 4px solid #047857; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-top: 16px; font-size: 14px; line-height: 1.5; color: #334155; }
    .cta-btn { display: inline-block; background: #047857; color: #ffffff !important; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 20px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Neue Anfrage über die Website</h1>
      <p>Eingegangen am ${timestamp}</p>
    </div>
    <div class="content">
      <div class="highlight-card">
        <strong style="color: #065f46; font-size: 15px;">Kundenkontakt: ${body.name}</strong><br>
        <span style="font-size: 14px; color: #047857;">📞 <a href="tel:${body.phone}" style="color: #047857; text-decoration: underline;">${body.phone}</a></span>
        ${body.email ? `<br><span style="font-size: 14px; color: #047857;">✉️ <a href="mailto:${body.email}" style="color: #047857; text-decoration: underline;">${body.email}</a></span>` : ''}
      </div>

      <div class="field-row">
        <div class="field-label">Projekt:</div>
        <div class="field-value">${projectTitle}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Fläche / Umfang:</div>
        <div class="field-value">${area}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Einsatzort:</div>
        <div class="field-value">${location}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Zeitraum:</div>
        <div class="field-value">${timing}</div>
      </div>

      ${body.notes ? `
      <div style="margin-top: 18px;">
        <span style="font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Anmerkungen des Kunden:</span>
        <div class="notes-box">${body.notes.replace(/\n/g, '<br>')}</div>
      </div>` : ''}

      <div style="text-align: center; margin-top: 24px;">
        <a href="tel:${body.phone}" class="cta-btn">Kunde direkt anrufen</a>
      </div>
    </div>
    <div class="footer">
      Fliesenverlegung Tezgel &middot; Meisterbetrieb &middot; Aßlar / Wetzlar
    </div>
  </div>
</body>
</html>
    `;

    // Customer confirmation HTML
    const customerConfirmationHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Ihre Anfrage bei Fliesenverlegung Tezgel</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15,23,42,0.06); }
    .header { background: linear-gradient(135deg, #047857 0%, #064e3b 100%); color: #ffffff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 8px 0 0 0; font-size: 14px; color: #a7f3d0; }
    .content { padding: 28px 24px; line-height: 1.6; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
    .step-item { display: flex; gap: 12px; margin-bottom: 12px; }
    .step-number { width: 24px; height: 24px; border-radius: 50%; background: #047857; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; shrink-0; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; font-size: 13px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Vielen Dank für Ihre Anfrage!</h1>
      <p>Fliesenverlegung Tezgel &middot; Meisterbetrieb Aßlar</p>
    </div>
    <div class="content">
      <p>Guten Tag <strong>${body.name}</strong>,</p>
      <p>vielen Dank für Ihr Vertrauen in unser Handwerk. Ihre Anfrage für Ihr Vorhaben <strong>${projectTitle}</strong> ist erfolgreich bei uns eingegangen.</p>
      
      <div class="summary-card">
        <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 15px; color: #047857;">Ihre Projektangaben:</h3>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Projekt:</strong> ${projectTitle}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Geschätzte Fläche:</strong> ${area}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Ort:</strong> ${location}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Gewünschter Zeitraum:</strong> ${timing}</p>
      </div>

      <h3 style="font-size: 16px; color: #0f172a; margin-top: 24px;">Wie geht es jetzt weiter?</h3>
      <div class="step-item">
        <div class="step-number">1</div>
        <div style="font-size: 14px;"><strong>Persönliche Durchsicht:</strong> Fliesenlegermeister Deniz Tezgel prüft Ihre Anforderungen.</div>
      </div>
      <div class="step-item">
        <div class="step-number">2</div>
        <div style="font-size: 14px;"><strong>Kontaktaufnahme:</strong> Wir melden uns in der Regel innerhalb von 24–48 Stunden telefonisch oder per E-Mail bei Ihnen.</div>
      </div>
      <div class="step-item">
        <div class="step-number">3</div>
        <div style="font-size: 14px;"><strong>Kostenfreies Aufmaß:</strong> Wir vereinbaren einen unverbindlichen Vor-Ort-Termin für ein präzises Festpreisangebot.</div>
      </div>

      <p style="margin-top: 24px; font-size: 14px;">
        Haben Sie dringende Fragen oder möchten Sie direkt Fotos Ihrer Räumlichkeiten senden? Sie erreichen uns jederzeit auch per WhatsApp oder Telefon unter:
        <br>
        <strong>Telefon / WhatsApp:</strong> <a href="tel:${COMPANY_DATA.contact.phoneLink}" style="color: #047857;">${COMPANY_DATA.contact.phone}</a>
      </p>

      <p style="margin-top: 28px; font-size: 14px;">
        Herzliche Grüße aus Aßlar,<br>
        <strong>Deniz Tezgel</strong><br>
        <span style="color: #64748b; font-size: 13px;">Inhaber &amp; Fliesenlegermeister</span>
      </p>
    </div>
    <div class="footer">
      <strong>Fliesenverlegung Tezgel</strong> &middot; ${COMPANY_DATA.headquarters.street}, ${COMPANY_DATA.headquarters.postalCode} ${COMPANY_DATA.headquarters.city}<br>
      E-Mail: ${COMPANY_DATA.contact.email} &middot; Web: <a href="https://tezgel.de" style="color: #047857;">www.tezgel.de</a>
    </div>
  </div>
</body>
</html>
    `;

    if (!resendApiKey) {
      console.warn('[Resend API] No RESEND_API_KEY configured. Mocking email delivery.');
      return NextResponse.json({
        success: true,
        mocked: true,
        message: 'Anfrage erfolgreich aufgenommen (Entwicklungsmodus ohne Resend-Key).'
      });
    }

    const resend = new Resend(resendApiKey);

    // 1. Send lead notification to craftsman team
    await resend.emails.send({
      from: fromSender,
      to: recipientEmail,
      replyTo: body.email || undefined,
      subject: `[Neue Anfrage] ${projectTitle} - ${body.name} (${location})`,
      html: teamNotificationHtml
    });

    // 2. If customer entered an email, send them an instant confirmation
    if (body.email && body.email.includes('@')) {
      try {
        await resend.emails.send({
          from: fromSender,
          to: body.email,
          subject: `Ihre Anfrage bei Fliesenverlegung Tezgel – Meisterbetrieb Aßlar`,
          html: customerConfirmationHtml
        });
      } catch (custError) {
        console.error('[Resend API] Error sending customer confirmation email:', custError);
        // Non-blocking error: team already received the lead
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich an Fliesenverlegung Tezgel übermittelt.'
    });
  } catch (error) {
    console.error('[API /api/anfrage error]:', error);
    return NextResponse.json(
      { success: false, error: 'Die Anfrage konnte leider nicht übertragen werden. Bitte versuchen Sie es telefonisch oder per WhatsApp.' },
      { status: 500 }
    );
  }
}
