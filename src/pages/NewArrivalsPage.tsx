import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, getFeaturedProducts } from '../data/products';
import { Filter, X, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
  };
  onClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-transparent border border-black border-opacity-10 rounded-lg overflow-hidden cursor-pointer hover:bg-black hover:bg-opacity-10 transition-all duration-300"
      onClick={() => onClick(product.id)}
      onMouseEnter={handleImageHover}
      onMouseLeave={() => setCurrentImageIndex(0)}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0 filter grayscale group-hover:grayscale-0"
        />
        {product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-30 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm select-none">
            {currentImageIndex + 1}/{product.images.length}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
            <ShoppingBag size={16} />
            Quick View
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-black line-clamp-1 uppercase tracking-wide">{product.name}</h3>
          <span className="text-black font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 capitalize">{product.category}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(product.id); }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-black border-opacity-20 rounded-full text-sm font-semibold text-black hover:bg-black hover:text-white transition-all duration-300 hover:translate-x-1"
        >
          View Product
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </motion.div>
  );
};

const PromoCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-transparent border border-black border-opacity-10 rounded-lg overflow-hidden cursor-pointer hover:bg-black hover:bg-opacity-10 transition-all duration-300"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src="https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg"
          alt="Special Promotion"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0 filter grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Tag size={12} />
          <span>LIMITED TIME</span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
            <ShoppingBag size={16} />
            Shop Now
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-black line-clamp-1 uppercase tracking-wide">Summer Sale Collection</h3>
          <div>
            <span className="text-gray-500 font-medium line-through mr-2">$199.99</span>
            <span className="text-black font-semibold">$119.99</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">Up to 40% Off Selected Items</p>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-black border-opacity-20 rounded-full text-sm font-semibold text-black hover:bg-black hover:text-white transition-all duration-300 hover:translate-x-1"
        >
          View Offer
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </motion.div>
  );
};

const NewArrivalsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const newArrivals = getFeaturedProducts();
  const categories = [...new Set(newArrivals.map(product => product.category))];
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowFilters(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const filteredProducts = newArrivals.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });
  
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  const toggleFilters = () => setShowFilters(!showFilters);
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 100]);
  };
  
  return ( 
    <div>
      {/* Hero Section: full black bg with padding-top */}
      <div className="bg-black text-white pt-28 md:pt-32 px-6 md:px-20 pb-20">
        <div className="md:flex md:items-center md:justify-between gap-12">
        <div className="md:w-1/2 flex justify-center md:justify-start">
        <div className="w-full max-w-[900px] h-[500px] overflow-hidden rounded">
  <img 
    src="https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg" 
    alt="Sport Collection" 
    className="w-full h-[1000px] object-cover rounded transition-transform duration-500 filter grayscale hover:grayscale-0"
    loading="lazy"
  />
</div>
</div>
          <div className="md:w-1/2 flex flex-col justify-center items-start">
            {/* Removed VIEW MORE button */}
            <h1 className="text-7xl font-extrabold uppercase tracking-widest leading-none">
              <span>NEW</span><br />
              <span>SPORT COLLECTION</span>
            </h1>
            <p className="mt-6 max-w-lg text-gray-400 leading-relaxed">
              The brand was originally aimed at men's fashion. Starting in 1995 women's fashion was launched in all its dimensions: from the most urban lines to the more casual.
            </p>
            <button 
              aria-label="Scroll Down"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="mt-16 border border-gray-600 rounded-full p-3 flex items-center justify-center hover:border-white transition"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Below section: white background with black text */}
      <div className="bg-white text-black min-h-screen px-6 md:px-20 py-12">
        {/* Filter & Product Count Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-3">
          <h2 className="text-3xl font-bold uppercase tracking-wider">Latest Collection</h2>
          <p className="text-gray-600">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Filter Toggle Button for Mobile */}
        <div className="md:hidden mb-6">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-center w-full gap-2 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            {showFilters ? (
              <>
                <X size={16} />
                <span>Close Filters</span>
              </>
            ) : (
              <>
                <Filter size={16} />
                <span>Show Filters</span>
              </>
            )}
          </button>
        </div>

        {/* Main Content: Filters + Products */}
        <div className="md:flex md:gap-10">
          {/* Filters Sidebar */}
          {(!isMobile || showFilters) && (
            <aside className="md:w-72 bg-transparent border border-gray-300 rounded-lg p-6 text-black">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold uppercase tracking-wider">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-black underline"
                >
                  Clear all
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Category</h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer select-none text-gray-700 hover:text-black">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className="accent-black w-4 h-4 cursor-pointer"
                        name="category"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Price Range</h4>
                <div className="flex justify-between text-gray-600 text-sm mb-4">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full cursor-pointer accent-black"
                />
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <section className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <PromoCard onClick={() => navigate('/summer-sale')} />
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-transparent border border-gray-300 rounded-lg">
                <p className="text-gray-600 mb-6">No products match your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-900 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;