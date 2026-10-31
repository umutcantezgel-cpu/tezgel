// Hilfsskript SF-C3 (vorübergehend): rendert eine lokale HTML-Datei als PNG (Sichtprüfung der neuen Vignette).
import fs from 'node:fs';
import { chromium } from 'playwright';
import { CHROME } from './lib.mjs';
const [, , ein, aus] = process.argv;
const b = await chromium.launch({ executablePath: CHROME });
const p = await b.newPage({ viewport: { width: 900, height: 900 } });
await p.setContent(fs.readFileSync(ein, 'utf8'));
await p.screenshot({ path: aus, fullPage: true });
await b.close();
