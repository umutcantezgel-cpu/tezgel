'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    ArrowLeft,
    Check,
    CheckCircle2,
    ClipboardList,
    Info,
    Lock,
    MessageCircle,
    Phone,
    Ruler,
    Send,
    Sparkles
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const STEPS = [
    { title: 'Raum & Einsatzbereich', text: 'Wo soll gefliest werden? Mehrfachauswahl ist möglich.' },
    { title: 'Untergrund & Bestand', text: 'Worauf wird verlegt? „Unbekannt“ ist eine gute Antwort – wir prüfen das vor Ort.' },
    { title: 'Format, Material & Menge', text: 'Format, Material, Verlegemuster und Fläche bzw. Stufenmaße.' },
    { title: 'Zusammenfassung & Kontakt', text: 'Prüfen Sie die Angaben und senden Sie die Anfrage per WhatsApp oder E-Mail.' }
];

const ROOM_OPTIONS = [
    { id: 'wohnen', title: 'Wohn- & Essbereich', desc: 'Böden in Wohnräumen und offenen Grundrissen' },
    { id: 'kueche', title: 'Küche', desc: 'Küchenboden und Küchenrückwand' },
    { id: 'flur', title: 'Flur & Diele', desc: 'Eingang, Diele, Garderobe' },
    { id: 'treppe', title: 'Treppe', desc: 'Innen- oder Außentreppe, Tritt- und Setzstufen' },
    { id: 'balkon', title: 'Balkon & Terrasse', desc: 'Frostsichere Außenbeläge' },
    { id: 'untergrund', title: 'Nur Untergrund / Abdichtung', desc: 'Ausgleich, Entkopplung, Abdichtung' },
    { id: 'bad', title: 'Bad, Dusche, Gäste-WC', desc: 'Dafür gibt es eigene Planungswerkzeuge' }
];

const SUBSTRATE_OPTIONS = [
    { id: 'zement', label: 'Neuer Zementestrich' },
    { id: 'calciumsulfat', label: 'Neuer Calciumsulfatestrich' },
    { id: 'heizestrich', label: 'Heizestrich (mit Fußbodenheizung)' },
    { id: 'altfliesen', label: 'Alte Fliesen vorhanden' },
    { id: 'holz', label: 'Holzdielen / Holzwerkstoffplatten' },
    { id: 'beton', label: 'Betondecke / Balkonplatte' },
    { id: 'unbekannt', label: 'Unbekannt – bitte prüfen' }
];

const YES_NO_UNSURE = [
    { id: 'ja', label: 'Ja' },
    { id: 'nein', label: 'Nein' },
    { id: 'unklar', label: 'Weiß nicht' }
];

const YES_NO = [
    { id: 'ja', label: 'Ja' },
    { id: 'nein', label: 'Nein' }
];

const FORMAT_OPTIONS = [
    { id: 'standard', title: 'Standardformat', desc: 'bis ca. 60 cm Kantenlänge' },
    { id: 'gross', title: 'Großformat', desc: 'z. B. 60 × 120 cm' },
    { id: 'xxl', title: 'XXL-Format', desc: 'ab 120 × 120 cm, bis 120 × 278 cm' },
    { id: 'dielen', title: 'Dielenformat', desc: 'lange, schmale Formate, z. B. Holzoptik' },
    { id: 'offen', title: 'Noch offen', desc: 'Wir beraten Sie gern' }
];

const MATERIAL_OPTIONS = [
    { id: 'feinsteinzeug', label: 'Feinsteinzeug / Keramik' },
    { id: 'holzoptik', label: 'Feinsteinzeug in Holzoptik' },
    { id: 'naturstein-silikat', label: 'Granit, Schiefer, Quarzit' },
    { id: 'naturstein-kalk', label: 'Marmor, Travertin, Kalkstein' },
    { id: 'aussen2cm', label: '2-cm-Außenplatten' },
    { id: 'offen', label: 'Noch offen' }
];

// Cutting allowance guide values (share of the net area) per laying pattern.
const PATTERN_OPTIONS = [
    { id: 'kreuzfuge', label: 'Kreuzfuge', min: 5, max: 10 },
    { id: 'verband', label: 'Halb- / Drittelverband', min: 5, max: 10 },
    { id: 'wild', label: 'Wilder Verband', min: 5, max: 10 },
    { id: 'diagonal', label: 'Diagonal', min: 10, max: 15 },
    { id: 'fischgraet', label: 'Fischgrät', min: 10, max: 15 },
    { id: 'offen', label: 'Noch offen', min: 5, max: 15 }
];

const STAIR_TYPE_OPTIONS = [
    { id: 'massiv', label: 'Massivtreppe mit Belag', desc: 'Beton- oder Massivtreppe, die mit Fliesen oder Naturstein belegt wird' },
    { id: 'blockstufen', label: 'Blockstufen', desc: 'Massive Stufen, meist außen, auf Fundament bzw. Mörtelbett versetzt' },
    { id: 'unbekannt', label: 'Unklar', desc: 'Wir sehen uns die Treppe vor Ort an' }
];

const STAIR_COVERING_OPTIONS = [
    { id: 'fliese', label: 'Fliese / Feinsteinzeug' },
    { id: 'naturstein', label: 'Naturstein' },
    { id: 'offen', label: 'Noch offen' }
];

const TIMING_OPTIONS = ['Schnellstmöglich', 'In 1 – 3 Monaten', 'In mehr als 3 Monaten / flexibel'];

