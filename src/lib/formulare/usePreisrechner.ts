// Logik der Projektanfrage im Preisrechner (F-02, PricingCalculator) – wörtlich aus der Komponente verschoben (P3-00l).
// Ohne Markup (PricingCalculator auf /preise, /leistungen/[id] und /faq). Ohne vorab gewählte Fläche und ohne vorab angehakte Situationen
// (E4-W0-LEISTUNGEN, E3-SICHT): wer nichts wählt, sendet keine Fläche; Pflichtfelder und Empfänger unverändert (G8).
import React, { useState } from "react";
import {
  CRAFT_SERVICES,
  ROOM_SIZES,
  SITUATION_OPTIONS,
  PROPERTY_TYPES,
  type CraftServiceType,
  type RoomSizeType,
} from "@/components/pricing/pricing.constants";
import { triggerHaptic } from "@/lib/haptics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function usePreisrechner() {
  // 1. Projekt- & Situationsangaben
  const [serviceType, setServiceType] = useState<CraftServiceType>("bad");
  const [roomSize, setRoomSize] = useState<RoomSizeType | null>(null);
  const [customArea, setCustomArea] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [propertyType] = useState<string>("bestand");
  const [timing, setTiming] = useState<string>("In den nächsten 1 - 3 Monaten");
  const [notes, setNotes] = useState<string>("");

  // 2. Kontaktdaten
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  // Einwilligung nie vorab erteilt: Besucher setzen den Haken selbst (Fairness, E-014).
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);

  // 3. Status & Anti-Bot
  const [honeypot, setHoneypot] = useState<string>("");
  const [formInitTime] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  const selectedService = CRAFT_SERVICES[serviceType] || CRAFT_SERVICES.bad;
  const selectedSize = roomSize ? ROOM_SIZES[roomSize] : null;

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
      ? `${customArea.trim()} m²${selectedSize ? ` (Kategorie: ${selectedSize.label})` : ""}`
      : selectedSize?.areaText ?? "";

    const fullSituationDescription = [
      notes.trim() ? `SITUATIONSSCHILDERUNG DES KUNDEN:\n${notes.trim()}\n` : "",
      `--- PROJEKTDETAILS ---`,
      `Gewerk: ${selectedService.title}`,
      `Fläche / Umfang: ${areaDescription || "keine Angabe"}`,
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
          projectTitle: selectedSize ? `${selectedService.title} (${selectedSize.label})` : selectedService.title,
          projectType: serviceType,
          contact: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim() || undefined,
            location: location.trim() || "Aßlar / Wetzlar / Hessen",
          },
          area: areaDescription || undefined,
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

  const selectService = (id: CraftServiceType) => {
    triggerHaptic("light");
    setServiceType(id);
  };

  const selectRoomSize = (id: RoomSizeType) => {
    triggerHaptic("light");
    setRoomSize(id);
    setCustomArea("");
  };

  return {
    serviceType,
    roomSize,
    customArea,
    setCustomArea,
    selectedFeatures,
    timing,
    setTiming,
    notes,
    setNotes,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    location,
    setLocation,
    privacyAccepted,
    setPrivacyAccepted,
    honeypot,
    setHoneypot,
    status,
    errorMessage,
    referenceId,
    selectedService,
    selectedSize,
    toggleFeature,
    handleSubmit,
    handleReset,
    selectService,
    selectRoomSize,
  };
}
