import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

interface SlideChangeProps {
  onSlideChange?: (isDark: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkSlide, setIsDarkSlide] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  const handleSlideChange = (isDark: boolean) => {
    setIsDarkSlide(isDark);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections with black background or full height
      const sections = document.querySelectorAll('.bg-black, .h-screen');
      const headerHeight = 80; // Approximate header height

      // Check if any dark section is in view
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          setIsDarkSection(true);
          return;
        }
      }
      setIsDarkSection(false);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clone children and pass the onSlideChange prop to Hero component
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<SlideChangeProps>(child)) {
      return React.cloneElement(child, { onSlideChange: handleSlideChange });
    }
    return child;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header isDarkSlide={isDarkSlide || isDarkSection} />
      <main className="flex-grow">
        {childrenWithProps}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;