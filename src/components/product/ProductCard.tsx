import React, { useState } from 'react';
import { Product } from '../../types';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(product.id);
  };
  
  return (
    <div 
      className="group h-full flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(product.id)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="h-full w-full object-cover object-center grayscale transition-transform duration-700 group-hover:scale-105"
        />
        
        <button 
          className={`absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm transition-all ${isFavorite ? 'text-pink-500' : 'text-white'}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="mt-6 space-y-2">
        <h3 className="text-lg tracking-wider text-white">{product.name}</h3>
        <p className="text-white/70">{formatPrice(product.price)}</p>
        
        <div className="flex gap-2 mt-4">
          {product.colors.map(color => (
            <div 
              key={color.name}
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: color.value }}
              title={color.name}
            ></div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleViewProduct}
          className="mt-4 w-full border border-white/30 text-white hover:bg-white hover:text-black transition-all rounded-none active:scale-95 active:shadow-lg focus:scale-95 focus:shadow-lg"
        >
          View Product
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;