import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg',
      title: 'BLOW WITH',
      subtitle: 'INNOVATIVE TRENDS'
    },
    {
      image: 'https://images.pexels.com/photos/9558574/pexels-photo-9558574.jpeg',
      title: 'MINIMAL',
      subtitle: 'AESTHETICS'
    },
    {
      image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      title: 'BOLD',
      subtitle: 'STATEMENTS'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Left Promo Text */}
      <div className="absolute left-0 top-0 h-full w-16 flex items-center justify-center z-10">
        <div className="animate-float-up text-white text-sm font-bold tracking-widest transform -rotate-90 whitespace-nowrap">
          SPECIAL OFFER - UP TO 50% OFF
        </div>
      </div>

      {/* Right Promo Text */}
      <div className="absolute right-0 top-0 h-full w-16 flex items-center justify-center z-10">
        <div className="animate-float-down text-white text-sm font-bold tracking-widest transform rotate-90 whitespace-nowrap">
          NEW ARRIVALS - SHOP NOW
        </div>
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="fashion-heading text-white mb-4">{slide.title}</h1>
            <p className="fashion-subheading text-white mb-8">{slide.subtitle}</p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/shop'}
              className="w-fit group border-white text-white hover:bg-white hover:text-black"
            >
              Explore Collection <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[2px] transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;