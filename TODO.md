# TODO

Stan na 2026-11-15. Kolejność = priorytet. Szczegóły decyzji: `docs/DECISIONS.md`.

## 1. Blokuje podmianę `main`

- [ ] **Wysyłka formularzy.** Okno rezerwacji (`BookingModal` w `components/sections.jsx`) i kreator `/rezerwacja` (`components/rez-app.jsx`, krok `Confirmation` w `rez-steps.jsx`) kończą się tylko potwierdzeniem na ekranie. Potrzebna decyzja właściciela: e-mail na recepcję przez usługę typu Web3Forms (plan z `MIGRATION.md`) czy własny endpoint na serwerze firmowym. Do zrobienia: wysyłka, stan „wysyłam", obsługa błędu (rola `--error`), ochrona przed spamem, zgoda RODO przy formularzu.
- [ ] **Uruchomić CI.** Workflowy w `.github/workflows/` są przepisane pod Next.js, ale nigdy nie działały. Otworzyć pull request `next` → `main` (bez scalania) i naprawić to, co zgłosi `validate.yml` (stylelint na `styles/*.css`), `lighthouse.yml` i `links.yml`.
- [ ] **Akceptacja właściciela** wyglądu `next` w obu motywach i na telefonie, potem podmiana `main`.

## 2. Przed publikacją

- [ ] **Tekst 14–15 px.** Reguła mówi: treść 16 px. Podniesione zostało tylko to, co było poniżej 14 px. Opisy w kartach mają nadal 14–15 px. Decyzja: podnieść do 16 px (zmieni układ kart, trzeba obejrzeć każdą stronę) albo złagodzić regułę w przewodniku.
- [ ] **Zdjęcia.** Są dwa małe pliki z prototypu (`public/photos/hero-pc-1.webp`, `hero-pc-3.webp`, ok. 300 px). Reszta to zaślepki `ImageSlot`. Lista slotów: `grep -o 'ImageSlot id=[^ ]*' components/*.jsx`. Dodawanie: plik do `public/photos/`, wpis w `components/photos.js`.
- [ ] **Motyw ciemny kreatora rezerwacji.** Nigdy nie był projektowany; działa dzięki tokenom, ale wymaga przeglądu (kalendarz, stany dni, pasek kroków).
- [ ] **SEO i meta.** Opis (`description`) ma tylko strona główna. Brakuje opisów podstron, Open Graph, `sitemap.xml`, `robots.txt`, danych strukturalnych (LodgingBusiness).
- [ ] **Strona 404.** Jest domyślna z Next.js; zrobić własną w stylu marki (`app/not-found.jsx`).
- [ ] **Ikona strony.** `app/icon.png` jest wycięta z logo (słońce z falą). Sprawdzić, czy czytelna w 16 px; ewentualnie uprościć.
- [ ] **Przełącznik „PL · EN"** jest tylko etykietą. Albo wersja angielska, albo usunąć do czasu jej powstania.

## 3. Decyzje do potwierdzenia przez właściciela

- [ ] **Kolory hover** `#FF8A5C` (Coral) i `#45C0E8` (Baltic): rozjaśnianie zamiast przyciemniania. Wprowadzone poza briefem, żeby ciemna etykieta zachowała kontrast.
- [ ] **Para błędu w motywie ciemnym** `#FF8F7A` na `#3A1F1C`: propozycja, prototyp nie miał własnej.
- [ ] **Ikony Lucide** jako zamiennik do czasu własnego zestawu.
- [ ] **Próg 640 px** dla mobilnej skali typografii.

## 4. Design system

- [ ] **Logo w SVG.** Są tylko PNG (`logo-rusalka-full.png`, `logo-rusalka-on-dark.png`; ten drugi powstał z pierwszego przez przebarwienie napisu). Potrzebny oryginał wektorowy od autora logo.
- [ ] **Synchronizacja artefaktu z repo.** Dwie kopie systemu (artefakt na claude.ai i `design-system/`). Brakuje skryptu, który generuje `tokens.css` z `tokens.json` i pilnuje zgodności.
- [ ] **Dokument stylu.** `docs/Rusalka-przewodnik-po-stylu-PL-EN.docx` to wersja 1.2. Aktualizować przy każdej zmianie tokenów.

## 5. Później

- [ ] **Przenosiny na serwer firmowy.** Budować bez `NEXT_PUBLIC_BASE_PATH`, wgrać `out/`. Serwer musi podawać `index.html` z katalogów (adresy kończą się ukośnikiem) i własną stronę 404. Przepisać lub wyłączyć `pages.yml`.
- [ ] **Prawdziwa dostępność terminów.** Kalendarz używa reguł sezonu z `components/rez-data.jsx`. Wymaga backendu.
- [ ] **Panel administracyjny.** Makieta na gałęzi `html-prototype` (`admin-panel/`). Odłożony; wymaga serwera, logowania i decyzji, czy to część RusałkaHub.
- [ ] **Z `MIGRATION.md`:** aktualności z Facebooka pobierane przy budowaniu, cennik z plików Markdown.
- [ ] **Porządki na `main` przy podmianie:** w repo są śledzone foldery narzędziowe `.omc/`, `.omx/`, `.playwright-cli/` (na `next` już ich nie ma) oraz `intro.mp4` w LFS, którego żadna strona nie używa.
- [ ] **Lokalne foldery właściciela.** `Github/owrusalka` było dwa merge'e za GitHubem (wymaga `git pull`); `Github/project/owrusalka-pl` (bez gita) jest zbędną kopią, bo całość jest w repo.

## Zrobione (2026-11-15)

- [x] Scalenie obu prototypów na gałęzi `html-prototype`.
- [x] Przebudowa na Next.js: 7 stron i `/rezerwacja`, statyczny eksport, konfigurowalna ścieżka bazowa.
- [x] Design system jako jedyne źródło stylu; czcionki hostowane lokalnie.
- [x] Motyw ciemny z zapamiętaniem wyboru; logo w dwóch wersjach.
- [x] Dostępność: ciemne etykiety na akcentach, Baltic Dark, Brick Red, pełny obrys fokusu, minimum 12 px.
- [x] Naprawa uciętego hero na telefonie.
- [x] Obie gałęzie wypchnięte na GitHub; `main` bez zmian.
