import { escapeHtml } from '../security';

/**
 * Shared HTML & Outlook MSO Components for Fliesenverlegung Tezgel Email Templates
 */

/**
 * Wraps content in a 100% table with a centered 600px MSO table container.
 */
export function wrapInMsoContainer(content: string, maxWidth = 600): string {
  return `
<!--[if mso]>
<table role="presentation" width="${maxWidth}" align="center" border="0" cellpadding="0" cellspacing="0" style="width:${maxWidth}px;">
<tr>
<td style="padding:0;margin:0;">
<![endif]-->
<div style="max-width:${maxWidth}px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.05);">
  ${content}
</div>
<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
`;
}

/**
 * Renders a bulletproof call-to-action button that works flawlessly across Outlook Desktop (Word engine)
 * and modern mobile web clients (Gmail, Apple Mail, Outlook Mobile).
 */
export function renderBulletproofButton(opts: {
  href: string;
  label: string;
  bgColor: string;
  textColor?: string;
  width?: number;
}): string {
  const textColor = opts.textColor || '#ffffff';
  const width = opts.width || 180;
  const safeHref = escapeHtml(opts.href);
  const safeLabel = escapeHtml(opts.label);

  return `
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeHref}" style="height:40px;v-text-anchor:middle;width:${width}px;" arcsize="20%" stroke="f" fillcolor="${opts.bgColor}">
<w:anchorlock/>
<center style="color:${textColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;">
  ${safeLabel}
</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-- -->
<a href="${safeHref}" style="display:inline-block;background-color:${opts.bgColor};color:${textColor} !important;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;line-height:1.2;mso-padding-alt:0;text-align:center;">
  ${safeLabel}
</a>
<!--<![endif]-->
`;
}

/**
 * Renders a structured two-column specifications row with alternating background.
 */
export function renderSpecRow(label: string, value: string, isEven: boolean): string {
  const bgColor = isEven ? '#ffffff' : '#f8fafc';
  const safeLabel = escapeHtml(label);
  const safeValue = escapeHtml(value);

  return `
  <tr style="background-color:${bgColor};">
    <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#475569;width:160px;border-bottom:1px solid #e2e8f0;vertical-align:top;">
      ${safeLabel}:
    </td>
    <td style="padding:10px 14px;font-size:13.5px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;vertical-align:top;word-break:break-word;">
      ${safeValue}
    </td>
  </tr>`;
}

/**
 * Standard Email Header
 */
export function renderEmailHeader(opts: {
  badge: string;
  referenceId: string;
  title: string;
  subtitle: string;
  headerBg?: string;
  accentBarColor?: string;
}): string {
  const headerBg = opts.headerBg || '#0f172a';
  const accentBarColor = opts.accentBarColor || '#ea580c';

  return `
<!-- Brand Accent Top Bar -->
<div style="background-color:${accentBarColor};height:6px;width:100%;font-size:0;line-height:0;">&nbsp;</div>

<!-- Header Table -->
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:${headerBg};color:#ffffff;border-collapse:collapse;">
  <tr>
    <td style="padding:26px 24px;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;">
            <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;background-color:rgba(234,88,12,0.25);color:#fed7aa;border:1px solid rgba(234,88,12,0.4);display:inline-block;padding:3px 8px;border-radius:4px;margin-bottom:8px;">
              ${escapeHtml(opts.badge)} &middot; Vorgang ${escapeHtml(opts.referenceId)}
            </div>
            <h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.25;">
              ${escapeHtml(opts.title)}
            </h1>
            <p style="margin:6px 0 0 0;font-size:13px;color:#94a3b8;line-height:1.4;">
              ${escapeHtml(opts.subtitle)}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;
}
