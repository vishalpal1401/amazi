
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Mega Electronics Sale",
      subtitle: "Up to 80% Off on Latest Gadgets",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=600&fit=crop",
      cta: "Shop Now"
    },
    {
      title: "Fashion Fiesta",
      subtitle: "Trending Styles at Unbeatable Prices",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200&h=600&fit=crop",
      cta: "Explore"
    },
    {
      title: "Home & Living",
      subtitle: "Transform Your Space with Our Collection",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1200&h=600&fit=crop",
      cta: "Discover"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="text-white space-y-4 px-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200">
                  {slide.subtitle}
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
