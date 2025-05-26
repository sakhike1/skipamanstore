import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundGif from '../../assets/Lets_a_create_202505260200.gif';

// Enhanced background with better video visibility
const Background = () => (
  <>
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundGif})` }}
      aria-hidden="true"
    />
    {/* Reduced overlay opacity and added gradient for better video visibility */}
    <div
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/20 via-transparent to-white/30"
      aria-hidden="true"
    />
    {/* Subtle animated overlay for depth */}
    <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/10 via-transparent to-transparent"
      animate={{
        opacity: [0.3, 0.1, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-hidden="true"
    />
  </>
);

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut",
      times: [0, 0.3, 0.7, 1]
    },
  },
  hover: {
    scale: 1.15,
    rotate: 10,
    transition: { duration: 0.3 }
  }
};

const sparkleVariants = {
  animate: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      staggerChildren: 0.3
    }
  }
};

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Background />
      
      {/* Floating elements for visual interest */}
      <motion.div
        className="absolute top-20 left-20 text-white/20"
        variants={sparkleVariants}
        animate="animate"
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-32 text-white/20"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <Sparkles size={32} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-20 text-white/10"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <Sparkles size={20} />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="empty-cart-heading"
      >
        {/* Icon with glassmorphism effect */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex h-32 w-32 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <ShoppingBag size={64} className="text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Enhanced typography with better contrast */}
        <motion.h1 
          id="empty-cart-heading" 
          className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          Your Cart is{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Empty
          </span>
        </motion.h1>

        <motion.p 
          className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-white/90 drop-shadow-lg md:text-xl"
          variants={itemVariants}
        >
          Discover amazing products waiting for you. Start your shopping journey and fill your cart with items you'll love!
        </motion.p>

        {/* Enhanced CTA button */}
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleContinueShopping}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-10 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105 focus:ring-4 focus:ring-blue-300/50 backdrop-blur-sm border border-white/20"
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              Start Shopping
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
                whileHover={{ x: 4 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </span>
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2
              }}
            />
          </Button>
        </motion.div>

        {/* Subtle call-to-action hint */}
        <motion.p 
          className="mt-8 text-sm text-white/70 drop-shadow"
          variants={itemVariants}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨ Free shipping on orders over $50
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EmptyCart;