/* global React, ReactDOM, TopNav, PageHero, Footer, BookCtaBand, BookingModal,
   Button, Icon, Badge, Eyebrow, ROOMS, useBooking,
   useTweaks, useSiteTheme, SiteTweaks, TweakSection, TweakToggle */

const { useState: useStateP, useEffect: useEffectP } = React;

/* Tweak defaults — block must remain valid JSON between markers */
const POKOJE_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "jumpNav": true,
  "accent": "#FF6F3C",
  "corners": "soft",
  "texture": true,
  "mode": "light",
  "stickyCta": true
}/*EDITMODE-END*/;

/* ---------- Rich room data — adds layout-detail to base ROOMS ---------- */
const ROOM_DETAILS = {
  economy: {
    long: [
      "Sześć murowanych pawilonów parterowych, każdy pokój z osobnym wejściem przez zadaszony ganek. Część sypialna, łazienka z prysznicem, przedpokój z dużą zabudowaną szafą — razem około 15 m².",
      "Pokoje Economy czynne są w sezonie letnim. W razie niepogody lub niskich temperatur istnieje możliwość wypożyczenia termowentylatorów.",
    ],
    inc: ["Łazienka z prysznicem", "Przedpokój z dużą szafą", "Telewizor", "Czajnik elektryczny + kubeczki", "Stolik + dwa krzesełka", "Parawan plażowy"],
    extras: ["Leżaki — bezpłatnie za kaucją", "Chłodziarka — dodatkowo płatna", "Łóżeczko turystyczne — dodatkowo płatne"],
    beds: [
      "Dwie rozkładane kanapy — 190 × 120 cm",
      "Sofa małżeńska 200 × 140 + pojedyncze łóżko 200 × 80",
      "Sofa małżeńska 200 × 140 + piętrowe łóżko 200 × 90",
    ],
  },
  family: {
    long: [
      "Pokoje z łazienkami na parterze oraz na I piętrze w budynku głównym. Wyposażone w sofy małżeńskie, łoża małżeńskie lub łóżka sosnowe — w zależności od wielkości i przeznaczenia pokoju.",
      "Wszystkie pokoje posiadają balkony (na I piętrze) lub tarasy (na parterze, od strony dużego placu zabaw).",
    ],
    inc: ["Łazienka", "Telewizor", "Lodówka", "Stolik + krzesełka", "Komplet mebli ogrodowych", "Czajnik elektryczny + kubeczki", "Parawan, leżaki, ręczniki"],
    extras: ["Zwierzęta tylko w pokojach parterowych — 15–30 zł / doba", "Sprzątanie w trakcie pobytu — 70 zł / pokój", "Wymiana pościeli — 35 zł / komplet"],
    beds: [
      "Sofa małżeńska",
      "Łoże małżeńskie",
      "Łóżka sosnowe — liczba zależna od wielkości pokoju",
    ],
  },
  studio: {
    long: [
      "Dla większych rodzin przygotowaliśmy dwupokojowe studia z łazienkami, na parterze oraz na I piętrze w budynku głównym — dla 4 do 6 osób.",
      "Studia na I piętrze mają balkony, na parterze — tarasy od strony dużego placu zabaw.",
    ],
    inc: ["Dwa pokoje", "Łazienka", "Telewizor", "Lodówka", "Komplet mebli ogrodowych", "Czajnik elektryczny + kubeczki", "Parawan, leżaki, ręczniki"],
    extras: ["Dziecko do lat 3 gratis (bez świadczeń)", "Sprzątanie w trakcie pobytu — 70 zł / pokój", "Wymiana pościeli — 35 zł / komplet"],
    beds: [
      "Sofy małżeńskie",
      "Łoża małżeńskie",
      "Łóżka sosnowe — w zależności od wielkości studia",
    ],
  },
};

/* ---------- Sticky jump nav ---------- */
function PokojeJump({ active, onPick }) {
  return (
    <div className="pokoje-jump">
      <div className="container row">
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>
          Skocz do:
        </span>
        {ROOMS.map((r) => (
          <a
            key={r.id}
            href={`#${r.id}`}
            className={active === r.id ? "active" : ""}
            onClick={() => onPick(r.id)}
          >
            {r.name}
          </a>
        ))}
        <a href="cennik.html" style={{ marginLeft: "auto" }}>Cennik 2026 →</a>
      </div>
    </div>
  );
}

