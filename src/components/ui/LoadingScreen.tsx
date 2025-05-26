import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Remove the initial HTML loading screen
    const initialLoadingScreen = document.getElementById('loading-screen');
    if (initialLoadingScreen) {
      initialLoadingScreen.style.opacity = '0';
      initialLoadingScreen.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        initialLoadingScreen.remove();
      }, 500);
    }

    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before hiding to allow fade-out animation
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="loading-spinner mb-8" />
        <div className="text-white text-xl font-light tracking-widest animate-pulse">
          SKIPA<span className="text-[#FFD700]">MAN</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 