/* ============================================================================
   rez-steps.jsx — form steps: Dane, Osoby, Szczegóły, Podsumowanie, Potwierdzenie
   Plus small shared controls (Field, NumberStepper, ChoiceCard, Toggle).
============================================================================ */
/* global React, ACCOMMODATION, fmtLongYear, fmtDow, nightsBetween, inTurnus */

const { useState: useStateStep } = React;

/* --- small controls -------------------------------------------------------- */
function Field({ label, hint, error, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}{hint && <em className="field-hint">{hint}</em>}</span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

function NumberStepper({ label, sub, value, min = 0, max = 20, onChange, icon }) {
  return (
    <div className="stepper-row">
      <div className="stepper-info">
        <span className="stepper-label">{label}</span>
        {sub && <span className="stepper-sub">{sub}</span>}
      </div>
      <div className="stepper-ctl">
        <button type="button" className="stepper-btn" disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))} aria-label={'Mniej: ' + label}>−</button>
        <span className="stepper-val" aria-live="polite">{value}</span>
        <button type="button" className="stepper-btn" disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))} aria-label={'Więcej: ' + label}>+</button>
      </div>
    </div>
  );
}

function ChoiceCard({ active, onClick, name, sub, desc }) {
  return (
    <button type="button" className={'choice' + (active ? ' is-active' : '')} onClick={onClick}>
      <span className="choice-check" aria-hidden="true" />
      <span className="choice-body">
        <span className="choice-name">{name}</span>
        <span className="choice-sub">{sub}</span>
        <span className="choice-desc">{desc}</span>
      </span>
    </button>
  );
}

function Toggle({ label, sub, value, onChange }) {
  return (
    <button type="button" className={'toggle-row' + (value ? ' is-on' : '')} onClick={() => onChange(!value)} aria-pressed={value}>
      <span className="stepper-info">
        <span className="stepper-label">{label}</span>
        {sub && <span className="stepper-sub">{sub}</span>}
      </span>
      <span className="switch" aria-hidden="true"><span className="switch-knob" /></span>
    </button>
  );
}

/* --- Step 2: Dane kontaktowe ---------------------------------------------- */
function StepDane({ data, set, errors }) {
  return (
    <div className="step-body">
      <Field label="Imię i nazwisko" error={errors.name}>
        <input className="inp" type="text" value={data.name} placeholder="np. Anna Kowalska"
          onChange={e => set({ name: e.target.value })} />
      </Field>
      <Field label="Numer telefonu" error={errors.phone}>
        <input className="inp" type="tel" value={data.phone} placeholder="np. 600 100 200"
          onChange={e => set({ phone: e.target.value })} />
      </Field>
      <Field label="Adres e-mail" error={errors.email}>
        <input className="inp" type="email" value={data.email} placeholder="np. anna@example.com"
          onChange={e => set({ email: e.target.value })} />
      </Field>
    </div>
  );
}

/* --- Step 3: Liczba osób -------------------------------------------------- */
function StepOsoby({ data, set }) {
  return (
    <div className="step-body">
      <div className="stepper-list">
        <NumberStepper label="Osoby dorosłe" value={data.adults} min={1} max={12}
          onChange={v => set({ adults: v })} />
        <NumberStepper label="Dzieci" sub="do 12 lat" value={data.children} min={0} max={10}
          onChange={v => set({ children: v })} />
        <NumberStepper label="Maluchy" sub="do 3 lat" value={data.toddlers} min={0} max={6}
          onChange={v => set({ toddlers: v })} />
      </div>
      <p className="step-note">Maluchy do 3 lat nocują u nas bezpłatnie. Na życzenie dostawiamy łóżeczko turystyczne.</p>
    </div>
  );
}

/* --- Step 4: Szczegóły ---------------------------------------------------- */
function StepSzczegoly({ data, set }) {
  return (
    <div className="step-body">
      <div className="sub-label">Rodzaj zakwaterowania</div>
      <div className="choice-list">
        {ACCOMMODATION.map(a => (
          <ChoiceCard key={a.id} active={data.accommodation === a.id}
            onClick={() => set({ accommodation: a.id })}
            name={a.name} sub={a.sub} desc={a.desc} />
        ))}
      </div>

      <div className="sub-label">Dodatki</div>
      <div className="extras">
        <Toggle label="Miejsce parkingowe" sub="Bezpłatny parking na terenie ośrodka"
          value={data.parking} onChange={v => set({ parking: v })} />
        {data.toddlers > 0 && (
          <Toggle label="Łóżeczko turystyczne" sub="Dla malucha do 3 lat"
            value={data.crib} onChange={v => set({ crib: v })} />
        )}
      </div>
    </div>
  );
}

