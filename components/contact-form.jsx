"use client";
import React from "react";
import { Icon, Button, Eyebrow } from "./kit";
import { sendEnquiry, useSpamGuard, Honeypot, ConsentField, SendError, DemoNote } from "./send-form";

/* ============================================================================
   Contact form for /kontakt/. A question, not a booking: name, e-mail, optional
   phone, message. Sends through the same pipeline as the booking forms
   (send-form.jsx): consent, honeypot, error with retry, demo mode.
   While the form is on screen the phone-only "Zarezerwuj pobyt" bar is hidden
   (body.cta-hidden), so it does not sit on top of the send button.
============================================================================ */
const EMPTY = { name: "", email: "", phone: "", message: "" };

function validate(d) {
  const e = {};
  if (!d.name.trim()) e.name = "Proszę podać imię i nazwisko.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Proszę podać poprawny adres e-mail.";
  if (d.phone.trim() && (d.phone.match(/\d/g) || []).length < 9) e.phone = "Proszę podać poprawny numer telefonu albo zostawić pole puste.";
  if (d.message.trim().length < 10) e.message = "Proszę napisać kilka słów, w czym możemy pomóc.";
  return e;
}

function Field({ id, label, hint, error, children }) {
  return (
    <div className="cf-field">
      <label htmlFor={id}>{label}{hint ? <em>{hint}</em> : null}</label>
      {children}
      {error ? <span className="cf-error" id={id + "-err"} role="alert">{error}</span> : null}
    </div>
  );
}

function ContactForm() {
  const [data, setData] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState({});
  const [consent, setConsent] = React.useState(false);
  const [consentMissing, setConsentMissing] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const spam = useSpamGuard(true);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle("cta-hidden", entry.isIntersecting);
    }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    return () => { io.disconnect(); document.body.classList.remove("cta-hidden"); };
  }, []);

  const set = (key) => (ev) => {
    const next = { ...data, [key]: ev.target.value };
    setData(next);
    /* once errors are on screen, keep them in step with what is typed */
    if (Object.keys(errors).length) setErrors(validate(next));
  };
  const aria = (key) => ({ "aria-invalid": errors[key] ? true : undefined, "aria-describedby": errors[key] ? key + "-err" : undefined });

  async function submit(ev) {
    ev.preventDefault();
    if (sending) return;
    const found = validate(data);
    setErrors(found);
    setConsentMissing(!consent);
    if (Object.keys(found).length || !consent) return;
    setSending(true);
    setFailed(false);
    const result = await sendEnquiry({
      subject: `Wiadomość ze strony: ${data.name.trim()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      lines: [
        ["Imię i nazwisko", data.name.trim()],
        ["E-mail", data.email.trim()],
        ["Telefon", data.phone.trim()],
        ["Wiadomość", data.message.trim()],
        ["Zgoda na przetwarzanie danych", "tak"],
      ],
    }, spam.guard());
    setSending(false);
    if (result.ok) setDone(true);
    else setFailed(true);
  }

  function reset() {
    setData(EMPTY); setErrors({}); setConsent(false); setConsentMissing(false);
    setFailed(false); setDone(false);
  }

  return (
    <section className="c-band" id="napisz" ref={sectionRef}>
      <div className="container cf-grid">
        <div className="section-head cf-intro">
          <div className="titles">
            <Eyebrow>Napiszcie do nas</Eyebrow>
            <h2>Macie <em>pytanie</em>?</h2>
            <p className="sub">Termin, pokój, zwierzę, grupa. Odpisujemy w ciągu doby, w lipcu czasem dłużej.</p>
            <p className="cf-urgent">W pilnej sprawie prosimy o telefon: <a href="tel:+48943182976">+48 94 318 29 76</a>.</p>
          </div>
        </div>

        <div className="cf-card">
          {done ? (
            <div className="cf-done" role="status">
              <div className="confirm-msg">
                <Icon name="check-circle-2" size={18} />
                <span>Dziękujemy! Wiadomość trafiła do recepcji. Odpowiemy na adres <b>{data.email.trim()}</b>.</span>
              </div>
              <DemoNote message />
              <Button variant="secondary" onClick={reset}>Napisz kolejną wiadomość</Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="cf-row">
                <Field id="cf-name" label="Imię i nazwisko" error={errors.name}>
                  <input id="cf-name" name="name" type="text" autoComplete="name" value={data.name}
                    placeholder="np. Anna Kowalska" onChange={set("name")} {...aria("name")} />
                </Field>
                <Field id="cf-email" label="Adres e-mail" error={errors.email}>
                  <input id="cf-email" name="email" type="email" autoComplete="email" value={data.email}
                    placeholder="np. anna@example.com" onChange={set("email")} {...aria("email")} />
                </Field>
              </div>
              <Field id="cf-phone" label="Telefon" hint="opcjonalnie" error={errors.phone}>
                <input id="cf-phone" name="phone" type="tel" autoComplete="tel" value={data.phone}
                  placeholder="np. 600 100 200" onChange={set("phone")} {...aria("phone")} />
              </Field>
              <Field id="cf-message" label="Wiadomość" error={errors.message}>
                <textarea id="cf-message" name="message" rows={6} value={data.message}
                  placeholder="W czym możemy pomóc?" onChange={set("message")} {...aria("message")} />
              </Field>

              <ConsentField checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentMissing(false); }}
                id="cf-consent" purpose="udzielenia odpowiedzi na tę wiadomość" />
              {consentMissing ? <span className="cf-error" role="alert">Do wysłania wiadomości potrzebna jest zgoda.</span> : null}
              <Honeypot value={spam.botcheck} onChange={spam.setBotcheck} />
              {failed ? <SendError /> : null}

              <div className="cf-actions">
                <Button type="submit" variant="cta" iconRight="send" disabled={sending} aria-busy={sending}>
                  {sending ? "Wysyłam…" : failed ? "Spróbuj ponownie" : "Wyślij wiadomość"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export { ContactForm };
