import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, SignalLow as PaypalLogo, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import EmptyCart from './EmptyCart';
import { motion } from 'framer-motion';

interface CheckoutFormProps {
  onComplete: (orderId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

  const formatPrice = (price: number) => {
    return `R${price.toFixed(0)}`;
  };
  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const paymentOptions = [
    { id: 'card', label: 'Credit Card', icon: <CreditCard size={20} className="text-gray-600" /> },
    { id: 'paypal', label: 'PayPal', icon: <PaypalLogo size={20} className="text-blue-600" /> },
    { id: 'payfast', label: 'PayFast', icon: null },
    { id: 'payflex', label: 'PayFlex', icon: null },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 rounded-2xl shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 tracking-tight"
        variants={itemVariants}
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <motion.div
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm transition-all duration-300"
          variants={itemVariants}
          role="form"
          aria-labelledby="shipping-info-heading"
        >
          <h2
            id="shipping-info-heading"
            className="text-lg font-semibold mb-6 text-gray-800"
          >
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['firstName', 'lastName'].map((field) => (
                <div key={field} className="space-y-1">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                    placeholder={field === 'firstName' ? 'John' : 'Doe'}
                  />
                </div>
              ))}
            </div>

            {['email', 'address'].map((field) => (
              <div key={field} className="space-y-1">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                  placeholder={
                    field === 'email' ? 'example@email.com' : '123 Main St'
                  }
                />
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['city', 'postalCode', 'country'].map((field) => (
                <div key={field} className="space-y-1">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field === 'postalCode'
                      ? 'Postal Code'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === 'country' ? (
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
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
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                      placeholder={field === 'city' ? 'New York' : '10001'}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-800">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentOptions.map(({ id, label, icon }) => (
                  <motion.label
                    key={id}
                    htmlFor={id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      id={id}
                      name="paymentMethod"
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id as any)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="ml-2 flex items-center font-medium text-sm sm:text-base">
                      {icon && <span className="mr-2">{icon}</span>}
                      <span>{label}</span>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <motion.div
                className="mt-6 space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-1">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="cardExpiry"
                      className="block text-sm font-medium text-gray-700"
                    >
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
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="cardCvc"
                      className="block text-sm font-medium text-gray-700"
                    >
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
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-indigo-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="flex items-center mt-6 bg-indigo-50 p-3 rounded-lg"
              variants={itemVariants}
            >
              <AlertCircle size={18} className="text-indigo-600 flex-shrink-0" />
              <p className="ml-2 text-sm text-indigo-700">
                This is a demo checkout. No actual payment will be processed.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 relative overflow-hidden border-none group shadow-lg hover:shadow-violet-500/30"
                aria-label="Complete your order"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <span className="relative z-10">Complete Order</span>
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 1.5,
                  }}
                />
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Order Summary with Dark Theme */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-sm transition-all duration-300 text-gray-100"
          variants={itemVariants}
          role="region"
          aria-labelledby="order-summary-heading"
        >
          <h2
            id="order-summary-heading"
            className="text-lg font-semibold mb-6 text-white"
          >
            Order Summary
          </h2>
          <div className="max-h-64 overflow-y-auto mb-4 space-y-4 pr-1 custom-scrollbar">
            {cart.items.map((item, index) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <motion.div
                  key={index}
                  className="flex items-center border-b border-gray-700 pb-3 last:border-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name || 'Product image'}
                    className="h-14 w-14 rounded-md object-cover border border-gray-600 shadow-sm"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-white">
                      {product.name}
                    </h3>
                    <div className="text-xs text-gray-400">
                      {item.color.name} / Size {item.size} / Qty {item.quantity}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="border-t border-gray-700 pt-4 space-y-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-medium text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="font-medium text-white">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Taxes</span>
              <span className="font-medium text-white">{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-base text-white">
              <span>Total</span>
              <span className="text-indigo-400">{formatPrice(total)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const getProductById = (id: string) => ({
  id,
  name: 'Product ' + id,
  price: 29.99,
  images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg'],
});

export default CheckoutForm;