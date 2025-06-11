import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, getFeaturedProducts } from '../data/products'; // Assuming this path is correct
import { Filter, X, ArrowRight, ChevronRight } from 'lucide-react';
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
    <div className="group relative bg-white border border-neutral-300 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      <div
        className="aspect-square overflow-hidden cursor-pointer relative"
        onClick={() => onClick(product.id)}
        onMouseEnter={handleImageHover}
      >
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0 filter grayscale" // Solid B&W: grayscale filter
        />
        {product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full"> {/* Slightly increased opacity for B&W */}
            {currentImageIndex + 1}/{product.images.length}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-black line-clamp-1">{product.name}</h3> {/* Solid B&W: text-black */}
          <span className="text-black font-medium">R{product.price.toFixed(0)}</span> {/* Solid B&W: text-black */}
        </div>
        <p className="text-sm text-neutral-600 mb-3 capitalize">{product.category}</p> {/* Solid B&W: darker neutral for subtext */}
        <button
          onClick={() => onClick(product.id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-black rounded-md text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-300 group-hover:border-black" // Text black by default, hover:border-black
        >
          View Product
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
};

const ProductGrid: React.FC<{ products: typeof products; onProductClick: (id: string) => void }> = ({
  products,
  onProductClick
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
};

// New Arrivals Banner component - UPDATED
const NewArrivalsSection: React.FC<{ onProductClick: (id: string) => void }> = ({ onProductClick }) => {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <div className="w-full mb-12">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] bg-black overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-[1000px] opacity-20"
          style={{
            backgroundImage: 'url(../assets/image4.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Animated Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.03)_25%,_rgba(255,255,255,0.03)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.03)_75%)] bg-[length:50px_50px] animate-pulse"></div>
          </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Elevate Your
                  <span className="block text-white">
                    Style Game
                  </span>
                </h1>
                <p className="text-xl text-white/60 max-w-lg">
                  Premium t-shirts crafted with precision and passion. Experience luxury in every thread.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => onProductClick(featuredProducts[0].id)}
                  className="group relative px-8 py-4 bg-black text-white font-medium overflow-hidden border-2 border-white transition-all duration-300"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">Shop Collection</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
                <button
                  onClick={() => onProductClick(featuredProducts[1].id)}
                  className="group relative px-8 py-4 bg-white text-black font-medium overflow-hidden border-2 border-black transition-all duration-300"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">View New Arrivals</span>
                  <div className="absolute inset-0 bg-[#8B4513] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </motion.div>

              {/* Price Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold text-xl"
              >
                R500
              </motion.div>
            </div>

            {/* Right Content - Floating Products */}
            <div className="relative h-[600px] hidden lg:block">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="absolute"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -2, 2, 0],
                    scale: [1, 1.02, 1],
                    x: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  style={{
                    top: `${15 + (index * 30)}%`,
                    left: `${20 + (index * 15)}%`,
                    zIndex: 3 - index
                  }}
                >
                  <div className="relative group cursor-pointer" onClick={() => onProductClick(product.id)}>
                    <div className="absolute -inset-4 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-500"></div>
                    <div className="relative bg-black/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                      <div className="relative w-64 h-64 overflow-hidden rounded-xl">
                        <motion.img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transform transition-all duration-700"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-white text-xl font-medium mb-2">{product.name}</h3>
                            <p className="text-white/80 mb-4">R500</p>
                            <button
                              onClick={() => onProductClick(product.id)}
                              className="group relative px-6 py-2 text-sm font-medium rounded-full bg-white text-black overflow-hidden transition-all duration-300"
                            >
                              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Shop Now</span>
                              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                          </div>
                        </div>
                      </div>
              </div>
              </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
      </div>

      {/* Featured Products Grid */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square bg-black">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale hover:grayscale-0"
                  onClick={() => onProductClick(product.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-white/80 mb-4">R500</p>
                    <button
                      onClick={() => onProductClick(product.id)}
                      className="group relative px-6 py-2 text-sm font-medium rounded-full bg-white text-black overflow-hidden transition-all duration-300"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">Shop Now</span>
                      <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </button>
              </div>
            </div>
          </div>
            </motion.div>
          ))}
      </div>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (!mobile) {
        setShowFilters(true);
      }
    };

    if (window.innerWidth >= 768) {
        setShowFilters(true);
    } else {
        setShowFilters(false); // Default to hidden on mobile
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 500]);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Solid B&W: Page background white, default text black
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen bg-white text-black">
      <NewArrivalsSection onProductClick={handleProductClick} />

      {/* Solid B&W: Header text black, subtext neutral, border neutral */}
      <div className="flex justify-between items-center mb-8 border-b border-neutral-300 pb-4">
        <h1 className="text-3xl font-bold text-black">Shop Collection</h1>
        <p className="text-neutral-600">{filteredProducts.length} products</p>
      </div>

      {/* Solid B&W: Mobile filter button stark black/white */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-center w-full gap-2 py-3 bg-black text-white rounded-none text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          {showFilters ? (
            <> <X size={16} /> <span>Close Filters</span> </>
          ) : (
            <> <Filter size={16} /> <span>Show Filters</span> </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-full md:w-72 flex-shrink-0">
            {/* Solid B&W: Filter panel white with neutral border */}
            <div className="bg-white rounded-lg border border-neutral-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-black">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-neutral-700 hover:text-black underline" // Darker neutral for "Clear all"
                >
                  Clear all
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-wider">Category</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => {
                          setSelectedCategory(selectedCategory === category ? null : category);
                          setCurrentPage(1); // Reset to first page when changing category
                        }}
                        className="h-4 w-4 text-black focus:ring-black border-neutral-400 rounded accent-black" // accent-black for checkbox color
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-3 text-sm text-neutral-700 capitalize hover:text-black cursor-pointer" // Darker neutral for labels
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-wider">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-neutral-700">
                    <span>R{priceRange[0]}</span>
                    <span>R{priceRange[1]}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => {
                        setPriceRange([priceRange[0], parseInt(e.target.value)]);
                        setCurrentPage(1);
                      }}
                      className="w-full h-1 bg-neutral-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1">
          {currentProducts.length > 0 ? (
            <>
              <ProductGrid products={currentProducts} onProductClick={handleProductClick} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            // Solid B&W: No products message box
            <div className="flex flex-col items-center justify-center py-16 bg-white border border-neutral-300 rounded-lg">
              <p className="text-neutral-700 mb-4">No products match your filters</p> {/* Darker neutral */}
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;