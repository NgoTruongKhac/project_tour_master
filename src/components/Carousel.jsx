import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carouselData from "../data/carousel.json";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  const images = carouselData;

  const slidesToShow = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(slidesToShow.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(slidesToShow.tablet);
      } else {
        setItemsPerSlide(slidesToShow.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = images.length - itemsPerSlide;

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <div className="w-full px-4 py-16 bg-gradient-to-br ">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-3xl">
            Khám Phá Những Địa Điểm Nổi Bật
          </h2>
          <p className="font-sans text-xl text-dark">
            Lưu lại khoảnh khắc đẹp nhất cùng tour master
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-primary hover:bg-primary-hover text-secondary p-3 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerSlide)
                }%)`,
              }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerSlide}% - ${
                      ((itemsPerSlide - 1) * 1.5) / itemsPerSlide
                    }rem)`,
                  }}
                >
                  <div className="relative overflow-hidden transition-all duration-300 transform shadow-2xl cursor-pointer group/card rounded-2xl hover:scale-105 hover:shadow-3xl">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden md:h-80">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover/card:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/card:opacity-100" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 transform translate-y-2 group-hover/card:translate-y-0">
                      <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm">
                        {image.category}
                      </span>
                      <h3 className="mb-1 text-xl font-bold">{image.title}</h3>
                      <p className="text-sm text-gray-300 transition-opacity duration-300 delay-100 opacity-0 group-hover/card:opacity-100">
                        Khám phá vẻ đẹp tuyệt vời
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-primary hover:bg-primary-hover text-secondary p-3 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex >= maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "bg-primary w-8 h-2"
                  : "bg-orange-200 hover:bg-primary-hover w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="mt-6 text-sm text-center text-gray-400">
          {currentIndex + 1} / {maxIndex + 1}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
