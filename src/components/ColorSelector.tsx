import React from "react";
import type { Colorway } from "../types/product";

interface ColorSelectorProps {
  colorways: Colorway[];
  value: string;
  onChange: (name: string) => void;
}

export function ColorSelector({ colorways, value, onChange }: ColorSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-white">
        Color: <span className="font-normal text-silver">{value}</span>
      </p>
      <div role="radiogroup" aria-label="Color" className="flex flex-wrap gap-3">
        {colorways.map((colorway) => {
          const selected = colorway.name === value;
          return (
            <button
              key={colorway.name}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={colorway.available ? colorway.name : `${colorway.name}, coming soon`}
              disabled={!colorway.available}
              onClick={() => onChange(colorway.name)}
              title={colorway.available ? colorway.name : `${colorway.name} — coming soon`}
              className={`relative grid h-11 w-11 place-items-center rounded-full border transition-[border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero ${
              selected ? "border-white" : "border-white/15 hover:border-white/50"} ${
              colorway.available ? "" : "cursor-not-allowed opacity-50"}`}>
              
              <span className="flex h-8 w-8 overflow-hidden rounded-full border border-white/10">
                {colorway.swatches.map((swatch) =>
                <span key={swatch} className="h-full flex-1" style={{ backgroundColor: swatch }} />
                )}
              </span>
              {!colorway.available &&
              <span className="absolute h-px w-9 rotate-45 bg-silver" aria-hidden="true" />
              }
            </button>);

        })}
      </div>
    </div>);

}