import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export const ClothingDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms delay before closing
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="hover:text-blue-600 px-2 py-1">Clothing</button>

      <div
        className={`absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50
          transition-opacity duration-200
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <Link
          to="/clothing/tshirts"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          T-Shirts
        </Link>
        <Link
          to="/clothing/hoodies"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          Hoodies
        </Link>
        <Link
          to="/clothing/trousers"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          Trousers
        </Link>
      </div>
    </div>
  );
};
