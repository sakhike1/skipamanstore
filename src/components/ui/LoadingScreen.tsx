import React, { useEffect, useState, useRef } from 'react';

const LoadingScreen: React.FC = () => {
  // isLoadingContent: controls the visual state (opacity transition)
  const [isLoadingContent, setIsLoadingContent] = useState(true); 
  // displayComponent: controls whether the component is mounted in the DOM
  const [displayComponent, setDisplayComponent] = useState(true);

  // useRef to track if the initial HTML loading screen has been handled
  const initialScreenHandled = useRef(false);

  useEffect(() => {
    // Function to remove the initial HTML loading screen (e.g., from public/index.html)
    const removeInitialHtmlLoadingScreen = () => {
      if (initialScreenHandled.current) return; // Prevent multiple removals
      const initialLoadingScreen = document.getElementById('loading-screen');
      if (initialLoadingScreen) {
        // Start fade-out of the HTML screen
        initialLoadingScreen.style.opacity = '0';
        initialLoadingScreen.style.transition = 'opacity 0.5s ease-out';
        
        // Remove from DOM after transition
        setTimeout(() => {
          initialLoadingScreen.remove();
          initialScreenHandled.current = true;
        }, 500); // Matches transition duration
      } else {
        initialScreenHandled.current = true; // Mark as handled even if not found
      }
    };

    // Immediately try to remove the initial HTML loading screen
    removeInitialHtmlLoadingScreen();

    // Function to initiate the fade-out of the React loading screen
    const handlePageLoaded = () => {
      setIsLoadingContent(false); // Start the CSS fade-out transition for this component
      
      // Remove component from DOM after its fade-out transition completes
      setTimeout(() => {
        setDisplayComponent(false);
      }, 700); // Must be slightly longer than the CSS transition duration (e.g., 500ms + buffer)
    };

    // 1. Check if the page is already fully loaded (e.g., if JS runs late)
    if (document.readyState === 'complete') {
      handlePageLoaded();
      return; // Exit as loading is complete
    }

    // 2. Listen for the 'load' event, which fires when all assets are loaded
    window.addEventListener('load', handlePageLoaded);

    // 3. Fallback Timers for robustness and user experience
    //    a) Minimum display time: Ensures the loading screen is shown for at least 'X' seconds
    //       to prevent a 'flash' on very fast loads.
    const minDisplayTimer = setTimeout(() => {
      // Only initiate fade-out if not already doing so
      if (isLoadingContent) { 
        handlePageLoaded();
      }
    }, 1500); // Display for at least 1.5 seconds

    //    b) Maximum display time: Acts as a safeguard in case 'load' event never fires
    //       or takes excessively long due to network issues.
    const maxDisplayTimer = setTimeout(() => {
      if (isLoadingContent) {
        handlePageLoaded();
      }
    }, 8000); // Force hide after 8 seconds

    // Cleanup function: Remove event listener and clear timers on component unmount
    return () => {
      window.removeEventListener('load', handlePageLoaded);
      clearTimeout(minDisplayTimer);
      clearTimeout(maxDisplayTimer);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Don't render anything if the component is no longer meant to be displayed
  if (!displayComponent) return null;

  return (
    <div 
      // ARIA attributes for accessibility
      role="status" // Indicates to screen readers that this is a status message
      aria-live="polite" // Announce changes politely (e.g., "Page loading")
      aria-label="Page loading" // Provides a more descriptive label

      // Tailwind CSS for full-screen overlay and transition
      className={`fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm 
        flex flex-col items-center justify-center 
        transition-opacity duration-700 ease-out 
        ${isLoadingContent ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* Custom Tailwind Spinner */}
        <div className="relative w-16 h-16 mb-8">
            {/* Spinner Base (outer ring) */}
            <div className="absolute inset-0 border-4 border-solid border-gray-700 border-t-transparent rounded-full animate-[spin_2s_linear_infinite]"></div> 
            {/* Spinner Accent (inner arc), slightly faster and offset spin */}
            <div className="absolute inset-0 border-4 border-solid border-transparent border-t-[#FFD700] rounded-full animate-[spin_1s_linear_infinite_reverse_0.2s]"></div> 
        </div>

        {/* Brand Name with improved styling */}
        <div className="text-white text-4xl sm:text-5xl font-extrabold tracking-widest leading-none">
          <span className="drop-shadow-lg">SKIPA</span>
          <span className="text-[#FFD700] drop-shadow-lg">MAN</span>
        </div>
        
        {/* Subtle loading message with a pulse effect */}
        <p className="text-white/70 text-sm sm:text-base mt-4 tracking-wide animate-pulse">
          Loading the latest collection...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;