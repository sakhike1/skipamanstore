import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product, Size, Color } from '../types';
import { getProductById } from '../data/products';

// Initialize empty cart
const initialCart: Cart = {
  items: [],
  total: 0,
};

// Action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: { productId: string; size: Size; color: Color; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { index: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { index: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Context setup
type CartContextType = {
  cart: Cart;
  addToCart: (productId: string, size: Size, color: Color, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, size: Size, color: Color) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, size, color, quantity } = action.payload;
      const product = getProductById(productId);
      
      if (!product) return state;
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.productId === productId && item.size === size && item.color.name === color.name
      );
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      
      // Add new item
      const newItem: CartItem = {
        productId,
        size,
        color,
        quantity,
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
        total: calculateTotal([...state.items, newItem]),
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter((_, index) => index !== action.payload.index);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { index, quantity } = action.payload;
      if (quantity <= 0) return state;
      
      const updatedItems = [...state.items];
      updatedItems[index].quantity = quantity;
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    
    case 'CLEAR_CART':
      return initialCart;
      
    default:
      return state;
  }
};

// Helper to calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);
};

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load cart from localStorage if available
  const savedCart = localStorage.getItem('cart');
  const initialState = savedCart ? JSON.parse(savedCart) : initialCart;
  
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Cart actions
  const addToCart = (productId: string, size: Size, color: Color, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { productId, size, color, quantity } });
  };
  
  const removeFromCart = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { index } });
  };
  
  const updateQuantity = (index: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const isInCart = (productId: string, size: Size, color: Color): boolean => {
    return cart.items.some(
      item => 
        item.productId === productId && 
        item.size === size && 
        item.color.name === color.name
    );
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};