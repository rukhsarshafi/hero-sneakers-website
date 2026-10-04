import React from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
  showDescription?: boolean;
  columns?: 3 | 4;
}

export function ProductGrid({ products, showDescription = false, columns = 4 }: ProductGridProps) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 ${
      columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`
      }>
      
      {products.map((product) =>
      <li key={product.id} className="h-full">
          <ProductCard product={product} showDescription={showDescription} />
        </li>
      )}
    </ul>);

}