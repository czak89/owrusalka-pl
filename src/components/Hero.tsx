"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, Phone, Calendar } from 'lucide-react'

const heroImages = [
  '/wp-content/uploads/2023/01/DJI_0263-HDR.webp',
  '/wp-content/uploads/2023/01/Zdjecia-z-drona-4_1-scaled.webp',
  '/wp-content/uploads/2023/01/z-gory-2.webp',
  '/wp-content/uploads/2023/01/DSC0195-scaled.webp',
  '/wp-content/uploads/2023/01/pexels-asad-photo-maldives-1024968-scaled.webp',
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt="Ośrodek Rusałka"
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <Image
          src="/wp-content/uploads/2023/01/logo_poprawione.svg"
          alt="Rusałka Logo"
          width={150}
          height={75}
          className="filter brightness-0 invert"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center animate-fade-in-up">
          Ośrodek Wczasowy Rusałka
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center animate-fade-in-up animation-delay-200">
          Twoje miejsce na niezapomniane wakacje nad morzem
        </p>
        <p className="text-lg mb-12 text-center animate-fade-in-up animation-delay-400">
          Łazy koło Mielna - 100m od plaży
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
          <button 
            onClick={() => scrollToSection('rezerwacja')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
          >
            <Calendar size={20} />
            Zarezerwuj pobyt
          </button>
          <a 
            href="tel:+48602441188"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
          >
            <Phone size={20} />
            Zadzwoń: 602 441 188
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => scrollToSection('o-nas')}
      >
        <ChevronDown size={48} />
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
