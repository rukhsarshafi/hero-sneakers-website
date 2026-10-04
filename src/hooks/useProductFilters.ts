import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { priceRanges, products, shopCategories } from "../data/products";

export type SortOption = "newest" | "price-asc" | "price-desc";
export type ShopCategory = (typeof shopCategories)[number];

export function useProductFilters() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<ShopCategory>(() => {
    const param = searchParams.get("category");
    return isCategory(param) ? param : "All Sneakers";
  });
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sizes, setSizes] = useState<number[]>([]);
  const [price, setPrice] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("newest");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    const param = searchParams.get("category");
    if (isCategory(param)) setCategory(param);
  }, [searchParams]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const range = priceRanges.find((item) => item.id === price);

    const filtered = products.filter((product) => {
      if (category === "New Arrivals" && !product.isNew) return false;
      if (category !== "All Sneakers" && category !== "New Arrivals" && product.category !== category) return false;
      if (term && !`${product.name} ${product.category} ${product.color}`.toLowerCase().includes(term)) return false;
      if (sizes.length && !sizes.some((size) => product.sizes.includes(size) && !product.soldOutSizes.includes(size))) return false;
      if (range && (product.price < range.min || product.price > range.max)) return false;
      if (colors.length && !colors.every((color) => product.colorFamilies.includes(color as never))) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.releasedAt.localeCompare(a.releasedAt);
    });
  }, [category, query, sizes, price, colors, sort]);

  const toggleSize = (size: number) =>
  setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);

  const toggleColor = (color: string) =>
  setColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]);

  const clearFilters = () => {
    setSizes([]);
    setColors([]);
    setPrice(null);
    setQuery("");
    setCategory("All Sneakers");
  };

  return {
    category,
    setCategory,
    query,
    setQuery,
    sizes,
    toggleSize,
    price,
    setPrice,
    colors,
    toggleColor,
    sort,
    setSort,
    results,
    activeFilterCount: sizes.length + colors.length + (price ? 1 : 0),
    clearFilters
  };
}

function isCategory(value: string | null): value is ShopCategory {
  return Boolean(value) && (shopCategories as readonly string[]).includes(value as string);
}