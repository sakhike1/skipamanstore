import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, ShoppingCart, Star, Loader2, Play } from 'lucide-react';
import image4 from '../../assets/image1.jpg';
import image5 from '../../assets/image1.jpg';
import video1 from '../../assets/video1.mp4';
import { useNavigate } from 'react-router-dom';

interface SlideData {
  id: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  title: string;
  subtitle: string;
  cta: string;
  promo: string;
  features: string[];
  color: {
    background: string;
    text: string;
  };
}

const SLIDES_DATA: SlideData[] = [
  {
    id: 'urban-edge',
    media: {
      type: 'video',
      url: video1,
      thumbnail: image4
    },
    title: 'Urban Edge Collection',
    subtitle: 'Streetwear that tells your story',
    cta: 'Explore Urban Styles',
    promo: 'Limited Time Offer: 20% Off',
    features: [
      'Premium Organic Cotton',
      'Unique Graphic Designs',
      'Sustainable Fashion'
    ],
    color: {
      background: 'bg-gradient-to-r from-gray-900 to-slate-700',
      text: 'text-white'
    }
  },
  {
    id: 'minimalist-essentials',
    media: {
      type: 'image',
      url: image4
    },
    title: 'Minimalist Essentials',
    subtitle: 'Timeless Comfort, Refined Design',
    cta: 'Shop Essentials',
    promo: 'New Season Drop',
    features: [
      'Soft Touch Fabric',
      'Versatile Styling',
      'Perfect Fit Guarantee'
    ],
    color: {
      background: 'bg-gradient-to-r from-gray-900/80 to-slate-700/80',
      text: 'text-white'
    }
  },
  {
    id: 'limited-artist-series',
    media: {
      type: 'image',
      url: image5
    },
    title: 'Limited Artist Series',
    subtitle: 'Wearable Art, Exclusive Drops',
    cta: 'View Rare Designs',
    promo: 'Exclusive Collection',
    features: [
      'Collaboration with Local Artists',
      'Limited Edition Prints',
      'Collector\'s Items'
    ],
    color: {
      background: 'bg-gradient-to-r from-gray-900/80 to-slate-700/80',
      text: 'text-white'
    }
  }
];

const ROTATING_TEXTS = [
  "Soft Touch Fabric",
  "Perfect Fit Guarantee",
  "Premium Quality Materials",
  "Sustainable Fashion",
  "Limited Edition Designs"
];

const SIDE_TEXTS = {
  left: [
    "Premium Quality",
    "Handcrafted",
    "Exclusive Design",
    "Artisanal Craft",
    "Unique Style"
  ],
  right: [
    "Limited Edition",
    "Sustainable",
    "Eco-Friendly",
    "Ethical Fashion",
    "Green Materials"
  ]
};

const ParticleEffect: React.FC<{ key: string }> = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 2 + 1
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100]
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
            times: [0, 0.5, 1]
          }}
        />
      ))}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [leftTextIndex, setLeftTextIndex] = useState(0);
  const [rightTextIndex, setRightTextIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const textInterval = useRef<NodeJS.Timeout | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const startAutoSlide = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    
    slideInterval.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    // Start text rotation
    textInterval.current = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 5000);

    // Start text rotation for both sides
    const leftInterval = setInterval(() => {
      setLeftTextIndex((prev) => (prev + 1) % SIDE_TEXTS.left.length);
    }, 4000);

    const rightInterval = setInterval(() => {
      setRightTextIndex((prev) => (prev + 1) % SIDE_TEXTS.right.length);
    }, 4000);

    return () => {
      if (textInterval.current) {
        clearInterval(textInterval.current);
      }
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index);
    stopAutoSlide();
    startAutoSlide();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMediaLoad = () => {
    setIsMediaLoading(false);
    setMediaError(false);
  };

  const handleMediaError = () => {
    setIsMediaLoading(false);
    setMediaError(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  const renderMedia = () => {
    if (currentSlide.media.type === 'video') {
      return (
        <>
          {isMediaLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          {mediaError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
              <p className="text-white">Failed to load video</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={currentSlide.media.url}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
                onLoad={handleMediaLoad}
                onError={handleMediaError}
              />
              <button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {!isPlaying && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 text-black" />
                  </motion.div>
                )}
              </button>
            </>
          )}
        </>
      );
    }

    return (
      <>
        {isMediaLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
        {mediaError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <p className="text-white">Failed to load image</p>
          </div>
        ) : (
          <motion.img 
            src={currentSlide.media.url} 
            alt={currentSlide.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              x: isHovered ? mousePosition.x : 0,
              y: isHovered ? mousePosition.y : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1
            }}
            onLoad={handleMediaLoad}
            onError={handleMediaError}
          />
        )}
      </>
    );
  };

  return (
    <motion.div 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${currentSlide.color.background}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div className="absolute inset-0">
              {renderMedia()}
            </motion.div>
            
            {/* Particle Effect */}
            <AnimatePresence>
              <ParticleEffect key={`particles-${currentSlide.id}`} />
            </AnimatePresence>

            {/* Left side animated text */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={leftTextIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-left"
                >
                  <motion.span
                    className="block text-xl font-medium writing-mode-vertical"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    animate={{
                      color: [
                        '#ffffff',
                        '#ff6b6b',
                        '#4ecdc4',
                        '#45b7d1',
                        '#ffffff'
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {SIDE_TEXTS.left[leftTextIndex]}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-left space-y-6"
              >
                <h1 className="text-5xl xl:text-7xl font-bold tracking-tight text-white">
                  {currentSlide.title}
                </h1>
                <p className="text-xl text-white opacity-80">
                  {currentSlide.subtitle}
                </p>
                
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTextIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-left mb-4"
                    >
                      <motion.button
                        className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-lg font-medium hover:bg-white/20 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {ROTATING_TEXTS[currentTextIndex]}
                      </motion.button>
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="flex flex-col space-y-3">
                    <Button 
                      size="lg" 
                      className={`
                        group flex items-center space-x-2 
                        bg-black text-white hover:bg-gray-800
                        shadow-lg hover:shadow-xl transition-all duration-300
                        transform hover:-translate-y-1
                        border border-white/10
                      `}
                      onClick={() => navigate('/shop')}
                    >
                      <ShoppingCart size={20} className="text-white" />
                      <span className="font-medium">{currentSlide.cta}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-white" />
                    </Button>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-left"
                    >
                      <motion.span 
                        className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-medium border border-white/20"
                        animate={{
                          color: [
                            '#ffffff',
                            '#ff6b6b',
                            '#4ecdc4',
                            '#45b7d1',
                            '#ffffff'
                          ]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        {currentSlide.promo}
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="hidden md:block relative"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-2xl"
                  animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  {renderMedia()}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    animate={{
                      opacity: isHovered ? 0.3 : 0.1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right side animated text */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={rightTextIndex}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  className="text-right"
                >
                  <motion.span
                    className="block text-xl font-medium writing-mode-vertical"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    animate={{
                      color: [
                        '#ffffff',
                        '#ff6b6b',
                        '#4ecdc4',
                        '#45b7d1',
                        '#ffffff'
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {SIDE_TEXTS.right[rightTextIndex]}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {SLIDES_DATA.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`
              w-12 h-2 rounded-full transition-all 
              ${currentSlideIndex === index 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/50'
              }
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HeroSection;