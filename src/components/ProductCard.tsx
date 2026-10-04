import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon, HeartIcon, XIcon } from "lucide-react";
import { Button } from "./Button";
import { RatingStars } from "./RatingStars";
import { QuickViewModal } from "./QuickViewModal";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/currency";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
}

export function ProductCard({ product, showDescription = false }: ProductCardProps) {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const productUrl = `/product/${product.slug}`;

  const handleSize = (size: number) => {
    addItem(product, size, 1);
    setPickerOpen(false);
  };

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink-800 ring-1 ring-white/5 transition-[box-shadow] duration-200 ease-out group-hover:ring-white/15">
        <Link to={productUrl} aria-label={`View ${product.name}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hero">
          <img
            src={product.image.src}
            alt={product.image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
          
        </Link>

        {product.badge &&
        <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-sm bg-white px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-midnight sm:left-3 sm:top-3">
            {product.badge}
          </span>
        }

        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-midnight/70 backdrop-blur transition-colors duration-150 hover:bg-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero sm:right-3 sm:top-3">
          
          <HeartIcon className={`h-[18px] w-[18px] transition-colors duration-150 ${wishlisted ? "fill-hero text-hero" : "text-white"}`} />
        </motion.button>

        <button
          type="button"
          onClick={() => setQuickViewOpen(true)}
          className="absolute inset-x-3 bottom-3 hidden h-10 translate-y-2 items-center justify-center gap-2 rounded-sm border border-white/15 bg-midnight/85 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-white opacity-0 backdrop-blur transition-[opacity,transform,background-color] duration-200 ease-out hover:bg-midnight focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          
          <EyeIcon className="h-4 w-4" /> Quick view
        </button>
        <button
          type="button"
          onClick={() => setQuickViewOpen(true)}
          aria-label={`Quick view ${product.name}`}
          className="absolute bottom-2 right-2 grid h-10 w-10 place-items-center rounded-full bg-midnight/70 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero sm:hidden">
          
          <EyeIcon className="h-[18px] w-[18px]" />
        </button>

        <AnimatePresence>
          {pickerOpen &&
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-midnight/95 p-3 backdrop-blur">
            
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">Select size (EU)</span>
                <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-silver hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero"
                aria-label="Close size picker">
                
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                {product.sizes.map((size) => {
                const soldOut = product.soldOutSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={soldOut}
                    onClick={() => handleSize(size)}
                    aria-label={soldOut ? `EU ${size}, sold out` : `Add EU ${size} to bag`}
                    className="h-9 rounded-sm border border-white/15 text-xs font-semibold text-white transition-[background-color,color,border-color] duration-150 hover:border-white hover:bg-white hover:text-midnight disabled:cursor-not-allowed disabled:border-white/5 disabled:text-steel disabled:line-through disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
                    
                      {size}
                    </button>);

              })}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <h3 className="line-clamp-1 font-display text-[13px] font-extrabold uppercase tracking-wide sm:text-base">
            <Link to={productUrl} className="transition-colors duration-150 hover:text-silver">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-white sm:text-base">{formatPrice(product.price)}</p>
        </div>
        {showDescription &&
        <p className="mt-2 hidden text-sm leading-relaxed text-silver sm:line-clamp-2 sm:min-h-[45px]">
            {product.shortDescription}
          </p>
        }
        <p className="mt-1.5 line-clamp-1 text-xs text-silver">{product.color}</p>
        <RatingStars rating={product.rating} count={product.reviewCount} className="mt-2" />
        <div className="mt-auto pt-4">
          <Button
            variant="light"
            size="sm"
            fullWidth
            onClick={() => setPickerOpen((prev) => !prev)}
            aria-expanded={pickerOpen}>
            
            Add to cart
          </Button>
        </div>
      </div>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </article>);

}