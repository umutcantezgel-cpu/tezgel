// Umbauskript (E2-ORCH-07): stellt wiederkehrende Muster in Seiten und Komponenten mechanisch auf KERN um.
// Ändert nur Klassenlisten und Icon-Elemente; Textknoten, Alt-Texte, Labels, Links und IDs bleiben wörtlich
// (geprüft vor dem Schreiben: Text-Fingerabdruck vorher = nachher, sonst wird die Datei nicht geschrieben).
// Nutzung:
//   node umbau.mjs --dateien a.jsx,b.tsx [--schreiben] [--ziel DIR]   Trockenlauf ohne --schreiben (Bericht + Diff-Zähler)
//   node umbau.mjs --ersatz                                             erzeugt src/components/icons/ersatz.tsx aus der Zuordnung
// Umbauten:
//   I  lucide → eigene Icons: <Phone className="w-4 h-4 …"/> → <Icon name="telefon" groesse={4} …/>; „entfällt“ → Element entfernt;
//      als Daten weitergereichte Icons ({ icon: Phone }) kommen aus @/components/icons/ersatz (gleiche Namen, eigene Darstellung).
//   K  Klassen → KERN: Farben, Schriftstufen (fluid, daher ohne Breakpoint-Varianten), Abstände/Größen auf die Skala,
//      Effekte (Schatten, Verläufe, Unschärfe, Hover-Versatz, Rundungen) entfallen, Altklassen (eyebrow, btn-*, glass-*, ceramic-*) aufgelöst.
//   E  Zierelemente: ambient-glow-Ebenen und Icon-Kacheln (icon-chip, nur Icons darin) entfallen.
// Was nicht sicher mechanisch geht, steht als ZU_PRUEFEN im Bericht (Datei, Zeile, Grund).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { REPO, ensureDir } from './lib.mjs';

const require = createRequire(path.join(REPO, 'package.json'));
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const MagicString = require('magic-string').default ?? require('magic-string');

// ---------- Zuordnung und Icon-Namen ----------
function ladeZuordnung() {
  const text = fs.readFileSync(path.join(REPO, 'src/components/icons/zuordnung.ts'), 'utf8').replace(/\/\/.*$/gm, '');
  const z = {};
  for (const m of text.matchAll(/(\w+): (?:'([\w-]+)'|null)/g)) z[m[1]] = m[2] ?? null;
  return z;
}
const ZUORDNUNG = ladeZuordnung();
const ICON_NAMEN = new Set(JSON.parse(fs.readFileSync(path.join(REPO, 'src/components/icons/namen.ts'), 'utf8').match(/\[.*\]/)[0]));

// ---------- Knopf-Klassen aus stile.ts (eine Quelle) ----------
function ladeKnopf() {
  const t = fs.readFileSync(path.join(REPO, 'src/components/kern/stile.ts'), 'utf8');
  const basis = t.match(/const KNOPF_BASIS =\s*'([^']+)'/)[1];
  const variante = (v) => t.match(new RegExp(`${v}: '([^']+)'`))[1];
  return { haupt: `${basis} ${variante('haupt')}`, neben: `${basis} ${variante('neben')}` };
}
const KNOPF = ladeKnopf();
const ETIKETT = 'inline-flex items-center gap-2 font-mono text-fs-1 text-tinte-2';

// ---------- Klassen-Abbildung ----------
const STUFEN_ABSTAND = [0, 0.25, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32];
const STUFEN_GROESSE = [1, 2, 3, 4, 5, 6, 8, 11, 12, 16, 24, 32];
const ABSTAND_PRAEFIXE = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'ps', 'pe', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me', 'gap', 'gap-x', 'gap-y', 'space-x', 'space-y', 'inset', 'inset-x', 'inset-y', 'top', 'right', 'bottom', 'left', 'translate-x', 'translate-y', 'scroll-mt', 'scroll-pt'];
const GROESSE_PRAEFIXE = ['w', 'h', 'size', 'min-w', 'min-h'];
const BREAKPOINTS = new Set(['sm', 'md', 'lg', 'xl', '2xl']);
const GRAU = '(?:neutral|slate|gray|zinc|stone)';
const AKZENT = '(?:orange|amber|red|rose|yellow)';
const GRUEN = '(?:green|emerald|teal)';
const BLAU = '(?:blue|sky|indigo|cyan)';

