import React, { useState } from 'react';
import { Product, ViewMode } from '../../types';
import ProductCard from './ProductCard';
import { Grid, List, LayoutGrid } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* View mode toggles */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'
            } border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-teal-500`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={18} />
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b ${
              viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'
            } border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-teal-500`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              viewMode === 'carousel' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'
            } border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-teal-500`}
            onClick={() => setViewMode('carousel')}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>
      
      {/* Products display */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>
      )}
      
      {viewMode === 'list' && (
        <div className="space-y-6">
          {products.map(product => (
            <div 
              key={product.id}
              className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => onProductClick(product.id)}
            >
              <div className="w-full sm:w-48 h-48">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-2 flex space-x-1">
                  {product.colors.map(color => (
                    <div 
                      key={color.name}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                  <button 
                    className="bg-teal-600 text-white rounded-md px-3 py-1 text-sm hover:bg-teal-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product.id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {viewMode === 'carousel' && (
        <div className="relative overflow-hidden">
          <div className="flex space-x-6 py-4 overflow-x-auto scrollbar-hide pb-6">
            {products.map(product => (
              <div 
                key={product.id}
                className="flex-none w-64"
              >
                <ProductCard
                  product={product}
                  onClick={onProductClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;