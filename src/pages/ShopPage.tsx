import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, getFeaturedProducts } from '../data/products'; // Assuming this path is correct
import { Filter, X, ArrowRight } from 'lucide-react';

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
          <span className="text-black font-medium">${product.price.toFixed(2)}</span> {/* Solid B&W: text-black */}
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
  // Fetch 3 products instead of 4
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <div className="w-full mb-12 relative group"> {/* Added group for "NEW ARRIVAL" text hover */}
      {/* Adjust grid to md:grid-cols-3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* First Product */}
        {featuredProducts[0] && (
          <div className="col-span-1">
            <div className="relative group overflow-hidden"> {/* 'group' for image hover */}
              <img
                src={featuredProducts[0].images[0]}
                alt={featuredProducts[0].name}
                className="w-full h-auto object-cover aspect-[3/4] cursor-pointer filter grayscale group-hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={() => onProductClick(featuredProducts[0].id)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div> {/* Subtle overlay */}
            </div>
          </div>
        )}

        {/* Second Product with Text */}
        {featuredProducts[1] && (
          <div className="col-span-1">
            <div className="h-full flex flex-col">
              <div className="relative group overflow-hidden flex-grow"> {/* 'group' for image hover */}
                <img
                  src={featuredProducts[1].images[0]}
                  alt={featuredProducts[1].name}
                  className="w-full h-full object-cover aspect-square cursor-pointer filter grayscale group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  onClick={() => onProductClick(featuredProducts[1].id)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="bg-white p-4 border-t border-neutral-200">
                <p className="text-sm text-black">
                  Our exclusive collection is crafted with the finest materials and unparalleled attention to detail.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Third Product with Text */}
        {featuredProducts[2] && (
          <div className="col-span-1">
            <div className="h-full flex flex-col">
              <div className="relative group overflow-hidden flex-grow"> {/* 'group' for image hover */}
                <img
                  src={featuredProducts[2].images[0]}
                  alt={featuredProducts[2].name}
                  className="w-full h-full object-cover aspect-square cursor-pointer filter grayscale group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  onClick={() => onProductClick(featuredProducts[2].id)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="bg-white p-4 border-t border-neutral-200">
                <p className="text-sm text-black">
                  Discover sophisticated designs and timeless fashion in our curated selection.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Fourth product card is removed */}
      </div>
      {/* "NEW ARRIVAL" text with hover effect & adjusted size for 3 columns */}
      <div className="absolute text-[100px] sm:text-[120px] md:text-[150px] font-bold text-white tracking-wide top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-difference pointer-events-none group-hover:opacity-75 transition-opacity duration-300">
        NEW ARRIVAL
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
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
    setPriceRange([0, 100]);
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
                  <div className="flex justify-between text-sm text-neutral-700"> {/* Darker neutral for price text */}
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => {
                        setPriceRange([priceRange[0], parseInt(e.target.value)]);
                        setCurrentPage(1); // Reset to first page when changing price range
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