const naechste = (v, stufen) => stufen.reduce((best, s) => (Math.abs(s - v) < Math.abs(best - v) || (Math.abs(s - v) === Math.abs(best - v) && s > best) ? s : best), stufen[0]);
const stufeText = (s) => (s === 0.25 ? 'px' : String(s));

const SCHRIFT = { xs: 1, sm: 2, base: 3, lg: 4, xl: 4, '2xl': 5, '3xl': 6, '4xl': 6, '5xl': 7, '6xl': 7, '7xl': 7, '8xl': 7, '9xl': 7 };
function schriftStufe(util) {
  let m = /^text-(xs|sm|base|lg|xl|[2-9]xl)$/.exec(util);
  if (m) return SCHRIFT[m[1]];
  m = /^text-\[(\d+(?:\.\d+)?)(px|rem)\]$/.exec(util);
  if (m) {
    const px = m[2] === 'rem' ? Number(m[1]) * 16 : Number(m[1]);
    return px <= 14 ? 1 : px <= 16 ? 2 : px <= 19 ? 3 : px <= 24 ? 4 : px <= 36 ? 5 : px <= 56 ? 6 : 7;
  }
  return null;
}

function farbe(art, util) {
  // art: text | bg | border | divide | fill | stroke | decoration
  const r = new RegExp(`^${art}-(?:(white|black|transparent|current)|(${GRAU.slice(3, -1)}|${AKZENT.slice(3, -1)}|${GRUEN.slice(3, -1)}|${BLAU.slice(3, -1)})-(\\d{2,3}))(?:/\\d+)?$`);
  const m = r.exec(util);
  if (!m) return undefined;
  const [, rein, familie, stufeS] = m;
  const stufe = Number(stufeS);
  const grau = familie && new RegExp(`^${GRAU}$`).test(familie);
  const akzent = familie && new RegExp(`^${AKZENT}$`).test(familie);
  const gruen = familie && new RegExp(`^${GRUEN}$`).test(familie);
  if (rein === 'transparent' || rein === 'current') return `${art}-${rein}`;
  const T = {
    text: () => (rein === 'white' ? 'text-kalk' : rein === 'black' ? 'text-tinte' : grau ? (stufe >= 800 ? 'text-tinte' : stufe >= 500 ? 'text-tinte-2' : stufe >= 300 ? 'text-strich' : 'text-kalk') : akzent ? 'text-laser-tief' : gruen ? 'text-abnahme' : 'text-tinte'),
    bg: () => (rein === 'white' ? 'bg-fliese' : rein === 'black' ? 'bg-tinte' : grau ? (stufe <= 100 ? 'bg-kalk' : stufe <= 300 ? 'bg-fuge' : stufe <= 600 ? 'bg-strich' : 'bg-tinte') : akzent ? (stufe <= 200 ? 'bg-kalk' : 'bg-tinte') : 'bg-kalk'),
    border: () => (rein === 'white' ? 'border-fuge' : rein === 'black' ? 'border-tinte' : grau ? (stufe <= 300 ? 'border-fuge' : stufe <= 600 ? 'border-strich' : 'border-tinte') : 'border-strich'),
  };
  T.divide = () => T.border().replace('border-', 'divide-');
  T.fill = () => T.text().replace('text-', 'fill-');
  T.stroke = () => T.text().replace('text-', 'stroke-');
  T.decoration = () => T.border().replace('border-', 'decoration-');
  return T[art]();
}

function zerlege(token) {
  // Varianten (auch mit Klammern) vom Wert trennen
  let tiefe = 0, letzte = -1;
  for (let i = 0; i < token.length; i++) {
    const c = token[i];
    if (c === '[' || c === '(') tiefe++;
    else if (c === ']' || c === ')') tiefe--;
    else if (c === ':' && tiefe === 0) letzte = i;
  }
  return { varianten: letzte < 0 ? [] : token.slice(0, letzte).split(':'), util: token.slice(letzte + 1) };
}