/* --- Step 5: Podsumowanie ------------------------------------------------- */
function accName(id) { const a = ACCOMMODATION.find(x => x.id === id); return a ? a.name + ' · ' + a.sub : '—'; }
function guestSummary(d) {
  const parts = [d.adults + (d.adults === 1 ? ' dorosły' : (d.adults < 5 ? ' dorosłych' : ' dorosłych'))];
  const adultsTxt = d.adults + ' ' + (d.adults === 1 ? 'os. dorosła' : 'os. dorosłych');
  const arr = [adultsTxt];
  if (d.children) arr.push(d.children + (d.children === 1 ? ' dziecko' : ' dzieci') + ' (do 12 l.)');
  if (d.toddlers) arr.push(d.toddlers + (d.toddlers === 1 ? ' maluch' : ' maluchy') + ' (do 3 l.)');
  return arr.join(', ');
}

function StepPodsumowanie({ data, onEdit }) {
  const nights = data.arrival && data.departure ? nightsBetween(data.arrival, data.departure) : 0;
  const rows = [
    { k: 'Przyjazd', v: data.arrival ? cap(fmtDow(data.arrival)) + ', ' + fmtLongYear(data.arrival) : '—', step: 0 },
    { k: 'Wyjazd', v: data.departure ? cap(fmtDow(data.departure)) + ', ' + fmtLongYear(data.departure) : '—', step: 0 },
    { k: 'Liczba nocy', v: nights + (nights === 1 ? ' noc' : (nights < 5 ? ' noce' : ' nocy')), step: 0 },
    { k: 'Gość', v: data.name || '—', step: 1 },
    { k: 'Telefon', v: data.phone || '—', step: 1 },
    { k: 'E-mail', v: data.email || '—', step: 1 },
    { k: 'Goście', v: guestSummary(data), step: 2 },
    { k: 'Zakwaterowanie', v: accName(data.accommodation), step: 3 },
    { k: 'Dodatki', v: [data.parking && 'parking', data.crib && 'łóżeczko'].filter(Boolean).join(', ') || 'brak', step: 3 },
  ];
  return (
    <div className="step-body">
      <div className="recap">
        {rows.map((r, i) => (
          <div className="recap-row" key={i}>
            <span className="recap-k">{r.k}</span>
            <span className="recap-v">{r.v}</span>
            <button type="button" className="recap-edit" onClick={() => onEdit(r.step)}>Zmień</button>
          </div>
        ))}
      </div>
      <p className="step-note">Wysyłamy zapytanie do recepcji — potwierdzimy dostępność i szczegóły telefonicznie lub mailem. To nie jest jeszcze płatna rezerwacja.</p>
    </div>
  );
}

/* --- Confirmation --------------------------------------------------------- */
function Confirmation({ data, onReset }) {
  const nights = data.arrival && data.departure ? nightsBetween(data.arrival, data.departure) : 0;
  return (
    <div className="confirm">
      <div className="confirm-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.35" />
          <path d="M20 33 l8 8 l16 -18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="confirm-title">Dziękujemy, {firstName(data.name)}!</h2>
      <p className="confirm-lede">Wysłaliśmy Państwa zapytanie o rezerwację. Recepcja odezwie się w ciągu 24 godzin, aby potwierdzić termin.</p>
      <div className="confirm-card">
        <div className="confirm-dates">
          <span>{data.arrival ? fmtLongYear(data.arrival) : ''}</span>
          <i aria-hidden="true">→</i>
          <span>{data.departure ? fmtLongYear(data.departure) : ''}</span>
        </div>
        <div className="confirm-meta">{nights} {nights === 1 ? 'noc' : (nights < 5 ? 'noce' : 'nocy')} · {guestSummary(data)}</div>
      </div>
      <p className="confirm-contact">W pilnej sprawie: <a href="tel:+48943182976">+48 94 318 29 76</a> · <a href="mailto:recepcja@owrusalka.pl">recepcja@owrusalka.pl</a></p>
      <button type="button" className="rbtn rbtn-ghost" onClick={onReset}>Nowa rezerwacja</button>
    </div>
  );
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function firstName(full) { return full ? full.trim().split(/\s+/)[0] : 'Państwo'; }

Object.assign(window, {
  Field, NumberStepper, ChoiceCard, Toggle,
  StepDane, StepOsoby, StepSzczegoly, StepPodsumowanie, Confirmation,
});
