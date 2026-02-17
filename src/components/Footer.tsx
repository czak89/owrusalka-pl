const links = [
  { label: "Facebook", href: "https://www.facebook.com/rusalka.lazy/" },
  {
    label: "Tripadvisor",
    href: "https://www.tripadvisor.com/Hotel_Review-g3971027-d5981928-Reviews-Rusalka-Lazy_Western_Pomerania_Province_Western_Poland.html",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="site-shell grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Rusalka Lazy</h2>
          <p className="text-sm text-muted-foreground">
            Rodzinny osrodek wypoczynkowy 50 m od plazy. Pokoje, studia i
            animacje dla dzieci.
          </p>
        </section>

        <section className="space-y-2 text-sm">
          <h2 className="font-semibold text-foreground">Adres</h2>
          <p className="text-muted-foreground">
            ul. Lesna 22
            <br />
            76-002 Lazy
          </p>
        </section>

        <section className="space-y-2 text-sm">
          <h2 className="font-semibold text-foreground">Kontakt</h2>
          <a className="block text-muted-foreground hover:text-primary" href="tel:+48943182976">
            +48 94 318 29 76
          </a>
          <a className="block text-muted-foreground hover:text-primary" href="tel:+48790529189">
            +48 790 529 189
          </a>
          <a className="block text-muted-foreground hover:text-primary" href="tel:+48511114207">
            +48 511 114 207
          </a>
          <a
            className="block text-muted-foreground hover:text-primary"
            href="mailto:recepcja@owrusalka.pl"
          >
            recepcja@owrusalka.pl
          </a>
        </section>

        <section className="space-y-2 text-sm">
          <h2 className="font-semibold text-foreground">Spolecznosc</h2>
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block text-muted-foreground hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </section>
      </div>

      <div className="border-t border-border/60 py-4">
        <div className="site-shell text-xs text-muted-foreground">
          (c) {new Date().getFullYear()} Osrodek Wypoczynkowy Rusalka. Wszystkie
          prawa zastrzezone.
        </div>
      </div>
    </footer>
  );
}