/** Bildet ein Klassentoken ab. Rückgabe: { neu: string|null, hinweis?: string } (null = entfällt). */
export function bildeKlasse(token, kontext = {}) {
  const { varianten, util: roh } = zerlege(token);
  const wichtig = roh.startsWith('!');
  const util = wichtig ? roh.slice(1) : roh;
  const mitV = (u) => (u === null ? null : [...varianten, (wichtig ? '!' : '') + u].join(':'));
  const zustand = varianten.some((v) => /^(hover|group-hover|focus|focus-visible|active|group-focus)$/.test(v));

  // Altklassen
  if (/^eyebrow(-|$)/.test(util)) return { neu: varianten.length ? null : ETIKETT };
  if (util === 'btn-primary') return { neu: varianten.length ? null : KNOPF.haupt };
  if (util === 'btn-ghost') return { neu: varianten.length ? null : KNOPF.neben };
  if (/^(glass-surface|glass-card|ceramic-card|ceramic-hero|ceramic-panel|surface-card)$/.test(util)) return { neu: varianten.length ? null : 'border border-fuge bg-fliese' };
  if (/^(text-ceramic-gradient|ambient-glow.*|glass-.*|ceramic-.*|plate-enter|icon-chip|shadow-tile.*|rounded-tile.*|group\/item)$/.test(util)) return { neu: null };

  // Effekte
  if (/^(shadow|drop-shadow)(-.*)?$/.test(util) && util !== 'shadow-fuge' && util !== 'shadow-none') return { neu: null };
  if (/^(backdrop-|bg-gradient-|bg-linear-|bg-radial-|blur|will-change-|transform$|animate-)/.test(util)) return { neu: null, hinweis: util.startsWith('animate-') ? 'Animation entfernt – Register prüfen' : undefined };
  if (/^(from|via|to)-/.test(util) && !/^top-/.test(util)) return { neu: null };
  if (/^(tracking|leading)-/.test(util)) return { neu: null };
  if (util === 'uppercase' || util === 'italic' && kontext.etikett) return { neu: null };
  if (/^-?(translate|scale|rotate|skew)-/.test(util) && zustand) return { neu: null };
  if (/^-?(translate-x|translate-y)-/.test(util) && varianten.length === 0 && kontext.icon) return { neu: null };
  if (/^ring(-|$)/.test(util) || /^ring-offset/.test(util)) return { neu: null };
  if (/^rounded(-(?!none$|r1$|full$)[\w-]+)?$/.test(util) && !/^rounded-(none|r1|full)$/.test(util)) return { neu: null };
  if (/^opacity-\d+$/.test(util) && zustand) return { neu: null };

  // Übergänge
  if (util === 'transition-all' || util === 'transition') return { neu: mitV('transition-colors') };
  if (util === 'transition-transform') return { neu: null };
  let m = /^duration-(\d+)$/.exec(util);
  if (m) { const ms = Number(m[1]); return { neu: mitV(ms <= 200 ? 'dauer-1' : ms <= 400 ? 'dauer-2' : 'dauer-3') }; }
  if (/^ease-(in|out|in-out|linear)$/.test(util)) return { neu: mitV('ease-setzen') };

  // Schrift
  const fs = schriftStufe(util);
  if (fs !== null) return { neu: varianten.some((v) => BREAKPOINTS.has(v)) ? null : mitV(`text-fs-${fs}`), schrift: fs };
  if (/^font-(black|extrabold|bold)$/.test(util)) return { neu: kontext.ueberschrift ? null : mitV('font-semibold') };
  if (/^font-(display|heading)$/.test(util)) return { neu: mitV('font-anzeige') };
  if (util === 'font-sans') return { neu: mitV('font-text') };

  // Farben
  for (const art of ['text', 'bg', 'border', 'divide', 'fill', 'stroke', 'decoration']) {
    const f = farbe(art, util);
    if (f !== undefined) {
      const hinweis = new RegExp(`-(${GRUEN.slice(3, -1)}|${BLAU.slice(3, -1)})-`).test(util) ? `Farbe ${util} → ${f} (Markenfläche? prüfen)` : undefined;
      return { neu: mitV(f), hinweis };
    }
  }

  // Abstände
  m = /^(-?)([a-z]+(?:-[xy])?)-(\d+(?:\.\d+)?|px)$/.exec(util);
  if (m && ABSTAND_PRAEFIXE.includes(m[2])) {
    const v = m[3] === 'px' ? 0.25 : Number(m[3]);
    const s = naechste(v, STUFEN_ABSTAND);
    return { neu: mitV(`${m[1]}${m[2]}-${stufeText(s)}`) };
  }
  // Größen
  m = /^([a-z]+(?:-[wh])?)-(\d+(?:\.\d+)?)$/.exec(util);
  if (m && GROESSE_PRAEFIXE.includes(m[1])) {
    const s = naechste(Number(m[2]), STUFEN_GROESSE);
    return { neu: mitV(`${m[1]}-${s}`) };
  }
  m = /^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|screen-\w+)$/.exec(util);
  if (m) return { neu: mitV(/^(xs|sm|md)$/.test(m[1]) ? 'max-w-md' : /^(lg|xl|2xl|3xl|4xl)$/.test(m[1]) ? 'max-w-mass' : 'max-w-seite') };
  m = /^z-(\d+|\[\d+\])$/.exec(util);
  if (m) { const z = Number(m[1].replace(/\D/g, '')); return { neu: mitV(`z-${z <= 0 ? 0 : z <= 10 ? 10 : z <= 30 ? 30 : z <= 40 ? 40 : 50}`) }; }

  if (/[[(]/.test(util)) return { neu: token, hinweis: `Beliebigwert ${token} – von Hand auf Token setzen` };
  return { neu: token };
}

/** Bildet eine Klassenliste ab; fasst Schriftstufen über Breakpoints zur größten zusammen. */
export function bildeKlassen(text, kontext = {}) {
  let tokens = text.split(/\s+/).filter(Boolean);
  // btn-*/eyebrow werden zu vollständigen KERN-Klassen; ihre alte Feinjustierung (Abstand, Schrift, Rundung) entfällt
  if (tokens.some((t) => /^(btn-primary|btn-ghost|eyebrow(-\w+)?)$/.test(t))) {
    tokens = tokens.filter((t) => /^(btn-primary|btn-ghost|eyebrow(-\w+)?)$/.test(t) || !/^(p[xytrblse]?-|text-(xs|sm|base|lg|xl|\d?xl|\[)|font-(black|extrabold|bold|semibold|medium)|gap-|rounded|shadow|tracking-|leading-|uppercase$|justify-center$|inline-flex$|items-center$)/.test(t));
  }
  const aus = [];
  const hinweise = [];
  let groessteSchrift = null;
  let ersteSchriftPos = -1;
  for (const t of tokens) {
    const r = bildeKlasse(t, kontext);
    if (r.schrift) {
      const { varianten } = zerlege(t);
      if (varianten.every((v) => BREAKPOINTS.has(v))) {
        groessteSchrift = Math.max(groessteSchrift ?? 0, r.schrift);
        if (ersteSchriftPos < 0) ersteSchriftPos = aus.length;
        continue;
      }
    }
    if (r.hinweis) hinweise.push(r.hinweis);
    if (r.neu) for (const n of r.neu.split(' ')) if (!aus.includes(n)) aus.push(n);
  }
  if (groessteSchrift) aus.splice(ersteSchriftPos, 0, `text-fs-${kontext.ueberschriftStufe ?? groessteSchrift}`);
  return { text: aus.join(' '), hinweise };
}

// ---------- Text-Fingerabdruck ----------
const TEXT_ATTRIBUTE = new Set(['alt', 'title', 'aria-label', 'placeholder', 'href', 'id', 'name', 'value', 'label', 'htmlFor', 'aria-labelledby', 'aria-describedby', 'role', 'type', 'target', 'rel']);
function fingerabdruck(ast, iconNamen = new Set()) {
  const teile = [];
  traverse(ast, {
    JSXText(p) { const t = p.node.value.replace(/\s+/g, ' ').trim(); if (t) teile.push(`T:${t}`); },
    JSXAttribute(p) {
      const n = p.node.name.name;
      const el = p.parentPath.node.name?.name;
      if (iconNamen.has(el)) {
        // Icons: nur ihre Beschriftung zählt (aria-label/title werden zu label)
        if (/^(aria-label|title|label)$/.test(n) && p.node.value?.type === 'StringLiteral') teile.push(`I:${p.node.value.value}`);
        return;
      }
      if (typeof n === 'string' && TEXT_ATTRIBUTE.has(n) && p.node.value?.type === 'StringLiteral') teile.push(`A:${n}=${p.node.value.value}`);
    },
    StringLiteral(p) {
      if (p.parentPath.isJSXAttribute() || p.parentPath.isImportDeclaration()) return;
      const inKlasse = p.findParent((q) => q.isJSXAttribute() && q.node.name.name === 'className');
      if (inKlasse) return;
      if (p.findParent((q) => q.isJSXExpressionContainer())) teile.push(`S:${p.node.value}`);
    },
    TemplateElement(p) {
      if (p.findParent((q) => q.isJSXAttribute() && q.node.name.name === 'className')) return;
      const t = p.node.value.cooked?.trim();
      if (t && p.findParent((q) => q.isJSXExpressionContainer())) teile.push(`L:${t}`);
    },
  });
  return teile.sort();
}

// ---------- Umbau einer Datei ----------
const PARSER = { sourceType: 'module', plugins: ['jsx', 'typescript'], errorRecovery: false };

function zeileVon(text, pos) { return text.slice(0, pos).split('\n').length; }

export function baueUm(datei, quelle) {
  const ast = parse(quelle, PARSER);
  const s = new MagicString(quelle);
  const bericht = { datei, icons: 0, icons_entfallen: 0, icons_daten: [], klassen: 0, elemente_entfernt: 0, zu_pruefen: [] };
  const lucide = new Map(); // lokaler Name -> lucide-Name
  const typen = []; // Typ-Importe aus lucide (z. B. LucideIcon)
  let lucideImport = null;
  traverse(ast, {
    ImportDeclaration(p) {
      if (p.node.source.value === 'lucide-react') {
        lucideImport = p.node;
        for (const sp of p.node.specifiers) {
          if (sp.type !== 'ImportSpecifier') continue;
          const name = sp.imported.name ?? sp.imported.value;
          if (sp.importKind === 'type' || p.node.importKind === 'type' || name === 'LucideIcon' || name === 'IconNode') typen.push(sp.local.name);
          else lucide.set(sp.local.name, name);
        }
      }
      if (/^@phosphor-icons/.test(p.node.source.value)) bericht.zu_pruefen.push({ zeile: p.node.loc.start.line, grund: `Phosphor-Import ${p.node.source.value} (Markenlogos behalten, sonst ersetzen)` });
    },
  });
  const entfernt = []; // [start, ende] bereits entfernte Bereiche
  const liegtIn = (a, b) => entfernt.some(([x, y]) => a >= x && b <= y);
  const entferne = (node) => {
    let a = node.start, b = node.end;
    // umgebenden Leerraum bis Zeilenanfang mitnehmen, wenn das Element allein in der Zeile steht
    const vor = quelle.lastIndexOf('\n', a - 1);
    const nach = quelle.indexOf('\n', b);
    if (/^\s*$/.test(quelle.slice(vor + 1, a)) && /^\s*$/.test(quelle.slice(b, nach < 0 ? quelle.length : nach))) { a = vor; b = nach < 0 ? quelle.length : nach; }
    s.remove(a, b);
    entfernt.push([a, b]);
  };
  const klassenName = (opening) => opening.attributes.find((a) => a.type === 'JSXAttribute' && a.name.name === 'className');
  const istIconElement = (c) => c.type === 'JSXElement' && (lucide.has(c.openingElement.name.name)
    || (/^[A-Z]/.test(c.openingElement.name.name ?? '') && c.openingElement.selfClosing && c.openingElement.attributes.every((a) => a.type === 'JSXAttribute' && /^(className|aria-hidden|strokeWidth|size)$/.test(a.name.name))));
  const nurIcons = (el) => el.children.length > 0 && el.children.every((c) => (c.type === 'JSXText' && !c.value.trim()) || istIconElement(c));

  // Gibt es schon eine Bindung „Icon“ (z. B. const Icon = item.icon), heißt das eigene Icon KernIcon.
  let iconName = 'Icon';
  traverse(ast, { Identifier(p) { if (p.node.name === 'Icon' && p.isBindingIdentifier() && !p.parentPath.isImportDefaultSpecifier()) iconName = 'KernIcon'; } });
  const eigenerImport = new RegExp(`import ${iconName} from '@/components/icons/Icon'`).test(quelle);

  // E: Zierelemente
  traverse(ast, {
    JSXElement(p) {
      const kn = klassenName(p.node.openingElement);
      const wert = kn?.value?.type === 'StringLiteral' ? kn.value.value : '';
      if (/(^|\s)ambient-glow/.test(wert) && p.node.children.every((c) => c.type === 'JSXText' && !c.value.trim())) { entferne(p.node); bericht.elemente_entfernt++; p.skip(); return; }
      if (/(^|\s)icon-chip(\s|$)/.test(wert)) {
        if (nurIcons(p.node)) { entferne(p.node); bericht.elemente_entfernt++; p.skip(); }
        else bericht.zu_pruefen.push({ zeile: p.node.loc.start.line, grund: 'icon-chip mit weiterem Inhalt – Kachel von Hand auflösen' });
      }
    },
  });

  // I: Icon-Elemente
  const genutzteAlsDaten = new Set();
  let iconGenutzt = false;
  traverse(ast, {
    JSXElement(p) {
      const op = p.node.openingElement;
      const name = op.name.type === 'JSXIdentifier' ? op.name.name : null;
      if (!name || !lucide.has(name) || liegtIn(p.node.start, p.node.end)) return;
      const ziel = ZUORDNUNG[lucide.get(name)];
      if (ziel === undefined) { bericht.zu_pruefen.push({ zeile: op.loc.start.line, grund: `lucide-Icon ${lucide.get(name)} ohne Zuordnung` }); genutzteAlsDaten.add(name); return; }
      if (ziel === null) {
        if (p.parentPath.isJSXElement() || p.parentPath.isJSXFragment()) entferne(p.node);
        else { s.overwrite(p.node.start, p.node.end, 'null'); entfernt.push([p.node.start, p.node.end]); }
        bericht.icons_entfallen++;
        return;
      }
      const kn = klassenName(op);
      if (kn && kn.value?.type !== 'StringLiteral') { genutzteAlsDaten.add(name); bericht.zu_pruefen.push({ zeile: op.loc.start.line, grund: `Icon ${name} mit berechneter Klasse – über ersatz eingebunden` }); return; }
      const klassen = kn ? kn.value.value : '';
      const g = /(?:^|\s)(?:size|w|h)-(\d+(?:\.\d+)?)(?=\s|$)/.exec(klassen);
      const n = g ? Number(g[1]) : 5;
      const groesse = n <= 4 ? 4 : n <= 5 ? 5 : 6;
      if (n > 6) bericht.zu_pruefen.push({ zeile: op.loc.start.line, grund: `Icon ${name} war ${n * 4}px groß – auf 24px begrenzt` });
      const rest = bildeKlassen(klassen.split(/\s+/).filter((k) => k && !/^(?:size|w|h)-/.test(k) && !/^fill-/.test(k)).join(' '), { icon: true }).text;
      const label = op.attributes.find((a) => a.type === 'JSXAttribute' && /^(aria-label|title)$/.test(a.name.name) && a.value);
      const labelText = !label ? '' : label.value.type === 'StringLiteral' ? ` label="${label.value.value}"` : ` label=${quelle.slice(label.value.start, label.value.end)}`;
      const neu = `<${iconName} name="${ziel}" groesse={${groesse}}${rest ? ` className="${rest}"` : ''}${labelText} />`;
      s.overwrite(p.node.start, p.node.end, neu);
      entfernt.push([p.node.start, p.node.end]);
      iconGenutzt = true;
      bericht.icons++;
      p.skip();
    },
    Identifier(p) {
      if (!lucide.has(p.node.name)) return;
      if (p.parentPath.isImportSpecifier()) return;
      if (liegtIn(p.node.start, p.node.end)) return;
      genutzteAlsDaten.add(p.node.name);
    },
    JSXIdentifier(p) {
      if (!lucide.has(p.node.name) || liegtIn(p.node.start, p.node.end)) return;
      if (p.parentPath.isJSXClosingElement() || p.parentPath.isJSXOpeningElement()) genutzteAlsDaten.add(p.node.name);
    },
  });

  // K: Klassenlisten (String-Literale in className, auch in Ausdrücken)
  traverse(ast, {
    JSXAttribute(p) {
      if (p.node.name.name !== 'className' || liegtIn(p.node.start, p.node.end)) return;
      const el = p.parentPath.node; // JSXOpeningElement
      const tag = el.name?.name ?? '';
      const ueberschrift = /^h[1-3]$/.test(tag);
      const kontext = { ueberschrift, ueberschriftStufe: tag === 'h1' ? 7 : tag === 'h2' ? 6 : undefined, icon: lucide.has(tag) };
      const ersetze = (node, roh, mitAnfuehrung) => {
        const r = bildeKlassen(roh, kontext);
        if (r.text !== roh.trim().split(/\s+/).join(' ')) {
          bericht.klassen++;
          const innen = node.type === 'TemplateElement'
            ? (r.text ? (/^\s/.test(roh) ? ' ' : '') + r.text + (/\s$/.test(roh) ? ' ' : '') : (/\s/.test(roh) ? ' ' : ''))
            : r.text;
          if (mitAnfuehrung && !innen && node === p.node.value) { const vor = quelle.slice(0, p.node.start).match(/\s*$/)[0].length; s.remove(p.node.start - vor, p.node.end); }
          else if (mitAnfuehrung) s.overwrite(node.start, node.end, `"${innen}"`);
          else s.overwrite(node.start, node.end, innen);
        }
        for (const h of r.hinweise) bericht.zu_pruefen.push({ zeile: node.loc.start.line, grund: h });
      };
      const v = p.node.value;
      if (!v) return;
      if (v.type === 'StringLiteral') return ersetze(v, v.value, true);
      p.traverse({
        StringLiteral(q) { if (!q.parentPath.isImportDeclaration()) ersetze(q.node, q.node.value, true); },
        TemplateElement(q) { if (q.node.value.raw.trim()) ersetze(q.node, q.node.value.raw, false); },
      });
    },
  });

  // Importe
  if (lucideImport) {
    const daten = [...genutzteAlsDaten].filter((n) => lucide.has(n));
    bericht.icons_daten = daten.map((n) => `${n}→${ZUORDNUNG[lucide.get(n)] ?? '∅'}`);
    const zeilen = [];
    if (iconGenutzt && !eigenerImport) zeilen.push(`import ${iconName} from '@/components/icons/Icon';`);
    if (daten.length) zeilen.push(`import { ${daten.map((n) => (lucide.get(n) === n ? n : `${lucide.get(n)} as ${n}`)).join(', ')} } from '@/components/icons/ersatz';`);
    for (const t of typen) zeilen.push(`type ${t} = import('react').ComponentType<{ className?: string; 'aria-label'?: string }>;`);
    s.overwrite(lucideImport.start, lucideImport.end, zeilen.join('\n'));
  }

  let ergebnis = s.toString();
  try {
    const ast2 = parse(ergebnis, PARSER);
    const s2 = new MagicString(ergebnis);
    let geaendert = false;
    traverse(ast2, {
      VariableDeclarator(p) {
        const init = p.node.init;
        if (p.node.id.type !== 'Identifier' || init?.type !== 'MemberExpression' || init.property?.name !== 'icon') return;
        const b = p.scope.getBinding(p.node.id.name);
        if (b && !b.referenced && p.parentPath.node.declarations.length === 1) {
          const st = p.parentPath.node;
          const vor = ergebnis.lastIndexOf('\n', st.start - 1);
          s2.remove(vor, st.end);
          geaendert = true;
          bericht.zu_pruefen.push({ zeile: st.loc.start.line, grund: `ungenutzte Icon-Variable ${p.node.id.name} entfernt (Datenfeld icon bleibt)` });
        }
      },
    });
    if (geaendert) ergebnis = s2.toString();
  } catch { /* Prüfung unten meldet Parsefehler */ }
  // Sicherung: Text-Fingerabdruck unverändert
  let nachher;
  try { nachher = parse(ergebnis, PARSER); } catch (e) { return { ergebnis: null, entwurf: ergebnis, bericht: { ...bericht, fehler: `Ergebnis nicht parsebar: ${e.message}` } }; }
  const iconSet = new Set(['Icon', 'KernIcon', iconName, ...lucide.keys()]);
  const a = fingerabdruck(ast, iconSet), b = fingerabdruck(nachher, iconSet);
  const fehlend = a.filter((x) => !b.includes(x)), neu = b.filter((x) => !a.includes(x));
  if (fehlend.length || neu.length) return { ergebnis: null, bericht: { ...bericht, fehler: 'Text-Fingerabdruck geändert – nicht geschrieben', fehlend: fehlend.slice(0, 10), neu: neu.slice(0, 10) } };
  bericht.geaendert = ergebnis !== quelle;
  return { ergebnis, bericht };
}

// ---------- Ersatzmodul ----------
function schreibeErsatz() {
  const namen = Object.keys(ZUORDNUNG).sort();
  for (const n of namen) if (ZUORDNUNG[n] && !ICON_NAMEN.has(ZUORDNUNG[n])) throw new Error(`Zuordnung ${n} → ${ZUORDNUNG[n]} hat kein Icon in svg/`);
  const kopf = `// Erzeugt von _werkstatt/werkzeuge/umbau.mjs --ersatz – nicht von Hand ändern.
// Übergang für Icons, die als Daten weitergereicht werden ({ icon: Phone }): gleiche Namen wie bisher,
// Darstellung aus der eigenen Familie (zuordnung.ts); „entfällt“ rendert nichts. Größe aus w-/h-/size-Klasse.
import Icon from './Icon';
import type { IconName } from './namen';

type ErsatzProps = { className?: string; 'aria-label'?: string };

function mach(name: IconName | null) {
  function ErsatzIcon({ className = '', 'aria-label': label }: ErsatzProps) {
    if (!name) return null;
    const m = /(?:^|\\s)(?:size|w|h)-(\\d+(?:\\.\\d+)?)(?=\\s|$)/.exec(className);
    const n = m ? Number(m[1]) : 5;
    const rest = className.split(/\\s+/).filter((k) => k && !/^(?:size|w|h)-/.test(k)).join(' ');
    return <Icon name={name} groesse={n <= 4 ? 4 : n <= 5 ? 5 : 6} className={rest || undefined} label={label} />;
  }
  return ErsatzIcon;
}
`;
  const zeilen = namen.map((n) => `export const ${n} = mach(${ZUORDNUNG[n] ? `'${ZUORDNUNG[n]}'` : 'null'});`);
  const ziel = path.join(REPO, 'src/components/icons/ersatz.tsx');
  fs.writeFileSync(ziel, `${kopf}\n${zeilen.join('\n')}\n`);
  console.log(`${namen.length} Ersatznamen → ${path.relative(REPO, ziel)}`);
}

// ---------- CLI ----------
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const args = process.argv.slice(2);
  if (args.includes('--ersatz')) { schreibeErsatz(); process.exit(0); }
  const wert = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
  const dateien = (wert('--dateien') || '').split(',').filter(Boolean).map((d) => path.resolve(REPO, d));
  if (!dateien.length) { console.error('Nutzung: node umbau.mjs --dateien a.jsx,b.tsx [--schreiben] [--ziel DIR] | --ersatz'); process.exit(2); }
  const schreiben = args.includes('--schreiben');
  const ziel = ensureDir(path.resolve(wert('--ziel') || path.join(REPO, '_werkstatt/cache/umbau')));
  const berichte = [];
  let fehler = 0;
  for (const d of dateien) {
    const quelle = fs.readFileSync(d, 'utf8');
    const { ergebnis, bericht } = baueUm(path.relative(REPO, d), quelle);
    berichte.push(bericht);
    if (!ergebnis) { fehler++; console.log(`✗ ${bericht.datei}: ${bericht.fehler}`); continue; }
    if (schreiben && bericht.geaendert) fs.writeFileSync(d, ergebnis);
    console.log(`${bericht.geaendert ? (schreiben ? '✔' : '~') : '='} ${bericht.datei}: Icons ${bericht.icons} (entfallen ${bericht.icons_entfallen}, Daten ${bericht.icons_daten.length}) · Klassenlisten ${bericht.klassen} · Elemente entfernt ${bericht.elemente_entfernt} · zu prüfen ${bericht.zu_pruefen.length}`);
  }
  const datei = path.join(ziel, `umbau-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(datei, JSON.stringify({ schreiben, dateien: berichte }, null, 1));
  console.log(`Bericht: ${path.relative(process.cwd(), datei)}`);
  process.exit(fehler ? 1 : 0);
}
