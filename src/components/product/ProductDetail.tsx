import React, { useState } from 'react';
import { Product, Size, Color } from '../../types';
import { Button } from '../ui/Button';
import { Check, ChevronLeft, ChevronRight, Expand, ShoppingBag, X, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onGoBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onGoBack }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(product.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  
  const { addToCart, isInCart } = useCart();
  
  // Handle image navigation
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product.id, selectedSize, selectedColor, quantity);
  };
  
  // Check if the current selection is already in the cart
  const isCurrentSelectionInCart = selectedSize && selectedColor
    ? isInCart(product.id, selectedSize, selectedColor)
    : false;
    
  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlistActive(!isWishlistActive);
  };
  
  return (
    <div className="max-w-6xl mx-auto bg-white">
      {/* Top navigation bar with improved marquee animation */}
      <div className="bg-black text-white text-xs py-2 px-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee-smooth">
          <span className="mx-4">FREE DELIVERY OVER €50</span>
          <span>•</span>
          <span className="mx-4">FREE RETURNS POLICY</span>
          <span>•</span>
          <span className="mx-4">WORLDWIDE DELIVERY</span>
          <span>•</span>
          <span className="mx-4">FREE DELIVERY OVER €50</span>
          <span>•</span>
          <span className="mx-4">FREE RETURNS POLICY</span>
          <span>•</span>
          <span className="mx-4">WORLDWIDE DELIVERY</span>
        </div>
      </div>
      
      {/* Header without navigation links */}
      <header className="border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onGoBack} className="text-gray-500 hover:text-black transition-colors mr-4">
            Back
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button><Heart size={18} /></button>
          <button><ShoppingBag size={18} /></button>
          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-col md:flex-row">
        {/* Left column - Product details */}
        <div className="w-full md:w-1/4 p-6 border-r border-gray-200">
          <div className="text-xs flex text-gray-500 mb-6">
            <a href="/" className="hover:text-black">Home</a>
            <span className="mx-2">/</span>
            <a href="/category" className="hover:text-black">Category</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Jackets</span>
          </div>
          
          <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl font-medium text-gray-900 mb-8">R{product.price.toFixed(0)}</p>
          
          {/* Product info accordion */}
          <div className="space-y-0 mb-6">
            <details className="group border-t border-gray-200 py-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <span className="text-sm font-medium text-gray-900">Product Info</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="mt-2 text-sm text-gray-600">
                <p>Cropped quilted jacket in textured nylon with asymmetrical stitch detailing. Model is 180cm (5'11") and is wearing size M.</p>
              </div>
            </details>
            
            <details className="group border-t border-gray-200 py-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <span className="text-sm font-medium text-gray-900">Details</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="mt-2 text-sm text-gray-600 space-y-2">
                <p>100% premium nylon for superior comfort</p>
                <p>Pre-shrunk to minimize shrinkage</p>
                <p>Reinforced stitching for durability</p>
                <p>Machine washable, tumble dry low</p>
              </div>
            </details>
            
            <details className="group border-t border-b border-gray-200 py-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <span className="text-sm font-medium text-gray-900">Delivery & Returns</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="mt-2 text-sm text-gray-600 space-y-2">
                <p>Free shipping on orders over €50</p>
                <p>Delivery within 3-5 business days</p>
                <p>Easy returns within 30 days</p>
              </div>
            </details>
          </div>
        </div>
        
        {/* Center column - Product images */}
        <div className="w-full md:w-2/4 p-4">
          <div className="relative">
            {/* Fixed height container to prevent layout shifts */}
            <div className="h-[500px] bg-gray-50 flex items-center justify-center relative">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                style={{
                  display: 'block',
                  margin: '0 auto'
                }}
              />
              
              {/* Image navigation buttons - Only show if multiple images */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              
              {/* Zoom button */}
              <button 
                onClick={() => setShowZoomModal(true)}
                className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-opacity"
                aria-label="Zoom image"
              >
                <Expand size={16} />
              </button>
            </div>
            
            {/* Thumbnail navigation - Fixed height thumbnails */}
            <div className="flex mt-4 space-x-2 justify-center">
              {product.images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-24 border-2 flex items-center justify-center ${currentImageIndex === index ? 'border-black' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Purchase options */}
        <div className="w-full md:w-1/4 p-6 border-l border-gray-200">
          {/* Size selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-900">Choose Size</h2>
              <button 
                className="text-xs text-gray-500 hover:text-black transition-colors"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                type="button"
              >
                Size Guide
              </button>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size as Size)}
                  className={`h-10 flex items-center justify-center border text-sm transition-all focus:outline-none ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            
            {/* Size guide modal */}
            {showSizeGuide && (
              <div className="mt-4 p-4 bg-white rounded border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size Guide</h3>
                  <button 
                    onClick={() => setShowSizeGuide(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X size={16} />
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-500">Size</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500">Chest (in)</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2">S</td>
                      <td className="px-3 py-2">36-38</td>
                      <td className="px-3 py-2">27-28</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">M</td>
                      <td className="px-3 py-2">39-41</td>
                      <td className="px-3 py-2">28-29</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">L</td>
                      <td className="px-3 py-2">42-44</td>
                      <td className="px-3 py-2">29-30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Color selection */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-900 mb-2">Choose Color</h2>
            <div className="flex space-x-3">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none ${
                    selectedColor?.name === color.name
                      ? 'border-black ring-1 ring-black'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor?.name === color.name && (
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Disclaimer and checkout */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-6">
              All contents of this website are the property of A-COLD-WALL*
            </p>
            
            <div className="flex mb-4">
              <button
                className="flex-grow bg-black text-white rounded-full py-3 text-sm font-medium shadow hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedSize || !selectedColor}
                onClick={handleAddToCart}
                type="button"
              >
                Add to Cart
              </button>
            </div>
            
            <div className="flex justify-center">
              <button
                className="text-black flex items-center justify-center"
                onClick={toggleWishlist}
                type="button"
              >
                <Heart size={20} className={isWishlistActive ? "fill-black text-black mr-2" : "mr-2"} />
                <span className="text-sm">Save to Wishlist</span>
              </button>
            </div>
            
            {(!selectedSize || !selectedColor) && (
              <p className="mt-6 text-sm text-red-500 font-medium">
                Please select {!selectedSize ? 'a size' : ''} 
                {!selectedSize && !selectedColor ? ' and ' : ''} 
                {!selectedColor ? 'a color' : ''}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Zoom modal */}
      {showZoomModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="max-w-4xl max-h-full p-4 relative">
            <button
              onClick={() => setShowZoomModal(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-opacity"
              aria-label="Close zoom view"
            >
              <X size={24} />
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            <div className="absolute left-4 right-4 bottom-4 flex justify-center space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-gray-500'
                  }`}
                  aria-label={`View image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes marqueeSmooth {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee-smooth {
            display: inline-block;
            animation: marqueeSmooth 15s linear infinite;
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;