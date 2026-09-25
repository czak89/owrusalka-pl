/* global React, ReactDOM, TopNav, Footer, Contact, BookingModal,
   Button, Icon, Badge, Eyebrow, ROOMS */

const { useState: useStateP, useEffect: useEffectP } = React;

/* ---------- Rich room data — adds layout-detail to base ROOMS ---------- */
const ROOM_DETAILS = {
  economy: {
    long: [
      "Sześć murowanych pawilonów parterowych, każdy pokój z osobnym wejściem przez zadaszony ganek. Część sypialna, łazienka z prysznicem, przedpokój z dużą zabudowaną szafą — razem około 15 m².",
      "Z tego pokoju się wraca z plaży z piaskiem na nogach. Nikt nie zwraca uwagi. Na ganku stoi suszarka na ręczniki, a obok parawan na sezon.",
    ],
    inc: ["Łazienka z prysznicem", "Telewizor", "Czajnik + kubeczki", "Stolik + dwa krzesełka", "Parawan plażowy", "Pościel i ręczniki"],
    extras: ["Leżaki bezpłatnie (za kaucją)", "Chłodziarka (15 zł / dobę)", "Łóżeczko turystyczne (15 zł / dobę)"],
    beds: [
      "Dwie rozkładane kanapy — 190 × 120 cm",
      "Sofa małżeńska 200 × 140 + pojedyncze łóżko 200 × 80",
      "Sofa małżeńska 200 × 140 + piętrowe łóżko 200 × 90",
    ],
  },
  family: {
    long: [
      "W pawilonie głównym, na parterze lub I piętrze. Lodówka, komplet mebli ogrodowych, czajnik elektryczny, parawan, leżaki i ręczniki. Pokoje na parterze mają taras od strony placu zabaw, pokoje na piętrze — balkon.",
      "To najczęściej wybierany pokój — w sam raz dla rodziny z dwójką dzieci. Łóżeczko turystyczne dla niemowlaka dostawiamy bezpłatnie.",
    ],
    inc: ["Łazienka z prysznicem", "Telewizor + Wi-Fi", "Lodówka", "Czajnik + kubeczki", "Komplet mebli ogrodowych", "Ręczniki", "Parawan i leżaki"],
    extras: ["Łóżeczko niemowlęce bezpłatnie", "Drugi parawan (kaucja)", "Dodatkowe łóżko polowe 30 zł / doba"],
    beds: [
      "Sofa małżeńska 200 × 140 + łóżko sosnowe 200 × 90",
      "Łoże małżeńskie 200 × 160 + sofa rozkładana 190 × 120",
      "Pokój dwuosobowy: łoże 200 × 160 (bez dostawki)",
    ],
  },
  studio: {
    long: [
      "Dwa osobne pokoje połączone wspólnym przedpokojem, łazienka, taras lub balkon. Dla większych rodzin, dwóch rodzin razem, albo dziadków z wnukami — każdy ma swój kąt.",
      "Z parteru wychodzicie wprost na plac zabaw — dzieci znikają zaraz po śniadaniu i wracają tylko na obiad. Z piętra macie z balkonu widok na cały plac (bardzo wygodnie).",
    ],
    inc: ["Dwa pokoje sypialne", "Łazienka z prysznicem", "Lodówka", "TV + Wi-Fi", "Komplet mebli ogrodowych", "Ręczniki", "Parawan i leżaki"],
    extras: ["Łóżeczko niemowlęce bezpłatnie", "Dodatkowe łóżko polowe 30 zł / doba", "Wynajem chłodziarki turystycznej"],
    beds: [
      "Pokój 1: łoże 200 × 160 · Pokój 2: dwa łóżka pojedyncze 200 × 90",
      "Pokój 1: łoże 200 × 160 · Pokój 2: piętrowe łóżko + dostawka",
      "Pokój 1: sofa małżeńska + sosnowe 90 · Pokój 2: dwa pojedyncze 90",
    ],
  },
};

