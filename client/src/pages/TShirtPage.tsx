// pages/TShirtsPage.tsx
import React, { useState } from "react";
import ClothingList from "../components/ProductList";
import { useTShirts } from "../hooks/useTShirts";

const PAGE_SIZE = 12;

const TShirtsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { products, totalCount, loading, error } = useTShirts(page);

  if (loading)
    return <p className="text-center mt-20 text-lg">Loading T-Shirts...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-red-600">
        Error loading T-Shirts: {error.message}
      </p>
    );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">T-Shirts</h1>
      <ClothingList products={products} />
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded border transition-colors ${
              page === idx + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setPage(idx + 1)}
            aria-label={`Page ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TShirtsPage;
