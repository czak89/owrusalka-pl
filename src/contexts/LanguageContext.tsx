"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "pl" | "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translation data
const translations = {
  pl: {
    // Navigation
    "nav.home": "Strona główna",
    "nav.about": "O nas",
    "nav.accommodation": "Noclegi",
    "nav.services": "Usługi",
    "nav.gallery": "Galeria",
    "nav.contact": "Kontakt",
    "nav.booking": "Rezerwacja",

    // Hero section
    "hero.title": "Witaj w Rusałce nad morzem",
    "hero.subtitle": "Luksusowy ośrodek wypoczynkowy nad Morzem Bałtyckim",
    "hero.description":
      "Odkryj magię wypoczynku w naszym wyjątkowym ośrodku położonym bezpośrednio nad brzegiem Bałtyku. Oferujemy komfortowe pokoje, wykwintną kuchnię i niezapomniane doświadczenia.",
    "hero.cta": "Zarezerwuj pobyt",

    // About section
    "about.title": "O naszym ośrodku",
    "about.description":
      "Rusałka nad morzem to miejsce, gdzie luksus spotyka się z naturą. Nasz ośrodek oferuje wyjątkowy wypoczynek z widokiem na morze.",

    // Common
    "common.book_now": "Zarezerwuj teraz",
    "common.learn_more": "Dowiedz się więcej",
    "common.contact_us": "Skontaktuj się z nami",
    "common.phone": "Telefon",
    "common.email": "Email",
    "common.address": "Adres",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.accommodation": "Accommodation",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.booking": "Booking",

    // Hero section
    "hero.title": "Welcome to Rusałka by the Sea",
    "hero.subtitle": "Luxury resort by the Baltic Sea",
    "hero.description":
      "Discover the magic of relaxation at our unique resort located directly on the Baltic Sea shore. We offer comfortable rooms, exquisite cuisine, and unforgettable experiences.",
    "hero.cta": "Book your stay",

    // About section
    "about.title": "About our resort",
    "about.description":
      "Rusałka by the Sea is where luxury meets nature. Our resort offers exceptional relaxation with sea views.",

    // Common
    "common.book_now": "Book now",
    "common.learn_more": "Learn more",
    "common.contact_us": "Contact us",
    "common.phone": "Phone",
    "common.email": "Email",
    "common.address": "Address",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.accommodation": "Unterkünfte",
    "nav.services": "Dienstleistungen",
    "nav.gallery": "Galerie",
    "nav.contact": "Kontakt",
    "nav.booking": "Buchung",

    // Hero section
    "hero.title": "Willkommen bei Rusałka am Meer",
    "hero.subtitle": "Luxusresort an der Ostsee",
    "hero.description":
      "Entdecken Sie die Magie der Entspannung in unserem einzigartigen Resort direkt an der Ostseeküste. Wir bieten komfortable Zimmer, exquisite Küche und unvergessliche Erlebnisse.",
    "hero.cta": "Buchen Sie Ihren Aufenthalt",

    // About section
    "about.title": "Über unser Resort",
    "about.description":
      "Rusałka am Meer ist ein Ort, wo Luxus auf Natur trifft. Unser Resort bietet außergewöhnliche Entspannung mit Meerblick.",

    // Common
    "common.book_now": "Jetzt buchen",
    "common.learn_more": "Mehr erfahren",
    "common.contact_us": "Kontaktieren Sie uns",
    "common.phone": "Telefon",
    "common.email": "E-Mail",
    "common.address": "Adresse",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pl");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["pl", "en", "de"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
