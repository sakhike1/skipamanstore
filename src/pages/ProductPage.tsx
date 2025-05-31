import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import ProductDetail from '../components/product/ProductDetail';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { Product } from '../types';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const foundProduct = getProductById(id);
        if (isMounted) {
          setProduct(foundProduct || null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);
  
  const handleGoBack = () => {
    navigate('/shop');
  };
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }
  
  return (
    <div className="pt-20">
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductDetail product={product} onGoBack={handleGoBack} />
      </Suspense>
    </div>
  );
};

export default ProductPage;