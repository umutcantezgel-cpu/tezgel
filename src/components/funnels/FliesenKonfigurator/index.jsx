'use client';
// Fliesen-Konfigurator (E-011): Markup hier. Logik aus useFliesenKonfigurator (gemeinsam mit der Kern-Ansicht);
// Markup in Schritt1–4, Erfolg, WhatsAppGeoeffnet, OptionGroup und ResultSummary.
// F-06 (Fusion E-039, Gutachten u6): Grundgerüst B (Q-05) – ein Feld (Fliese, Rahmen Strich) mit Kopf (Mono-Etikett mit
// Fugenkreuz, Fortschritt als Mono-Kästchen mit aria-current, sichtbares Mono-Etikett „Schritt n von 4“, Überschrift),
// Richtwert live als Schriftfeld auf Kalk (Zahlen in Mono, kein Umbruch zwischen Zahl und Einheit), Spalten nach
// Behälterbreite (@container, bricht bei Zoom einspaltig um). Aus A (E4-NACH-13): mit `ergebnisSpalte` (Seite
// /fliesen/konfigurator) ab 64 rem Behälterbreite in Schritt 1–3 zweispaltig – links das Werkzeug, rechts eine klebende
// Spalte (top-24 = Kopfhöhe + 16 px) mit der EINEN Bedarfsanzeige und dem gezeichneten Verlegeplan (reagiert auf Bereich,
// Format und Verlegemuster); Schritt 4 in voller Breite. Mobil und eingebettet steht die Bedarfsanzeige an einer festen Stelle
// im Kopf; leer (noch kein Bereich) ist sie eine Zeile, damit die Bereiche im ersten Bildschirm stehen.
// Die Live-Region gibt es genau einmal im DOM (keine zweite Fassung je Ansicht). Kein Fortschrittsbalken, kein rotes
// Achsstück am laufenden Schritt (Rot bleibt Fehler und Pflichtmarke). Texte, IDs, Rollen, aria-*, Fokusführung (headingRef)
// und Verhalten unverändert.
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { PLAENE } from '@/lib/plaene/vorgaben';
import { ROOM_OPTIONS, STEPS, fmt, useFliesenKonfigurator } from '@/lib/formulare/useFliesenKonfigurator';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Schritt4 from './Schritt4';
import Erfolg from './Erfolg';
import WhatsAppGeoeffnet from './WhatsAppGeoeffnet';

// Verlegeplan der Ergebnis-Spalte (A): je erstem gewählten Bereich ein gezeichneter Plan aus den Planvorgaben (K-008), ohne
// Achse (ein Rot je Bildschirm). Format und Verlegemuster setzen Plattenmaß und Verband, „Noch offen“ lässt die Vorgabe.
const RAUM_PLAN = { wohnen: 'wohnen', kueche: 'fugen', flur: 'grossformat', treppe: 'treppe', balkon: 'balkon', untergrund: 'untergrund', bad: 'bad' };
const FORMAT_PLATTE = { standard: { b: 4, h: 4 }, gross: { b: 8, h: 4 }, xxl: { b: 12, h: 6 }, dielen: { b: 10, h: 2 } };
const MUSTER_VERBAND = { kreuzfuge: 'kreuz', verband: 'halb' };

function vorschauPlan(data) {
    const erster = ROOM_OPTIONS.find((r) => data.rooms.includes(r.id))?.id;
    const vorgabe = PLAENE[RAUM_PLAN[erster] ?? 'fugen'];
    if (vorgabe.name === 'treppe') return vorgabe;
    return {
        ...vorgabe,
        platte: FORMAT_PLATTE[data.format] ?? vorgabe.platte,
        verband: MUSTER_VERBAND[data.pattern] ?? vorgabe.verband
    };
}

/**
 * Fliesen-Konfigurator. All props are optional presets:
 * area ('kueche' | 'flur' | … or an array of room ids), substrate ('altfliesen' | …),
 * format ('xxl' | …), material ('holzoptik' | …), floorHeating (boolean).
 * ergebnisSpalte: Bedarfsanzeige und Verlegeplan als klebende Spalte rechts (nur wo der Konfigurator die volle Breite hat).
 */