/* ---------- Room detail block ---------- */
function RoomDetail({ room, index, onBook }) {
  const det = ROOM_DETAILS[room.id];
  return (
    <section className="room-detail" id={room.id}>
      <div className="container">
        <div className="head">
          <div>
            <div className="num">pokój {String(index + 1).padStart(2, "0")}</div>
            <h2>{room.name}</h2>
            <div className="meta-row">
              <Badge tone={room.badge.tone} icon="tag">{room.badge.text}</Badge>
              <Badge tone="outline" icon="ruler">{room.size}</Badge>
              <Badge tone="outline" icon="users">{room.sleeps}</Badge>
              <Badge tone="outline" icon="home">{room.count}</Badge>
            </div>
          </div>
          <div className="price-tag">
            <div className="num-big">{room.price} zł</div>
            <small>za dobę, ze śniadaniem</small>
          </div>
        </div>

        <div className="body-grid">
          <div className="room-collage">
            <div className="ph a">
              <image-slot id={`pokoje-${room.id}-a`} shape="rect" placeholder="zdjęcie główne"></image-slot>
            </div>
            <div className="ph">
              <image-slot id={`pokoje-${room.id}-b`} shape="rect" placeholder="łazienka"></image-slot>
            </div>
            <div className="ph">
              <image-slot id={`pokoje-${room.id}-c`} shape="rect" placeholder="taras / ganek"></image-slot>
            </div>
          </div>

          <div className="copy">
            {det.long.map((p, i) => <p key={i}>{p}</p>)}

            <h4>W cenie</h4>
            <ul>
              {det.inc.map((it) => (
                <li key={it}><Icon name="check" size={14} /> {it}</li>
              ))}
            </ul>

            <h4>Dodatkowo</h4>
            <ul>
              {det.extras.map((it) => (
                <li key={it}><Icon name="plus" size={14} /> {it}</li>
              ))}
            </ul>

            <div className="cta-row">
              <Button variant="cta" iconRight="arrow-right" onClick={() => onBook(room.id)}>
                Zarezerwuj ten pokój
              </Button>
              <Button variant="ghost" icon="phone">94 318 29 76</Button>
            </div>
          </div>
        </div>

        <div className="beds-card">
          <h5>Konfiguracje łóżek — do wyboru</h5>
          <ol>
            {det.beds.map((b, i) => <li key={i}><b>Opcja {i + 1}.</b> {b}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- "W cenie pobytu" — common amenities band ---------- */
function IncludesBand() {
  const items = [
    { icon: "utensils", title: "Wyżywienie", body: "Od 23 maja FB lub HB. Śniadania w wakacje jako bufet szwedzki, obiadokolacje z deserem do stolika." },
    { icon: "wifi", title: "Wi-Fi", body: "Dostęp do internetu na terenie ośrodka w ramach pobytu." },
    { icon: "baby", title: "Dla najmłodszych", body: "Krzesełka do karmienia w jadalni, wanienki, nocniki i nakładki na WC." },
    { icon: "tent-tree", title: "Parawan + leżaki", body: "Parawan plażowy w każdym pokoju. Leżaki bezpłatnie za kaucją." },
  ];
  return (
    <section className="includes-band">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>W każdym pokoju</Eyebrow>
            <h2>Co dostajecie <em style={{ color: "var(--c-sun-yellow)" }}>zawsze</em>.</h2>
            <p className="sub">W każdym pokoju łazienka i telewizor. Do tego infrastruktura ośrodka w cenie pobytu.</p>
          </div>
        </div>
        <div className="includes-grid">
          {items.map((it) => (
            <div className="inc-card" key={it.title}>
              <div className="ico-box"><Icon name={it.icon} size={18} /></div>
              <h5>{it.title}</h5>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page root ---------- */
function PokojePage() {
  const [active, setActive] = useStateP("economy");
  const [tweaks, setTweak] = useTweaks(POKOJE_TWEAK_DEFAULTS);
  const booking = useBooking();

  useSiteTheme(tweaks, setTweak);
  useEffectP(() => { if (window.lucide) window.lucide.createIcons(); });

  const openBooking = (id) => booking.openBooking(id);

  return (
    <>
      <TopNav active="Pokoje" onBook={() => openBooking()} />
      <PageHero
        crumb="Pokoje"
        ribbon="trzy układy, jedna plaża"
        title={<>Pokoje i studia <em>rodzinne</em>.</>}
        lede="Od ekonomicznego pawilonu szeregowego po dwupokojowe studio dla większej rodziny — wszystkie z łazienką, telewizorem i Wi-Fi. Wszystkie 50 metrów od morza."
      />
      {tweaks.jumpNav ? <PokojeJump active={active} onPick={setActive} /> : null}
      {ROOMS.map((r, i) => (
        <RoomDetail key={r.id} room={r} index={i} onBook={openBooking} />
      ))}
      <IncludesBand />
      <BookCtaBand
        onBook={() => openBooking()}
        title={<>Wybraliście pokój — zarezerwujmy <em>termin</em>.</>}
      />
      <Footer />

      {tweaks.stickyCta ? (
        <div className="sticky-cta">
          <Button variant="cta" iconRight="arrow-right" onClick={() => openBooking()}>
            Zarezerwuj pobyt
          </Button>
        </div>
      ) : null}

      <BookingModal
        open={booking.bookingOpen}
        onClose={booking.closeBooking}
        dates={booking.dates}
        guests={booking.guests}
        roomId={booking.activeRoom}
        setBookingState={booking.setBookingState}
      />

      <SiteTweaks tweaks={tweaks} setTweak={setTweak}>
        <TweakSection label="Pokoje">
          <TweakToggle
            label="Pasek „skocz do”"
            value={tweaks.jumpNav}
            onChange={(v) => setTweak("jumpNav", v)}
          />
        </TweakSection>
      </SiteTweaks>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PokojePage />);
