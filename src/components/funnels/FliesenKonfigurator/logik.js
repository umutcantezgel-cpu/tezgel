// Logik des Fliesen-Konfigurators (E-011: aus FliesenKonfigurator.jsx verschoben, Verhalten unverändert – gesperrt).
// Auswahllisten, Rechenwege (Fläche, Treppe), Checkliste, Zusammenfassung, Nachricht und Nutzlast für /api/anfrage.
// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

export const STEPS = [
    { title: 'Raum & Einsatzbereich', text: 'Wo soll gefliest werden? Mehrfachauswahl ist möglich.' },
    { title: 'Untergrund & Bestand', text: 'Worauf wird verlegt? „Unbekannt“ ist eine gute Antwort – wir prüfen das vor Ort.' },
    { title: 'Format, Material & Menge', text: 'Format, Material, Verlegemuster und Fläche bzw. Stufenmaße.' },
    { title: 'Zusammenfassung & Kontakt', text: 'Prüfen Sie die Angaben und senden Sie die Anfrage per WhatsApp oder E-Mail.' }
];

export const ROOM_OPTIONS = [
    { id: 'wohnen', title: 'Wohn- & Essbereich', desc: 'Böden in Wohnräumen und offenen Grundrissen' },
    { id: 'kueche', title: 'Küche', desc: 'Küchenboden und Küchenrückwand' },
    { id: 'flur', title: 'Flur & Diele', desc: 'Eingang, Diele, Garderobe' },
    { id: 'treppe', title: 'Treppe', desc: 'Innen- oder Außentreppe, Tritt- und Setzstufen' },
    { id: 'balkon', title: 'Balkon & Terrasse', desc: 'Frostsichere Außenbeläge' },
    { id: 'untergrund', title: 'Nur Untergrund / Abdichtung', desc: 'Ausgleich, Entkopplung, Abdichtung' },
    { id: 'bad', title: 'Bad, Dusche, Gäste-WC', desc: 'Dafür gibt es eigene Planungswerkzeuge' }
];

export const SUBSTRATE_OPTIONS = [
    { id: 'zement', label: 'Neuer Zementestrich' },
    { id: 'calciumsulfat', label: 'Neuer Calciumsulfatestrich' },
    { id: 'heizestrich', label: 'Heizestrich (mit Fußbodenheizung)' },
    { id: 'altfliesen', label: 'Alte Fliesen vorhanden' },
    { id: 'holz', label: 'Holzdielen / Holzwerkstoffplatten' },
    { id: 'beton', label: 'Betondecke / Balkonplatte' },
    { id: 'unbekannt', label: 'Unbekannt – bitte prüfen' }
];

export const YES_NO_UNSURE = [
    { id: 'ja', label: 'Ja' },
    { id: 'nein', label: 'Nein' },
    { id: 'unklar', label: 'Weiß nicht' }
];

export const YES_NO = [
    { id: 'ja', label: 'Ja' },
    { id: 'nein', label: 'Nein' }
];

export const FORMAT_OPTIONS = [
    { id: 'standard', title: 'Standardformat', desc: 'bis ca. 60 cm Kantenlänge' },
    { id: 'gross', title: 'Großformat', desc: 'z. B. 60 × 120 cm' },
    { id: 'xxl', title: 'XXL-Format', desc: 'ab 120 × 120 cm, bis 120 × 278 cm' },
    { id: 'dielen', title: 'Dielenformat', desc: 'lange, schmale Formate, z. B. Holzoptik' },
    { id: 'offen', title: 'Noch offen', desc: 'Wir beraten Sie gern' }
];

export const MATERIAL_OPTIONS = [
    { id: 'feinsteinzeug', label: 'Feinsteinzeug / Keramik' },
    { id: 'holzoptik', label: 'Feinsteinzeug in Holzoptik' },
    { id: 'naturstein-silikat', label: 'Granit, Schiefer, Quarzit' },
    { id: 'naturstein-kalk', label: 'Marmor, Travertin, Kalkstein' },
    { id: 'aussen2cm', label: '2-cm-Außenplatten' },
    { id: 'offen', label: 'Noch offen' }
];

// Cutting allowance guide values (share of the net area) per laying pattern.
export const PATTERN_OPTIONS = [
    { id: 'kreuzfuge', label: 'Kreuzfuge', min: 5, max: 10 },
    { id: 'verband', label: 'Halb- / Drittelverband', min: 5, max: 10 },
    { id: 'wild', label: 'Wilder Verband', min: 5, max: 10 },
    { id: 'diagonal', label: 'Diagonal', min: 10, max: 15 },
    { id: 'fischgraet', label: 'Fischgrät', min: 10, max: 15 },
    { id: 'offen', label: 'Noch offen', min: 5, max: 15 }
];

