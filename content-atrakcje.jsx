/* global React, Icon, Eyebrow */
/* Atrakcje — facilities in the resort + surroundings (source: owrusalka.pl/atrakcje) */

const FACILITIES = [
  { icon: "waves", t: "50 metrów do morza", b: "Szeroka, czysta i piaszczysta plaża. Przejście na plażę przy O.W. Rusałka." },
  { icon: "party-popper", t: "Animacje dla dzieci", b: "W wakacje 6 dni w tygodniu: Klauni Kulki, warsztaty plastyczne, gry, zabawy i konkursy z nagrodami, seanse bajkowe." },
  { icon: "flame", t: "Biesiady przy ognisku", b: "Ognisko z pieczeniem kiełbasek na terenie ośrodka." },
  { icon: "utensils", t: "Domowa kuchnia", b: "Śniadania w formie bufetu szwedzkiego, obiadokolacje z deserem do stolika i bufet surówkowy." },
  { icon: "baby", t: "Place zabaw i sala zabaw", b: "Duży plac zabaw na rozległym, zielonym terenie ośrodka oraz sala zabaw dla dzieci." },
  { icon: "volleyball", t: "Sport na miejscu", b: "Boisko do siatkówki, kometki, tenis stołowy i wypożyczalnia sprzętu sportowego." },
  { icon: "wifi", t: "Internet Wi-Fi", b: "Dostępny na terenie ośrodka w ramach pobytu." },
  { icon: "cooking-pot", t: "Aneks kuchenny i pralnia", b: "Płyta indukcyjna (własne naczynia), mikrofalówka, lodówka. Do tego pralnia." },
  { icon: "thermometer-sun", t: "Na chłodniejsze dni", b: "W razie niepogody lub niskich temperatur można wypożyczyć termowentylatory." },
];

