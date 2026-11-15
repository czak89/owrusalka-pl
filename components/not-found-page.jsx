"use client";
import React from "react";
import { withBase } from "./base";
import { Button, TopNav, PageHero } from "./kit";
import { Footer } from "./sections";
import { useTweaks, useSiteTheme } from "./site-theme";

/* 404 — the shared subpage shell with the page hero only. "Zarezerwuj" leads
   to the booking wizard, so this page does not need the booking modal. */
const NOT_FOUND_DEFAULTS = { accent: "#FF6F3C", corners: "soft", texture: true };

const LINKS = [
  { label: "Pokoje", href: "/pokoje/" },
  { label: "Cennik", href: "/cennik/" },
  { label: "Kontakt", href: "/kontakt/" },
];

function NotFoundPage() {
  const [tweaks] = useTweaks(NOT_FOUND_DEFAULTS);
  useSiteTheme(tweaks);
  const goBook = () => { window.location.href = withBase("/rezerwacja/"); };

  return (
    <>
      <TopNav active="" onBook={goBook} />
      <main className="not-found">
        <PageHero
          crumb="Nie znaleziono strony"
          ribbon="ups, zły adres"
          title={<>Tej strony nie ma <em>na mapie</em>.</>}
          lede="Adres mógł się zmienić albo wkradła się w niego literówka. Proszę wrócić na stronę główną lub wybrać jedno z miejsc poniżej."
        >
          <div className="hero-actions">
            <a href={withBase("/")}><Button variant="cta" iconRight="arrow-right">Strona główna</Button></a>
            {LINKS.map((l) => (
              <a key={l.href} href={withBase(l.href)}><Button variant="secondary">{l.label}</Button></a>
            ))}
          </div>
          <p className="not-found-help">
            Recepcja chętnie pomoże: <a href="tel:+48943182976">+48 94 318 29 76</a> ·{" "}
            <a href="mailto:recepcja@owrusalka.pl">recepcja@owrusalka.pl</a>
          </p>
        </PageHero>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
