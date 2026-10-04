import React, { ReactNode } from "react";

interface SizeSelectorProps {
  sizes: number[];
  soldOut?: number[];
  value: number | null;
  onChange: (size: number) => void;
  error?: string;
  compact?: boolean;
  headerRight?: ReactNode;
}

export function SizeSelector({
  sizes,
  soldOut = [],
  value,
  onChange,
  error,
  compact = false,
  headerRight
}: SizeSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span id="size-label" className="text-sm font-semibold text-white">
          Select size <span className="font-normal text-silver">(EU)</span>
        </span>
        {headerRight}
      </div>
      <div
        role="radiogroup"
        aria-labelledby="size-label"
        className={`grid grid-cols-6 ${compact ? "gap-1.5" : "gap-2"}`}>
        
        {sizes.map((size) => {
          const unavailable = soldOut.includes(size);
          const selected = value === size;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={unavailable ? `EU ${size}, sold out` : `EU ${size}`}
              disabled={unavailable}
              onClick={() => onChange(size)}
              className={`${compact ? "h-10 text-xs" : "h-12 text-sm"} rounded-sm border font-semibold transition-[background-color,color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero focus-visible:ring-offset-2 focus-visible:ring-offset-midnight ${
              selected ?
              "border-white bg-white text-midnight" :
              unavailable ?
              "cursor-not-allowed border-white/5 text-steel line-through" :
              error ?
              "border-hero/60 text-white hover:border-white" :
              "border-white/15 text-white hover:border-white"}`
              }>
              
              {size}
            </button>);

        })}
      </div>
      <p className="mt-2 min-h-[1.25rem] text-xs text-hero" aria-live="polite">
        {error}
      </p>
    </div>);

}