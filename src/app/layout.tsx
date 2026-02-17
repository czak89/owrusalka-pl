import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import ClientBody from "./ClientBody";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@/components/Analytics";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Osrodek Wypoczynkowy Rusalka | Lazy kolo Mielna",
  description:
    "Rodzinny osrodek wypoczynkowy 50 m od plazy w Lazach. Pokoje, studia rodzinne, animacje dla dzieci i szybki kontakt telefoniczny.",
  keywords:
    "noclegi Lazy, osrodek wypoczynkowy Lazy, noclegi Mielno, wakacje nad Baltykiem, animacje dla dzieci",
  authors: [{ name: "Osrodek Wypoczynkowy Rusalka" }],
  creator: "Osrodek Wypoczynkowy Rusalka",
  publisher: "Osrodek Wypoczynkowy Rusalka",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://owrusalka.pl",
    siteName: "Osrodek Wypoczynkowy Rusalka",
    title: "Rusalka w Lazach - noclegi blisko morza",
    description:
      "Sprawdz noclegi rodzinne, atrakcje i szybki kontakt z osrodkiem Rusalka.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Plaza nad Baltykiem w okolicy Laz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rusalka Lazy - rodzinne wakacje nad morzem",
    description: "Osrodek 50 m od plazy z animacjami i pokojami rodzinnymi.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop",
    ],
  },
  alternates: {
    canonical: "https://owrusalka.pl",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <StructuredData />
        <Analytics />
      </head>
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Przejdz do tresci
        </a>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
