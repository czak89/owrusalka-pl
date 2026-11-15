# TODO

Stan na 2026-11-15 (po drugiej sesji). Kolejność = priorytet. Szczegóły decyzji: `docs/DECISIONS.md`.

## 1. Blokuje podmianę `main`

- [ ] **Wysyłka formularzy: podłączyć adres.** Kod jest gotowy (`components/send-form.jsx`): wysyłka, stan „Wysyłam…", błąd z ponowieniem, zgoda RODO, pułapka na boty. Bez `NEXT_PUBLIC_FORM_ENDPOINT` strona działa w trybie pokazowym: nic nie wysyła i mówi o tym na potwierdzeniu. Potrzebna decyzja właściciela: Web3Forms (plan z `MIGRATION.md`; wtedy `NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit` i klucz w `NEXT_PUBLIC_FORM_KEY`) czy własny endpoint na serwerze firmowym (ma przyjąć JSON metodą POST i odpowiedzieć 2xx). Potem dopisać zmienne w `pages.yml` i sprawdzić: `node scripts/check-forms.cjs <adres> live`.
- [ ] **RODO: potwierdzić treść zgody i dodać politykę prywatności.** Zgoda przy formularzu podaje jako administratora „Ośrodek Wypoczynkowy „Rusałka”, ul. Leśna 22, 76-002 Łazy". Właściciel musi podać pełną nazwę prawną administratora. Link „Polityka prywatności" w stopce prowadzi donikąd (`#`): potrzebna strona z treścią od właściciela.
- [ ] **CI: doprowadzić do zielonego na pull requeście `next` → `main`** (bez scalania). Lokalnie przechodzą: build, `npm run lint:css`, Lighthouse (dostępność 0,91–0,98, SEO 0,92; wydajność tylko ostrzega). `links.yml` (lychee) nie dało się uruchomić lokalnie, wynik pokaże dopiero GitHub.
- [ ] **Akceptacja właściciela** wyglądu `next` w obu motywach i na telefonie, potem podmiana `main`.

## 2. Przed publikacją

- [ ] **Tekst 14–15 px.** Reguła mówi: treść 16 px. Podniesione zostało tylko to, co było poniżej 14 px. Opisy w kartach mają nadal 14–15 px. Decyzja: podnieść do 16 px (zmieni układ kart, trzeba obejrzeć każdą stronę) albo złagodzić regułę w przewodniku.
- [ ] **Zdjęcia.** Są dwa małe pliki z prototypu (`public/photos/hero-pc-1.webp`, `hero-pc-3.webp`, ok. 300 px). Reszta to zaślepki `ImageSlot`. Lista slotów: `grep -o 'ImageSlot id=[^ ]*' components/*.jsx`. Dodawanie: plik do `public/photos/`, wpis w `components/photos.js`.
- [ ] **Okno rezerwacji: stałe 7 nocy.** `BookingModal` pokazuje „Ilość nocy: 7" i sumę `cena × 7` bez względu na wpisane daty (pozostałość prototypu; daty to zwykłe pola tekstowe). Do recepcji idą tylko daty, pokój i goście, bez tej sumy. Do decyzji: liczyć naprawdę, usunąć sumę albo zastąpić okno linkiem do kreatora `/rezerwacja`.
- [ ] **Kreator przyjmuje terminy poza sezonem** (np. listopad). Reguły w `components/rez-data.jsx` znają tylko turnusy letnie; daty otwarcia ośrodka musi podać właściciel. Powiązane z „Prawdziwa dostępność terminów" niżej.
- [ ] **Uwagi z Lighthouse (nie blokują CI):** kolejność nagłówków (`h4`/`h5` w stopce, kartach i oknie rezerwacji), kontrast licznika w zakładkach pokoi (4,12:1), nazwa linku „Start".
- [ ] **Przełącznik „PL · EN"** jest tylko etykietą. Albo wersja angielska, albo usunąć do czasu jej powstania.

## 3. Decyzje do potwierdzenia przez właściciela

- [ ] **Kolory hover** `#FF8A5C` (Coral) i `#45C0E8` (Baltic): rozjaśnianie zamiast przyciemniania. Wprowadzone poza briefem, żeby ciemna etykieta zachowała kontrast.
- [ ] **Para błędu w motywie ciemnym** `#FF8F7A` na `#3A1F1C`: propozycja, prototyp nie miał własnej.
- [ ] **Ikony Lucide** jako zamiennik do czasu własnego zestawu.
- [ ] **Próg 640 px** dla mobilnej skali typografii.

## 4. Design system

