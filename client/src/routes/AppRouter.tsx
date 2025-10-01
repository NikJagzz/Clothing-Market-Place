import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import AccountSettings from "../pages/AccountSettings";
import CompleteProfile from "../pages/CompleteProfile";
import TShirtsPage from "../pages/TShirtPage";

interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = ({}) => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<AccountSettings />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/clothing/tshirts" element={<TShirtsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