/* ---------- Hero header ---------- */
function PokojeHero() {
  return (
    <section className="pokoje-hero">
      <div className="container">
        <div className="breadcrumb">
          <a href="index.html">Start</a> · <span>Pokoje</span>
        </div>
        <div className="ribbon">trzy układy, jedna plaża</div>
        <h1>Pokoje i studia <em>rodzinne</em>.</h1>
        <p className="lede">
          Od ekonomicznego pawilonu szeregowego po dwupokojowe studio dla większej
          rodziny — wszystkie z łazienką, telewizorem i Wi-Fi. Wszystkie 50 metrów od morza.
        </p>
      </div>
    </section>
  );
}

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
        <a href="index.html#cennik" style={{ marginLeft: "auto" }}>Cennik 2026 →</a>
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
    { icon: "utensils", title: "Śniadanie w cenie", body: "Domowe, na talerzu — bez bufetu i kart QR. Dla dzieci dietetyczne na życzenie." },
    { icon: "wifi", title: "Wi-Fi w pokoju", body: "Bezpłatne w całym ośrodku, też na ganku i przy ognisku." },
    { icon: "parking-circle", title: "Parking", body: "Strzeżony, jedno miejsce w cenie pobytu, dodatkowe za kaucją." },
    { icon: "tent-tree", title: "Parawan + leżaki", body: "Za kaucją, na cały pobyt. Tak, z naszego rusałkowego drewna." },
  ];
  return (
    <section className="includes-band">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>W każdym pokoju</Eyebrow>
            <h2>Co dostajecie <em style={{ color: "var(--c-sun-yellow)" }}>zawsze</em>.</h2>
            <p className="sub">Bez gwiazdek i drobnego druku. Cztery rzeczy, które są w cenie każdej rezerwacji.</p>
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

/* ---------- Bottom booking CTA ---------- */
function BookCtaBand({ onBook }) {
  return (
    <section className="book-cta-band">
      <div className="container row">
        <div>
          <h2>Wybraliście pokój — zarezerwujmy <em>termin</em>.</h2>
          <p>Krok 1: termin i pokój. Krok 2: dane. Krok 3: potwierdzenie. Bez płatności online, bez konta.</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="cta" size="lg" iconRight="arrow-right" onClick={() => onBook()}>
            Sprawdź dostępność
          </Button>
          <a href="index.html#cennik"><Button variant="secondary">Cały cennik</Button></a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page root ---------- */
function PokojePage() {
  const [active, setActive] = useStateP("economy");
  const [bookingOpen, setBookingOpen] = useStateP(false);
  const [activeRoom, setActiveRoom] = useStateP("family");
  const [dates, setDates] = useStateP({ in: "18 lipca 2026", out: "25 lipca 2026" });
  const [guests, setGuests] = useStateP("2 dorosłych + 2 dzieci");

  useEffectP(() => { if (window.lucide) window.lucide.createIcons(); });

  const openBooking = (id) => {
    if (id) setActiveRoom(id);
    setBookingOpen(true);
  };

  const setBookingState = (patch) => {
    if (patch.in !== undefined || patch.out !== undefined) {
      setDates({ ...dates, ...(patch.in ? { in: patch.in } : {}), ...(patch.out ? { out: patch.out } : {}) });
    }
    if (patch.guests !== undefined) setGuests(patch.guests);
    if (patch.room !== undefined) setActiveRoom(patch.room);
  };

  return (
    <>
      <TopNav active="Pokoje" onBook={() => openBooking()} />
      <PokojeHero />
      <PokojeJump active={active} onPick={setActive} />
      {ROOMS.map((r, i) => (
        <RoomDetail key={r.id} room={r} index={i} onBook={openBooking} />
      ))}
      <IncludesBand />
      <BookCtaBand onBook={() => openBooking()} />
      <Contact />
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        dates={dates}
        guests={guests}
        roomId={activeRoom}
        setBookingState={setBookingState}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PokojePage />);
