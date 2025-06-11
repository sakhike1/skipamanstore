import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

const NewArrivals: React.FC = () => {
  const navigate = useNavigate();
  const [colorIndex, setColorIndex] = useState(0);
  const [trendingColorIndex, setTrendingColorIndex] = useState(0);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Color palette for the animation
  const colors = [
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FFC0CB', // Pink
    '#FF69B4', // Hot Pink
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Goldenrod
    '#FFB6C1', // Light Pink
    '#FFDAB9', // Peach
  ];

  // Different color palette for trending section
  const trendingColors = [
    '#1a1a1a', // Dark Gray
    '#2c3e50', // Dark Blue Gray
    '#34495e', // Darker Blue Gray
    '#2c3e50', // Dark Blue Gray
    '#1a1a1a', // Dark Gray
    '#2c3e50', // Dark Blue Gray
    '#34495e', // Darker Blue Gray
    '#1a1a1a', // Dark Gray
  ];

  // Color animation effects
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 5000);

    const trendingInterval = setInterval(() => {
      setTrendingColorIndex((prev) => (prev + 1) % trendingColors.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(trendingInterval);
    };
  }, []);

  // Initialize image indices
  useEffect(() => {
    const initialImageState = products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {} as { [key: string]: number });
    setCurrentImageIndex(initialImageState);
  }, []);

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const startAutoRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => {
          const newState = { ...prev };
          Object.keys(newState).forEach(productId => {
            // Only rotate if not currently hovered
            if (hoveredProductId !== productId) {
              newState[productId] = (newState[productId] + 1) % 3;
            }
          });
          return newState;
        });
      }, 6000);
    };

    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hoveredProductId]);

  // Get the first 3 products for new arrivals
  const newArrivals = products.slice(0, 3);
  
  // Get the next 3 products for trending
  const trendingProducts = products.slice(3, 6);

  const handleViewProduct = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  // Component for a single product card
  const ProductCard: React.FC<{ product: typeof products[0]; theme: 'dark' | 'light' }> = ({ product, theme }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const isDarkTheme = theme === 'dark';

    const handleMouseEnter = () => {
      setHoveredProductId(product.id);
      setIsTransitioning(true);
      
      // Smoothly transition to next image
      setTimeout(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [product.id]: (prev[product.id] + 1) % 3
        }));
        setIsTransitioning(false);
      }, 150);
    };

    const handleMouseLeave = () => {
      setHoveredProductId(null);
    };

    const currentIndex = currentImageIndex[product.id] || 0;

    return (
      <div 
        key={product.id} 
        className="group cursor-pointer transform hover:-translate-y-2 transition-transform duration-500 ease-out" 
        onClick={() => navigate(`/product/${product.id}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Product Image and Overlay */}
        <div 
          className={`aspect-[4/5] overflow-hidden relative shadow-lg 
            ${isDarkTheme ? 'bg-neutral-900 border-white/10 group-hover:border-white/30' : 'bg-neutral-100 border-gray-200 group-hover:border-gray-400'}
            border-2 transition-all duration-500 ease-out
          `}
        >
          {/* Preload all images */}
          {product.images.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt={`${product.name} - Image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                ${hoveredProductId === product.id ? 'scale-110' : 'scale-100'}
                ${isTransitioning ? 'blur-[1px]' : 'blur-0'}
              `}
              style={{ 
                transform: `scale(${hoveredProductId === product.id ? '1.1' : '1'})`,
                filter: `blur(${isTransitioning ? '1px' : '0px'})`,
              }}
            />
          ))}

          {/* Overlay */}
          <div className={`absolute inset-0 transition-all duration-500 z-30
            ${isDarkTheme ? 'bg-black/0 group-hover:bg-black/20' : 'bg-black/0 group-hover:bg-black/5'}`}></div>
          
          {/* Shop Bag Button */}
          <button 
            onClick={(e) => e.stopPropagation()}
            aria-label="Add to cart"
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-40
              opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 
              hover:bg-opacity-90 active:scale-95 shadow-md
              ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            <ShoppingBag size={16} />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? (isDarkTheme ? 'bg-white' : 'bg-black') 
                    : (isDarkTheme ? 'bg-white/30' : 'bg-black/30')
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-6 space-y-3">
          <h3 className={`text-xl tracking-wider font-normal transition-colors duration-200 
            ${isDarkTheme ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-black'}`}>
            {product.name}
          </h3>
          <p className={`text-lg font-light ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            R{product.price.toFixed(0)}
          </p>
          
          {/* "View Product" Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleViewProduct(e, product.id)}
            aria-label={`View product details for ${product.name}`}
            className={`mt-6 w-full py-4 text-sm tracking-widest transition-all duration-300 active:scale-98 
              flex items-center justify-center space-x-2 overflow-hidden relative 
              ${isDarkTheme 
                ? 'text-white border border-white/30 group-hover:text-black hover:border-white/50' 
                : 'text-white bg-black border border-black hover:bg-white hover:text-black group-hover:text-black'
              }`}
          >
            <span className="z-10 transition-transform duration-300 font-medium group-hover:-translate-x-0.5">VIEW PRODUCT</span>
            <ArrowRight size={16} className="z-10 relative opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-2" />
            <div className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-300 ease-out
              ${isDarkTheme ? 'bg-white' : 'bg-white'}`}></div>
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* New Arrivals Section - Dark Theme */}
      <div className="bg-black py-20 md:py-32 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20">
            <div className="space-y-4">
              <motion.h2 
                className="font-sans text-[clamp(3rem,7vw,5rem)] md:text-[clamp(5rem,9vw,8rem)] font-bold leading-none tracking-tight"
                animate={{
                  color: colors[colorIndex],
                  textShadow: [
                    '0 0 10px rgba(255, 215, 0, 0.3)',
                    '0 0 20px rgba(255, 215, 0, 0.4)',
                    '0 0 10px rgba(255, 215, 0, 0.3)',
                  ],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                NEW<br />COLLECTION
              </motion.h2>
              <p className="font-light text-white/70 tracking-[0.2em] text-sm uppercase">
                Redefining modern aesthetics
              </p>
            </div>
            <div className="mt-8 md:mt-0 pt-4 md:pt-0">
              <button 
                onClick={() => navigate('/shop')}
                className="relative overflow-hidden group flex items-center gap-2 hover:gap-4 transition-all duration-300 text-sm tracking-widest uppercase text-white border border-white/20 px-6 py-3 rounded-full hover:border-white"
                aria-label="View all new arrivals"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">View all</span> 
                <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 md:gap-x-16">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} theme="dark" />
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section - Light Theme */}
      <div className="bg-white py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20">
            <div className="space-y-4">
              <motion.h2 
                className="font-sans text-[clamp(3rem,7vw,5rem)] md:text-[clamp(5rem,9vw,8rem)] font-bold leading-none tracking-tight"
                animate={{
                  color: trendingColors[trendingColorIndex],
                  textShadow: [
                    '0 0 10px rgba(26, 26, 26, 0.2)',
                    '0 0 20px rgba(26, 26, 26, 0.3)',
                    '0 0 10px rgba(26, 26, 26, 0.2)',
                  ],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                TRENDING<br />NOW
              </motion.h2>
              <p className="font-light text-gray-600 tracking-[0.2em] text-sm uppercase">
                Discover the latest trends
              </p>
            </div>
            <div className="mt-8 md:mt-0 pt-4 md:pt-0">
              <button 
                onClick={() => navigate('/shop')}
                className="relative overflow-hidden group flex items-center gap-2 hover:gap-4 px-6 py-3 transition-all duration-300 text-sm tracking-widest uppercase text-white bg-black border border-black rounded-full hover:border-black"
                aria-label="View all trending products"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">View all</span>
                <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
                <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 md:gap-x-16">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} theme="light" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrivals;