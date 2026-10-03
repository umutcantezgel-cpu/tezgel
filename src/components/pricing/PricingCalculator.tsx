"use client";

import React, { useState } from "react";
import {
  CRAFT_SERVICES,
  ROOM_SIZES,
  SITUATION_OPTIONS,
  PROPERTY_TYPES,
  TIMING_OPTIONS,
  type CraftServiceType,
  type RoomSizeType,
} from "./pricing.constants";
import {
  Bath,
  Maximize2,
  Home,
  Sun,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Phone,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import HeartbeatCTA from "@/components/animations/HeartbeatCTA";
import { siteConfig } from "@/lib/config";
import { triggerHaptic } from "@/lib/haptics";

const SERVICE_ICONS: Record<CraftServiceType, React.ElementType> = {
  bad: Bath,
  grossformat: Maximize2,
  wohnbereich: Home,
  balkon: Sun,
  abdichtung: ShieldCheck,
  reparatur: Wrench,
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function PricingCalculator() {
  // 1. Projekt- & Situationsangaben
  const [serviceType, setServiceType] = useState<CraftServiceType>("bad");
  const [roomSize, setRoomSize] = useState<RoomSizeType>("medium");
  const [customArea, setCustomArea] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "untergrund",
    "staubschutz",
  ]);
  const [propertyType] = useState<string>("bestand");
  const [timing, setTiming] = useState<string>("In den nächsten 1 - 3 Monaten");
  const [notes, setNotes] = useState<string>("");

  // 2. Kontaktdaten
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(true);

  // 3. Status & Anti-Bot
  const [honeypot, setHoneypot] = useState<string>("");
  const [formInitTime] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  const selectedService = CRAFT_SERVICES[serviceType] || CRAFT_SERVICES.bad;
  const selectedSize = ROOM_SIZES[roomSize] || ROOM_SIZES.medium;

  const toggleFeature = (id: string) => {
    triggerHaptic("light");
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic("medium");

    if (!name.trim()) {
      setErrorMessage("Bitte geben Sie Ihren Namen an.");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Bitte geben Sie eine Telefonnummer für den Rückruf an.");
      return;
    }

    if (!privacyAccepted) {
      setErrorMessage("Bitte willigen Sie in die Datenverarbeitung zur Kontaktaufnahme ein.");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    // Detaillierte Situationszusammenfassung für Deniz Tezgel
    const featureLabels = selectedFeatures
      .map((fId) => SITUATION_OPTIONS.find((opt) => opt.id === fId)?.label)
      .filter(Boolean);

    const propertyLabel =
      PROPERTY_TYPES.find((p) => p.id === propertyType)?.label || propertyType;

    const areaDescription = customArea.trim()
      ? `${customArea.trim()} m² (Kategorie: ${selectedSize.label})`
      : selectedSize.areaText;

    const fullSituationDescription = [
      notes.trim() ? `SITUATIONSSCHILDERUNG DES KUNDEN:\n${notes.trim()}\n` : "",
      `--- PROJEKTDETAILS ---`,
      `Gewerk: ${selectedService.title}`,
      `Fläche / Umfang: ${areaDescription}`,
      `Objektart: ${propertyLabel}`,
      `Zeitrahmen: ${timing}`,
      featureLabels.length > 0
        ? `Besonderheiten / Vorarbeiten:\n- ${featureLabels.join("\n- ")}`
        : "Besonderheiten: Keine besonderen Zusatzoptionen angewählt",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: serviceType === "bad" ? "bad" : "general",
          projectTitle: `${selectedService.title} (${selectedSize.label})`,
          projectType: serviceType,
          contact: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim() || undefined,
            location: location.trim() || "Aßlar / Wetzlar / Hessen",
          },
          area: areaDescription,
          timing: timing,
          notes: fullSituationDescription,
          honeypot: honeypot || undefined,
          _t: formInitTime,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Übertragung fehlgeschlagen.");
      }

      if (data.referenceId) {
        setReferenceId(data.referenceId);
      }

      setStatus("success");
    } catch (err: unknown) {
      console.error("Anfrageformular Fehler:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Die Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns direkt an.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setNotes("");
    setReferenceId("");
    setErrorMessage("");
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-200/90 overflow-hidden max-w-5xl mx-auto flex flex-col lg:flex-row">
      {/* ── Linke Spalte: Ausführliche Situations- & Bedarfsangabe ── */}
      <div className="flex-[3] p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/50 flex flex-col">
        {/* Phasen-Indikator */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              1
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Gewerk</span>
          </div>
          <div className="flex-1 h-[2px] bg-orange-200" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Fläche</span>
          </div>
          <div className="flex-1 h-[2px] bg-orange-200" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              3
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-800">Situation</span>
          </div>
        </div>

        {/* 1. Gewerk Auswahl */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              1. Welches Projekt planen Sie?
            </label>
            <span className="text-[11px] font-semibold text-orange-800 bg-orange-100/70 px-2 py-0.5 rounded-md">
              Auswahl erforderlich
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(CRAFT_SERVICES).map((srv) => {
              const Icon = SERVICE_ICONS[srv.id] || Sparkles;
              const isSelected = serviceType === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("light");
                    setServiceType(srv.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-white border-orange-500 ring-2 ring-orange-500/20 shadow-sm"
                      : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-orange-700 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-sm font-bold text-neutral-900 leading-tight">
                        {srv.title}
                      </div>
                      {srv.badge && (
                        <span className="text-[10px] font-semibold text-neutral-500 hidden sm:inline-block">
                          {srv.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-600 mt-1 leading-snug">
                      {srv.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Raumgröße / Fläche */}
        <div className="mb-7">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
            2. Geschätzte Grundfläche:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {Object.values(ROOM_SIZES).map((size) => {
              const isSelected = roomSize === size.id && !customArea;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("light");
                    setRoomSize(size.id);
                    setCustomArea("");
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-orange-500 ring-2 ring-orange-500/20 shadow-sm"
                      : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div className="text-xs font-bold text-neutral-900">{size.label}</div>
                  <div className="text-[11px] font-bold text-orange-800 mt-0.5">
                    {size.areaText}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="calc-custom-area" className="text-xs text-neutral-700 font-medium shrink-0">
              Oder genaue Quadratmeterzahl bekannt:
            </label>
            <div className="relative flex-1 max-w-[140px]">
              <input
                id="calc-custom-area"
                name="customArea"
                type="text"
                autoComplete="off"
                placeholder="z. B. 18"
                aria-label="Quadratmeterzahl manuell eingeben"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <span className="absolute right-3 top-1.5 text-xs text-neutral-700 font-semibold" aria-hidden="true">
                m²
              </span>
            </div>
          </div>
        </div>

        {/* 3. Vorarbeiten & Ausgangssituation */}
        <div className="mb-7">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
            3. Rahmenbedingungen & Vorarbeiten:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SITUATION_OPTIONS.map((opt) => {
              const isChecked = selectedFeatures.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleFeature(opt.id)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    isChecked
                      ? "bg-orange-50/70 border-orange-300 text-neutral-900"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                      isChecked
                        ? "bg-orange-700 border-orange-700 text-white"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 leading-snug">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                      {opt.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Ausführliche Situationsbeschreibung (Freitext) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="situation-notes"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              4. Schildern Sie kurz Ihre Situation &amp; Ihr Vorhaben:
            </label>
            <span className="text-[11px] text-neutral-500">Sehr hilfreich für Rückfragen</span>
          </div>
          <textarea
            id="situation-notes"
            name="notes"
            autoComplete="off"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Beschreiben Sie hier Ihre Ausgangslage: z. B. Zustand des Untergrunds, alte Fliesen vorhanden, Neubau oder bewohnter Bestand, besondere Vorstellungen wie Nischen oder barrierefreie Dusche, zeitliche Wünsche..."
            className="w-full p-3.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all resize-y"
          />
        </div>
      </div>

      {/* ── Rechte Spalte: Projektzusammenfassung & Kontaktübermittlung ── */}
      <div className="flex-[2] p-6 sm:p-8 lg:p-10 bg-neutral-900 text-white flex flex-col justify-between">
        {status === "success" ? (
          /* Erfolgsansicht nach Absenden */
          <div className="my-auto py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-mono font-bold">
              <span>Referenz: {referenceId || "TEZ-ANFRAGE"}</span>
            </div>

            <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Anfrage erfolgreich übermittelt!
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
              Vielen Dank, <strong>{name}</strong>! Ihre Situationsbeschreibung und Kontaktdaten
              sind direkt bei Herrn Deniz Tezgel eingegangen.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-neutral-300 space-y-1.5">
              <div className="font-bold text-white text-sm mb-1">So geht es weiter:</div>
              <p>1. Deniz Tezgel prüft Ihre Angaben persönlich.</p>
              <p>2. Sie erhalten zeitnah einen Anruf oder eine Nachricht zur Abstimmung.</p>
              <p>3. Kostenfreies Vor-Ort-Aufmaß &amp; verbindliches Festpreisangebot.</p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Weitere Projektanfrage senden
            </button>
          </div>
        ) : (
          /* Formular-Ansicht */
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between space-y-6">
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/30 text-orange-300 border border-orange-500/40 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Preise individuell auf Anfrage</span>
              </div>

              <p className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                Unverbindliche Projektanfrage
              </p>

              <p className="text-xs text-neutral-300 leading-relaxed mb-5">
                Wir zeigen keine pauschalen Scheinpreise im Netz. Jedes Bauvorhaben ist einzigartig.
                Beschreiben Sie Ihr Vorhaben – wir melden uns für ein kostenfreies Vor-Ort-Aufmaß
                und Ihr verlässliches Festpreisangebot.
              </p>

              {/* Projekt-Zusammenfassung Box */}
              <div className="rounded-xl bg-neutral-800/80 border border-neutral-700/80 p-3.5 space-y-2 mb-6 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Gewerk:</span>
                  <span className="font-bold text-white">{selectedService.title}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Fläche:</span>
                  <span className="font-bold text-white">
                    {customArea.trim() ? `${customArea.trim()} m²` : selectedSize.areaText}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Vor-Ort-Aufmaß:</span>
                  <span className="font-bold text-emerald-400">0 € (Kostenfrei)</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Angebot:</span>
                  <span className="font-bold text-emerald-400">Verbindlicher Festpreis</span>
                </div>
              </div>

              {/* Fehleranzeige */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot Feld für Bot-Schutz */}
              <input
                type="text"
                name="organization_fax"
                id="calc-organization-fax"
                aria-label="Faxnummer (Spamschutz)"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
              />

              {/* Eingabefelder Kontaktdaten */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="calc-name" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Ihr Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="calc-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vor- und Nachname"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="calc-phone" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Telefonnummer <span className="text-orange-400">*</span>
                    </label>
                    <input
                      id="calc-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="z. B. 0170 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="calc-email" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      E-Mail-Adresse
                    </label>
                    <input
                      id="calc-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ihre@email.de"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="calc-location" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Einsatzort / PLZ
                    </label>
                    <input
                      id="calc-location"
                      name="location"
                      type="text"
                      autoComplete="address-level2"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="z. B. Aßlar, Wetzlar..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="calc-timing" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Gewünschter Zeitraum
                    </label>
                    <select
                      id="calc-timing"
                      name="timing"
                      aria-label="Gewünschter Zeitraum"
                      value={timing}
                      onChange={(e) => setTiming(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    >
                      {TIMING_OPTIONS.map((t) => (
                        <option key={t} value={t} className="bg-neutral-800 text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Datenschutz Checkbox */}
                <label className="flex items-start gap-2 pt-2 cursor-pointer text-[11px] text-neutral-300">
                  <input
                    type="checkbox"
                    id="calc-privacy"
                    name="privacyAccepted"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-700 bg-neutral-800 text-orange-600 focus:ring-orange-500"
                  />
                  <span>
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Beantwortung meiner
                    Anfrage verarbeitet werden.
                  </span>
                </label>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-3 pt-2 border-t border-neutral-800">
              <HeartbeatCTA className="w-full">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-orange-700 hover:bg-orange-600 active:bg-orange-800 disabled:opacity-60 text-white font-bold text-sm shadow-lg shadow-orange-950/50 transition-all cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Anfrage wird übertragen...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Unverbindliche Anfrage absenden</span>
                    </>
                  )}
                </button>
              </HeartbeatCTA>

              <div className="text-center">
                <span className="text-[11px] text-neutral-400">Oder bei dringenden Fragen direkt anrufen:</span>
                <a
                  href={siteConfig.contact.phone.link}
                  className="mt-1 flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>{siteConfig.contact.phone.formatted}</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export { PricingCalculator };
