const navItems = [
  { label: "Noclegi", href: "#noclegi" },
  { label: "Udogodnienia", href: "#udogodnienia" },
  { label: "Atrakcje", href: "#atrakcje" },
  { label: "Galeria", href: "#galeria" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 py-3">
        <a href="#top" className="group inline-flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            R
          </span>
          <span className="text-sm font-semibold tracking-[0.08em] text-foreground/90 uppercase group-hover:text-primary">
            Rusalka Lazy
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-medium text-foreground/75 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+48790529189"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Zadzwon
        </a>
      </div>

      <div className="border-t border-border/60 md:hidden">
        <div className="site-shell flex gap-4 overflow-x-auto py-2 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-medium text-foreground/75 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
