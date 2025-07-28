# 🧠 Plan produkcyjny systemu rezerwacji online – O.W. Rusałka

Na podstawie dokumentu `plan-dzialania.md`, prace podzielono na agentów AI – wirtualne role developerskie odpowiedzialne za różne części systemu. Każdy agent otrzymuje konkretne kompetencje, komponenty i technologie.

---

## 🧭 Agent 0 – `PM-Rusałka` (Kierownik Projektu)

**Zadania:**
- Koordynacja wszystkich agentów
- Pilnowanie terminów, roadmapy, wersjonowania
- Uzgadnianie wymagań funkcjonalnych i zgodności (RODO, PCI DSS)
- Komunikacja z właścicielem i zespołem recepcyjnym

---

## 🎨 Agent 1 – `Pixie` (Frontend & UI/UX)

**Stack:** Next.js 15, React, TailwindCSS, TypeScript, react-day-picker

**Zadania:**
- Interfejs użytkownika: formularze, kalendarz, flow rezerwacji
- Obsługa wielojęzyczności (PL/EN/DE)
- Responsywność (RWD), dostępność (WCAG)
- Panel administracyjny frontend

---

## 🛠️ Agent 2 – `Gearbox` (Backend/API & BFF)

**Stack:** Node.js z TypeScript, Next.js API Routes lub Express, PostgreSQL

**Zadania:**
- API: REST/GraphQL
- Middleware: autoryzacja (JWT), walidacja danych
- Łączenie frontu z mikroserwisami
- Transakcje zapobiegające podwójnym rezerwacjom

---

## 🏨 Agent 3 – `Bookman` (Rezerwacje)

**Zadania:**
- CRUD rezerwacji (tworzenie, modyfikacja, anulowanie)
- Algorytm dostępności pokoi
- Blokowanie terminów na czas płatności
- Redis – cache dostępności
- Synchronizacja z PMS / channel managerem

---

## 🛏️ Agent 4 – `Inventoria` (Inwentarz i Cenniki)

**Zadania:**
- Zarządzanie pokojami, typami, sezonami i cenami
- Obsługa rabatów, ofert specjalnych
- Obsługa pakietów (np. FB, HB)
- API do ekspozycji oferty na froncie

---

## 🧑‍💼 Agent 5 – `Identikon` (Użytkownicy i Role)

**Zadania:**
- Rejestracja, logowanie, zarządzanie profilem
- Obsługa ról (gość, recepcja, admin)
- Historia rezerwacji
- RODO: edycja/usunięcie danych

---

## 💳 Agent 6 – `Paynado` (Płatności)

**Stack:** Stripe + Przelewy24

**Zadania:**
- Integracja z bramkami płatności (PL i EU)
- Obsługa webhooków, statusów
- Bezpieczna autoryzacja transakcji
- Zgodność z PCI DSS

---

## 🔔 Agent 7 – `NotifyMe` (Powiadomienia)

**Zadania:**
- E-mail/SMS: potwierdzenia, przypomnienia, statusy
- Integracja z SendGrid, Twilio lub alternatywy
- Notyfikacje systemowe dla recepcji
- Kolejki (RabbitMQ) do obsługi wiadomości

---

## 🗂️ Agent 8 – `DataWhale` (Baza danych i Cache)

**Stack:** PostgreSQL + Redis

**Zadania:**
- Projekt i implementacja bazy danych
- Relacje między encjami: Bookings, Rooms, Users itd.
- Redis do cache'owania zapytań i sesji
- Kopie zapasowe i migracje

---

## 🤖 Agent 9 – `ChatMate` (AI & chatbot)

**Stack:** OpenAI GPT-4, Weaviate

**Zadania:**
- Obsługa czatu AI w 3 językach
- Zasilanie modelem wiedzy o ośrodku i ofercie
- Integracja z systemem rezerwacji
- Odpowiedzi kontekstowe i rekomendacje

---

## 📊 Agent 10 – `Analytico` (Analityka i panel administratora)

**Zadania:**
- Dashboard: obłożenie, przychody, źródła rezerwacji
- Google Analytics / Matomo
- Zarządzanie treściami: zdjęcia, opisy
- Eksport danych (CSV, PDF)

---

## 📅 Harmonogram i współpraca agentów

| Etap                     | Agenci zaangażowani         | Output |
|--------------------------|-----------------------------|--------|
| 1. Analiza & projekt     | PM-Rusałka, Pixie           | Makiety, modele danych, API spec |
| 2. Backend (core)        | Gearbox, Bookman, DataWhale | Serwisy + baza + API |
| 3. Frontend              | Pixie, ChatMate             | UI + chatbot |
| 4. Inwentarz             | Inventoria                  | Cenniki, pokoje, pakiety |
| 5. Płatności             | Paynado                     | Integracja Stripe/P24 |
| 6. Powiadomienia         | NotifyMe                    | Mail/SMS |
| 7. Panel administracyjny | Pixie, Inventoria, Analytico| Interfejs zarządzania |
| 8. Testy i QA            | Wszyscy agenci              | Testy jednostkowe/integracyjne |
| 9. Wdrożenie             | Gearbox, PM-Rusałka         | Netlify/Vercel + certyfikaty |
| 10. Szkolenie personelu  | PM-Rusałka                  | Manual + onboarding |

---

## ✅ Gotowe do wdrożenia

- [ ] Projekt API
- [ ] Modele bazy danych
- [ ] Komponent kalendarza
- [ ] Prototyp rezerwacji (MVP)
- [ ] Panel recepcji
- [ ] Integracja płatności i czatu AI

---

## 📁 Pliki wspierające

- `plan-dzialania.md` – dokument wymagań
- `frontend-guidelines.md` – dobre praktyki UI/UX
- `README.md` (repozytorium GitHub) – konfiguracja projektu

---

> ⚙️ Gotowy do działania. Wybierz agenta, od którego chcesz zacząć – albo pozwól mi wystartować z implementacją MVP.
