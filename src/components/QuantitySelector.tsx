import React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  label = "Quantity"
}: QuantitySelectorProps) {
  const height = size === "sm" ? "h-9" : "h-12";
  const width = size === "sm" ? "w-9" : "w-11";
  const buttonClass = `grid ${height} ${width} place-items-center text-silver transition-colors duration-150 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hero`;

  return (
    <div className={`inline-flex ${height} items-center rounded-sm border border-white/15`} role="group" aria-label={label}>
      <button type="button" className={buttonClass} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={buttonClass} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>);

}