// Rooms that are measured in m² (everything except the stair).
const AREA_ROOMS = ['wohnen', 'kueche', 'flur', 'balkon', 'untergrund', 'bad'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const labelOf = (list, id) => list.find((o) => o.id === id)?.label ?? list.find((o) => o.id === id)?.title ?? id;

const parseNumber = (value) => {
    if (value === '' || value === null || value === undefined) return NaN;
    const n = Number(String(value).replace(',', '.').trim());
    return Number.isFinite(n) ? n : NaN;
};

const parseCount = (value) => {
    const n = parseNumber(value);
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : NaN;
};

// German number formatting without locale APIs (keeps SSR and client identical).
const fmt = (n, digits = 1) => {
    const fixed = (Math.round(n * 10 ** digits) / 10 ** digits).toFixed(digits);
    const [int, dec] = fixed.split('.');
    const withDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return dec && Number(dec) !== 0 ? `${withDots},${dec}` : withDots;
};

const toggleInList = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all';

const cardOptionClass = (selected) =>
    `p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
        selected
            ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20'
            : 'border-slate-200 bg-white hover:border-emerald-500/80 hover:-translate-y-0.5'
    }`;

const chipOptionClass = (selected) =>
    `px-3 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
        selected
            ? 'bg-emerald-50 text-emerald-800 border-emerald-600 ring-2 ring-emerald-600/20'
            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500/80'
    }`;

const legendClass = 'block text-xs font-black text-slate-800 mb-2';
const labelClass = 'block text-xs font-bold text-slate-800 mb-1';
const linkClass = 'font-bold text-emerald-800 hover:text-emerald-700 underline underline-offset-2';

// ---------------------------------------------------------------------------
// Calculations
// ---------------------------------------------------------------------------

function calculateArea(data) {
    const hasArea = data.rooms.some((r) => AREA_ROOMS.includes(r));
    if (!hasArea) return null;
    const net = parseNumber(data.area);
    const pattern = PATTERN_OPTIONS.find((p) => p.id === data.pattern) ?? PATTERN_OPTIONS[PATTERN_OPTIONS.length - 1];
    const skirting = parseNumber(data.skirting);
    if (!Number.isFinite(net) || net <= 0) {
        return { valid: false, pattern, skirting: Number.isFinite(skirting) && skirting > 0 ? skirting : null };
    }
    return {
        valid: true,
        net,
        pattern,
        low: net * (1 + pattern.min / 100),
        high: net * (1 + pattern.max / 100),
        skirting: Number.isFinite(skirting) && skirting > 0 ? skirting : null
    };
}

function calculateStairs(data) {
    if (!data.rooms.includes('treppe')) return null;
    const rises = parseCount(data.stairRises);
    const defaultRisers = Number.isFinite(rises) ? rises : NaN;
    const defaultTreads = Number.isFinite(rises) ? Math.max(rises - 1, 0) : NaN;
    const risers = data.risersCount !== '' ? parseCount(data.risersCount) : defaultRisers;
    const treads = data.treadsCount !== '' ? parseCount(data.treadsCount) : defaultTreads;
    const width = parseNumber(data.stairWidth);
    const depth = parseNumber(data.treadDepth);
    const height = parseNumber(data.riserHeight);
    const withRisers = data.risersOn === 'ja' && data.stairType !== 'blockstufen';

    const base = { rises, risers, treads, withRisers };

    if (data.stairType === 'blockstufen') {
        return { ...base, valid: false, reason: 'Blockstufen werden als Einzelstücke nach Stufenmaß geplant – eine m²-Menge ist hier nicht sinnvoll.' };
    }
    if (data.stairShape === 'gewendelt') {
        return { ...base, valid: false, reason: 'Bei gewendelten Treppen hat jede Stufe eine andere Form – die Menge wird beim Aufmaß ermittelt.' };
    }
    const dimsOk =
        Number.isFinite(treads) &&
        Number.isFinite(width) && width > 0 &&
        Number.isFinite(depth) && depth > 0 &&
        (!withRisers || (Number.isFinite(risers) && Number.isFinite(height) && height > 0));
    if (!Number.isFinite(rises) || rises <= 0 || !dimsOk) {
        return { ...base, valid: false, reason: 'Für eine Mengenangabe fehlen noch Stufenanzahl oder Maße.' };
    }
    const treadArea = (treads * width * depth) / 10000;
    const riserArea = withRisers ? (risers * width * height) / 10000 : 0;
    return { ...base, valid: true, treadArea, riserArea, total: treadArea + riserArea };
}

function buildChecklist(data) {
    const items = [];
    const add = (text, href, label) => items.push({ text, href, label });
    const has = (id) => data.rooms.includes(id);
    const sub = (id) => data.substrates.includes(id);
    const onlyStairs = data.rooms.length === 1 && has('treppe');

    if (!onlyStairs && (data.format === 'xxl' || data.format === 'gross')) {
        add('Große Formate brauchen einen besonders ebenen Untergrund – ggf. vorher ausgleichen.', '/untergrund-abdichtung/ausgleich-gefaelle', 'Ausgleich & Gefälle');
        add('Große Formate werden möglichst vollflächig und hohlraumarm eingebettet.', '/fliesen/grossformat', 'XXL-Großformate');
    }
    if (!onlyStairs && data.pattern === 'verband' && ['gross', 'xxl', 'dielen'].includes(data.format)) {
        add('Bei langen Formaten wird meist ein Versatz von höchstens einem Drittel empfohlen, weil die Fliesen leicht gewölbt sein können.', '/fliesen/verlegemuster', 'Verlegemuster & Abschlüsse');
    }
    if (data.floorHeating === 'ja' || sub('heizestrich')) {
        add('Fußbodenheizung: Aufheizprotokoll und Belegreife des Estrichs müssen vor dem Verlegen vorliegen.', '/fliesen/auf-fussbodenheizung', 'Fliesen auf Fußbodenheizung');
    }
    if (sub('zement') || sub('calciumsulfat') || sub('heizestrich')) {
        add('Neuer Estrich: Restfeuchte per CM-Messung prüfen – verlegt wird erst bei Belegreife.', '/untergrund-abdichtung/estrich-belegreife', 'Estrich & Belegreife');
    }
    if (sub('holz')) {
        add('Holzuntergrund: Tragfähigkeit und Durchbiegung prüfen, meist ist eine Entkopplung nötig.', '/untergrund-abdichtung/entkopplung', 'Entkopplung & Holzuntergründe');
    }
    if (sub('altfliesen')) {
        add('Alte Fliesen: Haftung und Aufbauhöhe prüfen – überfliesen oder zurückbauen.', '/untergrund-abdichtung/fliesen-auf-fliesen', 'Fliesen auf Fliesen');
    }
    if (data.wetArea === 'ja') {
        add('Nassbereich: Verbundabdichtung nach DIN 18534 unter dem Fliesenbelag einplanen.', '/untergrund-abdichtung/din-18534', 'Abdichtung nach DIN 18534');
    }
    if (has('balkon')) {
        add('Balkon/Terrasse: Aufbau wählen (verklebt, Splitt-/Kiesbett oder Stelzlager).', '/balkon-terrasse', 'Balkon & Terrasse');
        add('Abdichtung, Gefälle und Randabschluss gehören zur Planung dazu.', '/balkon-terrasse/balkonsanierung', 'Balkonsanierung');
        if (data.material === 'holzoptik') {
            add('Holzoptik im Außenbereich nur in frostbeständiger Qualität; 2-cm-Platten für Stelzlager oder Splittbett, verklebt geht auch normale Stärke.', '/fliesen/holzoptik', 'Fliesen in Holzoptik');
        }
    }
    if (data.material === 'aussen2cm') {
        add('2-cm-Platten: Stärke, Oberfläche und Rutschhemmung passend zum Aufbau wählen.', '/balkon-terrasse/terrassenplatten', 'Terrassenplatten');
    }
    if (data.material === 'naturstein-kalk') {
        add('Marmor, Travertin, Kalkstein: verfärbungsfreien Natursteinkleber verwenden.', '/naturstein/marmor-kalkstein', 'Marmor, Travertin & Kalkstein');
    }
    if (data.material === 'naturstein-silikat') {
        add('Granit, Schiefer, Quarzit: natursteingeeigneten Kleber wählen; kalibriert oder unkalibriert klären.', '/naturstein/granit', 'Granit, Schiefer & Quarzit');
    }
    if (has('treppe')) {
        add('Treppe: gleichmäßige Steigungshöhen sind für die Trittsicherheit entscheidend.', '/treppen', 'Treppen neu belegen');
        if (data.stairLocation === 'aussen') {
            add('Außentreppe: frostsicherer Aufbau, Gefälle und rutschhemmende Oberfläche einplanen.', '/treppen/aussentreppe', 'Außentreppe & Eingang');
        } else {
            add('Stufenkanten sauber ausbilden – z. B. mit Gehrungskante oder Kantenprofil.', '/treppen/innentreppe', 'Innentreppe fliesen');
        }
    }
    return items;
}

function buildSummaryLines(data) {
    const lines = [];
    const rooms = data.rooms.map((id) => labelOf(ROOM_OPTIONS, id)).join(', ');
    lines.push(['Bereich', rooms || 'Nicht angegeben']);
    lines.push(['Untergrund', data.substrates.length ? data.substrates.map((id) => labelOf(SUBSTRATE_OPTIONS, id)).join(', ') : 'Nicht angegeben']);
    lines.push(['Fußbodenheizung', labelOf(YES_NO_UNSURE, data.floorHeating)]);
    lines.push(['Rückbau Altbelag', labelOf(YES_NO_UNSURE, data.removal)]);
    lines.push(['Nassbereich', labelOf(YES_NO, data.wetArea)]);
    const hasArea = data.rooms.some((r) => AREA_ROOMS.includes(r));
    if (hasArea) {
        lines.push(['Format', labelOf(FORMAT_OPTIONS, data.format)]);
        lines.push(['Material', labelOf(MATERIAL_OPTIONS, data.material)]);
        lines.push(['Verlegemuster', labelOf(PATTERN_OPTIONS, data.pattern)]);
    }
    if (data.rooms.includes('treppe')) {
        const type = labelOf(STAIR_TYPE_OPTIONS, data.stairType);
        lines.push([
            'Treppe',
            `${data.stairLocation === 'aussen' ? 'außen' : 'innen'}, ${data.stairShape === 'gewendelt' ? 'gewendelt' : 'gerade'}, Bauart: ${type}`
        ]);
        if (data.stairType !== 'blockstufen') {
            lines.push(['Treppenbelag', labelOf(STAIR_COVERING_OPTIONS, data.stairCovering)]);
        }
        const stairs = calculateStairs(data);
        if (Number.isFinite(stairs.rises) && stairs.rises > 0) {
            const parts = [`${stairs.rises} Steigungen`];
            if (Number.isFinite(stairs.treads)) parts.push(`${stairs.treads} Trittstufen`);
            if (stairs.withRisers && Number.isFinite(stairs.risers)) parts.push(`${stairs.risers} Setzstufen belegen`);
            if (!stairs.withRisers && data.stairType !== 'blockstufen') parts.push('Setzstufen nicht belegen');
            lines.push(['Stufen', parts.join(', ')]);
        }
        const dims = [];
        if (data.stairWidth) dims.push(`Laufbreite ${data.stairWidth} cm`);
        if (data.treadDepth) dims.push(`Auftritt inkl. Überstand ${data.treadDepth} cm`);
        if (data.riserHeight) dims.push(`Steigungshöhe ${data.riserHeight} cm`);
        if (dims.length) lines.push(['Stufenmaße', dims.join(', ')]);
        lines.push(['Treppensockel', labelOf(YES_NO, data.stairSkirting)]);
    }
    return lines;
}

function buildQuantityLines(data) {
    const lines = [];
    const area = calculateArea(data);
    if (area) {
        if (area.valid) {
            lines.push(
                `Fläche: ${fmt(area.net)} m² netto; Richtwert inkl. Verschnitt (${area.pattern.min}–${area.pattern.max} %): ca. ${fmt(area.low)}–${fmt(area.high)} m²`
            );
        } else {
            lines.push('Fläche: noch keine m²-Angabe');
        }
        if (area.skirting) lines.push(`Sockel: ca. ${fmt(area.skirting)} lfm (separat)`);
    }
    const stairs = calculateStairs(data);
    if (stairs) {
        if (stairs.valid) {
            const riserPart = stairs.withRisers ? ` + Setzstufen ${fmt(stairs.riserArea, 2)} m²` : '';
            lines.push(
                `Treppe netto: Trittstufen ${fmt(stairs.treadArea, 2)} m²${riserPart} = ${fmt(stairs.total, 2)} m² (ohne Verschnitt)`
            );
        } else {
            lines.push(`Treppe: Menge beim Aufmaß (${stairs.reason})`);
        }
    }
    return lines;
}

// ---------------------------------------------------------------------------
// Presentational pieces
// ---------------------------------------------------------------------------

function OptionGroup({ legend, options, value, onChange, multi = false, columns = 'grid-cols-2 sm:grid-cols-3', hint }) {
    return (
        <fieldset>
            <legend className={legendClass}>{legend}</legend>
            {hint && <p className="text-xs text-slate-600 -mt-1 mb-2">{hint}</p>}
            <div className={`grid ${columns} gap-2`}>
                {options.map((o) => {
                    const selected = multi ? value.includes(o.id) : value === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(o.id)}
                            className={chipOptionClass(selected)}
                        >
                            {o.label ?? o.title}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

function ResultSummary({ data }) {
    const summary = buildSummaryLines(data);
    const area = calculateArea(data);
    const stairs = calculateStairs(data);
    const checklist = buildChecklist(data);

    return (
        <div className="space-y-4 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                    <ClipboardList className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    Ihr Projekt in Kürze
                </h4>
                <dl className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-sm">
                    {summary.map(([k, v]) => (
                        <React.Fragment key={k}>
                            <dt className="font-bold text-slate-800">{k}</dt>
                            <dd className="text-slate-700 mb-1 sm:mb-0">{v}</dd>
                        </React.Fragment>
                    ))}
                </dl>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                    <Ruler className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    Materialbedarf (Richtwert)
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                    {area && area.valid && (
                        <li>
                            <strong className="text-slate-900">Fläche:</strong> {fmt(area.net)} m² netto. Mit einem Verschnitt von
                            ca. {area.pattern.min}–{area.pattern.max} % ({area.pattern.label}) ergibt sich ein Richtwert von{' '}
                            <strong className="text-emerald-800 tabular-nums">ca. {fmt(area.low)}–{fmt(area.high)} m²</strong>.
                        </li>
                    )}
                    {area && !area.valid && (
                        <li>
                            <strong className="text-slate-900">Fläche:</strong> Noch keine m²-Angabe – die Fläche wird beim Aufmaß ermittelt.
                        </li>
                    )}
                    {area && area.skirting && (
                        <li>
                            <strong className="text-slate-900">Sockel:</strong> ca. {fmt(area.skirting)} laufende Meter (separat, ohne Zuschlag).
                        </li>
                    )}
                    {stairs && stairs.valid && (
                        <li>
                            <strong className="text-slate-900">Treppe (netto):</strong> Trittstufen {fmt(stairs.treadArea, 2)} m²
                            {stairs.withRisers && <> + Setzstufen {fmt(stairs.riserArea, 2)} m²</>} ={' '}
                            <strong className="text-emerald-800 tabular-nums">{fmt(stairs.total, 2)} m²</strong>. Bei Treppen nennen wir
                            bewusst keinen Verschnittzuschlag, weil er stark von Format und Stufenmaß abhängt.
                        </li>
                    )}
                    {stairs && !stairs.valid && (
                        <li>
                            <strong className="text-slate-900">Treppe:</strong> {stairs.reason}
                        </li>
                    )}
                </ul>
                <p className="mt-3 text-xs text-slate-700 leading-relaxed">
                    Alle Mengen sind reine Orientierungswerte. Die tatsächliche Menge ermittelt {COMPANY_DATA.owner.fullName} beim
                    kostenfreien Vor-Ort-Aufmaß – dort werden auch Treppensockel, Anschlüsse und Zuschnitte festgelegt.
                </p>
            </div>

            {checklist.length > 0 && (
                <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                        <Info className="w-4 h-4 text-sky-600" aria-hidden="true" />
                        Das prüfen wir vorab
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                        {checklist.map((item) => (
                            <li key={item.text} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                                <span>
                                    {item.text}{' '}
                                    <Link href={item.href} className={linkClass}>
                                        {item.label}
                                    </Link>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const KNOWN_ROOMS = ROOM_OPTIONS.map((r) => r.id);

/**
 * Fliesen-Konfigurator. All props are optional presets:
 * area ('kueche' | 'flur' | … or an array of room ids), substrate ('altfliesen' | …),
 * format ('xxl' | …), material ('holzoptik' | …), floorHeating (boolean).
 */
export default function FliesenKonfigurator({ area, substrate, format, material, floorHeating } = {}) {
    const [step, setStep] = useState(1);
    const [sentVia, setSentVia] = useState(null);
    const headingRef = useRef(null);

    const [data, setData] = useState(() => {
        const presetRooms = (Array.isArray(area) ? area : area ? [area] : []).filter((r) => KNOWN_ROOMS.includes(r));
        const presetSubstrates = (Array.isArray(substrate) ? substrate : substrate ? [substrate] : []).filter((s) =>
            SUBSTRATE_OPTIONS.some((o) => o.id === s)
        );
        const presetMaterial = MATERIAL_OPTIONS.some((o) => o.id === material) ? material : 'offen';
        const presetFormat = FORMAT_OPTIONS.some((o) => o.id === format)
            ? format
            : presetMaterial === 'holzoptik'
                ? 'dielen'
                : 'offen';
        return {
            rooms: presetRooms,
            substrates: presetSubstrates,
            floorHeating: floorHeating === true ? 'ja' : floorHeating === false ? 'nein' : 'unklar',
            removal: presetSubstrates.includes('altfliesen') ? 'unklar' : 'nein',
            wetArea: 'nein',
            format: presetFormat,
            material: presetMaterial,
            pattern: presetMaterial === 'holzoptik' ? 'verband' : 'offen',
            area: '20',
            skirting: '',
            stairLocation: 'innen',
            stairShape: 'gerade',
            stairType: 'massiv',
            stairCovering: 'offen',
            stairRises: '',
            risersOn: 'ja',
            risersCount: '',
            treadsCount: '',
            stairWidth: '',
            treadDepth: '',
            riserHeight: '',
            stairSkirting: 'ja',
            name: '',
            phone: '',
            email: '',
            zipCity: '',
            timing: TIMING_OPTIONS[1],
            notes: '',
            privacyConsent: false
        };
    });

    const update = (patch) => setData((prev) => ({ ...prev, ...patch }));

    const hasAreaRooms = data.rooms.some((r) => AREA_ROOMS.includes(r));
    const hasStairs = data.rooms.includes('treppe');
    const areaCalc = calculateArea(data);
    const stairCalc = calculateStairs(data);
    const rises = parseCount(data.stairRises);

    const goToStep = (next) => {
        setStep(next);
        requestAnimationFrame(() => headingRef.current?.focus());
    };

    const buildMessage = () => {
        const summary = buildSummaryLines(data).map(([k, v]) => `${k}: ${v}`);
        const quantities = buildQuantityLines(data);
        return [
            'Hallo Herr Tezgel,',
            'ich habe mein Fliesenprojekt im Fliesen-Konfigurator vorbereitet:',
            '',
            ...summary,
            '',
            'Materialbedarf (Richtwert, unverbindlich):',
            ...quantities.map((q) => `- ${q}`),
            '',
            `Ort: ${data.zipCity || 'Nicht angegeben'}`,
            `Gewünschter Zeitraum: ${data.timing}`,
            '',
            `Name: ${data.name}`,
            `Telefon: ${data.phone}`,
            `E-Mail: ${data.email || 'Nicht angegeben'}`,
            ...(data.notes ? ['', `Notiz: ${data.notes}`] : []),
            '',
            'Bitte melden Sie sich wegen eines kostenfreien Vor-Ort-Aufmaßes. Vielen Dank!'
        ].join('\n');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const submitter = event.nativeEvent?.submitter;
        const channel = submitter?.value === 'email' ? 'email' : 'whatsapp';
        const message = buildMessage();

        if (channel === 'whatsapp') {
            const waUrl = `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        } else {
            const roomsText = data.rooms.map((id) => labelOf(ROOM_OPTIONS, id)).join(', ') || 'Fliesenprojekt';
            const subject = `Anfrage Fliesen-Konfigurator: ${roomsText}${data.zipCity ? ` (${data.zipCity})` : ''}`;
            window.location.assign(
                `mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
            );
        }
        setSentVia(channel);
    };

    // -----------------------------------------------------------------------
    // Success view
    // -----------------------------------------------------------------------
    if (sentVia) {
        return (
            <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 max-w-3xl mx-auto" role="status">
                <div className="text-center">
                    <div className="icon-chip w-16 h-16 rounded-full mx-auto mb-5">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="eyebrow mb-4">
                        {sentVia === 'whatsapp' ? 'WhatsApp wurde geöffnet' : 'E-Mail-Programm wurde geöffnet'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        {sentVia === 'whatsapp' ? 'WhatsApp' : 'E-Mail-Programm'} wurde geöffnet – bitte absenden
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                        Ihre Anfrage ist vorbereitet, aber noch nicht verschickt. Senden Sie die Nachricht in{' '}
                        {sentVia === 'whatsapp' ? 'WhatsApp' : 'Ihrem E-Mail-Programm'} ab. Fotos von Raum, Untergrund oder Treppe
                        können Sie gern per WhatsApp nachsenden. Auf dieser Website wird nichts gespeichert.
                    </p>
                </div>

                <ResultSummary data={data} />

                <p className="mt-6 text-sm text-slate-800 font-bold text-center">
                    Das verbindliche Festpreisangebot folgt nach dem kostenfreien Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName}.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                        <Phone className="w-4 h-4" />
                        Direkt anrufen: {COMPANY_DATA.contact.phone}
                    </a>
                    <button type="button" onClick={() => setSentVia(null)} className="btn-ghost w-full sm:w-auto text-xs">
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Anfrage
                    </button>
                </div>
            </div>
        );
    }

    // -----------------------------------------------------------------------
    // Stepper
    // -----------------------------------------------------------------------
    return (
        <div className="glass-bezel-outer max-w-4xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header */}
                <div className="ceramic-band p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="eyebrow">
                            <Sparkles className="w-3.5 h-3.5" />
                            Fliesen-Konfigurator
                        </span>
                        <ol className="flex items-center gap-2" aria-label="Fortschritt">
                            {STEPS.map((item, idx) => {
                                const s = idx + 1;
                                return (
                                    <li
                                        key={item.title}
                                        aria-current={step === s ? 'step' : undefined}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tabular-nums transition-all duration-300 ${
                                            step === s
                                                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/30'
                                                : step > s
                                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                                                    : 'bg-white text-slate-700 border border-slate-300'
                                        }`}
                                    >
                                        {step > s ? (
                                            <>
                                                <Check className="w-4 h-4" aria-hidden="true" />
                                                <span className="sr-only">Schritt {s}: {item.title} (erledigt)</span>
                                            </>
                                        ) : (
                                            <>
                                                <span aria-hidden="true">{s}</span>
                                                <span className="sr-only">Schritt {s}: {item.title}</span>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <p className="text-xs font-bold text-slate-700 tabular-nums">Schritt {step} von 4</p>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">Fliesenprojekt vorbereiten</h2>

                    {/* Live preview */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1" aria-live="polite">
                        <p className="text-xs font-bold text-slate-700">Materialbedarf inkl. Verschnitt (Richtwert):</p>
                        {!hasAreaRooms && !hasStairs && (
                            <p className="text-sm text-slate-700">Wählen Sie zuerst einen Bereich.</p>
                        )}
                        {areaCalc && areaCalc.valid && (
                            <p className="font-display text-lg font-black text-emerald-800 tabular-nums">
                                ca. {fmt(areaCalc.low)}–{fmt(areaCalc.high)} m²
                                <span className="ml-2 text-xs font-bold text-slate-700">aus {fmt(areaCalc.net)} m² netto</span>
                            </p>
                        )}
                        {areaCalc && !areaCalc.valid && (
                            <p className="text-sm text-slate-700">Fläche in Schritt 3 eingeben.</p>
                        )}
                        {stairCalc && (
                            <p className="text-sm text-slate-700">
                                <strong className="text-slate-900">Treppe:</strong>{' '}
                                {stairCalc.valid
                                    ? `${fmt(stairCalc.total, 2)} m² netto (ohne Verschnitt)`
                                    : 'Menge nach Stufenmaßen bzw. beim Aufmaß'}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-4" aria-hidden="true">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`h-2 rounded-full transition-all duration-500 ${s <= step ? 'bg-emerald-600' : 'bg-slate-200'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <div className="mb-6">
                        <h3 ref={headingRef} tabIndex={-1} className="text-base sm:text-lg font-black text-slate-900 focus:outline-none">
                            {step}. {STEPS[step - 1].title}
                        </h3>
                        <p className="text-sm text-slate-700 mt-1">{STEPS[step - 1].text}</p>
                    </div>

                    {/* Step 1: rooms */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <fieldset>
                                <legend className="sr-only">Raum und Einsatzbereich (Mehrfachauswahl)</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {ROOM_OPTIONS.map((r) => {
                                        const selected = data.rooms.includes(r.id);
                                        return (
                                            <button
                                                key={r.id}
                                                type="button"
                                                aria-pressed={selected}
                                                onClick={() => update({ rooms: toggleInList(data.rooms, r.id) })}
                                                className={cardOptionClass(selected)}
                                            >
                                                <span className="flex items-center justify-between gap-2">
                                                    <span className="block font-black text-slate-900 text-sm">{r.title}</span>
                                                    {selected && <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />}
                                                </span>
                                                <span className="block text-xs text-slate-600 mt-0.5">{r.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            {data.rooms.includes('bad') && (
                                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm text-slate-700">
                                    <p>
                                        Für Bad, Dusche und Gäste-WC gibt es eigene Werkzeuge: den{' '}
                                        <Link href="/bad/badplaner" className={linkClass}>Badplaner</Link> und den{' '}
                                        <Link href="/bad/budgetkalkulator" className={linkClass}>Budgetkalkulator</Link>. Sie können das Bad
                                        hier trotzdem mit angeben, etwa wenn es Teil eines größeren Projekts ist.
                                    </p>
                                </div>
                            )}

                            {data.rooms.length === 0 && (
                                <p id="konfigurator-step1-hint" className="text-xs text-slate-700">
                                    Bitte wählen Sie mindestens einen Bereich aus.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Step 2: substrate */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <OptionGroup
                                legend="Untergrund bzw. Bestand (Mehrfachauswahl):"
                                hint="Bei mehreren Räumen alles auswählen, was vorkommt."
                                options={SUBSTRATE_OPTIONS}
                                value={data.substrates}
                                multi
                                columns="grid-cols-1 sm:grid-cols-2"
                                onChange={(id) => {
                                    const substrates = toggleInList(data.substrates, id);
                                    const patch = { substrates };
                                    if (id === 'heizestrich' && substrates.includes('heizestrich')) patch.floorHeating = 'ja';
                                    update(patch);
                                }}
                            />
                            <OptionGroup
                                legend="Ist eine Fußbodenheizung vorhanden oder geplant?"
                                options={YES_NO_UNSURE}
                                value={data.floorHeating}
                                onChange={(id) => update({ floorHeating: id })}
                            />
                            <OptionGroup
                                legend="Muss ein Altbelag zurückgebaut werden?"
                                options={YES_NO_UNSURE}
                                value={data.removal}
                                onChange={(id) => update({ removal: id })}
                            />
                            <OptionGroup
                                legend="Liegt die Fläche in einem Nassbereich (z. B. Duschbereich, Hauswirtschaftsraum mit Bodenablauf)?"
                                options={YES_NO}
                                value={data.wetArea}
                                columns="grid-cols-2"
                                onChange={(id) => update({ wetArea: id })}
                            />
                        </div>
                    )}

                    {/* Step 3: format, material, quantity */}
                    {step === 3 && (
                        <div className="space-y-8">
                            {hasAreaRooms && (
                                <div className="space-y-6">
                                    <fieldset>
                                        <legend className={legendClass}>Fliesenformat:</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {FORMAT_OPTIONS.map((f) => (
                                                <button
                                                    key={f.id}
                                                    type="button"
                                                    aria-pressed={data.format === f.id}
                                                    onClick={() => update({ format: f.id })}
                                                    className={cardOptionClass(data.format === f.id)}
                                                >
                                                    <span className="block font-black text-slate-900 text-xs sm:text-sm">{f.title}</span>
                                                    <span className="block text-[11px] text-slate-600">{f.desc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <OptionGroup
                                        legend="Material bzw. Optik:"
                                        options={MATERIAL_OPTIONS}
                                        value={data.material}
                                        onChange={(id) => update({ material: id })}
                                    />

                                    <OptionGroup
                                        legend="Verlegemuster:"
                                        options={PATTERN_OPTIONS}
                                        value={data.pattern}
                                        onChange={(id) => update({ pattern: id })}
                                    />

                                    <fieldset className="space-y-3">
                                        <legend className={legendClass}>Menge (Fläche):</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="fk-area" className={labelClass}>
                                                    Zu belegende Fläche in m² (Boden und/oder Wand, netto)
                                                </label>
                                                <input
                                                    id="fk-area"
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="z. B. 24,5"
                                                    value={data.area}
                                                    onChange={(e) => update({ area: e.target.value })}
                                                    className={inputClass}
                                                    aria-describedby="fk-area-help"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="fk-skirting" className={labelClass}>
                                                    Sockel in laufenden Metern (optional)
                                                </label>
                                                <input
                                                    id="fk-skirting"
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="z. B. 18"
                                                    value={data.skirting}
                                                    onChange={(e) => update({ skirting: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="fk-area-range" className="sr-only">Fläche in m² per Schieberegler</label>
                                            <input
                                                id="fk-area-range"
                                                type="range"
                                                min="1"
                                                max="150"
                                                step="1"
                                                value={Math.min(Math.max(Math.round(parseNumber(data.area)) || 1, 1), 150)}
                                                onChange={(e) => update({ area: e.target.value })}
                                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                                            />
                                            <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1 tabular-nums" aria-hidden="true">
                                                <span>1 m²</span>
                                                <span>75 m²</span>
                                                <span>150 m²</span>
                                            </div>
                                        </div>
                                        <p id="fk-area-help" className="text-xs text-slate-600">
                                            Länge × Breite je Raum addieren; größere Flächen einfach eintippen. Treppen werden unten separat erfasst.
                                        </p>
                                    </fieldset>
                                </div>
                            )}

                            {hasStairs && (
                                <div className={`space-y-6 ${hasAreaRooms ? 'pt-6 border-t border-slate-200' : ''}`}>
                                    <h4 className="text-sm font-black text-slate-900">Treppe</h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <OptionGroup
                                            legend="Lage:"
                                            options={[{ id: 'innen', label: 'Innentreppe' }, { id: 'aussen', label: 'Außentreppe' }]}
                                            value={data.stairLocation}
                                            columns="grid-cols-2"
                                            onChange={(id) => update({ stairLocation: id })}
                                        />
                                        <OptionGroup
                                            legend="Treppenform:"
                                            options={[{ id: 'gerade', label: 'Gerade' }, { id: 'gewendelt', label: 'Gewendelt' }]}
                                            value={data.stairShape}
                                            columns="grid-cols-2"
                                            onChange={(id) => update({ stairShape: id })}
                                        />
                                    </div>

                                    <fieldset>
                                        <legend className={legendClass}>Bauart der Treppe:</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {STAIR_TYPE_OPTIONS.map((t) => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    aria-pressed={data.stairType === t.id}
                                                    onClick={() => update({ stairType: t.id })}
                                                    className={cardOptionClass(data.stairType === t.id)}
                                                >
                                                    <span className="block font-black text-slate-900 text-xs sm:text-sm">{t.label}</span>
                                                    <span className="block text-[11px] text-slate-600">{t.desc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </fieldset>

                                    {data.stairType !== 'blockstufen' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <OptionGroup
                                                legend="Belag:"
                                                options={STAIR_COVERING_OPTIONS}
                                                value={data.stairCovering}
                                                columns="grid-cols-1 sm:grid-cols-3"
                                                onChange={(id) => update({ stairCovering: id })}
                                            />
                                            <OptionGroup
                                                legend="Setzstufen (senkrechte Flächen) belegen?"
                                                options={YES_NO}
                                                value={data.risersOn}
                                                columns="grid-cols-2"
                                                onChange={(id) => update({ risersOn: id })}
                                            />
                                        </div>
                                    )}

                                    <fieldset className="space-y-4">
                                        <legend className={legendClass}>Stufen und Maße:</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="fk-rises" className={labelClass}>Anzahl Steigungen</label>
                                                <input
                                                    id="fk-rises"
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    inputMode="numeric"
                                                    placeholder="z. B. 14"
                                                    value={data.stairRises}
                                                    onChange={(e) => update({ stairRises: e.target.value })}
                                                    className={inputClass}
                                                    aria-describedby="fk-stairs-help"
                                                />
                                            </div>
                                            {data.stairType !== 'blockstufen' && data.risersOn === 'ja' && (
                                                <div>
                                                    <label htmlFor="fk-risers" className={labelClass}>Setzstufen zu belegen</label>
                                                    <input
                                                        id="fk-risers"
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        inputMode="numeric"
                                                        placeholder={Number.isFinite(rises) ? `${rises} (automatisch)` : 'automatisch'}
                                                        value={data.risersCount}
                                                        onChange={(e) => update({ risersCount: e.target.value })}
                                                        className={inputClass}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <label htmlFor="fk-treads" className={labelClass}>Trittstufen zu belegen</label>
                                                <input
                                                    id="fk-treads"
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    inputMode="numeric"
                                                    placeholder={Number.isFinite(rises) ? `${Math.max(rises - 1, 0)} (automatisch)` : 'automatisch'}
                                                    value={data.treadsCount}
                                                    onChange={(e) => update({ treadsCount: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="fk-width" className={labelClass}>Laufbreite (cm)</label>
                                                <input
                                                    id="fk-width"
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="z. B. 100"
                                                    value={data.stairWidth}
                                                    onChange={(e) => update({ stairWidth: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="fk-depth" className={labelClass}>Auftrittstiefe inkl. Überstand (cm)</label>
                                                <input
                                                    id="fk-depth"
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="z. B. 30"
                                                    value={data.treadDepth}
                                                    onChange={(e) => update({ treadDepth: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                            {data.stairType !== 'blockstufen' && data.risersOn === 'ja' && (
                                                <div>
                                                    <label htmlFor="fk-height" className={labelClass}>Steigungshöhe (cm)</label>
                                                    <input
                                                        id="fk-height"
                                                        type="text"
                                                        inputMode="decimal"
                                                        placeholder="z. B. 18"
                                                        value={data.riserHeight}
                                                        onChange={(e) => update({ riserHeight: e.target.value })}
                                                        className={inputClass}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <p id="fk-stairs-help" className="text-xs text-slate-600 leading-relaxed">
                                            Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen – der oberste
                                            Auftritt ist meist der Boden des Obergeschosses. Soll dieser Austritt mit belegt werden, tragen Sie
                                            die Zahl der Trittstufen einfach selbst ein.
                                        </p>
                                    </fieldset>

                                    {data.stairType === 'blockstufen' && (
                                        <p className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm text-slate-700">
                                            Blockstufen sind eine massive Bauart (meist Naturstein oder Betonwerkstein), die auf Fundament
                                            bzw. Mörtelbett versetzt wird – kein Belag auf eine bestehende Treppe. Stückzahl und Maße klären wir
                                            beim Aufmaß.
                                        </p>
                                    )}

                                    <OptionGroup
                                        legend="Treppensockel mit ausführen?"
                                        options={YES_NO}
                                        value={data.stairSkirting}
                                        columns="grid-cols-2"
                                        onChange={(id) => update({ stairSkirting: id })}
                                    />
                                </div>
                            )}

                            {!hasAreaRooms && !hasStairs && (
                                <p className="text-sm text-slate-700">Bitte wählen Sie in Schritt 1 zuerst einen Bereich aus.</p>
                            )}
                        </div>
                    )}

                    {/* Step 4: summary & contact */}
                    {step === 4 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <ResultSummary data={data} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label htmlFor="fk-name" className={labelClass}>
                                        Name <span className="text-emerald-800">*</span>
                                    </label>
                                    <input
                                        id="fk-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Vor- und Nachname"
                                        value={data.name}
                                        onChange={(e) => update({ name: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fk-phone" className={labelClass}>
                                        Telefon- oder Mobilnummer <span className="text-emerald-800">*</span>
                                    </label>
                                    <input
                                        id="fk-phone"
                                        type="tel"
                                        required
                                        minLength={6}
                                        autoComplete="tel"
                                        placeholder="Für die Rücksprache zum Aufmaß"
                                        value={data.phone}
                                        onChange={(e) => update({ phone: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fk-email" className={labelClass}>E-Mail-Adresse (optional)</label>
                                    <input
                                        id="fk-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="ihre-adresse@beispiel.de"
                                        value={data.email}
                                        onChange={(e) => update({ email: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fk-zip" className={labelClass}>PLZ &amp; Ort des Projekts</label>
                                    <input
                                        id="fk-zip"
                                        type="text"
                                        autoComplete="postal-code"
                                        placeholder="PLZ und Ort"
                                        value={data.zipCity}
                                        onChange={(e) => update({ zipCity: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <OptionGroup
                                legend="Gewünschter Zeitraum:"
                                options={TIMING_OPTIONS.map((t) => ({ id: t, label: t }))}
                                value={data.timing}
                                columns="grid-cols-1 sm:grid-cols-3"
                                onChange={(id) => update({ timing: id })}
                            />

                            <div>
                                <label htmlFor="fk-notes" className={labelClass}>Notiz (optional)</label>
                                <textarea
                                    id="fk-notes"
                                    rows={3}
                                    placeholder="z. B. Raummaße, Wunschfliese, Besonderheiten am Untergrund …"
                                    value={data.notes}
                                    onChange={(e) => update({ notes: e.target.value })}
                                    className={`${inputClass} resize-none`}
                                />
                                <p className="mt-1 text-xs text-slate-600">Fotos senden Sie gern im Anschluss per WhatsApp nach.</p>
                            </div>

                            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                                <input
                                    type="checkbox"
                                    required
                                    checked={data.privacyConsent}
                                    onChange={(e) => update({ privacyConsent: e.target.checked })}
                                    className="mt-0.5 rounded accent-emerald-700"
                                />
                                <span>
                                    Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der{' '}
                                    <Link href="/datenschutz" className={linkClass}>Datenschutzerklärung</Link>.{' '}
                                    <span className="text-emerald-800">*</span>
                                </span>
                            </label>

                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <button type="submit" name="channel" value="whatsapp" className="glass-button-whatsapp w-full sm:flex-1 text-sm">
                                        <MessageCircle className="w-4 h-4" />
                                        Per WhatsApp senden
                                    </button>
                                    <button type="submit" name="channel" value="email" className="btn-ghost w-full sm:w-auto">
                                        <Send className="w-4 h-4 text-emerald-700" />
                                        Per E-Mail senden
                                    </button>
                                </div>
                                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                                    <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                    <span>
                                        Die Buttons öffnen WhatsApp bzw. Ihr E-Mail-Programm mit einer vorbereiteten Nachricht – gesendet wird
                                        erst, wenn Sie dort auf „Senden“ tippen. Beim Versand per WhatsApp gelten zusätzlich die
                                        Datenschutzbestimmungen von WhatsApp. Mehr in unserer{' '}
                                        <Link href="/datenschutz" className={linkClass}>Datenschutzerklärung</Link>.
                                    </span>
                                </p>
                            </div>

                            <div className="flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => goToStep(3)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-700 hover:text-emerald-800 font-bold text-xs transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Zurück zu Schritt 3
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step navigation */}
                    {step < 4 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => goToStep(step - 1)}
                                    className="btn-ghost px-5 py-3 text-xs"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Zurück
                                </button>
                            ) : (
                                <div />
                            )}
                            <button
                                type="button"
                                onClick={() => goToStep(step + 1)}
                                disabled={data.rooms.length === 0}
                                aria-describedby={data.rooms.length === 0 && step === 1 ? 'konfigurator-step1-hint' : undefined}
                                className="btn-primary px-6 py-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {step === 3 ? 'Zur Zusammenfassung' : `Weiter zu Schritt ${step + 1}`}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
