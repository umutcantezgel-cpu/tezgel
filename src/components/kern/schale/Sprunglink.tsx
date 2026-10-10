// Sprunglink zum Inhalt (K-011, AUFTRAG „Sprunglink zum Inhalt“): erster Tab-Halt, sichtbar bei Fokus.
export default function Sprunglink() {
  return (
    <a
      href="#main-content"
      className="sr-only k-text text-k-2 focus:not-sr-only focus:fixed focus:top-k-3 focus:left-k-3 focus:z-50 focus:bg-k-tinte focus:text-k-kalk focus:px-k-4 focus:py-k-3 focus:outline-2 focus:outline-offset-2 focus:outline-k-laser"
    >
      Zum Hauptinhalt springen
    </a>
  );
}
