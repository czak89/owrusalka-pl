/* ============================================================================
   rez-calendar.jsx — month grid + weeks-ribbon, with range selection.
   Reads the availability rules from rez-data.jsx. Selection is a two-tap range:
   first legal ARRIVAL, then a legal DEPARTURE (validity comes straight from
   departureError, so turnus/occupied/min-stay rules are enforced automatically).
============================================================================ */
/* global React, dayInfo, departureError, addDays, startOfDay, sameDay, ymd,
   TODAY, PL_DOW_SHORT, PL_MONTHS_NOM, nightsBetween, inTurnus, isSaturday */

const { useState: useStateCal, useMemo: useMemoCal } = React;

function colIndex(d, weekStart) {
  return weekStart === 'sat' ? (d.getDay() + 1) % 7 : (d.getDay() + 6) % 7;
}
function dowHeaders(weekStart) {
  return weekStart === 'sat'
    ? ['So', 'Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt']
    : ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
}
function startOfWeek(d, weekStart) {
  const x = startOfDay(d);
  return addDays(x, -colIndex(x, weekStart));
}

// One day cell — pure presentational, decides its own state from props.
function DayCell({ info, mode, arrival, departure, hover, onPick, onHover }) {
  const d = info.date;
  const disabled = mode === 'arrival'
    ? !info.canArrive
    : departureError(arrival, d) !== null;

  const isArr = arrival && sameDay(d, arrival);
  const isDep = departure && sameDay(d, departure);
  // tentative end while hovering in departure mode
  const tentativeEnd = mode === 'departure' && hover && sameDay(d, hover) && !disabled;
  const rangeEnd = departure || (mode === 'departure' && hover && departureError(arrival, hover) === null ? hover : null);
  const inRange = arrival && rangeEnd && d > arrival && d < rangeEnd;

  const cls = ['day'];
  if (info.past) cls.push('is-past');
  if (info.occupied && !isDep && !tentativeEnd) cls.push('is-occupied');
  if (info.turnus && !info.sat && !info.past) cls.push('is-turnus-off');
  if (info.blockedArrive || info.blockedDepart) cls.push('is-blocked');
  if (info.isToday) cls.push('is-today');
  if (disabled) cls.push('is-disabled');
  if (isArr) cls.push('is-arrival');
  if (isArr && rangeEnd) cls.push('has-range');
  if (isDep || tentativeEnd) cls.push('is-departure');
  if (inRange) cls.push('in-range');

  let title = '';
  if (info.past) title = 'Termin miniony';
  else if (info.blockedArrive) title = 'Wjazd w tym dniu niedostępny';
  else if (info.blockedDepart) title = 'Wyjazd w tym dniu niedostępny';
  else if (info.occupied) title = 'Zajęte';
  else if (info.turnus && !info.sat) title = 'Turnus tygodniowy — wjazd i wyjazd tylko w sobotę';

  return (
    <button
      type="button"
      className={cls.join(' ')}
      disabled={disabled && !isArr && !isDep}
      title={title}
      onClick={() => !disabled && onPick(d)}
      onMouseEnter={() => onHover && onHover(d)}
    >
      <span className="day-num">{d.getDate()}</span>
    </button>
  );
}

