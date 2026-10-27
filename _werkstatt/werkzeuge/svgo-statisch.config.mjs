// SVGO-Konfiguration „statisch“ (K-009, Z-08): Icons und Zeichnungen ohne Bewegung.
// Werte unverändert aus svg.mjs (vormals Konstante STATISCH) übernommen.
// multipass: false, wie in svg.mjs (zwei einzelne Läufe mit Vergleich opt1 === opt2);
// mit multipass: true würde jeder Lauf schon ein Fixpunkt sein und die Prüfung wäre wirkungslos.
export default {
  multipass: false,
  // Zugänglichkeit bleibt (Z-08, E-075): role am <svg> und die Kennungen von <title>/<desc>, auf die aria-labelledby zeigt
  plugins: [{ name: 'preset-default', params: { overrides: { removeUnknownsAndDefaults: { keepRoleAttr: true }, cleanupIds: { preserve: ['title', 'desc'] } } } }],
};
