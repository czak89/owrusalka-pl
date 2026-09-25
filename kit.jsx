/* global React, lucide */
/* Rusałka — atoms, navigation, hero, booking bar, rooms. */

const { useEffect, useState, useRef } = React;

/* ============================================================================
   Tiny atoms
============================================================================ */
function Icon({ name, size = 20, stroke = 1.75, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [name]);
  return React.createElement("i", {
    ref,
    "data-lucide": name,
    style: { width: size, height: size, display: "inline-flex", strokeWidth: stroke },
    ...rest,
  });
}

function Button({ variant = "primary", size, children, onClick, icon, iconRight, type = "button", ...rest }) {
  const cls = `btn btn-${variant}${size ? ` btn-${size}` : ""}`;
  return (
    <button className={cls} onClick={onClick} type={type} {...rest}>
      {icon ? <Icon name={icon} size={16} /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} size={16} /> : null}
    </button>
  );
}

function Badge({ tone = "outline", icon, children }) {
  return (
    <span className={`badge badge-${tone}`}>
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function Logo() {
  return (
    <a href="index.html" className="nav-logo">
      <img src={(window.__resources && window.__resources.logoFull) || "assets/logo-rusalka-full.png"} alt="Rusałka — Ośrodek Wypoczynkowy" />
    </a>
  );
}

/* Decorative placeholder for non-image-slot positions */
function GradientPlaceholder({ tone = "sky", icon = "image", label, lg }) {
  const cls = `gradient-ph ${tone}${lg ? " lg" : ""}`;
  return (
    <div className={cls}>
      {icon ? <Icon name={icon} size={lg ? 56 : 34} /> : null}
      {label ? <div className="cap">{label}</div> : null}
    </div>
  );
}

/* Inline styles for GradientPlaceholder (kept here so styles.css stays focused on layout) */
const ghStyles = document.createElement("style");
ghStyles.textContent = `
.gradient-ph { width:100%; height:100%; display:flex; flex-direction:column; gap:8px;
  align-items:center; justify-content:center; color:var(--c-paper); overflow:hidden; }
.gradient-ph.sky  { background: linear-gradient(150deg,#99E6FF,#0A9CCC); }
.gradient-ph.sun  { background: linear-gradient(150deg,#FFD500,#FFAA00); color:var(--c-deep-sea); }
.gradient-ph.foam { background: linear-gradient(150deg,#2EC4A6,#0A9CCC); }
.gradient-ph.coral{ background: linear-gradient(150deg,#FFAA00,#FF6F3C); }
.gradient-ph.marine{background: linear-gradient(150deg,#00547D,#003B59); }
.gradient-ph.sand { background: linear-gradient(150deg,#FBF1D8,#E8D6A8); color:var(--c-deep-sea); }
.gradient-ph.pine { background: linear-gradient(150deg,#2EC4A6 0%, #003B59 100%); }
.gradient-ph .cap { font-size:11px; letter-spacing:.12em; text-transform:uppercase; font-weight:700;
  opacity:.92; padding:0 16px; text-align:center; }
.gradient-ph svg { stroke-width:1.5; opacity:.92; }
`;
document.head.appendChild(ghStyles);

/* ============================================================================
   Top navigation
============================================================================ */
function TopNav({ active = "Start", onBook, linkBase = "" }) {
  const items = [
    { id: "Start",    href: "index.html" },
    { id: "Pokoje",   href: "#rooms" },
    { id: "Cennik",   href: "#cennik" },
    { id: "Atrakcje", href: "#atrakcje" },
    { id: "Lato 2026",href: "#lato" },
    { id: "Galeria",  href: "#galeria" },
    { id: "Kontakt",  href: "#kontakt" },
  ];
  const resolve = (it) => (it.href.startsWith("#") ? linkBase + it.href : it.href);
  return (
    <nav className="nav">
      <div className="container nav-row">
        <Logo />
        <div className="nav-links">
          {items.map((it) => (
            <a key={it.id} href={resolve(it)} className={it.id === active ? "active" : ""}>{it.id}</a>
          ))}
        </div>
        <a href="tel:+48943182976" className="phone-link"><Icon name="phone" size={14} /> 94 318 29 76</a>
        <span className="lang">PL · EN</span>
        <Button variant="cta" onClick={onBook} iconRight="arrow-right">Zarezerwuj</Button>
      </div>
    </nav>
  );
}

/* ============================================================================
   Hero — three layout variants
============================================================================ */
function Hero({ layout = "asymmetric", onBook }) {
  return (
    <section className="hero" data-hero={layout}>
      <div className="container hero-grid">
        <div className="hero-text">
          <div className="ribbon">witamy w Łazach</div>
          <h1>
            Wakacje, które pachną <em>sosną</em>
            <span className="sun" aria-hidden="true"></span>
            i&nbsp;Bałtykiem.
          </h1>
          <p className="lede">
            Pięćdziesiąt metrów do plaży. Domowa kuchnia, ognisko po kolacji,
            i ten szum, którego nie znajdziecie nigdzie indziej.
          </p>
          <div className="hero-cta">
            <Button variant="cta" size="lg" onClick={onBook} iconRight="arrow-right">
              Sprawdź wolne terminy
            </Button>
            <Button variant="secondary" icon="map-pin">Zobacz na mapie</Button>
          </div>
          <div className="hero-meta">
            <span><span className="dot"></span>Sezon maj — wrzesień 2026</span>
            <span><span className="dot"></span>Do 220 gości</span>
            <span><span className="dot"></span>Wi-Fi w każdym pokoju</span>
          </div>
        </div>

        <div className="hero-vis">
          {layout === "asymmetric" ? <AsymmetricHero /> : null}
          {layout === "centered"   ? <CenteredHero /> : null}
          {layout === "split"      ? <SplitHero /> : null}
        </div>
      </div>
    </section>
  );
}

function Polaroid({ id, caption, children, className = "" }) {
  return (
    <div className={`polaroid ${className}`}>
      <image-slot id={id} shape="rect" placeholder=" "></image-slot>
      <div className="caption">{caption}</div>
    </div>
  );
}

function AsymmetricHero() {
  return (
    <>
      <div className="pc-1 polaroid">
        <image-slot id="hero-pc-1" shape="rect" placeholder="plaża"></image-slot>
        <div className="caption">plaża, lipiec '24</div>
      </div>
      <div className="pc-2 polaroid">
        <image-slot id="hero-pc-2" shape="rect" placeholder="obiad"></image-slot>
        <div className="caption">obiad w jadalni</div>
      </div>
      <div className="pc-3 polaroid">
        <image-slot id="hero-pc-3" shape="rect" placeholder="dzieci"></image-slot>
        <div className="caption">na placu zabaw</div>
      </div>
    </>
  );
}

function CenteredHero() {
  return (
    <div className="strip-photo">
      <image-slot id="hero-centered" shape="rect" placeholder="Panorama plaży w Łazach"></image-slot>
    </div>
  );
}

function SplitHero() {
  return (
    <>
      <div className="sun-bg" aria-hidden="true"></div>
      <image-slot id="hero-split" shape="rect" placeholder="Pejzaż morski"></image-slot>
    </>
  );
}

/* ============================================================================
   Stats strip — runs immediately after the hero
============================================================================ */
function StatsStrip() {
  return (
    <div className="container">
      <div className="stats-strip">
        <div className="stat">
          <div className="num">50<span className="unit">m</span></div>
          <div className="label">Do plaży</div>
        </div>
        <div className="stat">
          <div className="num">220</div>
          <div className="label">Gości w sezonie</div>
        </div>
        <div className="stat">
          <div className="script">i ani jednego basenu</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   Booking bar — quick availability form
============================================================================ */
function BookingBar({ onBook, dates, guests, room, setBookingState }) {
  const dateOptions = [
    "18 lipca 2026",
    "25 lipca 2026",
    "1 sierpnia 2026",
    "8 sierpnia 2026",
    "15 sierpnia 2026",
  ];
  return (
    <div className="container booking-wrap">
      <div className="booking">
        <label className="field" htmlFor="b-in">
          <span>Przyjazd</span>
          <span className="val">
            <Icon name="calendar" size={16} />
            <select
              id="b-in"
              value={dates.in}
              onChange={(e) => setBookingState({ in: e.target.value })}
            >
              {dateOptions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </span>
        </label>
        <label className="field" htmlFor="b-out">
          <span>Wyjazd</span>
          <span className="val">
            <Icon name="calendar" size={16} />
            <select
              id="b-out"
              value={dates.out}
              onChange={(e) => setBookingState({ out: e.target.value })}
            >
              {dateOptions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </span>
        </label>
        <label className="field" htmlFor="b-g">
          <span>Goście</span>
          <span className="val">
            <Icon name="users" size={16} />
            <select
              id="b-g"
              value={guests}
              onChange={(e) => setBookingState({ guests: e.target.value })}
            >
              <option>2 dorosłych</option>
              <option>2 dorosłych + 1 dziecko</option>
              <option>2 dorosłych + 2 dzieci</option>
              <option>4 dorosłych</option>
              <option>4 dorosłych + 2 dzieci</option>
            </select>
          </span>
        </label>
        <label className="field" htmlFor="b-r">
          <span>Typ pokoju</span>
          <span className="val">
            <Icon name="bed" size={16} />
            <select
              id="b-r"
              value={room}
              onChange={(e) => setBookingState({ room: e.target.value })}
            >
              <option value="economy">Pokój Economy · 160 zł</option>
              <option value="family">Pokój rodzinny · 220 zł</option>
              <option value="studio">Studio 2-pokojowe · 290 zł</option>
            </select>
          </span>
        </label>
        <Button variant="cta" iconRight="arrow-right" onClick={onBook}>
          Sprawdź
        </Button>
      </div>
    </div>
  );
}

/* ============================================================================
   Rooms — tabbed featured panel with thumbnails below
============================================================================ */
const ROOMS = [
  {
    id: "economy",
    name: "Pokój Economy",
    size: "15 m²",
    sleeps: "2–4 osoby",
    where: "Pawilon szeregowy · osobne wejście przez ganek",
    badge: { tone: "sand", text: "Sezon letni" },
    desc: "Sześć murowanych pawilonów parterowych, każdy pokój z osobnym wejściem przez zadaszony ganek. Część sypialna, łazienka z prysznicem, przedpokój z dużą szafą. Tu się wraca z plaży z piaskiem na nogach — i nikt nie zwraca uwagi.",
    feats: ["Łazienka", "TV", "Czajnik", "Parawan", "Leżaki za kaucją"],
    photo: "sand",
    icon: "tent-tree",
    price: 160,
    count: "60 pokoi",
  },
  {
    id: "family",
    name: "Pokój rodzinny",
    size: "20 m²",
    sleeps: "2–4 osoby",
    where: "Pawilon główny · balkon lub taras",
    badge: { tone: "sun", text: "Polecamy" },
    desc: "W budynku głównym, na parterze lub I piętrze. Sofy małżeńskie, łoża, łóżka sosnowe, lodówka, komplet mebli ogrodowych. Wszystkie pokoje mają balkon (góra) albo taras od strony placu zabaw (parter).",
    feats: ["Balkon/taras", "Lodówka", "Łóżeczko", "Ręczniki", "Wi-Fi"],
    photo: "sky",
    icon: "bed",
    price: 220,
    count: "24 pokoje",
  },
  {
    id: "studio",
    name: "Studio 2-pokojowe",
    size: "30 m²",
    sleeps: "do 5 osób",
    where: "Pawilon główny · widok na plac zabaw",
    badge: { tone: "coral", text: "Last minute" },
    desc: "Dwa osobne pokoje, łazienka, taras lub balkon. Dla większych rodzin, dwóch rodzin razem, albo dziadków-z-wnukami. Z parteru wychodzicie wprost na plac zabaw — dzieci znikają zaraz po śniadaniu.",
    feats: ["Dwa pokoje", "Lodówka", "Taras", "Plac zabaw", "Wi-Fi"],
    photo: "foam",
    icon: "users",
    price: 290,
    count: "8 studiów",
  },
];

function RoomsSection({ activeId, onPick, onBook }) {
  const active = ROOMS.find((r) => r.id === activeId) || ROOMS[1];
  return (
    <section className="section" id="rooms">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Nocleg nad Bałtykiem</Eyebrow>
            <h2>Pokoje i studia <em>rodzinne</em>.</h2>
            <p className="sub">
              Trzy układy — od najprostszego ekonomicznego po dwupokojowe studio
              dla większej rodziny. Wszystkie z łazienką, telewizorem i Wi-Fi.
            </p>
          </div>
          <div className="actions">
            <a href="pokoje.html"><Button variant="ghost" iconRight="arrow-right">Wszystkie pokoje</Button></a>
          </div>
        </div>

        <div className="rooms-tabs" role="tablist">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              className={`tab ${r.id === activeId ? "active" : ""}`}
              onClick={() => onPick(r.id)}
              role="tab"
              aria-selected={r.id === activeId}
            >
              {r.name} <span className="count">{r.count}</span>
            </button>
          ))}
        </div>

        <div className="room-featured">
          <div className="photo">
            <div className="badge-floating"><Badge tone={active.badge.tone}>{active.badge.text}</Badge></div>
            <GradientPlaceholder tone={active.photo} icon={active.icon} label={active.where} lg />
          </div>
          <div className="info">
            <h3>{active.name}</h3>
            <div className="meta">{active.size} · {active.sleeps} · {active.where}</div>
            <p className="desc">{active.desc}</p>
            <div className="feats">
              {active.feats.map((f) => <Badge key={f} tone="outline">{f}</Badge>)}
            </div>
            <div className="price-row">
              <div>
                <div className="price">od {active.price} zł <small>/ noc</small></div>
                <small style={{ color: "var(--fg-3)" }}>śniadanie w cenie · dziecko do 3 lat gratis</small>
              </div>
              <Button variant="cta" iconRight="arrow-right" onClick={onBook}>
                Sprawdź dostępność
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Expose to other Babel files
============================================================================ */
Object.assign(window, {
  Icon, Button, Badge, Eyebrow, Logo, GradientPlaceholder, Polaroid,
  TopNav, Hero, StatsStrip, BookingBar, RoomsSection, ROOMS,
});