export default function FliesenKonfigurator({ area, substrate, format, material, floorHeating, ergebnisSpalte = false } = {}) {
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
        handleNewRequest
    } = useFliesenKonfigurator({ area, substrate, format, material, floorHeating });

    // -----------------------------------------------------------------------
    // Success view
    // -----------------------------------------------------------------------
    if (sentVia === 'online') {
        return <Erfolg data={data} referenceId={referenceId} handleNewRequest={handleNewRequest} />;
    }

    if (sentVia === 'whatsapp') {
        return <WhatsAppGeoeffnet data={data} setSentVia={setSentVia} />;
    }

    // -----------------------------------------------------------------------
    // Stepper: ein Raster für Kopf, Bedarfsanzeige und Werkzeug (DOM-Reihenfolge = Lesereihenfolge mobil). Mit
    // ergebnisSpalte ab @5xl drei Spalten: Kopf und Werkzeug links (2), die Bedarfsanzeige rechts (1) – in Schritt 1–3 über
    // beide Reihen und klebend mit Verlegeplan, in Schritt 4 nur neben dem Kopf (das Werkzeug läuft dann über die volle Breite).
    // -----------------------------------------------------------------------
    const spalte = ergebnisSpalte && step < 4;
    const leer = !hasAreaRooms && !hasStairs;
    const gesperrt = data.rooms.length === 0;

    return (
        <div className="@container">
            <div className="border border-strich bg-fliese">
                <div className={`grid grid-cols-1 gap-6 p-6 @xl:p-8 @4xl:p-12 ${ergebnisSpalte ? '@5xl:grid-cols-3 @5xl:gap-x-12' : ''}`}>
                    {/* Kopf: Etikett, Fortschritt (Kästchen), „Schritt n von 4“ sichtbar in Mono (einmal), Überschrift */}
                    <div className={`min-w-0 ${ergebnisSpalte ? '@5xl:col-span-2' : ''}`}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <span className={etikettKlassen}>
                                <Fugenkreuz className="size-3 text-strich" />
                                Fliesen-Konfigurator
                            </span>
                            <ol className="flex flex-wrap items-center gap-2" aria-label="Fortschritt">
                                {STEPS.map((item, idx) => {
                                    const s = idx + 1;
                                    return (
                                        <li
                                            key={item.title}
                                            aria-current={step === s ? 'step' : undefined}
                                            className={`flex size-8 items-center justify-center border font-mono text-fs-1 tabular-nums ${
                                                step === s
                                                    ? 'border-tinte bg-tinte text-kalk'
                                                    : step > s
                                                        ? 'border-tinte bg-fliese text-tinte'
                                                        : 'border-strich bg-fliese text-tinte-2'
                                            }`}
                                        >
                                            {step > s ? (
                                                <>
                                                    <Icon name="haken" groesse={4} />
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
                        <p className="mt-6 font-mono text-fs-1 text-tinte-2 tabular-nums">Schritt {step} von 4</p>
                        <h2 className="mt-2 text-fs-5 text-tinte">Fliesenprojekt vorbereiten</h2>
                    </div>

                    {/* Bedarfsanzeige (die eine Live-Region) und, in der klebenden Spalte, der Verlegeplan */}
                    <div
                        className={`min-w-0 ${
                            ergebnisSpalte
                                ? `@5xl:col-start-3 @5xl:row-start-1 ${spalte ? '@5xl:row-span-2 @5xl:sticky @5xl:top-24 @5xl:self-start' : '@5xl:self-start'}`
                                : ''
                        }`}
                    >
                        <div
                            className={`flex border border-fuge bg-kalk ${
                                leer
                                    ? `flex-row flex-wrap items-baseline gap-x-2 gap-y-1 px-4 py-3 ${ergebnisSpalte ? '@5xl:flex-col @5xl:gap-2 @5xl:p-4' : ''}`
                                    : 'flex-col gap-2 p-4'
                            }`}
                            aria-live="polite"
                        >
                            <p className={`font-mono text-fs-1 text-tinte-2 ${leer ? '@max-xl:sr-only' : ''}`}>
                                Materialbedarf inkl. Verschnitt (Richtwert):
                            </p>
                            {leer && (
                                <p className="font-text text-fs-2 text-tinte-2">Wählen Sie zuerst einen Bereich.</p>
                            )}
                            {areaCalc && areaCalc.valid && (
                                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-fs-4 font-semibold text-tinte tabular-nums">
                                    <span>ca. <span className="whitespace-nowrap">{fmt(areaCalc.low)}–{fmt(areaCalc.high)} m²</span></span>{' '}
                                    <span className="text-fs-2 font-normal text-tinte-2">aus <span className="whitespace-nowrap">{fmt(areaCalc.net)} m²</span> netto</span>
                                </p>
                            )}
                            {areaCalc && !areaCalc.valid && (
                                <p className="font-text text-fs-2 text-tinte-2">Fläche in Schritt 3 eingeben.</p>
                            )}
                            {stairCalc && (
                                <p className="font-text text-fs-2 text-tinte-2">
                                    <strong className="font-semibold text-tinte">Treppe:</strong>{' '}
                                    {stairCalc.valid ? (
                                        <span className="font-mono text-tinte">
                                            <span className="whitespace-nowrap">{fmt(stairCalc.total, 2)} m²</span> netto (ohne Verschnitt)
                                        </span>
                                    ) : (
                                        'Menge nach Stufenmaßen bzw. beim Aufmaß'
                                    )}
                                </p>
                            )}
                        </div>
                        {spalte && (
                            <div className="mt-4 hidden border border-fuge bg-fliese p-4 @5xl:block">
                                <Verlegeplan plan={vorschauPlan(data)} ohneAchse bemassung={false} />
                            </div>
                        )}
                    </div>

                    {/* Werkzeug: Schrittüberschrift, Formularinhalt und Schrittnavigation; eigener Behälter für die Spalten der Schritte */}
                    <div
                        className={`@container flex min-w-0 flex-col gap-8 border-t border-fuge pt-6 ${
                            ergebnisSpalte ? `@5xl:row-start-2 ${spalte ? '@5xl:col-span-2' : '@5xl:col-span-3'}` : ''
                        }`}
                    >
                        <div>
                            <p ref={headingRef} tabIndex={-1} className="font-anzeige text-fs-4 font-semibold text-tinte">
                                {step}. {STEPS[step - 1].title}
                            </p>
                            <p className="mt-2 max-w-mass font-text text-fs-2 text-tinte-2">{STEPS[step - 1].text}</p>
                        </div>

                        {step === 1 && <Schritt1 data={data} update={update} />}

                        {/* Step 2: substrate */}
                        {step === 2 && <Schritt2 data={data} update={update} />}

                        {/* Step 3: format, material, quantity */}
                        {step === 3 && <Schritt3 data={data} update={update} hasAreaRooms={hasAreaRooms} hasStairs={hasStairs} rises={rises} />}

                        {/* Step 4: summary & contact */}
                        {step === 4 && (
                            <Schritt4 data={data} update={update} goToStep={goToStep} handleSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />
                        )}

                        {/* Schrittnavigation: mobil die Hauptaktion zuerst (Weiter über Zurück), ab 36 rem Zurück links, Weiter rechts;
                            gesperrt (Schritt 1 ohne Bereich) ist „Weiter“ als graue Fläche erkennbar (disabled, B) */}
                        {step < 4 && (
                            <div className="flex flex-col-reverse items-stretch gap-4 border-t border-fuge pt-6 @xl:flex-row @xl:items-center @xl:justify-between">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => goToStep(step - 1)}
                                        className={knopfKlassen('text', 'self-start @xl:self-auto')}
                                        data-motion="druck"
                                    >
                                        <Icon name="pfeil-links" groesse={5} />
                                        Zurück
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => goToStep(step + 1)}
                                    disabled={gesperrt}
                                    aria-describedby={gesperrt && step === 1 ? 'konfigurator-step1-hint' : undefined}
                                    className={knopfKlassen('haupt', 'w-full @xl:ml-auto @xl:w-auto')}
                                    data-motion="druck"
                                >
                                    {step === 3 ? 'Zur Zusammenfassung' : `Weiter zu Schritt ${step + 1}`}
                                    <Icon name="pfeil-rechts" groesse={5} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
