import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { ProductGrid } from "../ProductGrid";
import { ButtonLink } from "../ButtonLink";
import { featuredProductIds, products } from "../../data/products";

const featured = featuredProductIds.
map((id) => products.find((product) => product.id === id)).
filter((product): product is (typeof products)[number] => Boolean(product));

export function FeaturedHeroes() {
  return (
    <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        id="featured-heading"
        title="Featured Heroes"
        subtitle="Designed for every move. Built to stand out."
        action={
        <ButtonLink to="/shop" variant="outline" size="sm">
            Shop all <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        } />
      
      <div className="mt-10 lg:mt-14">
        <ProductGrid products={featured} showDescription />
      </div>
    </section>);

}