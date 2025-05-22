import React, { useRef, useEffect } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import { Button } from '../ui/Button';

interface CartPreviewProps {
  onClose: () => void;
}

const CartPreview: React.FC<CartPreviewProps> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const cartPanelRef = useRef<HTMLDivElement>(null);
  
  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartPanelRef.current && !cartPanelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    // Only attach listener to document body, not the backdrop
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent body scrolling while cart is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  
  // Stop propagation on panel click to prevent closing
  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  // Prevent closing on quantity button clicks
  const handleQuantityClick = (e: React.MouseEvent, indexFn: (index: number, quantity: number) => void, index: number, quantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    indexFn(index, quantity);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop - removed onClick from here to handle in useEffect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      {/* Cart panel */}
      <div 
        ref={cartPanelRef}
        className="relative w-full max-w-md bg-white h-screen shadow-xl flex flex-col transform transition-transform animate-slide-in-right overflow-hidden"
        onClick={handlePanelClick}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag size={20} className="mr-2" />
            Your Cart ({cart.items.reduce((total, item) => total + item.quantity, 0)})
          </h2>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add some products to get started!</p>
              <Button 
                variant="primary" 
                className="mt-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item, index) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                
                return (
                  <li key={`${item.productId}-${item.size}-${item.color.name}-${index}`} className="py-4 flex">
                    {/* Product image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    {/* Product details */}
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p className="ml-4">{formatPrice(product.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.color.name} / Size {item.size}
                        </p>
                      </div>
                      
                      {/* Quantity and remove */}
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded">
                          <button 
                            className="px-2 py-1 border-r"
                            onClick={(e) => handleQuantityClick(e, updateQuantity, index, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 border-l"
                            onClick={(e) => handleQuantityClick(e, updateQuantity, index, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          type="button" 
                          className="font-medium text-black hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4 bg-white sticky bottom-0 z-10">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatPrice(cart.total)}</p>
            </div>
            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="space-y-2">
              <Button 
                variant="primary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = '/checkout';
                }}
                className="bg-black text-white hover:bg-gray-900 py-3 rounded-full"
              >
                Checkout <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="border border-black text-black hover:bg-black hover:text-white py-3 rounded-full transition-colors"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPreview;