import { supabase } from "../supabaseClient";
import type { Product } from "../types/Product";

const PAGE_SIZE = 12;

export async function fetchTShirts(page: number) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: products,
    error: productsError,
    count,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("category", "tshirt")
    .range(from, to);

  if (productsError) {
    return { data: [], count: 0, error: productsError };
  }

  const productIds = products?.map((p) => p.id) ?? [];

  if (productIds.length === 0) {
    return { data: [], count: 0, error: null };
  }

  // Fetch **all** images for these products (remove is_primary filter)
  const { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("product_id, image_url, is_primary")
    .in("product_id", productIds);

  if (imagesError) {
    return { data: [], count: 0, error: imagesError };
  }

  // Map all images per product
  const productsWithImages = products.map((product) => ({
    ...product,
    images: images?.filter((img) => img.product_id === product.id) ?? [],
  }));

  return {
    data: productsWithImages,
    count,
    error: null,
  };
}
