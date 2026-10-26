// Logik des Bad-Projektchecks (F-05, BadProjektCheck) – aus der Komponente verschoben (P4-05a, Vorbild P3-00l).
// Ohne Markup. Seit E4-W1 (F2, E-065) ohne Vorauswahl: Bereich, Ausstattung und Extras sind beim Laden leer, die Fläche gilt
// erst, wenn die Besucherin den Regler bewegt hat. Nutzlast und Nachricht enthalten nur, was gewählt wurde.
// Bekannte Lücken bleiben (kein Honeypot, kein `_t`). Der Startwert 8 m² liegt jetzt auf dem Reglerraster (vorher 8,2, intern I-18).
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';

export const SCOPE_OPTIONS = [
    { id: 'komplett', label: 'Komplettbad', desc: 'Schlüsselfertig' },
    { id: 'teil', label: 'Teilsanierung', desc: 'Sanitär & Keramik' },
    { id: 'dusche-nur', label: 'Wanne zu Dusche', desc: 'Nur Duschbereich' }
];

export const TIER_OPTIONS = [
    { id: 'basic', label: 'Solide', desc: 'Funktional & zeitlos' },
    { id: 'premium', label: 'Gehoben', desc: 'Edle Oberflächen' },
    { id: 'luxus', label: 'Exklusiv', desc: 'Spa-Charakter, Dusch-WC' }
];

export const EXTRA_OPTIONS = [
    { id: 'walkin', label: 'Bodengleiche Walk-In-Dusche' },
    { id: 'badewanne', label: 'Badewanne / Komfortwanne' },
    { id: 'dusch-wc', label: 'Dusch-WC mit Hygiene-Spülung' },
    { id: 'doppelwaschtisch', label: 'Möbel-Doppelwaschtisch' },
    { id: 'fussbodenheizung', label: 'Fußbodenheizung' },
    { id: 'design-heizkoerper', label: 'Design-Heizkörper' },
    { id: 'led-spiegel', label: 'LED-Lichtspiegel' },
    { id: 'fliesen', label: 'Großformat-Fliesenverlegung' }
];

type SentVia = 'whatsapp' | 'online' | null;

export function useProjektCheck() {
    // Startwert auf dem Raster; gezählt wird er erst, wenn der Regler bewegt wurde (sqmGewaehlt).
    const [sqm, setSqm] = useState(8);
    const [sqmGewaehlt, setSqmGewaehlt] = useState(false);
    // Ohne Vorauswahl: Ausstattung, Umfang und Extras sind beim Laden leer.
    const [tier, setTier] = useState<string | null>(null);
    const [sanitaryScope, setSanitaryScope] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [contactOpen, setContactOpen] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
    const [sentVia, setSentVia] = useState<SentVia>(null); // 'whatsapp' | 'online'
    const [referenceId, setReferenceId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleOption = (id: string) => {
        setSelectedOptions(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const sqmLabel = sqm.toLocaleString('de-DE');
    const scopeLabel = SCOPE_OPTIONS.find((s) => s.id === sanitaryScope)?.label ?? null;
    const tierLabel = TIER_OPTIONS.find((t) => t.id === tier)?.label ?? null;
    const extras = EXTRA_OPTIONS.filter((o) => selectedOptions.includes(o.id)).map((o) => o.label);
    // Das passende Musterbad richtet sich nach der Größe; ohne gewählte Größe gibt es noch keins.
    const matchingBath = !sqmGewaehlt
        ? null
        : sqm <= 9
            ? { label: 'Kompaktbad 8,2 m²', slug: 'basic-bad-8_2' }
            : { label: 'Komfort-Bad 15,9 m²', slug: 'premium-bad-15_9' };

    const getLeadMessage = () => {
        // Nur gewählte Angaben; Name, Telefon und E-Mail stehen immer.
        const angaben = [
            sqmGewaehlt ? `Badgröße: ca. ${sqmLabel} m²` : null,
            scopeLabel ? `Sanierungsumfang: ${scopeLabel}` : null,
            tierLabel ? `Ausstattungsniveau: ${tierLabel}` : null,
            extras.length > 0 ? `Wunschausstattung: ${extras.join(', ')}` : null
        ].filter((zeile): zeile is string => zeile !== null);
        return (
            `Hallo Herr ${COMPANY_DATA.owner.lastName},\nich habe den Bad-Projektcheck genutzt und bitte um ein Festpreisangebot:\n\n` +
            (angaben.length > 0 ? `${angaben.join('\n')}\n\n` : '') +
            `Name: ${leadData.name}\n` +
            `Telefon: ${leadData.phone}\n` +
            `E-Mail: ${leadData.email || 'Nicht angegeben'}\n\n` +
            `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`
        );
    };

    const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Typangaben nur für den Typprüfer (SubmitEvent.submitter, HTMLButtonElement.value); Laufzeit unverändert.
        const submitter = (e.nativeEvent as SubmitEvent | undefined)?.submitter;
        const channel = submitter && (submitter as HTMLButtonElement).value === 'whatsapp' ? 'whatsapp' : 'online';
        const message = getLeadMessage();

        if (channel === 'whatsapp') {
            openWhatsApp({
                phone: COMPANY_DATA.contact.whatsappNumber,
                text: message,
            });
            setSentVia('whatsapp');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType: 'projekt_check',
                    projectType: 'bad',
                    projectTitle: sqmGewaehlt ? `Bad-Projektcheck (ca. ${sqmLabel} m²)` : 'Bad-Projektcheck',
                    contact: {
                        name: leadData.name,
                        phone: leadData.phone,
                        email: leadData.email || undefined
                    },
                    // Nicht gewählte Angaben fehlen in der Nutzlast (undefined entfällt beim Senden).
                    projektCheckDetails: {
                        sqm: sqmGewaehlt ? sqmLabel : undefined,
                        scope: sanitaryScope ?? undefined,
                        scopeLabel: scopeLabel ?? undefined,
                        tier: tier ?? undefined,
                        tierLabel: tierLabel ?? undefined,
                        extras
                    },
                    // kein Zeitraum: der Projektcheck fragt ihn nicht ab (Gegenprüfung E4-W1, M-24)
                    area: sqmGewaehlt ? `ca. ${sqmLabel} m²` : undefined
                })
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }
            setSentVia('online');
        } catch (err) {
            console.error('BadProjektCheck submission error:', err);
            // `as Error` nur für den Typprüfer (catch-Variable ist unknown); Laufzeit wie im Bestand `err.message`.
            setErrorMessage((err as Error).message || 'Verbindungsfehler beim Absenden.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Bisher inline am Regler (onChange): Wert als Zahl übernehmen; ab jetzt gilt die Größe als gewählt.
    const changeSqm = (value: string) => {
        setSqm(parseFloat(value));
        setSqmGewaehlt(true);
    };

    // Bisher inline am Knopf „Erneut anfragen oder anpassen“ (Erfolgsansicht online).
    const handleNewRequest = () => {
        setSentVia(null);
        setReferenceId('');
    };

    return {
        sqm,
        sqmGewaehlt,
        changeSqm,
        tier,
        setTier,
        sanitaryScope,
        setSanitaryScope,
        selectedOptions,
        toggleOption,
        contactOpen,
        setContactOpen,
        leadData,
        setLeadData,
        sentVia,
        setSentVia,
        referenceId,
        isSubmitting,
        errorMessage,
        sqmLabel,
        scopeLabel,
        tierLabel,
        extras,
        matchingBath,
        handleLeadSubmit,
        handleNewRequest
    };
}
