// Sprunglink zum Inhalt (K-011): erster Tab-Halt, sichtbar bei Fokus – im System (Tinte, Laser-Kontur) statt der alten
// Orange-Fläche; Ziel und Wortlaut unverändert.
export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-tinte focus:px-4 focus:py-3 focus:text-fs-2 focus:font-semibold focus:text-kalk focus:outline-2 focus:outline-offset-2 focus:outline-laser"
    >
      Zum Hauptinhalt springen
    </a>
  );
}

export default SkipNav;