export const STAIR_TYPE_OPTIONS = [
    { id: 'massiv', label: 'Massivtreppe mit Belag', desc: 'Beton- oder Massivtreppe, die mit Fliesen oder Naturstein belegt wird' },
    { id: 'blockstufen', label: 'Blockstufen', desc: 'Massive Stufen, meist außen, auf Fundament bzw. Mörtelbett versetzt' },
    { id: 'unbekannt', label: 'Unklar', desc: 'Wir sehen uns die Treppe vor Ort an' }
];

export const STAIR_COVERING_OPTIONS = [
    { id: 'fliese', label: 'Fliese / Feinsteinzeug' },
    { id: 'naturstein', label: 'Naturstein' },
    { id: 'offen', label: 'Noch offen' }
];

export const TIMING_OPTIONS = ['Schnellstmöglich', 'In 1 – 3 Monaten', 'In mehr als 3 Monaten / flexibel'];

// Rooms that are measured in m² (everything except the stair).
export const AREA_ROOMS = ['wohnen', 'kueche', 'flur', 'balkon', 'untergrund', 'bad'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const labelOf = (list, id) => list.find((o) => o.id === id)?.label ?? list.find((o) => o.id === id)?.title ?? id;

export const parseNumber = (value) => {
    if (value === '' || value === null || value === undefined) return NaN;
    const n = Number(String(value).replace(',', '.').trim());
    return Number.isFinite(n) ? n : NaN;
};

export const parseCount = (value) => {
    const n = parseNumber(value);
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : NaN;
};

// German number formatting without locale APIs (keeps SSR and client identical).
export const fmt = (n, digits = 1) => {
    const fixed = (Math.round(n * 10 ** digits) / 10 ** digits).toFixed(digits);
    const [int, dec] = fixed.split('.');
    const withDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return dec && Number(dec) !== 0 ? `${withDots},${dec}` : withDots;
};

export const toggleInList = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

// ---------------------------------------------------------------------------
// Calculations
// ---------------------------------------------------------------------------

export function calculateArea(data) {
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

export function calculateStairs(data) {
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

export function buildChecklist(data) {
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

export function buildSummaryLines(data) {
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

export function buildQuantityLines(data) {
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

export const KNOWN_ROOMS = ROOM_OPTIONS.map((r) => r.id);

/** Startwerte aus den optionalen Vorgaben (area, substrate, format, material, floorHeating). */
export function anfangsdaten({ area, substrate, format, material, floorHeating }) {
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
}

export function nachricht(data) {
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
}

export function nutzlast(data) {
    const roomsText = data.rooms.map((id) => labelOf(ROOM_OPTIONS, id)).join(', ') || 'Fliesenprojekt';
    const roomLabels = data.rooms.map((id) => labelOf(ROOM_OPTIONS, id));
    const substrateLabels = (data.substrates || []).map((id) => labelOf(SUBSTRATE_OPTIONS, id));
    return {
        inquiryType: 'fliesen',
        projectType: 'fliesen',
        projectTitle: `Fliesen-Konfiguration (${roomsText})`,
        contact: {
            name: data.name,
            phone: data.phone,
            email: data.email || undefined,
            zipCity: data.zipCity || undefined,
            location: data.zipCity || 'Aßlar / Wetzlar'
        },
        fliesenDetails: {
            rooms: data.rooms,
            roomLabels,
            sqm: data.area || undefined,
            substrate: data.substrates?.join(', '),
            substrateLabel: substrateLabels.join(', ') || 'Nicht angegeben',
            tileType: data.material,
            tileTypeLabel: `${labelOf(MATERIAL_OPTIONS, data.material)} (${labelOf(FORMAT_OPTIONS, data.format)})`,
            removal: data.removal,
            removalLabel: data.removal === 'ja' ? 'Ja, Altbelag entfernen' : data.removal === 'nein' ? 'Nein, nicht erforderlich' : 'Unklar / vor Ort prüfen',
            underfloorHeating: data.floorHeating,
            underfloorHeatingLabel: data.floorHeating === 'ja' ? 'Ja, vorhanden/geplant' : 'Nein',
            timing: data.timing,
            timingLabel: data.timing
        },
        timing: data.timing,
        area: `${data.area || '20'} m²`,
        notes: data.notes || undefined
    };
}
