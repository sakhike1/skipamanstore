import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';
import NewArrivals from '../components/home/NewArrivals';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CustomRequest from '../components/home/CustomRequest';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <div>
      <Hero />
      <NewArrivals />
      <FeaturedProducts onProductClick={handleProductClick} />
      <CustomRequest />
      
      {/* Newsletter Section */}
      <div className="bg-white py-16 border-t border-gray-100">
      <div className="bg-white py-16 border-t border-gray-100 border-b">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900">
      New Arrivals Every Week
    </h2>
    <p className="max-w-2xl mx-auto text-lg mb-8 text-gray-600">
      Subscribe to our newsletter and be the first to know about our latest designs and exclusive offers.
    </p>
    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-5 py-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
      />
      <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
        Subscribe
      </button>
    </div>
    <p className="mt-4 text-sm text-gray-500">
      We respect your privacy. Unsubscribe at any time.
    </p>
  </div>
</div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">JD</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <div className="flex text-gray-900">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The quality of these t-shirts is exceptional. The fabric is soft, the fit is perfect, and the designs are unique. I've received many compliments!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">JS</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Jane Smith</h3>
                  <div className="flex text-gray-900">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I love the minimalist designs on these shirts. They're modern, eye-catching, and unlike anything else in my wardrobe. The shipping was also impressively fast."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">RJ</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Robert Johnson</h3>
                  <div className="flex text-gray-900">
                    {'★'.repeat(4)}{'☆'}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Great customer service and the t-shirt quality is top-notch. Would definitely recommend to friends and family looking for unique, high-quality apparel."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;