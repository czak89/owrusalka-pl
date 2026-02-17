"use client";

import Image from "next/image";
import { MapPin, Users, Wifi, Car, Dog, Utensils } from "lucide-react";

const features = [
  {
    icon: MapPin,
    text: "100m od plaży",
    description: "Dosłownie rzut kamieniem od morza",
  },
  {
    icon: Users,
    text: "Pokoje 2-6 osobowe",
    description: "Dla par, rodzin i grup",
  },
  {
    icon: Wifi,
    text: "Darmowe WiFi",
    description: "Szybki internet w całym ośrodku",
  },
  {
    icon: Car,
    text: "Parking gratis",
    description: "Strzeżony parking na terenie",
  },
  {
    icon: Dog,
    text: "Przyjazni zwierzętom",
    description: "Twój pupil też jest mile widziany",
  },
  {
    icon: Utensils,
    text: "Domowe wyżywienie",
    description: "Kuchnia jak u mamy",
  },
];

export default function About() {
  return (
    <section id="o-nas" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Witaj w Ośrodku Rusałka
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Od ponad 30 lat tworzymy miejsce, gdzie wakacje stają się
              niezapomnianymi wspomnieniami. Położeni zaledwie 100 metrów od
              piaszczystej plaży w malowniczych Łazach koło Mielna, oferujemy
              idealne warunki do wypoczynku dla całej rodziny.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nasz ośrodek to połączenie domowej atmosfery, komfortowych
              warunków i bliskości morza. Specjalizujemy się w organizacji
              wypoczynku dla rodzin z dziećmi, oferując bogaty program animacji,
              plac zabaw i bezpieczną przestrzeń do zabawy.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {feature.text}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Images Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/wp-content/uploads/2023/01/3-domki.webp"
                  alt="Domki w Rusałce"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/wp-content/uploads/2023/01/jadalnia-taras.webp"
                  alt="Jadalnia z tarasem"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/wp-content/uploads/2023/01/plac-zabaw-scaled.webp"
                  alt="Plac zabaw"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/wp-content/uploads/2023/01/6-boisko.webp"
                  alt="Boisko"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600">30+</div>
            <div className="text-gray-600">Lat doświadczenia</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">100m</div>
            <div className="text-gray-600">Do plaży</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600">Miejsc noclegowych</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">4.8/5</div>
            <div className="text-gray-600">Średnia ocen</div>
          </div>
        </div>
      </div>
    </section>
  );
}
