import React from "react";
import { CheckIcon } from "lucide-react";
import { colorOptions, priceRanges } from "../../data/products";

interface ShopFiltersProps {
  sizes: number[];
  onToggleSize: (size: number) => void;
  price: string | null;
  onPriceChange: (price: string | null) => void;
  colors: string[];
  onToggleColor: (color: string) => void;
}

const ALL_SIZES = [40, 41, 42, 43, 44, 45];

export function ShopFilters({ sizes, onToggleSize, price, onPriceChange, colors, onToggleColor }: ShopFiltersProps) {
  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">Size (EU)</legend>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {ALL_SIZES.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => onToggleSize(size)}
                className={`h-11 rounded-sm border text-sm font-semibold transition-[background-color,color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero ${
                active ? "border-white bg-white text-midnight" : "border-white/15 text-white hover:border-white"}`
                }>
                
                {size}
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">Price</legend>
        <div className="mt-4 space-y-1">
          {priceRanges.map((range) => {
            const active = price === range.id;
            return (
              <button
                key={range.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onPriceChange(active ? null : range.id)}
                className="flex w-full items-center gap-3 rounded-sm py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
                
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-150 ${
                  active ? "border-hero" : "border-white/30"}`
                  }>
                  
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-hero" />}
                </span>
                <span className={active ? "text-white" : "text-silver"}>{range.label}</span>
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">Color</legend>
        <div className="mt-4 space-y-1">
          {colorOptions.map((color) => {
            const active = colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                aria-pressed={active}
                onClick={() => onToggleColor(color.name)}
                className="flex w-full items-center gap-3 rounded-sm py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
                
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${active ? "border-white" : "border-white/25"}`}
                  style={{ backgroundColor: color.hex }}>
                  
                  {active &&
                  <CheckIcon className={`h-3.5 w-3.5 ${color.name === "White" || color.name === "Silver" ? "text-midnight" : "text-white"}`} />
                  }
                </span>
                <span className={active ? "text-white" : "text-silver"}>{color.name}</span>
              </button>);

          })}
        </div>
      </fieldset>
    </div>);

}