// Playwright-Konfiguration der Relaunch-Prüfungen. Server: server.sh start <commit> (127.0.0.1:4310).
import { defineConfig } from '@playwright/test';
import './lib.mjs'; // setzt CHROME_PATH, falls nötig (Host ohne chromium-1194)
const BASE = process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310';
if (!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(BASE)) throw new Error('ABBRUCH: Tests nur gegen lokale Server (G5).');
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: process.env.RELAUNCH_REPORT || '../cache/playwright-ergebnis.json' }]],
  outputDir: process.env.RELAUNCH_OUTPUT || '../cache/test-results', // je Paket eigenes Verzeichnis (L6)
  // Bewegung: Playwright bis 1.62 wandte reducedMotion aus dieser Datei nicht an (Probe: matchMedia meldete keine reduzierte
  // Bewegung); die Suite von E0 lief also mit Bewegung. Ab 1.63.0 gilt der Wert (E-076). Das Etappentor fährt die Suite deshalb
  // zweimal: wie eingestellt (reduziert) und mit RELAUNCH_BEWEGUNG=an wie in E0; beide Läufe müssen grün sein.
  use: { baseURL: BASE, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: process.env.RELAUNCH_BEWEGUNG === 'an' ? 'no-preference' : 'reduce', trace: 'off', launchOptions: { executablePath: process.env.CHROME_PATH || undefined } },
  projects: [
    { name: 'mobil', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
