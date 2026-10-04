import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon, RotateCcwIcon, RulerIcon, TruckIcon } from "lucide-react";
import { Button } from "../Button";
import { RatingStars } from "../RatingStars";
import { ColorSelector } from "../ColorSelector";
import { SizeSelector } from "../SizeSelector";
import { QuantitySelector } from "../QuantitySelector";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/currency";
import type { Product } from "../../types/product";

interface ProductPurchasePanelProps {
  product: Product;
  size: number | null;
  onSizeChange: (size: number) => void;
  onOpenSizeGuide: () => void;
}

export function ProductPurchasePanel({ product, size, onSizeChange, onOpenSizeGuide }: ProductPurchasePanelProps) {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const navigate = useNavigate();
  const [colorway, setColorway] = useState(product.colorways[0]?.name ?? product.color);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const wishlisted = isWishlisted(product.id);

  useEffect(() => {
    setColorway(product.colorways[0]?.name ?? product.color);
    setQuantity(1);
    setError("");
  }, [product]);

  const validate = () => {
    if (!size) {
      setError("Please select a size to continue.");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validate() || !size) return;
    addItem(product, size, quantity);
  };

  const handleBuyNow = () => {
    if (!validate() || !size) return;
    addItem(product, size, quantity);
    navigate("/cart?checkout=1");
  };

  return (
    <div>
      <p className="text-sm font-medium text-silver">{product.category}</p>
      <h1 className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
        {product.name}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <RatingStars rating={product.rating} size="md" />
        <a href="#reviews" className="text-sm text-silver underline underline-offset-4 hover:text-white">
          {product.rating.toFixed(1)} · {product.reviewCount} reviews
        </a>
      </div>
      <p className="mt-6 font-display text-3xl font-extrabold tabular-nums">{formatPrice(product.price)}</p>
      <p className="mt-4 text-base leading-relaxed text-silver">{product.shortDescription}</p>

      <div className="mt-8 space-y-7 border-t border-white/10 pt-7">
        <ColorSelector colorways={product.colorways} value={colorway} onChange={setColorway} />
        <div>
          <SizeSelector
            sizes={product.sizes}
            soldOut={product.soldOutSizes}
            value={size}
            onChange={(value) => {
              onSizeChange(value);
              setError("");
            }}
            error={error}
            headerRight={
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="flex items-center gap-1.5 text-sm text-silver underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
                <RulerIcon className="h-4 w-4" aria-hidden="true" /> Size guide
              </button>
            } />
          
          <p className="text-xs text-silver">
            <span className="font-semibold text-white">Regular fit.</span> Between sizes? We recommend sizing up.
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-3">
        <div className="flex gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <Button size="md" className="flex-1" onClick={handleAdd}>
            Add to cart
          </Button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => toggleWishlist(product)}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-sm border border-white/15 transition-colors duration-150 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
            
            <HeartIcon className={`h-5 w-5 ${wishlisted ? "fill-hero text-hero" : "text-white"}`} />
          </motion.button>
        </div>
        <Button variant="light" size="md" fullWidth onClick={handleBuyNow}>
          Buy now
        </Button>
      </div>

      <ul className="mt-7 space-y-3 rounded-sm bg-ink-900 p-5 text-sm">
        <li className="flex gap-3">
          <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
          <span className="text-silver">
            <span className="text-white">Free shipping over Rs. 10,000.</span> Standard delivery across Pakistan in 2–7 working days.
          </span>
        </li>
        <li className="flex gap-3">
          <RotateCcwIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
          <span className="text-silver">
            <span className="text-white">14-day returns & free size exchanges.</span>{" "}
            <Link to="/shipping-returns#returns" className="underline underline-offset-4 hover:text-white">
              View return policy
            </Link>
          </span>
        </li>
      </ul>
    </div>);

}