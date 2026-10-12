# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Zum Hauptinhalt springen" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - img [ref=e5]
    - heading "Ein unerwarteter Fehler ist aufgetreten" [level=3] [ref=e7]
    - paragraph [ref=e8]: Dieser Abschnitt konnte leider nicht korrekt geladen werden.
    - button "Erneut versuchen" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Erneut versuchen
  - alert [ref=e14]
```