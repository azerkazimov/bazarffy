import Loading from "@/components/ui/loading";
import useAuthStore from "@/store/auth.store";
import { useState } from "react";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Classic tennis necklace",
    description: "Cubic zirconias avails in gold chain",
    image: "/Rectangle.png",
  },
  {
    id: 2,
    title: "Elegant chain necklace",
    description: "Premium silver chain with toggle clasp",
    image: "/Rectangle_4.png",
  },
  {
    id: 3,
    title: "Bold link necklace",
    description: "Statement piece in gold finish",
    image: "/Rectangle_5.png",
  },
  {
    id: 4,
    title: "Twisted rope chain",
    description: "Classic design in silver tone",
    image: "/Rectangle_10.png",
  },
  {
    id: 5,
    title: "Cuban link chain",
    description: "Contemporary style with polished finish",
    image: "/retangle_1.png",
  },
];

export default function Hero() {
  const { loading } = useAuthStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (loading) {
    return <Loading />;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left side - Content */}
        <div className="relative flex items-center justify-center py-12 bg-white">
          <div className="max-w-lg w-full space-y-6 z-10">
            <div className="space-y-6 z-10">
              <h1 className="text-4xl lg:text-5xl font-cormorant-garamond text-gray-900 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-base text-gray-600 font-light leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div>
                <button className="group relative inline-block mt-4">
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-900 font-medium">
                    View
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gray-900"></span>
                </button>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-6 pt-12">
                {/* Arrow buttons */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={prevSlide}
                    className="relative w-10 h-px bg-gray-900 hover:bg-gray-600 transition-colors"
                    aria-label="Previous slide"
                  >
                    <svg
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="relative w-10 h-px bg-gray-900 hover:bg-gray-600 transition-colors"
                    aria-label="Next slide"
                  >
                    <svg
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="group relative"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <div
                        className={`h-px transition-all duration-300 ${
                          index === currentSlide
                            ? "w-6 bg-gray-400"
                            : "w-3 bg-gray-300 group-hover:bg-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Overlapping background element */}
          <div className="absolute right-0 top-0  w-1/3 h-[70%] bg-[#f5f3f0] z-0 hidden lg:block" />
        </div>

        {/* Right side - Image */}
        <div className="relative h-full bg-white flex items-center justify-center overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
