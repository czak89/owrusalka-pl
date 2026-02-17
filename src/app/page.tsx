import Image from "next/image";

import Contact from "@/components/Contact";

const roomOptions = [
  {
    title: "Pokoje i studia rodzinne",
    details:
      "Pokoje oraz 2-pokojowe studia w budynku glownym, z balkonami lub tarasami.",
  },
  {
    title: "Pokoje Economy",
    details:
      "Pokoje w parterowych pawilonach z samodzielnym wejsciem, lazienka i TV.",
  },
  {
    title: "Dla rodzin z dziecmi",
    details:
      "Rozlegly teren, place zabaw, animacje i spokojna lokalizacja blisko morza.",
  },
];

const features = [
  "50 m do szerokiej i piaszczystej plazy",
  "Wyzywienie HB i domowa kuchnia",
  "Animacje dla dzieci 6 dni w tygodniu",
  "Boisko, sala zabaw i infrastruktura rodzinna",
  "Parking na terenie osrodka",
  "Wi-Fi i szybki kontakt z recepcja",
];

const attractions = [
  {
    title: "Lazy i okolica",
    details:
      "Cicha okolica, czysta plaza, trasy rowerowe i pelna infrastruktura wakacyjna.",
  },
  {
    title: "Mielno i Uniescie",
    details:
      "Port, gastronomia, sporty wodne, rejsy i wieczorne zycie kurortu.",
  },
  {
    title: "Dalsze wycieczki",
    details:
      "Darlowo, Kolobrzeg, Leba i inne punkty regionu na jednodniowe wypady.",
  },
];

const testimonials = [
  {
    quote:
      "Bardzo dobre jedzenie, blisko morza i swietne animacje. Wrocilismy z dziecmi kolejny raz.",
    author: "Bartek K",
  },
  {
    quote:
      "Super obsluga, smaczna kuchnia i przystepne ceny. Bardzo dobry stosunek jakosci do ceny.",
    author: "Robert C",
  },
  {
    quote:
      "Spokojna atmosfera i duzo miejsca dla dzieci. Idealne miejsce na rodzinny pobyt.",
    author: "Goscie Rusalka",
  },
];

const pricingNotes = [
  "Pakiet HB i sezonowe warunki pobytu - szczegoly podaje recepcja.",
  "Animacje dla dzieci organizowane sa regularnie w sezonie wakacyjnym.",
  "Pobyty wakacyjne najczesciej realizowane sa w ukladzie tygodniowym.",
  "Ceny grupowe oraz eventowe ustalane sa indywidualnie.",
];

const heroImage = {
  src: "https://owrusalka.pl/wp-content/uploads/2023/01/Zdjecia-z-drona-4_1-scaled.webp",
  alt: "Widok osrodka Rusalka z drona",
};

