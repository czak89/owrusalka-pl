/* global React, Icon, Button, Badge, Eyebrow, GradientPlaceholder, ROOMS */
/* Rusałka — pricing, amenities, timeline, gallery, story, testimonials, contact, footer, modal */

const { useEffect: useEffectS, useState: useStateS, useRef: useRefS } = React;

/* ============================================================================
   Pricing — 2026 table
============================================================================ */
function Pricing() {
  return (
    <section className="pricing-band section" id="cennik">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Cennik 2026</Eyebrow>
            <h2>Ceny <em>od ręki</em>, bez gwiazdek.</h2>
            <p className="sub">
              Ceny za pokój / dobę, ze śniadaniem w cenie.
              Dziecko do 3 lat śpi z rodzicami za darmo.
            </p>
          </div>
          <div className="actions">
            <Button variant="secondary" icon="download">Pobierz cennik (PDF)</Button>
          </div>
        </div>

        <div className="pricing">
          <div className="col-head" style={{ background: "transparent", color: "var(--fg-3)" }}>
            Pokój
            <div className="dates" style={{ color: "var(--fg-3)" }}>za dobę</div>
          </div>
          <div className="col-head">
            Maj — czerwiec
            <div className="dates">23.05 — 26.06</div>
          </div>
          <div className="col-head peak">
            Lipiec — sierpień
            <div className="dates">27.06 — 23.08</div>
          </div>
          <div className="col-head">
            Wrzesień
            <div className="dates">24.08 — 13.09</div>
          </div>
          <div className="col-head" style={{ background: "var(--c-paper-3)", color: "var(--c-deep-sea)" }}>
            Tydzień (7 dób)
            <div className="dates" style={{ color: "var(--fg-3)" }}>w sezonie</div>
          </div>

          <div className="row-label">Pokój Economy<small>15 m² · 2–4 os.</small></div>
          <div className="cell">130 <small>zł</small></div>
          <div className="cell highlight">180 <small>zł</small></div>
          <div className="cell">140 <small>zł</small></div>
          <div className="cell">1 120 <small>zł</small></div>

          <div className="row-label">Pokój rodzinny<small>20 m² · 2–4 os.</small></div>
          <div className="cell">180 <small>zł</small></div>
          <div className="cell highlight">240 <small>zł</small></div>
          <div className="cell">190 <small>zł</small></div>
          <div className="cell">1 540 <small>zł</small></div>

          <div className="row-label">Studio 2-pokojowe<small>30 m² · do 5 os.</small></div>
          <div className="cell">240 <small>zł</small></div>
          <div className="cell highlight">310 <small>zł</small></div>
          <div className="cell">250 <small>zł</small></div>
          <div className="cell">1 990 <small>zł</small></div>

          <div className="row-foot">
            * Ceny brutto. Pełne wyżywienie + 60 zł / osobę / dobę. Opłata klimatyczna 3 zł/os./dobę
            płatna na miejscu. Pies za zgodą gospodarzy — 30 zł / dobę.
          </div>
        </div>

        <div className="price-aside">
          <div className="note">
            <div className="ico-box"><Icon name="percent" size={18} /></div>
            <div>
              <h5>Goście wracający — 10% taniej</h5>
              <p>Drugi pobyt w sezonie albo dowolny w przyszłym roku. Wystarczy przypomnieć przy rezerwacji.</p>
            </div>
          </div>
          <div className="note">
            <div className="ico-box"><Icon name="calendar-clock" size={18} /></div>
            <div>
              <h5>Last minute — czerwiec i wrzesień</h5>
              <p>Pobyty 4-nocowe rezerwowane na 14 dni przed przyjazdem — 15% taniej. Z poranną kawą.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Amenities — magazine grid w/ varying card sizes
============================================================================ */
const AMENITIES = [
  { icon: "waves", tone: "sky", title: "50 metrów do plaży", body: "Szeroka, piaszczysta plaża w Łazach. Furtka i krótka alejka między sosnami." },
  { icon: "utensils", tone: "sand", title: "Domowa kuchnia", body: "Pełne wyżywienie albo HB. Po staremu, z talerza, bez kart QR i bufetu." },
  { icon: "flame", tone: "sand", title: "Ognisko z biesiadą", body: "Co czwartek w sezonie. Kiełbaski w cenie, śpiewanie do woli." },
  { icon: "baby", tone: "foam", title: "Plac zabaw + animacje", body: "Duży, w cieniu sosen — i animator codziennie: gry, plastyka, podchody." },
];

function Amenities() {
  return (
    <section className="section" id="atrakcje">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Co tu robicie</Eyebrow>
            <h2>Wakacje z duszą, bez sterylnego <em>SPA</em>.</h2>
            <p className="sub">Kilka rzeczy, które robią różnicę między pobytem a wspomnieniem.</p>
          </div>
        </div>

        <div className="amenities">
          {AMENITIES.slice(0, 2).map((a) => (
            <div className="amenity" key={a.title}>
              <div className={`ico-box ${a.tone}`}><Icon name={a.icon} size={22} /></div>
              <h4>{a.title}</h4>
              <p>{a.body}</p>
            </div>
          ))}

          <div className="amenity tall">
            <div className="ico-box"><Icon name="tree-pine" size={22} /></div>
            <div className="big-num">5<small>ha</small></div>
            <h4>Sosnowy las za płotem</h4>
            <p>Pięć hektarów własnego terenu w lesie. Trasy spacerowe i rowerowe wprost spod recepcji. Latem cień, jesienią grzyby.</p>
          </div>

          {AMENITIES.slice(2).map((a) => (
            <div className="amenity" key={a.title}>
              <div className={`ico-box ${a.tone}`}><Icon name={a.icon} size={22} /></div>
              <h4>{a.title}</h4>
              <p>{a.body}</p>
            </div>
          ))}

          <div className="amenity wide">
            <div className="script-line">w razie niepogody</div>
            <h4>Pożyczamy termowentylatory</h4>
            <p>Bałtyk umie zaskoczyć w lipcu. Mamy w recepcji termowentylatory za kaucją, parasole na ganku i podgrzewacz wody w pokoju Economy. Bez pytania o paragon.</p>
          </div>

          <div className="amenity">
            <div className="ico-box"><Icon name="wifi" size={22} /></div>
            <h4>Wi-Fi w pokoju</h4>
            <p>Bezpłatne w całym ośrodku. Bo czasem trzeba odpisać szefowi, że jednak nie wraca się w środę.</p>
          </div>
          <div className="amenity">
            <div className="ico-box sky"><Icon name="parking-circle" size={22} /></div>
            <h4>Parking w cenie</h4>
            <p>Strzeżony, w obrębie ośrodka. Miejsce dla każdego pokoju — nie szukacie nigdzie.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Summer timeline — Lato 2026
============================================================================ */
function Timeline() {
  const events = [
    {
      month: "maj", title: "Otwarcie sezonu", tag: "23.05",
      body: "Pierwsze ogniska, kawa na ganku, dzieci jeszcze w bluzach. Najspokojniejsze dwa tygodnie.",
      icon: "key-round",
    },
    {
      month: "czerwiec", title: "Dzień Dziecka u Rusałki", tag: "01.06",
      body: "Konkursy plastyczne, zawody w piasku, lody dla wszystkich. Dla najmłodszych — drewniany medal.",
      icon: "ice-cream-cone",
    },
    {
      month: "lipiec", title: "Biesiady przy ognisku", tag: "co czwartek",
      body: "Kiełbaski, śpiewanie do gitary pani Krysi, dzieci puszczają lampiony. Sezon w pełni.",
      icon: "flame",
    },
    {
      month: "sierpień", title: "Festyn rodzinny", tag: "15.08",
      body: "Cały dzień zabaw, dmuchaniec, wata cukrowa i potańcówka pod sosną do 22:00.",
      icon: "party-popper",
    },
  ];
  return (
    <section className="timeline-band" id="lato">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Co się będzie działo</Eyebrow>
            <h2 style={{ color: "var(--c-paper)" }}>Lato 2026 — kalendarz <em style={{ color: "var(--c-sun-yellow)" }}>biesiad</em>.</h2>
            <p className="sub">Cykl powtarzamy od kilku lat. Wracające rodziny już wiedzą, że czwartki to ognisko.</p>
          </div>
        </div>

        <div className="timeline">
          {events.map((e) => (
            <div className="tl-card" key={e.title}>
              <div className="dot" />
              <div className="month">{e.month}</div>
              <h4>{e.title}</h4>
              <p>{e.body}</p>
              <div className="tag"><Icon name={e.icon} size={13} /> {e.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Story / about us
============================================================================ */
function Story() {
  return (
    <section className="story-band">
      <div className="container story">
        <div className="img-stack">
          <div className="blob">
            <image-slot id="story-blob" shape="rect" placeholder="ośrodek od strony plaży"></image-slot>
          </div>
          <div className="circle">
            <image-slot id="story-circle" shape="rect" placeholder="gospodarze, lata 90."></image-slot>
          </div>
        </div>
        <div className="story-text">
          <div className="pre">trochę o nas</div>
          <h2>Prowadzimy <em>„Rusałkę"</em> rodzinnie.</h2>
          <p>
            Łazy to malutka miejscowość kilka kilometrów od Mielna — sosny, plaża,
            cisza wieczorami. Nasz ośrodek stoi tu w spokoju, a my dbamy, żeby zachował
            swój dawny charakter rodzinnych wakacji nad morzem.
          </p>
          <p>
            Goście wracają do nas sezon po sezonie. Dzieci, które tu biegały po plaży,
            przyjeżdżają teraz z własnymi dziećmi. Trochę dłużej rośnie sosna, ale
            i tak rośnie szybciej niż my zmieniamy nazwy pokojów.
          </p>
          <p>
            Wczasy jak za dawnych lat — tyle tylko, że z Wi-Fi i bezpieczniejszym
            placem zabaw. I bez kolejki do bufetu.
          </p>
          <span className="signed">— gospodarze Rusałki</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Gallery — masonry with image drop zones
============================================================================ */
function Gallery() {
  const tiles = [
    { id: "g-a", cls: "a", cap: "plaża, lipiec",  ph: "plaża Łazy" },
    { id: "g-b", cls: "b", cap: "ganek",          ph: "ganek pokoju" },
    { id: "g-c", cls: "c", cap: "zachód słońca",  ph: "zachód słońca" },
    { id: "g-d", cls: "d", cap: "obiad w jadalni",ph: "domowy obiad" },
    { id: "g-e", cls: "e", cap: "sosny",          ph: "las sosnowy" },
    { id: "g-f", cls: "f", cap: "ognisko",        ph: "ognisko" },
    { id: "g-g", cls: "g", cap: "plac zabaw",     ph: "plac zabaw" },
  ];
  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Z naszego albumu</Eyebrow>
            <h2>Lato w Łazach — <em>kilka kadrów</em>.</h2>
            <p className="sub">
              Przeciągnijcie swoje zdjęcia na kafelki — pokażemy je nadesłane przez
              gości. Albo posłuchajcie tylko, jak pachnie morze.
            </p>
          </div>
          <div className="actions">
            <Button variant="ghost" iconRight="arrow-right">Wszystkie zdjęcia</Button>
          </div>
        </div>
        <div className="gallery">
          {tiles.map((t) => (
            <div className={`tile ${t.cls}`} key={t.id}>
              <image-slot id={t.id} shape="rect" placeholder={t.ph}></image-slot>
              <div className="cap">{t.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Testimonials
============================================================================ */
const TESTI = [
  {
    stars: 5,
    text: "Wracamy szósty rok z rzędu. Dzieci od razu pytają o panią Basię z kuchni i czy w środę będzie ognisko. Tak — będzie.",
    who: "Rodzina Wiśniewskich",
    where: "Kraków · pobyt sierpień 2025",
    initials: "RW",
  },
  {
    stars: 5,
    text: "Pokój prosty, ale wszystko działa. Plaża rzeczywiście pięć minut. Cena jak za stare czasy. Polecam każdemu, kto ma dosyć udawanych all-inclusive.",
    who: "Marek K.",
    where: "Wrocław · pobyt lipiec 2025",
    initials: "MK",
  },
  {
    stars: 5,
    text: "Najlepsze leniwe wakacje od lat. Bez animatorów krzyczących przez głośnik — tylko sosny, plaża i fale. Studio z tarasem na plac zabaw — strzał w dziesiątkę.",
    who: "Aleksandra D.",
    where: "Warszawa · pobyt sierpień 2025",
    initials: "AD",
  },
  {
    stars: 5,
    text: "Najmłodszy uczył się chodzić po piasku. Najstarsza po raz pierwszy popłynęła sama. Pani z recepcji znała wszystkich po imieniu do końca tygodnia.",
    who: "Ewa P.",
    where: "Poznań · pobyt czerwiec 2025",
    initials: "EP",
  },
];

function Testimonials() {
  return (
    <section className="testi-band">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Mówią o nas goście</Eyebrow>
            <h2>200+ pięciogwiazdkowych <em>opinii</em> w Google.</h2>
            <p className="sub">Bez konkursów, bez kuponów — po prostu wracają.</p>
          </div>
        </div>
        <div className="testi-grid">
          {TESTI.map((t, i) => (
            <div className="testi" key={i}>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p>{t.text}</p>
              <div className="who-row">
                <div className="avatar">{t.initials}</div>
                <div>
                  <div className="who">{t.who}</div>
                  <div className="where">{t.where}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testi-footer-row">
          <span><strong>4.9</strong> / 5,0 z 218 opinii</span>
          <span style={{ color: "var(--c-baltic-blue)" }}>Google · Booking.com · Facebook</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Contact + decorative map
============================================================================ */
function Contact() {
  return (
    <section className="contact-band" id="kontakt">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div className="titles">
            <Eyebrow>Znajdziecie nas tutaj</Eyebrow>
            <h2>76-002 Łazy, ul. <em>Leśna 22</em>.</h2>
            <p className="sub">Niedaleko Mielna, na końcu Leśnej, między sosnami a wydmą.</p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="map-card" role="img" aria-label="Mapa: Rusałka w Łazach k. Mielna">
            <div className="map-grid" />
            <div className="map-coast">
              <svg viewBox="0 0 600 100" preserveAspectRatio="none">
                <path d="M0,40 C 120,10 240,70 360,40 C 480,15 540,50 600,35 L600,100 L0,100 Z"
                      fill="#FFF3D6" />
                <path d="M0,55 C 120,30 240,80 360,55 C 480,35 540,68 600,52 L600,100 L0,100 Z"
                      fill="rgba(255, 243, 214, 0.7)" />
              </svg>
            </div>
            <div className="map-label sea">Bałtyk</div>
            <div className="map-label town">Mielno →</div>
            <div className="map-label land">Łazy</div>
            <div className="pin">
              <div className="marker"><Icon name="tent-tree" size={22} /></div>
              <div className="label">Rusałka · Leśna 22</div>
            </div>
            <div className="compass">N</div>
            <div className="map-action">
              <Button variant="cta" icon="navigation" size="sm">Trasa w Google Maps</Button>
            </div>
          </div>

          <div className="contact-info">
            <h2>Zadzwońcie, napiszcie.</h2>
            <p className="lede">Odpisujemy w ciągu doby. W lipcu czasem dłużej — sezon i pomidor.</p>

            <div className="row">
              <div className="ico"><Icon name="phone" size={18} /></div>
              <div>
                <h4>Recepcja</h4>
                <p>
                  <b>+48 94 318 29 76</b><br />
                  <b>+48 790 529 189</b> · <b>+48 511 114 207</b>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="ico"><Icon name="mail" size={18} /></div>
              <div>
                <h4>E-mail</h4>
                <p><a href="mailto:recepcja@owrusalka.pl"><b>recepcja@owrusalka.pl</b></a></p>
              </div>
            </div>
            <div className="row">
              <div className="ico"><Icon name="map-pin" size={18} /></div>
              <div>
                <h4>Adres</h4>
                <p>
                  <b>ul. Leśna 22, 76-002 Łazy</b><br />
                  k. Mielna · woj. zachodniopomorskie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Footer
============================================================================ */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="top">
          <div className="brand">
            <img src={(window.__resources && window.__resources.logoDark) || "assets/logo-rusalka-on-dark.jpg"} alt="Rusałka" />
            <p>„Złóż się tu cieniem sosny." Rodzinne wakacje nad Bałtykiem.</p>
          </div>
          <div>
            <h5>Nocleg</h5>
            <ul>
              <li><a href="pokoje.html">Pokoje Economy</a></li>
              <li><a href="pokoje.html">Pokoje rodzinne</a></li>
              <li><a href="pokoje.html">Studia 2-pokojowe</a></li>
              <li><a href="#cennik">Cennik 2026</a></li>
            </ul>
          </div>
          <div>
            <h5>Wakacje</h5>
            <ul>
              <li><a href="#atrakcje">Atrakcje</a></li>
              <li><a href="#lato">Lato 2026</a></li>
              <li><a href="#galeria">Galeria</a></li>
              <li><a href="#cennik">Last minute</a></li>
            </ul>
          </div>
          <div>
            <h5>Kontakt</h5>
            <ul>
              <li>ul. Leśna 22, 76-002 Łazy</li>
              <li>+48 94 318 29 76</li>
              <li><a href="mailto:recepcja@owrusalka.pl">recepcja@owrusalka.pl</a></li>
              <li><a href="#">Polityka prywatności</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div>© 2026 Ośrodek Wypoczynkowy „Rusałka"</div>
          <div>Łazy · Bałtyk</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
   Booking modal — multi-step
============================================================================ */
function BookingModal({ open, onClose, dates, guests, roomId, setBookingState }) {
  const [step, setStep] = useStateS(0);
  const [confirmed, setConfirmed] = useStateS(false);
  const [formData, setFormData] = useStateS({ name: "", email: "", phone: "", notes: "" });

  useEffectS(() => {
    if (!open) {
      setStep(0);
      setConfirmed(false);
      setFormData({ name: "", email: "", phone: "", notes: "" });
    }
  }, [open]);

  const room = ROOMS.find((r) => r.id === roomId) || ROOMS[1];
  const nights = 7;
  const total = room.price * nights;

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => { setConfirmed(true); setStep(3); };

  const stepsArr = [0, 1, 2, 3];

  return (
    <div className={`modal-bg ${open ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn btn-icon close" onClick={onClose} aria-label="Zamknij">
          <Icon name="x" size={18} />
        </button>

        {!confirmed ? (
          <>
            <h3>Sprawdźmy dostępność</h3>
            <p className="lede">
              {step === 0 ? "Krok 1 z 3 — termin i pokój" : null}
              {step === 1 ? "Krok 2 z 3 — Państwa dane" : null}
              {step === 2 ? "Krok 3 z 3 — potwierdzenie" : null}
            </p>

            <div className="steps">
              {stepsArr.slice(0, 3).map((i) => (
                <div
                  key={i}
                  className={`step ${i < step ? "done" : ""} ${i === step ? "active" : ""}`}
                />
              ))}
            </div>

            {step === 0 ? (
              <>
                <div className="field-row">
                  <label className="field">
                    <span>Przyjazd</span>
                    <input
                      type="text"
                      value={dates.in}
                      onChange={(e) => setBookingState({ in: e.target.value })}
                    />
                  </label>
                  <label className="field">
                    <span>Wyjazd</span>
                    <input
                      type="text"
                      value={dates.out}
                      onChange={(e) => setBookingState({ out: e.target.value })}
                    />
                  </label>
                </div>
                <label className="field">
                  <span>Goście</span>
                  <select
                    value={guests}
                    onChange={(e) => setBookingState({ guests: e.target.value })}
                  >
                    <option>2 dorosłych</option>
                    <option>2 dorosłych + 1 dziecko</option>
                    <option>2 dorosłych + 2 dzieci</option>
                    <option>4 dorosłych</option>
                  </select>
                </label>

                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em",
                              textTransform: "uppercase", color: "var(--c-baltic-blue)", margin: "12px 0 8px" }}>
                  Typ pokoju
                </div>
                <div className="room-pick">
                  {ROOMS.map((r) => (
                    <div
                      key={r.id}
                      className={`opt ${r.id === roomId ? "active" : ""}`}
                      onClick={() => setBookingState({ room: r.id })}
                    >
                      <div className="left">
                        <h5>{r.name}</h5>
                        <div className="meta">{r.size} · {r.sleeps}</div>
                      </div>
                      <div className="price">{r.price} <small>zł / noc</small></div>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <Button variant="ghost" onClick={onClose}>Anuluj</Button>
                  <div className="right">
                    <Button variant="cta" iconRight="arrow-right" onClick={next}>Dalej</Button>
                  </div>
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <label className="field">
                  <span>Imię i nazwisko</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="np. Anna Kowalska"
                  />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>E-mail</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anna@example.pl"
                    />
                  </label>
                  <label className="field">
                    <span>Telefon</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+48 600 000 000"
                    />
                  </label>
                </div>
                <label className="field">
                  <span>Uwagi (łóżeczko, alergie, lodówka...)</span>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="opcjonalnie"
                  />
                </label>
                <div className="actions">
                  <Button variant="ghost" icon="arrow-left" onClick={back}>Wstecz</Button>
                  <div className="right">
                    <Button variant="cta" iconRight="arrow-right" onClick={next}
                            disabled={!formData.name || !formData.email}>
                      Dalej
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="summary">
                  <div className="line"><span>Pokój</span><b>{room.name}</b></div>
                  <div className="line"><span>Termin</span><b>{dates.in} → {dates.out}</b></div>
                  <div className="line"><span>Goście</span><b>{guests}</b></div>
                  <div className="line"><span>Na nazwisko</span><b>{formData.name}</b></div>
                  <div className="line"><span>Ilość nocy</span><b>{nights}</b></div>
                  <div className="line"><span>Razem</span><span className="total">{total.toLocaleString("pl")} zł</span></div>
                </div>
                <p style={{ fontSize: 13, color: "var(--fg-3)", margin: "0 0 16px" }}>
                  To rezerwacja niezobowiązująca. Po wysłaniu skontaktujemy się w ciągu 24 godzin
                  z propozycją terminu i wskazaniem szczegółów płatności.
                </p>
                <div className="actions">
                  <Button variant="ghost" icon="arrow-left" onClick={back}>Wstecz</Button>
                  <div className="right">
                    <Button variant="cta" iconRight="check" onClick={submit}>
                      Wyślij prośbę
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : (
          <>
            <h3>Dziękujemy!</h3>
            <p className="lede">Czekamy w Łazach.</p>
            <div className="confirm-msg">
              <Icon name="check-circle-2" size={18} />
              Wysłaliśmy potwierdzenie na <b>&nbsp;{formData.email || "podany e-mail"}</b>.
            </div>
            <p style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.65 }}>
              W ciągu 24 godzin odezwiemy się z konkretami. Jeśli sprawa jest pilna —
              prosimy o telefon na <b style={{ color: "var(--c-deep-sea)" }}>+48 94 318 29 76</b>.
            </p>
            <div className="actions" style={{ marginTop: 18 }}>
              <Button variant="primary" onClick={onClose}>Wróć do strony</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* expose */
Object.assign(window, {
  Pricing, Amenities, Timeline, Story, Gallery, Testimonials, Contact, Footer, BookingModal,
});
