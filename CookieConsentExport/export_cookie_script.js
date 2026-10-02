const fs = require('fs');
const path = require('path');

const srcDir = '/Users/umurey/Downloads/MS-Schl-sseldienst-main';
const destDir = '/Users/umurey/Downloads/CookieConsentExport';

const filesToExport = [
  { src: 'components/ui/CookieConsent.tsx', dest: 'components/CookieConsent.tsx' },
  { src: 'hooks/useConsent.ts', dest: 'hooks/useConsent.ts' },
  { src: 'lib/cookie-inventory.ts', dest: 'lib/cookie-inventory.ts' }
];

const colorReplacements = [
  { regex: /text-\[color:var\(--text-primary\)\]/g, replacement: 'text-gray-900' },
  { regex: /text-\[color:var\(--text-secondary\)\]/g, replacement: 'text-gray-700' },
  { regex: /text-\[color:var\(--text-tertiary\)\]/g, replacement: 'text-gray-500' },
  { regex: /text-\[var\(--color-charcoal-700\)\]/g, replacement: 'text-gray-700' },
  { regex: /border-\[var\(--border-subtle\)\]/g, replacement: 'border-gray-200' },
  { regex: /border-\[var\(--border-default\)\]/g, replacement: 'border-gray-300' },
  
  // Replace the specific red color with standard blue
  { regex: /bg-\[var\(--color-red-500\)\]/g, replacement: 'bg-blue-600' },
  { regex: /hover:bg-\[var\(--color-red-600\)\]/g, replacement: 'hover:bg-blue-700' },
  { regex: /text-\[var\(--color-red-500\)\]/g, replacement: 'text-blue-600' },
  { regex: /text-\[var\(--color-red-600\)\]/g, replacement: 'text-blue-700' },
  { regex: /border-\[var\(--color-red-500\)\]/g, replacement: 'border-blue-600' },
  
  // Replace charcoal with standard gray for dark buttons
  { regex: /bg-\[var\(--color-charcoal-800\)\]/g, replacement: 'bg-gray-800' },
  { regex: /hover:bg-\[var\(--color-charcoal-700\)\]/g, replacement: 'hover:bg-gray-700' }
];

for (const file of filesToExport) {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  let content = fs.readFileSync(srcPath, 'utf8');

  // Perform styling replacements for the component
  if (file.src.includes('CookieConsent.tsx')) {
    for (const rule of colorReplacements) {
      content = content.replace(rule.regex, rule.replacement);
    }
  }

  // Comment out the tracking API in the hook
  if (file.src.includes('useConsent.ts')) {
    content = content.replace(
      'if (navigator.sendBeacon) {',
      '// BEISPIEL: API-Call zum Backend für rechtssicheres Consent-Proof-Logging\n          // if (navigator.sendBeacon) {'
    );
    content = content.replace(
      'navigator.sendBeacon("/api/consent-audit", JSON.stringify(proofPayload));',
      '// navigator.sendBeacon("/api/consent-audit", JSON.stringify(proofPayload));'
    );
    content = content.replace(
      '} else {',
      '// } else {'
    );
    content = content.replace(
      '// Fallback for browsers without sendBeacon',
      '// // Fallback for browsers without sendBeacon'
    );
    content = content.replace(
      'fetch("/api/consent-audit"',
      '// fetch("/api/consent-audit"'
    );
    content = content.replace(
      'method: "POST",',
      '//   method: "POST",'
    );
    content = content.replace(
      'headers: { "Content-Type": "application/json" },',
      '//   headers: { "Content-Type": "application/json" },'
    );
    content = content.replace(
      'body: JSON.stringify(proofPayload),',
      '//   body: JSON.stringify(proofPayload),'
    );
    content = content.replace(
      'keepalive: true',
      '//   keepalive: true'
    );
    content = content.replace(
      '}).catch(e => console.warn("Failed to log consent", e));',
      '// }).catch(e => console.warn("Failed to log consent", e));'
    );
    content = content.replace(
      '} // <-- Closing brace for the if/else if it existed cleanly',
      '// }'
    );
    // Find the last closing brace for the fallback else block and comment it out.
    // It's line 204: `}).catch(e => console.warn("Failed to log consent", e));` and line 205: `}`
    content = content.replace(
      '          }\n        } catch (e) {',
      '          // }\n        } catch (e) {'
    );
  }

  fs.writeFileSync(destPath, content);
  console.log(`Exported ${file.dest}`);
}
