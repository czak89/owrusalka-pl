/* ============================================================================
   rez-page.jsx — full reservation PAGE: site nav + hero + wizard + footer.
   Reuses the site chrome (TopNav, Contact, Footer, Icon) from kit/sections.
============================================================================ */
/* global React, ReactDOM, TopNav, Contact, Footer, Icon, Wizard,
   useTweaks, TweaksPanel, TweakSection, TweakRadio */

const { useEffect: useEffectP } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "kierunek": "a",
  "calStyle": "month",
  "weekStart": "mon",
  "density": "comfy"
}/*EDITMODE-END*/;

function scrollToWizard() {
  const el = document.getElementById('rezerwacja');
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
}

function Site() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffectP(() => { if (window.lucide) window.lucide.createIcons(); }, []);

  return (
    <>
      <TopNav active="" onBook={scrollToWizard} linkBase="index.html" />

      <div className="rez-crumb">
        <div className="container">
          <a href="index.html">Start</a><span className="sep">/</span><span className="here">Rezerwacja</span>
        </div>
      </div>

      <header className="rez-hero">
        <div className="sun-disc" aria-hidden="true" />
        <div className="rez-hero-inner">
          <div className="ribbon">rezerwacja online</div>
          <h1>Zarezerwuj <em>pobyt</em> nad Bałtykiem</h1>
          <p className="lede">Wybierz termin w kalendarzu, podaj kilka szczegółów — resztę potwierdzimy telefonicznie w ciągu doby.</p>
          <div className="rez-trust">
            <span><Icon name="calendar-check" /> Potwierdzenie w 24 h</span>
            <span><Icon name="hand-coins" /> Bez przedpłaty online</span>
            <span><Icon name="phone" /> Recepcja 94 318 29 76</span>
          </div>
        </div>
      </header>

      <section id="rezerwacja" className={'rez-stage density-' + t.density}>
        <Wizard variant={t.kierunek} calStyle={t.calStyle} weekStart={t.weekStart} onDone={scrollToWizard} />
        <aside className="rez-aside">
          <div className="ra-script">Pięćdziesiąt metrów do plaży.<br />Reszta — Państwa.</div>
          <div className="ra-block">
            <div className="ra-ico"><Icon name="tree-pine" /></div>
            <div><h4>Sosnowy las i wydma</h4><p>Ośrodek 50 m od szerokiej, piaszczystej plaży, w otoczeniu sosen.</p></div>
          </div>
          <div className="ra-block">
            <div className="ra-ico"><Icon name="utensils" /></div>
            <div><h4>Domowa kuchnia</h4><p>Wyżywienie na miejscu i biesiady przy ognisku po kolacji.</p></div>
          </div>
          <div className="ra-block">
            <div className="ra-ico"><Icon name="baby" /></div>
            <div><h4>Dla najmłodszych</h4><p>Programy animacyjne, plac zabaw, a maluchy do 3 lat nocują gratis.</p></div>
          </div>
        </aside>
      </section>

      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Wygląd" />
        <TweakRadio label="Kierunek" value={t.kierunek}
          options={[{ value: 'a', label: 'Pocztówka' }, { value: 'b', label: 'Morski' }, { value: 'c', label: 'Piaskowy' }]}
          onChange={v => setTweak('kierunek', v)} />
        <TweakSection label="Kalendarz" />
        <TweakRadio label="Styl kalendarza" value={t.calStyle}
          options={[{ value: 'month', label: 'Miesiąc' }, { value: 'weeks', label: 'Wstęga tygodni' }]}
          onChange={v => setTweak('calStyle', v)} />
        <TweakRadio label="Początek tygodnia" value={t.weekStart}
          options={[{ value: 'mon', label: 'Poniedziałek' }, { value: 'sat', label: 'Sobota' }]}
          onChange={v => setTweak('weekStart', v)} />
        <TweakSection label="Układ" />
        <TweakRadio label="Gęstość" value={t.density}
          options={[{ value: 'comfy', label: 'Wygodna' }, { value: 'compact', label: 'Zwarta' }]}
          onChange={v => setTweak('density', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Site />);
