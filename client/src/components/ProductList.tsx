import React, { useState } from "react";
import type { AvailableSizes, Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

interface Props {
  products: (Product & { images?: { image_url: string }[] })[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  const { addToCart } = useCart(); // ✅ Add this

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