function Facilities() {
  return (
    <section className="c-band alt" id="w-osrodku">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>W ośrodku</Eyebrow>
            <h2>Co czeka na <em>miejscu</em>.</h2>
            <p className="sub">Jednorazowo przyjmujemy do 220 osób. Rozległy, zielony teren to wymarzone miejsce do zabaw dla najmłodszych.</p>
          </div>
        </div>
        <div className="fac-grid">
          {FACILITIES.map((f) => (
            <div className="fac" key={f.t}>
              <div className="ico-box"><Icon name={f.icon} size={20} /></div>
              <h4>{f.t}</h4>
              <p>{f.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Li = ({ children }) => <li><Icon name="chevron-right" size={16} /><span>{children}</span></li>;

const REGIONS = [
  { id: "lazy", name: "Łazy", pre: "tuż za furtką", body: (
    <>
      <p><b>Piękna, piaszczysta plaża w Łazach (przejście przy O.W. Rusałka – 50 m).</b> Plaża w Łazach należy do jednej z najczystszych nad Morzem Bałtyckim. Jest strzeżona w okresie wakacyjnym. Jeżeli szukacie ciszy i spokoju, przyjedźcie do nas – Rusałka położona jest na końcu miejscowości Łazy – 200 m na zachód od ośrodka kończy się droga, zaczyna sosnowy las oraz sześciokilometrowa dzika, piaszczysta plaża.</p>
      <p>Zaledwie 100 m od ośrodka możecie Państwo skorzystać z kompleksu basenów na świeżym powietrzu Holiday Aquapark.</p>
      <p>W odległości 350 m od Rusałki znajduje się centrum Łaz, w którym znajdziecie Państwo: restauracje, bary, smażalnie ryb, punkty sprzedaży lodów i gofrów, sklepy spożywcze, z pamiątkami, atrakcje dla dzieci (pływające kule, bungee, trampoliny, automaty, karuzele, baseny z kulkami etc.). W Łazach i okolicach znajduje się kilkadziesiąt kilometrów wytyczonych tras rowerowych.</p>
    </>
  )},
  { id: "mielno", name: "Mielno / Unieście i okolica", pre: "na rozrywki", body: (
    <>
      <p>Miejsce dla spragnionych zarówno dziennych jak i całonocnych rozrywek – dyskoteki, dancingi, pasaże handlowe, smażalnie, kawiarnie, lodziarnie w nieprzebranych ilościach a ponadto rejsy statkiem MILA po Jeziorze Jamno, windsurfing, żaglówki, wędkarstwo nad morzem: zjeżdżalnie wodne, motorówki, skutery, Wesołe Miasteczko, ścieżki rowerowe. W Mielnie-Unieściu możecie Państwo wypożyczyć sprzęt wodny (kajaki, rowery wodne, łódki etc.).</p>
      <p>W porcie w Unieściu można skosztować pysznych wędzonych lub smażonych ryb oraz kupić je świeże prosto z kutra.</p>
    </>
  )},
  { id: "rzepkowo", name: "Rzepkowo", pre: "konie i kajaki", body: (
    <>
      <p><b>Stadnina koni w Rzepkowie</b> – również nauka jazdy dla dzieci.</p>
      <p>Spływy kajakowe lokalnymi rzeczkami (całodniowa trasa z przewodnikiem – w programie ognisko z pieczeniem kiełbasek), Kraina Hobbitów w Sierakowie (jest to wioska tematyczna, program dofinansowany z środków UE – zwiedzanie wioski – Wieża Elfów, gra terenowa „Tam i z powrotem", pokaz walk rycerskich, zwiedzanie kuźni, przeprawa tratwą).</p>
    </>
  )},
  { id: "darlowo", name: "Darłowo / Darłówko", pre: "port i rejsy", body: (
    <ul>
      <Li><b>Park Wodny „JAN"</b> – Jedyny na Pomorzu Bałtyckim kompleks rekreacyjno-basenowy z wodą morską pozwalający na korzystanie z atrakcji wodnych przez cały rok.</Li>
      <Li><b>rejsy morskie</b> – wycieczka katamaranem na duńską wyspę Bornholm.</Li>
      <Li><b>połowy dorsza</b> na kutrze rybackim (Oferta skierowana jest zarówno do osób szukających nowych wrażeń, jak również doświadczonych wędkarzy, do osób prywatnych i grup zorganizowanych. Rejsy połowowe odbywają się cały rok. Łowiska mają głębokość od 16 do 60 m. Podczas rejsów wędkarze mają możliwość złowienia takich ryb jak: dorsze, flądry, belony, śledzie, łososie. Statki i kutry rybackie przystosowane są do żeglugi pełnomorskiej po Bałtyku. Rejsy trwają ok. 8 godzin (czas rejsu może też być ustalany indywidualnie). W miesiącach letnich istnieje możliwość organizowania rejsów popołudniowych.</Li>
      <Li><b>przejażdżka tramwajem wodnym z Darłówka do Darłowa</b> (zwiedzanie portu w Darłowu oraz latarni morskiej)</Li>
      <Li><b>szlaki turystyczne m.in. Szlak Wiatraków</b> (w okolicach Darłowa znajduje się jedna z największych farm wiatraków w Europie)</Li>
      <Li><b>szlaki kajakowe</b> rzekami Wieprzą i Grabową</Li>
      <Li><b>do zwiedzania w Darłowie:</b> Zamek Książąt Pomorskich, Kościół Mariacki z XIV w. Sanktuarium Matki Bożej Fatimskiej (w stylu gotyckim), Brama Kamienna</Li>
    </ul>
  )},
  { id: "leba", name: "Łeba", pre: "park dinozaurów", body: (
    <>
      <p><b>ŁEBA PARK</b> to jedyny w Polsce tak rozbudowany i wielki obszarowo park Dinozaurów. Przepięknie położony na obszarze blisko 20 ha. W otoczeniu lasów, stawów, trzęsawisk i naturalnej przyrody, licznymi szlakami poznajemy poszczególne okresy z dziejów Ziemi. Podczas spaceru ścieżkami, mostami i kładkami poprzez trzciny obcujemy z około 100 gadami, a wśród nich dwa kolosy Seismosaurus mające 45 metrów długości <b><i>i jedyny w Polsce Brachiosaurus z wysokością 13 metrów</i></b>. Namacalnie i wszystkimi zmysłami czujemy klimat tamtych okresów w dziejach Ziemi, pokazując jak wyglądało i jak rozwijało się życie setki milionów lat temu.</p>
      <p><b>ŁEBA PARK</b> daje jedyną możliwość goszczenia w pradawnej chacie oraz w grotach przedstawiających życie i pochówek Neandertalczyków.</p>
      <p>Spragnionych bliskiego kontaktu z obecnie żyjącymi zwierzętami zaprasza <b>Mini ZOO</b> gdzie najmniejsi globtroterzy mogą karmić kozy, owce, daniele, jelenie i wiele innych oraz ujeżdżać kucyki.</p>
      <p>Dla wszystkich najmłodszych chcących odwiedzić <b>ŁEBA PARK</b> do dyspozycji place zabaw i kino. <b>ŁEBA PARK</b> zaprasza młodzież szkolną i wycieczki zorganizowane na szlak edukacyjny wyposażony w opisy gadów wraz ze sposobami rozmnażania, żywienia, otoczeniem i opisem ery w jakiej przebywały, nazwy fauny i flory.</p>
      <p><b>ŁEBA PARK</b> to również zaplecze gastronomiczne i wypoczynkowe. Parkingi na auta i autokary. Sklep z pamiątkami, galeria skamielin i minerałów oraz galeria bursztynowa wraz z opisami i przykładami poszczególnych etapów powstawania i kształtowania żywicznego złota.</p>
    </>
  )},
  { id: "koszalin", name: "Koszalin", pre: "zabytki i sport", body: (
    <p>Góra Chełmska, Gotycka Katedra, Kaplica św. Gertrudy, Średniowieczne mury obronne, Domek Kata, Muszla Koncertowa. Dla aktywnych kręgielnia, strzelnica sportowa. W okolicy rezerwat „Kamienne Kręgi".</p>
  )},
  { id: "kolobrzeg", name: "Kołobrzeg", pre: "i rejs na Bornholm", body: (
    <>
      <p>Stare Miasto, Muzeum Oręża Polskiego, Latarnia Morska, port, molo, Rejsy statkiem po morzu Bałtyckim, <b>wycieczki na wyspy Ruggia i Bornholm</b> (rejsy z Darłowa i Kołobrzegu). Jest to fascynujące miejsce o bogatej kulturze i historii oraz urozmaiconym krajobrazie. Wyspa jest znakomicie zagospodarowana pod względem turystycznym. Bornholm ma ponad 250 km najlepszych w Europie ścieżek rowerowych. Prowadzą one wokół wyspy i można nimi dojechać do wszystkich interesujących miejsc. Wyspę można zwiedzać: pieszo, rowerem, autostopem, busem, skuterem, autobusem i jachtem. W centrum informacji turystycznej w Nexo, położonym koło dworca autobusowego można otrzymać w języku polskim plan miasta Nexo, informator o Jobolandzie – słynnym parku, pełnym setek atrakcji dla dzieci i dorosłych oraz wiele innych informacji o zabytkach, kampingach, zamkach kościołach, muzeach czy galeriach. Na polskich turystów oczekują tam polscy przewodnicy po wyspie.</p>
      <p><b>Wioska Indiańska Zieleniewo k/ Kołobrzegu</b> – Wioska Indiańska, Western City, Mini ZOO – program „Dziki Zachód show" (m.in. zwiedzanie stadniny, mini ZOO, przejażdżka konna, przejażdżka bryczką, strzelanie z łuku, ognisko w wigwamie z pieczeniem kiełbasek, zabawa z zespołem muzycznym, konkursy z nagrodami dla wszystkich, pokazy z udziałem koni)</p>
      <p><b>Ogrody tematyczne HORTULUS – Dobrzyca k/Kołobrzegu</b> Ogrody Tematyczne Hortulus w Dobrzycy są wielką atrakcją turystyczną Pomorza Środkowego. Na ok. 5 ha, rozciągają się ogrody w różnych stylach: angielskim, francuskim, japońskim, ogród troli, ogród Gaudiegi i wiele innych. Jest tu Domek Baby Jagi i plac zabaw, ale również ścieżki edukacyjne dla dzieci. Wyspecjalizowani przewodnicy, wprowadzą gości w świat przyrody, pokażą możliwości naprawy środowiska przyrodniczego, zniszczonego na skutek działalności człowieka, omówią m.in. różne gatunki roślin i sposoby ich pielęgnacji, odpowiedzą na wszystkie pytania związane z tematami zajęć.</p>
    </>
  )},
];

function Surroundings() {
  return (
    <section className="c-band" id="okolica">
      <div className="container">
        <div className="section-head">
          <div className="titles">
            <Eyebrow>Plaża i atrakcje w okolicy</Eyebrow>
            <h2>Od Łaz po <em>Bornholm</em>.</h2>
            <p className="sub">Co zobaczyć na miejscu i w wycieczkach jednodniowych.</p>
          </div>
        </div>
        <nav className="region-nav">
          {REGIONS.map((r) => <a key={r.id} href={`#${r.id}`}>{r.name}</a>)}
        </nav>
        {REGIONS.map((r) => (
          <article className="region" id={r.id} key={r.id}>
            <div className="rh"><div className="pre">{r.pre}</div><h3>{r.name}</h3></div>
            <div className="rb">{r.body}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Facilities, Surroundings });
