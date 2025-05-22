import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Plus } from 'lucide-react';
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

  return (
    <>
      {/* New Arrivals Section - Dark Theme */}
      <div className="bg-black py-32 text-white">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20">
            <div className="space-y-4">
              <h2 className="fashion-heading text-[6vw] md:text-[8vw] font-bold leading-[0.9] tracking-tight">
                NEW<br />COLLECTION
              </h2>
              <p className="fashion-subheading text-white/70 tracking-widest text-sm uppercase">
                Redefining modern aesthetics
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <button className="flex items-center gap-2 hover:gap-4 transition-all duration-300 text-sm tracking-widest uppercase text-white/80 hover:text-white group">
                View all 
                <ArrowRight size={16} className="transition-all duration-300" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {newArrivals.map(product => (
              <div 
                key={product.id} 
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/90 active:scale-95"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
                <div className="mt-6 space-y-2">
                  <h3 className="text-white text-lg tracking-wider font-light">{product.name}</h3>
                  <p className="text-white/70">${product.price.toFixed(2)}</p>
                  <button
                    onClick={(e) => handleViewProduct(e, product.id)}
                    className="mt-6 w-full border border-white/20 py-4 text-sm tracking-widest transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 overflow-hidden relative text-white group-hover:text-black"
                  >
                    <span className="z-10 transition-transform duration-300">VIEW PRODUCT</span>
                    <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10 ml-2" />
                    <div className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section - Light Theme */}
      <div className="bg-white py-32">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20">
            <div className="space-y-4">
              <h2 className="fashion-heading text-[6vw] md:text-[8vw] font-bold leading-[0.9] tracking-tight text-black">
                TRENDING<br />NOW
              </h2>
              <p className="fashion-subheading text-gray-500 tracking-widest text-sm uppercase">
                Discover the latest trends
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <button className="flex items-center gap-2 hover:gap-4 px-4 py-2 transition-all duration-300 text-sm tracking-widest uppercase text-white bg-black hover:bg-white hover:text-black group relative overflow-hidden border border-black">
                <span className="z-10 relative">View all</span>
                <ArrowRight size={16} className="transition-all duration-300 z-10 relative" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {trendingProducts.map(product => (
              <div 
                key={product.id} 
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500"></div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/90 active:scale-95"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
                <div className="mt-6 space-y-2">
                  <h3 className="text-gray-900 text-lg tracking-wider font-light group-hover:text-black">{product.name}</h3>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                  <button
                    onClick={(e) => handleViewProduct(e, product.id)}
                    className="mt-6 w-full py-4 text-sm tracking-widest transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 overflow-hidden relative text-white bg-black border border-black hover:bg-white hover:text-black"
                  >
                    <span className="z-10 transition-transform duration-300 group-hover:translate-x-1">VIEW PRODUCT</span>
                    <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrivals;