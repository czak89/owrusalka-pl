/* global React, Icon, Eyebrow, Button */
/* Lato (sezon + dzień), galeria (grupy), kontakt (fakty), index (o ośrodku, opinie) */

function SeasonPlan() {
  const rows = [
    { d: "25.04 – 23.05", t: <>Przedsezon — <b>pobyty bez wyżywienia</b>.</> },
    { d: "23.05 – 27.06", t: <>Czerwiec — <b>wyżywienie FB</b> (3 posiłki).</> },
    { d: "27.06 – 04.07", t: <>Początek wakacji — <b>wyżywienie FB</b> i animacje dla dzieci.</>, peak: true },
    { d: "04.07 – 15.08", t: <>Pełnia lata — <b>wyżywienie HB</b> (2 posiłki) i animacje dla dzieci.</>, peak: true },
    { d: "15.08 – 29.08", t: <>Koniec wakacji — <b>wyżywienie HB</b> i animacje dla dzieci.</>, peak: true },
    { d: "29.08 – 19.09", t: <>Wrzesień — <b>wyżywienie FB</b> (3 posiłki).</> },
  ];
  return (
    <section className="c-band alt" id="sezon">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Sezon 2026</Eyebrow>
            <h2>Od kwietnia do <em>września</em>.</h2>
            <p className="sub">W okresie letnich ferii szkolnych turnusy trwają od soboty do soboty.</p>
          </div>
          <div className="actions"><a href="cennik.html"><Button variant="ghost" iconRight="arrow-right">Ceny w terminach</Button></a></div>
        </div>
        <div className="season">
          {rows.map((r) => (
            <div className={`row${r.peak ? " peak" : ""}`} key={r.d}>
              <div className="d">{r.d}</div>
              <div className="t">{r.t}</div>
              {r.peak ? <span className="badge badge-sun">wakacje</span> : <span></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DayPlan() {
  return (
    <section className="c-band" id="dzien">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Rytm dnia</Eyebrow>
            <h2>Godziny <em>posiłków</em>.</h2>
            <p className="sub">Doba hotelowa od 16.00 w dniu przyjazdu do 10.00 w dniu wyjazdu.</p>
          </div>
        </div>
        <div className="day-plan">
          <div className="day-card">
            <h4>Wyżywienie HB</h4>
            <div className="meta">04.07 – 29.08 · śniadanie i obiadokolacja</div>
            <ol>
              <li><b>8:15 – 10:00</b><span>Śniadanie — bufet szwedzki</span></li>
              <li><b>od 13:00</b><span>Zupa dla dzieci do lat 12 z Pakietów Rodzinnych (porcje serwowane)</span></li>
              <li><b>15:00 – 17:00</b><span>Obiadokolacja z deserem do stolika + bufet surówkowy</span></li>
            </ol>
          </div>
          <div className="day-card">
            <h4>Wyżywienie FB</h4>
            <div className="meta">czerwiec, początek lipca, wrzesień · 3 posiłki</div>
            <ol>
              <li><b>8:30 – 10:00</b><span>Śniadanie</span></li>
              <li><b>13:00 – 14:30</b><span>Obiad</span></li>
              <li><b>17:00 – 18:00</b><span>Kolacja</span></li>
            </ol>
          </div>
        </div>
        <div className="fac-grid" style={{ marginTop: 24 }}>
          <div className="fac">
            <div className="ico-box"><Icon name="party-popper" size={20} /></div>
            <h4>Animacje 6 dni w tygodniu</h4>
            <p>Klauni Kulki, warsztaty plastyczne, gry, zabawy i konkursy z nagrodami, seanse bajkowe.</p>
          </div>
          <div className="fac">
            <div className="ico-box"><Icon name="flame" size={20} /></div>
            <h4>Biesiady przy ognisku</h4>
            <p>Ognisko z pieczeniem kiełbasek na terenie ośrodka.</p>
          </div>
          <div className="fac">
            <div className="ico-box"><Icon name="sandwich" size={20} /></div>
            <h4>Kanapki na plażę</h4>
            <p>Jedzenia z bufetu nie wynosimy — kanapki można dokupić w cenie 5 zł/szt.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const GAL_GROUPS = [
  { id: "osrodek", t: "Ośrodek", p: "Budynek główny z recepcją, pawilony szeregowe i zielony teren między sosnami.", n: ["recepcja i budynek główny", "widok z lotu ptaka", "pawilony Economy", "teren ośrodka", "taras kawiarni", "alejka"] },
  { id: "economy", t: "Pokoje Economy", p: "Parterowe, murowane domki szeregowe z osobnym wejściem przez zadaszony ganek.", n: ["pokój z kanapami", "przedpokój z szafą", "łóżko piętrowe", "łazienka z prysznicem"] },
  { id: "glowny", t: "Pokoje i studia w budynku głównym", p: "Pokoje z balkonem na I piętrze lub tarasem na parterze od strony placu zabaw.", n: ["pokój rodzinny", "studio 2-pokojowe", "balkon", "taras", "łazienka", "aneks ze stolikiem"] },
  { id: "dzieci", t: "Place zabaw i animacje", p: "Duży plac zabaw, boisko i zajęcia z animatorami w wakacje.", n: ["duży plac zabaw", "animacje z klaunami", "boisko do siatkówki", "zabawy na trawie"] },
  { id: "plaza", t: "Plaża w Łazach", p: "Szeroka, piaszczysta plaża 50 metrów od ośrodka.", n: ["plaża", "wydmy", "zachód słońca", "las sosnowy"] },
];

function GalleryGroups() {
  return (
    <section className="c-band alt" id="albumy">
      <div className="container">
        {GAL_GROUPS.map((g) => (
          <div className="gal-group" key={g.id}>
            <div className="gh"><h3 className="c-h3" style={{ margin: 0 }}>{g.t}</h3><p>{g.p}</p></div>
            <div className="gal-grid">
              {g.n.map((ph, i) => (
                <div className="gt" key={i}>
                  <image-slot id={`gal-${g.id}-${i}`} shape="rect" placeholder={ph}></image-slot>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactFacts() {
  const facts = [
    { k: "Zameldowanie", v: "od 16.00", p: "w dniu przyjazdu" },
    { k: "Wymeldowanie", v: "do 10.00", p: "w dniu wyjazdu" },
    { k: "Turnusy w wakacje", v: "sobota – sobota", p: "w okresie letnich ferii szkolnych" },
    { k: "Parking", v: "30 zł / doba", p: "na terenie ośrodka, w czasie wakacji" },
    { k: "Zwierzęta", v: "15–30 zł / doba", p: "wyłącznie w pokojach parterowych" },
    { k: "Dzieci do lat 3", v: "gratis", p: "bez świadczeń, max. jedno dziecko w pokoju; może być wymagany dokument z datą urodzenia" },
    { k: "Grupy", v: "wycena indywidualna", p: "ceny i świadczenia dla grup ustalane są indywidualnie" },
    { k: "Faktury", v: "na życzenie", p: "ceny zawierają 8% VAT" },
  ];
  return (
    <section className="c-band alt" id="przed-przyjazdem">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Przed przyjazdem</Eyebrow>
            <h2>Warto <em>wiedzieć</em>.</h2>
          </div>
          <div className="actions"><a href="cennik.html#uwagi"><Button variant="ghost" iconRight="arrow-right">Wszystkie uwagi</Button></a></div>
        </div>
        <div className="facts">
          {facts.map((f) => (
            <div className="fact" key={f.k}><div className="k">{f.k}</div><div className="v">{f.v}</div><p>{f.p}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutResort() {
  return (
    <section className="c-band" id="o-osrodku">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Wczasy dla rodzin z dziećmi</Eyebrow>
            <h2>Noclegi w Łazach <em>k/Mielna</em>.</h2>
          </div>
        </div>
        <div className="c-intro" style={{ marginBottom: 0 }}>
          <div style={{ display: "grid", gap: 14 }}>
            <p>Ośrodek Wypoczynkowy „Rusałka" położony jest w Łazach koło Mielna – miejscowości chętnie wybieranej na wakacyjny odpoczynek nad Bałtykiem.</p>
            <p>Niewątpliwą zaletą naszego obiektu jest jego <b>malownicza lokalizacja</b>. „Rusałka" znajduje się w otoczeniu sosnowych lasów i w odległości <b>50 metrów od morza</b> oraz szerokiej, czystej i piaszczystej plaży. Nasza lokalizacja jest idealna zarówno dla miłośników aktywnego spędzania czasu, jak i tych, którzy preferują bardziej relaksujące zajęcia w gronie najbliższych.</p>
            <p>Nasi goście mogą także liczyć na dobre wyżywienie i atrakcje dedykowane najmłodszym. Bogate programy animacyjne dla dzieci, biesiady przy ognisku oraz pyszna, domowa kuchnia, to kolejne atuty naszego obiektu. <b>Na terenie ośrodka dostępny jest Internet Wi-Fi.</b></p>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <p>W naszym ośrodku oddajemy do dyspozycji naszych Gości noclegi z wyżywieniem, pokoje rodzinne, dwupokojowe studia w budynku głównym oraz pokoje Economy w sześciu murowanych pawilonach parterowych w zabudowie szeregowej. Niemal wszystkie pokoje i studia w budynku głównym posiadają balkony lub tarasy.</p>
            <p>Czynne w sezonie letnim pokoje Economy w pawilonach szeregowych mają samodzielne wejścia przez zadaszone ganki. Wszystkie posiadają też <b>łazienki i telewizory</b>. W razie niepogody lub niskich temperatur istnieje możliwość wypożyczenia termowentylatorów.</p>
            <p>Jednorazowo możemy przyjąć do 220 osób. Rozległy, zielony teren, który zajmuje nasz ośrodek, to także wymarzone miejsce do zabaw dla najmłodszych.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              <a href="pokoje.html"><Button variant="secondary" iconRight="arrow-right">Pokoje</Button></a>
              <a href="cennik.html"><Button variant="ghost" iconRight="arrow-right">Cennik 2026</Button></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { src: "Google", stars: 5, who: "Bartek K", when: "30.11.2023", text: "Byłem w tym roku i jestem w pełni usatysfakcjonowany. Bardzo dobre jedzenie, blisko morza i ogólnie całkiem fajna organizacja. W ramach turnusu są animacje dla dzieciak…" },
  { src: "Facebook", stars: 5, who: "Ewa Łaguna", when: "16.07.2023", text: "Zorganizowałam na terenie Ośrodka obóz integracyjny. Jesteśmy pod ogromnym wrażeniem tego miejsca. Cicho, spokojnie, obsługa przemiła, pokoje czyściutenkie, jedzonko domowe…" },
  { src: "Google", stars: 5, who: "Robert Ciesielski", when: "11.09.2023", text: "Super obsługa, smaczna kuchnia, przystępne ceny, sympatyczny personel, wychodzą z siebie żeby zadowolić klientów…" },
  { src: "Facebook", stars: 5, who: "Justyna Kopka", when: "15.07.2023", text: "Wróciliśmy do Rusałki w Łazach na kolejny wypoczynek. Ośrodek położony blisko morza, animacje dla dzieci, plac zabaw, domowe posiłki i przyjazna atmosfera. Polecamy rodzinom…" },
  { src: "Facebook", stars: 5, who: "Katarzyna Roth-Kłudka", when: "14.08.2022", text: "Kameralny ośrodek, nastawiony serdecznie do rodzin z dziećmi - dla nich mniejsze porcje obiadowe, animacje popołudniowe, zadbane place zabaw na zadrzewionym terenie. Obsłu…" },
  { src: "Google", stars: 4, who: "Piotr Wiśniewski", when: "27.08.2023", text: "Przyjemne miejsce z masą atrakcji dla dzieci. Na plus pyszne jedzenie i miła obsługa." },
  { src: "Facebook", stars: 5, who: "Ewelina Nastarowicz", when: "27.08.2022", text: "super miejsce dla rodzin z dziećmi zwłaszcza. bardzo blisko duża i szeroka plaża. codzienne animacje dla dzieci, ognisko z pieczeniem kiełbasek, impreza z DJem i tańce. Dzieci rac…" },
  { src: "Facebook", stars: 5, who: "Sieja Ania", when: "07.08.2022", text: "Polecam. Cudownie spędzony tydzień, bardzo blisko do plaży, pyszne jedzenie, super animacje dla dzieci - każde dziecko będzie zachwycone - dyskoteka dla dzieciaków i dorosłych. Na pew…" },
];

function RealReviews() {
  const ini = (n) => n.split(/[\s-]+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <section className="testi-band" id="opinie">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Opinie Gości</Eyebrow>
            <h2>Wracają do nas <em>rodziny</em>.</h2>
            <p className="sub">Wybrane opinie z Google i Facebooka.</p>
          </div>
        </div>
        <div className="rating-row">
          <div className="rating"><div className="score" style={{ color: "var(--c-amber)" }}>★★★★☆</div><div className="lbl"><b>Dobra</b><br />416 opinii w Google</div></div>
          <div className="rating"><div className="score" style={{ color: "var(--c-baltic-blue)" }}>★★★★★</div><div className="lbl"><b>Doskonała</b><br />113 opinii na Facebooku</div></div>
        </div>
        <div className="testi-grid">
          {REVIEWS.map((r) => (
            <div className="testi" key={r.who}>
              <div className="stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
              <p>{r.text}</p>
              <div className="who-row">
                <div className="avatar">{ini(r.who)}</div>
                <div><div className="who">{r.who}</div><div className="where">{r.when}</div></div>
                <span className="src">{r.src}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SeasonPlan, DayPlan, GalleryGroups, ContactFacts, AboutResort, RealReviews });
