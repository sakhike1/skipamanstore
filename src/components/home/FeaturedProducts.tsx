import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, Plus, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { Button } from '../ui/Button';

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  // Get all featured products
  const featuredProducts = products.filter(product => product.featured);
  const displayProducts = featuredProducts;
  
  // Track hover state for each product
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create pulsating glow effect for the promo card
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1500);
    
    // Simulate loading time (remove this in production and use actual data loading)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      clearInterval(glowInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleViewMore = () => {
    window.location.href = '/shop';
  };

  const handleViewProduct = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onProductClick(productId);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black to-neutral-900 relative">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="space-y-2 mb-6 md:mb-0">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase">Curated Selection</p>
            <h2 className="text-4xl font-bold text-white">Featured Products</h2>
          </div>
          <Button
            variant="outline"
            onClick={handleViewMore}
            className="group text-white border border-white/30 hover:border-white hover:bg-white hover:text-black px-6 py-3 flex items-center gap-2 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Browse Collection</span>
            <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product Cards - take 3 columns on large screens */}
          {displayProducts.map((product) => (
            <article 
              key={product.id} 
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-neutral-800 rounded-lg relative">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse"></div>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredProduct === product.id ? 'scale-105 grayscale-0' : 'grayscale'}`}
                  loading="lazy"
                  width={400}
                  height={533}
                  decoding="async"
                />
                {product.featured && (
                  <span className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs font-bold tracking-widest z-30 rounded-full">
                    NEW
                  </span>
                )}
                
                {/* Quick add button that appears on hover */}
                <div 
                  className={`absolute bottom-4 right-4 transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <button 
                    onClick={(e) => handleViewProduct(e, product.id)}
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-black hover:bg-white/90"
                    aria-label="Quick view"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-white text-lg font-medium tracking-wider">{product.name}</h3>
                  <p className="text-white/90 font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <p className="text-white/50 text-sm">{product.category}</p>
                
                <button
                  onClick={(e) => handleViewProduct(e, product.id)}
                  className="mt-4 w-full bg-neutral-800 border border-neutral-700 text-white py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>View Product</span>
                </button>
              </div>
            </article>
          ))}
          
          {/* Promotional Card - full width on the right side */}
          <article 
            className={`lg:col-span-1 xl:col-span-2 row-span-1 relative overflow-hidden rounded-lg ${isGlowing ? 'shadow-[0_0_30px_rgba(255,215,0,0.6)]' : ''} transition-shadow duration-1000`}
          >
            <div className="h-full bg-gradient-to-br from-black via-[#222] to-black rounded-lg relative border-2 border-[#FFD700] overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-[#FFA500]/5 to-[#FFD700]/10 animate-pulse"></div>
              
              {/* Gold animated border */}
              <div className="absolute inset-0 border-2 border-transparent animate-border-flow"></div>
              
              {/* Sparkle animations */}
              <div className="absolute top-1/4 left-1/4 animate-float-slow">
                <Sparkles size={20} className="text-[#FFD700]" />
              </div>
              <div className="absolute bottom-1/3 right-1/3 animate-float">
                <Sparkles size={16} className="text-[#FFD700]" />
              </div>
              <div className="absolute top-1/2 right-1/4 animate-float-delayed">
                <Sparkles size={24} className="text-[#FFD700]" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm w-full max-w-md">
                  <h3 className="text-[#FFD700] text-2xl font-bold mb-2 tracking-wide">EXCLUSIVE SALE</h3>
                  <p className="text-[#FFD700] text-5xl font-extrabold mb-4">30% OFF</p>
                  <p className="text-white text-xl mb-6">All Premium T-Shirts</p>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                    <button 
                      onClick={() => window.location.href = '/shop/t-shirts'} 
                      className="relative px-8 py-4 bg-black text-[#FFD700] rounded-full font-medium group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-3 uppercase tracking-wider border border-[#FFD700] w-full"
                    >
                      <span className="text-lg">Shop Now</span>
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                  <p className="text-white/70 text-sm mt-6">Limited time offer</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;