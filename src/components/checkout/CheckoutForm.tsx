import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, SignalLow as PaypalLogo, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import EmptyCart from './EmptyCart';

interface CheckoutFormProps {
  onComplete: (orderId: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onComplete }) => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'payflex' | 'payfast'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  // If cart is empty, show EmptyCart component
  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}-${Date.now().toString().slice(-4)}`;
      clearCart();
      onComplete(orderId);
      setIsLoading(false);
    }, 1500);
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-gray-50 rounded-xl shadow-sm">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm transition-all duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['firstName', 'lastName'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder={field === 'firstName' ? 'John' : 'Doe'}
                  />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['city', 'postalCode', 'country'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field === 'postalCode' ? 'Postal Code' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === 'country' ? (
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    >
                      <option value="" disabled>Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      placeholder={field === 'city' ? 'New York' : '10001'}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-5 mt-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard size={20} className="text-gray-600" /> },
                  { id: 'paypal', label: 'PayPal', icon: <PaypalLogo size={20} className="text-blue-600" /> },
                  { id: 'payfast', label: 'PayFast', icon: null },
                  { id: 'payflex', label: 'PayFlex', icon: null },
                ].map(({ id, label, icon }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      id={id}
                      name="paymentMethod"
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id as any)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="ml-2 flex items-center font-medium">
                      {icon && <span className="mr-2">{icon}</span>}
                      <span>{label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center mt-5 bg-indigo-50 p-3 rounded-lg">
              <AlertCircle size={18} className="text-indigo-600 flex-shrink-0" />
              <p className="ml-2 text-sm text-indigo-700">
                This is a demo checkout. No actual payment will be processed.
              </p>
            </div>

            <Button
  type="submit"
  variant="primary"
  size="lg"
  fullWidth
  isLoading={isLoading}
  className="mt-6 bg-gradient-to-r from-gray-700 via-gray-900 to-black hover:bg-indigo-700 transition-all duration-200 relative overflow-hidden border-none group"
>
  Complete Order
  {/* Animated border on hover using pseudo-element */}
  <span className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 transition-all duration-500 rounded-lg animate-border-draw"></span>
</Button>
          </form>
        </div>

        {/* Order Summary with Dark Gray Theme */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-300 text-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-white">Order Summary</h2>
          <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
            {cart.items.map((item, index) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div key={index} className="flex items-center border-b border-gray-700 pb-2 last:border-none">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover border border-gray-600"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-white">{product.name}</h3>
                    <div className="text-xs text-gray-400">
                      {item.color.name} / Size {item.size} / Qty {item.quantity}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white">{formatPrice(product.price * item.quantity)}</p>
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-700 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-medium text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="font-medium text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Taxes</span>
              <span className="font-medium text-white">{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-base text-white">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getProductById = (id: string) => ({
  id,
  name: 'Product ' + id,
  price: 29.99,
  images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg'],
});

export default CheckoutForm;