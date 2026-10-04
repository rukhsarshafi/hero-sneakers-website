import React from "react";
import { Link } from "react-router-dom";
import { Trash2Icon } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/currency";
import type { CartItem } from "../types/product";

interface CartLineItemProps {
  item: CartItem;
  onNavigate?: () => void;
  large?: boolean;
}

export function CartLineItem({ item, onNavigate, large = false }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product } = item;

  return (
    <div className="flex gap-4 py-5">
      <Link
        to={`/product/${product.slug}`}
        onClick={onNavigate}
        className={`shrink-0 overflow-hidden rounded-sm bg-ink-800 ${large ? "h-32 w-28 sm:h-40 sm:w-32" : "h-28 w-24"}`}>
        
        <img src={product.image.src} alt={product.image.alt} className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/product/${product.slug}`}
              onClick={onNavigate}
              className={`block font-display font-extrabold uppercase hover:text-silver ${large ? "text-base" : "text-sm"}`}>
              
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-silver">{product.color}</p>
            <p className="mt-0.5 text-xs text-silver">Size EU {item.size}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums">{formatPrice(product.price * item.quantity)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            size="sm"
            value={item.quantity}
            onChange={(quantity) => updateQuantity(item.key, quantity)}
            label={`Quantity for ${product.name}`} />
          
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="flex h-9 items-center gap-1.5 px-2 text-xs text-silver transition-colors duration-150 hover:text-hero focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero"
            aria-label={`Remove ${product.name} size ${item.size}`}>
            
            <Trash2Icon className="h-4 w-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>);

}