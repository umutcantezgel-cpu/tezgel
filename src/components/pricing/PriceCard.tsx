// PriceCard (S-26, KERN v2 K-005/K-009; nur /preise): Leistungspaket als Feld im Fugenraster statt als Karte – kein
// Abheben, kein Schatten, keine Rundung. Folge wie im Bestand: Etikett (nur beim hervorgehobenen Paket), Titel mit
// Beschreibung, Preis, Merkmale, ein Weg. Preis und Preiszusatz in Mono; Maße und Normen in Merkmalen und Beschreibung
// ebenfalls in Mono (Wortlaut gleich, nur die Schrift wechselt). Merkmale an Fugenkreuzen in Textschrift.
// „Empfohlener Standard“ (isPopular) bleibt wörtlich als Mono-Etikett mit Fugenkreuz (wertende Eckmarke, Rückgabe S-26);
// das hervorgehobene Paket trägt den Hauptknopf, die übrigen den Nebenknopf (ein Hauptknopf je Bildschirm).
// Fluchten: Im Raster der Seite (Feldraster) spannt jedes Feld fünf Zeilen und übernimmt sie als Subgrid – Etikett, Titel,
// Preis, Merkmale und Knopf stehen in einer Reihe von Feldern auf denselben Linien. Ohne umgebendes Raster stapelt das
// Feld einfach. Server-Komponente.
// E4-W1-FORMULARE (F5): Texte bleiben Zeichenketten. Ein Glossarbegriff steht im Text als [[id|Wort]] und wird hier zum
// Baustein Fachwort (beim ersten Vorkommen auf der Seite mit Alltagserklärung); Bindestrichwörter sind aufgelöst.
import clsx from "clsx";
import { Fragment, type ReactNode } from "react";
import Fachwort from "@/components/kern/Fachwort";
import Fugenkreuz from "@/components/kern/Fugenkreuz";
import Knopf from "@/components/kern/Knopf";
import { etikettKlassen } from "@/components/kern/stile";
import type { GlossarId } from "@/config/glossar";

interface PriceCardProps {
  title: string;
  price?: number | string;
  priceSubtitle?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaHref?: string;
  /** Element des Feldes: li im Feldraster (als Liste), sonst div */
  als?: "div" | "li";
  className?: string;
}

// Maße, Normen, Klassen: Formate („60x60 cm“), Plattenstärke („2 cm“), DIN-Normen, Rutschhemmung, Kleberklassen
const MASS = /(\d+x\d+ cm|\d+ cm|DIN \d+|R\d+\b|S1\/S2|C2 TE)/;
// Glossarbaustein im Text: [[id|Wort]]
const BAUSTEIN = /(\[\[[a-z0-9-]+\|[^\]]+\]\])/;

/** Text mit Maßen in Mono, eine Stufe kleiner wie die Mengen im Rechner (Wortlaut unverändert, die Maße brechen nicht in sich um) */
function mitMassen(text: string): ReactNode {
  return text
    .split(MASS)
    .map((teil, i) => (i % 2 === 1 ? <span key={i} className="whitespace-nowrap font-mono text-fs-1">{teil}</span> : teil));
}

/** Text mit Glossarbausteinen [[id|Wort]] (Fachwort) und Maßen in Mono */
function mitBausteinen(text: string): ReactNode {
  return text.split(BAUSTEIN).map((teil, i) => {
    const baustein = /^\[\[([a-z0-9-]+)\|([^\]]+)\]\]$/.exec(teil);
    if (!baustein) return <Fragment key={i}>{mitMassen(teil)}</Fragment>;
    return (
      <Fachwort key={i} id={baustein[1] as GlossarId}>
        {baustein[2]}
      </Fachwort>
    );
  });
}

export default function PriceCard({
  title,
  price = "Auf Anfrage",
  priceSubtitle = "Individuelles Festpreisangebot",
  description,
  features,
  isPopular = false,
  ctaText = "Termin vor Ort anfragen",
  ctaHref = "/kontakt#express-anfrage",
  als = "div",
  className,
}: PriceCardProps) {
  const Tag = als;
  return (
    <Tag className={clsx("row-span-5 grid grid-rows-subgrid bg-fliese p-6 lg:p-8", className)}>
      {/* 1 · Etikett: nur beim hervorgehobenen Paket; die übrigen Felder halten die Zeile leer */}
      {isPopular ? (
        <p className={clsx(etikettKlassen, "mb-4 text-tinte")}>
          <Fugenkreuz className="size-3 shrink-0 text-strich" />
          Empfohlener Standard
        </p>
      ) : (
        <span aria-hidden="true" />
      )}

      {/* 2 · Titel und Beschreibung */}
      <div>
        <p className="font-anzeige text-fs-4 font-semibold text-tinte">{title}</p>
        <p className="mt-2 font-text text-fs-2 text-pretty text-tinte-2">{mitBausteinen(description)}</p>
      </div>

      {/* 3 · Preis in Mono an der Fuge */}
      <div className="mt-6 flex flex-col items-start gap-1 border-t border-fuge pt-6">
        <span className="font-mono text-fs-4 text-tinte">
          {typeof price === "number" ? `ab ${price} €` : price}
        </span>
        {priceSubtitle && <span className="font-mono text-fs-1 text-tinte-2">{priceSubtitle}</span>}
      </div>

      {/* 4 · Merkmale an Fugenkreuzen */}
      <ul className="mt-6 flex flex-col gap-3 font-text text-fs-2 text-tinte">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Fugenkreuz className="mt-2 size-3 shrink-0 text-strich" />
            <span className="min-w-0 hyphens-auto wrap-break-word">{mitBausteinen(feature)}</span>
          </li>
        ))}
      </ul>

      {/* 5 · ein Weg */}
      <div className="mt-8 flex items-end">
        {/* Lange Wörter wie „Großformat“ trennen sich im Knopf erst ab 10 Zeichen, wenn die Breite bei großer Schrift nicht reicht */}
        <Knopf href={ctaHref} variante={isPopular ? "haupt" : "neben"} className="w-full [hyphenate-limit-chars:10_4_4]">
          {ctaText}
        </Knopf>
      </div>
    </Tag>
  );
}
