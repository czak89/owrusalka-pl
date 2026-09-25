/* global React, ReactDOM,
   TopNav, Hero, StatsStrip, BookingBar, RoomsSection,
   Pricing, Amenities, Timeline, Story, Gallery, Testimonials, Contact, Footer, BookingModal,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, Button */

const { useState: useStateApp, useEffect: useEffectApp } = React;

/* ============================================================================
   Tweak defaults — block must remain valid JSON between markers
============================================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "asymmetric",
  "emphasis": "coral",
  "stickyCta": true
}/*EDITMODE-END*/;

function Site() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  /* Booking state lifted to root so the bar and modal stay in sync */
  const [bookingOpen, setBookingOpen] = useStateApp(false);
  const [activeRoom, setActiveRoom] = useStateApp("family");
  const [dates, setDates]   = useStateApp({ in: "18 lipca 2026", out: "25 lipca 2026" });
  const [guests, setGuests] = useStateApp("2 dorosłych + 2 dzieci");

  /* Apply data-emphasis to <body> for CSS theming */
  useEffectApp(() => {
    document.body.dataset.emphasis = tweaks.emphasis;
  }, [tweaks.emphasis]);

  /* Lucide icons re-render after each state change */
  useEffectApp(() => { if (window.lucide) window.lucide.createIcons(); });

  const setBookingState = (patch) => {
    if (patch.in !== undefined || patch.out !== undefined) {
      setDates({ ...dates, ...(patch.in ? { in: patch.in } : {}), ...(patch.out ? { out: patch.out } : {}) });
    }
    if (patch.guests !== undefined) setGuests(patch.guests);
    if (patch.room !== undefined) setActiveRoom(patch.room);
  };

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <TopNav active="Start" onBook={openBooking} />
      <Hero layout={tweaks.hero} onBook={openBooking} />
      <StatsStrip />
      <BookingBar
        onBook={openBooking}
        dates={dates}
        guests={guests}
        room={activeRoom}
        setBookingState={setBookingState}
      />
      <RoomsSection activeId={activeRoom} onPick={setActiveRoom} onBook={openBooking} />
      <Pricing />
      <Amenities />
      <Timeline />
      <Story />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />

      {tweaks.stickyCta ? (
        <div className="sticky-cta">
          <Button variant="cta" iconRight="arrow-right" onClick={openBooking}>
            Zarezerwuj pobyt
          </Button>
        </div>
      ) : null}

      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
        dates={dates}
        guests={guests}
        roomId={activeRoom}
        setBookingState={setBookingState}
      />

      <TweaksPanel title="Tweaks">
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

        <TweakSection label="Akcent CTA">
          <TweakRadio
            label="Kolor"
            value={tweaks.emphasis}
            onChange={(v) => setTweak("emphasis", v)}
            options={[
              { value: "coral",  label: "Koral" },
              { value: "amber",  label: "Amber" },
              { value: "baltic", label: "Bałtyk" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Mobile">
          <TweakToggle
            label="Sticky CTA"
            value={tweaks.stickyCta}
            onChange={(v) => setTweak("stickyCta", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Site />);
