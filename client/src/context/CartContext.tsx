import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/Product";

interface CartItem extends Product {
  quantity: number;
  size: string;
  in_stock: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: number, size: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );

      //get available stock for this size
      const availableStock = product.in_stock ?? Infinity;

      if (existing) {
        const newQuantity = existing.quantity + quantity;
        if (newQuantity > availableStock) {
          alert(
            `Cannot add more than ${availableStock} items in size ${size}.`
          );
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantity > availableStock) {
          alert(
            `Cannot add more than ${availableStock} items in size ${size}.`
          );
          return prev;
        }
        return [
          ...prev,
          { ...product, size, quantity, in_stock: availableStock },
        ];
      }
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
