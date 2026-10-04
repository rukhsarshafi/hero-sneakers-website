import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductGrid";
import { ButtonLink } from "../components/ButtonLink";
import { products } from "../data/products";

const newArrivals = products.
filter((product) => product.isNew).
sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));

export function NewArrivals() {
  return (
    <>
      <PageHeader
        title="New Arrivals"
        breadcrumb="New Arrivals"
        description="Meet the next generation of everyday sneakers.">
        
        <p className="text-sm text-silver">
          <span className="font-display text-2xl font-extrabold text-white">{newArrivals.length}</span> new styles this season
        </p>
      </PageHeader>

      <section aria-label="New arrival products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ProductGrid products={newArrivals} showDescription />
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">Looking for the originals?</h2>
            <p className="mt-2 text-silver">HERO CORE, PULSE, APEX and more — the full range is in the shop.</p>
          </div>
          <ButtonLink to="/shop" variant="light" size="lg">
            View all sneakers <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>
    </>);

}