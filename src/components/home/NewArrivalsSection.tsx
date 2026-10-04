import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { ProductCard } from "../ProductCard";
import { ButtonLink } from "../ButtonLink";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/currency";

const newArrivals = products.
filter((product) => product.isNew).
sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));

export function NewArrivalsSection() {
  const [lead, ...rest] = newArrivals;
  if (!lead) return null;

  return (
    <section aria-labelledby="new-arrivals-heading" className="border-y border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          id="new-arrivals-heading"
          title="New Arrivals"
          subtitle="Meet the next generation of everyday sneakers."
          action={
          <ButtonLink to="/new-arrivals" variant="outline" size="sm">
              View all <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          } />
        

        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:mt-14 lg:grid-cols-5">
          <li className="col-span-2">
            <Link
              to={`/product/${lead.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-midnight ring-1 ring-white/5 sm:aspect-[16/11] lg:aspect-auto lg:h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
              <img
                src={lead.image.src}
                alt={lead.image.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
              
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div>
                  <span className="rounded-sm bg-hero px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {lead.badge ?? "New"}
                  </span>
                  <p className="mt-3 font-display text-3xl font-black uppercase leading-none sm:text-4xl">{lead.name}</p>
                  <p className="mt-2 text-sm text-silver">
                    {lead.color} · <span className="font-semibold text-white">{formatPrice(lead.price)}</span>
                  </p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-midnight transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                  <ArrowUpRightIcon className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </li>
          {rest.slice(0, 3).map((product, index) =>
          <li key={product.id} className={`h-full ${index === 2 ? "hidden lg:block" : ""}`}>
              <ProductCard product={product} />
            </li>
          )}
        </ul>
      </div>
    </section>);

}