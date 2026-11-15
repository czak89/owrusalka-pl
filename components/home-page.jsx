"use client";
import React from "react";
import { withBase } from "./base";
import { Button, TopNav, useBooking, Hero, StatsStrip, BookingBar, RoomsSection } from "./kit";
import { Story, Footer, BookCtaBand, BookingModal } from "./sections";
import { AboutResort, RealReviews } from "./content-misc";
import { useTweaks, useSiteTheme, SiteTweaks, TweakSection, TweakRadio } from "./site-theme";

/* global React, ReactDOM,
   TopNav, Hero, StatsStrip, BookingBar, RoomsSection, Story, Testimonials,
   BookCtaBand, Footer, BookingModal, useBooking,
   useTweaks, useSiteTheme, SiteTweaks, TweakSection, TweakRadio, Button */

const { useEffect: useEffectApp } = React;

/* ============================================================================
   Tweak defaults — block must remain valid JSON between markers
============================================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "asymmetric",
  "accent": "#FF6F3C",
  "corners": "soft",
  "texture": true,
  "mode": "light",
  "stickyCta": true
}/*EDITMODE-END*/;

function Site() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const booking = useBooking();
  const openBooking = () => booking.openBooking();

  useSiteTheme(tweaks, setTweak);

  /* Lucide icons re-render after each state change */
  useEffectApp(() => { if (window.lucide) window.lucide.createIcons(); });

  return (
    <>
      <TopNav active="Start" onBook={openBooking} />
      <Hero layout={tweaks.hero} onBook={openBooking} />
      <StatsStrip />
      <BookingBar
        onBook={openBooking}
        dates={booking.dates}
        guests={booking.guests}
        room={booking.activeRoom}
        setBookingState={booking.setBookingState}
      />
      <RoomsSection activeId={booking.activeRoom} onPick={booking.setActiveRoom} onBook={openBooking} />
      <AboutResort />
      <Story />
      <RealReviews />
      <BookCtaBand onBook={openBooking} />
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

      <SiteTweaks tweaks={tweaks} setTweak={setTweak}>
        <TweakSection label="Hero">
          <TweakRadio
            label="Układ"
            value={tweaks.hero}
            onChange={(v) => setTweak("hero", v)}
            options={[
              { value: "asymmetric", label: "Polaroidy" },
              { value: "centered",   label: "Centred" },
              { value: "split",      label: "Split" },
            ]}
          />
        </TweakSection>
      </SiteTweaks>
    </>
  );
}

export default Site;
