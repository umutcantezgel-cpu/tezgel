// SVGO-Konfiguration „statisch“ (K-009, Z-08): Icons und Zeichnungen ohne Bewegung.
// Werte unverändert aus svg.mjs (vormals Konstante STATISCH) übernommen.
// multipass: false, wie in svg.mjs (zwei einzelne Läufe mit Vergleich opt1 === opt2);
// mit multipass: true würde jeder Lauf schon ein Fixpunkt sein und die Prüfung wäre wirkungslos.
export default {
  multipass: false,
  plugins: ['preset-default'],
};
