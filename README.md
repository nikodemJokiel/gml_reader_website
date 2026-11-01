# GML Reader — Strona internetowa

Oficjalna strona internetowa programu **GML Reader** służąca do dystrybucji instalatora, prezentacji możliwości programu oraz publikacji instrukcji obsługi.

Strona została zbudowana w oparciu o czysty HTML5, nowoczesny CSS3 (z obsługą motywu jasnego/ciemnego) oraz lekki JavaScript bez zewnętrznych zależności i frameworków.

## Struktura projektu

```
gml_reader_website/
├── assets/
│   ├── icon.ico                    # Ikona aplikacji (favicon)
│   ├── icon.png                    # Logo PNG o wysokiej rozdzielczości
│   └── screenshots/                # Miejsce na zrzuty ekranu
├── css/
│   └── style.css                   # Kompletny design system (motyw jasny/ciemny, responsywność, print)
├── js/
│   └── main.js                     # Przełącznik motywu, kopiowanie emaila, menu mobilne
├── index.html                      # Strona główna (landing page)
├── download.html                   # Strona pobierania (tabela wersji)
├── user-manual.html                # Kompletna instrukcja obsługi
├── contact.html                    # Kontakt i informacje licencyjne
├── versions/
│   └── 2.0.html                    # Co nowego w wersji 2.0
├── robots.txt                      # Zasady indeksowania i blokada crawlerów AI
├── sitemap.xml                     # Mapa witryny dla wyszukiwarek
├── _headers                        # Nagłówki bezpieczeństwa i cache dla Cloudflare Pages
└── requirements.md                 # Wymagania pierwotne
```

## Jak dodać nową wersję programu?

Gdy pojawi się nowa wersja programu (np. `2.1`):
1. **Wgraj instalator do Cloudflare R2:**
   - Wgraj plik `GML_Reader_Setup_2.1.exe` do Twojego publicznego bucketu R2.
2. **Dodaj stronę nowości:**
   - Utwórz plik `versions/2.1.html` (możesz skopiować `versions/2.0.html` i zaktualizować opis).
3. **Zaktualizuj tabelę w `download.html`:**
   - Dodaj nowy wiersz `<tr>` na samej górze tabeli z badge `<span class="badge-new">NOWOŚĆ</span>`.
   - Z poprzedniej wersji (np. 2.0) usuń badge `NOWOŚĆ`.
4. **Zaktualizuj `sitemap.xml`:**
   - Dodaj adres nowej podstrony `https://gml-reader.pages.dev/versions/2.1.html`.
5. **Wypchnij zmiany do Git:**
   - `git add . && git commit -m "Wydanie wersji 2.1" && git push`
   - Cloudflare Pages automatycznie wdroży zmiany w ciągu kilku sekund!


## Wdrożenie na Cloudflare Pages

1. Połącz repozytorium GitHub `nikodemJokiel/gml_reader_website` z Cloudflare Pages.
2. Ustawienia projektu:
   - **Framework preset:** `None`
   - **Build command:** *(pozostaw puste)*
   - **Build output directory:** `/` (root)
3. Domena produkcyjna: `gml-reader.pages.dev`