function Calendar({ arrival, departure, onChange, calStyle, weekStart, weeksCount = 12 }) {
  const [monthOffset, setMonthOffset] = useStateCal(0);
  const [hover, setHover] = useStateCal(null);
  const [error, setError] = useStateCal(null);

  const mode = (!arrival || (arrival && departure)) ? 'arrival' : 'departure';

  function pick(d) {
    setError(null);
    if (mode === 'arrival') {
      onChange({ arrival: d, departure: null });
    } else {
      const err = departureError(arrival, d);
      if (err) { setError(err); return; }
      onChange({ arrival, departure: d });
    }
  }
  function handleHover(d) {
    if (mode === 'departure') setHover(d);
  }

  const headers = dowHeaders(weekStart);

  // -------- MONTH grid --------
  const monthView = useMemoCal(() => {
    const base = new Date(TODAY.getFullYear(), TODAY.getMonth() + monthOffset, 1);
    const first = startOfDay(base);
    const lead = colIndex(first, weekStart);
    const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let dnum = 1; dnum <= daysInMonth; dnum++) {
      cells.push(startOfDay(new Date(base.getFullYear(), base.getMonth(), dnum)));
    }
    return { base, cells };
  }, [monthOffset, weekStart]);

  // -------- WEEKS ribbon --------
  const weekRows = useMemoCal(() => {
    const rows = [];
    let ws = startOfWeek(TODAY, weekStart);
    for (let w = 0; w < weeksCount; w++) {
      const days = [];
      for (let i = 0; i < 7; i++) days.push(addDays(ws, w * 7 + i));
      rows.push(days);
    }
    return rows;
  }, [weekStart, weeksCount]);

  const cellProps = { mode, arrival, departure, hover, onPick: pick, onHover: handleHover };

  return (
    <div className="cal" onMouseLeave={() => setHover(null)}>
      {calStyle === 'month' ? (
        <div className="cal-month">
          <div className="cal-head">
            <button type="button" className="cal-nav" disabled={monthOffset === 0}
              onClick={() => setMonthOffset(Math.max(0, monthOffset - 1))} aria-label="Poprzedni miesiąc">‹</button>
            <div className="cal-title">
              {PL_MONTHS_NOM[monthView.base.getMonth()]} <span>{monthView.base.getFullYear()}</span>
            </div>
            <button type="button" className="cal-nav"
              onClick={() => setMonthOffset(monthOffset + 1)} aria-label="Następny miesiąc">›</button>
          </div>
          <div className="cal-dow">
            {headers.map((h, i) => <span key={i} className={i >= 5 && weekStart === 'mon' ? 'we' : (weekStart === 'sat' && i <= 1 ? 'we' : '')}>{h}</span>)}
          </div>
          <div className="cal-grid">
            {monthView.cells.map((d, i) =>
              d === null
                ? <span key={'b' + i} className="day is-blank" />
                : <DayCell key={ymd(d)} info={dayInfo(d)} {...cellProps} />
            )}
          </div>
        </div>
      ) : (
        <div className="cal-weeks">
          <div className="cal-dow cal-dow--weeks">
            <span className="wk-label-head" />
            <div className="dow-cells">
              {headers.map((h, i) => <span key={i}>{h}</span>)}
            </div>
          </div>
          <div className="weeks-scroll">
            {weekRows.map((days, wi) => {
              const a = days[0], b = days[6];
              const label = a.getMonth() === b.getMonth()
                ? a.getDate() + '–' + b.getDate() + ' ' + PL_MONTHS_NOM[b.getMonth()].slice(0, 3).toLowerCase()
                : a.getDate() + ' ' + PL_MONTHS_NOM[a.getMonth()].slice(0, 3).toLowerCase() + ' – ' + b.getDate() + ' ' + PL_MONTHS_NOM[b.getMonth()].slice(0, 3).toLowerCase();
              return (
                <div className="week-row" key={wi}>
                  <span className="wk-label">{label}</span>
                  <div className="week-days">
                    {days.map(d => <DayCell key={ymd(d)} info={dayInfo(d)} {...cellProps} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && <div className="cal-error" role="alert">{error}</div>}
      <Legend />
    </div>
  );
}

function Legend() {
  return (
    <div className="legend">
      <span className="lg"><i className="sw sw-free" />Wolne</span>
      <span className="lg"><i className="sw sw-sel" />Wybrane</span>
      <span className="lg"><i className="sw sw-occ" />Zajęte</span>
      <span className="lg"><i className="sw sw-today" />Dziś</span>
    </div>
  );
}

Object.assign(window, { Calendar, Legend, DayCell });
