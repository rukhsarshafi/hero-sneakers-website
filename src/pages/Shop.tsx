import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductGrid";
import { ShopFilters } from "../components/shop/ShopFilters";
import { Button } from "../components/Button";
import { useProductFilters, SortOption } from "../hooks/useProductFilters";
import { priceRanges, shopCategories } from "../data/products";

const sortOptions: {value: SortOption;label: string;}[] = [
{ value: "newest", label: "Newest" },
{ value: "price-asc", label: "Price: Low to High" },
{ value: "price-desc", label: "Price: High to Low" }];


export function Shop() {
  const filters = useProductFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  const filterPanel =
  <ShopFilters
    sizes={filters.sizes}
    onToggleSize={filters.toggleSize}
    price={filters.price}
    onPriceChange={filters.setPrice}
    colors={filters.colors}
    onToggleColor={filters.toggleColor} />;



  const activeChips = [
  ...filters.sizes.map((size) => ({ label: `EU ${size}`, onRemove: () => filters.toggleSize(size) })),
  ...(filters.price ?
  [{ label: priceRanges.find((r) => r.id === filters.price)?.label ?? "", onRemove: () => filters.setPrice(null) }] :
  []),
  ...filters.colors.map((color) => ({ label: color, onRemove: () => filters.toggleColor(color) }))];


  return (
    <>
      <PageHeader
        title="Shop"
        breadcrumb="Shop"
        description="Every HERO, in one place. Filter by size, colour and price to find your pair." />
      

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Categories">
          {shopCategories.map((category) => {
            const active = filters.category === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => filters.setCategory(category)}
                className={`h-10 shrink-0 rounded-sm border px-4 text-sm font-medium transition-[background-color,color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero ${
                active ? "border-white bg-white text-midnight" : "border-white/15 text-silver hover:border-white hover:text-white"}`
                }>
                
                {category}
              </button>);

          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <label htmlFor="shop-search" className="sr-only">Search products</label>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" aria-hidden="true" />
            <input
              id="shop-search"
              type="search"
              value={filters.query}
              onChange={(event) => filters.setQuery(event.target.value)}
              placeholder="Search sneakers"
              className="h-11 w-full rounded-sm border border-white/15 bg-ink-900 pl-11 pr-4 text-sm text-white placeholder:text-steel focus:border-white focus:outline-none" />
            
          </div>
          <div className="flex items-center gap-2">
            <p className="mr-auto text-sm text-silver sm:mr-3" aria-live="polite">
              {filters.results.length} {filters.results.length === 1 ? "style" : "styles"}
            </p>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex h-11 items-center gap-2 rounded-sm border border-white/15 px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero lg:hidden">
              
              <SlidersHorizontalIcon className="h-4 w-4" />
              Filters
              {filters.activeFilterCount > 0 &&
              <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-hero px-1 text-[11px] font-bold">
                  {filters.activeFilterCount}
                </span>
              }
            </button>
            <div className="relative">
              <label htmlFor="shop-sort" className="sr-only">Sort by</label>
              <select
                id="shop-sort"
                value={filters.sort}
                onChange={(event) => filters.setSort(event.target.value as SortOption)}
                className="h-11 appearance-none rounded-sm border border-white/15 bg-ink-900 pl-4 pr-10 text-sm text-white focus:border-white focus:outline-none">
                
                {sortOptions.map((option) =>
                <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                )}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-28">
              {filterPanel}
              {filters.activeFilterCount > 0 &&
              <button type="button" onClick={filters.clearFilters} className="mt-8 text-sm text-silver underline underline-offset-4 hover:text-white">
                  Clear all filters
                </button>
              }
            </div>
          </aside>

          <div>
            {activeChips.length > 0 &&
            <ul className="mb-6 flex flex-wrap gap-2" aria-label="Active filters">
                {activeChips.map((chip) =>
              <li key={chip.label}>
                    <button
                  type="button"
                  onClick={chip.onRemove}
                  className="flex h-9 items-center gap-2 rounded-sm bg-ink-800 px-3 text-xs font-medium text-white hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero"
                  aria-label={`Remove filter ${chip.label}`}>
                  
                      {chip.label}
                      <XIcon className="h-3.5 w-3.5 text-silver" />
                    </button>
                  </li>
              )}
              </ul>
            }

            {filters.results.length > 0 ?
            <ProductGrid products={filters.results} columns={3} showDescription /> :

            <div className="flex flex-col items-center rounded-sm border border-dashed border-white/15 px-6 py-20 text-center">
                <p className="font-display text-2xl font-extrabold uppercase">No matches</p>
                <p className="mt-2 max-w-sm text-sm text-silver">
                  Try removing a filter or searching for a different style.
                </p>
                <Button variant="outline" className="mt-6" onClick={filters.clearFilters}>
                  Clear all filters
                </Button>
              </div>
            }
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-[65] lg:hidden">
            <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true" />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-lg border-t border-white/10 bg-midnight"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>
            
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 className="font-display text-lg font-extrabold uppercase">Filters</h2>
                <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
                aria-label="Close filters">
                
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">{filterPanel}</div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-4">
                <Button variant="outline" onClick={filters.clearFilters}>Clear all</Button>
                <Button onClick={() => setDrawerOpen(false)}>Show {filters.results.length}</Button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </>);

}