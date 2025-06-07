import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundGif from '../../assets/Lets_a_create_202505260200.gif';

// Background component with optimized visibility and subtle animation
const Background = () => (
  <>
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundGif})` }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/30 via-transparent to-white/20"
      aria-hidden="true"
    />
    <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/15 via-transparent to-transparent"
      animate={{ opacity: [0.4, 0.2, 0.4] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  </>
);

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 0.61, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.08, 1],
    rotate: [0, 3, -3, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
  hover: { scale: 1.12, rotate: 8, transition: { duration: 0.3 } },
};

const sparkleVariants = {
  animate: {
    scale: [0.5, 1.2, 0.5],
    rotate: [0, 180, 360],
    opacity: [0, 0.8, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      staggerChildren: 0.4,
    },
  },
};

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900">
      <Background />

      {/* Decorative floating sparkles with responsive positioning */}
      {[
        { top: '15%', left: '10%', size: 24, delay: '0s' },
        { bottom: '25%', right: '15%', size: 32, delay: '1.2s' },
        { top: '30%', right: '10%', size: 20, delay: '2.4s' },
      ].map((sparkle, index) => (
        <motion.div
          key={index}
          className="absolute hidden text-white/25 md:block"
          style={{
            top: sparkle.top || 'auto',
            bottom: sparkle.bottom || 'auto',
            left: sparkle.left || 'auto',
            right: sparkle.right || 'auto',
            animationDelay: sparkle.delay,
          }}
          variants={sparkleVariants}
          animate="animate"
        >
          <Sparkles size={sparkle.size} />
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="region"
        aria-labelledby="empty-cart-heading"
      >
        {/* Icon with refined glassmorphism effect */}
        <motion.div
          className="mb-10 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 shadow-xl md:h-36 md:w-36"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <ShoppingBag
              size={window.innerWidth < 768 ? 56 : 72}
              className="text-white drop-shadow-md"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* Typography with improved readability and responsiveness */}
        <motion.h1
          id="empty-cart-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-5xl"
          variants={itemVariants}
        >
          Your Cart is{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
            Empty
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/85 drop-shadow-md sm:text-lg md:text-xl"
          variants={itemVariants}
        >
          Explore our curated collection of products. Start shopping now and fill your cart with treasures!
        </motion.p>

        {/* CTA Button with polished gradient and hover effects */}
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleContinueShopping}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-violet-500/30 hover:scale-[1.03] focus:ring-4 focus:ring-violet-400/50 backdrop-blur-sm border border-white/15 sm:px-10 sm:py-4 sm:text-lg"
            aria-label="Continue shopping and explore products"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              Start Shopping
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
                whileHover={{ x: 3 }}
              >
                <ArrowRight size={window.innerWidth < 640 ? 18 : 20} />
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.5,
              }}
            />
          </Button>
        </motion.div>

        {/* Subtle promotional hint with animation */}
        <motion.p
          className="mt-6 text-xs text-white/75 drop-shadow-sm sm:mt-8 sm:text-sm"
          variants={itemVariants}
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨ Free shipping on orders over $50
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EmptyCart;