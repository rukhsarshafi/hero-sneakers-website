import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { Modal } from "./Modal";
import { products } from "../data/products";
import { formatPrice } from "../utils/currency";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = ["Velocity", "Premium", "Lifestyle", "Red"];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products.filter((product) =>
    [product.name, product.category, product.color, product.shortDescription].
    join(" ").
    toLowerCase().
    includes(term)
    );
  }, [query]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Search" size="lg">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="site-search" className="sr-only">
          Search sneakers
        </label>
        <div className="flex items-center gap-3 border-b border-white/20 pb-3 focus-within:border-white">
          <SearchIcon className="h-5 w-5 shrink-0 text-silver" aria-hidden="true" />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, style or colour"
            className="w-full bg-transparent font-display text-xl font-bold text-white placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-steel focus:outline-none" />
          
        </div>
      </form>

      {query.trim() === "" ?
      <div className="pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">Popular searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) =>
          <button
            key={suggestion}
            type="button"
            onClick={() => setQuery(suggestion)}
            className="h-10 rounded-sm border border-white/15 px-4 text-sm text-silver transition-colors duration-150 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
            
                {suggestion}
              </button>
          )}
          </div>
        </div> :
      results.length === 0 ?
      <p className="pt-8 text-center text-sm text-silver" aria-live="polite">
          No sneakers match “{query}”. Try a different style or colour.
        </p> :

      <div className="pt-4">
          <p className="text-xs text-steel" aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <ul className="mt-2 divide-y divide-white/10">
            {results.map((product) =>
          <li key={product.id}>
                <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="group flex items-center gap-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
                  <img src={product.image.src} alt="" className="h-16 w-14 shrink-0 rounded-sm bg-ink-800 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold uppercase">{product.name}</p>
                    <p className="text-xs text-silver">{product.color}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{formatPrice(product.price)}</span>
                  <ArrowRightIcon className="h-4 w-4 text-steel transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </li>
          )}
          </ul>
        </div>
      }
    </Modal>);

}