- [ ] **Logo w SVG.** Są tylko PNG (`logo-rusalka-full.png`, `logo-rusalka-on-dark.png`; ten drugi powstał z pierwszego przez przebarwienie napisu). Potrzebny oryginał wektorowy od autora logo.
- [ ] **Nowa zmienna `--bk-accent-text` w `styles/rez.css`** (akcent jako mały tekst w kreatorze = rola `--accent-text`). Dopisać do przewodnika: Coral nie jest kolorem małego tekstu.
- [ ] **Synchronizacja artefaktu z repo.** Dwie kopie systemu (artefakt na claude.ai i `design-system/`). Brakuje skryptu, który generuje `tokens.css` z `tokens.json` i pilnuje zgodności.
- [ ] **Dokument stylu.** `docs/Rusalka-przewodnik-po-stylu-PL-EN.docx` to wersja 1.2. Aktualizować przy każdej zmianie tokenów.

## 5. Później

- [ ] **Przenosiny na serwer firmowy.** Budować bez `NEXT_PUBLIC_BASE_PATH`, wgrać `out/`. Serwer musi podawać `index.html` z katalogów (adresy kończą się ukośnikiem) i własną stronę 404. Przepisać lub wyłączyć `pages.yml`.
- [ ] **Prawdziwa dostępność terminów.** Kalendarz używa reguł sezonu z `components/rez-data.jsx`. Wymaga backendu.
- [ ] **Panel administracyjny.** Makieta na gałęzi `html-prototype` (`admin-panel/`). Odłożony; wymaga serwera, logowania i decyzji, czy to część RusałkaHub.
- [ ] **Z `MIGRATION.md`:** aktualności z Facebooka pobierane przy budowaniu, cennik z plików Markdown.
- [ ] **Porządki na `main` przy podmianie:** w repo są śledzone foldery narzędziowe `.omc/`, `.omx/`, `.playwright-cli/` (na `next` już ich nie ma) oraz `intro.mp4` w LFS, którego żadna strona nie używa.
- [ ] **Lokalne foldery właściciela.** `Github/owrusalka` było dwa merge'e za GitHubem (wymaga `git pull`); `Github/project/owrusalka-pl` (bez gita) jest zbędną kopią, bo całość jest w repo.

## Zrobione (2026-11-15, druga sesja)

- [x] **Formularze:** wspólna wysyłka dla okna rezerwacji i kreatora, stan „Wysyłam…", komunikat błędu (rola `--error`) z ponowieniem, zgoda RODO, pułapka na boty i minimalny czas wypełnienia, tryb pokazowy bez endpointu. Potwierdzenie nie obiecuje już maila do gościa. Test: `scripts/check-forms.cjs`.
- [x] **CI przygotowane:** stylelint jako zależność projektu (`npm run lint:css`; wywołanie przez `npx -p` nie znajdowało konfiguracji), wyłączone reguły czysto formatujące, poprawione prawdziwe uwagi; link-check pomija własną domenę produkcyjną.
- [x] **Motyw ciemny kreatora:** przejrzany krok po kroku (1280 i 390 px). Naprawione: przełącznik motywu nie działał na `/rezerwacja`; komunikaty walidacji danych nigdy się nie pokazywały (przycisk „Dalej" był zablokowany); mały tekst w kolorze Coral (2,61:1 w jasnym motywie) używa teraz roli `--accent-text`; dni zablokowane używają `--error`.
- [x] **SEO i meta:** opisy i adresy kanoniczne wszystkich stron, Open Graph z obrazkiem (`scripts/gen-og.cjs`), `sitemap.xml`, `robots.txt`, dane strukturalne LodgingBusiness. Adres strony: `NEXT_PUBLIC_SITE_URL` (domyślnie `https://owrusalka.pl`).
- [x] **Strona 404** w stylu marki (`app/not-found.jsx`).
- [x] **Ikona strony:** kadr na słońce z falą, znak około 2 razy większy w 16 px; dodana ikona Apple.
- [x] Drobne: przycisk „Trasa w Google Maps" prowadzi do nawigacji; wyłączone przyciski wyglądają na wyłączone; usunięte znaczniki konfliktu z `docs/rusalka-info.md`.

## Zrobione (2026-11-15)

- [x] Scalenie obu prototypów na gałęzi `html-prototype`.
- [x] Przebudowa na Next.js: 7 stron i `/rezerwacja`, statyczny eksport, konfigurowalna ścieżka bazowa.
- [x] Design system jako jedyne źródło stylu; czcionki hostowane lokalnie.
- [x] Motyw ciemny z zapamiętaniem wyboru; logo w dwóch wersjach.
- [x] Dostępność: ciemne etykiety na akcentach, Baltic Dark, Brick Red, pełny obrys fokusu, minimum 12 px.
- [x] Naprawa uciętego hero na telefonie.
- [x] Obie gałęzie wypchnięte na GitHub; `main` bez zmian.
