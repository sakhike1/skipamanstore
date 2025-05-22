import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderConfirmation from '../components/checkout/OrderConfirmation';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId);
    setOrderComplete(true);
    window.scrollTo(0, 0);
  };
  
  const handleContinueShopping = () => {
    navigate('/');
  };
  
  return (
    <div className="pt-20">
      {orderComplete ? (
        <OrderConfirmation orderId={orderId} onContinueShopping={handleContinueShopping} />
      ) : (
        <CheckoutForm onComplete={handleOrderComplete} />
      )}
    </div>
  );
};

export default CheckoutPage;