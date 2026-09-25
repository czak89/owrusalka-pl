/* ============================================================================
   rez-app.jsx — the booking Wizard component (card shell + step flow).
   Embeddable: the page (rez-page.jsx) owns chrome, Tweaks and mounting.
============================================================================ */
/* global React, Calendar, StepDane, StepOsoby, StepSzczegoly,
   StepPodsumowanie, Confirmation, TODAY, TURNUS_END, nightsBetween, fmtLong, fmtDow */

const { useState: useStateW, useMemo: useMemoW } = React;

const STEPS = [
  { key: 'termin', title: 'Wybierz termin', short: 'Termin' },
  { key: 'dane', title: 'Dane kontaktowe', short: 'Dane' },
  { key: 'osoby', title: 'Kto przyjeżdża?', short: 'Goście' },
  { key: 'szczegoly', title: 'Szczegóły pobytu', short: 'Szczegóły' },
  { key: 'podsumowanie', title: 'Podsumowanie', short: 'Podsumowanie' },
];

const EMPTY = {
  arrival: null, departure: null,
  name: '', phone: '', email: '',
  adults: 2, children: 0, toddlers: 0,
  accommodation: 'economy', parking: false, crib: false,
};

const KIERUNKI = [
  { id: 'a', name: 'Pocztówka' },
  { id: 'b', name: 'Morski' },
  { id: 'c', name: 'Piaskowy' },
];

function capW(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function validateDane(d) {
  const e = {};
  if (!d.name.trim() || d.name.trim().split(/\s+/).length < 2) e.name = 'Podaj imię i nazwisko.';
  const digits = (d.phone.match(/\d/g) || []).length;
  if (digits < 9) e.phone = 'Podaj poprawny numer telefonu.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Podaj poprawny adres e-mail.';
  return e;
}

function ProgressBar({ step }) {
  const pct = (step / (STEPS.length - 1)) * 100;
  return (
    <div className="progress">
      <div className="progress-top">
        <span className="progress-step">Krok {step + 1} z {STEPS.length}</span>
        <span className="progress-name">{STEPS[step].short}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: pct + '%' }} />
        {STEPS.map((s, i) => (
          <span key={s.key} className={'progress-dot' + (i <= step ? ' done' : '') + (i === step ? ' current' : '')}
            style={{ left: (i / (STEPS.length - 1)) * 100 + '%' }} />
        ))}
      </div>
    </div>
  );
}

function TerminStep({ data, setData, calStyle, weekStart }) {
  const seasonActive = TURNUS_END >= TODAY;
  const nights = data.arrival && data.departure ? nightsBetween(data.arrival, data.departure) : 0;
  function clear() { setData({ arrival: null, departure: null }); }
  return (
    <div className="step-body">
      {seasonActive && (
        <div className="turnus-note">
          <span className="turnus-ico" aria-hidden="true">☼</span>
          <span>W wakacje przyjmujemy w <strong>turnusach tygodniowych (sobota–sobota)</strong>. W tym okresie wybierz sobotę przyjazdu i sobotę wyjazdu.</span>
        </div>
      )}
      <div className="sel-bar">
        <button type="button" className={'sel-pill' + (data.arrival ? ' filled' : '') + (!data.arrival ? ' active' : '')} onClick={clear}>
          <span className="sel-k">Przyjazd</span>
          <span className="sel-v">{data.arrival ? capW(fmtDow(data.arrival)) + ', ' + fmtLong(data.arrival) : 'wybierz dzień'}</span>
        </button>
        <span className="sel-sep" aria-hidden="true">→</span>
        <div className={'sel-pill' + (data.departure ? ' filled' : '') + (data.arrival && !data.departure ? ' active' : '')}>
          <span className="sel-k">Wyjazd</span>
          <span className="sel-v">{data.departure ? capW(fmtDow(data.departure)) + ', ' + fmtLong(data.departure) : (data.arrival ? 'wybierz dzień' : '—')}</span>
        </div>
        <div className="sel-nights">
          <span className="sel-k">Noce</span>
          <span className="sel-v">{nights || '—'}</span>
        </div>
      </div>
      <Calendar arrival={data.arrival} departure={data.departure}
        onChange={sel => setData(sel)} calStyle={calStyle} weekStart={weekStart} />
    </div>
  );
}

function Wizard({ variant = 'a', calStyle = 'month', weekStart = 'mon', onDone }) {
  const [step, setStep] = useStateW(0);
  const [data, setDataRaw] = useStateW(EMPTY);
  const [errors, setErrors] = useStateW({});
  const [submitted, setSubmitted] = useStateW(false);

  const setData = patch => setDataRaw(d => ({ ...d, ...patch }));

  const stepValid = useMemoW(() => {
    if (step === 0) return !!(data.arrival && data.departure);
    if (step === 1) return Object.keys(validateDane(data)).length === 0;
    if (step === 3) return !!data.accommodation;
    return true;
  }, [step, data]);

  function next() {
    if (step === 1) {
      const e = validateDane(data);
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else { setSubmitted(true); onDone && onDone(); }
  }
  function back() { if (step > 0) setStep(step - 1); }
  function reset() { setDataRaw(EMPTY); setErrors({}); setStep(0); setSubmitted(false); }

  return (
    <div className={'rez-card variant-' + variant}>
      <header className="bk-head">
        <div className="bk-brand">
          <span className="bk-mark script">Rusałka</span>
          <span className="bk-loc">Łazy k/Mielna · nad Bałtykiem</span>
        </div>
        {!submitted && <span className="bk-tag">Rezerwacja</span>}
      </header>

      {submitted ? (
        <Confirmation data={data} onReset={reset} />
      ) : (
        <div className="bk-flow">
          <ProgressBar step={step} />
          <h2 className="step-title">{STEPS[step].title}</h2>
          <div className="step-scroll" key={step}>
            {step === 0 && <TerminStep data={data} setData={setData} calStyle={calStyle} weekStart={weekStart} />}
            {step === 1 && <StepDane data={data} set={setData} errors={errors} />}
            {step === 2 && <StepOsoby data={data} set={setData} />}
            {step === 3 && <StepSzczegoly data={data} set={setData} />}
            {step === 4 && <StepPodsumowanie data={data} onEdit={setStep} />}
          </div>
          <footer className="bk-nav">
            {step > 0
              ? <button type="button" className="rbtn rbtn-ghost" onClick={back}>Wstecz</button>
              : <span />}
            <button type="button" className={'rbtn rbtn-cta' + (stepValid ? '' : ' is-disabled')}
              onClick={next} disabled={!stepValid}>
              {step === STEPS.length - 1 ? 'Wyślij zapytanie' : 'Dalej'}
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Wizard, STEPS, EMPTY, KIERUNKI, validateDane, ProgressBar, TerminStep });
