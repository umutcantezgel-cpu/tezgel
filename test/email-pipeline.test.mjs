import test from 'node:test';
import assert from 'node:assert/strict';

import {
  escapeHtml,
  sanitizeHeaderValue,
  stripUrls,
  checkIpRateLimit,
  checkRecipientRateLimit,
  checkFastBot,
  isHoneypotTriggered
} from '../src/lib/email/security.ts';

import {
  validateInquiryPayload,
  stripNewlines,
  normalizeMultiline
} from '../src/lib/email/validation.ts';

import {
  generateTeamEmailHtml,
  generateTeamEmailText,
  getTeamEmailSubject
} from '../src/lib/email/templates/teamEmail.ts';

import {
  generateCustomerEmailHtml,
  generateCustomerEmailText,
  getCustomerEmailSubject
} from '../src/lib/email/templates/customerEmail.ts';

import { sendInquiryEmails } from '../src/lib/email/mailer.ts';

test('1. Security: HTML Escaping prevents Injection', () => {
  const dangerous = '<script>alert("XSS")</script><img src="x" onerror="steal()">&"\'';
  const escaped = escapeHtml(dangerous);

  assert.equal(escaped.includes('<script>'), false);
  assert.equal(escaped.includes('alert("XSS")'), false);
  assert.equal(escaped.includes('&lt;script&gt;'), true);
  assert.equal(escaped.includes('&lt;img'), true);
  assert.equal(escaped.includes('&quot;'), true);
  assert.equal(escaped.includes('&#39;'), true);
});

test('2. Security: Header Sanitization strips CRLF', () => {
  const dirtyHeader = "Max Mustermann\r\nBcc: evil@attacker.com\r\nSubject: Spoofed";
  const clean = sanitizeHeaderValue(dirtyHeader);

  assert.equal(clean.includes('\r'), false);
  assert.equal(clean.includes('\n'), false);
  assert.equal(clean, "Max Mustermann  Bcc: evil@attacker.com  Subject: Spoofed");
});

test('3. Security: Anti-Reflection strips URLs from user notes', () => {
  const spamNote = "Besuchen Sie https://phishing-site.example/login oder www.scam.org!";
  const stripped = stripUrls(spamNote);

  assert.equal(stripped.includes('https://'), false);
  assert.equal(stripped.includes('www.'), false);
  assert.equal(stripped.includes('[Link entfernt]'), true);
});

test('4. Security: IP Sliding Window Rate Limiter', () => {
  const testIp = '192.168.1.100';
  // Allow 3 requests in test window
  const r1 = checkIpRateLimit(testIp, 3, 1000);
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 2);

  const r2 = checkIpRateLimit(testIp, 3, 1000);
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 1);

  const r3 = checkIpRateLimit(testIp, 3, 1000);
  assert.equal(r3.allowed, true);
  assert.equal(r3.remaining, 0);

  // 4th request must be rejected
  const r4 = checkIpRateLimit(testIp, 3, 1000);
  assert.equal(r4.allowed, false);
  assert.equal(r4.remaining, 0);
  assert.equal(typeof r4.retryAfterSec, 'number');
});

test('5. Security: Recipient Confirmation Rate Limiter', () => {
  const testEmail = 'victim@example.com';
  const r1 = checkRecipientRateLimit(testEmail, 2, 5000);
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 1);

  const r2 = checkRecipientRateLimit(testEmail, 2, 5000);
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 0);

  // 3rd attempt must be rejected to prevent email bombing
  const r3 = checkRecipientRateLimit(testEmail, 2, 5000);
  assert.equal(r3.allowed, false);
});

test('6. Security: Bot Timing & Honeypot Checks', () => {
  // Fast bot submitted within 300ms
  const now = Date.now();
  const botResult = checkFastBot(now - 300, 1500);
  assert.equal(botResult.isBot, true);

  // Human submitted after 3500ms
  const humanResult = checkFastBot(now - 3500, 1500);
  assert.equal(humanResult.isBot, false);

  // Honeypot detection
  assert.equal(isHoneypotTriggered('spambot'), true);
  assert.equal(isHoneypotTriggered('  '), false);
  assert.equal(isHoneypotTriggered(''), false);
  assert.equal(isHoneypotTriggered(undefined), false);
});

test('7. Validation: Valid inquiry payloads across types', () => {
  // General inquiry
  const res1 = validateInquiryPayload({
    inquiryType: 'general',
    name: 'Anna Schmidt',
    phone: '0172 / 1234567',
    email: 'anna@example.de',
    location: 'Wetzlar',
    notes: 'Fliesen im Flur erneuern'
  });
  assert.equal(res1.success, true);
  assert.equal(res1.data?.contact.name, 'Anna Schmidt');
  assert.equal(res1.data?.contact.phone, '0172 / 1234567');

  // Bad inquiry with nested details
  const res2 = validateInquiryPayload({
    inquiryType: 'bad',
    contact: {
      name: 'Michael Weber',
      phone: '+49 6441 998877',
      email: 'm.weber@web.de',
      zipCity: '35614 Aßlar'
    },
    badDetails: {
      sqm: 12,
      length: 4,
      width: 3,
      scopeLabel: 'Komplettbad schlüsselfertig',
      tierLabel: 'Premium'
    }
  });
  assert.equal(res2.success, true);
  assert.equal(res2.data?.badDetails?.sqm, 12);
});

