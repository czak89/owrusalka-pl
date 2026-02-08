import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import ClientBody from "./ClientBody";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rusałka nad morzem - Ośrodek Wypoczynkowy | Hotel nad Bałtykiem",
  description:
    "Luksusowy ośrodek wypoczynkowy nad Morzem Bałtyckim w Łazach. Komfortowe pokoje z widokiem na morze, restauracja, SPA, prywatna plaża. Rezerwuj online!",
  keywords:
    "hotel nad morzem, ośrodek wypoczynkowy, Bałtyk, Łazy, pokoje z widokiem na morze, SPA, plaża, wakacje nad morzem, resort nadmorski",
  authors: [{ name: "Rusałka nad morzem" }],
  creator: "Rusałka nad morzem",
  publisher: "Rusałka nad morzem",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://rusalka-nadmorzem.pl",
    siteName: "Rusałka nad morzem",
    title: "Rusałka nad morzem - Luksusowy Ośrodek Wypoczynkowy nad Bałtykiem",
    description:
      "Odkryj magię Bałtyku w naszym wyjątkowym ośrodku wypoczynkowym. Komfortowe pokoje, SPA, restauracja i prywatna plaża czekają na Ciebie.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Rusałka nad morzem - Resort nad Bałtykiem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rusałka nad morzem - Luksusowy Ośrodek Wypoczynkowy",
    description: "Odkryj magię Bałtyku w naszym wyjątkowym ośrodku wypoczynkowym.",
    images: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=630&fit=crop",
    ],
  },
  alternates: {
    canonical: "https://rusalka-nadmorzem.pl",
    languages: {
      pl: "https://rusalka-nadmorzem.pl",
      en: "https://rusalka-nadmorzem.pl/en",
      de: "https://rusalka-nadmorzem.pl/de",
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <StructuredData />
        <Analytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
