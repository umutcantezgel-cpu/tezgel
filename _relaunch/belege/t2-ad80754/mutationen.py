# Mutationsprobe P3-16 (Kern-Ansichten auf /): je Mutation genau eine Ersetzung, Zählung muss 1 sein.
import sys
M = sys.argv[1]
MUT = [
 ('K1 F-01 Telefonfeld übernimmt Eingabe nicht', 'src/components/kern/formulare/HeroKontakt.tsx', "onChange={(e) => setPhone(e.target.value)}", "onChange={() => setPhone('')}"),
 ('K2 F-02 Datenschutz-Haken bleibt aus', 'src/components/kern/formulare/b/PreisrechnerAnsicht.tsx', "onChange={(e) => setPrivacyAccepted(e.target.checked)}", "onChange={() => setPrivacyAccepted(false)}"),
 ('K3 F-03 Weiter zu Schritt 3 bleibt auf 2', 'src/components/kern/formulare/b/AnfrageFunnelAnsicht.tsx', "<Knopf onClick={() => setStep(3)}", "<Knopf onClick={() => setStep(2)}"),
 ('K4 F-11 Alle ablehnen ruft Annehmen (beide Ebenen)', 'src/components/kern/einwilligung/Banner.tsx', "mitFokus('zurueck', handleDeclineAll)}>\n                    Alle ablehnen", "mitFokus('zurueck', handleAcceptAll)}>\n                    Alle ablehnen"),
 ('K5 F-12 Karte laden öffnet nur Einstellungen', 'src/components/kern/einwilligung/KartenPlatzhalter.tsx', "onLaden={handleAccept}", "onLaden={zuDenEinstellungen}"),
 ('K6 F-15 Telefon der Leiste falsch', 'src/components/kern/fuss/UntereLeiste.tsx', "href={`tel:${contact.phoneLink}`}", "href={`tel:${contact.phoneLink}0`}"),
 ('K7 F-10 WhatsApp-Kanal falsche Nummer', 'src/components/kern/fuss/WhatsAppKanal.tsx', "buildWhatsAppUrl(whatsappNumber, contextMessage)", "buildWhatsAppUrl('491700000000', contextMessage)"),
 ('K8 F-13 Mobilmenü-Schalter zielt ins Leere', 'src/components/kern/kopf-b/Mobilmenue.tsx', "popoverTarget={blattId}", "popoverTarget={blattId + 'x'}"),
 ('K9 F-19 Karussell „weiter“ blättert zurück', 'src/components/kern/start/vertrauen/Karussell.tsx', "onClick={() => blaettern(1)}", "onClick={() => blaettern(-1)}"),
]
for name, datei, alt, neu in MUT:
    p = f'{M}/{datei}'; s = open(p, encoding='utf-8').read(); n = s.count(alt)
    soll = 2 if name.startswith('K4') else 1
    if s.count(neu) and n == 0: print('schon', name); continue
    if n != soll: sys.exit(f'ABBRUCH {name}: {n} Treffer in {datei}')
    open(p, 'w', encoding='utf-8').write(s.replace(alt, neu)); print('ok', name)
