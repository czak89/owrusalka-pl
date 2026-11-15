"use client";
import React from "react";
import { withBase } from "./base";
import { ICONS } from "./icons";
import { PHOTOS } from "./photos";

/* global React, lucide */
/* Rusałka — atoms, navigation, hero, booking bar, rooms. */

const { useEffect, useState, useRef } = React;

/* ============================================================================
   Tiny atoms
============================================================================ */
/* Icon: a lucide-react component picked by name from the generated map
   (components/icons.js). The span keeps the size contract of the prototype. */
function Icon({ name, size = 20, stroke = 1.75, style, ...rest }) {
  const Cmp = ICONS[name];
  return (
    <span aria-hidden="true" style={{ width: size, height: size, display: "inline-flex", flexShrink: 0, ...style }} {...rest}>
      {Cmp ? <Cmp width="100%" height="100%" strokeWidth={stroke} /> : null}
    </span>
  );
}

/* ImageSlot: a labelled placeholder until real photography is added.
   Pass src (a path under /public) to show a photo instead. */
function ImageSlot({ id, shape, placeholder, src, alt, ...rest }) {
  src = src || PHOTOS[id];
  if (src) {
    return (
      <div className="image-slot has-img" data-slot={id} data-shape={shape} {...rest}>
        <img src={withBase(src)} alt={alt || placeholder || ""} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="image-slot" data-slot={id} data-shape={shape} role="img" aria-label={placeholder} {...rest}>
      <Icon name="image" size={26} stroke={1.5} />
      {placeholder ? <span className="is-label">{placeholder}</span> : null}
    </div>
  );
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
    <a href={withBase("/")} className="nav-logo">
      <img className="logo-light" src={withBase("/assets/logo-rusalka-full.png")} alt="Rusałka — Ośrodek Wypoczynkowy" />
      <img className="logo-dark" src={withBase("/assets/logo-rusalka-on-dark.png")} alt="" aria-hidden="true" />
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

/* GradientPlaceholder styles live in styles/placeholders.css */

/* ============================================================================
   Top navigation — desktop links + mobile drawer menu
============================================================================ */
const NAV_ITEMS = [
  { id: "Start",     href: withBase("/") },
  { id: "Pokoje",    href: withBase("/pokoje/") },
  { id: "Cennik",    href: withBase("/cennik/") },
  { id: "Atrakcje",  href: withBase("/atrakcje/") },
  { id: "Lato 2026", href: withBase("/lato/") },
  { id: "Galeria",   href: withBase("/galeria/") },
  { id: "Kontakt",   href: withBase("/kontakt/") },
];

/* Sun/moon switch — reads mode from <body>, flips it via the shared tweak
   (tweaks-shared.jsx listens for "rusalka:toggle-mode" and persists). */
function ModeToggle() {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    const sync = () => setMode(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    sync();
    window.addEventListener("rusalka:modechange", sync);
    return () => window.removeEventListener("rusalka:modechange", sync);
  }, []);
  const dark = mode === "dark";
  return (
    <button
      type="button"
      className="btn btn-icon mode-toggle"
      onClick={() => window.dispatchEvent(new CustomEvent("rusalka:toggle-mode"))}
      aria-label={dark ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
      title={dark ? "Tryb jasny" : "Tryb ciemny"}
    >
      <Icon name={dark ? "sun" : "moon"} size={17} />
    </button>
  );
}

function TopNav({ active = "Start", onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-locked", menuOpen);
    return () => document.body.classList.remove("menu-locked");
  }, [menuOpen]);
  const bookFromMenu = () => { setMenuOpen(false); if (onBook) onBook(); };
  return (
    <>
      <nav className="nav">
        <div className="container nav-row">
          <Logo />
          <div className="nav-links">
            {NAV_ITEMS.map((it) => (
              <a key={it.id} href={it.href} className={it.id === active ? "active" : ""}>{it.id}</a>
            ))}
          </div>
          <a href="tel:+48943182976" className="phone-link"><Icon name="phone" size={14} /> 94 318 29 76</a>
          <ModeToggle />
          <span className="lang">PL · EN</span>
          <Button variant="cta" onClick={onBook} iconRight="arrow-right">Zarezerwuj</Button>
          <button
            type="button"
            className="btn btn-icon nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
          >
            <span className="bars"></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mm-links">
          {NAV_ITEMS.map((it) => (
            <a key={it.id} href={it.href} className={it.id === active ? "active" : ""}>
              <span>{it.id}</span>
              <span className="go" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
        <div className="mm-foot">
          <a href="tel:+48943182976" className="mm-phone"><Icon name="phone" size={16} /> +48 94 318 29 76</a>
          <Button variant="cta" iconRight="arrow-right" onClick={bookFromMenu}>Zarezerwuj pobyt</Button>
        </div>
      </div>
    </>
  );
}

/* ============================================================================
   Page hero — shared subpage header (breadcrumb + ribbon + title + lede)
============================================================================ */
function PageHero({ crumb, ribbon, title, lede, children }) {
  return (
    <section className="page-hero" data-screen-label={crumb}>
      <div className="container">
        <div className="breadcrumb">
          <a href={withBase("/")}>Start</a> · <span>{crumb}</span>
        </div>
        {ribbon ? <div className="ribbon">{ribbon}</div> : null}
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

/* ============================================================================
   useBooking — shared booking-modal state (one hook per page root)
============================================================================ */
function useBooking(defaultRoom = "family") {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(defaultRoom);
  const [dates, setDates] = useState({ in: "18 lipca 2026", out: "25 lipca 2026" });
  const [guests, setGuests] = useState("2 dorosłych + 2 dzieci");

  const setBookingState = (patch) => {
    if (patch.in !== undefined || patch.out !== undefined) {
      setDates((d) => ({ ...d, ...(patch.in ? { in: patch.in } : {}), ...(patch.out ? { out: patch.out } : {}) }));
    }
    if (patch.guests !== undefined) setGuests(patch.guests);
    if (patch.room !== undefined) setActiveRoom(patch.room);
  };
  const openBooking = (roomId) => {
    if (typeof roomId === "string") setActiveRoom(roomId);
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);

  return { bookingOpen, openBooking, closeBooking, activeRoom, setActiveRoom, dates, guests, setBookingState };
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
            <a href={withBase("/kontakt/")}><Button variant="secondary" icon="map-pin">Zobacz na mapie</Button></a>
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
      <ImageSlot id={id} shape="rect" placeholder=" "></ImageSlot>
      <div className="caption">{caption}</div>
    </div>
  );
}

function AsymmetricHero() {
  return (
    <>
      <div className="pc-1 polaroid">
        <ImageSlot id="hero-pc-1" shape="rect" placeholder="plaża"></ImageSlot>
        <div className="caption">plaża, lipiec '24</div>
      </div>
      <div className="pc-2 polaroid">
        <ImageSlot id="hero-pc-2" shape="rect" placeholder="obiad"></ImageSlot>
        <div className="caption">obiad w jadalni</div>
      </div>
      <div className="pc-3 polaroid">
        <ImageSlot id="hero-pc-3" shape="rect" placeholder="dzieci"></ImageSlot>
        <div className="caption">na placu zabaw</div>
      </div>
    </>
  );
}

function CenteredHero() {
  return (
    <div className="strip-photo">
      <ImageSlot id="hero-centered" shape="rect" placeholder="Panorama plaży w Łazach"></ImageSlot>
    </div>
  );
}

function SplitHero() {
  return (
    <>
      <div className="sun-bg" aria-hidden="true"></div>
      <ImageSlot id="hero-split" shape="rect" placeholder="Pejzaż morski"></ImageSlot>
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
            <a href={withBase("/pokoje/")}><Button variant="ghost" iconRight="arrow-right">Wszystkie pokoje</Button></a>
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
export {
  ImageSlot, Icon, Button, Badge, Eyebrow, Logo, GradientPlaceholder, Polaroid,
  TopNav, NAV_ITEMS, PageHero, useBooking,
  Hero, StatsStrip, BookingBar, RoomsSection, ROOMS,
};