const galleryPhotos = [
  {
    src: "https://owrusalka.pl/wp-content/uploads/2023/01/z-gory-2.webp",
    alt: "Widok osrodka z lotu ptaka",
  },
  {
    src: "https://owrusalka.pl/wp-content/uploads/2023/01/plac-zabaw-scaled.webp",
    alt: "Plac zabaw dla dzieci",
  },
  {
    src: "https://owrusalka.pl/wp-content/uploads/2023/01/jadalnia-taras.webp",
    alt: "Taras przy jadalni osrodka",
  },
  {
    src: "https://owrusalka.pl/wp-content/uploads/2023/01/3-domki.webp",
    alt: "Domki i zielen na terenie osrodka",
  },
  {
    src: "https://owrusalka.pl/wp-content/uploads/2023/01/6-boisko.webp",
    alt: "Boisko i przestrzen rekreacyjna",
  },
  {
    src: "https://owrusalka.pl/wp-content/uploads/2023/01/DSC03233.webp",
    alt: "Przestrzen wypoczynkowa osrodka",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <section id="top" className="site-section pb-10 sm:pb-14">
        <div className="site-shell">
          <div className="surface-card relative overflow-hidden p-6 sm:p-10">
            <div className="pointer-events-none absolute -top-24 right-0 h-52 w-52 rounded-full bg-secondary/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-8 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-6">
                <span className="section-kicker">Wakacje nad Baltykiem</span>
                <h1 className="max-w-3xl text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  Rodzinny Wypoczynek 50 m od Plazy w Lazach
                </h1>
                <p className="max-w-2xl lead-text">
                  Osrodek Rusalka to sprawdzona baza dla rodzin: komfortowe
                  pokoje, animacje dla dzieci, wyzywienie i szybki dojazd do
                  Mielna.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#kontakt"
                    className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    Zapytaj o wolny termin
                  </a>
                  <a
                    href="tel:+48790529189"
                    className="inline-flex items-center rounded-full border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    Kontakt telefoniczny
                  </a>
                </div>
              </div>

              <aside className="space-y-3">
                <div className="overflow-hidden rounded-2xl border bg-background/90">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-2xl border bg-background/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Lokalizacja
                  </p>
                  <p className="mt-2 text-lg font-semibold">Lazy, ul. Lesna 22</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    50 m od plazy, blisko Mielna i glownych tras regionu.
                  </p>
                </div>
                <div className="rounded-2xl border bg-background/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Dla kogo
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Rodziny z dziecmi, pary, grupy przyjaciol i osoby szukajace
                    spokojnego wypoczynku.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section id="noclegi" className="site-section pt-8 sm:pt-12">
        <div className="site-shell space-y-6">
          <div className="space-y-3">
            <span className="section-kicker">Noclegi</span>
            <h2 className="text-3xl sm:text-4xl">Wybierz Wariant Pobytu</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {roomOptions.map((item) => (
              <article key={item.title} className="surface-card p-5">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.details}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="udogodnienia" className="site-section">
        <div className="site-shell grid gap-8 lg:grid-cols-[1fr,1.1fr]">
          <div className="space-y-3">
            <span className="section-kicker">Udogodnienia</span>
            <h2 className="text-3xl sm:text-4xl">Co Znajdziesz Na Miejscu</h2>
            <p className="lead-text">
              Oferta oparta o realne potrzeby rodzin: bliska plaza, infrastruktura
              dla dzieci i czytelne warunki pobytu.
            </p>
          </div>
          <div className="surface-card p-5 sm:p-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="rounded-xl border bg-background p-3 text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="atrakcje" className="site-section">
        <div className="site-shell space-y-6">
          <div className="space-y-3">
            <span className="section-kicker">Atrakcje</span>
            <h2 className="text-3xl sm:text-4xl">Region, Ktory Nie Nudzi</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {attractions.map((item) => (
              <article key={item.title} className="surface-card p-5">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.details}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="site-section">
        <div className="site-shell space-y-6">
          <div className="space-y-3">
            <span className="section-kicker">Galeria</span>
            <h2 className="text-3xl sm:text-4xl">Zobacz Miejsce Przed Rezerwacja</h2>
            <p className="lead-text">
              Aktualne zdjecia osrodka i infrastruktury rodzinnej.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className={`overflow-hidden rounded-2xl border bg-card ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className={`relative ${index === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    loading={index < 2 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                  {photo.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="opinie" className="site-section">
        <div className="site-shell space-y-6">
          <div className="space-y-3">
            <span className="section-kicker">Opinie</span>
            <h2 className="text-3xl sm:text-4xl">Co Mowia Goscie</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.author} className="surface-card p-5">
                <p className="text-sm text-muted-foreground">{item.quote}</p>
                <footer className="mt-4 text-sm font-semibold">{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-shell">
          <div className="surface-card p-6 sm:p-8">
            <span className="section-kicker">Cennik i warunki</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Najwazniejsze Informacje</h2>
            <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {pricingNotes.map((item) => (
                <li key={item} className="rounded-xl border bg-background p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
