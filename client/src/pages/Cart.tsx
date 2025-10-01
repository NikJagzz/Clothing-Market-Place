import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          to="/shop"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <ul>
        {cartItems.map(({ id, name, price, quantity, size }) => (
          <li
            key={`${id}-${size}`}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h2 className="font-semibold">{name}</h2>
              <p className="text-sm text-gray-600">Size: {size}</p>
              <p>
                £{price.toFixed(2)} × {quantity} = £
                {(price * quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(id, size)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right font-bold text-xl">
        Total: £{totalPrice.toFixed(2)}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={clearCart}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
