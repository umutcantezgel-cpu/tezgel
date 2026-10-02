import { NextRequest, NextResponse } from 'next/server';
import { sendInquiryEmails, InquiryPayload, InquiryType } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Spam honeypot detection: bots fill hidden fields
    const honeypot = body.honeypot || body.contact?.honeypot;
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
      // Silently return success to confuse spam bots
      return NextResponse.json(
        { success: true, referenceId: 'TEZ-SPAM-IGN', message: 'Anfrage erhalten.' },
        { status: 200 }
      );
    }

    // Normalize contact data (supports both nested `contact` and legacy flat fields)
    const name = (body.contact?.name || body.name || '').trim();
    const phone = (body.contact?.phone || body.phone || '').trim();
    const email = (body.contact?.email || body.email || '').trim();
    const location = (body.contact?.zipCity || body.contact?.location || body.location || body.zipCity || '').trim();
    const street = (body.contact?.street || body.street || '').trim();

    // Required fields validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Bitte füllen Sie mindestens Ihren Namen und Ihre Telefonnummer aus.' },
        { status: 400 }
      );
    }

    // Determine Inquiry Type
    let inquiryType: InquiryType = 'general';
    if (body.inquiryType && ['general', 'bad', 'fliesen', 'termin', 'projekt_check'].includes(body.inquiryType)) {
      inquiryType = body.inquiryType as InquiryType;
    } else if (body.projectType === 'bad' && body.badDetails) {
      inquiryType = 'bad';
    } else if (body.projectType === 'fliesen' && body.fliesenDetails) {
      inquiryType = 'fliesen';
    } else if (body.topic || body.terminDetails) {
      inquiryType = 'termin';
    }

    // Normalize Project Title
    const projectTitle =
      body.projectTitle ||
      (inquiryType === 'termin'
        ? `Termin: ${body.terminDetails?.topicLabel || body.topic || 'Vor-Ort-Aufmaß'}`
        : inquiryType === 'bad'
        ? 'Badsanierung & Komplettbad'
        : inquiryType === 'fliesen'
        ? 'Fliesen-Konfiguration'
        : inquiryType === 'projekt_check'
        ? 'Bad-Projektcheck'
        : body.projectType || 'Projektanfrage');

    // Assemble unified InquiryPayload
    const payload: InquiryPayload = {
      inquiryType,
      projectTitle,
      contact: {
        name,
        phone,
        email: email || undefined,
        location: location || 'Aßlar / Wetzlar / Hessen',
        zipCity: location || undefined,
        street: street || undefined
      },
      timing: body.timing || undefined,
      area: body.area || undefined,
      notes: body.notes ? body.notes.trim() : undefined,
      honeypot: undefined,
      badDetails: body.badDetails,
      fliesenDetails: body.fliesenDetails,
      terminDetails: body.terminDetails,
      projektCheckDetails: body.projektCheckDetails
    };

    // Dispatch emails via central email mailer
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
        error: 'Die Anfrage konnte leider nicht übertragen werden. Bitte versuchen Sie es telefonisch oder per WhatsApp.'
      },
      { status: 500 }
    );
  }
}
