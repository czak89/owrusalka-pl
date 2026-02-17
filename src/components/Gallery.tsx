"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Wszystkie unikalne zdjęcia z twojego folderu
const galleryImages = [
  {
    src: "/wp-content/uploads/2023/01/Zdjecia-z-drona-4_1-scaled.webp",
    alt: "Ośrodek Rusałka z lotu ptaka",
  },
  {
    src: "/wp-content/uploads/2023/01/DJI_0263-HDR.webp",
    alt: "Widok na plażę i morze",
  },
  { src: "/wp-content/uploads/2023/01/DSC03233.webp", alt: "Teren ośrodka" },
  {
    src: "/wp-content/uploads/2023/01/z-gory-2.webp",
    alt: "Widok z góry na domki",
  },
  { src: "/wp-content/uploads/2023/01/3-domki.webp", alt: "Domki letniskowe" },
  {
    src: "/wp-content/uploads/2023/01/4-domki.webp",
    alt: "Domki w otoczeniu zieleni",
  },
  {
    src: "/wp-content/uploads/2023/01/Teren-osrodka-13-scaled.webp",
    alt: "Aleja w ośrodku",
  },
  {
    src: "/wp-content/uploads/2023/01/plac-zabaw-scaled.webp",
    alt: "Plac zabaw dla dzieci",
  },
  { src: "/wp-content/uploads/2023/01/6-boisko.webp", alt: "Boisko sportowe" },
  { src: "/wp-content/uploads/2023/01/nowy-plac2.webp", alt: "Plac zabaw" },
  {
    src: "/wp-content/uploads/2023/01/jadalnia-taras.webp",
    alt: "Jadalnia z tarasem",
  },
  {
    src: "/wp-content/uploads/2023/01/plus-zabudowa.webp",
    alt: "Pokój z zabudową",
  },
  {
    src: "/wp-content/uploads/2023/01/plus-lozeczko.webp",
    alt: "Pokój z łóżeczkiem",
  },
  {
    src: "/wp-content/uploads/2023/01/18-lazienki-w-domkach.webp",
    alt: "Łazienka w domku",
  },
  {
    src: "/wp-content/uploads/2023/01/25-lazienki-w-pawilonie-glownym.webp",
    alt: "Łazienka w pawilonie",
  },
  {
    src: "/wp-content/uploads/2023/01/27-lazienki-w-pawilonie-glownym-scaled.webp",
    alt: "Łazienka nowoczesna",
  },
  {
    src: "/wp-content/uploads/2023/01/Pokoj-4_1-scaled.webp",
    alt: "Pokój 4-osobowy",
  },
  {
    src: "/wp-content/uploads/2023/01/Pokoj-7_1-scaled.webp",
    alt: "Pokój 2-osobowy",
  },
  {
    src: "/wp-content/uploads/2023/01/Pokoj-8_1-scaled.webp",
    alt: "Pokój rodzinny",
  },
  {
    src: "/wp-content/uploads/2023/01/Pokoj-9_2-scaled.webp",
    alt: "Pokój z widokiem",
  },
  {
    src: "/wp-content/uploads/2023/01/Pokoj-12_1-scaled.webp",
    alt: "Pokój premium",
  },
  {
    src: "/wp-content/uploads/2023/01/taras-parter-1-scaled.webp",
    alt: "Taras na parterze",
  },
  {
    src: "/wp-content/uploads/2023/01/taras-parter-3-scaled.webp",
    alt: "Taras ze stolikami",
  },
  {
    src: "/wp-content/uploads/2023/01/7-klauni-kulki.webp",
    alt: "Animacje dla dzieci",
  },
  {
    src: "/wp-content/uploads/2023/03/14-animacje.webp",
    alt: "Zajęcia animacyjne",
  },
  {
    src: "/wp-content/uploads/2023/01/8-scaled-1.webp",
    alt: "Wydarzenia w ośrodku",
  },
  {
    src: "/wp-content/uploads/2023/01/pexels-asad-photo-maldives-1024968-scaled.webp",
    alt: "Plaża o zachodzie",
  },
  {
    src: "/wp-content/uploads/2023/01/pexels-asad-photo-maldives-1024993-scaled.webp",
    alt: "Morze Bałtyckie",
  },
  {
    src: "/wp-content/uploads/2023/01/DSC0158-scaled.webp",
    alt: "Widok na ośrodek",
  },
  {
    src: "/wp-content/uploads/2023/01/DSC0159-scaled.webp",
    alt: "Teren rekreacyjny",
  },
  {
    src: "/wp-content/uploads/2023/01/DSC0195-scaled.webp",
    alt: "Zachód słońca",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) =>
        prev === 0 ? galleryImages.length - 1 : prev! - 1,
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev! + 1,
      );
    }
  };

  return (
    <section id="galeria" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Galeria Ośrodka Rusałka
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight size={48} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <p className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
              {galleryImages[selectedImage].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
