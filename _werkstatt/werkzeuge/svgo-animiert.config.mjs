// SVGO-Konfiguration „animiert“ (K-009, Z-08): Dateien mit Kennungen, Gruppen oder Formen für Bewegung.
// Werte unverändert aus svg.mjs (vormals Konstante ANIMIERT) übernommen: cleanupIds, removeUnknownsAndDefaults,
// collapseGroups und convertShapeToPath sind ausgeschaltet, damit id, Gruppen und Formen erhalten bleiben.
// removeViewBox ist in svgo 4.1.0 nicht Teil von preset-default; ein Override dafür erzeugt nur eine Warnung und wird daher nicht gesetzt.
// multipass: false, wie in svgo-statisch.config.mjs (gleiche Begründung).
export default {
  multipass: false,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          removeUnknownsAndDefaults: false,
          collapseGroups: false,
          convertShapeToPath: false,
        },
      },
    },
  ],
};
