import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartPreview from '../cart/CartPreview';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [isHeaderDark, setIsHeaderDark] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check what section is currently in view to determine header color scheme
      const sections = document.querySelectorAll('section, div.bg-black, div.bg-white');
      if (sections.length) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          // If the section is within the viewport and includes the header position
          if (rect.top <= 80 && rect.bottom >= 80) {
            const bgColor = window.getComputedStyle(section).backgroundColor;
            // Check if the background is dark (simplified check)
            const isDark = bgColor.includes('0, 0, 0') || bgColor.includes('rgb(0,') || 
                          section.classList.contains('bg-black') || section.classList.contains('bg-neutral-900');
            setIsHeaderDark(isDark);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const toggleCartPreview = () => setShowCartPreview(!showCartPreview);
  
  // Determine text and icon colors based on scroll state and background
  const getTextColor = () => {
    if (isScrolled) return 'text-gray-800'; // Always dark text on scrolled (white bg)
    return isHeaderDark ? 'text-white' : 'text-gray-800'; // Adapt to the background otherwise
  };

  const getHoverBgColor = () => {
    if (isScrolled) return 'hover:bg-gray-100'; // Light hover on scrolled
    return isHeaderDark ? 'hover:bg-white/20' : 'hover:bg-black/5'; // Adapt hover to background
  };

  const textColor = getTextColor();
  const hoverBgColor = getHoverBgColor();
  
  // Navigation items with correct paths
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'About', path: '/about' }
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'py-4 backdrop-blur-[2px] bg-gradient-to-b from-black/30 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <motion.div 
            className="text-3xl font-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="/" 
              className="relative group"
            >
              <span className={`tracking-tighter ${textColor} [text-shadow:0px_0px_1px_rgba(255,255,255,0.5)]`}>SKIPA</span>
              <span className={`tracking-tighter relative ${textColor} [text-shadow:0px_0px_1px_rgba(255,255,255,0.5)]`}>
                MAN
                <span className={`absolute left-0 bottom-0 h-0.5 ${isHeaderDark && !isScrolled ? 'bg-white' : 'bg-black'} w-0 group-hover:w-full transition-all duration-300`}></span>
              </span>
              <motion.span 
                className="absolute -inset-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 blur-sm"
                initial={{ x: -100 }}
                animate={{ x: 100 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.path}
                className={`
                  font-medium text-lg tracking-tight ${textColor} opacity-100
                  relative group [text-shadow:0px_0px_1px_rgba(255,255,255,0.5)]
                `}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <span className={`absolute left-0 -bottom-1 h-0.5 ${isHeaderDark && !isScrolled ? 'bg-white' : 'bg-black'} w-0 group-hover:w-full transition-all duration-300`}></span>
              </motion.a>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className={`
                p-2 rounded-full transition-all ${textColor} ${hoverBgColor}
              `}
              aria-label="Search"
            >
              <Search size={22} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" />
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className={`
                p-2 rounded-full relative transition-all ${textColor} ${hoverBgColor}
              `}
              onClick={toggleCartPreview}
              aria-label="Cart"
            >
              <ShoppingBag size={22} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" />
              {cartItemCount > 0 && (
                <motion.span 
                  className={`absolute -top-1 -right-1 ${isHeaderDark && !isScrolled ? 'bg-white text-black' : 'bg-black text-white'} text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className={`
                p-2 rounded-md md:hidden transition-all
                ${textColor} ${hoverBgColor}
              `}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {showMobileMenu ? 
                <X size={24} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" /> : 
                <Menu size={24} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" />
              }
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div 
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="text-gray-800 text-lg font-medium py-2 border-b border-gray-100 opacity-100"
                  whileHover={{ x: 5 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
      
      {/* Cart Preview */}
      {showCartPreview && <CartPreview onClose={() => setShowCartPreview(false)} />}
    </header>
  );
};

export default Header;