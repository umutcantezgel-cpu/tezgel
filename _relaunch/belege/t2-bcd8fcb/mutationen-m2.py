# Mutationsprobe 2 (P3-16, nach P3-14-GEG/P3-14e): Fälle ohne Abdeckung, Kern und Bestand. Je Eintrag Soll-Trefferzahl.
import sys
M = sys.argv[1]
MUT = [
 ('K10 V-06 Kern-Kopf ohne Kennung', 'src/components/kern/kopf-b/Kopf.tsx', 'data-kopf="b"', 'data-kopf="x"', 1),
 ('K11 Kern-Menüschalter auch ab xl sichtbar', 'src/components/kern/kopf-b/Mobilmenue.tsx', 'border-l border-k-fuge pl-k-2 xl:hidden">', 'border-l border-k-fuge pl-k-2">', 1),
 ('K12 FAQ-Eintrag immer offen', 'src/components/kern/basis/Akkordeon.tsx', 'open={offen}', 'open={true}', 1),
 ('K13 Platzhalter „Cookie-Einstellungen“ stimmt zu', 'src/components/kern/einwilligung/KartenPlatzhalter.tsx', "const zuDenEinstellungen = () => { window.location.hash = 'cookie-settings'; };", 'const zuDenEinstellungen = () => { handleAccept(); };', 1),
 ('K14 Hero-Vorhaben bleibt „bad“', 'src/components/kern/formulare/HeroKontakt.tsx', 'onChange={() => setProjectType(opt.id)}', "onChange={() => setProjectType('bad')}", 1),
 ('K15 Kern-Kanal mit vorgetäuschtem Abzeichen', 'src/components/kern/fuss/WhatsAppKanal.tsx', '<Icon name="whatsapp" groesse={20} />', '<Icon name="whatsapp" groesse={20} /><span>1</span>', 1),
 ('K16 Kern-Banner Marketing-Haken ohne Wirkung', 'src/components/kern/einwilligung/Banner.tsx', "if (key === 'marketing') setMarketingChecked(!marketingChecked);", '', 1),
 ('B1 Bestand-Drawer-Schalter ohne Wirkung', 'src/components/common/Header.jsx', 'onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}', 'onClick={() => {}}', 1),
 ('B2 Bestand-Banner „Alle ablehnen“ stimmt zu', 'src/components/common/CookieConsent.tsx', 'onClick={handleDeclineAll}', 'onClick={handleAcceptAll}', 2),
 ('B3 Bestand-Widget mit Abzeichen von Anfang an', 'src/components/common/FloatingWhatsAppWidget.tsx', 'const [showBadge, setShowBadge] = useState(false);', 'const [showBadge, setShowBadge] = useState(true);', 1),
 ('B4 #cookie-settings beim Laden ignoriert (gemeinsamer Hook)', 'src/lib/formulare/useEinwilligungsBanner.ts', '    if (window.location.hash === "#cookie-settings") {\n      handleHashChange();\n    }\n', '', 1),
]
for name, datei, alt, neu, soll in MUT:
    p = f'{M}/{datei}'; s = open(p, encoding='utf-8').read(); n = s.count(alt)
    if n != soll: sys.exit(f'ABBRUCH {name}: {n} Treffer (soll {soll}) in {datei}')
    open(p, 'w', encoding='utf-8').write(s.replace(alt, neu)); print('ok', name)
