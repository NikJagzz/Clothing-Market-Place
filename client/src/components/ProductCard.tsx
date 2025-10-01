import { useState } from "react";
import { useCart } from "../context/CartContext";
import { AvailableSizes, Product } from "../types/Product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const images = product.images ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<AvailableSizes | null>(
    product.available_sizes ? product.available_sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;

    const boundingRect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - boundingRect.left;
    const sectionWidth = boundingRect.width / images.length;
    const index = Math.min(
      images.length - 1,
      Math.floor(relativeX / sectionWidth)
    );
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => setCurrentIndex(0);

  const visibleImage = images[currentIndex]?.image_url ?? "/placeholder.png";

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");

    addToCart(product, selectedSize, quantity);
  };

  return (
    <div
      className="relative cursor-pointer border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: "500px" }}
    >
      <div
        className="aspect-[4/5] bg-gray-100 relative overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src={visibleImage}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-gray-600 mt-1">£{product.price.toFixed(2)}</p>

        {/* Size dropdown */}
        {product.available_sizes && product.available_sizes.length > 0 && (
          <select
            value={selectedSize || ""}
            onChange={(e) => setSelectedSize(e.target.value as AvailableSizes)}
            className="mt-2 w-full border rounded px-2 py-1 text-sm"
          >
            {product.available_sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )}

        {/* Quantity input */}
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-2 w-full border rounded px-2 py-1 text-sm"
          placeholder="Quantity"
        />

        <div className="flex justify-between mt-3">
          <Link
            to={`/product/${product.id}`}
            className="inline-block bg-black text-white px-4 py-1 rounded hover:bg-gray-800 text-sm"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
