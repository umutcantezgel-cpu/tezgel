/**
 * Security and Anti-Abuse utilities for Fliesenverlegung Tezgel
 */

/**
 * Escapes HTML entities to completely eliminate XSS and HTML injection in email templates.
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes single-line header values (Subject, From, To, Reply-To)
 * by stripping CRLF and dangerous control characters.
 */
export function sanitizeHeaderValue(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/[\r\n\x00-\x1f\x7f]/g, ' ')
    .trim();
}

/**
 * Strips all URLs and clickable web links from user text to avoid reflection attacks / open relay abuse.
 */
export function stripUrls(text: string): string {
  return text.replace(/(https?:\/\/|www\.)[^\s<>"']+/gi, '[Link entfernt]');
}

/**
 * Safely resolves the client IP address from request headers without blind spoofing.
 */
export function getClientIp(headers: { get(name: string): string | null }): string {
  // 1. Check direct platform IP header (e.g. Vercel / Cloudflare / reverse proxy)
  const realIp = headers.get('x-real-ip');
  if (realIp && realIp.trim()) {
    return realIp.trim().split(',')[0].trim();
  }

  // 2. Check x-forwarded-for: Use the leftmost untrusted client IP
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor && forwardedFor.trim()) {
    const ips = forwardedFor.split(',');
    if (ips.length > 0 && ips[0].trim()) {
      return ips[0].trim();
    }
  }

  // 3. Fallback to cf-connecting-ip if Cloudflare used
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp && cfIp.trim()) {
    return cfIp.trim();
  }

  return '127.0.0.1';
}

interface RateLimitBucket {
  timestamps: number[];
}

// In-memory sliding window rate limit caches
const ipRateLimitStore = new Map<string, RateLimitBucket>();
const emailRateLimitStore = new Map<string, RateLimitBucket>();

// Periodic cleanup every 10 minutes to prevent memory leaks
let lastCleanup = Date.now();
function cleanupStores() {
  const now = Date.now();
  if (now - lastCleanup < 600_000) return;
  lastCleanup = now;

  const tenMinutesAgo = now - 600_000;
  for (const [key, bucket] of ipRateLimitStore.entries()) {
    bucket.timestamps = bucket.timestamps.filter((t) => t > tenMinutesAgo);
    if (bucket.timestamps.length === 0) ipRateLimitStore.delete(key);
  }

  const oneHourAgo = now - 3_600_000;
  for (const [key, bucket] of emailRateLimitStore.entries()) {
    bucket.timestamps = bucket.timestamps.filter((t) => t > oneHourAgo);
    if (bucket.timestamps.length === 0) emailRateLimitStore.delete(key);
  }
}

/**
 * Rate limit submissions per client IP (default: max 5 requests per 10 minutes).
 */
export function checkIpRateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 600_000
): { allowed: boolean; remaining: number; retryAfterSec?: number } {
  cleanupStores();
  const now = Date.now();
  const bucket = ipRateLimitStore.get(ip) || { timestamps: [] };

  // Remove timestamps outside window
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= maxRequests) {
    const oldest = bucket.timestamps[0];
    const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  bucket.timestamps.push(now);
  ipRateLimitStore.set(ip, bucket);

  return {
    allowed: true,
    remaining: maxRequests - bucket.timestamps.length
  };
}

/**
 * Rate limit customer confirmation emails per recipient email address
 * to prevent reflection / email-bombing attacks (default: max 2 emails per 60 minutes).
 */
export function checkRecipientRateLimit(
  email: string,
  maxMails = 2,
  windowMs = 3_600_000
): { allowed: boolean; remaining: number } {
  cleanupStores();
  const normalized = email.toLowerCase().trim();
  const now = Date.now();
  const bucket = emailRateLimitStore.get(normalized) || { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= maxMails) {
    return { allowed: false, remaining: 0 };
  }

  bucket.timestamps.push(now);
  emailRateLimitStore.set(normalized, bucket);

  return {
    allowed: true,
    remaining: maxMails - bucket.timestamps.length
  };
}

/**
 * Detects automated fast-bots: A human requires at least 1500ms to interact and submit.
 * Submissions faster than 1500ms from form initialization are treated as bot attempts.
 *
 * SEO-Runde K01: Vorrang hat die im Browser gemessene Ausfülldauer (`_d`, performance.now(), siehe
 * src/lib/formulare/ausfuelldauer.ts); sie hängt nicht an der Uhr des Geräts. Alle Formulare mit Zeitsperre senden `_d`.
 * Nur Seiten, die noch mit dem Stand vor dieser Änderung geöffnet sind, senden allein `_t`. Für sie gilt als zu schnell
 * nur noch eine Dauer von 0 bis unter `minDelayMs`; ein Tab, der länger als einen Tag offen stand, oder eine Geräteuhr,
 * die weiter vorgeht als die Ausfülldauer, verwirft nichts mehr. Ein Rest bleibt für diese alten Seiten: Geht die Uhr
 * knapp weniger vor, als das Ausfüllen dauerte, kann die Rechnung in 0 bis 1,5 s fallen.
 */
export function checkFastBot(
  submissionTime: number | string | undefined,
  minDelayMs = 1500,
  fillDurationMs?: unknown
): { isBot: boolean; elapsedMs?: number } {
  const dauer = typeof fillDurationMs === 'string' && fillDurationMs.trim() !== '' ? Number(fillDurationMs) : fillDurationMs;
  if (typeof dauer === 'number' && Number.isFinite(dauer) && dauer >= 0) {
    return { isBot: dauer < minDelayMs, elapsedMs: Math.round(dauer) };
  }

  if (!submissionTime) {
    // If no timestamp was supplied, don't hard reject to support legacy forms, but flag
    return { isBot: false };
  }

  const startTime = typeof submissionTime === 'string' ? parseInt(submissionTime, 10) : submissionTime;
  if (isNaN(startTime)) return { isBot: false };

  const now = Date.now();
  const elapsed = now - startTime;

  // Zu schnell nur bei einer Dauer von 0 bis unter minDelayMs; Uhrabweichung und alte Tabs zählen nicht als Bot (K01).
  if (elapsed >= 0 && elapsed < minDelayMs) {
    return { isBot: true, elapsedMs: elapsed };
  }

  return { isBot: false, elapsedMs: elapsed };
}

/**
 * SEO-Runde K01: Zeitsperre für POST /api/anfrage aus dem Rohkörper (`_d` vor `_t`, siehe checkFastBot).
 */
export function pruefeZeitsperre(body: Record<string, unknown>, minDelayMs = 1500): { isBot: boolean; elapsedMs?: number } {
  return checkFastBot(body._t as number | string | undefined, minDelayMs, body._d);
}

/**
 * Checks if honeypot was populated by a bot.
 */
export function isHoneypotTriggered(honeypot: unknown): boolean {
  if (typeof honeypot === 'string') {
    return honeypot.trim().length > 0;
  }
  return Boolean(honeypot);
}
