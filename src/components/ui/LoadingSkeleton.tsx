import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image skeleton */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-16 h-16 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Product info skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div>
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="flex space-x-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          
          <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;