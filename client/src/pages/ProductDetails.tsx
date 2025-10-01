import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import { Product } from "../types/Product";

interface SupabaseProduct extends Product {
  images: { image_url: string }[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<SupabaseProduct | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, images:product_images(image_url)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } else {
        setProduct({
          ...data,
          images: data.images ?? [],
        });
        setSelectedSize(data.available_sizes?.[0] ?? null);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addToCart(product, selectedSize, quantity);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop" className="text-blue-600 underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const mainImage =
    product.images[mainImageIndex]?.image_url ?? "/placeholder.png";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Images */}
        <div>
          <div className="w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden shadow">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.image_url}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setMainImageIndex(idx)}
                  className={`w-20 h-20 rounded border cursor-pointer object-cover ${
                    mainImageIndex === idx
                      ? "border-black"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-700 mb-6">
            £{product.price.toFixed(2)}
          </p>

          {/* Size Selector */}
          {product.available_sizes && product.available_sizes.length > 0 && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Size:</label>
              <div className="flex flex-wrap gap-2">
                {product.available_sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`px-6 py-2 rounded-lg transition text-white ${
                selectedSize
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>

            <Link
              to="/shop"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-center"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
