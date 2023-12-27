import { ReactNode, createContext, useEffect, useState } from 'react';
import { Cart } from 'utils/types';

interface CartContextState {
  cart: Cart[];
  addToCart: (product: Cart) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
}

const initialState: CartContextState = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
};

const CART_STORAGE_KEY = 'cart';

// Create context
const CartContext = createContext<CartContextState>(initialState);

// Wrapper component
export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    // Load cart from local storage on component mount
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Cart) => {
    const existingProductIndex = cart.findIndex((item) => item.product.id === product.product.id);

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update the quantity
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      });
    } else {
      // Product is not in the cart, add it
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem.product.id === productId) {
          const updatedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            totalAmount: newQuantity * cartItem.product.price, // Update totalAmount based on new quantity
          };
          return updatedCartItem;
        }
        return cartItem;
      });

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
