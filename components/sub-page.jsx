"use client";
import React from "react";
import { withBase } from "./base";
import { Button, TopNav, PageHero, useBooking } from "./kit";
import { Gallery, Contact, Footer, BookCtaBand, BookingModal } from "./sections";
import { Facilities, Surroundings } from "./content-atrakcje";
import { PriceTable2026, PriceNotes } from "./content-cennik";
import { SeasonPlan, DayPlan, GalleryGroups, ContactFacts } from "./content-misc";
import { ContactForm } from "./contact-form";
import { useTweaks, useSiteTheme, SiteTweaks } from "./site-theme";

/* ============================================================================
   page.jsx — shared subpage shell.
   Each subpage HTML sets <body data-page="…">; the matching definition below
   provides nav state, hero and body. Booking always opens as a modal.
============================================================================ */
/* global React, ReactDOM, TopNav, PageHero, Footer, Contact, Pricing, Amenities,
   Timeline, Gallery, BookingModal, BookCtaBand, Button, useBooking,
   useTweaks, useSiteTheme, SiteTweaks */

const { useEffect: useEffectPg } = React;

/* Tweak defaults — block must remain valid JSON between markers */
const SUBPAGE_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF6F3C",
  "corners": "soft",
  "texture": true,
  "mode": "light",
  "stickyCta": true
}/*EDITMODE-END*/;

const PAGES = {
  cennik: {
    nav: "Cennik",
    hero: (
      <PageHero
        crumb="Cennik"
        ribbon="sezon 2026"
        title={<>Cennik noclegów <em>2026</em>.</>}
        lede="Ceny za osobę za dobę, z wyżywieniem od 23 maja. Dziecko do 3 lat bez świadczeń gratis."
      >
        <div className="hero-actions">
          <Button variant="secondary" icon="download">Pobierz cennik (PDF)</Button>
        </div>
      </PageHero>
    ),
    body: () => <><PriceTable2026 /><PriceNotes /></>,
    cta: true,
  },

  atrakcje: {
    nav: "Atrakcje",
    hero: (
      <PageHero
        crumb="Atrakcje"
        ribbon="co tu robicie"
        title={<>Plaża i <em>atrakcje</em>.</>}
        lede="Animacje dla dzieci, ognisko i plac zabaw na miejscu. Plaża 50 metrów od ośrodka, a w okolicy Mielno, Darłowo, Kołobrzeg i Łeba."
      />
    ),
    body: () => <><Facilities /><Surroundings /></>,
    cta: true,
  },

  lato: {
    nav: "Lato 2026",
    hero: (
      <PageHero
        crumb="Lato 2026"
        ribbon="sezon i rytm dnia"
        title={<>Lato w <em>Rusałce</em>.</>}
        lede="Terminy sezonu, rodzaje wyżywienia i godziny posiłków. W wakacje turnusy od soboty do soboty."
      />
    ),
    body: () => <><SeasonPlan /><DayPlan /></>,
    cta: true,
  },

  galeria: {
    nav: "Galeria",
    hero: (
      <PageHero
        crumb="Galeria"
        ribbon="z naszego albumu"
        title={<>Lato w Łazach — <em>kilka kadrów</em>.</>}
        lede="Ośrodek, pokoje, place zabaw i plaża. Przeciągnijcie zdjęcia na kafelki."
      />
    ),
    body: () => <><Gallery head={false} /><GalleryGroups /></>,
    cta: true,
  },

  kontakt: {
    nav: "Kontakt",
    hero: (
      <PageHero
        crumb="Kontakt"
        ribbon="znajdziecie nas tutaj"
        title={<>76-002 Łazy, ul. <em>Leśna 22</em>.</>}
        lede="Niedaleko Mielna, na końcu Leśnej, między sosnami a wydmą. Odpisujemy w ciągu doby."
      />
    ),
    body: () => <><Contact head={false} /><ContactForm /><ContactFacts /></>,
    cta: false,
  },
};

function SubPage({ page }) {
  const def = PAGES[page] || PAGES.kontakt;
  const [tweaks, setTweak] = useTweaks(SUBPAGE_TWEAK_DEFAULTS);
  const booking = useBooking();
  const openBooking = () => booking.openBooking();

  useSiteTheme(tweaks, setTweak);
  useEffectPg(() => { if (window.lucide) window.lucide.createIcons(); });

  return (
    <>
      <TopNav active={def.nav} onBook={openBooking} />
      {def.hero}
      {def.body(booking)}
      {def.cta ? <BookCtaBand onBook={openBooking} /> : null}
      <Footer />

      {tweaks.stickyCta ? (
        <div className="sticky-cta">
          <Button variant="cta" iconRight="arrow-right" onClick={openBooking}>
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

      <SiteTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

export default SubPage;
