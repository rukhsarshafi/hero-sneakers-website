import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ProductImage } from "../../types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[index];

  const go = (delta: number) => setIndex((prev) => (prev + delta + images.length) % images.length);

  const arrowClass =
  "absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-midnight/70 text-white backdrop-blur transition-colors duration-150 hover:bg-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero";

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      {hasMultiple &&
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Product images">
          {images.map((image, i) =>
        <button
          key={image.src}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Show image ${i + 1}: ${image.alt}`}
          onClick={() => setIndex(i)}
          className={`h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-ink-800 ring-1 transition-[box-shadow,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero lg:h-24 lg:w-20 ${
          i === index ? "opacity-100 ring-white" : "opacity-60 ring-white/10 hover:opacity-100"}`
          }>
          
              <img src={image.src} alt="" className="h-full w-full object-cover" />
            </button>
        )}
        </div>
      }

      <div className="relative aspect-square flex-1 overflow-hidden rounded-sm bg-ink-800 sm:aspect-[4/5] lg:aspect-[4/5]">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
        {hasMultiple &&
        <>
            <button type="button" onClick={() => go(-1)} className={`${arrowClass} left-3`} aria-label="Previous image">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrowClass} right-3`} aria-label="Next image">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 left-3 rounded-sm bg-midnight/70 px-2.5 py-1 text-xs tabular-nums text-silver backdrop-blur">
              {index + 1} / {images.length}
            </span>
          </>
        }
      </div>
    </div>);

}