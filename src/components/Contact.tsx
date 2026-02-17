"use client";

import { useState } from "react";

const contactEmail = "recepcja@owrusalka.pl";

type FormStatus = "idle" | "ready" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section id="kontakt" className="site-section">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
          <div className="space-y-5">
            <span className="section-kicker">Kontakt</span>
            <h2 className="text-3xl sm:text-4xl">Napisz lub zadzwon bezposrednio</h2>
            <p className="lead-text">
              Wyslij zapytanie przez prosty formularz. Odpowiedz otrzymasz
              bezposrednio z recepcji.
            </p>

            <div className="surface-card p-5 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                Osrodek Wypoczynkowy Rusalka
              </p>
              <p>ul. Lesna 22, 76-002 Lazy</p>
              <a className="mt-2 block hover:text-primary" href="tel:+48790529189">
                +48 790 529 189
              </a>
              <a className="block hover:text-primary" href="tel:+48511114207">
                +48 511 114 207
              </a>
              <a className="block hover:text-primary" href="tel:+48943182976">
                +48 94 318 29 76
              </a>
              <a
                className="block hover:text-primary"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </div>
          </div>

          <form
            className="surface-card space-y-4 p-5 sm:p-6"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const formData = new FormData(form);
              const name = String(formData.get("name") || "").trim();
              const email = String(formData.get("email") || "").trim();
              const message = String(formData.get("message") || "").trim();
              const phone = String(formData.get("phone") || "").trim();
              const dates = String(formData.get("dates") || "").trim();
              const guests = String(formData.get("guests") || "").trim();
              const website = String(formData.get("website") || "").trim();

              if (!name || !email || !message) {
                const firstMissing = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
                  !name
                    ? "[name='name']"
                    : !email
                      ? "[name='email']"
                      : "[name='message']",
                );
                firstMissing?.focus();
                setStatus("error");
                setFeedback("Uzupelnij imie, email i wiadomosc.");
                return;
              }

              try {
                setIsSubmitting(true);
                setStatus("idle");
                setFeedback("");

                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name,
                    email,
                    phone,
                    dates,
                    guests,
                    message,
                    website,
                  }),
                });

                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                  throw new Error(
                    typeof data?.error === "string"
                      ? data.error
                      : "Nie udalo sie wyslac wiadomosci.",
                  );
                }

                setStatus("ready");
                setFeedback(
                  typeof data?.message === "string" && data.message.length > 0
                    ? data.message
                    : "Dziekujemy. Otrzymalismy Twoje zapytanie.",
                );
                form.reset();
              } catch (error) {
                setStatus("error");
                setFeedback(
                  error instanceof Error
                    ? `${error.message} Jesli to pilne, zadzwon do recepcji.`
                    : "Nie udalo sie wyslac wiadomosci. Jesli to pilne, zadzwon do recepcji.",
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium">Imie i nazwisko *</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-xl border bg-background px-3 py-2"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  spellCheck={false}
                  autoComplete="email"
                  className="w-full rounded-xl border bg-background px-3 py-2"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium">Telefon</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl border bg-background px-3 py-2"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium">Termin pobytu</span>
                <input
                  name="dates"
                  placeholder="np. 10-17 sierpnia..."
                  className="w-full rounded-xl border bg-background px-3 py-2"
                />
              </label>
            </div>

            <label className="space-y-1 text-sm">
              <span className="font-medium">Liczba osob</span>
              <input
                name="guests"
                placeholder="np. 2 doroslych + 2 dzieci..."
                className="w-full rounded-xl border bg-background px-3 py-2"
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium">Wiadomosc *</span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full rounded-xl border bg-background px-3 py-2"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Wysylanie..." : "Wyslij zapytanie"}
            </button>

            {status !== "idle" ? (
              <p
                aria-live="polite"
                className={`text-sm ${status === "error" ? "text-destructive" : "text-primary"}`}
              >
                {feedback}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
