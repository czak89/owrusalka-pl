/* global React, Icon, Eyebrow, Button */
/* Cennik 2026 — real price table + notes (source: owrusalka.pl/cennik) */

const PRICE_PERIODS = [
  { d: "25.04 – 23.05", board: "bez wyżywienia", rows: [[60, 65, 70, 85], [50, 55, 60, 75]] },
  { d: "23.05 – 27.06", board: "wyżywienie FB (3 posiłki)", rows: [[135, 155, 170, 180], [105, 125, 140, 160]] },
  { d: "27.06 – 04.07", board: "wyżywienie FB (3 posiłki)", anim: true, rows: [[160, 185, 220, 230], [125, 155, 190, 190]] },
  { d: "04.07 – 15.08", board: "wyżywienie HB (2 posiłki)", anim: true, rows: [[170, 195, 240, 250], [135, 165, 220, 220]] },
  { d: "15.08 – 29.08", board: "wyżywienie HB (2 posiłki)", anim: true, rows: [[160, 185, 220, 230], [125, 155, 190, 190]] },
  { d: "29.08 – 19.09", board: "wyżywienie FB (3 posiłki)", rows: [[135, 155, 170, 180], [105, 125, 140, 160]] },
];

function PriceTable2026() {
  const who = ["Osoba dorosła", "Dziecko do lat 12"];
  return (
    <section className="c-band alt" id="cennik">
      <div className="container">
        <div className="c-intro">
          <p>Zapraszamy do Ośrodka Wypoczynkowego Rusałka, położonego w malowniczej miejscowości Łazy koło Mielna. Nasze kompleksowe usługi, wspaniała lokalizacja oraz bogate atrakcje sprawią, że Twój pobyt u nas będzie niezapomniany.</p>
          <p>Pragniemy zapewnić naszym Gościom pełną satysfakcję, dlatego też nasz cennik noclegów jest elastyczny i dostosowany do różnych sezonów oraz długości pobytu. Wszystko po to, abyś mógł znaleźć idealną ofertę, spełniającą Twoje oczekiwania.</p>
        </div>
        <div className="ptable-wrap">
          <table className="ptable">
            <thead>
              <tr>
                <th rowSpan={2}>Cena za osobę / dobę</th>
                <th colSpan={3}>Pokoje Economy w domkach szeregowych</th>
                <th rowSpan={2} className="main">Pokoje 2–3 os. i studia dla 4–6 os. w budynku głównym</th>
              </tr>
              <tr className="sub"><th>dla 4 osób</th><th>dla 3 osób</th><th>dla 2 osób</th></tr>
            </thead>
            <tbody>
              {PRICE_PERIODS.map((p) => (
                <React.Fragment key={p.d}>
                  <tr className="period">
                    <td colSpan={5}>
                      <div className="pd">
                        <b>{p.d}</b><span>{p.board}</span>
                        {p.anim ? <span className="tag">+ animacje dla dzieci</span> : null}
                      </div>
                    </td>
                  </tr>
                  {p.rows.map((r, i) => (
                    <tr key={i}>
                      <td className="who">{who[i]}</td>
                      {r.map((v, j) => (
                        <td key={j} className={`p${j === 3 ? " main" : ""}`}>
                          {v} zł<small>{(v * 7).toLocaleString("pl")} zł / tydz.</small>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ptable-foot">Ceny za osobę za dobę, zawierają 8% podatek VAT. Nie obejmują opłaty klimatycznej. FB — śniadanie, obiad, kolacja; HB — śniadanie i obiadokolacja.</p>
      </div>
    </section>
  );
}

const PRICE_NOTES_A = [
  <>śniadania w okresie wakacji podawane są w formie bogatego bufetu szwedzkiego, obiadokolacje z deserem serwowane do stolika + bufet surówkowy</>,
  <>posiłki HB standardowo wydajemy w godzinach 8:15–10:00 śniadania, 15:00–17:00 obiadokolacje. Gościom z dziećmi, <b>korzystającym z Pakietów Rodzinnych zupy wydawane są od godziny 13:00</b> (tylko w okresie wakacji dla dzieci do lat 12, porcje serwowane)</>,
  <>posiłki FB standardowo wydajemy w godzinach 8:30–10:00 śniadania, 13:00–14:30 obiady, 17:00–18:00 kolacje</>,
  <>w ramach pobytu nasi Goście mogą korzystać z infrastruktury ośrodka (dostęp do internetu <b>Wi-Fi</b>, place zabaw, boisko do siatkówki, kometki, sala zabaw dla dzieci, tenis stołowy)</>,
  <>w okresie wakacyjnym wszystkie dzieci zapraszamy na <a href="atrakcje.html">zajęcia animacyjne</a> (6 dni w tygodniu) — Klauni Kulki, warsztaty plastyczne, gry, zabawy i konkursy z nagrodami, seanse bajkowe</>,
  <>podane ceny zawierają 8% podatek VAT (na życzenie wystawiamy faktury)</>,
  <>w okresie letnich ferii szkolnych (wakacji) <b>turnusy trwają od soboty do soboty</b></>,
  <>początek doby hotelowej od godz. 16.00 w dniu przyjazdu, do godz. 10.00 w dniu wyjazdu</>,
  <>przy posiłkach w formie szwedzkiego stołu obowiązuje <b>bezwzględny zakaz wynoszenia jedzenia na zewnątrz</b> (istnieje możliwość dokupienia kanapek w cenie 5 zł/szt.)</>,
];
const PRICE_NOTES_B = [
  <>całodzienne wyżywienie HB — 85 zł/osoba dorosła; 65 zł/dziecko do lat 12</>,
  <>dodatkowe pakiety kolacyjne — 25 zł/porcja</>,
  <>podane ceny nie obejmują opłaty klimatycznej</>,
  <>dzieci do lat 3 (maksymalnie jedno dziecko w pokoju, nie ukończone 3 lata <b>w dniu wjazdu</b>) bez świadczeń gratis (w pokoju lub studiu minimum trzyosobowym, w dwuosobowym dopłata 10 zł za dobę) — przy dokonywaniu czynności meldunkowych w recepcji ośrodka może być <b>wymagane okazanie dokumentu potwierdzającego datę urodzenia</b></>,
  <>przyjmujemy zwierzaki domowe (<b>wyłącznie w pokojach parterowych</b>) — opłata od 15 do 30 zł/doba</>,
  <>parking na terenie ośrodka w czasie wakacji płatny 30 zł/doba</>,
  <>dbając o Państwa wygodę mamy również do dyspozycji ogólnodostępny aneks kuchenny (płyta indukcyjna — należy mieć własne naczynia, mikrofalówka, lodówka), pralnię, wypożyczalnię sprzętu sportowego</>,
  <>do dyspozycji naszych Gości również krzesełka do karmienia w jadalni, wanienki dla dzieci, nocniki, nakładki na WC</>,
  <>sprzątanie pokoju w trakcie pobytu — 70 złotych/pokój</>,
  <>wymiana pościeli w trakcie pobytu — 35 złotych/komplet</>,
];

function PriceNotes() {
  const li = (n, i) => <li key={i}><Icon name="dot" size={14} /><span>{n}</span></li>;
  return (
    <section className="c-band" id="uwagi">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Uwagi do cennika</Eyebrow>
            <h2>Posiłki, doba, <em>dopłaty</em>.</h2>
          </div>
        </div>
        <ul className="notes-cols">{[...PRICE_NOTES_A, ...PRICE_NOTES_B].map(li)}</ul>

        <details className="c-details">
          <summary><Icon name="chevron-right" size={16} /> Co można u nas wypożyczyć za dodatkową opłatą</summary>
          <div className="inner">
            <p>Do pokoju można wypożyczyć leżaki (bezpłatnie za kaucją), a także chłodziarki oraz łóżeczka turystyczne dla dzieci (dodatkowo płatne). W razie niepogody lub niskich temperatur istnieje możliwość wypożyczenia termowentylatorów.</p>
            <p>Aktualną listę i ceny poda recepcja: <a href="tel:+48943182976">+48 94 318 29 76</a>.</p>
          </div>
        </details>

        <div className="c-legal">
          <p>Informacje podane w cenniku nie stanowią oferty handlowej w rozumieniu przepisów kodeksu Prawa Cywilnego. W zależności od rodzaju, terminu i długości pobytu obowiązują ceny umowne.</p>
          <p>* Standardowo w każdym pokoju udostępniamy nowoczesne odbiorniki telewizyjne, które bezpłatnie wypożyczone są dla Państwa na czas pobytu od Fundacji Niezależna Fonografia Polska. Każdy z gości może jednak zrezygnować z jego wypożyczenia zgłaszając taką chęć podczas dokonywania rezerwacji lub na miejscu w recepcji ośrodka.</p>
          <p><strong>CENY I ŚWIADCZENIA DLA GRUP USTALANE SĄ INDYWIDUALNIE</strong></p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PriceTable2026, PriceNotes, PRICE_PERIODS });
