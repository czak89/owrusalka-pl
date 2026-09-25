/* ============================================================================
   rez-data.jsx — Rusałka rezerwacja: date helpers + availability model
   ----------------------------------------------------------------------------
   Central rules the calendar reads:
     • Only today-forward is bookable.
     • Some dates are OCCUPIED (fully booked) — nobody can stay across them.
     • In the summer season Rusałka runs SATURDAY-TO-SATURDAY weekly turnusy,
       so inside that window arrival AND departure are only allowed on Saturdays.
     • Individual arrival/departure days can be blocked by hand (reception can
       close a Saturday, a maintenance day, etc.) via BLOCKED_ARRIVE / _DEPART.
   Everything is plain data + pure functions so both calendar styles share it.
============================================================================ */

const MS_DAY = 86400000;

const PL_MONTHS = ['stycznia','lutego','marca','kwietnia','maja','czerwca',
  'lipca','sierpnia','września','października','listopada','grudnia'];
const PL_MONTHS_NOM = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
const PL_DOW_SHORT = ['Pn','Wt','Śr','Cz','Pt','So','Nd']; // Monday-first

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function addDays(d, n) { const x = startOfDay(d); x.setDate(x.getDate() + n); return x; }
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function ymd(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function isSaturday(d) { return d.getDay() === 6; }
// Monday-first weekday index 0..6
function dowMon(d) { return (d.getDay() + 6) % 7; }
function nightsBetween(a, b) { return Math.round((startOfDay(b) - startOfDay(a)) / MS_DAY); }

function fmtLong(d) { return d.getDate() + ' ' + PL_MONTHS[d.getMonth()]; }
function fmtLongYear(d) { return d.getDate() + ' ' + PL_MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
function fmtDow(d) {
  const names = ['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'];
  return names[d.getDay()];
}

const TODAY = startOfDay(new Date());

/* --- Summer turnus window (Saturday-to-Saturday) --------------------------
   Runs from the last full week of June to the end of August of the current
   season. Inside it, arrival & departure must land on a Saturday. */
function seasonYear() {
  // If we're already past this year's summer, look at next year.
  return TODAY.getMonth() > 8 ? TODAY.getFullYear() + 1 : TODAY.getFullYear();
}
const SEASON = seasonYear();
const TURNUS_START = startOfDay(new Date(SEASON, 5, 21));  // 21 Jun
const TURNUS_END = startOfDay(new Date(SEASON, 7, 31));    // 31 Aug

function inTurnus(d) { return d >= TURNUS_START && d <= TURNUS_END; }
function turnusVisibleFrom(monthDate) {
  // is the turnus window relevant to a month currently shown?
  return TURNUS_END >= TODAY;
}

/* --- Occupied stretches (fully booked, cannot stay across) ----------------
   Seeded relative to the current season so the demo always shows some booked
   weeks. Each entry: [startOffsetDays, nights] from a season anchor Saturday. */
function firstSaturdayOnOrAfter(d) {
  let x = startOfDay(d);
  while (!isSaturday(x)) x = addDays(x, 1);
  return x;
}
const ANCHOR_SAT = firstSaturdayOnOrAfter(TURNUS_START); // first turnus Saturday

const OCCUPIED = new Set();
function markOccupied(start, nights) {
  for (let i = 0; i < nights; i++) OCCUPIED.add(ymd(addDays(start, i)));
}
// Two turnusy already taken this summer (a full week each), plus a short
// off-anchor block to show non-turnus occupancy near "today".
markOccupied(addDays(ANCHOR_SAT, 7), 7);   // 2nd turnus week booked
markOccupied(addDays(ANCHOR_SAT, 28), 7);  // 5th turnus week booked
if (nightsBetween(TODAY, ANCHOR_SAT) > 6) {
  markOccupied(addDays(TODAY, 4), 3);      // a short off-season block soon
}

/* --- Hand-blocked arrival / departure days --------------------------------
   Reception can close specific in/out days even when the room is free — e.g. a
   Saturday reserved for a group, or a day with no front-desk staffing. */
const BLOCKED_ARRIVE = new Set([ymd(addDays(ANCHOR_SAT, 21))]); // can't check IN this Saturday
const BLOCKED_DEPART = new Set([ymd(addDays(ANCHOR_SAT, 42))]); // can't check OUT this Saturday

const MIN_NIGHTS_OFFSEASON = 2;

/* --- Per-day status the calendar renders ---------------------------------- */
function dayInfo(d) {
  const key = ymd(d);
  const past = d < TODAY;
  const occupied = OCCUPIED.has(key);
  const turnus = inTurnus(d);
  const sat = isSaturday(d);
  // A day is a legal ARRIVAL if: not past, room free, (turnus ⇒ Saturday), not hand-blocked.
  const canArrive = !past && !occupied && (!turnus || sat) && !BLOCKED_ARRIVE.has(key);
  // A legal DEPARTURE is the morning you leave — the night before must be free,
  // so the day itself may be occupied by the next guest; we only require the
  // turnus/Saturday + not-past + not-hand-blocked constraints here. The range
  // check (no occupied night inside the stay) happens in canSelectDeparture.
  const canDepart = !past && (!turnus || sat) && !BLOCKED_DEPART.has(key);
  return { key, date: d, past, occupied, turnus, sat, canArrive, canDepart,
           isToday: sameDay(d, TODAY),
           blockedArrive: BLOCKED_ARRIVE.has(key), blockedDepart: BLOCKED_DEPART.has(key) };
}

// Is there an occupied NIGHT anywhere in [arrival, departure)? (departure day excl.)
function rangeHasOccupied(arrival, departure) {
  for (let d = startOfDay(arrival); d < startOfDay(departure); d = addDays(d, 1)) {
    if (OCCUPIED.has(ymd(d))) return true;
  }
  return false;
}

// Full validity of a proposed departure given a chosen arrival.
function departureError(arrival, departure) {
  if (departure <= arrival) return 'Wyjazd musi być po dniu przyjazdu.';
  const info = dayInfo(departure);
  if (!info.canDepart) {
    if (info.turnus && !info.sat) return 'W sezonie wyjazd tylko w sobotę.';
    if (info.blockedDepart) return 'Ten dzień wyjazdu jest niedostępny.';
    return 'Nie można wyjechać w tym dniu.';
  }
  if (rangeHasOccupied(arrival, departure)) return 'W wybranym okresie są zajęte noce.';
  if (!inTurnus(arrival) && nightsBetween(arrival, departure) < MIN_NIGHTS_OFFSEASON)
    return 'Minimalny pobyt to ' + MIN_NIGHTS_OFFSEASON + ' noce.';
  return null; // valid
}

/* --- Accommodation options (from source copy) ----------------------------- */
const ACCOMMODATION = [
  {
    id: 'economy',
    name: 'Pokój Economy',
    sub: 'Domki szeregowe',
    desc: 'Parterowy, murowany pawilon z osobnym wejściem przez zadaszony ganek. Ok. 15 m², łazienka z prysznicem, TV, czajnik i parawan. Dla 2–4 osób.',
    icon: 'tent',
  },
  {
    id: 'main',
    name: 'Pokój / studio',
    sub: 'Budynek główny',
    desc: 'Pokoje i dwupokojowe studia z balkonem lub tarasem, lodówką i kompletem mebli. Idealne dla większych rodzin.',
    icon: 'bed',
  },
];

Object.assign(window, {
  MS_DAY, PL_MONTHS, PL_MONTHS_NOM, PL_DOW_SHORT,
  startOfDay, addDays, sameDay, ymd, isSaturday, dowMon, nightsBetween,
  fmtLong, fmtLongYear, fmtDow,
  TODAY, SEASON, TURNUS_START, TURNUS_END, inTurnus, turnusVisibleFrom,
  ANCHOR_SAT, OCCUPIED, dayInfo, rangeHasOccupied, departureError,
  MIN_NIGHTS_OFFSEASON, ACCOMMODATION,
});