test('8. Validation: Rejection of invalid phone and email inputs', () => {
  // Invalid phone number (letters)
  const badPhone = validateInquiryPayload({
    name: 'Tester',
    phone: 'kein-telefon'
  });
  assert.equal(badPhone.success, false);
  assert.equal(typeof badPhone.error, 'string');

  // Invalid email syntax
  const badEmail = validateInquiryPayload({
    name: 'Tester',
    phone: '01721234567',
    email: 'nicht-eine-email'
  });
  assert.equal(badEmail.success, false);

  // Missing required name
  const missingName = validateInquiryPayload({
    name: '',
    phone: '01721234567'
  });
  assert.equal(missingName.success, false);
});

test('9. Templates: Team Email MSO Compatibility & Outlook Subject Prefix', () => {
  const payload = {
    inquiryType: 'general',
    projectTitle: 'Badsanierung',
    contact: {
      name: 'Susanne Maier <img src=x onerror=alert(1)>',
      phone: '06441 / 112233',
      email: 'susanne@example.com',
      location: 'Aßlar'
    },
    notes: 'Bitte um zeitnahes Aufmaß\nZweite Zeile'
  };
  const refId = 'TEZ-26-TEST';

  const subject = getTeamEmailSubject(payload, refId);
  // Must preserve [Neue Anfrage] prefix for Outlook rules!
  assert.equal(subject.startsWith('[Neue Anfrage]'), true);
  assert.equal(subject.includes('Susanne Maier'), true);
  assert.equal(subject.includes('TEZ-26-TEST'), true);

  const html = generateTeamEmailHtml(payload, refId);
  // Check for MSO conditionals
  assert.equal(html.includes('<!--[if mso]>'), true);
  // Core layout must not use display: flex (breaks in Outlook Classic Word engine)
  assert.equal(html.includes('display: flex'), false);
  // Dynamic content must be escaped
  assert.equal(html.includes('<img src=x'), false);
  assert.equal(html.includes('&lt;img src=x'), true);

  const text = generateTeamEmailText(payload, refId);
  assert.equal(text.includes('NEUE WEBSITE-ANFRAGE [TEZ-26-TEST]'), true);
  assert.equal(text.includes('06441 / 112233'), true);
});

test('10. Templates: Customer Confirmation Sanitization & Legal Information', () => {
  const payload = {
    inquiryType: 'bad',
    projectTitle: 'Badsanierung',
    contact: {
      name: 'Dr. Klaus Becker',
      phone: '0171 / 9988776',
      email: 'becker@example.com',
      location: 'Wetzlar'
    },
    notes: 'Hier ein Link https://spam-link.de/evil und ein Test.'
  };
  const refId = 'TEZ-26-CUST';

  const html = generateCustomerEmailHtml(payload, refId);
  assert.equal(html.includes('<!--[if mso]>'), true);
  assert.equal(html.includes('Guten Tag Dr. Klaus Becker,'), true);
  // Notes must have URLs stripped
  assert.equal(html.includes('https://spam-link.de/evil'), false);
  assert.equal(html.includes('[Link entfernt]'), true);
  // Verified company data present
  assert.equal(html.includes('Hohwardstraße 14'), true);
  assert.equal(html.includes('35614 Aßlar'), true);
  assert.equal(html.includes('info@tezgel.de'), true);

  const text = generateCustomerEmailText(payload, refId);
  assert.equal(text.includes('EINGANGSBESTÄTIGUNG'), true);
  assert.equal(text.includes('TEZ-26-CUST'), true);
  assert.equal(text.includes('[Link entfernt]'), true);
});

test('11. Mailer: Dev Mock Mode & Idempotency Deduplication', async () => {
  const payload = {
    inquiryType: 'general',
    projectTitle: 'Fliesenverlegung',
    contact: {
      name: 'Idempotency Tester',
      phone: '0151 / 4433221',
      email: 'idem@example.com',
      location: 'Gießen'
    },
    notes: 'Test idempotency duplicate suppression'
  };

  // 1st call: fresh submission
  const res1 = await sendInquiryEmails(payload);
  assert.equal(res1.success, true);
  assert.equal(res1.mocked, true);
  const ref1 = res1.referenceId;

  // 2nd call with identical payload within 60s: must return cached reference ID!
  const res2 = await sendInquiryEmails(payload);
  assert.equal(res2.success, true);
  assert.equal(res2.referenceId, ref1);
  assert.equal(res2.message.includes('bereits aufgenommen'), true);
});

test('12. Utilities: String normalizers & Customer Subjects', () => {
  assert.equal(stripNewlines("Zeile 1\r\nZeile 2\t"), "Zeile 1  Zeile 2");
  assert.equal(normalizeMultiline("Eins\r\n\r\n\r\n\r\nZwei"), "Eins\n\nZwei");

  const subjTermin = getCustomerEmailSubject({ inquiryType: 'termin', projectTitle: 'Aufmaß', contact: { name: 'A', phone: '1' } }, 'REF1');
  assert.equal(subjTermin.includes('Terminanfrage'), true);

  const subjBad = getCustomerEmailSubject({ inquiryType: 'bad', projectTitle: 'Bad', contact: { name: 'A', phone: '1' } }, 'REF2');
  assert.equal(subjBad.includes('Badsanierungs-Anfrage'), true);

  const subjGeneral = getCustomerEmailSubject({ inquiryType: 'general', projectTitle: 'Fliesen', contact: { name: 'A', phone: '1' } }, 'REF3');
  assert.equal(subjGeneral.includes('Fliesenverlegung Tezgel'), true);
});

