// Messbares in Mono (K-005): setzt Zahlen (auch „DIN 18534“, „5,0“) eines Textes in IBM Plex Mono.
// Reine Darstellung – der Textinhalt bleibt Zeichen für Zeichen gleich.
const ZAHL = /((?:DIN )?\d+(?:,\d+)?)/;

export default function MonoZahlen({ text }: { text: string }) {
  return (
    <>
      {text.split(ZAHL).map((teil, i) =>
        i % 2 === 1 ? (
          <span key={i} className="k-mono">
            {teil}
          </span>
        ) : (
          teil
        ),
      )}
    </>
  );
}
