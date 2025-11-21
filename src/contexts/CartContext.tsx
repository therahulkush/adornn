import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string;
  promoDiscount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; variant?: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'APPLY_PROMO'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_PROMO' }
  | { type: 'LOAD_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  isOpen: false,
  promoCode: '',
  promoDiscount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, variant } = action.payload;
      const itemId = `${product.id}-${variant || 'default'}`;
      
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, {
          id: itemId,
          product,
          quantity,
          selectedVariant: variant,
        }],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        promoCode: '',
        promoDiscount: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'SET_CART_OPEN':
      return {
        ...state,
        isOpen: action.payload,
      };
    
    case 'APPLY_PROMO':
      return {
        ...state,
        promoCode: action.payload.code,
        promoDiscount: action.payload.discount,
      };
    
    case 'REMOVE_PROMO':
      return {
        ...state,
        promoCode: '',
        promoDiscount: 0,
      };
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getSubtotal: () => number;
  getTaxAmount: () => number;
  getShippingCost: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const PROMO_CODES = {
  'WELCOME10': 0.1,
  'SAVE20': 0.2,
  'NEWCUSTOMER': 0.15,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('havenly-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: { ...initialState, ...parsedCart, isOpen: false } });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartToSave = {
      items: state.items,
      promoCode: state.promoCode,
      promoDiscount: state.promoDiscount,
    };
    localStorage.setItem('havenly-cart', JSON.stringify(cartToSave));
  }, [state.items, state.promoCode, state.promoDiscount]);

  const addItem = (product: Product, quantity = 1, variant?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variant } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setCartOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen });
  };

  const applyPromoCode = (code: string): boolean => {
    const discount = PROMO_CODES[code as keyof typeof PROMO_CODES];
    if (discount) {
      dispatch({ type: 'APPLY_PROMO', payload: { code, discount } });
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    dispatch({ type: 'REMOVE_PROMO' });
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getTaxAmount = () => {
    const subtotal = getSubtotal();
    const discountedSubtotal = subtotal * (1 - state.promoDiscount);
    return discountedSubtotal * 0.08; // 8% tax rate
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    return subtotal >= 6225 ? 0 : 830; // Free shipping over ₹6225 (equivalent to $75)
  };

  const getCartTotal = () => {
    const subtotal = getSubtotal();
    const discountedSubtotal = subtotal * (1 - state.promoDiscount);
    const tax = discountedSubtotal * 0.08;
    const shipping = getShippingCost();
    return discountedSubtotal + tax + shipping;
  };

  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      setCartOpen,
      applyPromoCode,
      removePromoCode,
      getCartTotal,
      getCartCount,
      getSubtotal,
      getTaxAmount,
      getShippingCost,
    }}>
      {children}
    </CartContext.Provider>
  );
};