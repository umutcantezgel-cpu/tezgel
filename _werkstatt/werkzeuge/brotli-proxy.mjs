// Brotli-Vorschalter für Leistungsmessungen (E-085): liefert einen lokalen Produktionsserver so komprimiert aus wie Vercel
// (Brotli für Text: HTML, RSC, CSS, JS, JSON, SVG, XML, Klartext; Bilder und Schriften unverändert). next start komprimiert
// nur mit gzip; Lighthouse rechnet den mobilen LCP aus den übertragenen Bytes, dadurch lag jede lokale Messung schwerer als
// die echte Auslieferung. Nur lokal (assertLocal), keine Änderung am Inhalt, nur die Übertragungskodierung.
// Nutzung: node brotli-proxy.mjs --ziel http://127.0.0.1:4324 --port 5324 [--qualitaet 5]
import http from 'node:http';
import zlib from 'node:zlib';
import { assertLocal } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const ZIEL = arg('ziel', '');
const PORT = Number(arg('port', '0'));
const QUALITAET = Number(arg('qualitaet', '5'));
if (!ZIEL || !PORT) { console.error('Nutzung: node brotli-proxy.mjs --ziel http://127.0.0.1:4324 --port 5324 [--qualitaet 5]'); process.exit(1); }
assertLocal(ZIEL);
const TEXT = /^(text\/|application\/(javascript|json|xml|manifest\+json|ld\+json)|image\/svg\+xml|text\/x-component)/;
const OHNE = new Set(['content-length', 'content-encoding', 'transfer-encoding', 'connection', 'keep-alive']);

http.createServer(async (req, res) => {
  try {
    const kopf = { ...req.headers, 'accept-encoding': 'identity', host: new URL(ZIEL).host };
    const antwort = await fetch(ZIEL + req.url, { method: req.method, headers: kopf, redirect: 'manual', body: ['GET', 'HEAD'].includes(req.method) ? undefined : req });
    const typ = antwort.headers.get('content-type') || '';
    const koepfe = {};
    antwort.headers.forEach((w, k) => { if (!OHNE.has(k)) koepfe[k] = w; });
    const roh = Buffer.from(await antwort.arrayBuffer());
    const brotli = TEXT.test(typ) && roh.length > 0 && /\bbr\b/.test(req.headers['accept-encoding'] || '');
    const koerper = brotli ? zlib.brotliCompressSync(roh, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: QUALITAET } }) : roh;
    if (brotli) { koepfe['content-encoding'] = 'br'; koepfe.vary = 'Accept-Encoding'; }
    koepfe['content-length'] = String(koerper.length);
    res.writeHead(antwort.status, koepfe);
    res.end(req.method === 'HEAD' ? undefined : koerper);
  } catch (e) {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`Vorschalter: ${e.message}`);
  }
}).listen(PORT, '127.0.0.1', () => console.log(`brotli-proxy ${PORT} → ${ZIEL} (Qualität ${QUALITAET})`));
