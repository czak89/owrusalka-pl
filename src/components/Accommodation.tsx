"use client";

import Image from "next/image";
import { Bed, Users, Bath, Wifi, Check } from "lucide-react";

const accommodationTypes = [
  {
    name: "Domki 4-osobowe",
    description: "Komfortowe domki z tarasem, idealne dla rodzin",
    image: "/wp-content/uploads/2023/01/4-domki.webp",
    capacity: "2-4 osoby",
    features: ["Aneks kuchenny", "Taras", "TV", "Lodówka", "Czajnik"],
    price: "od 280 zł/dobę",
  },
  {
    name: "Pokoje 2-osobowe",
    description: "Przytulne pokoje dla par, z widokiem na zieleń",
    image: "/wp-content/uploads/2023/01/Pokoj-7_1-scaled.webp",
    capacity: "2 osoby",
    features: ["Łazienka", "TV", "Czajnik", "Ręczniki", "WiFi"],
    price: "od 180 zł/dobę",
  },
  {
    name: "Pokoje rodzinne",
    description: "Przestronne pokoje z możliwością dostawki",
    image: "/wp-content/uploads/2023/01/Pokoj-8_1-scaled.webp",
    capacity: "3-5 osób",
    features: ["Łazienka", "Lodówka", "TV", "Dostawka", "Balkon"],
    price: "od 320 zł/dobę",
  },
  {
    name: "Apartamenty",
    description: "Luksusowe apartamenty z aneksem kuchennym",
    image: "/wp-content/uploads/2023/01/Pokoj-12_1-scaled.webp",
    capacity: "4-6 osób",
    features: ["Aneks kuchenny", "Salon", "Balkon", "Pralka", "2 sypialnie"],
    price: "od 450 zł/dobę",
  },
];

export default function Accommodation() {
  return (
    <section id="noclegi" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Nasze Pokoje i Domki
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Wybierz idealne miejsce na swój wypoczynek. Wszystkie nasze obiekty są
          regularnie modernizowane, aby zapewnić Ci maksymalny komfort.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {accommodationTypes.map((accommodation, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                  {accommodation.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {accommodation.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {accommodation.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>{accommodation.capacity}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 text-gray-800">
                    Wyposażenie:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {accommodation.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Check size={16} className="text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Zobacz szczegóły
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            W cenie noclegu zapewniamy:
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <Wifi className="text-blue-600 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-gray-800">Internet WiFi</h4>
                <p className="text-sm text-gray-600">
                  Szybkie łącze w całym ośrodku
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bed className="text-blue-600 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Pościel i ręczniki
                </h4>
                <p className="text-sm text-gray-600">
                  Świeża bielizna pościelowa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bath className="text-blue-600 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-gray-800">Sprzątanie</h4>
                <p className="text-sm text-gray-600">Codzienne porządki</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
