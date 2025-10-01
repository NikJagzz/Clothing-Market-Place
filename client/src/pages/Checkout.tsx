import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  if (cartItems.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={() => navigate("/shop")}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For demo: just alert order summary
    alert(
      `Order placed!\n\nName: ${name}\nAddress: ${address}\nEmail: ${email}\nTotal: £${totalPrice.toFixed(
        2
      )}`
    );

    clearCart();
    navigate("/shop");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <ul className="mb-6 border rounded p-4">
        {cartItems.map(({ id, name, price, quantity }) => (
          <li
            key={id}
            className="flex justify-between py-1 border-b last:border-b-0"
          >
            <span>
              {name} × {quantity}
            </span>
            <span>£{(price * quantity).toFixed(2)}</span>
          </li>
        ))}
        <li className="flex justify-between font-bold pt-2">
          <span>Total</span>
          <span>£{totalPrice.toFixed(2)}</span>
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="address">
            Shipping Address
          </label>
          <textarea
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
