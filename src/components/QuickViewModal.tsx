import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { RatingStars } from "./RatingStars";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/currency";
import type { Product } from "../types/product";

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setSize(null);
      setQuantity(1);
      setError("");
    }
  }, [open]);

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size to continue.");
      return;
    }
    addItem(product, size, quantity);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={`Quick view: ${product.name}`} size="xl" hideTitle>
      <div className="grid gap-6 pt-6 md:grid-cols-2 md:gap-8 md:pt-2">
        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-ink-800">
          <img src={product.image.src} alt={product.image.alt} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-silver">{product.category}</p>
          <h3 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight">{product.name}</h3>
          <RatingStars rating={product.rating} count={product.reviewCount} size="md" className="mt-3" />
          <p className="mt-4 font-display text-2xl font-extrabold tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-3 text-sm leading-relaxed text-silver">{product.shortDescription}</p>
          <p className="mt-3 text-sm text-white">
            Color: <span className="text-silver">{product.color}</span>
          </p>
          <div className="mt-6">
            <SizeSelector
              sizes={product.sizes}
              soldOut={product.soldOutSizes}
              value={size}
              onChange={(value) => {
                setSize(value);
                setError("");
              }}
              error={error}
              compact />
            
          </div>
          <div className="mt-2 flex gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button size="md" className="flex-1" onClick={handleAdd}>
              Add to cart
            </Button>
          </div>
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-white underline-offset-4 hover:underline">
            
            View full details <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Modal>);

}