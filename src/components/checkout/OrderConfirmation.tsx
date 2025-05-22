import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface OrderConfirmationProps {
  orderId: string;
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, onContinueShopping }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-teal-100 mb-6">
            <Check size={48} className="text-teal-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thank you!</h1>
        <p className="mt-4 text-xl text-gray-500">Your order has been placed successfully</p>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>Order Number: <span className="font-medium text-gray-900">{orderId}</span></p>
            <p>Date: <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span></p>
            <p>Payment Method: <span className="font-medium text-gray-900">Credit Card</span></p>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your email address
          </p>
          
          <p className="text-sm text-gray-600">
            If you have any questions about your order, please contact our customer support
          </p>
          
          <Button
            variant="primary"
            className="mt-4"
            onClick={onContinueShopping}
          >
            Continue Shopping <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
        
        <div className="mt-12 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform">
          <p className="font-medium">SPECIAL OFFER</p>
          <p className="text-sm mt-1">Use code WELCOME15 for 15% off your next order!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;