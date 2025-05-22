import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, SignalLow as PaypalLogo, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 rounded-md shadow-sm">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-6 border-b border-gray-200 pb-3 text-gray-800">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {['firstName', 'lastName'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block mb-1 text-gray-700 font-semibold capitalize">
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder={field === 'firstName' ? 'John' : 'Doe'}
                  />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700 font-semibold">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="address" className="block mb-1 text-gray-700 font-semibold">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block mb-1 text-gray-700 font-semibold">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="New York"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block mb-1 text-gray-700 font-semibold">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="10001"
                />
              </div>

              <div>
                <label htmlFor="country" className="block mb-1 text-gray-700 font-semibold">Country</label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="" disabled>Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium mb-4 text-gray-800">Payment Method</h2>

              <div className="space-y-4">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard size={24} className="mr-2 text-gray-500" /> },
                  { id: 'paypal', label: 'PayPal', icon: <PaypalLogo size={24} className="mr-2 text-blue-600" /> },
                  { id: 'payfast', label: 'PayFast' },
                  { id: 'payflex', label: 'PayFlex' },
                ].map(({ id, label, icon }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${
                      paymentMethod === id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-300 hover:border-teal-500'
                    }`}
                  >
                    <input
                      type="radio"
                      id={id}
                      name="paymentMethod"
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id as any)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <div className="ml-3 flex items-center text-gray-800 font-medium">
                      {icon}
                      <span>{label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block mb-1 text-gray-700 font-semibold">
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block mb-1 text-gray-700 font-semibold">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="cardCvc" className="block mb-1 text-gray-700 font-semibold">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center mt-6 bg-teal-100 p-4 rounded-md">
              <AlertCircle size={20} className="text-teal-600 flex-shrink-0" />
              <p className="ml-3 text-sm text-teal-700">
                This is a demo checkout. No actual payment will be processed.
              </p>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Complete Order
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-6 border-b border-gray-200 pb-3 text-gray-800">Order Summary</h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cart.items.map((item, index) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <div key={index} className="flex py-2 border-b border-gray-200 last:border-none">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1 text-gray-900">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.color.name} / Size {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                      <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-3 border-t border-gray-200 pt-4 text-gray-900">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxes</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-bold">
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