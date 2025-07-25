"use client"

import Image from 'next/image'
import { Utensils, Baby, Car, Umbrella, Bike, Volleyball, Waves, Camera } from 'lucide-react'

const services = [
  {
    icon: Utensils,
    title: 'Wyżywienie',
    description: 'Domowa kuchnia, 3 posiłki dziennie. Uwzględniamy diety specjalne.',
    image: '/wp-content/uploads/2023/01/jadalnia-taras.webp',
  },
  {
    icon: Baby,
    title: 'Animacje dla dzieci',
    description: 'Profesjonalni animatorzy, codzienne zajęcia i konkursy.',
    image: '/wp-content/uploads/2023/01/7-klauni-kulki.webp',
  },
  {
    icon: Car,
    title: 'Parking',
    description: 'Bezpłatny, strzeżony parking na terenie ośrodka.',
    image: '/wp-content/uploads/2023/01/Teren-osrodka-13-scaled.webp',
  },
  {
    icon: Umbrella,
    title: 'Wypożyczalnia sprzętu',
    description: 'Rowery, parasole plażowe, piłki, gry planszowe.',
    image: '/wp-content/uploads/2023/01/6-boisko.webp',
  },
]

const attractions = [
  {
    name: 'Plaża',
    distance: '100m',
    description: 'Szeroka, piaszczysta plaża z łagodnym zejściem',
    image: '/wp-content/uploads/2023/01/pexels-asad-photo-maldives-1024968-scaled.webp',
  },
  {
    name: 'Park Wodny Jan',
    distance: '15km',
    description: 'Baseny, zjeżdżalnie, sauny - w Darłówku',
    image: '/wp-content/uploads/2023/01/park-wodny-jan.webp',
  },
  {
    name: 'Latarnia w Gąskach',
    distance: '10km',
    description: 'Najwyższa latarnia morska na polskim wybrzeżu',
    image: '/wp-content/uploads/2023/01/97d730f861f181b665b493f9dfee9a92.webp',
  },
  {
    name: 'Promenada w Mielnie',
    distance: '3km',
    description: 'Restauracje, kawiarnie, atrakcje',
    image: '/wp-content/uploads/2023/01/Mielno_promenada.webp',
  },
]

export default function Services() {
  return (
    <section id="uslugi" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Services */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Nasze Usługi
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Dbamy o każdy szczegół Twojego wypoczynku. Zobacz, co przygotowaliśmy dla Ciebie.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Attractions */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Atrakcje w Okolicy
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Łazy to doskonała baza wypadowa do zwiedzania całego regionu.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {attractions.map((attraction, index) => (
              <div key={index} className="flex gap-4 bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{attraction.name}</h3>
                    <span className="text-sm text-blue-600 font-medium">{attraction.distance}</span>
                  </div>
                  <p className="text-gray-600">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Wszystko w jednym miejscu!
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Nie musisz martwić się o nic - my zadbamy o każdy szczegół Twojego wypoczynku.
            Przyjedź i ciesz się wakacjami!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Sprawdź dostępność
          </button>
        </div>
      </div>
    </section>
  )
}
