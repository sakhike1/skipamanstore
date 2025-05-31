import React, { useState } from 'react'; // Import useState for image loading state
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { products } from '../../data/products';

const NewArrivals: React.FC = () => {
  const navigate = useNavigate();

  // Get the first 3 products for new arrivals
  const newArrivals = products.slice(0, 3);
  
  // Get the next 3 products for trending
  const trendingProducts = products.slice(3, 6);

  const handleViewProduct = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  // Component for a single product card to encapsulate image loading logic
  const ProductCard: React.FC<{ product: typeof products[0]; theme: 'dark' | 'light' }> = ({ product, theme }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const isDarkTheme = theme === 'dark';

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    return (
      <div 
        key={product.id} 
        className="group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 ease-out" 
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Product Image and Overlay */}
        <div 
          className={`aspect-[4/5] overflow-hidden relative shadow-lg 
            ${isDarkTheme ? 'bg-neutral-900 border-white/10 group-hover:border-white/30' : 'bg-neutral-100 border-gray-200 group-hover:border-gray-400'}
            border-2 transition-colors duration-300 ease-out
          `} // Added animated border
        >
          {/* Image Placeholder Skeleton */}
          {!imageLoaded && (
            <div className={`absolute inset-0 flex items-center justify-center animate-pulse
                ${isDarkTheme ? 'bg-neutral-800' : 'bg-gray-200'}`}>
              <span className={`text-xs font-mono tracking-wider 
                ${isDarkTheme ? 'text-neutral-600' : 'text-gray-400'}`}>
                Loading...
              </span>
            </div>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out 
              ${isDarkTheme ? 'grayscale group-hover:grayscale-0' : 'grayscale group-hover:grayscale-0'} 
              group-hover:scale-105
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={handleImageLoad}
            style={{ filter: isDarkTheme && !imageLoaded ? 'grayscale(100%)' : 'none' }} // Ensure initial grayscale if not loaded
          />
          <div className={`absolute inset-0 transition-all duration-500 
            ${isDarkTheme ? 'bg-black/0 group-hover:bg-black/20' : 'bg-black/0 group-hover:bg-black/5'}`}></div>
          
          {/* Shop Bag Button with pop-in effect */}
          <button 
            onClick={(e) => e.stopPropagation()}
            aria-label="Add to cart" // Accessibility improvement
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center 
              opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 
              hover:bg-opacity-90 active:scale-95 shadow-md
              ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
        {/* Product Details */}
        <div className="mt-6 space-y-3">
          <h3 className={`text-xl tracking-wider font-normal transition-colors duration-200 
            ${isDarkTheme ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-black'}`}>
            {product.name}
          </h3>
          <p className={`text-lg font-light ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            ${product.price.toFixed(2)}
          </p>
          {/* "View Product" Button with fill animation */}
          <button
            onClick={(e) => handleViewProduct(e, product.id)}
            aria-label={`View product details for ${product.name}`} // Accessibility improvement
            className={`mt-6 w-full py-4 text-sm tracking-widest transition-all duration-300 active:scale-98 
              flex items-center justify-center space-x-2 overflow-hidden relative 
              ${isDarkTheme 
                ? 'text-white border border-white/30 group-hover:text-black hover:border-white/50' 
                : 'text-white bg-black border border-black hover:bg-white hover:text-black'
              }`}
          >
            <span className="z-10 transition-transform duration-300 font-medium group-hover:-translate-x-0.5">VIEW PRODUCT</span> {/* Subtle text slide */}
            <ArrowRight size={16} className="z-10 relative opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-2" /> {/* Arrow slides in */}
            {/* Fill layer */}
            <div className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-300 ease-out
              ${isDarkTheme ? 'bg-white' : 'bg-white'}`}></div> {/* White fill for both */}
          </button>
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
              <h2 className="font-sans text-[clamp(3rem,7vw,5rem)] md:text-[clamp(5rem,9vw,8rem)] font-bold leading-none tracking-tight">
                NEW<br />COLLECTION
              </h2>
              <p className="font-light text-white/70 tracking-[0.2em] text-sm uppercase">
                Redefining modern aesthetics
              </p>
            </div>
            <div className="mt-8 md:mt-0 pt-4 md:pt-0">
              <button 
                className="relative overflow-hidden group flex items-center gap-2 hover:gap-4 transition-all duration-300 text-sm tracking-widest uppercase text-white border border-white/20 px-6 py-3 rounded-full hover:border-white"
                aria-label="View all new arrivals" // Accessibility improvement
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
              <h2 className="font-sans text-[clamp(3rem,7vw,5rem)] md:text-[clamp(5rem,9vw,8rem)] font-bold leading-none tracking-tight text-black">
                TRENDING<br />NOW
              </h2>
              <p className="font-light text-gray-600 tracking-[0.2em] text-sm uppercase">
                Discover the latest trends
              </p>
            </div>
            <div className="mt-8 md:mt-0 pt-4 md:pt-0">
              <button 
                className="relative overflow-hidden group flex items-center gap-2 hover:gap-4 px-6 py-3 transition-all duration-300 text-sm tracking-widest uppercase text-white bg-black border border-black rounded-full hover:border-black"
                aria-label="View all trending products" // Accessibility improvement
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