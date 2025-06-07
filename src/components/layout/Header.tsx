import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartPreview from '../cart/CartPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';

interface NavItem {
  name: string;
  path: string;
  ariaLabel?: string;
}

const Header: React.FC = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [isHeaderDark, setIsHeaderDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Optimized scroll handler with debounce
  const handleScroll = useCallback(
    debounce(() => {
      setIsScrolled(window.scrollY > 20);
      
      // Check what section is currently in view to determine header color scheme
      const sections = document.querySelectorAll('section, div.bg-black, div.bg-white');
      if (sections.length) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            const bgColor = window.getComputedStyle(section).backgroundColor;
            const isDark = bgColor.includes('0, 0, 0') || bgColor.includes('rgb(0,') || 
                          section.classList.contains('bg-black') || section.classList.contains('bg-neutral-900');
            setIsHeaderDark(isDark);
            break;
          }
        }
      }
    }, 100),
    []
  );
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  // Handle search submission
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  }, [searchQuery, navigate]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowMobileMenu(false);
      setShowCartPreview(false);
      setIsSearchFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => document.removeEventListener('keydown', handleKeyDown as any);
  }, [handleKeyDown]);
  
  // Memoized cart count calculation
  const cartItemCount = useMemo(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);
  
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(prev => !prev);
  }, []);
  
  const toggleCartPreview = useCallback(() => {
    setShowCartPreview(prev => !prev);
  }, []);
  
  // Determine text and icon colors based on scroll state and background
  const getTextColor = useCallback(() => {
    if (location.pathname === '/shop' || location.pathname === '/about' || location.pathname === '/checkout') {
      return 'text-black';
    }
    if (isScrolled) {
      return 'text-gray-800';
    }
    return 'text-white';
  }, [isScrolled, location.pathname]);

  const getHoverBgColor = useCallback(() => {
    if (isScrolled) return 'hover:bg-gray-100';
    return 'hover:bg-white/20';
  }, [isScrolled]);

  const textColor = getTextColor();
  const hoverBgColor = getHoverBgColor();
  
  // Navigation items with correct paths and aria labels
  const navItems = useMemo<NavItem[]>(() => [
    { name: 'Home', path: '/', ariaLabel: 'Go to homepage' },
    { name: 'Shop', path: '/shop', ariaLabel: 'Browse our shop' },
    { name: 'New Arrivals', path: '/new-arrivals', ariaLabel: 'View new arrivals' },
    { name: 'About', path: '/about', ariaLabel: 'Learn more about us' }
  ], []);
  
  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 } 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 } 
    }
  };
  
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 } 
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'py-4 backdrop-blur-[2px] bg-gradient-to-b from-black/30 to-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="text-3xl font-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="relative group"
              aria-label="SkipaMan Home"
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
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * navItems.indexOf(item) }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={item.path}
                  className={`
                    font-medium text-lg tracking-tight ${textColor}
                    relative group [text-shadow:0px_0px_1px_rgba(255,255,255,0.5)]
                  `}
                  aria-label={item.ariaLabel}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                  <span 
                    className={`absolute left-0 -bottom-1 h-0.5 ${isScrolled ? 'bg-gray-800' : 'bg-white'}
                    ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-300`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <motion.div
                initial={false}
                animate={{ width: isSearchFocused ? 200 : 40 }}
                className="relative"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    if (!searchQuery) setIsSearchFocused(false);
                  }}
                  placeholder={isSearchFocused ? "Search products..." : ""}
                  className={`
                    w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm
                    ${textColor} placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-white/20
                    transition-all duration-300
                  `}
                  aria-label="Search products"
                />
                <motion.button
                  type="submit"
                  className={`
                    absolute right-2 top-1/2 -translate-y-1/2 p-1
                    rounded-full transition-all ${textColor} ${hoverBgColor}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Submit search"
                >
                  <Search size={20} />
                </motion.button>
              </motion.div>
            </form>
            
            {/* Cart Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-full relative transition-all ${textColor} ${hoverBgColor}
              `}
              onClick={toggleCartPreview}
              aria-label={`Cart with ${cartItemCount} items`}
            >
              <ShoppingBag size={22} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span 
                    className={`absolute -top-1 -right-1 ${isHeaderDark && !isScrolled ? 'bg-white text-black' : 'bg-black text-white'} 
                    text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Mobile Menu Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-md md:hidden transition-all
                ${textColor} ${hoverBgColor}
              `}
              onClick={toggleMobileMenu}
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={showMobileMenu ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: showMobileMenu ? 0 : -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: showMobileMenu ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {showMobileMenu ? 
                    <X size={24} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" /> : 
                    <Menu size={24} className="[filter:drop-shadow(0px_0px_1px_rgba(255,255,255,0.5))]" />
                  }
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div 
              id="mobile-menu"
              className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-xl overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <nav className="flex flex-col space-y-1 px-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={mobileItemVariants}
                  >
                    <Link
                      to={item.path}
                      className={`
                        text-gray-800 text-lg font-medium py-3 px-2 rounded-md transition-all
                        ${location.pathname === item.path ? 'bg-gray-50 font-semibold' : ''}
                        hover:bg-gray-50
                      `}
                      onClick={() => setShowMobileMenu(false)}
                      aria-label={item.ariaLabel}
                      aria-current={location.pathname === item.path ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Additional items for mobile */}
                <motion.div 
                  className="pt-2 mt-2 border-t border-gray-100"
                  variants={mobileItemVariants}
                >
                  <Link
                    to="/account"
                    className="text-gray-800 text-lg font-medium py-3 px-2 rounded-md hover:bg-gray-50 transition-all block"
                    onClick={() => setShowMobileMenu(false)}
                    aria-label="View my account"
                  >
                    My Account
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Cart Preview */}
      <AnimatePresence>
        {showCartPreview && <CartPreview onClose={() => setShowCartPreview(false)} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;