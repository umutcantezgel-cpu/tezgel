import { NextRequest, NextResponse } from 'next/server';
import {
  sendInquiryEmails,
  InquiryPayload,
  InquiryType,
  validateInquiryPayload,
  checkIpRateLimit,
  getClientIp,
  checkFastBot,
  isHoneypotTriggered
} from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // 1. Client IP & Rate Limiting Check (max 5 requests per 10 minutes per IP)
    const clientIp = getClientIp(request.headers);
    const ipCheck = checkIpRateLimit(clientIp, 5, 600_000);

    if (!ipCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Zu viele Anfragen von diesem Anschluss. Bitte versuchen Sie es in wenigen Minuten erneut oder rufen Sie uns direkt an.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(ipCheck.retryAfterSec || 60)
          }
        }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Ungültiges Datenformat (JSON erwartet).' },
        { status: 400 }
      );
    }

    if (typeof rawBody !== 'object' || rawBody === null) {
      return NextResponse.json(
        { success: false, error: 'Fehlerhafte Anfrage.' },
        { status: 400 }
      );
    }

    const body = rawBody as Record<string, unknown>;

    // 2. Multi-stage Bot Detection: Honeypot field
    const honeypot = body.honeypot ?? (body.contact as Record<string, unknown> | undefined)?.honeypot;
    if (isHoneypotTriggered(honeypot)) {
      // Silently return success to confuse automated scrapers/spammers
      return NextResponse.json(
        { success: true, referenceId: 'TEZ-SPAM-IGN', message: 'Anfrage erhalten.' },
        { status: 200 }
      );
    }

    // 3. Multi-stage Bot Detection: Fast-bot timing barrier (<1500ms)
    const botCheck = checkFastBot(body._t as number | string | undefined, 1500);
    if (botCheck.isBot) {
      return NextResponse.json(
        { success: true, referenceId: 'TEZ-BOT-IGN', message: 'Anfrage erhalten.' },
        { status: 200 }
      );
    }

    // 4. Server-side Schema Validation with Zod
    const validation = validateInquiryPayload(body);
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || 'Bitte prüfen Sie Ihre Eingaben.',
          fieldErrors: validation.fieldErrors
        },
        { status: 400 }
      );
    }

    const validData = validation.data;

    // 5. Determine Inquiry Type with priority
    let inquiryType: InquiryType = validData.inquiryType || 'general';
    if (validData.inquiryType && ['general', 'bad', 'fliesen', 'termin', 'projekt_check'].includes(validData.inquiryType)) {
      inquiryType = validData.inquiryType;
    } else if (validData.projectType === 'bad' && validData.badDetails) {
      inquiryType = 'bad';
    } else if (validData.projectType === 'fliesen' && validData.fliesenDetails) {
      inquiryType = 'fliesen';
    } else if (validData.terminDetails) {
      inquiryType = 'termin';
    }

    // 6. Normalize Project Title
    const projectTitle =
      validData.projectTitle ||
      (inquiryType === 'termin'
        ? `Termin: ${validData.terminDetails?.topicLabel || 'Vor-Ort-Aufmaß'}`
        : inquiryType === 'bad'
        ? 'Badsanierung & Komplettbad'
        : inquiryType === 'fliesen'
        ? 'Fliesen-Konfiguration'
        : inquiryType === 'projekt_check'
        ? 'Bad-Projektcheck'
        : validData.projectType || 'Projektanfrage');

    // 7. Assemble unified, sanitized InquiryPayload
    const payload: InquiryPayload = {
      inquiryType,
      projectTitle,
      projectType: validData.projectType,
      contact: {
        name: validData.contact.name,
        phone: validData.contact.phone,
        email: validData.contact.email || undefined,
        location: validData.contact.location || validData.contact.zipCity || 'Aßlar / Wetzlar / Hessen',
        zipCity: validData.contact.zipCity || validData.contact.location || undefined,
        street: validData.contact.street || undefined
      },
      timing: validData.timing || undefined,
      area: validData.area || undefined,
      notes: validData.notes || undefined,
      badDetails: validData.badDetails,
      fliesenDetails: validData.fliesenDetails,
      terminDetails: validData.terminDetails,
      projektCheckDetails: validData.projektCheckDetails
    };

    // 8. Dispatch emails via central mailer (with retry, backoff and fail-safe logging)
    const result = await sendInquiryEmails(payload);

    return NextResponse.json({
      success: true,
      referenceId: result.referenceId,
      message: result.message
    });
  } catch (error) {
    console.error('[API /api/anfrage error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Die Anfrage konnte derzeit nicht übertragen werden. Bitte kontaktieren Sie uns direkt telefonisch (06441 / 44 83 567) oder per WhatsApp.'
      },
      { status: 500 }
    );
  }
}
