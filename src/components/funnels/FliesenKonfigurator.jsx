'use client';
import React from 'react';
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
    Sparkles,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import {
    STEPS,
    ROOM_OPTIONS,
    SUBSTRATE_OPTIONS,
    YES_NO_UNSURE,
    YES_NO,
    FORMAT_OPTIONS,
    MATERIAL_OPTIONS,
    PATTERN_OPTIONS,
    STAIR_TYPE_OPTIONS,
    STAIR_COVERING_OPTIONS,
    TIMING_OPTIONS,
    fmt,
    calculateArea,
    calculateStairs,
    buildChecklist,
    buildSummaryLines,
    useFliesenKonfigurator
} from '@/lib/formulare/useFliesenKonfigurator';

// Optionen, Hilfsfunktionen, Rechnung und Logik stehen wörtlich in `useFliesenKonfigurator` (P4-05b, G9).

const inputClass =
    'w-full px-4 py-2.5 rounded-tile-sm bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-all';

const cardOptionClass = (selected) =>
    `p-4 rounded-tile-md border-2 text-left transition-all duration-300 ${
        selected
            ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
            : 'border-slate-200 bg-white hover:border-orange-500 hover:-translate-y-0.5'
    }`;

const chipOptionClass = (selected) =>
    `px-3 py-2.5 rounded-tile-sm border text-xs font-bold transition-all duration-300 ${
        selected
            ? 'bg-orange-50 text-orange-950 border-orange-600 ring-2 ring-orange-600/20'
            : 'bg-white text-slate-700 border-slate-200 hover:border-orange-500'
    }`;

