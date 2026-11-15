/* Site-wide SEO data: canonical address, per-page titles and descriptions,
   structured data. Used by the server files in app/ only.

   NEXT_PUBLIC_SITE_URL is the public origin without a path (default: the
   resort's own domain). The base path is appended, so a GitHub Pages build
   sets NEXT_PUBLIC_SITE_URL=https://<user>.github.io and NEXT_PUBLIC_BASE_PATH. */
import { BASE_PATH } from "./base";

const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://owrusalka.pl").replace(/\/+$/, "");

export const SITE_URL = ORIGIN + BASE_PATH;
export const SITE_NAME = "Ośrodek Wypoczynkowy „Rusałka”";
export const OG_IMAGE = { url: absUrl("/assets/og-rusalka.jpg"), width: 1200, height: 630, alt: "Rusałka: rodzinne wakacje nad Bałtykiem, Łazy k. Mielna" };

export function absUrl(path = "/") {
  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}

/* Route -> title and description. Order is the sitemap order. */
export const PAGES = {
  "/": {
    title: "Rusałka · Wakacje rodzinne nad Bałtykiem w Łazach",
    description:
      "Ośrodek Wypoczynkowy Rusałka w Łazach k. Mielna. 50 metrów od plaży, sosnowy las, domowa kuchnia. Rodzinne wakacje nad Bałtykiem.",
  },
  "/pokoje/": {
    title: "Pokoje · Rusałka — wakacje rodzinne w Łazach",
    description:
      "Pokoje Economy z osobnym wejściem, pokoje rodzinne i dwupokojowe studia z balkonem lub tarasem. Wszystkie z łazienką, 50 metrów od plaży w Łazach.",
  },
  "/cennik/": {
    title: "Cennik 2026 · Rusałka — Łazy nad Bałtykiem",
    description:
      "Cennik noclegów w Ośrodku Wypoczynkowym Rusałka na sezon 2026: ceny za osobę za dobę, wyżywienie, zniżki dla dzieci i zasady rezerwacji.",
  },
  "/atrakcje/": {
    title: "Atrakcje · Rusałka — Łazy nad Bałtykiem",
    description:
      "Animacje dla dzieci, ognisko i plac zabaw na miejscu. Plaża 50 metrów od ośrodka, a w okolicy Mielno, Darłowo, Kołobrzeg i Łeba.",
  },
  "/lato/": {
    title: "Lato 2026 · Rusałka — Łazy nad Bałtykiem",
    description:
      "Lato 2026 w Rusałce: terminy sezonu, turnusy od soboty do soboty, rodzaje wyżywienia i godziny posiłków.",
  },
  "/galeria/": {
    title: "Galeria · Rusałka — Łazy nad Bałtykiem",
    description:
      "Zdjęcia Ośrodka Wypoczynkowego Rusałka w Łazach: pokoje, teren ośrodka, place zabaw i plaża nad Bałtykiem.",
  },
  "/kontakt/": {
    title: "Kontakt · Rusałka — Łazy nad Bałtykiem",
    description:
      "Ośrodek Wypoczynkowy Rusałka, ul. Leśna 22, 76-002 Łazy k. Mielna. Recepcja: +48 94 318 29 76, recepcja@owrusalka.pl.",
  },
  "/rezerwacja/": {
    title: "Rezerwacja pobytu — Ośrodek Wypoczynkowy „Rusałka”",
    description:
      "Zapytanie o rezerwację pobytu w Rusałce w Łazach: termin, liczba gości i rodzaj zakwaterowania. Recepcja potwierdza dostępność w ciągu 24 godzin.",
  },
};

/* Metadata object for a route. Open Graph is repeated in full on every page
   because a page-level openGraph replaces the layout's instead of merging. */
export function pageMeta(path) {
  const { title, description } = PAGES[path];
  const url = absUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "pl_PL", siteName: SITE_NAME, title, description, url, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/* schema.org LodgingBusiness: only facts stated on the site (docs/rusalka-info.md). */
export const LODGING_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  description: PAGES["/"].description,
  url: absUrl("/"),
  image: OG_IMAGE.url,
  logo: absUrl("/assets/logo-rusalka-full.png"),
  telephone: "+48 94 318 29 76",
  email: "recepcja@owrusalka.pl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Leśna 22",
    postalCode: "76-002",
    addressLocality: "Łazy",
    addressRegion: "zachodniopomorskie",
    addressCountry: "PL",
  },
  contactPoint: ["+48 94 318 29 76", "+48 790 529 189", "+48 511 114 207"].map((telephone) => ({
    "@type": "ContactPoint",
    contactType: "reservations",
    telephone,
    email: "recepcja@owrusalka.pl",
    availableLanguage: "pl",
  })),
};
