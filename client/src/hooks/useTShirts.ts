import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import { fetchTShirts } from "../api/product";

export function useTShirts(page: number) {
  const [products, setProducts] = useState<
    (Product & { images?: { image_url: string }[] })[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTShirts() {
      setLoading(true);
      setError(null);

      const { data, count, error } = await fetchTShirts(page);

      if (!isMounted) return;

      if (error) {
        setError(error);
        setProducts([]);
        setTotalCount(0);
      } else {
        setProducts(data);
        setTotalCount(count ?? 0);
      }
      setLoading(false);
    }

    loadTShirts();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return { products, totalCount, loading, error };
}
