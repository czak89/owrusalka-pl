"use client";
import React from "react";
import { Icon } from "./kit";

/* ============================================================================
   Form sending — shared by the booking modal and the /rezerwacja wizard.

   NEXT_PUBLIC_FORM_ENDPOINT  URL that takes a JSON POST and answers 2xx with
                              JSON; { "success": false } in the body counts as
                              a failure. This is the Web3Forms contract
                              (https://api.web3forms.com/submit); an own
                              endpoint only has to answer the same way.
   NEXT_PUBLIC_FORM_KEY       Optional. Sent as access_key (Web3Forms; the key
                              is public by design, it can only mail the owner).

   Without an endpoint the site is in demo mode: nothing leaves the browser,
   the form behaves as if it had been sent and the confirmation says so.

   Spam: a hidden honeypot field (botcheck) and a minimum fill time. A caught
   bot gets the same "sent" answer and nothing is posted.
============================================================================ */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
const FORM_KEY = process.env.NEXT_PUBLIC_FORM_KEY || "";
const FORM_DEMO = !FORM_ENDPOINT;

const MIN_FILL_MS = 3000;
const TIMEOUT_MS = 15000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* enquiry: { subject, name, email, phone, lines: [[label, value], …] }
   guard:   { botcheck, startedAt } from useSpamGuard()
   Resolves { ok: true, demo } or { ok: false }. Never throws. */
async function sendEnquiry(enquiry, guard) {
  const bot = Boolean(guard && guard.botcheck) ||
    (guard && guard.startedAt ? Date.now() - guard.startedAt < MIN_FILL_MS : false);
  if (bot || FORM_DEMO) {
    await wait(700);
    return { ok: true, demo: FORM_DEMO };
  }

  const lines = (enquiry.lines || []).filter(([, value]) => value !== undefined && value !== null && value !== "");
  const payload = {
    ...(FORM_KEY ? { access_key: FORM_KEY } : {}),
    subject: enquiry.subject,
    from_name: "Strona owrusalka.pl",
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    message: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
    botcheck: "",
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    const body = await res.json().catch(() => null);
    return { ok: res.ok && !(body && body.success === false), demo: false };
  } catch (e) {
    return { ok: false, demo: false };
  } finally {
    clearTimeout(timer);
  }
}

/* Honeypot value and the moment the form appeared. `active` restarts the clock
   (the modal passes its open state). */
function useSpamGuard(active = true) {
  const [botcheck, setBotcheck] = React.useState("");
  const startedAt = React.useRef(0);
  React.useEffect(() => {
    if (active) { startedAt.current = Date.now(); setBotcheck(""); }
  }, [active]);
  const guard = () => ({ botcheck, startedAt: startedAt.current });
  return { botcheck, setBotcheck, guard };
}

/* Hidden from people and assistive tech; bots that fill every field trip it. */
function Honeypot({ value, onChange }) {
  return (
    <div className="send-hp" aria-hidden="true">
      <label>
        Proszę zostawić to pole puste
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off"
          value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

/* GDPR consent. Required before sending. */
function ConsentField({ checked, onChange, id = "send-consent" }) {
  return (
    <label className="send-consent" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} required
        onChange={(e) => onChange(e.target.checked)} />
      <span>
        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Ośrodek Wypoczynkowy „Rusałka”
        (ul. Leśna 22, 76-002 Łazy) w celu obsługi tego zapytania o rezerwację. Zgodę można
        wycofać w każdej chwili, pisząc na adres{" "}
        <a href="mailto:recepcja@owrusalka.pl">recepcja@owrusalka.pl</a>.
      </span>
    </label>
  );
}

function SendError() {
  return (
    <div className="send-error" role="alert">
      <Icon name="triangle-alert" size={18} />
      <div>
        <b>Nie udało się wysłać zapytania.</b> Proszę spróbować ponownie za chwilę albo
        skontaktować się z recepcją: <a href="tel:+48943182976">+48 94 318 29 76</a>,{" "}
        <a href="mailto:recepcja@owrusalka.pl">recepcja@owrusalka.pl</a>.
      </div>
    </div>
  );
}

/* Shown on the confirmation when the build has no form endpoint. */
function DemoNote() {
  if (!FORM_DEMO) return null;
  return (
    <p className="send-demo" role="note">
      <b>Wersja pokazowa strony:</b> zapytanie nie zostało wysłane. Rezerwacje przyjmujemy
      telefonicznie i mailowo.
    </p>
  );
}

export { sendEnquiry, useSpamGuard, Honeypot, ConsentField, SendError, DemoNote, FORM_DEMO };