const legendClass = 'block text-xs font-black text-slate-800 mb-2';
const labelClass = 'block text-xs font-bold text-slate-800 mb-1';
const linkClass = 'font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2';

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
            <div className="p-5 rounded-tile-md bg-slate-50 border border-slate-200">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                    <ClipboardList className="w-4 h-4 text-orange-600" aria-hidden="true" />
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

            <div className="p-5 rounded-tile-md bg-orange-50 border border-orange-200">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                    <Ruler className="w-4 h-4 text-orange-600" aria-hidden="true" />
                    Materialbedarf (Richtwert)
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                    {area && area.valid && (
                        <li>
                            <strong className="text-slate-900">Fläche:</strong> {fmt(area.net)} m² netto. Mit einem Verschnitt von
                            ca. {area.pattern.min}–{area.pattern.max} % ({area.pattern.label}) ergibt sich ein Richtwert von{' '}
                            <strong className="text-orange-950 tabular-nums">ca. {fmt(area.low)}–{fmt(area.high)} m²</strong>.
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
                            <strong className="text-orange-950 tabular-nums">{fmt(stairs.total, 2)} m²</strong>. Bei Treppen nennen wir
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
                <div className="p-5 rounded-tile-md bg-sky-50 border border-sky-200">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                        <Info className="w-4 h-4 text-sky-600" aria-hidden="true" />
                        Das prüfen wir vorab
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                        {checklist.map((item) => (
                            <li key={item.text} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
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

/**
 * Fliesen-Konfigurator. All props are optional presets:
 * area ('kueche' | 'flur' | … or an array of room ids), substrate ('altfliesen' | …),
 * format ('xxl' | …), material ('holzoptik' | …), floorHeating (boolean).
 */
export default function FliesenKonfigurator({ area, substrate, format, material, floorHeating } = {}) {
    const {
        step,
        sentVia,
        setSentVia,
        referenceId,
        isSubmitting,
        errorMessage,
        headingRef,
        data,
        update,
        hasAreaRooms,
        hasStairs,
        areaCalc,
        stairCalc,
        rises,
        goToStep,
        handleSubmit,
        toggleRoom,
        toggleSubstrate,
        areaRangeValue,
        roomsText,
        handleNewRequest
    } = useFliesenKonfigurator({ area, substrate, format, material, floorHeating });

    // -----------------------------------------------------------------------
    // Success view
    // -----------------------------------------------------------------------
    if (sentVia === 'online') {
        return (
            <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 max-w-3xl mx-auto shadow-xl" role="status">
                <div className="text-center">
                    <div className="icon-chip w-16 h-16 rounded-full mx-auto mb-5 bg-orange-100 text-orange-600">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                        <span className="eyebrow">Konfiguration erfolgreich übermittelt</span>
                        {referenceId && (
                            <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-xs font-bold text-slate-800">
                                Vorgangs-Nr.: {referenceId}
                            </span>
                        )}
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Vielen Dank, {data.name}!
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                        Ihre Konfiguration für <strong>{roomsText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                        {data.email && (
                            <span className="block mt-2 font-semibold text-orange-800 bg-orange-50/80 border border-orange-200/80 rounded-xl p-2.5 max-w-md mx-auto text-xs sm:text-sm">
                                ✉️ Eine ausführliche Bestätigung mit allen Angaben und Materialschätzungen wurde an <em>{data.email}</em> gesendet.
                            </span>
                        )}
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs sm:text-sm text-neutral-700 mb-6 space-y-2">
                    <div className="font-bold text-neutral-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        Nächste Schritte:
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                        1. Inhaber Deniz Tezgel prüft Ihre Raum- und Materialangaben sowie Machbarkeit und Vorarbeiten.<br />
                        2. Wir melden uns binnen <strong>24 bis 48 Stunden</strong> telefonisch zur Vorab-Klärung und Terminabsprache.<br />
                        3. Kostenfreies Aufmaß vor Ort für Ihr verbindliches Festpreisangebot.
                    </p>
                </div>

                <ResultSummary data={data} />

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                        <Phone className="w-4 h-4" />
                        Direkt anrufen: {COMPANY_DATA.contact.phone}
                    </a>
                    <button
                        type="button"
                        onClick={handleNewRequest}
                        className="btn-ghost w-full sm:w-auto text-xs"
                    >
                        Neue Konfiguration starten
                    </button>
                </div>
            </div>
        );
    }

    if (sentVia === 'whatsapp') {
        return (
            <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 max-w-3xl mx-auto" role="status">
                <div className="text-center">
                    <div className="icon-chip w-16 h-16 rounded-full mx-auto mb-5">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="eyebrow mb-4">
                        WhatsApp wurde geöffnet
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        WhatsApp wurde geöffnet – bitte absenden
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                        Ihre Anfrage ist vorbereitet, aber noch nicht verschickt. Senden Sie die Nachricht in{' '}
                        WhatsApp ab. Fotos von Raum, Untergrund oder Treppe
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
                                                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                                                : step > s
                                                    ? 'bg-orange-50 text-orange-950 border border-orange-200'
                                                    : 'bg-white text-slate-700 border border-slate-300'
                                        }`}
                                    >
                                        {step > s ? (
                                            <>
                                                <Check className="w-4 h-4 text-orange-600" aria-hidden="true" />
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
                    <div className="mt-4 p-3.5 rounded-tile-sm bg-white border border-slate-200 space-y-1" aria-live="polite">
                        <p className="text-xs font-bold text-slate-700">Materialbedarf inkl. Verschnitt (Richtwert):</p>
                        {!hasAreaRooms && !hasStairs && (
                            <p className="text-sm text-slate-700">Wählen Sie zuerst einen Bereich.</p>
                        )}
                        {areaCalc && areaCalc.valid && (
                            <p className="font-display text-lg font-black text-orange-950 tabular-nums">
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
                                className={`h-2 rounded-full transition-all duration-500 ${s <= step ? 'bg-orange-600' : 'bg-slate-200'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <div className="mb-6">
                        <p ref={headingRef} tabIndex={-1} className="text-base sm:text-lg font-black text-slate-900 focus:outline-none">
                            {step}. {STEPS[step - 1].title}
                        </p>
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
                                                onClick={() => toggleRoom(r.id)}
                                                className={cardOptionClass(selected)}
                                            >
                                                <span className="flex items-center justify-between gap-2">
                                                    <span className="block font-black text-slate-900 text-sm">{r.title}</span>
                                                    {selected && <Check className="w-4 h-4 text-orange-600" aria-hidden="true" />}
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
                                        <Link href="/bad/projekt-check" className={linkClass}>Bad-Projektcheck</Link>. Sie können das Bad
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
                                onChange={toggleSubstrate}
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
                                                value={areaRangeValue}
                                                onChange={(e) => update({ area: e.target.value })}
                                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
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
                                        Name <span className="text-orange-600">*</span>
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
                                        Telefon- oder Mobilnummer <span className="text-orange-600">*</span>
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
                                    className="mt-0.5 rounded accent-orange-600"
                                />
                                <span>
                                    Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der{' '}
                                    <Link href="/datenschutz" className={linkClass}>Datenschutzerklärung</Link>.{' '}
                                    <span className="text-orange-600">*</span>
                                </span>
                            </label>

                            {errorMessage && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-800 flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <button
                                        type="submit"
                                        name="channel"
                                        value="online"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full sm:flex-1 text-sm flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Wird übertragen …
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Online absenden (mit E-Mail-Bestätigung)
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="submit"
                                        name="channel"
                                        value="whatsapp"
                                        disabled={isSubmitting}
                                        className="glass-button-whatsapp w-full sm:w-auto text-sm flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Per WhatsApp senden
                                    </button>
                                </div>
                                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                                    <Lock className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                                    <span>
                                        Bei Online-Absendung erhalten Sie unmittelbar eine schriftliche Zusammenfassung per E-Mail. Bei Auswahl von WhatsApp öffnet sich WhatsApp mit Ihren vorbereiteten Angaben.
                                    </span>
                                </p>
                            </div>

                            <div className="flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => goToStep(3)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-700 hover:text-orange-600 font-bold text-xs transition-colors"
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
